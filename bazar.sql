-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 04-12-2024 a las 01:40:05
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bazar`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes`
--

CREATE TABLE `ordenes` (
  `id` int(11) NOT NULL,
  `cedulaEmprendedor` text NOT NULL,
  `fechaHoraOrden` datetime NOT NULL DEFAULT current_timestamp(),
  `fechaHoraPago` datetime NOT NULL DEFAULT current_timestamp(),
  `monto` float NOT NULL DEFAULT 0 COMMENT 'El monto sera reflejado en dolares',
  `cancelado` tinyint(4) NOT NULL DEFAULT 0,
  `bolivares` float NOT NULL DEFAULT 0 COMMENT 'Cantidad de bolívares pagados en caja',
  `dolares` float NOT NULL DEFAULT 0 COMMENT 'Cantidad de dólares pagados en caja'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ordenes`
--

INSERT INTO `ordenes` (`id`, `cedulaEmprendedor`, `fechaHoraOrden`, `fechaHoraPago`, `monto`, `cancelado`, `bolivares`, `dolares`) VALUES
(1, '14072162', '2024-12-01 10:17:52', '2024-12-01 10:17:52', 10, 1, 10, 0),
(2, '14072162', '2024-12-01 10:17:55', '2024-12-01 10:17:55', 20, 1, 20, 0),
(3, '14072162', '2024-12-01 10:18:00', '2024-12-01 10:18:00', 30, 1, 30, 0),
(4, '14072162', '2024-12-01 10:25:14', '2024-12-01 10:25:14', 40, 1, 40, 0),
(5, '14072162', '2024-12-02 21:00:06', '2024-12-02 21:00:06', 1, 1, 1, 0),
(6, '14072162', '2024-12-02 21:00:10', '2024-12-02 21:00:10', 3, 1, 3, 0),
(7, '14072162', '2024-12-02 21:00:12', '2024-12-02 21:00:12', 2, 1, 2, 0),
(8, '14072162', '2024-12-02 21:00:16', '2024-12-02 21:00:16', 4, 1, 4, 0),
(9, '14072162', '2024-12-02 21:00:19', '2024-12-02 21:00:19', 2, 1, 2, 0),
(10, '14072162', '2024-12-02 21:00:21', '2024-12-02 21:00:21', 4, 1, 4, 0),
(11, '14072162', '2024-12-02 21:00:24', '2024-12-02 21:00:24', 5, 1, 5, 0),
(12, '14072162', '2024-12-02 21:00:39', '2024-12-02 21:00:39', 5, 1, 5, 0),
(13, '14072162', '2024-12-02 21:00:39', '2024-12-02 21:00:39', 5, 1, 5, 0),
(14, '14072162', '2024-12-02 21:00:40', '2024-12-02 21:00:40', 5, 1, 5, 0),
(15, '14072162', '2024-12-02 21:00:40', '2024-12-02 21:00:40', 5, 1, 5, 0),
(16, '14072162', '2024-12-02 21:00:40', '2024-12-02 21:00:40', 5, 1, 5, 0),
(17, '14072162', '2024-12-02 21:00:40', '2024-12-02 21:00:40', 5, 1, 5, 0),
(18, '14072162', '2024-12-02 21:00:40', '2024-12-02 21:00:40', 5, 1, 5, 0),
(19, '14072162', '2024-12-02 21:00:40', '2024-12-02 21:00:40', 5, 1, 5, 0),
(20, '14072162', '2024-12-02 21:00:41', '2024-12-02 21:00:41', 5, 1, 5, 0),
(21, '14072162', '2024-12-02 21:00:41', '2024-12-02 21:00:41', 5, 1, 5, 0),
(22, '14072162', '2024-12-02 21:00:41', '2024-12-02 21:00:41', 5, 1, 5, 0),
(23, '14072162', '2024-12-02 21:18:28', '2024-12-02 21:18:28', 5, 1, 5, 0),
(24, '14072162', '2024-12-03 11:13:04', '2024-12-03 11:13:04', 4, 0, 0, 0),
(25, '14072162', '2024-12-03 11:13:40', '2024-12-03 11:13:40', 17, 0, 0, 0),
(26, '14072162', '2024-12-03 11:13:58', '2024-12-03 11:13:58', 17.75, 0, 0, 0),
(27, '14072162', '2024-12-03 11:14:13', '2024-12-03 11:14:13', 16, 0, 0, 0),
(28, '14072162', '2024-12-03 11:14:16', '2024-12-03 11:14:16', 32, 0, 0, 0),
(29, '14072162', '2024-12-03 11:14:19', '2024-12-03 11:14:19', 41, 0, 0, 0),
(30, '14072162', '2024-12-03 11:14:23', '2024-12-03 14:08:04', 99.99, 1, 0, 3),
(31, '14072162', '2024-12-03 12:59:39', '2024-12-03 14:07:46', 123, 1, 0, 123),
(32, '14072162', '2024-12-03 12:59:42', '2024-12-03 14:06:59', 85, 1, 0, 85),
(33, '14072162', '2024-12-03 12:59:57', '2024-12-03 14:06:36', 85, 1, 0, 4),
(34, '14072162', '2024-12-03 13:00:24', '2024-12-03 13:00:24', 4, 1, 0, 0),
(35, '14072162', '2024-12-03 13:00:56', '2024-12-03 14:19:16', 8, 1, 4.3, 2),
(36, '14072162', '2024-12-03 13:01:13', '2024-12-03 13:01:13', 5, 1, 0, 0),
(37, '6513723', '2024-12-03 15:25:43', '2024-12-03 15:25:43', 5, 0, 0, 0),
(38, '6513723', '2024-12-03 15:25:47', '2024-12-03 15:25:47', 3, 0, 0, 0),
(39, '6513723', '2024-12-03 15:25:49', '2024-12-03 15:25:49', 4, 0, 0, 0),
(40, '6513723', '2024-12-03 15:25:51', '2024-12-03 15:26:20', 8, 1, 0, 0),
(41, '10956871', '2024-12-03 15:38:23', '2024-12-03 15:38:23', 4, 0, 0, 0),
(42, '10956871', '2024-12-03 15:38:26', '2024-12-03 15:47:04', 7, 1, 0, 7),
(43, '10956871', '2024-12-03 15:38:28', '2024-12-03 15:46:40', 9, 1, 0, 9),
(44, '10956871', '2024-12-03 15:38:29', '2024-12-03 15:44:50', 6, 1, 0, 0),
(45, '10956871', '2024-12-03 15:38:32', '2024-12-03 15:38:32', 2, 0, 0, 0),
(46, '12261693', '2024-12-03 16:28:27', '2024-12-03 16:28:27', 3, 0, 0, 0),
(47, '12261693', '2024-12-03 16:28:33', '2024-12-03 16:28:33', 2.5, 0, 0, 0),
(48, '12261693', '2024-12-03 16:28:37', '2024-12-03 16:28:37', 2, 0, 0, 0),
(49, '12261693', '2024-12-03 16:28:42', '2024-12-03 16:28:42', 2.85, 0, 0, 0),
(50, '12261693', '2024-12-03 16:28:48', '2024-12-03 16:28:48', 3.17, 0, 0, 0),
(51, '14072162', '2024-12-03 19:03:11', '2024-12-03 19:03:11', 10, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `apellidos` text NOT NULL,
  `nombres` text NOT NULL,
  `cedula` text NOT NULL,
  `email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `apellidos`, `nombres`, `cedula`, `email`) VALUES
