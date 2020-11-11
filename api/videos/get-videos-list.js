import Video from './video-model.js'

export default async function getVideosList(req, res) {
	const { limit = 20, offset = 0 } = req.query

	const videos = await Video.find().skip(parseInt(offset)).limit(parseInt(limit))

	return res.send(videos)
}
