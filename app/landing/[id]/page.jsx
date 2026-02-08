"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Landing page data for each project
const LANDING_DATA = {
  "smart-cms": {
    emoji: "🌐",
    name: "Smart CMS",
    tagline: "Migrate sites in minutes, not months",
    headline: "Your old website content, perfectly restructured for any platform",
    subheadline: "Smart CMS uses AI to analyze your existing site, extract content intelligently, and migrate it to your new CMS with proper structure intact.",
    problem: {
      title: "Site migrations are painful",
      points: [
        "Manual copy-paste takes weeks of tedious work",
        "Content structure gets lost in translation",
        "Media files end up scattered and broken",
        "SEO metadata disappears completely",
      ],
    },
    solution: {
      title: "AI-powered content extraction",
      description: "Smart CMS crawls your existing site, understands content relationships, and exports everything in clean, structured formats ready for import.",
    },
    features: [
      { icon: "🔍", title: "Intelligent Crawling", desc: "Automatically discovers all pages, posts, and media" },
      { icon: "🧠", title: "Content Understanding", desc: "AI identifies headers, body, metadata, and relationships" },
      { icon: "📦", title: "Clean Export", desc: "Outputs to JSON, Markdown, or direct CMS import" },
      { icon: "🔗", title: "Link Preservation", desc: "Maintains internal links and redirects" },
    ],
    cta: "Get early access",
    color: "sky",
  },
  changelog: {
    emoji: "📋",
    name: "Changelog",
    tagline: "Ship updates, skip the writing",
    headline: "Generate polished changelogs from your Git commits",
    subheadline: "Connect your repo and get beautiful, user-friendly release notes automatically. No more staring at commit logs trying to summarize what changed.",
    problem: {
      title: "Writing changelogs is a chore",
      points: [
        "Commits are cryptic and technical",
        "Summarizing changes takes forever",
        "Easy to miss important updates",
        "Formatting is inconsistent",
      ],
    },
    solution: {
      title: "From commits to content",
      description: "Changelog reads your Git history, understands what changed and why, then writes human-readable release notes your users will actually understand.",
    },
    features: [
      { icon: "🔗", title: "Git Integration", desc: "Connects to GitHub, GitLab, or Bitbucket" },
      { icon: "✍️", title: "Smart Summaries", desc: "Turns technical commits into plain English" },
      { icon: "🏷️", title: "Auto Categorization", desc: "Groups by features, fixes, and improvements" },
      { icon: "📤", title: "Publish Anywhere", desc: "Export to Notion, Markdown, or your docs" },
    ],
    cta: "Join the waitlist",
    color: "indigo",
  },
  brief: {
    emoji: "🎨",
    name: "Brief",
    tagline: "Better briefs, better work",
    headline: "Turn vague requests into actionable creative briefs",
    subheadline: "Brief asks the right questions and structures the answers into comprehensive creative briefs that actually guide the work.",
    problem: {
      title: "Briefs are always incomplete",
      points: [
        "Stakeholders don't know what info you need",
        "Back-and-forth takes days",
        "Important details slip through cracks",
        "Every project starts with confusion",
      ],
    },
    solution: {
      title: "Guided brief creation",
      description: "Brief conducts intelligent intake interviews, asks follow-up questions, and assembles everything into structured briefs your team can actually use.",
    },
    features: [
      { icon: "💬", title: "Smart Interviews", desc: "AI-guided questions that adapt to responses" },
      { icon: "📝", title: "Structured Output", desc: "Consistent brief format every time" },
      { icon: "🎯", title: "Gap Detection", desc: "Identifies missing info before work starts" },
      { icon: "📎", title: "Asset Collection", desc: "Gathers reference files and examples" },
    ],
    cta: "Get early access",
    color: "rose",
  },
  intake: {
    emoji: "🎙️",
    name: "Intake",
    tagline: "Discovery calls that capture everything",
    headline: "Transform client conversations into structured project specs",
    subheadline: "Intake joins your discovery calls, captures the conversation, and extracts requirements, constraints, and deliverables into organized documentation.",
    problem: {
      title: "Discovery calls are messy",
      points: [
        "Note-taking distracts from listening",
        "Key requirements get forgotten",
        "Follow-up questions slip your mind",
        "Translating notes to specs takes hours",
      ],
    },
    solution: {
      title: "AI-powered discovery",
      description: "Intake captures your client conversations, identifies requirements and constraints, and generates structured project specifications automatically.",
    },
    features: [
      { icon: "🎤", title: "Meeting Capture", desc: "Records and transcribes discovery calls" },
      { icon: "📊", title: "Requirement Extraction", desc: "Pulls out goals, constraints, deliverables" },
      { icon: "❓", title: "Gap Analysis", desc: "Identifies topics you didn't cover" },
      { icon: "📄", title: "Spec Generation", desc: "Creates project specs from conversations" },
    ],
    cta: "Join the waitlist",
    color: "amber",
  },
  drift: {
    emoji: "📊",
    name: "Drift",
    tagline: "Catch scope creep before it catches you",
    headline: "Track every change from original scope to final delivery",
    subheadline: "Drift monitors your project communications and flags when requests drift from the original agreement, so you can address it early.",
    problem: {
      title: "Scope creep kills projects",
      points: [
        "Small asks add up invisibly",
        "Hard to remember what was agreed",
        "Awkward to push back on clients",
        "Profitability erodes silently",
      ],
    },
    solution: {
      title: "Automatic drift detection",
      description: "Drift compares incoming requests against original scope documents and alerts you when things start to wander, with data to back up the conversation.",
    },
    features: [
      { icon: "📋", title: "Scope Baseline", desc: "Upload SOW, contracts, or meeting notes" },
      { icon: "👀", title: "Request Monitoring", desc: "Watches emails, Slack, and task tools" },
      { icon: "⚠️", title: "Drift Alerts", desc: "Flags requests outside original scope" },
      { icon: "💰", title: "Impact Tracking", desc: "Shows cumulative time and cost drift" },
    ],
    cta: "Get early access",
    color: "orange",
  },
  handoff: {
    emoji: "🤝",
    name: "Handoff",
    tagline: "Smooth transitions, happy clients",
    headline: "Create perfect project handoff packages automatically",
    subheadline: "Handoff assembles everything your client needs: credentials, documentation, training materials, and next steps in one organized package.",
    problem: {
      title: "Handoffs are always chaotic",
      points: [
        "Scrambling to gather credentials",
        "Documentation is scattered everywhere",
        "Clients don't know how to use what you built",
        "Support requests flood in after launch",
      ],
    },
    solution: {
      title: "Automated handoff packages",
      description: "Handoff pulls together project artifacts, generates documentation, and creates client-ready packages that reduce post-launch support.",
    },
    features: [
      { icon: "🔐", title: "Credential Vault", desc: "Secure collection of all access info" },
      { icon: "📚", title: "Auto Documentation", desc: "Generates guides from project files" },
      { icon: "🎓", title: "Training Materials", desc: "Creates walkthroughs and tutorials" },
      { icon: "✅", title: "Launch Checklist", desc: "Ensures nothing gets missed" },
    ],
    cta: "Join the waitlist",
    color: "emerald",
  },
  terms: {
    emoji: "📜",
    name: "Terms",
    tagline: "Contracts in plain English",
    headline: "Generate clear, fair contracts from simple conversations",
    subheadline: "Terms asks about your project, explains legal concepts in plain language, and generates contracts that protect both parties without the legalese.",
    problem: {
      title: "Contracts are intimidating",
      points: [
        "Legal jargon is impossible to parse",
        "Templates don't fit your situation",
        "Lawyers are expensive for small projects",
        "DIY contracts miss important clauses",
      ],
    },
    solution: {
      title: "Conversational contract creation",
      description: "Terms guides you through what matters, explains the tradeoffs, and generates professional contracts tailored to your specific project.",
    },
    features: [
      { icon: "💬", title: "Plain Language", desc: "Explains clauses in terms you understand" },
      { icon: "⚖️", title: "Fair Balance", desc: "Protects both you and your client" },
      { icon: "🎯", title: "Project Specific", desc: "Adapts to your actual scope and terms" },
      { icon: "📝", title: "Easy Edits", desc: "Modify sections with natural language" },
    ],
    cta: "Get early access",
    color: "violet",
  },
  forecast: {
    emoji: "📈",
    name: "Forecast",
    tagline: "Predict project outcomes with confidence",
    headline: "Know which projects will succeed before you start",
    subheadline: "Forecast analyzes your historical project data to predict timelines, profitability, and risk factors for new opportunities.",
    problem: {
      title: "Estimation is guesswork",
      points: [
        "Every project feels unique",
        "Historical data sits unused",
        "Gut feelings aren't reliable",
        "Bad estimates hurt profitability",
      ],
    },
    solution: {
      title: "Data-driven predictions",
      description: "Forecast learns from your past projects to predict outcomes for new ones, giving you confidence before you commit.",
    },
    features: [
      { icon: "📊", title: "Pattern Learning", desc: "Analyzes your historical project data" },
      { icon: "⏱️", title: "Timeline Prediction", desc: "Estimates realistic completion dates" },
      { icon: "💵", title: "Profitability Score", desc: "Predicts margin based on similar projects" },
      { icon: "🚨", title: "Risk Flagging", desc: "Identifies potential problem patterns" },
    ],
    cta: "Join the waitlist",
    color: "cyan",
  },
  audit: {
    emoji: "🔍",
    name: "Audit",
    tagline: "Learn from every project",
    headline: "Automatic retrospectives that actually improve your process",
    subheadline: "Audit reviews your completed projects, identifies what worked and what didn't, and suggests concrete process improvements.",
    problem: {
      title: "Retros don't happen",
      points: [
        "Team moves on to next project immediately",
        "Same mistakes keep repeating",
        "No time to analyze what worked",
        "Learnings don't translate to changes",
      ],
    },
    solution: {
      title: "Automated project analysis",
      description: "Audit examines your project history, communication patterns, and outcomes to surface insights and recommend improvements you can actually implement.",
    },
    features: [
      { icon: "🔬", title: "Deep Analysis", desc: "Reviews timelines, comms, and outcomes" },
      { icon: "💡", title: "Pattern Detection", desc: "Finds recurring issues across projects" },
      { icon: "📋", title: "Actionable Insights", desc: "Specific recommendations, not vague advice" },
      { icon: "📈", title: "Progress Tracking", desc: "Measures improvement over time" },
    ],
    cta: "Get early access",
    color: "teal",
  },
};

