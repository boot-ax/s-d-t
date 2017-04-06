<?php
include "../inc/connection2.php";

$deleteDate = time()- 60*60;
  $sql = "DELETE FROM temp_table WHERE temp_date < ".$deleteDate;
  $mysqli->query($sql) or die($mysqli->error);
 ?>
