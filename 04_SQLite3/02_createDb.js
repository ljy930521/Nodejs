var sqlite3 =require('sqlite3').verbose();
var db = new sqlite3.Database("d:/Workspace/test/SQL/test.db");

sql = `CREATE TABLE IF NOT EXISTS bbs3 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    writer TEXT NOT NULL,
    timestapm datetime DEFAULT CURRENT_TIMESTAMP,
    content Text)`;

db.run(sql);

db.close();