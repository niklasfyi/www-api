import { wm } from '../config-webmentions.js'

export default async (request) => wm.webmentionHandler(request)
