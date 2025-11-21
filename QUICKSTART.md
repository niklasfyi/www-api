# Quick Start Guide

## 1. Initial Setup

### Clone and Install
```bash
cd www-api
npm install
```

### Configure Environment Variables
```bash
cp .env.example .env
# Edit .env with your values
```

## 2. Generate Secrets

### IndieAuth Secret
```bash
openssl rand -hex 16
```

### Password Hash (replace 'yourpassword' with your actual password)
```bash
htpasswd -bnBC 10 "" yourpassword | cut -d : -f 2
```

### Webmentions Token
```bash
openssl rand -hex 32
```

## 3. GitHub Setup for Micropub

1. Create a Personal Access Token at https://github.com/settings/tokens
2. Select scopes: `repo` (full control of private repositories)
3. Copy the token and add to `GITHUB_TOKEN` in `.env`
4. Set `GITHUB_USER` to your GitHub username
5. Set `GITHUB_REPO` to the repository where you want posts stored

## 4. Deploy to Netlify

### Option A: Via Netlify UI
1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Connect to your Git repository
4. Add all environment variables from your `.env` file
5. Deploy!

### Option B: Via Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify env:set SECRET "your-secret-here"
netlify env:set PASSWORD_SECRET "your-bcrypt-hash-here"
# ... set all other environment variables
netlify deploy --prod
```

## 5. Update Your Website

Add these tags to your website's `<head>` section (replace `your-api-domain` with your actual Netlify domain):

```html
<!-- IndieAuth -->
<link rel="indieauth-metadata" href="https://your-api-domain.netlify.app/.well-known/oauth-authorization-server">
<link rel="authorization_endpoint" href="https://your-api-domain.netlify.app/auth">
<link rel="token_endpoint" href="https://your-api-domain.netlify.app/token">

<!-- Micropub -->
<link rel="micropub" href="https://your-api-domain.netlify.app/micropub">
<link rel="micropub_media" href="https://your-api-domain.netlify.app/media">

<!-- Webmentions -->
<link rel="webmention" href="https://your-api-domain.netlify.app/webmention">
```

## 6. Test Your Setup

### Test IndieAuth
Visit: `https://your-api-domain.netlify.app/.well-known/oauth-authorization-server`

You should see JSON with your endpoint URLs.

### Test Micropub
Use a Micropub client like [Quill](https://quill.p3k.io/) to test posting.

### Test Webmentions
```bash
curl -X POST https://your-api-domain.netlify.app/webmention \
  -d source=https://example.com/post \
  -d target=https://yourdomain.com/page
```

## 7. Local Development

```bash
npm run dev
```

Visit http://localhost:8888 to see your local API.

## Common Issues

### "Unauthorized" errors in Micropub
- Check that `TOKEN_ENDPOINT` points to your deployed token endpoint
- Verify `ME` has a trailing slash
- Ensure GitHub token has correct permissions

### Webmentions not processing
- Verify `URLS` includes the domains you're accepting webmentions for
- Check that `GENERATED_TOKEN` is set for protected endpoints

### IndieAuth login fails
- Verify `PASSWORD_SECRET` is correctly hashed with bcrypt
- Check that `SECRET` is set and is a long random string

## Useful Commands

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Check for errors in functions
netlify functions:list

# View function logs
netlify functions:log function-name

# Test a function locally
netlify functions:invoke function-name
```

## Next Steps

1. Customize post types in `netlify/config-micropub.js`
2. Set up automated webmention processing
3. Configure custom domain in Netlify
4. Add syndication targets for POSSE
5. Explore IndieWeb tools at https://indieweb.org/
