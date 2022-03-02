//This table contains the necessary infomation about the users

//Query to create user table
module.exports.create=(db)=>{
    let query = `
        CREATE TABLE User_table (
        email varchar primary key not null,
        firstname varchar(20) not null,
        lastname varchar(20) not null,
        age integer not null,
        password varchar not null,
        creationdate varchar not null
        );`

    db.query(query)
        .then(()=>{
            console.log("User_table MODEL LOG: User_table created successfully")
        })
        .catch((err)=>{
            console.log(`User_table MODEL LOG: ${err.message}`)
        })
}

// end

//Query to insert user
module.exports.insert = (db, info, callback) => {
    let query = `INSERT INTO User_table (email, firstname, lastname, age, password, creationdate) VALUES ($1, $2, $3, $4, $5, $6);`
    let value = [info.email, info.firstname, info.lastname, info.age, info.password, info.creationdate]

    db.query(query, value)
        .then(() => {
            rows = {
                status:200,
                detail: `User_table MODEL LOG: Record inserted successfully`
            }
            callback(rows)
        })
        .catch((err) => {
            rows = {
                status:400,
                detail: `User_table MODEL LOG: ${err.message}`
            }
            callback(rows)
        })

}

// end

// Query to select all users

module.exports.selectAll = (db, callback) => {
    let query = `SELECT * FROM User_table;`

    db.query(query)
        .then(result => {
            rows = {
                status:200,
                detail: `User_table MODEL LOG: Query executed successfully`,
                rows: result.rows
            }

            callback(rows)
        })
        .catch((err) => {
            rows = {
                status:400,
                detail: `User_table MODEL LOG: ${err.message}`,
                rows: []
            }
            callback(rows)
        })
}

// end

// Query to select a single user

module.exports.selectOne = (db, email, callback) => {
    let query = `SELECT * FROM User_table WHERE email = $1;`
    let value = [email]

    db.query( query, value)
        .then(result => {
            rows = {
                status:200,
                detail: `User_table MODEL LOG: Query executed successfully`,
                rows: result.rows
            }
            callback(rows)
        })
        .catch((err) => {
            rows = {
                status:400,
                detail: `User_table MODEL LOG: ${err.message}`,
                rows: []
            }
            callback(rows)
        })
}

// end

// Query to update user details

module.exports.update = (db, email, info, callback) => {
    let query = `UPDATE User_table SET firstname = $1, lastname = $2, age = $3, password = $4, creationdate = $5  WHERE email = $6;`
    let value = [info.firstname, info.lastname, info.age, info.password, info.creationdate, email]

    db.query(query, value)
        .then(() => {
            rows = {
                status:200,
                detail: `User_table MODEL LOG: Query executed successfully`
            }
            callback(rows)
        })
        .catch((err) => {
            rows = {
                status:400,
                detail: `User_table MODEL LOG: ${err.message}`
            }
            callback(rows)
        })
}

// end

// Query to delete user

module.exports.delete = (db, email, callback) => {
    let query = `DELETE FROM User_table WHERE email=$1;`
    let value = [email]

    db.query(query, value)
        .then(() => {
            rows = {
                status:200,
                detail: `User_table MODEL LOG: Query executed successfully`
            }
            callback(rows)
        })
        .catch((err) => {
            rows = {
                status:400,
                detail: `User_table MODEL LOG: ${err.message}`
            }
            callback(rows)
        })
}

// end
