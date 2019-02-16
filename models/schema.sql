DROP DATABASE IF EXISTS trivia_db;

CREATE DATABASE trivia_db;

USE trivia_db;

CREATE TABLE users
(
    id int NOT NULL
    AUTO_INCREMENT,
user_name VARCHAR
    (300) NOT NULL,
passwords VARCHAR
    (300) NOT NULL,
PRIMARY KEY
    (id)
);

    CREATE TABLE questions
    (
        id int NOT NULL
        AUTO_INCREMENT,
question VARCHAR
        (300) NOT NULL,
answer VARCHAR
        (300) NOT NULL,
PRIMARY KEY
        (id)
);

