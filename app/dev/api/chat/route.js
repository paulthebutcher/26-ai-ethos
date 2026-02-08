import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";

const execAsync = promisify(exec);

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Base path for the repo (in production, this would be configurable)
const REPO_BASE = process.env.REPO_PATH || process.cwd();

// Define tools for Claude
const tools = [
  {
    name: "list_files",
    description: "List files and directories at a given path. Returns file names with indicators for directories.",
    input_schema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "Relative path from repo root. Use '.' for root directory.",
        },
        pattern: {
          type: "string",
          description: "Optional glob pattern to filter files (e.g., '*.jsx', '*.ts')",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "read_file",
    description: "Read the contents of a file. Returns the full file content.",
    input_schema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "Relative path to the file from repo root",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "write_file",
    description: "Write content to a file. Creates the file if it doesn't exist, overwrites if it does.",
    input_schema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "Relative path to the file from repo root",
        },
        content: {
          type: "string",
          description: "The content to write to the file",
        },
      },
      required: ["path", "content"],
    },
  },
  {
    name: "search_files",
    description: "Search for text patterns in files. Uses grep-like search.",
    input_schema: {
      type: "object",
      properties: {
        pattern: {
          type: "string",
          description: "The text or regex pattern to search for",
        },
        path: {
          type: "string",
          description: "Directory to search in (relative to repo root). Defaults to '.'",
        },
        file_pattern: {
          type: "string",
          description: "File pattern to limit search (e.g., '*.jsx')",
        },
      },
      required: ["pattern"],
    },
  },
  {
    name: "git_status",
    description: "Get the current git status showing modified, staged, and untracked files.",
    input_schema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "git_diff",
    description: "Show the diff of current changes.",
    input_schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          description: "Optional specific file to diff",
        },
      },
    },
  },
  {
    name: "git_commit",
    description: "Stage and commit changes with a message.",
    input_schema: {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "The commit message",
        },
        files: {
          type: "array",
          items: { type: "string" },
          description: "Specific files to stage and commit. If empty, stages all changes.",
        },
      },
      required: ["message"],
    },
  },
  {
    name: "git_push",
    description: "Push committed changes to the remote repository.",
    input_schema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "run_build",
    description: "Run the build command to check for errors.",
    input_schema: {
      type: "object",
      properties: {
        project: {
          type: "string",
          description: "Which project to build: 'ethos' or 'guildry'",
        },
      },
      required: ["project"],
    },
  },
];

// Tool implementations
async function listFiles(input) {
  const targetPath = path.join(REPO_BASE, input.path || ".");
  try {
    const entries = await fs.readdir(targetPath, { withFileTypes: true });
    let results = entries.map((entry) => ({
      name: entry.name,
      type: entry.isDirectory() ? "directory" : "file",
    }));

    // Filter by pattern if provided
    if (input.pattern) {
      const regex = new RegExp(
        input.pattern.replace(/\*/g, ".*").replace(/\?/g, ".")
      );
      results = results.filter((r) => regex.test(r.name));
    }

    return results
      .map((r) => `${r.type === "directory" ? "📁" : "📄"} ${r.name}`)
      .join("\n");
  } catch (error) {
    return `Error listing files: ${error.message}`;
  }
}

async function readFile(input) {
  const targetPath = path.join(REPO_BASE, input.path);
  try {
    const content = await fs.readFile(targetPath, "utf-8");
    return content;
  } catch (error) {
    return `Error reading file: ${error.message}`;
  }
}

async function writeFile(input) {
  const targetPath = path.join(REPO_BASE, input.path);
  try {
    // Ensure directory exists
    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.writeFile(targetPath, input.content, "utf-8");
    return `Successfully wrote to ${input.path}`;
  } catch (error) {
    return `Error writing file: ${error.message}`;
  }
}

async function searchFiles(input) {
  try {
    const searchPath = path.join(REPO_BASE, input.path || ".");
    let cmd = `grep -r -n "${input.pattern}" "${searchPath}"`;
    if (input.file_pattern) {
      cmd += ` --include="${input.file_pattern}"`;
    }
    cmd += " 2>/dev/null | head -50";

    const { stdout } = await execAsync(cmd);
    return stdout || "No matches found";
  } catch (error) {
    if (error.code === 1) return "No matches found";
    return `Error searching: ${error.message}`;
  }
}

