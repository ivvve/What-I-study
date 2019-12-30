## EC2 to ECS

기존: EC2 하나에 모든 기능과 서비스가 모여있었다.
이를 container 기반 시스템으로 이전

AWSLOG ?
#### Log pipeline:
    - as-is: ELK
        - logstash에서(elasticsearch 쪽) 연결이 자주 끊겼음
            - 사이에 redis를 넣어야함
        - 그럼 굳2 ELK?
    - to-be:
        - cloudwatch => Lambda => elasticsearch
            - 하나의 스트림만 관리하니까 좋드라
            - 근디 Lambda가 자주 콜되면 과금이...
                - 근데 ELK(redis+logstash) 보단 적게 들음

### Log



#### Metric
Cloudwatch Container insight: 쓸라면 기존 클러스터에서는 못

#### Secret
file로 관리 했는데 암호화도 하지 않았음

- AWS Parameter store
    - too slow
        - 지금은 좋아졌슴

- Vault
    - auto unseal

#### CD
- as-is: code pipeline
- to-be:: multi env deploy with task definition template

#### Alarm
Cloud watch Event: pub -> Lambda: sub -> Slack

codepipeline slack integration
github에 소스 올려놓음

#### aws ecs-cli

---

## Redshift Google shee
process 개선

마이리얼트립(데이터가 흐르는 조직 만들기)

- 현업이 SQL 고민없이 쓰게하자
- 개발자들을 단순 데이터 요청에서 해방

왜 내가 이제 와서 구글시트를 해야 합니다.

---

## MSA

서비스간의 Boundary가 제대로 설계되지 않으면 MSA의 장점들을 잘 살릴 수가 없다.

운영복잡하지 않으면 마이크로 서비스 don't even consider

- Logging
각각의 서비스들의 app log를 통합

- tracing
X-Ray - tracing and mornitoring

- API GW
`KONG`

- Transaction
`Saga Pattern`
HTTP 보다는 Messaging을 사용

- Rollback & Monitoring, Canary release

- Loosely coupled
Event bus를 통해 Eventual Consistency (데이터가 바로 변경되는 건 아님): pubsub(SNS, SQS)

---

## DB

#### 어떤 DB를 사용할까?

DBA 없으면 MySQL + InnoDB Storage engine

Uber: PostreSQL => MySQL

#### Data Scalability

- Single Node: M-S

H/W Scale-up은 단기적 -> 결국 같은 문제가 생긴다.

- Indexing
InnoDB - index 6개로 권고
=> 컬럼을 60개 이내로
    그 이상의 경우 나중에 더 큰 비용이...

- Cloud
Aurora -_-...
