IDRegistry.genBlockID("woodenCrate"); 
Block.createBlock("woodenCrate", [
	{name: "Wooden Crate", texture: [["crate", 0]], inCreative: true}
, "opaque"]);

Translation.addTranslation("Wooden Crate", {ru: "Деревянный ящик"});
Block.setDestroyTime(BlockID.crate, 2);
ToolAPI.registerBlockMaterial(BlockID.crate, "wood");

Recipes.addFurnaceFuel(BlockID.woodenCrate, 0, 280);


var guiWoodenCrate = new UI.StandartWindow({
	standart: {
		header: { text: { text: "Crate"}},
		inventory: {standart: true},
		background: {standart: true}
	},

	elements: {
		"produce0": {type: "slot", x: 370, y: 50, size: 60},
		"produce1": {type: "slot", x: 430, y: 50, size: 60},
		"produce2": {type: "slot", x: 490, y: 50, size: 60},
		"produce3": {type: "slot", x: 550, y: 50, size: 60},
		"produce4": {type: "slot", x: 610, y: 50, size: 60},
		"produce5": {type: "slot", x: 670, y: 50, size: 60},
		"produce6": {type: "slot", x: 730, y: 50, size: 60},
		"produce7": {type: "slot", x: 790, y: 50, size: 60},
		"produce8": {type: "slot", x: 850, y: 50, size: 60},

		"produce9": {type: "slot", x: 370, y: 110, size: 60},
		"produce10": {type: "slot", x: 430, y: 110, size: 60},
		"produce12": {type: "slot", x: 490, y: 110, size: 60},
		"produce13": {type: "slot", x: 550, y: 110, size: 60},
		"produce14": {type: "slot", x: 610, y: 110, size: 60},
		"produce15": {type: "slot", x: 670, y: 110, size: 60},
		"produce16": {type: "slot", x: 730, y: 110, size: 60},
		"produce17": {type: "slot", x: 790, y: 110, size: 60},
		"produce18": {type: "slot", x: 850, y: 110, size: 60},

		"produce19": {type: "slot", x: 370, y: 170, size: 60},
		"produce20": {type: "slot", x: 430, y: 170, size: 60},
		"produce21": {type: "slot", x: 490, y: 170, size: 60},
		"produce22": {type: "slot", x: 550, y: 170, size: 60},
		"produce23": {type: "slot", x: 610, y: 170, size: 60},
		"produce24": {type: "slot", x: 670, y: 170, size: 60},
		"produce25": {type: "slot", x: 730, y: 170, size: 60},
		"produce26": {type: "slot", x: 790, y: 170, size: 60},
		"produce27": {type: "slot", x: 850, y: 170, size: 60}
	}
});	

TileEntity.registerPrototype(BlockID.woodenCrate,{
	
	getGuiScreen:function(){
		return guiWoodenCrate;
	}
});
