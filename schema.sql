SHOW DATABASES;
USE integral;

CREATE TABLE IF NOT EXISTS students(
id INT PRIMARY KEY,
name VARCHAR(30) UNIQUE,
email VARCHAR(50) UNIQUE
password VARCHAR(20) NOT NULL
)

INSERT INTO students(
    id,name,email,password)
VALUES
(1,'John Doe','john.doe@example.com','password123'),
(2,'Jane Smith','jane.smith@example.com','password456'),
(3,'Alice Johnson','alice.johnson@example.com','password789'),
(4,'Bob Brown','bob.brown@example.com','password012');