const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
const projectSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      trim: true,
    },
    mentor: {
      type: ObjectId,
      ref: "Mentor",
    },
    start_date: String,
    end_date: String,
    members: [
      {
        type: ObjectId,
        ref: "Employee",
      },
    ],
    status: {
      enum: ["Pending", "Complied"],
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
