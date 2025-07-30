export function getEmbedUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    let videoId = '';

    // Tangani youtube.com/watch?v=...
    if (parsedUrl.hostname.includes('youtube.com') && parsedUrl.pathname === '/watch') {
      videoId = parsedUrl.searchParams.get('v') || '';
    }

    // Tangani youtu.be/abc123
    else if (parsedUrl.hostname === 'youtu.be') {
      videoId = parsedUrl.pathname.substring(1); // buang slash awal
    }

    // Tangani youtube.com/embed/abc123
    else if (parsedUrl.hostname.includes('youtube.com') && parsedUrl.pathname.startsWith('/embed/')) {
      videoId = parsedUrl.pathname.split('/')[2] || '';
    }

    // Kalau berhasil ambil ID → return embed URL
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Selain YouTube → kembalikan URL as is
    return url;
  } catch {
    return '';
  }
}
