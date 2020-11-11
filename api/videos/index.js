import express from 'express'
import fileUpload from 'express-fileupload'

import createVideo from './create-video.js'
import getVideo from './get-video.js'
import getVideosList from './get-videos-list.js'

const videos = express()

videos.get('/', getVideosList)
videos.get('/:id', getVideo)
videos.post(
	'/',
	fileUpload({ useTempFiles : true, tempFileDir : '/tmp/' }),
	createVideo,
)

export default videos
