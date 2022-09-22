const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const bcrypt = require("bcrypt");
const Employee = require("../models/employee");

exports.employeeSignUp = async (req, res) => {
  try {
    if (!(req.body.user_name && req.body.password)) {
      return res
        .status(400)
        .send({ error: "UserName and password is missing" });
    }
    const data = req.body;

    //Check is already exist or not
    const isAlreadyMentor = await Employee.findOne({
      user_name: req.body.user_name,
    });
    if (isAlreadyMentor) {
      return res.status(400).json({
        message: "Employee is already exist with this user name",
      });
    }
    const employee = await new Employee(data);
    const salt = await bcrypt.genSalt(10);
    employee.password = await bcrypt.hash(employee.password, salt);
    await employee.save();
    const token = jwt.sign({ _id: employee._id }, process.env.SECRET);
    return res.status(200).json({ employee, token });
  } catch (error) {
    return res.status(400).json({
      error: "Unable to create account",
      status: 0,
    });
  }
};

exports.employeeLogin = (req, res) => {
  const userName = req.body.user_name;
  const password = req.body.password;
  Employee.findOne({ user_name: userName }, async (err, employee) => {
    if (err || !employee) {
      return res.status(422).json({
        error: "employee is not found with this user name",
      });
    }
    const validPassword = await bcrypt.compare(password, employee.password);
    if (validPassword) {
      const token = jwt.sign({ _id: employee._id }, process.env.SECRET);
      delete employee["password"];
      return res.status(200).json({ employee, token });
    } else {
      return res.status(400).json({ error: "Invalid Password" });
    }
  });
};
exports.getEmployeeById = (req, res, next, id) => {
  Employee.findById(id).exec((error, employee) => {
    if (error || !employee) {
      return res.status(400).json({
        error: "No employee with this Id",
      });
    }
    req.employee = employee;
    next();
  });
};

exports.isEmployeeSignedIn = expressjwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
});

exports.isAuthenticatedEmployee = (req, res, next) => {
  let cheker = req.employee && req.auth && req.employee._id == req.auth._id;
  if (!cheker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};
