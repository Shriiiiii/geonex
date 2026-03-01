CREATE TABLE `users` (
  `u_id` INT(11) NOT NULL AUTO_INCREMENT,
  `uname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert a sample user
INSERT INTO `users` (`uname`, `email`, `password`) VALUES
('Test User', 'test@gmail.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4');

CREATE TABLE image_records ( id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, image_url TEXT NOT NULL, public_id VARCHAR(255), prediction VARCHAR(100), confidence FLOAT, location VARCHAR(255), uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP );