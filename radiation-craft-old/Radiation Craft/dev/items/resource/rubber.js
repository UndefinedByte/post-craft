
IDRegistry.genItemID("latex");
Item.createItem("latex", "Latex", {name: "latex", data: 0});


IDRegistry.genItemID("rubber");
Item.createItem("rubber", "Rubber", {name: "rubber", data: 0});

Callback.addCallback("PostLoaded", function(){
	Recipes.addFurnace(ItemID.latex, ItemID.rubber, 0);
});

//Translations

Translation.addTranslation("Latex", {ru: "Латекс"});
Translation.addTranslation("Rubber", {ru: "Резина"});