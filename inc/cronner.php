<?php
include "../inc/connection2.php";

$deleteDate = time()- 60*60;
  $sql = "DELETE FROM temp_table WHERE temp_date < ".$deleteDate;
  $mysqli->query($sql) or die($mysqli->error);

  // $sql2 = "DELETE FROM login_attempts WHERE (login_time > now() - INTERVAL 24 HOUR);";
  $sql2 = "DELETE FROM login_attempts WHERE (login_time > now() - INTERVAL 1 HOUR);";

  $mysqli->query($sql2) or die($mysqli->error);

 ?>
