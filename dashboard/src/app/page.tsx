"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { ArrowRight, ArrowUpRight, ShieldCheck, ListChecks, UsersRound, MessageCircle, Fingerprint, Ticket, ChartNoAxesColumnIncreasing, Gift, Megaphone, MessageSquareText, Gamepad2, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { NexusLogo } from "@/components/NexusLogo";

const INVITE_URL = "https://discord.com/oauth2/authorize?client_id=1560655249276936192&permissions=1374792445014&scope=bot%20applications.commands";

const features = [
  { icon: ShieldCheck, title: "Moderation & case history", description: "Moderation actions record the member, moderator, reason, and timestamp.", command: "/ban" },
  { icon: Ticket, title: "Private support tickets", description: "Let members open private support channels and save a text transcript when a ticket closes.", command: "/ticket setup" },
  { icon: ChartNoAxesColumnIncreasing, title: "Leveling & rewards", description: "Reward message activity with configurable XP, levels, and milestone roles.", command: "/rank" },
  { icon: Gift, title: "Giveaways & polls", description: "Run persistent giveaways and interactive polls with optional role eligibility.", command: "/giveaway start" },
  { icon: UsersRound, title: "Roles & onboarding", description: "Assign roles on join or let members choose roles from configured panels.", command: "/autorole set-human" },
  { icon: ListChecks, title: "Audit logging", description: "Route moderation, server, activity, and command events to your log channels.", command: "/setupbot" },
  { icon: Megaphone, title: "Announcements & DMs", description: "Publish server announcements or send staff-directed member and role messages.", command: "/announce" },
  { icon: MessageSquareText, title: "Autoresponders", description: "Reply to configured message triggers using supported matching rules.", command: "/autoresponder add" },
  { icon: Gamepad2, title: "Community games", description: "Start button-based Tic-Tac-Toe, Rock-Paper-Scissors, and number guessing.", command: "/tictactoe" },
];

