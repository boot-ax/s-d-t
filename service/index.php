<?php

require '../vendor/autoload.php';
include '../inc/functions2.php';
use Stripe\Stripe;
use Mailgun\Mailgun;




//date_default_timezone_set('UTC');

$jwt_key = "joelikeshisinflatablebal$22";

// Map your method
Flight::map('basicDelete', function(){
  $entityBody = Flight::request()->getBody();
  include "../inc/connection2.php";
  global $jwt_key;
  $entityBody = str_replace('\\u0000', '', $entityBody);
  $entityBody2 = json_decode($entityBody,true);
  $jwt = substr($_SERVER['HTTP_AUTHORIZATION'],7);
  $validator = new \Gamegos\JWT\Validator();
  $token = $validator->validate($jwt, $jwt_key);
  $goodData = json_decode($token->getClaims()['sub']);
  $email = $goodData->user_email;
  $security = $goodData->user_security;
  $sql_security = "SELECT rt.user_type, rt.account_ID FROM registration rt
  where user_security = ?
  AND user_email = ?";
  $stmt = $mysqli->prepare($sql_security);
  $stmt->bind_param('ss', $security, $email);
  if(!$stmt->execute()){
    Flight::halt(401,"User not authorized");
  }
  $sql_array = array();
  $result = $stmt->get_result();
  $result = $result->fetch_assoc();
  $stmt->close();
  return $result;
});


Flight::map('basicSecurity', function(){
  $entityBody = Flight::request()->getBody();
  include "../inc/connection2.php";
  global $jwt_key;
  $entityBody = str_replace('\\u0000', '', $entityBody);
  $entityBody2 = json_decode($entityBody,true);
  $jwt = substr($_SERVER['HTTP_AUTHORIZATION'],7);
  $validator = new \Gamegos\JWT\Validator();
  $token = $validator->validate($jwt, $jwt_key);
  $goodData = json_decode($token->getClaims()['sub']);
  $email = $goodData->user_email;
  $security = $goodData->user_security;
  $sql_security = "SELECT rt.account_ID FROM registration rt
  where user_security = ?
  AND user_email = ?";
  $stmt = $mysqli->prepare($sql_security);
  $stmt->bind_param('ss', $security, $email);
  if(!$stmt->execute()){
    Flight::halt(401,"User not authorized");
  }
  $sql_array = array();
  $result = $stmt->get_result();
  $result = $result->fetch_assoc();
  $stmt->close();
  $sql_array['entityBody2'] = $entityBody2;
  $sql_array['account_ID'] = $result['account_ID'];
  return $sql_array;
});

Flight::map('getStart', function(){
  include "../inc/connection2.php";
  global $jwt_key;
  $jwt = substr($_SERVER['HTTP_AUTHORIZATION'],7);
  $validator = new \Gamegos\JWT\Validator();
  $token = $validator->validate($jwt, $jwt_key);
  $goodData = json_decode($token->getClaims()['sub']);
  $email = $goodData->user_email;
  $security = $goodData->user_security;
  $sql_security = "SELECT rt.user_type, rt.account_ID FROM registration rt
  where user_security = ?
  AND user_email = ?";
  $stmt = $mysqli->prepare($sql_security);
  $stmt->bind_param('ss', $security, $email);
  if(!$stmt->execute()){
    Flight::halt(401,"User not authorized");
  }
  $result = $stmt->get_result();
  $result = $result->fetch_assoc();
  $stmt->close();
  $limit = $_GET['limit'];
  $limit = filter_var($limit,FILTER_SANITIZE_NUMBER_INT);
  $filter = $_GET['filter'];
  $filter = "%".$filter."%";
  $order = $_GET['order'];
  $orderOrder = "";
  if (strpos($order, '-') !== false) {
    $orderOrder = "DESC";
    } else {$orderOrder = "ASC";}
  $order = htmlspecialchars($order);
  $order = $mysqli->escape_string($order);
  $page = $_GET['page'];
  $page = filter_var($page,FILTER_SANITIZE_NUMBER_INT);
  $all = $_GET['all'];
  $all = filter_var($all,FILTER_SANITIZE_STRING);
  if ($all ==='true'){
    $limit = '';
  };

  if($result['user_type'] === 'superuser'){
    $alpha = "LIKE '%'";
  } else {
    $alpha = $result['account_ID'];
    $alpha = "= '".$alpha."'";
  }

  $start_from = ($page-1) * $limit;

  $sql_array = array(
    'alpha'=> $alpha,
    'all'=>$all,
    'filter'=>$filter,
    'start_from'=>$start_from,
    'orderOrder'=>$orderOrder,
    'limit'=>$limit,
    'order'=>$order
  );
  return $sql_array;
});

Flight::before('start', function(&$params, &$output){
    global $jwt_key;

    $request = Flight::request();
    $url = $request->url;
    if($url !== '/auth/login' & $url !== '/signup/' & $url !== '/stripe-991c8971ff31a83c454f371f55c85be5'){
      $jwt = substr($_SERVER['HTTP_AUTHORIZATION'],7);
      try{
				$validator = new \Gamegos\JWT\Validator();
				$token = $validator->validate($jwt, $jwt_key);

        $request->data->user = json_decode($token->getClaims()['sub']);
				//Used to check the token information being injected into the request object of Flight PHP
				// var_dump($request->data->user);
				// die();
      }catch(Exception $e){
        // Flight::redirect('https://dev.webwright.io', [401]) // Redirects to another URL.
        Flight::halt(401,"User not authorized");
      }
    }
});

Flight::route('POST /auth/login', function(){
	global $jwt_key;
	$entityBody = Flight::request()->getBody();
	include "../inc/connection2.php";

	$entityBody = str_replace('\\u0000', '', $entityBody);
	$entityBody2 = json_decode($entityBody,true);
	// build query...


    $sql  = "SELECT user_name, user_email,user_security FROM registration
		WHERE (`user_email` = ?)
		AND (`user_password` = md5(?))
    AND (`user_type` != 'no_access');";

    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('ss', $entityBody2['email'], $entityBody2['password']);
    if(!$stmt->execute()){
      Flight::halt(401,"User not authorized");
    }
    $sql_array = array();
    $result = $stmt->get_result();
    var_dump($result->num_rows);

		if($result->num_rows>0){
			$user = $result->fetch_assoc();

      $stmt->close();

  	$alg = "HS256";

  	$token = new \Gamegos\JWT\Token();
  	$token->setClaim('sub', json_encode($user));
  	$token->setClaim('exp', time()+60*60*24*7);

  	$encoder = new \Gamegos\JWT\Encoder();
  	$encoder->encode($token, $jwt_key, $alg);

  	Flight::json(array('token'=>$token->getJWT()));
  } else {
    	FLight::halt(401,"Email or password is incorrect.");
    }

});


Flight::route('POST /cms_login', function(){
	include "../inc/connection2.php";
  $sqlArray = Flight::basicSecurity();
  $entityBody2 = $sqlArray['entityBody2'];
  $account = $sqlArray['account_ID'];
  $entityBody2['cms_login_table']['account_ID'] = $account;
  unset($entityBody2["cms_login_table"]["user_email"]);
  unset($entityBody2["cms_login_table"]["user_security"]);
    $body3 = array();
    foreach ($entityBody2["cms_login_table"] as $key => $value) {
    $key = $mysqli->real_escape_string($key);
    $value = $mysqli->real_escape_string($value);
    $body3[$key] = $value;
  }
   $sql  = "INSERT INTO cms_login";
   $sql .= " (`".implode("`, `", array_keys($body3))."`)";
	 $sql .= " VALUES (\"".implode("\", \"", $body3)."\");";

    if(!$mysqli->query($sql)){
      Flight::halt(500,$mysqli->error);
    }else{
     $mysqli->close();
     Flight::halt(200,"Domain Added.");
    }

  });

