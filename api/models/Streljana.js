import mongoose from "mongoose";
const {Schema}=mongoose;

const StreljanaSchema=new mongoose.Schema({
    ime:{
        type:String,
        required:true
    },
    vrsta:{
        type:String,
        required:true
    },
    grad:{
        type:String,
        required:true
    },
    adresa:{
        type:String,
        required:true
    },
    udaljenost:{
        type:String,
        required:true
    },
    slike: {
        type: [String],
      },
    naslov:{
        type:String,
        required:true,
    },
    opis:{
        type:String,
        required:true
    },
    ocjena:{
        type:Number,
        min:0,
        max:5
    },
    ponude:{
        type:[String],
    },
    najjeftinijaPonuda:{
        type:Number,
        required:true
    },
    
})

export default mongoose.model("Streljana",StreljanaSchema)