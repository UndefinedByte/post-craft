IDRegistry.genItemID("ProtectiveHelmet");
IDRegistry.genItemID("ProtectiveChestplate");
IDRegistry.genItemID("ProtectiveLeggings");
IDRegistry.genItemID("ProtectiveBoots");


Item.createArmorItem("ProtectiveHelmet", "Protective Helmet", {name: "protective_helmet"}, {type: "helmet", armor: 2, durability: 70, texture: "armor/protective_helmet.png"});
Item.createArmorItem("ProtectiveChestplate", "Protective Chestplate", {name: "protective_chestplate"}, {type: "chestplate", armor: 2, durability: 70, texture: "armor/protective_chestplate.png"});
Item.createArmorItem("ProtectiveLeggings", "Protective Leggings", {name: "protective_leggings"}, {type: "leggings", armor: 2, durability: 70, texture: "armor/protective_leggings.png"});
Item.createArmorItem("ProtectiveBoots", "Protective Boots", {name: "protective_boots"}, {type: "boots", armor: 2, durability: 70, texture: "armor/protective_boots.png"});



Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: ItemID.ProtectiveHelmet, count: 1, data: 0}, ["сaс","obo","oco"], ['a', 351, 14, 'b', 20, 0,'c', ItemID.plateLead, 0, 'o', ItemID.rubber, 0]);
	Recipes.addShaped({id: ItemID.ProtectiveChestplate, count: 1, data: 0}, ["o o","aca","oao"], ['c', 351, 14, 'o', ItemID.rubber, 0,'a',  ItemID.plateLead,0]);
	Recipes.addShaped({id: ItemID.ProtectiveLeggings, count: 1, data: 0}, ["сaс","oсo","o o"], ['a', 351, 14, 'o',ItemID.rubber, 0,'с',  ItemID.plateLead, 0]);
	Recipes.addShaped({id: ItemID.ProtectiveBoots, count: 1, data: 0}, ["","a a","oco"], ['c', 35, 0 ,'o',ItemID.rubber, 0,'a',  ItemID.plateLead, 0]);
});

/*
Callback.addCallback("tick",function(){
	if(Player.getArmorSlot(0).id == ItemID.ProtectiveHelmet  &&  Player.getArmorSlot(1).id == ItemID.ProtectiveChestplate && Player.getArmorSlot(2).id == ItemID.ProtectiveLeggings  &&  Player.getArmorSlot(3).id == ItemID.ProtectiveBoots){
		
		Entity.addEffect(Player.get(), 13, 2, 100, false, false);
	}
});*/



//Translations

Translation.addTranslation("Protective Helmet", {ru: "Шлем-акваланг"});
Translation.addTranslation("Protective Chestplate", {ru: "Защитная кираса"});
Translation.addTranslation("Protective Leggings", {ru: "Защитные поножи"});
Translation.addTranslation("Protective Boots", {ru: "Резиновые ботинки"});