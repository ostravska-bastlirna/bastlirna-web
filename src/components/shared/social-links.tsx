import { Linkedin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { DiscordIcon } from "@/components/shared/discord-icon";
import { GithubIcon } from "@/components/shared/github-icon";
import { getDiscordInviteUrl, getGithubUrl, getLinkedinUrl } from "@/lib/links";

const iconLinkClass = "inline-flex size-9 items-center justify-center border border-primary/40 text-white/80 transition-colors hover:border-primary hover:text-primary focus-visible:border-primary focus-visible:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

export const SocialLinks = async () => {
  const githubUrl = getGithubUrl();
  const linkedinUrl = getLinkedinUrl();
  const discordUrl = getDiscordInviteUrl();
  if (!githubUrl && !linkedinUrl && !discordUrl) return null;

  const t = await getTranslations("nav");

  return (
    <div className="flex items-center gap-2">
      {githubUrl && <a className={iconLinkClass} href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label={t("github")} title={t("github")}><GithubIcon className="size-4" /></a>}
      {linkedinUrl && <a className={iconLinkClass} href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={t("linkedin")} title={t("linkedin")}><Linkedin aria-hidden="true" className="size-4" /></a>}
      {discordUrl && <a className={iconLinkClass} href={discordUrl} target="_blank" rel="noopener noreferrer" aria-label={t("discord")} title={t("discord")}><DiscordIcon className="size-4" /></a>}
    </div>
  );
};
