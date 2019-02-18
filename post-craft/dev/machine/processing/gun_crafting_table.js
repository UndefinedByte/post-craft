IDRegistry.genBlockID("gunCraftingTable"); 
Block.createBlockWithRotation("gunCraftingTable", [
	{name: "Gun Crafting Table", texture: [["machine", 0], ["guntable_top", 0], ["guntable_side", 0], ["guntable_side", 0], ["guntable_side", 0], ["guntable_side", 0]], inCreative: true}
], "opaque");



var guiGunCraftingTable = new UI.StandartWindow({
	standart: {
		header: { text: { text: "Gun Crafting Table"}},
		inventory: {standart: true},
		background: {standart: true}
	},

	drawing: [
		{type: "bitmap", x: 630, y: 90, bitmap: "energy_small_background", scale: GUI_SCALE},
		{type: "bitmap", bitmap: "arrow_bar_background", x: 615, y: 155, scale: GUI_SCALE}
	],

	elements: {
		"energyScale": {type: "scale", x: 630, y: 90, direction: 1, value: 0, bitmap: "energy_small_scale", scale: GUI_SCALE},
		"progressScale": {type: "scale", x: 615, y: 155, direction: 0, value: 0, bitmap: "arrow_bar_scale", scale: GUI_SCALE},
		"input": {type: "slot", x: 375, y: 115, size: 70},
		"input1": {type: "slot", x: 450, y: 115, size: 70},
		"input2": {type: "slot", x: 525, y: 115, size: 70},
		"input3": {type: "slot", x: 410, y: 190, size: 70},
		"input4": {type: "slot", x: 485, y: 190, size: 70},
		"output": {type: "slot", x: 710, y: 140, size: 90},
		"output0": {type: "slot", x: 800, y: 140, size: 90}
	}
});



var RecipeRegistry = {
recipes: {},

add: function(obj){
	this.recipes[obj.slot1 + ":" + obj.slot2 + ":" + obj.slot3 + ":" + obj.slot4 + ":" + obj.slot5] = obj;
},

get: function(slot1, slot2, slot3, slot4, slot5){
	return this.recipes[slot1 + ":" + slot2 + ":" + slot3 + ":" + slot4 + ":" + slot5];
}

};

//Recipes

RecipeRegistry.add({
	slot1: ItemID.smallStock,
	slot2: ItemID.mediumBody,
	slot3: ItemID.mediumBarrel, //AKS74-U
	slot4: ItemID.mediumHandle,
	slot5: 289,
	outputID: [ItemID.aks74u, ItemID.ammoAKS74U]
});


RecipeRegistry.add({
	slot1: ItemID.refinedIron,
	slot2: ItemID.smallBody,
	slot3: ItemID.smallBarrel, //Makarov
	slot4: ItemID.smallHandle,
	slot5: 289,
	outputID: [ItemID.makarov, ItemID.ammoMakarov]
});


Machine.registryPrototype(BlockID.gunCraftingTable, {
	getGuiScreen: function(){
		return guiGunCraftingTable;
	},

PROGRESS_MAX: 100,

defaultValues: {
	progress: 200,
	output: 0,
	output0: 0,
},

tick: function () {

if(this.data.progress){
	if(this.data.progress >= this.PROGRESS_MAX){
		var slotOutput = this.container.getSlot("output");
		var slotOutput1 = this.container.getSlot("output0");
	if(!slotOutput.id || (slotOutput.id == this.data.output && slotOutput.count < Item.getMaxStack(slotOutput.id))){
		if(!slotOutput1.id || (slotOutput1.id == this.data.output0 && slotOutput1.count < Item.getMaxStack(slotOutput1.id))){
			slotOutput1.id = this.data.output0;
			slotOutput1.count += 1;

			slotOutput.id = this.data.output;
			slotOutput.count += 1;
			this.data.progress = 0;
	}}
	}else{
		this.data.progress++;
	}
	}else{
		
var slot1 = this.container.getSlot("input");
var slot2 = this.container.getSlot("input1");
var slot3 = this.container.getSlot("input2");
var slot4 = this.container.getSlot("input3");
var slot5 = this.container.getSlot("input4");

var recipe = RecipeRegistry.get(slot1.id, slot2.id, slot3.id, slot4.id, slot5.id);

if(recipe) {
	
	this.data.output = recipe.outputID[0];
	this.data.output0 = recipe.outputID[1];
	this.data.progress = 1;

if(slot1.id)
	slot1.count -= 1;

if(slot2.id)
	slot2.count -= 1;

if(slot3.id)
	slot3.count -= 1;

if(slot4.id)
	slot4.count -= 1;

if(slot5.id)
	slot5.count -= 1;

this.container.validateAll();
}}

this.container.setScale("progressScale", this.data.progress / this.PROGRESS_MAX);
}});