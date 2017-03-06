<?php
include 'password_reset.php';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Reset Password</title>
        <link rel="stylesheet" type="text/css" href="css/global.css">
        <link rel="stylesheet" type="text/css" href="css/forgot-password.css">
        <script
			  src="https://code.jquery.com/jquery-3.1.1.min.js"
			  integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
			  crossorigin="anonymous"></script>
    </head>
    <body>
      <div id="forgot-password">
        <div class="outer-container">
            <div class="login-logo">
                <a href="login.php">
                <img src="images/formget_login-logo.png" alt="FormGet Free Online Form Builder" class="login-logo" />
                </a>
            </div>
            <div class="inner-container">
                <?php if(isset($info)) { ?>
                <div class='resetform_container'>
                    <?php echo $info;?>
                </div>
                <?php } ?>
                 <?php if(isset($error)) { ?>
                <div class='resetform_container' id="error">
                    <?php echo $error;?>
                </div>
                <?php } ?>
                <?php if(isset($updated_pass)) { ?>
                <div class='resetform_container' id="">
                    <?php echo $updated_pass;?>
                    <a href="login.php" id='for_sub' class="fg-btn fg-fw block blue large bold" >Login</a>
                </div>
                <?php } ?>
               <div class='resetform_container'>
                        <div id='mid' class='reset-container'>
                            <?php if (empty($info) && empty($updated_pass)) {?>
                            <h1 class="heading">Reset Your Password</h1>
                            <div class='login_bar'></div>
                            <form action="forget_password.php" method="post">
                            <input type='text' name ="email" class='f_email fg-input text fg-fw' id='f_email' placeholder="Email Address"/>
                            <p class="fg-help">Enter the email address you used to sign up</p>
                            <p id="error_msg"></p>
                            <input type='hidden' name ="flag"class='f_email fg-input text fg-fw' id='f_email' placeholder="Email Address" value="1"/>
                            <input type="submit" id='for_sub' class="fg-btn fg-fw block blue large bold" name='resetPasswordSubmit' value='Reset Password' />
                            </form>
                            <?php } ?>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </body>
</html>
