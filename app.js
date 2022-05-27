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

/*
let members = require('./members');
//DB로 변경 
*/

//DB Model 선언
const db = require('./models') ; // 실제는 ./models/index.js를 선언해줘야 하지만 folder명만 정의한 경우는 자동적으로 index.js를 찾는다.
const { Member} = db ;  // db에서 member만 Assig 한다.


const app = express();

app.use(express.json());
// 여기에 두 번째 미들웨어를 설정해보세요.

app.use((req,res,next) => {
  
  // console.log(req);
  // console.log(res);
  next();
});

//DB로 변경 
//ORM 객체는 Promise값을 return 하는 비동기 함수이다. 
// fucntion에는 async / memthod에는 await이 필요하다.
//findall method는 search object에 where 조건을 정의한다. 
// object.findall( {where: {propertyid:propertyvalue} ) 
// propertyID와 propertyvalue가 동일한 경우는 propertyID는 생략 가능하다. 

//order by 조건 
//search object내 order: [] property 내 정의 

app.get('/api/members', async (req, res) => {
  const { team } = req.query;
  if (team) {
    const teamMembers = await Member.findAll( {
      where: {team}, // findAll( {where: {team:team}}을 축약한 방식임 
      order:[ ['admissionDate','DESC'],
      ],
    });  
    res.send(teamMembers);
  } else {
    const members = await Member.findAll({
      order:[
        ['admissionDate','DESC']
      ],
    }); // order by 조건 
    res.send(members);
  }
});



/*
app.get('/api/members', (req, res) => {
  const { team } = req.query;
  if (team) {
    const teamMembers = members.filter((m) => m.team === team);
    res.send(teamMembers);
  } else {
    res.send(members);
  }
});
*/

app.get('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  
  const member = await Member.findOne({
     where:{id},
  });
  
  if (member) {
    res.send(member);
  } else {
    res.status(404).send({ message: 'There is no such member with id!!' });
  }
});



/*
app.get('/api/members/:id', (req, res) => {
  const { id } = req.params;
  const member = members.find((m) => m.id === Number(id));
  if (member) {
    res.send(member);
  } else {
    res.status(404).send({ message: 'There is no such member with id!!' });
  }
});
*/


//Insert Employee 

app.post('/api/members', async (req, res) => {
  const newMember = req.body;
  
  const member = Member.build(newMember);
  await member.save();

// build+ save는 create로 생성될수 있다 .
// const member = await Member.create(newMember)
// build와 save사이에 row property value를 변경할 사유가 없다면 create하나로 생성
/*
  const member = Member.build(newMember);
  member.name = 'Mike';
  await member.save();

  but name을 변경할 필요가 없다면 
   const member = await Member.create(newMember)

*/


  res.send(member);
});


/*
app.post('/api/members', (req, res) => {
  const newMember = req.body;
  members.push(newMember);
  res.send(newMember);
});
*/


// update Employee
// 1. update Method 활용하기 
// 
app.put('/api/members/:id', async (req,res) => {
  const {id} = req.params ;
  const newInfo = req.body;

  const record = await Member.update(
    newInfo ,
    {
      where: {id}, 
    }
  );

  if (record[0]){
     res.send({message: `${record[0]} row(s) affected`});
    
  } else {
    res.status(404).send({message:'There is no member with the id!'});
  }

}
);

//Member를 Update하는 다른 방법 
// Member를 찾아내고 save Method 활용 하기 
//2. findOne + save Method 활용하기 

app.put('/api/membersSave/:id', async (req,res) => {
  const {id} = req.params ;
  const newInfo = req.body;

  const member = await Member.findOne(
    {
      where: {id}, 
    }
  );
  
  if (member) {
    
    Object.keys(newInfo).forEach( (prop) => {
      member[prop] = newInfo[prop];
    });
  
    await member.save();   
    res.send(member);
  } else {
    res.status(404).send({message:'There is no member with the id!'});
  }
     
}
);

/*
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
*/

//delete member 
// static destroy method 사용 

app.delete('/api/members/:id', async (req,res) => {

  const {id} = req.params ;

  const deleteCount = await Member.destroy(
    { where: {id}}
  );
  
  if (deleteCount > 0){
    res.send({message: `${deleteCount}  row(s) is deleted`});
  } else {
    res.status(404).send({message:'There is no memner with the id!'});
  }

});


//Instance destroy 방식 사용하기 

app.delete('/api/membersIns/:id', async (req,res) => {

  const {id} = req.params ;

  const member = await Member.findOne(
    { where: {id}}
  );
  
  if (member){
    const result = await member.destroy();
    res.send({message: `1 row(s) deleted`});
  } else {
    res.status(404).send({message:'There is no memner with the id!'});
  }

});




/*
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
*/

app.listen(3000, () => {
  console.log('Server is listening...');
});
