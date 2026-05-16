# EmailJS Setup Guide

## Overview
The contact form now sends emails to `info@cloudnetsoftwares.com` using EmailJS.

## Setup Instructions

### 1. Create an EmailJS Account
- Go to https://www.emailjs.com/
- Sign up for a free account
- Verify your email

### 2. Create an Email Service
1. In EmailJS dashboard, click **Services**
2. Click **Add New Service**
3. Choose **Email** (for Gmail)
4. Select **Gmail** provider
5. Click **Connect Account** and authorize
6. Click **Save**
7. Copy your **Service ID** (format: `service_xxxxx`)

### 3. Create an Email Template
1. Navigate to **Email Templates**
2. Click **Create New Template**
3. Use the following template:

```
From: {{from_name}} <{{from_email}}>
Phone: {{phone}}
Subject: {{subject}}

Message:
{{message}}
```

**Optional:** Customize the layout with HTML if needed.

4. Set **To Email** to: `info@cloudnetsoftwares.com`
5. Click **Save**
6. Copy your **Template ID** (format: `template_xxxxx`)

### 4. Get Your Public Key
1. Go to **Dashboard**
2. Click **Account**
3. Find **Public Key** section
4. Copy your public key

### 5. Create .env.local File
In your project root, create a file named `.env.local` (note: `.env` for production):

```
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
```

Replace the values with your actual EmailJS credentials.

### 6. Restart Development Server
```bash
npm start
```

### 7. Test the Form
- Go to the Contact page
- Fill out and submit a test message
- Check your `info@cloudnetsoftwares.com` inbox

## Troubleshooting

**Email not sending?**
- Verify all three environment variables are correctly set
- Check EmailJS dashboard for errors (Dashboard > Activity)
- Ensure your Gmail account has "Less secure app access" enabled (if using Gmail)
- Check browser console for error messages

**Getting "Failed to send message" error?**
- Verify Service ID is correct
- Verify Template ID is correct
- Make sure the template has `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{subject}}`, and `{{message}}` variables

## Cost
- EmailJS free plan: Up to 200 emails/month
- Perfect for small businesses and testing

## Security Notes
- Never commit `.env.local` to git (it's in .gitignore)
- Use environment variables for all sensitive data
- EmailJS uses secure HTTPS connections
