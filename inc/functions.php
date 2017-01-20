<?php

$tableCol = getTableColumn('management');

function getTableColumn($database){
include "connection.php";

$query = "select * from information_schema.columns
where table_schema = '".$database."'
order by table_name,ordinal_position;";

$qry_result = mysqli_query($con, $query) or die(mysqli_error($con));
   while($row = mysqli_fetch_assoc($qry_result)) {
	   $cols[$row['TABLE_NAME']][] = $row['COLUMN_NAME'];
	   }
   
return $cols;
}

//==============================================================================================

function insertButton($table_name,$functionName){
$colArray = $GLOBALS['tableCol'];
$column_array = $colArray[$table_name];
$id = get_form_ids($column_array,$table_name);

array_pop($id);
$js_array = json_encode($id);

$ajaxDiv = 'ajaxDiv-' . $table_name;
$ajaxFile = "inc/ajax-file.php";

	return str_replace('"', "'", $js_array) . ",'" . $ajaxDiv . "','" . $ajaxFile . "','" . $table_name . "','" . $functionName . "'";
}


//==============================================================================================

function updateButton($table_name,$functionName){
$colArray = $GLOBALS['tableCol'];
$column_array = $colArray[$table_name];
$id = get_form_ids($column_array,$table_name);


$js_array = json_encode($id);

$ajaxDiv = 'ajaxDiv-' . $table_name;
$ajaxFile = "inc/ajax-file.php";


	return str_replace('"', "'", $js_array) . ",'" . $ajaxDiv . "','" . $ajaxFile . "','" . $table_name . "','" . $functionName . "'";
}

//===============================================================================================

function deleteButton($table_name,$functionName){
$column_array_hosting = get_column_names($table_name);
$ajaxDiv = 'ajaxDiv-' . $table_name;
$ajaxFile = "inc/ajax-file.php";
	return "'" . $ajaxDiv . "','" . $ajaxFile . "','" . $table_name . "','" . $functionName . "'";
}


//===================================================

function get_form_ids($input,$table_name){
	foreach($input as $value){
		$output[] = $table_name .'-'. $value;
	}

	return $output;
}


//========================  Filter Function for _ID and _hash  ================

function myFilter1($string) {
  return strpos($string, '_ID') === false;
}

function myFilter4($string) {
  return strpos($string, 'registrar_ID') === false;
}

function myFilter2($string) {
  return strpos($string, '_hash') === false;
}

function myFilter3($string) {
  return strpos($string, '_name') !== false;
}



//==================================================

function getDb($database,$search){
include "connection.php";
$query = "SELECT `TABLE_NAME`
FROM `INFORMATION_SCHEMA`.`TABLES`
WHERE `TABLE_TYPE` = 'BASE TABLE' AND TABLE_SCHEMA='" . $database . "';";

$qry_result = mysqli_query($con, $query) or die(mysqli_error($con));
   while($row = mysqli_fetch_assoc($qry_result)) {
	   $cols = get_column_names($row['TABLE_NAME']);
	   $keys = array_keys($cols);
   		if($search == $keys[count($keys)-1]){
	   	return $row['TABLE_NAME'];
	   }
   }
return null;
}



function get_column_names($table_name){
include "connection.php";
$query = "SELECT `COLUMN_NAME`,`DATA_TYPE` 
FROM `INFORMATION_SCHEMA`.`COLUMNS`
WHERE `TABLE_SCHEMA`='$dbname' 
AND `TABLE_NAME`='" . $table_name . "';";
$qry_result = mysqli_query($con, $query) or die(mysqli_error($con));
   while($row = mysqli_fetch_assoc($qry_result)) {
      $column_array[$row['COLUMN_NAME']] = $row['DATA_TYPE'];
   }
return $column_array;
}

//==================================================




