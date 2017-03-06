<?php
include 'connection.php';
//On submitting form below function will execute
if(isset($_POST['updatePassword'])){
    $useremail = mysqli_real_escape_string($conn, $_POST["user_id"]);
    $oldpassword = mysqli_real_escape_string($conn, $_POST["oldpassword"]);
    $newpassword = mysqli_real_escape_string($conn, $_POST["newpassword"]);
    $confirmpassword = mysqli_real_escape_string($conn, $_POST["confirmpassword"]);

    $oldpassword = md5($oldpassword);

 $result = mysqli_query($conn, "SELECT user_password FROM registration WHERE user_email = '$useremail'");
 $row = mysqli_fetch_array($result);
    if( $oldpassword == $row['user_password']){
        if( $newpassword === $confirmpassword ){
            $confirmpassword =  md5($confirmpassword);
            $query = mysqli_query($conn, "UPDATE registration SET user_password='$confirmpassword' WHERE user_email = '$useremail'");
          if($query){
              $msg = "updated";
          }
        }
        else{
          $msg = "notconfirm";
        }
    }
    else{
          $msg = "not";
    }
}
?>
