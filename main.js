var entities = ['minerals','cursors','cursorCost','polymers', 'polymersProgress',];

var data = {
	'minerals' : 0,
	'cursors' : 0,
	'cursorCost' : 10,
	'polymers' : 0,
	'polymersProgress' : 0
};

function mineralClick(){
	data['minerals'] = data['minerals'] + data['cursors'] + 1;
	document.getElementById("minerals").innerHTML = data['minerals'];
};

function autoClick(){
	data['minerals'] = data['minerals'] + data['cursors'];
	document.getElementById("minerals").innerHTML = data['minerals'];
};

/*function polymersProgress(){
	if(data['polymersProgress'] >= 10){
		console.log('Polymers Reset');
		data['polymersProgress'] = 0;
		document.getElementById('polymers').innerHTML = data['polymers'];
		document.getElementsByClassName('ppactive').className = 'pp';
	} else {
		data['polymers'] = data['polymers'] + 1;
		console.log('Polymers got');
		document.getElementById('pp' + data['polymersProgress']).className += 'ppactive';
	};
};*/

function curCursorCost(){
	var nextCost = Math.floor(10 * Math.pow(1.1,data['cursors']));
	document.getElementById('cursorCost').innerHTML = prettify(nextCost);
};

function buyCursor(){
	var cursorCost = Math.floor(10 * Math.pow(1.1,data['cursors']));
	if(data['minerals'] >= cursorCost){
		data['cursors'] = data['cursors'] + 1;
		data['minerals'] = data['minerals'] - cursorCost;
		document.getElementById('cursors').innerHTML = data['cursors'];
		document.getElementById('minerals').innerHTML = data['minerals'];
	};
	curCursorCost();
};

function prettify(input){
	var output = Math.round(input * 1000000)/1000000;
	return output;
}

function loadSave(){
	var saveGame = JSON.parse(localStorage.getItem("ebmSave"));
	entities.forEach(function(entry){
		if (typeof saveGame[entry] !== "undefined") data[entry] = saveGame[entry];
		document.getElementById(entry).innerHTML = data[entry];
		console.log(saveGame[entry] + ' ' + entry + " loaded");
	});
	curCursorCost();
};

function executeSave(){
	localStorage.setItem("ebmSave",JSON.stringify(data)); 
};

function deleteSave(){
	localStorage.removeItem("ebmSave");
	window.location.reload(false);
}

window.onload = function() {
	loadSave();
};

window.setInterval(function(){
	autoClick();
	executeSave();
}, 1000);