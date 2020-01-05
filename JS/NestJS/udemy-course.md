# Udemy Nest.js course

## init project

```bash
# using Nest.js CLI
nest new task-app

npm run start
# or
npm run start:dev
```

## Module

### @Module
- providers: 
  D.I.를 통해 해당 module 내에서 인스턴스화 되어 사용가능한 Components
- controllers: 
  해당 module 내에서 인스턴스화되는 Controllers
- exports: 
  다른 module로 export되는 Components
- imports: 
  해당 module이 필요로하는 modules, 다른 module에서 export된 Components을 D.I를 통해 사용할 수 있다. 

## NestJS Pipes
- Pipes는 request handler가 호출되기 전에 인자를 가공하는 기능을 수행한다.
- Pipes는 **데이터 변경**이나 **validation**을 수행한다.
- Pipes는 Exception을 던질수 있고, 이는 NestJS가 error response로 파싱할 수 있다.
- Pipes는 `async`일 수 있다.
- `PipeTransform interface`를 implement 해서 `transform()` 메서드를 구현해야한다.
- Usage
  - Handler-level:
  @UsePipes()로 지정한다
    - ```ts
      @Post()
      @UsePipes(SomePipe)
      createTask(@Body() desc: string) {
        foo();
      }
      ```
  - Parameter-level:
    특정 파라미터의 데코레이터에서 사용한다
    - ```ts
      @Post()
      createTask(@Body('desc', SimePipe) desc: string) {
        foo();
      }
      ```
  - Global pipe:
   app level에서 사용되며 모든 들어오는 요청에 적용된다.
    - ```ts
      const app = await NestFactory.create(AppModule);
      app.useGlobalPipes(SomePipe);
      ```

![](./images/pipes-01.png)