Flight::route('POST /domains', function(){
  include "../inc/connection2.php";
  $sqlArray = Flight::basicSecurity();
  $entityBody2 = $sqlArray['entityBody2'];
  $account = $sqlArray['account_ID'];
    $entityBody2['domains_table']['account_ID'] = $account;
    unset($entityBody2["domains_table"]["user_email"]);
    unset($entityBody2["domains_table"]["user_security"]);
    $body3 = array();
    foreach ($entityBody2["domains_table"] as $key => $value) {
    $key = $mysqli->real_escape_string($key);
    $value = $mysqli->real_escape_string($value);
    $body3[$key] = $value;
  }
   $sql  = "INSERT INTO domains";
   $sql .= " (`".implode("`, `", array_keys($body3))."`)";
	 $sql .= " VALUES (\"".implode("\", \"", $body3)."\");";

    if(!$mysqli->query($sql)){
      Flight::halt(500,$mysqli->error);
    }else{
     $mysqli->close();
     Flight::halt(200,"Domain Added.");
    }

});


Flight::route('POST /url_data', function(){

  $mg = new Mailgun("key-ec9388937d006572057b2b518dab3159");
  $domain = "zipps.webwright.io";

  # Now, compose and send your message.
  $mg->sendMessage($domain, array('from'    => 'holyCow@example.com',
                                  'to'      => 'jkolnik@mac.com',
                                  'subject' => 'The PHP SDK is awesome!',
                                  'text'    => 'My first programatically sent email list.   It is so simple to send a message.'));

      // 	$entityBody = Flight::request()->getBody();
      //
      //
      //
      // 	include "../inc/connection.php";
      //
      // 	$entityBody = str_replace('\\u0000', '', $entityBody);
      // 	$entityBody2 = json_decode($entityBody,true);
      //
      // 	// build query...
      //    $sql  = "INSERT INTO url_data";
      //    // implode keys of $array...
      //    $sql .= " (`".implode("`, `", array_keys($entityBody2['url_data_table']))."`)";
      //    // implode values of $array...
      // 	 $sql .= " VALUES (\"".implode("\", \"", $entityBody2['url_data_table'])."\");";
      //
      //
      //  // execute query...
      //   $qry_result = mysqli_query($con, $sql);
      //   if($qry_result){
      // 	  Flight::halt(200,"Resource login Added.");
      //   }else{
      // 	  Flight::halt(500,mysqli_error($con));
      // 	  //die(mysqli_error($con));
      //   }
      //
 });

Flight::route('POST /software_keys', function(){
   include "../inc/connection2.php";
   $sqlArray = Flight::basicSecurity();
   $entityBody2 = $sqlArray['entityBody2'];
   $account = $sqlArray['account_ID'];
   $entityBody2['software_keys_table']['account_ID'] = $account;
   unset($entityBody2["software_keys_table"]["user_email"]);
   unset($entityBody2["software_keys_table"]["user_security"]);
        $body3 = array();
     foreach ($entityBody2["software_keys_table"] as $key => $value) {
     $key = $mysqli->real_escape_string($key);
     $value = $mysqli->real_escape_string($value);
     $body3[$key] = $value;
   }
   $sql  = "INSERT INTO software_keys";
    $sql .= " (`".implode("`, `", array_keys($body3))."`)";
 	 $sql .= " VALUES (\"".implode("\", \"", $body3)."\");";

   if(!$mysqli->query($sql)){
     Flight::halt(500,$mysqli->error);
   }else{
    $mysqli->close();
    Flight::halt(200,"Software Key Added.");
   }

 });


Flight::route('POST /resource_login', function(){
  include "../inc/connection2.php";
  $sqlArray = Flight::basicSecurity();
  $entityBody2 = $sqlArray['entityBody2'];
  $account = $sqlArray['account_ID'];
  $entityBody2['resource_login_table']['account_ID'] = $account;
  unset($entityBody2["resource_login_table"]["user_email"]);
  unset($entityBody2["resource_login_table"]["user_security"]);
  $body3 = array();
  foreach ($entityBody2["resource_login_table"] as $key => $value) {
  $key = $mysqli->real_escape_string($key);
  $value = $mysqli->real_escape_string($value);
  $body3[$key] = $value;
    }
   $sql  = "INSERT INTO resource_login";
   $sql .= " (`".implode("`, `", array_keys($body3))."`)";
	 $sql .= " VALUES (\"".implode("\", \"", $body3)."\");";

    if(!$mysqli->query($sql)){
      Flight::halt(500,$mysqli->error);
    }else{
     $mysqli->close();
     Flight::halt(200,"Resource login Added.");
    }

});

Flight::route('POST /W2_accounts', function(){
  include "../inc/connection2.php";
  $sqlArray = Flight::basicSecurity();
  $entityBody2 = $sqlArray['entityBody2'];
  $account = $sqlArray['account_ID'];
  $entityBody2['W2_accounts_table']['account_ID'] = $account;
  unset($entityBody2["W2_accounts_table"]["user_email"]);
  unset($entityBody2["W2_accounts_table"]["user_security"]);
  $body3 = array();
  foreach ($entityBody2["W2_accounts_table"] as $key => $value) {
  $key = $mysqli->real_escape_string($key);
  $value = $mysqli->real_escape_string($value);
  $body3[$key] = $value;
  }
   $sql  = "INSERT INTO W2_accounts";
   $sql .= " (`".implode("`, `", array_keys($body3))."`)";
	 $sql .= " VALUES (\"".implode("\", \"", $body3)."\");";

    if(!$mysqli->query($sql)){
      Flight::halt(500,$mysqli->error);
    }else{
     $mysqli->close();
     Flight::halt(200,"W2 Account Added.");
    }

});

Flight::route('POST /hosting', function(){
  include "../inc/connection2.php";
  $sqlArray = Flight::basicSecurity();
  $entityBody2 = $sqlArray['entityBody2'];
  $account = $sqlArray['account_ID'];
  $entityBody2['hosting_table']['account_ID'] = $account;
  unset($entityBody2["hosting_table"]["user_email"]);
  unset($entityBody2["hosting_table"]["user_security"]);
  $body3 = array();
  foreach ($entityBody2["hosting_table"] as $key => $value) {
  $key = $mysqli->real_escape_string($key);
  $value = $mysqli->real_escape_string($value);
  $body3[$key] = $value;
  }
   $sql  = "INSERT INTO hosting";
   $sql .= " (`".implode("`, `", array_keys($body3))."`)";
	 $sql .= " VALUES (\"".implode("\", \"", $body3)."\");";

    if(!$mysqli->query($sql)){
      Flight::halt(500,$mysqli->error);
    }else{
     $mysqli->close();
     Flight::halt(200,"Host Added.");
    }

});

