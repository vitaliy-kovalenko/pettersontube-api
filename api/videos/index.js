import express from 'express'

import uploadVideo from './upload-video.js'
import getVideosList from './get-videos-list.js'

const videos = express()

videos.get('/', getVideosList)
videos.post('/upload', uploadVideo)

export default videos
