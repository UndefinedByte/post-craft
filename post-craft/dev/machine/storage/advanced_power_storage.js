IDRegistry.genBlockID("advPowerStorage");
Block.createBlockWithRotation("advPowerStorage", [
	{name: "Advanced Power Storage (APS)", texture: [["ps_bottom", 0], ["aps_top", 0], ["aps_side", 0], ["aps_side", 0], ["aps_side", 0], ["aps_side", 0]], inCreative: true}
], "opaque");

Item.registerNameOverrideFunction(BlockID.advPowerStorage, function(item, name){
	item = Player.getCarriedItem();
	if(item.extra){
		var energyStored = item.extra.getInt("Eu");
		return name + "\n§7" + energyStored + "/" + 1000000 + " Eu";
	}
	return name;
});

var guiAdvancedPowerStorage = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Advanced Power Storage"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "bitmap", x: 540, y: 135, bitmap: "energy_bar_background", scale: GUI_SCALE},
	],
	
	elements: {
		"energyScale": {type: "scale", x: 540 + GUI_SCALE * 4, y: 146, direction: 0, value: 0.5, bitmap: "energy_bar_scale", scale: GUI_SCALE},
		"slot1": {type: "slot", x: 440, y: 75, isValid: Machine.isValidEUItem},
		"slot2": {type: "slot", x: 440, y: 210, isValid: Machine.isValidEUStorage},
		"textInfo1": {type: "text", x: 540, y: 195, width: 300, height: 30, text: "0/1000000"}	
	}
});




Machine.registryPrototype(BlockID.advPowerStorage, {
	
	isStorage: true,
	
	getGuiScreen: function(){
		return guiAdvancedPowerStorage;
	},
	
	tick: function(){
		var energyStorage = this.getEnergyStorage();
		this.container.setScale("energyScale", this.data.energy / energyStorage);
		this.container.setText("textInfo1", parseInt(this.data.energy) + "/" + energyStorage);
		
		var TRANSFER = transferByTier[1];
		this.data.energy += ChargeItemRegistry.getEnergyFrom(this.container.getSlot("slot2"), "Eu", energyStorage - this.data.energy, TRANSFER, 3);
		this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slot1"), "Eu", this.data.energy, TRANSFER, 3);
	},
	
	getEnergyStorage: function(){
		return 1000000;
	},
	
	energyTick: function(type, src){
		var TRANSFER = 1024;
		this.data.energy += src.storage(Math.min(TRANSFER*4, this.getEnergyStorage() - this.data.energy), Math.min(TRANSFER, this.data.energy));
	},
});