CREATE USER 'gazua'@'localhost' IDENTIFIED BY 'alfadb';
GRANT ALL PRIVILEGES ON promo_prime.* TO 'gazua'@'localhost';
FLUSH PRIVILEGES;