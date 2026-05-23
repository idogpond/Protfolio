-- Initial MySQL setup for Portfolio project
-- This file runs automatically on first container start

CREATE DATABASE IF NOT EXISTS `portfolio_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

GRANT ALL PRIVILEGES ON `portfolio_db`.* TO 'portfolio_user'@'%';
FLUSH PRIVILEGES;
