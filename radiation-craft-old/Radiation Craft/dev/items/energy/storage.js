var ENERGY_ITEM_NAME = function(item, name){
	var energyStorage = Item.getMaxDamage(item.id) - 1;
	var energyStored = ChargeItemRegistry.getEnergyStored(item);
	if(energyStored == 0){
		return name;
	}
	return name + "\n§7" + energyStored + "/" + energyStorage + " RE";
}


IDRegistry.genItemID("nuclearBattery");
Item.createItem("nuclearBattery", "Nuclear Battery", {name: "nu_battery", meta: 0}, {stack: 1});
ChargeItemRegistry.registerItem(ItemID.nuclearBattery, "RE", 100000, 0, true);



IDRegistry.genItemID("advNuclearBattery");
Item.createItem("advNuclearBattery", "Advanced Nuclear Battery", {name: "adv_nu_battery", meta: 0}, {stack: 1});
ChargeItemRegistry.registerItem(ItemID.advNuclearBattery, "RE", 250000, 0, true);



Item.registerNameOverrideFunction(ItemID.nuclearBattery, ENERGY_ITEM_NAME);
Item.registerNameOverrideFunction(ItemID.advNuclearBattery, ENERGY_ITEM_NAME);


Item.registerIconOverrideFunction(ItemID.nuclearBattery, function(item, name){
	var energyStorage = Item.getMaxDamage(item.id) - 1;
	var energyStored = energyStorage - item.data + 1;
	return {name: "nu_battery", meta: Math.round(energyStored/energyStorage * 4)}
});

Item.registerIconOverrideFunction(ItemID.advNuclearBattery, function(item, name){
	var energyStorage = Item.getMaxDamage(item.id) - 1;
	var energyStored = energyStorage - item.data + 1;
	return {name: "adv_nu_battery", meta: Math.round(energyStored/energyStorage * 4)}
});



Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: ItemID.nuclearBattery, count: 1, data: Item.getMaxDamage(ItemID.nuclearBattery)}, ["qeq","ava","ava"], ['e', ItemID.cableCopper1, 0, 'a', ItemID.plateLead, 0, 'v', ItemID.uranium, 0]);
	Recipes.addShaped({id: ItemID.advNuclearBattery, count: 1, data: Item.getMaxDamage(ItemID.advNuclearBattery)}, ["epe","aaa","ppp"], ['p', ItemID.plateLead, 0, 'e', ItemID.cableCopper1, 0, 'a', ItemID.nuclearBattery, -1]);
});



//Translations

Translation.addTranslation("Nuclear Battery", {ru: "Ядерная батарея"});
Translation.addTranslation("Advanced Nuclear Battery", {ru: "Улучшенная ядерная батарея"});

