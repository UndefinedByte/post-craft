IDRegistry.genItemID("cardboard");
Item.createItem("cardboard", "Cardboard", {name: "cardboard", data: 0},{stack: 64});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: ItemID.cardboard, count: 4, data: 0}, ["qqq","qaa","qao"], ['a', 339, 0, 'o', 341, 0]);
});


//Translations

Translation.addTranslation("Cardboard", {ru: "Картон"});