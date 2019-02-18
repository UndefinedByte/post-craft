IDRegistry.genItemID("cannedEmpty");
IDRegistry.genItemID("vegetablesCanned");
IDRegistry.genItemID("fishCanned");
IDRegistry.genItemID("meatCanned");


Item.createItem("cannedEmpty", "Empty Can Of Canned Food", {name: "canned_empty", data: 0});

Item.createFoodItem("vegetablesCanned", "Canned Vegetables", {name: "vegetables_canned", data: 0}, {food: 2});

Item.createFoodItem("fishCanned", "Canned Fish", {name: "fish_canned", data: 0}, {food: 4});

Item.createFoodItem("meatCanned", "Canned Meat", {name: "meat_canned", data: 0}, {food: 6});


Callback.addCallback("FoodEaten",function(heal, satRatio){
	
	if(Player.getCarriedItem().id == ItemID.vegetablesCanned || Player.getCarriedItem().id == ItemID.fishCanned || Player.getCarriedItem().id == ItemID.meatCanned){
		Player.addItemToInventory(ItemID.cannedEmpty, 1, 0);
	}
});


Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: ItemID.cannedEmpty, count: 8, data: 0}, ["qqq","aqa","qaq"], ['a', ItemID.ingotTin, 0]);
	Recipes.addShaped({id: ItemID.vegetablesCanned, count: 4, data: 0}, ["","b","a"], ['a', ItemID.cannedEmpty, 0,'b',391,0]);
	Recipes.addShaped({id: ItemID.fishCanned, count: 4, data: 0}, ["","b","a"], ['a', ItemID.cannedEmpty, 0,'b',349,0]);
	Recipes.addShaped({id: ItemID.meatCanned, count: 4, data: 0}, ["","b","a"], ['a', ItemID.cannedEmpty, 0,'b',363,0]);
});


//Translations

Translation.addTranslation("Empty Can Of Canned Food", {ru: "Пустая банка консервов"});
Translation.addTranslation("Canned Vegetables", {ru: "Консервированные овощи"});
Translation.addTranslation("Canned Fish", {ru: "Рыбные консервы"});
Translation.addTranslation("Canned Meat", {ru: "Мясные консервы"});