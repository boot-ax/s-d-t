<?php

require 'vendor/autoload.php';

//date_default_timezone_set('UTC');


Flight::route('POST /service/cms_login', function(){

	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
	} else {

	$entityBody = Flight::request()->getBody();



	include "inc/connection.php";

	$entityBody = str_replace('\\u0000', '', $entityBody);
	$entityBody2 = json_decode($entityBody,true);


 // build query...
   $sql  = "INSERT INTO cms_login";
   // implode keys of $array...
   $sql .= " (`".implode("`, `", array_keys($entityBody2['cms_login_table']))."`)";
   // implode values of $array...
   $sql .= " VALUES (''".implode("'', ''", mysqli_real_escape_string($con,$entityBody2['cms_login_table']))."'');";

 //execute query...

  $qry_result = mysqli_query($con, $sql);

  if($qry_result){
   Flight::halt(200,"CMS Info Added.");
  }else{
   Flight::halt(500,mysqli_error($con));
   //die(mysqli_error($con));
  }
	}
});

Flight::route('POST /service/domains', function(){

	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
	} else {

	$entityBody = Flight::request()->getBody();



	include "inc/connection.php";

	$entityBody = str_replace('\\u0000', '', $entityBody);
	$entityBody2 = json_decode($entityBody,true);

	// build query...
   $sql  = "INSERT INTO domains";
   // implode keys of $array...
   $sql .= " (`".implode("`, `", array_keys($entityBody2['domains_table']))."`)";
   // implode values of $array...
   $sql .= " VALUES (''".implode("'', ''", mysqli_real_escape_string($con,$entityBody2['domains_table']))."'');";

   // execute query...
  $qry_result = mysqli_query($con, $sql);
  if($qry_result){
	  Flight::halt(200,"Domain Added.");
  }else{
	  Flight::halt(500,mysqli_error($con));
	  //die(mysqli_error($con));
  }
	}
});

Flight::route('POST /service/resource_login', function(){

	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
	} else {

	$entityBody = Flight::request()->getBody();



	include "inc/connection.php";

	$entityBody = str_replace('\\u0000', '', $entityBody);
	$entityBody2 = json_decode($entityBody,true);

	// build query...
   $sql  = "INSERT INTO resource_login";
   // implode keys of $array...
   $sql .= " (`".implode("`, `", array_keys($entityBody2['resource_login_table']))."`)";
   // implode values of $array...
	 $sql .= " VALUES ('".implode("', '", mysqli_real_escape_string($con,$entityBody2['resource_login_table']))."');";

 // execute query...
  $qry_result = mysqli_query($con, $sql);
  if($qry_result){
	  Flight::halt(200,"Resource login Added.");
  }else{
	  Flight::halt(500,mysqli_error($con));
	  //die(mysqli_error($con));
  }
	}
});

Flight::route('POST /service/W2_accounts', function(){

	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
	} else {

	$entityBody = Flight::request()->getBody();



	include "inc/connection.php";

	$entityBody = str_replace('\\u0000', '', $entityBody);
	$entityBody2 = json_decode($entityBody,true);


	// build query...
   $sql  = "INSERT INTO W2_accounts";
   // implode keys of $array...
   $sql .= " (`".implode("`, `", array_keys($entityBody2['W2_accounts_table']))."`)";
   // implode values of $array...
	 $sql .= " VALUES ('".implode("', '", mysqli_real_escape_string($con,$entityBody2['W2_accounts_table']))."');";

 // execute query...
  $qry_result = mysqli_query($con, $sql);
  if($qry_result){
	  Flight::halt(200,"W2 Account Added.");
  }else{
	  Flight::halt(500,mysqli_error($con));
	  //die(mysqli_error($con));
  }
	}
});

Flight::route('POST /service/hosting', function(){

	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
	} else {

	$entityBody = Flight::request()->getBody();



	include "inc/connection.php";

	$entityBody = str_replace('\\u0000', '', $entityBody);
	$entityBody2 = json_decode($entityBody,true);


	// build query...
   $sql  = "INSERT INTO hosting";
   // implode keys of $array...
   $sql .= " (`".implode("`, `", array_keys($entityBody2['hosting_table']))."`)";
   // implode values of $array...
	 $sql .= " VALUES ('".implode("', '", mysqli_real_escape_string($con,$entityBody2['hosting_table']))."');";

 // execute query...
  $qry_result = mysqli_query($con, $sql);
  if($qry_result){
	  Flight::halt(200,"Host Added.");
  }else{
	  Flight::halt(500,mysqli_error($con));
	  //die(mysqli_error($con));
  }
	}
});

