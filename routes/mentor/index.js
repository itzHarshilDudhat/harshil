const express = require("express");
const {
  mentorSignUp,
  mentorLogin,
  getMentorById,
  isMentorSignedIn,
  isAuthenticatedMentor,
} = require("../../controllers/mentor");
const {
  addProject,
  getProjectById,
  updateProject,
  getProjectByMentor,
  getSingleProject,
  removeMember,
} = require("../../controllers/project");
const router = express.Router();

//Take id from params
router.param("mentorId", getMentorById);
router.param("projectId", getProjectById);
router.post("/signup", mentorSignUp);
router.post("/login", mentorLogin);

//Project routes
router.post(
  "/project/add/:mentorId",
  isMentorSignedIn,
  isAuthenticatedMentor,
  addProject
);
router.put(
  "/project/update/:mentorId/:projectId",
  isMentorSignedIn,
  isAuthenticatedMentor,
  updateProject
);
router.get(
  "/project/get/:mentorId",
  isMentorSignedIn,
  isAuthenticatedMentor,
  getProjectByMentor
);
router.get(
  "/project/get/:mentorId/:projectId",
  isMentorSignedIn,
  isAuthenticatedMentor,
  getSingleProject
);
router.patch(
  "/project/member/remove/:mentorId/:projectId",
  isMentorSignedIn,
  isAuthenticatedMentor,
  removeMember
);
module.exports = router;
