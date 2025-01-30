-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 30, 2025 at 12:32 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `empresax`
--
CREATE DATABASE IF NOT EXISTS `empresax` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci;
USE `empresax`;

-- --------------------------------------------------------

--
-- Table structure for table `centros`
--

DROP TABLE IF EXISTS `centros`;
CREATE TABLE IF NOT EXISTS `centros` (
  `Numero` int(11) NOT NULL,
  `Nombre` text NOT NULL,
  `Direccion` text NOT NULL,
  PRIMARY KEY (`Numero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `centros`
--

INSERT INTO `centros` (`Numero`, `Nombre`, `Direccion`) VALUES
(10, 'SEDE CENTRAL', 'C. ALCALA 820, MADRID'),
(20, 'RELACION CON CLIENTES', 'C. ATOCHA 405, MADRID');

-- --------------------------------------------------------

--
-- Table structure for table `departamentos`
--

DROP TABLE IF EXISTS `departamentos`;
CREATE TABLE IF NOT EXISTS `departamentos` (
  `Numero` int(11) NOT NULL,
  `Centro` text NOT NULL,
  `Director` text NOT NULL,
  `Tipo_dir` text NOT NULL,
  `Presupuesto` int(11) NOT NULL,
  `Depto_jefe` int(11) DEFAULT NULL,
  `Nombre` text NOT NULL,
  PRIMARY KEY (`Numero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `departamentos`
--

INSERT INTO `departamentos` (`Numero`, `Centro`, `Director`, `Tipo_dir`, `Presupuesto`, `Depto_jefe`, `Nombre`) VALUES
(100, '10', '260', 'P', 12, NULL, 'DIRECCION GENERAL'),
(110, '20', '180', 'P', 15, 100, 'DIRECC. COMERCIAL'),
(111, '20', '180', 'F', 11, 110, 'SECTOR INDUSTRIAL'),
(112, '20', '270', 'P', 9, 100, 'SECTOR SERVICIOS'),
(120, '10', '150', 'F', 3, 100, 'ORGANIZACION'),
(121, '10', '150', 'P', 2, 120, 'PERSONAL'),
(122, '10', '350', 'P', 6, 120, 'PROCESO DE DATOS'),
(130, '10', '310', 'P', 2, 100, 'FINANZAS'),
(131, '20', '250', 'P', 5, 110, 'SERVICIO AL CLIENTE'),
(132, '10', '210', 'P', 5, NULL, 'RELACIONES EXTERIORES'),
(133, '10', '180', 'P', 1234567, NULL, 'dasdasdasd');

-- --------------------------------------------------------

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
CREATE TABLE IF NOT EXISTS `empleados` (
  `Cod` int(11) NOT NULL,
  `Departamento` int(11) NOT NULL,
  `Telefono` int(11) NOT NULL,
  `Fecha_nacimiento` text NOT NULL,
  `Fecha_ingreso` text NOT NULL DEFAULT '',
  `Salario` int(11) NOT NULL,
  `Comision` int(11) DEFAULT NULL,
  `Num_hijos` int(11) NOT NULL,
  `Nombre` text NOT NULL,
  PRIMARY KEY (`Cod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `empleados`
--

INSERT INTO `empleados` (`Cod`, `Departamento`, `Telefono`, `Fecha_nacimiento`, `Fecha_ingreso`, `Salario`, `Comision`, `Num_hijos`, `Nombre`) VALUES
(110, 121, 350, '10-NOV-29', '10-FEB-50', 1310, NULL, 3, 'PONS, CESAR'),
(120, 112, 840, '09-JUN-35', '01-OCT-68', 1350, 110, 1, 'LASA, MARIO'),
(130, 112, 810, '09-NOV-45', '01-FEB-69', 1290, 110, 2, 'TEROL, LUCIANO'),
(150, 121, 340, '10-AUG-30', '15-JAN-48', 1440, NULL, 0, 'PEREZ, JULIO'),
(160, 111, 740, '09-JUL-39', '11-NOV-68', 1310, 110, 2, 'AGUIRRE, AUREO'),
(180, 110, 508, '18-OCT-34', '18-MAR-56', 1480, 50, 2, 'PEREZ, MARCOS'),
(190, 121, 350, '12-MAY-32', '11-FEB-62', 1300, NULL, 4, 'VEIGA, JULIANA'),
(210, 100, 200, '28-SEP-40', '22-JAN-59', 1380, NULL, 2, 'GALVEZ, PILAR'),
(240, 111, 760, '26-FEB-42', '24-FEB-66', 1280, 100, 3, 'SANZ, LAVINIA'),
(250, 100, 250, '27-OCT-46', '01-MAR-67', 1450, NULL, 0, 'ALBA, ADRIANA'),
(260, 100, 220, '03-DEC-43', '12-JUL-68', 1720, NULL, 6, 'LOPEZ, ANTONIO'),
(270, 112, 800, '21-MAY-45', '10-SEP-66', 1380, 80, 3, 'GARCIA, OCTAVIO'),
(280, 130, 410, '11-JAN-48', '08-OCT-71', 1290, NULL, 5, 'FLOR, DOROTEA'),
(285, 122, 620, '25-OCT-49', '15-FEB-68', 1380, NULL, 0, 'POLO, OTILIA'),
(290, 120, 910, '30-NOV-47', '14-FEB-68', 1270, NULL, 3, 'GIL, GLORIA'),
(310, 130, 480, '21-NOV-46', '15-JAN-71', 1420, NULL, 0, 'GARCIA, AUGUSTO'),
(320, 122, 620, '25-DEC-57', '05-FEB-78', 1405, NULL, 2, 'SANZ, CORNELIO'),
(330, 112, 850, '19-AUG-48', '01-MAR-72', 1280, 90, 0, 'DIEZ, AMELIA'),
(350, 122, 610, '13-APR-49', '10-SEP-84', 1450, NULL, 1, 'CAMPS, AURELIO'),
(360, 111, 750, '29-OCT-58', '10-OCT-68', 1250, 100, 2, 'LARA, DORINDA'),
(370, 121, 360, '22-JUN-67', '20-JAN-87', 1190, NULL, 1, 'RUIZ, FABIOLA'),
(380, 112, 880, '30-MAR-68', '01-JAN-88', 1180, NULL, 0, 'MARTIN, MICAELA'),
(390, 110, 500, '19-FEB-66', '08-OCT-86', 1215, NULL, 1, 'MORAN, CARMEN'),
(400, 111, 780, '18-AUG-69', '01-NOV-87', 1185, NULL, 0, 'LARA, LUCRECIA'),
(410, 122, 660, '14-JUL-68', '13-OCT-88', 1175, NULL, 0, 'MU‹OZ, AZUCENA'),
(420, 130, 450, '22-OCT-66', '19-NOV-88', 1400, NULL, 0, 'FIERRO, CLAUDIA'),
(430, 122, 650, '26-OCT-67', '19-NOV-88', 1210, NULL, 1, 'MORA, VALERIANA'),
(440, 111, 760, '27-SEP-66', '28-FEB-86', 1210, 100, 0, 'DURAN, LIVIA'),
(450, 112, 880, '21-OCT-66', '28-FEB-86', 1210, 100, 0, 'PEREZ, SABINA'),
(480, 111, 760, '04-APR-65', '28-FEB-86', 1210, 100, 1, 'PINO, DIANA'),
(490, 112, 880, '06-JUN-64', '01-JAN-88', 1180, 100, 0, 'TORRES, HORACIO'),
(500, 111, 750, '08-OCT-65', '01-JAN-87', 1200, 100, 0, 'VAZQUEZ, HONORIA'),
(510, 110, 550, '04-MAY-66', '01-NOV-86', 1200, NULL, 1, 'CAMPOS, ROMULO'),
(550, 111, 780, '10-JAN-70', '21-JAN-88', 1100, 120, 0, 'SANTOS, SANCHO');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
