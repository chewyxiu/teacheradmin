module.exports = (sequelize, Sequelize) => {
    const TeacherStudent = sequelize.define("teacher_student", {
        teacherId: {
            type: Sequelize.NUMBER
        },
        studentId: {
            type: Sequelize.NUMBER
        }
    });

    return TeacherStudent;
};