-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Мар 13 2025 г., 17:51
-- Версия сервера: 10.4.28-MariaDB
-- Версия PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `goodsnewtesttask`
--

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `orderName` varchar(70) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `OrderDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `PriceUSD` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `PriceEUR` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `PriceUAN` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `productsQuantity` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `orderName`, `OrderDate`, `PriceUSD`, `PriceEUR`, `PriceUAN`, `productsQuantity`) VALUES
(1, 'Order 1', '2025-02-25 14:42:33', '260', '0', '10400', '4'),
(2, 'Order 2', '2025-02-25 14:43:39', '390', '0', '12600', '3'),
(3, 'Order 3', '2025-02-25 14:48:23', '595', '0', '23800', '4'),
(109, 'Order 109', '2025-03-12 12:31:33', '2040', '1861.5', '85000', '2'),
(110, 'Order 110', '2025-03-12 12:36:14', '3240', '2956.5', '135000', '3'),
(111, 'Order 111', '2025-03-12 12:49:43', '3100', '2790.279999', '127410', '3'),
(116, 'Order 116', '2025-03-12 20:34:22', '480', '438', '20000', '1'),
(117, 'Order 117', '2025-03-12 20:42:59', '5800', '5220.52', '238380', '3'),
(127, 'Order 127', '2025-03-13 10:28:16', '1434', '1314', '60000', '1'),
(130, 'Order 130', '2025-03-13 10:54:01', '717', '657', '30000', '1'),
(134, 'Order 134', '2025-03-13 11:07:04', '6000', '5413.679999', '247200', '2'),
(135, 'Order 135', '2025-03-13 11:16:12', '6000', '5413.679999', '247200', '2'),
(136, 'Order 136', '2025-03-13 11:38:16', '3800', '3428.67', '156560', '3'),
(137, 'Order 137', '2025-03-13 11:45:37', '6000', '5413.679999', '247200', '2');

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `pName` varchar(70) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pType` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `monthsGarantee` int(2) NOT NULL,
  `guaranteeStart` timestamp NOT NULL DEFAULT current_timestamp(),
  `guaranteeEnd` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `orderCurrency` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `exchangeRate` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `PriceUSD` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `PriceEUR` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `PriceUAN` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ExchangeUSD_buy` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ExchangeUSD_sale` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ExchangeEUR_buy` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ExchangeEUR_sale` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `serialNumber` int(10) NOT NULL,
  `img` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `orderId` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `pName`, `pType`, `monthsGarantee`, `guaranteeStart`, `guaranteeEnd`, `orderCurrency`, `exchangeRate`, `PriceUSD`, `PriceEUR`, `PriceUAN`, `ExchangeUSD_buy`, `ExchangeUSD_sale`, `ExchangeEUR_buy`, `ExchangeEUR_sale`, `serialNumber`, `img`, `orderId`) VALUES
