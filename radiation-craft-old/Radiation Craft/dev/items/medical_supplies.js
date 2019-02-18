IDRegistry.genItemID("tablet");
IDRegistry.genItemID("expTablet");
//IDRegistry.genItemID("uzf");
//IDRegistry.genItemID("antiradin");
IDRegistry.genItemID("stimulant");
//IDRegistry.genItemID("blocker");


Item.createFoodItem("tablet", "Tablet", {name: "tablet", data: 1}, {food: 0});

Item.createFoodItem("expTablet", "Experimental tablet", {name: "tablet", data: 0}, {food: 0});

//Item.createFoodItem("uzf", "UnZombieFicator", {name: "tablet", data: 2}, {food: 0});

//Item.createFoodItem("antiradin", "Antiradin", {name: "antiradin", data: 0}, {food: 0});

Item.createFoodItem("stimulant", "Stimulant", {name: "stimulant", data: 0}, {food: 0, stack: 1});

//Item.createFoodItem("blocker", "Blocker", {name: "blocker", data: 0}, {food: 0,stack: 1});




Callback.addCallback("FoodEaten",function(heal, satRatio){
	var rEffect = randomInt(0, 1);
	
	if(Player.getCarriedItem().id == ItemID.tablet){
		Entity.setHealth(Player.get(), 20); 
	}
	
	if(Player.getCarriedItem().id == ItemID.expTablet && rEffect == 1){
		
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
	} else {
		if(Player.getCarriedItem().id == ItemID.expTablet && rEffect == 0){
			
			Entity.addEffect(Player.get(), MobEffect.blindness, 2, 200, false, false);
			Entity.addEffect(Player.get(), MobEffect.confusion, 2, 150, false, false);
		}
	
	/*if(Player.getCarriedItem().id == ItemID.uzf){
		ZDise = 0;
	}*/
	
	/*if(Player.getCarriedItem().id == 367){
		ZDise += 1;
	}*/
	
	if(Player.getCarriedItem().id == ItemID.stimulant){
		Entity.addEffect(Player.get(), MobEffect.damageBoost, 4, 1200, false, false);
		Entity.addEffect(Player.get(), MobEffect.digSpeed, 4, 1200, false, false);
		Entity.addEffect(Player.get(), MobEffect.jump, 4, 1200, false,false);
		Entity.addEffect(Player.get(), MobEffect.movementSpeed, 4, 1200, false, false);
	}}
}); 


Callback.addCallback("tick", function(){
	if(Player.getHunger() > 19 && Player.getCarriedItem().id == ItemID.tablet || Player.getCarriedItem().id == ItemID.expTablet || Player.getCarriedItem().id == ItemID.stimulant){
		Player.setHunger(19);
	}
});


//Translations


Translation.addTranslation("Tablet", {ru: "Таблетка"});
Translation.addTranslation("Experimental tablet", {ru: "Эксперементальная таблетка"});
Translation.addTranslation("UnZombieFicator", {ru: "UnZombieFicator"});
Translation.addTranslation("Antiradin", {ru: "Антирадин"});
Translation.addTranslation("Stimulant", {ru: "Стимулятор"});
Translation.addTranslation("Blocker", {ru: "Блокатор"});