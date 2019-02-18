/*IDRegistry.genBlockID("machineBlock"); 
Block.createBlockWithRotation("machineBlock", [
	{name: "Machine Block", texture: [["machine_block", 0]], inCreative: true}
], "opaque");

ToolAPI.registerBlockMaterial(BlockID.machineBlock, "stone", 1, true);
Block.setDestroyLevel("machineBlock", 1);
Block.setDestroyTime(BlockID.machineBlock, 3);


Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.machineBlockBasic, count: 1, data: 0}, ["xxx","x x","xxx"], ['x', ItemID.plateIron, 0]);
	Recipes.addShapeless({id: ItemID.plateIron, count: 8, data: 0}, [{id: BlockID.machineBlockBasic, data: 0}]);
});*/