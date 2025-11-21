import { micropub } from '../config-micropub.js'

export default async (request) => micropub.micropubHandler(request)
