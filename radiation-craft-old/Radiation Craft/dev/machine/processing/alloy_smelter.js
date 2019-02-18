/*IDRegistry.genBlockID("alloySmelter"); 
Block.createBlockWithRotation("alloySmelter", [
	{name: "Alloy Smelter", texture: [["alloy_smelter_side", 0], ["alloy_smelter_side",0], ["alloy_smelter_side", 0], ["alloy_smelter", 0], ["alloy_smelter_side", 0], ["alloy_smelter_side", 0]], inCreative: true}
], "opaque");



MachineRenderer.setStandartModel(BlockID.alloySmelter, [["alloy_smelter_side", 0], ["alloy_smelter_side", 0], ["alloy_smelter_side", 0], ["alloy_smelter", 0], ["alloy_smelter_side", 0], ["alloy_smelter_side", 0]], true);
MachineRenderer.registerRenderModel(BlockID.alloySmelter, [["alloy_smelter_side", 0], ["nuclear_bomb", 0], ["alloy_smelter_side", 0], ["alloy_smelter", 1], ["alloy_smelter_side", 0], ["alloy_smelter_side", 0]], true);


var guiAlloySmelter = new UI.StandartWindow({
	standart: {
		header: { text: { text: "Alloy Smelter" }},
		inventory: { standart: true },
		background: {standart: true }
	},

	drawing: [
		{type: "bitmap", bitmap: "fire_scale", x: 700, y: 250, scale: guiScale},
		{type: "bitmap", bitmap: "fire_scale", x: 510, y: 250, scale: guiScale},
		{type: "bitmap", bitmap: "2in1_down", x: 590, y: 200, scale: guiScale}
	],

	elements: {
		"input": {type: "slot", x: 700, y: 280, size: 60}, 
		"input": {type: "slot", x: 590, y: 85, size: 60}, 
		"input0": {type: "slot", x: 690, y: 180, size: 60}, 
		"input1": {type: "slot", x: 500, y: 180, size: 60}
	}
});


TileEntity.registerPrototype(BlockID.alloySmelter, {
	
	getGuiScreen: function(){
		return guiAlloySmelter;
	}
});



//Callback.addCallback("DestroyBlockStart", function(coords, block){
	//var item = Player.getCarriedItem();
	
	//if(block.id == BlockID.alloySmelter&&item.id == ItemID.wrench){
	//	Block.setTempDestroyTime(BlockID.alloySmelter, 0);
	//	Player.setCarriedItem(item.id, item.count, item.data - 1);
	//	//if(__config__.getBool("sounds"))
	//	sndWrench.playSound();
//}});


Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.alloySmelter, count: 1, data: 0}, ["ooo","oco","ooo"], ['o',351, 14,'c', 61,0]);
});

Translations

Translation.addTranslation("Alloy Smelter", {ru: "Плавильный цех"}); 
*/