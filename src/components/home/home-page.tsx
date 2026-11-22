import type { CSSProperties } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { LogoMark } from "@/components/shared/logo-mark";
import { DiscordAction } from "@/components/shared/discord-action";
import { SiteHeader } from "@/components/shared/site-header";
import { SocialLinks } from "@/components/shared/social-links";
import { TerminalRule } from "@/components/shared/terminal-rule";
import { Button } from "@/components/ui/button";
import { getUpcomingEvents } from "@/data/events";
import { EventsSection } from "./events-section";
import styles from "./home-page.module.css";

const vars = (values: Record<string, string | number>) => values as CSSProperties;

const HERO_TRACES = [
  "M205 0v76l-43 43v51l-53 53v75l-45 45v37",
  "M175 0v65l-42 42v58l-55 55v65l-52 52v43",
  "M145 0v55l-42 42v56l-52 52v80L0 336",
];

const CircuitTrace = () => (
  <svg viewBox="0 0 210 380" fill="none" className="pointer-events-none absolute -left-[150px] top-10 hidden h-[228px] w-[126px] text-primary/40 xl:block" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="1">
      {HERO_TRACES.map((d) => <path key={d} d={d} pathLength={1} className={styles.trace} />)}
      <path d="M205 125h-40M132 165h-30M77 249h-34" pathLength={1} className={styles.trace} />
    </g>
    <g className="stroke-primary" strokeWidth="2">
      {HERO_TRACES.map((d, i) => <path key={d} d={d} pathLength={1} className={styles.signal} style={vars({ "--delay": `${1.6 + i * 0.9}s` })} />)}
    </g>
    <g className="fill-background" stroke="currentColor"><circle cx="162" cy="119" r="4" /><circle cx="103" cy="165" r="4" /><circle cx="78" cy="249" r="4" /><circle cx="26" cy="337" r="4" /></g>
  </svg>
);

const BOARD_PADS = [
  { label: "HW", x: 34, y: 54, d: "M120 118H72V54H54" },
  { label: "3D", x: 306, y: 54, d: "M240 118h48V54h18" },
  { label: "DEV", x: 34, y: 246, d: "M120 182H90v64H54" },
  { label: "AI", x: 306, y: 246, d: "M240 182h30v64h36" },
];

