1) db handling package 설치 

mysql2 :  dbms client  
sequelize  : orm 
sequelize-cli 


npm install mysql2 sequelize sequelize-cli

2) 설정 

> npx sequelize init 

sequelize cli 환경을 구성한다. 
구성이 완료 되면 

 생성된 Config folder내 config.json 내용 수정한다. 

 development 환경, password, db 설정 


 3) db 생성 

 >npx sequelize db:create --env development 
  config.json파일내 정의된 대로 db 생성해 준다. 


 3) Docker에서 mysql 실행하기 

 > docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=<password> -d -p 3306:3306 mysql:latest

Table생성 

 ORM에서는 Table은 Class에 대응되고 row는 object에 대응된다.

 1. 데이터 타입
제가 각 프로퍼티에 설정했던 데이터 타입들은 결국 데이터베이스의 테이블의 각 컬럼의 데이터 타입으로 적용됩니다.

이때

Sequelize.STRING은 문자열 타입으로, 데이터베이스에서 VARCHAR(255)라고 하는 타입으로 변환되고

Sequelize.INTEGER는 정수형 타입으로 데이터베이스에서 INTEGER라고 하는 타입으로 변환되고

Sequelize.FLOAT은 실수형 타입으로 데이터베이스에서 FLOAT이라고 하는 타입으로 변환되고

Sequelize.DATE은 날짜형 타입으로 데이터베이스에서 DATETIME이라고 하는 타입으로 변환됩니다.

지금 Sequelize에서의 데이터 타입들과, 데이터베이스의 데이터 타입 이름이 같을 때도 있고, 다를 때도 있다는 점에 유의하세요.
 혹시 더 다양한 종류의 데이터 타입들이 궁금하다면 Sequelize 공식 페이지의 이 링크를 참조하세요.

2. 기본값
// ...      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
// ...
저는 이렇게 createdAt, updatedAt 프로퍼티에 defaultValue 속성을 주었는데요. 
defaultValue는 말 그대로 기본값이라는 뜻입니다. 
이렇게 defaultValue 속성을 주게 되면, 테이블의 createdAt, updatedAt 컬럼에도 이 속성이 적용됩니다.

만약 테이블에 어떤 row를 새롭게 삽입할 때 특정 값을 설정해주지 않으면, 이 defaultValue에 있는 값이 들어가게 되는데요. 
지금 두 프로퍼티 모두 defaultValue 속성에 Sequelize.fn('now')라고 써있죠? 
이것은 MySQL 데이터베이스에서 사용할 수 있는 now라는 함수를 의미합니다. 
Sequelize ORM에서는 이렇게 데이터베이스에서 지원하는 함수를 나타내기 위해 Sequelize.fn('함수 이름') 형식의 코드를 사용합니다. 
사실 이 부분은 여러분이 SQL을 써본 적이 있어야 좀더 자연스럽게 이해할 수 있기 때문에 일단은 이 정도로만 이해하고 넘어갑시다.


이때까지 저는

(1) 자바스크립트 코드 상의 Member 모델과
(2) COWORK 데이터베이스에 있는 Members 테이블을

연동하기 위해 필요한 작업들을 순차적으로 수행했습니다.

다음 영상부터 본격적으로 Member 모델로 Members 테이블에 관한 작업을 수행해보기 전에 이때까지 제가 한 작업을 정리해보겠습니다. 
혹시 이전 영상들에서 중간에 길을 잃은 분들은 아래의 내용을 참고해서 빠뜨린 작업을 수행해보세요.

1. MySQL 서버 설치 및 MySQL 서버 실행한 상태로 두기

2. Sequelize를 사용하기 위해 필요한 패키지들 설치

npm install mysql2 sequelize sequelize-cli
*sequelize-cli는 Sequelize로 데이터베이스 작업을 하기 위한 필수 요건은 아니지만 이 패키지가 제공하는 다양한 명령어를 사용해서 프로젝트를 세팅하는 것이 좋습니다.

3. Sequelize를 사용하는 프로젝트의 이상적인 구조를 만들기 위해 필요한 디렉토리 및 파일 생성

npx sequelize init
config, migrations, models, seeders 디렉토리 생성
config/config.json 파일 생성
models/index.js 파일 생성
4. config.json 파일 중 development 객체에 MySQL 서버 접속 정보 설정

// ./config/config.json
...
development: {
    username: 'root',
    password: '123123123',
    database: 'COWORK',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
...

5. COWORK 데이터베이스 생성

npx sequelize db:create --env development
config.json 파일의 development 객체의 내용대로 MySQL 서버에 접속해서 COWORK 데이터베이스를 생성함
--env development 옵션을 주지 않아도 기본으로 development 옵션이 적용되기 때문에 생략해도 됨

6. Members 테이블 생성 마이그레이션 파일 및 Member 모델 파일 생성

npx sequelize model:generate --name Member --attributes name:string,team:string,position:string,emailAddress:string,phoneNumber:string,admissionDate:date,birthday:date,profileImage:string 

migrations 디렉토리에 (생성일자 및 시간)-create-member.js 파일이 생성됨(데이터베이스에 Members 테이블을 생성하는 코드가 담겨있는 파일)
models 디렉토리에 member.js 파일이 생성됨(나중에 Members 테이블을 제어하기 위해 연동해서 사용할 Member 모델의 코드가 담겨있는 파일)
id 프로퍼티(컬럼)를 sequelize-cli가 자동으로 코드에 추가해줌

(생성일자 및 시간)-create-member.js 파일에서 createdAt, updatedAt 프로퍼티에 defaultValue 속성 주기
 createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.fn('now'),
      },
updatedAt: {
  allowNull: false,
  type: Sequelize.DATE,
  defaultValue:Sequelize.fn('now'),
}



7. 데이터베이스에 Members 테이블 생성

npx sequelize db:migrate
migrations 디렉토리에 있는 모든 마이그레이션 파일들의 내용을 파일명에 있는 '생성일자 및 시간' 순서대로 수행하는 명령, 
현재는 6.에서 생성된 마이그레이션 파일 하나만 있기 때문에 해당 파일의 내용만 수행

해당파일내  async up(queryInterface, Sequelize) {} 수행됨 

만약 해당 Table을 Drop 하는 경우는 
npx sequelize db:migrate:undo

해당 파일내 async down(queryInterface, Sequelize) {} 수행됨 


8. Members 테이블에 넣을 seed 데이터 생성

npx sequelize seed:generate --name initialMembers
Members 테이블에 넣을 seed 데이터 삽입 코드가 있는 initialMembers라는 이름의 파일을 생성
(생성일자 및 시간)-initialMembers.js 파일이 생성됨
코드에 실제로 넣을 seed 데이터에 해당하는 JSON 형식의 직원 정보 배열 추가

해당파일내  async up(queryInterface, Sequelize) { seedObject Array} 내에 직원정보 배열 추가할 것 



9. Members 테이블에 Seed 데이터 추가

npx sequelize db:seed:all

10. Member 모델 코드에 빠져있는 id 프로퍼티 추가

// ./models/member.js 
class Member extends Model {}
  Member.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
...



