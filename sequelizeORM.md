이때까지 Members 테이블의 직원 정보를 다루기 위해 사용했던 Member 모델의 메소드들을 정리해봅시다.

참고로 모델은 클래스이고 모델 객체는 해당 클래스로 만든 객체를 의미합니다. 이 용어 구분을 항상 잘 기억합시다.

1. findAll 메소드
const members = await Member.findAll();
테이블에 있는 모든 row들을 조회할 때 findAll 메소드를 사용합니다. 이때 만약 특정 조건을 만족하는 row들만 조회하려면

const teamMembers = await Member.findAll({ where: { ~ } });
이름 식으로 where 프로퍼티를 가진 조건 객체를 넣어주면 됩니다.

2. findOne 메소드
const member = await Member.findOne({ where: { ~ } });
테이블에 있는 특정 row 하나를 조회할 때 사용합니다. 보통 findOne 메소드는 지금 보이는 id 컬럼처럼 특정 row의 고유값을 가진 컬럼을 그 조건으로 설정하는 경우가 많습니다. 만약 where 조건을 만족하는 row가 여러 개라면 가장 첫 번째 row만 리턴합니다.

3. build, save 메소드
const member = Member.build(newMember);
await member.save();
테이블에 새로운 row를 추가할 때 사용합니다. build 메소드로 하나의 row에 대응하는 모델 객체를 생성하고, 해당 모델 객체의 save 메소드를 호출합니다. 참고로 build 메소드는 다른 메소드들과 다르게 비동기 실행 함수는 아니기 때문에 앞에 await을 붙여줄 필요가 없습니다.

이 방법 말고도 create 메소드를 써서

await Member.create(newMember);
좀더 간편하게 row를 추가할 수도 있습니다.

4. update 메소드
const arr = await Member.update(newInfo, { where: { ~ } });
원하는 특정 row들을 수정하는 메소드입니다. 보통 모든 row를 수정하는 경우는 많지 않기 때문에 where 조건을 설정해주는 게 좋습니다. 이때 update 메소드가 리턴하는 Promise 객체는 그 작업 성공 결과로 배열 하나를 가지는데 해당 배열의 첫 번째 요소에는 갱신된 row 수가 담깁니다.

5. destroy 메소드
const deletedCount = await Member.destroy({ where: { ~ } });
원하는 row를 삭제하는 메소드입니다. destroy 메소드가 리턴하는 Promise 객체는 그 작업 성공 결과로 삭제된 row 수를 가집니다.

이번 토픽에서 사용했던 모델의 여러 메소드들에 대해 배워봤습니다. 물론 이것 말고도 여러가지 메소드들이 많지만 일단 이 정도만 배워도 간단한 데이터 처리 작업은 할 수 있습니다. 그리고 지금까지는 모델의 static 메소드로 작업들을 처리했지만 이전 실습에서 봤던 것처럼 특정 모델 객체의 인스턴스 메소드로도 원하는 작업을 처리하는 경우도 있다는 것을 꼭 기억합시다. 나중에 모델이나 모델 객체의 또다른 메소드들도 배울 거지만 혹시 또다른 기능을 하는 메소드들이 궁금한 분들은 Sequelize 공식 API 문서를 살펴보세요.