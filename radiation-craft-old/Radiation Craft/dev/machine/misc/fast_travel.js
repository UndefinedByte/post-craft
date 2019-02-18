/*IDRegistry.genBlockID("fastTravel");
Block.createBlock("fastTravel", [
	{name: "Fast Travel", texture: [["machine_block", 0], ["fast_travel", 0], ["fast_travel_side", 0], ["fast_travel_side", 0], ["fast_travel_side", 0], ["fast_travel_side", 0]], inCreative: true},
], "opaque");

ToolAPI.registerBlockMaterial(BlockID.fastTravel, "stone", 2, true);
Block.setDestroyTime(BlockID.fastTravel, 3);



Callback.addCallback("ItemUse", function(coords, item, block) {
		if(block.id == BlockID.fastTravel && item.id == ItemID.frequencyTransmitter) {
			
			var masposx = coords.x; 
			var masposy = coords.y; 
			var masposz = coords.z;
			
			Game.message("x: " + masposx + "  y:" + masposy + "  z: " + masposz);
		}
});


//Translations

Translation.addTranslation("Fast Travel", {ru: "Быстрое путешествие"});
*/