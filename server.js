import exp from 'express'
import { userApp } from './APIs/userApi.js'
import { productApp } from './APIs/PproductApi.js';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';
const app=exp()
app.use(exp.json())
//use cookie parser
app.use(cookieParser())
//path starts with /user-api , forward req to userApp
app.use('/user-api',userApp)
//path starts with /product-api , forward req to productApp
app.use('/product-api',productApp)
////body parser middleware



//connect to db server
// function connection(){
//     connect('mongodb://localhost:27017')
//     .then(()=>console.log("connected to database"))
//     .catch((err)=>console.log("error in connecting to database",err))
// }

async function connectDB(){
    try {
    await connect('mongodb://localhost:27017/anuragdb2')
    console.log("DB Connection success")
    //assign port
    const port=4000;
    app.listen(port,()=>console.log("server listening to port 4000...."))
    }catch(err) {
        console.log("err in db connection :",err)
    }
}

connectDB()




