const db = require("../models");
const Teacher = db.teacher;
const Student = db.student;
const _ = require('lodash');
const statusCodes = require("../enum/statuscodes");
const http = statusCodes.statusCode;
const err = require("../enum/errors");
const errors = err.errors;

const findTeacherIdByEmail = (email, res, cb) => {
    Teacher.findAll({
        attributes: ["id"],
        where: {
            email: email
        }
    }).then((teacherData) => {
        // No teacher found
        if (_.isEmpty(teacherData)) {
            res.status(http.BAD_REQUEST).send({
                message: errors.INVALID_TEACHER,
            });
        }
        const teacherId = (teacherData[0].get("id"));
        return cb(teacherId);
    }).catch((err) => {
        // log error
        console.log(err);
        res.status(http.INTERNAL_SERVER_ERROR).send({
            message: errors.SERVER_ERROR
        });
    })
};

const getStudentsFromTeacher = (email, findStudentCond, res, cb) => {
    return Teacher.findAll({
        include: {
            model: Student,
            as: 'students',
            where: findStudentCond,
        },
        where: {email: email},
    })
        .then((teacherData) => {
            // No teacher found
            if (_.isEmpty(teacherData)) {
                res.status(http.BAD_REQUEST).send({
                    message: errors.INVALID_TEACHER
                });
            }
            return cb(teacherData[0].toJSON().students);
        }).catch((err) => {
            // log error
            console.log(err);
            res.status(http.INTERNAL_SERVER_ERROR).send({
                message: errors.SERVER_ERROR
            });
        });
};

module.exports = {
    findTeacherIdByEmail,
    getStudentsFromTeacher,
};
