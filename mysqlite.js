
const Database = require('better-sqlite3');

class MySqlite{

    constructor(path){
        this.masterData = [];
        this.db = new Database(path, {verbose: console.log});
    }

    execute(command){

        //this.db.prepare(command);
        this.db.exec(command)
    }

    readTable(name){

        const values = this.db.exec(`SELECT * FROM ${name}`);
        console.log(values)
        
    }
}

module.exports = MySqlite