Flight::route('POST /service/person', function(){

	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
	} else {

	$entityBody = Flight::request()->getBody();
	include "inc/connection.php";

	$entityBody = str_replace('\\u0000', '', $entityBody);
	$entityBody2 = json_decode($entityBody,true);


	// build query...
   $sql  = "INSERT INTO person";
   // implode keys of $array...
   $sql .= " (`".implode("`, `", array_keys($entityBody2['person_table']))."`)";
   // implode values of $array...
	 $sql .= " VALUES ('".implode("', '", mysqli_real_escape_string($con,$entityBody2['person_table']))."');";

  // execute query...
  $qry_result = mysqli_query($con, $sql);
  if($qry_result){
	  Flight::halt(200,"Person Added.");
  }else{
	  Flight::halt(500,mysqli_error($con));
	  //die(mysqli_error($con));
  }
	}
});

Flight::route('POST /service/links', function(){

	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
	} else {

	$entityBody = Flight::request()->getBody();
	include "inc/connection.php";

	$entityBody = str_replace('\\u0000', '', $entityBody);
	var_dump($entityBody);
	$entityBody2 = json_decode($entityBody,true);

	// build query...
   $sql  = "INSERT INTO links";
   // implode keys of $array...
   $sql .= " (`".implode("`, `", array_keys($entityBody2['links_table']))."`)";
   // implode values of $array...
	 $sql .= " VALUES ('".implode("', '", mysqli_real_escape_string($con,$entityBody2['links_table']))."');";

 // execute query...
  $qry_result = mysqli_query($con, $sql);
  if($qry_result){
	  Flight::halt(200,"Link Added.");
  }else{
	  Flight::halt(500,mysqli_error($con));
	  //die(mysqli_error($con));
  }
	}
});

Flight::route('POST /service/change_log', function(){

	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
	} else {

	$entityBody = Flight::request()->getBody();
	include "inc/connection.php";

	$entityBody = str_replace('\\u0000', '', $entityBody);
	var_dump($entityBody);
	$entityBody2 = json_decode($entityBody,true);

	// build query...
   $sql  = "INSERT INTO change_log";
   // implode keys of $array...
   $sql .= " (`".implode("`, `", array_keys($entityBody2['change_log_table']))."`)";
   // implode values of $array...
	 $sql .= " VALUES ('".implode("', '", mysqli_real_escape_string($con,$entityBody2['change_log_table']))."');";

 // execute query...
  $qry_result = mysqli_query($con, $sql);
  if($qry_result){
	  Flight::halt(200,"Change Log added.");
  }else{
	  Flight::halt(500,mysqli_error($con));
	  //die(mysqli_error($con));
  }
	}
});

Flight::route('POST /service/registrar', function(){

	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
	} else {

	$entityBody = Flight::request()->getBody();



	include "inc/connection.php";

	$entityBody = str_replace('\\u0000', '', $entityBody);
	$entityBody2 = json_decode($entityBody,true);


	// build query...
   $sql  = "INSERT INTO registrar";
   // implode keys of $array...
   $sql .= " (`".implode("`, `", array_keys($entityBody2['registrar_table']))."`)";
   // implode values of $array...
	 $sql .= " VALUES ('".implode("', '", mysqli_real_escape_string($con,$entityBody2['registrar_table']))."');";

   // execute query...
  $qry_result = mysqli_query($con, $sql);
  if($qry_result){
	  Flight::halt(200,"Registrar Added.");
  }else{
	  Flight::halt(500,mysqli_error($con));
	  //die(mysqli_error($con));
  }
	}
});

