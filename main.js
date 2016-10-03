

/*								Variables								*/


var entities = [
	"version",
	"clicks",
	"minerals",
	"polymers",
	"polymersProgress",
	"cursor",
	"cursorCost",
	"cursorBaseCost",
	"cursorPower",
	"showel",
	"showelCost",
	"showelBaseCost",
	"showelPower",
	"pick",
	"pickCost",
	"pickBaseCost",
	"pickPower",
	"drill",
	"drillCost",
	"drillBaseCost",
	"drillPower",
	"engineer",
	"engineerCost",
	"engineerBaseCost",
	"engineerPower",
	"harvester",
	"harvesterCost",
	"harvesterBaseCost",
	"harvesterPower",
	"mine",
	"mineCost",
	"mineBaseCost",
	"minePower",
	"factory",
	"factoryCost",
	"factoryBaseCost",
	"factoryPower",
	"spaces",
	"spacesCost",
	"spacesBaseCost",
	"spacesPower",
	"spacest",
	"spacestCost",
	"spacestBaseCost",
	"spacestPower",
	"dyson",
	"dysonCost",
	"dysonBaseCost",
	"dysonPower",
	"converter",
	"converterCost",
	"converterBaseCost",
	"converterPower",
];

var displayData = [
	"minerals",
	"polymers",
	"cursor",
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
	"version" : "0.0.5",
	"clicks" : 0,
	"minerals" : 0,
	"polymers" : 0,
	"polymersProgress" : 0,
	"cursor" : 0,
	"cursorCost" : 10,
	"cursorBaseCost" : 10,
	"cursorPower" : 1,
	"showel" : 0,
	"showelCost" : 20,
	"showelBaseCost" : 20,
	"showelPower" : 2,
	"pick" : 0,
	"pickCost" : 40,
	"pickBaseCost" : 40,
	"pickPower" : 4,
	"drill" : 0,
	"drillCost" : 80,
	"drillBaseCost" : 80,
	"drillPower" : 8,
	"engineer" : 0,
	"engineerCost" : 160,
	"engineerBaseCost" : 160,
	"engineerPower" : 16,
	"harvester" : 0,
	"harvesterCost" : 320,
	"harvesterBaseCost" : 320,
	"harvesterPower" : 32,
	"mine" : 0,
	"mineCost" : 640,
	"mineBaseCost" : 640,
	"minePower" : 64,
	"factory" : 0,
	"factoryCost" : 1280,
	"factoryBaseCost" : 1280,
	"factoryPower" : 128,
	"spaces" : 0,
	"spacesCost" : 2560,
	"spacesBaseCost" : 2560,
	"spacesPower" : 256,
	"spacest" : 0,
	"spacestCost" : 5120,
	"spacestBaseCost" : 5120,
	"spacestPower" : 512,
	"dyson" : 0,
	"dysonCost" : 10240,
	"dysonBaseCost" : 10240,
	"dysonPower" : 1024,
	"converter" : 0,
	"converterCost" : 20480,
	"converterBaseCost" : 20480,
	"converterPower" : 2048,
};


/*								Functions								*/


function mineralClick(){
	data["minerals"] = 1 + data["minerals"] + data["cursor"];
	data["clicks"] += 1;
	if (data["polymersProgress"] >= data["polymers"]) {
		data["polymers"] += 1;
		data["polymersProgress"] = data["polymersProgress"] - data["polymers"];
		document.getElementById("polymers").innerHTML = data["polymers"];
		//console.log("Polymer Synthesized");
	} else {
		data["polymersProgress"] += 1 + data["cursor"];
	};
	document.getElementById("minerals").innerHTML = data["minerals"];
	console.log(data["polymersProgress"]);
};

function autoClick(){
	var production =

	data["cursor"]*data["cursorPower"] +
	data["showel"]*data["showelPower"] +
	data["pick"]*data["pickPower"] +
	data["drill"]*data["drillPower"] +
	data["engineer"]*data["engineerPower"] +
	data["harvester"]*data["harvesterPower"] +
	data["mine"]*data["minePower"] +
	data["factory"]*data["factoryPower"] +
	data["spaces"]*data["spacesPower"] +
	data["spacest"]*data["spacestPower"] +
	data["dyson"]*data["dysonPower"] +
	data["converter"]*data["converterPower"];

	data["minerals"] = Math.round(data["minerals"] + production);
	document.getElementById("minerals").innerHTML = data["minerals"];
};

function curItemCost(item){
	var nextCost = Math.floor(data[item+"BaseCost"] * Math.pow(1.1,data[item]));
	document.getElementById(item+"Cost").innerHTML = prettify(nextCost);
};

function buyItem(item){
	console.log(data[item+"BaseCost"]);
	var itemCost = Math.floor(data[item+"BaseCost"] * Math.pow(1.1,data[item]));
	if(data["minerals"] >= itemCost){
		data[item] += 1;
		data["minerals"] = data["minerals"] - itemCost;
		document.getElementById(item).innerHTML = data[item];
		document.getElementById("minerals").innerHTML = data["minerals"];
	};
	curItemCost(item);
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
		if (entry.indexOf("Cost") !== -1) {
			curItemCost(entry.replace("Cost",""));
		}
		else {
			document.getElementById(entry).innerHTML = data[entry];
		};
		console.log(saveGame[entry] + " " + entry + " loaded");
	});
};

function executeSave(){
	localStorage.setItem("ebmSave",JSON.stringify(data));
};

function deleteSave(){
	localStorage.removeItem("ebmSave");
	window.location.reload(false);
}


/*								Events								*/


window.onload = function() {
	loadSave();
};

window.setInterval(function(){
	autoClick();
	executeSave();
}, 1000);