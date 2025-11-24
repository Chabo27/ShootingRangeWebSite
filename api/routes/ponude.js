import express from "express";
import {
  createPonuda,
  deletePonuda,
  getPonuda,
  getPonude,
  updatePonuda,
  updatePonudaDostupnost,
} from "../controllers/ponuda.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Kreiranje
router.post("/:streljanaid", verifyAdmin, createPonuda);
// Azuriranje
router.put("/:id", verifyAdmin, updatePonuda);
router.put("/dostupnost/:id", updatePonudaDostupnost);

//Brisanje
router.delete("/:id/:streljanaid", verifyAdmin, deletePonuda);
// Get
router.get("/:id", getPonuda);
// Get ALL
router.get("/", getPonude);

export default router;
