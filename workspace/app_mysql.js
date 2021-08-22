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
  console.log(`Example app listening at http://localhost:4000`);
    connection.connect();
});

app.get('/', (req, res)=>{
  res.render('index');
});

app.get('/tr', (req, res)=>{
  res.render('index_tr');
});

app.post('/st_main', (req, res)=>{
  res.render('st_main');
});

app.post('/tr_main', (req, res)=>{  
  res.render('tr_main');
});
