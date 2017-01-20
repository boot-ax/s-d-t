<?php 
$title = "Jordan's Method";
include("inc/header.php"); ?>
<link rel="stylesheet" href="css/jordan.css"> 
</header>
<!-- Floating Multiline Textfield -->
<body>



<!-- start body container -->

<div id="wrapper">  
  <p><strong>URL List</strong></p>
  <p><textarea id="urls" class="grey" name="urls"></textarea></p>
  <p><input type="checkbox" id="checkApi"> Use your goo.gl API (other than SE Key)</p> <br> 
  <div id="yourAPI">
    <p>Goo.gl API Key: <input id="gkey" type="text" class="grey" value="" /></p>
  </div>
 <input type="button" id="shortener" value="Create Short URLs" />
  <input type="button" id="expander" value="Expand Short URLs" />
  <input type="button" id="aborter" value="Abort Processing" disabled="disabled" />
  <input type="button" id="clearer" value="Clear Textarea" /><br />
  <table id="shres"><tr><th colspan="4"><h3 class="center">Goo.gl URL Conversion Results</h3></th></tr><tr><th class="thl">Short URL</th><th>Long URL</th><th id="keyword">Keyword</th><th id="new_url">New URL</th></tr></table>

<!-- aBSA -->

</div>
<!-- end of body container -->
<script src="javascript/urlShortner.js"></script>
</body>
</html>
