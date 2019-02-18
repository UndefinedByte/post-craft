/*IDRegistry.genBlockID("oreAluminium"); 
Block.createBlock("oreAluminium", [
	{name: "Aluminium Ore", texture: [["ore_aluminum", 0]], inCreative: true}
], "opaque");

ToolAPI.registerBlockMaterial(BlockID.oreAluminium, "stone", 2, true);
Block.setDestroyTime(BlockID.oreAluminium, 3);
Block.setDestroyLevel("oreAluminium", 2);*/



IDRegistry.genBlockID("oreCopper"); 
Block.createBlock("oreCopper", [
	{name: "Copper Ore", texture: [["ore_copper", 0]], inCreative: true}
], "opaque");

Translation.addTranslation("Copper Ore", {ru: "Медная руда"});
ToolAPI.registerBlockMaterial(BlockID.oreCopper, "stone", 2, true);
Block.setDestroyTime(BlockID.oreCopper, 3);
Block.setDestroyLevel("oreCopper", 2);



IDRegistry.genBlockID("oreTin"); 
Block.createBlock("oreTin", [
	{name: "Tin Ore", texture: [["ore_tin", 0]], inCreative: true}
], "opaque");

Translation.addTranslation("Tin Ore", {ru: "Оловянная руда"});
ToolAPI.registerBlockMaterial(BlockID.oreTin, "stone", 2, true);
Block.setDestroyTime(BlockID.oreTin, 3);
Block.setDestroyLevel("oreTin", 2);



IDRegistry.genBlockID("oreLead"); 
Block.createBlock("oreLead", [
	{name: "Lead Ore", texture: [["ore_lead", 0]], inCreative: true}
], "opaque");

Translation.addTranslation("Lead Ore", {ru: "Свинцовая руда"});
ToolAPI.registerBlockMaterial(BlockID.oreLead, "stone", 2, true);
Block.setDestroyTime(BlockID.oreLead, 3);
Block.setDestroyLevel("oreLead", 2);



IDRegistry.genBlockID("oreUranium");
Block.createBlock("oreUranium", [
	{name: "Uranium Ore", texture: [["ore_uranium", 0]], inCreative: true}
], "opaque");

Translation.addTranslation("Uranium Ore", {ru: "Урановая руда"});
ToolAPI.registerBlockMaterial(BlockID.oreUranium, "stone", 2, true);
Block.setDestroyTime(BlockID.oreUranium, 3);
Block.setDestroyLevel("oreUranium", 2);


/*
IDRegistry.genBlockID("oreSulfur");
Block.createBlock("oreSulfur", [
	{name: "Sulfur Ore", texture: [["ore_sulfur", 0]], inCreative: true}
], "opaque");


Translation.addTranslation("Sulfur Ore", {ru: "Серная руда"});
ToolAPI.registerBlockMaterial(BlockID.oreSulfur, "stone", 3, true);
Block.setDestroyTime(BlockID.oreSulfur, 3);
Block.setDestroyLevel("oreSulfur", 3);

Block.registerDropFunction("oreSulfur", function(coords, blockID, blockData, level, enchant){
	if(level > 3){
		var r = randomInt(1, 5);
		return [[ItemID.sulfur, r, 0]];
	}
});*/




var OreGenerator = {
	//"aluminium_ore": __config__.getBool("ore_gen.aluminium_ore"),
	"copper_ore": __config__.getBool("ore_gen.copper_ore"),
	"tin_ore": __config__.getBool("ore_gen.tin_ore"),
	"lead_ore": __config__.getBool("ore_gen.lead_ore"),
	"uranium_ore": __config__.getBool("ore_gen.uranium_ore"),
	//"sulfur_ore": __config__.getBool("ore_gen.sulfur_ore"),
	
	setOre: function(x, y, z, id, data){
		if(World.getBlockID(x, y, z) == 1){
		World.setBlock(x, y, z, id, data);}
	}
}


Callback.addCallback("PostLoaded", function(){
	/*if(OreGenerator.aluminium_ore){
		Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){
			for(var i = 0; i < 2; i++){
				var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 1, 20);
				GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreAluminium, 0, randomInt(1, 6));
			}
		});
	}*/
	if(OreGenerator.copper_ore){
		Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){
			for(var i = 0; i < 10; i++){
				var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 10, 70);
				GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreCopper, 0, randomInt(8, 12));
			}
		});
	}
	if(OreGenerator.tin_ore){
		Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){
			for(var i = 0; i < 8; i++){
				var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 1, 52);
				GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreTin, 0, randomInt(6, 10));
			}
		});
	}
	if(OreGenerator.lead_ore){
		Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){
			for(var i = 0; i < 8; i++){
				var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 1, 48);
				GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreLead, 0, randomInt(1, 4));
			}
		});
	}
	if(OreGenerator.uranium_ore){
		Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){
			for(var i = 0; i < 3; i++){
				var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 1, 48);
				GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreUranium, 0, randomInt(1, 4));
			}
		});
	}
	/*if(OreGenerator.sulfur_ore){
		Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){
			for(var i = 0; i < 10; i++){
				var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 6, 15);
				GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreSulfur, 0, randomInt(1, 10));
			}
		});
	}*/
});

Callback.addCallback("PostLoaded", function(){
	//Recipes.addFurnace(BlockID.oreAluminium, ItemID.ingotAluminium, 0);
	Recipes.addFurnace(BlockID.oreCopper,ItemID.ingotCopper, 0);
	Recipes.addFurnace(BlockID.oreTin,ItemID.ingotTin, 0);
	Recipes.addFurnace(BlockID.oreLead, ItemID.ingotLead, 0);
});

