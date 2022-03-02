require('dotenv').config();
const express = require("express")
const jwt= require('jsonwebtoken')
const Client = require("pg").Client
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
    next();
})


const db = new Client({
    connectionString:process.env.DATABASE_URL,
    ssl: { "rejectUnauthorized": false }
});

console.log(process.env.DATABASE_URL)

db.connect()
.then(()=>{
    console.log("Connected to database successful")    
})
.catch((err)=>{
    console.log('Connection to database failed')
    console.log(err)
})

// DB setup

try {
    require('./models/user').create(db)
    require('./models/interest').create(db)
    require('./models/user_interest').create(db)
    require('./models/feed').create(db)
    require('./models/comment').create(db)
} catch (error) {
    console.log(error)
}

try {

    require('./controllers/user')(app, db)
    require('./controllers/interest')(app, db)
    require('./controllers/user_interest')(app, db)
    require('./controllers/feed')(app, db)
    require('./controllers/comment')(app, db)

} catch (err) {
    console.log(err)
}



const port = process.env.PORT;

app.listen(port, (err)=>{
    if(err) console.log(err)
    else{
        console.log(`DPH API server running on port ${port}`)
    }
})

