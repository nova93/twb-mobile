// HTTPS only: the scraped HTML drives this app's image src and nav targets,
// so a plaintext fetch would let a network attacker control all of them.
// the-whiteboard.com serves HTTPS and redirects http -> https.
export const COMIC_URL = "https://the-whiteboard.com/";

// The upstream site addresses every strip as a flat "<name>.html" file.
// Anything else is rejected, both on the way in (user-supplied slug ->
// server-side fetch) and on the way out (scraped nav targets -> router).
export const COMIC_PAGE = /^[A-Za-z0-9._-]+\.html$/;
