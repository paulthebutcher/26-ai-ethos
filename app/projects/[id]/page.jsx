"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

// Project detail data with approaches and test plans
const PROJECT_DETAILS = {
  changelog: {
    id: "changelog",
    name: "Changelog",
    tagline: "Auto-generated product changelogs",
    icon: "📋",
    color: "#6366f1",
    description: "AI generates changelogs from git commits, PRs, and tickets. Ship updates without the writing overhead.",
    thesis: "Product changelogs are tedious to write. This is fully automatable from git. Free for public repos, paid for private.",
    problem: `
Most teams skip changelogs because writing them is tedious:

Digging through PRs and commits takes forever. Translating technical changes to user-facing language is surprisingly hard. Nobody owns it, so it just... doesn't happen. Users get surprised by changes or miss new features entirely.

The result? Frustrated users, repeated support questions, and missed adoption of new features.
    `.trim(),
    approaches: [
      {
        name: "GitHub App (Recommended)",
        description: "Native GitHub integration that generates changelogs automatically on release",
        buildTime: "1 week",
        complexity: "Medium",
        details: [
          "GitHub App installed at org or repo level",
          "Watches for release events or tagged commits",
          "Reads PR titles, descriptions, and linked issues",
          "Uses Claude to generate friendly changelog copy",
          "Creates release notes or updates CHANGELOG.md via PR",
        ],
        pros: [
          "Native GitHub experience, users stay in their workflow",
          "GitHub Marketplace gives you built-in discovery",
          "Freemium model: free for public, paid for private repos",
          "Gets smarter over time by learning from edited changelogs",
        ],
        cons: [
          "GitHub-only at first (GitLab, Bitbucket come later)",
          "Competitive space, need strong differentiation",
          "GitHub API rate limits on free tier",
        ],
      },
      {
        name: "CLI Tool",
        description: "Command-line tool that generates changelogs from local git history",
        buildTime: "3-4 days",
        complexity: "Low",
        details: [
          "npm package: `npx changelog-ai generate`",
          "Reads git log between tags/dates",
          "Outputs markdown or integrates with existing CHANGELOG.md",
          "Configurable via .changelogrc file",
          "Works offline, runs locally",
        ],
        pros: [
          "Fastest to build, just a CLI wrapper around Claude",
          "Platform agnostic, works with any git host",
          "Privacy-focused since code stays local",
          "Can be part of CI/CD pipelines",
        ],
        cons: [
          "Requires user action, not automatic",
          "Harder to monetize CLI tools",
          "Less viral distribution than marketplace",
        ],
      },
      {
        name: "Web App + Webhooks",
        description: "Dashboard that connects to repos and generates changelogs via webhooks",
        buildTime: "2 weeks",
        complexity: "High",
        details: [
          "OAuth with GitHub/GitLab/Bitbucket",
          "Dashboard to configure repos and preferences",
          "Webhook-based changelog generation",
          "Hosted changelog pages (like changelog.yourapp.com)",
          "Widget embeds for marketing sites",
        ],
        pros: [
          "Full control over user experience",
          "Can offer hosted changelog pages as a differentiator",
          "Multiple VCS support from day one",
          "More features means higher price point",
        ],
        cons: [
          "More infrastructure to maintain",
          "Longer to build, more to go wrong",
          "Users have to leave their workflow to configure",
        ],
      },
    ],
    testPlan: {
      hypothesis: "Developers will pay $9/mo to auto-generate changelogs for private repos",
      validation: [
        {
          phase: "Landing Page Test",
          duration: "1 week",
          actions: [
            "Create landing page with value prop and pricing",
            "Add waitlist signup with 'which repos?' question",
            "Run $100 in GitHub-targeted ads",
            "Target: 50+ signups, 10+ provide repo names",
          ],
          successMetric: "50+ waitlist signups with repo context",
        },
        {
          phase: "Manual MVP",
          duration: "1 week",
          actions: [
            "Reach out to top 10 waitlist signups",
            "Manually generate changelogs for their repos",
            "Gather feedback on quality and usefulness",
            "Ask: 'Would you pay $9/mo for this?'",
          ],
          successMetric: "5+ say they would pay",
        },
        {
          phase: "Beta Launch",
          duration: "2 weeks",
          actions: [
            "Build GitHub App MVP",
            "Launch on Product Hunt and GitHub Marketplace",
            "Offer free tier for public repos",
            "Track: installs, generations, upgrades to paid",
          ],
          successMetric: "100+ installs, 5+ paid conversions",
        },
      ],
      killCriteria: [
        "Fewer than 20 waitlist signups after $100 ad spend",
        "Quality feedback is consistently negative",
        "No interest in paying even after seeing value",
        "Competitive products already nail this",
      ],
    },
  },

  brief: {
    id: "brief",
    name: "Brief",
    tagline: "Vague briefs into structured requirements",
    icon: "🎨",
    color: "#a855f7",
    description: "AI asks clarifying questions and generates structured creative briefs from conversation. Reduce rework from unclear requirements.",
    thesis: "Creative briefs are vague and cause rework. Conversational AI can extract structured requirements through guided questions.",
    problem: `
Creative and agency work suffers from vague briefs:

Clients say "make it pop" or "I'll know it when I see it." Requirements are buried in email threads. Missing info isn't discovered until review rounds. Rework eats into margins (studies show 30-50% of agency time goes here).

The brief is basically the contract. When it's unclear, everyone loses.
    `.trim(),
    approaches: [
      {
        name: "Conversational Web App (Recommended)",
        description: "Chat interface that guides clients through brief creation",
        buildTime: "1 week",
        complexity: "Medium",
        details: [
          "Client-facing chat interface",
          "AI asks clarifying questions based on project type",
          "Extracts structured data: goals, audience, constraints, references",
          "Generates polished brief document (PDF/Notion/Google Doc)",
          "Agency gets notification when brief is complete",
        ],
        pros: [
          "Reuses Guildry's conversation engine patterns",
          "Client-facing means agencies can white-label it",
          "Clear value prop: fewer revision rounds",
          "Can charge per-brief or subscription",
        ],
        cons: [
          "Requires client adoption, they have to actually use the tool",
          "Brief quality depends on client engagement",
          "Competitive with existing brief templates",
        ],
      },
      {
        name: "Email/Slack Parser",
        description: "Parse existing communication to extract brief elements",
        buildTime: "2 weeks",
        complexity: "High",
        details: [
          "Forward client emails or connect Slack channel",
          "AI extracts requirements from unstructured conversation",
          "Highlights gaps: 'Budget not specified', 'Timeline unclear'",
          "Agency fills gaps, generates consolidated brief",
          "Integrates with project management tools",
        ],
        pros: [
          "No client behavior change required",
          "Works with existing communication",
          "Catches requirements that would be missed",
          "Higher value means higher price point",
        ],
        cons: [
          "More complex integration requirements",
          "Privacy concerns with email/Slack access",
          "Quality depends on how complete the communication is",
        ],
      },
      {
        name: "Figma/Notion Plugin",
        description: "Brief creation embedded in tools designers already use",
        buildTime: "1-2 weeks",
        complexity: "Medium",
        details: [
          "Figma plugin: attach brief to design file",
          "Notion template: guided brief creation with AI assist",
          "AI suggests missing sections based on project type",
          "Version history and change tracking",
          "Share link for client review/approval",
        ],
        pros: [
          "Meets users where they already work",
          "Plugin marketplaces for distribution",
          "Natural workflow integration",
          "Can expand to multiple platforms",
        ],
        cons: [
          "Platform-specific builds required",
          "Plugin review/approval delays",
          "More limited than a standalone app",
        ],
      },
    ],
    testPlan: {
      hypothesis: "Agencies will pay $49/mo to reduce brief-related rework by 50%",
      validation: [
        {
          phase: "Problem Validation",
          duration: "1 week",
          actions: [
            "Interview 10 agency owners/project managers",
            "Ask: 'What % of rework is due to unclear briefs?'",
            "Understand current brief process and pain points",
            "Validate willingness to pay for a solution",
          ],
          successMetric: "8/10 confirm significant brief-related rework",
        },
        {
          phase: "Concierge MVP",
          duration: "2 weeks",
          actions: [
            "Partner with 3 agencies for pilot",
            "Manually run brief conversations with their clients",
            "Generate briefs using Claude + templates",
            "Measure: time saved, revision rounds reduced",
          ],
          successMetric: "Demonstrable reduction in revisions or time",
        },
        {
          phase: "Product MVP",
          duration: "2 weeks",
          actions: [
            "Build conversational brief creator",
            "Launch to pilot agencies + waitlist",
            "Track: briefs created, completion rate, agency feedback",
            "Introduce pricing: $49/mo for unlimited briefs",
          ],
          successMetric: "3+ paying agencies, 80%+ brief completion",
        },
      ],
      killCriteria: [
        "Agencies don't see briefs as a significant pain point",
        "Clients refuse to use the tool",
        "Generated briefs aren't better than templates",
        "No willingness to pay at target price",
      ],
    },
  },

  recap: {
    id: "recap",
    name: "Recap",
    tagline: "Structured meeting notes with decisions and owners",
    icon: "📝",
    color: "#3b82f6",
    description: "AI generates consistent recaps with decisions, owners, and next steps. Never miss an action item.",
    thesis: "Meeting notes are inconsistent or missing. Differentiate on structure: decisions, owners, deadlines extracted automatically.",
    problem: `
Meeting notes are broken:

90% of meetings have no notes or terrible notes. Action items get lost in paragraph summaries. There's no accountability ("who said they'd do that?"). Same discussions repeat because decisions aren't recorded.

Existing tools transcribe but don't structure. Transcripts are just more text to read.
    `.trim(),
    approaches: [
      {
        name: "Zoom/Meet/Teams Integration (Recommended)",
        description: "Native integrations that join meetings and generate structured recaps",
        buildTime: "2 weeks",
        complexity: "High",
        details: [
          "Bot joins scheduled meetings automatically",
          "Real-time transcription via existing APIs",
          "Claude extracts: decisions, action items, owners, deadlines",
          "Pushes recap to Slack/email/Notion within minutes",
          "Follow-up reminders for action items",
        ],
        pros: [
          "Validated market, people already pay for meeting tools",
          "Clear differentiation: structure beats raw transcription",
          "High retention potential with team workflows",
          "Obvious upgrade path: analytics, search, etc.",
        ],
        cons: [
          "Competitive market (Otter, Fireflies, tl;dv)",
          "Platform integrations are complex",
          "Privacy concerns with recording",
          "Higher infrastructure costs",
        ],
      },
      {
        name: "Upload + Process",
        description: "Upload existing transcripts or recordings for structured processing",
        buildTime: "1 week",
        complexity: "Low",
        details: [
          "Upload audio/video or paste transcript",
          "AI processes and extracts structured data",
          "Output: decisions, actions, owners in clean format",
          "Export to Notion, email, Slack, etc.",
          "No bot needed, works with any source",
        ],
        pros: [
          "Fastest to build, no integrations needed",
          "Works with any meeting platform",
          "Lower privacy concerns since user controls upload",
          "Can process historical meetings",
        ],
        cons: [
          "Extra step for users, must upload/paste",
          "Not automatic, requires action",
          "Harder to build habit/retention",
        ],
      },
      {
        name: "Slack-First",
        description: "Slack app that creates structured recaps from meeting discussions",
        buildTime: "1 week",
        complexity: "Medium",
        details: [
          "Slack command: /recap #meeting-channel",
          "AI reads channel history and extracts structure",
          "Also works with huddle transcripts",
          "Posts recap directly to channel",
          "Integrates with Slack's native meeting features",
        ],
        pros: [
          "Many teams already discuss in Slack",
          "Slack App Directory distribution",
          "Low friction, no new tool to adopt",
          "Can expand to async decisions too",
        ],
        cons: [
          "Limited to Slack-first teams",
          "Quality depends on how complete the Slack discussion is",
          "Slack's meeting features are limited",
        ],
      },
    ],
    testPlan: {
      hypothesis: "Teams will pay $12/user/mo for structured meeting recaps vs raw transcription",
      validation: [
        {
          phase: "Differentiation Test",
          duration: "1 week",
          actions: [
            "Get 5 meeting transcripts from target users",
            "Generate structured recaps manually",
            "Show users: raw transcript vs structured recap",
            "Ask: 'Which would you pay for? How much more?'",
          ],
          successMetric: "Strong preference for structured, 2x+ willingness to pay",
        },
        {
          phase: "Upload MVP",
          duration: "1 week",
          actions: [
            "Build simple upload, process, output flow",
            "Launch to Product Hunt / Twitter",
            "Offer 10 free recaps, then $10/mo",
            "Track: uploads, conversions, feedback",
          ],
          successMetric: "100+ uploads, 10+ paid conversions",
        },
        {
          phase: "Integration Beta",
          duration: "2 weeks",
          actions: [
            "Build Zoom or Slack integration (pick one)",
            "Partner with 5 teams for beta",
            "Measure: meetings processed, feature requests",
            "Validate team pricing at $12/user/mo",
          ],
          successMetric: "3+ teams willing to pay team pricing",
        },
      ],
      killCriteria: [
        "Users don't see value over raw transcription",
        "Structure extraction quality is inconsistent",
        "Existing players already do this well",
        "Price sensitivity below $8/user/mo",
      ],
    },
  },
};

