//This table contains selectable interests

//Query to create feed table
module.exports.create=(db)=>{
    let query = `
        CREATE TABLE Comment_table (
        id SERIAL primary key not null,
        creatorid varchar not null references User_table(email),
        content varchar not null,
        feedid integer not null references Feed_table(id),
        datetime varchar not null
        );`

    db.query(query)
        .then(()=>{
            console.log("Comment_table MODEL LOG: Comment_table created successfully")
        })
        .catch((err)=>{
            console.log(`Comment_table MODEL LOG: ${err.message}`)
        })
}

// end

//Query to insert comment
module.exports.insert = (db, info, callback) => {
    let query = `INSERT INTO Comment_table (creatorid, content, feedid, datetime) VALUES ($1, $2, $3, $4);`
    let value = [info.creatorid, info.content, info.feedid, info.datetime]

    db.query(query, value)
        .then(() => {
            rows = {
                status: 200,
                detail: `Comment_table MODEL LOG: Record inserted successfully`
            }
            callback(rows)
        })
        .catch((err) => {
            rows = {
                status: 400,
                detail: `Comment_table MODEL LOG: ${err.message}`
            }
            callback(rows)
        })

}

// end

// Query to select all comment

module.exports.selectAll = (db, callback) => {
    let query = `SELECT * FROM Comment_table;`

    db.query(query)
        .then(result => {
            rows = {
                status:200,
                detail: `Comment_table MODEL LOG: Query executed successfully`,
                rows: result.rows
            }

            callback(rows)
        })
        .catch((err) => {
            rows = {
                status: 400,
                detail: `Comment_table MODEL LOG: ${err.message}`
            }
            callback(rows)
        })
}

// end

// Query to select a single comment

module.exports.selectOne = (db, id, callback) => {
    let query = `SELECT * FROM Comment_table WHERE id = $1;`
    let value = [id]

    db.query( query, value)
        .then(result => {
            rows = {
                status: 200,
                detail: `Comment_table MODEL LOG: Query executed successfully`,
                rows: result.rows
            }
            callback(rows)
        })
        .catch((err) => {
            rows = {
                status: 400,
                detail: `Comment_table MODEL LOG: ${err.message}`
            }
            callback(rows)
        })
}

// end

// Query to update comment details

module.exports.update = (db, id, info, callback) => {
    let query = `UPDATE Comment_table SET creatorid = $1, content = $2, feedid = $3, datetime = $4 WHERE id = $5;`
    let value = [info.creatorid, info.content, info.feedid, info.datetime, id]

    db.query(query, value)
        .then(() => {
            rows = {
                status:200,
                detail: `Comment_table MODEL LOG: Query executed successfully`
            }
            callback(rows)
        })
        .catch((err) => {
            rows = {
                status: 400,
                detail: `Comment_table MODEL LOG: ${err.message}`
            }
            callback(rows)
        })
}

// end

// Query to delete comment

module.exports.delete = (db, id, callback) => {
    let query = `DELETE FROM Comment_table WHERE id=$1;`
    let value = [id]

    db.query(query, value)
        .then(() => {
            rows = {
                status:200,
                detail: `Comment_table MODEL LOG: Query executed successfully`
            }
            callback(rows)
        })
        .catch((err) => {
            rows = {
                status:400,
                detail: `Comment_table MODEL LOG: ${err.message}`
            }
            callback(rows)
        })
}

// end
