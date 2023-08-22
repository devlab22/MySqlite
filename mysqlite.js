
const Database = require('better-sqlite3');

class MySqlite {

    constructor(path) {
        this.masterData = [];
        this.db = new Database(path);
    }

    readTable(name) {

        var output = []
        const stmt = this.db.prepare(`SELECT * FROM ${name}`);

        for (const record of stmt.iterate()) {
            output.push(record)
        }

        return output;

    }

    execute(statment){
        this.db.exec(statment)
    }

    statmentRecord(statment, record){
     
        console.log(statment)
        console.log(record)

        //return
        const stmt = this.db.prepare(statment)

        try {
            const RunResult = stmt.run( // synchronous
              record
            );
        
            console.log(RunResult)
          } catch (e) {
            const isDuplicate = e.toString().includes('UNIQUE constraint failed');
            throw new Error(e.message)
          }

    }
}

module.exports = MySqlite