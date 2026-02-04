import exp from 'express'
import { UserModel } from '../models/userModel.js'
import {hash,compare} from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../middleware/tokenValidate.js'
export const userApp = exp.Router()

//create user
userApp.post('/users',async(req,res)=>{
    //get new user from req
    let newUser=req.body;
    //hash the password
    let hashedPassword=await hash(newUser.password,12)
    //replace plain password with hashed password
    newUser.password=hashedPassword;
    //create new user document
    let newUserDoc=new UserModel(newUser)
    //save in db
    await newUserDoc.save()
    //send res
    res.status(201).json({message:"user created"})
})



//Read user
userApp.get('/users', async (req, res) => {
    //read users from DB
    let users = await UserModel.find()   //(or)     //find({},{username:1,_id:0})
    //send res
    res.status(200).json({ message: "users", payload: users })
})


//read user by ObjectID
userApp.get('/users/:id',async(req,res)=>{
    //get objectid from url param
    let objId=req.params.id;
    //find user in db
    let userObj=await UserModel.findById(objId)
    //send res
    res.status(200).json({message:"user",payload:userObj})
})

//update user
userApp.put('/users/:id',async(req,res)=>{
    //get objectID from url param
    let objId=req.params.id
    //get modified user from req
    let modifiedUser=req.body
    //make update
    let lastestUser=await UserModel.findByIdAndUpdate(objId,{$set:{...modifiedUser}},{new:true,runValidators:true})
    //send res
    res.status(200).json({message:"user modified",payload:lastestUser});
})

//Delete user
userApp.delete('/users/:id',async(req,res)=>{
    let objId=req.params.id
    let deletedUser=await UserModel.findByIdAndDelete(objId)
    res.status(200).json({message:"user removed",payload:deletedUser})
})


//user authentication route
userApp.post('/auth',async(req,res)=>{
    //get user cred obj
    let userCred=req.body;
    //check for username
    let userOfDB=await UserModel.findOne({username:userCred.username})
    //if user not found
    if(userOfDB===null){
        return res.status(404).json({message:"Invalid username"})
    }
    //compare passwords
    let status=await compare(userCred.password,userOfDB.password)
    //if passwords not matched
    if(status===false){
        return res.status(404).json({message:"Invalid password"})
    }
    //create signed token
    let signedToken=jwt.sign({username:userCred.username},'abcdef',{expiresIn:30})
   // save token as httponly cookie
   res.cookie('token',signedToken,{httpOnly:true,
    secure:false,
    sameSite:'lax'})
    res.status(200).json({message:"login success",})
   })

    
//test route
userApp.get('/test',verifyToken, (req, res) => {
    res.json({ message: "test" })
})
