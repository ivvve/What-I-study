서비스가 커짐에 따라서 여러 기능이 추가가 되는데, 그러면서 애플리케이션의 복잡도가 높아져갈 수 밖에 없다.
개인적으로 개발자로서 중요한 것들 중 하나는 이러한 복잡도를 효율적으로 다루면서 동시에 잘 짜여진 구조를 만들어가는 것이라고 생각한다.
이러한 복잡도를 줄이는 방법으로는 여러가지가 있겠지만, 그 중에서 Nest.js framework를 통해 서비스의 기능을 하나의 repository 내에서 여러개의 모듈로 나눈 뒤에 이를 조합하여 하나의 실행가능한 애플리케이션을 만드는 방식을 대해 알아보도록 하겠다.

---

https://woowabros.github.io/study/2019/07/01/multi-module.html
https://www.youtube.com/watch?v=nH382BcycHc

Node.js 기반 애플리케이션에서 multi module monorepo를 구성할 수 있는 방법으로는 주로 [lerna](https://github.com/lerna/lerna), [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)를 사용하거나 혹은 이 둘을 같이 사용하는 방식이 있다.


도메인을 모듈로 나눠 이를 조합하여 하나의 monolith 애플리케이션을 만든다고 할 때
모듈 기반의 monorepo를 

Nest.js framework 통해 monorepo

Nest.js에서는 CLI를 통해 손쉽게 새로운 모듈을 추가
https://docs.nestjs.com/cli/monorepo

이러한 구조에서 가질 수 있는 장점은 각각의 모듈을 조립하여 여러개의 애플리케이션을 만들 수 있다는 것이다.
개인적으로 API server, Admin과 같이 
API server에서는 특정 모듈의 조회/업데이트 기능만 실행하고 , Admin에서는 생성/삭제같은 민감한 job을 실행하도록 애플리케이션을 만들 수 있을 것 이다.

---

Typeorm을 사용하는 user 모듈과, Mongoose를 사용하는 board 모듈, 그리고 공통으로 사용할 util 모듈을 만들고 이 모듈들을 사용하여 하나의 실행가능한 애플리케이션을 만들 것이다.


---


새로운 프로젝트 생성

```bash
$ nest new nestjs-multi-module-monorepo
```

![](2020-03-22-09-46-44.png)


Nest.js에서는 monorepo를 구성할 때 2가지로 Component로 패키지의 성격을 나누는데,

지금까지 글에서도 지칭하였고, 다른 프로젝트에서도 주로 모듈이라고 지칭하는 것을 Nest.js에서는 `library`이라고 지칭한다.
이 글에서는 library와 모듈을 동일한 것으로 지칭하도록 하겠다.
하나는 library를 조합하여 `app`


---



모듈도 그 성격에 따라 나누고 싶어 모듈을 domain과 common으로 나누었다

```
$ nest generate library util
? What prefix would you like to use for the library (default: @app)? @devson-common
CREATE libs/util/tsconfig.lib.json (218 bytes)
CREATE libs/util/src/index.ts (63 bytes)
CREATE libs/util/src/util.module.ts (182 bytes)
CREATE libs/util/src/util.service.spec.ts (446 bytes)
CREATE libs/util/src/util.service.ts (88 bytes)
UPDATE nest-cli.json (358 bytes)
UPDATE package.json (2138 bytes)
UPDATE test/jest-e2e.json (726 bytes)
UPDATE tsconfig.json (500 bytes)
```

그러면 다음과 같이 하위에 libs/common library가 생긴다
![](2020-03-21-23-00-48.png)

추가로 user, board library를 생성하자

```
$ nest generate library user
? What prefix would you like to use for the library (default: @app)? @devson-domain
CREATE libs/user/tsconfig.lib.json (218 bytes)
CREATE libs/user/src/index.ts (63 bytes)
CREATE libs/user/src/user.module.ts (182 bytes)
CREATE libs/user/src/user.service.spec.ts (446 bytes)
CREATE libs/user/src/user.service.ts (88 bytes)
UPDATE nest-cli.json (593 bytes)
UPDATE package.json (2266 bytes)
UPDATE test/jest-e2e.json (478 bytes)
UPDATE tsconfig.json (640 bytes)

$ nest generate library board
? What prefix would you like to use for the library (default: @app)? @devson-domain
CREATE libs/board/tsconfig.lib.json (219 bytes)
CREATE libs/board/src/index.ts (65 bytes)
CREATE libs/board/src/board.module.ts (187 bytes)
CREATE libs/board/src/board.service.spec.ts (453 bytes)
CREATE libs/board/src/board.service.ts (89 bytes)
UPDATE nest-cli.json (824 bytes)
UPDATE package.json (2390 bytes)
UPDATE test/jest-e2e.json (604 bytes)
UPDATE tsconfig.json (776 bytes)
```

그러면 다음과 같이 3개의 library가 생성된다

![](2020-03-21-23-03-55.png)

project root directory에 있는 파일들을 보면 `nest-cli.json`, `package.json`, `tsconfig.json`


```json
// package.json
{
  "name": "nestjs-monorepo",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\" \"libs/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^7.0.0",
    "@nestjs/core": "^7.0.0",
    "@nestjs/platform-express": "^7.0.0",
    "reflect-metadata": "^0.1.13",
    "rimraf": "^3.0.2",
    "rxjs": "^6.5.4"
  },
  "devDependencies": {
    "@nestjs/cli": "^7.0.0",
    "@nestjs/schematics": "^7.0.0",
    "@nestjs/testing": "^7.0.0",
    "@types/express": "^4.17.3",
    "@types/jest": "25.1.4",
    "@types/node": "^13.9.1",
    "@types/supertest": "^2.0.8",
    "@typescript-eslint/eslint-plugin": "^2.23.0",
    "@typescript-eslint/parser": "^2.23.0",
    "eslint": "^6.8.0",
    "eslint-config-prettier": "^6.10.0",
    "eslint-plugin-import": "^2.20.1",
    "jest": "^25.1.0",
    "prettier": "^1.19.1",
    "supertest": "^4.0.2",
    "ts-jest": "25.2.1",
    "ts-loader": "^6.2.1",
    "ts-node": "^8.6.2",
    "tsconfig-paths": "^3.9.0",
    "typescript": "^3.7.4"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": ".",
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "coverageDirectory": "./coverage",
    "testEnvironment": "node",
    "roots": [
      "<rootDir>/src/",
      "<rootDir>/libs/"
    ],
    "moduleNameMapper": {
      "@devson-common/util/(.*)": "<rootDir>/libs/util/src/$1",
      "@devson-common/util": "<rootDir>/libs/util/src",
      "@devson-domain/user/(.*)": "<rootDir>/libs/user/src/$1",
      "@devson-domain/user": "<rootDir>/libs/user/src",
      "@devson-domain/board/(.*)": "<rootDir>/libs/board/src/$1",
      "@devson-domain/board": "<rootDir>/libs/board/src"
    }
  }
}
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es2017",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "paths": {
      "@devson-common/util": [
        "libs/util/src"
      ],
      "@devson-common/util/*": [
        "libs/util/src/*"
      ],
      "@devson-domain/user": [
        "libs/user/src"
      ],
      "@devson-domain/user/*": [
        "libs/user/src/*"
      ],
      "@devson-domain/board": [
        "libs/board/src"
      ],
      "@devson-domain/board/*": [
        "libs/board/src/*"
      ]
    }
  },
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

```json
// nest-cli.json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "projects": {
    "util": {
      "type": "library",
      "root": "libs/util",
      "entryFile": "index",
      "sourceRoot": "libs/util/src",
      "compilerOptions": {
        "tsConfigPath": "libs/util/tsconfig.lib.json"
      }
    },
    "user": {
      "type": "library",
      "root": "libs/user",
      "entryFile": "index",
      "sourceRoot": "libs/user/src",
      "compilerOptions": {
        "tsConfigPath": "libs/user/tsconfig.lib.json"
      }
    },
    "board": {
      "type": "library",
      "root": "libs/board",
      "entryFile": "index",
      "sourceRoot": "libs/board/src",
      "compilerOptions": {
        "tsConfigPath": "libs/board/tsconfig.lib.json"
      }
    }
  },
  "compilerOptions": {
    "webpack": true
  }
}
```

trade-off이다.
libs를 하위로 더 나눌 경우 경로를 수정해야하는 작업이 추가되기 때문에 간단한 프로젝트라면 굳이 나눌 필요는 없겠지만,
나는 다양한 상황에서 써보고 싶어 나누었다.

libs에서 하위 디렉토리를 만들어 변경할 경우 수정이 필요한 곳은
/package.json
/tsconfig.json
/nest-cli.json
libs 하위 library의 tsconfig.lib.json에서 `extends`, `outDir`를 변경해야한다.

![](2020-03-21-23-04-54.png)

```json
// package.json
{
  "name": "nestjs-monorepo",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\" \"libs/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^7.0.0",
    "@nestjs/core": "^7.0.0",
    "@nestjs/platform-express": "^7.0.0",
    "reflect-metadata": "^0.1.13",
    "rimraf": "^3.0.2",
    "rxjs": "^6.5.4"
  },
  "devDependencies": {
    "@nestjs/cli": "^7.0.0",
    "@nestjs/schematics": "^7.0.0",
    "@nestjs/testing": "^7.0.0",
    "@types/express": "^4.17.3",
    "@types/jest": "25.1.4",
    "@types/node": "^13.9.1",
    "@types/supertest": "^2.0.8",
    "@typescript-eslint/eslint-plugin": "^2.23.0",
    "@typescript-eslint/parser": "^2.23.0",
    "eslint": "^6.8.0",
    "eslint-config-prettier": "^6.10.0",
    "eslint-plugin-import": "^2.20.1",
    "jest": "^25.1.0",
    "prettier": "^1.19.1",
    "supertest": "^4.0.2",
    "ts-jest": "25.2.1",
    "ts-loader": "^6.2.1",
    "ts-node": "^8.6.2",
    "tsconfig-paths": "^3.9.0",
    "typescript": "^3.7.4"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": ".",
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "coverageDirectory": "./coverage",
    "testEnvironment": "node",
    "roots": [
      "<rootDir>/src/",
      "<rootDir>/libs/"
    ],
    "moduleNameMapper": {
      "@devson-common/common/util/(.*)": "<rootDir>/libs/common/util/src/$1",
      "@devson-common/common/util": "<rootDir>/libs/common/util/src",
      "@devson-domain/domain/user/(.*)": "<rootDir>/libs/domain/user/src/$1",
      "@devson-domain/domain/user": "<rootDir>/libs/domain/user/src",
      "@devson-domain/domain/board/(.*)": "<rootDir>/libs/domain/board/src/$1",
      "@devson-domain/domain/board": "<rootDir>/libs/domain/board/src"
    }
  }
}
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es2017",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "paths": {
      "@devson-common/util": [
        "libs/common/util/src"
      ],
      "@devson-common/util/*": [
        "libs/common/util/src/*"
      ],
      "@devson-domain/user": [
        "libs/domain/user/src"
      ],
      "@devson-domain/user/*": [
        "libs/domain/user/src/*"
      ],
      "@devson-domain/board": [
        "libs/domain/board/src"
      ],
      "@devson-domain/board/*": [
        "libs/domain/board/src/*"
      ]
    }
  },
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

