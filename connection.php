<?php

$servername = "localhost";
$username = "3fa9b896c59d";
$password = "4a6787a96950cbea";
$dbname = "zipps";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}

?>
