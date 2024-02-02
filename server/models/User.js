const mongoose= require("mongoose");



const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    AccountType:{
        type:String,
        required:true,
        trim:true
        
    },
    description:{
        type:String
    }

},
{timestamps:true}
)
module.exports = mongoose.model("user", userSchema)