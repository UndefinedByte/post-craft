IDRegistry.genItemID("cableCopper0");
IDRegistry.genItemID("cableCopper1");
Item.createItem("cableCopper0", "Copper Cable", {name: "cable_copper", meta: 0});
Item.createItem("cableCopper1", "Insulated Copper Cable", {name: "cable_copper", meta: 1});

IDRegistry.genItemID("oxygenePipe0");
Item.createItem("oxygenePipe0", "Oxygene Pipe", {name: "oxygene_pipe", meta: 0});


Item.registerUseFunction("cableCopper1", function(coords, item, block){
	var place = coords.relative;
	if(World.getBlockID(place.x, place.y, place.z) == 0){
		World.setBlock(place.x, place.y, place.z, BlockID.cableCopper);
		Player.setCarriedItem(item.id, item.count - 1, item.data);
		EnergyTypeRegistry.onWirePlaced();
	}
});

Item.registerUseFunction("oxygenePipe0", function(coords, item, block){
	var place = coords.relative;
	if(World.getBlockID(place.x, place.y, place.z) == 0){
		World.setBlock(place.x, place.y, place.z, BlockID.oxygenePipe);
		Player.setCarriedItem(item.id, item.count - 1, item.data);
		EnergyTypeRegistry.onWirePlaced();
	}
});