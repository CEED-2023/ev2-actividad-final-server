import games from "../lib/game_list.js"

async function routes(fastify, _options) {

  fastify.post(
    '/game/:player/:id',
    async (request, reply) => {
      const requestBody = request.body
      const { row, col } = requestBody

      const game = games.get(request.params.id)

      if(!game) return reply.send({ success: false, error: 'Game not found' })
      if(game.creator !== request.params.player) return reply.send({ success: false, error: 'Game not found' })

      const cell = game.play(row, col)
      console.log(`Cell ${row} ${col} played by ${request.params.player}`)
      console.log(`Cell content: ${cell}`)

      // Validate that the game belongs to the user

      reply.code(200).send({
        success: true,
        content: cell
      })
    }
  )
}

export default routes
