const express = require("express");
const {
  employeeSignUp,
  employeeLogin,
  getEmployeeById,
  isAuthenticatedEmployee,
  isEmployeeSignedIn,
} = require("../../controllers/employee");
const { getProjectByEmployee } = require("../../controllers/project");
const router = express.Router();

router.param("employeeId", getEmployeeById);
router.post("/signup", employeeSignUp);
router.post("/login", employeeLogin);

//Get projects which it added
router.get(
  "/project/get/:employeeId",
  isEmployeeSignedIn,
  isAuthenticatedEmployee,
  getProjectByEmployee
);
module.exports = router;
