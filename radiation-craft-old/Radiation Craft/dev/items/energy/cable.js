IDRegistry.genItemID("cableCopper0");
IDRegistry.genItemID("cableCopper1");

Item.createItem("cableCopper0", "Copper Cable", {name: "cable_copper", meta: 0});

Translation.addTranslation("Copper Cable", {ru: "Медный провод"});

Item.createItem("cableCopper1", "Copper Cable (insulated)", {name: "cable_copper", meta: 1});

Translation.addTranslation("Copper Cable (insulated)", {ru: "Изолированный медный провод"});


Callback.addCallback("PostLoaded", function(){
	// cutting recipes
	addRecipeWithCraftingTool({id: ItemID.cableCopper0, count: 3, data: 0}, [{id: ItemID.plateCopper, data: 0}], ItemID.craftingCutter);

	// isolation recipes
	addShapelessRecipe({id: ItemID.cableCopper1, count: 1, data: 0}, [{id: ItemID.cableCopper0, count: 1, data: 0}, {id: ItemID.rubber, count: 1, data: 0}]);
});


// place funcs 

Item.registerUseFunction("cableCopper1", function(coords, item, block){
	var place = coords.relative;
	if(GenerationUtils.isTransparentBlock(World.getBlockID(place.x, place.y, place.z))){
		World.setBlock(place.x, place.y, place.z, BlockID.cableCopper);
		Player.setCarriedItem(item.id, item.count - 1, item.data);
		EnergyTypeRegistry.onWirePlaced();
	}
});

// drop 
Block.registerDropFunction("cableCopper", function(){
	return [[ItemID.cableCopper1, 1, 0]];
});