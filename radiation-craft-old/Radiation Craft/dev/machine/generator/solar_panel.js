IDRegistry.genBlockID("solarPanel");
Block.createBlock("solarPanel", [
	{name: "Solar Panel", texture: [["machine_block", 0], ["solar_panel", 0], ["machine_block", 0], ["machine_block", 0], ["machine_block", 0], ["machine_block", 0]], inCreative: true}
], "opaque");



var guiSolar = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Solar Panel"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "background", color: android.graphics.Color.rgb(179, 179, 179)},
	],
	
	elements: {
		"slotEnergy": {type: "slot", x: 600, y: 130, isValid: function(id){return ChargeItemRegistry.isValidItem(id, "RE", 0);}},
		"sun": {type: "image", x: 610, y: 195, bitmap: "sun_off", scale: guiScale}
	}
});

Machine.registryPrototype(BlockID.solarPanel, {
	isGenerator: function() {
		return true;
	},
	
	getGuiScreen: function(){
		return guiSolar;
	},
	
	tick: function(){
		var content = this.container.getGuiContent();
		if(World.getBlockID(this.x, this.y + 1, this.z) != BlockID.luminator && World.getLightLevel(this.x, this.y + 1, this.z) == 15){
			this.data.energy = 1;
			this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slotEnergy"), "RE", 1, 32, 0);
			if(content){ 
				content.elements["sun"].bitmap = "sun_on";
			}
		}
		else if(content){ 
			content.elements["sun"].bitmap = "sun_off";
		}
	},
	
	getEnergyStorage: function(){
		return 1;
	},
	
	energyTick: function(type, src){
		if(this.data.energy){
			src.add(1);
			this.data.energy = 0;
		}
	}
});



//Translations

Translation.addTranslation("Solar Panel", {ru: "Солнечная панель"});
