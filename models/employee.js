const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    user_name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