const COLOR_SCHEMES = {
  sky: {
    gradient: "from-sky-400 to-blue-500",
    light: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-600",
    button: "bg-sky-500 hover:bg-sky-600",
    glow: "from-sky-400 to-blue-500",
  },
  indigo: {
    gradient: "from-indigo-400 to-purple-500",
    light: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-600",
    button: "bg-indigo-500 hover:bg-indigo-600",
    glow: "from-indigo-400 to-purple-500",
  },
  rose: {
    gradient: "from-rose-400 to-pink-500",
    light: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-600",
    button: "bg-rose-500 hover:bg-rose-600",
    glow: "from-rose-400 to-pink-500",
  },
  amber: {
    gradient: "from-amber-400 to-orange-500",
    light: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-600",
    button: "bg-amber-500 hover:bg-amber-600",
    glow: "from-amber-400 to-orange-500",
  },
  orange: {
    gradient: "from-orange-400 to-red-500",
    light: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-600",
    button: "bg-orange-500 hover:bg-orange-600",
    glow: "from-orange-400 to-red-500",
  },
  emerald: {
    gradient: "from-emerald-400 to-green-500",
    light: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-600",
    button: "bg-emerald-500 hover:bg-emerald-600",
    glow: "from-emerald-400 to-green-500",
  },
  violet: {
    gradient: "from-violet-400 to-purple-500",
    light: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-600",
    button: "bg-violet-500 hover:bg-violet-600",
    glow: "from-violet-400 to-purple-500",
  },
  cyan: {
    gradient: "from-cyan-400 to-teal-500",
    light: "bg-cyan-50",
    border: "border-cyan-200",
    text: "text-cyan-600",
    button: "bg-cyan-500 hover:bg-cyan-600",
    glow: "from-cyan-400 to-teal-500",
  },
  teal: {
    gradient: "from-teal-400 to-emerald-500",
    light: "bg-teal-50",
    border: "border-teal-200",
    text: "text-teal-600",
    button: "bg-teal-500 hover:bg-teal-600",
    glow: "from-teal-400 to-emerald-500",
  },
};

