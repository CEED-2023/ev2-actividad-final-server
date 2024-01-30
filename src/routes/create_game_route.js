import Game from "../game/game.js"
import randomId from "../game/random_id.js"

async function routes(fastify, _options) {

  fastify.post(
    '/create-game',
    async (request, reply) => {
      try {
        const requestBody = request.body
        const { player, height, width, mines } = requestBody

        const id = randomId()
        const game = new Game(player, height, width, mines)
        // TO-DO: list of games

        console.log(`Game ${id} created by ${player}`)

        reply.code(200).send({
          success: true,
          id
        })
      } catch (error) {
        console.error('Error processing JSON:', error)
        reply.code(500).send({ success: false, error: 'Internal Server Error' })
      }
    }
  )

}

export default routes