const Board = ({ caption }: { caption: string }) => (
  <figure className="m-0">
    <svg viewBox="0 0 360 300" fill="none" className="w-full max-w-[420px] text-primary" aria-hidden="true">
      <rect x="1" y="1" width="358" height="298" stroke="currentColor" strokeOpacity=".5" />
      {[[16, 16], [344, 16], [16, 284], [344, 284]].map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" stroke="currentColor" strokeOpacity=".6" />)}
      <g stroke="currentColor" strokeWidth="1.5">
        {BOARD_PADS.map((pad) => <path key={pad.label} d={pad.d} pathLength={1} className={styles.traceOnView} />)}
        <path d="M180 214v40h-40M180 86V46h60" pathLength={1} className={styles.traceOnView} />
      </g>
      <g className="stroke-amber" strokeWidth="2.5">
        {BOARD_PADS.map((pad, i) => <path key={pad.label} d={pad.d} pathLength={1} className={styles.signal} style={vars({ "--delay": `${i * 0.7}s` })} />)}
      </g>
      <rect x="120" y="86" width="120" height="128" className="fill-surface" stroke="currentColor" strokeWidth="1.5" />
      {[0, 1, 2, 3, 4, 5].map((i) => <g key={i} fill="currentColor"><rect x="110" y={96 + i * 20} width="10" height="4" /><rect x="240" y={96 + i * 20} width="10" height="4" /></g>)}
      <text x="180" y="146" textAnchor="middle" fill="currentColor" fontFamily="var(--font-mono)" fontSize="14">BO-01</text>
      <text x="180" y="166" textAnchor="middle" className="fill-muted" fontFamily="var(--font-mono)" fontSize="9">ostrava</text>
      <rect x="130" y="96" width="6" height="6" fill="currentColor" />
      {BOARD_PADS.map((pad) => (
        <g key={pad.label}>
          <rect x={pad.x - 20} y={pad.y - 14} width="40" height="28" stroke="currentColor" className="fill-background" />
          <text x={pad.x} y={pad.y + 4} textAnchor="middle" className="fill-foreground" fontFamily="var(--font-mono)" fontSize="11">{pad.label}</text>
        </g>
      ))}
      <rect x="132" y="248" width="12" height="12" className={`fill-amber ${styles.led}`} />
      <rect x="236" y="40" width="12" height="12" className={`fill-primary ${styles.led}`} style={vars({ "--delay": ".7s" })} />
    </svg>
    <figcaption className="mt-4 text-xs text-muted">{caption}</figcaption>
  </figure>
);

const RegistrationAction = ({ url, label, className }: { url: string; label: string; className?: string }) => (
  <Button asChild className={className}><a href={url} target="_blank" rel="noopener noreferrer">{label} <span aria-hidden="true">↗</span></a></Button>
);

type HomePageProps = {
  inviteUrl?: string;
  eventUrl?: string;
  calendarUrl?: string;
};

export const HomePage = async ({ inviteUrl, eventUrl, calendarUrl }: HomePageProps) => {
  const upcomingEvents = getUpcomingEvents();
  const t = await getTranslations("home");
  const site = await getTranslations("site");
  const prompt = t("prompt");
  const topics = t("topics").split("|").map((topic) => topic.trim());

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-primary/30">
        <div className={`${styles.grid} pointer-events-none absolute inset-0`} aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-16 lg:px-12 lg:py-20">
          <div>
            <p className="text-xs text-primary sm:text-sm"><span aria-hidden="true">&gt; </span><span className={styles.prompt} style={vars({ "--chars": prompt.length })}>{prompt}</span></p>
            <h1 className="mt-8 text-[clamp(3.2rem,7vw,6.4rem)] leading-[.98] font-normal tracking-[-.07em]">
              <span className="block"><span className={styles.revealLine} style={vars({ "--chars": 9, "--delay": "1.3s" })}>{site("nameFirst")}</span></span>
              <span className="block text-primary"><span className={styles.revealLine} style={vars({ "--chars": 9, "--delay": "1.85s" })}>{site("nameSecond")}</span><span className={styles.cursor} style={vars({ "--delay": "2.4s" })} aria-hidden="true" /></span>
            </h1>
            <div className={styles.fadeIn} style={vars({ "--delay": "2.4s" })}>
              <p className="mt-8 max-w-[34ch] text-base leading-7 text-white sm:text-xl sm:leading-8">{t("intro")}</p>
              <p className="mt-7 text-sm leading-6 text-amber sm:text-base">{t("meetups")}</p>
              <p className="mt-1 max-w-[40ch] text-sm leading-6 text-white/70">{t("meetupsDetail")}</p>
              <div className="mt-8 flex flex-wrap items-start gap-5">{calendarUrl && <RegistrationAction url={calendarUrl} label={t("register")} />}<DiscordAction inviteUrl={inviteUrl} variant={calendarUrl ? "outline" : "default"} />{eventUrl && <Button asChild variant="outline"><a href={eventUrl} target="_blank" rel="noopener noreferrer">{t("eventDetail")} <span aria-hidden="true">↗</span></a></Button>}</div>
            </div>
          </div>

          <figure className={`${styles.window} relative m-0 w-full max-w-[520px] justify-self-center lg:justify-self-end`}>
            <CircuitTrace />
            <div className={`${styles.windowBar} flex items-center gap-3 px-3 py-2 text-[11px] text-muted`} aria-hidden="true">
              <span className="flex gap-1.5"><span className={styles.dot} /><span className={styles.dot} /><span className={styles.dot} /></span>
              <span className="truncate">{t("windowTitle")}</span>
            </div>
            <div className={styles.screen}>
              <Image src="/workshop-dither-square.png" alt={t("windowAlt")} width={400} height={400} unoptimized priority className={`${styles.pixels} block aspect-square w-full`} />
              <span className={styles.scanline} aria-hidden="true" />
              <span className={styles.crosshair} aria-hidden="true" />
            </div>
            <figcaption className={`${styles.windowBar} flex items-center justify-between gap-3 border-t border-b-0 px-3 py-2 text-[11px]`}>
              <span className="text-primary">{t("windowStatus")}</span>
              <span className="text-amber" aria-hidden="true">49.83N 18.25E</span>
            </figcaption>
          </figure>
        </div>
        <div className="relative mx-auto max-w-7xl px-5 pb-8 sm:px-8 lg:px-12">
          <ul className="flex flex-wrap items-center gap-2 border-t border-primary/30 pt-5 text-xs text-primary sm:text-sm" aria-label={t("topics")}>
            <li aria-hidden="true" className="mr-2">$ ls ./temata</li>
            {topics.map((topic) => <li key={topic} className={`${styles.tag} border border-primary/40 px-2 py-1`}>{topic}</li>)}
          </ul>
        </div>
      </section>

      <EventsSection events={upcomingEvents} calendarUrl={calendarUrl} />

      <section id="o-bastlirne" className="scroll-mt-8 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <Board caption={t("boardCaption")} />
          <div><TerminalRule /><h2 className="mt-8 max-w-[18ch] text-4xl leading-[1.1] tracking-[-.06em] sm:text-5xl">{t("aboutTitle")}</h2><p className="mt-7 max-w-[60ch] text-sm leading-8 text-muted sm:text-base">{t("aboutText")}</p></div>
        </div>
      </section>

      <footer className="border-t border-primary/40 bg-surface px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-9 lg:flex-row lg:items-end">
          <div>
            <LogoMark className="mb-8 h-12 w-16" />
            <p className="text-xs text-primary sm:text-sm" aria-hidden="true">$ {t("footerPrompt")}<span className={styles.cursor} /></p>
            <h2 className="mt-6 max-w-[25ch] text-2xl leading-tight sm:text-3xl">{t("footerTitle")}</h2>
            <p className="mt-4 max-w-[55ch] text-sm leading-7 text-muted">{t("footerText")}</p>
          </div>
          <div className="flex flex-col items-start gap-5 lg:items-end">
            <DiscordAction inviteUrl={inviteUrl} variant="outline" />
            <SocialLinks />
          </div>
        </div>
      </footer>
    </main>
  );
};
