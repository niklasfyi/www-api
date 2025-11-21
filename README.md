# IndieWeb API

Combined API hosting **IndieAuth**, **Micropub**, and **Webmentions** endpoints for the IndieWeb. This project combines three serverless Netlify function repositories into a single unified API.

## Features

- 🔐 **IndieAuth**: Full IndieAuth server implementation with authorization and token endpoints
- 📝 **Micropub**: Create, update, and delete posts with support for multiple post types
- 💬 **Webmentions**: Receive, process, and manage webmentions for your site

## Setup

### Prerequisites

- A [Netlify](https://www.netlify.com/) account
- A [GitHub](https://github.com/) account and repository for storing content (for Micropub)
- Your own website domain

### Environment Variables

Configure the following environment variables in Netlify:

#### IndieAuth (Required)

| Variable | Description | How to Generate |
|----------|-------------|-----------------|
| `SECRET` | Random string for access token generation | `openssl rand -hex 16` or use [random string generator](https://generate-random.org/string-generator) |
| `PASSWORD_SECRET` | Bcrypt hashed password | `htpasswd -bnBC 10 "" your-password \| cut -d : -f 2` or use [bcrypt.io](https://www.bcrypt.io/) |

#### Micropub (Required)

| Variable | Description |
|----------|-------------|
| `ME` | Your website URL (e.g., `https://example.com/`) - must have trailing slash |
| `TOKEN_ENDPOINT` | Token endpoint URL (e.g., `https://your-api-domain.netlify.app/token`) |
| `GITHUB_TOKEN` | GitHub [Personal Access Token](https://github.com/settings/tokens) with repo access |
| `GITHUB_USER` | GitHub username where posts are stored |
| `GITHUB_REPO` | GitHub repository name where posts are stored |

#### Webmentions (Required)

| Variable | Description |
|----------|-------------|
| `URLS` | Comma-separated list of domains accepting webmentions (e.g., `https://example.com,https://www.example.com`) |
| `GENERATED_TOKEN` | Random token for protected endpoints | Use [random string generator](https://generate-random.org/string-generator) |

#### Optional

| Variable | Description |
|----------|-------------|
| `WEBHOOK` | URL to send POST requests after receiving webmentions (e.g., [ntfy.sh](https://ntfy.sh)) |

### Deployment

#### Option 1: Deploy to Netlify (Recommended)

1. Fork or clone this repository
2. Connect it to your Netlify account
3. Configure the environment variables in Netlify's dashboard
4. Deploy!

#### Option 2: Local Development

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your values
# Then start the development server
npm run dev
```

### Integration with Your Website

After deployment, add these tags to the `<head>` of your website:

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

## API Endpoints

### IndieAuth Endpoints

- `GET /.well-known/oauth-authorization-server` - IndieAuth server metadata
- `GET /auth` - Authorization endpoint (login form)
- `POST /auth` - Exchange code for profile information
- `POST /token` - Exchange code for access token
- `GET /token` - Verify token (legacy)
- `POST /introspect` - Token introspection
- `GET /userinfo` - User information

### Micropub Endpoints

- `POST /micropub` - Create, update, or delete posts
- `GET /micropub?q=config` - Get configuration
- `GET /micropub?q=source&url=<url>` - Get post source
- `POST /media` - Upload media files
- `GET /media?q=source` - List uploaded media

### Webmentions Endpoints

- `POST /webmention` - Receive webmentions
- `GET /webmentions?url=<url>` - Get webmentions for a URL
- `GET /webmentions?token=<token>` - Get all webmentions (admin)
- `GET /process` - Process queued webmentions
- `GET /import?token=<token>&webmentionio=<token>` - Import from webmention.io
- `DELETE /webmention?token=<token>&source=<url>&target=<url>` - Delete webmention

## Configuration

### Micropub Post Types

Modify `netlify/config-micropub.js` to customize:
- Content directory (default: `/src`)
- Media directory (default: `/uploads`)
- Supported post types
- Syndication targets
- Slug formatting

### Webmentions Processing

The `/process` endpoint can be configured to run on a schedule using Netlify's scheduled functions. Edit `netlify.toml` to adjust the schedule.

## Project Structure

```
www-api/
├── netlify/
│   ├── functions/          # Netlify serverless functions
│   │   ├── auth.js
│   │   ├── token.js
│   │   ├── introspect.js
│   │   ├── userinfo.js
│   │   ├── metadata.js
│   │   ├── micropub.js
│   │   ├── media.js
│   │   ├── webmention.js
│   │   ├── webmentions.js
│   │   ├── process.js
│   │   └── import.js
│   ├── config-indieauth.js    # IndieAuth configuration
│   ├── config-micropub.js     # Micropub configuration
│   └── config-webmentions.js  # Webmentions configuration
├── public/
│   └── index.html             # Landing page
├── .env.example               # Example environment variables
├── netlify.toml              # Netlify configuration
├── package.json
└── README.md
```

## Troubleshooting

- **IndieAuth**: Ensure `SECRET` and `PASSWORD_SECRET` are properly set
- **Micropub**: 
  - `ME` should have a trailing slash
  - GitHub token needs repo write permissions
  - Changes to environment variables require redeployment
- **Webmentions**: Ensure `URLS` includes all domains you want to accept webmentions for

## Credits

This project combines and builds upon:
- [serverless-indieauth](https://github.com/benjifs/serverless-indieauth) by [@benjifs](https://github.com/benjifs)
- [serverless-micropub](https://github.com/benjifs/serverless-micropub) by [@benjifs](https://github.com/benjifs)
- [serverless-webmentions](https://github.com/benjifs/serverless-webmentions) by [@benjifs](https://github.com/benjifs)

## License

MIT License - See individual source repositories for their respective licenses.

## References

- [IndieAuth Specification](https://indieauth.spec.indieweb.org/)
- [Micropub Specification](https://www.w3.org/TR/micropub/)
- [Webmention Specification](https://www.w3.org/TR/webmention/)
- [IndieWeb](https://indieweb.org/)
