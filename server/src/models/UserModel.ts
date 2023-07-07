import mongoose from 'mongoose'
import PhotoModel from './PhotoModel'

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide a first name!'],
  },
  lastName: {
    type: String,
    required: [true, 'Please provide a last name!'],
  },
  username: {
    type: String,
    required: [true, 'Please provide a username!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email!'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
  },
  bio: {
    type: String,
    required: false,
  },
  isAvailable: {
    type: Boolean,
    default: false,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  socialMedia: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    required: false,
  },
  interests: {
    type: [
      {
        type: String,
        required: true,
      },
    ],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
    required: false,
    default:
      'https://res.cloudinary.com/dx6tl6aa2/image/upload/v1620149123/avatars/default-avatar.png',
  },
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PhotoModel',
    },
  ],
})

export default mongoose.model('User', UserSchema)
