require('dotenv').config({path:"./src/config/.env"})

const express = require('express')

const { connectDB } = require('./src/database/connection')

const morgan = require('morgan')

const app = express()

const port = process.env.port ||4000


app.use(express.json())

app.use("/category", require("./src/modules/category/category_api"))

if (process.env.MODE === 'DEV') {
    app.use(morgan('dev'))

}

app.get('/', (req, res) => res.send('Hello World!'))

connectDB()

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
