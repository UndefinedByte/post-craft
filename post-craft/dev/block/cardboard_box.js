var BLOCK_TYPE_PAPER = Block.createSpecialType({
	base: 18,
	destroytime: 0.5,
});

IDRegistry.genBlockID("cardboardBox"); 
Block.createBlock("cardboardBox", [
	{name: "Cardboard Box", texture: [["cardboard_box", 0], ["cardboard_box", 1], ["cardboard_box_sides", 1], ["cardboard_box_sides", 1], ["cardboard_box_sides", 0], ["cardboard_box_sides", 0]], inCreative: true}
, BLOCK_TYPE_PAPER]);


Translation.addTranslation("Cardboard Box", {ru: "Картонная коробка"});
Block.setDestroyTime(BlockID.cardboardBox, 0);
ToolAPI.registerBlockMaterial(BlockID.cardboardBox, "wood");

var guiCardboardBox = new UI.StandartWindow({
	standart: {
		header: { text: { text: "Cardboard Box"}},
		inventory: {standart: true},
		background: {standart: true}
	},

	elements: {
		"produce0": {type: "slot", x: 370, y: 50, size: 60},
		"produce1": {type: "slot", x: 430, y: 50, size: 60},
		"produce2": {type: "slot", x: 490, y: 50, size: 60},
		"produce3": {type: "slot", x: 550, y: 50, size: 60},

		"produce4": {type: "slot", x: 370, y: 110, size: 60},
		"produce5": {type: "slot", x: 430, y: 110, size: 60},
		"produce6": {type: "slot", x: 490, y: 110, size: 60},
		"produce7": {type: "slot", x: 550, y: 110, size: 60},

		"produce8": {type: "slot", x: 370, y: 170, size: 60},
		"produce9": {type: "slot", x: 430, y: 170, size: 60},
		"produce10": {type: "slot", x: 490, y: 170, size: 60},
		"produce11": {type: "slot", x: 550, y: 170, size: 60},
		
		"produce12": {type: "slot", x: 370, y: 230, size: 60},
		"produce13": {type: "slot", x: 430, y: 230, size: 60},
		"produce14": {type: "slot", x: 490, y: 230, size: 60},
		"produce15": {type: "slot", x: 550, y: 230, size: 60},
	}
});	

TileEntity.registerPrototype(BlockID.cardboardBox,{
	
	getGuiScreen:function(){
		return guiCardboardBox;
	}
});
