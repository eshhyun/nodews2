npx는 패키지에 내장된 명령을 실행하기 위해 사용하는 키워드인데요. 
이게 구체적으로 무슨 뜻인지 자세하게 설명해드릴게요.

npx(execute npm package binaries) 와 npm 에 대한 두 차이점
npx 를 유용하게 쓸 수 있는 케이스는 global 설치를 지양하는 추세다보니 

global 설치를 하지 않고 global에 설치한 것 처럼 쓰는 경우입니당.

npm i -D mocha
npx mocha
  
이렇게 하면 전역설치를 하지 않았기 때문에 package.son 에도 기록되고(그러니 버전관리 하기도 좋겠죵?)
마치 전역 설정을 한 것 처럼 명령어로 사용할 수 있게 됩니다.


application pacage working directory내 node_modules Folder내 .bin이라고 하는 디렉토리가 있습니다.
npx 명령어에 해당하는 명령어 파일 내부를 보면 

#!/usr/bin/env node 
var _yargs = _interopRequireDefault(require("./core/yargs"));
.....
.....

code들이 보이는데 모두 설치된 package내 관련된 명령들입니다.
상단에 있는 #!/usr/bin/env node 는 
이 부분은 이 파일에 있는 자바스크립트 코드들을 node라는 interpreter(명령어 해석기)로 실행하라는 뜻입니다.
그냥 쉽게 말해서 npx sequelize를 하면 이 파일이 node로 실행된다는 뜻입니다

우리가 npx sequelize를 실행하면 node_modules 디렉토리 안에 있는 .bin 디렉토리 안의 sequelize라는 파일을 실행하게 되는데,
이때 이 sequelize 파일은 바로가기 파일이라서 그 원본 파일인 node_modules 디렉토리 안에 있는 sequelize-cli 패키지(디렉토리) 안의 lib 디렉토리 안의 sequelize 파일을 node로 실행하게 됩니다.
이제 npx의 의미가 뭔지 아시겠죠? 
앞으로 명령어 중에서 npx를 봐도 당황해하지 마세요! 이밖에 npx는 현재 존재하지 않는 패키지를 실행해야할 경우 이것을 임시로 설치해서 실행하는 기능도 갖고 있음 
