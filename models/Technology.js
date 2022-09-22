const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const technologySchema = new Schema(
  {
    name: String,
    image: String,
    resource_link: Array,
    status: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Technology", technologySchema);
