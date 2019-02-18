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