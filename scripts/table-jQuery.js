

function storeid(){
    var className = document.getElementsByClassName('is-selected');
	console.log(className);
    var idStore = new Array();
    for(var j = 0; j < className.length; j++){
        idStore.push(className[j].id);
    }
	var storeVal = new Array();
	for(var i = 0; i < idStore.length; i++){
			var child = document.getElementById(idStore[i]).children;

storeVal.push(child[child.length - 1].innerHTML);
	}
    return storeVal;
}

//===========================================================================

function storeidUpdate(){
    var className = document.getElementsByClassName('is-selected');
	console.log(className);
    var idStore = new Array();
    for(var j = 0; j < className.length; j++){
        idStore.push(className[j].id);
    }
	var storeVal = new Array();
	for(var i = 0; i < idStore.length; i++){
			var child = document.getElementById(idStore[i]).children;
for(var k = 0; k < child.length; k++){
storeVal.push(child[k].innerHTML);
	}
	}

	storeVal.shift();
	//console.log(storeVal);
    return storeVal;
}

//===========================================================
