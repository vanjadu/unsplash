import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

const connectDB = async () => {
  if (!MONGODB_URI) throw new Error('No MongoDB URI provided!')

  try {
    await mongoose.connect(MONGODB_URI)

    console.log('MongoDB connected!')
  } catch (error) {
    console.log('MongoDB connection failed!')

    console.log(error)
  }
}

export default connectDB
