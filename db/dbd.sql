-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: testdb
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `act_name` varchar(255) NOT NULL,
  `act_description` varchar(255) DEFAULT NULL,
  `act_address` varchar(255) NOT NULL,
  `act_price` int DEFAULT NULL,
  `act_time` datetime NOT NULL,
  `act_status` int NOT NULL,
  `creater_id` int NOT NULL,
  `audit_id` int DEFAULT NULL,
  `amount` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_act_user_idx` (`creater_id`),
  KEY `fk_act_staus_idx` (`act_status`),
  KEY `fk_act_user_au_idx` (`audit_id`),
  CONSTRAINT `fk_act_staus` FOREIGN KEY (`act_status`) REFERENCES `status_acts` (`id`),
  CONSTRAINT `fk_act_user_au` FOREIGN KEY (`audit_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_act_user_ctr` FOREIGN KEY (`creater_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (2,'Thực tập tại công ty ABC','Thực tập thực tế tại công ty ABC','123 Đường ABC, Quận XYZ',12000,'2024-05-14 14:52:11',2,20,4,10,'2024-05-13 14:52:11','2024-05-15 15:27:49'),(3,'Dự buổi workshop','Dự buổi workshop về kỹ năng giao tiếp','Trung tâm văn hóa quận 1',NULL,'2024-05-15 14:52:11',2,21,4,20,'2024-05-13 14:52:11','2024-05-15 15:27:49'),(4,'Tham gia dự án xây dựng cộng đồng','Tham gia dự án xây dựng cộng đồng trong khu phố','Số nhà 10, Phường ABC',10000,'2024-05-16 14:52:11',1,22,NULL,20,'2024-05-13 14:52:11','2024-05-13 14:53:14'),(5,'Dự buổi họp nhóm','Dự buổi họp nhóm chuẩn bị cho kỳ thi cuối kỳ','Phòng học B205',NULL,'2024-05-17 14:52:11',1,23,NULL,32,'2024-05-13 14:52:11','2024-05-13 14:52:11'),(6,'Tham gia buổi hội thảo','Tham gia buổi hội thảo về Công nghệ thông tin','Hội trường lớn',20000,'2024-05-18 14:52:11',1,24,NULL,23,'2024-05-13 14:52:11','2024-05-13 14:53:14'),(7,'Dự buổi gặp mặt cựu sinh viên','Dự buổi gặp mặt cựu sinh viên và chia sẻ kinh nghiệm','Nhà hàng ABC',NULL,'2024-05-19 14:52:11',1,20,NULL,10,'2024-05-13 14:52:11','2024-05-13 14:52:11'),(8,'Thực hiện dự án nghiên cứu','Thực hiện dự án nghiên cứu về công nghệ mới','Phòng lab XYZ',NULL,'2024-05-20 14:52:11',1,21,NULL,5,'2024-05-13 14:52:11','2024-05-13 14:52:11'),(9,'Thực tập tại bệnh viện','Thực tập tại bệnh viện để nâng cao kỹ năng chuyên môn','Bệnh viện X',NULL,'2024-05-21 14:52:11',1,22,NULL,20,'2024-05-13 14:52:11','2024-05-13 14:52:11'),(10,'Tham gia chiến dịch môi trường','Tham gia chiến dịch dọn vệ sinh môi trường','Công viên ABC',NULL,'2024-05-22 14:52:11',1,23,NULL,10,'2024-05-13 14:52:11','2024-05-13 14:52:11'),(11,'Tham gia buổi tập huấn','Tham gia buổi tập huấn về quản lý dự án','Phòng học C101',NULL,'2024-05-23 14:52:11',1,24,NULL,90,'2024-05-13 14:52:11','2024-05-13 14:52:11'),(12,'Dự lễ kỷ niệm ngày thành lập trường','Dự lễ kỷ niệm 50 năm ngày thành lập trường','Sân trường',NULL,'2024-05-24 14:52:11',1,20,NULL,32,'2024-05-13 14:52:11','2024-05-13 14:52:11'),(13,'Tham gia câu lạc bộ âm nhạc','Tham gia biểu diễn tại câu lạc bộ âm nhạc','Nhà văn hóa quận 2',NULL,'2024-05-25 14:52:11',1,21,NULL,23,'2024-05-13 14:52:11','2024-05-13 14:52:11'),(14,'Thực hiện dự án tình nguyện','Thực hiện dự án tình nguyện giúp đỡ người khuyết tật','Khu phố ABC',NULL,'2024-05-26 14:52:11',1,22,NULL,23,'2024-05-13 14:52:11','2024-05-13 14:52:11'),(15,'Tham gia cuộc thi thể thao','Tham gia cuộc thi bóng đá sinh viên','Sân bóng trường',NULL,'2024-05-27 14:52:11',1,23,NULL,23,'2024-05-13 14:52:11','2024-05-13 14:52:11'),(16,'Thực tập tại doanh nghiệp','Thực tập tại doanh nghiệp để làm quen với môi trường làm việc','Công ty ABC',NULL,'2024-05-28 14:52:11',1,24,NULL,22,'2024-05-13 14:52:11','2024-05-13 14:52:11'),(17,'Tham gia buổi hội thảo về marketing','Tham gia buổi hội thảo về marketing và quảng cáo','Trung tâm hội nghị',122999,'2024-05-29 14:52:11',1,20,NULL,22,'2024-05-13 14:52:11','2024-05-13 14:53:14'),(18,'Tham gia dự án nghiên cứu khoa học','Tham gia dự án nghiên cứu về công nghệ sinh học','Phòng lab XYZ',NULL,'2024-05-30 14:52:11',1,21,NULL,23,'2024-05-13 14:52:11','2024-05-13 14:52:11'),(19,'Thực hiện dự án phát triển ứng dụng di động','Thực hiện dự án phát triển ứng dụng di động','Phòng lab công nghệ thông tin',NULL,'2024-05-31 14:52:11',1,22,NULL,21,'2024-05-13 14:52:11','2024-05-13 14:52:11'),(20,'Tham gia hoạt động tình nguyện','Tham gia hoạt động tình nguyện giúp đỡ trẻ em vùng cao','Trường tiểu học ABC',12000,'2024-06-01 14:52:11',1,23,NULL,21,'2024-05-13 14:52:11','2024-05-13 14:53:14'),(21,'Dự buổi họp nhóm dự án','Dự buổi họp nhóm chuẩn bị cho báo cáo cuối kỳ','Phòng học B205',NULL,'2024-06-02 14:52:11',1,24,NULL,12,'2024-05-13 14:52:11','2024-05-13 14:52:11');
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `id` varchar(15) NOT NULL,
  `class_name` varchar(255) NOT NULL,
  `department_id` varchar(15) NOT NULL,
  `year` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_class_depart_idx` (`department_id`),
  CONSTRAINT `fk_class_depart` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES ('N20DCAT1','An toàn thông tin 1','ATTT',2020,'2024-05-11 21:06:50','2024-05-11 21:06:50'),('N21CNTT1','Công nghệ thông tin 1','CNTT',2021,'2024-05-11 21:06:50','2024-05-11 21:06:50'),('N21DCAT1','An toàn thông tin 1','ATTT',2021,'2024-05-11 21:06:50','2024-05-11 21:06:50'),('N21DCAT2','Công nghệ thông tin 2','CNTT',2021,'2024-05-11 21:06:50','2024-05-11 21:06:50'),('N21DCKT','Kế Toán ','KT',2021,'2024-05-11 21:06:50','2024-05-11 21:06:50'),('N21DPT1','Đa Phương Tiện ','DPT',2021,'2024-05-11 21:06:50','2024-05-11 21:06:50');
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` varchar(15) NOT NULL,
  `depar_name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `depar_name_UNIQUE` (`depar_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES ('ATTT','Khoa An toàn thông tin','0333138324','att@gmail.com','2024-05-11 21:02:07','2024-05-11 21:02:07'),('CNTT','KHoa Công nghệ thông tin','0823828273','cntt@gmail.edu.vn','2024-05-11 21:02:07','2024-05-11 21:02:07'),('DPT','Khoa Đa Phương Tiện','0237843272','dpt@gmaifsjc.edu.vn','2024-05-11 21:02:07','2024-05-11 21:02:07'),('KT','KHoa Kế Toán ','0923632727','ktdah@gmail.com','2024-05-11 21:02:07','2024-05-11 21:02:07');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `object_id` int NOT NULL,
  `message` varchar(255) NOT NULL,
  `act_id` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_noti_idx` (`object_id`),
  KEY `fk_noti_act_idx` (`act_id`),
  CONSTRAINT `fk_noti_act` FOREIGN KEY (`act_id`) REFERENCES `activities` (`id`),
  CONSTRAINT `fk_noti_obj` FOREIGN KEY (`object_id`) REFERENCES `objects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objects`
--

DROP TABLE IF EXISTS `objects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `objects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `obj_name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `obj_name_UNIQUE` (`obj_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objects`
--

LOCK TABLES `objects` WRITE;
/*!40000 ALTER TABLE `objects` DISABLE KEYS */;
INSERT INTO `objects` VALUES (1,'Người tổ chức','2024-05-11 21:26:41','2024-05-11 21:26:41'),(2,'Sinh Viên','2024-05-11 21:26:59','2024-05-11 21:26:59');
/*!40000 ALTER TABLE `objects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `perm_name` varchar(255) NOT NULL,
  `perm_description` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `perm_name_UNIQUE` (`perm_name`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'user_add','Add User',NULL,'2024-05-06 08:41:42','2024-05-06 08:41:42'),(2,'user_update','Update User',NULL,'2024-05-06 08:41:42','2024-05-06 08:41:42'),(3,'user_get','Get User',NULL,'2024-05-06 08:41:42','2024-05-06 08:41:42'),(4,'user_get_all','Get All User',NULL,'2024-05-06 08:41:42','2024-05-06 08:41:42'),(5,'user_delete','Delete User',NULL,'2024-05-06 08:41:42','2024-05-06 08:41:42'),(6,'role_add','Add Role',NULL,'2024-05-06 08:41:42','2024-05-06 08:41:42'),(7,'role_update','Update Role',NULL,'2024-05-06 08:41:42','2024-05-06 08:41:42'),(8,'role_get','Get Role',NULL,'2024-05-06 08:41:42','2024-05-06 08:41:42'),(9,'role_get_all','Get All Role',NULL,'2024-05-06 08:41:42','2024-05-06 08:41:42'),(10,'role_delete','Delete Role',NULL,'2024-05-06 08:41:42','2024-05-06 08:41:42'),(11,'permissions_add','Add Permission',NULL,'2024-05-06 08:41:42','2024-05-06 08:41:42'),(12,'permissions_update','Update Permission',NULL,'2024-05-06 08:41:42','2024-05-06 08:41:42'),(13,'permissions_get','Get Permission',NULL,'2024-05-06 08:41:42','2024-05-06 08:41:42'),(14,'permissions_get_all','Get All Permission',NULL,'2024-05-06 08:41:42','2024-05-06 08:41:42'),(15,'permissions_delete','Delete Permission',NULL,'2024-05-06 08:41:42','2024-05-06 08:41:42'),(16,'act_add','Add Activitity',NULL,'2024-05-06 08:41:42','2024-05-13 15:20:59'),(17,'act_update','Update Activitity',NULL,'2024-05-06 08:41:42','2024-05-13 15:20:59'),(18,'act_get','Get Activitity',NULL,'2024-05-06 08:41:42','2024-05-13 15:20:59'),(19,'act_get_all','Get All Activitity',NULL,'2024-05-06 08:41:42','2024-05-13 15:20:59'),(20,'act_delete','Delete Activitity',NULL,'2024-05-06 08:41:42','2024-05-13 15:20:59'),(21,'act_get_all_acp','Get All ActivitityAccept',NULL,'2024-05-11 22:37:13','2024-05-13 15:20:59'),(22,'act_get_all_created','Get Al l Activitity User Created',NULL,'2024-05-13 15:20:59','2024-05-13 15:20:59'),(23,'user_get_details','Get User Detalis',NULL,'2024-05-13 15:52:27','2024-05-13 15:52:27'),(24,'add_act_uncensored','Add Activity uncensored',NULL,'2024-05-15 15:19:32','2024-05-15 15:19:32'),(25,'register_acts','Register Activity ',NULL,'2024-05-15 16:44:46','2024-05-15 16:44:46'),(26,'get_accept_register','Get Accecpt Register',NULL,'2024-05-15 17:08:52','2024-05-15 17:08:52');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `register_acts`
--

DROP TABLE IF EXISTS `register_acts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `register_acts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `act_id` int NOT NULL,
  `act_account` int NOT NULL,
  `status_id` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_act_reg_idx` (`act_id`),
  KEY `fk_act_status_idx` (`status_id`),
  KEY `fk_act_user_idx` (`act_account`),
  CONSTRAINT `fk_act_reg` FOREIGN KEY (`act_id`) REFERENCES `activities` (`id`),
  CONSTRAINT `fk_act_status` FOREIGN KEY (`status_id`) REFERENCES `status_acts` (`id`),
  CONSTRAINT `fk_act_user` FOREIGN KEY (`act_account`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register_acts`
--

LOCK TABLES `register_acts` WRITE;
/*!40000 ALTER TABLE `register_acts` DISABLE KEYS */;
INSERT INTO `register_acts` VALUES (1,2,9,1,'2024-05-15 16:57:02','2024-05-15 16:57:02'),(2,3,9,1,'2024-05-15 16:58:27','2024-05-15 16:58:27');
/*!40000 ALTER TABLE `register_acts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolepermissions`
--

DROP TABLE IF EXISTS `rolepermissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rolepermissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `perm_id` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_perm_role_pair` (`role_id`,`perm_id`),
  KEY `fk_rolepermissions_roles_idx` (`role_id`),
  KEY `fk_rolepermissions_permissons_idx` (`perm_id`),
  CONSTRAINT `fk_rolepermissions_permissons` FOREIGN KEY (`perm_id`) REFERENCES `permissions` (`id`),
  CONSTRAINT `fk_rolepermissions_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolepermissions`
--

LOCK TABLES `rolepermissions` WRITE;
/*!40000 ALTER TABLE `rolepermissions` DISABLE KEYS */;
INSERT INTO `rolepermissions` VALUES (1,1,1,'2024-05-06 08:46:19','2024-05-06 08:46:19'),(2,1,2,'2024-05-06 08:46:51','2024-05-06 08:46:51'),(3,1,3,'2024-05-06 08:46:55','2024-05-06 08:46:55'),(4,1,4,'2024-05-06 08:46:58','2024-05-06 08:46:58'),(5,1,5,'2024-05-06 08:47:03','2024-05-06 08:47:03'),(6,1,6,'2024-05-06 08:47:07','2024-05-06 08:47:07'),(7,1,7,'2024-05-06 08:47:09','2024-05-06 08:47:09'),(8,1,8,'2024-05-06 08:47:12','2024-05-06 08:47:12'),(9,1,9,'2024-05-06 08:47:16','2024-05-06 08:47:16'),(10,1,10,'2024-05-06 08:47:19','2024-05-06 08:47:19'),(11,1,11,'2024-05-06 08:47:22','2024-05-06 08:47:22'),(12,1,12,'2024-05-06 08:47:25','2024-05-06 08:47:25'),(13,1,13,'2024-05-06 08:47:28','2024-05-06 08:47:28'),(14,1,14,'2024-05-06 08:47:30','2024-05-06 08:47:30'),(15,1,15,'2024-05-11 23:36:01','2024-05-11 23:36:01'),(16,1,16,'2024-05-11 23:36:01','2024-05-11 23:36:01'),(17,1,17,'2024-05-11 23:36:06','2024-05-11 23:36:06'),(18,1,18,'2024-05-11 23:36:16','2024-05-11 23:36:16'),(19,1,19,'2024-05-11 23:36:16','2024-05-11 23:36:16'),(20,1,20,'2024-05-11 23:36:16','2024-05-11 23:36:16'),(21,1,21,'2024-05-11 23:36:24','2024-05-11 23:36:24'),(22,3,22,'2024-05-13 15:21:20','2024-05-13 15:21:20'),(23,4,22,'2024-05-13 15:21:20','2024-05-13 15:21:20'),(24,1,22,'2024-05-13 15:21:20','2024-05-13 15:21:20'),(25,1,23,'2024-05-13 15:52:54','2024-05-13 15:52:54'),(26,2,23,'2024-05-13 15:52:54','2024-05-13 15:52:54'),(27,3,23,'2024-05-13 15:52:54','2024-05-13 15:52:54'),(28,4,23,'2024-05-13 15:52:54','2024-05-13 15:52:54'),(29,1,24,'2024-05-15 15:19:40','2024-05-15 15:19:40'),(30,3,16,'2024-05-15 16:13:09','2024-05-15 16:13:09'),(31,4,16,'2024-05-15 16:13:17','2024-05-15 16:13:17'),(32,2,25,'2024-05-15 16:44:58','2024-05-15 16:44:58'),(33,3,26,'2024-05-15 17:09:18','2024-05-15 17:09:18'),(34,1,26,'2024-05-15 17:09:18','2024-05-15 17:09:18'),(35,4,26,'2024-05-15 17:09:18','2024-05-15 17:09:18'),(36,2,21,'2024-05-16 15:34:15','2024-05-16 15:34:15'),(37,3,21,'2024-05-16 15:34:15','2024-05-16 15:34:15'),(38,4,21,'2024-05-16 15:34:15','2024-05-16 15:34:15');
/*!40000 ALTER TABLE `rolepermissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  `role_description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_name_UNIQUE` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','System Admin ','2024-05-06 08:42:26','2024-05-06 08:42:26'),(2,'student','Student View','2024-05-10 14:33:27','2024-05-10 14:33:27'),(3,'class_cabinet ','Class Cabiner','2024-05-11 20:53:12','2024-05-11 20:53:12'),(4,'unions','University_unions','2024-05-11 21:24:28','2024-05-11 21:24:28');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20210916024852-create-role.js'),('20210916024907-create-permission.js'),('20210916024913-create-product.js'),('20210916025034-create-user.js'),('20210916031105-create-role-permission.js'),('20240503084556-create-user.js'),('20240503084740-create-role.js'),('20240503084859-create-permission.js'),('20240503084951-create-role-permission.js'),('20240503085812-create-activity.js'),('20240503085941-create-status-act.js'),('20240503085959-create-status-account.js'),('20240505135544-create-student.js'),('20240505140102-create-university-union.js'),('20240505140337-create-class.js'),('20240505140450-create-department.js'),('20240505145914-create-object.js'),('20240505150236-create-notification.js'),('20240505162806-create-register-act.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_accounts`
--

DROP TABLE IF EXISTS `status_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Status_Act_name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Status_Act_name_UNIQUE` (`Status_Act_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_accounts`
--

LOCK TABLES `status_accounts` WRITE;
/*!40000 ALTER TABLE `status_accounts` DISABLE KEYS */;
INSERT INTO `status_accounts` VALUES (1,'active','2024-05-11 20:40:02','2024-05-11 20:40:02'),(2,'inactive','2024-05-11 20:40:02','2024-05-11 20:40:02');
/*!40000 ALTER TABLE `status_accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_acts`
--

DROP TABLE IF EXISTS `status_acts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_acts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Status_Act_name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Status_Act_name_UNIQUE` (`Status_Act_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_acts`
--

LOCK TABLES `status_acts` WRITE;
/*!40000 ALTER TABLE `status_acts` DISABLE KEYS */;
INSERT INTO `status_acts` VALUES (1,'Đợi duyệt','2024-05-11 20:34:57','2024-05-12 14:52:48'),(2,'Đã duyêt','2024-05-11 20:35:12','2024-05-12 14:52:48'),(3,'Đã kết thúc ','2024-05-12 14:52:48','2024-05-12 14:52:48'),(4,'Đã hủy','2024-05-12 14:52:48','2024-05-12 14:52:48'),(5,'Đang diễn ra','2024-05-12 14:52:48','2024-05-12 14:52:48');
/*!40000 ALTER TABLE `status_acts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `MSSV` varchar(15) NOT NULL,
  `first_name` varchar(55) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `account_id` int NOT NULL,
  `class_id` varchar(15) NOT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `gender_id` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`MSSV`),
  UNIQUE KEY `account_id_UNIQUE` (`account_id`),
  KEY `fk_student_class_idx` (`class_id`),
  KEY `fk_student_user_idx` (`account_id`),
  CONSTRAINT `fk_student_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  CONSTRAINT `fk_student_user` FOREIGN KEY (`account_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES ('N20DCAT1001','Anh','Nguyễn',7,'N20DCAT1','123456789','123 Đường 1',NULL,'1990-01-01 00:00:00',1,'anh@example.com','2024-05-11 21:13:15','2024-05-11 21:13:15'),('N20DCAT1002','Bình','Trần',8,'N20DCAT1','987654321','456 Đường 2',NULL,'1992-02-02 00:00:00',2,'binh@example.com','2024-05-11 21:13:15','2024-05-11 21:13:15'),('N20DCAT1003','Dương','Hoàng',13,'N20DCAT1','111222333','789 Đường 7',NULL,'1993-07-07 00:00:00',1,'duong@example.com','2024-05-11 21:14:13','2024-05-11 21:14:13'),('N20DCAT1004','Hạnh','Mai',14,'N20DCAT1','444555666','987 Đường 8',NULL,'1995-08-08 00:00:00',2,'hanh@example.com','2024-05-11 21:14:13','2024-05-11 21:14:13'),('N20DCAT1005','Nam','Trương',19,'N20DCAT1','333444555','789 Đường 13','Bí thư ATTT','1993-01-13 00:00:00',1,'nam@example.com','2024-05-11 21:17:14','2024-05-11 21:17:14'),('N20DCAT1006','Oanh','Vũ',20,'N20DCAT1','666777888','987 Đường 14','Trưởng CLB CNTT','1995-02-14 00:00:00',2,'oanh@example.com','2024-05-11 21:17:14','2024-05-11 21:17:14'),('N21CNTT1001','Cường','Lê',9,'N21CNTT1','555123456','789 Đường 3',NULL,'1995-03-03 00:00:00',1,'cuong@example.com','2024-05-11 21:13:15','2024-05-11 21:13:15'),('N21CNTT1002','Huy','Lý',15,'N21CNTT1','777888999','321 Đường 9',NULL,'1997-09-09 00:00:00',1,'huy@example.com','2024-05-11 21:14:13','2024-05-11 21:14:13'),('N21CNTT1003','Phương','Đặng',21,'N21CNTT1','999000111','321 Đường 15','Bí thư CNTT','1997-03-15 00:00:00',1,'phuong@example.com','2024-05-11 21:17:14','2024-05-11 21:17:14'),('N21DCAT0211','Nguyễn Trần Hùng','Biện',69,'N20DCAT1','0384616327','Bình ĐỊnh',NULL,NULL,1,NULL,'2024-05-13 06:58:58','2024-05-13 06:58:58'),('N21DCAT1001','Dung','Phạm',10,'N21DCAT1','777987654','321 Đường 4',NULL,'1998-04-04 00:00:00',2,'dung@example.com','2024-05-11 21:13:15','2024-05-11 21:13:15'),('N21DCAT1002','Ếch','Hoàng',11,'N21DCAT2','888555123','987 Đường 5',NULL,'2000-05-05 00:00:00',2,'ech@example.com','2024-05-11 21:13:15','2024-05-11 21:13:15'),('N21DCAT1003','Kiều','Vương',16,'N21DCAT1','123987456','654 Đường 10',NULL,'1999-10-10 00:00:00',2,'kieu@example.com','2024-05-11 21:14:13','2024-05-11 21:14:13'),('N21DCAT1004','Linh','Phan',17,'N21DCAT2','987654321','456 Đường 11',NULL,'2001-11-11 00:00:00',2,'linh@example.com','2024-05-11 21:14:13','2024-05-11 21:14:13'),('N21DCAT1005','Quang','Hoàng',22,'N21DCAT1','111222333','654 Đường 16','Bí thư KT','1999-04-16 00:00:00',2,'quang@example.com','2024-05-11 21:17:14','2024-05-11 21:17:14'),('N21DCAT1006','Rosa','Nguyễn',23,'N21DCAT2','333444555','456 Đường 17','Trưởng CLB CHESS','2001-05-17 00:00:00',2,'rosa@example.com','2024-05-11 21:17:14','2024-05-11 21:17:14'),('N21DCKT1001','Faye','Trịnh',12,'N21DCKT','999666555','654 Đường 6',NULL,'2003-06-06 00:00:00',1,'faye@example.com','2024-05-11 21:13:15','2024-05-11 21:13:15'),('N21DCKT1002','Mạnh','Ngô',18,'N21DCKT','654987321','123 Đường 12',NULL,'2004-12-12 00:00:00',1,'manh@example.com','2024-05-11 21:14:13','2024-05-16 14:39:40'),('N21DCKT1003','Sơn','Lê',24,'N21DCKT','555666777','123 Đường 18','Bí thư Tự động hóa','2004-06-18 00:00:00',1,'son@example.com','2024-05-11 21:17:14','2024-05-11 21:17:14');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `students_AFTER_INSERT` AFTER INSERT ON `students` FOR EACH ROW BEGIN
 IF NEW.position IS NOT NULL THEN
        UPDATE users
        SET role_id = 3
        WHERE id = NEW.account_id;
    ELSE
        UPDATE users
        SET role_id = 2
        WHERE id = NEW.account_id;
    END IF;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `students_AFTER_UPDATE` AFTER UPDATE ON `students` FOR EACH ROW BEGIN
	  IF NEW.position IS NOT NULL THEN
        UPDATE users
        SET role_id = 3
        WHERE id = NEW.account_id;
    ELSE
        UPDATE users
        SET role_id = 2
        WHERE id = NEW.account_id;
    END if;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `university_unions`
--

DROP TABLE IF EXISTS `university_unions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `university_unions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(55) NOT NULL,
  `last_name` varchar(155) NOT NULL,
  `account_id` int NOT NULL,
  `phone` varchar(12) NOT NULL,
  `address` varchar(255) NOT NULL,
  `position` varchar(255) DEFAULT NULL,
  `mail` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_uninis_accoutn_idx` (`account_id`),
  CONSTRAINT `fk_uninis_accoutn` FOREIGN KEY (`account_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `university_unions`
--

LOCK TABLES `university_unions` WRITE;
/*!40000 ALTER TABLE `university_unions` DISABLE KEYS */;
INSERT INTO `university_unions` VALUES (1,'Nguyễn Văn','Hùng',24,'0986283842','Bình Định','Đoàn trường ','doantruong1@gmail.com','2024-05-11 21:23:03','2024-05-11 21:23:03'),(2,'Trần Văn','Bình ',25,'09729371891','Hồ Chí MInh','Đoàn trường ','doantruong@12gmail.com','2024-05-11 21:23:47','2024-05-11 21:23:47');
/*!40000 ALTER TABLE `university_unions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(15) NOT NULL,
  `role_id` int NOT NULL,
  `password` varchar(255) NOT NULL,
  `status_id` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_users_status_idx` (`status_id`),
  KEY `fk_users_role_idx` (`role_id`),
  CONSTRAINT `fk_users_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `fk_users_stau` FOREIGN KEY (`status_id`) REFERENCES `status_accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'admin',1,'$2a$12$E5zSGy7/LBEHOu/XEs5tfuq1RAC0CqMqusawlsbih3afLcTQYVLfG',1,'2024-05-11 20:40:13','2024-05-11 22:16:29'),(6,'N20DCAT1001',2,'$2a$12$S3AUlkYSWqL14wtaKeayHOfUNy3JCYWRI9ewRZYw4RWMWggHXwxtC',1,'2024-05-11 21:13:15','2024-05-11 22:42:32'),(7,'N20DCAT1002',2,'$2a$12$N7AXSnkA3Jq7FM/kQkR6q.UJ4aDazQnkQ2D3QTcKHCpDa08xmTvza',1,'2024-05-11 21:13:15','2024-05-11 22:42:32'),(8,'N21CNTT1001',2,'$2a$12$pTbjzO8tyc0Lu0MtFApHnu/uVkFRT6jEcv4JclK4KIXzZGN67o.fW',1,'2024-05-11 21:13:15','2024-05-11 22:42:32'),(9,'N21DCAT1001',2,'$2a$12$ShCzoMGD3doEpNsRxdL0POgVogKo.6MXYRwGrk/Y36xLynm/lCNuK',1,'2024-05-11 21:13:15','2024-05-11 22:42:32'),(10,'N21DCAT1002',2,'$2a$12$ZEko5lHNP7RWDnwqQba.F.414T0NXdOD.lJL2p/oljvdvJcR1YkBe',1,'2024-05-11 21:13:15','2024-05-11 22:42:32'),(11,'N21DCKT1001',2,'$2a$12$B8mDyGc1obvx8ghZz8lVZeUcJ2XUcV6LfMeaHShRfBI/h.my5tR6u',1,'2024-05-11 21:13:15','2024-05-11 22:42:32'),(12,'N20DCAT1003',2,'$2a$12$NCjuM5.chY7ogrppGbqIkuQINaCDkbAsHbliBT3yBuoBFQN8sVQb6',1,'2024-05-11 21:14:13','2024-05-11 22:42:32'),(13,'N20DCAT1004',2,'$2a$12$KneFg9kjUKH5DyMINqH20ucBff2F1ZpLiLCGodwrRbvgBnQhzb1.K',1,'2024-05-11 21:14:13','2024-05-11 22:42:32'),(14,'N21CNTT1002',2,'$2a$12$19mtSRleF8eRKtxHvm/Mb.12XdcNY3ePVgeU/disWtBPyBcBOaomO',1,'2024-05-11 21:14:13','2024-05-11 22:42:32'),(15,'N21DCAT1003',2,'$2a$12$upcuLHI2Ws5MOcHuQw7pRerdAh2FB6VOp84OI04VtdqK1UydZnJga',1,'2024-05-11 21:14:13','2024-05-11 22:42:32'),(16,'N21DCAT1004',2,'$2a$12$vOschrgKBJjBAX5Yo/z9ru/.zqPkqvYXz6m/PQQivfhDECkJA4gH2',1,'2024-05-11 21:14:13','2024-05-11 22:42:32'),(17,'N21DCKT1002',2,'$2a$12$bWi554CYc4mCTy./gqr3AOaKoR5f9Tm.KRhhzH/aZrdpcD3yfZDDO',1,'2024-05-11 21:14:13','2024-05-11 22:42:32'),(18,'N20DCAT1005',2,'$2a$12$33TGwN6Q7pxVyn9zdObVm.U4wG1TzG41E95KfhVuLUAEgQbYFw3GS',1,'2024-05-11 21:17:14','2024-05-16 14:39:40'),(19,'N20DCAT1006',3,'$2a$12$tLnwj5Ur973DUlDtyD1BW.VozwGlrut8rY4mOg5RBFnYDXPZ/HH0q',1,'2024-05-11 21:17:14','2024-05-11 22:42:32'),(20,'N21CNTT1003',3,'$2a$12$WBwNF/ZJkv5Z02m17jaJl.Fux8Nr0MbyMuuQW2lZIlaoYBB8FId7C',1,'2024-05-11 21:17:14','2024-05-11 22:42:32'),(21,'N21DCAT1005',3,'$2a$12$vFP66cibrQ1Z5f5oOfCyteBol55iWJY59f9doTolmy3/OLj4B2Iw.',1,'2024-05-11 21:17:14','2024-05-11 22:42:32'),(22,'N21DCAT1006',3,'$2a$12$0LjHjM4thuk3ETNalElFTuO9tkgJDqRtMCSr9FqJHa9rDilYBAo.O',1,'2024-05-11 21:17:14','2024-05-11 22:42:32'),(23,'N21DCKT1003',3,'$2a$12$mtc2W1OkND9cJraSaAvHnOQm0Nu0YqH54mPS4vjuL37W9WL0kizkK',1,'2024-05-11 21:17:14','2024-05-11 22:42:32'),(24,'doantruong01',4,'$2a$12$wqKx1Th3K3/53W5a5VxXX.umeRW0g0VhttiBdwSBMuKm6rZk8/the',1,'2024-05-11 21:24:41','2024-05-11 22:42:32'),(25,'doantruong02',4,'$2a$12$wHuEDqw4Nkuvckiz7/15jO62nQQuF2O.LSKV8d/rAqnwAuCgz5CDO',1,'2024-05-11 21:24:57','2024-05-11 22:42:32'),(65,'N21DCAT0d021',2,'$2a$10$zfHkH0rcD5Db829naemy/e9Nmqv61dhRgd/oTCLaoZylxFtRWE8Ky',1,'2024-05-13 06:56:53','2024-05-13 06:56:53'),(69,'N21DCAT0211',2,'$2a$10$hS0npDGAxq4c/KVQ8ryQs.OdEi3vTnhvhoy.FhywPxKBJMC10orwK',1,'2024-05-13 06:58:58','2024-05-13 06:58:58'),(70,'N21DCAT0210',2,'$2a$10$8OCiNqMCYkLLiC4wkps8HOsdRJ6FT5qArLarfjdB/mj9J.Tqy.xdK',1,'2024-05-13 07:08:25','2024-05-13 07:08:25');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'testdb'
--

--
-- Dumping routines for database 'testdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-16 16:22:23
