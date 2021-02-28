const db = require("../models");
const _ = require('lodash');
const statusCodes = require("../enum/statuscodes");
const err = require("../enum/errors");
const http = statusCodes.statusCode;
const errors = err.errors;
const Op = db.Sequelize.Op;
const studentDAO = require("../dao/student");
const teacherDAO = require("../dao/teacher");
const teacherstudentDAO = require("../dao/teacherstudent");

exports.registerStudent = (req, res) => {
    const teacherEmail = req.body.teacher;
    const students = req.body.students;

    const teacherSuccessCb = (teacherId) => {
        const studentSuccessCb = (studentId) => {
            return teacherstudentDAO.registerStudentTeacher(studentId, teacherId);
        };
        const promiseList = students.map((s) => {
            return studentDAO.findStudentIdByEmail(s, res, studentSuccessCb);
        });

        Promise.all(promiseList).then((values) => {
            // failed to register at least one student to the teacher, return error
            if (_.includes(values, errors.SERVER_ERROR)) {
                res.status(http.INTERNAL_SERVER_ERROR).send({
                    message: errors.SERVER_ERROR,
                });
                return;
            }
            res.status(http.NO_CONTENT).send();
        }).catch((err) => {
            // log error
            console.log(err);
            res.status(http.INTERNAL_SERVER_ERROR).send({
                message: errors.SERVER_ERROR,
            });
        });
    };

    teacherDAO.findTeacherIdByEmail(teacherEmail, res, teacherSuccessCb);
};

exports.commonStudents = (req, res) => {
    const teacherEmail = req.query.teacher;
    if (!teacherEmail) {
        res.status(http.BAD_REQUEST).send({
            message: errors.MISSING_PARAMETERS
        });
        return;
    }
    let studentsList = [];
    const promiseList = [];

    const successCb =(students) => {
        const studentsUnderTeacher = students.map(s => s.email);
        if (_.isEmpty(studentsList)) {
            studentsList = studentsUnderTeacher;
        } else {
            studentsList = _.intersection(studentsUnderTeacher, studentsList);
        }
    };

    if (teacherEmail instanceof Array) {
        teacherEmail.forEach((email) => {
            promiseList.push(teacherDAO.getStudentsFromTeacher(email, null, res, successCb));
        });
    } else {
        promiseList.push(teacherDAO.getStudentsFromTeacher(teacherEmail, null, res, successCb));
    }

    Promise.all(promiseList).then(() => {
        res.status(http.OK).send({students: studentsList});
    }).catch((err) => {
        // log error
        console.log(err);
        res.status(http.INTERNAL_SERVER_ERROR).send({
            message: errors.SERVER_ERROR
        });
    });
};

exports.suspendStudent = (req, res) => {
    const studentEmail = req.body.student;
    if (!studentEmail) {
        res.status(http.BAD_REQUEST).send({
            message: errors.MISSING_PARAMETERS
        });
    }

    const successCb = (studentId) => {
        return studentDAO.suspendStudent(studentId, res);
    };
    studentDAO.findStudentIdByEmail(studentEmail, res, successCb)
};

exports.retrieveForNotifications = (req, res) => {
    const {teacher, notification} = req.body;
    const findStudentCondition = {
            status: {
                [Op.not]: "suspended"
            }
    };
    let studentsList = [];

    const successCb = (students) => {
        students.forEach((s) => {
            studentsList.push(s.email);
        });
        const mentions = notification.match(/@[\w]+@[\S]+/g);
        if (_.isEmpty(mentions)) {
            res.status(http.OK).send({recipients: studentsList});
            return;
        }
        getMentionStudents(mentions,res).then((students) => {
            studentsList = _.uniq(studentsList.concat(students));
            res.status(http.OK).send({recipients: studentsList})
        });
    };

    teacherDAO.getStudentsFromTeacher(teacher, findStudentCondition, res, successCb);
};

const getMentionStudents = (mentions, res) => {
    const studentList = [];
    const promiseList = [];
    // verify if mentions are valid students
    mentions.forEach((m) => {
       const email = m.slice(1);
       const successCb = (studentId) => {
           studentList.push(email);
       };
       const errorCb = (err) => {
           return err;
       };
        promiseList.push(studentDAO.findStudentIdByEmail(email,res, successCb, errorCb));
    });

    return Promise.all(promiseList).then(() => {
        return studentList;
    });
};
