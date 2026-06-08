const Course = require("../models/course.model");
const Tutor = require("../models/tutor.model");
const Student = require("../models/student.model");

const addStudentToCourse = async (studentId, courseId, tutorId) => {
  await Course.updateOne({ _id: courseId }, { $addToSet: { students: studentId } });
  await Student.updateOne({ _id: studentId }, { $addToSet: { enrolledCourses: courseId } });
  if (tutorId) {
    await Tutor.updateOne({ _id: tutorId }, { $addToSet: { students: studentId } });
  }
};

const linkInterestedStudentsToCourse = async (course, title, tutorId) => {
  const students = await Student.find({ interestedCourses: title, role: "student" });
  for (const student of students) {
    await addStudentToCourse(student._id, course._id, tutorId);
  }
};

const syncTutorCourses = async (tutor) => {
  const titles = [...new Set((tutor.teachingCourses || []).filter(Boolean))];
  const courseIds = [];

  for (const title of titles) {
    let course = await Course.findOne({ title, tutor: tutor._id });
    if (!course) {
      course = await Course.create({
        title,
        tutor: tutor._id,
        status: "active",
      });
    }

    courseIds.push(course._id);
    await linkInterestedStudentsToCourse(course, title, tutor._id);
  }

  tutor.courses = courseIds;
  await tutor.save();
  return courseIds;
};

const enrollStudentInCourses = async (student) => {
  const titles = [...new Set((student.interestedCourses || []).filter(Boolean))];

  for (const title of titles) {
    const courses = await Course.find({ title });
    for (const course of courses) {
      await addStudentToCourse(student._id, course._id, course.tutor);
    }
  }
};

module.exports = {
  syncTutorCourses,
  enrollStudentInCourses,
};
