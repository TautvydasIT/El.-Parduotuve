-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 13, 2025 at 11:50 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `type_id`, `brand`, `name`, `price`) VALUES
(1, 2, 'HP', 'FastBook Pro 13', 1299.99),
(2, 1, 'Dell', 'XPS 13', 1199.00),
(3, 2, 'Apple', 'iPhone 15', 999.00),
(4, 2, 'Samsung', 'Galaxy S24', 899.99),
(5, 3, 'Sony', 'WH-1000XM5', 379.00),
(6, 3, 'Bose', 'QuietComfort 45', 329.00),
(7, 4, 'LG', 'UltraFine 27', 499.99),
(8, 4, 'Dell', 'U2723QE', 549.00),
(9, 5, 'Apple', 'Watch Series 9', 429.00),
(10, 5, 'Garmin', 'Fenix 7', 699.00);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `author` varchar(100) NOT NULL,
  `rating` int(11) NOT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `product_id`, `author`, `rating`, `comment`) VALUES
(1, 1, 'Jonas', 5, 'Great laptop for work and study.'),
(2, 1, 'Lukas', 1, 'Good product'),
(3, 2, 'Mantas', 5, 'Super fast and lightweight.'),
(5, 3, 'Lukas', 5, 'Best iPhone so far.'),
(6, 3, 'Karolina', 4, 'Excellent camera but pricey.'),
(7, 4, 'Tomas', 5, 'Amazing screen and battery.'),
(8, 4, 'Rūta', 4, 'Very good but a bit slippery.'),
(9, 5, 'Petras', 5, 'Noise cancellation is incredible.'),
(10, 5, 'Monika', 5, 'Best sound quality I have ever heard.'),
(11, 6, 'Dovydas', 4, 'Very comfortable and good sound.'),
(12, 6, 'Ieva', 5, 'Excellent for long flights.'),
(13, 7, 'Justinas', 4, 'Crisp image, works well for design.'),
(14, 7, 'Greta', 5, 'Color accuracy is perfect.'),
(15, 8, 'Paulius', 5, 'Fantastic for coding and editing.'),
(16, 8, 'Simona', 4, 'Slightly pricey but worth it.'),
(17, 9, 'Milda', 5, 'Love the fitness tracking.'),
(18, 9, 'Vytautas', 4, 'Good watch, wish battery lasted longer.'),
(19, 10, 'Neringa', 5, 'Very durable and accurate.'),
(20, 10, 'Arnas', 5, 'Perfect for hiking and sports.'),
(21, 2, 'John', 5, 'Great product!');

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `name`) VALUES
(1, 'Updated Type'),
(2, 'Smartphones'),
(3, 'Headphones'),
(4, 'Monitors'),
(5, 'Smartwatches');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
