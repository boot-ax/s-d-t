<?php
include '../inc/functions2.php';
require '../vendor/autoload.php';

//date_default_timezone_set('UTC');

$jwt_key = "joelikeshisinflatablebal$22";

Flight::before('start', function(&$params, &$output){
    global $jwt_key;

    $request = Flight::request();
    if($request->url != '/auth/login'){
      $jwt = substr($_SERVER['HTTP_AUTHORIZATION'],7);
      try{
				$validator = new \Gamegos\JWT\Validator();
				$token = $validator->validate($jwt, $jwt_key);

        $request->data->user = json_decode($token->getClaims()['sub']);
				//Used to check the token information being injected into the request object of Flight PHP
				// var_dump($request->data->user);
				// die();
      }catch(Exception $e){
        Flight::halt(401,"User not authorized");
      }
    }
});

Flight::route('POST /auth/login', function(){
	global $jwt_key;
	$entityBody = Flight::request()->getBody();
	include "../inc/connection.php";

	$entityBody = str_replace('\\u0000', '', $entityBody);
	$entityBody2 = json_decode($entityBody,true);
	// build query...

    $sql  = "SELECT user_name, user_email,user_security FROM registration
		WHERE (`user_email` = '".$entityBody2['email']."')
		AND (`user_password` = md5('".$entityBody2['password']."'))
    AND (`user_type` != 'no_access');";

		$qry_result = mysqli_query($con, $sql) or die(mysqli_error($con));

		if(mysqli_num_rows($qry_result)>0){
			$user = mysqli_fetch_assoc($qry_result);

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

	$entityBody = Flight::request()->getBody();



	include "../inc/connection.php";

	$entityBody = str_replace('\\u0000', '', $entityBody);
	$entityBody2 = json_decode($entityBody,true);
  $email = $entityBody2["cms_login_table"]["user_email"];
  $security = $entityBody2["cms_login_table"]["user_security"];
  $sql_security = "SELECT account.account_ID FROM registration
  LEFT JOIN `account` ON registration.account_ID = account.account_ID
  where user_security = '" .$security. "'
  AND user_email = '" .$email. "';";

  $qry_result_security = mysqli_query($con, $sql_security) or die(mysqli_error($con));
  $rows1 = array();
  while($r = mysqli_fetch_assoc($qry_result_security)) {
    $rows1[] = $r;
  }

  $account = $rows1[0]['account_ID'];

  $entityBody2['cms_login_table']['account_ID'] = $account;
  unset($entityBody2["cms_login_table"]["user_email"]);
  unset($entityBody2["cms_login_table"]["user_security"]);

 // build query...
   $sql  = "INSERT INTO cms_login";
   // implode keys of $array...
   $sql .= " (`".implode("`, `", array_keys($entityBody2['cms_login_table']))."`)";
   // implode values of $array...
  $sql .= " VALUES (\"".implode("\", \"", $entityBody2['cms_login_table'])."\");";

 //execute query...
  $qry_result = mysqli_query($con, $sql);

  if($qry_result){
   Flight::halt(200,"CMS Info Added.");
  }else{
   Flight::halt(500,mysqli_error($con));
   die(mysqli_error($con));
  }

});

Flight::route('POST /domains', function(){


	$entityBody = Flight::request()->getBody();



	include "../inc/connection.php";

	$entityBody = str_replace('\\u0000', '', $entityBody);
	$entityBody2 = json_decode($entityBody,true);

    $email = $entityBody2["domains_table"]["user_email"];
    $security = $entityBody2["domains_table"]["user_security"];
    $sql_security = "SELECT account.account_ID FROM registration
    LEFT JOIN `account` ON registration.account_ID = account.account_ID
    where user_security = '" .$security. "'
    AND user_email = '" .$email. "';";

    $qry_result_security = mysqli_query($con, $sql_security) or die(mysqli_error($con));
    $rows1 = array();
    while($r = mysqli_fetch_assoc($qry_result_security)) {
      $rows1[] = $r;
    }

    $account = $rows1[0]['account_ID'];

    $entityBody2['domains_table']['account_ID'] = $account;
    unset($entityBody2["domains_table"]["user_email"]);
    unset($entityBody2["domains_table"]["user_security"]);

	// build query...
   $sql  = "INSERT INTO domains";
   // implode keys of $array...
   $sql .= " (`".implode("`, `", array_keys($entityBody2['domains_table']))."`)";
   // implode values of $array...
	 $sql .= " VALUES (\"".implode("\", \"", $entityBody2['domains_table'])."\");";

   // execute query...
  $qry_result = mysqli_query($con, $sql);
  if($qry_result){
	  Flight::halt(200,"Domain Added.");
  }else{
	  Flight::halt(500,mysqli_error($con));
	  //die(mysqli_error($con));
  }

});


Flight::route('POST /url_data', function(){


	$entityBody = Flight::request()->getBody();



	include "../inc/connection.php";

	$entityBody = str_replace('\\u0000', '', $entityBody);
	$entityBody2 = json_decode($entityBody,true);

	// build query...
   $sql  = "INSERT INTO url_data";
   // implode keys of $array...
   $sql .= " (`".implode("`, `", array_keys($entityBody2['url_data_table']))."`)";
   // implode values of $array...
	 $sql .= " VALUES (\"".implode("\", \"", $entityBody2['url_data_table'])."\");";


 // execute query...
  $qry_result = mysqli_query($con, $sql);
  if($qry_result){
	  Flight::halt(200,"Resource login Added.");
  }else{
	  Flight::halt(500,mysqli_error($con));
	  //die(mysqli_error($con));
  }

});

Flight::route('POST /software_keys', function(){


	$entityBody = Flight::request()->getBody();



	include "../inc/connection.php";

	$entityBody = str_replace('\\u0000', '', $entityBody);
	$entityBody2 = json_decode($entityBody,true);

  $email = $entityBody2["software_keys_table"]["user_email"];
  $security = $entityBody2["software_keys_table"]["user_security"];
  $sql_security = "SELECT account.account_ID FROM registration
  LEFT JOIN `account` ON registration.account_ID = account.account_ID
  where user_security = '" .$security. "'
  AND user_email = '" .$email. "';";

  $qry_result_security = mysqli_query($con, $sql_security) or die(mysqli_error($con));
  $rows1 = array();
  while($r = mysqli_fetch_assoc($qry_result_security)) {
    $rows1[] = $r;
  }

  $account = $rows1[0]['account_ID'];

  $entityBody2['software_keys_table']['account_ID'] = $account;
  unset($entityBody2["software_keys_table"]["user_email"]);
  unset($entityBody2["software_keys_table"]["user_security"]);

	// build query...
   $sql  = "INSERT INTO software_keys";
   // implode keys of $array...
   $sql .= " (`".implode("`, `", array_keys($entityBody2['software_keys_table']))."`)";
   // implode values of $array...
	 $sql .= " VALUES (\"".implode("\", \"", $entityBody2['software_keys_table'])."\");";


 // execute query...
  $qry_result = mysqli_query($con, $sql);
  if($qry_result){
	  Flight::halt(200,"Resource login Added.");
  }else{
	  Flight::halt(500,mysqli_error($con));
	  //die(mysqli_error($con));
  }

});

Flight::route('POST /resource_login', function(){


	$entityBody = Flight::request()->getBody();
	include "../inc/connection.php";

	$entityBody = str_replace('\\u0000', '', $entityBody);
	$entityBody2 = json_decode($entityBody,true);

  $email = $entityBody2["resource_login_table"]["user_email"];
  $security = $entityBody2["resource_login_table"]["user_security"];
  $sql_security = "SELECT account.account_ID FROM registration
  LEFT JOIN `account` ON registration.account_ID = account.account_ID
  where user_security = '" .$security. "'
  AND user_email = '" .$email. "';";

  $qry_result_security = mysqli_query($con, $sql_security) or die(mysqli_error($con));
  $rows1 = array();
  while($r = mysqli_fetch_assoc($qry_result_security)) {
    $rows1[] = $r;
  }

  $account = $rows1[0]['account_ID'];

  $entityBody2['resource_login_table']['account_ID'] = $account;
  unset($entityBody2["resource_login_table"]["user_email"]);
  unset($entityBody2["resource_login_table"]["user_security"]);

	// build query...
   $sql  = "INSERT INTO resource_login";
   // implode keys of $array...
   $sql .= " (`".implode("`, `", array_keys($entityBody2['resource_login_table']))."`)";
   // implode values of $array...
	 $sql .= " VALUES (\"".implode("\", \"", $entityBody2['resource_login_table'])."\");";


 // execute query...
  $qry_result = mysqli_query($con, $sql);
  if($qry_result){
	  Flight::halt(200,"Resource login Added.");
  }else{
	  Flight::halt(500,mysqli_error($con));
	  //die(mysqli_error($con));
  }

});

Flight::route('POST /W2_accounts', function(){


	$entityBody = Flight::request()->getBody();



	include "../inc/connection.php";

	$entityBody = str_replace('\\u0000', '', $entityBody);
	$entityBody2 = json_decode($entityBody,true);

  $email = $entityBody2["W2_accounts_table"]["user_email"];
  $security = $entityBody2["W2_accounts_table"]["user_security"];
  $sql_security = "SELECT account.account_ID FROM registration
  LEFT JOIN `account` ON registration.account_ID = account.account_ID
  where user_security = '" .$security. "'
  AND user_email = '" .$email. "';";

  $qry_result_security = mysqli_query($con, $sql_security) or die(mysqli_error($con));
  $rows1 = array();
  while($r = mysqli_fetch_assoc($qry_result_security)) {
    $rows1[] = $r;
  }

  $account = $rows1[0]['account_ID'];

  $entityBody2['W2_accounts_table']['account_ID'] = $account;
  unset($entityBody2["W2_accounts_table"]["user_email"]);
  unset($entityBody2["W2_accounts_table"]["user_security"]);

	// build query...
   $sql  = "INSERT INTO W2_accounts";
   // implode keys of $array...
   $sql .= " (`".implode("`, `", array_keys($entityBody2['W2_accounts_table']))."`)";
   // implode values of $array...
	 $sql .= " VALUES (\"".implode("\", \"", $entityBody2['W2_accounts_table'])."\");";


 // execute query...
  $qry_result = mysqli_query($con, $sql);
  if($qry_result){
	  Flight::halt(200,"W2 Account Added.");
  }else{
	  Flight::halt(500,mysqli_error($con));
	  //die(mysqli_error($con));
  }

});

Flight::route('POST /hosting', function(){



	$entityBody = Flight::request()->getBody();



	include "../inc/connection.php";

	$entityBody = str_replace('\\u0000', '', $entityBody);
	$entityBody2 = json_decode($entityBody,true);

  $email = $entityBody2["hosting_table"]["user_email"];
  $security = $entityBody2["hosting_table"]["user_security"];
  $sql_security = "SELECT account.account_ID FROM registration
  LEFT JOIN `account` ON registration.account_ID = account.account_ID
  where user_security = '" .$security. "'
  AND user_email = '" .$email. "';";

  $qry_result_security = mysqli_query($con, $sql_security) or die(mysqli_error($con));
  $rows1 = array();
  while($r = mysqli_fetch_assoc($qry_result_security)) {
    $rows1[] = $r;
  }

  $account = $rows1[0]['account_ID'];

  $entityBody2['hosting_table']['account_ID'] = $account;
  unset($entityBody2["hosting_table"]["user_email"]);
  unset($entityBody2["hosting_table"]["user_security"]);


	// build query...
   $sql  = "INSERT INTO hosting";
   // implode keys of $array...
   $sql .= " (`".implode("`, `", array_keys($entityBody2['hosting_table']))."`)";
   // implode values of $array...
	 $sql .= " VALUES (\"".implode("\", \"", $entityBody2['hosting_table'])."\");";


 // execute query...
  $qry_result = mysqli_query($con, $sql);
  if($qry_result){
	  Flight::halt(200,"Host Added.");
  }else{
	  Flight::halt(500,mysqli_error($con));
	  //die(mysqli_error($con));
  }

});

Flight::route('POST /person', function(){

	$entityBody = Flight::request()->getBody();
	include "../inc/connection.php";

	$entityBody = str_replace('\\u0000', '', $entityBody);
	$entityBody2 = json_decode($entityBody,true);
  $entityBody2['person_table']['user_password'] = md5($entityBody2['person_table']['user_password']);

  $email = $entityBody2["person_table"]["user_email"];
  $security = $entityBody2["person_table"]["user_security"];
  $sql_security = "SELECT account.account_ID FROM registration
  LEFT JOIN `account` ON registration.account_ID = account.account_ID
  where user_security = '" .$security. "'
  AND user_email = '" .$email. "';";

  $qry_result_security = mysqli_query($con, $sql_security) or die(mysqli_error($con));
  $rows1 = array();
  while($r = mysqli_fetch_assoc($qry_result_security)) {
    $rows1[] = $r;
  }

  $account = $rows1[0]['account_ID'];


  $entityBody2['person_table']['account_ID'] = $account;
  $entityBody2['person_table']['user_security'] = randomPassword();
  $entityBody2['person_table']['user_email'] = $entityBody2['person_table']['user_email2'];
  unset($entityBody2["person_table"]["user_email2"]);

   $sql  = "INSERT INTO registration";
   $sql .= " (`".implode("`, `", array_keys($entityBody2['person_table']))."`)";
	 $sql .= " VALUES (\"".implode("\", \"", $entityBody2['person_table'])."\");";

  $qry_result = mysqli_query($con, $sql);
  if($qry_result){
	  Flight::halt(200,"Person Added.");
  }else{
	  Flight::halt(500,mysqli_error($con));

  }

});

Flight::route('POST /links', function(){


	$entityBody = Flight::request()->getBody();
	include "../inc/connection.php";

	$entityBody = str_replace('\\u0000', '', $entityBody);
	var_dump($entityBody);
	$entityBody2 = json_decode($entityBody,true);

  $email = $entityBody2["links_table"]["user_email"];
  $security = $entityBody2["links_table"]["user_security"];
  $sql_security = "SELECT account.account_ID FROM registration
  LEFT JOIN `account` ON registration.account_ID = account.account_ID
  where user_security = '" .$security. "'
  AND user_email = '" .$email. "';";

  $qry_result_security = mysqli_query($con, $sql_security) or die(mysqli_error($con));
  $rows1 = array();
  while($r = mysqli_fetch_assoc($qry_result_security)) {
    $rows1[] = $r;
  }

  $account = $rows1[0]['account_ID'];

  $entityBody2['links_table']['account_ID'] = $account;
  unset($entityBody2["links_table"]["user_email"]);
  unset($entityBody2["links_table"]["user_security"]);
	// build query...
   $sql  = "INSERT INTO links";
   // implode keys of $array...
   $sql .= " (`".implode("`, `", array_keys($entityBody2['links_table']))."`)";
   // implode values of $array...
	 $sql .= " VALUES (\"".implode("\", \"", $entityBody2['links_table'])."\");";


 // execute query...
  $qry_result = mysqli_query($con, $sql);
  if($qry_result){
	  Flight::halt(200,"Link Added.");
  }else{
	  Flight::halt(500,mysqli_error($con));
	  //die(mysqli_error($con));
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


	$entityBody = Flight::request()->getBody();



	include "../inc/connection.php";

	$entityBody = str_replace('\\u0000', '', $entityBody);
	$entityBody2 = json_decode($entityBody,true);

  $email = $entityBody2["registrar_table"]["user_email"];
  $security = $entityBody2["registrar_table"]["user_security"];
  $sql_security = "SELECT account.account_ID FROM registration
  LEFT JOIN `account` ON registration.account_ID = account.account_ID
  where user_security = '" .$security. "'
  AND user_email = '" .$email. "';";

  $qry_result_security = mysqli_query($con, $sql_security) or die(mysqli_error($con));
  $rows1 = array();
  while($r = mysqli_fetch_assoc($qry_result_security)) {
    $rows1[] = $r;
  }

  $account = $rows1[0]['account_ID'];

  $entityBody2['registrar_table']['account_ID'] = $account;
  unset($entityBody2["registrar_table"]["user_email"]);
  unset($entityBody2["registrar_table"]["user_security"]);

	// build query...
   $sql  = "INSERT INTO registrar";
   // implode keys of $array...
   $sql .= " (`".implode("`, `", array_keys($entityBody2['registrar_table']))."`)";
   // implode values of $array...
	 $sql .= " VALUES (\"".implode("\", \"", $entityBody2['registrar_table'])."\");";


   // execute query...
  $qry_result = mysqli_query($con, $sql);
  if($qry_result){
	  Flight::halt(200,"Registrar Added.");
  }else{
	  Flight::halt(500,mysqli_error($con));
	  //die(mysqli_error($con));
  }

});


Flight::route('GET /hosting', function(){

  	include "../inc/connection.php";
  	$limit = $_GET['limit'];
  	$filter = $_GET['filter'];
  	$filter = htmlspecialchars($filter);
  	$filter = mysqli_real_escape_string($con, $filter);
    $email = $_GET['email'];

    $jwt = substr($_SERVER['HTTP_AUTHORIZATION'],7);
    try{
      $validator = new \Gamegos\JWT\Validator();
      $token = $validator->validate($jwt, $jwt_key);

      $request->data->user = json_decode($token->getClaims()['sub']);
      //Used to check the token information being injected into the request object of Flight PHP
      var_dump($request->data->user);
      // die();
    }

  //   $email = htmlspecialchars($email);
  //   $email = mysqli_real_escape_string($con, $email);
  //   $security = $_GET['security'];
  //   $security = htmlspecialchars($security);
  //   $security = mysqli_real_escape_string($con, $security);
  // 	$order = $_GET['order'];
  // 	$orderOrder = "";
  // 	if (strpos($order, '-') !== false) {
  //     $orderOrder = "DESC";
  // 		} else {$orderOrder = "ASC";}
  // 	$order = htmlspecialchars($order);
  // 	$order = mysqli_real_escape_string($con, $order);
  // 	$page = $_GET['page'];
  // 	$all = $_GET['all'];
  // 	if ($all ==='true'){
  // 		$limit = '';
  // 	};
  //
  //   $sql_security = "SELECT rt.user_type, rt.account_ID FROM registration rt
  //   where user_security = '" .$security. "'
  //   AND user_email = '" .$email. "';";
  //
  //     // var_dump($sql_security);
  //   $qry_result_security = mysqli_query($con, $sql_security) or die(mysqli_error($con));
  //   $rows1 = array();
  //   while($r = mysqli_fetch_assoc($qry_result_security)) {
  //     $rows1[] = $r;
  //   }
  //
  // if($rows1[0]['user_type'] === 'superuser'){
  //   $alpha = "LIKE '%'";
  // } else {
  //   $alpha = $rows1[0]['account_ID'];
  //   $alpha = "= '".$alpha."'";
  // }
  //
  // $start_from = ($page-1) * $limit;
  //
  //
  //
	// $sql_query = "SELECT SQL_CALC_FOUND_ROWS hosting_name,login_url,username,password,date_started,expiration_date,creditcard_last_4,setup_domain,hosting_ID FROM hosting ht
  //         WHERE (ht.account_ID ".$alpha. ")
	// 				AND ((`hosting_name` LIKE '%".$filter."%')
	// 				OR (`login_url` LIKE '%".$filter."%')
	// 				OR (`username` LIKE '%".$filter."%')
	// 				OR (`password` LIKE '%".$filter."%')
	// 				OR (`date_started` LIKE '%".$filter."%')
	// 				OR (`expiration_date` LIKE '%".$filter."%')
	// 				OR (`creditcard_last_4` LIKE '%".$filter."%')
	// 				OR (`setup_domain` LIKE '%".$filter."%'))";
	// 				if($all !=='true'){
	// 					$sql_query .=
	// 			"	ORDER BY `". str_replace("-",'',$order) ."` ".$orderOrder .
	// 			" LIMIT ".$start_from.",". $limit."";
	// 				};
  //
  //
  //   	$qry_result = mysqli_query($con, $sql_query) or die(mysqli_error($con));
  //
	// $rows = array();
	// 		while($r = mysqli_fetch_assoc($qry_result)) {
  //   			$rows[] = $r;
	// 			}
  //
  //
	// 	$qry_result = mysqli_query($con, "SELECT FOUND_ROWS()");
	// 	$num_rows = mysqli_fetch_array($qry_result);
	// 	$newArray = array('page'=>$page,'count'=>$num_rows[0],'data'=>$rows);
  //
  //
	// Flight::json($newArray);
	// //echo (str_replace('\u0000', '', json_encode($newArray)));

});

Flight::route('GET /person', function(){

  	include "../inc/connection.php";
  	$limit = $_GET['limit'];
  	$filter = $_GET['filter'];
  	$filter = htmlspecialchars($filter);
  	$filter = mysqli_real_escape_string($con, $filter);
    $email = $_GET['email'];

    $email = htmlspecialchars($email);
    $email = mysqli_real_escape_string($con, $email);
    $security = $_GET['security'];
    $security = htmlspecialchars($security);
    $security = mysqli_real_escape_string($con, $security);
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

    $sql_security = "SELECT rt.user_type, rt.account_ID FROM registration rt
    where user_security = '" .$security. "'
    AND user_email = '" .$email. "';";

      // var_dump($sql_security);
    $qry_result_security = mysqli_query($con, $sql_security) or die(mysqli_error($con));
    $rows1 = array();
    while($r = mysqli_fetch_assoc($qry_result_security)) {
      $rows1[] = $r;
    }

  if($rows1[0]['user_type'] === 'superuser'){
    $alpha = "LIKE '%'";
  } else {
    $alpha = $rows1[0]['account_ID'];
    $alpha = "= '".$alpha."'";
  }

  $start_from = ($page-1) * $limit;


	$sql_query = "SELECT SQL_CALC_FOUND_ROWS user_name,user_email,user_address,user_phone,user_type,user_ID FROM registration rgt
          WHERE (rgt.account_ID ".$alpha. ")
					AND ((`user_name` LIKE '%".$filter."%')
					OR (`user_email` LIKE '%".$filter."%')
					OR (`user_address` LIKE '%".$filter."%')
					OR (`user_phone` LIKE '%".$filter."%')
					OR (`user_type` LIKE '%".$filter."%'))";
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

Flight::route('GET /links', function(){

  	include "../inc/connection.php";
  	$limit = $_GET['limit'];
  	$filter = $_GET['filter'];
  	$filter = htmlspecialchars($filter);
  	$filter = mysqli_real_escape_string($con, $filter);
    $email = $_GET['email'];

    $email = htmlspecialchars($email);
    $email = mysqli_real_escape_string($con, $email);
    $security = $_GET['security'];
    $security = htmlspecialchars($security);
    $security = mysqli_real_escape_string($con, $security);
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

    $sql_security = "SELECT rt.user_type, rt.account_ID FROM registration rt
    where user_security = '" .$security. "'
    AND user_email = '" .$email. "';";

      // var_dump($sql_security);
    $qry_result_security = mysqli_query($con, $sql_security) or die(mysqli_error($con));
    $rows1 = array();
    while($r = mysqli_fetch_assoc($qry_result_security)) {
      $rows1[] = $r;
    }

  if($rows1[0]['user_type'] === 'superuser'){
    $alpha = "LIKE '%'";
  } else {
    $alpha = $rows1[0]['account_ID'];
    $alpha = "= '".$alpha."'";
  }

  $start_from = ($page-1) * $limit;


	$sql_query = "SELECT SQL_CALC_FOUND_ROWS source_url,target_url,anchor_text,alt_text,follow_link,date_created,title,comment,link_ID FROM links lk
          WHERE (lk.account_ID ".$alpha. ")
					AND ((`source_url` LIKE '%".$filter."%')
					OR (`target_url` LIKE '%".$filter."%')
					OR (`anchor_text` LIKE '%".$filter."%')
					OR (`alt_text` LIKE '%".$filter."%')
					OR (`follow_link` LIKE '%".$filter."%')
					OR (`date_created` LIKE '%".$filter."%')
					OR (`title` LIKE '%".$filter."%')
					OR (`comment` LIKE '%".$filter."%'))";
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

  	include "../inc/connection.php";
  	$limit = $_GET['limit'];
  	$filter = $_GET['filter'];
  	$filter = htmlspecialchars($filter);
  	$filter = mysqli_real_escape_string($con, $filter);
    $email = $_GET['email'];

    $email = htmlspecialchars($email);
    $email = mysqli_real_escape_string($con, $email);
    $security = $_GET['security'];
    $security = htmlspecialchars($security);
    $security = mysqli_real_escape_string($con, $security);
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

    $sql_security = "SELECT rt.user_type, rt.account_ID FROM registration rt
    where user_security = '" .$security. "'
    AND user_email = '" .$email. "';";

      // var_dump($sql_security);
    $qry_result_security = mysqli_query($con, $sql_security) or die(mysqli_error($con));
    $rows1 = array();
    while($r = mysqli_fetch_assoc($qry_result_security)) {
      $rows1[] = $r;
    }

  if($rows1[0]['user_type'] === 'superuser'){
    $alpha = "LIKE '%'";
  } else {
    $alpha = $rows1[0]['account_ID'];
    $alpha = "= '".$alpha."'";
  }

  $start_from = ($page-1) * $limit;


	$sql_query = "SELECT SQL_CALC_FOUND_ROWS rgt.registrar_name,rgt.login_url,rgt.login_username,rgt.login_password,rgt.credit_card_last_4,rgt.registrar_ID,regit.user_name,regit.user_email FROM registrar rgt


					LEFT JOIN `registration` regit ON rgt.user_ID = regit.user_ID
          WHERE (rgt.account_ID ".$alpha. ")
					AND ((`registrar_name` LIKE '%".$filter."%')
					OR (`login_url` LIKE '%".$filter."%')
					OR (`login_username` LIKE '%".$filter."%')
					OR (`login_password` LIKE '%".$filter."%')
					OR (`credit_card_last_4` LIKE '%".$filter."%')
					OR (`user_name` LIKE '%".$filter."%')
					OR (`user_email` LIKE '%".$filter."%'))";
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

  	include "../inc/connection.php";
  	$limit = $_GET['limit'];
  	$filter = $_GET['filter'];
  	$filter = htmlspecialchars($filter);
  	$filter = mysqli_real_escape_string($con, $filter);
    $email = $_GET['email'];

    $email = htmlspecialchars($email);
    $email = mysqli_real_escape_string($con, $email);
    $security = $_GET['security'];
    $security = htmlspecialchars($security);
    $security = mysqli_real_escape_string($con, $security);
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

    $sql_security = "SELECT rt.user_type, rt.account_ID FROM registration rt
    where user_security = '" .$security. "'
    AND user_email = '" .$email. "';";

      // var_dump($sql_security);
    $qry_result_security = mysqli_query($con, $sql_security) or die(mysqli_error($con));
    $rows1 = array();
    while($r = mysqli_fetch_assoc($qry_result_security)) {
      $rows1[] = $r;
    }

  if($rows1[0]['user_type'] === 'superuser'){
    $alpha = "LIKE '%'";
  } else {
    $alpha = $rows1[0]['account_ID'];
    $alpha = "= '".$alpha."'";
  }

  $start_from = ($page-1) * $limit;

	$sql_query = "SELECT SQL_CALC_FOUND_ROWS rlt.resource_url_name,rlt.name_of_product,rlt.username,rlt.password,rlt.product_description,rlt.resource_url_ID,rgt.user_name,rgt.user_email FROM resource_login rlt

					LEFT JOIN `registration` rgt ON rlt.user_ID = rgt.user_ID
          WHERE (rlt.account_ID ".$alpha. ")
					AND ((`resource_url_name` LIKE '%".$filter."%')
					OR (`name_of_product` LIKE '%".$filter."%')
					OR (`username` LIKE '%".$filter."%')
					OR (`password` LIKE '%".$filter."%')
					OR (`product_description` LIKE '%".$filter."%')
					OR (`user_name` LIKE '%".$filter."%')
					OR (`user_email` LIKE '%".$filter."%'))";
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

});

Flight::route('GET /software_keys', function(){

  	include "../inc/connection.php";
  	$limit = $_GET['limit'];
  	$filter = $_GET['filter'];
  	$filter = htmlspecialchars($filter);
  	$filter = mysqli_real_escape_string($con, $filter);
    $email = $_GET['email'];

    $email = htmlspecialchars($email);
    $email = mysqli_real_escape_string($con, $email);
    $security = $_GET['security'];
    $security = htmlspecialchars($security);
    $security = mysqli_real_escape_string($con, $security);
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

    $sql_security = "SELECT rt.user_type, rt.account_ID FROM registration rt
    where user_security = '" .$security. "'
    AND user_email = '" .$email. "';";

      // var_dump($sql_security);
    $qry_result_security = mysqli_query($con, $sql_security) or die(mysqli_error($con));
    $rows1 = array();
    while($r = mysqli_fetch_assoc($qry_result_security)) {
      $rows1[] = $r;
    }

  if($rows1[0]['user_type'] === 'superuser'){
    $alpha = "LIKE '%'";
  } else {
    $alpha = $rows1[0]['account_ID'];
    $alpha = "= '".$alpha."'";
  }

  $start_from = ($page-1) * $limit;

  $sql_query = "SELECT SQL_CALC_FOUND_ROWS skt.software_name,skt.license_key,skt.serial_number,skt.comments,skt.software_keys_ID,rgt.user_name,rgt.user_email FROM software_keys skt

					LEFT JOIN `registration` rgt ON skt.user_ID = rgt.user_ID
          WHERE (skt.account_ID ".$alpha. ")
					AND ((`software_name` LIKE '%".$filter."%')
					OR (`license_key` LIKE '%".$filter."%')
					OR (`serial_number` LIKE '%".$filter."%')
					OR (`software_keys_ID` LIKE '%".$filter."%')
					OR (`user_name` LIKE '%".$filter."%')
          OR (`comments` LIKE '%".$filter."%')
					OR (`user_email` LIKE '%".$filter."%'))";
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

});

Flight::route('GET /W2_accounts', function(){


  	include "../inc/connection.php";
  	$limit = $_GET['limit'];
  	$filter = $_GET['filter'];
  	$filter = htmlspecialchars($filter);
  	$filter = mysqli_real_escape_string($con, $filter);
    $email = $_GET['email'];

    $email = htmlspecialchars($email);
    $email = mysqli_real_escape_string($con, $email);
    $security = $_GET['security'];
    $security = htmlspecialchars($security);
    $security = mysqli_real_escape_string($con, $security);
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

    $sql_security = "SELECT rt.user_type, rt.account_ID FROM registration rt
    where user_security = '" .$security. "'
    AND user_email = '" .$email. "';";

      // var_dump($sql_security);
    $qry_result_security = mysqli_query($con, $sql_security) or die(mysqli_error($con));
    $rows1 = array();
    while($r = mysqli_fetch_assoc($qry_result_security)) {
      $rows1[] = $r;
    }

  if($rows1[0]['user_type'] === 'superuser'){
    $alpha = "LIKE '%'";
  } else {
    $alpha = $rows1[0]['account_ID'];
    $alpha = "= '".$alpha."'";
  }

  $start_from = ($page-1) * $limit;


	$sql_query = "SELECT SQL_CALC_FOUND_ROWS w2t.login_url_name,w2t.login,w2t.password,w2t.account_url,w2t.attached_domain,w2t.W2_ID,regt.user_name,regt.user_email FROM W2_accounts w2t


					LEFT JOIN `registration` regt ON w2t.user_ID = regt.user_ID
          WHERE (w2t.account_ID ".$alpha. ")
					AND ((`login_url_name` LIKE '%".$filter."%')
					OR (`login` LIKE '%".$filter."%')
					OR (`account_url` LIKE '%".$filter."%')
					OR (`password` LIKE '%".$filter."%')
					OR (`attached_domain` LIKE '%".$filter."%')
					OR (`user_name` LIKE '%".$filter."%')
					OR (`user_email` LIKE '%".$filter."%'))";
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

Flight::route('GET /domains', function(){

	include "../inc/connection.php";
	$limit = $_GET['limit'];
	$filter = $_GET['filter'];
	$filter = htmlspecialchars($filter);
	$filter = mysqli_real_escape_string($con, $filter);
  $email = $_GET['email'];

  $email = htmlspecialchars($email);
  $email = mysqli_real_escape_string($con, $email);
  $security = $_GET['security'];
  $security = htmlspecialchars($security);
  $security = mysqli_real_escape_string($con, $security);
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

  $sql_security = "SELECT rt.user_type, rt.account_ID FROM registration rt
  where user_security = '" .$security. "'
  AND user_email = '" .$email. "';";

    // var_dump($sql_security);
  $qry_result_security = mysqli_query($con, $sql_security) or die(mysqli_error($con));
  $rows1 = array();
  while($r = mysqli_fetch_assoc($qry_result_security)) {
    $rows1[] = $r;
  }

if($rows1[0]['user_type'] === 'superuser'){
  $alpha = "LIKE '%'";
} else {
  $alpha = $rows1[0]['account_ID'];
  $alpha = "= '".$alpha."'";
}

  $start_from = ($page-1) * $limit;

    $sql_query = "SELECT SQL_CALC_FOUND_ROWS
    dt.account_ID,dt.domain_name,dt.ip_address,dt.nameserver_1,dt.ns1_IP,dt.nameserver_2,dt.ns2_IP,dt.nameserver_3,dt.ns3_IP,dt.date_purchased,dt.expiration_date,dt.registrar_ID,dt.hosting_ID,dt.registrar_301,dt.registrar_301_target,dt.whois_protected,dt.domain_ID,rt.registrar_name,ht.hosting_name FROM domains dt
						LEFT JOIN `registrar` rt ON dt.registrar_ID = rt.registrar_ID
						LEFT JOIN `hosting` ht ON dt.hosting_ID = ht.hosting_ID
            WHERE (dt.account_ID ".$alpha. ")
						AND ((`domain_name` LIKE '%".$filter."%')
						OR (`ip_address` LIKE '%".$filter."%')
						OR (`nameserver_1` LIKE '%".$filter."%')
						OR (`ns1_IP` LIKE '%".$filter."%')
						OR (`nameserver_2` LIKE '%".$filter."%')
						OR (`ns2_IP` LIKE '%".$filter."%')
						OR (`nameserver_3` LIKE '%".$filter."%')
						OR (`ns3_IP` LIKE '%".$filter."%')
						OR (`registrar_name` LIKE '%".$filter."%')
						OR (`hosting_name` LIKE '%".$filter."%')
						OR (`registrar_301` LIKE '%".$filter."%')
						OR (`registrar_301_target` LIKE '%".$filter."%')
						OR (`whois_protected` LIKE '%".$filter."%'))";
						if($all !=='true'){
							$sql_query .=
					"	ORDER BY `". str_replace("-",'',$order) ."` ".$orderOrder .
					" LIMIT " . $start_from. "," . $limit. "";
						};

            // echo($sql_query);
   	$qry_result = mysqli_query($con, $sql_query) or die(mysqli_error($con));

		$rows = array();
		while($r = mysqli_fetch_assoc($qry_result)) {
			$rows[] = $r;
		}

		$qry_result = mysqli_query($con, "SELECT FOUND_ROWS()");
		$num_rows =	mysqli_fetch_array($qry_result);

		$newArray = array('page'=>$page,'count'=>$num_rows[0],'data'=>$rows);
	Flight::json($newArray);

});

Flight::route('GET /cms_login', function(){

  	include "../inc/connection.php";
  	$limit = $_GET['limit'];
  	$filter = $_GET['filter'];
  	$filter = htmlspecialchars($filter);
  	$filter = mysqli_real_escape_string($con, $filter);
    $email = $_GET['email'];

    $email = htmlspecialchars($email);
    $email = mysqli_real_escape_string($con, $email);
    $security = $_GET['security'];
    $security = htmlspecialchars($security);
    $security = mysqli_real_escape_string($con, $security);
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

    $sql_security = "SELECT rt.user_type, rt.account_ID FROM registration rt
    where user_security = '" .$security. "'
    AND user_email = '" .$email. "';";

      // var_dump($sql_security);
    $qry_result_security = mysqli_query($con, $sql_security) or die(mysqli_error($con));
    $rows1 = array();
    while($r = mysqli_fetch_assoc($qry_result_security)) {
      $rows1[] = $r;
    }

  if($rows1[0]['user_type'] === 'superuser'){
    $alpha = "LIKE '%'";
  } else {
    $alpha = $rows1[0]['account_ID'];
    $alpha = "= '".$alpha."'";
  }

  $start_from = ($page-1) * $limit;


	$sql_query = "SELECT SQL_CALC_FOUND_ROWS cmt.install_site_url_name,cmt.login_url,cmt.username,cmt.password,cmt.recovery_email,cmt.cpanel_url,cmt.cpanel_username,cmt.cpanel_password,cmt.domain_ID,cmt.install_site_url_ID,dt.domain_name FROM cms_login cmt

					LEFT JOIN `domains` dt ON cmt.domain_ID = dt.domain_ID
          WHERE (cmt.account_ID ".$alpha. ")
					AND ((`install_site_url_name` LIKE '%".$filter."%')
					OR (`login_url` LIKE '%".$filter."%')
					OR (`username` LIKE '%".$filter."%')
					OR (`password` LIKE '%".$filter."%')
					OR (`recovery_email` LIKE '%".$filter."%')
					OR (`cpanel_url` LIKE '%".$filter."%')
					OR (`cpanel_username` LIKE '%".$filter."%')
					OR (`cpanel_password` LIKE '%".$filter."%')
					OR (`domain_name` LIKE '%".$filter."%'))";
					if($all !=='true'){
						$sql_query .=
				"	ORDER BY `". str_replace("-",'',$order) ."` ".$orderOrder .
				" LIMIT ".$start_from.",". $limit."";
					};
// var_dump($sql_query);

  	$qry_result = mysqli_query($con, $sql_query) or die(mysqli_error($con));

	$rows = array();
			while($r = mysqli_fetch_assoc($qry_result)) {
    			$rows[] = $r;
				}

		$qry_result = mysqli_query($con, "SELECT FOUND_ROWS()");
		$num_rows = mysqli_fetch_array($qry_result);
		$newArray = array('page'=>$page,'count'=>$num_rows[0],'data'=>$rows);

	Flight::json($newArray);

});

Flight::route('DELETE /domains', function(){

	include "../inc/connection.php";
	$id = Flight::request()->query->id;
	$sql_query2 = "DELETE FROM domains WHERE domain_ID = " . $id;
	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));

	//Flight::json($newArray2);

});


Flight::route('DELETE /url_data', function(){

	include "../inc/connection.php";
	$id = Flight::request()->query->id;
	$sql_query2 = "DELETE FROM url_data WHERE url_hash = '" . $id . "'";
	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));

	//Flight::json($newArray2);

});



Flight::route('DELETE /resource_login', function(){

	include "../inc/connection.php";
	$id = Flight::request()->query->id;
	$sql_query2 = "DELETE FROM resource_login WHERE resource_url_ID = " . $id;
	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));

	//Flight::json($newArray2);

});