function getMysqlRequest1($table_name){
include "connection.php"; 
$colArray = $GLOBALS['tableCol'];
$column_array = $colArray[$table_name];
$id_hosting = get_form_ids($column_array,$table_name);
array_pop($id_hosting);
 

 //$id_hosting = array_filter($id_hosting, 'myFilter1');
  // $id_hosting = array_filter($id_hosting, 'myFilter2');
   


   // Retrieve data from Query String To Update Database
   
   foreach($id_hosting as $id){ 
   $id = $_GET[$id];
   $id = mysqli_real_escape_string($con, $id);
   $sql_querry_values[] = $id;
   }
 

$id_hosting = str_replace($table_name.'-','',$id_hosting);
   $sql_querry_columns = join(', ', $id_hosting);
   $sql_querry_values = implode("','", $sql_querry_values);
   $addToDatabase = "INSERT INTO " . $table_name . " (" . $sql_querry_columns . ") VALUES ('" . $sql_querry_values . "')";
   $addToDatabase = str_replace("'NULL'","NULL",$addToDatabase);
   $qry_result = mysqli_query($con, $addToDatabase) or die(mysqli_error($con));
   
  return getMysqlRequest2($table_name);
}
   
 //--------------------------------------------------------------------------------------
   
function getMysqlRequest2($table_name){
include "connection.php";
$colArray = $GLOBALS['tableCol'];
$id_hosting = $colArray[$table_name];
//$id_hosting = get_form_ids($column_array_hosting);
//$matches = preg_grep("/_ID/", $id_hosting);
//$matches = array_values($matches);
   
   //Building All Query
   
   $display_query = "SELECT * FROM " . $table_name;
   $display_query_result = mysqli_query($con, $display_query) or die(mysqli_error($con));
  
   
   //Build Result String
   $display_string = "<table class='mdl-data-table mdl-js-data-table mdl-data-table--selectable'>";
   $display_string .= "<thead>";
   $display_string .= "<tr>";
   
   $i = 0;
	foreach($id_hosting as $headers) {
    if ($i == 0) {
       $display_string .= "<th class='mdl-data-table__cell--non-numeric'><strong>" . ucwords(str_replace('_', ' ',$headers)) . "</strong></th>";
    } else {
       $display_string .= "<th><strong>" . ucwords(str_replace('_', ' ',$headers)) . "</strong></th>";
    }
    // …
    $i++;
}

   $display_string .= "</tr>";
   $display_string .= "</thead>";
   $display_string .= "<tbody id='ajaxDiv-" . $table_name . "'>";
   
 // Insert a new row in the table for each row returned
 $i = 0;
 while($row = mysqli_fetch_array($display_query_result)) { 
      foreach($id_hosting as $id){
		  if ($id == $id_hosting[0]) {
      $display_string2 .= "<tr id=".$table_name.'-'.$i." value=".$i."><td class='mdl-data-table__cell--non-numeric'>" . $row[$id] . "</td>";
	  $i++;
		  } else {
			  $display_string2 .= "<td>" . $row[$id] . "</td>";
		  }
	  }
	  $display_string2 .= "</tr>"; 
	 } 
   
   $display_string2 .= "</tbody>";
   $display_string2 .= "</table>";
   $display_string .= $display_string2;
   
   
   
      if( empty($display_string)) {
	$display_string = "nothing in database found";
	return $display_string;   
   } else {
	return $display_string;   
   }
   }

//============================================================================


function getMysqlRequest3($table_name){
	include "connection.php";
	$colArray = $GLOBALS['tableCol'];
$column_array= $colArray[$table_name];

 $sqlValues = str_replace(",","','",$_GET['js_array']);
 
 
 $sqlValues = "('" . $sqlValues . "')";

   $addToDatabase = "DELETE FROM " . $table_name . " WHERE " . end($column_array) . " IN " . $sqlValues;
   $qry_result = mysqli_query($con, $addToDatabase) or die(mysqli_error($con));
   return getMysqlRequest2($table_name);
   }


//======================================================================


function getMysqlRequest5($table_name){
include "connection.php";
$colArray = $GLOBALS['tableCol'];
$column_array= $colArray[$table_name];
$id_hosting = get_form_ids($column_array,$table_name);

array_pop($id_hosting);

$popVal = $_GET['popVal'];

foreach($id_hosting as $id){ 
   $id = $_GET[$id];
   $id = mysqli_real_escape_string($con, $id);
   $sql_querry_values[] = $id;
   }
   

$id_hosting = str_replace($table_name.'-','',$id_hosting);
$sqlColUpdate = '';
for($i=0;$i<count($sql_querry_values);$i++){
	$sqlColUpdate .= $column_array[$i] . "='" . $sql_querry_values[$i] . "',";
}
//var_dump($sqlColUpdate);
$sqlColUpdate2 = rtrim($sqlColUpdate, ",");
//var_dump($sqlColUpdate2);


// "UPDATE MyGuests SET lastname='Doe' WHERE id=2";

   $addToDatabase = "UPDATE " . $table_name . " SET " . $sqlColUpdate2 . "WHERE " . end($column_array) . " = " . $popVal;
 //  var_dump($addToDatabase);
 $addToDatabase = str_replace("'NULL'","NULL",$addToDatabase);
   $qry_result = mysqli_query($con, $addToDatabase) or die(mysqli_error($con));
   return getMysqlRequest2($table_name);
   }

