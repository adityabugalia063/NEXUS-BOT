import Link from "next/link";

const sections = [
  {
    title: "What the service provides",
    body: <>NEXUS is Discord bot software with moderation commands, server configuration, member support tickets, leveling, giveaways, polls, and related features. A separate web dashboard and API are present in the repository. Available features and access tiers are listed in the <Link className="text-[var(--accent)] hover:underline" href="/commands">command reference</Link>.</>,
  },
  {
    title: "Server permissions and administrator decisions",
    body: "The invite requests permission integer 1374792445014, a scoped set for audited moderation, role and channel, messaging, and interaction features; it excludes Administrator. Server owners should review the authorization screen and the bot's role and access configuration before inviting or using it. NEXUS performs management actions only where command access checks and Discord permissions allow them.",
  },
  {
    title: "Operator and user responsibilities",
    body: "Server owners and moderators should configure roles, channels, logs, and access to fit their server. The source includes moderation operations that can affect members and channels. Use those operations with care and follow the rules that apply to your community.",
  },
  {
    title: "Data and availability",
    body: "The code stores configuration and feature data in SQLite. The source audit does not document general retention periods, a complete deletion process, service availability commitments, support response times, or uptime guarantees. None are promised by this draft.",
  },
  {
    title: "Pricing, support, and affiliation",
    body: "No paid tiers or payment logic were found in the current source. The operator should confirm this statement. A real support-server URL and contact address have not been configured. NEXUS is not affiliated with or endorsed by Discord Inc.",
  },
];

export const metadata = {
  title: "NEXUS terms — draft for review",
  description: "A preliminary NEXUS terms page based on implemented bot behavior. Human and legal review required.",
};

export default function TermsPage() {
  return (
    <main id="main" className="min-h-screen bg-[var(--bg-deep)] text-[var(--ice-silver)] px-5 sm:px-9 py-12 sm:py-16">
      <article className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)]">← NEXUS home</Link>
        <header className="py-10 border-b border-[var(--glass-border)]">
          <p className="text-[11px] font-mono uppercase tracking-[.14em] text-[var(--accent)]">Policy draft</p>
          <h1 className="font-display text-4xl sm:text-5xl mt-3">Terms, before the fine print.</h1>
          <p className="mt-3 text-[var(--text-muted)]">A transparent starting point for describing the current NEXUS bot.</p>
        </header>
        <div className="my-6 rounded-lg border border-[var(--warning)]/40 bg-[var(--glass-bg)] px-4 py-3 text-sm text-[var(--warning)]">Draft: requires human and legal review before publication.</div>
        <p className="leading-relaxed text-[var(--text-muted)]">This page is a drafting aid based on the source audit. The repository does not contain a complete Terms of Service. An operator must review and replace this draft before relying on it as a legal agreement.</p>
        <div className="divide-y divide-[var(--glass-border)]">
          {sections.map((section) => <section key={section.title} className="py-6"><h2 className="font-display text-2xl">{section.title}</h2><p className="mt-3 leading-relaxed text-[var(--text-muted)]">{section.body}</p></section>)}
        </div>
        <p className="mt-5 text-xs text-[var(--text-faint)]">Terms, warranty, liability, dispute, governing-law, and termination language require qualified human/legal review and operator decisions; they are intentionally not invented here.</p>
      </article>
    </main>
  );
}
