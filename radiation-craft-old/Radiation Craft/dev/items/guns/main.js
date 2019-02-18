const GameMode = {
	SURVIVAL: 0,
	CREATIVE: 1
};

var ammoText;
var isReloading = false;
var reloadingGun;
var isAiming = false;
var isShooting = false;

const DEFAULT_FOV = 77;




var Gun = {
	
	createGun: function(gun){
		IDRegistry.genItemID(gun.id);
		Item.createItem(gun.id, gun.name, gun.texture,{isTech:false, stack:1});
		Item.setToolRender(gun.id, true);
		
		//Item.setMaxDamage(gun.id, gun.bullet.count);
	},
	
	getGun: function(item){
		for(var i in guns){
			if(typeof(item) == "number"){
				if(ItemID[guns[i].id] == item)return guns[i];
			}
				else{
					if(ItemID[guns[i].id] == item.id)return guns[i];
				}
		}
	
		return false;
	},
	
	isGun: function(item){
		for(var j in guns){
			if(typeof(item) == "number"){
				if(ItemID[guns[j].id] == item) return true;
			}
				else{
					if(ItemID[guns[j].id] == item.id) return true;
				}
		}
		return false;
	},
	
	startUp: function(){
		for(var g in guns){
			Gun.createGun(guns[g]);
		}
	},
	
	shoot: function(gun){
		var coords = Player.getPosition();
		var arrow = Entity.spawn(coords.x, coords.y, coords.z, EntityType.ARROW);
	
		Entity.moveToAngle(arrow, Entity.getLookAngle(Player.get()), {speed: 80});
		
		var a = Entity.getLookAngle(Player.get());
		Entity.setLookAngle(Player.get(), a.yaw, a.pitch + angleToRadian(3));
	}
	
	/*reloadUI: function(){
		var pi = Player.getCarriedItem();
		thisGunExtra = pi.extra;
		thisGunExtra.putInt('bullet', thisGunExtra.getInt('bullet') - 1);
		Player.setCarriedItem(pi.id, pi.count, pi.data, thisGunExtra);
	},
	
	reload: function(gun){
		var reloadText = "Reloading...";
		
		gunReloadSound.setOnCompletion(function(){
			
			var a = Player.getCarriedItem();
			a.extra.putInt('bullet', gun.bullet.count)
			Player.setCarriedItem(a.id, a.count, a.data, a.extra);
			GUI.run(function(){
				GUI.buttonReload.setText(gun.bullet.count+"/"+gun.bullet.count);
			});
		});
	}*/
}


Gun.startUp();


var oldItem = {id:0}, oldSlot = 0, currentScreen='null';
Callback.addCallback("NativeGuiChanged", function(a){
	switch (a) {
        case "play_screen - worlds":
            currentScreen = "not_in_game";
            break;
        case "hud_screen":
        case "in_game_play_screen":
            if (currentScreen != "not_in_game" && currentScreen != "hud_screen") {
                oldItem = {id:0};
            }
            currentScreen = "hud_screen";
            break;
        default:
			GUI.close();
            currentScreen = a;
			break;
    }
});

Callback.addCallback("tick", function(){
	if (currentScreen == "hud_screen" || currentScreen == "null") {
		if (Player.getCarriedItem().id != oldItem.id) {
			Callback.invokeCallback("ChangeCarriedItem", Player.getCarriedItem(), oldItem);
		} else {
			if (Player.getSelectedSlotId() != oldSlot) {
				Callback.invokeCallback("ChangeCarriedItem", Player.getCarriedItem(), oldItem);
			}
		}
		oldItem = Player.getCarriedItem();
		oldSlot = Player.getSelectedSlotId();
	}
});

Callback.addCallback("ChangeCarriedItem",function(n,o){
	if(!Gun.isGun(n) && Gun.isGun(o)){
		GUI.close();
	}
		else 
			if(Gun.isGun(n) && !Gun.isGun(o)){
				GUI.open(Gun.getGun(n));
			}
});


