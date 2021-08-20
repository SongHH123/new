const mysql = require('mysql');
const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();

const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'1234',
  database: 'page',
  port: '3306',
});

app.engine('html', require('ejs').renderFile);
app.engine('workspace', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view engine', 'workspace');

app.use(express.static('html'));
app.use(express.static('workspace'));

app.use(bodyParser.urlencoded({
  extended: false,
}));

app.listen(4000, () => {
  console.log(`Example app listening at http://localhost:4000/login.html`);
    connection.connect();
});

app.get('/login.html', (request, response) => {
  const body = request.body;
  connection.query('SELECT * FROM user where user_id = ? and user_pw = ?',
    [document.getElementById("name_id").value, document.getElementById("psw_id").value], ()=>{
      response.redirect('/st_main.html');
    });
  }
);
