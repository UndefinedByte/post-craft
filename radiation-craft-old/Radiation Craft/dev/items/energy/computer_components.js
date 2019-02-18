/*//Disk

IDRegistry.genItemID("disk");

Item.createItem("disk", "Disk", {name: "disk", data: 0});


//HardDriveDisk

IDRegistry.genItemID("hdd");
Item.createItem("hdd", "Hard Disk Drive", {name: "hdd", data: 0});


//CPUs

IDRegistry.genItemID("alu");
IDRegistry.genItemID("ca");
IDRegistry.genItemID("cpu");

Item.createItem("alu", "Arithmetic logic unit", {name: "alu", data: 0});
Item.createItem("ca", "Control automaton", {name: "ca", data: 0});
Item.createItem("cpu", "CPU", {name: "cpu", data: 0});


//RAM

IDRegistry.genItemID("ram");
Item.createItem("ram", "RAM", {name: "ram", data: 0});

//VideoCard


IDRegistry.genItemID("baseCard");
IDRegistry.genItemID("videocard");
IDRegistry.genItemID("videocard1");
IDRegistry.genItemID("videocard2");

Item.createItem("baseCard", "Base card", {name: "card", data: 0});
Item.createItem("videocard", "Videocard", {name: "graphics_card", data: 0});

//OTHER


IDRegistry.genItemID("analyzer");
IDRegistry.genItemID("eeprom");

Item.createItem("analyzer", "Analyzer", {name: "analyzer", data: 0},{stack: 1});
Item.createItem("eeprom", "EEPROM", {name: "eeprom", data: 0},{stack: 1});



Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: ItemID.disk, count: 1, data: 0}, [" e ","e e"," e "], ['e',ItemID.ironNugget,0]);
	Recipes.addShaped({id: ItemID.hdd, count: 1, data: 0}, ["wed","ref","wed"], ['w',ItemID.chip,0,'e',ItemID.disk,0,'d',265,0,'r',ItemID.printedCircuitBoard,0,'f',33,0]);
	Recipes.addShaped({id: ItemID.ca, count: 1, data: 0}, ["grg","tct","gtg"], ['g',371,0,'r',331,0,'t',ItemID.transistor,0,'c',347,0]);
	Recipes.addShaped({id: ItemID.alu, count: 1, data: 0}, ["grg","tct","gtg"], ['g',ItemID.ironNugget,0,'r',331,0,'t',ItemID.transistor,0,'c',ItemID.chip,0]);
	Recipes.addShaped({id: ItemID.cpu, count: 1, data: 0}, ["grg","tct","gzg"], ['g',ItemID.ironNugget,0,'r',331,0,'t',ItemID.chip,0,'c',ItemID.ca,0,'z',ItemID.alu,0]);
	Recipes.addShaped({id: ItemID.ram, count: 1, data: 0}, ["d d"," a ",""], ['d',ItemID.chip,0,'a',ItemID.printedCircuitBoard,0]);
	Recipes.addShaped({id: ItemID.baseCard, count: 1, data: 0}, ["e ","ed","ec"], ['e',ItemID.ironNugget,0,'d',ItemID.printedCircuitBoard,0,'c',371,0]);
	Recipes.addShaped({id: ItemID.videocard, count: 1, data: 0}, ["abc"," d ",""], ['a',ItemID.chip,0,'b',ItemID.alu,0,'c',ItemID.ram,0,'d',ItemID.baseCard,0]);
	Recipes.addShaped({id: ItemID.eeprom, count: 1, data: 0}, ["aba","cvc","ada"], ['a',371,0,'b',ItemID.transistor,0,'c',339,0,'d',76,0,'v',ItemID.chip,0]);
	Recipes.addShaped({id: ItemID.analyzer, count: 1, data: 0}, ["a ","bc","ec"], ['a',76,0,'b',ItemID.transistor,0,'c',371,0,'e',ItemID.printedCircuitBoard,0]);
});*/