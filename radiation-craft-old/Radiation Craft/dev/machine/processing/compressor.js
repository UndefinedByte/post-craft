/*IDRegistry.genBlockID("compressor");
Block.createBlockWithRotation("compressor", [
	{name: "Compressor", texture: [["machine_block", 0], ["machine_block", 0], ["machine_block", 0], ["compressor", 0], ["machine_block", 0], ["machine_block", 0]], inCreative: true}
], "opaque");

MachineRenderer.setStandartModel(BlockID.compressor, [["machine_block", 0], ["machine_block", 0], ["machine_block", 0], ["compressor", 0], ["machine_block", 0], ["machine_block", 0]], true);
MachineRenderer.registerRenderModel(BlockID.compressor, [["machine_block", 0], ["machine_block", 0], ["machine_block", 0], ["compressor", 1], ["machine_block", 0], ["machine_block", 0]], true);


var guiCompressor = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Compressor"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "bitmap", x: 530, y: 140, bitmap: "compressor_bar_background", scale: guiScale},
		{type: "bitmap", x: 440, y: 140, bitmap: "energy_small_background", scale: guiScale},
	],
	
	elements: {
		"progressScale": {type: "scale", x: 530, y: 140, direction: 0, bitmap: "compressor_bar_scale", scale: guiScale},
		"energyScale": {type: "scale", x: 440, y: 140, direction: 1, bitmap: "energy_small_scale", scale: guiScale},
		"slotSource": {type: "slot", x: 440, y: 75},
		"slotEnergy": {type: "slot", x: 440, y: 210, isValid: ChargeItemRegistry.isEnergyStorage},
		"slotResult": {type: "slot", x: 625, y: 140}
	}
});




Machine.registryPrototype(BlockID.compressor, {
	
	getGuiScreen: function(){
		return guiCompressor;
	},
	
	init: Machine.initModel,
	activate: Machine.activateMachine,
	deactivate: Machine.deactivateMachine,
	destroy: this.deactivate,
});


Callback.addCallback("PostLoaded", function(){
	//Recipes.addShaped({id: BlockID.compressor, count: 1, data: 0}, ["x x","x#x","xax"], ['#', BlockID.machineBlockBasic, 0, 'x', 1, 0, 'a', ItemID.circuitBasic, -1]);
});



//Translations


Translation.addTranslation("Compressor", {ru: "Компрессор"});*/