/*
IDRegistry.genItemID("fragmentGrenade");
IDRegistry.genItemID("noisyGrenade");
IDRegistry.genItemID("tearGas");
IDRegistry.genItemID("c4");

Item.createItem("fragmentGrenade", "Fragment grenade", {name: "fragment_grenade", data: 0},{stack: 16});
Item.createItem("noisyGrenade", "Noisy grenade", {name: "noisy_grenade", data: 0},{stack: 16});
Item.createItem("tearGas", "Tear gas", {name: "tear_gas", data: 0},{stack: 16});
Item.createItem("c4", "C4", {name: "item_C4", data: 0},{stack: 16});



IDRegistry.genBlockID("с4Block");
Block.createBlock("с4Block", [
	{name: "tile.с4.name", texture: [["c4", 0]], inCreative: false}
]);

var render = new ICRender.Model();
BlockRenderer.setStaticICRender(BlockID.с4Block, 0, render);

var model = BlockRenderer.createModel();

model.addBox(0/16, 0/16, 0/16, 16/16, 1/16, 16/16, BlockID.с4Block, 0);
render.addEntry(model);

Block.setBlockShape(BlockID.с4Block, {x: 0, y: 0, z: 0}, {x: 0.1, y: 0.1, z: 0.1});



Item.registerUseFunction("c4", function(coords, item, block){
	var place = coords.relative;
	if(GenerationUtils.isTransparentBlock(World.getBlockID(place.x, place.y, place.z))){
		World.setBlock(place.x, place.y, place.z, BlockID.с4Block);
		Player.setCarriedItem(item.id, item.count - 1, item.data);
	}
});


Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: ItemID.fragmentGrenade, count: 4, data: 0}, ["oqo","ooo","qoq"], ['o', 265, 0]);
	Recipes.addShaped({id: ItemID.noisyGrenade, count: 4, data: 0}, ["oqo","ooo","qoq"], ['o', 265, 0]);
	Recipes.addShaped({id: ItemID.tearGas, count: 4, data: 0}, ["oqo","ooo","qoq"], ['o', 265, 0]);
	Recipes.addShaped({id: ItemID.c4, count: 1, data: 0}, ["oqo","ooo","qoq"], ['o', 265, 0]);
});


Translation.addTranslation("Noisy grenade", {ru: "Светошумовая граната"});
Translation.addTranslation("Fragment grenade", {ru: "Осколочная граната"});
Translation.addTranslation("Tear gas", {ru: "Слезоточивый газ"});
Translation.addTranslation("C4", {ru: "C4"});
*/