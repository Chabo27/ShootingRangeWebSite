import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("Zdravo korisniče, ulogovan si");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Zdravo korisniče, ulogovan si, i mozes obrisati svoj nalog");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Zdravo admine, ulogovan si, i mozes obrisati sve naloge");
//   });

// Azuriranje
router.put("/:id",verifyUser,updateUser);
//Brisanje
router.delete("/:id", verifyUser,deleteUser);
// Get
router.get("/:id", verifyUser, getUser);
// Get ALL
router.get("/", verifyAdmin,getUsers);

export default router;
