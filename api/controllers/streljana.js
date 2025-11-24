import Streljana from "../models/Streljana.js";
import Ponuda from "../models/Ponuda.js";

export const createStreljana = async (req, res, next) => {
  const newStreljana = new Streljana(req.body);
  try {
    const savedStreljana = await newStreljana.save();
    res.status(200).json(savedStreljana);
  } catch (err) {
    next(err);
  }
};

export const updateStreljana = async (req, res, next) => {
  try {
    const updatedStreljana = await Streljana.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedStreljana);
  } catch (err) {
    next(err);
  }
};

export const deleteStreljana = async (req, res, next) => {
  try {
    await Streljana.findByIdAndDelete(req.params.id);
    res.status(200).json("Streljana je obrisana.");
  } catch (err) {
    next(err);
  }
};

export const getStreljana = async (req, res, next) => {
  
  try {
    const streljana = await Streljana.findById(req.params.id);
    res.status(200).json(streljana);
  } catch (err) {
    next(err);
  }
};

export const getStreljane = async (req, res, next) => {
  const { limit } = req.query;
  // parse min/max safely and build a tolerant query
  const min = req.query.min ? Number(req.query.min) : 0;
  const max = req.query.max ? Number(req.query.max) : 9999;
  try {
    const query = {};
    // only add grad filter if provided and non-empty
    if (req.query.grad && req.query.grad.trim() !== "") {
      // case-insensitive, partial match
      query.grad = { $regex: req.query.grad, $options: "i" };
    }
    // add price range
    query.najjeftinijaPonuda = { $gte: min, $lte: max };

    const streljane = await Streljana.find(query).limit(limit);
    res.status(200).json(streljane);
  } catch (err) {
    next(err);
  }
};
export const countByGrad = async (req, res, next) => {
  const gradovi = req.query.gradovi.split(",");
  try {
    const list = await Promise.all(
      gradovi.map((grad) => {
        return Streljana.countDocuments({ grad: grad });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByVrsta = async (req, res, next) => {
  try {
    const otvorenaCount = await Streljana.countDocuments({ vrsta: "otvorena" });
    const streljanaCount = Streljana.countDocuments({ type: "otvorena" });
    const zatvorenaCount = await Streljana.countDocuments({
      vrsta: "zatvorena",
    });
    const kombinovanaCount = await Streljana.countDocuments({
      vrsta: "kombinovana",
    });

    res.status(200).json([
      { type: "otvorena", count: otvorenaCount },
      { type: "zatvorena", count: zatvorenaCount },
      { type: "kombinovana", count: kombinovanaCount },
    ]);
  } catch (err) {
    next(err);
  }
};
export const getStreljanaPonude = async (req, res, next) => {
  try {
    const streljana = await Streljana.findById(req.params.id);
    const list = await Promise.all(
      streljana.ponude.map((ponuda) => {
        return Ponuda.findById(ponuda);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
