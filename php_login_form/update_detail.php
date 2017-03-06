<?php
include 'connection.php';
//On submitting form below function will execute
if(isset($_POST['updateDetail'])){
    $useremail = mysqli_real_escape_string($conn, $_POST["user_id"]);
    $userName = mysqli_real_escape_string($conn, $_POST["full_name"]);
    $userContact = mysqli_real_escape_string($conn, $_POST["mobile_number"]);
    $userAddress = mysqli_real_escape_string($conn, $_POST["address"]);

    $query = mysqli_query($conn, "UPDATE registration SET user_name='$userName', user_contact='$userContact', user_address='$userAddress' WHERE user_email = '$useremail'");

    if($query){
        $user_detail ="Details Updated";
    }
//    exit();
}
?>
