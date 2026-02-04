import { Schema ,model} from 'mongoose'
//create product schema
const productSchema=new Schema({
    pid:{
        type:Number,
        required:[true,'Product ID is required'],
    },
    productName:{
        type:String,
        required:[true,'Product Name is required'],
    },
    price:{
        type:Number,
        required:[true,'Price is required'],
    },
},{
    strict:"throw",  //to avoid unwanted fields in document
    timestamps:true  //to add createdAt and updatedAt fields
}
)
//create product model with that schema
export const ProductModel=model("product",productSchema )



