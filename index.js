import express from "express";
import cors from 'cors'
import winston from 'winston'
import dotenv from 'dotenv';
// routes
import owner from './routes/owner.js'
import animal from './routes/animal.js'
import service from './routes/service.js'

const app = express()
app
  .use(express.json())
  .use(cors())
  .listen(3000, () => console.log('API started on port 3000'))

// routes
app
  .use('/owner', owner)
  .use('/animal', animal)
  .use('/service', service)

app.use((error, req, res, next) => {
  logger.error(`Error processing request: ${req.method} - ${req.baseUrl} - ${error.message ?? JSON.stringify(error)}`)
  res.status(400).send({ error: error.message ?? error })
})


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