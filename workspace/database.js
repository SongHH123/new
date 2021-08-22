var mysql = require('mysql');
const db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'1234',
  database: 'page',
  port: '3306',
});

db.connect();
module.export = db;
