/*! jQuery Ajax Queue v0.1.2pre | (c) 2013 Corey Frang | Licensed MIT */
(function(e) {
  var r, u = e({});
  e.ajaxQueue = function(n) {
    function t(u) {
      a = e.ajax(n), a.done(o.resolve).fail(o.reject).then(u, u), r = a
    }
    var a, o = e.Deferred(),
      c = o.promise();
    return u.queue(t), c.abort = function(r) {
      if (a) return a.abort(r);
      var i = u.queue(),
        f = e.inArray(t, i);
      return f > -1 && i.splice(f, 1), o.rejectWith(n.context || n, [c, r, ""]), c
    }, c
  }, e.ajaxQueue.clear = function() {
    u.clearQueue(), r && r.abort()
  }
})(jQuery);
/*!
 * jQuery Goo.gl URL Shortener 1.0
 * http://www.cekpr.com/goo.gl-bulk-shortener
 *
 * Date: 23-Feb-2015
 */
 
 
function disableMe() {
  $("#urls").attr("disabled", "disabled");
  $("#shortener").attr("disabled", "disabled");
  $("#expander").attr("disabled", "disabled");
  $("#clearer").attr("disabled", "disabled");
  $("#aborter").removeAttr("disabled");
  if ($(document).width() > 595) {
    $("#aborter").css({
      "position": "fixed",
      "bottom": "20px",
      "right": "20px"
    })
  }
  if ($(document).width() < 594) {
    document.getElementById('shres').scrollIntoView()
  }
  $("#shres tr:last").after('<tr><td><img src="/images/ajax-loader.gif" width="65" height="13" alt="Processing" /></td></tr>')
}

function enableMe() {
  $("#urls").removeAttr("disabled", "disabled");
  $("#shortener").removeAttr("disabled");
  $("#expander").removeAttr("disabled");
  $("#clearer").removeAttr("disabled");
  $("#aborter").attr("disabled", "disabled");
  $("#aborter").css({
    "position": "",
    "bottom": "",
    "right": ""
  });
  $("#shres tr:last").remove()
}



$(document).on('keyup paste', '#urls', function() {
  setTimeout(function() {
    $("#maxurl").html($("#urls").val().split("\n").length)
  }, 10000)
});
$("#aborter").on("click", function() {
  enableMe();
  $.ajaxQueue.clear()
});
$("#clearer").on("click", function() {
  $("#urls").val("");
  $("#maxurl").html("0")
});
$("#shortener").on("click", function() {
  if ($("#urls").val().trim() == "") {
    alert("Warning: URL to Convert is Empty!");
    return
  }
  var urls = $("#urls").val().replace("\r\n", "\n").split("\n");
  $("#shres").html('<tr><th colspan="4"><h3 class="center">Goo.gl URL Conversion Results</h3></th></tr><tr><th class="thl">Short URL</th><th>Long URL</th><th id="keyword">Keyword</th><th id="new_url">New URL</th></tr>');
  disableMe();
  var APIKEYS = 'AI more here';
  if ($("#gkey").val().trim() != "") {
    APIKEYS = $("#gkey").val()
  }
  
  
  
  $.each(urls, function(num, value) {
    $.ajaxQueue({
      url: 'https://content.googleapis.com/urlshortener/v1/url?alt=json&key=' + APIKEYS,
      data: JSON.stringify({
        "longUrl": value
      }),
      type: 'POST',
      contentType: "application/json",
      success: function(data) {
        //console.log(data);
        if (data.id != null) {
			
	
var myRegexp = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/g;
var match = myRegexp.exec(data.longUrl);
match = match[6];
//console.log(match); 

var rowAdded = function (even) {
var row = $("#shres tr:last").before('<tr class="'+even+'"><td>' + data.id + '</td><td>' + data.longUrl + '</td><td><input type="text" value="'+ match.replace(/[-_]/g,' ') +'"></td><td><a href="'+ data.id +'">'+ match.replace(/[-_]/g,' ') +'</a></td></tr>');
	
	return row;
	}		
          if ((num / 2).toString().match(/\./)) {
            rowAdded('even');
          } else {
            rowAdded();
          }
        } else {
          $("#shres tr:last").before('<tr><td>error sukses</td><td>' + value + '</td></tr>')
        }
		
		
        if ($(document).width() > 595) {
          window.scrollTo(0, (document.body.scrollHeight - 450))
        }
        if ((num + 1) == urls.length) {
          enableMe()
        }
      },
      error: function(err) {
        var mError = JSON.parse(err.responseText);
        console.log(mError);
        if (mError.error.errors[0].reason == 'keyInvalid') {
          $("#shres tr:last").after('<tr><td>Invalid API KEY</td><td>' + APIKEYS + '</td></tr>')
        } else if (mError.error.errors[0].reason == 'invalid') {
          $("#shres tr:last").after('<tr><td>Invalid URL</td><td>' + value + '</td></tr>')
        } else {
          $("#shres tr:last").after('<tr><td>' + mError.error.errors[0].reason + '</td><td>' + APIKEYS + '</td></tr>')
        }
        if ($(document).width() > 595) {
          window.scrollTo(0, (document.body.scrollHeight - 450))
        }
        if ((num + 1) == urls.length) {
          enableMe()
        }
      }
    })
  })
});

