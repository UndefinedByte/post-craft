﻿/*IDRegistry.genItemID("bronzeSword");
IDRegistry.genItemID("bronzeShovel");
IDRegistry.genItemID("bronzePickaxe");
IDRegistry.genItemID("bronzeAxe");
IDRegistry.genItemID("bronzeHoe");

Item.createItem("bronzeSword", "Bronze Sword", {name: "bronze_sword", meta: 0}, {stack: 1});
Item.createItem("bronzeShovel", "Bronze Shovel", {name: "bronze_shovel", meta: 0}, {stack: 1});
Item.createItem("bronzePickaxe", "Bronze Pickaxe", {name: "bronze_pickaxe", meta: 0}, {stack: 1});
Item.createItem("bronzeAxe", "Bronze Axe", {name: "bronze_axe", meta: 0}, {stack: 1});
Item.createItem("bronzeHoe", "Bronze Hoe", {name: "bronze_hoe", meta: 0}, {stack: 1});


ToolAPI.addToolMaterial("bronze", {durability: 350, level: 3, efficiency: 6, damage: 2, enchantability: 14});
ToolAPI.setTool(ItemID.bronzeSword, "bronze", ToolType.sword);
ToolAPI.setTool(ItemID.bronzeShovel, "bronze", ToolType.shovel);
ToolAPI.setTool(ItemID.bronzePickaxe, "bronze", ToolType.pickaxe);
ToolAPI.setTool(ItemID.bronzeAxe, "bronze", ToolType.axe);
ToolAPI.setTool(ItemID.bronzeHoe, "bronze", ToolType.hoe);


Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: ItemID.bronzeSword, count: 1, data: 0}, ["a","a","b"], ['a', ItemID.ingotBronze, 0, 'b', 280, 0]);
	Recipes.addShaped({id: ItemID.bronzeShovel, count: 1, data: 0}, ["a","b","b"], ['a', ItemID.ingotBronze, 0, 'b', 280, 0]);
	Recipes.addShaped({id: ItemID.bronzePickaxe, count: 1, data: 0}, ["aaa"," b "," b "], ['a', ItemID.ingotBronze, 0, 'b', 280, 0]);
	Recipes.addShaped({id: ItemID.bronzeAxe, count: 1, data: 0}, ["aa","ab"," b"], ['a', ItemID.ingotBronze, 0, 'b', 280, 0]);
	Recipes.addShaped({id: ItemID.bronzeHoe, count: 1, data: 0}, ["aa"," b"," b"], ['a', ItemID.ingotBronze, 0, 'b', 280, 0]);
});

//Translations

//Translations

Translation.addTranslation("Bronze Sword", {ru: "Бронзовый меч"});
Translation.addTranslation("Bronze Shovel", {ru: "Бронзовая лопата"});
Translation.addTranslation("Bronze Pickaxe", {ru: "Бронзовая кирка"});
Translation.addTranslation("Bronze Axe", {ru: "Бронзовый топор"});
Translation.addTranslation("Bronze Hoe", {ru: "Бронзовая мотыга"});
*/