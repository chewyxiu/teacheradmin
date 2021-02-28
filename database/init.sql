CREATE DATABASE adminapp;

DROP TABLE IF EXISTS `students`;

CREATE TABLE `students` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `status` varchar(64) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;

INSERT INTO `students` (`id`, `email`, `status`, `createdAt`, `updatedAt`)
VALUES
	(1,'student@gmail.com','suspended','2021-02-27 01:01:47','2021-02-28 03:13:54'),
	(2,'student2@gmail.com','suspended','2021-02-27 01:02:22','2021-02-28 04:27:38'),
	(3,'student3@gmail.com','active','2021-02-27 23:37:19','2021-02-27 23:37:22'),
	(4,'student4@gmail.com','active','2021-02-28 04:07:36',NULL);

/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `teacher_students`;

CREATE TABLE `teacher_students` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `teacherId` bigint(20) NOT NULL,
  `studentId` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`studentId`,`teacherId`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `teacher_students` WRITE;
/*!40000 ALTER TABLE `teacher_students` DISABLE KEYS */;

INSERT INTO `teacher_students` (`id`, `teacherId`, `studentId`, `createdAt`, `updatedAt`)
VALUES
	(1,1,1,'2021-02-28 04:08:33','2021-02-28 04:08:33'),
	(2,2,1,'2021-02-28 04:27:09','2021-02-28 04:27:09'),
	(3,1,2,'2021-02-28 04:08:33','2021-02-28 04:08:33'),
	(4,1,3,'2021-02-28 04:11:24','2021-02-28 04:11:24');

/*!40000 ALTER TABLE `teacher_students` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table teachers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `teachers`;

CREATE TABLE `teachers` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;

INSERT INTO `teachers` (`id`, `email`, `createdAt`, `updatedAt`)
VALUES
	(1,'teacher@gmail.com','2021-02-27 01:02:09','2021-02-27 22:54:28'),
	(2,'teacher2@gmail.com','2021-02-27 23:36:07',NULL);

/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;