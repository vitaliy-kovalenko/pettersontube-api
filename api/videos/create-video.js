import uploadVideoAndThumb from './upload-video.js'
import Video from './video-model.js'

export default async function createVideo(req, res) {
	const { body: { title, description } } = req
	const file = req.files && req.files.file

	if (!title) return res.status(400).send({ message: 'Please provide a title' })
	if (!file) return res.status(400).send({ message: 'Please provide a file' })

	const video = new Video({
		title,
		description,
	})

	try {
		const { videoUrl, thumbUrl } = await uploadVideoAndThumb(video, file)
		video.videoUrl = videoUrl
		video.thumbUrl = thumbUrl
	} catch(e) {
		return res.status(400).send({ message: `Unable to upload video file: ${e.message}` })
	}

	await video.save()
	return res.sendStatus(204)
}
