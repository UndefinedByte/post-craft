var xRender = {
		setSaplingRender:function(id,x){
		Block.setBlockShape(id, {x: 0, y: 0, z: 0},{x: 1, y: 0.001, z: 1});
		BlockRenderer.addRenderCallback(id, function(api, coords,block) {
			if(x!=0) {
				for(var i = 0;i < 1/x;i+=x){
				api.renderBoxId(coords.x, coords.y, coords.z,0+i, 0.01, 0+i, x+i, 0.99, x+i,id, block.data);
				api.renderBoxId(coords.x, coords.y, coords.z,(1-x)-i, 0.01, 0+i,1-i, 0.99, x+i,id, block.data);
				}
			}
			else{
				api.renderBoxId(coords.x, coords.y, coords.z, 0.4999, 0.01, 0, 0.5, 0.99, 1,id, block.data);
				api.renderBoxId(coords.x, coords.y, coords.z, 0, 0.01, 0.4999, 1, 0.99, 0.5, id, block.data);
			}
		})
		BlockRenderer.enableCustomRender(id);
	}
};


var RUBBER_SAPLING_GROUND_TILES = {
	2: true,
	3: true,
	60: true
};

IDRegistry.genItemID("rubberSapling");
Item.createItem("rubberSapling", "Rubber Sapling", {name: "rubber_sapling", data: 0});

Translation.addTranslation("Rubber Sapling", {ru: "Саженец гевеи"});

IDRegistry.genBlockID("rubberTreeSapling"); 
Block.createBlock("rubberTreeSapling", [
	{name: "Rubber Tree Sapling", texture: [["rubber_sapling", 0]], inCreative: false}
]);

Translation.addTranslation("Rubber Tree Sapling", {ru: "Саженец гевеи"});
Block.setDestroyTime(BlockID.rubberTreeSapling, 0.1);
ToolAPI.registerBlockMaterial(BlockID.rubberTreeSapling, "plant");

Block.registerDropFunction("rubberTreeSapling", function(coords, blockID, blockData, level, enchant){
		return [[ItemID.rubberSapling, 1, 0]];
});

xRender.setSaplingRender(BlockID.rubberTreeSapling, 0);



Item.registerUseFunction("rubberSapling", function(coords, item, tile){
	var place = coords.relative;
	var tile1 = World.getBlock(place.x, place.y, place.z);
	var tile2 = World.getBlock(place.x, place.y - 1, place.z);
	
	if (GenerationUtils.isTransparentBlock(tile1.id) && RUBBER_SAPLING_GROUND_TILES[tile2.id]){
		World.setBlock(place.x, place.y, place.z, BlockID.rubberTreeSapling);
		World.addTileEntity(place.x, place.y, place.z);
		Player.setCarriedItem(item.id, item.count - 1, item.data);
	}
});



TileEntity.registerPrototype(BlockID.rubberTreeSapling, {
	click: function(id, count, data){
		if (id == 351 && data == 15){
			Player.setCarriedItem(id, count - 1, data);
			this.selfDestroy();
			RubberTreeGenerationHelper.generateRubberTree(this.x, this.y, this.z, true);
		}
	},
});