$("#shres").on("keyup", "input", function() {	
	//console.log($(this));
	var suka = $(this).parent().next().children().html();
	//console.log(suka);
	$(this).parent().next().children().html($(this).val());
				});
	
$("#expander").on("click", function() {
  if ($("#urls").val().trim() == "") {
    alert("Warning: URL to Convert is Empty!");
    return
  }
  var urls = $("#urls").val().replace("\r\n", "\n").split("\n");
  $("#shres").html('<tr><th colspan="4"><h3 class="center">Goo.gl URL Conversion Results</h3></th></tr><tr><th class="thl">Short URL</th><th>Long URL</th><th id="keyword">Keyword</th><th id="new_url">New URL</th></tr>');
  disableMe();
  var APIKEYS = 'AIzaSyD8DXc0OUz3uxR4OCtvc4BSqGDYzh6kqQI';
  if ($("#gkey").val().trim() != "") {
    APIKEYS = $("#gkey").val()
  }
  $.each(urls, function(num, value) {
    $.ajaxQueue({
      url: 'https://content.googleapis.com/urlshortener/v1/url?alt=json&key=' + APIKEYS + '&shortUrl=' + encodeURIComponent(value),
      type: 'GET',
      contentType: "application/json",
      success: function(data) {
        if (data.id != null) {
          if ((num / 2).toString().match(/\./)) {
            $("#shres tr:last").before('<tr class="even"><td>' + data.id + '</td><td>' + data.longUrl + '</td></tr>')
          } else {
            $("#shres tr:last").before('<tr><td>' + data.id + '</td><td>' + data.longUrl + '</td></tr>')
          }
        } else {
          $("#shres tr:last").before('<tr><td>error sukses</td><td>' + value + '</td></tr>')
        }
        if ($(document).width() > 595) {
          window.scrollTo(0, (document.body.scrollHeight - 450))
        }
        if ((num + 1) == urls.length) {
          enableMe()
        }
      },
      error: function(err) {
        var mError = JSON.parse(err.responseText);
        if (mError.error.errors[0].reason == 'keyInvalid') {
          $("#shres tr:last").before('<tr><td>Invalid API KEY</td><td>' + APIKEYS + '</td></tr>')
        } else if (mError.error.errors[0].reason == 'invalid') {
          $("#shres tr:last").before('<tr><td>Invalid URL</td><td>' + value + '</td></tr>')
        } else {
          $("#shres tr:last").before('<tr><td>' + mError.error.errors[0].reason + '</td><td>' + APIKEYS + '</td></tr>')
        }
        if ($(document).width() > 595) {
          window.scrollTo(0, (document.body.scrollHeight - 450))
        }
        if ((num + 1) == urls.length) {
          enableMe()
        }
      }
    })
  })
});
$('#checkApi').on("click", function() {
  if ($('#checkApi').prop('checked') == true) {
    $('#yourAPI').show("medium")
  } else {
    $('#yourAPI').hide("medium")
  }
});

