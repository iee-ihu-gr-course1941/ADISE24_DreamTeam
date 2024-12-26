-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: blokus
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `board_20`
--
/*==============DONE==============*/
DROP TABLE IF EXISTS `board_20`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board_20` (
  `x` tinyint(1) NOT NULL,
  `y` tinyint(1) NOT NULL,
  `block` enum('R','B','G','Y','W') DEFAULT 'W',
  PRIMARY KEY (`x`,`y`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_20`
--
/*==============DONE==============*/
LOCK TABLES `board_20` WRITE;
/*!40000 ALTER TABLE `board_20` DISABLE KEYS */;
INSERT INTO `board_20` VALUES (1,1,'W'),(1,2,'W'),(1,3,'W'),(1,4,'W'),(1,5,'W'),(1,6,'W'),(1,7,'W'),(1,8,'W'),(1,9,'W'),(1,10,'W'),(1,11,'W'),(1,12,'W'),(1,13,'W'),(1,14,'W'),(1,15,'W'),(1,16,'W'),(1,17,'W'),(1,18,'W'),(1,19,'W'),(1,20,'W'),(2,1,'W'),(2,2,'W'),(2,3,'W'),(2,4,'W'),(2,5,'W'),(2,6,'W'),(2,7,'W'),(2,8,'W'),(2,9,'W'),(2,10,'W'),(2,11,'W'),(2,12,'W'),(2,13,'W'),(2,14,'W'),(2,15,'W'),(2,16,'W'),(2,17,'W'),(2,18,'W'),(2,19,'W'),(2,20,'W'),(3,1,'W'),(3,2,'W'),(3,3,'W'),(3,4,'W'),(3,5,'W'),(3,6,'W'),(3,7,'W'),(3,8,'W'),(3,9,'W'),(3,10,'W'),(3,11,'W'),(3,12,'W'),(3,13,'W'),(3,14,'W'),(3,15,'W'),(3,16,'W'),(3,17,'W'),(3,18,'W'),(3,19,'W'),(3,20,'W'),(4,1,'W'),(4,2,'W'),(4,3,'W'),(4,4,'R'),(4,5,'R'),(4,6,'R'),(4,7,'W'),(4,8,'W'),(4,9,'W'),(4,10,'W'),(4,11,'W'),(4,12,'W'),(4,13,'W'),(4,14,'W'),(4,15,'W'),(4,16,'W'),(4,17,'W'),(4,18,'W'),(4,19,'W'),(4,20,'W'),(5,1,'W'),(5,2,'W'),(5,3,'W'),(5,4,'W'),(5,5,'W'),(5,6,'R'),(5,7,'W'),(5,8,'W'),(5,9,'W'),(5,10,'W'),(5,11,'W'),(5,12,'W'),(5,13,'W'),(5,14,'W'),(5,15,'W'),(5,16,'W'),(5,17,'W'),(5,18,'W'),(5,19,'W'),(5,20,'W'),(6,1,'W'),(6,2,'W'),(6,3,'W'),(6,4,'W'),(6,5,'W'),(6,6,'R'),(6,7,'W'),(6,8,'W'),(6,9,'W'),(6,10,'W'),(6,11,'W'),(6,12,'W'),(6,13,'W'),(6,14,'W'),(6,15,'W'),(6,16,'W'),(6,17,'W'),(6,18,'W'),(6,19,'W'),(6,20,'W'),(7,1,'W'),(7,2,'W'),(7,3,'W'),(7,4,'W'),(7,5,'W'),(7,6,'W'),(7,7,'W'),(7,8,'W'),(7,9,'W'),(7,10,'W'),(7,11,'W'),(7,12,'W'),(7,13,'W'),(7,14,'W'),(7,15,'W'),(7,16,'W'),(7,17,'W'),(7,18,'W'),(7,19,'W'),(7,20,'W'),(8,1,'W'),(8,2,'W'),(8,3,'W'),(8,4,'W'),(8,5,'W'),(8,6,'W'),(8,7,'W'),(8,8,'W'),(8,9,'W'),(8,10,'W'),(8,11,'W'),(8,12,'W'),(8,13,'W'),(8,14,'W'),(8,15,'W'),(8,16,'W'),(8,17,'W'),(8,18,'W'),(8,19,'W'),(8,20,'W'),(9,1,'W'),(9,2,'W'),(9,3,'W'),(9,4,'W'),(9,5,'W'),(9,6,'W'),(9,7,'W'),(9,8,'W'),(9,9,'W'),(9,10,'W'),(9,11,'W'),(9,12,'W'),(9,13,'W'),(9,14,'W'),(9,15,'W'),(9,16,'W'),(9,17,'W'),(9,18,'W'),(9,19,'W'),(9,20,'W'),(10,1,'W'),(10,2,'W'),(10,3,'W'),(10,4,'W'),(10,5,'W'),(10,6,'W'),(10,7,'W'),(10,8,'W'),(10,9,'W'),(10,10,'W'),(10,11,'W'),(10,12,'W'),(10,13,'W'),(10,14,'W'),(10,15,'W'),(10,16,'W'),(10,17,'W'),(10,18,'W'),(10,19,'W'),(10,20,'W'),(11,1,'W'),(11,2,'W'),(11,3,'W'),(11,4,'W'),(11,5,'W'),(11,6,'W'),(11,7,'W'),(11,8,'W'),(11,9,'W'),(11,10,'W'),(11,11,'W'),(11,12,'W'),(11,13,'W'),(11,14,'W'),(11,15,'W'),(11,16,'W'),(11,17,'W'),(11,18,'W'),(11,19,'W'),(11,20,'W'),(12,1,'W'),(12,2,'W'),(12,3,'W'),(12,4,'W'),(12,5,'W'),(12,6,'W'),(12,7,'W'),(12,8,'W'),(12,9,'W'),(12,10,'W'),(12,11,'W'),(12,12,'W'),(12,13,'W'),(12,14,'W'),(12,15,'W'),(12,16,'W'),(12,17,'W'),(12,18,'W'),(12,19,'W'),(12,20,'W'),(13,1,'W'),(13,2,'W'),(13,3,'W'),(13,4,'W'),(13,5,'W'),(13,6,'W'),(13,7,'W'),(13,8,'W'),(13,9,'W'),(13,10,'W'),(13,11,'W'),(13,12,'W'),(13,13,'W'),(13,14,'W'),(13,15,'W'),(13,16,'W'),(13,17,'W'),(13,18,'W'),(13,19,'W'),(13,20,'W'),(14,1,'W'),(14,2,'W'),(14,3,'W'),(14,4,'W'),(14,5,'W'),(14,6,'W'),(14,7,'W'),(14,8,'W'),(14,9,'W'),(14,10,'W'),(14,11,'W'),(14,12,'W'),(14,13,'W'),(14,14,'W'),(14,15,'W'),(14,16,'W'),(14,17,'W'),(14,18,'W'),(14,19,'W'),(14,20,'W'),(15,1,'W'),(15,2,'W'),(15,3,'W'),(15,4,'W'),(15,5,'W'),(15,6,'W'),(15,7,'W'),(15,8,'W'),(15,9,'W'),(15,10,'W'),(15,11,'W'),(15,12,'W'),(15,13,'W'),(15,14,'W'),(15,15,'W'),(15,16,'W'),(15,17,'W'),(15,18,'W'),(15,19,'W'),(15,20,'W'),(16,1,'W'),(16,2,'W'),(16,3,'W'),(16,4,'W'),(16,5,'W'),(16,6,'W'),(16,7,'W'),(16,8,'W'),(16,9,'W'),(16,10,'W'),(16,11,'W'),(16,12,'W'),(16,13,'W'),(16,14,'W'),(16,15,'W'),(16,16,'W'),(16,17,'W'),(16,18,'W'),(16,19,'W'),(16,20,'W'),(17,1,'W'),(17,2,'W'),(17,3,'W'),(17,4,'W'),(17,5,'W'),(17,6,'W'),(17,7,'W'),(17,8,'W'),(17,9,'W'),(17,10,'W'),(17,11,'W'),(17,12,'W'),(17,13,'W'),(17,14,'W'),(17,15,'W'),(17,16,'W'),(17,17,'W'),(17,18,'W'),(17,19,'W'),(17,20,'W'),(18,1,'W'),(18,2,'W'),(18,3,'W'),(18,4,'W'),(18,5,'W'),(18,6,'W'),(18,7,'W'),(18,8,'W'),(18,9,'W'),(18,10,'W'),(18,11,'W'),(18,12,'W'),(18,13,'W'),(18,14,'W'),(18,15,'W'),(18,16,'W'),(18,17,'W'),(18,18,'W'),(18,19,'W'),(18,20,'W'),(19,1,'W'),(19,2,'W'),(19,3,'W'),(19,4,'W'),(19,5,'W'),(19,6,'W'),(19,7,'W'),(19,8,'W'),(19,9,'W'),(19,10,'W'),(19,11,'W'),(19,12,'W'),(19,13,'W'),(19,14,'W'),(19,15,'W'),(19,16,'W'),(19,17,'W'),(19,18,'W'),(19,19,'W'),(19,20,'W'),(20,1,'W'),(20,2,'W'),(20,3,'W'),(20,4,'W'),(20,5,'W'),(20,6,'W'),(20,7,'W'),(20,8,'W'),(20,9,'W'),(20,10,'W'),(20,11,'W'),(20,12,'W'),(20,13,'W'),(20,14,'W'),(20,15,'W'),(20,16,'W'),(20,17,'W'),(20,18,'W'),(20,19,'W'),(20,20,'W');
/*!40000 ALTER TABLE `board_20` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_lobbies`
--

DROP TABLE IF EXISTS `game_lobbies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_lobbies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player1_id` int(11) NOT NULL,
  `game_type` varchar(50) NOT NULL,
  `max_players` int(11) NOT NULL DEFAULT 4,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `player1_id` (`player1_id`),
  CONSTRAINT `game_lobbies_ibfk_1` FOREIGN KEY (`player1_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_lobbies`
--

LOCK TABLES `game_lobbies` WRITE;
/*!40000 ALTER TABLE `game_lobbies` DISABLE KEYS */;
/*!40000 ALTER TABLE `game_lobbies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--
/*==============DONE==============*/
DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `game_id` int(11) NOT NULL AUTO_INCREMENT,
  `player1_id` int(11) DEFAULT NULL,
  `player2_id` int(11) DEFAULT NULL,
  `winner_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`game_id`),
  KEY `player1_id` (`player1_id`),
  KEY `player2_id` (`player2_id`),
  KEY `winner_id` (`winner_id`),
  CONSTRAINT `games_ibfk_1` FOREIGN KEY (`player1_id`) REFERENCES `users` (`id`),
  CONSTRAINT `games_ibfk_2` FOREIGN KEY (`player2_id`) REFERENCES `users` (`id`),
  CONSTRAINT `games_ibfk_3` FOREIGN KEY (`winner_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--
