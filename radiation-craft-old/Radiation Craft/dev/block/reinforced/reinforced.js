/*var BLOCK_TYPE_REINFORCED_GlASS = Block.createSpecialType({
	destroytime: 5,
	explosionres: 150,
}, "glass_block");


var BLOCK_TYPE_REINFORCED_STONE = Block.createSpecialType({
	base: 1,
	solid: true,
	destroytime: 5,
	explosionres: 150,
	opaque: false,
	lightopacity: 0
}, "reinforced_block");


IDRegistry.genBlockID("reinforcedGlass"); 
Block.createBlock("reinforcedGlass", [
	{name: "Reinforced Glass", texture: [["reinforced_glass", 0]], inCreative: true}
],BLOCK_TYPE_REINFORCED_GlASS);

ToolAPI.registerBlockMaterial(BlockID.reinforcedGlass, "stone", 2, true);



IDRegistry.genBlockID("reinforcedStone"); 
Block.createBlock("reinforcedStone", [
	{name: "Reinforced Stone", texture: [["reinforced_stone", 0]], inCreative: true}
],BLOCK_TYPE_REINFORCED_STONE);

ToolAPI.registerBlockMaterial(BlockID.reinforcedStone, "stone", 2, true);


Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.reinforcedStone, count: 8, data: 0}, ["ooo","oao","ooo"], ['a',ItemID.plateAlloy, 0, 'o',1, 0]);
	Recipes.addShaped({id: BlockID.reinforcedGlass, count: 8, data: 0}, ["ooo","aoa","ooo"], ['a',ItemID.plateAlloy, 0, 'o',20, 0]);
});



//Translations

Translation.addTranslation("Reinforced Glass", {ru: "Укреплённое стекло"});
Translation.addTranslation("Reinforced Stone", {ru: "Укреплённый камень"});*/