Flight::route('GET /service/hosting', function(){


		if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
		exit();
		} else {
	include "inc/connection.php";
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

	$start_from = ($page-1) * $limit;



	$sql_query = "SELECT SQL_CALC_FOUND_ROWS hosting_name,login_url,username,password,date_started,expiration_date,creditcard_last_4,setup_domain,hosting_ID FROM hosting

					WHERE (`hosting_name` LIKE '%".$filter."%')
					OR (`login_url` LIKE '%".$filter."%')
					OR (`username` LIKE '%".$filter."%')
					OR (`password` LIKE '%".$filter."%')
					OR (`date_started` LIKE '%".$filter."%')
					OR (`expiration_date` LIKE '%".$filter."%')
					OR (`creditcard_last_4` LIKE '%".$filter."%')
					OR (`setup_domain` LIKE '%".$filter."%')
					ORDER BY `". str_replace("-",'',$order) ."` ".$orderOrder."
					LIMIT ".$start_from.",". $limit."";


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
		}
});

Flight::route('GET /service/person', function(){


		if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
		exit();
		} else {
	include "inc/connection.php";
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

	$start_from = ($page-1) * $limit;


	$sql_query = "SELECT SQL_CALC_FOUND_ROWS first_name,last_name,email,street_address,city,state,phone_number,zip_code,person_ID FROM person

					WHERE (`first_name` LIKE '%".$filter."%')
					OR (`last_name` LIKE '%".$filter."%')
					OR (`email` LIKE '%".$filter."%')
					OR (`street_address` LIKE '%".$filter."%')
					OR (`city` LIKE '%".$filter."%')
					OR (`state` LIKE '%".$filter."%')
					OR (`phone_number` LIKE '%".$filter."%')
					OR (`zip_code` LIKE '%".$filter."%')
					ORDER BY `". str_replace("-",'',$order) ."` ".$orderOrder."
					LIMIT ".$start_from.",". $limit."";


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
		}
});

Flight::route('GET /service/links', function(){


		if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
		exit();
		} else {
	include "inc/connection.php";
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

	$start_from = ($page-1) * $limit;


	$sql_query = "SELECT SQL_CALC_FOUND_ROWS source_url,target_url,anchor_text,alt_text,follow_link,date_created,title,comment,link_ID FROM links

					WHERE (`source_url` LIKE '%".$filter."%')
					OR (`target_url` LIKE '%".$filter."%')
					OR (`anchor_text` LIKE '%".$filter."%')
					OR (`alt_text` LIKE '%".$filter."%')
					OR (`follow_link` LIKE '%".$filter."%')
					OR (`date_created` LIKE '%".$filter."%')
					OR (`title` LIKE '%".$filter."%')
					OR (`comment` LIKE '%".$filter."%')
					ORDER BY `". str_replace("-",'',$order) ."` ".$orderOrder."
					LIMIT ".$start_from.",". $limit."";


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
		}
});

Flight::route('GET /service/change_log', function(){


		if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
		exit();
		} else {
	include "inc/connection.php";
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

	$start_from = ($page-1) * $limit;


	$sql_query = "SELECT SQL_CALC_FOUND_ROWS change_log.issue,change_log.date_entered,change_log.completed,change_log.change_log_ID,change_log.person_ID,person.first_name,person.last_name FROM change_log


					LEFT JOIN `person` ON change_log.person_ID = person.person_ID


					WHERE (`issue` LIKE '%".$filter."%')
					OR (`date_entered` LIKE '%".$filter."%')
					OR (`completed` LIKE '%".$filter."%')
					OR (`first_name` LIKE '%".$filter."%')
					OR (`last_name` LIKE '%".$filter."%')
					ORDER BY `". str_replace("-",'',$order) ."` ".$orderOrder."
					LIMIT ".$start_from.",". $limit."";


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
		}
});

Flight::route('GET /service/registrar', function(){


		if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
		exit();
		} else {
	include "inc/connection.php";
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

	$start_from = ($page-1) * $limit;


	$sql_query = "SELECT SQL_CALC_FOUND_ROWS registrar.registrar_name,registrar.login_url,registrar.login_username,registrar.login_password,registrar.credit_card_last_4,registrar.registrar_ID,person.first_name,person.last_name FROM registrar


					LEFT JOIN `person` ON registrar.person_ID = person.person_ID

					WHERE (`registrar_name` LIKE '%".$filter."%')
					OR (`login_url` LIKE '%".$filter."%')
					OR (`login_username` LIKE '%".$filter."%')
					OR (`login_password` LIKE '%".$filter."%')
					OR (`credit_card_last_4` LIKE '%".$filter."%')
					OR (`first_name` LIKE '%".$filter."%')
					OR (`last_name` LIKE '%".$filter."%')
					ORDER BY `". str_replace("-",'',$order) ."` ".$orderOrder."
					LIMIT ".$start_from.",". $limit."";


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
		}
});