async function gitStatus() {
  try {
    const { stdout } = await execAsync(`cd "${REPO_BASE}" && git status --short`);
    return stdout || "Working tree clean";
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

async function gitDiff(input) {
  try {
    let cmd = `cd "${REPO_BASE}" && git diff`;
    if (input.file) {
      cmd += ` "${input.file}"`;
    }
    const { stdout } = await execAsync(cmd);
    return stdout || "No changes";
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

async function gitCommit(input) {
  try {
    // Stage files
    if (input.files && input.files.length > 0) {
      await execAsync(
        `cd "${REPO_BASE}" && git add ${input.files.map((f) => `"${f}"`).join(" ")}`
      );
    } else {
      await execAsync(`cd "${REPO_BASE}" && git add -A`);
    }

    // Commit
    const { stdout } = await execAsync(
      `cd "${REPO_BASE}" && git commit -m "${input.message.replace(/"/g, '\\"')}"`
    );
    return stdout;
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

async function gitPush() {
  try {
    const { stdout } = await execAsync(`cd "${REPO_BASE}" && git push`);
    return stdout || "Pushed successfully";
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

async function runBuild(input) {
  try {
    const projectPath =
      input.project === "guildry"
        ? path.join(REPO_BASE, "guildry/apps/web")
        : REPO_BASE;

    const { stdout, stderr } = await execAsync(
      `cd "${projectPath}" && npm run build 2>&1 | tail -40`,
      { timeout: 120000 }
    );
    return stdout + (stderr ? `\nStderr: ${stderr}` : "");
  } catch (error) {
    return `Build output:\n${error.stdout || ""}\n${error.stderr || ""}\nExit code: ${error.code}`;
  }
}

// Execute a tool
async function executeTool(name, input) {
  switch (name) {
    case "list_files":
      return await listFiles(input);
    case "read_file":
      return await readFile(input);
    case "write_file":
      return await writeFile(input);
    case "search_files":
      return await searchFiles(input);
    case "git_status":
      return await gitStatus();
    case "git_diff":
      return await gitDiff(input);
    case "git_commit":
      return await gitCommit(input);
    case "git_push":
      return await gitPush();
    case "run_build":
      return await runBuild(input);
    default:
      return `Unknown tool: ${name}`;
  }
}

export async function POST(request) {
  try {
    // Simple auth check
    const authHeader = request.headers.get("authorization");
    const expectedToken = process.env.DEV_AUTH_TOKEN;

    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { messages } = await request.json();

    // System prompt for the dev assistant
    const systemPrompt = `You are a development assistant for The AI Ethos, a solo AI product incubator. You have access to the codebase and can help with:

- Reading and understanding code
- Making edits to files
- Searching for patterns across the codebase
- Git operations (status, commit, push)
- Running builds

The codebase structure:
- /ethos - The main AI Ethos marketing site (Next.js)
  - /app - Pages and API routes
  - /app/landing/[id] - Landing pages for each product idea
  - /app/projects - Project listing and details
- /guildry - The Guildry product (Next.js monorepo)
  - /apps/web - Main Guildry web app

When making changes:
1. Always read the file first to understand context
2. Make targeted edits
3. Run a build to verify changes work
4. Commit with clear messages

Be concise but thorough. When showing code, show relevant snippets, not entire files.`;

    // Call Claude with tools
    let response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: systemPrompt,
      tools,
      messages,
    });

    // Handle tool use in a loop
    while (response.stop_reason === "tool_use") {
      const toolUseBlocks = response.content.filter(
        (block) => block.type === "tool_use"
      );

      const toolResults = await Promise.all(
        toolUseBlocks.map(async (toolUse) => {
          const result = await executeTool(toolUse.name, toolUse.input);
          return {
            type: "tool_result",
            tool_use_id: toolUse.id,
            content: result,
          };
        })
      );

      // Continue conversation with tool results
      response = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        system: systemPrompt,
        tools,
        messages: [
          ...messages,
          { role: "assistant", content: response.content },
          { role: "user", content: toolResults },
        ],
      });
    }

    // Extract text response
    const textContent = response.content.find((block) => block.type === "text");

    return NextResponse.json({
      response: textContent?.text || "No response",
      toolsUsed: response.content
        .filter((block) => block.type === "tool_use")
        .map((block) => block.name),
    });
  } catch (error) {
    console.error("Dev API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
