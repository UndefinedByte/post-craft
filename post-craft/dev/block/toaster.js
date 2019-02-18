IDRegistry.genBlockID("toaster"); 
Block.createBlockWithRotation("toaster", [
	{name: "Toaster", texture: [["toaster_side", 0], ["toaster_top", 0], ["toaster_side", 0], ["toaster_side", 0], ["toaster_side", 0], ["toaster_side", 0]], inCreative: true}
], "opaque");

ToolAPI.registerBlockMaterial(BlockID.toaster, "stone", 4);


Callback.addCallback("ItemUse", function(coords, item, block){
	if(block.id == BlockID.toaster){
		World.drop(coords.x + 0.75, coords.y + 1, coords.z + 0.5, 297, 1, 0);
		World.drop(coords.x + 0.25, coords.y + 1, coords.z + 0.5, 297, 1, 0);
}}); 


Callback.addCallback("DestroyBlockStart", function (coords, block, player) {
	if(block.id == BlockID.toaster && Entity.getSneaking(Player.get()) == true){
		World.destroyBlock(coords.x, coords.y, coords.z, true) 
	}
});