Flight::route('DELETE /software_keys', function(){

	include "../inc/connection.php";
	$id = Flight::request()->query->id;
	$sql_query2 = "DELETE FROM software_keys WHERE software_keys_ID = " . $id;
	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));

	//Flight::json($newArray2);

});


Flight::route('DELETE /W2_accounts', function(){

	include "../inc/connection.php";
	$id = Flight::request()->query->id;
	$sql_query2 = "DELETE FROM W2_accounts WHERE W2_ID = " . $id;
	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));

	//Flight::json($newArray2);

});

Flight::route('DELETE /person', function(){

	include "../inc/connection.php";
	$id = Flight::request()->query->id;
	$sql_query2 = "DELETE FROM registration WHERE user_ID = " . $id;
  echo $sql_query2;
	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));

	//Flight::json($newArray2);

});

Flight::route('DELETE /registrar', function(){

	include "../inc/connection.php";
	$id = Flight::request()->query->id;
	$sql_query2 = "DELETE FROM registrar WHERE registrar_ID = " . $id;
	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));

	//Flight::json($newArray2);

});

Flight::route('DELETE /hosting', function(){

	include "../inc/connection.php";
	$id = Flight::request()->query->id;
	var_dump($id);
	$sql_query2 = "DELETE FROM hosting WHERE hosting_ID = " . $id;
	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));

	//Flight::json($newArray2);

});

