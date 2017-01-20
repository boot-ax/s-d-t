<?php

   $dbhost = "localhost";
   $dbuser = "3fa9b896c59d";
   $dbpass = "4a6787a96950cbea";
   $dbname = "zipps";
   
   //Connect to MySQL Server
   $con = mysqli_connect($dbhost, $dbuser, $dbpass);
   
   //Select Database
   mysqli_select_db($con, $dbname) or die(mysqli_error($con));
   
   ?>
