<?php
include('session.php');
//On submitting form below function will execute
    $email = mysqli_real_escape_string($conn, $_POST["email"]);
    $password = mysqli_real_escape_string($conn, $_POST["password"]);
    $remember = $_POST["remember"];

    $password = md5($password);

    //$query = mysql_query("insert into registration(user_status) values ('1')");
    // Matching User Input E-mail and Password with stored E-mail and Password in Database
    //$result = mysql_query("SELECT * FROM registration WHERE user_email='$email' AND user_password='$password'");
    $result = mysqli_query($conn,"SELECT * FROM registration WHERE user_email='$email' AND user_password='$password'");
    $row = mysqli_fetch_assoc($result);

    $data = mysqli_num_rows($result);
    if($data==1){
        $status = $row['user_status'];
        if($status == '1'){
            $_SESSION['email'] = $email;
            if($remember == 'true'){
                setcookie('cemail',$email, time() + (60*60));
                setcookie('cpassword',  base64_encode($password), time() + (60*60));
            }
        }
        else{
            echo "Inactive";
        }
    }
    else{
    echo "Not Match";
    }
    //mysql_close ($connection); // Connection Closed

?>
