import mongoose from "mongoose";
const { Schema } = mongoose;

const PonudaSchema = new mongoose.Schema(
  {
    naziv: {
      type: String,
      required: true,
    },
    slike: {
      type: [String],
    },
    cijena: {
      type: Number,
      required: true,
    },
    brMun1: {
      type: Number,
      required: true,
    },
    brMun2: {
      type: Number,
      required: true,
    },
    o1: {
      type: String,
      required: true,
    },
    o2: {
      type: String,
      required: true,
    },
    grad: {
      type: String,
      required: true,
    },
    cijenao1: {
      type: Number,
      required: true,
    },
    cijenao2: {
      type: Number,
      required: true,
    },
    ocjena: {
      type: Number,
      min: 0,
      max: 5,
    },
    opis:{
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    brojPonuda: [{ broj: Number, nedostupniDatumi: {type: [Date]}}],
    // brojDostupnih:{
    //   type:Number,
    //   required:true,
    // },
    popularno:{
      type:Boolean,
      default:false,
  },
  },

  { timestamps: true }
);

export default mongoose.model("Ponuda", PonudaSchema);
