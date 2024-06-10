-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 10-06-2024 a las 01:16:49
-- Versión del servidor: 8.4.0
-- Versión de PHP: 8.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `app`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Conductores`
--

CREATE TABLE `Conductores` (
  `id` varchar(13) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `numeroLicencia` varchar(50) DEFAULT NULL,
  `expiracionLicencia` timestamp NULL DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `notas` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `DetallesDePago`
--

CREATE TABLE `DetallesDePago` (
  `id` int NOT NULL,
  `fechaPago` timestamp NULL DEFAULT NULL,
  `metodoPago` varchar(50) DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Facturas`
--

CREATE TABLE `Facturas` (
  `id` int NOT NULL,
  `fechaEmision` timestamp NULL DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `estadoPago` varchar(20) DEFAULT NULL,
  `detallesPagoId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `OrdenesDeTrabajo`
--

CREATE TABLE `OrdenesDeTrabajo` (
  `id` int NOT NULL,
  `vehiculoId` varchar(20) DEFAULT NULL,
  `proveedorId` int DEFAULT NULL,
  `fechaEmision` timestamp NULL DEFAULT NULL,
  `detalles` text,
  `costo` decimal(10,2) DEFAULT NULL,
  `estadoPago` varchar(20) DEFAULT NULL,
  `detallesPagoId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ProgramacionMantenimiento`
--

CREATE TABLE `ProgramacionMantenimiento` (
  `id` int NOT NULL,
  `vehiculoId` varchar(20) DEFAULT NULL,
  `tarea` varchar(100) DEFAULT NULL,
  `fechaProxima` timestamp NULL DEFAULT NULL,
  `recordatorioEnviado` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Proveedores`
--

CREATE TABLE `Proveedores` (
  `id` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `contacto` varchar(100) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Recibos`
--

CREATE TABLE `Recibos` (
  `id` int NOT NULL,
  `ordenTrabajoId` int DEFAULT NULL,
  `fechaEmision` timestamp NULL DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `estadoPago` varchar(20) DEFAULT NULL,
  `detallesPagoId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Vehiculos`
--

CREATE TABLE `Vehiculos` (
  `id` varchar(20) NOT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `anio` int DEFAULT NULL,
  `kilometraje` int DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `idConductorAsignado` varchar(13) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Conductores`
--
ALTER TABLE `Conductores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `DetallesDePago`
--
ALTER TABLE `DetallesDePago`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Facturas`
--
ALTER TABLE `Facturas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `detallesPagoId` (`detallesPagoId`);

--
-- Indices de la tabla `OrdenesDeTrabajo`
--
ALTER TABLE `OrdenesDeTrabajo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehiculoId` (`vehiculoId`),
  ADD KEY `proveedorId` (`proveedorId`),
  ADD KEY `detallesPagoId` (`detallesPagoId`);

--
-- Indices de la tabla `ProgramacionMantenimiento`
--
ALTER TABLE `ProgramacionMantenimiento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehiculoId` (`vehiculoId`);

--
-- Indices de la tabla `Proveedores`
--
ALTER TABLE `Proveedores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Recibos`
--
ALTER TABLE `Recibos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ordenTrabajoId` (`ordenTrabajoId`),
  ADD KEY `detallesPagoId` (`detallesPagoId`);

--
-- Indices de la tabla `Vehiculos`
--
ALTER TABLE `Vehiculos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idConductorAsignado` (`idConductorAsignado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `DetallesDePago`
--
ALTER TABLE `DetallesDePago`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Facturas`
--
ALTER TABLE `Facturas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `OrdenesDeTrabajo`
--
ALTER TABLE `OrdenesDeTrabajo`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ProgramacionMantenimiento`
--
ALTER TABLE `ProgramacionMantenimiento`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Proveedores`
--
ALTER TABLE `Proveedores`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Recibos`
--
ALTER TABLE `Recibos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Facturas`
--
ALTER TABLE `Facturas`
  ADD CONSTRAINT `Facturas_ibfk_1` FOREIGN KEY (`detallesPagoId`) REFERENCES `DetallesDePago` (`id`);

--
-- Filtros para la tabla `OrdenesDeTrabajo`
--
ALTER TABLE `OrdenesDeTrabajo`
  ADD CONSTRAINT `OrdenesDeTrabajo_ibfk_1` FOREIGN KEY (`vehiculoId`) REFERENCES `Vehiculos` (`id`),
  ADD CONSTRAINT `OrdenesDeTrabajo_ibfk_2` FOREIGN KEY (`proveedorId`) REFERENCES `Proveedores` (`id`),
  ADD CONSTRAINT `OrdenesDeTrabajo_ibfk_3` FOREIGN KEY (`detallesPagoId`) REFERENCES `DetallesDePago` (`id`);

--
-- Filtros para la tabla `ProgramacionMantenimiento`
--
ALTER TABLE `ProgramacionMantenimiento`
  ADD CONSTRAINT `ProgramacionMantenimiento_ibfk_1` FOREIGN KEY (`vehiculoId`) REFERENCES `Vehiculos` (`id`);

--
-- Filtros para la tabla `Recibos`
--
ALTER TABLE `Recibos`
  ADD CONSTRAINT `Recibos_ibfk_1` FOREIGN KEY (`ordenTrabajoId`) REFERENCES `OrdenesDeTrabajo` (`id`),
  ADD CONSTRAINT `Recibos_ibfk_2` FOREIGN KEY (`detallesPagoId`) REFERENCES `DetallesDePago` (`id`);

--
-- Filtros para la tabla `Vehiculos`
--
ALTER TABLE `Vehiculos`
  ADD CONSTRAINT `Vehiculos_ibfk_1` FOREIGN KEY (`idConductorAsignado`) REFERENCES `Conductores` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
