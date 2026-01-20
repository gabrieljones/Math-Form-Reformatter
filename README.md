# Math-Form-Reformatter

A Progressive Web App (PWA) that takes a Google Form URL and extracts the five large images and formats them for printing on a single page.

## Project Structure
- `index.html`: The structure
- `style.css`: The look and print formatting
- `app.js`: The logic to fetch and extract images
- `manifest.json`: To make it installable
- `sw.js`: Service Worker for PWA capabilities

## How to use this
* **Hosting**: PWAs must be served over HTTPS. The easiest way to run this for free is to upload the files to Netlify Drop or GitHub Pages.
* **Usage**:
  * Open the site.
  * Paste the full URL (e.g., `https://docs.google.com/forms/d/e/..../viewform`).
  * **Note**: If you use the short `forms.gle` link, it might fail because the proxy handles redirects poorly. Always expand the link in your browser first, then copy the long version.
  * Click "Extract".
  * Once images load, click "Print Page".
