/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 44
*/



// file: header.js

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




// file: core/api/define.js

var Machine = {
	machineIDs: {},

	isMachine: function(id){
		return this.machineIDs[id];
	},

	registryPrototype: function(id, Prototype, notUseEU){
		// register ID
		this.machineIDs[id] = true;
		
		if(!notUseEU){
			// wire connection
			ICRender.getGroup("pc-wire").add(id, -1);
			// setup energy value
			if (Prototype.defaultValues){
				Prototype.defaultValues.energy = 0;
			}
			else{
				Prototype.defaultValues = {
					energy: 0
				};
			}
			// copy functions
			if(!Prototype.getEnergyStorage){
				Prototype.getEnergyStorage = function(){
					return 0;
				};
			}
		}
		ToolAPI.registerBlockMaterial(id, "stone", 1);
		Block.setDestroyTime(id, 3);
		TileEntity.registerPrototype(id, Prototype);
		
		if(!notUseEU){
			// register for energy net
			EnergyTileRegistry.addEnergyTypeForId(id, EU);
		}
	},
	
	initModel: function(){
		if(this.data.isActive){
			var block = World.getBlock(this.x, this.y, this.z);
			MachineRenderer.mapAtCoords(this.x, this.y, this.z, block.id, block.data);
		}
	},
	
	activateMachine: function(){
		if(!this.data.isActive){
			this.data.isActive = true;
			var block = World.getBlock(this.x, this.y, this.z);
			MachineRenderer.mapAtCoords(this.x, this.y, this.z, block.id, block.data);
		}
	},
	
	deactivateMachine: function(){
		if(this.data.isActive){
			this.data.isActive = false;
			BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
		}
	},
	
	basicEnergyReceiveFunc: function(type, src){
		var energyNeed = this.getEnergyStorage() - this.data.energy;
		this.data.energy += src.getAll(energyNeed);
	}
}

var transferByTier = {
	0: 512,
	1:  2048
}




// file: core/api/upgrade.js

var UpgradeAPI = {
	upgrades: {},
	data: {},

	isUpgrade: function(id){
		return UpgradeAPI.upgrades[id];
	},

	registerUpgrade: function(id, func){
		this.upgrades[id] = true;
		this.data[id] = func;
	},

	callUpgrade: function(item, machine, container, data, coords){
		var callback = this.data[item.id];
		if(callback){
			callback(item, machine, container, data, coords);
		}
	},

	executeUpgrades: function(machine){
		var container = machine.container;
		var data = machine.data;
		var coords = {x: machine.x, y: machine.y, z: machine.z};
		
		var upgrades = [];
		for(var slotName in container.slots){
			if(slotName.match(/Upgrade/)){
				var slot = container.getSlot(slotName);
				if(slot.id){
					var find = false;
					for(var i in upgrades){
						var item = upgrades[i];
						if(item.id == slot.id && item.data == slot.data){
							find = true;
							item.count += slot.count;
						}
					}
					if(!find){
						item = {id: slot.id, count: slot.count, data: slot.data};
						upgrades.push(item);
					}
				}
			}
		}
		for(var i in upgrades){
			this.callUpgrade(upgrades[i], machine, container, data, coords);
		}
	},
	
	findNearestContainers: function(coords, direction){
		var directions = {
			up: {x: 0, y: 1, z: 0},
			down: {x: 0, y: -1, z: 0},
			east: {x: 1, y: 0, z: 0},
			west: {x: -1, y: 0, z: 0},
			south: {x: 0, y: 0, z: 1},
			north: {x: 0, y: 0, z: -1},
		}
		var containers = [];
		if(direction){
			dir = directions[direction]
			var container = World.getContainer(coords.x + dir.x, coords.y + dir.y, coords.z + dir.z);
			if(container){containers.push(container);}
		}
		else{
			for(var i in directions){
				var dir = directions[i];
				var container = World.getContainer(coords.x + dir.x, coords.y + dir.y, coords.z + dir.z);
				if(container){containers.push(container);}
			}
		}
		return containers;
	},
	
	findNearestLiquidStorages: function(coords, direction){
		var directions = {
			up: {x: 0, y: 1, z: 0},
			down: {x: 0, y: -1, z: 0},
			east: {x: 1, y: 0, z: 0},
			west: {x: -1, y: 0, z: 0},
			south: {x: 0, y: 0, z: 1},
			north: {x: 0, y: 0, z: -1},
		}
		var storages = [];
		if(direction){
			dir = directions[direction]
			var tileEntity = World.getTileEntity(coords.x + dir.x, coords.y + dir.y, coords.z + dir.z);
			if(tileEntity && tileEntity.liquidStorage){
				storages.push(tileEntity.liquidStorage);
			}
		}
		else{
			for(var i in directions){
				var dir = directions[i];
				var tileEntity = World.getTileEntity(coords.x + dir.x, coords.y + dir.y, coords.z + dir.z);
				if(tileEntity && tileEntity.liquidStorage){
					storages.push(tileEntity.liquidStorage);
				}
			}
		}
		return storages;
	},
}


function addItemsToContainers(items, containers, tile){
	for(var i in items){
		var item = items[i];
		for(var c in containers){
			if(item.count==0){
				item.id = 0;
				item.data = 0;
				break;
			}
			
			var container = containers[c];
			var tileEntity = container.tileEntity;
			var slots = [];
			var slotsInitialized = false;
			
			if(tileEntity){
				if(tileEntity.addTransportedItem){
					tileEntity.addTransportedItem({}, item, {x: tile.x, y: tile.y, z: tile.z});
					continue;
				}
				if(tileEntity.getTransportSlots){
					slots = tileEntity.getTransportSlots().input || [];
					slotsInitialized = true;
				}
			}
			if(!slotsInitialized){
				if(container.slots){
					for(var name in container.slots){
						slots.push(name);
					}
				}else{
					for(var s = 0; s < container.getSize(); s++){
						slots.push(s);
					}
				}
			}
			for(var s in slots){
				var slot = container.getSlot(slots[s]);
				if(item.count <= 0){
					break;
				}
				if(slot.id == 0 || slot.id == item.id && slot.data == item.data){
					var maxstack = slot.id > 0 ? Item.getMaxStack(slot.id) : 64;
					var add = Math.min(maxstack - slot.count, item.count);
					item.count -= add;
					slot.count += add;
					slot.id = item.id;
					slot.data = item.data;
					if(!container.slots){
						container.setSlot(s, slot.id, slot.count, slot.data);
					}
				}
			}
		}
		if(item.count==0){
			item.id = 0;
			item.data = 0;
		}
	}
}

function getItemsFrom(items, containers, tile){
	for(var i in items){
		var item = items[i];
		var maxStack = 64;
		var stop = false;
		for(var c in containers){
			var container = containers[c];
			var tileEntity = container.tileEntity;
			var slots = [];
			var slotsInitialized = false;
			
			if(tileEntity && tileEntity.getTransportSlots){
				slots = tileEntity.getTransportSlots().output || [];
				slotsInitialized = true;
			}
			if(!slotsInitialized){
				if(container.slots){
					for(var name in container.slots){
						slots.push(name);
					}
				}else{
					for(var s = 0; s < container.getSize(); s++){
						slots.push(s);
					}
				}
			}
			for(var s in slots){
				var slot = container.getSlot(slots[s]);
				if(slot.id > 0){
					if(tile.addTransportedItem){
						stop = tile.addTransportedItem({}, slot, {});
						if(!container.slots){
							container.setSlot(s, slot.id, slot.count, slot.data);
						}
						if(stop) break;
					}
					else if(item.id == slot.id && item.data == slot.data || item.id == 0){
						maxStack = Item.getMaxStack(slot.id);
						var add = Math.min(maxStack - item.count, slot.count);
						slot.count -= add;
						item.count += add;
						item.id = slot.id;
						item.data = slot.data;
						if(slot.count==0) slot.id = slot.data = 0;
						if(!container.slots){
							container.setSlot(s, slot.id, slot.count, slot.data);
						}
						if(item.count == maxStack){break;}
					}
				}
			}
			if(stop || !tile.addTransportedItem &&  item.count == maxStack){break;}
		}
		if(tile.addTransportedItem){return;}
	}
}


function addLiquidToStorages(liquid, output, input){
	var amount = output.getLiquid(liquid, 1);
	if(amount){
		for(var i in input){
			var storage = input[i];
			if(storage.getLimit(liquid) < 99999999){
			amount = storage.addLiquid(liquid, amount);}
		}
		output.addLiquid(liquid, amount);
	}
}

function getLiquidFromStorages(liquid, input, output){
	var amount;
	for(var i in output){
		var storage = output[i];
		if(!liquid){
			liquid = storage.getLiquidStored();
		}
		if(liquid){
			var limit = input.getLimit(liquid);
			if(limit < 99999999){
				if(!amount) amount = Math.min(limit - input.getAmount(liquid), 1);
				amount = storage.getLiquid(liquid, amount);
				input.addLiquid(liquid, amount);
				if(input.isFull(liquid)) return;
			}
			else{
				liquid = null;
			}
		}
	}
}




// file: other/radWasteland.js

IDRegistry.genBlockID("dirt"); 
Block.createBlock("dirt", [
    {name: "Dirt", texture: [["false_dirt",0]], inCreative: false}
], "opaque");
	
Block.setDestroyTime(BlockID.dirt, 3);
ToolAPI.registerBlockMaterial(BlockID.dirt, "dirt", 0, true);


var trunkGenerationHelper = {
	p: function(x, y, z, id){
		World.setBlock(x, y, z, id, 0);
	},
 
	random: function(){
		if(Math.floor(Math.random() * (150 - 0  +  1)) <= 70){
			return true;
		} else
   
		if((Math.floor(Math.random() * (150 - 0  +  1))) >= 68){
			return false;
		}
	},
 
	generateTrunk: function(crds, block){
		var block = {
			log: 17,
		}
  
		if(this.random()){
			var a = [];
			this.p(crds.x, crds.y, crds.z, block.log);
			this.p(crds.x, crds.y + 1, crds.z, block.log);
			this.p(crds.x, crds.y  +  2, crds.z, block.log);
			this.p(crds.x, crds.y  +  3, crds.z, block.log);
			this.p(crds.x, crds.y + 4, crds.z, block.log);
		}
   
		if(!this.random()){
			this.p(crds.x, crds.y, crds.z, block.log);
			this.p(crds.x, crds.y + 1, crds.z, block.log);
			this.p(crds.x, crds.y + 2, crds.z, block.log);
			this.p(crds.x, crds.y + 3, crds.z, block.log);
			this.p(crds.x, crds.y + 4, crds.z, block.log);
			this.p(crds.x, crds.y + 5, crds.z, block.log);
		}
	}
}

Callback.addCallback("GenerateChunk", function(a, b){
	for(var i = 0; i < 1; i++){
		d = GenerationUtils.randomCoords(a, b, 12, 40);
		for(var j = 12; j < 42; j++){
			if(World.getBlockID(d.x, j, d.z) == BlockID.dirt){
				for(var l = 1; l < 10; l++){
					if(World.getBlockID(d.x, j + l, d.z) == 0){
						trunkGenerationHelper.generateTrunk({x: d.x, y: j + 1, z: d.z});
						return
					}
				}
				return
			}
		}
	}
});


const SKY_COLOR = [0.13, 0.13, 0.13];
const FOG_COLOR = [0.16, 0.16, 0.16];

var radWasteland = new Dimension({
    name: "radWasteland",
    
    generation: {
        layers: [
            {
                range: [2, 29],
                noise: {
                    octaves: {
                        count: 4,
                        weight: 1,
                        scale: [1.5, .9, 1.5]
                    }
                },
                
                gradient: [[1.2, -1.2], [.3, .4], [.6, -.5], [.8, -.7], [1, -.80]],

                terrain: {
                    cover: {
                        height: 4,
                        block: 1,
                        base: 1,
                        top: BlockID.dirt
                    }
                }
            },
            {
                range: [1,2],
                noise:{
                    octaves:{
                        count:8,
                        weight: 0.4,
                        scale: [.01,.02,.04,.08]
                    }
                },
                gradient:[
                    [0,1],
                    [1,-1],
                    [0.05,.4],
                    [.2,-.8]
                ],
                terrain:{
                    base: 7
                }
            },
        ],
        
        decoration: {
            //биом+если фичи на фолз то твой ген не будет перекрываться геном биома полностью, а лишь на подходящих метсах
            //biome: 2,
            //features: false
        }
    },
    
    environment: {
        sky: SKY_COLOR,
        fog: FOG_COLOR
    },
    
    callbacks: {
        tick: function() {
//tick specials            
        },
        
        generateChunk: function(chunkX, chunkZ) {
//generate structures or ores
        },   
        loaded: function(){
//check player          
        }
    }
});

