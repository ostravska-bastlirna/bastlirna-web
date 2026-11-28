// External community links come from the environment so invitations never land in the repository.

export const getDiscordInviteUrl = () => {
  const url = process.env.DISCORD_INVITE_URL;
  return url?.startsWith("https://discord.gg/") || url?.startsWith("https://discord.com/invite/") ? url : undefined;
};

export const getGithubUrl = () => {
  const url = process.env.GITHUB_URL;
  return url?.startsWith("https://github.com/") ? url : undefined;
};

export const getLinkedinUrl = () => {
  const url = process.env.LINKEDIN_URL;
  return url?.startsWith("https://www.linkedin.com/") || url?.startsWith("https://linkedin.com/") ? url : undefined;
};

export const getLumaCalendarUrl = () => {
  const url = process.env.LUMA_CALENDAR_URL;
  return url?.startsWith("https://luma.com/") || url?.startsWith("https://lu.ma/") ? url : undefined;
};

export const getInstagramUrl = () => {
  const url = process.env.INSTAGRAM_URL;
  return url?.startsWith("https://www.instagram.com/") || url?.startsWith("https://instagram.com/") ? url : undefined;
};

export const getYoutubeUrl = () => {
  const url = process.env.YOUTUBE_URL;
  return url?.startsWith("https://www.youtube.com/") || url?.startsWith("https://youtube.com/") ? url : undefined;
};