(1, 'DellUomini', 'Aldo', '14072162', 'aldodell@gmail.com'),
(2, 'Azpiazu', 'Amaya', '75112345', 'latasazpiazu@gmail.com'),
(3, 'Pacheco', 'Raul', '6513723', 'rap.1968.nav@outlook.com'),
(4, 'PérezContreras', 'BladimirOdraude', '12765082', 'odrauderedwine@gmail.com'),
(5, 'SCHMELZER', 'LUDWIG', '15805792', 'latasazpiazu@gmail.com'),
(6, 'Mercado', 'Zenaida', '13886519', 'mercadoromerozenaida@gmail.com'),
(7, 'Diaz', 'MaríadeLuz', '6183569', 'luzdiaz6431@gmail.com'),
(8, 'BermúdezC', 'RuthM', '12383083', 'rbermudezca@gmail.com'),
(9, 'VenturaGonzález', 'YolandadelCarmen', '10956871', 'yv191542@gmail.com'),
(10, 'BarriosRsmos', 'MariellAdriskelly', '19493334', 'mariell.adrian12@gmail.com'),
(11, 'Cabrera', 'Hortencia', '9959607', 'hortencia10105@gmail.com'),
(12, 'Camacho', 'Rena', '8106741', 'camachorenna@gmail.com'),
(13, 'PérezRodríguez', 'CarolinaAngela', '12042219', 'carolinaabo@hotmail.com'),
(14, 'Parra', 'Josefina', '12594091', 'josefinaparra1874@gmail.com'),
(15, 'DuarteDelgado', 'IsabelCristina', '6207645', 'isabelcristinaduarte.65@gmail.com'),
(16, 'MartinezZuleta', 'PatriciaJosefina', '6309335', 'repatriciamz44@gmail.com'),
(17, 'GómezBohórquez', 'SalvadorAntonio', '7991397', 'suji1916@gmail.com'),
(18, 'Salazar', 'Joanne', '14126050', 'joanne050@gmail.com'),
(19, 'GuarapanaMendoza', 'IdelynEmirce', '13126423', 'guaisoma@gmail.com'),
(20, 'LinaresSilva', 'Ilenisyomira', '25218840', 'ilenisyumailetlinares@gmail.com'),
(21, 'Blanco', 'Yenny', '11030245', 'yennyblanco@gmail.com'),
(22, 'TORRESGONZALEZ', 'LISETTETORRES', '10352214', 'ltorres7531@gmail.com'),
(23, 'MorenoMeneses', 'GustavoAdolfo', '12261693', 'gusmor20@gmail.com'),
(24, 'EcheniqueGamez', 'Janeysijenniree', '20976221', 'janeysi.echenique92@gmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ordenes`
--
ALTER TABLE `ordenes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ordenes`
--
ALTER TABLE `ordenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
