import express from "express";
import cors from 'cors'
import winston from 'winston'
import dotenv from 'dotenv';
// routes
import owner from './routes/owner.js'

const app = express()
app.use(express.json())
app.use(cors())
app.use('/owner', owner)

app.use((error, req, res, next) => {
  logger.error(`Error processing request: ${req.method} - ${req.baseUrl} - ${error.message ?? JSON.stringify(error)}`)
  res.status(400).send({ error: error.message ?? error })
})

app.listen(3000, () => console.log('API started on port 3000'))

dotenv.config();

const { combine, timestamp, label, printf } = winston.format
const formatLog = printf(({level, message, label, timestamp}) => {
  return `${timestamp} [${label}] ${level} ${message}`
})
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'petshop-api.log' })
  ],
  format: combine(
    label({ label: 'Petshop API'}),
    timestamp(),
    formatLog
  )
})