# Introduction

Nest는 효율적이고 확장성있는 Node.js 서버 사이드 애플리케이션을 구축하기 위한 프레임워크입니다.
Nest는 진보적인 JavaScript를 사용하며 Typescript(순수 Javascript와 호환성을 지킵니다) 로 구축되고
Object Oriented Programming, Functional Programming, Functional Rective Programming의 요소들과 결합됩니다.

내부적으로, Nest는 Express를 사용합니다. 하지만 또한 다른 여러 라이브러리들(e.g. Fastify)과 호환성을 제공합니다.
이는 무수히 많은 사용가능한 third-party 플러그인들을 쉽게 사용하도록합니다.

## Philoshophy

최근 몇 년 동안 Node.js 덕분에, JavaScript는 웹 프론트와 백엔드 애플리케이션의 공용 언어(lingua franca)가 되었습니다.
이는 Angular, React, Vue와 같은 개발자들의 생산성을 증가시키고 빠르고, 태스트 가능하며 확장성 있는 애플리케이션을 만들수 있도록 해주는 죽이는 프로젝트들이 생겨나게 했습니다.
하지만, Node (그리고 서버 사이드 JavaScript)에 존재하는 수 많은 훌륭한 라이브러리, 헬퍼, 툴들 중에서 중요한 문제인 구조(architecture)를 효과적으로 해결하는 것은 없었습니다.

Nest는 노력없이 매우 테스트 가능하고, 확장 가능하며, 커플링이 적고 쉽게 유지 가능한 애플리케이션을 생성할 수 있게 해주는 즉시 사용 가능한(out-of-the-box) 애플리케이션 구조를 제공합니다.

## Installation

시작하기 위해서, Nest CLI를 사용하여 기본 프로젝트를 만듭니다.

```
$ npm i -g @nestjs/cli
$ nest new project-name
```

Starter 프로젝트를 Git으로 설치합니다.

```
$ git clone https://github.com/nestjs/typescript-starter.git project
$ cd project
$ npm install
$ npm run start
```

또는 npm(또는 yarn)으로 처음부터 새로운 프로젝트를 시작하세요.

```
$ npm i --save @nestjs/core @nestjs/common rxjs reflect-metadata
```