//radWasteland.debugTerrainSlice(128, 1, true);


var radWastelandTransferSequence = new TransferSequence(radWasteland);
radWastelandTransferSequence.setPortalTimeout(40);

radWastelandTransferSequence.setPortalOverlay(new PortalOverlayWindow({
    frames: 32, 
    rate: 20, 
    fade: 1, 
    texture: "aether_portal_overlay_animation"
}));

radWastelandTransferSequence.setLoadingScreenParams({
    texture: "default_dimension_loading_screen"
});

PortalRegistry.newPortalBlock("radWastelandPortal", ["aether_portal", 0], radWastelandTransferSequence.getPortal(), {type: "u-plane", frameId: 4}, false);
radWastelandTransferSequence.setPortalTiles(BlockID.radWastelandPortal);



var shape = new PortalShape();
shape.setPortalId(BlockID.radWastelandPortal);
shape.setFrameIds(4);
shape.setMinSize(2, 3);

radWastelandTransferSequence.setPortalBuilder(shape.getBuilder());

Callback.addCallback("ItemUse", function(coords, item) {
    if (item.id == 373) {
        var rect = shape.findPortal(coords.relative.x, coords.relative.y, coords.relative.z);
        if (rect) {
            shape.buildPortal(rect, false);
        }
    }
});

Callback.addCallback("DestroyBlock", function(pos, block){
    if (block.id == 89 || block.id == BlockID.radWastelandPortal) {
        DimensionHelper.eliminateIncorrectPlacedPortals(pos, BlockID.radWastelandPortal, [4]);
    }
});




// file: items/energy/cable.js

IDRegistry.genItemID("cableCopper0");
IDRegistry.genItemID("cableCopper1");
Item.createItem("cableCopper0", "Copper Cable", {name: "cable_copper", meta: 0});
Item.createItem("cableCopper1", "Insulated Copper Cable", {name: "cable_copper", meta: 1});

IDRegistry.genItemID("oxygenePipe0");
Item.createItem("oxygenePipe0", "Oxygene Pipe", {name: "oxygene_pipe", meta: 0});


Item.registerUseFunction("cableCopper1", function(coords, item, block){
	var place = coords.relative;
	if(World.getBlockID(place.x, place.y, place.z) == 0){
		World.setBlock(place.x, place.y, place.z, BlockID.cableCopper);
		Player.setCarriedItem(item.id, item.count - 1, item.data);
		EnergyTypeRegistry.onWirePlaced();
	}
});

Item.registerUseFunction("oxygenePipe0", function(coords, item, block){
	var place = coords.relative;
	if(World.getBlockID(place.x, place.y, place.z) == 0){
		World.setBlock(place.x, place.y, place.z, BlockID.oxygenePipe);
		Player.setCarriedItem(item.id, item.count - 1, item.data);
		EnergyTypeRegistry.onWirePlaced();
	}
});




// file: items/misc/backpacks.js

IDRegistry.genItemID("leatherBound");
IDRegistry.genItemID("leatherTanned");

Item.createItem("leatherBound", "Bound Leather", { name: "leather_bound", data: 0 },{ stack: 64 });
Item.createItem("leatherTanned", "Tanned Leather", { name: "leather_tanned", data: 0 },{ stack: 64 });


IDRegistry.genItemID("backpack"); //27 slots
Item.createItem("backpack", "Backpack", { name: "backpack_small", data: 0 },{ stack: 1 });

var backpackContainer = new UI.Container();
var guiBackpack = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Backpack"}},
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

Callback.addCallback("ItemUse", function (coords, item, block) {
	if(item.id == ItemID.backpack) backpackContainer.openAs(guiBackpack);
});




IDRegistry.genItemID("bigBackpack"); //54 slots
Item.createItem("bigBackpack", "Big Backpack", { name: "backpack_big", data: 0 },{ stack: 1 });

var bigBackpackContainer = new UI.Container();
var guiBigBackpack = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Big Backpack"}},
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
		"produce27": {type: "slot", x: 850, y: 170, size: 60},
	
	"produce28": {type: "slot", x: 370, y: 230, size: 60},
		"produce29": {type: "slot", x: 430, y: 230, size: 60},
		"produce30": {type: "slot", x: 490, y: 230, size: 60},
		"produce31": {type: "slot", x: 550, y: 230, size: 60},
		"produce32": {type: "slot", x: 610, y: 230, size: 60},
		"produce33": {type: "slot", x: 670, y: 230, size: 60},
		"produce34": {type: "slot", x: 730, y: 230, size: 60},
		"produce35": {type: "slot", x: 790, y: 230, size: 60},
		"produce36": {type: "slot", x: 850, y: 230, size: 60},

		"produce37": {type: "slot", x: 370, y: 290, size: 60},
		"produce38": {type: "slot", x: 430, y: 290, size: 60},
		"produce39": {type: "slot", x: 490, y: 290, size: 60},
		"produce40": {type: "slot", x: 550, y: 290, size: 60},
		"produce41": {type: "slot", x: 610, y: 290, size: 60},
		"produce42": {type: "slot", x: 670, y: 290, size: 60},
		"produce43": {type: "slot", x: 730, y: 290, size: 60},
		"produce44": {type: "slot", x: 790, y: 290, size: 60},
		"produce45": {type: "slot", x: 850, y: 290, size: 60},

		"produce46": {type: "slot", x: 370, y: 350, size: 60},
		"produce47": {type: "slot", x: 430, y: 350, size: 60},
		"produce48": {type: "slot", x: 490, y: 350, size: 60},
		"produce49": {type: "slot", x: 550, y: 350, size: 60},
		"produce50": {type: "slot", x: 610, y: 350, size: 60},
		"produce51": {type: "slot", x: 670, y: 350, size: 60},
		"produce52": {type: "slot", x: 730, y: 350, size: 60},
		"produce53": {type: "slot", x: 790, y: 350, size: 60},
		"produce54": {type: "slot", x: 850, y: 350, size: 60}
			}
});

Callback.addCallback("ItemUse", function (coords, item, block) {
	if(item.id == ItemID.bigBackpack) bigBackpackContainer.openAs(guiBigBackpack);
});




Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: ItemID.leatherBound, count: 1, data: 0}, ["ooo","sos","ooo"], ['o', 287, 0, 's', 334, 0]);
	Recipes.addFurnace(ItemID.leatherBound, ItemID.leatherTanned, 0);
	
	Recipes.addShaped({id: ItemID.backpack, count: 1, data: 0}, ["ooo","o o","ooo"], ['o', 334, 0]);
	Recipes.addShaped({id: ItemID.bigBackpack, count: 1, data: 0}, ["ooo","o o","ooo"], ['o', ItemID.leatherTanned, 0]);
});




// file: stick.js

var stickContainer = new UI.Container();
var guiStick = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Extra UI"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "bitmap", x: 450, y: 50, bitmap: "steve_ui", scale: 1.4}
	],
	
	elements: {
		"slotBack": {type: "slot", x: 735, y: 150, size: 80},
	}
});


Callback.addCallback("ItemUse", function (coords, item, block) {
	if(item.id == 280) stickContainer.openAs(guiStick);
});





// file: items/misc/cardboard.js

﻿IDRegistry.genItemID("cardboard");
Item.createItem("cardboard", "Cardboard", { name: "cardboard", data: 0 },{ stack: 64 });

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: ItemID.cardboard, count: 1, data: 0}, ["  ","ooo","   "], ['o', 339, 0]);
});




// file: items/misc/guide_book.js

IDRegistry.genItemID("guidebook");
Item.createItem("guidebook", "Guide Book", {name: "guide_book", data: 0},{stack: 1});




// file: items/res/ingots.js

IDRegistry.genItemID("ingotCopper");
IDRegistry.genItemID("ingotLead");

Item.createItem("ingotCopper", "Copper Ingot", {name: "ingot_copper", data: 0});
Item.createItem("ingotLead", "Lead Ingot", {name: "ingot_lead", data: 0});




// file: items/res/ore_drops.js

﻿IDRegistry.genItemID("uranium");
IDRegistry.genItemID("radonium");

Item.createItem("uranium", "Uranium", {name: "uranium"});
Item.createItem("radonium", "Radonium", {name: "radonium"});




// file: items/res/plates.js

﻿IDRegistry.genItemID("plateCopper");
IDRegistry.genItemID("plateIron");
IDRegistry.genItemID("plateLead");

Item.createItem("plateCopper", "Copper Plate", {name: "plate_copper", data: 0});
Item.createItem("plateIron", "Iron Plate", {name: "plate_iron", data: 0});
Item.createItem("plateLead", "Lead Plate", {name: "plate_lead", data: 0});




// file: items/res/rubber.js

IDRegistry.genItemID("latex");
IDRegistry.genItemID("rubber");

Item.createItem("latex", "Latex", {name: "latex", data: 0});
Item.createItem("rubber", "Rubber", {name: "rubber", data: 0});

Callback.addCallback("PostLoaded", function(){
	Recipes.addFurnace(ItemID.latex, ItemID.rubber, 0);
});




// file: items/tool/treetap.js

IDRegistry.genItemID("treetap");
Item.createItem("treetap", "Treetap", {name: "treetap", data: 0},{stack: 1});


Item.registerUseFunction("treetap", function(coords, item, block){
	if(block.id == BlockID.rubberTreeLogLatex && block.data == coords.side - 2){
		World.setBlock(coords.x, coords.y, coords.z, BlockID.rubberTreeLog);
		Player.setCarriedItem(item.id, ++item.data < 17 ? item.count : 0, item.data);
		Entity.setVelocity(
			World.drop(
				coords.relative.x + 0.5,
				coords.relative.y + 0.5,
				coords.relative.z + 0.5,
				ItemID.latex, 1 + parseInt(Math.random() * 5), 0
			),
			(coords.relative.x - coords.x) * 0.25,
			(coords.relative.y - coords.y) * 0.25,
			(coords.relative.z - coords.z) * 0.25
		);
	}
});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: ItemID.treetap, count: 1, data: 0}, ["qoq","ooo","oqq"], ['o', 5, 0]);
});




// file: items/tool/weapons.js

IDRegistry.genItemID("firemanAxe");
IDRegistry.genItemID("bat");
IDRegistry.genItemID("machete");

Item.createItem("firemanAxe", "Fireman Axe", {name: "fireman_axe", data: 0},{stack: 1});
Item.createItem("bat", "Bat", {name: "bat", data: 0},{stack: 1});
Item.createItem("machete", "Machete", {name: "machete", data: 0},{stack: 1});


ToolAPI.addToolMaterial("firemanAxe", {durability: 150, level: 3, damage: 7});
ToolAPI.setTool(ItemID.firemanAxe, "firemanAxe", ToolType.axe);

ToolAPI.addToolMaterial("bat", {durability: 60, level: 0, damage: 5});
ToolAPI.setTool(ItemID.bat, "bat", ToolType.sword);

ToolAPI.addToolMaterial("machete", {durability: 125, level: 0, damage: 9});
ToolAPI.setTool(ItemID.machete, "machete", ToolType.sword);





// file: items/tool/wireless.js

IDRegistry.genItemID("frequencyTransmitter");
Item.createItem("frequencyTransmitter", "Frequency Transmitter", {name: "frequency_transmitter", data: 0}, {stack: 1});

Translation.addTranslation("Frequency Transmitter", {ru: "Частотный связыватель"});




// file: items/can.js

IDRegistry.genItemID("emptyCan");
IDRegistry.genItemID("canVeg");
IDRegistry.genItemID("canFish");
IDRegistry.genItemID("canMeat");

