const Docker = require('dockerode');

async function mysql() {
  const docker = new Docker({socketPath: '/var/run/docker.sock'});
  const port = '8000'; // port를 number로 하면 실행이 되질 않는다
  const password = 'devson1234!@#$';

  const mysqlContainer = await docker.createContainer({
    Image: 'mysql',
    name: 'mysql-test-db',
    Tty: false,
    Env: [`MYSQL_ROOT_PASSWORD=${password}`],
    ExposedPorts: {
      '3306/tcp': {}
    },
    PortBindings: {
      '3306/tcp': [{ HostPort: port }]
    }
  });

  await mysqlContainer.start();
  console.log('MySQL Container started');

  await mysqlContainer.stop();
  console.log('MySQL Container terminated');

  mysqlContainer.remove();
  console.log('MySQL Container removed');
}
