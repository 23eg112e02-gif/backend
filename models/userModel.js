import {Schema,model} from 'mongoose'

//create user schema
const userSchema=new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],  //true means req proprerty is enabled
        minLength:[4,"Minimum length should be four characters"],
        maxLength:[6,"Maximum length exceeded"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    age:{
        type:Number,
        required:[true,"Age is required"],
        min:[18,"Age should be above 18"],
        max:[25,"Age should be less than 25"]
    },
},{
    strict:"throw",  //to avoid unwanted fields in document
    timestamps:true  //to add createdAt and updatedAt fields
}
)
//

//create user model with that schema
export const UserModel=model("user",userSchema)


    