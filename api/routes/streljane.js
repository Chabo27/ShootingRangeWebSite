import express from "express";
import Streljana from "../models/Streljana.js";
import { createError } from "../utils/error.js";
import {
  countByGrad,
  countByVrsta,
  createStreljana,
  deleteStreljana,
  getStreljana,
  getStreljanaPonude,
  getStreljane,
  updateStreljana,
} from "../controllers/streljana.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
// Kreiranje 
router.post("/", verifyAdmin, createStreljana);
// Azuriranje
router.put("/:id", verifyAdmin, updateStreljana);
//Brisanje
router.delete("/:id", verifyAdmin, deleteStreljana);
// Get
router.get("/find/:id", getStreljana);
// Get ALL
router.get("/", getStreljane);
router.get("/countByGrad", countByGrad);
router.get("/countByVrsta", countByVrsta);
router.get("/ponuda/:id", getStreljanaPonude);

export default router;
