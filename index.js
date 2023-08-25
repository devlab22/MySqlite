const MySqlite = require('./mysqlite');
const MyLogger = require('./mylogger');


function getLogger(){
  return new MyLogger().getLogger();
}

function createDB() {
  return new MySqlite('mydatabase.db');
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

  const logger = getLogger()
  const db = createDB();
  const statment = `insert into customizing (key, content) values (?, ?)`
  var value = ''

  if (typeof content === 'object') {
    value = JSON.stringify(content)
  }
  else {
    value = content
  }

  try {
    db.statmentRecord(statment, key, value)
    logger.info(`key: ${key}, value: ${value} was processed successfully`)
  }
  catch (e) {
    console.log(e.message)
    logger.error(`key: ${key}, value: ${value} was failed`)

  }

}

function updateCustomizing(key, content){
  const logger = getLogger()
  const db = createDB();

  const statment = `update customizing set content = ? where key = ?`
  var value = ''

  if (typeof content === 'object') {
    value = JSON.stringify(content)
  } else {
    value = content
  }

  try {
    db.statmentRecord(statment, value, key)
    logger.info(`key: ${key}, value: ${value} was updatet successfully`)
  }
  catch (e) {
    console.log(e.message)
    logger.error(`key: ${key}, value: ${value} was failed`)

  }
}

function getCustomizing(key){
  const logger = getLogger()
  const db = createDB();
  const statment = `select * from customizing where key = ?`

  try {
    const output = db.selectRecord(statment,key)
    return output
  }
  catch (e) {
    console.log(e.message)
    logger.error(`key: ${key} is not found`)

  }

}

function main() {
 // createTable()

  const tableName = 'customizing'
  const user = 'vengelhard'
  const params = {
    "networkId": "L_12345"
  }

  const key = 'networkId';
  content = "[L_12345;L_98765]"
  console.log(MySqlite.jsonToString(params))
  const items = ['item1', 'item2', 'item3', 'item4']
  console.log(MySqlite.arrayToString(items));


 // addCustomizing('networkId', 'L_9876543')
  //updateCustomizing(key, content)
  //const output = getCustomizing(key)
  //const networks = MySqlite.convertToArray(output.content)
  //networks.forEach( network => console.log(network))

  

  //readTable(tableName)
  //addRecord(user, params)
 // readDB()
  //logger.error('error by insert')
  // getUser(user)
  // updateUser(user, params)
  // deleteRecord(user)

}

main()