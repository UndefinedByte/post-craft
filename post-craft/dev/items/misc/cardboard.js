IDRegistry.genItemID("cardboard");
Item.createItem("cardboard", "Cardboard", { name: "cardboard", data: 0 },{ stack: 64 });

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: ItemID.cardboard, count: 1, data: 0}, ["  ","ooo","   "], ['o', 339, 0]);
	Recipes.addFurnaceFuel(ItemID.cardboard, 0, 20);
});