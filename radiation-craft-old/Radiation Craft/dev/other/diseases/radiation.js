Callback.addCallback("tick",function(){
	
	var coords = Player.getPosition();
	var surface = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
		
	if((surface.y - coords.y) < 10 && (Player.getArmorSlot(0).id != ItemID.ProtectiveHelmet || Player.getArmorSlot(1).id != ItemID.ProtectiveChestplate || Player.getArmorSlot(2).id != ItemID.ProtectiveLeggings || Player.getArmorSlot(3).id != ItemID.ProtectiveBoots)) {
		
		Entity.damageEntity (Player.get(), 1); 
	} 	
});



//other/diseases/radiation.js