```json
// nest-cli.json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "projects": {
    "util": {
      "type": "library",
      "root": "libs/util",
      "entryFile": "index",
      "sourceRoot": "libs/common/util/src",
      "compilerOptions": {
        "tsConfigPath": "libs/common/util/tsconfig.lib.json"
      }
    },
    "user": {
      "type": "library",
      "root": "libs/user",
      "entryFile": "index",
      "sourceRoot": "libs/domain/user/src",
      "compilerOptions": {
        "tsConfigPath": "libs/domain/user/tsconfig.lib.json"
      }
    },
    "board": {
      "type": "library",
      "root": "libs/board",
      "entryFile": "index",
      "sourceRoot": "libs/domain/board/src",
      "compilerOptions": {
        "tsConfigPath": "libs/domain/board/tsconfig.lib.json"
      }
    }
  },
  "compilerOptions": {
    "webpack": true
  }
}
```

```json
// libs/commons/util/tsconfig.lib.json
{
  "extends": "../../../tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "outDir": "../../../dist/libs/common/util"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test", "**/*spec.ts"]
}
```

```json
// libs/domain/user/tsconfig.lib.json
{
  "extends": "../../../tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "outDir": "../../../dist/libs/domain/user"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test", "**/*spec.ts"]
}
```

```json
// libs/domain/board/tsconfig.lib.json
{
  "extends": "../../../tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "outDir": "../../../dist/libs/domain/board"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test", "**/*spec.ts"]
}
```