Item.createItem("emptyCan", "Empty Can", {name: "empty_can", data: 0});
Item.createFoodItem("canVeg", "Canned Vegetables", {name: "canned_veg", data: 0}, {food: 1});
Item.createFoodItem("canFish", "Canned Fish", {name: "canned_fish", data: 0}, {food: 2});
Item.createFoodItem("canMeat", "Canned Meat", {name: "canned_meat", data: 0}, {food: 3});


Callback.addCallback("FoodEaten",function(heal, satRatio){
	var item = Player.getCarriedItem();
	
	if(item.id == ItemID.canVeg || item.id == ItemID.canFish || item.id == ItemID.canMeat){
		Player.addItemToInventory(ItemID.emptyCan, 1, 0);
	}
});




// file: items/medsup.js

IDRegistry.genItemID("tablet");
IDRegistry.genItemID("expTablet");

Item.createFoodItem("tablet", "Tablet", {name: "tablet", data: 0}, {food: 0});
Item.createFoodItem("expTablet", "Experimental Tablet", {name: "exp_tablet", data: 0}, {food: 0});


Callback.addCallback("FoodEaten",function(heal, satRatio){
	var rnd = random(1, 10);
	var item = Player.getCarriedItem();
	
	if(item.id == ItemID.tablet){
		Entity.setHealth(Player.get(), 20); 
	}
	
	if(item.id == ItemID.expTablet && rnd == 5){
		Entity.addEffect(Player.get(), MobEffect.movementSpeed, 4, 1200, false, false);
		Entity.addEffect(Player.get(), MobEffect.digSpeed, 4, 1200, false, false);
		Entity.addEffect(Player.get(), MobEffect.regeneration, 4, 1200, false, false);
		Entity.addEffect(Player.get(), MobEffect.jump, 4, 1200, false,false);
		Entity.addEffect(Player.get(), MobEffect.damageResistance, 4, 1200, false, false);
		Entity.addEffect(Player.get(), MobEffect.fireResistance, 4, 1200, false, false);
		Entity.addEffect(Player.get(), MobEffect.waterBreathing, 4, 1200, false, false);
		Entity.addEffect(Player.get(), MobEffect.invisibility, 4, 1200, false, false);
		Entity.addEffect(Player.get(), MobEffect.nightVision, 4, 1200, false, false);
		Entity.addEffect(Player.get(), MobEffect.damageBoost, 4, 1200, false, false);
	}
	else {
		if(item.id == ItemID.expTablet && rnd != 5){
			Entity.addEffect(Player.get(), MobEffect.blindness, 2, 200, false, false);
			Entity.addEffect(Player.get(), MobEffect.confusion, 2, 150, false, false);
		}
	}
}); 


Callback.addCallback("tick", function(){
	var item = Player.getCarriedItem();
	
	if(Player.getHunger() > 19 && item.id == ItemID.tablet || item.id == ItemID.expTablet){
		Player.setHunger(19);
	}
});




// file: block/cable.js

Block.createSpecialType({
	destroytime: 2,
	explosionres: 0.5,
	opaque: false,
	lightopacity: 0,
	renderlayer: 3,
}, "part");

IDRegistry.genBlockID("cableCopper");
Block.createBlock("cableCopper", [
	{name: "tile.cableCopper.name", texture: [["cable_block_copper", 0]], inCreative: false}
]);

IDRegistry.genBlockID("oxygenePipe");
Block.createBlock("oxygenePipe", [
	{name: "tile.oxygenePipe.name", texture: [["oxygene_block_pipe", 0]], inCreative: false}
]);



function setupWireRender(id, width, groupName, preventSelfAdd) {
    var render = new ICRender.Model();
    BlockRenderer.setStaticICRender(id, 0, render);
   
    var boxes = [
        {side: [1, 0, 0], box: [0.5 + width / 2, 0.5 - width / 2, 0.5 - width / 2, 1, 0.5 + width / 2, 0.5 + width / 2]},
        {side: [-1, 0, 0], box: [0, 0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2]},
        {side: [0, 1, 0], box: [0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2, 1, 0.5 + width / 2]},
        {side: [0, -1, 0], box: [0.5 - width / 2, 0, 0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2]},
        {side: [0, 0, 1], box: [0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, 1]},
        {side: [0, 0, -1], box: [0.5 - width / 2, 0.5 - width / 2, 0, 0.5 + width / 2, 0.5 + width / 2, 0.5 - width / 2]},
    ]
   
    var group = ICRender.getGroup(groupName);
    if (!preventSelfAdd) {
        group.add(id, -1);
    }
   
    for (var i in boxes) {
        var box = boxes[i];
       
        var model = BlockRenderer.createModel();
        model.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], id, 0);
       
        render.addEntry(model).asCondition(box.side[0], box.side[1], box.side[2], group, 0);
    }
   
    var model = BlockRenderer.createModel();
    model.addBox(0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, id, 0);
    render.addEntry(model);
    
    width = Math.max(width, 0.5);
    Block.setBlockShape(id, {x: 0.5 - width/2, y: 0.5 - width/2, z: 0.5 - width/2}, {x: 0.5 + width/2, y: 0.5 + width/2, z: 0.5 + width/2});
}

EU.registerWire(BlockID.cableCopper);
EU.registerWire(BlockID.oxygenePipe);

setupWireRender(BlockID.cableCopper, 1/4, "pc-wire");
setupWireRender(BlockID.oxygenePipe, 1/4, "pc-pipe");

// drop 
Block.registerDropFunction("cableCopper", function(){
	return [[ItemID.cableCopper1, 1, 0]];
});

Block.registerDropFunction("oxygenePipe", function(){
	return [[ItemID.oxygenePipe0, 1, 0]];;
});




// file: block/cardboard_box.js

