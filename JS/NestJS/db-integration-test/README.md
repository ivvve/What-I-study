개인적으로 Node.js 기반 웹 애플리케이션 통합 테스트를 할 때 불편한 점은 DB 세팅이다.
사실상 모든 웹 애플리케이션은 DB를 사용하기 때문에 통합 테스트를 할 때 DB를 켜줘야한다.
물론 mock을 사용할 순 있겠지만 개인적으로 mock 객체나 함수를 셋업하는게 번거롭기도 하고, 실제 DB를 거치지 않으면 DB를 사용할 때 나오는 에러를 찾을 수 없기 때문이다.

그 동안 나는 통합 테스트를 할 때는 항상 로컬에서 DB를 킨 뒤에 테스트를 돌렸다.
그러다 보니 DB를 켜지 않거나 MongoDB transaction을 위해 Replica Set을 구성하지 않으면 테스트가 불가능 했다.
처음에 로컬에 테스트용 DB를 세팅하면 되긴하지만 새로운 테스트 환경이라면 이를 또 세팅하는게 여간 불편한 일이 아니고 또 DB가 꺼져있으면 다시 키는 것도 번거로웠다.
이러한 불편함 때문에 오랜만에 테스트를 돌리거나 새로운 테스트 환경에선 테스트를 돌리기 힘들었다.

하지만 테스트는 테스트를 하는 서버의 환경에 관계없이 돌아가야 테스트를 자주 또 편하게 실행할 수 있기 때문에 기존의 로컬에 테스트 DB를 직접 띄우는 방식을 변경할 필요를 느꼈고,
node.js 기반의 프로젝트에서 주로 사용되는 DB인 **SQL: MySQL**, **NoSQL: MongoDB**, **Cache(NoSQL): Redis** 세가지 DB를 테스트 시에 in-memory로 쉽게 띄우기 위해 알아본 여러 방법을 정리하고자 한다.

---

## SQL: MySQL

Spring Boot는 dependency 추가가 되어있다면 SQL DB를 쉽게 테스트할 수 있게 in-memory SQL DB인 H2를 Test 환경에서 실행시켜준다.
원래는 Spring 사용자이기 때문에 동일한 역할을 해줄 수 있는 패키지를 찾았으나 찾질 못했는데 그래서 선택한 방법이 MySQL Docker container를 사용하는 것이었다.
물론 Docker가 설치되어야 하고 Docker container 위에서 띄우는 것이기 때문에 순수하게 in-memory 라고 부를 순 없지만 테스트를 위한 용도로 MySQL Docker container를 띄우는것이 편리하고 일회용 DB 목적에도 알맞는 것 같다.

Docker API를 node.js 코드로 호출할 수 있는 [dockerode](https://github.com/apocas/dockerode)라는 패키지가 있는데, 이를 사용하여 테스트용 MySQL container를 띄울 수 있다.
아래는 단순한 사용법으로 [jest setupFiles](https://jestjs.io/docs/en/configuration.html#setupfiles-array) 설정에 테스트 시작 전에 MySQL container를 띄우고 테스트 종료 후 container를 내리는 스크립트를 넣는 방식을 사용할 수도 있겠다.

```js
const Docker = require('dockerode');

const port = 9000;
const password = 'password';

(async () => {
    const docker = new Docker({ socketPath: '/var/run/docker.sock' });
        
    const mysqlContainer = await docker.createContainer({
        Image: `mysql`, // MySQL Image가 미리 pull 되있어야한다
        Tty: false,
        ExposedPorts: {
          '3306/tcp': {}
        },
        HostConfig: {
          PortBindings: { '3306/tcp': [{ HostPort: `${port}` }] }
        },
        Env: [`MYSQL_ROOT_PASSWORD=${password}`],
        name: 'test-mysql'
    });

    await mysqlContainer.start();

    console.log(`MySQL for test is running on ${port} port`);

    await mysqlContainer.stop();
    await mysqlContainer.remove();

    console.log(`MySQL for test is down`);
})();
```

## NoSQL: MongoDB

## Cache(NoSQL): Redis

Redis는 

// redis-mock
// https://www.npmjs.com/package/redis-mock#cross-verification
// ioredis-mock
// https://www.npmjs.com/package/ioredis-mock


사실 Redis instance를 띄우는 것이 아니라 node redis library 커맨드를 in-memory로 할 수 있게 한 것

lua script를 사용한다면 해당 library를 사용하지 말고



하지만 `ioredis-mock`의 경우 `ioredis`의 모든 기능을 사용할 수 있는 것은 아니기 때문에 앱에서 사용하는 ioredis의 기능이 지원되는지 아래 링크를 통해 꼭 확인하길 바란다.
https://github.com/stipsan/ioredis-mock/blob/HEAD/compat.md

만약 lua script나 지원하지 않는 커맨드를 사용한다면 MySQL과 같이 Docker container를 띄워 사용하는 방식으로 테스트하면 될 듯하다.


다음은 Nest.js 애플리케이션 예제를 통해 Test DB를 세팅하고 이를 통해 테스트를 하는 방법을 알아보겠다.