Flight::route('DELETE /cms_login', function(){

	include "../inc/connection.php";
	$id = Flight::request()->query->id;
	$sql_query2 = "DELETE FROM cms_login WHERE install_site_url_ID = " . $id;
	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));

	//Flight::json($newArray2);

});

Flight::route('DELETE /links', function(){

	include "../inc/connection.php";
	$id = Flight::request()->query->id;
	var_dump($id);
	$sql_query2 = "DELETE FROM links WHERE link_ID = " . $id;
	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));

	//Flight::json($newArray2);

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


	include "../inc/connection.php";

	$sql_query2 = "SELECT hosting_name,hosting_ID FROM hosting;";

   	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));
	$rows2 = array();
			while($r2 = mysqli_fetch_assoc($qry_result2)) {
    			$rows2[] = $r2;
				}
		$num_rows2 = mysqli_num_rows($qry_result2);
		$newArray2 = array('data'=>$rows2);


	Flight::json($newArray2);

});



// Flight::route('/getusertype', function(){
//
//
// 	include "../inc/connection.php";
//
// 	$sql_query2 = "SELECT DISTINCT user_type FROM registration;";
//
//    	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));
// 	$rows2 = array();
// 			while($r2 = mysqli_fetch_assoc($qry_result2)) {
//     			$rows2[] = $r2;
// 				}
// 		$num_rows2 = mysqli_num_rows($qry_result2);
// 		$newArray2 = array('data'=>$rows2);
//
//
// 	Flight::json($newArray2);
//
// });

