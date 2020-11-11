import express from 'express'

import videos from './videos/index.js'

const api = express()

api.use('/videos', videos)

export default api
