import games from "../lib/game_list.js"
import { GameNotInProgress } from "../game/game_exceptions.js"

async function routes(fastify, _options) {

  fastify.post(
    '/game/:player/:id',
    async (request, reply) => {
      const requestBody = request.body
      const { row, col } = requestBody
      const gameId = request.params.id

      const game = games.get(gameId)

      if(!game) return reply.send({ success: false, error: 'Game not found' })
      if(game.creator !== request.params.player) return reply.send({ success: false, error: 'Game not found' })

      let cell

      try {
        cell = game.play(row, col)
        console.log(`Cell ${row} ${col} played by ${request.params.player}`)
        console.log(`Cell content: ${cell}`)
      }catch(err) {
        if(err instanceof GameNotInProgress) {
          games.remove(gameId)
          return reply.send({ success: false, error: 'Game not in progress' })
        }
      }

      reply.code(200).send({
        success: true,
        content: cell
      })
    }
  )
}

export default routes
