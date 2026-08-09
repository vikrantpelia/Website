/**
 * TEMPORARY password gate — remove this file (and unset SITE_PASSWORD in
 * Vercel's project settings) when the site is ready to go public. Nothing
 * else in the app references it.
 *
 * This is Vercel Edge Middleware, not Astro middleware — the site builds
 * as fully static output with no server/adapter, so Astro's own
 * `src/middleware.ts` would never run in production. Vercel's edge
 * middleware is framework-agnostic and runs at the CDN edge for every
 * request on a deployment, which also means it never runs at all during
 * local `astro dev` (that's a plain local dev server, not a Vercel
 * deployment) — local development is unaffected by construction, not by
 * an environment check.
 *
 * Flow: unauthenticated requests get served a self-contained login page
 * in place (same URL, 401 status, no external CSS/JS so it can't be
 * broken by this same gate). Submitting the form POSTs to that same URL;
 * a correct password sets a cookie (holding a SHA-256 hash of the
 * password, not the password itself) and redirects back to the original
 * path, which now passes the cookie check on the next request.
 *
 * Body is parsed with URLSearchParams over the raw text rather than
 * request.formData() — the latter's urlencoded-body support turned out to
 * be unreliable in local `vercel dev` edge emulation; parsing the raw
 * string directly avoids depending on that.
 */

const COOKIE_NAME = 'site_auth';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

async function sha256(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function parseCookies(header: string | null): Record<string, string> {
  if (!header) return {};
  return Object.fromEntries(
    header.split(';').map((pair) => {
      const [key, ...rest] = pair.trim().split('=');
      return [key, decodeURIComponent(rest.join('='))];
    })
  );
}

function renderGate({ error }: { error: boolean }): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>Vikrant Pelia</title>
<style>
  :root { color-scheme: light dark; }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif;
    background: #FAF9F7;
    color: #17191D;
  }
  @media (prefers-color-scheme: dark) {
    body { background: #111316; color: #E8E6E1; }
    input { background: #1a1c1f !important; border-color: #2A2D31 !important; color: #E8E6E1 !important; }
  }
  form {
    width: 100%;
    max-width: 20rem;
    padding: 0 1.5rem;
  }
  p.label {
    font-size: 0.6875rem;
    font-weight: 500;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: #6B6F76;
    margin: 0 0 1rem;
  }
  input {
    width: 100%;
    box-sizing: border-box;
    font-size: 1rem;
    padding: 0.625rem 0.75rem;
    border: 1px solid rgba(0,0,0,0.12);
    border-radius: 6px;
    margin-bottom: 0.75rem;
  }
  button {
    width: 100%;
    font-size: 0.9375rem;
    font-weight: 500;
    padding: 0.625rem 0.75rem;
    border: none;
    border-radius: 6px;
    background: #17191D;
    color: #FAF9F7;
    cursor: pointer;
  }
  @media (prefers-color-scheme: dark) {
    button { background: #E8E6E1; color: #111316; }
  }
  p.error {
    color: #DC1500;
    font-size: 0.875rem;
    margin: 0 0 0.75rem;
  }
</style>
</head>
<body>
  <form method="POST">
    <p class="label">This site is private for now</p>
    ${error ? '<p class="error">Wrong password — try again.</p>' : ''}
    <input type="password" name="password" placeholder="Password" autofocus required />
    <button type="submit">Enter</button>
  </form>
</body>
</html>`;
}

const HTML_HEADERS = { 'content-type': 'text/html; charset=utf-8' };

export default async function middleware(request: Request): Promise<Response | undefined> {
  const password = process.env.SITE_PASSWORD;
  const url = new URL(request.url);

  // Fail closed: if the env var is missing/misconfigured, nobody gets in
  // rather than accidentally leaving the site open.
  if (!password) {
    return new Response(renderGate({ error: false }), { status: 401, headers: HTML_HEADERS });
  }

  if (request.method === 'POST') {
    const body = await request.text();
    const attempt = new URLSearchParams(body).get('password') ?? '';

    if (attempt === password) {
      const token = await sha256(password);
      const response = new Response(null, {
        status: 303,
        headers: { Location: url.pathname + url.search },
      });
      response.headers.append(
        'Set-Cookie',
        `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}`
      );
      return response;
    }

    return new Response(renderGate({ error: true }), { status: 401, headers: HTML_HEADERS });
  }

  const cookies = parseCookies(request.headers.get('cookie'));
  if (cookies[COOKIE_NAME] === (await sha256(password))) {
    return undefined; // authenticated — let the request through
  }

  return new Response(renderGate({ error: false }), { status: 401, headers: HTML_HEADERS });
}
