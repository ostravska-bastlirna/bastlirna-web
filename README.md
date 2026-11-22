# Ostravská Bastlírna

Krátký web pro ostravskou komunitu lidí, kteří něco staví. Obsahuje úvodní stránku a stránku `/qrcode`.

## Spuštění

Vyžaduje Node.js 22+ a pnpm 11.6.0.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Do `DISCORD_INVITE_URL` v `.env.local` vložte pozvánku ve tvaru `https://discord.gg/...` nebo `https://discord.com/invite/...`. Bez platného odkazu stránka zobrazí informaci, že pozvánka přibude. Nasazení musí mít stejnou proměnnou prostředí.

Do `LUMA_CALENDAR_URL` v `.env.local` vložte URL kalendáře organizace, např. `https://luma.com/ostravska-bastlirna` (podporuje i `https://lu.ma/...`). Tlačítko „Registrace na setkání“ v úvodu i „Kalendář všech akcí“ pod následujícími akcemi používají tuto stejnou proměnnou. Bez platné URL se obě tlačítka skryjí. Proměnnou nastavte také při nasazení.

Volitelně `GITHUB_URL` (odkaz ve tvaru `https://github.com/...`) a `LINKEDIN_URL` (`https://www.linkedin.com/...` nebo `https://linkedin.com/...`). Ikony GitHubu a LinkedInu se v navigaci i footeru zobrazí jen s platným odkazem; ikona Discordu používá `DISCORD_INVITE_URL`.

Volitelně `EVENT_URL` (https odkaz na detail nejbližší akce, např. událost na Discordu). Bez něj se tlačítko „Detail akce“ v úvodu nezobrazí.

## Akce

Akce se zapisují do `src/data/events.json` (typ `Event` v `src/data/events.ts`): `title`, `date` (`YYYY-MM-DD`), volitelně `start` a `end` (`HH:MM`, pražský čas), `place` a `url` (registrace na konkrétní akci). Sekce „následující akce“ ukazuje jen akce, které ještě neskončily. Odkazy u jednotlivých akcí používají jejich `url`; úvod a tlačítko pod seznamem vedou do kalendáře z `LUMA_CALENDAR_URL`. Kalendář je dostupný i při prázdném seznamu akcí. Stránka se obnovuje nejpozději minutu po konci akce; bez `end` se akce skryje po půlnoci.

## Ověření

```bash
pnpm lint
pnpm typecheck
pnpm build
```

