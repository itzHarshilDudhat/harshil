const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const mentorSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    user_name: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mentor", mentorSchema);
