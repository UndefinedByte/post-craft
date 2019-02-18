IDRegistry.genBlockID("elevator"); 
Block.createBlock("elevator", [
	{name: "Elevator", texture: [["elevator", 0]], inCreative: true}
], "opaque");

ToolAPI.registerBlockMaterial(BlockID.elevator, "stone", 2, true);
Block.setDestroyTime(BlockID.elevator, 3);


Callback.addCallback("ItemUse", function(coords, item, block){

	for(var i = 1; i <= 6; i++){
		if(block.id == BlockID.elevator && World.getBlockID(coords.x, coords.y + i, coords.z) == BlockID.elevator && Entity.getSneaking(Player.get()) == false){
			Player.setPosition (coords.x + 0.5, coords.y + i + 2, coords.z + 0.5); 
			break;
			//Game.message('up');
		}
		
		if(block.id == BlockID.elevator && World.getBlockID(coords.x, coords.y - i, coords.z) == BlockID.elevator && Entity.getSneaking(Player.get()) == true){
			Player.setPosition (coords.x + 0.5, coords.y - i + 2, coords.z + 0.5);
			break;
			//Game.message('down');
		}
	}
});