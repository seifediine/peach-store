import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.bold)
  } catch (error) {
    console.error(first)
    process.exit(1)
  }
}

export default connectDB
