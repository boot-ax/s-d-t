-- MySQL dump 10.13  Distrib 5.7.17, for Linux (x86_64)
--
-- Host: localhost    Database: zipps
-- ------------------------------------------------------
-- Server version	5.7.17-0ubuntu0.16.04.1-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `W2_accounts`
--

DROP TABLE IF EXISTS `W2_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `W2_accounts` (
  `login_url_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `login` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_ID` int(11) DEFAULT NULL,
  `attached_domain` varchar(253) DEFAULT NULL,
  `W2_ID` int(11) NOT NULL AUTO_INCREMENT,
  `account_ID` int(11) NOT NULL,
  PRIMARY KEY (`W2_ID`),
  KEY `fk_W2_accounts_person` (`user_ID`),
  KEY `w2-to-account_idx` (`account_ID`),
  CONSTRAINT `user_to_reg` FOREIGN KEY (`user_ID`) REFERENCES `registration` (`user_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `w2-to-account` FOREIGN KEY (`account_ID`) REFERENCES `account` (`account_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `W2_accounts`
--

LOCK TABLES `W2_accounts` WRITE;
/*!40000 ALTER TABLE `W2_accounts` DISABLE KEYS */;
INSERT INTO `W2_accounts` VALUES ('directv.com','cycorson@gmail.com','mulchaTNA1313','directv.com',33,NULL,94,201111);
/*!40000 ALTER TABLE `W2_accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `account_ID` int(11) NOT NULL AUTO_INCREMENT,
  `account_name` varchar(255) DEFAULT NULL,
  `stripe_customer_ID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`account_ID`),
  UNIQUE KEY `stripe_customer_ID_UNIQUE` (`stripe_customer_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=201113 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (201110,'superuser','stripe1'),(201111,'Search Explosion','stripe2'),(201112,'tester','stripe3');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity` (
  `activity_target_url_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `domain` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `type` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `date` date DEFAULT NULL,
  `activity_ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`activity_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `change_log`
--

DROP TABLE IF EXISTS `change_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `change_log` (
  `issue` text NOT NULL,
  `date_entered` date DEFAULT NULL,
  `completed` varchar(8) DEFAULT NULL,
  `user_ID` int(11) DEFAULT NULL,
  `change_log_ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`change_log_ID`),
  KEY `person_idx` (`user_ID`),
  CONSTRAINT `change_to_reg` FOREIGN KEY (`user_ID`) REFERENCES `registration` (`user_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `change_log`
--

LOCK TABLES `change_log` WRITE;
/*!40000 ALTER TABLE `change_log` DISABLE KEYS */;
INSERT INTO `change_log` VALUES ('Put sort arrows on left side of table headers for all but first entry.   --Update, use md-numeric and it does but it right aligns the cell.','2017-01-13','Yes',NULL,6),('Change max entry numbers to match database.','2017-01-13','Yes',NULL,7),('Need Toast Setup for Cell Editing','2017-01-13','Yes',NULL,8),('Possibly make a service for all of the lists being generated on the fly right now.   If a new item is entered then it will update list otherwise be pulled when loaded and be static.','2017-01-13','No',30,13),('Add bulk import to URL tab','2017-01-13','No',30,15),('Add stuck table header.  https://github.com/daniel-nagy/fixed-table-header','2017-01-14','No',30,16),('Add token authentication   https://docs.angularjs.org/api/ng/service/$http','2017-01-23','No',30,17),('Update Change Log page to drop completed tasks to bottom and change their CSS','2017-01-23','No',30,18),('Update database with foreign key constraints.','2017-01-23','Yes',NULL,20),('Add size retrictions to input dialogs','2017-01-23','No',30,21),('confirm saving or overwriting data   --   I think I have this one complete.','2017-01-23','Yes',NULL,22),('What about 2 or more people who have valid accounts on the exact same URL for the exact same account?  is this going to cause a primary key issue?','2017-01-25','No',31,23),('Search function across multiple tables, is that an option? ','2017-01-25','No',31,24),('Add fields for Wordpress User/Pass and C-Panel Address And User/Pass','2017-01-31','No',32,36),('tracking.webwright.io Login Password','2017-02-09','Yes',NULL,42),('Set default views on all tabs to 15','2017-02-22','Yes',NULL,43),('Add 30, 45 to views on each tab','2017-02-22','Yes',NULL,44),('Add a tab for keeping track of License Keys','2017-02-22','No',31,45);
/*!40000 ALTER TABLE `change_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_login`
--

DROP TABLE IF EXISTS `cms_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_login` (
  `install_site_url_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `domain_ID` int(11) NOT NULL,
  `login_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `recovery_email` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cpanel_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `cpanel_username` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cpanel_password` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `install_site_url_ID` int(11) NOT NULL AUTO_INCREMENT,
  `account_ID` int(11) NOT NULL,
  PRIMARY KEY (`install_site_url_ID`),
  KEY `fk_cms_login_url_data_1` (`domain_ID`),
  KEY `cms-to-account_idx` (`account_ID`),
  CONSTRAINT `cms-to-account` FOREIGN KEY (`account_ID`) REFERENCES `account` (`account_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `domain-key` FOREIGN KEY (`domain_ID`) REFERENCES `domains` (`domain_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_login`
--

LOCK TABLES `cms_login` WRITE;
/*!40000 ALTER TABLE `cms_login` DISABLE KEYS */;
INSERT INTO `cms_login` VALUES ('www.siteframe.org',24,'www.siteframe.org/wp-admin','empire','@7%QXyw3h@2QGbsUb9#XCftb','','','','',1,201111),('www.siteframe.org',24,'www.siteframe.org/wp-admin','polly','EzB*0zi3JgW5vRMeMa9*zpDr',NULL,NULL,NULL,NULL,3,201111),('www.viceteam.org',25,'www.viceteam.org/wp-admin','polly','rxW&(1%4e^(kkLek9I@nfUnW',NULL,NULL,NULL,NULL,4,201111),('pageflakes.com',26,'pageflakes.com/wp-admin','tougherthentherest','uCBBX%SoCHRpUzchqGP$I)VF','josiah@pageflakes.com',NULL,NULL,NULL,5,201111),('sites.webwright.io',27,'sites.webwright.io/wp-admin','13thfletch','LlQMg6Y4MHYPMI#V!ru(np3J','fletch@webwright.io',NULL,NULL,NULL,6,201111),('webwright.io',27,'server root','webwright','7)DqQV8S].hJ8_X:',NULL,NULL,NULL,NULL,8,201111),('sites.webwright.io',27,'server app','mainwp','9E;)epe@H5B/H9=T',NULL,NULL,NULL,NULL,9,201111),('ranktracker.webwright.io',27,'server app','serposcope','>=b(j9AXPZCZ7Fk%',NULL,'serposcope','8eeae0403721','7f7b124de23a50c9',10,201111),('tracking.webwright.io',27,'server app','piwik','>Z)V4KW-S)7>Qk:w',NULL,'piwik','ce475b52fafd','7ff2fed33682c552',11,201111),('zipps.webwright.io',27,'server app','zipps','p@g2Z\'Mn^c<Hb’X2',NULL,'zipps','3fa9b896c59d','4a6787a96950cbea',14,201111),('searchexplosion.com',28,'https://www.searchexplosion.com/wplogin','e1u82g','SmallBatch32@*','13thfletch@gmail.com',NULL,NULL,NULL,15,201111),('http://silvertonpoetry.org',29,'silvertonpoetry.org/wploginpoet','silverpoet2','B94gQTY6N1MZX0quF(x2dCg6',NULL,NULL,NULL,NULL,16,201111),('dev.webwright.io',27,'server app','zipps','p@g2Z\'Mn^c<Hb’X2',NULL,'zipps','3fa9b896c59d','4a6787a96950cbea',17,201111),('ranktracker.webwright.io',27,'ranktracker.webwright.io','fletch@searchexplosion.com','cowboy25',NULL,NULL,NULL,NULL,21,201111),('cinexs.com',37,'cinexs.com/wp-admin','ollie','%B5UR@48@Z',NULL,NULL,NULL,NULL,22,201111),('tracking.webwright.io',27,'tracking.webwright.io','13thfletch','cowboy25',NULL,NULL,NULL,NULL,23,201111),('tester',25,'dsa','asdf','asdf','asdf','asdf',NULL,NULL,24,201112);
/*!40000 ALTER TABLE `cms_login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domains`
--

DROP TABLE IF EXISTS `domains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `domains` (
  `domain_name` varchar(253) NOT NULL,
  `ip_address` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nameserver_1` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ns1_ip` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nameserver_2` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ns2_ip` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nameserver_3` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ns3_ip` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_purchased` date DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `registrar_ID` int(11) DEFAULT NULL,
  `hosting_ID` int(11) DEFAULT NULL,
  `registrar_301` text,
  `registrar_301_target` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `whois_protected` varchar(10) DEFAULT NULL,
  `domain_ID` int(11) NOT NULL AUTO_INCREMENT,
  `account_ID` int(11) NOT NULL,
  PRIMARY KEY (`domain_ID`,`domain_name`),
  UNIQUE KEY `domain_name_UNIQUE` (`domain_name`),
  KEY `fk_domain_registrar_registrar_accounts_1` (`registrar_ID`),
  KEY `fk_domain_registrar_hosting_accounts_1` (`hosting_ID`),
  KEY `d_to_account_idx` (`account_ID`),
  CONSTRAINT `d_to_account` FOREIGN KEY (`account_ID`) REFERENCES `account` (`account_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `host-key` FOREIGN KEY (`hosting_ID`) REFERENCES `hosting` (`hosting_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `registrar-key` FOREIGN KEY (`registrar_ID`) REFERENCES `registrar` (`registrar_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domains`
--

LOCK TABLES `domains` WRITE;
/*!40000 ALTER TABLE `domains` DISABLE KEYS */;
INSERT INTO `domains` VALUES ('siteframe.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-01-18','2017-01-18',6,7,NULL,NULL,'Yes',24,201111),('viceteam.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-01-21','2017-01-21',6,7,NULL,NULL,'Yes',25,201111),('pageflakes.com','',NULL,NULL,NULL,NULL,NULL,NULL,'2014-10-15','2017-01-22',6,7,NULL,NULL,'Yes',26,201111),('webwright.io','45.55.50.204','ns1.digitalocean.com.','173.245.58.51','ns2.digitalocean.com.',' 173.245.59.41','ns3.digitalocean.com.','198.41.222.173','2017-01-22','2017-01-22',6,7,NULL,NULL,'Yes',27,201111),('searchexplosion.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2014-05-14','2017-01-25',7,7,NULL,NULL,'No',28,201111),('silvertonpoetry.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-01-25','2017-01-25',6,9,NULL,NULL,'Yes',29,201111),('greensburgracquetclub.com','31.204.152.99','ns1.kalblast.net','31.204.152.99','ns2.kalblast.net','31.204.152.99',NULL,NULL,'2017-01-31','2017-01-31',6,9,NULL,NULL,'Yes',33,201110),('cinexs.com',NULL,NULL,'166.62.110.213',NULL,NULL,NULL,NULL,'2017-02-22','2017-02-22',6,7,NULL,NULL,'Yes',37,201111),('tester','t','t','t','t','t','t','t','2017-03-11','2017-03-11',8,3,'a','s','Yes',38,201112);
/*!40000 ALTER TABLE `domains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frog_change_table`
--

DROP TABLE IF EXISTS `frog_change_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frog_change_table` (
  `date` datetime NOT NULL,
  `change_table_ID` int(11) NOT NULL AUTO_INCREMENT,
  `frog_data_ID` int(11) DEFAULT NULL,
  `url_hash` char(32) DEFAULT NULL,
  PRIMARY KEY (`change_table_ID`),
  KEY `frog_change_key_idx` (`frog_data_ID`),
  CONSTRAINT `frog_change_key` FOREIGN KEY (`frog_data_ID`) REFERENCES `frog_data` (`frog_data_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frog_change_table`
--

LOCK TABLES `frog_change_table` WRITE;
/*!40000 ALTER TABLE `frog_change_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `frog_change_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frog_data`
--

DROP TABLE IF EXISTS `frog_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frog_data` (
  `url_name` text NOT NULL,
  `date_crawled` date NOT NULL,
  `url_encoded_address` varchar(2082) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status_code` varchar(382) DEFAULT NULL,
  `status` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `size` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title_1` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description_1` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `h1-1` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `h2-1` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `h2-2` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_robots_1` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `canonical_link_element_1` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `http_canonical` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `word_count` int(11) DEFAULT NULL,
  `level` varchar(382) DEFAULT NULL,
  `inlinks` int(11) DEFAULT NULL,
  `outlinks` int(11) DEFAULT NULL,
  `local_business_schema` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `domain_crawled_ID` int(255) DEFAULT NULL,
  `url_crawled_ID` int(11) DEFAULT NULL,
  `url_hash` char(32) NOT NULL,
  `frog_data_ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`frog_data_ID`),
  KEY `fk_url_data_domain` (`domain_crawled_ID`),
  KEY `frog-url-key_idx` (`url_hash`),
  CONSTRAINT `frog-url-key` FOREIGN KEY (`url_hash`) REFERENCES `url_data` (`url_hash`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frog_data`
--

LOCK TABLES `frog_data` WRITE;
/*!40000 ALTER TABLE `frog_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `frog_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hosting`
--

DROP TABLE IF EXISTS `hosting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hosting` (
  `hosting_name` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `login_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_started` date DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `creditcard_last_4` smallint(4) NOT NULL DEFAULT '0',
  `setup_domain` varchar(282) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hosting_ID` int(11) NOT NULL AUTO_INCREMENT,
  `account_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`hosting_ID`,`hosting_name`),
  KEY `host-to-account_idx` (`account_ID`),
  CONSTRAINT `host-to-account` FOREIGN KEY (`account_ID`) REFERENCES `account` (`account_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hosting`
--

LOCK TABLES `hosting` WRITE;
/*!40000 ALTER TABLE `hosting` DISABLE KEYS */;
INSERT INTO `hosting` VALUES ('ip Networx','cp.ip-networx.com','13thfletch@gmail.com','AH3-XFd-*Ya!','2017-01-06','2017-02-16',7787,'greensburgracquetclub.com',2,201111),('SeoHosting.com','https://customers.seohosting.com/clientarea.php','13thfletch','My2Dogs!','2013-05-25','2016-11-25',7787,'insulationphoenixaz.com',3,201111),('Digital Ocean','Need to Enter','fletch@searchexplosion.com','SmallBatch32@','2017-01-18','2017-01-18',0,NULL,7,201111),('nonameinternet.com','https://www.nonameinternet.com/portal/clientarea.php','fletch@searchexplosion.com','My2Dogs!','2017-01-25','2017-01-25',7787,NULL,9,201111),('Godaddy','godaddy.com','68759966','mulchaTNA1313','2017-02-22','2017-12-22',7787,'cinexs.com',15,201111);
/*!40000 ALTER TABLE `hosting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keyword_ranking`
--

DROP TABLE IF EXISTS `keyword_ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keyword_ranking` (
  `keyword_name` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `domain_ID` int(11) DEFAULT NULL,
  `url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `date` date NOT NULL,
  `google_maps_rank` smallint(6) DEFAULT NULL,
  `google_organic_rank` smallint(6) DEFAULT NULL,
  `keywrd_ranking_ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`keywrd_ranking_ID`),
  KEY `fk_keyword_ranking_domain` (`domain_ID`),
  CONSTRAINT `rank-to-domain-key` FOREIGN KEY (`domain_ID`) REFERENCES `domains` (`domain_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keyword_ranking`
--

LOCK TABLES `keyword_ranking` WRITE;
/*!40000 ALTER TABLE `keyword_ranking` DISABLE KEYS */;
/*!40000 ALTER TABLE `keyword_ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `links`
--

DROP TABLE IF EXISTS `links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `links` (
  `source_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `target_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `anchor_text` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alt_text` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `follow_link` varchar(10) DEFAULT NULL,
  `date_created` date NOT NULL,
  `comment` text,
  `link_ID` int(11) NOT NULL AUTO_INCREMENT,
  `account_ID` int(11) NOT NULL,
  PRIMARY KEY (`link_ID`),
  KEY `links-to-account_idx` (`account_ID`),
  CONSTRAINT `links-to-account` FOREIGN KEY (`account_ID`) REFERENCES `account` (`account_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `links`
--

LOCK TABLES `links` WRITE;
/*!40000 ALTER TABLE `links` DISABLE KEYS */;
INSERT INTO `links` VALUES ('33111','331','33','dd33','33','Yes','2017-01-28','33',7,201111);
/*!40000 ALTER TABLE `links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `majestic_change_table`
--

DROP TABLE IF EXISTS `majestic_change_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `majestic_change_table` (
  `url_hash` char(32) NOT NULL,
  `change_date` datetime NOT NULL,
  `majestic_metrics_ID` int(11) NOT NULL,
  `change_table_ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`change_table_ID`),
  KEY `fj_maj_change_metrics_idx` (`majestic_metrics_ID`),
  CONSTRAINT `fj_maj_change_metrics` FOREIGN KEY (`majestic_metrics_ID`) REFERENCES `majestic_metrics` (`majestic_metrics_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `majestic_change_table`
--

LOCK TABLES `majestic_change_table` WRITE;
/*!40000 ALTER TABLE `majestic_change_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `majestic_change_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `majestic_metrics`
--

DROP TABLE IF EXISTS `majestic_metrics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `majestic_metrics` (
  `majestic_url_name` text NOT NULL,
  `trust_flow` tinyint(4) DEFAULT NULL,
  `citation_flow` tinyint(4) DEFAULT NULL,
  `majestic_num_links` int(11) DEFAULT NULL,
  `maj_date` date NOT NULL,
  `url_hash` char(32) NOT NULL,
  `majestic_metrics_ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`majestic_metrics_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `majestic_metrics`
--

LOCK TABLES `majestic_metrics` WRITE;
/*!40000 ALTER TABLE `majestic_metrics` DISABLE KEYS */;
/*!40000 ALTER TABLE `majestic_metrics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ose_change_table`
--

DROP TABLE IF EXISTS `ose_change_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ose_change_table` (
  `date_crawled` datetime NOT NULL,
  `ose_metrics_ID` int(11) DEFAULT '0',
  `change_table_ID` int(11) NOT NULL AUTO_INCREMENT,
  `url_hash` char(32) DEFAULT NULL,
  PRIMARY KEY (`change_table_ID`),
  KEY `ose_change_to_metrics_idx` (`ose_metrics_ID`),
  CONSTRAINT `ose_change_to_metrics` FOREIGN KEY (`ose_metrics_ID`) REFERENCES `ose_metrics` (`ose_metrics_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=543 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ose_change_table`
--

LOCK TABLES `ose_change_table` WRITE;
/*!40000 ALTER TABLE `ose_change_table` DISABLE KEYS */;
INSERT INTO `ose_change_table` VALUES ('2017-02-15 21:21:44',0,2,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-15 21:21:44',0,3,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-15 21:21:44',0,4,'393a18c4f1896d590fec663745d39e7f'),('2017-02-15 21:21:44',0,5,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-15 21:21:44',0,6,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-15 21:21:44',0,7,'6f9d83403db65a86c58db0c55ece2798'),('2017-02-15 21:21:44',0,8,'735c2fc32fc000bbd862773412267f84'),('2017-02-15 21:21:44',0,9,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-15 21:21:44',0,10,'c984d06aafbecf6bc55569f964148ea3'),('2017-02-15 21:21:44',0,11,'e507831e7c820e43ebe652166456fadb'),('2017-02-15 21:30:04',0,12,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-15 21:30:04',0,13,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-15 21:30:04',0,14,'393a18c4f1896d590fec663745d39e7f'),('2017-02-15 21:30:04',0,15,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-15 21:30:04',0,16,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-15 21:30:04',0,17,'6f9d83403db65a86c58db0c55ece2798'),('2017-02-15 21:30:04',0,18,'735c2fc32fc000bbd862773412267f84'),('2017-02-15 21:30:04',0,19,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-15 21:30:04',0,20,'c984d06aafbecf6bc55569f964148ea3'),('2017-02-15 21:30:04',0,21,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 00:18:29',0,22,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 00:18:29',0,23,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 00:18:29',0,24,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 00:18:29',0,25,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 00:18:29',0,26,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 00:18:29',0,27,'6f9d83403db65a86c58db0c55ece2798'),('2017-02-16 00:18:29',0,28,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 00:18:29',0,29,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 00:18:29',0,30,'c984d06aafbecf6bc55569f964148ea3'),('2017-02-16 00:18:29',0,31,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 00:22:15',0,32,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 00:26:44',0,33,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 00:30:10',0,34,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 00:33:55',0,35,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 00:46:05',0,36,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 00:47:52',0,37,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 00:52:40',0,38,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 00:54:09',0,39,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 00:55:27',13,40,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 00:55:27',14,41,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 00:55:27',15,42,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 00:55:27',16,43,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 00:55:27',17,44,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 00:55:27',18,45,'6f9d83403db65a86c58db0c55ece2798'),('2017-02-16 00:55:27',19,46,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 00:55:27',20,47,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 00:55:27',21,48,'c984d06aafbecf6bc55569f964148ea3'),('2017-02-16 00:55:27',22,49,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 00:59:33',23,50,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 00:59:33',24,51,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 00:59:33',25,52,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 00:59:33',26,53,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 00:59:33',27,54,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 00:59:33',28,55,'6f9d83403db65a86c58db0c55ece2798'),('2017-02-16 00:59:33',29,56,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 00:59:33',30,57,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 00:59:33',31,58,'c984d06aafbecf6bc55569f964148ea3'),('2017-02-16 00:59:33',32,59,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 01:01:39',33,60,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 01:01:39',34,61,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 01:01:39',35,62,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 01:01:39',36,63,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 01:01:39',37,64,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 01:01:39',38,65,'6f9d83403db65a86c58db0c55ece2798'),('2017-02-16 01:01:39',39,66,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 01:01:39',40,67,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 01:01:39',41,68,'c984d06aafbecf6bc55569f964148ea3'),('2017-02-16 01:01:39',42,69,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 01:11:28',43,70,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 01:11:28',44,71,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 01:11:28',45,72,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 01:11:28',46,73,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 01:11:28',47,74,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 01:11:28',48,75,'6f9d83403db65a86c58db0c55ece2798'),('2017-02-16 01:11:28',49,76,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 01:11:28',50,77,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 01:11:28',51,78,'c984d06aafbecf6bc55569f964148ea3'),('2017-02-16 01:11:28',52,79,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 01:15:41',53,80,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 01:15:41',54,81,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 01:15:41',55,82,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 01:15:41',56,83,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 01:15:41',57,84,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 01:15:41',58,85,'6f9d83403db65a86c58db0c55ece2798'),('2017-02-16 01:15:41',59,86,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 01:15:41',60,87,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 01:15:41',61,88,'c984d06aafbecf6bc55569f964148ea3'),('2017-02-16 01:15:41',62,89,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 01:20:21',63,90,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 01:20:21',64,91,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 01:20:21',65,92,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 01:20:21',66,93,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 01:20:21',67,94,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 01:20:21',68,95,'6f9d83403db65a86c58db0c55ece2798'),('2017-02-16 01:20:21',69,96,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 01:20:21',70,97,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 01:20:21',71,98,'c984d06aafbecf6bc55569f964148ea3'),('2017-02-16 01:20:21',72,99,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 01:28:57',73,100,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 01:28:57',74,101,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 01:28:57',75,102,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 01:28:57',76,103,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 01:28:57',77,104,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 01:28:57',78,105,'6f9d83403db65a86c58db0c55ece2798'),('2017-02-16 01:28:57',79,106,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 01:28:57',80,107,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 01:28:57',81,108,'c984d06aafbecf6bc55569f964148ea3'),('2017-02-16 01:28:57',82,109,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 01:36:33',83,110,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 01:36:33',84,111,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 01:36:33',85,112,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 01:36:33',86,113,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 01:36:33',87,114,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 01:36:33',88,115,'6f9d83403db65a86c58db0c55ece2798'),('2017-02-16 01:36:33',89,116,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 01:36:33',90,117,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 01:36:33',91,118,'c984d06aafbecf6bc55569f964148ea3'),('2017-02-16 01:36:33',92,119,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 01:50:20',93,120,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 01:50:20',94,121,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 01:50:20',95,122,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 01:50:20',96,123,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 01:50:20',97,124,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 01:50:20',98,125,'6f9d83403db65a86c58db0c55ece2798'),('2017-02-16 01:50:20',99,126,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 01:50:20',100,127,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 01:50:20',101,128,'c984d06aafbecf6bc55569f964148ea3'),('2017-02-16 01:50:20',102,129,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 01:58:50',103,130,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 01:58:50',104,131,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 01:58:50',105,132,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 01:58:50',106,133,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 01:58:50',107,134,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 01:58:50',108,135,'6f9d83403db65a86c58db0c55ece2798'),('2017-02-16 01:58:50',109,136,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 01:58:50',110,137,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 01:58:50',111,138,'c984d06aafbecf6bc55569f964148ea3'),('2017-02-16 01:58:50',112,139,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 01:59:26',0,140,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 01:59:26',0,141,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 01:59:26',0,142,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 01:59:26',0,143,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 01:59:26',0,144,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 01:59:26',0,145,'6f9d83403db65a86c58db0c55ece2798'),('2017-02-16 01:59:26',0,146,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 01:59:26',0,147,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 01:59:26',0,148,'c984d06aafbecf6bc55569f964148ea3'),('2017-02-16 01:59:26',0,149,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 02:01:43',0,150,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 02:01:43',0,151,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 02:01:43',0,152,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 02:01:43',0,153,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 02:01:43',0,154,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 02:01:43',0,155,'6f9d83403db65a86c58db0c55ece2798'),('2017-02-16 02:01:43',0,156,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 02:01:43',0,157,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 02:01:43',0,158,'c984d06aafbecf6bc55569f964148ea3'),('2017-02-16 02:01:43',0,159,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 02:03:23',103,160,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 02:03:23',104,161,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 02:03:23',105,162,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 02:03:23',106,163,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 02:03:23',107,164,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 02:03:23',108,165,'6f9d83403db65a86c58db0c55ece2798'),('2017-02-16 02:03:23',109,166,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 02:03:23',110,167,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 02:03:23',111,168,'c984d06aafbecf6bc55569f964148ea3'),('2017-02-16 02:03:23',112,169,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 02:35:07',143,170,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 02:35:07',144,171,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 02:35:07',145,172,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 02:35:07',146,173,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 02:35:07',147,174,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 02:35:07',148,175,'6f9d83403db65a86c58db0c55ece2798'),('2017-02-16 02:35:07',149,176,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 02:37:15',143,177,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 02:37:15',144,178,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 02:37:15',145,179,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 02:37:15',146,180,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 02:37:15',147,181,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 02:37:15',148,182,'6f9d83403db65a86c58db0c55ece2798'),('2017-02-16 02:37:15',149,183,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 02:37:15',157,184,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 02:37:15',158,185,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 02:45:51',143,186,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 02:45:51',144,187,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 02:45:51',145,188,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 02:45:51',146,189,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 02:45:51',147,190,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 02:45:51',148,191,'6f9d83403db65a86c58db0c55ece2798'),('2017-02-16 02:45:51',149,192,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 02:45:51',157,193,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 02:45:51',158,194,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 02:46:53',143,195,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 02:46:53',144,196,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 02:46:53',145,197,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 02:46:53',146,198,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 02:46:53',147,199,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 02:46:53',148,200,'6f9d83403db65a86c58db0c55ece2798'),('2017-02-16 02:46:53',149,201,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 02:56:58',143,202,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 02:56:58',144,203,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 02:56:58',145,204,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 02:56:58',146,205,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 02:56:58',147,206,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 02:56:58',148,207,'6f9d83403db65a86c58db0c55ece2798'),('2017-02-16 02:56:58',149,208,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 02:56:58',182,209,'a6bf1757fff057f266b697df9cf176fd'),('2017-02-16 02:56:58',157,210,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 02:56:58',158,211,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 03:00:05',143,212,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 03:00:05',144,213,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 03:00:05',145,214,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 03:00:05',146,215,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 03:00:05',147,216,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 03:00:05',148,217,'6f9d83403db65a86c58db0c55ece2798'),('2017-02-16 03:00:05',149,218,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 03:00:05',157,219,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 03:00:05',158,220,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 03:00:05',194,221,'e906ee6d00dde4d542e7ef9e74ec7fde'),('2017-02-16 17:58:54',143,222,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 17:58:54',144,223,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 17:58:54',145,224,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 17:58:54',146,225,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 17:58:54',147,226,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 17:58:54',149,227,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 17:58:54',201,228,'8524220e356fd62b52716d588c3ae07a'),('2017-02-16 17:58:54',157,229,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 17:58:54',158,230,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 17:58:54',194,231,'e906ee6d00dde4d542e7ef9e74ec7fde'),('2017-02-16 19:52:13',143,232,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 19:52:13',144,233,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 19:52:13',145,234,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 19:52:13',146,235,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 19:52:13',147,236,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 19:52:13',149,237,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 19:52:13',201,238,'8524220e356fd62b52716d588c3ae07a'),('2017-02-16 19:52:13',157,239,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 19:52:13',158,240,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 19:52:13',194,241,'e906ee6d00dde4d542e7ef9e74ec7fde'),('2017-02-16 20:02:02',143,242,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 20:02:02',144,243,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 20:02:02',145,244,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 20:02:02',146,245,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 20:02:02',147,246,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 20:02:02',149,247,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 20:02:02',201,248,'8524220e356fd62b52716d588c3ae07a'),('2017-02-16 20:02:02',157,249,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 20:02:02',158,250,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 20:02:02',194,251,'e906ee6d00dde4d542e7ef9e74ec7fde'),('2017-02-16 20:15:56',143,252,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 20:15:56',144,253,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 20:15:56',145,254,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 20:15:56',146,255,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 20:15:56',147,256,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 20:15:56',149,257,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 20:15:56',201,258,'8524220e356fd62b52716d588c3ae07a'),('2017-02-16 20:15:56',157,259,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 20:15:56',158,260,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 20:15:56',194,261,'e906ee6d00dde4d542e7ef9e74ec7fde'),('2017-02-16 20:16:28',235,262,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 20:16:28',236,263,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 20:16:28',145,264,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 20:16:28',238,265,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 20:16:28',239,266,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 20:16:28',149,267,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 20:16:28',241,268,'8524220e356fd62b52716d588c3ae07a'),('2017-02-16 20:16:28',157,269,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 20:16:28',158,270,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 20:16:28',244,271,'e906ee6d00dde4d542e7ef9e74ec7fde'),('2017-02-16 20:19:30',235,272,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 20:19:30',236,273,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 20:19:30',145,274,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 20:19:30',238,275,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 20:19:30',239,276,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 20:19:30',149,277,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 20:19:30',241,278,'8524220e356fd62b52716d588c3ae07a'),('2017-02-16 20:19:30',157,279,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 20:19:30',158,280,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 20:19:30',244,281,'e906ee6d00dde4d542e7ef9e74ec7fde'),('2017-02-16 20:20:41',235,282,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 20:20:41',236,283,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 20:20:41',145,284,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 20:20:41',238,285,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 20:20:41',239,286,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 20:20:41',149,287,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 20:20:41',241,288,'8524220e356fd62b52716d588c3ae07a'),('2017-02-16 20:20:41',157,289,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 20:20:41',158,290,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 20:20:41',244,291,'e906ee6d00dde4d542e7ef9e74ec7fde'),('2017-02-16 20:21:33',235,292,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 20:21:33',236,293,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 20:21:33',145,294,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 20:21:33',238,295,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 20:21:33',239,296,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 20:21:33',149,297,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 20:21:33',241,298,'8524220e356fd62b52716d588c3ae07a'),('2017-02-16 20:21:33',157,299,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 20:21:33',158,300,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 20:21:33',244,301,'e906ee6d00dde4d542e7ef9e74ec7fde'),('2017-02-16 20:36:13',235,302,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 20:36:13',236,303,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 20:36:13',145,304,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 20:36:13',238,305,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 20:36:13',279,306,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 20:36:13',239,307,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 20:36:13',149,308,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 20:36:13',282,309,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 20:36:13',157,310,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 20:36:13',158,311,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 20:40:26',235,312,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 20:40:26',236,313,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 20:40:26',145,314,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 20:40:26',238,315,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 20:40:26',279,316,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 20:40:26',239,317,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 20:40:26',149,318,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 20:40:26',282,319,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 20:40:26',157,320,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 20:40:26',158,321,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 20:42:21',235,322,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 20:42:21',236,323,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 20:42:21',145,324,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 20:42:21',238,325,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 20:42:21',279,326,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 20:42:21',239,327,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 20:42:21',149,328,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 20:42:21',282,329,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 20:42:21',157,330,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 20:42:21',158,331,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 20:47:37',235,332,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 20:47:37',236,333,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 20:47:37',145,334,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 20:47:37',238,335,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 20:47:37',279,336,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 20:47:37',239,337,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 20:47:37',149,338,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 20:47:37',282,339,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 20:47:37',157,340,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 20:47:37',158,341,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 20:51:10',235,342,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 20:51:10',236,343,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 20:51:10',145,344,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 20:51:10',238,345,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 20:51:10',279,346,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 20:51:10',239,347,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 20:51:10',149,348,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 20:51:10',282,349,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 20:51:10',157,350,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 20:51:10',158,351,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 20:51:42',235,352,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 20:51:42',236,353,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 20:51:42',145,354,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 20:51:42',238,355,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 20:51:42',279,356,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 20:51:42',239,357,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 20:51:42',149,358,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 20:51:42',282,359,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 20:51:42',157,360,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 20:51:42',158,361,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 20:57:15',235,362,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 20:57:15',236,363,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 20:57:15',145,364,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 20:57:15',238,365,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 20:57:15',279,366,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 20:57:15',239,367,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 20:57:15',149,368,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 20:57:15',282,369,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 20:57:15',157,370,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 20:57:15',158,371,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 21:01:27',235,372,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 21:01:27',236,373,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 21:01:27',145,374,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 21:01:27',238,375,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 21:01:27',279,376,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 21:01:27',239,377,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 21:01:27',149,378,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 21:01:27',282,379,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 21:01:27',157,380,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 21:01:27',158,381,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 21:07:17',235,382,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 21:07:17',236,383,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 21:07:17',145,384,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 21:07:17',238,385,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 21:07:17',279,386,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 21:07:17',239,387,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 21:07:17',149,388,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 21:07:17',282,389,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 21:07:17',157,390,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 21:07:17',158,391,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 21:17:59',235,392,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 21:17:59',236,393,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 21:17:59',145,394,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 21:17:59',238,395,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 21:17:59',279,396,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 21:17:59',239,397,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 21:17:59',149,398,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 21:17:59',282,399,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 21:17:59',157,400,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 21:17:59',158,401,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 21:19:05',235,402,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 21:19:05',236,403,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 21:19:05',145,404,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 21:19:05',238,405,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 21:19:05',279,406,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 21:19:05',239,407,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 21:19:05',149,408,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 21:19:05',282,409,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 21:19:05',157,410,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 21:19:05',158,411,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 21:19:47',235,412,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 21:19:47',236,413,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 21:19:47',145,414,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 21:19:47',238,415,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 21:19:47',279,416,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 21:19:47',239,417,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 21:19:47',149,418,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 21:19:47',282,419,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 21:19:47',157,420,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 21:19:47',158,421,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 21:20:30',235,422,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 21:20:30',236,423,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 21:20:30',145,424,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 21:20:30',238,425,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 21:20:30',279,426,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 21:20:30',239,427,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 21:20:30',149,428,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 21:20:30',282,429,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 21:20:30',157,430,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 21:20:30',158,431,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 21:38:15',235,432,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 21:40:57',405,433,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 21:40:57',406,434,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 21:40:57',407,435,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 21:40:57',408,436,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 21:40:57',409,437,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 21:40:57',410,438,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 21:40:57',411,439,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 21:40:57',412,440,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 21:40:57',413,441,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 21:40:57',414,442,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 21:42:36',405,443,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 21:42:36',406,444,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 21:42:36',407,445,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 21:42:36',408,446,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 21:42:36',409,447,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 21:42:36',410,448,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 21:42:36',411,449,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 21:42:36',412,450,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 21:42:36',413,451,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 21:42:36',414,452,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 21:44:44',405,453,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 21:44:44',406,454,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 21:44:44',407,455,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 21:44:44',408,456,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 21:44:44',409,457,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 21:44:44',410,458,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 21:44:44',411,459,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 21:44:44',412,460,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 21:44:44',413,461,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 21:44:44',414,462,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 21:46:47',405,463,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 21:46:47',406,464,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 21:46:47',407,465,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 21:46:47',408,466,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 21:46:47',409,467,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 21:46:47',410,468,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 21:46:47',411,469,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 21:46:47',412,470,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 21:46:47',413,471,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 21:46:47',414,472,'e507831e7c820e43ebe652166456fadb'),('2017-02-16 21:51:21',405,473,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 21:51:21',406,474,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 21:51:21',407,475,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 21:51:21',408,476,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 21:51:21',409,477,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 21:51:21',410,478,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 21:51:21',411,479,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 21:51:21',412,480,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 21:51:21',413,481,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 21:51:21',454,482,'e906ee6d00dde4d542e7ef9e74ec7fde'),('2017-02-16 21:52:21',405,483,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 21:52:21',406,484,'1ababaf6d516ae7ef455ecda9eec4a3f'),('2017-02-16 21:52:21',407,485,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 21:52:21',408,486,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 21:52:21',409,487,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 21:52:21',410,488,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 21:52:21',411,489,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 21:52:21',412,490,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 21:52:21',413,491,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 21:52:21',454,492,'e906ee6d00dde4d542e7ef9e74ec7fde'),('2017-02-16 21:57:52',405,493,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 21:57:52',407,494,'393a18c4f1896d590fec663745d39e7f'),('2017-02-16 21:57:52',408,495,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 21:57:52',409,496,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 21:57:52',410,497,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 21:57:52',411,498,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 21:57:52',471,499,'7c0f1abcd77edd16b75d9e7e95ec05d4'),('2017-02-16 21:57:52',412,500,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 21:57:52',413,501,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 21:57:52',454,502,'e906ee6d00dde4d542e7ef9e74ec7fde'),('2017-02-16 21:59:36',405,503,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 21:59:36',476,504,'351a48dfa3c84c8d6cfb81e7e7c6dbd1'),('2017-02-16 21:59:36',408,505,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 21:59:36',409,506,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 21:59:36',410,507,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 21:59:36',411,508,'735c2fc32fc000bbd862773412267f84'),('2017-02-16 21:59:36',471,509,'7c0f1abcd77edd16b75d9e7e95ec05d4'),('2017-02-16 21:59:36',412,510,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 21:59:36',413,511,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 21:59:36',454,512,'e906ee6d00dde4d542e7ef9e74ec7fde'),('2017-02-16 22:02:34',405,513,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 22:02:34',476,514,'351a48dfa3c84c8d6cfb81e7e7c6dbd1'),('2017-02-16 22:02:34',408,515,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 22:02:34',409,516,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 22:02:34',410,517,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 22:02:34',490,518,'67f167123ab1e50cb032ab3277d51452'),('2017-02-16 22:02:34',471,519,'7c0f1abcd77edd16b75d9e7e95ec05d4'),('2017-02-16 22:02:34',412,520,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 22:02:34',413,521,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 22:02:34',454,522,'e906ee6d00dde4d542e7ef9e74ec7fde'),('2017-02-16 22:05:40',405,523,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-16 22:05:40',408,524,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-16 22:05:40',409,525,'4c4774ccab9c317ddd497b466c623410'),('2017-02-16 22:05:40',410,526,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-16 22:05:40',499,527,'520f7b1c04fd8a9882d2f73547fd521d'),('2017-02-16 22:05:40',490,528,'67f167123ab1e50cb032ab3277d51452'),('2017-02-16 22:05:40',471,529,'7c0f1abcd77edd16b75d9e7e95ec05d4'),('2017-02-16 22:05:40',412,530,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-16 22:05:40',413,531,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-16 22:05:40',454,532,'e906ee6d00dde4d542e7ef9e74ec7fde'),('2017-02-17 03:54:06',405,533,'0e2edbaa6837fbb1e91b49b9ad333220'),('2017-02-17 03:54:06',408,534,'4842c0f7fe10c1927f30a124fbb0629a'),('2017-02-17 03:54:06',409,535,'4c4774ccab9c317ddd497b466c623410'),('2017-02-17 03:54:06',410,536,'50b3fccd6dc93fe8855d4ca2d69e10c3'),('2017-02-17 03:54:06',499,537,'520f7b1c04fd8a9882d2f73547fd521d'),('2017-02-17 03:54:06',490,538,'67f167123ab1e50cb032ab3277d51452'),('2017-02-17 03:54:06',471,539,'7c0f1abcd77edd16b75d9e7e95ec05d4'),('2017-02-17 03:54:06',412,540,'b7fd4ae0380966077f5b4b8ac94e05db'),('2017-02-17 03:54:06',413,541,'be6630812bcd51cb8968b39665fd1c9c'),('2017-02-17 03:54:06',454,542,'e906ee6d00dde4d542e7ef9e74ec7fde');
/*!40000 ALTER TABLE `ose_change_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ose_metrics`
--

DROP TABLE IF EXISTS `ose_metrics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ose_metrics` (
  `ose_url_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `domain_authority` tinyint(4) DEFAULT NULL,
  `page_authority` tinyint(4) DEFAULT NULL,
  `ose_date` date NOT NULL,
  `ose_num_links` int(11) DEFAULT NULL,
  `ose_metrics_ID` int(11) NOT NULL AUTO_INCREMENT,
  `url_hash` char(32) NOT NULL,
  `ose_status_code` varchar(20) DEFAULT NULL,
  `ose_external_equity` int(11) DEFAULT NULL,
  PRIMARY KEY (`ose_metrics_ID`),
  UNIQUE KEY `idx_ose_metrics_unique` (`domain_authority`,`page_authority`,`ose_num_links`,`url_hash`,`ose_status_code`)
) ENGINE=InnoDB AUTO_INCREMENT=500 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ose_metrics`
--

LOCK TABLES `ose_metrics` WRITE;
/*!40000 ALTER TABLE `ose_metrics` DISABLE KEYS */;
INSERT INTO `ose_metrics` VALUES ('http://healthypaleodiet.net/',13,22,'2017-02-16',0,143,'0e2edbaa6837fbb1e91b49b9ad333220',NULL,NULL),('https://www.searchexplosion.com/',22,28,'2017-02-16',0,144,'1ababaf6d516ae7ef455ecda9eec4a3f',NULL,NULL),('https://searchexplosion.com/discovery-form/',22,1,'2017-02-16',0,145,'393a18c4f1896d590fec663745d39e7f',NULL,NULL),('https://experiment.com',59,66,'2017-02-16',0,146,'4842c0f7fe10c1927f30a124fbb0629a',NULL,NULL),('https://searchexplosion.com/',22,33,'2017-02-16',0,147,'50b3fccd6dc93fe8855d4ca2d69e10c3',NULL,NULL),('http://healthypaleodiet.net/paleo-diet-book-review/',13,1,'2017-02-16',0,149,'735c2fc32fc000bbd862773412267f84',NULL,NULL),('https://webwright.io/',1,1,'2017-02-16',0,157,'be6630812bcd51cb8968b39665fd1c9c',NULL,NULL),('http://healthypaleodiet.net/why-paleo-diet-works/',13,1,'2017-02-16',0,158,'e507831e7c820e43ebe652166456fadb',NULL,NULL),('http://healthypaleodiet.net/',13,22,'2017-02-16',1,235,'0e2edbaa6837fbb1e91b49b9ad333220',NULL,NULL),('https://www.searchexplosion.com/',22,28,'2017-02-16',23,236,'1ababaf6d516ae7ef455ecda9eec4a3f',NULL,NULL),('https://experiment.com',59,66,'2017-02-16',2186,238,'4842c0f7fe10c1927f30a124fbb0629a',NULL,NULL),('https://searchexplosion.com/',22,33,'2017-02-16',1,239,'50b3fccd6dc93fe8855d4ca2d69e10c3',NULL,NULL),('https://zombiehammer.com',14,28,'2017-02-16',32,279,'4c4774ccab9c317ddd497b466c623410',NULL,NULL),('http://www.sunguntanning.com',22,33,'2017-02-16',59,282,'b7fd4ae0380966077f5b4b8ac94e05db',NULL,NULL),('http://healthypaleodiet.net/',13,22,'2017-02-16',1,405,'0e2edbaa6837fbb1e91b49b9ad333220','0',0),('https://www.searchexplosion.com/',22,28,'2017-02-16',23,406,'1ababaf6d516ae7ef455ecda9eec4a3f','0',0),('https://searchexplosion.com/discovery-form/',22,1,'2017-02-16',0,407,'393a18c4f1896d590fec663745d39e7f','0',0),('https://experiment.com',59,66,'2017-02-16',2186,408,'4842c0f7fe10c1927f30a124fbb0629a','0',0),('https://zombiehammer.com',14,28,'2017-02-16',32,409,'4c4774ccab9c317ddd497b466c623410','0',0),('https://searchexplosion.com/',22,33,'2017-02-16',1,410,'50b3fccd6dc93fe8855d4ca2d69e10c3','0',0),('http://healthypaleodiet.net/paleo-diet-book-review/',13,1,'2017-02-16',0,411,'735c2fc32fc000bbd862773412267f84','0',0),('http://www.sunguntanning.com',22,33,'2017-02-16',59,412,'b7fd4ae0380966077f5b4b8ac94e05db','13',0),('https://webwright.io/',1,1,'2017-02-16',0,413,'be6630812bcd51cb8968b39665fd1c9c','0',0),('http://healthypaleodiet.net/why-paleo-diet-works/',13,1,'2017-02-16',0,414,'e507831e7c820e43ebe652166456fadb','0',0),('https://www.wellsfargo.com/',89,91,'2017-02-16',395665,454,'e906ee6d00dde4d542e7ef9e74ec7fde','0',367311),('https://www.searchexplosion.com',22,28,'2017-02-16',23,471,'7c0f1abcd77edd16b75d9e7e95ec05d4','0',3),('https://searchexplosion.com/discovery-form',22,1,'2017-02-16',0,476,'351a48dfa3c84c8d6cfb81e7e7c6dbd1','0',0),('http://pageflakes.com',69,56,'2017-02-16',339,490,'67f167123ab1e50cb032ab3277d51452','13',314),('https://www.pageflakes.com',69,71,'2017-02-16',4329,499,'520f7b1c04fd8a9882d2f73547fd521d','13',3993);
/*!40000 ALTER TABLE `ose_metrics` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ALLOW_INVALID_DATES,ERROR_FOR_DIVISION_BY_ZERO,TRADITIONAL,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`3fa9b896c59d`@`%`*/ /*!50003 TRIGGER `zipps`.`ose_metrics_AFTER_INSERT`
AFTER INSERT ON `zipps`.`ose_metrics`
FOR EACH ROW
BEGIN
update `ose_change_table` SET `ose_metrics_ID`=`NEW`.`ose_metrics_ID` WHERE `ose_change_table`.`url_hash`=`NEW`.`url_hash` order by `change_table_ID` DESC LIMIT 1;
update `url_data` SET `ose_metrics_ID`=`NEW`.`ose_metrics_ID` WHERE `url_data`.`url_hash`=`NEW`.`url_hash`;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `registrar`
--

DROP TABLE IF EXISTS `registrar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registrar` (
  `registrar_name` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `login_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `login_username` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `login_password` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `credit_card_last_4` smallint(6) NOT NULL,
  `user_ID` int(11) DEFAULT NULL,
  `registrar_ID` int(11) NOT NULL AUTO_INCREMENT,
  `account_ID` int(11) NOT NULL,
  PRIMARY KEY (`registrar_ID`),
  KEY `fk_registrars_accounts_person_idx` (`user_ID`),
  KEY `regis-to-account_idx` (`account_ID`),
  CONSTRAINT `regis-to-account` FOREIGN KEY (`account_ID`) REFERENCES `account` (`account_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `regis_to_reg` FOREIGN KEY (`user_ID`) REFERENCES `registration` (`user_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registrar`
--

LOCK TABLES `registrar` WRITE;
/*!40000 ALTER TABLE `registrar` DISABLE KEYS */;
INSERT INTO `registrar` VALUES ('BlueHost','https://my.bluehost.com/web-hosting/cplogin','greenbuildprofits.com','My2Dogs!',7787,31,4,201111),('eNom','https://www.enom.com/login.aspx','nj-whoboy13','cowboy25',7787,31,5,201111),('Godaddy','godaddy.com','68759966','mulchaTNA1313',7787,31,6,201111),('Namecheap','namecheap.com','13thfletch','SmallBatch32@',7787,31,7,201111),('test','test','test','test',1234,30,8,201112);
/*!40000 ALTER TABLE `registrar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registration`
--

DROP TABLE IF EXISTS `registration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registration` (
  `user_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(383) NOT NULL,
  `user_password` char(32) NOT NULL DEFAULT '48c470b32d5c209925de40fbb4489b91',
  `user_phone` varchar(45) DEFAULT NULL,
  `user_address` varchar(382) DEFAULT NULL,
  `user_status` varchar(10) DEFAULT NULL,
  `user_stripe_token` varchar(45) DEFAULT NULL,
  `user_type` varchar(45) NOT NULL DEFAULT 'no_access',
  `account_ID` int(11) DEFAULT NULL,
  `user_ID` int(11) NOT NULL AUTO_INCREMENT,
  `user_access` varchar(10) NOT NULL DEFAULT 'no',
  `user_security` char(32) NOT NULL,
  PRIMARY KEY (`user_ID`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`),
  KEY `reg_to_account_idx` (`account_ID`),
  CONSTRAINT `reg_to_account` FOREIGN KEY (`account_ID`) REFERENCES `account` (`account_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registration`
--

LOCK TABLES `registration` WRITE;
/*!40000 ALTER TABLE `registration` DISABLE KEYS */;
INSERT INTO `registration` VALUES ('Joseph Kolnik','jkolnik@mac.com','9e69eb3a0f4e268ead6ac82a7fb7bb3e','8012311782','Phoenix','1',NULL,'superuser',201110,30,'yes','22286a84f60bf3caa102056c7adecb5b'),('Joshua Fletcher','fletch@searchexplosion.com','7dd59a8302ec5d2a6edd5cfcb703e58d','4806528898','Phoenix','1',NULL,'admin',201111,31,'yes','3986842787322e2fa2eaaf41dc0b91aa'),('Jordan Beriault','sdarrstudios@gmail.com','b606bc9430e9dbea35bb5e8376777814','4808629463','Phoenix','1',NULL,'admin',201111,32,'yes','d3ee04fac55efa465b3c2c701c0ff846'),('Cynthia Fletcher','cycorson@gmail.com','7dd59a8302ec5d2a6edd5cfcb703e58d','','','1',NULL,'user1',201111,33,'no','e250ce6146d3de1312254054878026f9'),('David Mills','something@something','7dd59a8302ec5d2a6edd5cfcb703e58d','','Somewhere','1',NULL,'user2',201111,34,'no','e250ce6146d3de1312254054878026f9'),('Phil Switzer','phil@bricktownseo.com','7dd59a8302ec5d2a6edd5cfcb703e58d','','Oklahoma','1',NULL,'user1',201111,35,'no','e250ce6146d3de1312254054878026f9'),('Joseph Kolnik','joe@searchexplosion.com','3d3ad7da30f8c3f3e1532de2ee31da93','8012311782','Phoneix, AZ',NULL,NULL,'admin',201111,46,'yes','6bf0b82db23976366d4d1eb966fee647'),('tester','tester@tester.com','f5d1278e8109edd94e1e4197e04873b9','tester','tester',NULL,NULL,'admin',201112,47,'yes','d88d09d9216a4958497f929dab03114c'),('tester2','tester2@tester2.io','2e9fcf8e3df4d415c96bcf288d5ca4ba','tester2','tester2',NULL,NULL,'user1',201112,49,'yes','1f4244d308cb3ead7e8cff7826321a84');
/*!40000 ALTER TABLE `registration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resource_login`
--

DROP TABLE IF EXISTS `resource_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resource_login` (
  `resource_url_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_of_product` varchar(382) NOT NULL,
  `username` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_ID` int(11) DEFAULT NULL,
  `product_description` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resource_url_ID` int(11) NOT NULL AUTO_INCREMENT,
  `account_ID` int(11) NOT NULL,
  PRIMARY KEY (`resource_url_ID`),
  KEY `fk_resources_logins_person` (`user_ID`),
  KEY `resource-to-account_idx` (`account_ID`),
  CONSTRAINT `resource-to-account` FOREIGN KEY (`account_ID`) REFERENCES `account` (`account_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `resource_to_reg` FOREIGN KEY (`user_ID`) REFERENCES `registration` (`user_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resource_login`
--

LOCK TABLES `resource_login` WRITE;
/*!40000 ALTER TABLE `resource_login` DISABLE KEYS */;
INSERT INTO `resource_login` VALUES ('serverpilot.io','Server Pilot','fletch@searchexplosion.com','SmallBatch32@',31,'Server Hosting App for Digital Ocean',6,201111),('CreativeLive.com','Creative Live eLearning','fletch@searchexplosion.com','bLACKgIC67%',31,'Creative eLearning Composite photography and other tutorials and classes',7,201111),('Masterclass','Masterclass eLearning','fletch@searchexplosion.com','cowboy25',31,'eLearning classes from professional practitioners of film music and performance',8,201111),('Dropbox','Dropbox Cloud Storage','13thfletch@gmail.com','SmallBatch32@',31,'Dropbox Cloud Storage plan',9,201111),('zapier.com','Zapier','fletch@searchexplosion.com','SmallBatch32@',31,'Zapier app integration and triggers',10,201111),('callrail.com','CallRail','phil@bricktownseo.com','gvGT3z7<j~:+BQY',35,'Callrail Call Tracking System',12,0),('https://searchexplosion.teamwork.com','Teamwork Project Management','fletch@searchexplosion.com','SmallBatch32@',31,'Teamwork project management system',17,201111),('LinkedIn.com','LinkedIn','13thfletch','SmallBatch32@',31,'LinkedIn Personal Account',18,201111),('http://www.omgmachines.com/dlg/admin/','OMG Membership','onemangang','FranklinGuys123!!!',34,NULL,19,0),('https://www.sweetprocess.com/accounts/login/','Sweet Process','fletch@searchexplosion.com','SmallBatch32@',31,'Sweet Process Documentation for Processes',20,201111),('github.com','Git Hub','fletch@searchexplosion.com','cowboy25',31,'Git hub repository',21,201111),('https://care.siriusxm.com/login_view.action?alert=success&singleBoxLogin=true&username=13thfletch@gmail.com','SiriusXM','13thfletch@gmail.com','SmallBatch32@',31,'SiriusXM Satellite Radio Account',22,201111),('https://www.wimhofmethod.com/members/dashboard','Inner Fire- Wim Hof Method','13thfletch@gmail.com','SmallBatch32@',31,'Wim Hof Method- Inner Fire Cold, Breathing, Mind',23,201111),('screencast.com','Screencast Online Video Hosting','13thfletch@gmail.com','cowboy25',31,'Screencast Techsmith product for storing photos and videos online',24,201111),('ap.www.namecheap.com','Fletch Webmail SearchExplosion.com','fletch@searchexplosion.com','SmallBatch32@',31,'Webmail password for fletch@searchexplosion.com',25,201111),('https://members.youbrandinc.com','Curation Suite','fletch@searchexplosion.com','UC7EK',31,'Curation Suite, Super Social Engagement Social Quote Traffic Plugins',26,201111),('https://youbrandinc.zendesk.com/','YouBrandInc Zendesk Support','13thfletch@gmail.com','My2Dogs!',31,'YouBrandInc Curation Suite Zendesk Support Login',27,201111),('followus.com','Follow Us Social Media Links','fletch@searchexplosion.com','SmallBatch32@',31,'Follow Us Social Media Link Hub',28,201111),('members.youbrandinc.com','You Brand Inc','fletch@searchexplosion.com','UC7EK',31,'You Brand Inc Curaton Suite, Super social engagement and Social Quote Traffic',29,201111);
/*!40000 ALTER TABLE `resource_login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `software_keys`
--

DROP TABLE IF EXISTS `software_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `software_keys` (
  `software_name` varchar(255) NOT NULL,
  `license_key` varchar(255) NOT NULL,
  `serial_number` varchar(255) DEFAULT NULL,
  `user_ID` int(11) NOT NULL,
  `software_keys_ID` int(11) NOT NULL AUTO_INCREMENT,
  `comments` text,
  `account_ID` int(11) NOT NULL,
  PRIMARY KEY (`software_keys_ID`),
  KEY `software_keys_to_person_idx` (`user_ID`),
  KEY `keys-to-account_idx` (`account_ID`),
  CONSTRAINT `keys-to-account` FOREIGN KEY (`account_ID`) REFERENCES `account` (`account_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `software_to_reg` FOREIGN KEY (`user_ID`) REFERENCES `registration` (`user_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `software_keys`
--

LOCK TABLES `software_keys` WRITE;
/*!40000 ALTER TABLE `software_keys` DISABLE KEYS */;
INSERT INTO `software_keys` VALUES ('1','1','1',30,2,'1',201111),('2','2','2',31,3,'222222\n222\n22\n2\n2',201111);
/*!40000 ALTER TABLE `software_keys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `traffic`
--

DROP TABLE IF EXISTS `traffic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `traffic` (
  `search_keyword` varchar(382) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `monthly_traffic` int(11) DEFAULT NULL,
  `domain_ID` int(11) DEFAULT NULL,
  `specific_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `traffic_ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`traffic_ID`),
  KEY `fk_traffic_domain` (`domain_ID`),
  CONSTRAINT `traffic-to-domain-key` FOREIGN KEY (`domain_ID`) REFERENCES `domains` (`domain_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `traffic`
--

LOCK TABLES `traffic` WRITE;
/*!40000 ALTER TABLE `traffic` DISABLE KEYS */;
/*!40000 ALTER TABLE `traffic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `url_data`
--

DROP TABLE IF EXISTS `url_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `url_data` (
  `url_name` text NOT NULL,
  `crawl_frequency` varchar(45) NOT NULL,
  `frog_data_ID` int(11) DEFAULT NULL,
  `fog_date` datetime DEFAULT NULL,
  `ose_metrics_ID` int(11) DEFAULT NULL,
  `ose_date` datetime DEFAULT NULL,
  `majestic_metrics_ID` int(11) DEFAULT NULL,
  `majestic_date` datetime DEFAULT NULL,
  `url_hash` char(32) GENERATED ALWAYS AS (md5(`url_name`)) STORED NOT NULL,
  `ose_status_code` varchar(20) DEFAULT NULL,
  `ose_external_metrics` int(11) DEFAULT NULL,
  PRIMARY KEY (`url_hash`),
  UNIQUE KEY `url_hash` (`url_hash`),
  KEY `fk_majestic_url` (`majestic_metrics_ID`),
  CONSTRAINT `fk_majestic_url` FOREIGN KEY (`majestic_metrics_ID`) REFERENCES `majestic_metrics` (`majestic_metrics_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `url_data`
--

LOCK TABLES `url_data` WRITE;
/*!40000 ALTER TABLE `url_data` DISABLE KEYS */;
INSERT INTO `url_data` (`url_name`, `crawl_frequency`, `frog_data_ID`, `fog_date`, `ose_metrics_ID`, `ose_date`, `majestic_metrics_ID`, `majestic_date`, `ose_status_code`, `ose_external_metrics`) VALUES ('http://healthypaleodiet.net/','Daily',NULL,NULL,405,NULL,NULL,NULL,NULL,NULL),('https://experiment.com','Weekly',NULL,NULL,408,NULL,NULL,NULL,NULL,NULL),('https://zombiehammer.com','Weekly',NULL,NULL,409,NULL,NULL,NULL,NULL,NULL),('https://searchexplosion.com/','Daily',NULL,NULL,410,NULL,NULL,NULL,NULL,NULL),('https://www.pageflakes.com','Weekly',NULL,NULL,499,NULL,NULL,NULL,NULL,NULL),('http://pageflakes.com','Daily',NULL,NULL,490,NULL,NULL,NULL,NULL,NULL),('https://www.searchexplosion.com','Daily',NULL,NULL,471,NULL,NULL,NULL,NULL,NULL),('http://www.sunguntanning.com','Weekly',NULL,NULL,412,NULL,NULL,NULL,NULL,NULL),('https://webwright.io/','Daily',NULL,NULL,413,NULL,NULL,NULL,NULL,NULL),('https://www.wellsfargo.com/','Weekly',NULL,NULL,454,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `url_data` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-12  0:26:43
