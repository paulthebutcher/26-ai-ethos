"use client";

// Log entries - newest first
// Add new entries at the top of this array
const LOG_ENTRIES = [
  {
    date: "2026-02-06",
    title: "Ethos site launched",
    project: "ethos",
    content: `
- Created standalone ethos site to document the Solo AI Product Incubator model
- Built /projects page to track active experiments with status badges
- Set up /log page (this one) for ongoing documentation
- Established weekly log workflow: Monday reminder → Sunday review → publish
    `.trim(),
    decisions: [
      "Keep ethos site separate from guildry and public-brief - each project gets its own repo/deploy",
      "Use markdown-style content in JS for now - low overhead, version controlled",
      "Weekly log cadence with session-start prompts to capture notes throughout the week",
    ],
    learnings: [
      "AI-assisted development is 10-20x faster than traditional estimates - Phase 0 took half a day vs 3 week estimate",
      "Discovery-first approach beats rigid upfront schemas - let AI conversations reveal what data matters",
    ],
  },
  {
    date: "2026-02-06",
    title: "Guildry Phase 0 complete",
    project: "guildry",
    content: `
- Completed foundation: Clerk auth, Supabase with RLS, Claude API integration
- AI can create clients via natural language conversation
- Fixed schema mismatches (org_id vs organization_id) across codebase
- Consolidated documentation into /docs folder
    `.trim(),
    decisions: [
      "Pivot Phase 1 from 17-PR waterfall to discovery-first approach",
      "Let AI conversations reveal what data structure clients actually need before locking schemas",
      "Skip Sentry for now - add before production launch with real users",
    ],
    learnings: [
      "Build guides can be overspecified - risk building rigid models that don't match real workflows",
      "The 'target schema' pattern (AI extracts structured data via function calling) is flexible enough to evolve",
    ],
  },
];

// Methodology section
const METHODOLOGY = {
  evaluation: {
    criteria: [
      "Clear, specific pain point (not vague 'would be nice')",
      "AI fundamentally changes what's possible (not just automation)",
      "Path to revenue without a sales team",
      "Buildable and testable by one person",
      "Can reach signal (revenue or clear kill reason) in 2-4 weeks",
    ],
    redFlags: [
      "'Lots of people might want this' (too vague)",
      "Requires marketplace dynamics or network effects",
      "Needs enterprise sales motion",
      "Can't articulate who pays and why",
    ],
  },
  killContinue: {
    continue: [
      "Someone paid (strongest signal)",
      "Clear path to payment with specific blockers identified",
      "Learning value justifies another cycle",
    ],
    kill: [
      "No usage despite distribution effort",
      "Users engage but won't pay (vitamin not painkiller)",
      "Technical or market assumption invalidated",
      "Better opportunity identified",
    ],
  },
  distribution: [
    { channel: "Product Hunt", status: "untested" },
    { channel: "Indie Hackers", status: "untested" },
    { channel: "Twitter/X", status: "untested" },
    { channel: "Cold outreach", status: "untested" },
    { channel: "Content/SEO", status: "untested" },
  ],
};

