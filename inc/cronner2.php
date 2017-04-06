<?php
include "../inc/connection2.php";

$deleteDate = time();
  $sql = "DELETE FROM account WHERE flag_delete_date < ".$deleteDate;
  $mysqli->query($sql) or die($mysqli->error);
 ?>
