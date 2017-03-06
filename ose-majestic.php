<?php
include "inc/connection.php";

function unprocessed_urls($con, $status = 0, $limit = 50){
	//$sql = "SELECT * FROM `pending_domains` WHERE `status` = ".$status." LIMIT ".$limit.";";
	$sql = "SELECT * FROM `url_data`;";


	$data = mysqli_query($con,$sql) or die(mysqli_error($con));

    $domains = array();
    $ids = array();
    while($domain = $data->fetch_assoc()){
    	$domain['url_name'] = trim($domain['url_name']);
    	// print_r(parse_url($domain['domain']));
    	// echo 'END DOMAIN'."\n";
		array_push($domains, $domain);
    }
    return $domains;
}

function updateMozUrl($domain, $status,$con){

	$ose_metrics_ID = $domain['ose_metrics_ID'];

	if (empty($ose_metrics_ID)) {

		$ose_metrics_ID = 0;
	};

	$sql4 = "INSERT INTO ose_change_table (date_crawled,ose_metrics_ID,url_hash) VALUES (now(),'".$ose_metrics_ID."','".$domain['url_hash']."');";
	$sql5 = "INSERT IGNORE INTO ose_metrics (ose_url_name,domain_authority,page_authority,ose_date,ose_num_links,url_hash,ose_status_code,ose_external_equity) VALUES ('".$domain['url_name']."','".$domain['DA']."','".$domain['PA']."',now(),'".$domain['ose_num_links']."','".$domain['url_hash']."','".$domain['ose_status_code']."','".$domain['ose_external_equity']."');";



	$con->query($sql4) or die(mysqli_error($con));
	$con->query($sql5) or die(mysqli_error($con));


	//$con->query("UPDATE `majestic_metrics` SET `trust_flow` = ".$status.", `DA` = '".$domain['DA']."', `PA` = '".$domain['PA']."' WHERE `url_hash` = '".$domain['url_hash']."';");
}

function update_domains($con, $url_hashs, $status){
	$con->query("UPDATE `pending_domains` SET `status` = ".$status." WHERE `url_hash` IN ('".implode("','", $ids)."');");
}

function is_valid_domain_name($domain_name)
{
    return (preg_match("/^([a-z\d](-*[a-z\d])*)(\.([a-z\d](-*[a-z\d])*))*$/i", $domain_name) //valid chars check
            && preg_match("/^.{1,253}$/", $domain_name) //overall length check
            && preg_match("/^[^\.]{1,63}(\.[^\.]{1,63})*$/", $domain_name)   ); //length of each label
}


function mozChecks(&$domains,$con){
	// access ID: mozscape-dec3ac3c84
	// secret key: d042fbb9a638b80ea20bb49e43b47863
	// Get your access id and secret key here: https://moz.com/products/api/keys
	$accessID = "mozscape-dec3ac3c84";
	$secretKey = "d042fbb9a638b80ea20bb49e43b47863";
	// Set your expires times for several minutes into the future.
	// An expires time excessively far in the future will not be honored by the Mozscape API.
	$expires = time() + 300;
	// Put each parameter on a new line.
	$stringToSign = $accessID."\n".$expires;
	// Get the "raw" or binary output of the hmac hash.
	$binarySignature = hash_hmac('sha1', $stringToSign, $secretKey, true);
	// Base64-encode it and then url-encode that.
	$urlSafeSignature = urlencode(base64_encode($binarySignature));
	// Add up all the bit flags you want returned.
	// Learn more here: https://moz.com/help/guides/moz-api/mozscape/api-reference/url-metrics
	$cols = "103616088096";
	// Put it all together and you get your request URL.
	$requestUrl = "http://lsapi.seomoz.com/linkscape/url-metrics/?Cols=".$cols."&AccessID=".$accessID."&Expires=".$expires."&Signature=".$urlSafeSignature;
	// Put your URLS into an array and json_encode them.
	$batchedDomains = array();
	foreach($domains as $domain){
		$batchedDomains[] = $domain['url_name'];
	}
	$encodedDomains = json_encode($batchedDomains);
	// Use Curl to send off your request.
	// Send your encoded list of domains through Curl's POSTFIELDS.
	$options = array(
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_POSTFIELDS     => $encodedDomains
		);
	$ch = curl_init($requestUrl);
	curl_setopt_array($ch, $options);
	$content = curl_exec($ch);
	curl_close( $ch );
	$contents = json_decode($content);

	//Loop through and compare DA/PA for greater than 15
	if(count($contents)==count($domains)){
		for($i = 0; $i < count($contents); $i++){
			$domains[$i]['DA'] = $contents[$i]->pda;
			$domains[$i]['PA'] = $contents[$i]->upa;
			$domains[$i]['ose_num_links'] = $contents[$i]->uid;
			$domains[$i]['ose_status_code'] = $contents[$i]->us;
			$domains[$i]['ose_external_equity'] = $contents[$i]->ueid;
			//Pass Moz
			if($domains[$i]['DA']>=0.0 && $domains[$i]['PA']>=0.0){
				updateMozUrl($domains[$i], 5,$con);
				// echo "   - ".$domains[$i]['url_name']." ✓\n";
				// echo "  DA  - ".$domains[$i]['DA']." ✓\n";
				// echo "  PA  - ".$domains[$i]['PA']." ✓\n";


			}else{
				echo "   - ".$domains[$i]['url_name']." X\n";
				//updateMozUrl($domains[$i], -41);
			}
		}
	}else{
		echo "   - Mozscape Checks Failed\n";
	}
}

?>
