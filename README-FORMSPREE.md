# Formspree Setup for AARCA Website

This guide helps you switch the contact form from Netlify/Vercel to Formspree so your site can work without Google Cloud.

## Why Formspree?

- No Google Cloud required
- No server code required
- Works with GitHub Pages, Vercel, Netlify, or any static host
- Submissions are stored in Formspree and emailed to you

## Steps to set it up

### 1) Create a Formspree account

1. Go to https://formspree.io/
2. Sign up for a free account
3. Create a new form
4. Copy the form endpoint URL, which looks like:
   ```
   https://formspree.io/f/your-form-id
   ```

### 2) Update the form action

The form in `contact.html` is already set to:

```html
<form
  class="contact-form"
  name="aarca-enquiry"
  method="POST"
  action="https://formspree.io/f/your-form-id"
>
  <input type="hidden" name="_next" value="/success.html" />
  <input type="hidden" name="form-name" value="aarca-enquiry" />
  <p class="hidden"><label>Do not fill this field <input name="bot-field" /></label></p>
  <!-- fields... -->
</form>
```

Replace `https://formspree.io/f/your-form-id` with your actual Formspree URL.

### 3) Verify the hidden field

The form includes the honeypot field with `name="bot-field"` to help block spam.

### 4) Set your redirect page

The `_next` hidden field sends users to `success.html` after submission:

```html
<input type="hidden" name="_next" value="/success.html" />
```

This is already configured.

### 5) Enable email notifications in Formspree

1. In Formspree dashboard, open your form settings
2. Enter your email address for notifications
3. Save settings

### 6) Share submissions with your client

- Formspree provides a dashboard with collected submissions
- You can invite your client as a team member, or
- Forward notification emails to them

## Notes

- Your website does not need Netlify build credits for this.
- Just pushing your GitHub changes is enough if the site is hosted on GitHub Pages or Vercel.
- If you later want the client to see submissions in a Google Sheet, that requires a different provider or service.

## What to do next

1. Sign up for Formspree
2. Replace the `action` URL in `contact.html`
3. Push the change
4. Deploy the site to the host you choose

If you want, I can also replace the placeholder Formspree URL in `contact.html` with your real form endpoint once you provide it.
