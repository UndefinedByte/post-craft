//Import lib

IMPORT("ToolType");
IMPORT("energylib");
IMPORT("ChargeItem");
IMPORT("MachineRender");
IMPORT("dimensions");


var GUI_SCALE = 3.5;


// import values
Player.getArmorSlot = ModAPI.requireGlobal("Player.getArmorSlot");
Player.setArmorSlot = ModAPI.requireGlobal("Player.setArmorSlot");
var nativeDropItem = ModAPI.requireGlobal("Level.dropItem");
var MobEffect = Native.PotionEffect;
var Enchantment = Native.Enchantment;
var BlockSide = Native.BlockSide;
var EntityType = Native.EntityType;

// energy (Eu)
var EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);

// vanilla items
Recipes.addFurnaceFuel(325, 10, 2000);
ChargeItemRegistry.registerFlashItem(331, "Eu", 800, 0); // redstone

function random(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var BLOCK_LIGHT = Block.createSpecialType({
	lightlevel: 15,
	opaque: true
});

function addShapelessRecipe(result, source){
	var ingredients = [];
	for(var i in source){
		var item = source[i];
		for(var n = 0; n < item.count; n++){
			ingredients.push(item);
		}
	}
	Recipes.addShapeless(result, ingredients);
}


var RARE_ITEM_NAME = function(item, name){
	return "§b" + name;
}

var ENERGY_ITEM_NAME = function(item, name){
	var energyStorage = Item.getMaxDamage(item.id) - 1;
	var energyStored = ChargeItemRegistry.getEnergyStored(item);
	if(energyStored==0){return name;}
	return name + "\n§7" + energyStored + "/" + energyStorage + " Eu";
}

var RARE_ENERGY_ITEM_NAME = function(item, name){
	var energyStorage = Item.getMaxDamage(item.id) - 1;
	var energyStored = ChargeItemRegistry.getEnergyStored(item);
	if(energyStored==0){return name;}
	return "§b" + name + "\n§7" + energyStored + "/" + energyStorage + " Eu";
}
