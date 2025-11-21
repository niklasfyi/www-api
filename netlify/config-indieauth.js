import { AuthHandler } from '@benjifs/indieauth'

const { SECRET, PASSWORD_SECRET } = process.env

export const indieauth = new AuthHandler({
	secret: SECRET,
	passwordSecret: PASSWORD_SECRET,
})