export default function WelcomePage() {
  const { data: session } = useSession();
  const [health, setHealth] = useState<"checking" | "online" | "offline">("checking");

  useEffect(() => {
    let active = true;
    const check = async () => {
      try {
        const response = await fetch("/api/health");
        const data = await response.json();
        if (active) setHealth(response.ok && data.status === "online" ? "online" : "offline");
      } catch {
        if (active) setHealth("offline");
      }
    };
    check();
    const timer = window.setInterval(check, 30000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);

  const enter = () => signIn("discord", { callbackUrl: "/dashboard" });

  return (
    <div className="home-shell min-h-screen flex flex-col bg-[var(--bg-deep)]">
      <header className="home-header max-w-[1320px] w-full mx-auto px-5 sm:px-9 py-5 flex items-center justify-between border-b border-[var(--glass-border)]">
        <Link href="/" className="flex items-center gap-3" aria-label="Nexus home">
          <span className="w-9 h-9 rounded-lg border border-[var(--glass-border-strong)] bg-[var(--glass-bg)] text-[var(--accent)] flex items-center justify-center"><NexusLogo size={21} /></span>
          <span className="leading-tight"><strong className="block text-[15px] tracking-[.12em] font-semibold">NEXUS</strong><small className="text-[11px] text-[var(--text-muted)]">Community operations</small></span>
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-3 sm:gap-6 text-sm">
          <div className="hidden lg:flex items-center gap-5">
            <a className="text-[var(--text-muted)] hover:text-[var(--ice-silver)] transition-colors" href="#features">Features</a>
            <Link className="text-[var(--text-muted)] hover:text-[var(--ice-silver)] transition-colors" href="/commands">Commands</Link>
            <a className="text-[var(--text-muted)] hover:text-[var(--ice-silver)] transition-colors" href="#dashboard">Dashboard</a>
            <a className="text-[var(--text-muted)] hover:text-[var(--ice-silver)] transition-colors" href="#trust">Trust</a>
          </div>
          <a href={INVITE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary hidden sm:inline-flex px-3.5 py-2 text-sm items-center gap-2">Add to Discord <ExternalLink size={14} /></a>
          {session?.user
            ? <Link className="text-[var(--ice-silver)] hover:text-[var(--accent)] inline-flex items-center gap-2" href="/dashboard">Open workspace <ArrowRight size={15} /></Link>
            : <button onClick={enter} className="btn-secondary px-3.5 sm:px-4 py-2 text-sm">Sign in</button>}
        </nav>
      </header>

      <main className="flex-1 max-w-[1320px] w-full mx-auto px-5 sm:px-9">
        <section className="home-hero grid lg:grid-cols-[.92fr_1.08fr] gap-10 lg:gap-16 items-center py-14 sm:py-20 lg:py-24">
          <div className="home-hero-copy max-w-[580px]">
            <div className="home-hero-status flex items-center gap-2 text-[11px] text-[var(--text-muted)] font-mono uppercase tracking-[.1em] mb-6">
              <span className={`w-2 h-2 rounded-full ${health === "online" ? "bg-[var(--success)]" : health === "checking" ? "bg-[var(--warning)]" : "bg-[var(--error)]"}`} />
              {health === "online" ? "Bot connected" : health === "checking" ? "Checking bot connection" : "Bot connection unavailable"}
            </div>
            <p className="text-[11px] text-[var(--accent)] font-mono uppercase tracking-[.16em] mb-3">Discord server operations</p>
            <h1 className="font-display text-[clamp(3.3rem,6.8vw,6.6rem)] leading-[.9] tracking-[-.02em] text-[var(--ice-silver)] max-w-[620px]">
              Moderation,<br />support, and<br />leveling. <span className="text-[var(--accent)]">One bot.</span>
            </h1>
            <p className="mt-6 max-w-[490px] text-[15px] sm:text-base leading-[1.75] text-[var(--text-muted)]">
              Handle staff actions with case history, give members a private way to ask for help, and reward activity from the same bot.
            </p>
            <div className="home-hero-actions flex flex-col sm:flex-row gap-3 mt-8">
              <a href={INVITE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary px-5 py-3 inline-flex justify-center items-center gap-2.5">Add to Discord <ArrowRight size={16} /></a>
              <Link href="/commands" className="btn-secondary px-5 py-3 inline-flex justify-center items-center gap-2">Browse commands <ArrowUpRight size={15} /></Link>
            </div>
            <p className="home-hero-note mt-5 text-xs text-[var(--text-faint)]">Slash commands and <code>n!</code> prefix commands. Server owners choose who can manage the bot.</p>
          </div>

          <div className="home-hero-visual lg:pl-4">
            <div className="border border-[var(--glass-border-strong)] rounded-xl bg-[var(--glass-bg)] overflow-hidden">
              <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-[var(--glass-border)]">
                <span className="text-[11px] font-mono uppercase tracking-[.12em] text-[var(--text-muted)]">Command → server structure</span>
                <span className="text-[10px] font-mono text-[var(--success)]">REAL WORKFLOW</span>
              </div>
              <div className="p-5 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 text-[var(--accent)]"><ListChecks size={20} /></span>
                  <div className="min-w-0">
                    <p className="text-xs text-[var(--text-muted)]">ONE-STEP AUDIT SETUP</p>
                    <h2 className="font-display text-3xl sm:text-4xl mt-1">Route the important events.</h2>
                    <p className="text-sm leading-relaxed text-[var(--text-muted)] mt-2 max-w-[540px]">The implemented <code className="text-[var(--ice-silver)] font-mono text-[13px]">/setupbot</code> command creates a private Nexus Logs category with four purpose-specific channels.</p>
                  </div>
                </div>
                <div className="mt-6 rounded-lg border border-[var(--glass-border)] bg-[var(--bg-deep)] overflow-hidden">
                  <div className="px-4 py-3 border-b border-[var(--glass-border)] flex items-center gap-2.5"><span className="w-2 h-2 rounded-full bg-[var(--success)]" /><span className="text-xs">Discord server</span><span className="text-xs text-[var(--text-faint)]">/</span><span className="text-xs text-[var(--text-muted)]">NEXUS LOGS</span></div>
                  <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--glass-border)]">
                    <div className="p-4 space-y-3">
                      <p className="text-[10px] font-mono tracking-[.12em] uppercase text-[var(--text-faint)]">Moderation & server</p>
                      <div className="flex items-center gap-2.5 text-sm"><ShieldCheck size={14} className="text-[var(--accent)]" /><code className="font-mono text-[13px]">#mod-logs</code></div>
                      <div className="flex items-center gap-2.5 text-sm"><ListChecks size={14} className="text-[var(--accent)]" /><code className="font-mono text-[13px]">#server-logs</code></div>
                    </div>
                    <div className="p-4 space-y-3">
                      <p className="text-[10px] font-mono tracking-[.12em] uppercase text-[var(--text-faint)]">Staff & commands</p>
                      <div className="flex items-center gap-2.5 text-sm"><UsersRound size={14} className="text-[var(--accent)]" /><code className="font-mono text-[13px]">#activity-logs</code></div>
                      <div className="flex items-center gap-2.5 text-sm"><MessageCircle size={14} className="text-[var(--accent)]" /><code className="font-mono text-[13px]">#cmd-logs</code></div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--text-muted)]">
                  <span className="inline-flex items-center gap-1.5"><Fingerprint size={13} className="text-[var(--accent)]" /> Owner controlled</span>
                  <span>Private channels</span>
                  <span>Recorded to server settings</span>
                </div>
              </div>
              <div className="px-5 py-3 border-t border-[var(--glass-border)] bg-[var(--glass-bg-strong)] flex justify-between items-center">
                <code className="font-mono text-[13px] text-[var(--ice-silver)]">/setupbot</code>
                <Link href="/commands?cmd=setupbot" className="text-xs text-[var(--text-muted)] hover:text-[var(--ice-silver)] inline-flex items-center gap-1.5">Read command details <ArrowRight size={13} /></Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-14 sm:py-20 border-t border-[var(--glass-border)] scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 sm:mb-10">
            <div><p className="text-[11px] font-mono uppercase tracking-[.14em] text-[var(--accent)]">What’s in the box</p><h2 className="font-display text-3xl sm:text-4xl mt-2">The server tools you actually need.</h2></div>
            <p className="text-sm text-[var(--text-muted)] max-w-lg">Each module maps to commands and behavior in the current bot code. No extras implied.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map(({ icon: Icon, title, description, command }) => <article key={title} className="glass rounded-xl p-5 min-h-48 flex flex-col">
              <div className="flex items-center gap-3 mb-4"><span className="w-9 h-9 rounded-lg border border-[var(--glass-border-strong)] flex items-center justify-center text-[var(--accent)]"><Icon size={17} /></span><h3 className="font-semibold text-base">{title}</h3></div>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">{description}</p>
              <code className="mt-auto self-start rounded-md border border-[var(--glass-border)] bg-[var(--bg-deep)] px-2.5 py-1.5 text-[11px] text-[var(--accent)]">{command}</code>
            </article>)}
          </div>
        </section>

        <section className="grid md:grid-cols-[.8fr_1.2fr] gap-6 lg:gap-12 py-8 sm:py-10 border-t border-[var(--glass-border)]">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[.14em] text-[var(--accent)]">A clear operating model</p>
            <h2 className="font-display text-3xl sm:text-4xl mt-2">The right tool for the right role.</h2>
          </div>
          <div className="divide-y divide-[var(--glass-border)]">
            <div className="grid grid-cols-[28px_1fr] gap-3 py-3 first:pt-0"><span className="font-mono text-xs text-[var(--accent)]">01</span><p className="text-sm leading-relaxed text-[var(--text-muted)]"><strong className="text-[var(--ice-silver)] font-medium">Owners</strong> set the access boundary and choose which staff role can manage Nexus.</p></div>
            <div className="grid grid-cols-[28px_1fr] gap-3 py-3"><span className="font-mono text-xs text-[var(--accent)]">02</span><p className="text-sm leading-relaxed text-[var(--text-muted)]"><strong className="text-[var(--ice-silver)] font-medium">Moderators</strong> handle cases, logs and member workflows in the server they are authorized to manage.</p></div>
            <div className="grid grid-cols-[28px_1fr] gap-3 py-3"><span className="font-mono text-xs text-[var(--accent)]">03</span><p className="text-sm leading-relaxed text-[var(--text-muted)]"><strong className="text-[var(--ice-silver)] font-medium">Product operators</strong> use a separate restricted console for Nexus-level administration.</p></div>
          </div>
        </section>

        <section id="dashboard" className="grid sm:grid-cols-2 xl:grid-cols-4 gap-0 border-t border-[var(--glass-border)] py-7 sm:py-9 scroll-mt-24">
          <Link href="/commands" className="group py-4 sm:pr-7 sm:border-r border-[var(--glass-border)]">
            <span className="text-[11px] font-mono text-[var(--text-faint)]">REFERENCE</span>
            <span className="mt-2 flex items-center justify-between"><strong className="font-display text-2xl group-hover:text-[var(--accent)]">Command directory</strong><ArrowUpRight size={16} className="text-[var(--text-muted)]" /></span>
            <span className="block text-sm text-[var(--text-muted)] mt-1">Find syntax, permissions and examples.</span>
          </Link>
          <Link href="/dashboard" className="group py-4 sm:px-7 sm:border-r border-[var(--glass-border)]">
            <span className="text-[11px] font-mono text-[var(--accent)]">SERVER OWNERS</span>
            <span className="mt-2 flex items-center justify-between"><strong className="font-display text-2xl group-hover:text-[var(--accent)]">Open dashboard</strong><ArrowUpRight size={16} className="text-[var(--text-muted)]" /></span>
            <span className="block text-sm text-[var(--text-muted)] mt-1">Sign in and configure an authorized server.</span>
          </Link>
          <div className="py-4 sm:px-7 sm:border-r border-[var(--glass-border)]">
            <span className="text-[11px] font-mono text-[var(--text-faint)]">MEMBER CARE</span>
            <strong className="block font-display text-2xl mt-2">Support & onboarding</strong>
            <span className="block text-sm text-[var(--text-muted)] mt-1">Tickets, welcome messages and automatic roles.</span>
          </div>
          <div className="py-4 sm:pl-7">
            <span className="text-[11px] font-mono text-[var(--text-faint)]">PARTICIPATION</span>
            <strong className="block font-display text-2xl mt-2">Healthy engagement</strong>
            <span className="block text-sm text-[var(--text-muted)] mt-1">Polls, giveaways, leveling and custom replies.</span>
          </div>
        </section>

        <section id="trust" className="grid md:grid-cols-2 gap-6 lg:gap-12 py-12 sm:py-16 border-t border-[var(--glass-border)] scroll-mt-24">
          <div><p className="text-[11px] font-mono uppercase tracking-[.14em] text-[var(--accent)]">Access and data</p><h2 className="font-display text-3xl sm:text-4xl mt-2">Know what access means.</h2><p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">The invite requests a scoped set of permissions used by NEXUS features. It excludes Administrator. Review the authorization screen and role hierarchy before adding the bot.</p><p className="mt-4 text-xs text-[var(--text-faint)]">NEXUS enables Server Members and Message Content gateway intents. Presence is off by default.</p></div>
          <div className="glass rounded-xl p-5 sm:p-6"><h3 className="font-semibold text-lg mb-3">What NEXUS stores</h3><p className="text-sm leading-relaxed text-[var(--text-muted)]">Local SQLite data can include server configuration, user and moderator IDs, moderation reasons and cases, warnings, ticket metadata, poll data, XP, AFK reasons, autoresponder text, and dashboard audit records.</p><p className="text-sm leading-relaxed text-[var(--text-muted)] mt-3">Command audit logs may include up to 500 characters of command text. The audited code does not define a general retention schedule or deletion process.</p><div className="mt-5 flex gap-4 text-sm"><Link className="text-[var(--accent)] hover:underline" href="/privacy">Privacy</Link><Link className="text-[var(--accent)] hover:underline" href="/terms">Terms</Link></div></div>
        </section>

        <section id="faq" className="py-12 sm:py-16 border-t border-[var(--glass-border)] scroll-mt-24">
          <div className="mb-7"><p className="text-[11px] font-mono uppercase tracking-[.14em] text-[var(--accent)]">FAQ</p><h2 className="font-display text-3xl sm:text-4xl mt-2">Questions worth asking.</h2></div>
          <div className="divide-y divide-[var(--glass-border)] border-y border-[var(--glass-border)]">
            <details className="group py-4"><summary className="cursor-pointer list-none font-medium flex justify-between gap-4">What permissions does NEXUS request?<span className="text-[var(--accent)]">+</span></summary><p className="mt-3 text-sm text-[var(--text-muted)]">The invite uses a scoped permission set for audited moderation, role and channel management, messaging, and interactions. It excludes Administrator.</p></details>
            <details className="group py-4"><summary className="cursor-pointer list-none font-medium flex justify-between gap-4">Do slash and prefix commands both work?<span className="text-[var(--accent)]">+</span></summary><p className="mt-3 text-sm text-[var(--text-muted)]">Yes. Slash commands are registered with Discord. Prefix commands use <code>n!</code>; not every slash command has a prefix counterpart.</p></details>
            <details className="group py-4"><summary className="cursor-pointer list-none font-medium flex justify-between gap-4">How do I set up the log channels?<span className="text-[var(--accent)]">+</span></summary><p className="mt-3 text-sm text-[var(--text-muted)]">Run <code>/setupbot</code> with the required server access. It creates a private NEXUS LOGS category with four channels.</p></details>
            <details className="group py-4"><summary className="cursor-pointer list-none font-medium flex justify-between gap-4">Who can manage bot settings?<span className="text-[var(--accent)]">+</span></summary><p className="mt-3 text-sm text-[var(--text-muted)]">The server owner and the configured Bot-Role can manage server settings. Discord permissions and role hierarchy still apply.</p></details>
          </div>
        </section>

        <section className="my-8 sm:my-12 rounded-2xl border border-[var(--glass-border-strong)] bg-[var(--glass-bg)] px-6 py-8 sm:px-10 sm:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div><p className="text-[11px] font-mono uppercase tracking-[.14em] text-[var(--accent)]">Set up with intention</p><h2 className="font-display text-3xl sm:text-4xl mt-2">Your server. Your access rules.</h2><p className="text-sm text-[var(--text-muted)] mt-2">Review permissions, then choose the tools your team will use.</p></div>
          <a href={INVITE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary px-5 py-3 inline-flex justify-center items-center gap-2.5 shrink-0">Add to Discord <ArrowRight size={16} /></a>
        </section>
      </main>

      <footer className="border-t border-[var(--glass-border)]">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-9 py-4 flex flex-col sm:flex-row gap-2 justify-between text-xs text-[var(--text-faint)]">
          <span>NEXUS · Discord community operations</span><span className="flex gap-4"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><span>Not affiliated with Discord Inc.</span></span>
        </div>
      </footer>
    </div>
  );
}
