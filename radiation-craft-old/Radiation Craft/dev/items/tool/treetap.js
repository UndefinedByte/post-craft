
IDRegistry.genItemID("treetap");
Item.createItem("treetap", "Treetap", {name: "treetap", data: 0},{stack: 1});


Item.registerUseFunction("treetap", function(coords, item, block){
	if(block.id == BlockID.rubberTreeLogLatex && block.data == coords.side - 2){
		World.setBlock(coords.x, coords.y, coords.z, BlockID.rubberTreeLog);
		Player.setCarriedItem(item.id, ++item.data < 17 ? item.count : 0, item.data);
		Entity.setVelocity(
			World.drop(
				coords.relative.x + 0.5,
				coords.relative.y + 0.5,
				coords.relative.z + 0.5,
				ItemID.latex, 1 + parseInt(Math.random() * 5), 0
			),
			(coords.relative.x - coords.x) * 0.25,
			(coords.relative.y - coords.y) * 0.25,
			(coords.relative.z - coords.z) * 0.25
		);
	}
});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: ItemID.treetap, count: 1, data: 0}, ["qoq","ooo","oqq"], ['o', 5, 0]);
});

//Translations

Translation.addTranslation("Treetap", {ru: "Краник"});