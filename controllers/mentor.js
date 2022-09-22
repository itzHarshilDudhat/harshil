const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const bcrypt = require("bcrypt");
const Mentor = require("../models/mentor");

exports.mentorSignUp = async (req, res) => {
  try {
    if (!(req.body.user_name && req.body.password)) {
      return res
        .status(400)
        .send({ error: "UserName and password is missing" });
    }
    const data = req.body;

    //Check mentor is already exist or not
    const isAlreadyMentor = await Mentor.findOne({
      user_name: req.body.user_name,
    });
    if (isAlreadyMentor) {
      return res.status(400).json({
        message: "Mentor is already exist with this user name",
      });
    }

    const mentor = await new Mentor(data);

    //Encrypt password process
    const salt = await bcrypt.genSalt(10);
    mentor.password = await bcrypt.hash(mentor.password, salt);

    //Save in DB
    await mentor.save();

    //Generate token
    const token = jwt.sign({ _id: mentor._id }, process.env.SECRET);
    return res.status(200).json({ mentor, token });
  } catch (error) {
    return res.status(400).json({
      error: "Unable to create account",
      status: 0,
    });
  }
};

exports.mentorLogin = (req, res) => {
  const userName = req.body.user_name;
  const password = req.body.password;
  Mentor.findOne({ user_name: userName }, async (err, mentor) => {
    if (err || !mentor) {
      return res.status(422).json({
        error: "Mentor is not found with this user name",
      });
    }
    const validPassword = await bcrypt.compare(password, mentor.password);
    if (validPassword) {
      const token = jwt.sign({ _id: mentor._id }, process.env.SECRET);
      delete mentor["password"];
      return res.status(200).json({ mentor, token });
    } else {
      return res.status(400).json({ error: "Invalid Password" });
    }
  });
};

exports.getMentorById = (req, res, next, id) => {
  Mentor.findById(id).exec((error, mentor) => {
    if (error || !mentor) {
      return res.status(400).json({
        error: "No mentor with this Id",
      });
    }
    req.mentor = mentor;
    next();
  });
};

exports.isMentorSignedIn = expressjwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
});

exports.isAuthenticatedMentor = (req, res, next) => {
  let cheker = req.mentor && req.auth && req.mentor._id == req.auth._id;
  if (!cheker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};
