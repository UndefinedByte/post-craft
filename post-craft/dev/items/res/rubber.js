IDRegistry.genItemID("latex");
IDRegistry.genItemID("rubber");

Item.createItem("latex", "Latex", {name: "latex", data: 0});
Item.createItem("rubber", "Rubber", {name: "rubber", data: 0});

Callback.addCallback("PostLoaded", function(){
	Recipes.addFurnace(ItemID.latex, ItemID.rubber, 0);
});