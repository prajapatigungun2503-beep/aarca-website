# Vercel Hosting and Google Sheets Form Submission

This repository can be hosted on Vercel with a serverless function that logs enquiry submissions to Google Sheets.

## How it works

- `contact.html` posts the form to `/api/submit-form`.
- `api/submit-form.js` runs on Vercel and writes the submission to Google Sheets.
- This avoids Netlify build credit issues and still stores enquiries in a spreadsheet.

## Files added for Vercel

- `package.json` — includes the Google APIs dependency.
- `vercel.json` — configures the serverless route.
- `api/submit-form.js` — serverless function that writes submissions to Google Sheets.

## Required setup

### 1) Create a Google Cloud service account

1. Open Google Cloud Console: https://console.cloud.google.com/
2. Create or select a project.
3. Go to `IAM & Admin` → `Service Accounts`.
4. Create a service account.
5. Under the account, create a JSON key and download it.
6. Copy these values from the JSON key:
   - `client_email`
   - `private_key`

### 2) Configure Google Sheets

1. Create a Google Sheet.
2. Name the first tab `Sheet1`.
3. Share the sheet with the service account email (`client_email`) with Editor access.
4. Copy the sheet ID from the URL: `https://docs.google.com/spreadsheets/d/<sheetId>/edit`

### 3) Set Vercel environment variables

In your Vercel project settings, add:

- `SPREADSHEET_ID` = your sheetId
- `GOOGLE_CLIENT_EMAIL` = service account `client_email`
- `GOOGLE_PRIVATE_KEY` = service account `private_key` (exactly as in JSON; preserve newlines by replacing actual line breaks with `\n` if needed)

Example replacement:

```
-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkq...\n-----END PRIVATE KEY-----\n
iwIDAQAB
```

### 4) Deploy to Vercel

1. Install Vercel CLI or connect your GitHub repository at https://vercel.com.
2. Deploy the project.
3. Vercel will build and host the site, including the serverless function at `/api/submit-form`.

## How the client can view enquiries

- Open the Google Sheet you shared with the service account.
- The sheet will receive a new row for each enquiry.
- Share the sheet with your client or give them viewer/editor access.

## Notes

- If you use GitHub Pages, this same serverless function will not work there. Vercel is required for the API route.
- Your `contact.html` will post to the Vercel endpoint and then should redirect to `success.html` after success.

## Next steps

If you want, I can also update `contact.html` to include a client-friendly success redirect after posting the form.
