
IDRegistry.genBlockID("toaster"); 
Block.createBlockWithRotation("toaster", [
	{name: "Toaster", texture: [["toaster_side", 0], ["toaster_top", 0], ["toaster_side", 0], ["toaster_side", 0], ["toaster_side", 0], ["toaster_side", 0]], inCreative: true}
], "opaque");

Translation.addTranslation("Toaster", {ru: "Тостер"});



Callback.addCallback("ItemUse", function(coords, item, block){
	if(block.id == BlockID.toaster){
		World.drop(coords.x + 0.5, coords.y + 1, coords.z + 0.5, 297, 2, 0);
}}); 



Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.toaster, count: 1, data: 0}, ["iii","iri","iii"], ['r', 61, 0, 'i', 265, 0]);
});