const Technology = require("../models/Technology");

exports.addTechnology = async (req, res) => {
  try {
    const data = JSON.parse(JSON.stringify(req.body));
    data["image"] = req.file.filename;
    const technology = await new Technology(data).save();
    return res.status(200).json({
      message: "Technology added successfully",
      technology,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Unable to insert in Database",
    });
  }
};

exports.getTechnology = async (req, res) => {
  try {
    const technology = await Technology.find();
    return res.status(200).json(technology);
  } catch (error) {
    return res.status(400).json({
      message: "Unable to fetch",
    });
  }
};
