const router = require("express").Router();
const mentorRoutes = require("./mentor/index");
const employeeRoutes = require("./employee/index");
const technologyRoutes = require("./technology/index");
router.use("/mentor", mentorRoutes);
router.use("/employee", employeeRoutes);
router.use("/technology", technologyRoutes);
module.exports = router;
