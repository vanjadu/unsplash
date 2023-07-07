import mongoose from 'mongoose'
import UserModel from './UserModel'

const PhotoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Please provide a title!'],
  },
  description: {
    type: String,
    required: false,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  camera: {
    type: String,
    required: false,
  },
  tags: {
    type: [
      {
        type: String,
        required: true,
      },
    ],
    required: false,
  },
})

export default mongoose.model('Photo', PhotoSchema)
