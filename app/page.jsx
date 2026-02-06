"use client";

export default function EthosPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-600">
          Concept Brief
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2 mb-4 text-gradient-warm">
          Solo AI Product Incubator
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
          AI has collapsed the time and cost to build software. What used to take a team months
          now takes one person days. This creates two simultaneous opportunities.
        </p>
      </div>

      {/* The Premise */}
      <section className="mb-16">
        <div className="rounded-xl border border-slate-200 p-6 bg-slate-50">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500 mb-4 mt-0">
            The Premise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg p-4 border border-slate-200 bg-white">
              <div className="text-2xl mb-2">🔧</div>
              <h3 className="font-mono text-sm font-semibold text-slate-800 mb-2 mt-0">
                Build AI-powered tools
              </h3>
              <p className="text-xs text-slate-600 m-0 leading-relaxed">
                Find existing processes that are painful, slow, or error-prone. Build tools that
                fundamentally change what's possible — not just faster or cheaper, but structurally different.
              </p>
            </div>
            <div className="rounded-lg p-4 border border-slate-200 bg-white">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="font-mono text-sm font-semibold text-slate-800 mb-2 mt-0">
                Develop a repeatable system
              </h3>
              <p className="text-xs text-slate-600 m-0 leading-relaxed">
                The process of building and validating tools becomes a methodology that itself
                becomes a product. The system improves with every cycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Three Layers - Visual */}
      <section className="mb-16">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500 mb-6">
          The Model
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          Three layers that feed each other. Each layer stands on its own. None depends on personal
          brand — the products, the system, and the ecosystem are the value.
        </p>

        {/* Layer Diagram */}
        <div className="rounded-xl border border-slate-200 p-8 bg-slate-50 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {/* Layer 1 */}
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full border-4 border-teal-500 bg-white flex flex-col items-center justify-center shadow-sm">
                <span className="text-2xl">🏭</span>
                <span className="font-mono text-[10px] font-bold text-teal-600 mt-1">INCUBATOR</span>
              </div>
              <span className="font-mono text-xs text-slate-500 mt-2">Layer 1</span>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex flex-col items-center gap-1">
              <svg className="w-12 h-6 text-slate-300" viewBox="0 0 48 24">
                <path d="M0 12 H40 M32 4 L44 12 L32 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-[9px] text-slate-400 font-mono">feeds</span>
            </div>
            <div className="md:hidden text-slate-300 text-xl">↓</div>

            {/* Layer 2 */}
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full border-4 border-indigo-500 bg-white flex flex-col items-center justify-center shadow-sm">
                <span className="text-2xl">⚙️</span>
                <span className="font-mono text-[10px] font-bold text-indigo-600 mt-1">WORKFLOW</span>
              </div>
              <span className="font-mono text-xs text-slate-500 mt-2">Layer 2</span>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex flex-col items-center gap-1">
              <svg className="w-12 h-6 text-slate-300" viewBox="0 0 48 24">
                <path d="M0 12 H40 M32 4 L44 12 L32 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-[9px] text-slate-400 font-mono">feeds</span>
            </div>
            <div className="md:hidden text-slate-300 text-xl">↓</div>

            {/* Layer 3 */}
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full border-4 border-amber-500 bg-white flex flex-col items-center justify-center shadow-sm">
                <span className="text-2xl">🌐</span>
                <span className="font-mono text-[10px] font-bold text-amber-600 mt-1">ECOSYSTEM</span>
              </div>
              <span className="font-mono text-xs text-slate-500 mt-2">Layer 3</span>
            </div>
          </div>

          {/* Feedback loops */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <span className="font-mono">↺</span>
              <span>Each layer improves the others. Results compound across the system.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Layer 1: The Incubator */}
      <section className="mb-12">
        <div className="rounded-xl border-2 border-teal-200 overflow-hidden">
          <div className="p-5 bg-teal-50 border-b border-teal-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center text-white font-mono font-bold">
                1
              </div>
              <div>
                <h3 className="m-0 text-lg font-semibold text-slate-800">The Incubator</h3>
                <span className="font-mono text-[10px] text-teal-600">~1 MVP per week</span>
              </div>
            </div>
          </div>
          <div className="p-5 bg-white">
            <p className="text-sm text-slate-600 mb-4 m-0">
              A one-person product studio. The thesis for every project is the same: find an existing
              process that's painful, and build an AI-native tool that fundamentally changes the equation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="rounded-lg p-4 border border-slate-200 bg-slate-50">
                <h4 className="font-mono text-[10px] uppercase text-slate-500 mb-2 m-0">Inputs</h4>
                <ul className="text-xs text-slate-600 m-0 p-0 list-none space-y-1">
                  <li>• Process pain points from experience & observation</li>
                  <li>• Reusable build patterns that improve each cycle</li>
                  <li>• Evaluation frameworks that sharpen over time</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 border border-slate-200 bg-slate-50">
                <h4 className="font-mono text-[10px] uppercase text-slate-500 mb-2 m-0">Outputs</h4>
                <ul className="text-xs text-slate-600 m-0 p-0 list-none space-y-1">
                  <li>• Deployed MVPs with minimum viable distribution</li>
                  <li>• Kill/continue decisions with real data</li>
                  <li>• Documented thesis, build time, and signal</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg p-3 border border-teal-200 bg-teal-50">
              <p className="text-xs text-slate-600 m-0">
                <span className="font-mono font-semibold text-teal-700">Constraint:</span> Clear pain point,
                AI changes the game, path to revenue without a sales team, buildable and testable by one person.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Layer 2: The Workflow Engine */}
      <section className="mb-12">
        <div className="rounded-xl border-2 border-indigo-200 overflow-hidden">
          <div className="p-5 bg-indigo-50 border-b border-indigo-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-mono font-bold">
                2
              </div>
              <div>
                <h3 className="m-0 text-lg font-semibold text-slate-800">The Workflow Engine</h3>
                <span className="font-mono text-[10px] text-indigo-600">The system becomes the product</span>
              </div>
            </div>
          </div>
          <div className="p-5 bg-white">
            <p className="text-sm text-slate-600 mb-4 m-0">
              The incubator runs on a system: idea sourcing, evaluation, build process, distribution approach,
              signal reading, portfolio decisions. That system improves with every cycle.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="rounded-lg p-4 border border-slate-200 bg-slate-50">
                <h4 className="font-mono text-[10px] uppercase text-slate-500 mb-2 m-0">Inputs</h4>
                <ul className="text-xs text-slate-600 m-0 p-0 list-none space-y-1">
                  <li>• Operational data from Layer 1 — what worked, what failed, why</li>
                  <li>• How long things actually took</li>
                  <li>• Which distribution channels produced signal</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 border border-slate-200 bg-slate-50">
                <h4 className="font-mono text-[10px] uppercase text-slate-500 mb-2 m-0">Outputs</h4>
                <ul className="text-xs text-slate-600 m-0 p-0 list-none space-y-1">
                  <li>• Proven, documented methodology</li>
                  <li>• Tooling and templates for others</li>
                  <li>• Track record that speaks for itself</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg p-3 border border-indigo-200 bg-indigo-50">
              <p className="text-xs text-slate-600 m-0">
                <span className="font-mono font-semibold text-indigo-700">Audience:</span> Product managers,
                consultants, agency owners, independent operators — anyone trying to figure out how to build with AI effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Layer 3: The Ecosystem */}
      <section className="mb-16">
        <div className="rounded-xl border-2 border-amber-200 overflow-hidden">
          <div className="p-5 bg-amber-50 border-b border-amber-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-white font-mono font-bold">
                3
              </div>
              <div>
                <h3 className="m-0 text-lg font-semibold text-slate-800">The Ecosystem</h3>
                <span className="font-mono text-[10px] text-amber-600">Connected tools create compounding value</span>
              </div>
            </div>
          </div>
          <div className="p-5 bg-white">
            <p className="text-sm text-slate-600 mb-4 m-0">
              As the tool portfolio grows, natural patterns emerge. The tools share a common philosophy about
              how AI should augment existing processes. That shared DNA creates interoperability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="rounded-lg p-4 border border-slate-200 bg-slate-50">
                <h4 className="font-mono text-[10px] uppercase text-slate-500 mb-2 m-0">Inputs</h4>
                <ul className="text-xs text-slate-600 m-0 p-0 list-none space-y-1">
                  <li>• Strongest tools with proven traction</li>
                  <li>• Methodology defining how tools relate</li>
                  <li>• Market signal about which combinations users want</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 border border-slate-200 bg-slate-50">
                <h4 className="font-mono text-[10px] uppercase text-slate-500 mb-2 m-0">Outputs</h4>
                <ul className="text-xs text-slate-600 m-0 p-0 list-none space-y-1">
                  <li>• Integrated platform with compounding value</li>
                  <li>• Data-and-platform agnostic system</li>
                  <li>• Distribution leverage for new tools</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg p-3 border border-amber-200 bg-amber-50">
              <p className="text-xs text-slate-600 m-0">
                <span className="font-mono font-semibold text-amber-700">Shape:</span> The specific ecosystem
                reveals itself through incubator work rather than being predetermined.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Principles */}
      <section className="mb-16">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500 mb-6">
          Key Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Revenue is a learning signal",
              body: "Every cycle pushes toward a transaction as fast as possible — not because the money matters at small scale, but because willingness to pay is the highest-fidelity signal for whether a problem is real.",
              icon: "💰",
            },
            {
              title: "The products are the product",
              body: "The founder is not the brand. Each tool has to sell itself on the strength of the problem it solves. This makes everything more durable, more sellable, and more scalable.",
              icon: "📦",
            },
            {
              title: "Volume with intention",
              body: "One MVP per week is ambitious but sustainable. Some weeks produce multiple quick tests. Some weeks a project earns a second cycle. The rhythm is consistent but not rigid.",
              icon: "🎯",
            },
            {
              title: "Let most things fail",
              body: "Portfolio value comes from the combination of wins, deliberate kills, and pivots — each with clear reasoning and real data. The methodology is proven by the full distribution of outcomes.",
              icon: "📊",
            },
            {
              title: "The system improves itself",
              body: "Every cycle makes the next cycle better. Build kits accumulate patterns. Evaluation sharpens. Distribution channels get tested and ranked. The compounding isn't just in revenue.",
              icon: "🔄",
            },
          ].map((item, i) => (
            <div key={i} className="rounded-xl p-5 border border-slate-200 bg-slate-50">
              <div className="flex items-start gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <h3 className="font-mono text-sm font-semibold text-slate-800 mb-2 mt-0">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed m-0">{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What This Is Not */}
      <section className="mb-16">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500 mb-6">
          What This Is Not
        </h2>
        <div className="rounded-xl border border-slate-200 p-6 bg-slate-50">
          <div className="flex flex-wrap gap-3">
            {[
              "A content play",
              "A personal brand exercise",
              "A single product bet",
              "A services business",
            ].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-red-200 bg-red-50 text-xs text-red-700 font-mono"
              >
                <span className="text-red-400">✕</span>
                {item}
              </span>
            ))}
          </div>
          <p className="text-sm text-slate-600 mt-4 m-0">
            It's a system for continuously generating, testing, and scaling AI-powered tools — where
            the system itself becomes as valuable as any individual tool it produces.
          </p>
        </div>
      </section>

      {/* Open Questions */}
      <section className="mb-16">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500 mb-6">
          Open Questions
        </h2>
        <div className="space-y-3">
          {[
            "How should kill/continue decisions be structured to balance learning value against revenue potential?",
            "What's the right distribution strategy when each tool needs to stand on its own without personal brand behind it?",
            "At what point does the Layer 2 methodology have enough proof behind it to productize? What does \"enough\" look like?",
            "When and how does Layer 3 transition from emergent pattern to deliberate product strategy?",
            "What's the right balance between exploring new ideas and investing deeper in ones showing traction?",
          ].map((question, i) => (
            <div key={i} className="rounded-xl p-4 border border-slate-200 bg-white">
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs text-slate-400 mt-0.5">{i + 1}.</span>
                <p className="text-sm text-slate-600 m-0">{question}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Current Projects */}
      <section className="border-t border-slate-200 pt-12 mb-16">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500 mb-6">
          Active Project
        </h2>
        <a
          href="https://guildry.paulb.pro"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl p-6 border border-teal-200 bg-teal-50 no-underline hover:border-teal-300 hover:shadow-sm transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📐</span>
            <div>
              <h3 className="font-mono text-lg font-semibold text-slate-800 m-0">Guildry</h3>
              <span className="font-mono text-[10px] text-teal-600">Layer 1 · In Progress</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 m-0">
            Project intelligence for agencies. Scope, staff, deliver, and learn from every project.
            A system that gets smarter with each project you close.
          </p>
        </a>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-slate-200 flex justify-between items-center">
        <span className="font-mono text-[10px] text-slate-500">
          Solo AI Product Incubator
        </span>
        <span className="font-mono text-[10px] text-slate-500">
          Feb 2026
        </span>
      </footer>
    </div>
  );
}
