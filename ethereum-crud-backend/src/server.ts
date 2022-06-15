import express, { Express } from 'express'

import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from "mongoose"
import routes from './routes'

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${process.env.MONGO_URL}`)
})

const app: Express = express()

app.use(cors())
app.use(bodyParser.json())       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))  // to support URL-encoded bodies

app.use('/api', routes)

app.use(express.static(`${__dirname}/build`))

app.use('/*', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`)
})

app.listen(process.env.PORT || 5000, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server is Runing....Port: ${process.env.PORT || 5000}`)
})

