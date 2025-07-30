// utils/getYoutubeWatchUrl.ts
export function getYoutubeWatchUrl(mediaUrl: string): string {
  try {
    const u = new URL(mediaUrl);

    if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/embed/")) {
        const videoId = u.pathname.split("/")[2];
        return `https://www.youtube.com/watch?v=${videoId}`;
      }

      if (u.pathname === "/watch") {
        return `https://www.youtube.com/watch?v=${u.searchParams.get("v")}`;
      }
    }

    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/watch?v=${u.pathname.slice(1)}`;
    }

    return mediaUrl;
  } catch {
    return mediaUrl;
  }
}
