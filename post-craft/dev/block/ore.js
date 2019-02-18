IDRegistry.genBlockID("oreAluminium");
Block.createBlock("oreAluminium", [
	{name: "Aluminium Ore", texture: [["ore_aluminum", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreAluminium, "stone", 2, true);
Block.setDestroyTime(BlockID.oreAluminium, 3);
Block.setDestroyLevel("oreAluminium", 2);


IDRegistry.genBlockID("oreCopper");
Block.createBlock("oreCopper", [
	{name: "Copper Ore", texture: [["ore_copper", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreCopper, "stone", 2, true);
Block.setDestroyTime(BlockID.oreCopper, 3);
Block.setDestroyLevel("oreCopper", 2);


IDRegistry.genBlockID("oreLead");
Block.createBlock("oreLead", [
	{name: "Lead Ore", texture: [["ore_lead", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreLead, "stone", 2, true);
Block.setDestroyTime(BlockID.oreLead, 3);
Block.setDestroyLevel("oreLead", 2);


IDRegistry.genBlockID("oreRadonium");
Block.createBlock("oreRadonium", [
	{name: "Radonium Ore", texture: [["ore_radonium", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreRadonium, "stone", 2, true);
Block.setDestroyTime(BlockID.oreRadonium, 3);
Block.setDestroyLevel("oreRadonium", 2);


IDRegistry.genBlockID("oreUranium");
Block.createBlock("oreUranium", [
	{name: "Uranium Ore", texture: [["ore_uranium", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreUranium, "stone", 3, true);
Block.setDestroyTime(BlockID.oreUranium, 3);
Block.setDestroyLevel("oreUranium", 3);