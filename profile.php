<?php
	include('session.php');
	if(!isset($_SESSION['email'])){
		header("Location: login.php");
		exit();
	}
include('update_password.php');
include('update_detail.php');
include('user_detail.php');
    if (isset($msg)) {
        $msg = $msg;
    } else {
        $msg = '';
    }
?>
    <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Profile</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" type="text/css" href="css/global.css">
            <link rel="stylesheet" type="text/css" href="css/fg-main-style.css">
        </head>
        <body>
            <div id="main-wrapper" class="container-fluid">

                <!-- Header Section -->
                <div class="row">
                    <div class="main-header">
                        <div class="col-xs-3 col-sm-3 col-md-3">
                            <a href="#" class="logo"><img src="images/formget_login-logo.png" alt="Formget Fugo"></a>
                        </div>
                        <div class="col-xs-9 col-sm-9 col-md-9">
                            <div>
                                <div class="user-nav">
                                    <span class="wel-name">Welcome  <?php if(isset($login_name)){echo $login_name; }?></span>
                                    <div id="user-img">
                                        <img src="images/user-img.png" alt="Profile Picture">
                                        <span class="arrow-down"></span>
                                        <div id="fg-dropdown">
                                            <div class="fg-dropdown-inner">
                                                <ul>
                                                    <li><a href="index.php" class="first">Home</a></li>
                                                    <li><a href="profile.php">Account Settings</a></li>
                                                    <li><a href="logout.php" >Log out</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="fg-clear"></div>

                        <div class="fg-clear"></div>
                    </div>
                </div>

                <!-- Middle Section -->
                <div class="row  main-container blue-bg">
                    <div class="col-md-3 nopadding">

                        <div id="sidebar">
                            <h3>Preferences</h3>
                            <hr>
                            <ul class="all-options">
                                <li><a href="index.php"><i class="icon-arrow-right5"></i>Home</a></li>
                                <li><a href="profile.php"><i class="icon-arrow-right5"></i>My Profile</a></li>

                            </ul>
                        </div>

                    </div>
                    <div class="col-md-9 nopadding">

                        <div id="right-section-wrapper">
                            <div class="top-section-heading">
                                <?php if ($msg == 'updated') { ?>
                                    <h2>Password Updated Successfully</h2>
                                <?php } ?>

                            </div>

                            <div class="clearfix"></div>
                            <div class="fg-parent-box">
                                <div class="fg-box first">
                                    <p class="fg-box-header relative rl-pad">Change Password</p>
                                    <div class="fg-inner-box rl-pad">
                                        <form action="profile.php" method="post">
                                            <div class="fg-row">
                                                <label class="block fg-label">Old Password</label>
                                                <input type="password" class="fg-input text fg-fw" required name="oldpassword">
                                                <?php if ($msg == 'not') { ?>
                                                    <p class="err_msg">please enter your right Old Password...!!</p>
                                                <?php } else { ?>

                                                    <p class="fg-help">Write Your Old Passowrd.</p>
                                                <?php } ?>
                                            </div>
                                            <div class="fg-row">
                                                <label class="block fg-label">New Password</label>
                                                <input type="password" class="fg-input text fg-fw" required name="newpassword">
                                                <?php if ($msg == 'notconfirm') { ?>
                                                    <p class="err_msg">Password Not Match</p>
                                                <?php } else { ?>

                                                    <p class="fg-help">Write Your new Passowrd.</p>
                                                <?php } ?>
                                            </div>
                                            <div class="fg-row">
                                                <input type="hidden" value="<?php echo $_SESSION['email']; ?>" name="user_id"/>                                            <label class="block fg-label">Confirm New Password</label>
                                                <input type="password" class="fg-input text fg-fw" required name="confirmpassword">
                                                <?php if ($msg == 'notconfirm') { ?>
                                                    <p class="err_msg">Password Not Match</p>
                                                <?php } else { ?>

                                                    <p class="fg-help">Confirm Your New Passowrd.</p>
                                                <?php } ?>

                                            </div>

                                            <div class="fg-row last">
                                                <input type="submit" class="fg-btn green medium inline" name="updatePassword" value="Update Password">
                                            </div>
                                        </form>
                                    </div>
                                </div><!-- fg-box End -->

                            </div><!-- fg-parent-box End-->

                                  <div class="top-section-heading">
                                <?php if (isset($user_detail)) { ?>
                                    <h2>Details Updated Successfully</h2>
                                <?php } ?>

                            </div>
                            <div class="clearfix"></div>
                            <div class="fg-parent-box">   <!-- Second fg-parent-box start-->
                                <div class="fg-box first">
                                    <p class="fg-box-header relative rl-pad">Your Details</p>
                                    <div class="fg-inner-box rl-pad">
                                        <form action="profile.php" method="post">
                                            <div class="fg-row">
                                                <label class="block fg-label">Full Name</label>
                                                <input type="text" class="fg-input text fg-fw" id="reg_uname" value="<?php if(isset($login_name)){echo $login_name; }?>"  required="" name="full_name">
                                                <p class="fg-help">Write Your Full Name.</p>
                                            </div>
                                            <div class="fg-row">
                                                <label class="block fg-label">Mobile Number</label>
                                                <input type="text" class="fg-input text fg-fw"  name="mobile_number" value="<?php if(isset($login_contact_no)){echo $login_contact_no; } ?>"/>
                                                <p class="fg-help">Write Your Mobile Number.</p>
                                            </div>
                                            <div class="fg-row">
                                                <input type="hidden" value="<?php echo $_SESSION['email'] ?>" name="user_id"/>
                                                <label class="block fg-label">Address</label>
                                                <input type="text" class="fg-input text fg-fw" name="address" value="<?php if(isset($login_address)){echo $login_address; } ?>">
                                                <p class="fg-help">Write Your address.</p>
                                            </div>

                                            <div class="fg-row last">
                                                <input type="submit" class="fg-btn green medium inline" name="updateDetail" value="Update Details">
                                            </div>
                                        </form>
                                    </div>
                                </div><!-- fg-box End -->

                            </div><!-- Second fg-parent-box End-->
                        </div><!-- right-section-wrapper End -->
                    </div>
                </div>

                <!-- Footer Section -->
                <div class="row">
                    <div class="main-footer">
                        <div class="link-footer">
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Features</a></li>
                                <li><a href="#">Faqs</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Affiliates</a></li>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Terms &amp; Conditions and License</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Contact Us</a></li>
                            </ul>
                        </div>
                        <div class="copyright-footer">
                            <p>2015 &copy; FormGet.com All rights reserved.</p>
                        </div>
                    </div>
                </div>

            </div><!-- Main wrapper closing -->
            <script src="js/plugin.js"></script>
            <script src="js/fg-script.js"></script>
        </body>
    </html>
