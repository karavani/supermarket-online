-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: supermarket
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cartID` bigint NOT NULL AUTO_INCREMENT,
  `dateOfCreation` date NOT NULL,
  `customerID` bigint NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`cartID`,`customerID`),
  KEY `FK_customerID_users_ID_idx` (`customerID`),
  CONSTRAINT `FK_customerID_users_ID` FOREIGN KEY (`customerID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,'1996-07-04',2,0),(6,'2021-03-20',2,0),(7,'2021-03-20',3,0),(8,'2021-03-20',4,0),(9,'2021-03-20',4,0),(10,'2021-03-20',4,1),(14,'2021-04-10',5,0),(15,'2021-04-10',11,0),(16,'2021-04-10',4,1),(17,'2021-04-29',4,1),(18,'2021-04-29',4,1),(19,'2021-04-29',4,1),(20,'2021-04-29',4,1),(21,'2021-05-01',4,1),(22,'2021-05-02',4,1),(23,'2021-05-02',4,1),(24,'2021-05-02',12,0),(25,'2021-05-03',3,1),(26,'2021-05-04',4,1),(27,'2021-05-06',4,1),(28,'2021-05-06',4,1),(29,'2021-05-09',4,1),(30,'2021-05-09',4,1),(31,'2021-05-09',4,1),(32,'2021-05-09',4,1),(33,'2021-05-09',4,1),(34,'2021-05-09',4,1),(35,'2021-05-09',4,1),(36,'2021-05-09',4,1),(37,'2021-05-09',4,1),(38,'2021-05-09',4,1),(39,'2021-05-09',4,1),(40,'2021-05-09',4,1),(41,'2021-05-09',4,1),(42,'2021-05-09',4,1),(43,'2021-05-09',4,1),(44,'2021-05-09',4,1),(45,'2021-05-09',4,1),(46,'2021-05-09',17,0),(47,'2021-05-09',17,0),(48,'2021-05-09',19,0),(49,'2021-05-09',20,1),(50,'2021-05-09',20,1),(51,'2021-05-09',20,0),(53,'2021-05-11',4,0);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartitem`
--

DROP TABLE IF EXISTS `cartitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartitem` (
  `itemID` bigint NOT NULL AUTO_INCREMENT,
  `productID` bigint NOT NULL,
  `quantity` int NOT NULL,
  `totalPrice` int NOT NULL,
  `cartID` bigint NOT NULL,
  PRIMARY KEY (`itemID`,`productID`,`cartID`),
  KEY `FK_productID_idx` (`productID`),
  KEY `FK_cartID_idx` (`cartID`),
  CONSTRAINT `FK_cartID` FOREIGN KEY (`cartID`) REFERENCES `cart` (`cartID`),
  CONSTRAINT `FK_productID` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`)
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartitem`
--

LOCK TABLES `cartitem` WRITE;
/*!40000 ALTER TABLE `cartitem` DISABLE KEYS */;
INSERT INTO `cartitem` VALUES (49,1,2,140,16),(52,17,3,12,16),(53,3,3,360,16),(54,2,2,90,17),(55,1,2,140,19),(56,2,1,45,19),(57,1,2,140,20),(58,2,1,45,20),(63,1,1,70,21),(64,3,2,240,22),(65,1,1,70,22),(66,7,1,5,22),(81,1,2,134,23),(83,4,3,150,23),(84,7,1,5,23),(86,4,4,200,25),(87,1,1,67,26),(90,3,1,120,26),(91,6,2,12,26),(92,1,1,67,27),(93,1,1,67,28),(94,1,1,67,29),(95,1,1,67,30),(96,6,1,6,31),(97,6,1,6,32),(98,6,1,6,33),(99,1,1,67,34),(100,1,1,67,35),(101,2,1,45,36),(102,1,1,67,36),(103,1,1,67,37),(104,1,1,67,38),(105,1,1,67,39),(106,1,1,67,40),(107,2,1,45,41),(108,1,1,67,42),(109,7,3,15,42),(110,3,1,120,42),(111,17,1,4,42),(112,19,2,20,42),(113,21,1,14,42),(114,1,1,67,43),(115,2,1,45,44),(116,3,1,120,44),(117,4,1,50,44),(118,5,2,12,44),(119,7,2,10,44),(120,6,1,6,44),(121,16,2,8,44),(122,17,3,12,44),(123,18,1,2,44),(124,6,1,6,47),(125,2,1,45,49),(126,1,1,67,50),(127,2,2,90,50),(128,21,1,15,45),(129,35,1,3,45),(131,16,2,10,45),(132,18,3,6,45),(133,17,2,8,45),(145,6,1,6,53),(147,2,1,45,53),(148,3,1,120,53);
/*!40000 ALTER TABLE `cartitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `categoryID` bigint NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(45) NOT NULL,
  PRIMARY KEY (`categoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Meat & Fish'),(2,'Dairy'),(3,'Vegetables and fruit'),(4,'Freezer'),(5,'Bread & bread spreads'),(6,'Dried Goods'),(7,'Snacks'),(8,'Care Products'),(9,'Cleaners'),(10,'Paper Goods '),(11,'Other');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderID` bigint NOT NULL AUTO_INCREMENT,
  `customerID` bigint NOT NULL,
  `cartID` bigint NOT NULL,
  `totalPrice` int NOT NULL,
  `cityToDeliver` varchar(45) NOT NULL,
  `addressToDeliver` varchar(45) NOT NULL,
  `dateToDeliver` date NOT NULL,
  `orderDate` date NOT NULL,
  `payment4LastDigits` int NOT NULL,
  PRIMARY KEY (`orderID`,`customerID`,`cartID`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,123,1,200,'Holon','Frenkal 15','1996-08-01','1996-08-01',564),(2,2,1,745,'Holon','wsged','2020-04-01','2021-03-24',451),(3,2,3,75,'Tel Aviv','wsged','2020-04-01','2021-03-24',451),(4,4,10,75,'Tel Aviv','rimon 232','2021-03-24','2021-03-24',400),(5,2,11,450,'Rehovot','Gfs','1996-08-01','1996-08-01',121),(6,2,8,1200,'Gedera','Tirat Zvi 2','2020-04-01','2019-06-01',325),(7,4,9,500,'Tveryia','Ytfed','1996-08-01','1920-08-01',118),(8,4,16,510,'Jerusalem','Frenkel 15','2021-05-27','2021-04-29',5465),(9,4,16,582,'Jerusalem','Frenkel 15','2021-05-29','2021-04-29',5465),(10,4,16,512,'Haifa','k;naskldn','2021-05-29','2021-04-29',5465),(11,4,16,512,'Haifa','Frenkel 15','2021-05-27','2021-04-29',5465),(12,4,16,512,'Jerusalem','Frenkel 15','2021-05-27','2021-04-29',5465),(14,4,17,180,'Haifa','Frenkel 15','2021-05-29','2021-04-29',6465),(15,4,18,0,'Jerusalem','Frenkel 15','2021-05-12','2021-04-29',5465),(16,4,19,185,'Jerusalem','Frenkel 15','2021-05-12','2021-04-29',5465),(17,4,20,185,'Be\'er Sheva','Frenkel 15','2021-05-12','2021-04-29',5465),(18,4,21,70,'Jerusalem','Frenkel 15','2021-05-09','2021-05-02',5465),(19,4,22,315,'Holon','Frenkel 15','2021-05-10','2021-05-02',5465),(20,3,25,200,'Tel Aviv','Tel-Hai 7','2020-05-21','2021-05-03',4565),(21,4,25,200,'Tel Aviv','Tel-Hai 7','2021-05-12','2021-05-03',4565),(22,4,23,289,'Jerusalem','Frenkel 15','2021-05-18','2021-05-04',8657),(23,4,26,199,'Jerusalem','Frenkel 15','2021-05-25','2021-05-06',8657),(24,4,27,67,'Haifa','sq 31','2021-05-18','2021-05-06',8657),(25,4,28,67,'Tel Aviv','Frenkel 15','2021-05-24','2021-05-09',8657),(26,4,29,67,'Be\'er Sheva','Frenkel 15','2021-05-24','2021-05-09',8657),(27,4,30,67,'Haifa','Frenkel 15','2021-05-24','2021-05-09',8657),(28,4,31,6,'Be\'er Sheva','Frenkel 15','2021-05-18','2021-05-09',8657),(29,4,32,6,'Haifa','s','2021-05-19','2021-05-09',8657),(30,4,33,6,'Haifa','Frenkel 15','2021-05-19','2021-05-09',8657),(31,4,34,67,'Haifa','Frenkel 15','2021-05-25','2021-05-09',8657),(32,4,35,67,'Haifa','Frenkel 15','2021-05-19','2021-05-09',8657),(33,4,36,112,'Haifa','Frenkel 15','2021-05-22','2021-05-09',8657),(34,4,37,67,'Be\'er Sheva','sw','2021-05-22','2021-05-09',8657),(35,4,38,67,'Be\'er Sheva','Frenkel 15','2021-05-11','2021-05-09',8657),(36,4,39,67,'Be\'er Sheva','Frenkel 15','2021-07-19','2021-05-09',8657),(37,4,40,67,'Haifa','Frenkel 15','2021-07-19','2021-05-09',8657),(38,4,41,45,'Be\'er Sheva','Frenkel 15','2021-07-20','2021-05-09',8657),(39,4,42,240,'Haifa','Frenkel 15','2021-07-12','2021-05-09',8657),(40,4,43,67,'Haifa','Frenkel 15','2021-07-20','2021-05-09',8657),(41,4,44,265,'Jerusalem','Frenkel 15','2021-07-27','2021-05-09',8657),(42,20,49,45,'Haifa','Allenby 128','2021-05-11','2021-05-09',8657),(43,20,50,157,'Tel Aviv','Allenby 128','2021-05-26','2021-05-09',8657),(44,4,45,42,'Jerusalem','Frenkel 15','2021-05-17','2021-05-11',8657);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productID` bigint NOT NULL AUTO_INCREMENT,
  `productName` varchar(45) NOT NULL,
  `categoryID` bigint NOT NULL,
  `price` int NOT NULL,
  `imageURL` varchar(245) NOT NULL,
  PRIMARY KEY (`productID`,`categoryID`),
  KEY `FK_categorieID_idx` (`categoryID`),
  CONSTRAINT `FK_categoryID` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`categoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'lamb',1,67,'https://www.wholesalemeatsdirect.co.nz/wp-content/uploads/lamb-leg.png'),(2,'chicken',1,45,'https://5.imimg.com/data5/VE/WI/MY-2581770/frozen-chicken-500x500.jpg'),(3,'steak',1,120,'https://d3ar0cfl4379w2.cloudfront.net/jousun-uploads/large/product/BSF0556.jpg'),(4,'fish',1,50,'https://www.paskovich.co.il/Warehouse/catalog/items/c83cf2e5-889d-42ff-aee0-a132c4f3cddf.jpg'),(5,'cottage',2,6,'https://www.tnuva.co.il/uploads/f_5d009919e3df6_1560320281.jpg'),(6,'milk',2,6,'https://www.one-office.co.il/wp-content/uploads/2018/06/7290000042442.jpg'),(7,'Curd Cheese',2,5,'https://www.shukhakarmel.co.il/wp-content/uploads/2021/02/renditionDownload-2021-02-01T134249.882-300x300.jpg'),(16,'Tomato',3,5,'https://cdn.shopify.com/s/files/1/0244/4961/3905/products/tomato@2x.jpg?v=1576807420'),(17,'cucumber',3,4,'https://www.freshpoint.com/wp-content/uploads/2020/02/freshpoint-english-cucumber-scaled.jpg'),(18,'onion',3,2,'https://www.nydailynews.com/resizer/BTX_xK-CVPTWFJFaQ8_tKBpqRfM=/1200x0/center/bottom/cloudfront-us-east-1.images.arcpublishing.com/tronc/YKLWDFKDVVCNHHB3DAYOOFLG7I.jpg'),(19,'banana',3,10,'https://www.kroger.com/product/images/large/front/0000000004011'),(20,'apple',3,8,'https://s3-us-west-2.amazonaws.com/melingoimages/Images/4315.jpg'),(21,'White Bread',5,15,'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00078700014917/373cd75e6b349fcd01c6c6f48cfade73_large.png&width=256&type=webp&quality=40'),(22,'Pita',5,5,'https://virtualsupermarket.virtualmartja.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/t/o/toufayan-pita-whole-wheat-bread-340gm.jpg'),(23,'Bagel',5,18,'https://images.freshop.com/00072220100167/ea9fed3abab1157806e0b0154cba7d33_medium.png'),(25,'Soap',9,10,'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00074182445270/8f579bb3b8aa3bf1149974896892cb94_large.png&width=256&type=webp&quality=40'),(33,'Dishwashing Liquid',9,13,'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00037000222743/bd09cb0904100ee116a201e8764f7d13_large.png&width=256&type=webp&quality=80'),(34,'White Sugar',6,4,'https://images-na.ssl-images-amazon.com/images/I/51pV7ad3LjL._SX425_.jpg'),(35,'Table Salt',6,3,'https://www.school-market.co.il/src.ashx?p=2&f=3361x634994561135504400_L.jpg&w=210&h=210&t=1'),(36,'Flour',6,6,'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00071012010509/5290612f388a06b61df58a987386e4f7_large.png&width=256&type=webp&quality=40'),(37,'Cheetos',7,4,'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00028400020640/b749cedb0f33154e3bde74c0f73120d4_large.png&width=256&type=webp&quality=80'),(38,'Pringels',7,12,'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00038000175930/4becfbd1210616ce14afcad1eff0e2e1_large.png&width=256&type=webp&quality=40'),(39,'Oreo dip',7,10,'https://cdn.shopify.com/s/files/1/0295/8121/3801/products/6c09b6c5ea4925d7d8927de6f4f8f42e_480x480.png?v=1615495889'),(40,'Wheat Thins',7,11,'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00044000069230/2607086682cfcd7a626689cfec152811_large.png&width=256&type=webp&quality=80');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(145) NOT NULL,
  `personalID` bigint NOT NULL,
  `password` varchar(145) NOT NULL,
  `city` varchar(145) NOT NULL,
  `address` varchar(145) NOT NULL,
  `userType` varchar(45) NOT NULL,
  PRIMARY KEY (`id`,`email`,`personalID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'gul','fadi','gulfadi@gmail.com',123,'c5724ea9a640e3c2fcd919dd989f0759','zarka','tifschaj','customer'),(3,'noam','karavani','karavani@gmail.com',156156,'c5724ea9a640e3c2fcd919dd989f0759','Tel Aviv','Frenkel 15','admin'),(4,'Noam','K','noam12882@gmail.com',222222,'16f0592fd36e3fc86371523da53f12f6','Haifa','Frenkel 15','customer'),(5,'Noam','Karavani','noam12881@walla.co.il',2222222,'16f0592fd36e3fc86371523da53f12f6','Tel Aviv','Frenkel 15','customer'),(6,'nosa','ksa','noam128211@gmail.com',5454,'c5724ea9a640e3c2fcd919dd989f0759','Haifa','Frenkel 15','customer'),(7,'Noam','fsaasfa','gofof@walla.com',515156,'c5724ea9a640e3c2fcd919dd989f0759','Tel Aviv','Frenkel 15','customer'),(8,'nosa','ksa','noam12@walla.com',55454,'8155c61ac2e69a443cbcbc263a1dcf4b','Haifa','Frenkel 15','customer'),(9,'wq','ksa','noar@walla.ocm',54651,'c5724ea9a640e3c2fcd919dd989f0759','Jeruslam','Frenkel 15','customer'),(10,'GILI','asqw','vas231@walla.com',23132132,'16f0592fd36e3fc86371523da53f12f6','Rishon LeZion','sqa','customer'),(11,'sqqs','qsq','s1q1@walla.com',123123,'8db574cfab2b80463025b8d9208195ad','Jeruslam','dsad','customer'),(12,'boli','voli','ba@wa.cmo',588888,'c5724ea9a640e3c2fcd919dd989f0759','Tel Aviv','Frenkel 15','customer'),(13,'Yael','Levi','yeali@gmail.com',123456789,'c5724ea9a640e3c2fcd919dd989f0759','Holon','Rimon 12','customer'),(14,'vww','wvv','nra@walla.com',541651,'2a3e4b095b42033b0b3e9677d4f8e53a','Be\'er Sheva','www','customer'),(15,'wwww','wwww','noam12882@gmail.com',12882,'f1cf8decd414cc2d4bd5b517a95d1288','Be\'er Sheva','wwww','customer'),(16,'bfbf','bfbf','noam12882@gmail.com',12312,'f1cf8decd414cc2d4bd5b517a95d1288','Be\'er Sheva','reew','customer'),(17,'Babbilon','Role them','babbilon@gmail.com',321324584,'6aebf27a66b416dbd0fd029094e8857f','Haifa','Massit 9','customer'),(18,'Ba','Bi','ba@baba.com',1328685441894,'98640e439504f14710c33fd646fd3a49','Jerusalem','Gilboah 26','customer'),(19,'Frank','Gold','frank@walla.com',14251425,'5d3e8bedbdb64c8309809108993dcf23','Be\'er Sheva','Gefen 22','customer'),(20,'Cris','Levi','cris@gmail.com',742541989,'4ba83c2a88cf4c07e0ad314e82f7e7ed','Tel Aviv','Allenby 128','customer');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-12 14:10:22
