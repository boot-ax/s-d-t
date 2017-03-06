<?php
if(isset($_SESSION['email'])){
    $email = $_SESSION['email'];
    $email = mysqli_real_escape_string($conn, $email);
    $result = mysqli_query($conn, "SELECT * FROM registration WHERE user_email='$email'");
    $row = mysqli_fetch_assoc($result);
    $login_name = $row['user_name'];
    $login_password = $row['user_password'];
    $login_contact_no = $row['user_contact'];
    $login_address = $row['user_address'];
 }
?>
