import path from 'path'
import gcs from '@google-cloud/storage'
import ffmpeg from 'fluent-ffmpeg'

const { ASSETS_BUCKET } = process.env

export const videosFolder = 'videos/'
export const thumbnailsFolder = 'thumbnails/'

function captureThumbnail(file) {
	return new Promise((resolve) => {
		ffmpeg(file.tempFilePath).screenshot({
			count: 1,
			folder: '/tmp',
			timestamps: [5],
			filename: 'thumbnail-at-%s-seconds.png',
			size: '320x180',
		})
			.on('end', () => {
				resolve('/tmp/thumbnail-at-5-seconds.png')
			})
	})
}

export default async function uploadVideoAndThumb(video, file) {
	const storage = new gcs.Storage()
	const bucket = storage.bucket(ASSETS_BUCKET)

	if (!file.mimetype.includes('video')) throw new Error('Provided file is not a video')

	const videoFileName = videosFolder + video._id + path.extname(file.name)

	await bucket.upload(file.tempFilePath, {
		gzip: true,
		destination: videoFileName,
		metadata: {
			contentType: file.mimetype,
		},
	})

	const thumbnail = await captureThumbnail(file)
	const thumbFileName = thumbnailsFolder + video._id + '.png'
	await bucket.upload(thumbnail, {
		gzip: true,
		destination: thumbFileName,
		metadata: {
			contentType: 'image/png',
		},
	})

	return {
		videoUrl: `https://storage.googleapis.com/${ASSETS_BUCKET}/${videoFileName}`,
		thumbUrl: `https://storage.googleapis.com/${ASSETS_BUCKET}/${thumbFileName}`,
	}
}
