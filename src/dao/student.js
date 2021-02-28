const db = require("../models");
const Student = db.student;
const statusCodes = require("../enum/statuscodes");
const _ = require('lodash');
const http = statusCodes.statusCode;
const err = require("../enum/errors");
const errors = err.errors;

const findStudentIdByEmail = (email, res, successCb, errorCb) => {
    return Student.findAll({
        attribute: ["id"],
        where: {
            email: email
        }
    }).then((student) => {
        // No student found
        if (_.isEmpty(student)) {
            return res.status(http.BAD_REQUEST).send({
                message: errors.INVALID_STUDENT
            });
        }
        const studentId = (student[0].get("id"));
        return successCb(studentId);
    }).catch((err) => {
        // log error
        console.log(err);
        if (errorCb) {
            return errorCb(err);
        }
        res.status(http.INTERNAL_SERVER_ERROR).send({
            message: errors.SERVER_ERROR
        });
    });
};

const suspendStudent = (studentId, res) => {
    Student.update(
        { status: "suspended" },
        { where: { id: studentId }})
        .then(() => {
            res.status(http.NO_CONTENT).send();
        }).catch((err)=> {
            // log error
            console.log(err);
            res.status(http.INTERNAL_SERVER_ERROR).send({
                message: errors.SERVER_ERROR
            });
        });
};


module.exports = {
    findStudentIdByEmail,
    suspendStudent,
};