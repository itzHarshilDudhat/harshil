const {
  addTechnology,
  getTechnology,
} = require("../../controllers/technology");
const { imageUpload } = require("../../middlewares/multerImage");

const routes = require("express").Router();

routes.post("/add", imageUpload.single("image"), addTechnology);
routes.get("/get", getTechnology);

module.exports = routes;
