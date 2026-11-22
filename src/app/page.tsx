import { HomePage } from "@/components/home/home-page";
import { getDiscordInviteUrl, getLumaCalendarUrl } from "@/lib/links";

// Re-render at most once a minute so finished events drop off.
export const revalidate = 60;

export default function Page() {
  const eventUrl = process.env.EVENT_URL;
  return (
    <HomePage
      inviteUrl={getDiscordInviteUrl()}
      calendarUrl={getLumaCalendarUrl()}
      eventUrl={eventUrl?.startsWith("https://") ? eventUrl : undefined}
    />
  );
}
