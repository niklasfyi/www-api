import { wm } from '../config-webmentions.js'

export default async (request) => wm.importHandler(request)
