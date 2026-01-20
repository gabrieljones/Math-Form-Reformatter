# Math-Form-Reformatter

A Progressive Web App (PWA) that takes a Google Form URL and extracts the five large images and formats them for printing on a single page.

## Project Structure
- `index.html`: The structure
- `style.css`: The look and print formatting
- `app.js`: The logic to fetch and extract images
- `manifest.json`: To make it installable
- `sw.js`: Service Worker for PWA capabilities

## How to use this
* **Hosting**: PWAs must be served over HTTPS. This repository is configured to deploy to GitHub Pages automatically via GitHub Actions.

## Deployment Configuration

This project is configured to deploy automatically to GitHub Pages using the `.github/workflows/deploy.yml` workflow when changes are pushed to the `main` branch.

### Troubleshooting: "Branch 'main' is not allowed to deploy"
If you encounter the error `Branch "main" is not allowed to deploy to github-pages due to environment protection rules` in the GitHub Actions tab, follow these steps:

1. Go to your repository **Settings**.
2. Click on **Environments** in the left sidebar.
3. Click on the **github-pages** environment.
4. Look for "Deployment branches and tags".
5. Click **Add deployment branch or tag rule**.
6. Select **Selected branches**, add `main`, and save.
   * Alternatively, if there is an existing rule restricting deployment to another branch (e.g., `gh-pages`), you can modify or remove it.

* **Usage**:
  * Open the site.
  * Paste the full URL (e.g., `https://docs.google.com/forms/d/e/..../viewform`).
  * **Note**: If you use the short `forms.gle` link, it might fail because the proxy handles redirects poorly. Always expand the link in your browser first, then copy the long version.
  * Click "Extract".
  * Once images load, click "Print Page".
