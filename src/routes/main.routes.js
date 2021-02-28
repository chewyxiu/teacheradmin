const { retrieveForNotificationsRules, suspendStudentRules, registerStudentRules, validate } = require('../utils/validator.js');

module.exports = app => {
    const mainController = require("../controller/main.controller.js");
    var router = require("express").Router();

    router.post('/register', registerStudentRules(), validate, mainController.registerStudent);
    router.get('/commonstudents', mainController.commonStudents);
    router.post('/suspend', suspendStudentRules(), validate, mainController.suspendStudent);
    router.post('/retrievefornotifications', retrieveForNotificationsRules(), validate, mainController.retrieveForNotifications);
    app.use('/api', router);
};