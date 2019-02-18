IDRegistry.genBlockID("advPowerStorage");
Block.createBlockWithRotation("advPowerStorage", [
	{name: "Advanced Power Storage (APS)", texture: [["ps_bottom", 0], ["aps_top", 0], ["aps_side", 0], ["aps_side", 0], ["aps_side", 0], ["aps_side", 0]], inCreative: true}
], "opaque");


var guiAdvCapacitor = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Advanced Power Storage"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "bitmap", x: 530, y: 145, bitmap: "energy_bar_background", scale: guiScale},
	],
	
	elements: {
		"energyScale": {type: "scale", x: 530 + guiScale * 4, y: 145, direction: 0, bitmap: "energy_bar_scale", scale: guiScale},
		"slot1": {type: "slot", x: 440, y: 75},
		"slot2": {type: "slot", x: 440, y: 210},
		"textInfo1": {type: "text", x: 650, y: 120, width: 350, height: 30, text: "0/"},
		"textInfo2": {type: "text", x: 650, y: 150, width: 350, height: 30, text: "100000000"}
	}
});




Machine.registryPrototype(BlockID.advPowerStorage, {
	isStorage: true,
	
	getGuiScreen: function(){
		return guiAdvCapacitor;
	},
	
	tick: function(){
		var energyStorage = this.getEnergyStorage();
		this.container.setScale("energyScale", this.data.energy / energyStorage);
		this.container.setText("textInfo1", parseInt(this.data.energy) + "/");
		this.container.setText("textInfo2", energyStorage + "");
		
		var TRANSFER = 128;
		this.data.energy += ChargeItemRegistry.getEnergyFrom(this.container.getSlot("slot2"), Math.min(TRANSFER, energyStorage - this.data.energy), 3);
		this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slot1"), this.data.energy, TRANSFER, 3);
	},
	
	getEnergyStorage: function(){
		return 100000000;
	},
	
	energyTick: function(type, src){
		var TRANSFER = 64;
		this.data.energy += src.storage(Math.min(TRANSFER*4, this.getEnergyStorage() - this.data.energy), Math.min(TRANSFER, this.data.energy));
	}
});


//Translations

Translation.addTranslation("Advanced Power Storage (APS)", {ru: "Продвинутое энергохранилище (ПЭХ)"});