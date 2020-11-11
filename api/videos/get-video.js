import Video from './video-model.js'

export default async function getVideo(req, res) {
	const { params: { id } } = req

	const video = await Video.findById(id)

	return res.send(video)
}
