-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-11-2025 a las 12:14:43
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `lets_eat`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `tipo` enum('profesor','profesor_acargo','estudiante','estudiante_ampm','Administrador') NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `Foto` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `contrasena`, `tipo`, `nombre`, `Foto`) VALUES
(2, '1012345789', '1012345789p', 'profesor_acargo', 'Juan Pablo Restrepo', 'img_perfil/sergio.jpeg'),
(3, '1056789231', '1056789231s', 'estudiante', 'Camila Soto Arango', 'img_perfil/chaval.jpeg'),
(4, '1089234567', '1089234567f', 'estudiante_ampm', 'Andrés Felipe Muñoz', 'img_perfil/africa.jpeg'),
(5, '1089345612', '1089345612g', 'profesor', 'Gabriel Márquez', 'img_perfil/gaitan.jpeg'),
(6, '1078453211', '1078453211c', 'profesor', 'Carolina Torres', 'img_perfil/Diana.jpeg'),
(7, '1098765432', '1098765432z', 'profesor_acargo', 'Zulema Díaz', 'img_perfil/saro.jpeg'),
(8, '1067891234', '1067891234l', 'profesor', 'Luis Fernández', 'img_perfil/paolo.jpeg'),
(9, '1054321987', '1054321987h', 'profesor', 'Helena Gómez', 'img_perfil/ana.jpeg'),
(10, '1001234567', '1001234567m', 'estudiante', 'María López', 'img_perfil/colitas.jpeg'),
(11, '1007654321', '1007654321p', 'estudiante', 'Pedro Ramírez', 'img_perfil/Dylan.jpeg'),
(12, '1009988776', '1009988776a', 'estudiante_ampm', 'Andrea Torres', 'img_perfil/ingrid.jpeg'),
(14, '1006677889', '1006677889v', 'estudiante', 'Valeria Morales', 'img_perfil/yohana.jpeg'),
(15, '1001112223', '1001112223l', 'estudiante_ampm', 'Laura Fernández', 'img_perfil/marina.jpeg'),
(16, '1002223334', '1002223334g', 'estudiante_ampm', 'Gabriel Salazar', 'img_perfil/nicolas.jpeg'),
(17, '1003334445', '1003334445z', 'estudiante_ampm', 'Zulma Cárdenas', 'img_perfil/nina.jpeg'),
(18, '1004445556', '1004445556h', 'estudiante_ampm', 'Héctor Morales', 'img_perfil/pobre.jpeg'),
(21, '1098273465', '1098273465f', 'Administrador', 'María Fernanda Gómez ', 'img_perfil/thomasa.jpg'),
(22, '3054128790', '3054128790s', 'Administrador', 'Juan Sebastián Martínez', 'img_perfil/Thomas.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
