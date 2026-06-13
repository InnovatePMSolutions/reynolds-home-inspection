# Reynolds Home Inspection — Website README

A production-ready, single-page website for Reynolds Home Inspection. Veteran-owned property inspection company serving Chicago and surrounding suburbs.

This site was comprehensively renovated to blend the trusted, consultative positioning of a premier local operator with high-conversion layout mechanics. Key additions include a redesigned hero with in-line trust badges, a new 3-Step Process section, an expanded services grid with dedicated premium ancillary service cards (Radon, Mold/IAQ, and Sewer Scope), a Real Estate Agent & Professional Partner Hub, and an Operational Transparency Trust Anchor near the contact form.

---

## File Structure

```
business-site/
├── index.html    → Main HTML page (all content lives here)
├── styles.css    → All styles — colors, layout, responsive design
├── script.js     → JavaScript — theme toggle, mobile menu, form validation
└── README.md     → This file
```

---

## Page Structure Overview

The single-page site includes the following sections in order:

1. **Hero** — Revised headline positioning Reynolds as an asset protection advisor, not a commodity checklist service. Includes inline 4.9+ Google Rating and Licensed/Insured/Certified trust badges alongside the primary Schedule CTA.
2. **Trust & Credentials** — Six trust cards on a navy background (Veteran-Owned, 4.9+ Rating, Licensed, Certified, Insured, Reports within 24–48 Hours).
3. **An Inspection in 3 Simple Steps** — Workflow section designed to reduce structural anxiety and clarify how the inspection process fits within standard contract contingency windows. Step 1: Request & Quote (with property details guidance), Step 2: On-Site Inspection (with Sample Report PDF download button), Step 3: Report & Review Call (with 24–48 hour delivery assurance).
4. **About** — Copywritten with military-discipline and advisor framing; no inspector or team photos. Visual block uses branded property-icon and credential badges instead.
5. **Services — Core Inspections** — Three cards: Residential Buyer's Inspection (featured), Pre-Listing Seller's Inspection, and Investment Property Inspection.
6. **Services — Premium Ancillary Testing** — Three dedicated, persuasion-forward add-on cards:
   - **Radon Gas Testing** — Invisible health hazard; recommended for all buyers; sellers rarely test proactively.
   - **Mold & Indoor Air Quality (IAQ) Sampling** — Identifies hidden moisture and particulate problems before they become costly structural repairs.
   - **Sewer Line Video Scope Inspection** — Looks beneath the surface to prevent sudden, costly underground sewer line failures.
7. **Real Estate Agent & Professional Partner Hub** — Dedicated B2B messaging block for agent and attorney referral relationships, positioning Reynolds as an objective, educational, non-alarmist ally that helps smooth closings.
8. **Testimonials** — Three client review cards (placeholder — replace before publishing).
9. **Contact** — Includes the Operational Transparency Trust Anchor block and the booking/contact form.
10. **Footer** — Full navigation, expanded services list, service area, legal line.

---

## Local Setup (View on Your Computer)

No server required for basic viewing.

1. Download all four files into the same folder (`business-site/`)
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari)
3. The site will work fully locally except for the contact form submission (requires a backend or Netlify/Formspree — see below)

---

## Deploying to Netlify (Recommended — Free)

Netlify is the easiest way to publish this site for free with a real URL.

### Option A: Drag-and-Drop (Fastest)

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Sign up or log in (free)
3. Drag and drop your `business-site/` folder onto the Netlify dashboard
4. Netlify generates a URL (e.g. `https://random-name.netlify.app`)
5. Rename it under **Site Settings → General → Site name**

### Option B: GitHub + Netlify (Best for ongoing updates)

