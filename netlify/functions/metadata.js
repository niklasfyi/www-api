import { indieauth } from '../config-indieauth.js'

export const config = { path: '/.well-known/oauth-authorization-server' }

export default async (req) => indieauth.getMetadata(req, {
	issuer: process.env.URL,
	authorization_endpoint: `${process.env.URL}/auth`,
	token_endpoint: `${process.env.URL}/token`,
	introspection_endpoint: `${process.env.URL}/introspect`,
	userinfo_endpoint: `${process.env.URL}/userinfo`,
})
