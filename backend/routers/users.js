const express = require('express')
const joi = require('joi')
const validate = require('../middleware/validate')
const auth = require('../middleware/auth')
const database = require('../database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('config.json')

const router = express.Router()

const validateRegistraion = (req, res, next) => {
    const newUser = joi.object({
        first: joi.string().required(),
        last: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
    })

    validate(req, next, newUser)
}

const createUser = async (params) => {
    if (await database.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" not available';
    }

    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    await database.User.create(params);
}

router.post('/register', validateRegistraion, function (req, res, next) {
    createUser(req.body).then(user => res.json(user))
    .catch(next)
})

const validateLogin = (req,res,next) => {
    const schema = joi.object({
        email : joi.string().email().required(),
        password : joi.string().required()
    })

    validate(req, next, schema)
}

const loginUser = async ({email, password}) => {    
    const user = await database.User.scope('withHash').findOne({where : {email}})
    console.log(user)
    if (!user || !(await bcrypt.compare(password, user.hash)))
    {
        throw 'Username or password is incorrect';
    }
    const token = jwt.sign({ sub: user.id }, config.key)
    
    return { ...omitHash(user.get()), token }
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}

router.post('/login', validateLogin, function (req, res, next) {
    loginUser(req.body).then(user => res.send(user))
    .catch(next)
})

router.get('/', auth(), async (req, res, next) => {
    try{
        const users = await database.User.findAll()
        res.json(users)
    }
    catch(e){
        res.json('ERRORRO', next)
    }
})

module.exports = router