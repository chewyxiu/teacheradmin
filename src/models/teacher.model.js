module.exports = (sequelize, Sequelize) => {
    const Teacher = sequelize.define("teacher", {
        email: {
            type: Sequelize.STRING
        }
    });

    return Teacher;
};