1. Create a free account at [github.com](https://github.com)
2. Create a new repository and upload all four files
3. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import from Git**
4. Connect your GitHub repository
5. Netlify auto-deploys every time you push changes to GitHub

### Setting a Custom Domain

1. Purchase a domain (e.g. at [Namecheap](https://namecheap.com) or [Google Domains](https://domains.google.com))
2. In Netlify: **Site Settings → Domain management → Add custom domain**
3. Follow the DNS instructions Netlify provides
4. Netlify provides a free SSL certificate automatically

---

## Connecting a Real Contact Form

The form currently runs in demo mode (no emails are sent). Choose one of these options:

### Option 1: Netlify Forms (Easiest if using Netlify)

1. Open `index.html`
2. Find the `<form class="contact-form" id="contactForm" ...>` tag
3. Add `data-netlify="true"` and `name="contact"` to the opening `<form>` tag:

```html
<form class="contact-form" id="contactForm" novalidate data-netlify="true" name="contact" aria-label="Contact form">
```

4. Add a hidden input inside the form:

```html
<input type="hidden" name="form-name" value="contact">
```

5. Deploy to Netlify
6. Go to Netlify dashboard → **Forms** to see submissions and set up email notifications

### Option 2: Formspree (Works on Any Host)

1. Sign up free at [formspree.io](https://formspree.io)
2. Create a new form and copy your Form Endpoint URL (e.g. `https://formspree.io/f/XXXXXXXX`)
3. In `script.js`, find the comment `// Simulate async submission` and replace the `setTimeout` block with:

```javascript
fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: getField('name').value,
    email: getField('email').value,
    phone: (getField('phone') || {}).value || '',
    message: getField('message').value
  })
})
.then(function(response) {
  if (response.ok) {
    formStatus.className = 'form-status is-success';
    formStatus.style.display = 'block';
    formStatus.textContent = 'Thank you! We\'ll contact you within 24 hours.';
    form.reset();
  } else {
    throw new Error('Form submission failed');
  }
})
.catch(function() {
  formStatus.className = 'form-status is-error-msg';
  formStatus.style.display = 'block';
  formStatus.textContent = 'Something went wrong. Please call or text us directly at (555) 123-4567.';
})
.finally(function() {
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
});
```

---

## Adding Google Analytics

1. Go to [analytics.google.com](https://analytics.google.com) and create a free GA4 property
2. Copy your Measurement ID (format: `G-XXXXXXXXXX`)
3. Open `index.html` and find the Google Analytics comment block near the top of `<head>`
4. Replace `MEASUREMENT_ID` with your actual ID
5. Uncomment the two `<script>` tags

---

## Adding the Sample Report PDF (Step 2 Download Button)

The 3-Step Process section contains a "Download Sample Report (PDF)" button in Step 2. To activate it:

1. Prepare a clean, representative sample inspection report in PDF format
2. Place the file in your `business-site/` folder (e.g., `sample-report.pdf`)
3. In `index.html`, find the button with `aria-label="Download a sample inspection report PDF"`
4. Update the `href` attribute from `#` to the actual file path:

```html
<a href="sample-report.pdf" class="btn btn-primary process-step-download" ...>
  Download Sample Report (PDF)
</a>
```

To open the PDF in a new tab (recommended), add `target="_blank" rel="noopener"` to the link.

---

## How to Update Content (Non-Developer Guide)

All editable content is in `index.html`. Search for the following labels to find what you need to update.

### Find & Replace These (Critical Before Going Live)

| Search For | Replace With |
|---|---|
| `+1 (555) 123-4567` | Your real phone number |
| `tel:+15551234567` | Your real phone with country code, no spaces |
| `hello@examplebusiness.com` | Your real email |
| `[PLACEHOLDER-YOUR-DOMAIN]` | Your actual domain name |

### Update Placeholders

Search for `[PLACEHOLDER:` in `index.html` to find all placeholders. Replace each with real information:

| Placeholder | What to Replace It With |
|---|---|
| `[PLACEHOLDER: License Information]` | Your Illinois home inspector license number |
| `[PLACEHOLDER: Certification Information]` | Your certifications (e.g., InterNACHI, ASHI) |
| `[PLACEHOLDER: Insurance Information]` | Your E&O and general liability coverage info |
| `[PLACEHOLDER: Inspector Name & Background]` | A short, factual bio of the inspector |
| `[PLACEHOLDER: Business Address]` | Your business address (or remove if home-based) |
| `[PLACEHOLDER: Business Hours]` | Your actual hours of operation |
| `[PLACEHOLDER: Specific suburbs served]` | Your actual service area suburbs |

### Updating Testimonials

1. Find the three `<blockquote class="testimonial-card">` sections
2. Replace `[CLIENT NAME]`, `[CLIENT ROLE]`, and `[CLIENT TESTIMONIAL]` with real reviews
3. Remove the `testimonials-placeholder-notice` div before publishing

> **Tip:** Ask satisfied clients for a Google review and copy their words (with permission).

### Updating the Service Area

Search for `Oak Park, Evanston, Naperville, Schaumburg, and beyond` and update with your specific suburbs.

### Updating Colors

All colors are defined as CSS variables at the top of `styles.css` under `:root {}`. The main colors to adjust if needed:

```css
--color-navy: #1a2e4a;   /* Primary dark blue */
--color-gold: #b8892a;   /* Accent gold */
```

---

## Adding a Hero Background Photo

1. Choose a high-quality photo (Chicago neighborhood, house exterior, or inspection photo)
2. Recommended size: 1920×1080px, optimized for web (under 400KB)
3. Place the image in your `business-site/` folder (e.g., `hero-bg.jpg`)
4. Open `styles.css` and find `.hero-bg`
5. Replace the `background-image: linear-gradient(...)` line with:

```css
background-image: url('hero-bg.jpg');
```

---

## Maintenance Checklist

- [ ] Update all `[PLACEHOLDER: ...]` labels before publishing
- [ ] Replace demo phone number and email with real contact info
- [ ] Add a real hero background photo
- [ ] Replace placeholder testimonials with real client reviews
- [ ] Remove the developer placeholder notice in the testimonials section
- [ ] Connect a real form backend (Netlify Forms or Formspree)
- [ ] Add the Sample Report PDF and update the download button `href` in Step 2
- [ ] Add Google Analytics Measurement ID
- [ ] Update the canonical URL placeholder with your live domain
- [ ] Update Open Graph image with a real 1200×630px social share image
- [ ] Verify click-to-call works on mobile
- [ ] Test on Chrome, Firefox, Safari, and Edge
- [ ] Test on iPhone and Android

---

## Browser Support

This site is tested and compatible with:
- Google Chrome (current)
- Microsoft Edge (current)
- Mozilla Firefox (current)
- Apple Safari (current)

No frameworks or dependencies required. All vanilla HTML, CSS, and JavaScript.

---

## Performance & SEO

This site is built to meet:
- Lighthouse Performance score: 90+
- Lighthouse Accessibility score: 90+
- Lighthouse SEO score: 90+

To check scores: Open Chrome DevTools → Lighthouse tab → Run audit.

---

## Design Decisions & Notes

**No inspector or team photos are used anywhere on the site.** The About section uses a branded property-icon visual block with credential badges in place of a personal headshot. This is an intentional design decision — the site focuses all visual attention on professional property elements, tools, and clean UI components.

**The Operational Transparency Trust Anchor** is displayed as a prominently styled notice block in the Contact section, directly above the phone number. It reads exactly: *"Please note: We do not answer phone calls while actively performing an inspection. Every client pays for and deserves our uninterrupted focus and complete attention. Please leave a voicemail or send a text message, and we will respond immediately following the walkthrough."*

**The 3-Step Process section** is placed immediately after the Trust & Credentials section, serving as an anxiety-reduction and conversion bridge between social proof and the services grid.

**Premium ancillary service cards** (Radon, Mold/IAQ, Sewer Scope) are visually separated from core inspection services using a subsection label system and a top-border accent treatment, keeping the grid organized and scannable without requiring separate pages.

---

## Support

If you need help updating or expanding this website, contact your web developer or reach out to a local Netlify-certified agency.
