IDRegistry.genBlockID("coalGenerator");
Block.createBlockWithRotation("coalGenerator", [
	{name: "Coal Generator", texture: [["machine", 0], ["machine", 0], ["machine", 0], ["coal_generator", 0], ["machine", 0], ["machine", 0]], inCreative: true}
]);

var guiCoalGenerator = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Coal Generator"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "bitmap", x: 540, y: 135, bitmap: "energy_bar_background", scale: GUI_SCALE},
		{type: "bitmap", x: 445, y: 150, bitmap: "fire_background", scale: GUI_SCALE},
	],
	
	elements: {
		"energyScale": {type: "scale", x: 540 + GUI_SCALE * 4, y: 146, direction: 0, value: 0.5, bitmap: "energy_bar_scale", scale: GUI_SCALE},
		"burningScale": {type: "scale", x: 445, y: 150, direction: 1, value: 0.5, bitmap: "fire_scale", scale: GUI_SCALE},
		"slotEnergy": {type: "slot", x: 440, y: 75, isValid: function(id){return ChargeItemRegistry.isValidItem(id, "Eu", 0);}},
		"slotFuel": {type: "slot", x: 440, y: 210},
		"textInfo1": {type: "text", x: 580, y: 195, width: 300, height: 30, text: "0/5000"}
	}
});


Machine.registryPrototype(BlockID.coalGenerator, {
    defaultValues: {
		burn: 0,
		burnMax: 0,
		isActive: false
	},
    
	getGuiScreen: function(){
		return guiCoalGenerator;
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
			this.data.energy = Math.min(this.data.energy + 2, energyStorage);
			this.data.burn--;
		}
		
		this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slotEnergy"), "Eu", this.data.energy, 32, 0);
		
		this.container.setScale("burningScale", this.data.burn / this.data.burnMax || 0);
		this.container.setScale("energyScale", this.data.energy / energyStorage);
		this.container.setText("textInfo1", this.data.energy + "/" + energyStorage);
	},
	
	isGenerator: function() {
		return true;
	},
	
	getEnergyStorage: function(){
		return 5000;
	},
	
	energyTick: function(type, src){
		var output = Math.min(16, this.data.energy);
		this.data.energy += src.add(output) - output;
	},
	
	init: Machine.initModel,
	activate: Machine.activateMachine,
	deactivate: Machine.deactivateMachine,
	destroy: this.deactivate,
});