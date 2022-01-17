-- MariaDB dump 10.18  Distrib 10.5.8-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: tpdbv1
-- ------------------------------------------------------
-- Server version	10.5.8-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `booking` (
  `bookingid` int(11) NOT NULL AUTO_INCREMENT,
  `checkindate` date DEFAULT NULL,
  `checkoutdate` date DEFAULT NULL,
  `numofguest` int(11) DEFAULT NULL,
  `isCanceled` tinyint(1) DEFAULT NULL,
  `customerid` int(11) DEFAULT NULL,
  `listingid` int(11) NOT NULL,
  `roomType` varchar(155) DEFAULT NULL,
  PRIMARY KEY (`bookingid`),
  KEY `listingid` (`listingid`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`listingid`) REFERENCES `listing` (`listingid`),
  KEY `customerid` (`customerid`),
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`customerid`) REFERENCES `customer` (`customerid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (1,'2021-04-04','2021-08-04',3,0,1,1,'Deluxe');
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `customerid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `contactNo` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`customerid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Vincent',91991234,'At Home','LOL1234','pass1234');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotellistingdetails`
--

DROP TABLE IF EXISTS `hotellistingdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hotellistingdetails` (
  `listingdetailid` int(11) NOT NULL AUTO_INCREMENT,
  `roomType` varchar(155) DEFAULT NULL,
  `numOfRooms` int(11) DEFAULT NULL,
  `listingid` int(11) DEFAULT NULL,
  PRIMARY KEY (`listingdetailid`),
  KEY `listingid` (`listingid`),
  CONSTRAINT `hotellistingdetails_ibfk_1` FOREIGN KEY (`listingid`) REFERENCES `listing` (`listingid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotellistingdetails`
--

LOCK TABLES `hotellistingdetails` WRITE;
/*!40000 ALTER TABLE `hotellistingdetails` DISABLE KEYS */;
INSERT INTO `hotellistingdetails` VALUES (1,'Single',405,1),(2,'Super Single',300,1),(3,'Deluxe',250,1);
/*!40000 ALTER TABLE `hotellistingdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotelreview`
--

DROP TABLE IF EXISTS `hotelreview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hotelreview` (
  `hotelreviewid` int(11) NOT NULL AUTO_INCREMENT,
  `listingid` int(11) DEFAULT NULL,
  `ratings` int(11) DEFAULT NULL,
  `reviews` longtext DEFAULT NULL,
  PRIMARY KEY (`hotelreviewid`),
  KEY `listingid` (`listingid`),
  CONSTRAINT `hotelreview_ibfk_1` FOREIGN KEY (`listingid`) REFERENCES `listing` (`listingid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotelreview`
--

LOCK TABLES `hotelreview` WRITE;
/*!40000 ALTER TABLE `hotelreview` DISABLE KEYS */;
/*!40000 ALTER TABLE `hotelreview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listing`
--

DROP TABLE IF EXISTS `listing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `listing` (
  `listingid` int(11) NOT NULL AUTO_INCREMENT,
  `hotelname` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `amenities` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`listingid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listing`
--

LOCK TABLES `listing` WRITE;
/*!40000 ALTER TABLE `listing` DISABLE KEYS */;
INSERT INTO `listing` VALUES (1,'MBS','Sentosa','Singapore','Casino');
/*!40000 ALTER TABLE `listing` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-22 18:22:27
