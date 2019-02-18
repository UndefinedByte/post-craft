//Import lib

IMPORT("ToolType");
//IMPORT("SoundAPI");
importLib("AdvancedAI", "*");
IMPORT("SoundLib");
IMPORT("energylib");
IMPORT("ChargeItem");
IMPORT("MachineRender");


// energy (Rad)

var RE = EnergyTypeRegistry.assureEnergyType("Eu", 1/2);


var guiScale = 3.5;

//Sounds
//Sounds/Machine sounds

var sndSiren = new Sound("machine/", "siren.mp3");
var sndElevator = new Sound("machine/","elevator.ogg");


Callback.addCallback("LevelLeft",function(){
	sndSiren.resetSound();
});




// import values, that work faster

var MobEffect = Native.PotionEffect;
var Enchantment = Native.Enchantment;
var BlockSide = Native.BlockSide;
var EntityType = Native.EntityType;
var ParticleType = Native.ParticleType;



//ArrowRemove

var ARROW = [];

Callback.addCallback("EntityAdded",function(entity){
	if (Entity.getType(entity) == EntityType.ARROW){
		ARROW.push(entity);
	}
});


Callback.addCallback("tick",function(){
	for(var iarr = 0; iarr < ARROW.length; iarr++) {
		if(Entity.getVelocity(ARROW[iarr]).x == 0 && Entity.getVelocity(ARROW[iarr]).y == 0 && Entity.getVelocity(ARROW[iarr]).z == 0 && Entity.getType(ARROW[iarr]) == EntityType.ARROW) {
			Entity.remove(ARROW[iarr]); 	
		}
	}
});


// API
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

//Random

function randomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}



//SpecialTypes

var BLOCK_LIGHT = Block.createSpecialType({
	lightlevel: 15,
	opaque: true
});


//Fire back

function angleToRadian(angle){
	return angle * Math.PI / 180;
}

function radianToAngle(rad){
	return 180 / Math.PI * rad;
}






