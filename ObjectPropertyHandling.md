자바스크립트에서 특정 객체가 갖고 있는 모든 프로퍼티를 확인할 수 있는 방법에는 여러 가지가 있습니다. 
아래의 3가지 방법들을 살펴봅시다.


1. Object.keys

app.put('/api/members/:id', (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const member = members.find((m) => m.id === Number(id));
  if (member) {
    Object.keys(newInfo).forEach((prop) => {
      member[prop] = newInfo[prop];
    });
    res.send(member);
  } else {
    res.status(404).send({ message: 'There is no member with the id' });
  }
});

이전 영상에서 저는 PUT 리퀘스트를 처리하기 위한 라우트 핸들러를 작성할 때, 
리퀘스트의 바디에 있는 새로운 직원 정보 객체의 각 프로퍼티를 순회하기 위해 Object의 key라는 메소드를 사용했습니다. 
이 메소드를 사용하면 특정 객체의 모든 프로퍼티를 조회할 수 있는데요. 잠깐 이 코드를 볼까요?

const newInfo = {
  "id": 11,
  "name": "William",
  "team": "Engineering",
  "position": "Android Developer",
  "emailAddress": "zake@google.com",
  "phoneNumber": "010-xxxx-xxxx",
  "admissionDate": "2021/06/12",
  "birthday": "1995/09/27",
  "profileImage": "profile11.png"
}

console.log(Object.keys(newInfo)); // !
이 코드를 브라우저에서 실행해보면
이런 식으로 각 프로퍼티의 이름들이 하나의 배열에 담긴다는 것을 알 수 있습니다. 이렇게 객체의 프로퍼티를 전부 순회하게 해주는 메소드에는 다른 것도 있습니다.

2. Object.entries
Object의 entries라는 메소드는 각 프로퍼티의 이름(key)-값(value) 쌍을 담은 배열을 리턴하는 메소드입니다. 바로 확인해봅시다.

const newInfo = {
  id: 11,
  name: 'William',
  team: 'Engineering',
  position: 'Android Developer',
  emailAddress: 'zake@google.com',
  phoneNumber: '010-xxxx-xxxx',
  admissionDate: '2021/06/12',
  birthday: '1995/09/27',
  profileImage: 'profile11.png',
};

console.log(Object.entries(newInfo)); // !
이 코드를 실행해보면
이렇게 [프로퍼티 이름, 프로퍼티의 값] 배열들이 담긴 하나의 배열이 리턴됩니다. 그래서 entries 메소드를 쓰면

const newInfo = {
  id: 11,
  name: 'William',
  team: 'Engineering',
  position: 'Android Developer',
  emailAddress: 'zake@google.com',
  phoneNumber: '010-xxxx-xxxx',
  admissionDate: '2021/06/12',
  birthday: '1995/09/27',
  profileImage: 'profile11.png',
};

Object.entries(newInfo).forEach((pair) => {
  console.log(`Key: ${pair[0]} => Value: ${pair[1]}`);
});
이런 식으로 프로퍼티의 이름 뿐만 아니라 프로퍼티의 값도 바로 동시에 가져오는 것이 가능합니다. 이 코드를 실행하면 다음과 같이 출력됩니다.


3. for ... in 구문
Object의 메소드가 아니라 for ... in이라는 구문을 써서 한 객체의 프로퍼티를 순회하는 것도 가능합니다.

const newInfo = {
  id: 11,
  name: 'William',
  team: 'Engineering',
  position: 'Android Developer',
  emailAddress: 'zake@google.com',
  phoneNumber: '010-xxxx-xxxx',
  admissionDate: '2021/06/12',
  birthday: '1995/09/27',
  profileImage: 'profile11.png',
};

for (const property in newInfo) {
  console.log(property);
}
이런 식으로 특정 객체의 프로퍼티를 조회할 수도 있습니다. 이 코드를 실행하면
이런 결과가 출력됩니다. 만약 프로퍼티의 값도 출력하려면

const newInfo = {
  id: 11,
  name: 'William',
  team: 'Engineering',
  position: 'Android Developer',
  emailAddress: 'zake@google.com',
  phoneNumber: '010-xxxx-xxxx',
  admissionDate: '2021/06/12',
  birthday: '1995/09/27',
  profileImage: 'profile11.png',
};

for (const property in newInfo) {
  console.log(`Key: ${property} => Value: ${newInfo[property]}`);
}
이런 식의 코드를 사용하면 됩니다.
특정 객체의 프로퍼티들을 순회할 때는 위에서 설명한 3가지 방법들이 주로 쓰이는데요. 3가지 방법 다 잘 기억해둡시다.