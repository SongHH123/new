var mysql = require('mysql');
const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'1234',
  database: 'page',
  port: '3306',
});


module.exports = {
    init: function () {
        return mysql.createConnection(connection);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}
