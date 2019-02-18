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