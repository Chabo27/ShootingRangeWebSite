import Streljana from "../models/Streljana.js";
import Ponuda from "../models/Ponuda.js";
import { createError } from "../utils/error.js";

export const createPonuda = async (req, res, next) => {
  const streljanaId = req.params.streljanaid;
  const newPonuda = new Ponuda(req.body);

  try {
    const savedPonuda = await newPonuda.save();
    try {
      // push the new ponuda id and update streljana's najjeftinijaPonuda if this ponuda is cheaper
      await Streljana.findByIdAndUpdate(streljanaId, {
        $push: { ponude: savedPonuda._id },
        $min: { najjeftinijaPonuda: savedPonuda.cijena },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedPonuda);
  } catch (err) {
    next(err);
  }
};

export const updatePonuda = async (req, res, next) => {
  try {
    const updatedPonuda = await Ponuda.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    // after updating a ponuda, recalculate the parent streljana's najjeftinijaPonuda
    try {
      const parent = await Streljana.findOne({ ponude: updatedPonuda._id });
      if (parent) {
        // fetch all ponude for this streljana
        const list = await Promise.all(
          parent.ponude.map((pId) => Ponuda.findById(pId))
        );
        const prices = list.map((p) => (p ? p.cijena : Infinity));
        const minPrice = Math.min(...prices);
        await Streljana.findByIdAndUpdate(parent._id, { najjeftinijaPonuda: minPrice });
      }
    } catch (err) {
      // non-fatal, continue
      console.error("Failed to update streljana min price:", err);
    }

    res.status(200).json(updatedPonuda);
  } catch (err) {
    next(err);
  }
};
export const updatePonudaDostupnost = async (req, res, next) => {
  try {
    await Ponuda.updateOne(
      { "brojPonuda._id": req.params.id },
      {
        $push: {
          "brojPonuda.$.nedostupniDatumi": req.body.dates,
        },
      }
    );
    res.status(200).json("Ponuda je apdejtovana");
  } catch (err) {
    next(err);
  }
};
  
export const deletePonuda = async (req, res, next) => {
  const streljanaId = req.params.streljanaid;
  try {
    await Ponuda.findByIdAndDelete(req.params.id);
    try {
      await Streljana.findByIdAndUpdate(streljanaId, {
        $pull: { ponude: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Ponuda je obrisana.");
  } catch (err) {
    next(err);
  }
};

export const getPonuda = async (req, res, next) => {
  try {
    const ponuda = await Ponuda.findById(req.params.id);
    res.status(200).json(ponuda);
  } catch (err) {
    next(err);
  }
};

export const getPonude = async (req, res, next) => {
  const { limit, ...others } = req.query;
  try {
    const ponude = await Ponuda.find({
      ...others,
    }).limit(req.query.limit);
    res.status(200).json(ponude);
  } catch (err) {
    next(err);
  }
 
 
  // try {
  //   const ponude = await Ponuda.find(req.query).limit(req.query.limit);
  //   res.status(200).json(ponude);
  // } catch (err) {
  //   next(err);
  // }
};