//======================================================================




function getMysqlRequest4($columName,$tableName){
include "connection.php";
$colArray = $GLOBALS['tableCol'];
$dataTable = getDb('management',$columName);
$nameCol2 = $colArray[$dataTable];
$name = preg_grep("/_name/", $nameCol2);
$name = implode(',',$name);

   
  /* if($tableName == 'person'){
	     
	   
			   $display ="<select id='" . $tableName ."-". $key ."' class='selectpicker' data-live-search='true' title='" . ucwords(str_replace('_', ' ', $columName)) ."'>";
			   $display .="<option></option>";
		} else {
		*/   
		
		
			$display_query = "SELECT ".$columName.",".$name." FROM " . $dataTable;	
			$display_query_result = mysqli_query($con, $display_query) or die(mysqli_error($con));
			while($row = mysqli_fetch_array($display_query_result)) {
				if($row[2] != NULL){
					$var2 = $row[2];
			$new_array[] = $row[0] ." - ". $row[1]." ". $var2;
				} else {
					$new_array[] = $row[0] ." - ". $row[1];
				}
			}
			  	
					$display ="<div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height'>";
					$display .="<input class='mdl-textfield__input' type='text' id='" . $tableName ."-". $columName ."' value='Select' readonly tabIndex='-1'>";
					$display .="<label for='" . $tableName ."-". $columName ."'>";
					$display .="<i class='mdl-icon-toggle__label material-icons'>keyboard_arrow_down</i>";
				   	$display .= "</label>";
					$display .="<label for='" . $tableName ."-". $columName ."' class='mdl-textfield__label'>" . ucwords(str_replace('_', ' ', $columName)) ."</label>";
					$display .="<ul for='" . $tableName ."-". $columName ."' class='mdl-menu mdl-menu--bottom-left mdl-js-menu'>";
					
			if(is_null($new_array)){	
				  		} else {
							
					
					if($columName == 'hosting_ID'){
					$display .="<li class='mdl-menu__item' data-val=NULL>NULL</li>";
					}
					
					
					foreach($new_array as $key=>$varB){
					
					
						$display .="<li class='mdl-menu__item' data-val='".$varB."'>".$varB."</li>";
						
							}
			   			}
		//}
		$display .="</ul></div>";   
	return $display;   
}



//======================================================================