function ApproachCard({ approach, index, color }) {
  const isRecommended = approach.name.includes("Recommended");

  return (
    <div
      className={`rounded-xl border-2 overflow-hidden ${
        isRecommended ? "ring-2 ring-offset-2" : ""
      }`}
      style={{
        borderColor: isRecommended ? color : "#e2e8f0",
        ringColor: isRecommended ? color : undefined,
      }}
    >
      <div
        className="p-4 border-b"
        style={{
          backgroundColor: isRecommended ? `${color}10` : "#f8fafc",
          borderColor: isRecommended ? `${color}30` : "#e2e8f0",
        }}
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="font-mono text-[10px] text-slate-500">
              Approach {index + 1}
            </span>
            <h3 className="text-lg font-semibold text-slate-800 m-0">
              {approach.name}
            </h3>
          </div>
          {isRecommended && (
            <span
              className="font-mono text-[10px] px-2 py-1 rounded-full"
              style={{ backgroundColor: `${color}20`, color: color }}
            >
              Recommended
            </span>
          )}
        </div>
        <p className="text-sm text-slate-600 m-0">{approach.description}</p>
      </div>

      <div className="p-4 bg-white">
        {/* Build time and complexity */}
        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">⏱️</span>
            <span className="font-mono text-xs text-slate-600">
              {approach.buildTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">📊</span>
            <span className="font-mono text-xs text-slate-600">
              {approach.complexity} complexity
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="mb-4">
          <h4 className="font-mono text-[10px] uppercase text-slate-500 mb-2 m-0">
            Implementation
          </h4>
          <ul className="text-xs text-slate-600 m-0 p-0 list-none space-y-1">
            {approach.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-slate-400 mt-0.5">→</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pros and Cons */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-mono text-[10px] uppercase text-green-600 mb-2 m-0">
              Pros
            </h4>
            <ul className="text-xs text-slate-600 m-0 p-0 list-none space-y-1">
              {approach.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">+</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase text-red-600 mb-2 m-0">
              Cons
            </h4>
            <ul className="text-xs text-slate-600 m-0 p-0 list-none space-y-1">
              {approach.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">−</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ValidationPhase({ phase, index, color }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-mono text-sm font-bold"
          style={{ backgroundColor: color }}
        >
          {index + 1}
        </div>
        {index < 2 && <div className="w-0.5 flex-1 bg-slate-200 mt-2" />}
      </div>
      <div className="flex-1 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <h4 className="font-semibold text-slate-800 m-0">{phase.phase}</h4>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500">
            {phase.duration}
          </span>
        </div>
        <ul className="text-sm text-slate-600 m-0 p-0 list-none space-y-1 mb-3">
          {phase.actions.map((action, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-slate-400">•</span>
              <span>{action}</span>
            </li>
          ))}
        </ul>
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono"
          style={{ backgroundColor: `${color}15`, color: color }}
        >
          <span>✓</span>
          <span>{phase.successMetric}</span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const params = useParams();
  const project = PROJECT_DETAILS[params.id];

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-slate-800 mb-4">
          Project not found
        </h1>
        <p className="text-slate-600 mb-8">
          This project doesn't have a detail page yet.
        </p>
        <Link
          href="/projects"
          className="font-mono text-sm text-indigo-600 hover:text-indigo-700"
        >
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <Link
          href="/projects"
          className="font-mono text-[11px] text-slate-500 hover:text-slate-700 no-underline mb-4 inline-block"
        >
          ← Back to Projects
        </Link>
        <div className="flex items-start gap-4 mb-4">
          <span className="text-5xl">{project.icon}</span>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 text-gradient m-0">
              {project.name}
            </h1>
            <p className="text-lg text-slate-600 m-0">{project.tagline}</p>
          </div>
        </div>
      </div>

      {/* Thesis & Problem */}
      <section className="mb-12">
        <div
          className="rounded-xl border-2 p-6 mb-6"
          style={{
            borderColor: `${project.color}40`,
            backgroundColor: `${project.color}05`,
          }}
        >
          <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] mb-3 m-0" style={{ color: project.color }}>
            Thesis
          </h2>
          <p className="text-lg text-slate-700 m-0 leading-relaxed">
            {project.thesis}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 p-6 bg-white">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500 mb-3 m-0">
            The Problem
          </h2>
          <p className="text-sm text-slate-600 whitespace-pre-line m-0 leading-relaxed">
            {project.problem}
          </p>
        </div>
      </section>

      {/* Implementation Approaches */}
      <section className="mb-12">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500 mb-6">
          Implementation Approaches
        </h2>
        <div className="space-y-6">
          {project.approaches.map((approach, i) => (
            <ApproachCard
              key={i}
              approach={approach}
              index={i}
              color={project.color}
            />
          ))}
        </div>
      </section>

      {/* Test Plan */}
      <section className="mb-12">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500 mb-6">
          Validation Plan
        </h2>

        {/* Hypothesis */}
        <div
          className="rounded-xl border-2 p-6 mb-6"
          style={{
            borderColor: `${project.color}40`,
            backgroundColor: `${project.color}05`,
          }}
        >
          <h3 className="font-mono text-[11px] uppercase mb-2 m-0" style={{ color: project.color }}>
            Hypothesis to Test
          </h3>
          <p className="text-lg text-slate-700 m-0 font-medium">
            {project.testPlan.hypothesis}
          </p>
        </div>

        {/* Validation Phases */}
        <div className="rounded-xl border border-slate-200 p-6 bg-white mb-6">
          <h3 className="font-mono text-[11px] uppercase text-slate-500 mb-6 m-0">
            Validation Phases
          </h3>
          <div>
            {project.testPlan.validation.map((phase, i) => (
              <ValidationPhase
                key={i}
                phase={phase}
                index={i}
                color={project.color}
              />
            ))}
          </div>
        </div>

        {/* Kill Criteria */}
        <div className="rounded-xl border border-red-200 p-6 bg-red-50">
          <h3 className="font-mono text-[11px] uppercase text-red-600 mb-4 m-0">
            Kill Criteria
          </h3>
          <p className="text-xs text-slate-600 mb-4 m-0">
            Stop and move on if any of these become true:
          </p>
          <ul className="text-sm text-slate-700 m-0 p-0 list-none space-y-2">
            {project.testPlan.killCriteria.map((criteria, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✕</span>
                <span>{criteria}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-slate-200 flex justify-between items-center">
        <Link
          href="/projects"
          className="font-mono text-[10px] text-slate-500 no-underline hover:text-slate-700"
        >
          ← Back to Projects
        </Link>
        <Link
          href="/methodology"
          className="font-mono text-[10px] text-slate-500 no-underline hover:text-slate-700"
        >
          View Methodology →
        </Link>
      </footer>
    </div>
  );
}
