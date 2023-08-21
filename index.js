 const mySqlite = require('./mysqlite')

 function main(){

    const db = new mySqlite('mydatabase.db')

    const createtable = "CREATE TABLE IF NOT EXISTS users('uname' varchar PRIMARY KEY, 'params' varchar);"
    db.execute(createtable)
    const user = 'mbraun'
    const data = {
        "password": "secret",
        "networkId": "L_123456"
    }
    const values = JSON.stringify(data)
    const insertRecord = db.db.prepare(`insert into users (uname, params) values (?, ?)`)
    const record = {
        uname: user,
        params: values
    }

    try {
        const RunResult = insertRecord.run( // synchronous
          record.uname,
          record.params
        );
        
      } catch (e) {
        const isDuplicate = e.toString().includes('UNIQUE constraint failed');
        console.log(isDuplicate)
      }
   // db.readTable('users')


 }

 main()