﻿var BLOCK_TYPE_PAPER = Block.createSpecialType({
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




// file: block/crate.js

IDRegistry.genBlockID("woodenCrate"); 
Block.createBlock("woodenCrate", [
	{name: "Wooden Crate", texture: [["crate", 0]], inCreative: true}
, "opaque"]);

Translation.addTranslation("Wooden Crate", {ru: "Деревянный ящик"});
Block.setDestroyTime(BlockID.crate, 2);
ToolAPI.registerBlockMaterial(BlockID.crate, "wood");



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




// file: block/elevator.js

IDRegistry.genBlockID("elevator"); 
Block.createBlock("elevator", [
	{name: "Elevator", texture: [["elevator", 0]], inCreative: true}
], "opaque");

ToolAPI.registerBlockMaterial(BlockID.elevator, "stone", 2, true);
Block.setDestroyTime(BlockID.elevator, 3);


Callback.addCallback("ItemUse", function(coords, item, block){

	for(var i = 1; i <= 20; i++){
		if(block.id == BlockID.elevator && World.getBlockID(coords.x, coords.y + i, coords.z) == BlockID.elevator && Entity.getSneaking(Player.get()) == false){
			Player.setPosition (coords.x + 0.5, coords.y + i + 2, coords.z + 0.5); 
			break;
			//Game.message('up');
		}
		
		if(block.id == BlockID.elevator && World.getBlockID(coords.x, coords.y - i, coords.z) == BlockID.elevator && Entity.getSneaking(Player.get()) == true){
			Player.setPosition (coords.x + 0.5, coords.y - i + 2, coords.z + 0.5);
			break;
			//Game.message('down');
		}
	}
});

Callback.addCallback("PreLoaded", function(){
	Recipes.addShaped({id: BlockID.elevator, count: 1, data: 0}, ["xxx","xox","xxx"], ['x', 35, -1, 'o', 368, 0]);
});




// file: block/fluid.js

var Renderer={
        setOilRender:function(id,x){
        var shape = new ICRender.CollisionShape();     
        BlockRenderer.setCustomCollisionShape(Block.getNumericId(id), -1, shape);    
        BlockRenderer.addRenderCallback(id, function(api, coords,block) {
            if(x != 0){
                for(var i = 0; i < 1/x; i += x){
                api.renderBoxId(coords.x, coords.y, coords.z,0, 0, 0, 1, 14/16, 1,id, block.data);
                }
            }
            else{
                api.renderBoxId(coords.x, coords.y, coords.z, 0, 0, 0, 1, 14/16, 1,id, block.data);
            }
        })
        BlockRenderer.enableCustomRender(id);
    }
};

var BLOCK_TYPE_LIQUID = Block.createSpecialType({
    //base: 90,
    rendertype: 0,
    renderlayer: 3,
    explosionres: 9999
});

IDRegistry.genBlockID("oil"); 
Block.createBlock("oil", [
	{name: "Oil", texture: [["oil_still", 0]], inCreative:false}
, BLOCK_TYPE_LIQUID]);

Block.setBlockShape(BlockID.oil, {x: 0, y: 0, z: 0}, {x: 1, y: 14/16, z: 1});
Renderer.setOilRender(BlockID.oil, 0);


IDRegistry.genItemID("oilBucket");
Item.createItem("oilBucket", "Oil Bucket", { name: "bucket_oil", data: 0 },{ stack: 1 });

Callback.addCallback("ItemUse", function (coords, item, block) {
	if(block.id == BlockID.oil && item.id == 325){
		World.setBlock(coords.x, coords.y, coords.z, 0, 0);
		Player.setCarriedItem(325, -1, 0);
		Player.addItemToInventory(ItemID.oilBucket, 1, 0);
	}
	
	if(item.id == ItemID.oilBucket && block.id != BlockID.oil){
		World.setBlock(coords.x, coords.y + 1, coords.z, BlockID.oil, 0);
		Player.setCarriedItem(ItemID.oilBucket, -1, 0);
		Player.addItemToInventory(325, 1, 0);
	}
});




// file: block/iron_coffer.js

IDRegistry.genBlockID("ironCoffer"); 
Block.createBlock("ironCoffer", [
	{name: "Iron Coffer", texture: [["iron_coffer", 0]], inCreative: true}
, "opaque"]);

ToolAPI.registerBlockMaterial(BlockID.ironCoffer, "stone");
Block.setDestroyTime(BlockID.ironCoffer, 3);


var guiIronCoffer = new UI.StandartWindow({
	standart: {
		header: { text: { text: "Iron Сoffer" }},
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
		"produce27": {type: "slot", x: 850, y: 170, size: 60},
	
	"produce28": {type: "slot", x: 370, y: 230, size: 60},
		"produce29": {type: "slot", x: 430, y: 230, size: 60},
		"produce30": {type: "slot", x: 490, y: 230, size: 60},
		"produce31": {type: "slot", x: 550, y: 230, size: 60},
		"produce32": {type: "slot", x: 610, y: 230, size: 60},
		"produce33": {type: "slot", x: 670, y: 230, size: 60},
		"produce34": {type: "slot", x: 730, y: 230, size: 60},
		"produce35": {type: "slot", x: 790, y: 230, size: 60},
		"produce36": {type: "slot", x: 850, y: 230, size: 60},

		"produce37": {type: "slot", x: 370, y: 290, size: 60},
		"produce38": {type: "slot", x: 430, y: 290, size: 60},
		"produce39": {type: "slot", x: 490, y: 290, size: 60},
		"produce40": {type: "slot", x: 550, y: 290, size: 60},
		"produce41": {type: "slot", x: 610, y: 290, size: 60},
		"produce42": {type: "slot", x: 670, y: 290, size: 60},
		"produce43": {type: "slot", x: 730, y: 290, size: 60},
		"produce44": {type: "slot", x: 790, y: 290, size: 60},
		"produce45": {type: "slot", x: 850, y: 290, size: 60},

		"produce46": {type: "slot", x: 370, y: 350, size: 60},
		"produce47": {type: "slot", x: 430, y: 350, size: 60},
		"produce48": {type: "slot", x: 490, y: 350, size: 60},
		"produce49": {type: "slot", x: 550, y: 350, size: 60},
		"produce50": {type: "slot", x: 610, y: 350, size: 60},
		"produce51": {type: "slot", x: 670, y: 350, size: 60},
		"produce52": {type: "slot", x: 730, y: 350, size: 60},
		"produce53": {type: "slot", x: 790, y: 350, size: 60},
		"produce54": {type: "slot", x: 850, y: 350, size: 60}
	}
});

TileEntity.registerPrototype(BlockID.ironCoffer,{
	getGuiScreen:function(){
		return guiIronCoffer;
	}
});




// file: block/glow_lamp.js

IDRegistry.genBlockID("glowLamp");
Block.createBlock("glowLamp", [
	{name: "Glow Lamp", texture: [["glow_lamp", 0]], inCreative: true}
], BLOCK_LIGHT);

Translation.addTranslation("Glow Lamp", {ru: "Лампа из светопыли"});
ToolAPI.registerBlockMaterial(BlockID.glowLamp, "stone", 2, true);




// file: block/lamp.js

Block.createSpecialType({
	destroytime: 2,
	explosionres: 0.5,
	opaque: false,
	lightopacity: 0,
	lightlevel: 15
}, "light");

var debug = false;


IDRegistry.genBlockID("lamp");
Block.createBlock("lamp", [
	{name: "tile.lamp.name", texture: [["lamp", 0], ["lamp", 1], ["lamp", 0], ["lamp", 0], ["lamp", 0], ["lamp", 0]], inCreative: false},
	{name: "tile.lamp.name", texture: [["lamp", 0], ["lamp", 1], ["lamp", 0], ["lamp", 0], ["lamp", 0], ["lamp", 0]], inCreative: false},
	{name: "tile.lamp.name", texture: [["lamp", 0], ["lamp", 1], ["lamp", 0], ["lamp", 0], ["lamp", 0], ["lamp", 0]], inCreative: false},
	{name: "tile.lamp.name", texture: [["lamp", 0], ["lamp", 1], ["lamp", 0], ["lamp", 0], ["lamp", 0], ["lamp", 0]], inCreative: false},
	{name: "tile.lamp.name", texture: [["lamp", 0], ["lamp", 1], ["lamp", 0], ["lamp", 0], ["lamp", 0], ["lamp", 0]], inCreative: false},
	{name: "tile.lamp.name", texture: [["lamp", 0], ["lamp", 1], ["lamp", 0], ["lamp", 0], ["lamp", 0], ["lamp", 0]], inCreative: false}
], "light");



//0
var lampRender0 = new ICRender.Model();
BlockRenderer.setStaticICRender(BlockID.lamp, 0, lampRender0);

var lampModel0 = BlockRenderer.createModel();

lampModel0.addBox(4/16, 11/16, 4/16, 12/16, 14/16, 12/16, [["lamp", 1]]);
lampModel0.addBox(3/16, 14/16, 3/16, 13/16, 15/16, 13/16, [["lamp", 0]]);
lampModel0.addBox(2/16, 15/16, 2/16, 14/16, 16/16, 14/16, [["lamp", 0]]);

lampRender0.addEntry(lampModel0);
Block.setBlockShape(BlockID.lamp, {x: 2/16, y: 10/16, z: 2/16}, {x: 14/16, y: 1, z: 14/16}, 0);


//1
var lampRender1 = new ICRender.Model();
BlockRenderer.setStaticICRender(BlockID.lamp, 1, lampRender1);

var lampModel1 = BlockRenderer.createModel();

lampModel1.addBox(4/16, 2/16, 4/16, 12/16, 5/16, 12/16, [["lamp", 1]]);//Сама лампа
lampModel1.addBox(3/16, 1/16, 3/16, 13/16, 2/16, 13/16, [["lamp", 0]]);//Средняя часть
lampModel1.addBox(2/16, 0/16, 2/16, 14/16, 1/16, 14/16, [["lamp", 0]]);//Нижняя часть

lampRender1.addEntry(lampModel1);
Block.setBlockShape(BlockID.lamp, {x: 2/16, y: 0, z: 2/16}, {x: 14/16, y: 6/16, z: 14/16}, 1);


//2
var lampRender2 = new ICRender.Model();
BlockRenderer.setStaticICRender(BlockID.lamp, 2, lampRender2);

var lampModel2 = BlockRenderer.createModel();

lampModel2.addBox(4/16, 4/16, 11/16, 12/16, 12/16, 14/16, [["lamp", 1]]);//Сама лампа
lampModel2.addBox(3/16, 3/16, 14/16, 13/16, 13/16, 15/16, [["lamp", 0]]);//Средняя часть
lampModel2.addBox(2/16, 2/16, 15/16, 14/16, 14/16, 16/16, [["lamp", 0]]);//Нижняя часть

lampRender2.addEntry(lampModel2);
Block.setBlockShape(BlockID.lamp, {x: 2/16, y: 2/16, z: 10/16}, {x: 14/16, y: 14/16, z: 1}, 2);


//3
var lampRender3 = new ICRender.Model();
BlockRenderer.setStaticICRender(BlockID.lamp, 3, lampRender3);

var lampModel3 = BlockRenderer.createModel();

lampModel3.addBox(4/16, 12/16, 5/16, 12/16, 4/16, 2/16, [["lamp", 1]]);//Сама лампа
lampModel3.addBox(3/16, 13/16, 2/16, 13/16, 3/16, 1/16, [["lamp", 0]]);//Средняя часть
lampModel3.addBox(2/16, 14/16, 1/16, 14/16, 2/16, 0/16, [["lamp", 0]]);//Нижняя часть

lampRender3.addEntry(lampModel3);
Block.setBlockShape(BlockID.lamp, {x: 2/16, y: 2/16, z: 0}, {x: 14/16, y: 14/16, z: 6/16}, 3);


//4
var lampRender4 = new ICRender.Model();
BlockRenderer.setStaticICRender(BlockID.lamp, 4, lampRender4);

var lampModel4 = BlockRenderer.createModel();

lampModel4.addBox(11/16, 4/16, 4/16, 14/16, 12/16, 12/16, [["lamp", 1]]);//Сама лампа
lampModel4.addBox(14/16, 3/16, 3/16, 15/16, 13/16, 13/16, [["lamp", 0]]);//Средняя часть
lampModel4.addBox(15/16, 2/16, 2/16, 16/16, 14/16, 14/16, [["lamp", 0]]);//Нижняя часть

lampRender4.addEntry(lampModel4);
Block.setBlockShape(BlockID.lamp, {x: 10/16, y: 2/16, z: 2/16}, {x: 1, y: 14/16, z: 14/16}, 4);


//5
var lampRender5 = new ICRender.Model();
BlockRenderer.setStaticICRender(BlockID.lamp, 5, lampRender5);

var lampModel5 = BlockRenderer.createModel();

lampModel5.addBox(2/16, 4/16, 4/16, 5/16, 12/16, 12/16, [["lamp", 1]]);//Сама лампа
lampModel5.addBox(1/16, 3/16, 3/16, 2/16, 13/16, 13/16, [["lamp", 0]]);//Средняя часть
lampModel5.addBox(0/16, 2/16, 2/16, 1/16, 14/16, 14/16, [["lamp", 0]]);//Нижняя часть

lampRender5.addEntry(lampModel5);
Block.setBlockShape(BlockID.lamp, {x: 0, y: 2/16, z: 2/16}, {x: 6/16, y: 14/16, z: 14/16}, 5);



//проверка ломания

IDRegistry.genItemID("itemLamp");
Item.createItem("itemLamp", "Lamp", {name: "lamp_item", data: 0},{stack: 64});

Callback.addCallback("ItemUse",function(coords, item, block){
	var place = coords.relative;
		
	if(item.id == ItemID.itemLamp && coords.side == 0){
		World.setBlock(place.x, place.y, place.z, BlockID.lamp, 0);
		Player.setCarriedItem(item.id, item.count - 1, item.data);
			/*if(debug = true){
				Game.message("side: 0");
			}*/
	}
	
	if(item.id == ItemID.itemLamp && coords.side == 1){
		World.setBlock(place.x, place.y, place.z, BlockID.lamp, 1);
		Player.setCarriedItem(item.id, item.count - 1, item.data);
			/*if(debug = true){
				Game.message("side: 1");
			}*/
	}
	
	if(item.id == ItemID.itemLamp && coords.side == 2){
		World.setBlock(place.x, place.y, place.z, BlockID.lamp, 2);
		Player.setCarriedItem(item.id, item.count - 1, item.data);
			if(debug = true){
				Game.message("side: 2");
			}
	}
	
	if(item.id == ItemID.itemLamp && coords.side == 3){
		World.setBlock(place.x, place.y, place.z, BlockID.lamp, 3);
		Player.setCarriedItem(item.id, item.count - 1, item.data);
			/*if(debug = true){
				Game.message("side: 3");
			}*/
	}
	
	if(item.id == ItemID.itemLamp && coords.side == 4){
		World.setBlock(place.x, place.y, place.z, BlockID.lamp, 4);
		Player.setCarriedItem(item.id, item.count - 1, item.data);
			/*if(debug = true){
				Game.message("side: 4");
			}*/
	}
	
	if(item.id == ItemID.itemLamp && coords.side == 5){
		World.setBlock(place.x, place.y, place.z, BlockID.lamp, 5);
		Player.setCarriedItem(item.id, item.count - 1, item.data);
			/*if(debug = true){
				Game.message("side: 5");
			}*/
	}
});



Block.registerDropFunction("lamp", function(){
	return [[ItemID.itemLamp, 1, 0]];
});


Callback.addCallback("DestroyBlock",function(coords, block, player){
	
	if(World.getBlockID(coords.x, coords.y + 1, coords.z) == BlockID.lamp){
		World.destroyBlock(coords.x, coords.y + 1, coords.z, 0);
	}
	
	if(World.getBlockID(coords.x, coords.y - 1, coords.z) == BlockID.lamp){
		World.destroyBlock(coords.x, coords.y - 1, coords.z, 0);
	}
	
	if(World.getBlockID(coords.x + 1, coords.y, coords.z) == BlockID.lamp){
		World.destroyBlock(coords.x + 1, coords.y, coords.z, 0);
	}
	
	if(World.getBlockID(coords.x - 1, coords.y, coords.z) == BlockID.lamp){
		World.destroyBlock(coords.x - 1, coords.y, coords.z, 0);
	}
	
	if(World.getBlockID(coords.x, coords.y, coords.z + 1) == BlockID.lamp){
		World.destroyBlock(coords.x, coords.y, coords.z + 1, 0);
	}
	
	if(World.getBlockID(coords.x, coords.y, coords.z - 1) == BlockID.lamp){
		World.destroyBlock(coords.x, coords.y, coords.z - 1, 0);
	}
});




// file: block/metal.js

IDRegistry.genBlockID("blockCopper");
Block.createBlock("blockCopper", [
	{name: "Copper Block", texture: [["block_copper", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.blockCopper, "stone", 2, true);
Block.setDestroyTime(BlockID.blockCopper, 5);
Block.setDestroyLevel("blockCopper", 2);


IDRegistry.genBlockID("blockTin");
Block.createBlock("blockTin", [
	{name: "Tin Block", texture: [["block_tin", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.blockTin, "stone", 2, true);
Block.setDestroyTime(BlockID.blockTin, 5);
Block.setDestroyLevel("blockTin", 2);


IDRegistry.genBlockID("blockBronze");
Block.createBlock("blockBronze", [
	{name: "Bronze Block", texture: [["block_bronze", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.blockBronze, "stone", 2, true);
Block.setDestroyTime(BlockID.blockBronze, 5);
Block.setDestroyLevel("blockBronze", 2);


IDRegistry.genBlockID("blockLead");
Block.createBlock("blockLead", [
	{name: "Lead Block", texture: [["block_lead", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.blockLead, "stone", 2, true);
Block.setDestroyTime(BlockID.blockLead, 5);
Block.setDestroyLevel("blockLead", 2);


IDRegistry.genBlockID("blockUranium");
Block.createBlock("blockUranium", [
	{name: "Uranium Block", texture: [["uranium_block_bt", 0], ["uranium_block_bt",0], ["uranium_block_sides", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.blockUranium, "stone", 2, true);
Block.setDestroyTime(BlockID.blockUranium, 5);
Block.setDestroyLevel("blockUranium", 2);




// file: block/ore.js

IDRegistry.genBlockID("oreAluminium");
Block.createBlock("oreAluminium", [
	{name: "Aluminium Ore", texture: [["ore_aluminum", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreAluminium, "stone", 2, true);
Block.setDestroyTime(BlockID.oreAluminium, 3);
Block.setDestroyLevel("oreAluminium", 2);


IDRegistry.genBlockID("oreCopper");
Block.createBlock("oreCopper", [
	{name: "Copper Ore", texture: [["ore_copper", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreCopper, "stone", 2, true);
Block.setDestroyTime(BlockID.oreCopper, 3);
Block.setDestroyLevel("oreCopper", 2);



IDRegistry.genBlockID("oreTin");
Block.createBlock("oreTin", [
	{name: "Tin Ore", texture: [["ore_tin", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreTin, "stone", 2, true);
Block.setDestroyTime(BlockID.oreTin, 3);
Block.setDestroyLevel("oreTin", 2);


IDRegistry.genBlockID("oreLead");
Block.createBlock("oreLead", [
	{name: "Lead Ore", texture: [["ore_lead", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreLead, "stone", 2, true);
Block.setDestroyTime(BlockID.oreLead, 3);
Block.setDestroyLevel("oreLead", 2);


IDRegistry.genBlockID("oreUranium");
Block.createBlock("oreUranium", [
	{name: "Uranium Ore", texture: [["ore_uranium", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreUranium, "stone", 3, true);
Block.setDestroyTime(BlockID.oreUranium, 3);
Block.setDestroyLevel("oreUranium", 3);




// file: block/reinforced.js

﻿Block.createSpecialType({
	base: 1,
	solid: true,
	destroytime: 5,
	explosionres: 30,
	opaque: false,
	lightopacity: 0,
	renderlayer: 3,
}, "reinforced_block");

Block.createSpecialType({
	base: 1,
	destroytime: 5,
	explosionres: 30,
	opaque: false,
	lightopacity: 0,
	renderlayer: 9,
}, "reinforced_glass");

IDRegistry.genBlockID("reinforcedStone");
Block.createBlock("reinforcedStone", [
	{name: "Reinforced Stone", texture: [["reinforced_stone", 0]], inCreative: true}
], "reinforced_block");
ToolAPI.registerBlockMaterial(BlockID.reinforcedStone, "stone", 2, true);
Block.setDestroyLevel("reinforcedStone", 2);


IDRegistry.genBlockID("reinforcedGlass");
Block.createBlock("reinforcedGlass", [
	{name: "Reinforced Glass", texture: [["reinforced_glass", 0]], inCreative: true}
], "reinforced_glass");
ToolAPI.registerBlockMaterial(BlockID.reinforcedGlass, "stone", 2, true);
Block.setDestroyLevel("reinforcedGlass", 2);





IDRegistry.genBlockID("reinforcedDoorBtm");
Block.createBlock("reinforcedDoorBtm", [
	{name: "tile.reinforcedDoorBtm.name", texture: [["alloy_door_bottom", 0]], inCreative: false},
	{name: "tile.reinforcedDoorBtm.name", texture: [["alloy_door_bottom", 0]], inCreative: false},
	{name: "tile.reinforcedDoorBtm.name", texture: [["alloy_door_bottom", 0]], inCreative: false},
	{name: "tile.reinforcedDoorBtm.name", texture: [["alloy_door_bottom", 0]], inCreative: false}
]);

Block.setBlockShape(BlockID.reinforcedDoorBtm, {x: 0, y: 0, z: 13/16}, {x: 1, y: 1, z: 1}, 0);
Block.setBlockShape(BlockID.reinforcedDoorBtm, {x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 3/16}, 1);
Block.setBlockShape(BlockID.reinforcedDoorBtm, {x: 13/16, y: 0, z: 0}, {x: 1, y: 1, z: 1}, 2);
Block.setBlockShape(BlockID.reinforcedDoorBtm, {x: 0, y: 0, z: 0}, {x: 3/16, y: 1, z: 1}, 3);


IDRegistry.genBlockID("reinforcedDoorTop");
Block.createBlock("reinforcedDoorTop", [
	{name: "tile.reinforcedDoorTop.name", texture: [["alloy_door_top", 0]], inCreative: false},
	{name: "tile.reinforcedDoorTop.name", texture: [["alloy_door_top", 0]], inCreative: false},
	{name: "tile.reinforcedDoorTop.name", texture: [["alloy_door_top", 0]], inCreative: false},
	{name: "tile.reinforcedDoorTop.name", texture: [["alloy_door_top", 0]], inCreative: false}
]);

Block.setBlockShape(BlockID.reinforcedDoorTop, {x: 0, y: 0, z: 13/16}, {x: 1, y: 1, z: 1}, 0);
Block.setBlockShape(BlockID.reinforcedDoorTop, {x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 3/16}, 1);
Block.setBlockShape(BlockID.reinforcedDoorTop, {x: 13/16, y: 0, z: 0}, {x: 1, y: 1, z: 1}, 2);
Block.setBlockShape(BlockID.reinforcedDoorTop, {x: 0, y: 0, z: 0}, {x: 3/16, y: 1, z: 1}, 3);



IDRegistry.genItemID("reinforcedDoorItem");
Item.createItem("reinforcedDoorItem", "Reinforced Door", {name: "reinforced_door", data: 0});

Translation.addTranslation("Reinforced door", {ru: "Укрепленная дверь"});


Block.registerDropFunction("reinforcedDoorBtm", function(coords, blockID, blockData, level, enchant){
	return [[ItemID.reinforcedDoorItem, 1, 0]];
});

Block.registerDropFunction("reinforcedDoorTop", function(coords, blockID, blockData, level, enchant){
	return [[ItemID.reinforcedDoorItem, 1, 0]];
});

Callback.addCallback("ItemUse",function(coords, item, block){
	if(item.id == ItemID.reinforcedDoorItem && coords.side == 1){
		World.setBlock(coords.x, coords.y + 1, coords.z, BlockID.reinforcedDoorBtm, 0);
		World.setBlock(coords.x, coords.y + 2, coords.z, BlockID.reinforcedDoorTop, 0);
	}
});
 

Callback.addCallback("DestroyBlock",function(coords, block, player){
	if(block.id == BlockID.reinforcedDoorBtm && World.getBlockID(coords.x, coords.y + 1, coords.z) == BlockID.reinforcedDoorTop){
		World.destroyBlock(coords.x, coords.y + 1, coords.z, 0);
	}
	
	if(block.id == BlockID.reinforcedDoorTop && World.getBlockID(coords.x, coords.y - 1, coords.z) == BlockID.reinforcedDoorBtm){
		World.destroyBlock(coords.x, coords.y - 1, coords.z, 0); 
	}
	
	if(World.getBlockID(coords.x, coords.y + 1, coords.z) == BlockID.reinforcedDoorBtm && World.getBlockID(coords.x, coords.y + 2, coords.z) == BlockID.reinforcedDoorTop){
		World.destroyBlock (coords.x, coords.y + 1, coords.z, 0); 
		World.destroyBlock (coords.x, coords.y + 2, coords.z, 0);
		World.drop(coords.x + 0.5, coords.y + 1, coords.z + 0.5, ItemID.reinforcedDoorItem, 1, 0);
	}
});




// file: block/rubber_tree.js

function destroyLeaves(x, y, z){
	var max = 0;
	while(World.getBlockID(x, y+max+1, z)==BlockID.rubberTreeLeaves){max++;}
	for(var yy = y; yy <= y+max; yy++){
		for(var xx = x-2; xx <= x+2; xx++){
			for(var zz = z-2; zz <= z+2; zz++){
				if(World.getBlockID(xx, yy, zz)==BlockID.rubberTreeLeaves){
					if(Math.random() < .075){
						World.drop(xx, yy, zz, ItemID.rubberSapling, 1, 0);
					}
					World.setBlock(xx, yy, zz, 0);
				}
			}
		}
	}
}

IDRegistry.genBlockID("rubberTreeLog");
Block.createBlock("rubberTreeLog", [
	{name: "Rubber Tree Log", texture: [["rubber_tree_log", 1], ["rubber_tree_log", 1], ["rubber_tree_log", 0], ["rubber_tree_log", 0], ["rubber_tree_log", 0], ["rubber_tree_log", 0]], inCreative: true}
], "opaque");
Block.registerDropFunction("rubberTreeLog", function(coords, blockID){
	destroyLeaves(coords.x, coords.y, coords.z);
	return [[blockID, 1, 0]];
});
Block.setDestroyTime(BlockID.rubberTreeLog, 0.4);
ToolAPI.registerBlockMaterial(BlockID.rubberTreeLog, "wood");

IDRegistry.genBlockID("rubberTreeLogLatex");
Block.createBlock("rubberTreeLogLatex", [
	{name: "tile.rubberTreeLog.name", texture: [["rubber_tree_log", 1], ["rubber_tree_log", 1], ["rubber_tree_log", 0], ["rubber_tree_log", 0], ["rubber_tree_log", 0], ["rubber_tree_log", 0]], inCreative: false},
	{name: "tile.rubberTreeLogLatex.name", texture: [["rubber_tree_log", 1], ["rubber_tree_log", 1], ["rubber_tree_log", 2], ["rubber_tree_log", 0], ["rubber_tree_log", 0], ["rubber_tree_log", 0]], inCreative: false},
	{name: "tile.rubberTreeLogLatex.name", texture: [["rubber_tree_log", 1], ["rubber_tree_log", 1], ["rubber_tree_log", 0], ["rubber_tree_log", 2], ["rubber_tree_log", 0], ["rubber_tree_log", 0]], inCreative: false},
	{name: "tile.rubberTreeLogLatex.name", texture: [["rubber_tree_log", 1], ["rubber_tree_log", 1], ["rubber_tree_log", 0], ["rubber_tree_log", 0], ["rubber_tree_log", 2], ["rubber_tree_log", 0]], inCreative: false},
	{name: "tile.rubberTreeLogLatex.name", texture: [["rubber_tree_log", 1], ["rubber_tree_log", 1], ["rubber_tree_log", 0], ["rubber_tree_log", 0], ["rubber_tree_log", 0], ["rubber_tree_log", 2]], inCreative: false}
], "opaque");
Block.registerDropFunction("rubberTreeLogLatex", function(coords, blockID){
	destroyLeaves(coords.x, coords.y, coords.z);
	return [[BlockID.rubberTreeLog, 1, 0], [ItemID.latex, 1, 0]];
});
Block.setDestroyTime(BlockID.rubberTreeLogLatex, 0.4);
ToolAPI.registerBlockMaterial(BlockID.rubberTreeLogLatex, "wood");
Block.setRandomTickCallback(BlockID.rubberTreeLogLatex, function(x, y, z, id, data){
	if(data==0 && Math.random() < 0.1){
		World.setBlock(x, y, z, id, parseInt(Math.random()*4 + 1));
	}
});


IDRegistry.genBlockID("rubberTreeLeaves");
Block.createBlock("rubberTreeLeaves", [
	{name: "Rubber Tree Leaves", texture: [["rubber_tree_leaves", 0]], inCreative: true}
]);
Block.registerDropFunction("rubberTreeLeaves", function(){
	if(Math.random() < .05){
		return [[ItemID.rubberSapling, 1, 0]]
	}
	else {
		return [];
	}
});
Block.setDestroyTime(BlockID.rubberTreeLeaves, 0.2);
ToolAPI.registerBlockMaterial(BlockID.rubberTreeLeaves, "plant");


IDRegistry.genBlockID("rubberTreePlanks"); 
Block.createBlock("rubberTreePlanks", [
	{name: "Rubber Tree Planks", texture: [["planks_hevea", 0]], inCreative: true}
], "opaque");


Block.setDestroyTime(BlockID.rubberTreePlanks, 3);
ToolAPI.registerBlockMaterial(BlockID.rubberTreePlanks, "wood");



var RubberTreeGenerationHelper = {
	
	generateCustomTree: function(x, y, z, params){
		var leaves = params.leaves;
		var log = params.log;
		
		var height = parseInt(Math.random() * (0.5 + params.height.max - params.height.min) + params.height.min);
		var resinHeight = -1;
		if(log.resin){
			resinHeight = parseInt(Math.random() * (height - 2)) + 1;
		}
		for(var ys = 0; ys < height; ys++){
			if(ys == resinHeight){
				World.setBlock(x, y + ys, z, log.resin, parseInt(Math.random()*4));
			}
			else{
				World.setFullBlock(x, y + ys, z, log);
			}
		}
		if(params.pike){
			for(var ys = 0; ys < params.pike; ys++){
				World.setFullBlock(x, y + ys + height, z, leaves);
			}
		}
		
		var leavesStart = params.height.start;
		var leavesEnd = height;
		var leavesMiddle = (leavesEnd + leavesStart) / 2;
		var leavesLen = leavesEnd - leavesStart;
		for(var ys = leavesStart; ys < leavesEnd; ys++){
			for(var xs = - params.radius; xs <= params.radius; xs++) {
				for(var zs = - params.radius; zs <= params.radius; zs++) {
					var d = Math.sqrt(xs * xs + zs * zs) + (Math.random() * 0.5 + 0.5) * Math.pow(Math.abs(leavesMiddle - ys) / leavesLen, 1.5) * 1.2;
					var blockID = World.getBlockID(x + xs, y + ys, z + zs);
					if(d <= params.radius + 0.5 && (blockID == 0 || blockID == 106)){
						World.setFullBlock(x + xs, y + ys, z + zs, leaves);
					}
				}
			}
		}
	},

	generateRubberTree: function(x, y, z, activateTileEntity){
		RubberTreeGenerationHelper.generateCustomTree(x, y, z, {
			log: {
				id: BlockID.rubberTreeLog,
				data: 0,
				resin: BlockID.rubberTreeLogLatex
			},
			leaves: {
				id: BlockID.rubberTreeLeaves,
				data: 0
			},
			height: {
				min: 5,
				max: 7,
				start: 2 + parseInt(Math.random() * 2)
			},
			pike: 2 + parseInt(Math.random() * 1.5),
			radius: 2
		});
		if(activateTileEntity){
			return World.addTileEntity(x, y, z);
		}
	}
}




// file: block/siren.js

﻿IDRegistry.genBlockID("siren"); 
Block.createBlock("siren", [
	{name: "Siren", texture: [["siren", 0]], inCreative: true}
], "opaque");

ToolAPI.registerBlockMaterial(BlockID.siren, "stone");
Block.setDestroyTime(BlockID.siren, 5);
Block.setDestroyLevel("siren", 2);


Machine.registryPrototype(BlockID.siren, {
 
});




// file: block/toaster.js

IDRegistry.genBlockID("toaster"); 
Block.createBlockWithRotation("toaster", [
	{name: "Toaster", texture: [["toaster_side", 0], ["toaster_top", 0], ["toaster_side", 0], ["toaster_side", 0], ["toaster_side", 0], ["toaster_side", 0]], inCreative: true}
], "opaque");

ToolAPI.registerBlockMaterial(BlockID.toaster, "stone", 4);


Callback.addCallback("ItemUse", function(coords, item, block){
	if(block.id == BlockID.toaster){
		World.drop(coords.x + 0.75, coords.y + 1, coords.z + 0.5, 297, 1, 0);
		World.drop(coords.x + 0.25, coords.y + 1, coords.z + 0.5, 297, 1, 0);
}}); 


Callback.addCallback("DestroyBlockStart", function (coords, block, player) {
	if(block.id == BlockID.toaster && Entity.getSneaking(Player.get()) == true){
		World.destroyBlock(coords.x, coords.y, coords.z, true) 
	}
});




// file: machine/generator/coal_generator.js

IDRegistry.genBlockID("coalGenerator");
Block.createBlockWithRotation("coalGenerator", [
	{name: "Coal Generator", texture: [["machine", 0], ["machine", 0], ["machine", 0], ["coal_generator", 0], ["machine", 0], ["machine", 0]], inCreative: true}
]);

var guiCoalGenerator = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Coal Generator"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "bitmap", x: 540, y: 135, bitmap: "energy_bar_background", scale: GUI_SCALE},
		{type: "bitmap", x: 445, y: 150, bitmap: "fire_background", scale: GUI_SCALE},
	],
	
	elements: {
		"energyScale": {type: "scale", x: 540 + GUI_SCALE * 4, y: 146, direction: 0, value: 0.5, bitmap: "energy_bar_scale", scale: GUI_SCALE},
		"burningScale": {type: "scale", x: 445, y: 150, direction: 1, value: 0.5, bitmap: "fire_scale", scale: GUI_SCALE},
		"slotEnergy": {type: "slot", x: 440, y: 75, isValid: function(id){return ChargeItemRegistry.isValidItem(id, "Eu", 0);}},
		"slotFuel": {type: "slot", x: 440, y: 210},
		"textInfo1": {type: "text", x: 580, y: 195, width: 300, height: 30, text: "0/5000"}
	}
});


Machine.registryPrototype(BlockID.coalGenerator, {
    defaultValues: {
		burn: 0,
		burnMax: 0,
		isActive: false
	},
    
	getGuiScreen: function(){
		return guiCoalGenerator;
	},
	
	getTransportSlots: function(){
		return {input: ["slotFuel"]};
	},
	
	getFuel: function(slotName){
		var fuelSlot = this.container.getSlot(slotName);
		if (fuelSlot.id > 0){
			var burn = Recipes.getFuelBurnDuration(fuelSlot.id, fuelSlot.data);
			if (burn && !LiquidRegistry.getItemLiquid(fuelSlot.id, fuelSlot.data)){
				fuelSlot.count--;
				this.container.validateSlot(slotName);
				this.activate();
				return burn;
			}
		}
		this.deactivate();
		return 0;
	},
	
	tick: function(){
		var energyStorage = this.getEnergyStorage();
		
		if(this.data.burn <= 0){
			this.data.burn = this.data.burnMax = this.getFuel("slotFuel") / 4;
		}
		if(this.data.burn > 0 && this.data.energy < energyStorage){
			this.data.energy = Math.min(this.data.energy + 2, energyStorage);
			this.data.burn--;
		}
		
		this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slotEnergy"), "Eu", this.data.energy, 32, 0);
		
		this.container.setScale("burningScale", this.data.burn / this.data.burnMax || 0);
		this.container.setScale("energyScale", this.data.energy / energyStorage);
		this.container.setText("textInfo1", this.data.energy + "/" + energyStorage);
	},
	
	isGenerator: function() {
		return true;
	},
	
	getEnergyStorage: function(){
		return 5000;
	},
	
	energyTick: function(type, src){
		var output = Math.min(16, this.data.energy);
		this.data.energy += src.add(output) - output;
	},
	
	init: Machine.initModel,
	activate: Machine.activateMachine,
	deactivate: Machine.deactivateMachine,
	destroy: this.deactivate,
});




// file: machine/generator/generator.js

IDRegistry.genBlockID("generator");
Block.createBlockWithRotation("generator", [
	{name: "Generator", texture: [["generator_btm", 0], ["generator_top", 0], ["generator_back", 0], ["generator_front", 0], ["generator_side", 0], ["generator_side", 0]], inCreative: true}
]);


//Render

var generatorRender = new ICRender.Model();
BlockRenderer.setStaticICRender (BlockID.generator, -1, generatorRender);

var generatorModel = BlockRenderer.createModel();

generatorModel.addBox (1/16, 0, 1/16, 15/16, 1/16, 2/16, BlockID.generator, 0);
generatorModel.addBox (1/16, 0, 14/16, 15/16, 1/16, 15/16, BlockID.generator, 0);
generatorModel.addBox (0/16, 1/16, 1/16, 2/16, 2/16, 2/16, BlockID.generator, 0);
generatorModel.addBox (14/16, 1/16, 1/16, 16/16, 2/16, 2/16, BlockID.generator, 0);
generatorModel.addBox (0/16, 1/16, 14/16, 2/16, 2/16, 15/16, BlockID.generator, 0);
generatorModel.addBox (14/16, 1/16, 14/16, 16/16, 2/16, 15/16, BlockID.generator, 0);
generatorModel.addBox (0/16, 1/16, 1/16, 1/16, 15/16, 2/16, BlockID.generator, 0);
generatorModel.addBox (15/16, 1/16, 1/16, 16/16, 15/16, 2/16, BlockID.generator, 0);
generatorModel.addBox (0/16, 1/16, 14/16, 1/16, 15/16, 15/16, BlockID.generator, 0);
generatorModel.addBox (15/16, 1/16, 14/16, 16/16, 15/16, 15/16, BlockID.generator, 0);
generatorModel.addBox (0/16, 14/16, 1/16, 1/16, 15/16, 3/16, BlockID.generator, 0);
generatorModel.addBox (15/16, 14/16, 1/16, 16/16, 15/16, 3/16, BlockID.generator, 0);
generatorModel.addBox (0/16, 14/16, 13/16, 1/16, 15/16, 15/16, BlockID.generator, 0);
generatorModel.addBox (15/16, 14/16, 13/16, 16/16, 15/16, 15/16, BlockID.generator, 0);
generatorModel.addBox (0/16, 15/16, 2/16, 1/16, 16/16, 14/16, BlockID.generator, 0);
generatorModel.addBox (15/16, 15/16, 2/16, 16/16, 16/16, 14/16, BlockID.generator, 0);
generatorModel.addBox (2/16, 14/16, 3/16, 14/16, 15/16, 13/16, BlockID.generator, 0);
generatorModel.addBox (1/16, 9/16, 2/16, 15/16, 14/16, 14/16, BlockID.generator, 0);
generatorModel.addBox (1/16, 8/16, 2/16, 15/16, 9/16, 6/16, BlockID.generator, 0);
generatorModel.addBox (1/16, 8/16, 10/16, 15/16, 9/16, 14/16, BlockID.generator, 0);
generatorModel.addBox (1/16, 4/16, 2/16, 15/16, 8/16, 3/16, BlockID.generator, 0);
generatorModel.addBox (2/16, 8/16, 6/16, 14/16, 9/16, 10/16, BlockID.generator, 0);
generatorModel.addBox (2/16, 7/16, 5/16, 14/16, 8/16, 11/16, BlockID.generator, 0);
generatorModel.addBox (2/16, 3/16, 4/16, 14/16, 7/16, 12/16, BlockID.generator, 0);
generatorModel.addBox (2/16, 2/16, 5/16, 14/16, 3/16, 11/16, BlockID.generator, 0);
generatorModel.addBox (2/16, 1/16, 6/16, 14/16, 2/16, 10/16, BlockID.generator, 0);

generatorRender.addEntry(generatorModel);

Block.setBlockShape(BlockID.generator, {x: 0.0001, y: 0.0001, z: 0.0001}, {x: 0.9999, y: 0.9999, z: 0.9999});



var guiGenerator = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Generator"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "bitmap", x: 540, y: 135, bitmap: "energy_bar_background", scale: GUI_SCALE},
		{type: "bitmap", x: 450, y: 150, bitmap: "fire_background", scale: GUI_SCALE},
	],
	
	elements: {
		"energyScale": {type: "scale", x: 540 + GUI_SCALE * 4, y: 145, direction: 0, value: 0.5, bitmap: "energy_bar_scale", scale: GUI_SCALE},
		"burningScale": {type: "scale", x: 450, y: 150, direction: 1, value: 0.5, bitmap: "fire_scale", scale: GUI_SCALE},
		"slotEnergy": {type: "slot", x: 440, y: 75, isValid: function(id){return ChargeItemRegistry.isValidItem(id, "Eu", 0);}},
		"slotFuel": {type: "slot", x: 440, y: 210},
		"textInfo1": {type: "text", x: 565, y: 195, width: 300, height: 30, text: "0/10000"}
	}
});


Machine.registryPrototype(BlockID.generator, {
    defaultValues: {
		burn: 0,
		burnMax: 0,
		isActive: false
	},
    
	getGuiScreen: function(){
		return guiGenerator;
	},
	
	getTransportSlots: function(){
		return {input: ["slotFuel"]};
	},
	
	getFuel: function(slotName){
		var fuelSlot = this.container.getSlot(slotName);
		if (fuelSlot.id > 0){
			var burn = Recipes.getFuelBurnDuration(fuelSlot.id, fuelSlot.data);
			if (burn && !LiquidRegistry.getItemLiquid(fuelSlot.id, fuelSlot.data)){
				fuelSlot.count--;
				this.container.validateSlot(slotName);
				this.activate();
				return burn;
			}
		}
		this.deactivate();
		return 0;
	},
	
	tick: function(){
		var energyStorage = this.getEnergyStorage();
		
		if(this.data.burn <= 0){
			this.data.burn = this.data.burnMax = this.getFuel("slotFuel") / 4;
		}
		if(this.data.burn > 0 && this.data.energy < energyStorage){
			this.data.energy = Math.min(this.data.energy + 10, energyStorage);
			this.data.burn--;
		}
		
		this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slotEnergy"), "Eu", this.data.energy, 64, 0);
		
		this.container.setScale("burningScale", this.data.burn / this.data.burnMax || 0);
		this.container.setScale("energyScale", this.data.energy / energyStorage);
		this.container.setText("textInfo1", this.data.energy + "/" + energyStorage);
	},
	
	isGenerator: function() {
		return true;
	},
	
	getEnergyStorage: function(){
		return 10000;
	},
	
	energyTick: function(type, src){
		var output = Math.min(32, this.data.energy);
		this.data.energy += src.add(output) - output;
	},
	
	init: Machine.initModel,
	activate: Machine.activateMachine,
	deactivate: Machine.deactivateMachine,
	destroy: this.deactivate,
});




// file: machine/generator/solar.js

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




// file: machine/misc/fast_travel.js

IDRegistry.genBlockID("fastTravel");
Block.createBlock("fastTravel", [
	{name: "Fast Travel", texture: [["fast_travel_bottom", 0], ["fast_travel", 0], ["fast_travel_side", 0], ["fast_travel_side", 0], ["fast_travel_side", 0], ["fast_travel_side", 0]], inCreative: true},
], "opaque");


Machine.registryPrototype(BlockID.fastTravel, {
 
});




// file: machine/misc/sapling.js

var xRender = {
		setSaplingRender:function(id,x){
		Block.setBlockShape(id, {x: 0, y: 0, z: 0},{x: 1, y: 0.001, z: 1});
		BlockRenderer.addRenderCallback(id, function(api, coords,block) {
			if(x!=0) {
				for(var i = 0;i < 1/x;i+=x){
				api.renderBoxId(coords.x, coords.y, coords.z,0+i, 0.01, 0+i, x+i, 0.99, x+i,id, block.data);
				api.renderBoxId(coords.x, coords.y, coords.z,(1-x)-i, 0.01, 0+i,1-i, 0.99, x+i,id, block.data);
				}
			}
			else{
				api.renderBoxId(coords.x, coords.y, coords.z, 0.4999, 0.01, 0, 0.5, 0.99, 1,id, block.data);
				api.renderBoxId(coords.x, coords.y, coords.z, 0, 0.01, 0.4999, 1, 0.99, 0.5, id, block.data);
			}
		})
		BlockRenderer.enableCustomRender(id);
	}
};

var RUBBER_SAPLING_GROUND_TILES = {
	2: true,
	3: true,
	60: true
};

IDRegistry.genItemID("rubberSapling");
Item.createItem("rubberSapling", "Rubber Tree Sapling", {name: "rubber_sapling", data: 0});

Item.registerUseFunction("rubberSapling", function(coords, item, tile){
	var place = coords.relative;
	var tile1 = World.getBlock(place.x, place.y, place.z);
	var tile2 = World.getBlock(place.x, place.y - 1, place.z);
	
	if (GenerationUtils.isTransparentBlock(tile1.id) && RUBBER_SAPLING_GROUND_TILES[tile2.id]){
		World.setBlock(place.x, place.y, place.z, BlockID.rubberTreeSapling);
		World.addTileEntity(place.x, place.y, place.z);
		Player.setCarriedItem(item.id, item.count - 1, item.data);
	}
});

IDRegistry.genBlockID("rubberTreeSapling");
Block.createBlock("rubberTreeSapling", [
	{name: "Rubber Tree Sapling", texture: [["rubber_sapling", 0]], inCreative: false}
]);

ToolAPI.registerBlockMaterial(BlockID.rubberTreeSapling, "plant");
xRender.setSaplingRender(BlockID.rubberTreeSapling, 0);

Block.registerDropFunction("rubberTreeSapling", function(){
	return [[ItemID.rubberSapling, 1, 0]];
});



TileEntity.registerPrototype(BlockID.rubberTreeSapling, {
	click: function(id, count, data){
		if (id == 351 && data == 15){
			Player.setCarriedItem(id, count - 1, data);
			this.selfDestroy();
			RubberTreeGenerationHelper.generateRubberTree(this.x, this.y, this.z, true);
		}
	},
});



TileEntity.registerPrototype(BlockID.rubberTreeLog, {	
	addLatex: function(){
		var possibleYs = [];
		var checkY = this.y + 1;
		while (true){
			var block = World.getBlock(this.x, checkY, this.z);
			if (block.id == BlockID.rubberTreeLog){
				possibleYs.push(checkY);
			}
			else if (block.id != BlockID.rubberTreeLogLatex){
				break;
			}
			checkY++;
		}
		
		var randomY = possibleYs[parseInt(Math.random() * possibleYs.length)];
		World.setBlock(this.x, randomY, this.z, BlockID.rubberTreeLogLatex, parseInt(Math.random() * 4));
	},
	
	checkLog: function(){
		var block = World.getBlock(this.x, this.y - 1, this.z);
		if (block.id == BlockID.rubberTreeLog || block.id == BlockID.rubberTreeLogLatex){
			this.selfDestroy();
		}
	},
	
	tick: function(){
		if (World.getThreadTime() % 100 == 0){
			if (Math.random() < .125){
				this.addLatex();
			}
			this.checkLog();
		}
	}
});





// file: machine/processing/compressor.js

IDRegistry.genBlockID("compressor");
Block.createBlockWithRotation("compressor", [
	{name: "Compressor", texture: [["machine", 0], ["machine", 0], ["machine", 0], ["compressor", 0], ["machine", 0], ["machine", 0]], inCreative: true}
], "opaque");
/*
MachineRenderer.setStandartModel(BlockID.compressor, [["machine_bottom", 0], ["machine_top", 0], ["machine_side", 0], ["compressor", 0], ["machine_side", 0], ["machine_side", 0]], true);
MachineRenderer.registerModelWithRotation(BlockID.compressor, [["machine_bottom", 0], ["machine_top", 0], ["machine_side", 0], ["compressor", 1], ["machine_side", 0], ["machine_side", 0]]);
*/

/*
Callback.addCallback("PreLoaded", function(){
	MachineRecipeRegistry.registerRecipesFor("compressor", {
		// Items
		"ItemID.dustEnergium": {id: ItemID.storageCrystal, count: 1, data: Item.getMaxDamage(ItemID.storageCrystal), ingredientCount: 9},
		"ItemID.dustLapis": {id: ItemID.plateLapis, count: 1, data: 0},
		"ItemID.ingotAlloy": {id: ItemID.plateAlloy, count: 1, data: 0},
		"ItemID.carbonMesh": {id: ItemID.carbonPlate, count: 1, data: 0},
		"ItemID.coalBall": {id: ItemID.coalBlock, count: 1, data: 0},
		"ItemID.coalChunk": {id: 264, count: 1, data: 0},
		"ItemID.cellEmpty": {id: ItemID.cellAir, count: 1, data: 0},
		
		// Blocks
		265: {id: 42, count: 1, data: 0, ingredientCount: 9},
		266: {id: 41, count: 1, data: 0, ingredientCount: 9},
		"ItemID.ingotCopper": {id: BlockID.blockCopper, count: 1, data: 0, ingredientCount: 9},
		"ItemID.ingotTin": {id: BlockID.blockTin, count: 1, data: 0, ingredientCount: 9},
		"ItemID.ingotLead": {id: BlockID.blockLead, count: 1, data: 0, ingredientCount: 9},
		"ItemID.ingotSteel": {id: BlockID.blockSteel, count: 1, data: 0, ingredientCount: 9},
		"ItemID.ingotBronze": {id: BlockID.blockBronze, count: 1, data: 0, ingredientCount: 9},
		80: {id: 79, count: 1, data: 0},
		12: {id: 24, count: 1, data: 0, ingredientCount: 4},
		336: {id: 45, count: 1, data: 0, ingredientCount: 4},
		405: {id: 112, count: 1, data: 0, ingredientCount: 4},
		348: {id: 89, count: 1, data: 0, ingredientCount: 4},
		406: {id: 155, count: 1, data: 0, ingredientCount: 4},
		331: {id: 152, count: 1, data: 0, ingredientCount: 9},
		"351:4": {id: 22, count: 1, data: 0, ingredientCount: 9},
		//264: {id: 57, count: 1, data: 0, ingredientCount: 9},
		//388: {id: 133, count: 1, data: 0, ingredientCount: 9},
	}, true);
});*/


var guiCompressor = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Compressor"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "bitmap", x: 530, y: 170, bitmap: "compressor_bar_background", scale: GUI_SCALE},
		{type: "bitmap", x: 540, y: 172, bitmap: "fire_background", scale: GUI_SCALE}
		],
	
	elements: {
		"progressScale": {type: "scale", x: 530, y: 170, direction: 0, value: 0, bitmap: "compressor_bar_scale", scale: GUI_SCALE},
		"burningScale": {type: "scale", x: 540, y: 172, direction: 1, bitmap: "fire_scale", scale: GUI_SCALE},
  
  "slotSource": {type: "slot", x: 445, y: 210},
  "slotEnergy": {type: "slot", x: 535, y: 105, isValid: Machine.isValidEUStorage},
  "slotResult": {type: "slot", x: 735, y: 210},
		}
});

TileEntity.registerPrototype(BlockID.compressor, {
	/*defaultValues: {
		power_tier: 0,
		energy_storage: 1200,
		energy_consumption: 2,
		work_time: 400,
		progress: 0,
		isActive: false
	},*/
	
	getGuiScreen: function(){
		return guiCompressor;
	},
		/*
	getTransportSlots: function(){
		return {input: ["slotSource"], output: ["slotResult"]};
	},
	
	setDefaultValues: function(){
		this.data.energy_storage = this.defaultValues.energy_storage;
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.work_time = this.defaultValues.work_time;
	},
	
	tick: function(){
		this.setDefaultValues();
		UpgradeAPI.executeUpgrades(this);
		
		var sourceSlot = this.container.getSlot("slotSource");
		var result = MachineRecipeRegistry.getRecipeResult("compressor", sourceSlot.id, sourceSlot.data);
		if(result && (sourceSlot.count >= result.ingredientCount || !result.ingredientCount)){
			var resultSlot = this.container.getSlot("slotResult");
			if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count <= Item.getMaxStack(result.id) - result.count || resultSlot.id == 0){
				if(this.data.energy >= this.data.energy_consumption){
					this.data.energy -= this.data.energy_consumption;
					this.data.progress += 1/this.data.work_time;
					this.activate();
				}
				else{
					this.deactivate();
				}
				if(this.data.progress >= 1){
					sourceSlot.count -= result.ingredientCount || 1;
					resultSlot.id = result.id;
					resultSlot.data = result.data;
					resultSlot.count += result.count;
					this.container.validateAll();
					this.data.progress = 0;
				}
			}else{
				this.deactivate();
			}
		}
		else {
			this.data.progress = 0;
			this.deactivate();
		}
		
		var energyStorage = this.getEnergyStorage();
		var tier = this.data.power_tier;
		this.data.energy = Math.min(this.data.energy, energyStorage);
		this.data.energy += ChargeItemRegistry.getEnergyFrom(this.container.getSlot("slotEnergy"), "Eu", energyStorage - this.data.energy, transferByTier[tier], tier);
		
		this.container.setScale("progressScale", this.data.progress);
		this.container.setScale("energyScale", this.data.energy / energyStorage);
	},
	
	getEnergyStorage: function(){
		return this.data.energy_storage;
	},
	
	init: MachineRegistry.initModel,
	activate: MachineRegistry.activateMachine,
	deactivate: MachineRegistry.deactivateMachine,
	destroy: this.deactivate,
	energyTick: MachineRegistry.basicEnergyReceiveFunc*/
});




// file: machine/processing/electric_compressor.js

IDRegistry.genBlockID("electricCompressor");
Block.createBlockWithRotation("electricCompressor", [
	{name: "Electric Compressor", texture: [["machine", 0], ["machine", 0], ["machine", 0], ["electric_compressor", 0], ["machine", 0], ["machine", 0]], inCreative: true}
], "opaque");
/*
MachineRenderer.setStandartModel(BlockID.electricCompressor, [["machine_bottom", 0], ["machine_top", 0], ["machine_side", 0], ["compressor", 0], ["machine_side", 0], ["machine_side", 0]], true);
MachineRenderer.registerModelWithRotation(BlockID.electricCompressor, [["machine_bottom", 0], ["machine_top", 0], ["machine_side", 0], ["compressor", 1], ["machine_side", 0], ["machine_side", 0]]);
*/

/*
Callback.addCallback("PreLoaded", function(){
	MachineRecipeRegistry.registerRecipesFor("compressor", {
		// Items
		"ItemID.dustEnergium": {id: ItemID.storageCrystal, count: 1, data: Item.getMaxDamage(ItemID.storageCrystal), ingredientCount: 9},
		"ItemID.dustLapis": {id: ItemID.plateLapis, count: 1, data: 0},
		"ItemID.ingotAlloy": {id: ItemID.plateAlloy, count: 1, data: 0},
		"ItemID.carbonMesh": {id: ItemID.carbonPlate, count: 1, data: 0},
		"ItemID.coalBall": {id: ItemID.coalBlock, count: 1, data: 0},
		"ItemID.coalChunk": {id: 264, count: 1, data: 0},
		"ItemID.cellEmpty": {id: ItemID.cellAir, count: 1, data: 0},
		
		// Blocks
		265: {id: 42, count: 1, data: 0, ingredientCount: 9},
		266: {id: 41, count: 1, data: 0, ingredientCount: 9},
		"ItemID.ingotCopper": {id: BlockID.blockCopper, count: 1, data: 0, ingredientCount: 9},
		"ItemID.ingotTin": {id: BlockID.blockTin, count: 1, data: 0, ingredientCount: 9},
		"ItemID.ingotLead": {id: BlockID.blockLead, count: 1, data: 0, ingredientCount: 9},
		"ItemID.ingotSteel": {id: BlockID.blockSteel, count: 1, data: 0, ingredientCount: 9},
		"ItemID.ingotBronze": {id: BlockID.blockBronze, count: 1, data: 0, ingredientCount: 9},
		80: {id: 79, count: 1, data: 0},
		12: {id: 24, count: 1, data: 0, ingredientCount: 4},
		336: {id: 45, count: 1, data: 0, ingredientCount: 4},
		405: {id: 112, count: 1, data: 0, ingredientCount: 4},
		348: {id: 89, count: 1, data: 0, ingredientCount: 4},
		406: {id: 155, count: 1, data: 0, ingredientCount: 4},
		331: {id: 152, count: 1, data: 0, ingredientCount: 9},
		"351:4": {id: 22, count: 1, data: 0, ingredientCount: 9},
		//264: {id: 57, count: 1, data: 0, ingredientCount: 9},
		//388: {id: 133, count: 1, data: 0, ingredientCount: 9},
	}, true);
});*/


var guiElectricCompressor = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Electric Compressor"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "bitmap", x: 530, y: 170, bitmap: "compressor_bar_background", scale: GUI_SCALE},
		{type: "bitmap", x: 540, y: 172, bitmap: "energy_small_background", scale: GUI_SCALE},
	],
	
	elements: {
		"progressScale": {type: "scale", x: 530, y: 170, direction: 0, value: 0, bitmap: "compressor_bar_scale", scale: GUI_SCALE},
		"energyScale": {type: "scale", x: 540, y: 172, direction: 1, value: 0, bitmap: "energy_small_scale", scale: GUI_SCALE},
  
  "slotSource": {type: "slot", x: 445, y: 210},
  "slotEnergy": {type: "slot", x: 535, y: 105, isValid: Machine.isValidEUStorage},
  "slotResult": {type: "slot", x: 735, y: 210},
		}
});

Machine.registryPrototype(BlockID.electricCompressor, {
	/*defaultValues: {
		power_tier: 0,
		energy_storage: 1200,
		energy_consumption: 2,
		work_time: 400,
		progress: 0,
		isActive: false
	},*/
	
	getGuiScreen: function(){
		return guiElectricCompressor;
	},
		/*
	getTransportSlots: function(){
		return {input: ["slotSource"], output: ["slotResult"]};
	},
	
	setDefaultValues: function(){
		this.data.energy_storage = this.defaultValues.energy_storage;
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.work_time = this.defaultValues.work_time;
	},
	
	tick: function(){
		this.setDefaultValues();
		UpgradeAPI.executeUpgrades(this);
		
		var sourceSlot = this.container.getSlot("slotSource");
		var result = MachineRecipeRegistry.getRecipeResult("compressor", sourceSlot.id, sourceSlot.data);
		if(result && (sourceSlot.count >= result.ingredientCount || !result.ingredientCount)){
			var resultSlot = this.container.getSlot("slotResult");
			if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count <= Item.getMaxStack(result.id) - result.count || resultSlot.id == 0){
				if(this.data.energy >= this.data.energy_consumption){
					this.data.energy -= this.data.energy_consumption;
					this.data.progress += 1/this.data.work_time;
					this.activate();
				}
				else{
					this.deactivate();
				}
				if(this.data.progress >= 1){
					sourceSlot.count -= result.ingredientCount || 1;
					resultSlot.id = result.id;
					resultSlot.data = result.data;
					resultSlot.count += result.count;
					this.container.validateAll();
					this.data.progress = 0;
				}
			}else{
				this.deactivate();
			}
		}
		else {
			this.data.progress = 0;
			this.deactivate();
		}
		
		var energyStorage = this.getEnergyStorage();
		var tier = this.data.power_tier;
		this.data.energy = Math.min(this.data.energy, energyStorage);
		this.data.energy += ChargeItemRegistry.getEnergyFrom(this.container.getSlot("slotEnergy"), "Eu", energyStorage - this.data.energy, transferByTier[tier], tier);
		
		this.container.setScale("progressScale", this.data.progress);
		this.container.setScale("energyScale", this.data.energy / energyStorage);
	},
	
	getEnergyStorage: function(){
		return this.data.energy_storage;
	},
	
	init: MachineRegistry.initModel,
	activate: MachineRegistry.activateMachine,
	deactivate: MachineRegistry.deactivateMachine,
	destroy: this.deactivate,
	energyTick: MachineRegistry.basicEnergyReceiveFunc*/
});




// file: machine/processing/electric_furnace.js

IDRegistry.genBlockID("electricFurnace");
Block.createBlockWithRotation("electricFurnace", [
	{name: "Electric Furnace", texture: [["machine", 0], ["machine", 0], ["machine", 0], ["electric_furnace", 0], ["machine", 0], ["machine", 0]], inCreative: true}
], "opaque");

var guiElectricFurnace = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Electric Furnace"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "bitmap", x: 525, y: 155, bitmap: "arrow_bar_background", scale: GUI_SCALE},
		{type: "bitmap", x: 445, y: 155, bitmap: "energy_small_background", scale: GUI_SCALE}
	],
	
	elements: {
		"progressScale": {type: "scale", x: 525, y: 155, direction: 0, value: 0.5, bitmap: "arrow_bar_scale", scale: GUI_SCALE},
		"energyScale": {type: "scale", x: 445, y: 155, direction: 1, value: 0.5, bitmap: "energy_small_scale", scale: GUI_SCALE},
        "slotSource": {type: "slot", x: 440, y: 80},
        "slotEnergy": {type: "slot", x: 440, y: 220, isValid: Machine.isValidEUStorage},
        "slotResult": {type: "slot", x: 625, y: 150},
	}
});

Machine.registryPrototype(BlockID.electricFurnace, {
	defaultValues: {
		power_tier: 0,
		energy_storage: 1000,
		energy_consumption: 3,
		work_time: 100,
		progress: 0,
		isActive: false
	},
	
	getGuiScreen: function(){
		return guiElectricFurnace;
	},
	
	getTransportSlots: function(){
		return {input: ["slotSource"], output: ["slotResult"]};
	},
	
	setDefaultValues: function(){
		this.data.energy_storage = this.defaultValues.energy_storage;
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.work_time = this.defaultValues.work_time;
	},
	
	tick: function(){
		this.setDefaultValues();
		UpgradeAPI.executeUpgrades(this);
		
		var sourceSlot = this.container.getSlot("slotSource");
		var resultSlot = this.container.getSlot("slotResult");
		var result = Recipes.getFurnaceRecipeResult(sourceSlot.id, "iron");
		if(result && (resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count < 64 || resultSlot.id == 0)){
			if(this.data.energy >= this.data.energy_consumption){
				this.data.energy -= this.data.energy_consumption;
				this.data.progress += 1/this.data.work_time;
				this.activate();
			}
			else{
				this.deactivate();
			}
			if(this.data.progress >= 1){
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
			this.deactivate();
		}
		
		var energyStorage = this.getEnergyStorage();
		var tier = this.data.power_tier;
		this.data.energy = Math.min(this.data.energy, energyStorage);
		this.data.energy += ChargeItemRegistry.getEnergyFrom(this.container.getSlot("slotEnergy"), "Eu", energyStorage - this.data.energy, transferByTier[tier], tier);
		
		this.container.setScale("progressScale", this.data.progress);
		this.container.setScale("energyScale", this.data.energy / energyStorage);
	},
	
	getEnergyStorage: function(){
		return this.data.energy_storage;
	},
	
	init: Machine.initModel,
	activate: Machine.activateMachine,
	deactivate: Machine.deactivateMachine,
	destroy: this.deactivate,
	energyTick: Machine.basicEnergyReceiveFunc
});




// file: machine/processing/gun_crafting_table.js

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




// file: machine/processing/nuclear_furnace.js

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




// file: machine/storage/advanced_power_storage.js

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




// file: machine/storage/power_storage.js

IDRegistry.genBlockID("powerStorage");
Block.createBlockWithRotation("powerStorage", [
	{name: "Power Storage (PS)", texture: [["ps_bottom", 0], ["ps_top", 0], ["ps_side", 0], ["ps_side", 0], ["ps_side", 0], ["ps_side", 0]], inCreative: true}
], "opaque");

Item.registerNameOverrideFunction(BlockID.powerStorage, function(item, name){
	item = Player.getCarriedItem();
	if(item.extra){
		var energyStored = item.extra.getInt("Eu");
		return name + "\n§7" + energyStored + "/" + 100000 + " Eu";
	}
	return name;
});

var guiPowerStorage = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Power Storage"}},
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
		"textInfo1": {type: "text", x: 552, y: 195, width: 300, height: 30, text: "0/100000"}
	}
});




Machine.registryPrototype(BlockID.powerStorage, {
	
	isStorage: true,
	
	getGuiScreen: function(){
		return guiPowerStorage;
	},
	
	tick: function(){
		var energyStorage = this.getEnergyStorage();
		this.container.setScale("energyScale", this.data.energy / energyStorage);
		this.container.setText("textInfo1", parseInt(this.data.energy) + "/" + energyStorage);
		
		var TRANSFER = transferByTier[0];
		this.data.energy += ChargeItemRegistry.getEnergyFrom(this.container.getSlot("slot2"), "Eu", energyStorage - this.data.energy, TRANSFER, 3);
		this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slot1"), "Eu", this.data.energy, TRANSFER, 3);
	},
	
	getEnergyStorage: function(){
		return 100000;
	},
	
	energyTick: function(type, src){
		var TRANSFER = 512;
		this.data.energy += src.storage(Math.min(TRANSFER*4, this.getEnergyStorage() - this.data.energy), Math.min(TRANSFER, this.data.energy));
	},
});




