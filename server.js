import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'

import api from './api/index.js'

const app = express()

const { DB_CONNECTION_STRING, PORT = 8080 } = process.env

mongoose
	.connect(DB_CONNECTION_STRING, {
		auth: { authdb: 'admin' },
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.catch(err => {
		console.log('Unable to connect', err)
	})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (_, res) => {
	res.send('Running')
})

app.use('/api', api)

app.listen(PORT, () => {
	console.log(`Server started on: ${PORT}`)
})
