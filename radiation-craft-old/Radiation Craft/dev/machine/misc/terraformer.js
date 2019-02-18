/*
IDRegistry.genBlockID("terraformer"); 
Block.createBlock("terraformer", [
	{name: "Terraformer", texture: [["machine_block", 0], ["terraformer_top", 0], ["terraformer_side", 0]], inCreative: true}
], "opaque");


ToolAPI.registerBlockMaterial(BlockID.terraformer, "stone", 2, true);
Block.setDestroyTime(BlockID.terraformer, 3);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.terraformer, count: 1, data: 0}, ["isi","sns","isi"], ['i', 295, 0, 's', ItemID.plateSteel, 0, 'n', 3, 0]);
});

//Translations

Translation.addTranslation("Terraformer", {ru: "Терраформер"});
*/