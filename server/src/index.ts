import express from 'express'
import 'dotenv/config'
import db from './database/db'
import router from './routes/routes'

const app = express()
const PORT = process.env.PORT

db()

app.use(express.json())
app.use('/api', router)

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

process.on('unhandledRejection', (err: any) => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})
