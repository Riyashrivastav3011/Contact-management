import mongoose from 'mongoose'

const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:false
    }    
})

export default mongoose.model("Contact" , contactSchema);
