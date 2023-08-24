const mySqlite = require('./mysqlite')
const myLogger = require('./mylogger')

function getLogger(){
  return new myLogger().getLogger();
}

function createDB() {
  return new mySqlite('mydatabase.db');
}

function createTable() {

  try {

    const db = createDB()

    var statment = "create table if not exists customizing('key' varchar primary key not null, 'content' varchar)"
    db.execute(statment)
    statment = "CREATE TABLE IF NOT EXISTS users('uname' varchar PRIMARY KEY NOT NULL, 'params' varchar);"
    db.execute(statment)

  }
  catch (e) {
    console.log(e.message)
  }

}

function addUser(user, params) {

  const db = createDB()

  const statment = `insert into users (uname, params) values (?, ?)`

  try {
    db.statmentRecord(statment, user, JSON.stringify(params))
  }
  catch (e) {
    console.log(e.message)
  }

}

function updateUser(user, params) {

  const db = createDB()

  const statment = `update users set params = ? where uname = ?`

  try {
    db.statmentRecord(statment, JSON.stringify(params), user)
  }
  catch (e) {
    console.log(e.message)
  }

}

function deleteUser(user) {

  const db = createDB()

  const statment = `delete from users where uname = ?`

  try {
    db.statmentRecord(statment, user)
  }
  catch (e) {
    console.log(e.message)
  }

}

function readTable(name) {
  const db = createDB()
  db.printTable(name)
}

function readDB(fields = false) {

  const db = createDB()
  const masterData = db.readMasterData();
  masterData.forEach(element => {
    if (element['type'] === 'table') {

      if (fields) {
        db.printTableFields(element['name'])
      }

      db.printTable(element['name'])
    }

  })

}

function getUser(user) {

  const db = createDB()
  const statment = `select * from users where uname = ?`

  try {
    const output = db.selectRecord(statment, user)
    const params = JSON.parse(output['params'])
    console.log(output.uname, params)
  } catch (e) {
    console.log(e.message)
  }

}

function addCustomizing(key, content) {

  const db = createDB();
  const statment = `insert into customizing (key, content) values (?, ?)`
  var value = ''

  if (typeof content === 'object') {
    value = JSON.stringify(content)
  } else {
    value = content
  }

  try {
    db.statmentRecord(statment, key, value)
  }
  catch (e) {
    console.log(e.message)
  }

}

function main() {

  const logger = getLogger()
 // createTable()

  const tableName = 'customizing'
  const user = 'vengelhard'
  const params = {
    "networkId": "L_12345"
  }


  //addCustomizing('port', '8080')


  //readTable(tableName)
  //addRecord(user, params)
  logger.info('read Database', 'test')
  readDB()
  //logger.error('error by insert')
  // getUser(user)
  // updateRecord(user, params)
  // deleteRecord(user)

}

main()