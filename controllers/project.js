const Project = require("../models/project");

exports.addProject = async (req, res) => {
  try {
    const mentorId = req.mentor._id;
    const data = req.body;
    data["mentor"] = mentorId;
    const project = await new Project(data).save();
    res.status(200).json({ project });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

exports.getProjectById = async (req, res, next, id) => {
  Project.findById(id).exec((error, project) => {
    if (error || !project) {
      return res.status(400).json({
        error: "No project with this Id",
      });
    }
    req.project = project;
    next();
  });
};

exports.updateProject = async (req, res) => {
  try {
    Project.findByIdAndUpdate(
      { _id: req.project._id },
      { $set: req.body },
      { new: true, useFindAndModify: true },
      (error, updatedProject) => {
        if (error) {
          return res.status(400).json({
            message: "Unable to update Project",
            error,
          });
        }
        return res.status(200).json({
          message: "Project updated successfully",
          updatedProject,
        });
      }
    );
  } catch (error) {
    return res.status(400).json({
      message: "Unable to update",
    });
  }
};

exports.getProjectByMentor = async (req, res) => {
  try {
    const projects = await Project.find({ mentor: req.mentor._id });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(400).json({
      message: "Unable to find project",
    });
  }
};

exports.getSingleProject = (req, res) => {
  return res.json(req.project);
};

exports.getProjectByEmployee = async (req, res) => {
  try {
    const projects = await Project.find({
      members: { $in: [req.employee._id] },
    });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(400).json({
      message: "Unable to find project",
    });
  }
};

exports.removeMember = async (req, res) => {
  try {
    Project.findByIdAndUpdate(
      { _id: req.project._id },
      { $pull: { members: { $in: req.body.member } } },
      { new: true, useFindAndModify: true },
      (error, updatedProject) => {
        if (error) {
          return res.status(400).json({
            message: "Unable to remove member",
          });
        }
        return res.status(200).json({
          message: "Member removed successfully",
          updatedProject,
        });
      }
    );
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};
