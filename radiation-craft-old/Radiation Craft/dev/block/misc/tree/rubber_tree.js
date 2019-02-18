var BLOCK_TYPE_LEAVES = Block.createSpecialType({
	base: 18,
	destroytime: 0.2,
});


function destroyLeaves(x, y, z){
	var max = 0;
	while(World.getBlockID(x, y+max+1, z)==BlockID.rubberTreeLeaves){max++;}
	for(var yy = y; yy <= y+max; yy++){
		for(var xx = x-2; xx <= x+2; xx++){
			for(var zz = z-2; zz <= z+2; zz++){
				if(World.getBlockID(xx, yy, zz)==BlockID.rubberTreeLeaves){
					if(Math.random() < .075){
						World.drop(xx, yy, zz, ItemID.rubberSapling, 1, 0);
					}
					World.setBlock(xx, yy, zz, 0);
				}
			}
		}
	}
}

IDRegistry.genBlockID("rubberTreeLog"); 
Block.createBlock("rubberTreeLog", [
	{name: "Rubber Tree Log", texture: [["log_hevea_top", 0], ["log_hevea_top", 0], ["log_hevea", 0], ["log_hevea", 0], ["log_hevea", 0], ["log_hevea", 0]], inCreative: true}
], "opaque");

Block.registerDropFunction("rubberTreeLog", function(coords, blockID){
	destroyLeaves(coords.x, coords.y, coords.z);
	return [[blockID, 1, 0]];
});


Block.setDestroyTime(BlockID.rubberTreeLog, 3);
ToolAPI.registerBlockMaterial(BlockID.rubberTreeLog, "wood");


IDRegistry.genBlockID("rubberTreeLogLatex");
Block.createBlock("rubberTreeLogLatex", [
	{name: "tile.rubberTreeLogLatex.name", texture: [["log_hevea_top", 0], ["log_hevea_top",0], ["log_hevea_latex", 0], ["log_hevea", 0], ["log_hevea", 0], ["log_hevea", 0]], inCreative: false},
	{name: "tile.rubberTreeLogLatex.name", texture: [["log_hevea_top", 0], ["log_hevea_top", 0], ["log_hevea", 0], ["log_hevea_latex",0], ["log_hevea", 0], ["log_hevea", 0]], inCreative: false},
	{name: "tile.rubberTreeLogLatex.name", texture: [["log_hevea_top", 0], ["log_hevea_top", 0], ["log_hevea", 0], ["log_hevea", 0], ["log_hevea_latex", 0], ["log_hevea", 0]], inCreative: false},
	{name: "tile.rubberTreeLogLatex.name", texture: [["log_hevea_top", 0], ["log_hevea_top", 0], ["log_hevea", 0], ["log_hevea", 0], ["log_hevea", 0], ["log_hevea_latex", 0]], inCreative: false}
], "opaque");

Block.registerDropFunction("rubberTreeLogLatex", function(coords, blockID){
	destroyLeaves(coords.x, coords.y, coords.z);
	return [[BlockID.rubberTreeLog, 1, 0], [ItemID.latex, 1, 0]];
});

Block.setDestroyTime(BlockID.rubberTreeLogLatex, 3);
ToolAPI.registerBlockMaterial(BlockID.rubberTreeLogLatex, "wood");

/*
IDRegistry.genBlockID("rubberTreeLogNoLatex"); 
Block.createBlock("rubberTreeLogNoLatex", [
	{name: "tile.rubberTreeLogNoLatex.name", texture: [["log_hevea_top", 0], ["log_hevea_top", 0], ["log_hevea", 0], ["log_hevea_latex", 1], ["log_hevea_latex", 0], ["log_hevea", 0]], inCreative: false}
], "opaque");*/



IDRegistry.genBlockID("rubberTreeLeaves");
Block.createBlock("rubberTreeLeaves", [
	{name: "Rubber Tree Leaves", texture: [["rubber_tree_leaves", 0]], inCreative: true}
], BLOCK_TYPE_LEAVES);


Block.registerDropFunction("rubberTreeLeaves", function(){
	if(Math.random() < .075){
		return [[ItemID.rubberSapling, 1, 0]]
	}
	else {
		return [];
	}
});

Block.setDestroyTime(BlockID.rubberTreeLog, 0.2);
ToolAPI.registerBlockMaterial(BlockID.rubberTreeLeaves, "plant");




IDRegistry.genBlockID("rubberTreePlanks"); 
Block.createBlock("rubberTreePlanks", [
	{name: "Rubber Tree Planks", texture: [["planks_hevea", 0]], inCreative: true}
], "opaque");


