
const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const app = express()
const auth = require('./routes/authroutes')
const company = require('./routes/companyroutes')
const tender = require('./routes/tenderroutes')
const application = require('./routes/applicationroutes')

app.use(express.json())
app.use(cors())

app.use('/auth' , auth)
app.use('/company'  , company)
app.use('/tender'  , tender)
app.use('/application'  , application)


app.listen(8000 , async(req , res)=>{
console.log("Port listening on 8000")
})