(1, 'Product 1', 'Monitors 1', 12, '2025-02-24 22:00:00', '2026-02-24', 'USD', '40', '65', '0', '2600', '', '', '', '', 1234, '', 1),
(2, 'Product 2', 'Monitors 1', 12, '2025-02-24 22:00:00', '2026-02-24', 'USD', '40', '65', '0', '2600', '', '', '', '', 1235, '', 1),
(3, 'Product 3', 'Monitors 1', 12, '2025-02-24 22:00:00', '2026-02-24', 'USD', '40', '65', '0', '2600', '', '', '', '', 1236, '', 1),
(4, 'Product 4', 'Monitors 1', 12, '2025-02-24 22:00:00', '2026-02-24', 'USD', '40', '65', '0', '2600', '', '', '', '', 1237, '', 1),
(5, 'Product 5', 'Monitors 2', 18, '2025-02-24 22:00:00', '2026-08-24', 'UAN', '40', '130', '0', '5200', '', '', '', '', 1238, '', 2),
(6, 'Product 6', 'Monitors 2', 18, '2025-02-24 22:00:00', '2026-08-24', 'UAN', '40', '130', '0', '5200', '', '', '', '', 1239, '', 2),
(7, 'Product 7', 'Monitors 2', 18, '2025-02-24 22:00:00', '2026-08-24', 'UAN', '40', '130', '0', '5200', '', '', '', '', 1240, '', 2),
(8, 'Product 8', 'Monitors 3', 24, '2025-02-24 22:00:00', '2027-02-24', 'UAN', '40', '200', '0', '8000', '', '', '', '', 1241, '', 3),
(9, 'Product 9', 'Monitors 1', 12, '2025-02-24 22:00:00', '2026-02-24', 'UAN', '40', '65', '0', '2600', '', '', '', '', 1242, '', 3),
(10, 'Product 10', 'Monitors 2', 18, '2025-02-24 22:00:00', '2026-08-24', 'UAN', '40', '130', '0', '5200', '', '', '', '', 1243, '', 3),
(11, 'Product 11', 'Monitors 3', 24, '2025-02-24 22:00:00', '2027-02-24', 'UAN', '40', '200', '0', '8000', '', '', '', '', 1244, '', 3),
(141, 'iPhone 14', 'Phones', 12, '2025-03-12 12:31:33', '2026-03-11', 'UAN', '', '960', '876', '40000', '41.1', '41.66667', '44.84', '45.6621', 12345, '', 109),
(142, 'iPhone 15', 'Phones', 18, '2025-03-12 12:31:33', '2026-09-11', 'UAN', '', '1080', '985.5', '45000', '41.1', '41.66667', '44.84', '45.6621', 12346, '', 109),
(143, 'iPhone 14', 'Phones', 12, '2025-03-12 12:36:14', '2026-03-11', 'UAN', '', '960', '876', '40000', '41.1', '41.66667', '44.84', '45.6621', 12347, '', 110),
(144, 'iPhone 15', 'Phones', 18, '2025-03-12 12:36:14', '2026-09-11', 'UAN', '', '1080', '985.5', '45000', '41.1', '41.66667', '44.84', '45.6621', 12348, '', 110),
(145, 'iPhone 16', 'Phones', 12349, '2025-03-12 12:36:14', '3054-04-11', 'UAN', '', '1200', '1095', '50000', '41.1', '41.66667', '44.84', '45.6621', 0, '', 110),
(146, 'iPhone 16', 'Phones', 30, '2025-03-12 12:49:43', '2027-09-11', 'USD', '', '1200', '1080.11', '49320', '41.1', '41.66667', '44.84', '45.6621', 12350, '', 111),
(147, 'iPhone 14', 'Phones', 12, '2025-03-12 12:49:43', '2026-03-11', 'USD', '', '1000', '900.09', '41100', '41.1', '41.66667', '44.84', '45.6621', 12351, '', 111),
(148, 'iPhone 13', 'Phones', 12, '2025-03-12 12:49:43', '2026-03-11', 'USD', '', '900', '810.08', '36990', '41.1', '41.66667', '44.84', '45.6621', 123452, '', 111),
(162, 'Charger 1', 'Chargers', 12, '2025-03-12 20:34:22', '2026-03-11', 'UAN', '', '480', '438', '20000', '41.1', '41.66667', '44.84', '45.6621', 12345, '', 116),
(163, 'Charger 2', 'Chargers', 18, '2025-03-12 20:42:59', '2026-09-11', 'USD', '', '700', '630.06', '28770', '41.1', '41.66667', '44.84', '45.6621', 45678, '', 117),
(164, 'Charger 1', 'Chargers', 12, '2025-03-12 20:42:59', '2026-03-11', 'USD', '', '600', '540.05', '24660', '41.1', '41.66667', '44.84', '45.6621', 345678, '', 117),
(165, 'Charger3', 'Chargers', 18, '2025-03-12 20:42:59', '2026-09-11', 'USD', '', '1500', '1350.14', '61650', '41.1', '41.66667', '44.84', '45.6621', 34567, '', 117),
(166, 'Charger 1', 'Chargers', 12, '2025-03-12 20:42:59', '2026-03-11', 'USD', '', '700', '630.06', '28770', '41.1', '41.66667', '44.84', '45.6621', 1234, '', 117),
(167, 'Charger 2 ', 'Chargers', 18, '2025-03-12 20:42:59', '2026-09-11', 'USD', '', '800', '720.07', '32880', '41.1', '41.66667', '44.84', '45.6621', 2345, '', 117),
(168, 'Charger 3', 'Chargers', 24, '2025-03-12 20:42:59', '2027-03-11', 'USD', '', '1500', '1350.14', '61650', '41.1', '41.66667', '44.84', '45.6621', 13456, '', 117),
(189, 'iPhone 15 ', 'Phones', 18, '2025-03-13 10:28:16', '2026-09-12', 'UAN', '', '1434', '1314', '60000', '41.2', '41.841', '44.8', '45.6621', 123456, '', 127),
(193, 'Charger 2 ', 'Chargers', 18, '2025-03-13 10:54:01', '2026-09-12', 'UAN', '', '717', '657', '30000', '41.2', '41.841', '44.8', '45.6621', 1234567, '', 130),
(199, 'Charger 1', 'Chargers', 12, '2025-03-13 11:07:04', '2026-03-12', 'USD', '', '1000', '902.28', '41200', '41.2', '41.841', '44.8', '45.6621', 13456, '', 134),
(200, 'Charger 3', 'Chargers', 30, '2025-03-13 11:07:04', '2027-09-12', 'USD', '', '5000', '4511.4', '206000', '41.2', '41.841', '44.8', '45.6621', 12345678, '', 134),
(201, 'Charger 1', 'Chargers', 12, '2025-03-13 11:16:12', '2026-03-12', 'USD', '', '1000', '902.28', '41200', '41.2', '41.841', '44.8', '45.6621', 123456, '', 135),
(202, 'Charger 4', 'Chargers', 30, '2025-03-13 11:16:12', '2027-09-12', 'USD', '', '5000', '4511.4', '206000', '41.2', '41.841', '44.8', '45.6621', 1234567, '', 135),
(203, 'iPhone 11', 'Phones', 12, '2025-03-13 11:38:16', '2026-03-12', 'USD', '', '1000', '902.28', '41200', '41.2', '41.841', '44.8', '45.6621', 1234, '', 136),
(204, 'iPhone 12', 'Phones', 12, '2025-03-13 11:38:16', '2026-03-12', 'USD', '', '1200', '1082.74', '49440', '41.2', '41.841', '44.8', '45.6621', 2345, '', 136),
(205, 'iPhone 13', 'Phones', 12, '2025-03-13 11:38:16', '2026-03-12', 'USD', '', '1600', '1443.65', '65920', '41.2', '41.841', '44.8', '45.6621', 1234, '', 136),
(206, 'Charger 1', 'Chargers', 12, '2025-03-13 11:45:37', '2026-03-12', 'USD', '', '1000', '902.28', '41200', '41.2', '41.841', '44.8', '45.6621', 12345, '', 137),
(207, 'Charger 4 ', 'Chargers', 18, '2025-03-13 11:45:37', '2026-09-12', 'USD', '', '5000', '4511.4', '206000', '41.2', '41.841', '44.8', '45.6621', 21345, '', 137);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=208;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
