Nest.js의 Monorepo에 대해 설명하기 위해서 애플리케이션을 먼저 만들도록 하겠다.

Nest.js는 CLI를 통해 편리하게 애플리케이션을 생성할 수 있다.

```bash
$ nest generate app api-server
```

그러면 기존 `src` 디렉토리가 아래와 같이 apps로 바뀌고 그 아래 방금 만든 api-server가 있다.

![](2020-03-22-09-47-25.png)

프로젝트 root 디렉토리의 nest-cli.json을 보면 projects에 다음과 같이 2개의 application이 있는 것을 확인할 수 있다.

```json
// nest-cli.json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "apps/nestjs-multi-module-monorepo/src",
  "monorepo": true,
  "root": "apps/nestjs-multi-module-monorepo",
  "compilerOptions": {
    "webpack": true,
    "tsConfigPath": "apps/nestjs-multi-module-monorepo/tsconfig.app.json"
  },
  "projects": {
    "nestjs-multi-module-monorepo": {
      "type": "application",
      "root": "apps/nestjs-multi-module-monorepo",
      "entryFile": "main",
      "sourceRoot": "apps/nestjs-multi-module-monorepo/src",
      "compilerOptions": {
        "tsConfigPath": "apps/nestjs-multi-module-monorepo/tsconfig.app.json"
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
  }
}
```

우리가 사용할 것은 api-server기 때문에 nestjs-multi-module-monorepo는 지우고 apps/nestjs-multi-module-monorepo도 삭제한다.

```json
// nest-cli.json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "apps/nestjs-multi-module-monorepo/src",
  "monorepo": true,
  "root": "apps/nestjs-multi-module-monorepo",
  "compilerOptions": {
    "webpack": true,
    "tsConfigPath": "apps/nestjs-multi-module-monorepo/tsconfig.app.json"
  },
  "projects": {
    "api-server": {
      "type": "application",
      "root": "apps/api-server",
      "entryFile": "main",
      "sourceRoot": "apps/api-server/src",
      "compilerOptions": {
        "tsConfigPath": "apps/api-server/tsconfig.app.json"
      }
    }
  }
}
```

![](2020-03-22-09-52-38.png)

이를 실행하려면 

```bash
$ nest start api-server
```

> `--watch`, `-w` 옵션을 추가하면 코드가 변경될 때마다 hot reload 된다.

실행하면 정상적으로 app이 실행된다

```bash
$ nest start api-server

Starting type checking service...
Hash: 808e82ee29f10781548e
Version: webpack 4.42.0
Time: 5539ms
Built at: 03/22/2020 9:54:00 AM
Entrypoint main = apps/api-server/main.js
[Nest] 98604   - 03/22/2020, 9:54:00 AM   [NestFactory] Starting Nest application...
[Nest] 98604   - 03/22/2020, 9:54:00 AM   [InstanceLoader] AppModule dependencies initialized +17ms
[Nest] 98604   - 03/22/2020, 9:54:00 AM   [RoutesResolver] AppController {}: +6ms
[Nest] 98604   - 03/22/2020, 9:54:00 AM   [RouterExplorer] Mapped {, GET} route +3ms
[Nest] 98604   - 03/22/2020, 9:54:00 AM   [NestApplication] Nest application successfully started +2ms
```

Nest.js의 Workspace의 개념과 `app`에 대해 짧게 알아보았다.
다음은 이 `api-server` 애플리케이션에서 사용할 Module을 만들도록 하겠다.
