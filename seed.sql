DROP DATABASE IF EXISTS emptracker_db;

CREATE DATABASE emptracker_db;

USE emptracker_db;

CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `role_id` int DEFAULT NULL,
  `manager_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `salary` decimal(10,0) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `emptracker_db`.`employee`
(
`first_name`,
`last_name`,
`role_id`)
VALUES
("Joe","Boomer",1),("Chrissy","Boomer",1),("Ron","Swanson",2),("Bob","Ross",3);

INSERT INTO `emptracker_db`.`department`
(`name`)
VALUES ("Management"),("Engineering"),("Interns");

INSERT INTO `emptracker_db`.`role`
(
`title`,
`salary`,
`department_id`)
VALUES
("Manager",37500,1),("Engineer", 30175,2),("Intern",12600,3);
