IDRegistry.genBlockID("generator");
Block.createBlockWithRotation("generator", [
	{name: "Generator", texture: [["generator_btm", 0], ["generator_top", 0], ["generator_back", 0], ["generator_front", 0], ["generator_side", 0], ["generator_side", 0]], inCreative: true}
]);


//Render

var generatorRender = new ICRender.Model();
BlockRenderer.setStaticICRender (BlockID.generator, -1, generatorRender);

var generatorModel = BlockRenderer.createModel();

generatorModel.addBox (1/16, 0, 1/16, 15/16, 1/16, 2/16, BlockID.generator, 0);
generatorModel.addBox (1/16, 0, 14/16, 15/16, 1/16, 15/16, BlockID.generator, 0);
generatorModel.addBox (0/16, 1/16, 1/16, 2/16, 2/16, 2/16, BlockID.generator, 0);
generatorModel.addBox (14/16, 1/16, 1/16, 16/16, 2/16, 2/16, BlockID.generator, 0);
generatorModel.addBox (0/16, 1/16, 14/16, 2/16, 2/16, 15/16, BlockID.generator, 0);
generatorModel.addBox (14/16, 1/16, 14/16, 16/16, 2/16, 15/16, BlockID.generator, 0);
generatorModel.addBox (0/16, 1/16, 1/16, 1/16, 15/16, 2/16, BlockID.generator, 0);
generatorModel.addBox (15/16, 1/16, 1/16, 16/16, 15/16, 2/16, BlockID.generator, 0);
generatorModel.addBox (0/16, 1/16, 14/16, 1/16, 15/16, 15/16, BlockID.generator, 0);
generatorModel.addBox (15/16, 1/16, 14/16, 16/16, 15/16, 15/16, BlockID.generator, 0);
generatorModel.addBox (0/16, 14/16, 1/16, 1/16, 15/16, 3/16, BlockID.generator, 0);
generatorModel.addBox (15/16, 14/16, 1/16, 16/16, 15/16, 3/16, BlockID.generator, 0);
generatorModel.addBox (0/16, 14/16, 13/16, 1/16, 15/16, 15/16, BlockID.generator, 0);
generatorModel.addBox (15/16, 14/16, 13/16, 16/16, 15/16, 15/16, BlockID.generator, 0);
generatorModel.addBox (0/16, 15/16, 2/16, 1/16, 16/16, 14/16, BlockID.generator, 0);
generatorModel.addBox (15/16, 15/16, 2/16, 16/16, 16/16, 14/16, BlockID.generator, 0);
generatorModel.addBox (2/16, 14/16, 3/16, 14/16, 15/16, 13/16, BlockID.generator, 0);
generatorModel.addBox (1/16, 9/16, 2/16, 15/16, 14/16, 14/16, BlockID.generator, 0);
generatorModel.addBox (1/16, 8/16, 2/16, 15/16, 9/16, 6/16, BlockID.generator, 0);
generatorModel.addBox (1/16, 8/16, 10/16, 15/16, 9/16, 14/16, BlockID.generator, 0);
generatorModel.addBox (1/16, 4/16, 2/16, 15/16, 8/16, 3/16, BlockID.generator, 0);
generatorModel.addBox (2/16, 8/16, 6/16, 14/16, 9/16, 10/16, BlockID.generator, 0);
generatorModel.addBox (2/16, 7/16, 5/16, 14/16, 8/16, 11/16, BlockID.generator, 0);
generatorModel.addBox (2/16, 3/16, 4/16, 14/16, 7/16, 12/16, BlockID.generator, 0);
generatorModel.addBox (2/16, 2/16, 5/16, 14/16, 3/16, 11/16, BlockID.generator, 0);
generatorModel.addBox (2/16, 1/16, 6/16, 14/16, 2/16, 10/16, BlockID.generator, 0);

generatorRender.addEntry(generatorModel);

Block.setBlockShape(BlockID.generator, {x: 0.0001, y: 0.0001, z: 0.0001}, {x: 0.9999, y: 0.9999, z: 0.9999});



var guiGenerator = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Generator"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "bitmap", x: 540, y: 135, bitmap: "energy_bar_background", scale: GUI_SCALE},
		{type: "bitmap", x: 445, y: 150, bitmap: "fire_background", scale: GUI_SCALE},
	],
	
	elements: {
		"energyScale": {type: "scale", x: 540 + GUI_SCALE * 4, y: 145, direction: 0, value: 0.5, bitmap: "energy_bar_scale", scale: GUI_SCALE},
		"burningScale": {type: "scale", x: 445, y: 150, direction: 1, value: 0.5, bitmap: "fire_scale", scale: GUI_SCALE},
		"slotEnergy": {type: "slot", x: 440, y: 75, isValid: function(id){return ChargeItemRegistry.isValidItem(id, "Eu", 0);}},
		"slotFuel": {type: "slot", x: 440, y: 210},
		"textInfo1": {type: "text", x: 565, y: 195, width: 300, height: 30, text: "0/10000"}
	}
});


Machine.registryPrototype(BlockID.generator, {
    defaultValues: {
		burn: 0,
		burnMax: 0,
		isActive: false
	},
    
	getGuiScreen: function(){
		return guiGenerator;
	},
	
	getTransportSlots: function(){
		return {input: ["slotFuel"]};
	},
	
	getFuel: function(slotName){
		var fuelSlot = this.container.getSlot(slotName);
		if (fuelSlot.id > 0){
			var burn = Recipes.getFuelBurnDuration(fuelSlot.id, fuelSlot.data);
			if (burn && !LiquidRegistry.getItemLiquid(fuelSlot.id, fuelSlot.data)){
				fuelSlot.count--;
				this.container.validateSlot(slotName);
				this.activate();
				return burn;
			}
		}
		this.deactivate();
		return 0;
	},
	
	tick: function(){
		var energyStorage = this.getEnergyStorage();
		
		if(this.data.burn <= 0){
			this.data.burn = this.data.burnMax = this.getFuel("slotFuel") / 4;
		}
		if(this.data.burn > 0 && this.data.energy < energyStorage){
			this.data.energy = Math.min(this.data.energy + 10, energyStorage);
			this.data.burn--;
		}
		
		this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slotEnergy"), "Eu", this.data.energy, 64, 0);
		
		this.container.setScale("burningScale", this.data.burn / this.data.burnMax || 0);
		this.container.setScale("energyScale", this.data.energy / energyStorage);
		this.container.setText("textInfo1", this.data.energy + "/" + energyStorage);
	},
	
	isGenerator: function() {
		return true;
	},
	
	getEnergyStorage: function(){
		return 10000;
	},
	
	energyTick: function(type, src){
		var output = Math.min(32, this.data.energy);
		this.data.energy += src.add(output) - output;
	},
	
	init: Machine.initModel,
	activate: Machine.activateMachine,
	deactivate: Machine.deactivateMachine,
	destroy: this.deactivate,
});