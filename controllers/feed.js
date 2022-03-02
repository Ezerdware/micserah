module.exports = (app, db) => {

    app.post('/api/0.1/feed', require('./../helper/authenticate'), async (req, res)=>{
        
        if(typeof req.body.creatorid != "string"){
            res.json({status: 400, error: 'Creatorid field is invalid'})
        }

        if(typeof req.body.content != "string"){
            res.json({status: 400, error: 'Content field is invalid'})
        }

        req.body.datetime = new Date()

        require('./../models/feed').insert(db, req.body, (info)=>{
            console.log(info)
            res.json(info)
        })
    })

    app.get('/api/0.1/feed', (req, res)=>{
        require('./../models/feed').selectAll(db, (info)=>{
            console.log(info)
            res.json(info)
        })
    })

    app.get('/api/0.1/feed/:id', (req, res)=>{
        require('./../models/feed').selectOne(db, req.params.id, (info)=>{
            console.log(info)
            res.json(info)
        })
    })

    app.put('/api/0.1/feed/:id', require('./../helper/authenticate'),(req, res)=>{
        if(typeof req.body.content != "string"){
            res.json({status: 400, error: 'Content field is invalid'})
        }


        req.body.datetime = new Date()

        require('./../models/feed').update(db, req.params.id, req.body, (info)=>{
            console.log(info)
            res.json(info)
        })
    })

    app.delete('/api/0.1/feed/:id', require('./../helper/authenticate'),(req, res)=>{
        require('./../models/feed').delete(db, req.params.id, (info)=>{
            console.log(info)
            res.json(info)
        })
    })

    


}