/*==============DONE==============*/
LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,1,2,1,'2024-12-07 15:04:00'),(2,1,3,1,'2024-12-07 15:04:00'),(3,2,3,2,'2024-12-07 15:04:00');
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lobbies`
--
/*==============DONE==============*/
DROP TABLE IF EXISTS `lobbies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lobbies` (
  `lobby_id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by` int(11) NOT NULL,
  `status` enum('waiting','in_progress','finished') DEFAULT 'waiting',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`lobby_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `lobbies_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lobbies`
--
/*==============DONE==============*/
LOCK TABLES `lobbies` WRITE;
/*!40000 ALTER TABLE `lobbies` DISABLE KEYS */;
INSERT INTO `lobbies` VALUES (23,2,'waiting','2024-12-10 11:35:51'),(24,1,'waiting','2024-12-10 16:07:31'),(25,3,'waiting','2024-12-10 16:24:02');
/*!40000 ALTER TABLE `lobbies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lobby_players`
--
/*==============DONE==============*/
DROP TABLE IF EXISTS `lobby_players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lobby_players` (
  `lobby_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `joined_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`lobby_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `lobby_players_ibfk_1` FOREIGN KEY (`lobby_id`) REFERENCES `lobbies` (`lobby_id`),
  CONSTRAINT `lobby_players_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lobby_players`
--
/*==============DONE==============*/
LOCK TABLES `lobby_players` WRITE;
/*!40000 ALTER TABLE `lobby_players` DISABLE KEYS */;
INSERT INTO `lobby_players` VALUES (23,1,'2024-12-10 11:43:07'),(23,3,'2024-12-10 11:40:50'),(24,3,'2024-12-10 16:08:34');
/*!40000 ALTER TABLE `lobby_players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pieces`
--
/*==============DONE==============*/
DROP TABLE IF EXISTS `pieces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pieces` (
  `piece_id` int(11) NOT NULL,
  `shape` enum('S','L','T','Z','I','O') NOT NULL,
  `size` enum('1','2','3','4','5') NOT NULL,
  `color` enum('R','B','Y','G') NOT NULL,
  `grid_5x5` varchar(25) NOT NULL,
  `used` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`piece_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pieces`
--
/*==============DONE==============*/
LOCK TABLES `pieces` WRITE;
/*!40000 ALTER TABLE `pieces` DISABLE KEYS */;
INSERT INTO `pieces` VALUES (1,'L','5','R','0000001000010000111000000',1),(2,'T','5','G','0000001110001000010000000',0);
/*!40000 ALTER TABLE `pieces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'testuser1','testuser1@example.com','password123','2024-12-07 15:03:53'),(2,'stavros','omonia.com','password123','2024-12-07 15:03:53'),(3,'testuser3','testuser3@example.com','password123','2024-12-07 15:03:53');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'blokus'
--
/*!50003 DROP PROCEDURE IF EXISTS `clear_board` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `clear_board`()
begin

	UPDATE board_20 SET block = 'W';

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `clear_pieces` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `clear_pieces`()
begin

	UPDATE pieces SET used = false;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `createLobby` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `createLobby`(
    IN p_created_by INT
)
BEGIN
    -- Insert a new lobby into the lobbies table
    INSERT INTO lobbies (created_by, status, created_at)
    VALUES (p_created_by, 'waiting', NOW());

    -- Get the last inserted ID for the lobby_id
    SELECT LAST_INSERT_ID() AS lobby_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `fetch_board` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `fetch_board`()
begin

	SELECT x, y, block FROM board_20 ORDER BY x, y;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getLobbies` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getLobbies`()
BEGIN

    SELECT lobby_id, created_by, created_at

    FROM lobbies

    WHERE status = 'waiting';

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `initialize_board_20` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `initialize_board_20`()
BEGIN

    DECLARE x INT DEFAULT 1;

    DECLARE y INT DEFAULT 1;



    -- Loop through x and y to insert all possible combinations

    WHILE x <= 20 DO

        WHILE y <= 20 DO

            INSERT INTO `board_20` (`x`, `y`, `block`) VALUES (x, y, 'W');

            SET y = y + 1;

        END WHILE;

        SET y = 1; -- Reset y for the next row

        SET x = x + 1;

    END WHILE;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `mirror_piece` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `mirror_piece`(

    IN p_piece_grid VARCHAR(25),    -- The 5x5 grid of the piece

    OUT p_mirrored_grid VARCHAR(25)  -- The mirrored grid of the piece

)
BEGIN

    -- Mirror the grid horizontally (flip it)

    SET p_mirrored_grid = CONCAT(

        SUBSTRING(p_piece_grid, 5, 1),

        SUBSTRING(p_piece_grid, 4, 1),

        SUBSTRING(p_piece_grid, 3, 1),

        SUBSTRING(p_piece_grid, 2, 1),

        SUBSTRING(p_piece_grid, 1, 1),

        SUBSTRING(p_piece_grid, 10, 1),

        SUBSTRING(p_piece_grid, 9, 1),

        SUBSTRING(p_piece_grid, 8, 1),

        SUBSTRING(p_piece_grid, 7, 1),

        SUBSTRING(p_piece_grid, 6, 1),

        SUBSTRING(p_piece_grid, 15, 1),

        SUBSTRING(p_piece_grid, 14, 1),

        SUBSTRING(p_piece_grid, 13, 1),

        SUBSTRING(p_piece_grid, 12, 1),

        SUBSTRING(p_piece_grid, 11, 1),

        SUBSTRING(p_piece_grid, 20, 1),

        SUBSTRING(p_piece_grid, 19, 1),

        SUBSTRING(p_piece_grid, 18, 1),

        SUBSTRING(p_piece_grid, 17, 1),

        SUBSTRING(p_piece_grid, 16, 1),

        SUBSTRING(p_piece_grid, 25, 1),

        SUBSTRING(p_piece_grid, 24, 1),

        SUBSTRING(p_piece_grid, 23, 1),

        SUBSTRING(p_piece_grid, 22, 1),

        SUBSTRING(p_piece_grid, 21, 1)

    );

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `place_piece` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `place_piece`(

    IN p_piece_id INT,         -- The ID of the piece being placed

    IN p_start_x TINYINT(1),   -- The starting X coordinate on the board

    IN p_start_y TINYINT(1),   -- The starting Y coordinate on the board

    IN p_mirror BOOLEAN,       -- Flag for mirroring the piece (TRUE/FALSE)

    IN p_rotate ENUM('0', '90', '180', '270') -- Rotation angle

)
BEGIN

    DECLARE is_valid BOOLEAN;

    DECLARE piece_shape VARCHAR(1);

    DECLARE piece_size VARCHAR(1);

    DECLARE piece_color VARCHAR(1);

    DECLARE piece_grid VARCHAR(25);  -- Grid of the piece as a 25-character string

    DECLARE piece_used BOOLEAN;

    DECLARE i INT;

    DECLARE x INT;

    DECLARE y INT;

    DECLARE rotated_grid VARCHAR(25);

    DECLARE mirrored_grid VARCHAR(25);

   

    -- Check if the move is valid by calling the valid_move procedure

    CALL blokus.valid_move(p_piece_id, p_start_x, p_start_y, is_valid);



    -- If the move is not valid, raise an error

    IF is_valid = FALSE THEN

        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid move. Cannot place the piece.';

    END IF;



    -- Retrieve piece data from the pieces table, including the 'used' status

    SELECT shape, size, color, grid_5x5, used

    INTO piece_shape, piece_size, piece_color, piece_grid, piece_used

    FROM pieces

    WHERE piece_id = p_piece_id

    LIMIT 1;

   

    -- Check if the piece has already been used

    IF piece_used = TRUE THEN 

        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Piece has already been played.';

    END IF;



    -- Mirror the piece if requested

    IF p_mirror = TRUE THEN

        CALL blokus.mirror_piece(piece_grid, mirrored_grid);

    ELSE

        SET mirrored_grid = piece_grid; -- No mirroring

    END IF;



    -- Rotate the piece if requested

    CALL blokus.rotate_piece(mirrored_grid, p_rotate, rotated_grid);

   

    -- Now, proceed to place the piece using the final rotated and mirrored grid

    SET i = 1;

    WHILE i <= 25 DO

        SET x = p_start_x + ((i - 1) % 5);

        SET y = p_start_y + FLOOR((i - 1) / 5);



        -- If the grid position contains part of the piece ('1' in grid_5x5), place it on the board

        IF SUBSTRING(rotated_grid, i, 1) = '1' THEN

            -- Update the board with the piece's color

            INSERT INTO board_20 (x, y, block)

            VALUES (x, y, piece_color)

            ON DUPLICATE KEY UPDATE block = piece_color;

        END IF;



        SET i = i + 1;

    END WHILE;



    -- Mark the piece as used

    UPDATE pieces SET used = TRUE WHERE piece_id = p_piece_id;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `rotate_piece` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `rotate_piece`(

    IN p_piece_grid VARCHAR(25),    -- The 5x5 grid of the piece

    IN p_rotate ENUM('0', '90', '180', '270'),  -- Rotation angle

    OUT p_rotated_grid VARCHAR(25)   -- The rotated grid of the piece

)
BEGIN

    IF p_rotate = '90' THEN

        -- Rotate the piece 90 degrees clockwise

        SET p_rotated_grid = CONCAT(

            SUBSTRING(p_piece_grid, 21, 1), SUBSTRING(p_piece_grid, 16, 1), SUBSTRING(p_piece_grid, 11, 1), SUBSTRING(p_piece_grid, 6, 1), SUBSTRING(p_piece_grid, 1, 1), -- New row 1

            SUBSTRING(p_piece_grid, 22, 1), SUBSTRING(p_piece_grid, 17, 1), SUBSTRING(p_piece_grid, 12, 1), SUBSTRING(p_piece_grid, 7, 1), SUBSTRING(p_piece_grid, 2, 1), -- New row 2

            SUBSTRING(p_piece_grid, 23, 1), SUBSTRING(p_piece_grid, 18, 1), SUBSTRING(p_piece_grid, 13, 1), SUBSTRING(p_piece_grid, 8, 1), SUBSTRING(p_piece_grid, 3, 1), -- New row 3

            SUBSTRING(p_piece_grid, 24, 1), SUBSTRING(p_piece_grid, 19, 1), SUBSTRING(p_piece_grid, 14, 1), SUBSTRING(p_piece_grid, 9, 1), SUBSTRING(p_piece_grid, 4, 1), -- New row 4

            SUBSTRING(p_piece_grid, 25, 1), SUBSTRING(p_piece_grid, 20, 1), SUBSTRING(p_piece_grid, 15, 1), SUBSTRING(p_piece_grid, 10, 1), SUBSTRING(p_piece_grid, 5, 1)  -- New row 5

        );

    ELSEIF p_rotate = '180' THEN

        -- Rotate the piece 180 degrees

        SET p_rotated_grid = REVERSE(p_piece_grid);

    ELSEIF p_rotate = '270' THEN

        -- Rotate the piece 270 degrees clockwise

        SET p_rotated_grid = CONCAT(

            SUBSTRING(p_piece_grid, 5, 1), SUBSTRING(p_piece_grid, 10, 1), SUBSTRING(p_piece_grid, 15, 1), SUBSTRING(p_piece_grid, 20, 1), SUBSTRING(p_piece_grid, 25, 1),

            SUBSTRING(p_piece_grid, 4, 1), SUBSTRING(p_piece_grid, 9, 1), SUBSTRING(p_piece_grid, 14, 1), SUBSTRING(p_piece_grid, 19, 1), SUBSTRING(p_piece_grid, 24, 1),

            SUBSTRING(p_piece_grid, 3, 1), SUBSTRING(p_piece_grid, 8, 1), SUBSTRING(p_piece_grid, 13, 1), SUBSTRING(p_piece_grid, 18, 1), SUBSTRING(p_piece_grid, 23, 1),

            SUBSTRING(p_piece_grid, 2, 1), SUBSTRING(p_piece_grid, 7, 1), SUBSTRING(p_piece_grid, 12, 1), SUBSTRING(p_piece_grid, 17, 1), SUBSTRING(p_piece_grid, 22, 1),

            SUBSTRING(p_piece_grid, 1, 1), SUBSTRING(p_piece_grid, 6, 1), SUBSTRING(p_piece_grid, 11, 1), SUBSTRING(p_piece_grid, 16, 1), SUBSTRING(p_piece_grid, 21, 1)

        );

    ELSE

        -- No rotation (0 degrees)

        SET p_rotated_grid = p_piece_grid;

    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `rotate_piece_demo_simple` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `rotate_piece_demo_simple`(

    IN p_piece_id INT,          -- The ID of the piece to rotate

    IN p_start_x TINYINT(1),    -- The starting X coordinate

    IN p_start_y TINYINT(1),    -- The starting Y coordinate

    IN p_mirror BOOLEAN         -- Whether to mirror the piece

)
begin

	

	call clear_board();

	call clear_pieces();

	

	CALL place_piece(p_piece_id,  p_start_x, p_start_y , p_mirror,'0');

	

	DO SLEEP(0.5);

	

	call clear_board();

	call clear_pieces();

	CALL place_piece(p_piece_id,  p_start_x, p_start_y , p_mirror,'90');

	

	DO SLEEP(0.5);

	

	call clear_board();

	call clear_pieces();

	CALL place_piece(p_piece_id,  p_start_x, p_start_y , p_mirror,'180');

	

	DO SLEEP(0.5);

	

	call clear_board();

	call clear_pieces();

	

	CALL place_piece(p_piece_id, p_start_x, p_start_y , p_mirror,'270');

	

	DO SLEEP(0.5);

	

	call clear_board();

	call clear_pieces();

  

    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `valid_move` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `valid_move`(

    IN p_piece_id INT,          -- ID of the piece being placed

    IN p_start_x INT,           -- X coordinate where the piece starts

    IN p_start_y INT,           -- Y coordinate where the piece starts

    OUT is_valid BOOLEAN        -- Output parameter indicating if the move is valid

)
BEGIN

    DECLARE piece_grid VARCHAR(25);   -- 5x5 piece grid

    DECLARE board_state VARCHAR(400); -- 20x20 board grid (as VARCHAR)

    DECLARE i INT;                    -- Loop counter for piece grid

    DECLARE x INT;                    -- Calculated X position on the board

    DECLARE y INT;                    -- Calculated Y position on the board



    -- Initialize is_valid to TRUE (assume move is valid)

    SET is_valid = TRUE;



    -- Retrieve the piece's grid (5x5) from the pieces table

    SELECT grid_5x5 INTO piece_grid

    FROM pieces

    WHERE piece_id = p_piece_id;



    -- Retrieve the current state of the board as a 400-character string

    SELECT GROUP_CONCAT(block ORDER BY y, x SEPARATOR '')

    INTO board_state

    FROM board_20

    WHERE x BETWEEN 1 AND 20 AND y BETWEEN 1 AND 20;



    -- Loop through the piece's 5x5 grid

    SET i = 1;

    WHILE i <= 25 DO

        -- Calculate the board coordinates (x, y) for each part of the piece

        SET x = p_start_x + ((i - 1) % 5);

        SET y = p_start_y + FLOOR((i - 1) / 5);



        -- Check if the current piece grid position is part of the piece (i.e., '1')

        IF SUBSTRING(piece_grid, i, 1) = '1' THEN

            -- Check if the position is out of bounds

            IF x < 0 OR x >= 20 OR y < 0 OR y >= 20 THEN

                SET is_valid = FALSE;  -- Move is out of bounds

            ELSE

                -- Check if the corresponding board position is occupied

                IF SUBSTRING(board_state, (y * 20) + x + 1, 1) != 'W' THEN

                    SET is_valid = FALSE;  -- Move is invalid (space occupied)

                END IF;

            END IF;

        END IF;



        -- Move to the next position in the piece grid

        SET i = i + 1;

    END WHILE;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-10 18:43:00
