const db = require("../models");
const TeacherStudent = db.teacherstudent;
const err = require("../enum/errors");
const errors = err.errors;

const registerStudentTeacher = (studentId, teacherId) => {
    return TeacherStudent.create({teacherId: teacherId, studentId: studentId}).catch((err) => {
        // log error
        console.log(err);
        return errors.SERVER_ERROR
    });
};

module.exports = {
    registerStudentTeacher
};
