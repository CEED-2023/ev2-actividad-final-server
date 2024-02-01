import Game from "../game/game.js"
import randomId from "../game/random_id.js"
import games from "../lib/game_list.js"

const SETTINGS = {
  'EASY': { height: 9, width: 9, mines: 10 },
  'MEDIUM': { height: 16, width: 16, mines: 40 },
  'HARD': { height: 16, width: 30, mines: 99 },
}

async function routes(fastify, _options) {

  fastify.post(
    '/create-game',
    async (request, reply) => {
      try {
        const requestBody = request.body
        const { player, difficulty } = requestBody
        console.log(`Creating game for ${player} with difficulty ${difficulty}`)

        const gameSettings = SETTINGS[difficulty]
        if(!gameSettings) return reply.send({ success: false, error: 'Invalid settings' })

        const { height, width, mines } = SETTINGS[difficulty]

        const id = randomId()
        const game = new Game(player, height, width, mines)
        games.add(id, game)

        console.log(`Game ${id} created by ${player}`)

        reply.code(200).send({
          success: true,
          id,
          height, width, mines
        })
      } catch (error) {
        console.error('Error processing JSON:', error)
        reply.code(500).send({ success: false, error: 'Internal Server Error' })
      }
    }
  )

}

export default routes
