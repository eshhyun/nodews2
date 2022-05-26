const express = require('express');
const app = express();

let members = require('./members');

/*
리퀘스트의 바디에 들어있는 JSON 데이터를
req 객체의 body 프로퍼티에 설정하도록 했습니다.
이때 express의 json 메소드는 미들웨어를 리턴하는 메소드이고, 미들웨어란 리퀘스트를 처리하는 기능을 하는 함수

POST/PUT method에서 body내 json 데이터를 req 객체의 body property에 설정하도록 한다.
*/

app.use(express.json()); // 추가된 미들웨어
app.use((req,res,next)=>{
  console.log(req);
  next();
});


app.get('/api/members', (req, res) => {
  const { team } = req.query;
  if (team) {
    const teamMembers = members.filter((m) => m.team === team);
    res.send(membersInTheTeam);
  } else {
    res.send(members);
  }
});

app.post('/api/members' , (req,res) => {

  const newMember = req.body;
  members.push(newMember);

  res.send(newMember);
  
});

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

app.listen(3000, () => {
  console.log('Server Listening');
})