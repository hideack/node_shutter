
// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

const PORT = process.env.PORT || 5000

// Declare a route
fastify.get('/ping', function (request, reply) {
  reply.send({"ping":"pong"});
});

// Run the server!
fastify.listen(PORT, '0.0.0.0', function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
