import exp from 'express'
import {ProductModel} from '../models/productModel.js'
export const productApp=exp.Router()
//get all products
productApp.get('/products',async (req,res)=>{
    let products=await ProductModel.find()
    res.status(200).json({message:"products data",payload:products})
})
//create product
productApp.post('/products',async (req,res)=>{
    let newProduct=req.body
    let newProductDoc=new ProductModel(newProduct)
    await newProductDoc.save()
    res.status(201).json({message:"new product created"})
})
//get products bu id
productApp.get('/products/:id',async (req,res)=>{
    let objId=req.params.id
    let productObj=await ProductModel.findById(objId)
    res.status(200).json({message:"product ",payload:productObj})
})
//update product
productApp.put('/products/:id',async (req,res)=>{
    let objId=req.params.id
    let modifiedProduct=req.body
    await ProductModel.findByIdAndUpdate(objId,{$set:{...modifiedProduct}},{new:true})
    res.status(200).json({message:"product modified"})
})