function modalEntry($tableName){
include "connection.php";
$display = "<div class='mdl-card__title'>"; 
$display .= "</div>";
$display .= "<div class='mdl-card__supporting-text'>";
	$display .= "<form name ='" . $tableName. "'>";
$colums = array();	
$columNames = get_column_names($tableName);
//foreach($columNames as $column){
//	$colums[] = $column[0];
//}

//$columnNamesWithName = array_filter($columNames, 'myFilter3');


if($columnNamesWithName != null){
//$implodedNames = implode(',',$columnNamesWithName);
  $query = "SELECT * FROM " . $tableName;
 $display_query_result = mysqli_query($con, $query) or die(mysqli_error($con));
 
 while($row = mysqli_fetch_array($display_query_result)) { 
	$new_array[] = $row;
}
}

	
 foreach($columNames as $key=>$type){
		if(strpos($type, 'int') == true){	
		$display .= "<div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
    	$display .= "<input class='mdl-textfield__input' type='text' pattern='-?[0-9]*(\.[0-9]+)?' id='" . $tableName ."-".$key ."'>";
    	$display .="<label class='mdl-textfield__label' for='" . $tableName ."-".$key ."'>" . ucwords(str_replace('_', ' ', $key)) ."</label>";
    	$display .="<span class='mdl-textfield__error'>Input is not a number!</span>";
  		$display .= "</div>";		
		} elseif($key==key( array_slice( $columNames, -1, 1, TRUE ) )){
		} elseif(strpos($key, '_ID') == true) {
		
		$display.=getMysqlRequest4($key,$tableName);
		
		}elseif(strpos($key, 'server_') == true) {
		$display .= "<div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label floatleft'>";
    	$display .= "<input class='mdl-textfield__input' type='text' id='" . $tableName ."-". $key ."'>";
    	$display .= "<label class='mdl-textfield__label' for='" . $tableName ."-".$key ."'>" . ucwords(str_replace('_', ' ', $key)) ."</label>";
  		$display .= "</div>";
		}elseif(strpos($key, '_IP') == true) {
        $display .= "<div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label floatleft'>";
    	$display .= "<input class='mdl-textfield__input' type='text' id='" . $tableName ."-". $key ."'>";
    	$display .= "<label class='mdl-textfield__label' for='" . $tableName ."-".$key ."'>" . ucwords(str_replace('_', ' ', $key)) ."</label>";
  		$display .= "</div>";
		}
		else {
        $display .= "<div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
    	$display .= "<input class='mdl-textfield__input' type='text' id='" . $tableName ."-". $key ."'>";
    	$display .= "<label class='mdl-textfield__label' for='" . $tableName ."-".$key ."'>" . ucwords(str_replace('_', ' ', $key)) ."</label>";
  		$display .= "</div>";
		
		}
 }
       
     $display .= "</form>";
$display .=  "</div>";
return $display;
 }
 //=======================================================================
 
 function buildModal($name,$tableName){
	 $output = "<div id='" . $name . "-modal' class='modal fade' role='dialog'>";
  $output .= "<div class='modal-dialog'>";

    //<!-- Modal content-->
    $output .= "<div class='modal-content'>";
     $output .= "<div class='modal-header'>";
        $output .= "<button type='button' class='close' data-dismiss='modal'>&times;</button>";
        $output .= "<h4 class='modal-title'>Enter ". $name . " Information</h4>";
     $output .= "</div>";
      $output .= "<div class='modal-body'>";
        $output .= "<p>";
         $output.= modalEntry($tableName);
        $output.="</p>";
      $output.="</div>";
      $output.="<div class='modal-footer'>";

      	$output.="<input class='btn btn-warning' type = 'button' onclick = \"ajaxRequest(". insertButton($tableName,'getMysqlRequest1','popVal'). ")\" value = 'Submit' data-dismiss='modal'/>";
      
        $output.="<button type='button' class='btn btn-primary' data-dismiss='modal'>Cancel</button>";
      $output.="</div>";
   $output.= "</div>";

 $output.= "</div>";
$output.="</div>";
	 return $output;
 }
 
 //==============================================================
 function tabContent($name,$tableName){
$colArray = $GLOBALS['tableCol'];
$column_array= $colArray[$tableName];
foreach($column_array as $colA){
$inputIDs[] = $tableName . "-" . $colA;
}
$inputIDs = json_encode($inputIDs);
 $output = "<div class='mdl-grid'>";
  $output .="<div class='mdl-cell mdl-cell--12-col'>";
 		$output .="<div class='mdl-card  mdl-shadow--4dp data-card'>";
              //<!--    First Card Data      -->         
           $output .=" <div class='mdl-card__title'>";
    		$output .="<h2 class='mdl-card__title-text'>".$name." Information</h2>";
            
            $output .="<button id='".$name."DropButton'";
        $output .="class='mdl-button mdl-js-button mdl-button--icon'>";
  $output .="<i class='material-icons'>more_vert</i>";
$output .="</button>";

$output .="<ul class='mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect'";
    $output .=" for='".$name."DropButton'>";
  $output .=" <li class='mdl-menu__item'><button type='button' class='btn btn-info' data-toggle='modal' data-target='#".$name."-modal' data-whatever=''>Add New</button></li>";
  $output .=" <li class='mdl-menu__item'><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#".$name."-modal' data-whatever='".$inputIDs."'>Update Selected</button></li>";
  $output .="<li class='mdl-menu__item'><button type='button' class='btn btn-warning btn-md' onclick = \"ajaxRequest(storeid(),".deleteButton($tableName,'getMysqlRequest3').")\">Delete Selected</button></li>";
$output .="</ul> "   ;	
	$output .="</div>";
				$output .="<div class='mdl-card__supporting-text'>";
				$output .="<p id='ajaxDiv-".$tableName."'>";
				$output .=getMysqlRequest2($tableName);
				$output .="</p>";
			$output .="</div>";
  		$output .="</div>";
  	$output .="</div>";
  $output .="</div>";
  return $output;
  }	
					
						 ?>