Flight::route('GET /service/resource_login', function(){


		if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
		exit();
		} else {
	include "inc/connection.php";
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

	$start_from = ($page-1) * $limit;


	$sql_query = "SELECT SQL_CALC_FOUND_ROWS resource_login.resource_url_name,resource_login.name_of_product,resource_login.username,resource_login.password,resource_login.product_description,resource_login.resource_url_ID,person.first_name,person.last_name FROM resource_login


					LEFT JOIN `person` ON resource_login.person_ID = person.person_ID

					WHERE (`resource_url_name` LIKE '%".$filter."%')
					OR (`name_of_product` LIKE '%".$filter."%')
					OR (`username` LIKE '%".$filter."%')
					OR (`password` LIKE '%".$filter."%')
					OR (`product_description` LIKE '%".$filter."%')
					OR (`first_name` LIKE '%".$filter."%')
					OR (`last_name` LIKE '%".$filter."%')
					ORDER BY `". str_replace("-",'',$order) ."` ".$orderOrder."
					LIMIT ".$start_from.",". $limit."";


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
		}
});

Flight::route('GET /service/W2_accounts', function(){


		if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
		exit();
		} else {
	include "inc/connection.php";
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

	$start_from = ($page-1) * $limit;


	$sql_query = "SELECT SQL_CALC_FOUND_ROWS W2_accounts.login_url_name,W2_accounts.login,W2_accounts.password,W2_accounts.account_url,W2_accounts.attached_domain,W2_accounts.W2_ID,person.first_name,person.last_name FROM W2_accounts


					LEFT JOIN `person` ON W2_accounts.person_ID = person.person_ID

					WHERE (`login_url_name` LIKE '%".$filter."%')
					OR (`login` LIKE '%".$filter."%')
					OR (`account_url` LIKE '%".$filter."%')
					OR (`password` LIKE '%".$filter."%')
					OR (`attached_domain` LIKE '%".$filter."%')
					OR (`first_name` LIKE '%".$filter."%')
					OR (`last_name` LIKE '%".$filter."%')
					ORDER BY `". str_replace("-",'',$order) ."` ".$orderOrder."
					LIMIT ".$start_from.",". $limit."";


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
		}
});

Flight::route('GET /service/domains', function(){


		if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
		exit();
		} else {
	include "inc/connection.php";
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

	$start_from = ($page-1) * $limit;

	$sql_query = "SELECT SQL_CALC_FOUND_ROWS domains.domain_name,domains.ip_address,domains.nameserver_1,domains.ns1_IP,domains.nameserver_2,domains.ns2_IP,domains.nameserver_3,domains.ns3_IP,domains.date_purchased,domains.expiration_date,domains.registrar_ID,domains.hosting_ID,domains.registrar_301,domains.registrar_301_target,domains.whois_protected,domains.domain_ID,registrar.registrar_name,hosting.hosting_name FROM domains ".
						"LEFT JOIN `registrar` ON domains.registrar_ID = registrar.registrar_ID ".
						"LEFT JOIN `hosting` ON domains.hosting_ID = hosting.hosting_ID ".
						"WHERE (`domain_name` LIKE '%".$filter."%') ".
						"OR (`ip_address` LIKE '%".$filter."%') ".
						"OR (`nameserver_1` LIKE '%".$filter."%') ".
						"OR (`ns1_IP` LIKE '%".$filter."%') ".
						"OR (`nameserver_2` LIKE '%".$filter."%') ".
						"OR (`ns2_IP` LIKE '%".$filter."%') ".
						"OR (`nameserver_3` LIKE '%".$filter."%') ".
						"OR (`ns3_IP` LIKE '%".$filter."%') ".
						"OR (`registrar_name` LIKE '%".$filter."%') ".
						"OR (`hosting_name` LIKE '%".$filter."%') ".
						"OR (`registrar_301` LIKE '%".$filter."%') ".
						"OR (`registrar_301_target` LIKE '%".$filter."%') ".
						"OR (`whois_protected` LIKE '%".$filter."%') ".
						"ORDER BY `". str_replace("-",'',$order) ."` ".$orderOrder." ".
						"LIMIT ".$start_from.",".$limit;

   	$qry_result = mysqli_query($con, $sql_query) or die(mysqli_error($con));

		$rows = array();
		while($r = mysqli_fetch_assoc($qry_result)) {
			$rows[] = $r;
		}

		$qry_result = mysqli_query($con, "SELECT FOUND_ROWS()");
		$num_rows =	mysqli_fetch_array($qry_result);

		$newArray = array('page'=>$page,'count'=>$num_rows[0],'data'=>$rows);


	Flight::json($newArray);
	// echo (str_replace('\u0000', '', json_encode($newArray)));
		}
});

