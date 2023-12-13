const MySqlite = require('./mysqlite');
const MyLogger = require('./mylogger');


function getLogger() {
  return MyLogger.getInstance({'debug': true});
}

function createDB() {

  tables = [
    "create table if not exists customizing('key' varchar primary key not null, 'content' varchar)",
    "create table if not exists users('uname' varchar primary key not null, 'params' varchar)"
  ]

  return new MySqlite('mydatabase.db', tables);

}

function addUser(user, params) {

  const db = createDB()
  const logger = getLogger()

  const statment = `insert into users (uname, params) values (?, ?)`

  try {
    db.statmentRecord(statment, user, JSON.stringify(params))
    logger.info(`user ${user} was inserted successfully`)
  }
  catch (e) {
    logger.error(e.message)
    logger.error(`Error by insert ${user}`)
  }

}

function updateUser(user, params) {

  const db = createDB()
  const logger = getLogger()

  const statment = `update users set params = ? where uname = ?`

  try {
    db.statmentRecord(statment, JSON.stringify(params), user)
  }
  catch (e) {
    logger.error(e.message)
    logger.error(`Error by update user "${user}"`)
  }

}

function deleteUser(user) {

  const logger = getLogger()
  const db = createDB()

  const statment = `delete from users where uname = ?`

  try {
    db.statmentRecord(statment, user)
    logger.info(`user ${user} ist deleted`)
  }
  catch (e) {
    logger.error(e.message)
    logger.error(`Error by delete user ${user}`)
  }

}

function readTable(name) {

  const logger = getLogger()
  logger.info(`read table "${name}"`)
  const db = createDB()
  db.printTable(name)
}

function readDB(fields = false) {

  const myLogger = getLogger()
  myLogger.info('start read db')

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

  myLogger.error('end read db')

}

function getUser(user) {

  const db = createDB();
  const logger = getLogger();
  const statment = `select * from users where uname = ?`;

  try {
    const output = db.selectRecord(statment, user);
    return output;
  } catch (e) {
    logger.error(e.message);
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
    logger.error(e.message)
    logger.error(`key: ${key}, value: ${value} was failed`)

  }

}

function updateCustomizing(key, content) {
  const logger = getLogger()
  const db = createDB();

  const statment = `update customizing set content = ? where key = ?`

  if (typeof content !== 'string') {
    throw new Error(`content is not string`)
  }

  try {
    db.statmentRecord(statment, content, key)
    logger.info(`key: ${key}, value: ${content} was updatet successfully`)
  }
  catch (e) {
    logger.error(e.message)
    logger.error(`key: ${key}, value: ${content} was failed`)

  }
}

function deleteCustomizing(key) {

  const db = createDB();
  const logger = getLogger()
  const statment = `delete from customizing where key = ?`

  try {
    db.statmentRecord(statment, key)
    logger.info(`${key} was deleted successfully`)
  }
  catch (e) {
    logger.error(e.message)
    logger.error(`delete ${key} was failed`)

  }
}

function getCustomizing(key) {
  const logger = getLogger();
  const db = createDB();
  const statment = `select * from customizing where key = ?`;

  try {
    const output = db.selectRecord(statment, key);
    return output;
  }
  catch (e) {
    logger.error(`key: ${key} is not found`);

  }

}

function main() {

  const logger = getLogger()

  const tableName = 'users'
  const user = 'vengelhard'
  const params = {
    "networks": "L_12345"
  }

  const key = 'networks';
  content = "[L_12345;L_98765]"

  try {
    // deleteCustomizing('networkId')

    //addCustomizing('networks', 'L_9876543;L_123456')
    //updateCustomizing(key, content)
    //const output = getCustomizing(key)
    //const networks = MySqlite.convertToArray(output.content)
    //console.log(networks)



    //readTable(tableName)
    //addRecord(user, params)
    readDB()
    //logger.error('error by insert')
    // getUser(user)
    // updateUser(user, params)
    // deleteRecord(user)
  }
  catch (e) {
    logger.error(e.message)
  }

}

main()