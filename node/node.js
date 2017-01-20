var username = "josephkolnik";
var https = require("https");
function printMessage(username, badgeCount, points){
var message = username + " has " + badgeCount + " total badges(s) and " + points +" points in JavaScript";
  console.log(message);
}; 

var throwError = function(e){
console.error(e.message);
}

var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response){
           var body = "";        
                       
            response.on('data', function (chunk){
                 body += chunk;
                 });
            
            response.on('end',function(){
              if(response.statusCode === 200){
                  try {var profile = JSON.parse(body);
                  printMessage(username,profile.badges.length,profile.points.JavaScript);
                  }
                  catch(e){
                  throwError(e);
                   }
              } 
              else {
              throwError({message: "there was an error getting information for the username: " + username + ". (" + response.statusMessage + ")"});
              
              }
            })
});
request.on("error", throwError);
