<?php
class request_login{

	function load($opts){
		//parse $opts
		if(!array_key_exists('id_entry',$opts) ||!array_key_exists('usr_pwd',$opts))return 'error format of opts!';

		$id_entry=$opts['id_entry'];
		$title=array_key_exists('title',$opts)?$opts['title']:'Login';
		$usr_pwd=$opts['usr_pwd'];
		$duration=array_key_exists('duration',$opts)?$opts['duration']:72;
		$background_img=array_key_exists('background_img',$opts)?$opts['background_img']:NULL;

		//check post
		if (isset($_POST["usr"])) {
			$allow_entry=false;
			$name = trim(filter_input(INPUT_POST,"usr",FILTER_SANITIZE_STRING));
			$passwd = trim(filter_input(INPUT_POST,"pwd",FILTER_SANITIZE_STRING));
			foreach ($usr_pwd as $usr=>$pwd) {
				if ($name == $usr && $passwd == $pwd) {
					$allow_entry=true;
					$_SESSION['user'] = $usr;
				}
			}
			if($allow_entry){
				setcookie($id_entry,$id_entry, time() + 3600 * $duration);
				echo 'Approved';

				}else{
				echo (empty($passwd)) ? "Please input password" : "Wrong name or password!";
			}
			sleep(.5);
			exit;
		}

		//normal entry
		if (!isset($_COOKIE[$id_entry])) {
		?>
<head>
	<meta name="robots" content="noindex">
	<link rel="icon" type="image/png" href="icon.png">
	<title><?php echo $title; ?></title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.2.1/material.min.css" />
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.2.1/material.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>

  
	<style>
		.mdl-layout{
		background: url(<?php echo "$background_img"; ?>) no-repeat center center fixed;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
		background-size: cover;
		}
		.mdl-layout {
		align-items: center;
		justify-content: center;
		}
		.mdl-layout__content {
		padding: 24px;
		flex: none;
	}
	</style>
</head>
<body>
	<div class="mdl-layout mdl-js-layout mdl-color--grey-100">
		<main class="mdl-layout__content">
			<div class="mdl-card mdl-shadow--6dp">
    			<div class="mdl-card__title mdl-color--primary mdl-color-text--white">
    			    <h2 class="mdl-card__title-text"><script>document.write(document.title);</script></h2>
    			</div>
    			<div class="mdl-card__supporting-text">
        			<div class="mdl-textfield mdl-js-textfield">
        			    <input class="mdl-textfield__input" type="text" id="usr" />
        			    <label class="mdl-textfield__label" for="usr">Username</label>
        			</div>
        			<div class="mdl-textfield mdl-js-textfield">
        			    <input class="mdl-textfield__input" type="password" id="pwd" />
        			    <label class="mdl-textfield__label" for="pwd">Password</label>
        			</div>
    			</div>
    			<div class="mdl-card__actions mdl-card--border">
    			    <button id="submit" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Log in</button>
    			</div>
			</div>
		</main>
	</div>
	<dialog id="dialog" class="mdl-dialog">
      <h3 class="mdl-dialog__title">Error</h3>
      <div class="mdl-dialog__content">
        <p></p>
      </div>
      <div class="mdl-dialog__actions">
        <button type="button" class="mdl-button close">OK</button>
      </div>
    </dialog>
	<script>
		$("#submit").click(function(){
			$.post("#",{usr: $("#usr").val(),pwd: $("#pwd").val()},
    			function(data){
    			if(data.indexOf('Approved') > -1){
    			    location.reload();
    			}else{
    			    var dialog = document.querySelector('dialog');
                    if (! dialog.showModal) {
                        dialogPolyfill.registerDialog(dialog);
                    }
                    $("#dialog .mdl-dialog__content p").text(data);
                    dialog.showModal();
                    dialog.querySelector('.close').addEventListener('click', function() {
                        dialog.close();
                    });
    			}
			});
		});
	</script>
</body>
	<?php
		    exit;
		    }
	    }

    }
?>