Flight::route('GET /service/cms_login', function(){


		if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
		exit();
		} else {
	include "inc/connection.php";
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

	$start_from = ($page-1) * $limit;


	$sql_query = "SELECT SQL_CALC_FOUND_ROWS cms_login.install_site_url_name,cms_login.login_url,cms_login.username,cms_login.password,cms_login.recovery_email,cms_login.cpanel_url,cms_login.cpanel_username,cms_login.cpanel_password,cms_login.domain_ID,cms_login.install_site_url_ID,domains.domain_name FROM cms_login

					LEFT JOIN `domains` ON cms_login.domain_ID = domains.domain_ID

					WHERE (`install_site_url_name` LIKE '%".$filter."%')
					OR (`login_url` LIKE '%".$filter."%')
					OR (`username` LIKE '%".$filter."%')
					OR (`password` LIKE '%".$filter."%')
					OR (`recovery_email` LIKE '%".$filter."%')
					OR (`cpanel_url` LIKE '%".$filter."%')
					OR (`cpanel_username` LIKE '%".$filter."%')
					OR (`cpanel_password` LIKE '%".$filter."%')
					OR (`domain_name` LIKE '%".$filter."%')
					ORDER BY `". str_replace("-",'',$order) ."` ".$orderOrder."
					LIMIT ".$start_from.",". $limit."";


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
		}
});

Flight::route('DELETE /service/domains', function(){
	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
		} else {
	include "inc/connection.php";
	$id = Flight::request()->query->id;
	$sql_query2 = "DELETE FROM domains WHERE domain_ID = " . $id;
	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));

	//Flight::json($newArray2);
		}
});

Flight::route('DELETE /service/resource_login', function(){
	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
		} else {
	include "inc/connection.php";
	$id = Flight::request()->query->id;
	$sql_query2 = "DELETE FROM resource_login WHERE resource_url_ID = " . $id;
	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));

	//Flight::json($newArray2);
		}
});

Flight::route('DELETE /service/W2_accounts', function(){
	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
		} else {
	include "inc/connection.php";
	$id = Flight::request()->query->id;
	$sql_query2 = "DELETE FROM W2_accounts WHERE W2_ID = " . $id;
	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));

	//Flight::json($newArray2);
		}
});

Flight::route('DELETE /service/person', function(){
	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
		} else {
	include "inc/connection.php";
	$id = Flight::request()->query->id;
	$sql_query2 = "DELETE FROM person WHERE person_ID = " . $id;
	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));

	//Flight::json($newArray2);
		}
});

Flight::route('DELETE /service/registrar', function(){
	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
		} else {
	include "inc/connection.php";
	$id = Flight::request()->query->id;
	$sql_query2 = "DELETE FROM registrar WHERE registrar_ID = " . $id;
	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));

	//Flight::json($newArray2);
		}
});

Flight::route('DELETE /service/hosting', function(){
	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
		} else {
	include "inc/connection.php";
	$id = Flight::request()->query->id;
	var_dump($id);
	$sql_query2 = "DELETE FROM hosting WHERE hosting_ID = " . $id;
	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));

	//Flight::json($newArray2);
		}
});

