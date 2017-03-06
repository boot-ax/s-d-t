<?php
include 'connection.php';
//On submitting form below function will execute
    $name = mysqli_real_escape_string($conn, $_POST["name"]);
    $email = mysqli_real_escape_string($conn, $_POST["email"]);
    $password = mysqli_real_escape_string($conn, $_POST["password"]);
    $password = md5($password);

    //$result = mysql_query("SELECT * FROM registration WHERE user_email='$email'");
    //MySqli Select Query
    $sql="SELECT * FROM registration WHERE user_email='$email'";
    $result = mysqli_query($conn,$sql);
    $data = mysqli_num_rows($result);

    if(($data)=== 0){
          //Insert query
          //$query = mysql_query("insert into registration(user_name, user_email, user_password) values ('$name', '$email', '$password')");
        $sql = mysqli_query($conn,"INSERT INTO registration (user_name, user_email, user_password) VALUES ('$name', '$email', '$password')");
        //mysqli_query($con,"INSERT INTO Persons (FirstName,LastName,Age) VALUES ('Glenn','Quagmire',33)");
          if($sql){
				$to = $email;
				// Always set content-type when sending HTML email
				$headers = "MIME-Version: 1.0" . "\r\n";
				$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

               $encode_user_email = base64_encode($email);

               //Create a link for accoution activation
               $link = 'https://dev.webwright.io/login.php?key=' .$encode_user_email;

               $Subject = 'FormGet : Loginapp Account Activation';
               $message = '<html xmlns="http://www.w3.org/1999/xhtml">
          <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="css/text">.fg-button{
                padding: 20px 40px 20px 36px;
                color: #fff;

                font-size: 22px;
                border-radius: 4px;

                text-decoration: none;
                background-color: #1BC7F2;
                webkit-box-shadow: 0 3px 0 #2477BF;
                -moz-box-shadow: 0 3px 0 #2477BF;
                box-shadow: 0 3px 0 #2477BF;

            }
            .fg-button:hover{
                background:  #1cd2ff;
				color:white;
            }</style>
</head>
<body>
<div style="width:800px;
height:200px;
background-color:#eeeeee;
margin:0 auto;">
<h2 style="padding:20px;
text-align:center;">For Account Activation  Please Click On Below Link</h2>
<h1 style="padding:20px;
text-align:center;"><a  style="
                padding: 20px 40px 20px 36px;
                color: #fff;
                font-size: 22px;
                border-radius: 4px;

                text-decoration: none;
                background-color: #1BC7F2;
                webkit-box-shadow: 0 3px 0 #2477BF;
                -moz-box-shadow: 0 3px 0 #2477BF;
                box-shadow: 0 3px 0 #2477BF;
           " href="' . $link . '" class="fg-button">Active Your Account</a></h1>
</div>
</body>
</html>';
			if(mail($to,$subject,$message,$headers)) {
					$info = 'Message has been sent';
               }
			   else {
                   $error = 'Message could not be sent.';
               }
          }
    }
    else{
          echo "Email Exist";
    }

?>