Flight::route('POST /person', function(){
  include "../inc/connection2.php";
  $sqlArray = Flight::basicSecurity();
  $entityBody2 = $sqlArray['entityBody2'];
  $account = $sqlArray['account_ID'];
  $entityBody2['person_table']['user_password'] = md5($entityBody2['person_table']['user_password']);
  $entityBody2['person_table']['account_ID'] = $account;
  $entityBody2['person_table']['user_security'] = randomPassword();
  $entityBody2['person_table']['user_email'] = $entityBody2['person_table']['user_email2'];
  unset($entityBody2["person_table"]["user_email2"]);
  $body3 = array();
  foreach ($entityBody2["person_table"] as $key => $value) {
  $key = $mysqli->real_escape_string($key);
  $value = $mysqli->real_escape_string($value);
  $body3[$key] = $value;
  }
   $sql  = "INSERT INTO registration";
   $sql .= " (`".implode("`, `", array_keys($body3))."`)";
	 $sql .= " VALUES (\"".implode("\", \"", $body3)."\");";

    if(!$mysqli->query($sql)){
      Flight::halt(500,$mysqli->error);
    }else{
     $mysqli->close();
     Flight::halt(200,"Person Added.");
    }
});

Flight::route('POST /links', function(){
  include "../inc/connection2.php";
  $sqlArray = Flight::basicSecurity();
  $entityBody2 = $sqlArray['entityBody2'];
  $account = $sqlArray['account_ID'];
  $entityBody2['links_table']['account_ID'] = $account;
  unset($entityBody2["links_table"]["user_email"]);
  unset($entityBody2["links_table"]["user_security"]);
  $body3 = array();
  foreach ($entityBody2["links_table"] as $key => $value) {
  $key = $mysqli->real_escape_string($key);
  $value = $mysqli->real_escape_string($value);
  $body3[$key] = $value;
  }
   $sql  = "INSERT INTO links";
   $sql .= " (`".implode("`, `", array_keys($body3))."`)";
	 $sql .= " VALUES (\"".implode("\", \"", $body3)."\");";

    if(!$mysqli->query($sql)){
      Flight::halt(500,$mysqli->error);
    }else{
     $mysqli->close();
     Flight::halt(200,"Link Added.");
    }

});

Flight::route('POST /change_log', function(){



	$entityBody = Flight::request()->getBody();
	include "../inc/connection.php";

	$entityBody = str_replace('\\u0000', '', $entityBody);
	var_dump($entityBody);
	$entityBody2 = json_decode($entityBody,true);

	// build query...
   $sql  = "INSERT INTO change_log";
   // implode keys of $array...
   $sql .= " (`".implode("`, `", array_keys($entityBody2['change_log_table']))."`)";
   // implode values of $array...
	 $sql .= " VALUES (\"".implode("\", \"", $entityBody2['change_log_table'])."\");";


 // execute query...
  $qry_result = mysqli_query($con, $sql);
  if($qry_result){
	  Flight::halt(200,"Change Log added.");
  }else{
	  Flight::halt(500,mysqli_error($con));
	  //die(mysqli_error($con));
  }

});

Flight::route('POST /registrar', function(){
  include "../inc/connection2.php";
  $sqlArray = Flight::basicSecurity();
  $entityBody2 = $sqlArray['entityBody2'];
  $account = $sqlArray['account_ID'];
  $entityBody2['registrar_table']['account_ID'] = $account;
  unset($entityBody2["registrar_table"]["user_email"]);
  unset($entityBody2["registrar_table"]["user_security"]);
  $body3 = array();
  foreach ($entityBody2["registrar_table"] as $key => $value) {
  $key = $mysqli->real_escape_string($key);
  $value = $mysqli->real_escape_string($value);
  $body3[$key] = $value;
  }
   $sql  = "INSERT INTO registrar";
   $sql .= " (`".implode("`, `", array_keys($body3))."`)";
	 $sql .= " VALUES (\"".implode("\", \"", $body3)."\");";
   if(!$mysqli->query($sql)){
      Flight::halt(500,$mysqli->error);
    }else{
     $mysqli->close();
     Flight::halt(200,"Registrar Added.");
    }
});


