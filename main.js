
/*				Variables				*/

var entities = [
	"version",
	"clicks",
	"minerals",
	"polymers",
	"polymersProgress",
	"cursors",
	"cursorCost",
	"showel",
	"showelCost",
	"pick",
	"pickCost",
	"drill",
	"drillCost",
	"engineer",
	"engineerCost",
	"harvester",
	"harvesterCost",
	"mine",
	"mineCost",
	"factory",
	"factoryCost",
	"spaces",
	"spacesCost",
	"spacest",
	"spacestCost",
	"dyson",
	"dysonCost",
	"converter",
	"converterCost",
];

var displayData = [
	"minerals",
	"polymers",
	"cursors",
	"cursorCost",
	"showel",
	"showelCost",
	"pick",
	"pickCost",
	"drill",
	"drillCost",
	"engineer",
	"engineerCost",
	"harvester",
	"harvesterCost",
	"mine",
	"mineCost",
	"factory",
	"factoryCost",
	"spaces",
	"spacesCost",
	"spacest",
	"spacestCost",
	"dyson",
	"dysonCost",
	"converter",
	"converterCost",
];

var data = {
	"version" : "0.0.2",
	"clicks" : 0,
	"minerals" : 0,
	"polymers" : 0,
	"polymersProgress" : 0,
	"cursors" : 0,
	"cursorCost" : 10,
	"showel" : 0,
	"showelCost" : 20,
	"pick" : 0,
	"pickCost" : 40,
	"drill" : 0,
	"drillCost" : 80,
	"engineer" : 0,
	"engineerCost" : 160,
	"harvester",
	"harvesterCost" : 320,
	"mine" : 0,
	"mineCost" : 640,
	"factory" : 0,
	"factoryCost" : 1280,
	"spaces" : 0,
	"spacesCost" : 2560,
	"spacest" : 0,
	"spacestCost" : 5120,
	"dyson" : 0,
	"dysonCost" : 10240,
	"converter" : 0,
	"converterCost" : 20480,
};

/*				Functions				*/

function mineralClick(){
	data["minerals"] = data["minerals"] + data["cursors"] + 1;
	data["clicks"] += 1;
	if (data["polymersProgress"] >= data["polymers"]) {
		data["polymers"] += 1;
		data["polymersProgress"] = data["polymersProgress"] - data["polymers"];
		document.getElementById("polymers").innerHTML = data["polymers"];
		console.log("Polymer Synthesized");
	} else {
		data["polymersProgress"] += 1 + data["cursors"];
	};
	document.getElementById("minerals").innerHTML = data["minerals"];
	console.log(data["polymersProgress"]);
};

function autoClick(){
	data["minerals"] = Math.round(data["minerals"] + data["cursors"]*data["polymers"]);
	document.getElementById("minerals").innerHTML = data["minerals"];
};

function curCursorCost(){
	var nextCost = Math.floor(10 * Math.pow(1.1,data["cursors"]));
	document.getElementById("cursorCost").innerHTML = prettify(nextCost);
};

function curShowelCost(){
	var nextCost = Math.floor(20 * Math.pow(1.1,data["cursors"]));
	document.getElementById("cursorCost").innerHTML = prettify(nextCost);
};

function buyCursor(){
	var cursorCost = Math.floor(10 * Math.pow(1.1,data["cursors"]));
	if(data["minerals"] >= cursorCost){
		data["cursors"] += 1;
		data["minerals"] = data["minerals"] - cursorCost;
		document.getElementById("cursors").innerHTML = data["cursors"];
		document.getElementById("minerals").innerHTML = data["minerals"];
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
	});
	displayData.forEach(function(entry){
		document.getElementById(entry).innerHTML = data[entry];
		console.log(saveGame[entry] + " " + entry + " loaded");
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

/*				Events				*/

window.onload = function() {
	loadSave();
};

window.setInterval(function(){
	autoClick();
	executeSave();
}, 1000);