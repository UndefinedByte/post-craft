//var mas = ["mob/survived.png","mob/survived0.png","mob/survived1.png"];

//var maleNames = ["David","John","Gary","Alex","Caleb","Ben","Luis","Nathan","Matthew","Ronald"]; //Мужские имена
//var femaleNames = ["Megan","Nina","Mia","Rachel","Teresa","Helen","Scarlett","Lisa","Lucy","Zoe"]; / Женские имена


IDRegistry.genItemID("eggSurvivor");
Item.createItem("eggSurvivor", "Survivor Spawn Egg", {
	name: "egg_survived", 
	data: 0
});

Translation.addTranslation("Survivor Spawn Egg", {ru: "Яйцо призыва Выжившего"});


var Survivor = MobRegistry.registerEntity("survivor");

Survivor.customizeEvents({
	tick: function(){
		//var rnd = randomInt(0, 2);
		Entity.setRender(this.entity, 3);//render
		Entity.setSkin(this.entity, "mob/survived.png");//skin  mas[rnd]
	},
	
	death: function(){
		addExpAtEntity(this.entity, 4);//выпадание опыта 
	},
	
	getDrop: function(){
		var r = randomInt(0, 1);
		var coords = Entity.getPosition(entity);
		World.drop(coords.x, coords.y, coords.z, 267, r);//дроп
	},
	
	attackedBy: function(attacker, amount){
		
	}
});

Survivor.customizeDescription({
	getHitbox: function(){
		return {
			w: 1, 
			h: 2
		}
	}
});//hitbox

Survivor.customizeAI({ 
	getAITypes: function(){ 
		return { 
			wander: { 
				type: EntityAI.Wander,//ии брождения

				priority: 4,//приоритет
				speed: 0.09,//скорость
				angular_speed: 0.1,//скорость поворотов
				delay_weigth: 0.2//хз
			}, 

			follow: { 
				type: EntityAI.Follow,//приследование
				priority: 0,//приоритет
				speed: 0.05,//скорость
				rotateHead: true//вращать ли головой
			} 
		} 
	} 
});//AI

Item.registerUseFunctionForID(ItemID.eggSurvivor, function(coords, item, block) {
	var coords = coords.relative;
	Entity.spawnCustom("survivor", coords.x + 0.5, coords.y + 0.5, coords.z + 0.5);
});