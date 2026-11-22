import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LogoMark } from "@/components/shared/logo-mark";
import { SocialLinks } from "@/components/shared/social-links";

export const SiteHeader = async () => {
  const t = await getTranslations("nav");
  const site = await getTranslations("site");
  return (
    <header className="relative z-10 border-b border-primary/25 bg-background/85">
      <div className="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-4 sm:flex-nowrap sm:px-8 sm:py-0 lg:px-12">
        <Link href="/" className="group inline-flex items-center gap-3 font-mono text-base tracking-[-.05em] text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-lg" aria-label={t("homeLabel")}><LogoMark className="h-6 w-8 shrink-0 group-hover:[&_rect]:fill-amber" /><span>{site("nameFirst")}<span className="text-primary">_{site("nameSecond")}</span></span></Link>
        <nav className="flex items-center gap-4 text-xs sm:text-sm md:gap-7" aria-label={t("label")}>
          <Link className="hidden text-white/80 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:block" href="/#o-bastlirne">{t("about")}</Link>
          <Link className="text-white/80 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" href="/qrcode">{t("qr")}</Link>
          <SocialLinks />
        </nav>
      </div>
    </header>
  );
};

