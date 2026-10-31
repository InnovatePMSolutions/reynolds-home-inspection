# Reynolds Home Inspection — Website README

Single-page website for Reynolds Home Inspection, a veteran-owned property inspection company serving Chicago and surrounding suburbs. Live at https://reynoldsinspectionservices.com/

---

## Files to Deploy

```
index.html     → Page content
styles.css     → Styles and responsive layout
script.js      → Theme toggle, mobile menu, smooth scroll, form handling
og-image.jpg   → 1200x630 social share image (Open Graph / Twitter card)
README.md      → This file (optional to deploy)
```

---

## Page Sections

1. **Hero** — Asset-protection advisor positioning, license and appointment badges, "Schedule Your Inspection" CTA.
2. **Trust & Credentials** — Veteran-Owned, Inspections by Appointment, Licensed Inspector (Illinois License #450012531), Chicago & Suburbs, Multi-System Walkthrough, Reports within 24–48 Hours.
3. **An Inspection in 3 Simple Steps** — Request & Quote, On-Site Inspection, Fast Report & Review Call.
4. **About** — Military-discipline and advisor framing. No inspector or team photos.
5. **Services** — Core: Residential Buyer's, Pre-Listing Seller's, Investment Property. Premium add-ons: Mold & IAQ Sampling and Sewer Line Video Scope.
6. **For Agents** — Referral partner messaging for agents and attorneys.
7. **Contact** — Operational Transparency notice, phone/email, hours, Formspree-powered form.
8. **Footer**

## Business Details (Current)

| Item | Value |
|---|---|
| Phone | +1 (773) 547-0434 |
| Email | info@reynoldsinspectionservices.com |
| License | Illinois Licensed Home Inspector, License #450012531 |
| Hours | Monday–Friday, 8:00 AM – 5:00 PM; weekends available by appointment |
| Scheduling | Inspections by appointment only |
| Analytics | Google Analytics `G-12Y1KSW8J0`, Microsoft Clarity `x6fz7l21o5` |

Search `index.html` for these values to change them. Hours also appear in the JSON-LD `openingHours` field (`Mo-Fr 08:00-17:00`).

## Content Not Yet on the Site

These were removed rather than published with unverified or placeholder content. Add them back only when real:

- **Client reviews** — Add a testimonials section only with real, permissioned reviews (Google Business Profile is a good source). Add a "Reviews" link back to the nav when ready.
- **Star rating** — Show a rating (and add `aggregateRating` to the JSON-LD) only if it matches your actual Google Business Profile rating and review count.
- **Certifications and insurance** — Add trust cards for these once you have exact details (e.g., InterNACHI/ASHI membership, E&O and general liability coverage).
- **Sample report PDF** — Add `sample-report.pdf` and a download button in Step 2 of the process section.
- **Radon testing** — Removed from services, footer, meta description, and structured data.

## Contact Form

The form posts to Formspree (`action` attribute on `#contactForm`; `script.js` submits via `fetch`). Submissions go to the email on the Formspree account. After any change, submit a test message and confirm it arrives.

## Deploying

Upload all deployment files to the same folder of your host (Netlify, GitHub Pages, or similar). For GitHub: commit the files to the repository root and let your host redeploy. Keep file names exactly as listed so `og-image.jpg` resolves at `https://reynoldsinspectionservices.com/og-image.jpg`.

## Launch / Update Checklist

- [ ] Canonical, `og:url`, and JSON-LD `url` all read `https://reynoldsinspectionservices.com/` (no `.com.com`)
- [ ] `og-image.jpg` loads at `/og-image.jpg` (test with a social share debugger)
- [ ] Phone link `tel:+17735470434` works on mobile
- [ ] Form test submission received
- [ ] Google Analytics Realtime shows a visit; Clarity dashboard shows a session
- [ ] No `PLACEHOLDER`, `[CLIENT`, or "Radon" text remains (search the page source)
- [ ] Check layout in Chrome, Safari, Firefox, Edge, plus iPhone and Android
- [ ] Run Lighthouse (Performance, Accessibility, SEO) in Chrome DevTools

## Technical Notes

- Vanilla HTML, CSS, and JavaScript — no frameworks or build step.
- Colors and spacing are CSS variables at the top of `styles.css` (`--color-navy`, `--color-gold`, etc.).
- Dark mode toggle persists in `localStorage`.
- Smooth anchor scrolling accounts for the sticky header in `script.js`.
- The hero background is a gradient; to use a photo, set `background-image: url('hero-bg.jpg')` on `.hero-bg`.
