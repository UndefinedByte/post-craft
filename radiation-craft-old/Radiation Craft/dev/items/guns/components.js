
//Barrels

IDRegistry.genItemID("smallBarrel");
IDRegistry.genItemID("mediumBarrel");
IDRegistry.genItemID("heavyBarrel");


Item.createItem("smallBarrel", "Small Barrel", {name: "part_barrel", data: 2},{stack: 1});
Item.createItem("mediumBarrel", "Medium Barrel", {name: "part_barrel", data: 1},{stack: 1});
Item.createItem("heavyBarrel", "Heavy Barrel", {name: "part_barrel", data: 0},{stack: 1});


//BODY

IDRegistry.genItemID("smallBody");
IDRegistry.genItemID("mediumBody");
IDRegistry.genItemID("heavyBody");

Item.createItem("smallBody", "Small Body", {name: "part_body", data: 2},{stack: 1});
Item.createItem("mediumBody", "Medium Body", {name: "part_body", data: 1},{stack: 1});
Item.createItem("heavyBody", "Heavy Body", {name: "part_body", data: 0},{stack: 1});


//BOLT

IDRegistry.genItemID("mediumBolt");
IDRegistry.genItemID("heavyBolt");

Item.createItem("mediumBolt", "Medium Bolt", {name: "part_bolt", data: 0},{stack: 1});
Item.createItem("heavyBolt", "Heavy Bolt", {name: "part_bolt", data: 1},{stack: 1});


//HANDLE

IDRegistry.genItemID("smallHandle");
IDRegistry.genItemID("mediumHandle");
IDRegistry.genItemID("heavyHandle");


Item.createItem("smallHandle", "Small Handle", {name: "part_handle", data: 2},{stack: 1});
Item.createItem("mediumHandle", "Medium Handle", {name: "part_handle", data: 1},{stack: 1});
Item.createItem("heavyHandle", "Heavy Handle", {name: "part_handle", data: 0},{stack: 1});



//STOCK


IDRegistry.genItemID("smallStock");
IDRegistry.genItemID("mediumStock");

Item.createItem("smallStock", "Small Stock", {name: "part_stock", data: 1},{stack: 1});
Item.createItem("mediumStock", "Medium Stock", {name: "part_stock", data: 0},{stack: 1});




/*
IDRegistry.genItemID("partacog");
IDRegistry.genItemID("partreddot");
IDRegistry.genItemID("partholo");
IDRegistry.genItemID("partscope");


Item.createItem("partacog", "Прицел", {name: "part_acog", data: 0},{stack: 1});
Item.createItem("partreddot", "Прицел", {name: "part_reddot", data: 0},{stack: 1});
Item.createItem("partholo", "Прицел", {name: "part_holo", data: 0},{stack: 1});
Item.createItem("partscope", "Прицел", {name: "part_scope", data: 0},{stack: 1});


Recipes.addShaped({id: ItemID.partacog, count: 1, data: 0}, ["","oao","aaa"], ['a',ItemID.refinedIron, 0,'o',20, 0]);
Recipes.addShaped({id: ItemID.partreddot, count: 1, data: 0}, ["","oqq","aaa"], ['a',ItemID.refinedIron, 0,'o',20, 0]);
Recipes.addShaped({id: ItemID.partholo, count: 1, data:0}, ["","aoq","bob"], ['a',20, 0,'o',331, 0,'b',ItemID.refinedIron,0]);
Recipes.addShaped({id: ItemID.partscope, count: 1, data: 0}, ["aaa","bob","aaa"], ['a',ItemID.refinedIron, 0,'b',20, 0,'o',331,0]);
*/





Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: ItemID.smallBarrel, count: 1, data: 2}, ["qqa","qaq","qqq"], ['a',ItemID.refinedIron, 0]);
	Recipes.addShaped({id: ItemID.mediumBarrel, count: 1, data: 1}, ["qqa","qoq","aqq"], ['a',ItemID.refinedIron, 0,'o',ItemID.smallBarrel, 2]);
	Recipes.addShaped({id: ItemID.heavyBarrel, count: 1, data: 0}, ["qqa","qoq","aqq"], ['a',ItemID.refinedIron, 0,'o',ItemID.mediumBarrel, 1]);
	
	Recipes.addShaped({id: ItemID.smallBody, count: 1, data: 2}, ["aaa","aoa","aaq"], ['a',ItemID.refinedIron, 0,'o',331, 0]);
	Recipes.addShaped({id: ItemID.mediumBody, count: 1, data: 1}, ["qaq","aoa","qaq"], ['a',ItemID.refinedIron, 0,'o',ItemID.smallBody, 2]);
	Recipes.addShaped({id: ItemID.heavyBody, count: 1, data: 0}, ["qaq","aoa","qaq"], ['a',ItemID.refinedIron, 0,'o',ItemID.mediumBody, 1]);
	
	Recipes.addShaped({id: ItemID.mediumBolt, count: 1, data: 0}, ["aaa","aaq",""], ['a',ItemID.refinedIron, 0]);
	Recipes.addShaped({id: ItemID.heavyBolt, count: 1, data: 1}, ["qaq","aoa","qaq"], ['a',ItemID.refinedIron, 0,'o',ItemID.mediumBolt, 0]);
	
	Recipes.addShaped({id: ItemID.smallHandle, count: 1, data: 2}, ["aaa","aoq",""], ['a',ItemID.refinedIron, 0,'o',69, 0]);
	Recipes.addShaped({id: ItemID.mediumHandle, count: 1, data: 1}, ["qaq","aoa","qaq"], ['a',ItemID.refinedIron, 0,'o',ItemID.smallHandle, 2]);
	Recipes.addShaped({id: ItemID.heavyHandle, count: 1, data: 0}, ["qaq","aoa","qaq"], ['a',ItemID.refinedIron, 0,'o',ItemID.mediumHandle, 1]);
	
	Recipes.addShaped({id: ItemID.smallStock, count: 1, data: 1}, ["aaa","aaa","aaq"], ['a',ItemID.refinedIron, 0]);
	Recipes.addShaped({id: ItemID.mediumStock, count: 1, data: 0}, ["qaq","aoa","qaq"], ['a',ItemID.refinedIron, 0,'o',ItemID.smallStock, 1]);
});


//Translations

Translation.addTranslation("Small Barrel", {ru: "Малый ствол"});
Translation.addTranslation("Medium Barrel", {ru: "Средний ствол"});
Translation.addTranslation("Heavy Barrel", {ru: "Большой ствол"});

Translation.addTranslation("Small Body", {ru: "Малая ствольная коробка"});
Translation.addTranslation("Medium Body", {ru: "Средняя ствольная коробка"});
Translation.addTranslation("Heavy Body", {ru: "Большая ствольная коробка"});

Translation.addTranslation("Medium Bolt", {ru: "Затвор среднего размера"});
Translation.addTranslation("Heavy Bolt", {ru: "Затвор большого размера"});

Translation.addTranslation("Small Handle", {ru: "Малая рукоять"});
Translation.addTranslation("Medium Handle", {ru: "Средняя рукоять"});
Translation.addTranslation("Heavy Handle", {ru: "Большая рукоять"});

Translation.addTranslation("Small Stock", {ru: "Приклад малый"});
Translation.addTranslation("Medium Stock", {ru: "Приклад среднего размера"});