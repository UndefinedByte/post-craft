IDRegistry.genItemID("firemanAxe");
IDRegistry.genItemID("batWooden");
IDRegistry.genItemID("batIron");
IDRegistry.genItemID("katana");
IDRegistry.genItemID("machete");
IDRegistry.genItemID("knife");



Item.createItem("firemanAxe", "Fireman Axe", {name: "fireman_axe", data: 0},{stack: 1});

Item.createItem("batWooden", "Wooden Bat", {name: "wooden_bat", data: 0},{stack: 1});

Item.createItem("batIron", "Iron Bat", {name: "iron_bat", data: 0},{stack: 1});

Item.createItem("katana", "Katana", {name: "katana", data: 0},{stack: 1});

Item.createItem("machete", "Machete", {name: "machete", data: 0},{stack: 1});

Item.createItem("knife", "Knife", {name: "knife", data: 0},{stack: 1});



/*
IDRegistry.genItemID("arrowfire");
Item.createItem("arrowfire", "Взрывная огненная стрела", {name: "arrow_fire", data: 0},{stack: 64});

IDRegistry.genItemID("arrowexplosion");
Item.createItem("arrowexplosion", "Взрывная стрела", {name: "arrow_explosion", data: 0},{stack: 64});
*/



ToolAPI.addToolMaterial("firemanAxe", {durability: 150, level: 3, damage: 5});
ToolAPI.setTool(ItemID.firemanAxe, "firemanAxe", ToolType.axe);


ToolAPI.addToolMaterial("batWooden", {durability: 60, level: 0, damage: 3});
ToolAPI.setTool(ItemID.batWooden, "batWooden", ToolType.sword);


ToolAPI.addToolMaterial("batIron", {durability: 120, level: 0, damage: 5});
ToolAPI.setTool(ItemID.batIron, "batIron", ToolType.sword);


ToolAPI.addToolMaterial("katana", {durability: 200, level: 0, damage: 10});
ToolAPI.setTool(ItemID.katana, "katana", ToolType.sword);


ToolAPI.addToolMaterial("machete", {durability: 125, level: 0, damage: 6});
ToolAPI.setTool(ItemID.machete, "machete", ToolType.sword);


ToolAPI.addToolMaterial("knife", {durability: 75, level: 0, damage: 2});
ToolAPI.setTool(ItemID.knife, "knife", ToolType.sword);



Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: ItemID.firemanAxe, count: 1, data: 0}, ["aaq","aoq","qoq"], ['a', 265, 0,'o', 280, 0]);
	Recipes.addShaped({id: ItemID.batWooden, count: 1, data: 0}, ["qqa","qaq","oqq"], ['a', 5, 0,'o', 280, 0]);
	Recipes.addShaped({id: ItemID.batIron, count: 1, data: 0}, ["qqa","qaq","oqq"], ['a', 265, 0,'o',280,0]);
	Recipes.addShaped({id: ItemID.katana, count: 1, data: 0}, ["qqq","qoq","aqq"], ['a', ItemID.machete, 0,'o', 265, 0]);
	Recipes.addShaped({id: ItemID.machete, count: 1, data: 0}, ["qqa","qaq","oqq"], ['a',265, 0,'o', 280, 0]);
	Recipes.addShaped({id: ItemID.knife, count: 1, data: 0}, ["qqq","qaq","oqq"], ['a',265, 0,'o', ItemID.rubber, 0]);
});


//Translations

Translation.addTranslation("Knife", {ru: "Нож"});
Translation.addTranslation("Machete", {ru: "Мачете"});
Translation.addTranslation("Katana", {ru: "Катана"});
Translation.addTranslation("Iron Bat", {ru: "Железная бита"});
Translation.addTranslation("Wooden Bat", {ru: "Деревянная бита"});
Translation.addTranslation("Fireman Axe", {ru: "Топор пожарного"});