## TODO 위에꺼 json 다 바꾸기

그냥 util, user, board로 만들었기 때문에 해당 모듈에 맞는 상위 디렉토리를 nest-cli.json에 달아준다

build가 잘 되는지 확인해볼까?

```
$ nest build common-util
Starting type checking service...
Hash: 467e58a98d45addc5faa
Version: webpack 4.42.0
Time: 4559ms
Built at: 03/21/2020 11:19:46 PM
Entrypoint main = libs/common/util/index.js

$ nest build domain-user
Starting type checking service...
Hash: 974081ba58d6f0b8b29c
Version: webpack 4.42.0
Time: 4618ms
Built at: 03/21/2020 11:19:58 PM
Entrypoint main = libs/domain/user/index.js

$ nest build domain-board
Starting type checking service...
Hash: b90488c2d47231f6fc1c
Version: webpack 4.42.0
Time: 5291ms
Built at: 03/21/2020 11:20:08 PM
Entrypoint main = libs/domain/board/index.js
```

![](2020-03-21-23-21-08.png)

이제 모듈은 생성과 설정이 끝났고 application을 만들어보자

```
$ nest generate app api-server
CREATE apps/nestjs-monorepo/tsconfig.app.json (230 bytes)
CREATE apps/api-server/tsconfig.app.json (225 bytes)
CREATE apps/api-server/src/app.controller.spec.ts (617 bytes)
CREATE apps/api-server/src/app.controller.ts (274 bytes)
CREATE apps/api-server/src/app.module.ts (249 bytes)
CREATE apps/api-server/src/app.service.ts (142 bytes)
CREATE apps/api-server/src/main.ts (208 bytes)
CREATE apps/api-server/test/app.e2e-spec.ts (561 bytes)
CREATE apps/api-server/test/jest-e2e.json (183 bytes)
UPDATE tsconfig.json (810 bytes)
UPDATE package.json (2430 bytes)
UPDATE nest-cli.json (1565 bytes)
```

