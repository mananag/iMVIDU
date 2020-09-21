require('rootpath')();

const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const bodyParser = require('body-parser');
const { required } = require('joi');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/users', require('./routers/users'))
app.use('/courses', require('./routers/courses'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})