Flight::route('GET /hosting', function(){
  include "../inc/connection2.php";
  $sql_array = Flight::getStart();

	$sql_query = "SELECT SQL_CALC_FOUND_ROWS hosting_name,login_url,username,password,date_started,expiration_date,creditcard_last_4,setup_domain,hosting_ID FROM hosting ht
          WHERE (ht.account_ID ".$sql_array['alpha']. ")
					AND ((`hosting_name` LIKE ?)
					OR (`login_url` LIKE ?)
					OR (`username` LIKE ?)
					OR (`password` LIKE ?)
					OR (`date_started` LIKE ?)
					OR (`expiration_date` LIKE ?)
					OR (`creditcard_last_4` LIKE ?)
					OR (`setup_domain` LIKE ?))";
					if($sql_array['all'] !=='true'){
						$sql_query .=
				"	ORDER BY `". str_replace("-",'',$sql_array['order']) ."` ".$sql_array['orderOrder'] .
				" LIMIT ".$sql_array['start_from'].",". $sql_array['limit']."";
					};
          $stmt = $mysqli->prepare($sql_query);
          $stmt->bind_param('ssssssss',$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter']);
          if(!$stmt->execute()){
            Flight::halt(401,$stmt->error);
          }
          $sql_array = array();
          $result = $stmt->get_result();
          $sql_result = array();
          while ($row = $result->fetch_assoc()) {
              $sql_result[] = $row;
            }
    		$qry_result = $mysqli->query("SELECT FOUND_ROWS()");
    		$num_rows = $qry_result->fetch_array(MYSQLI_NUM);
    		$newArray = array('page'=>$page,'count'=>$num_rows[0],'data'=>$sql_result);
        $stmt->close();
        $qry_result->close();
    	Flight::json($newArray);

});

Flight::route('GET /person', function(){
  include "../inc/connection2.php";
  $sql_array = Flight::getStart();

	$sql_query = "SELECT SQL_CALC_FOUND_ROWS user_name,user_email,user_address,user_phone,user_type,user_ID FROM registration rgt
          WHERE (rgt.account_ID ".$sql_array['alpha']. ")
					AND ((`user_name` LIKE ?)
					OR (`user_email` LIKE ?)
					OR (`user_address` LIKE ?)
					OR (`user_phone` LIKE ?)
					OR (`user_type` LIKE ?))";
          if($sql_array['all'] !=='true'){
						$sql_query .=
				"	ORDER BY `". str_replace("-",'',$sql_array['order']) ."` ".$sql_array['orderOrder'] .
				" LIMIT ".$sql_array['start_from'].",". $sql_array['limit']."";
					};
          $stmt = $mysqli->prepare($sql_query);
          $stmt->bind_param('sssss',$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter']);
          if(!$stmt->execute()){
            Flight::halt(401,$stmt->error);
          }
          $sql_array = array();
          $result = $stmt->get_result();
          $sql_result = array();
          while ($row = $result->fetch_assoc()) {
              $sql_result[] = $row;
            }
    		$qry_result = $mysqli->query("SELECT FOUND_ROWS()");
    		$num_rows = $qry_result->fetch_array(MYSQLI_NUM);
    		$newArray = array('page'=>$page,'count'=>$num_rows[0],'data'=>$sql_result);
        $stmt->close();
        $qry_result->close();
    	Flight::json($newArray);

});

Flight::route('GET /links', function(){
  include "../inc/connection2.php";
  $sql_array = Flight::getStart();

	$sql_query = "SELECT SQL_CALC_FOUND_ROWS source_url,target_url,anchor_text,alt_text,follow_link,date_created,title,comment,link_ID FROM links lk
          WHERE (lk.account_ID ".$sql_array['alpha']. ")
					AND ((`source_url` LIKE ?)
					OR (`target_url` LIKE ?)
					OR (`anchor_text` LIKE ?)
					OR (`alt_text` LIKE ?)
					OR (`follow_link` LIKE ?)
					OR (`date_created` LIKE ?)
					OR (`title` LIKE ?)
					OR (`comment` LIKE ?))";
          if($sql_array['all'] !=='true'){
						$sql_query .=
				"	ORDER BY `". str_replace("-",'',$sql_array['order']) ."` ".$sql_array['orderOrder'] .
				" LIMIT ".$sql_array['start_from'].",". $sql_array['limit']."";
					};
          $stmt = $mysqli->prepare($sql_query);
          $stmt->bind_param('ssssssss',$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter']);
          if(!$stmt->execute()){
            Flight::halt(401,$stmt->error);
          }
          $sql_array = array();
          $result = $stmt->get_result();
          $sql_result = array();
          while ($row = $result->fetch_assoc()) {
              $sql_result[] = $row;
            }
    		$qry_result = $mysqli->query("SELECT FOUND_ROWS()");
    		$num_rows = $qry_result->fetch_array(MYSQLI_NUM);
    		$newArray = array('page'=>$page,'count'=>$num_rows[0],'data'=>$sql_result);
        $stmt->close();
        $qry_result->close();
    	Flight::json($newArray);

});

Flight::route('GET /change_log', function(){
  include "../inc/connection.php";
  	$limit = $_GET['limit'];
  	$filter = $_GET['filter'];
  	$filter = htmlspecialchars($filter);
  	$filter = mysqli_real_escape_string($con, $filter);
  	$order = $_GET['order'];
  	$orderOrder = "";
  	if (strpos($order, '-') !== false) {
      $orderOrder = "DESC";
  		} else {$orderOrder = "ASC";}
  	$order = htmlspecialchars($order);
  	$order = mysqli_real_escape_string($con, $order);
  	$page = $_GET['page'];
  	$all = $_GET['all'];
  	if ($all ==='true'){
  		$limit = '';
  	};
  	$start_from = ($page-1) * $limit;
  	$sql_query = "SELECT SQL_CALC_FOUND_ROWS change_log.issue,change_log.date_entered,change_log.completed,change_log.change_log_ID,change_log.user_ID,registration.user_name,registration.user_email FROM change_log
  					LEFT JOIN `registration` ON change_log.user_ID = registration.user_ID
  					WHERE (`issue` LIKE '%".$filter."%')
  					OR (`date_entered` LIKE '%".$filter."%')
  					OR (`completed` LIKE '%".$filter."%')
  					OR (`user_name` LIKE '%".$filter."%')
  					OR (`user_email` LIKE '%".$filter."%')";
  					if($all !=='true'){
  						$sql_query .=
  				"	ORDER BY `". str_replace("-",'',$order) ."` ".$orderOrder .
  				" LIMIT ".$start_from.",". $limit."";
  					};
    	$qry_result = mysqli_query($con, $sql_query) or die(mysqli_error($con));
  	$rows = array();
  			while($r = mysqli_fetch_assoc($qry_result)) {
      			$rows[] = $r;
  				}
  		$qry_result = mysqli_query($con, "SELECT FOUND_ROWS()");
  		$num_rows = mysqli_fetch_array($qry_result);
  		$newArray = array('page'=>$page,'count'=>$num_rows[0],'data'=>$rows);
  	Flight::json($newArray);
  	//echo (str_replace('\u0000', '', json_encode($newArray)));
  });

Flight::route('GET /registrar', function(){
  include "../inc/connection2.php";
  $sql_array = Flight::getStart();

	$sql_query = "SELECT SQL_CALC_FOUND_ROWS rgt.registrar_name,rgt.login_url,rgt.login_username,rgt.login_password,rgt.credit_card_last_4,rgt.registrar_ID,regit.user_name,regit.user_email FROM registrar rgt


					LEFT JOIN `registration` regit ON rgt.user_ID = regit.user_ID
          WHERE (rgt.account_ID ".$sql_array['alpha']. ")
					AND ((`registrar_name` LIKE ?)
					OR (`login_url` LIKE ?)
					OR (`login_username` LIKE ?)
					OR (`login_password` LIKE ?)
					OR (`credit_card_last_4` LIKE ?)
					OR (`user_name` LIKE ?)
					OR (`user_email` LIKE ?))";
          if($sql_array['all'] !=='true'){
						$sql_query .=
				"	ORDER BY `". str_replace("-",'',$sql_array['order']) ."` ".$sql_array['orderOrder'] .
				" LIMIT ".$sql_array['start_from'].",". $sql_array['limit']."";
					};
          $stmt = $mysqli->prepare($sql_query);
          $stmt->bind_param('sssssss',$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter']);
          if(!$stmt->execute()){
            Flight::halt(401,$stmt->error);
          }
          $sql_array = array();
          $result = $stmt->get_result();
          $sql_result = array();
          while ($row = $result->fetch_assoc()) {
              $sql_result[] = $row;
            }
    		$qry_result = $mysqli->query("SELECT FOUND_ROWS()");
    		$num_rows = $qry_result->fetch_array(MYSQLI_NUM);
    		$newArray = array('page'=>$page,'count'=>$num_rows[0],'data'=>$sql_result);
        $stmt->close();
        $qry_result->close();
    	Flight::json($newArray);

});

Flight::route('GET /url_data', function(){

  	include "../inc/connection.php";
  	$limit = $_GET['limit'];
  	$filter = $_GET['filter'];
  	$filter = htmlspecialchars($filter);
  	$filter = mysqli_real_escape_string($con, $filter);
  	$order = $_GET['order'];
  	$orderOrder = "";
  	if (strpos($order, '-') !== false) {
      $orderOrder = "DESC";
  		} else {$orderOrder = "ASC";}
  	$order = htmlspecialchars($order);
  	$order = mysqli_real_escape_string($con, $order);
  	$page = $_GET['page'];
  	$all = $_GET['all'];
  	if ($all ==='true'){
  		$limit = '';
  	};
  	$start_from = ($page-1) * $limit;
  	$sql_query1 = "SELECT ose_metrics_ID FROM ose_metrics WHERE id = LAST_INSERT_ID()";
  	$sql_query ="SELECT SQL_CALC_FOUND_ROWS u.*,ose1.domain_authority,ose1.page_authority,ose1.ose_num_links,ose1.ose_status_code,ose1.ose_external_equity,maj1.trust_flow,maj1.citation_flow,maj1.majestic_num_links
          FROM url_data u
          LEFT JOIN `ose_metrics` ose1 ON u.ose_metrics_ID = ose1.ose_metrics_ID
          LEFT JOIN `majestic_metrics` maj1 ON u.majestic_metrics_ID = maj1.majestic_metrics_ID
   					WHERE (`url_name` LIKE '%".$filter."%')
  					OR (`crawl_frequency` LIKE '%".$filter."%')
  					OR (`domain_authority` LIKE '%".$filter."%')
  					OR (`page_authority` LIKE '%".$filter."%')
  					OR (`trust_flow` LIKE '%".$filter."%')
  					OR (`citation_flow` LIKE '%".$filter."%')
  					OR (`ose_num_links` LIKE '%".$filter."%')
  					OR (`majestic_num_links` LIKE '%".$filter."%')";
            if($all !=='true'){
  						$sql_query .=
  				"	ORDER BY `". str_replace("-",'',$order) ."` ".$orderOrder .
  				" LIMIT ".$start_from.",". $limit."";
  					};
    	$qry_result = mysqli_query($con, $sql_query) or die(mysqli_error($con));
  	   $rows = array();
  			while($r = mysqli_fetch_assoc($qry_result)) {
      			$rows[] = $r;
  				}
  		$qry_result = mysqli_query($con, "SELECT FOUND_ROWS()");
  		$num_rows = mysqli_fetch_array($qry_result);
  		$newArray = array('page'=>$page,'count'=>$num_rows[0],'data'=>$rows);
  	Flight::json($newArray);
  	//echo (str_replace('\u0000', '', json_encode($newArray)));
  });

Flight::route('GET /resource_login', function(){
  include "../inc/connection2.php";
  $sql_array = Flight::getStart();

	$sql_query = "SELECT SQL_CALC_FOUND_ROWS rlt.resource_url_name,rlt.name_of_product,rlt.username,rlt.password,rlt.product_description,rlt.resource_url_ID,rgt.user_name,rgt.user_email FROM resource_login rlt

					LEFT JOIN `registration` rgt ON rlt.user_ID = rgt.user_ID
          WHERE (rlt.account_ID ".$sql_array['alpha']. ")
					AND ((`resource_url_name` LIKE ?)
					OR (`name_of_product` LIKE ?)
					OR (`username` LIKE ?)
					OR (`password` LIKE ?)
					OR (`product_description` LIKE ?)
					OR (`user_name` LIKE ?)
					OR (`user_email` LIKE ?))";
          if($sql_array['all'] !=='true'){
						$sql_query .=
				"	ORDER BY `". str_replace("-",'',$sql_array['order']) ."` ".$sql_array['orderOrder'] .
				" LIMIT ".$sql_array['start_from'].",". $sql_array['limit']."";
					};
          $stmt = $mysqli->prepare($sql_query);
          $stmt->bind_param('sssssss',$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter']);
          if(!$stmt->execute()){
            Flight::halt(401,$stmt->error);
          }
          $sql_array = array();
          $result = $stmt->get_result();
          $sql_result = array();
          while ($row = $result->fetch_assoc()) {
              $sql_result[] = $row;
            }
    		$qry_result = $mysqli->query("SELECT FOUND_ROWS()");
    		$num_rows = $qry_result->fetch_array(MYSQLI_NUM);
    		$newArray = array('page'=>$page,'count'=>$num_rows[0],'data'=>$sql_result);
        $stmt->close();
        $qry_result->close();
    	Flight::json($newArray);

});

Flight::route('GET /software_keys', function(){
  include "../inc/connection2.php";
  $sql_array = Flight::getStart();

  $sql_query = "SELECT SQL_CALC_FOUND_ROWS skt.software_name,skt.license_key,skt.serial_number,skt.comments,skt.software_keys_ID,rgt.user_name,rgt.user_email FROM software_keys skt

					LEFT JOIN `registration` rgt ON skt.user_ID = rgt.user_ID
          WHERE (skt.account_ID ".$sql_array['alpha']. ")
					AND ((`software_name` LIKE ?)
					OR (`license_key` LIKE ?)
					OR (`serial_number` LIKE ?)
					OR (`software_keys_ID` LIKE ?)
					OR (`user_name` LIKE ?)
          OR (`comments` LIKE ?)
					OR (`user_email` LIKE ?))";
          if($sql_array['all'] !=='true'){
						$sql_query .=
				"	ORDER BY `". str_replace("-",'',$sql_array['order']) ."` ".$sql_array['orderOrder'] .
				" LIMIT ".$sql_array['start_from'].",". $sql_array['limit']."";
					};
          $stmt = $mysqli->prepare($sql_query);
          $stmt->bind_param('sssssss',$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter']);
          if(!$stmt->execute()){
            Flight::halt(401,$stmt->error);
          }
          $sql_array = array();
          $result = $stmt->get_result();
          $sql_result = array();
          while ($row = $result->fetch_assoc()) {
              $sql_result[] = $row;
            }
    		$qry_result = $mysqli->query("SELECT FOUND_ROWS()");
    		$num_rows = $qry_result->fetch_array(MYSQLI_NUM);
    		$newArray = array('page'=>$page,'count'=>$num_rows[0],'data'=>$sql_result);
        $stmt->close();
        $qry_result->close();
    	Flight::json($newArray);
});

Flight::route('GET /W2_accounts', function(){
  include "../inc/connection2.php";
  $sql_array = Flight::getStart();

	$sql_query = "SELECT SQL_CALC_FOUND_ROWS w2t.login_url_name,w2t.login,w2t.password,w2t.account_url,w2t.attached_domain,w2t.W2_ID,regt.user_name,regt.user_email FROM W2_accounts w2t


					LEFT JOIN `registration` regt ON w2t.user_ID = regt.user_ID
          WHERE (w2t.account_ID ".$sql_array['alpha']. ")
					AND ((`login_url_name` LIKE ?)
					OR (`login` LIKE ?)
					OR (`account_url` LIKE ?)
					OR (`password` LIKE ?)
					OR (`attached_domain` LIKE ?)
					OR (`user_name` LIKE ?)
					OR (`user_email` LIKE ?))";
          if($sql_array['all'] !=='true'){
						$sql_query .=
				"	ORDER BY `". str_replace("-",'',$sql_array['order']) ."` ".$sql_array['orderOrder'] .
				" LIMIT ".$sql_array['start_from'].",". $sql_array['limit']."";
					};
          $stmt = $mysqli->prepare($sql_query);
          $stmt->bind_param('sssssss',$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter']);
          if(!$stmt->execute()){
            Flight::halt(401,$stmt->error);
          }
          $sql_array = array();
          $result = $stmt->get_result();
          $sql_result = array();
          while ($row = $result->fetch_assoc()) {
              $sql_result[] = $row;
            }
    		$qry_result = $mysqli->query("SELECT FOUND_ROWS()");
    		$num_rows = $qry_result->fetch_array(MYSQLI_NUM);
    		$newArray = array('page'=>$page,'count'=>$num_rows[0],'data'=>$sql_result);
        $stmt->close();
        $qry_result->close();
    	Flight::json($newArray);

});

Flight::route('GET /domains', function(){
  include "../inc/connection2.php";
  $sql_array = Flight::getStart();

    $sql_query = "SELECT SQL_CALC_FOUND_ROWS
    dt.account_ID,dt.domain_name,dt.ip_address,dt.nameserver_1,dt.ns1_IP,dt.nameserver_2,dt.ns2_IP,dt.nameserver_3,dt.ns3_IP,dt.date_purchased,dt.expiration_date,dt.registrar_ID,dt.hosting_ID,dt.registrar_301,dt.registrar_301_target,dt.whois_protected,dt.domain_ID,rt.registrar_name,ht.hosting_name FROM domains dt
						LEFT JOIN `registrar` rt ON dt.registrar_ID = rt.registrar_ID
						LEFT JOIN `hosting` ht ON dt.hosting_ID = ht.hosting_ID
            WHERE (dt.account_ID ".$sql_array['alpha']. ")
						AND ((`domain_name` LIKE ?)
						OR (`ip_address` LIKE ?)
						OR (`nameserver_1` LIKE ?)
						OR (`ns1_IP` LIKE ?)
						OR (`nameserver_2` LIKE ?)
						OR (`ns2_IP` LIKE ?)
						OR (`nameserver_3` LIKE ?)
						OR (`ns3_IP` LIKE ?)
						OR (`registrar_name` LIKE ?)
						OR (`hosting_name` LIKE ?)
						OR (`registrar_301` LIKE ?)
						OR (`registrar_301_target` LIKE ?)
						OR (`whois_protected` LIKE ?))";
            if($sql_array['all'] !=='true'){
  						$sql_query .=
  				"	ORDER BY `". str_replace("-",'',$sql_array['order']) ."` ".$sql_array['orderOrder'] .
  				" LIMIT ".$sql_array['start_from'].",". $sql_array['limit']."";
  					};
            $stmt = $mysqli->prepare($sql_query);
            $stmt->bind_param('sssssssssssss',$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter']);
            if(!$stmt->execute()){
              Flight::halt(401,$stmt->error);
            }
            $sql_array = array();
            $result = $stmt->get_result();
            $sql_result = array();
            while ($row = $result->fetch_assoc()) {
                $sql_result[] = $row;
              }
      		$qry_result = $mysqli->query("SELECT FOUND_ROWS()");
      		$num_rows = $qry_result->fetch_array(MYSQLI_NUM);
      		$newArray = array('page'=>$page,'count'=>$num_rows[0],'data'=>$sql_result);
          $stmt->close();
          $qry_result->close();
      	Flight::json($newArray);

});

Flight::route('GET /cms_login', function(){
  include "../inc/connection2.php";
  $sql_array = Flight::getStart();

	$sql_query = "SELECT SQL_CALC_FOUND_ROWS cmt.install_site_url_name,cmt.login_url,cmt.username,cmt.password,cmt.recovery_email,cmt.cpanel_url,cmt.cpanel_username,cmt.cpanel_password,cmt.domain_ID,cmt.install_site_url_ID,dt.domain_name FROM cms_login cmt

					LEFT JOIN `domains` dt ON cmt.domain_ID = dt.domain_ID
          WHERE (cmt.account_ID ".$sql_array['alpha']. ")
					AND ((`install_site_url_name` LIKE ?)
					OR (`login_url` LIKE ?)
					OR (`username` LIKE ?)
					OR (`password` LIKE ?)
					OR (`recovery_email` LIKE ?)
					OR (`cpanel_url` LIKE ?)
					OR (`cpanel_username` LIKE ?)
					OR (`cpanel_password` LIKE ?)
					OR (`domain_name` LIKE ?))";
          if($sql_array['all'] !=='true'){
						$sql_query .=
				"	ORDER BY `". str_replace("-",'',$sql_array['order']) ."` ".$sql_array['orderOrder'] .
				" LIMIT ".$sql_array['start_from'].",". $sql_array['limit']."";
					};
          $stmt = $mysqli->prepare($sql_query);
          $stmt->bind_param('sssssssss',$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter'],$sql_array['filter']);
          if(!$stmt->execute()){
            Flight::halt(401,$stmt->error);
          }
          $sql_array = array();
          $result = $stmt->get_result();
          $sql_result = array();
          while ($row = $result->fetch_assoc()) {
              $sql_result[] = $row;
            }
    		$qry_result = $mysqli->query("SELECT FOUND_ROWS()");
    		$num_rows = $qry_result->fetch_array(MYSQLI_NUM);
    		$newArray = array('page'=>$page,'count'=>$num_rows[0],'data'=>$sql_result);
        $stmt->close();
        $qry_result->close();
    	Flight::json($newArray);
});

Flight::route('DELETE /domains', function(){
    include "../inc/connection2.php";
    $sqlArray = Flight::basicDelete();
    if($sqlArray['user_type'] === 'superuser'){
    $alpha = "LIKE '%'";
  } else {
    $alpha = $sqlArray['account_ID'];
    $alpha = "= '".$alpha."'";
  }
    $id = Flight::request()->query->id;
    $id = filter_var($id,FILTER_SANITIZE_NUMBER_INT);

  	$sql_query2 = "DELETE FROM domains WHERE domain_ID = " . $id." AND (account_ID ".$alpha. ");";

    if(!$mysqli->query($sql_query2)){
      Flight::halt(401,$mysqli->error);
    }
    $mysqli->close();
  	Flight::json("Successfully Deleted Item");

});


Flight::route('DELETE /url_data', function(){

	include "../inc/connection.php";
	$id = Flight::request()->query->id;
	$sql_query2 = "DELETE FROM url_data WHERE url_hash = '" . $id . "'";
	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));

	//Flight::json($newArray2);

});



Flight::route('DELETE /resource_login', function(){
  include "../inc/connection2.php";
  $sqlArray = Flight::basicDelete();
  if($sqlArray['user_type'] === 'superuser'){
  $alpha = "LIKE '%'";
  } else {
    $alpha = $sqlArray['account_ID'];
    $alpha = "= '".$alpha."'";
  }
    $id = Flight::request()->query->id;
    $id = filter_var($id,FILTER_SANITIZE_NUMBER_INT);
  	$sql_query2 = "DELETE FROM resource_login WHERE resource_url_ID = " . $id." AND (account_ID ".$alpha. ");";
    if(!$mysqli->query($sql_query2)){
      Flight::halt(401,$mysqli->error);
    }
    $mysqli->close();
    Flight::json("Successfully Deleted Item");

});

Flight::route('DELETE /software_keys', function(){
  include "../inc/connection2.php";
  $sqlArray = Flight::basicDelete();
  if($sqlArray['user_type'] === 'superuser'){
  $alpha = "LIKE '%'";
  } else {
  $alpha = $sqlArray['account_ID'];
  $alpha = "= '".$alpha."'";
  }
  $id = Flight::request()->query->id;
  $id = filter_var($id,FILTER_SANITIZE_NUMBER_INT);

	$sql_query2 = "DELETE FROM software_keys WHERE software_keys_ID = " . $id." AND (account_ID ".$alpha. ");";
  if(!$mysqli->query($sql_query2)){
    Flight::halt(401,$mysqli->error);
  }
  $mysqli->close();
  Flight::json("Successfully Deleted Item");

});

Flight::route('DELETE /W2_accounts', function(){
  include "../inc/connection2.php";
  $sqlArray = Flight::basicDelete();
  if($sqlArray['user_type'] === 'superuser'){
  $alpha = "LIKE '%'";
  } else {
  $alpha = $sqlArray['account_ID'];
  $alpha = "= '".$alpha."'";
  }
  $id = Flight::request()->query->id;
  $id = filter_var($id,FILTER_SANITIZE_NUMBER_INT);
	$sql_query2 = "DELETE FROM W2_accounts WHERE W2_ID = " . $id." AND (account_ID ".$alpha. ");";
  if(!$mysqli->query($sql_query2)){
    Flight::halt(401,$mysqli->error);
  }
  $mysqli->close();
  Flight::json("Successfully Deleted Item");

});

Flight::route('DELETE /person', function(){
  include "../inc/connection2.php";
  $sqlArray = Flight::basicDelete();
  if($sqlArray['user_type'] === 'superuser'){
  $alpha = "LIKE '%'";
  } else {
  $alpha = $sqlArray['account_ID'];
  $alpha = "= '".$alpha."'";
  }
  $id = Flight::request()->query->id;
  $id = filter_var($id,FILTER_SANITIZE_NUMBER_INT);

	$sql_query2 = "DELETE FROM registration WHERE user_ID = " . $id." AND (account_ID ".$alpha. ");";
  if(!$mysqli->query($sql_query2)){
    Flight::halt(401,$mysqli->error);
  }
  $mysqli->close();
  Flight::json("Successfully Deleted Item");

});

Flight::route('DELETE /registrar', function(){
  include "../inc/connection2.php";
  $sqlArray = Flight::basicDelete();
  if($sqlArray['user_type'] === 'superuser'){
  $alpha = "LIKE '%'";
  } else {
  $alpha = $sqlArray['account_ID'];
  $alpha = "= '".$alpha."'";
  }
  $id = Flight::request()->query->id;
  $id = filter_var($id,FILTER_SANITIZE_NUMBER_INT);

	$sql_query2 = "DELETE FROM registrar WHERE registrar_ID = " . $id." AND (account_ID ".$alpha. ");";
  if(!$mysqli->query($sql_query2)){
    Flight::halt(401,$mysqli->error);
  }
  $mysqli->close();
  Flight::json("Successfully Deleted Item");

});

Flight::route('DELETE /hosting', function(){
  include "../inc/connection2.php";
  $sqlArray = Flight::basicDelete();
  if($sqlArray['user_type'] === 'superuser'){
  $alpha = "LIKE '%'";
  } else {
  $alpha = $sqlArray['account_ID'];
  $alpha = "= '".$alpha."'";
  }
  $id = Flight::request()->query->id;
  $id = filter_var($id,FILTER_SANITIZE_NUMBER_INT);

	$sql_query2 = "DELETE FROM hosting WHERE hosting_ID = " . $id." AND (account_ID ".$alpha. ");";
  if(!$mysqli->query($sql_query2)){
    Flight::halt(401,$mysqli->error);
  }
  $mysqli->close();
  Flight::json("Successfully Deleted Item");

});

Flight::route('DELETE /cms_login', function(){
  include "../inc/connection2.php";
  $sqlArray = Flight::basicDelete();
  if($sqlArray['user_type'] === 'superuser'){
  $alpha = "LIKE '%'";
  } else {
  $alpha = $sqlArray['account_ID'];
  $alpha = "= '".$alpha."'";
  }
  $id = Flight::request()->query->id;
  $id = filter_var($id,FILTER_SANITIZE_NUMBER_INT);
	$sql_query2 = "DELETE FROM cms_login WHERE install_site_url_ID = " . $id." AND (account_ID ".$alpha. ");";
  if(!$mysqli->query($sql_query2)){
    Flight::halt(401,$mysqli->error);
  }
  $mysqli->close();
  Flight::json("Successfully Deleted Item");

});

Flight::route('DELETE /links', function(){
  include "../inc/connection2.php";
  $sqlArray = Flight::basicDelete();
  if($sqlArray['user_type'] === 'superuser'){
  $alpha = "LIKE '%'";
  } else {
  $alpha = $sqlArray['account_ID'];
  $alpha = "= '".$alpha."'";
  }
  $id = Flight::request()->query->id;
  $id = filter_var($id,FILTER_SANITIZE_NUMBER_INT);

	$sql_query2 = "DELETE FROM links WHERE link_ID = " . $id." AND (account_ID ".$alpha. ");";
  if(!$mysqli->query($sql_query2)){
    Flight::halt(401,$mysqli->error);
  }
  $mysqli->close();
  Flight::json("Successfully Deleted Item");

});

Flight::route('DELETE /change_log', function(){

  include "../inc/connection.php";

	$id = Flight::request()->query->id;
	var_dump($id);
	$sql_query2 = "DELETE FROM change_log WHERE change_log_ID = " . $id;
	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));

	//Flight::json($newArray2);

});

Flight::route('/gethosts', function(){
  include "../inc/connection2.php";
  $sqlArray = Flight::basicDelete();
  if($sqlArray['user_type'] === 'superuser'){
  $alpha = "LIKE '%'";
  } else {
  $alpha = $sqlArray['account_ID'];
  $alpha = "= '".$alpha."'";
  }

	$sql_query2 = "SELECT hosting_name,hosting_ID FROM hosting WHERE (account_ID ".$alpha. ");";

  $qry_result2 = $mysqli->query($sql_query2) or die($mysqli->error);
	$rows2 = array();
			while($r2 = $qry_result2->fetch_assoc()) {
    			$rows2[] = $r2;
				}
		$newArray2 = array('data'=>$rows2);
    $qry_result2->close();

	Flight::json($newArray2);

});

Flight::route('/getregistrars', function(){
  include "../inc/connection2.php";
  $sqlArray = Flight::basicDelete();
  if($sqlArray['user_type'] === 'superuser'){
  $alpha = "LIKE '%'";
  } else {
  $alpha = $sqlArray['account_ID'];
  $alpha = "= '".$alpha."'";
  }

	$sql_query2 = "SELECT registrar_name,registrar_ID FROM registrar WHERE (account_ID ".$alpha. ");";

  $qry_result2 = $mysqli->query($sql_query2) or die($mysqli->error);
	$rows2 = array();
			while($r2 = $qry_result2->fetch_assoc()) {
    			$rows2[] = $r2;
				}
		$newArray2 = array('data'=>$rows2);
    $qry_result2->close();

	Flight::json($newArray2);

});

Flight::route('/getdomains', function(){
  include "../inc/connection2.php";
  $sqlArray = Flight::basicDelete();
  if($sqlArray['user_type'] === 'superuser'){
  $alpha = "LIKE '%'";
  } else {
  $alpha = $sqlArray['account_ID'];
  $alpha = "= '".$alpha."'";
  }

	$sql_query2 = "SELECT domain_name,domain_ID FROM domains WHERE (account_ID ".$alpha. ");";

  $qry_result2 = $mysqli->query($sql_query2) or die($mysqli->error);
	$rows2 = array();
			while($r2 = $qry_result2->fetch_assoc()) {
    			$rows2[] = $r2;
				}
		$newArray2 = array('data'=>$rows2);
    $qry_result2->close();

	Flight::json($newArray2);

});

Flight::route('/updateItem', function(){
  include "../inc/connection2.php";
  $sqlArray = Flight::basicSecurity();
  if($sqlArray['user_type'] === 'superuser'){
  $alpha = "LIKE '%'";
  } else {
  $alpha = $sqlArray['account_ID'];
  $alpha = "= '".$alpha."'";
  }
  $entityBody2 = $sqlArray['entityBody2'];


  $body3['id'] = filter_var($body3['id'],FILTER_SANITIZE_NUMBER_INT);
  $body3['identifier'] = filter_var($body3['identifier'],FILTER_SANITIZE_STRING);


  $body3 = array();
  foreach ($entityBody2 as $key => $value) {
  $key = $mysqli->real_escape_string($key);
  $value = $mysqli->real_escape_string($value);
  $body3[$key] = $value;
  }



    if($body3['table'] == 'change_log' || $body3['table'] == 'url_data'){
     $sql  = "UPDATE " . $body3['table'] . " SET " . $body3['column'] . "=\"" . $body3['value'] . "\"";
     $sql .= " WHERE " . $body3['identifier']. "=" . $body3['id'];
   } else {
     $sql  = "UPDATE " . $body3['table'] . " SET " . $body3['column'] . "=\"" . $body3['value'] . "\"";
     $sql .= " WHERE " . $body3['identifier']. "=" . $body3['id']." AND (account_ID ".$alpha. ");";
   }

    $qry_result = $mysqli->query($sql);
    if($qry_result){
  	  Flight::halt(200,$entityBody2['column'] . ": Updated");
    }else{
  	  Flight::halt(500,$qry_result->error);
    }

});


Flight::route('/getowners', function(){
  include "../inc/connection2.php";
  $sqlArray = Flight::basicDelete();
  if($sqlArray['user_type'] === 'superuser'){
  $alpha = "LIKE '%'";
  } else {
  $alpha = $sqlArray['account_ID'];
  $alpha = "= '".$alpha."'";
  }

	$sql_query2 = "SELECT user_name,user_email,user_ID FROM registration WHERE (account_ID ".$alpha. ");";

  $qry_result2 = $mysqli->query($sql_query2) or die($mysqli->error);
	$rows2 = array();
			while($r2 = $qry_result2->fetch_assoc()) {
    			$rows2[] = $r2;
				}
		$newArray2 = array('data'=>$rows2);
    $qry_result2->close();

	Flight::json($newArray2);

});



Flight::route('/9736644323hc4e34', function(){

});


Flight::route('POST /signup/', function(){
  $entityBody = Flight::request()->getBody();
	include "../inc/connection2.php";
	$entityBody = json_decode($entityBody,true);
  $accountName = $entityBody['signUp']['accountName'];
  $user_email = $entityBody['signUp']['email'];
  if($accountName == 'Individual'){
    $accountName = $user_emial."-account";
  }
  $account_name = $entityBody['signUp']['account_name'];
  $user_password = md5($entityBody['signUp']['password2']);
  $user_name = $entityBody['signUp']['fullName'];
  $user_phone= $entityBody['signUp']['phone'];
  $user_address= $entityBody['signUp']['address'];
  $user_stripe_token = $entityBody['$token']['id'];
  $user_security = randomPassword();

  $stripe = array(
    "secret_key"      =>  "sk_test_tN4uGQsemjKrJ2tLpqg3VgIe",
    "publishable_key" =>  "pk_test_DDqS4Ps7loF2JzJPH5JinfPW"
  );

  Stripe::setApiKey($stripe['secret_key']);
  try {
    $customer = \Stripe\Customer::create(array(
      'email' =>  $user_email,
      'source'    =>  $user_stripe_token,
      'plan'  =>'HhQ88aKJ4qDKccsYsq62c'
    ));

  } catch (Exception $e) {
    Flight::halt(401,"Unable to sign up customer:" . $email.
      "  , error:  " . $e->getMessage()
    );
  }

  $sql = "INSERT INTO account (account_name,good_til_date,stripe_customer_ID)
          VALUES (?,?,?)";

  $stmt = $mysqli->prepare($sql);
  $stmt->bind_param('sis', $account_name, $customer->created,$customer->id);
  if(!$stmt->execute()){
            Flight::halt(500,$stmt->error);
          }
  $stmt->close();

  $sql2 = "SELECT account_ID FROM account WHERE stripe_customer_ID = ?";
  $stmt2 = $mysqli->prepare($sql2);
  $stmt2->bind_param('s', $customer->id);
  if(!$result = $stmt2->execute()){
            Flight::halt(500,$stmt->error);
          }
  $result = $stmt2->get_result();
  $account_ID = $result->fetch_assoc();
  $stmt2->close();
  $account_ID = $account_ID['account_ID'];


  $sql3 = "INSERT INTO registration (user_name,user_email,user_password,
                        user_phone,user_address,user_status,user_stripe_token,
                        user_type,account_ID,user_security,user_access)
          VALUES (?,?,?,?,?,2,?,'admin',?,?,'yes')";

  $stmt3 = $mysqli->prepare($sql3);
  $stmt3->bind_param('ssssssis', $user_name,$user_email,$user_password,$user_phone,$user_address,$user_stripe_token,$account_ID,$user_security);

  if(!$stmt3->execute()){
    Flight::halt(500,$stmt->error);
  }
  $stmt3->close();

  Flight::halt(200,"Successfully Signed Up and charged $7.00!");


});

Flight::route('POST /stripe-991c8971ff31a83c454f371f55c85be5', function(){
  include "../inc/connection2.php";
  $stripe = array(
    "secret_key"      =>  "sk_test_tN4uGQsemjKrJ2tLpqg3VgIe",
    "publishable_key" =>  "pk_test_DDqS4Ps7loF2JzJPH5JinfPW"
  );
  Stripe::setApiKey($stripe['secret_key']);
  $stripe_event = Flight::request()->getBody();
  $event_json = json_decode($stripe_event);
  $event = \Stripe\Event::retrieve($event_json->id);

  if (isset($event) && $event->type == "customer.subscription.created") {
  $customer = \Stripe\Customer::retrieve($event->data->object->customer);
  $email = $customer->email;
  // Sending your customers the amount in pennies is weird, so convert to dollars
  $amount = sprintf('$%0.2f', $event->data->object->amount_due / 100.0);

  $mg = new Mailgun("key-ec9388937d006572057b2b518dab3159");
  $domain = "zipps.webwright.io";
  $result = $mg->sendMessage($domain, array(
  // Be sure to replace the from address with the actual email address you're sending from
  'from'    => 'billing@zipps.webwright.io',
  'to'      => 'jkolnik@mac.com',
  'subject' => 'Thank you for your subscription',
  'html'    => 'Hi there,

  Thank you for your subscription

  Please update your payment information as soon as possible by logging in here:
  https://zipps.webwright.io/login'
));
Flight::halt(200,"Successfull Payment");

// Flight::halt(200,"Payment succeeded");
}

elseif (isset($event) && $event->type == "invoice.payment_failed") {
$customer = \Stripe\Customer::retrieve($event->data->object->customer);
$email = $customer->email;
// Sending your customers the amount in pennies is weird, so convert to dollars
$amount = sprintf('$%0.2f', $event->data->object->amount_due / 100.0);

$mg = new Mailgun("key-ec9388937d006572057b2b518dab3159");
$domain = "zipps.webwright.io";
$result = $mg->sendMessage($domain, array(
// Be sure to replace the from address with the actual email address you're sending from
'from'    => 'billing@zipps.webwright.io',
'to'      => 'jkolnik@mac.com',
'subject' => 'Your most recent invoice payment failed',
  'text'    => 'Hi there,

  Unfortunately your most recent invoice payment for ' . $amount . ' was declined.
  This could be due to a change in your card number or your card expiring, cancelation of your credit card,
  or the bank not recognizing the payment and taking action to prevent it.

  Please update your payment information as soon as possible by logging in here:
https://zipps.webwright.io/login'
));
Flight::halt(200,"Failed Payment");

// Flight::halt(200,"Payment succeeded");
}

elseif (isset($event) && $event->type == "charge.failed") {
// Sending your customers the amount in pennies is weird, so convert to dollars

$amount = sprintf('$%0.2f', $event->data->object->amount_due / 100.0);
$email = $event->data->object->receipt_email;
$mg = new Mailgun("key-ec9388937d006572057b2b518dab3159");
$domain = "zipps.webwright.io";
$result = $mg->sendMessage($domain, array(
// Be sure to replace the from address with the actual email address you're sending from
'from'    => 'billing@zipps.webwright.io',
'to'      => 'jkolnik@mac.com',
'subject' => 'Your Charge failed to go thru',
  'text'    => 'Hi there,

  Unfortunately your most recent invoice payment for ' . $amount . ' was declined.
  This could be due to a change in your card number or your card expiring, cancelation of your credit card,
  or the bank not recognizing the payment and taking action to prevent it.

  Please update your payment information as soon as possible by trying to register with a different card here:
https://zipps.webwright.io/login'
));
Flight::halt(200,"Failed Payment");

// Flight::halt(200,"Payment succeeded");
}

else {
  Flight::halt(500,"Nothing Worked");

}


});
Flight::start();

?>
