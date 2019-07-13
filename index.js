
// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

const puppeteer = require('puppeteer');
const fs = require('fs');

const PORT = process.env.PORT || 5000

// Declare a route
fastify.get('/', function (request, reply) {
  (async () => {
    const url = 'https://www.remp.jp/hello';
    const browser = await puppeteer.launch({
      args: [
        '--enable-font-antialiasing',
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({path: 'example.png'});
    await browser.close();

    fs.readFile('example.png', (err, data) => {
      reply.header('Content-Type', 'image/png').header('Content-Length', data.length).send(data);
    });

  })();
});

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
