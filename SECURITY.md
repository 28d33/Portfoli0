# Security Policy

This site is a static portfolio: no backend, no cookies, no analytics, no
third-party runtime dependencies. Everything it loads is served from the same
origin.

## Reporting a vulnerability

Email **d33kshith@proton.me** (or open a private security advisory on GitHub)
with steps to reproduce. Please do not file a public issue.

- Acknowledgement within 72 hours
- Expected fix for valid, in-scope reports: 7 days
- No bounty is offered; credit is given if you want it

## Scope

In scope: `https://portfolio-d33.vercel.app/` — XSS, CSP bypass, cache
poisoning, supply-chain or dependency issues, exposed secrets, and any
misconfiguration in `vercel.json`.

Out of scope: volumetric/DoS testing, missing headers on third-party services,
automated scanner output without a demonstrated impact, and social engineering.

## Baseline

- Strict CSP (`default-src 'none'`, `script-src 'self'`), no inline handlers
- All JS, CSS, fonts and icons vendored and pinned in this repository
- HSTS preload, `X-Frame-Options: DENY`, `nosniff`, COOP/CORP, locked Permissions-Policy
- No HTML interpolation of user input (the terminal renders typed text via `textContent`)
