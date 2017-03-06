<?php

include 'connection.php';

$set_status_email = $_GET['id'];

$sql = mysqli_query($conn,"UPDATE registration SET user_status='1' WHERE user_email = '$set_status_email'");
