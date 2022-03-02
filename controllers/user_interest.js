module.exports = (app, db) => {

    app.post('/api/0.1/user_interest', (req, res)=>{

        if(typeof req.body.userid != "string"){
            res.json({status: 400, error: 'Userid field is invalid'})
        }
        if(typeof req.body.interestid != "string"){
            res.json({status: 400, error: 'Interestid field is invalid'})
        }
        require('./../models/user_interest').insert(db, req.body, (info)=>{
            console.log(info)
            res.json(info)
        })
    })

    app.get('/api/0.1/user_interest', (req, res)=>{
        require('./../models/user_interest').selectAll(db, (info)=>{
            console.log(info)
            res.json(info)
        })
    })

    app.get('/api/0.1/user_interestbyuser/:email', (req, res)=>{
        require('./../models/user_interest').select_by_user(db, req.params.email, (info)=>{
            console.log(info)
            res.json(info)
        })
    })

    app.get('/api/0.1/user_interestbyinterest/:id', (req, res)=>{
        require('./../models/user_interest').select_by_interest(db, req.params.id, (info)=>{
            console.log(info)
            res.json(info)
        })
    })

    app.delete('/api/0.1/user_interest/:email', (req, res)=>{
        require('./../models/user_interest').delete(db, req.params.email, (info)=>{
            console.log(info)
            res.json(info)
        })
    })

}