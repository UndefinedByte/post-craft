const BUTTON_TYPE_CLICK = 1;
const BUTTON_TYPE_TOUCH = 2;

var gunExtra = new ItemExtraData();
gunExtra.putInt('bullet', 0);

/*
const prototypeGun = {
	id:string, //ID оружия
	name:string,//Имя оружия
	ammo:string,//ID магазина
	accuracy:int,//Разброс
	recoil:int,//Отдача
	smoke:int,//Уровень дыма
	shotType:int,//Тип выстрела
	buttonType:int,//Тип кнопки
	texture:{
		name:string,//Имя текстуры
		meta:int(*)//Мета текстуры
	},
	
	bullet:{
		id:int,//ID сущности
		type:int,//Тип патронов
		count:int,//Кол-во патронов в магазине,
		speed:int,//Скорость пули
	},
	
	sounds:{
		empty:string,//Звук выстрела из пустого оружия
		shoot:string,//Звук выстрела
		reload:string,//Звук перезарядки
	},
	
	fov:{
		level:int,//Уровень приближения
		link:string,//имя файла(в формате пнг, но формат не указывать) ГПИ пицела
	},
	
	shotgun:{
		count:int,//Кол-во при выстреле
		wait:0,//Don't Work. ONLY 0!
		degreesSpread:int,
	},
}
*/


const AKS74U = {
	id: "aks74u", 
	name: "AKS74-U", //Имя оружия
	ammo: "ammoAKS74U", //ID магазина
	//accuracy: int, //Разброс
	//recoil: int, //Отдача
	//smoke: int, //Уровень дыма
	//shotType: int, //Тип выстрела
	buttonType: BUTTON_TYPE_TOUCH, //Тип кнопки
	
	texture:{
		name: "aks74u",//Имя текстуры
		meta: 0 //Мета текстуры
	},
	
	bullet:{
		//id: int,//ID сущности
		//type: int,//Тип патронов
		count: 30,//Кол-во патронов в магазине,
		//speed: int,//Скорость пули
	},
	
	sounds:{
		empty: "empty.ogg", //Звук выстрела из пустого оружия
		//shoot: string, //Звук выстрела
		//reload: string, //Звук перезарядки
	},
	
	fov:{
		level: 50,//Уровень приближения
		//link: string,//имя файла(в формате пнг, но формат не указывать) ГПИ пицела
	},
	
	/*shotgun:{
		count: int,//Кол-во при выстреле
		wait:0, //Don't Work. ONLY 0!
	}*/
}


const Makarov = {
	id: "makarov", 
	name: "Makarov", //Имя оружия
	ammo: "ammoMakarov", //ID магазина
	//accuracy: int, //Разброс
	//recoil: int, //Отдача
	//smoke: int, //Уровень дыма
	//shotType: int, //Тип выстрела
	buttonType: BUTTON_TYPE_CLICK, //Тип кнопки
	
	texture:{
		name: "makarov",//Имя текстуры
		meta: 0 //Мета текстуры
	},
	
	bullet:{
		//id: int,//ID сущности
		//type: int,//Тип патронов
		count: 8,//Кол-во патронов в магазине,
		//speed: int,//Скорость пули
	},
	
	sounds:{
		empty: "empty.ogg", //Звук выстрела из пустого оружия
		//shoot: string, //Звук выстрела
		//reload: string, //Звук перезарядки
	},
	
	fov:{
		level: 60,//Уровень приближения
		//link: string,//имя файла(в формате пнг, но формат не указывать) ГПИ пицела
	},
	
	/*shotgun:{
		count: int,//Кол-во при выстреле
		wait:0, 
	}*/
}





/*
IDRegistry.genItemID("aks74u");
IDRegistry.genItemID("aug");
IDRegistry.genItemID("bizon");
IDRegistry.genItemID("deserteagle");
IDRegistry.genItemID("dragunov");
IDRegistry.genItemID("fnscar");
IDRegistry.genItemID("glock");
IDRegistry.genItemID("m16");
IDRegistry.genItemID("magnum");
IDRegistry.genItemID("makarov");
IDRegistry.genItemID("mp5");
IDRegistry.genItemID("rpd");
//IDRegistry.genItemID("rpg");
IDRegistry.genItemID("rpk");
IDRegistry.genItemID("spas");
IDRegistry.genItemID("usp");



Item.createItem("aks74u", "AKS74 - U", {name: "aks74u", data: 0},{stack: 1});
Gun.registryGun(ItemID.aks74u);


Item.createItem("aug", "AUG", {name: "aug", data: 0},{stack: 1});
//Gun.registryGun(ItemID.aug, 42, ItemID.ammoAUG);


Item.createItem("bizon", "Bizon", {name: "bizon", data: 0},{stack: 1});
//Gun.registryGun(ItemID.bizon, 32, ItemID.ammoBizon);


Item.createItem("deserteagle", "Desert Eagle", {name: "deserteagle", data: 0},{stack: 1});
//Gun.registryGun(ItemID.deserteagle, 7, ItemID.ammoDeagle);


Item.createItem("dragunov", "Dragunov", {name: "dragunov", data: 0},{stack: 1});
//Gun.registryGun(ItemID.dragunov, 10, ItemID.ammoDragunov);


Item.createItem("fnscar", "FN SCAR", {name: "fnscar", data: 0},{stack: 1});
//Gun.registryGun(ItemID.fnscar, 30, ItemID.ammoFnscar);


Item.createItem("glock", "Glock", {name: "glock", data: 0},{stack: 1});
//Gun.registryGun(ItemID.glock, 31, ItemID.ammoGlock);


Item.createItem("m16", "M16", {name: "m16", data: 0},{stack: 1});
//Gun.registryGun(ItemID.m16, 30, 30);


Item.createItem("magnum", ".44 Magnum", {name: "44magnum", data: 0},{stack: 1});
//Gun.registryGun(ItemID.magnum, 6, ItemID.ammoMagnum44);


Item.createItem("makarov", "Makarov", {name: "makarov", data: 0},{stack: 1});
//Gun.registryGun(ItemID.makarov, 8, ItemID.ammoMakarov);


Item.createItem("mp5", "MP5", {name: "mp5", data: 0},{stack: 1});
//Gun.registryGun(ItemID.mp5, 40, ItemID.ammoMP5);


Item.createItem("rpd", "RPD", {name: "rpd", data: 0},{stack: 1});
//Gun.registryGun(ItemID.rpd, 100, ItemID.ammoRPD);


//Item.createItem("rpg", "RPG", {name: "rpg", data: 0},{stack: 1});


Item.createItem("rpk", "RPK", {name: "rpk", data: 0},{stack: 1});
//Gun.registryGun(ItemID.rpk, 40, ItemID.ammoRPK);


Item.createItem("spas", "SPAS - 12", {name: "spas", data: 0},{stack: 1});
//Gun.registryGun(ItemID.spas, 8, ItemID.ammoSpas);


Item.createItem("usp", "USP", {name: "usp", data: 0},{stack: 1});
//Gun.registryGun(ItemID.usp, 12, ItemID.ammoUSP);
*/

var guns = [AKS74U, Makarov];

