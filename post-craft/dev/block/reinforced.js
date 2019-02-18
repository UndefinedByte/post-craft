Block.createSpecialType({
	base: 1,
	solid: true,
	destroytime: 5,
	explosionres: 30,
	opaque: false,
	lightopacity: 0,
	renderlayer: 3,
}, "reinforced_block");

Block.createSpecialType({
	base: 1,
	destroytime: 5,
	explosionres: 30,
	opaque: false,
	lightopacity: 0,
	renderlayer: 9,
}, "reinforced_glass");

IDRegistry.genBlockID("reinforcedStone");
Block.createBlock("reinforcedStone", [
	{name: "Reinforced Stone", texture: [["reinforced_stone", 0]], inCreative: true}
], "reinforced_block");
ToolAPI.registerBlockMaterial(BlockID.reinforcedStone, "stone", 2, true);
Block.setDestroyLevel("reinforcedStone", 2);


IDRegistry.genBlockID("reinforcedGlass");
Block.createBlock("reinforcedGlass", [
	{name: "Reinforced Glass", texture: [["reinforced_glass", 0]], inCreative: true}
], "reinforced_glass");
ToolAPI.registerBlockMaterial(BlockID.reinforcedGlass, "stone", 2, true);
Block.setDestroyLevel("reinforcedGlass", 2);





IDRegistry.genBlockID("reinforcedDoorBtm");
Block.createBlock("reinforcedDoorBtm", [
	{name: "tile.reinforcedDoorBtm.name", texture: [["alloy_door_bottom", 0]], inCreative: false},
	{name: "tile.reinforcedDoorBtm.name", texture: [["alloy_door_bottom", 0]], inCreative: false},
	{name: "tile.reinforcedDoorBtm.name", texture: [["alloy_door_bottom", 0]], inCreative: false},
	{name: "tile.reinforcedDoorBtm.name", texture: [["alloy_door_bottom", 0]], inCreative: false}
]);

Block.setBlockShape(BlockID.reinforcedDoorBtm, {x: 0, y: 0, z: 13/16}, {x: 1, y: 1, z: 1}, 0);
Block.setBlockShape(BlockID.reinforcedDoorBtm, {x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 3/16}, 1);
Block.setBlockShape(BlockID.reinforcedDoorBtm, {x: 13/16, y: 0, z: 0}, {x: 1, y: 1, z: 1}, 2);
Block.setBlockShape(BlockID.reinforcedDoorBtm, {x: 0, y: 0, z: 0}, {x: 3/16, y: 1, z: 1}, 3);


IDRegistry.genBlockID("reinforcedDoorTop");
Block.createBlock("reinforcedDoorTop", [
	{name: "tile.reinforcedDoorTop.name", texture: [["alloy_door_top", 0]], inCreative: false},
	{name: "tile.reinforcedDoorTop.name", texture: [["alloy_door_top", 0]], inCreative: false},
	{name: "tile.reinforcedDoorTop.name", texture: [["alloy_door_top", 0]], inCreative: false},
	{name: "tile.reinforcedDoorTop.name", texture: [["alloy_door_top", 0]], inCreative: false}
]);

Block.setBlockShape(BlockID.reinforcedDoorTop, {x: 0, y: 0, z: 13/16}, {x: 1, y: 1, z: 1}, 0);
Block.setBlockShape(BlockID.reinforcedDoorTop, {x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 3/16}, 1);
Block.setBlockShape(BlockID.reinforcedDoorTop, {x: 13/16, y: 0, z: 0}, {x: 1, y: 1, z: 1}, 2);
Block.setBlockShape(BlockID.reinforcedDoorTop, {x: 0, y: 0, z: 0}, {x: 3/16, y: 1, z: 1}, 3);



IDRegistry.genItemID("reinforcedDoorItem");
Item.createItem("reinforcedDoorItem", "Reinforced Door", {name: "reinforced_door", data: 0});

Translation.addTranslation("Reinforced door", {ru: "Укрепленная дверь"});


Block.registerDropFunction("reinforcedDoorBtm", function(coords, blockID, blockData, level, enchant){
	return [[ItemID.reinforcedDoorItem, 1, 0]];
});

Block.registerDropFunction("reinforcedDoorTop", function(coords, blockID, blockData, level, enchant){
	return [[ItemID.reinforcedDoorItem, 1, 0]];
});

Callback.addCallback("ItemUse",function(coords, item, block){
	if(item.id == ItemID.reinforcedDoorItem && coords.side == 1){
		World.setBlock(coords.x, coords.y + 1, coords.z, BlockID.reinforcedDoorBtm, 0);
		World.setBlock(coords.x, coords.y + 2, coords.z, BlockID.reinforcedDoorTop, 0);
	}
});
 

Callback.addCallback("DestroyBlock",function(coords, block, player){
	if(block.id == BlockID.reinforcedDoorBtm && World.getBlockID(coords.x, coords.y + 1, coords.z) == BlockID.reinforcedDoorTop){
		World.destroyBlock(coords.x, coords.y + 1, coords.z, 0);
	}
	
	if(block.id == BlockID.reinforcedDoorTop && World.getBlockID(coords.x, coords.y - 1, coords.z) == BlockID.reinforcedDoorBtm){
		World.destroyBlock(coords.x, coords.y - 1, coords.z, 0); 
	}
	
	if(World.getBlockID(coords.x, coords.y + 1, coords.z) == BlockID.reinforcedDoorBtm && World.getBlockID(coords.x, coords.y + 2, coords.z) == BlockID.reinforcedDoorTop){
		World.destroyBlock (coords.x, coords.y + 1, coords.z, 0); 
		World.destroyBlock (coords.x, coords.y + 2, coords.z, 0);
		World.drop(coords.x + 0.5, coords.y + 1, coords.z + 0.5, ItemID.reinforcedDoorItem, 1, 0);
	}
});
