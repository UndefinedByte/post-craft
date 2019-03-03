IDRegistry.genBlockID("blockLead");
Block.createBlock("blockLead", [
	{name: "Lead Block", texture: [["block_lead", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.blockLead, "stone", 2, true);
Block.setDestroyTime(BlockID.blockLead, 5);
Block.setDestroyLevel("blockLead", 2);


/*
IDRegistry.genBlockID("blockTin");
Block.createBlock("blockTin", [
	{name: "Tin Block", texture: [["block_tin", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.blockTin, "stone", 2, true);
Block.setDestroyTime(BlockID.blockTin, 5);
Block.setDestroyLevel("blockTin", 2);*/


IDRegistry.genBlockID("blockUranium");
Block.createBlock("blockUranium", [
	{name: "Uranium Block", texture: [["uranium_block_bt", 0], ["uranium_block_bt",0], ["uranium_block_sides", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.blockUranium, "stone", 2, true);
Block.setDestroyTime(BlockID.blockUranium, 5);
Block.setDestroyLevel("blockUranium", 2);




Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.blockLead, count: 1, data: 0}, ["ooo","ooo","ooo"], ['o', ItemID.ingotLead, 0]);
	Recipes.addShaped({id: BlockID.blockUranium, count: 1, data: 0}, ["ooo","ooo","ooo"], ['o', ItemID.uranium, 0]);
	
	Recipes.addShaped({id: ItemID.ingotLead, count: 1, data: 0}, ["","o",""], ['o', BlockID.blockLead, 0]);
	Recipes.addShaped({id: ItemID.uranium, count: 1, data: 0}, ["","o",""], ['o', BlockID.blockUranium, 0]);
});