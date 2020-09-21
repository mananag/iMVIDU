const database = require('../database')
const jwt = require('express-jwt')
const {key} = require('config.json')

const auth = () => {
    return [
        jwt({ secret: key, algorithms: ['HS256'] }),
        async (req, res, next) => {
            try{
                const user = await database.User.findByPk(req.user.sub);   
                req.user = user.get();
                next();
            }
            catch(e){
                res.status(401).send({error : 'Please Authenticate!'})
            }            
        }
    ]
}

module.exports = auth