function WaitlistForm({ projectName, color, cta }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const scheme = COLOR_SCHEMES[color];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, project: projectName }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={`p-6 rounded-2xl ${scheme.light} ${scheme.border} border text-center`}>
        <div className="text-3xl mb-2">🎉</div>
        <p className="font-semibold text-slate-900">You're on the list!</p>
        <p className="text-sm text-slate-600">We'll reach out when {projectName} is ready.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        className="flex-1 px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 text-slate-900"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={`px-8 py-4 rounded-xl font-semibold text-white ${scheme.button} transition-colors disabled:opacity-50 shadow-lg`}
      >
        {status === "loading" ? "..." : cta}
      </button>
    </form>
  );
}

export default function LandingPage({ params }) {
  const data = LANDING_DATA[params.id];

  if (!data) {
    notFound();
  }

  const scheme = COLOR_SCHEMES[data.color];

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold text-slate-900 no-underline tracking-tight text-sm sm:text-base">
            the ai ethos
          </Link>
          <Link
            href="/projects"
            className="text-xs sm:text-sm text-slate-500 hover:text-slate-900 no-underline transition-colors"
          >
            All Projects →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b ${scheme.light} to-transparent rounded-full blur-3xl opacity-60`} />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${scheme.light} ${scheme.border} border mb-8`}>
            <span className="text-xl">{data.emoji}</span>
            <span className={`text-sm font-medium ${scheme.text}`}>{data.tagline}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            {data.headline}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {data.subheadline}
          </p>

          {/* Waitlist Form */}
          <div className="max-w-lg mx-auto">
            <WaitlistForm projectName={data.name} color={data.color} cta={data.cta} />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              {data.problem.title}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {data.problem.points.map((point, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200">
                <span className="text-red-400 mt-0.5">✕</span>
                <span className="text-slate-700">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative">
            {/* Glow */}
            <div className={`absolute -inset-4 bg-gradient-to-r ${scheme.glow} rounded-3xl blur-xl opacity-20`} />

            <div className={`relative p-8 sm:p-12 rounded-2xl ${scheme.light} ${scheme.border} border`}>
              <div className="text-4xl mb-4">{data.emoji}</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                {data.solution.title}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {data.solution.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              How it works
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {data.features.map((feature, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200">
                <div className="text-2xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Ready to try {data.name}?
          </h2>
          <p className="text-slate-600 mb-8">
            Join the waitlist to get early access when we launch.
          </p>
          <div className="max-w-md mx-auto">
            <WaitlistForm projectName={data.name} color={data.color} cta={data.cta} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Link href="/" className="font-semibold text-slate-900 no-underline">
                the ai ethos
              </Link>
              <p className="text-sm text-slate-500">Solo AI Product Incubator</p>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <Link href={`/projects/${params.id}`} className="text-sm text-slate-500 hover:text-slate-900 no-underline">
                View Full Plan →
              </Link>
              <Link href="/projects" className="text-sm text-slate-500 hover:text-slate-900 no-underline">
                All Projects
              </Link>
              <Link href="/methodology" className="text-sm text-slate-500 hover:text-slate-900 no-underline">
                Methodology
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
