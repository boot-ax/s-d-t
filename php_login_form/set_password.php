<?php if(isset($_GET['key'])){
        $email = base64_decode($_GET['key']);
    }
?>

<!DOCTYPE html>
    <html>
    <head>

        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>FormGet</title>
        <link rel="stylesheet" type="text/css" href="css/global.css">
        <link rel="stylesheet" type="text/css" href="css/forgot-password.css">
        <script type='text/javascript' src='js/jquery-1.9.1.js'></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script src="js/form_validator.js"></script>
    </head>
    <body>
        <div id="forgot-password">
            <div class="outer-container">
                <div class="login-logo">
                    <a href="">
                        <img src="images/formget_login-logo.png" alt="FormGet Free Online Form Builder" class="login-logo">
                    </a>
                </div>
                <div class="inner-container">
                    <div class='resetform_container'>
                        <div id="mid" class="reset-container">
                            <h1 class="heading">New Password</h1>
                            <div id="error" >  </div>
                            <form action="" method="post" onsubmit='return reset_password()'>
                                <input type='password' name='newPassword' class='f_email fg-input text fg-fw new_pass' id='new_pass' placeholder='New Password' />
                                <p class="fg-help">Enter your new password</p>
                                <input type='password' name="confirmPassword" class='f_email fg-input text fg-fw conf_pass' id='conf_pass' placeholder='Confirm Password'/>
                                <p class="fg-help">Confirm your password</p>
                                <input type="hidden" name="email" id="email" value="<?php  if(isset($email)){echo $email;} ?>"
                                       <p id="error_msg"></p>
                                <input type='submit' name="resetPassword" id='for_sub' class='fg-btn fg-fw block blue large bold' value='Reset Password'/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
