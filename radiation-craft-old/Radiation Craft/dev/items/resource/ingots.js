IDRegistry.genItemID("refinedIron");
//IDRegistry.genItemID("ingotBronze");
IDRegistry.genItemID("ingotCopper");
IDRegistry.genItemID("ingotTin");
IDRegistry.genItemID("ingotLead");
//IDRegistry.genItemID("ingotAlloy");


//Item.createItem("ingotBronze", "Bronze Ingot", {name: "ingot_bronze", data: 0});
Item.createItem("ingotTin", "Tin Ingot", {name: "ingot_tin", data: 0});
Item.createItem("ingotCopper", "Copper Ingot", {name: "ingot_copper", data: 0});
Item.createItem("refinedIron", "Refined Iron", {name: "refined_iron", data: 0});
Item.createItem("ingotLead", "Lead Ingot", {name: "ingot_lead", data: 0});
//Item.createItem("ingotAlloy", "Alloy Ingot", {name: "ingot_alloy", data: 0});


Callback.addCallback("PostLoaded", function(){
	Recipes.addFurnace(265, ItemID.refinedIron, 0);
	//Recipes.addShaped({id: ItemID.ingotAlloy, count: 2, data: 0}, ["aaa","bbb","ccc"], ['a', ItemID.plateIron, 0,'b', ItemID.plateBronze, 0,'c',ItemID.plateTin,0]);
});

//Translations

Translation.addTranslation("Copper Ingot", {ru: "Медный слиток"});
Translation.addTranslation("Tin Ingot", {ru: "Оловянный слиток"});
//Translation.addTranslation("Bronze Ingot", {ru: "Бронзовый слиток"});
Translation.addTranslation("Refined Iron", {ru: "Рафинированное железо"});
Translation.addTranslation("Lead Ingot", {ru: "Свинцовый слиток"});
//Translation.addTranslation("Alloy Ingot", {ru: "Композитный слиток"});