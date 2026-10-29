const canonicalHost = 'taxguidekorea.com';

const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; upgrade-insecure-requests",
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Permissions-Policy': 'camera=(), geolocation=(), microphone=(), payment=(), usb=()',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY'
};

function withSecurityHeaders(response) {
  const securedResponse = new Response(response.body, response);

  for (const [name, value] of Object.entries(securityHeaders)) {
    securedResponse.headers.set(name, value);
  }

  return securedResponse;
}

export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.hostname === `www.${canonicalHost}`) {
    url.protocol = 'https:';
    url.hostname = canonicalHost;
    url.port = '';

    return withSecurityHeaders(Response.redirect(url.toString(), 301));
  }

  return withSecurityHeaders(await context.next());
}
