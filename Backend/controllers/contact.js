import Contact from '../models/contact.js'

export const createContact = async(req , res) =>{
    try{
        const {name , email , mobile , message} = req.body;
        const exist = await Contact.findOne({email});
        if(exist){
            res.status(400).json({message:"email already exists"});
        }
        const contact = new Contact({name , email , mobile , message});
        await contact.save();
        res.status(200).json({message:'Contact saved successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"server error"})
    }
}


export const getContact = async (req , res) =>{
    try{
        const contacts = await Contact.find();
        res.json(contacts);
    }catch(err){
        console.log(err);
        res.status(500).json({message:'server error'});
    }
}
