const express = require('express')
const joi = require('joi')
const validate = require('../middleware/validate')
const auth = require('../middleware/auth')
const database = require('../database')

const router = express.Router()

const validateCourse = (req, res, next) => {
    const newCourse = joi.object({
        title : joi.string().required(),
        details : joi.string().required(),
        price : joi.number().required()
    })

    validate(req, next, newCourse)
}

router.post('/', auth(), validateCourse, async (req, res, next) => {
    try {
        const params = req.body
        params.owner = req.user.id
        console.log(params)
        if (await database.Course.findOne({ where: { title: params.title, owner: req.user.id } })) {
            throw 'Course "' + params.course + '" already exists';
        }
        console.log(database)
        await database.Course.create(params)
        res.json("Task Added")
    }
    catch(e){
        res.json(e)
    }
})

router.get('/', auth(), async(req, res, next) => {
    try{
        const id = req.user.id
        const courses = await database.Course.findAll({where: {owner: id}})
        res.json(courses)
    }
    catch (e){
        res.json(e)
    }
})

const validateUpdate = (req, res, next) => {
    const update = joi.object({
        title: joi.string().empty(''),
        details: joi.string().empty(''),
        price: joi.number()
    })

    validate(req, next, update)
}

router.patch('/:id', auth(), validateUpdate, async(req, res, next) => {
    try{
        const id =  req.params.id
        const course = await database.Course.findOne({where: {id, owner: req.user.id}})
        const titleChanged = req.body.title && course.title !== req.body.title;
        if (titleChanged && await database.Course.findOne({ where: { title: req.body.title, owner: req.user.id } })) {
            throw 'Course "' + req.body.title + '" is already taken';
        }
        Object.assign(course, req.body)
        await course.save()
        res.json(course)
    }
    catch (e) {
        res.json(e)
    }
})

router.delete('/:id', auth(), async(req, res, next) => {
    try{
        const id =  req.params.id
        const course = await database.Course.findOne({where: {id, owner: req.user.id}})
        await course.destroy()
        res.json('Deleted Succesfully')
    }
    catch(e){
        res.json('e')
    }
})

module.exports = router