const { MongoMemoryServer, MongoMemoryReplSet } = require('mongodb-memory-server');

async function standAlone() {
  const mongod = new MongoMemoryServer({
    autoStart: false,
    binary: {
      version: '4.2.5'
    },
    instance: {
      storageEngine: 'wiredTiger'
    }
  });

  await mongod.start();

  const connectionString = await mongod.getConnectionString();
  console.log(`MongoDB Memory Server started: ${connectionString}`);
  

  await mongod.stop();
  console.log('MongoDB Memory Server terminated');
}

async function replicaSet() {
  const replSet = new MongoMemoryReplSet({
    autoStart: false,
    binary: {
      version: '4.2.5'
    },
    instance: {
      storageEngine: 'wiredTiger'
    },
    replSet: {
      count: 2 // number of mongodb instances
    }
  });

  await replSet.start();
  await replSet.waitUntilRunning();

  const connectionString = await replSet.getConnectionString();
  console.log(`MongoDB Memory Replica Set started: ${connectionString}`);
  

  await replSet.stop();
  console.log('MongoDB Memory Replica Set terminated');
}
