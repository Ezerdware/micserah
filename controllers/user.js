module.exports = (app, db) => {

    let bcrypt = require('bcrypt')
    let jwt = require('jsonwebtoken')

    app.post('/api/0.1/user', async (req, res)=>{

        console.log(req.body)

        if(typeof req.body.password != "string"){
            res.json({status: 400, error: 'Password field is invalid'})
        }
        if(typeof req.body.firstname != "string"){
            res.json({status: 400, error: 'Firstname field is invalid'})
        }
        if(typeof req.body.lastname != "string"){
            res.json({status: 400, error: 'Lastname field is invalid'})
        }
        if(typeof req.body.age != "number"){
            res.json({status: 400, error: 'Age field is invalid'})
        }
        if(typeof req.body.email != "string"){
            res.json({status: 400, error: 'Email field is invalid'})
        }
        let ck = req.body.email.length - req.body.email.lastIndexOf('.')
        if(req.body.email.search('@') == -1 || !(ck == 4 || ck == 3)){
            res.json({status: 400, detail: 'Email field is invalid'})
        }

        let hash = await bcrypt.hash(req.body.password, 10)
        console.log(hash)
        req.body.password=hash
        req.body.creationdate= new Date()
        
        require('./../models/user').insert(db, req.body, (info)=>{
            console.log(info)
            res.json(info)
        })
        
    })

    app.post('/api/0.1/login', async (req, res)=>{
        require('./../models/user').selectOne(db, req.body.email, async (info)=>{
            console.log(info)
            let hash = info.rows[0].password

            let isValid = await bcrypt.compare(req.body.password,hash)
            console.log(isValid)

            if(isValid){
                let token = await jwt.sign(info, process.env.JWT_PRIVATE_KEY)
                console.log(token)
                res.json({status:200, detail:"Logged in successfully", token : token})
            }
            else{
                res.json({status:401, detail:"Password or email not correct"})
            }
        })
    })

    app.get('/api/0.1/user', require('./../helper/authenticate'), (req, res)=>{
        require('./../models/user').selectAll(db, (info)=>{
            console.log(info)
            res.json(info)
        })
    })

    app.get('/api/0.1/user/:email', require('./../helper/authenticate'), (req, res)=>{
        require('./../models/user').selectOne(db, req.params.email, (info)=>{
            console.log(info)
            res.json(info)
        })
    })

    app.put('/api/0.1/user/:email', require('./../helper/authenticate'),  async (req, res)=>{
        if(typeof req.params.email != "string"){
            res.json({status: 400, error: 'Email field is invalid'})
        }
        let ck = req.params.email.length - req.params.email.lastIndexOf('.')
        if(req.params.email.search('@') == -1 || !(ck == 4 || ck == 3)){
            res.json({status: 400, detail: 'Email field is invalid'})
        }
        
        console.log(req.body)

        if(typeof req.body.password != "string"){
            res.json({status: 400, error: 'Password field is invalid'})
        }
        if(typeof req.body.firstname != "string"){
            res.json({status: 400, error: 'Firstname field is invalid'})
        }
        if(typeof req.body.lastname != "string"){
            res.json({status: 400, error: 'Lastname field is invalid'})
        }
        if(typeof req.body.age != "number"){
            res.json({status: 400, error: 'Age field is invalid'})
        }

        let hash = await bcrypt.hash(req.body.password, 10)
        console.log(hash)
        req.body.password=hash
        req.body.creationdate= new Date()

        require('./../models/user').update(db, req.params.email, req.body, (info)=>{
            console.log(info)
            res.json(info)
        })
    })

    app.delete('/api/0.1/user/:email', require('./../helper/authenticate'),  (req, res)=>{
        require('./../models/user').delete(db, req.params.email, (info)=>{
            console.log(info)
            res.json(info)
        })
    })

}