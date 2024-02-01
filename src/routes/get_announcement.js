import currentAnnouncements from "../lib/announcements.js"

async function routes(fastify, _options) {

  fastify.get(
    '/announcements',
    async (request, reply) => {
      try {
        reply.code(200).send({
          success: true,
          announcements: currentAnnouncements()
        })
      } catch (error) {
        reply.code(500).send({ success: false, error: 'Internal Server Error' })
      }
    }
  )

}

export default routes
