import { join } from 'node:path'
import * as Path from 'node:path'
import * as URL from 'node:url'
import express from 'express'

import photoRoutes from './routes/photo.ts'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)
const server = express()

server.use(express.static(join(__dirname, 'public')))
server.use(express.json({ limit: '50mb' }))
server.use(express.urlencoded({ extended: true, limit: '25mb' }))

server.use('/api/v1/photo', photoRoutes)
server.use('/api/*', (req, res) => {
  res.sendStatus(404)
})

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