Block.setDestroyTime(BlockID.rubberTreePlanks, 3);
ToolAPI.registerBlockMaterial(BlockID.rubberTreePlanks, "wood");


Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.rubberTreePlanks, count: 4, data: 0}, [""," o ",""], ['o', BlockID.rubberTreeLog, 0]);
	Recipes.addShaped({id: 281, count: 4, data: 0}, ["","o o"," o "], ['o', BlockID.rubberTreePlanks, 0]);
	Recipes.addShaped({id: 143, count: 1, data: 0}, [""," o ",""], ['o', BlockID.rubberTreePlanks, 0]);
	Recipes.addShaped({id: 54, count: 1, data: 0}, ["ooo","o o","ooo"], ['o', BlockID.rubberTreePlanks, 0]);
	Recipes.addShaped({id: 58, count: 1, data: 0}, ["","oo ","oo "], ['o', BlockID.rubberTreePlanks, 0]);
	Recipes.addShaped({id: 324, count: 3, data: 0}, ["oo ","oo ","oo "], ['o', BlockID.rubberTreePlanks, 0]);
	Recipes.addShaped({id: 280, count: 4, data: 0}, [""," o "," o "], ['o', BlockID.rubberTreePlanks, 0]);
	Recipes.addShaped({id: 72, count: 1, data: 0}, ["","oo ",""], ['o', BlockID.rubberTreePlanks, 0]);
	Recipes.addShaped({id: 53, count: 4, data: 0}, ["","oo ",""], ['o', BlockID.rubberTreePlanks, 0]);
	Recipes.addShaped({id: 96, count: 2, data: 0}, ["","oo ","oo "], ['o', BlockID.rubberTreePlanks, 0]);
	
	Recipes.addShaped({id: 5, count: 3, data: 3}, ["x"], ['x', BlockID.rubberTreeLog, -1]);
});




var RubberTreeGenerationHelper = {
	
	generateCustomTree: function(x, y, z, params){
		var leaves = params.leaves;
		var log = params.log;
		
		var height = parseInt(Math.random() * (0.5 + params.height.max - params.height.min) + params.height.min);
		var resinHeight = -1;
		if(log.resin){
			resinHeight = parseInt(Math.random() * (height - 2)) + 1;
		}
		for(var ys = 0; ys < height; ys++){
			if(ys == resinHeight){
				World.setBlock(x, y + ys, z, log.resin, parseInt(Math.random()*4));
			}
			else{
				World.setFullBlock(x, y + ys, z, log);
			}
		}
		if(params.pike){
			for(var ys = 0; ys < params.pike; ys++){
				World.setFullBlock(x, y + ys + height, z, leaves);
			}
		}
		
		var leavesStart = params.height.start;
		var leavesEnd = height;
		var leavesMiddle = (leavesEnd + leavesStart) / 2;
		var leavesLen = leavesEnd - leavesStart;
		for(var ys = leavesStart; ys < leavesEnd; ys++){
			for(var xs = - params.radius; xs <= params.radius; xs++) {
				for(var zs = - params.radius; zs <= params.radius; zs++) {
					var d = Math.sqrt(xs * xs + zs * zs) + (Math.random() * 0.5 + 0.5) * Math.pow(Math.abs(leavesMiddle - ys) / leavesLen, 1.5) * 1.2;
					var blockID = World.getBlockID(x + xs, y + ys, z + zs);
					if(d <= params.radius + 0.5 && (blockID == 0 || blockID == 106)){
						World.setFullBlock(x + xs, y + ys, z + zs, leaves);
					}
				}
			}
		}
	},

	generateRubberTree: function(x, y, z, activateTileEntity){
		RubberTreeGenerationHelper.generateCustomTree(x, y, z, {
			log: {
				id: BlockID.rubberTreeLog,
				data: 0,
				resin: BlockID.rubberTreeLogLatex
			},
			leaves: {
				id: BlockID.rubberTreeLeaves,
				data: 0
			},
			height: {
				min: 5,
				max: 7,
				start: 2 + parseInt(Math.random() * 2)
			},
			pike: 2 + parseInt(Math.random() * 1.5),
			radius: 2
		});
		if(activateTileEntity){
			return World.addTileEntity(x, y, z);
		}
	}
}



//Translations

Translation.addTranslation("Rubber Tree Log", {ru: "Древесина гевеи"});
Translation.addTranslation("Rubber Tree Planks", {ru: "Доски гевеи"});
Translation.addTranslation("Rubber Tree Leaves", {ru: "Листва гевеи"});