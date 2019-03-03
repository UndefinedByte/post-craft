IDRegistry.genItemID("leatherBound");
IDRegistry.genItemID("leatherTanned");

Item.createItem("leatherBound", "Bound Leather", { name: "leather_bound", data: 0 },{ stack: 64 });
Item.createItem("leatherTanned", "Tanned Leather", { name: "leather_tanned", data: 0 },{ stack: 64 });


IDRegistry.genItemID("backpack"); //27 slots
Item.createItem("backpack", "Backpack", { name: "backpack_small", data: 0 },{ stack: 1 });

BackpackRegistry.register(ItemID.backpack, {
    slots: 27,
    slotsCenter: true,
    inRow: 9
});



IDRegistry.genItemID("bigBackpack"); //54 slots
Item.createItem("bigBackpack", "Big Backpack", { name: "backpack_big", data: 0 },{ stack: 1 });

BackpackRegistry.register(ItemID.bigBackpack, {
    slots: 54,
    slotsCenter: true,
    inRow: 9
});


Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: ItemID.leatherBound, count: 1, data: 0}, ["ooo","sos","ooo"], ['o', 287, 0, 's', 334, 0]);
	Recipes.addFurnace(ItemID.leatherBound, ItemID.leatherTanned, 0);
	
	Recipes.addShaped({id: ItemID.backpack, count: 1, data: 0}, ["ooo","o o","ooo"], ['o', 334, 0]);
	Recipes.addShaped({id: ItemID.bigBackpack, count: 1, data: 0}, ["ooo","o o","ooo"], ['o', ItemID.leatherTanned, 0]);
});