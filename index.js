const MySqlite = require('./mysqlite')
const mySqlite = require('./mysqlite')

function createTable() {
  const db = new mySqlite('mydatabase.db')

  const createtable = "CREATE TABLE IF NOT EXISTS users('uname' varchar PRIMARY KEY NOT NULL, 'params' varchar);"
  db.execute(createtable)
}

function addRecord() {

  const db = new mySqlite('mydatabase.db')
  const user = 'admin2'
  const params = {
    "password": "secret3",
    "networkId": "L_999999999"
  }

  const statment = `insert into users (uname, params) values (?, ?)`

  try {
    db.statmentRecord(statment, user, JSON.stringify(params))
  }
  catch (e) {
    console.log(e.message)
  }

}

function readTable() {
  const db = new mySqlite('mydatabase.db')
  db.printTable('users')
}

function prepare() {

  const db = new mySqlite('mydatabase.db');
  const masterData = db.readMasterData();
  masterData.forEach(element => {
    if (element['type'] === 'table') {
      db.printTableFields(element['name'])
      db.printTable(element['name'])
    }

  })
  
}

function getUser(user) {

  const db = new MySqlite('mydatabase.db')
  const statment = `select * from users where uname = ?`

  try {
    const output = db.selectRecord(statment, user)
    console.log(output)
  } catch (e) {
    console.log(e.message)
  }

}

function main() {

  //readTable()
  //addRecord()
  //prepare()
  getUser('vengelhard')
  getUser('mbraun2')

}

main()