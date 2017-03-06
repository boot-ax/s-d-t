<?php
 include('session.php');
   if(isset($_SESSION['email'])){
        header("Location: index.php");
        exit();
        }
        if(isset($_GET['key'])){
        $submit_email = base64_decode($_GET['key']);
        $_GET['id']=$submit_email;
        include('set_status.php');
        }
?>
<!DOCTYPE html>
<html>
    <head>
         <title>Login Form</title>
         <link rel="stylesheet" href="css/login_style.css"/>
         <link rel="stylesheet" href="css/global.css"/>
        <link rel="stylesheet" href="css/login-style.css"/>
        <script
              src="https://code.jquery.com/jquery-3.1.1.min.js"
              integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
              crossorigin="anonymous"></script>
        <script src="js/form_validator.js"></script>
        <script type="text/javascript">
    $(document).ready(function() {
        var link_url = document.URL;
        jQuery("#freesigninForm").append("<input type='hidden' name='signup_link' value='" + link_url + "' />");
            <?php if(isset($_GET['p'])&&$_GET['p']=='popup'){ ?>
        $('#login_container').hide();
        <?php }else { ?>
        $('#signup_container').hide();
        <?php } ?>
    });

$(function() {
    var wrapper = $('#auth_container');
    var signIn = $('#signin');
    var signInContainer = $('#login_container');
    var signUp = $('#register');
    var signUpContainer = $('#signup_container');
    var spinner = $('#spinner');
    wrapperHeightSignUp = 547;
    wrapperHeightSignIn = 431;
    signUp.click(function(){
        signIn.css('opacity', '0');
        wrapperHeightSignIn = document.getElementById("auth_container").offsetHeight;
        wrapper.css('height',(wrapperHeightSignIn + 60) + 'px');
        signInContainer.fadeOut('slow');
        spinner.fadeIn('slow');
        spinner.fadeOut('slow');
        wrapper.stop().animate({ height: wrapperHeightSignUp }, 600);
        signUpContainer.css('opacity','0', 'display','block');
        signUpContainer.animate({ opacity: 1 }, 'slow').fadeIn(600, function(){
            wrapper.stop().animate({ height: '100%'}, 600);
            signIn.animate({opacity: 1}, 200);
        });
    });

    signIn.click(function(){
        signUp.css('opacity', '0');
        wrapperHeightSignUp = document.getElementById("auth_container").offsetHeight;
        wrapper.css('height',(wrapperHeightSignUp + 55) + 'px');
        signUpContainer.fadeOut('slow');
        spinner.fadeIn('slow');
        spinner.fadeOut('slow');
        wrapper.stop().animate({ height: wrapperHeightSignIn }, 600);
        signInContainer.css('opacity','0', 'display','block');
        signInContainer.animate({ opacity: 1 }, 'slow').fadeIn(600, function(){
            wrapper.stop().animate({ height: '100%'}, 600);
            signUp.animate({opacity: 1}, 200);
        });
    });
});

</script>

<style>
    #div_error_box_login,
    #div_error_box_reg{
        color:red;
    }
</style>
    </head>
<body>
<div id="auth_wraper">
    <div class="auth_header">
        <img src="images/formget_login-logo.png" alt="formget logo"/>
    </div>
    <div id="auth_container">
        <!--Signup Container-->
        <div id="login_container">
            <h2 class="signup_heading">Login to your account.</h2>

            <div class="login_or"></div>
            <div id="div_error_box_login" ><?php
                isset($error) ? $s_e = $error : $s_e = "";
                echo $s_e;
                ?></div>

            <form action="#" id="signinForm" class="signinForm" method="post" onsubmit='return login_form_login()' >

                <ul>
                    <li>
                        <input type="text" name="email" id="uname_log" value="<?php if(isset($_COOKIE['cemail'])){ echo $_COOKIE['cemail']; } ?>" placeholder="Email" class="required requiredField Email fg-input text fg-fw" />
                    </li>
                    <li>
                        <input type="password" name="password" id="password_log" value="<?php if(isset($_COOKIE['cpassword'])){ echo base64_decode($_COOKIE['cpassword']); } ?>" placeholder="Password" class="required requiredField  fg-input text fg-fw" />
                    </li>
                    <li>
                   <div class="chkbox"> <input type="checkbox" id="remember" name="remember" value="true"/>  Remember me</div>
                    </li>
                    <li>
                        <div class="clear"></div>
                        <input class="submit signin_btn fg-btn blue large inline fg-fw bold" type="submit" name="submit" value="Sign In"/>
                        <input type="hidden" name="submitted" id="submitted" value="<?php if(isset($submit_email)){ echo $submit_email;} ?>" />
                    </li>
                </ul>
            </form>

            <div>
                <a class="forgot-password" href="forget_password.php">Forgot Password</a>
                <a id="register" class="signup-btn">Create New Account</a>
                <div class="clearfix"></div>
            </div>
        </div>
        <!--/Signup Container-->
        <!--Login Container-->
        <div id="signup_container">
            <h2 class="signup_heading">Create a Free Account</h2>

            <div class="login_or"></div>
            <div id="div_error_box_reg" >
                <?php
             //   echo validation_errors();
                isset($r_error) ? $e = $r_error : $e = "";
                echo $e;
                isset($alert_message) ? $message = $alert_message : $message = "";
                echo $message;
                ?>
            </div>
                 <form action="#" id="freesigninForm" class="freesigninForm" method="post" onsubmit='return login_form_reg()'>
                     <ul>
                    <li>
                        <input type="text" name="uname" id="reg_uname" value="" placeholder="Full Name" class="required requiredField Username fg-input text fg-fw" />
                    </li>
                    <li>
                        <input type="text" name="email" id="reg_email" value="" placeholder="Email" class="required requiredField Email fg-input text fg-fw" />
                    </li>
                    <li>
                        <input type="password" name="password" id="reg_password" value="" placeholder="Password" class="required requiredField Password fg-input text fg-fw" />
                    </li>

                    <div class="clear"></div>
                    <li>
                        <input style="display: none;" id="reg_check3" type="checkbox" name="check" value="YES" checked/>
                        <span style="display: none;"><a href='http://www.formget.com/terms-conditions/' target='_blank'>I agree with terms and conditions</a></span>
                        <input class="submit fg-btn blue large inline fg-fw bold" type="submit" name="usubmit" value="Create Account"/>
                        <input type="hidden" name="submitted" id="submitted" value="true" />
                    </li>
                </ul>
            </form>
            <div>
                <a id="signin" class="signup-btn">Sign In</a>
                <div class="clearfix"></div>
            </div>
        </div>
        <!--/Login Container-->
        <div class="fg-spinner" id="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    </div>
</div>
</body>
</html>
