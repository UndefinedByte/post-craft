var BLOCK_TYPE_LIQUID = Block.createSpecialType({
    //base: 90,
    rendertype: 0,
    renderlayer: 3,
    explosionres: 9999
});

IDRegistry.genBlockID("oil"); 
Block.createBlock("oil", [
	{name: "Oil", texture: [["oil_still", 0]], inCreative: true}
, BLOCK_TYPE_LIQUID]);

Block.setBlockShape(BlockID.oil, {x: 0, y: 0, z: 0}, {x: 1, y: 14/16, z: 1});



IDRegistry.genItemID("oilBucket");
Item.createItem("oilBucket", "Oil Bucket", { name: "bucket_oil", data: 0 },{ stack: 1 });

Callback.addCallback("ItemUse", function (coords, item, block) {
	if(block.id == BlockID.oil && item.id == 325){
		World.setBlock(coords.x, coords.y + 1, coords.z, 0, 0);
		Player.setCarriedItem(325, -1, 0);
		Player.addItemToInventory(ItemID.oilBucket, 1, 0);
	}
	
	if(item.id == ItemID.oilBucket && block.id != BlockID.oil){
		World.setBlock(coords.x, coords.y + 1, coords.z, BlockID.oil, 0);
		Player.setCarriedItem(ItemID.oilBucket, -1, 0);
		Player.addItemToInventory(325, 1, 0);
	}
});




IDRegistry.genBlockID("fluidStill"); 
Block.createBlock("fluidStill", [
	{name: "block.fluid.name", texture: [["fluid_still", 0]], inCreative: true}
, BLOCK_TYPE_LIQUID]);

Block.setBlockShape(BlockID.fluidStill, {x: 0, y: 0, z: 0}, {x: 1, y: 14/16, z: 1});