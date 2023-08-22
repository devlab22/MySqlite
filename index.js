const mySqlite = require('./mysqlite')

function createTable() {
  const db = new mySqlite('mydatabase.db')

  const createtable = "CREATE TABLE IF NOT EXISTS users('uname' varchar PRIMARY KEY, 'params' varchar);"
  db.execute(createtable)
}

function addRecord() {

  const db = new mySqlite('mydatabase.db')
  const user = 'admin'
  const params = {
    "password": "secret3",
    "networkId": "L_999999999"
  }

  const data = {
    "uname": user,
    "params": JSON.stringify(params)

  }


  const statment = `insert into users (uname, params) values (?, ?)`

  try {
    db.statmentRecord(statment, data)
  }
  catch (e) {
    console.log(e.message)
  }

 
  return
  const values = JSON.stringify(data)


  const insertRecord = db.db.prepare(`insert into users (uname, params) values (?, ?)`)
  const record = {
    uname: user,
    params: values
  }


  return
  try {
    const RunResult = insertRecord.run( // synchronous
      uname = record.uname,
      params = record.params
    );

  } catch (e) {
    const isDuplicate = e.toString().includes('UNIQUE constraint failed');
    console.log(e.message)
  }

}

function readTable() {
  const db = new mySqlite('mydatabase.db')
  var output = db.readTable('users')
  console.log(output)
}

function main() {

  // readTable()
  addRecord()

}

main()