Flight::route('/getregistrars', function(){

	include "../inc/connection.php";

	$sql_query2 = "SELECT registrar_name,registrar_ID FROM registrar;";

   	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));
	$rows2 = array();
			while($r2 = mysqli_fetch_assoc($qry_result2)) {
    			$rows2[] = $r2;
				}
		$num_rows2 = mysqli_num_rows($qry_result2);
		$newArray2 = array('data'=>$rows2);


	Flight::json($newArray2);

});

Flight::route('/getdomains', function(){

	include "../inc/connection.php";

	$sql_query2 = "SELECT domain_name,domain_ID FROM domains;";

   	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));
	$rows2 = array();
			while($r2 = mysqli_fetch_assoc($qry_result2)) {
    			$rows2[] = $r2;
				}
		$num_rows2 = mysqli_num_rows($qry_result2);
		$newArray2 = array('data'=>$rows2);


	Flight::json($newArray2);

});

Flight::route('/updateItem', function(){

	include "../inc/connection.php";
	$entityBody = Flight::request()->getBody();

	$entityBody = str_replace('\\u0000', '', $entityBody);
	$entityBody2 = json_decode($entityBody,true);

  // if($entityBody2['column'] = 'user_type'){
  // var_dump($entityBody2);
  //   if($entityBody2['user_type'] != 'no_access'){
  //     $sql  = "UPDATE " . $entityBody2['table'] . " SET " . $entityBody2['column'] . "=\"" . $entityBody2['value'] . "\",user_password=\"".md5($entityBody2['pwrd'])."\"";
  //     $sql .= " WHERE " . $entityBody2['identifier']. "=" . $entityBody2['id'];
  //   }
  // } else {
   $sql  = "UPDATE " . $entityBody2['table'] . " SET " . $entityBody2['column'] . "=\"" . $entityBody2['value'] . "\"";
   $sql .= " WHERE " . $entityBody2['identifier']. "=" . $entityBody2['id'];
// };

  $qry_result = mysqli_query($con, $sql);
  if($qry_result){
	  Flight::halt(200,$entityBody2['column'] . ": Updated");
  }else{
	  Flight::halt(500,mysqli_error($con));
  }

});

Flight::route('/9736644323hc4e34', function(){

});

Flight::route('/getowners', function(){

	include "../inc/connection.php";

	$sql_query2 = "SELECT user_name,user_email,user_ID FROM registration;";

   	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));
	$rows2 = array();
			while($r2 = mysqli_fetch_assoc($qry_result2)) {
    			$rows2[] = $r2;
				}
		$num_rows2 = mysqli_num_rows($qry_result2);
		$newArray2 = array('data'=>$rows2);


	Flight::json($newArray2);

});

Flight::start();

?>
