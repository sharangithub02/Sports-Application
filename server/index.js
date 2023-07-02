const express = require("express")
const app = express();
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const ConnectToMongo = require('./db');
ConnectToMongo()

app.use(express.json())

app.use(cors())

app.use('/api/admin', require('./Routes/admin_route'))
app.use('/api/user', require('./Routes/user_route'))

app.listen(process.env.PORT,()=>{
    console.log('App listening on PORT '+process.env.PORT)
})

