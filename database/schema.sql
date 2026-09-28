-- Create Database saving_tracker
CREATE DATABASE IF NOT EXISTS saving_tracker_app;
USE saving_tracker_app;


-- Create table users
Create table users(
	user_id INT auto_increment PRIMARY KEY,
	name VARCHAR (100) NOT NULL,
	email VARCHAR (255) NOT NULL UNIQUE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- create table savings_goals
CREATE TABLE savings_goals (
	goal_id INT auto_increment PRIMARY KEY,
	user_id INT NOT NULL,
	goal_name VARCHAR(150) NOT NULL,
	target_amount DECIMAL (10, 2) NOT NULL,
	deadline DATE,
	status ENUM ('Completed', 'Paused', 'In Progress') DEFAULT 'In Progress',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
	FOREIGN KEY (user_id)
		REFERENCES users(user_id)
		ON DELETE CASCADE 
);

-- Create table contributions
CREATE TABLE contributions (
	contribution_id INT auto_increment PRIMARY KEY,
	goal_id INT NOT NULL,
	amount DECIMAL(10, 2) NOT NULL,
	note VARCHAR(255),
	contributed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
	FOREIGN KEY (goal_id)
		REFERENCES savings_goals(goal_id)
		ON DELETE CASCADE 
);


SELECT * FROM users;
SELECT * FROM savings_goals;
SELECT * FROM contributions;

SHOW TABLES;