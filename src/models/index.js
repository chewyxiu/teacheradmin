const dbConfig = require("../../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.teacher = require("./teacher.model.js")(sequelize, Sequelize);
db.student = require("./student.model.js")(sequelize, Sequelize);
db.teacherstudent = require("./teacherstudent.model.js")(sequelize, Sequelize);

db.teacher.belongsToMany(db.student, {
    through: "teacher_students",
    as: "students",
    foreignKey: "teacherId",
});
db.student.belongsToMany(db.teacher, {
    through: "teacher_students",
    as: "teachers",
    foreignKey: "studentId",
});

module.exports = db;