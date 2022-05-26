1 ) VS Code에서 node로 작성된 webservice를 간편하게 점검하는 방법 

     vscode에서 rest client라는 exension 설치 하고 
     확장자가 http인 파일을 작성하고 파일내 request 작성하여 api를 request할수 있다. 

     ex) request.http 파일 

      GET http://localhost:3000/api/members/

      ###
      GET http://localhost:3000/api/members?team=engineering

      ###
      GET http://localhost:3000/api/members?team=sales

      ###
      GET http://localhost:3000/api/members?team=marketing

      request간에는 ###으로 분리 해서 작성한다. 

  2) npm install option 

  이전 영상에서 저는 nodemon 패키지를 설치할 때

node install nodemon --save-dev 
이렇게 맨 뒤에 --save-dev라는 옵션을 주고 설치했습니다. 이번 노트에서는

(1) 옵션없이 패키지를 설치했을 때와 
(2) --save-dev 옵션을 주고 패키지를 설치했을 때

의 차이를 살펴보겠습니다.

1. --save-dev 옵션없이 설치했을 때
npm install nodemon  
이렇게 --save-dev 옵션없이 nodemon 패키지를 설치했을 때, package.json 파일의 내용을 보면


{
  "name": "cowork-api-server",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1",
    "nodemon": "^2.0.7" // !!!!!
  },
  "devDependencies": {
    
  }
}
지금 보이는 것처럼 dependencies 필드에 nodemon 패키지가 보인다는 것을 알 수 있습니다.

2. --save-dev 옵션을 주고 설치했을 때
node install nodemon --save-dev 
하지만 이렇게 --save-dev 옵션을 주고 설치한 후에 package.json 파일을 보면

{
  "name": "cowork-api-server",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.7" // !!!!!
  }
}
이제 dependencies 필드가 아니라 devDependencies 필드에 nodemon 패키지의 정보가 있다는 것을 알 수 있는데요.

nodemon 패키지의 정보가 dependencies에 있는 것과 devDependencies에 있는 것은 어떤 차이가 있는 걸까요? 이 차이를 이해하려면 조금 새로운 이야기를 시작해야합니다.

사실 우리가 어떤 프로젝트의 코드를 실행하는 경우는 크게 다음과 같은 2가지 경우로 나눌 수 있습니다.

(1) 개발/테스트 목적의 코드 실행: 첫 개발부터 시작해서 중간중간 코드를 제대로 작성해가고 있는 건지를 테스트하기 위한 목적에서의 코드 실행

(2) 실제 서비스 제공을 위한 코드 실행: 충분한 검증을 거친 코드를 서비스 제공 목적으로 배포해서 실행하기 위한 목적에서의 코드 실행

이렇게 2가지인데요. 앞으로 (1)의 용도는 '개발 용도', (2)의 용도는 '배포 용도'라고 줄여서 말할게요. 그런데 하나의 프로젝트에서, 개발 용도로 코드를 실행할 때 필요한 패키지와 배포 용도로 코드를 실행할 때 필요한 패키지들이 꼭 같은 것은 아닙니다. 즉, 각 용도마다 의존 패키지들이 달라질 수 있다는 건데요.

예를 들어, 제가 설치해서 사용한 nodemon 패키지는 배포 용도로 쓴다기보다는 주로 개발 용도로 씁니다. nodemon 패키지는 특정 파일 내용을 수정하고 저장할 때마다 이를 감지하고 프로그램을 재실행하는 기능이 있었죠? 그런데 어차피 배포 용도로 실행되고 있는 코드는 이상이 있거나 추가할 부분이 있으면 아예 실행되던 코드를 수정하고 서버에 다시 직접 배포해야 합니다. 그래서 배포 시에는 nodemon 패키지의 기능이 굳이 필요하지 않습니다.

바로 이렇게 배포 용도로는 필요하지 않고 개발 용도로만 필요한 패키지를 설치할 때 --save-dev 옵션을 사용하는 건데요.

자, 그럼 이제 하나의 프로젝트에서

