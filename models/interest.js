//This table contains selectable interests

//Query to create interest table
module.exports.create=(db)=>{
    let query = `
        CREATE TABLE Interest_table (
        id SERIAL primary key not null,
        interest varchar(50) not null
        );`

    db.query(query)
        .then(()=>{
            console.log("Interest_table MODEL LOG: Interest_table created successfully")
        })
        .catch((err)=>{
            console.log(`Interest_table MODEL LOG: ${err.message}`)
        })
}

// end

//Query to insert interest
module.exports.insert = (db, info, callback) => {
    let query = `INSERT INTO Interest_table (interest) VALUES ($1);`
    let value = [info.interest]

    db.query(query, value)
        .then(() => {
            rows = {
                status:200,
                detail: `Interest_table MODEL LOG: Record inserted successfully`
            }
            callback(rows)
        })
        .catch((err) => {
            rows = {
                status:400,
                detail: `Interest_table MODEL LOG: ${err.message}`
            }
            callback(rows)
        })

}

// end

// Query to select all interest

module.exports.selectAll = (db, callback) => {
    let query = `SELECT * FROM Interest_table;`

    db.query(query)
        .then(result => {
            rows = {
                status:200,
                detail: `Interest_table MODEL LOG: Query executed successfully`,
                rows: result.rows
            }

            callback(rows)
        })
        .catch((err) => {
            rows = {
                status:400,
                detail: `Interest_table MODEL LOG: ${err.message}`,
                rows: []
            }
            callback(rows)
        })
}

// end

// Query to select a single interest

module.exports.selectOne = (db, id, callback) => {
    let query = `SELECT * FROM Interest_table WHERE id = $1;`
    let value = [id]

    db.query( query, value)
        .then(result => {
            rows = {
                status:200,
                detail: `Interest_table MODEL LOG: Query executed successfully`,
                rows: result.rows
            }
            callback(rows)
        })
        .catch((err) => {
            rows = {
                status:400,
                detail: `Interest_table MODEL LOG: ${err.message}`,
                rows: []
            }
            callback(rows)
        })
}

// end

// Query to update interest details

module.exports.update = (db, id, info, callback) => {
    let query = `UPDATE Interest_table SET interest = $1 WHERE id = $2;`
    let value = [info.interest, id]

    db.query(query, value)
        .then(() => {
            rows = {
                status:200,
                detail: `Interest_table MODEL LOG: Query executed successfully`
            }
            callback(rows)
        })
        .catch((err) => {
            rows = {
                status:400,
                detail: `Interest_table MODEL LOG: ${err.message}`
            }
            callback(rows)
        })
}

// end

// Query to delete interest

module.exports.delete = (db, id, callback) => {
    let query = `DELETE FROM Interest_table WHERE id=$1;`
    let value = [id]

    db.query(query, value)
        .then(() => {
            rows = {
                status:200,
                detail: `Interest_table MODEL LOG: Query executed successfully`
            }
            callback(rows)
        })
        .catch((err) => {
            rows = {
                status:400,
                detail: `Interest_table MODEL LOG: ${err.message}`
            }
            callback(rows)
        })
}

// end
