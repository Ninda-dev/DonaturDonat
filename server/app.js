if(process.env.NODE_ENV !== 'production') {// kalau NODE_ENV = 'production' maka pakai env yg di AWS, kalau bukan 'production' maka pakai env yg local
    require('dotenv').config()
}
const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/', require("./routers"))

module.exports = app;
