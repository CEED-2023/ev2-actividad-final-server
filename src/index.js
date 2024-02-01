import Fastify from 'fastify'
import websocket from '@fastify/websocket'
import fastifyCors from '@fastify/cors'

const DEFAULT_PORT = 3000
const PORT = process.env.PORT || DEFAULT_PORT // Heroku assigns you a port

import delayMiddleware from './middleware/delay_middleware.js'

import createGame from './routes/create_game_route.js'
import revealCell from './routes/reveal_cell_route.js'
import announcements from './routes/get_announcement.js'

const fastify = Fastify({
  logger: true
})
await fastify.register(websocket)

fastify.register(fastifyCors, {
  origin: '*', // Allow from any origin, so the students can test it from their own computers
  methods: ['GET', 'PUT', 'POST', 'DELETE']
})

// Adds a delay to all requests
const MIN_DELAY = 500
const MAX_DELAY = 2000
const EXCEPTIONS = [/.*\/docs\//]
fastify.addHook('onRequest', delayMiddleware(MIN_DELAY, MAX_DELAY, EXCEPTIONS))

try {
  fastify.register(createGame)
  fastify.register(revealCell)
  fastify.register(announcements)

  fastify.listen({ port: PORT, host: '0.0.0.0' })

} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
