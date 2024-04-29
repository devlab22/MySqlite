const Database = require('better-sqlite3');
const MyEvent = require('./myEvent')

class MySqlite {

    constructor(path, tables = []) {
        this.__path = path;
        this.event = new MyEvent()

        if (tables.length > 0) {

            const conn = this.getConnection();

            tables.forEach(table => {

                const stmt = conn.prepare(table);
                stmt.run();

            })

            conn.close();
        }

    }

    getConnection() {
        return new Database(this.__path);
    }

    readMasterData() {
        this.event.submit('readMasterData', { name: 'readMasterData', object: 'mySqlite'})
        return this.readTable('sqlite_master');
    }

    readTableFields(name) {
        var output = [];
        const conn = this.getConnection();
        const stmt = conn.prepare(`pragma table_info(${name})`);

        for (const record of stmt.iterate()) {
            output.push(record);
        }

        conn.close();
        return output;
    }

    readTable(name) {

        var output = [];
        const conn = this.getConnection();
        const stmt = conn.prepare(`SELECT * FROM ${name}`);

        for (const record of stmt.iterate()) {
            output.push(record);
        }

        conn.close();
        return output;

    }

    printTable(name) {

        const output = this.readTable(name);
        console.log(`content of table "${name}", count: ${output.length}`);
        output.forEach(line => console.log(line));
    }

    printTableFields(name) {

        const fields = this.readTableFields(name);
        console.log(`Fields of table "${name}", count: ${fields.length}`);
        fields.forEach(line => console.log(line));
    }

    execute(statment) {
        const conn = this.getConnection();
        const stmt = conn.prepare(statment);
        const result = stmt.run();
        conn.close();
        return result;
    }

    selectRecord(statment, ...args) {
        // select
        const conn = this.getConnection();
        const stmt = conn.prepare(statment);
        const result = stmt.get( // synchronous
            ...args
        );
        conn.close();

        if (result === undefined) {
            throw new Error(`record ${args} not found`)
        }
        return result;

    }

    statmentRecord(statment, ...args) {
        // insert, update, delete
        const conn = this.getConnection();
        const stmt = conn.prepare(statment);

        try {
            const RunResult = stmt.run( // synchronous
                ...args
            );

            conn.close();
            return RunResult;
        } catch (e) {
            conn.close();
            const isDuplicate = e.toString().includes('UNIQUE constraint failed');
            throw new Error(e.message);
        }
    }

    static convertToJson(content) {
        return JSON.parse(content);
    }

    static convertToArray(content, separator = ';') {

        var output = [];
        content = content.replace('[', '');
        content = content.replace(']', '');
        const values = content.split(separator);
        values.forEach(item => output.push(item.trim()));
        return output;
    }

    static jsonToString(data) {
        return JSON.stringify(data);
    }

    static arrayToString(items, separator = ';') {
        return items.join(separator);
    }

}

module.exports = MySqlite