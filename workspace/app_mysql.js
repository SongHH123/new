const mysql = require('mysql');
const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'1234',
  database: 'page',
  port: '3306',
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('html', require('ejs').renderFile);
app.engine('workspace', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view engine', 'workspace');
app.set('view engine', 'ejs');
app.set('views', './html');

app.use(express.static('html'));
app.use(express.static('workspace'));


app.listen(4000, () => {
  console.log(`Example app listening at http://localhost:4000 or http://localhost:4000/tr`);
  connection.connect();
});

//학생 서버
app.get('/', (req, res)=>{
  res.render('index');
});

app.post('/st_main', (req, res)=>{
  const body = req.body;
  var id = parseInt(body.uname);

  connection.query('select * from user where user_id = ? and user_psw = ?',
  [id ,body.psw], (error, results, fields) =>{
    if(error || results[0] == undefined)  {
      res.send("<script>alert('아이디와 비밀번호를 다시 확인해주세요.'); location.href='./';</script>");
      return error; }
    res.redirect('st_main');
  });
});

app.get('/st_main', (req, res)=>{
  res.render('st_main');
})

app.get('/st_attendance', (req, res)=>{
  res.render('st_attendance');
});

//선생님 서버
app.get('/tr', (req, res)=>{
  res.render('index_tr');
});

app.post('/tr_main', (req, res)=>{
  const body = req.body;

  connection.query('select * from educater where tr_id = ? and tr_pw = ?',
   [body.uname, body.psw], (error, results, fields) =>{
     if(error || results[0] == undefined)  {
       res.send("<script>alert('아이디와 비밀번호를 다시 확인해주세요.'); location.href='./tr';</script>");
       return error; }
    res.redirect('tr_main');
  });
});

app.get('/tr_main', (req, res)=>{
  res.render('tr_main');
})

app.get('/tr_student', (req, res)=>{
  res.render('tr_student');
})

app.get('/tr_contents', (req, res)=>{
  res.render('tr_contents');
})

app.get('/tr_attendance', (req, res)=>{
  res.render('tr_attendance');
})
