//This table contains selectable interests

//Query to create interest table
module.exports.create=(db)=>{
    let query = `
        CREATE TABLE User_interest (
        userid varchar not null references User_table(email),
        interestid integer not null references Interest_table(id),
        UNIQUE(userid , interestid)
        );`

    db.query(query)
        .then(()=>{
            console.log("User_interest MODEL LOG: User_interest created successfully")
        })
        .catch((err)=>{
            console.log(`User_interest MODEL LOG: ${err.message}`)
        })
}

// end

//Query to insert interest
module.exports.insert = (db, info, callback) => {
    let query = `INSERT INTO User_interest (userid, interestid) VALUES ($1, $2);`
    let value = [info.userid, Number(info.interestid)]

    db.query(query, value)
        .then(() => {
            rows = {
                status:200,
                detail: `User_interest MODEL LOG: Record inserted successfully`
            }
            callback(rows)
        })
        .catch((err) => {
            rows = {
                status:400,
                detail: `User_interest MODEL LOG: ${err.message}`
            }
            callback(rows)
        })

}

// end

// Query to select all interest

module.exports.selectAll = (db, callback) => {
    let query = `SELECT * FROM User_interest;`

    db.query(query)
        .then(result => {
            rows = {
                status:200,
                detail: `User_interest MODEL LOG: Query executed successfully`,
                rows: result.rows
            }

            callback(rows)
        })
        .catch((err) => {
            rows = {
                status:400,
                detail: `User_interest MODEL LOG: ${err.message}`,
                rows: []
            }
            callback(rows)
        })
}

// end

// Query to select a single interest by user 

module.exports.select_by_user = (db, id, callback) => {
    let query = `SELECT * FROM User_interest WHERE userid = $1;`
    let value = [id]

    db.query( query, value)
        .then(result => {
            rows = {
                status:200,
                detail: `User_interest MODEL LOG: Query executed successfully`,
                rows: result.rows
            }
            callback(rows)
        })
        .catch((err) => {
            rows = {
                status:400,
                detail: `User_interest MODEL LOG: ${err.message}`,
                rows: []
            }
            callback(rows)
        })
}

// end

// Query to select a single interest by user 

module.exports.select_by_interest = (db, id, callback) => {
    let query = `SELECT * FROM User_interest WHERE interestid = $1;`
    let value = [id]

    db.query( query, value)
        .then(result => {
            rows = {
                status:200,
                detail: `User_interest MODEL LOG: Query executed successfully`,
                rows: result.rows
            }
            callback(rows)
        })
        .catch((err) => {
            rows = {
                status:400,
                detail: `User_interest MODEL LOG: ${err.message}`,
                rows: []
            }
            callback(rows)
        })
}

// end

// Query to delete user_interest

module.exports.delete = (db, id, callback) => {
    let query = `DELETE FROM User_interest WHERE userid=$1;`
    let value = [id]

    db.query(query, value)
        .then(() => {
            rows = {
                status:200,
                detail: `User_interest MODEL LOG: Query executed successfully`
            }
            callback(rows)
        })
        .catch((err) => {
            rows = {
                status:400,
                detail: `User_interest MODEL LOG: ${err.message}`
            }
            callback(rows)
        })
}

// end