function LogEntry({ entry }) {
  const projectColors = {
    guildry: "#0d9488",
    ethos: "#4f46e5",
  };
  const color = projectColors[entry.project] || "#64748b";

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
      <div className="p-5 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-mono text-base font-semibold text-slate-800 m-0">{entry.title}</h3>
          <span className="font-mono text-[10px] text-slate-400">{entry.date}</span>
        </div>
        <span
          className="font-mono text-[10px] px-2 py-0.5 rounded"
          style={{ color, backgroundColor: `${color}15` }}
        >
          {entry.project}
        </span>
      </div>
      <div className="p-5">
        <div className="text-sm text-slate-600 whitespace-pre-line mb-4">{entry.content}</div>

        {entry.decisions && entry.decisions.length > 0 && (
          <div className="mb-4">
            <h4 className="font-mono text-[10px] uppercase text-slate-500 mb-2 m-0">Decisions</h4>
            <ul className="text-xs text-slate-600 m-0 p-0 list-none space-y-1">
              {entry.decisions.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">→</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {entry.learnings && entry.learnings.length > 0 && (
          <div>
            <h4 className="font-mono text-[10px] uppercase text-slate-500 mb-2 m-0">Learnings</h4>
            <ul className="text-xs text-slate-600 m-0 p-0 list-none space-y-1">
              {entry.learnings.map((l, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">◆</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LogPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-indigo-600">
          Running Record
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2 mb-4 text-gradient">
          Log
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
          Decisions, learnings, and progress across the incubator. Updated weekly.
        </p>
      </div>

      {/* Methodology Toggle */}
      <details className="mb-12 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
        <summary className="p-5 cursor-pointer font-mono text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
          📋 Methodology & Frameworks
        </summary>
        <div className="p-5 pt-0 border-t border-slate-200 bg-white">
          {/* Evaluation */}
          <div className="mb-6">
            <h4 className="font-mono text-[11px] uppercase text-slate-500 mb-3 m-0">
              Idea Evaluation Criteria
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg p-4 border border-green-200 bg-green-50">
                <h5 className="font-mono text-[10px] text-green-700 mb-2 m-0">✓ Start if</h5>
                <ul className="text-xs text-slate-600 m-0 p-0 list-none space-y-1">
                  {METHODOLOGY.evaluation.criteria.map((c, i) => (
                    <li key={i}>• {c}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg p-4 border border-red-200 bg-red-50">
                <h5 className="font-mono text-[10px] text-red-700 mb-2 m-0">✗ Red flags</h5>
                <ul className="text-xs text-slate-600 m-0 p-0 list-none space-y-1">
                  {METHODOLOGY.evaluation.redFlags.map((r, i) => (
                    <li key={i}>• {r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Kill/Continue */}
          <div className="mb-6">
            <h4 className="font-mono text-[11px] uppercase text-slate-500 mb-3 m-0">
              Kill / Continue Framework
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg p-4 border border-teal-200 bg-teal-50">
                <h5 className="font-mono text-[10px] text-teal-700 mb-2 m-0">Continue if</h5>
                <ul className="text-xs text-slate-600 m-0 p-0 list-none space-y-1">
                  {METHODOLOGY.killContinue.continue.map((c, i) => (
                    <li key={i}>• {c}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg p-4 border border-slate-200 bg-slate-50">
                <h5 className="font-mono text-[10px] text-slate-700 mb-2 m-0">Kill if</h5>
                <ul className="text-xs text-slate-600 m-0 p-0 list-none space-y-1">
                  {METHODOLOGY.killContinue.kill.map((k, i) => (
                    <li key={i}>• {k}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3 m-0 italic">
              Never kill just because it's hard. Kill because the thesis is wrong.
            </p>
          </div>

          {/* Distribution */}
          <div>
            <h4 className="font-mono text-[11px] uppercase text-slate-500 mb-3 m-0">
              Distribution Channels
            </h4>
            <div className="flex flex-wrap gap-2">
              {METHODOLOGY.distribution.map((d, i) => (
                <span
                  key={i}
                  className="font-mono text-[10px] px-2 py-1 rounded border border-slate-200 bg-white text-slate-600"
                >
                  {d.channel}
                  <span className="ml-1 text-slate-400">({d.status})</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </details>

      {/* Log Entries */}
      <section>
        <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500 mb-6">
          Entries
        </h2>
        <div className="space-y-6">
          {LOG_ENTRIES.map((entry, i) => (
            <LogEntry key={i} entry={entry} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-slate-200 flex justify-between items-center">
        <a href="/" className="font-mono text-[10px] text-slate-500 no-underline hover:text-slate-700">
          ← Back to Ethos
        </a>
        <span className="font-mono text-[10px] text-slate-500">
          {LOG_ENTRIES.length} entries
        </span>
      </footer>
    </div>
  );
}
