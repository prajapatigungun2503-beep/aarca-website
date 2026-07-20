# Vercel Deployment Steps for AARCA Website

This guide covers deploying the site to Vercel and setting up Google Sheets for enquiry storage.

## 1) Create a Vercel account

1. Go to https://vercel.com/
2. Sign up with GitHub
3. Import this repository

## 2) Prepare the project for Vercel

The repository already includes:
- `package.json` with `googleapis`
- `vercel.json` routing
- `api/submit-form.js` serverless function

## 3) Update the form in `contact.html`

The contact form should post to:

```html
<form
  id="enquiry-form"
  class="contact-form"
  name="aarca-enquiry"
  method="POST"
  action="/api/submit-form"
>
```

This is already configured in the project.

## 4) Create a Google Cloud service account and Sheets

1. Open Google Cloud Console: https://console.cloud.google.com/
2. Create or select a project.
3. Go to `IAM & Admin` → `Service Accounts`.
4. Create a service account.
5. Add a JSON key and download it.
6. Create a Google Sheet and name the first tab `Sheet1`.
7. Share the spreadsheet with the service account email from the JSON key.
8. Copy the spreadsheet ID from its URL.

## 5) Add environment variables in Vercel

In your Vercel project settings, add:

- `SPREADSHEET_ID` = your Google Sheet ID
- `GOOGLE_CLIENT_EMAIL` = service account email
- `GOOGLE_PRIVATE_KEY` = service account private key (use `\n` for newlines)

## 6) Deploy

1. In Vercel, click **Deploy**.
2. Wait for the deployment to finish.
3. The site will be live at a Vercel URL.

## 7) View enquiries

- Open the Google Sheet and share it with your client.
- Each submitted enquiry will appear as a new row.
- You can also export the sheet to CSV.

## Notes

- GitHub Pages cannot run the serverless function. Vercel is required for this Google Sheets setup.
- If you want, I can also add a simple `success` message directly in the form flow so the user sees the right page after submission.
