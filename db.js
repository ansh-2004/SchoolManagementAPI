import 'dotenv/config'
import mysql from 'mysql2'

export const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
})

export const connectDB = ()=>{

    db.connect((err)=>{
    if(err){
        console.log("Failed to connect db",err)
    }
    else{
        console.log("Database connected successfully")
    }
    })

}
