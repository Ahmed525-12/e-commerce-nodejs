// imports 
process.on('uncaughtException',  (err)=> {
    console.log('uncaughtException',err);
})

require('dotenv').config({path:"./src/config/.env"})

const express = require('express')

const { connectDB } = require('./src/database/connection')

const morgan = require('morgan')
const AppError = require('./src/utils/appErrors')

const app = express()

const port = process.env.port ||4000

const golbalErrmiddlewares = require('./src/utils/globalErrMiddleWear')
app.use(express.json())
app.use(express.static('uploads'))
app.use("/category", require("./src/modules/category/category_api"))
app.use("/subcategory", require("./src/modules/subcategory/subcategory_api"))
app.use("/brand", require("./src/modules/brand/brand_api"))
app.use("/product", require("./src/modules/product/proudct_api"))
// end of imports


if (process.env.MODE === 'DEV') {
    app.use(morgan('dev'))

}

app.get('/', (req, res) => res.send('Hello World!'))
app.all('*', (req, res, next) => {
  next(new AppError(`this route : ${req.originalUrl} doesn't exist`,404))
})
app.use(golbalErrmiddlewares)
connectDB()

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


process.on('unhandledRejection', (err) => {

    console.log('unhandledRejection',err);
})