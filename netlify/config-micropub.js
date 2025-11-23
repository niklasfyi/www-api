import Micropub from '@benjifs/micropub'
import GitHubStore from '@benjifs/github-store'

const {
	ME,
	TOKEN_ENDPOINT,
	GITHUB_TOKEN,
	GITHUB_USER,
	GITHUB_REPO,
} = process.env

const store = new GitHubStore({
	token: GITHUB_TOKEN,
	user: GITHUB_USER,
	repo: GITHUB_REPO,
})

export const micropub = new Micropub({
	store,
	me: ME,
	tokenEndpoint: TOKEN_ENDPOINT,
    translateProps: false,
	contentDir: 'src/content',
	mediaDir: 'src/assets',
	// https://micropub.spec.indieweb.org/#configuration
	config: {
		'media-endpoint': 'https://api.niklas.fyi/media',
		// 'syndicate-to': [
		// 	{ uid: 'https://fed.brid.gy/', name: 'w/ Bridgy Fed', checked: true },
		// ],
		// 'post-types': [
		// 	{ type: 'note', name: 'Note' },
		// 	{ type: 'photo', name: 'Photo' },
		// 	{ type: 'reply', name: 'Reply' },
		// 	{ type: 'bookmark', name: 'Bookmark' },
		// 	{ type: 'like', name: 'Like' },
		// 	{ type: 'article', name: 'Article' },
		// 	{ type: 'rsvp', name: 'RSVP' },
		// 	{ type: 'repost', name: 'Repost' },
		// 	{ type: 'watch', name: 'Watch' },
		// 	{ type: 'read', name: 'Read' },
		// 	{ type: 'listen', name: 'Listen' },
		// 	{ type: 'game', name: 'Game' },
		// ],
	},
	formatSlug: (type, slug) => {
		// Normalize type to lowercase and ensure it is a valid folder name
		const typeFolder = type.toLowerCase().replace(/[^a-z0-9-]/g, '')

		// Ensure slug is a valid filename
		slug = slug.replace(/[^a-z0-9-]/gi, '-').toLowerCase()

		// If slug is empty, return the type folder
		if (!slug) {
			return typeFolder
		}
		// Check if slug starts with a Unix timestamp
		const timestampMatch = slug.match(/^(\d+)/)
		if (timestampMatch) {
			const timestamp = parseInt(timestampMatch[1], 10)
			const date = new Date(timestamp * 1000)
			const year = date.getUTCFullYear()
			const month = String(date.getUTCMonth() + 1).padStart(2, '0')
			return `${typeFolder}/${year}/${month}/${slug}`
		}
		
		// Fallback for non-timestamped slugs (e.g., custom article titles)
		return `${typeFolder}/${slug}`
	},
})
