module.exports = (app, db) => {

    app.post('/api/0.1/interest', require('./../helper/authenticate') ,(req, res)=>{

        console.log(req.body)

        if(typeof req.body.interest != "string"){
            res.json({status: 400, error: 'Interest field is invalid'})
        }

        require('./../models/interest').insert(db, req.body, (info)=>{
            console.log(info)
            res.json(info)
        })
    })

    app.get('/api/0.1/interest', (req, res)=>{
        require('./../models/interest').selectAll(db, (info)=>{
            console.log(info)
            res.json(info)
        })
    })

    app.get('/api/0.1/interest/:id', (req, res)=>{
        require('./../models/interest').selectOne(db, req.params.id, (info)=>{
            console.log(info)
            res.json(info)
        })
    })

    app.put('/api/0.1/interest/:id', require('./../helper/authenticate'), (req, res)=>{
        if(typeof req.body.interest != "string"){
            res.json({status: 400, error: 'Interest field is invalid'})
        }
        require('./../models/interest').update(db, req.params.id, req.body, (info)=>{
            console.log(info)
            res.json(info)
        })
    })

    app.delete('/api/0.1/interest/:id', require('./../helper/authenticate'),(req, res)=>{
        require('./../models/interest').delete(db, req.params.id, (info)=>{
            console.log(info)
            res.json(info)
        })
    })

}