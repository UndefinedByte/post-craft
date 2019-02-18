/*IDRegistry.genBlockID("rabitz");
Block.createBlock("rabitz", [
	{name: "Rabitz", texture: [["chain", 0]], inCreative: true}
]);


function setRabitzRender(id, groupName, xsize, zsize) {
	
    var render = new ICRender.Model();
    BlockRenderer.setStaticICRender(id, 0, render);
	
    var boxes = [
        {side: [1, 0, 0], box: [xsize, 0, zsize, 1, 1, xsize]},
        {side: [-1, 0, 0], box: [0, 0, zsize, zsize, 1, xsize]},
        {side: [0, 0, 1], box: [zsize, 0, xsize, xsize, 1, 1]},
        {side: [0, 0, -1], box: [zsize, 0, 0, xsize, 1, zsize]},
    ];
	
    ICRender.getGroup(groupName).add(id, -1);
	
	for (var i in boxes) {
        var box = boxes[i]; 
        var model = BlockRenderer.createModel();
        model.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], id, 0);
        render.addEntry(model).asCondition(box.side[0], box.side[1], box.side[2], ICRender.getGroup(groupName), 0);
    }
    var model = BlockRenderer.createModel();
    render.addEntry(model);
}

setRabitzRender(BlockID.rabitz, "rabitz", 0.54, 0.46);





Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.rabitz, count: 1, data: 0}, ["xqx","qxq","xqx"], ['x', 265, 0]);
});


//Translation

Translation.addTranslation("Rabitz", {ru: "Сетка Рабица"});*/