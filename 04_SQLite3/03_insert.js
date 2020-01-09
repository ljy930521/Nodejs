var sqlite3 =require('sqlite3').verbose();
//var db = new sqlite3.Database('d:/Workspace/test/SQL/test.db');
var db = new sqlite3.Database('../../SQL/test.db');
/*var sql = 'insert into bbs3(id,title,writer,content)';
sql += "values(101,'a','b','c')";
db.run(sql);*/

sql = 'INSERT INTO bbs(title, writer, content) VALUES(?, ?, ?)';
/*var title = 'About SQLite3';
var writer = 'Node.js';
var content = 'A quick brown fox jumps over the lazy dog.';*/

var records = [
    {title: 'title 1', writer: 'writer 1', content: 'content 1'},
    {title: 'title 2', writer: 'writer 2', content: 'content 2'}
];

db.serialize(function() {
    var stmt = db.prepare(sql);
    for (let record of records)
    {
        stmt.run(record.title, record.writer, record.content);
    }
   
    stmt.finalize();

    var sql_ts = "SELECT id, title, writer, strftime('%Y%m%d%H%M', timestamp, 'localtime') ts, content FROM bbs";
    db.each(sql_ts, function(err, row) {
        console.log(row.id, row.title, row.writer, row.ts, row.content);
    });
});
db.close();