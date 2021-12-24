var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db/db.sqlite3"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username text, 
            message text
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO user (username, email, password) VALUES (?,?,?)'
                db.run(insert, ["admin",'hi!!!']);
            }
        });  
    }
});


module.exports = db