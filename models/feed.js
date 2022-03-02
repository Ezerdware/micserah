//This table contains selectable interests

//Query to create feed table
module.exports.create=(db)=>{
    let query = `
        CREATE TABLE Feed_table (
        id SERIAL primary key not null,
        creatorid varchar not null references user_table(email),
        content varchar not null,
        interestid integer not null references interest_table(id),
        datetime varchar not null
        );`

    db.query(query)
        .then(()=>{
            console.log("Feed_table MODEL LOG: Feed_table created successfully")
        })
        .catch((err)=>{
            console.log(`Feed_table MODEL LOG: ${err.message}`)
        })
}

// end

//Query to insert feed
module.exports.insert = (db, info, callback) => {
    let query = `INSERT INTO Feed_table (creatorid, content, interestid, datetime) VALUES ($1, $2, $3, $4);`
    let value = [info.creatorid, info.content, Number(info.interestid), info.datetime]

    db.query(query, value)
        .then(() => {
            rows = {
                status: 200,
                detail: `Feed_table MODEL LOG: Record inserted successfully`
            }
            callback(rows)
        })
        .catch((err) => {
            rows = {
                status: 400,
                detail: `Feed_table MODEL LOG: ${err.message}`
            }
            callback(rows)
        })

}

// end

// Query to select all feed

module.exports.selectAll = (db, callback) => {
    let query = `SELECT * FROM Feed_table;`

    db.query(query)
        .then(result => {
            rows = {
                status:200,
                detail: `Feed_table MODEL LOG: Query executed successfully`,
                rows: result.rows
            }

            callback(rows)
        })
        .catch((err) => {
            rows = {
                status: 400,
                detail: `Feed_table MODEL LOG: ${err.message}`
            }
            callback(rows)
        })
}

// end

// Query to select a single feed

module.exports.selectOne = (db, id, callback) => {
    let query = `SELECT * FROM Feed_table WHERE id = $1;`
    let value = [id]

    db.query( query, value)
        .then(result => {
            rows = {
                status: 200,
                detail: `Feed_table MODEL LOG: Query executed successfully`,
                rows: result.rows
            }
            callback(rows)
        })
        .catch((err) => {
            rows = {
                status: 400,
                detail: `Feed_table MODEL LOG: ${err.message}`
            }
            callback(rows)
        })
}

// end

// Query to update interest details

module.exports.update = (db, id, info, callback) => {
    let query = `UPDATE Feed_table SET content = $1, interestid = $2, datetime = $3 WHERE id = $4;`
    let value = [info.content, info.interestid, info.datetime, id]

    db.query(query, value)
        .then(() => {
            rows = {
                status: 200,
                detail: `Feed_table MODEL LOG: Query executed successfully`
            }
            callback(rows)
        })
        .catch((err) => {
            rows = {
                status:400,
                detail: `Feed_table MODEL LOG: ${err.message}`
            }
            callback(rows)
        })
}

// end

// Query to delete feed

module.exports.delete = (db, id, callback) => {
    let query = `DELETE FROM Feed_table WHERE id=$1;`
    let value = [id]

    db.query(query, value)
        .then(() => {
            rows = {
                status:200,
                detail: `Feed_table MODEL LOG: Query executed successfully`
            }
            callback(rows)
        })
        .catch((err) => {
            rows = {
                status:400,
                detail: `Feed_table MODEL LOG: ${err.message}`
            }
            callback(rows)
        })
}

// end
