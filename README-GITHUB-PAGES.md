# Deploying with GitHub Pages and handling form submissions

This file explains how to enable GitHub Pages for this repository and recommended options for receiving and viewing enquiries if you move off Netlify.

---

## 1) Enable GitHub Pages (publish `main` branch root)

1. Push all changes to your GitHub `main` branch.
2. Open the repository on GitHub.
3. Go to `Settings` → `Pages` (left sidebar or under "Code and automation").
4. Under "Build and deployment" choose:
   - Source: `Branch: main`
   - Folder: `/ (root)`
5. Click **Save**.
6. GitHub will provide a URL like `https://<username>.github.io/<repo>/`.

Notes: Pages serves static files directly from your repository. Any future `git push` to `main` will update the Pages site automatically.

## 2) Form handling when moving off Netlify

Netlify Forms stores submissions in Netlify. If you host the site on GitHub Pages or Vercel, Netlify Forms will not automatically collect submissions for that domain.

Options to preserve or replace Netlify form behavior:

### Option A — Use a third-party forms provider (recommended)
Services: Formspree, Getform, Formcarry, Basin, etc.

Steps (example with Formspree):
1. Create an account at https://formspree.io/ and create a new form endpoint.
2. You will get an endpoint URL like `https://formspree.io/f/<form-id>`.
3. Update your form in `contact.html`:

```html
<form action="https://formspree.io/f/<form-id>" method="POST">
  <input type="hidden" name="_next" value="/success.html">
  <!-- your other fields -->
</form>
```

4. Enable email notifications in the provider dashboard so your client receives submissions, and they can view submissions in the provider dashboard or export CSV.

Pros: Works on any host (GitHub Pages, Vercel), easy dashboard for client.
Cons: Some providers have free-tier limits.

### Option B — Keep Netlify Forms but send submissions to Netlify via API
Netlify provides a Forms API that can be used to programmatically create submissions, but it requires authentication (site access token) and is more advanced. Not recommended for simple static sites.

### Option C — Host on Vercel with a serverless endpoint
- Deploy to Vercel and add a serverless function to accept form POSTs and store/send the data (email, Google Sheets via webhook, or external API).
- More control, but requires coding and maintenance.

### Option D — Manual interim: continue using Netlify drag-and-drop for static site
- You can upload the static site folder directly in Netlify's Deploys area (drag-and-drop). That avoids build credits but requires manual uploads each time.

## 3) How your client can view enquiries (per option)
- Netlify Forms: Netlify dashboard → Forms → select your form (client can be invited as a Netlify collaborator).
- Formspree / Getform / Formcarry: Provider dashboard (view submissions, export CSV), and set email notifications to client.
- Vercel with backend: Store submissions in a DB (e.g., Airtable, Google Sheets) and grant client access, or email them.

## 4) Quick recommendation
- If you need an immediate free solution: use **Formspree** or **Getform** and update `contact.html` to point to the provider's endpoint. This requires no server and works on GitHub Pages.
- If you want to keep Netlify's dashboard experience but cannot use build credits, use **manual drag-and-drop deploy** on Netlify for now.

---

If you want, I can:
- Update `contact.html` to use Formspree and commit the change, or
- Create a small serverless submission example for Vercel, or
- Prepare a ZIP of the site for Netlify drag-and-drop deploy.

Tell me which path you prefer and I'll implement it.
