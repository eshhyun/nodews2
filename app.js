/*
현재 코드에서 매 리퀘스트(req) 객체의 query 객체의 내용을 출력하는 두 번째 미들웨어를 추가해보세요.

미들웨어는 이런 식으로 생겼습니다.
function(req, res, next) {

}
그리고 참고로 이 함수 안에서 next 파라미터로 들어오는 함수를 로직의 마지막에 호출해주어야 리퀘스트를 그다음으로 넘길 수 있습니다.

function(req, res, next) {
  // ...
  next();
}
*/


const express = require('express');
let members = require('./members');

const app = express();

app.use(express.json());
// 여기에 두 번째 미들웨어를 설정해보세요.

app.use((req,res,next) => {
  
  // console.log(req);
  // console.log(res);
  next();
});

app.get('/api/members', (req, res) => {
  const { team } = req.query;
  if (team) {
    const teamMembers = members.filter((m) => m.team === team);
    res.send(teamMembers);
  } else {
    res.send(members);
  }
});

app.get('/api/members/:id', (req, res) => {
  const { id } = req.params;
  const member = members.find((m) => m.id === Number(id));
  if (member) {
    res.send(member);
  } else {
    res.status(404).send({ message: 'There is no such member with id!!' });
  }
});

app.post('/api/members', (req, res) => {
  const newMember = req.body;
  members.push(newMember);
  res.send(newMember);
});


app.put('/api/members/:id', (req,res) => {
  const {id} = req.params ;
  const newInfo = req.body;

  const member = members.find((m) => m.id === Number(id));
  if (member){
    Object.keys(newInfo).forEach((prop)=>{
      member[prop]=newInfo[prop];
     });
     res.send(member);
    
  } else {
    res.status(404).send({message:'not found'});
  }

}

);

app.delete('/api/members/:id', (req,res) => {

  const {id} = req.params ;
  const memberCount = members.length;

  members = members.filter( (m) => m.id !== Number(id));
  
  if (memberCount > members.length){
    res.send({message: 'Deleted'});
  } else {
    res.status(404).send({message:'not found'});
  }

});

app.listen(3000, () => {
  console.log('Server is listening...');
});
