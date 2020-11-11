import mongoose from 'mongoose'

const { Schema } = mongoose

const VideoSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: String,
		videoUrl: String,
		thumbUrl: String,
	},
	{
		timestamps: true,
	},
)

const Video = mongoose.model('Video', VideoSchema)

export default Video