Flight::route('DELETE /service/cms_login', function(){
	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
		} else {
	include "inc/connection.php";
	$id = Flight::request()->query->id;
	$sql_query2 = "DELETE FROM cms_login WHERE install_site_url_ID = " . $id;
	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));

	//Flight::json($newArray2);
		}
});

Flight::route('DELETE /service/links', function(){
	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
		} else {
	include "inc/connection.php";
	$id = Flight::request()->query->id;
	var_dump($id);
	$sql_query2 = "DELETE FROM links WHERE link_ID = " . $id;
	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));

	//Flight::json($newArray2);
		}
});

Flight::route('DELETE /service/change_log', function(){
	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
		} else {
	include "inc/connection.php";
	$id = Flight::request()->query->id;
	var_dump($id);
	$sql_query2 = "DELETE FROM change_log WHERE change_log_ID = " . $id;
	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));

	//Flight::json($newArray2);
		}
});


Flight::route('/service/gethosts', function(){

	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
		} else {
	include "inc/connection.php";

	$sql_query2 = "SELECT hosting_name,hosting_ID FROM hosting;";

   	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));
	$rows2 = array();
			while($r2 = mysqli_fetch_assoc($qry_result2)) {
    			$rows2[] = $r2;
				}
		$num_rows2 = mysqli_num_rows($qry_result2);
		$newArray2 = array('data'=>$rows2);


	Flight::json($newArray2);
		}
});

Flight::route('/service/getregistrars', function(){
	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
		} else {
	include "inc/connection.php";

	$sql_query2 = "SELECT registrar_name,registrar_ID FROM registrar;";

   	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));
	$rows2 = array();
			while($r2 = mysqli_fetch_assoc($qry_result2)) {
    			$rows2[] = $r2;
				}
		$num_rows2 = mysqli_num_rows($qry_result2);
		$newArray2 = array('data'=>$rows2);


	Flight::json($newArray2);
		}
});

Flight::route('/service/getdomains', function(){
	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
		} else {
	include "inc/connection.php";

	$sql_query2 = "SELECT domain_name,domain_ID FROM domains;";

   	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));
	$rows2 = array();
			while($r2 = mysqli_fetch_assoc($qry_result2)) {
    			$rows2[] = $r2;
				}
		$num_rows2 = mysqli_num_rows($qry_result2);
		$newArray2 = array('data'=>$rows2);


	Flight::json($newArray2);
		}
});

Flight::route('/service/updateItem', function(){
	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
		exit();
		} else {
	include "inc/connection.php";
	$entityBody = Flight::request()->getBody();

	$entityBody = str_replace('\\u0000', '', $entityBody);
	$entityBody2 = json_decode($entityBody,true);



	// build query...
   $sql  = "UPDATE " . $entityBody2['table'] . " SET " . $entityBody2['column'] . "=\"" . $entityBody2['value'] . "\"";
  //$sql  = "UPDATE " . $entityBody2['table'] . " SET " . $entityBody2['column'] . "='" . mysqli_real_escape_string($con,$entityBody2['value']) . "'";
   $sql .= " WHERE " . $entityBody2['identifier']. "=" . $entityBody2['id'];

 // execute query...
  $qry_result = mysqli_query($con, $sql);
  if($qry_result){
	  Flight::halt(200,$entityBody2['column'] . ": Updated");
  }else{
	  Flight::halt(500,mysqli_error($con));
	  //die(mysqli_error($con));
  }
	}
});

Flight::route('/service/9736644323hc4e34', function(){
	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
		} else {
		}
});

Flight::route('/service/getpersons', function(){
	if($id = Flight::request()->cookies->duSWnS1sW !== 'duSWnS1sW'){
		header('Location: https://dev.webwright.io');
exit();
		} else {
	include "inc/connection.php";

	$sql_query2 = "SELECT first_name,last_name,person_ID FROM person;";

   	$qry_result2 = mysqli_query($con, $sql_query2) or die(mysqli_error($con));
	$rows2 = array();
			while($r2 = mysqli_fetch_assoc($qry_result2)) {
    			$rows2[] = $r2;
				}
		$num_rows2 = mysqli_num_rows($qry_result2);
		$newArray2 = array('data'=>$rows2);


	Flight::json($newArray2);
		}
});


Flight::start();

?>
