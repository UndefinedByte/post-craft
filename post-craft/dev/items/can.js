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
