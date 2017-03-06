<?php
include 'connection.php';

$email = mysqli_real_escape_string($conn, $_POST["email"]);
$newPassword = mysqli_real_escape_string($conn, $_POST["newPassword"]);
$confirmPassword = mysqli_real_escape_string($conn, $_POST["confirmPassword"]);

    if( $newPassword === $confirmPassword ){
        $confirmPassword = md5($confirmPassword);
        $query = mysqli_query($conn, "UPDATE registration SET user_password='$confirmPassword' WHERE user_email = '$email'");
        if($query){
            echo "TRUE";
        }
    }
    else{
      echo "FALSE";
    }

?>