기존 src 디렉토리가 

![](2020-03-21-23-22-38.png)

nestjs-monorepo는 원하는 게 아니기 때문에 디렉토리 삭제 후 설정파일에도 지워준다

```json
// nest-cli.json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "apps/nestjs-monorepo/src",
  "projects": {
    "common-util": {
      "type": "library",
      "root": "libs/common/util",
      "entryFile": "index",
      "sourceRoot": "libs/common/util/src",
      "compilerOptions": {
        "tsConfigPath": "libs/common/util/tsconfig.lib.json"
      }
    },
    "domain-user": {
      "type": "library",
      "root": "libs/domain/user",
      "entryFile": "index",
      "sourceRoot": "libs/domain/user/src",
      "compilerOptions": {
        "tsConfigPath": "libs/domain/user/tsconfig.lib.json"
      }
    },
    "domain-board": {
      "type": "library",
      "root": "libs/domain/board",
      "entryFile": "index",
      "sourceRoot": "libs/domain/board/src",
      "compilerOptions": {
        "tsConfigPath": "libs/domain/board/tsconfig.lib.json"
      }
    },
    "nestjs-monorepo": {
      "type": "application",
      "root": "apps/nestjs-monorepo",
      "entryFile": "main",
      "sourceRoot": "apps/nestjs-monorepo/src",
      "compilerOptions": {
        "tsConfigPath": "apps/nestjs-monorepo/tsconfig.app.json"
      }
    },
    "api-server": {
      "type": "application",
      "root": "apps/api-server",
      "entryFile": "main",
      "sourceRoot": "apps/api-server/src",
      "compilerOptions": {
        "tsConfigPath": "apps/api-server/tsconfig.app.json"
      }
    }
  },
  "compilerOptions": {
    "webpack": true,
    "tsConfigPath": "apps/nestjs-monorepo/tsconfig.app.json"
  },
  "monorepo": true,
  "root": "apps/nestjs-monorepo"
}

{
  "collection": "@nestjs/schematics",
  "sourceRoot": "apps/nestjs-monorepo/src",
  "projects": {
    "common-util": {
      "type": "library",
      "root": "libs/common/util",
      "entryFile": "index",
      "sourceRoot": "libs/common/util/src",
      "compilerOptions": {
        "tsConfigPath": "libs/common/util/tsconfig.lib.json"
      }
    },
    "domain-user": {
      "type": "library",
      "root": "libs/domain/user",
      "entryFile": "index",
      "sourceRoot": "libs/domain/user/src",
      "compilerOptions": {
        "tsConfigPath": "libs/domain/user/tsconfig.lib.json"
      }
    },
    "domain-board": {
      "type": "library",
      "root": "libs/domain/board",
      "entryFile": "index",
      "sourceRoot": "libs/domain/board/src",
      "compilerOptions": {
        "tsConfigPath": "libs/domain/board/tsconfig.lib.json"
      }
    },
    "api-server": {
      "type": "application",
      "root": "apps/api-server",
      "entryFile": "main",
      "sourceRoot": "apps/api-server/src",
      "compilerOptions": {
        "tsConfigPath": "apps/api-server/tsconfig.app.json"
      }
    }
  },
  "compilerOptions": {
    "webpack": true,
    "tsConfigPath": "apps/nestjs-monorepo/tsconfig.app.json"
  },
  "monorepo": true,
  "root": "apps/nestjs-monorepo"
}
```

일단 두개의 모듈을 추가한 뒤 해보자

nest start api-server

common/util의 경우 static util function을 제공한다
