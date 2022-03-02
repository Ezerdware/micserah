module.exports = (req, res, next) => {
    let jwt = require('jsonwebtoken')
    if (req.headers.authorization != undefined) {
        let token = req.headers.authorization.split(' ')

        if (token[0] == 'Bearer') {
            var decoded = jwt.verify(token[1], process.env.JWT_PRIVATE_KEY);
            if (decoded) {
                next()
            }
            else {
                res.status(401).json({ status: 401, detail: 'Invalid token' })
            }
        }
        else {
            res.status(401).json({ status: 401, detail: 'Invalid token set' })
        }
    }
    else{
        res.status(401).json({ status: 401, detail: 'Token not found' })
    }


}