배포 용도로 필요한 패키지들은 dependencies 필드에,
개발 용도로만 필요한 패키지들은 devDependencies 필드에
그 정보가 기재되어야 한다는 것은 알겠습니다.(배포 용도와 개발 용도에서 모두 필요한 패키지라면 당연히 dependencies 필드에 적혀야겠죠?) 
그리고 방금 위에서 본 것처럼 옵션없이 npm install로 설치한 패키지들은 dependencies 필드에 적히지만, --save-dev 옵션으로 설치한 패키지들은 devDependencies 필드에 적힌다는 것도 알겠구요.

그런데 사실 옵션을 쓰나 안 쓰나 node_modules 디렉토리에 nodemon 패키지가 설치된다는 사실은 둘다 똑같습니다. 그럼 왜 이런 구분이 필요한 걸까요?

우리는 이전의 'Node.js 기본기' 토픽의 이 레슨에서 Node.js 프로젝트를 다른 개발자와 공유할 때 node_modules 디렉토리는 용량이 너무 크기 때문에 굳이 공유할 필요가 없고, package.json 파일만 공유해주고, 프로젝트를 공유받은 개발자가

npm install
을 실행해서 package.json 파일에 적혀있던 패키지들을 설치하는 것이 일반적이라고 했습니다. 이때는 dependencies 필드와 devDependencies에 있던 모든 패키지들이 설치되는데요. 그런데 바로 이때

npm install --production
이런 식으로 --production이라는 옵션을 주고 실행하면 이때는 devDependencies에 있는 패키지들(개발 용도로만 필요하고 배포 용도로는 필요하지 않은 패키지들)은 제외하고 dependencies에 있는 패키지들만 node_modules 디렉토리에 설치하게 됩니다. 조금 감이 오시나요?

사실 프로젝트의 코드를 배포 용도로 실행하기 전에는 보통 이런 순서의 작업을 거칩니다.

(1) 실제 개발 중이던 프로젝트 디렉토리를 하나 더 복사
(2) 새 디렉토리에서 node_modules 디렉토리 삭제
(3) npm install --production를 실행해서 devDependencies 필드에 있던 패키지들은 제외하고, dependencies 필드에 있던 패키지들만 node_modules 디렉토리에 재설치
(4) 실제 서비스를 위해 코드 실행(npm start 등 실행)

이런 식으로 배포를 위해 필요한 패키지들만 딱 설치할 수 있는 겁니다. 그리고 나중에 이것을 하기 위해 개발 용도로만 사용할 패키지들은 --save-dev 옵션을 주고 설치해서 package.json 파일의 devDependencies 필드에 그 정보가 적히도록 하는 것이구요. 저는 nodemon 패키지를 실제 서비스를 위한 프로젝트 디렉토리의 node_modules 디렉토리에는 설치하지 않을 것이었기 때문에 --save-dev 옵션을 주고 설치했던 겁니다. 이제 --save-dev 옵션의 의미를 아시겠죠?

자, 이대로 끝내기 전에 참고로 알아두면 좋을 두 가지만 더 배워보겠습니다.

우리가 옵션 없이 썼던 npm install은 사실 npm install --save-prod와 같은 의미입니다. 즉, --save-prod 옵션이 생략된 것과 같은 의미라는 건데요. --save-dev를 배웠으니까 --save-prod의 의미도 유추할 수 있겠죠? --save-prod는 패키지를 설치하고 그 패키지의 정보를 dependencies 필드에 저장하는 옵션입니다. 그러니까 npm install을 할 때 아무런 옵션도 주지 않으면 기본적으로는 --save-prod 옵션이 적용되어서 보통은 설치된 패키지 정보가 dependencies 필드에 적히는 겁니다. 이 사실도 기억해둡시다.

그리고 하나 더! devDependencies 필드의 패키지들은 제외하고 dependencies 필드에 있는 패키지들만 설치하기 위해 npm install --production 이렇게 --production이라는 옵션을 주는 방법 말고도

NODE_ENV=production npm install
이런 식으로 옵션을 주는 방법도 있습니다. 사실 맨 앞의 NODE_ENV=production은 NODE_ENV라는 환경 변수의 값을 production으로 주라는 뜻인데요. 이 부분은 나중에 환경 변수가 뭔지를 배우고 다시 와서 살펴보도록 합시다.

관련 질문
 