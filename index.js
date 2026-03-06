import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import routes from './routes/schoolRoutes.js'
import {connectDB} from './db.js'
const app = express()
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json())

connectDB()

app.get('/',(req,res)=>{
    res.send('School Management Api working')
})
app.use('/api',routes)

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})
