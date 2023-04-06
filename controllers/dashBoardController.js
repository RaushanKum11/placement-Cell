const Interview = require("../models/interview");
const Student = require("../models/student");

module.exports.dashboard = async function (req, res) {
  try {
    if (req.isAuthenticated()) {
      // populating all students and populate them with interview
      let students = await Student.find({}).populate("interviews");

      // populating interviews and populate them with students
      let interviews = await Interview.find({}).populate("students.student");
      // Render the dashboard UI
      return res.render("dashboard", {
        title: "Dashboard",
        all_students: students,
        all_interviews: interviews,
      });
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};
