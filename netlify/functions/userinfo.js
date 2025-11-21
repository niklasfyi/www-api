import { indieauth } from '../config-indieauth.js'

export default async (request) => indieauth.userInfoEndpoint(request)
