# TAXPERTIZE Website

A responsive, static business website for TAXPERTIZE. It uses HTML, CSS and vanilla JavaScript.

## Files
- `index.html` — website content and structure
- `styles.css` — responsive styling
- `script.js` — mobile menu and enquiry form behaviour
- `config.js` — business contact settings

## Before publishing
1. Open `config.js`.
2. Replace `YOUR_EMAIL@example.com` with your business email.
3. Replace `91XXXXXXXXXX` with your WhatsApp number, including country code and digits only.
4. Save the file.

The enquiry form opens the visitor's email app if an email is configured; otherwise it opens WhatsApp if a number is configured. It does not store enquiries in a database.

## Preview locally
Open `index.html` in a modern web browser.

## Publish with GitHub + Cloudflare Pages
1. Upload all four files (`index.html`, `styles.css`, `script.js`, `config.js`) to the root of your GitHub repository.
2. In Cloudflare, open **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select the GitHub repository.
4. Choose production branch `main`.
5. For a plain HTML site, leave the build command blank and set the build output directory to `/` (or `.` if the interface requires a relative directory).
6. Deploy. Cloudflare will provide a `*.pages.dev` address.

## Customise
Edit the text in `index.html` and styles in `styles.css`. Do not publish until contact details and all business claims have been checked.

## Important
This is a starter website, not legal or tax advice. Review service descriptions, business identity, contact information, privacy wording and any required professional disclosures before going live.
