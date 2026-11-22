import { getTranslations } from "next-intl/server";
import { TerminalRule } from "@/components/shared/terminal-rule";
import { Button } from "@/components/ui/button";
import { formatTime, type Event } from "@/data/events";

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("cs-CZ", { weekday: "long", day: "numeric", month: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));

type EventsSectionProps = {
  events: Event[];
  calendarUrl?: string;
};

export const EventsSection = async ({ events, calendarUrl }: EventsSectionProps) => {
  if (events.length === 0 && !calendarUrl) return null;
  const t = await getTranslations("events");

  return (
    <section id="akce" className="scroll-mt-8 border-b border-primary/30 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <TerminalRule />
        <h2 className="mt-8 text-4xl leading-[1.1] tracking-[-.06em] sm:text-5xl">{t("title")}</h2>
        {events.length > 0 ? <ol className="mt-12 border-t border-primary/30">
          {events.map((event, i) => (
            <li key={`${event.date}-${event.title}`} className="grid gap-4 border-b border-primary/30 py-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8">
              <span className="text-xs text-primary" aria-hidden="true">[{String(i + 1).padStart(2, "0")}]</span>
              <div>
                <p className="text-sm text-amber sm:text-base"><time dateTime={event.date}>{formatDate(event.date)}</time>{formatTime(event) && ` · ${formatTime(event)}`}</p>
                <h3 className="mt-2 text-xl leading-tight sm:text-2xl">{event.title}</h3>
                {event.place && <p className="mt-1 text-sm text-muted">{event.place}</p>}
              </div>
              {event.url && (
                <Button asChild variant="outline">
                  <a href={event.url} target="_blank" rel="noopener noreferrer">{t("register")} <span aria-hidden="true">↗</span></a>
                </Button>
              )}
            </li>
          ))}
        </ol> : <p className="mt-8 text-sm leading-7 text-muted">{t("empty")}</p>}
        {calendarUrl && (
          <Button asChild variant="outline" className="mt-8">
            <a href={calendarUrl} target="_blank" rel="noopener noreferrer">{t("calendar")} <span aria-hidden="true">↗</span></a>
          </Button>
        )}
      </div>
    </section>
  );
};
