import type { ReactNode } from "react";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { DiscordIcon } from "@/components/shared/discord-icon";
import { GithubIcon } from "@/components/shared/github-icon";
import { cn } from "@/lib/utils";
import { getDiscordInviteUrl, getGithubUrl, getInstagramUrl, getLinkedinUrl, getYoutubeUrl } from "@/lib/links";

const iconLinkClass = "inline-flex items-center justify-center border border-primary/40 text-white/80 transition-colors hover:border-primary hover:text-primary focus-visible:border-primary focus-visible:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

// Header: compact icons plus Discord. Footer: icons match the 48px Discord button next to them; Discord itself is that button.
const variants = {
  header: { link: "size-9", icon: "size-4", gap: "gap-2" },
  footer: { link: "size-12", icon: "size-5", gap: "gap-3" },
};

type SocialLinksProps = {
  variant?: keyof typeof variants;
};

export const SocialLinks = async ({ variant = "header" }: SocialLinksProps) => {
  const t = await getTranslations("nav");
  const size = variants[variant];
  const isFooter = variant === "footer";

  const links: { key: string; url?: string; label: string; icon: ReactNode }[] = [
    { key: "github", url: getGithubUrl(), label: t("github"), icon: <GithubIcon className={size.icon} /> },
    { key: "linkedin", url: getLinkedinUrl(), label: t("linkedin"), icon: <Linkedin aria-hidden="true" className={size.icon} /> },
    ...(isFooter ? [
      { key: "instagram", url: getInstagramUrl(), label: t("instagram"), icon: <Instagram aria-hidden="true" className={size.icon} /> },
      { key: "youtube", url: getYoutubeUrl(), label: t("youtube"), icon: <Youtube aria-hidden="true" className={size.icon} /> },
    ] : [
      { key: "discord", url: getDiscordInviteUrl(), label: t("discord"), icon: <DiscordIcon className={size.icon} /> },
    ]),
  ].filter((link) => link.url);
  if (links.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center", size.gap)}>
      {links.map(({ key, url, label, icon }) => <a key={key} className={cn(iconLinkClass, size.link)} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>{icon}</a>)}
    </div>
  );
};
