/*/IDRegistry.genBlockID("archedLamp"); 
Block.createBlock("archedLamp", [
	{name: "tile.archedLamp.name", texture: [["lamp", 1]], inCreative: false}
], BLOCK_LIGHT);


function setupArchedLampRender(id, groupName, preventSelfAdd) {
    var render = new ICRender.Model();
    BlockRenderer.setStaticICRender(id, 0, render);
   
    var boxes = [
        {side: [1, 0, 0], box: [4/16, 0, 8/16, 12/16, 1, 1]},
        {side: [-1, 0, 0], box: [4/16, 0, 0, 12/16, 1, 8/16]},
        {side: [0, 0, 1], box: [8/16, 0, 4/16, 1, 1, 12/16]},
        {side: [0, 0, -1], box: [0, 0, 4/16, 8/16, 1,  12/16]},
    ]
   
    var group = ICRender.getGroup(groupName);
    if (!preventSelfAdd) {
        group.add(id, -1);
    }
   
    for (var i in boxes) {
        var box = boxes[i];
       
        var model = BlockRenderer.createModel();
        model.addBox(box.box[0], box.box[1], box.box[2], box.box[3],  id, 0);
       
        render.addEntry(model).asCondition(box.side[0], box.side[1], box.side[2], group, 0);
    }
}

setupArchedLampRender(BlockID.archedLamp, "lamp");


IDRegistry.genItemID("archedLampItem");
Item.createItem("archedLampItem", "Lamp", {name: "apple", data: 0});



Block.registerDropFunction("archedLamp", function(coords, blockID, blockData, level, enchant){
	return [[ItemID.archedLamp, 1, 0]];
});


Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.archedLamp, count: 1, data: 0}, ["www","wpw","www"], ['w', 35, -1, 'p', 368, 0]);
});



//Translations

Translation.addTranslation("Arched Lamp", {ru: "Арочная лампа"});



//Block.setBlockShape(BlockID.archedLamp, {x: 4/16, y: 8/16, z: 4/16}, {x: 12/16, y: 1, z: 12/16}, 0); //Низ
//Block.setBlockShape(BlockID.archedLamp, {x: 4/16, y: 0, z: 4/16}, {x: 12/16, y: 8/16, z: 12/16}, 1); //Вверх
//Block.setBlockShape(BlockID.archedLamp, {x: 4/16, y: 0, z: 8/16}, {x: 12/16, y: 1, z: 1}, 2);
//Block.setBlockShape(BlockID.archedLamp, {x: 4/16, y: 0, z: 0}, {x: 12/16, y: 1, z: 8/16}, 3); 
//Block.setBlockShape(BlockID.archedLamp, {x: 8/16, y: 0, z: 4/16}, {x: 1, y: 1, z: 12/16}, 4);
//Block.setBlockShape(BlockID.archedLamp, {x: 0, y: 0, z: 4/16}, {x: 8/16, y: 1, z: 12/16}, 5);
*/

