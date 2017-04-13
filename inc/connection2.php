<?php

   $dbhost = "localhost";
   $dbuser = "3fa9b896c59d";
   $dbpass = "4a6787a96950cbea";
   $dbname = "login-dev";


   $mysqli = new mysqli($dbhost, $dbuser, $dbpass,$dbname);
   if ($mysqli->connect_errno) {
       echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
   }
   ?>
