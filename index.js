
// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

const puppeteer = require('puppeteer');
const fs = require('fs');
const crypto = require('crypto');

const KEY=process.env.SHUTTER_KEY || 'sample-key';
const PORT = process.env.PORT || 5000;

// Declare a route
fastify.get('/', function (request, reply) {

  // Check key
  if (request.query.key != KEY) {
    reply.status(401).send("Unauthorized");
    return;
  }

  (async () => {
    const url = request.query.url;
    const sha1 = crypto.createHash('sha1')
    const fileName = `screenshots/${sha1.update(url).digest('hex')}.png`;

    request.log.info(`Save screenshot : ${fileName}`)

    try {
      await fs.statSync(fileName);
      request.log.info(`Cache hit! : ${fileName}`)
    } catch (e) {
      const browser = await puppeteer.launch({
        timeout: 60000,
        args: [
          '--enable-font-antialiasing',
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
      });
      const page = await browser.newPage();
      page.setViewport({width: 1280, height: 1280});

      await page.goto(url);
      await page.screenshot({path: fileName});
      await browser.close();
    }

    await fs.readFile(fileName, (err, data) => {
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
