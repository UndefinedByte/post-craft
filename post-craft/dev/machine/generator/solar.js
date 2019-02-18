IDRegistry.genBlockID("solarPanel");
Block.createBlock("solarPanel", [
	{
		name: "Solar Panel", 
		texture: [["machine", 0], ["solar_panel", 0], ["machine", 0], ["machine", 0], ["machine", 0], ["machine", 0]], 
		inCreative: true
	}
], "opaque");


var guiSolarPanel = new UI.StandartWindow({
	standart: {
		header: {
			text: {
				text: "Solar Panel"
			}
		},
		inventory: {
			standart: true
		},
		background: {
			standart: true
		}
	},
	
	elements: {
		"slotEnergy": {
			type: "slot", 
			x: 600, 
			y: 130, 
			isValid: function(id){
				return ChargeItemRegistry.isValidItem(id, "Eu", 0);
			}
		},
		"sun": {
			type: "image", 
			x: 607, 
			y: 195, 
			bitmap: "sun_off", 
			scale: 2.7
		}
	}
});

Machine.registryPrototype(BlockID.solarPanel, {
	isGenerator: function() {
		return true;
	},
	
	getGuiScreen: function(){
		return guiSolarPanel;
	},
	
	tick: function(){
		var content = this.container.getGuiContent();
		if(World.getBlockID(this.x, this.y + 1, this.z) != BlockID.luminator && World.getLightLevel(this.x, this.y + 1, this.z) == 15){
			this.data.energy = 1;
			this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slotEnergy"), "Eu", 1, 32, 0);
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