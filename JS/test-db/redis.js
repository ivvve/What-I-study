function redisMock() {
  const redis = require('redis-mock');
  const client = redis.createClient();

  client.set('message', 'hello world', (error, OK) => {
    console.log(OK);
    
    client.get('message', (error, message) => {
      console.log(message);
    });
  });
}

async function ioredisMock() {
  const redis = require('ioredis-mock');
  const client = new redis();

  await client.set('message', 'hello world');

  const message = await client.get('message');
  console.log(message);
}