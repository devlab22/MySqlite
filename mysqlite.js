
const Database = require('better-sqlite3');

class MySqlite {

    constructor(path) {
        this.__path = path;
    }

    getConnection() {
        return new Database(this.__path);
    }

    readMasterData() {
        return this.readTable('sqlite_master');
    }

    readTableFields(name) {
        var output = []
        const conn = this.getConnection();
        const stmt = conn.prepare(`pragma table_info(${name})`);

        for (const record of stmt.iterate()) {
            output.push(record)
        }

        conn.close();
        return output;
    }

    readTable(name) {

        var output = []
        const conn = this.getConnection();
        const stmt = conn.prepare(`SELECT * FROM ${name}`);

        for (const record of stmt.iterate()) {
            output.push(record)
        }

        conn.close();
        return output;

    }

    printTable(name) {

        const output = this.readTable(name);
        console.log(`content of table ${name}`)
        output.forEach(line => console.log(line))
    }

    printTableFields(name) {

        const fields = this.readTableFields(name);
        console.log(`Fields of table ${name}`)
        fields.forEach(line => console.log(line))
    }

    execute(statment) {
        const conn = this.getConnection();
        conn.exec(statment)
        conn.close();
    }

    selectRecord(statment, ...args) {

        const conn = this.getConnection();
        const stmt = conn.prepare(statment)
        const result = stmt.get( // synchronous
            ...args
        );
        conn.close();
        return result

    }
    statmentRecord(statment, ...args) {

        const conn = this.getConnection();
        const stmt = conn.prepare(statment)


        try {
            const RunResult = stmt.run( // synchronous
                ...args
            );

            console.log(RunResult)
        } catch (e) {
            const isDuplicate = e.toString().includes('UNIQUE constraint failed');
            throw new Error(e.message)
        } finally {
            conn.close();
        }

    }
}

module.exports = MySqlite