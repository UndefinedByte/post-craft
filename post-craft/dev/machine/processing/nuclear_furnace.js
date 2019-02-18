IDRegistry.genBlockID("nuclearFurnace"); 
Block.createBlockWithRotation("nuclearFurnace", [
	{name: "Nuclear Furnace", texture: [["nuclear_furnace_side", 0], ["nuclear_bomb", 0], ["nuclear_furnace_side", 0], ["nuclear_furnace_front", 0], ["nuclear_furnace_side", 0], ["nuclear_furnace_side", 0]], inCreative: true}
], "opaque");

/*
MachineRenderer.setStandartModel(BlockID.nuclearFurnace, [["nuclear_furnace_side", 0], ["nuclear_bomb", 0], ["nuclear_furnace_side", 0], ["nuclear_furnace_front", 0], ["nuclear_furnace_side", 0], ["nuclear_furnace_side", 0]], true);
MachineRenderer.registerRenderModel(BlockID.nuclearFurnace, [["nuclear_furnace_side", 0], ["nuclear_bomb", 0], ["nuclear_furnace_side", 0], ["nuclear_furnace_front", 1], ["nuclear_furnace_side", 0], ["nuclear_furnace_side", 0]], true);



let FURNACE_FUEL_MAP = {}

FURNACE_FUEL_MAP[ItemID.uranium] = 3880;
FURNACE_FUEL_MAP[BlockID.blockUranium] = 34600;
FURNACE_FUEL_MAP[BlockID.oreUranium] = 980;
*/
var guiNuclearFurnace = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Nuclear Furnace"}},
		inventory: {standart: true},
		background: {bitmap: "nf_background"}
	},
	
	drawing: [
		{type: "bitmap", x: 530, y: 146, bitmap: "arrow_bar_background", scale: GUI_SCALE},
		{type: "bitmap", x: 450, y: 150, bitmap: "fire_background", scale: GUI_SCALE}
	],
	
	elements: {
		"progressScale": {type: "scale", x: 530, y: 146, direction: 0,  bitmap: "arrow_bar_scale", scale: GUI_SCALE},
		"burningScale": {type: "scale", x: 450, y: 150, direction: 1, bitmap: "nf_fire_scale", scale: GUI_SCALE},
		"slotSource": {type: "slot", x: 441, y: 75},
		"slotFuel": {type: "slot", x: 441, y: 212},
		"slotResult": {type: "slot", x: 630, y: 142},
	}
});


TileEntity.registerPrototype(BlockID.nuclearFurnace, {
/*	
	defaultValues: {
		progress: 0,
		burn: 0,
		burnMax: 0,
		isActive: false
	},
	*/
	getGuiScreen: function(){
		return guiNuclearFurnace;
	},
/*
	tick:function(){
		var sourceSlot = this.container.getSlot("slotSource");
		var resultSlot = this.container.getSlot("slotResult");
		var result = Recipes.getFurnaceRecipeResult(sourceSlot.id, "iron");
	
		if(result && this.data.burn > 0){
			if((resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count < 64 || resultSlot.id == 0) && this.data.progress++ >= 60){
				sourceSlot.count--;
				resultSlot.id = result.id;
				resultSlot.data = result.data;
				resultSlot.count++;
				this.container.validateAll();
				this.data.progress = 0;
			}
		}
		else {
			this.data.progress = 0;
		}

		if(this.data.burn > 0){
			this.data.burn--;
			this.activate();
		}
		else if(result){
			this.data.burn = this.data.burnMax = this.getFuel("slotFuel");
			this.deactivate();
		}

		this.container.setScale("burningScale", this.data.burn / this.data.burnMax || 0);
		this.container.setScale("progressScale", this.data.progress / 60);
	},

	getFuel: function(slotName){
		var fuelSlot = this.container.getSlot(slotName);
		if(fuelSlot.id > 0){
			var burn = FURNACE_FUEL_MAP[fuelSlot.id];
			if(burn){
				fuelSlot.count--;
				this.container.validateSlot(slotName);
				return burn;
			}
				
			if(LiquidRegistry.getItemLiquid(fuelSlot.id, fuelSlot.data) == "lava"){
				var empty = LiquidRegistry.getEmptyItem(fuelSlot.id, fuelSlot.data);
				fuelSlot.id = empty.id;
				fuelSlot.data = empty.data;
				return 20000;
			}
		}
		return 0;
	},
	
	init: Machine.initModel,
	activate: Machine.activateMachine,
	deactivate: Machine.deactivateMachine,
	destroy: this.deactivate,*/
});