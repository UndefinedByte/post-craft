var stickContainer = new UI.Container();
var guiStick = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Extra UI"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "bitmap", x: 450, y: 50, bitmap: "steve_ui", scale: 1.4}
	],
	
	elements: {
		"slotBack": {type: "slot", x: 735, y: 150, size: 80},
	}
});


Callback.addCallback("ItemUse", function (coords, item, block) {
	if(item.id == 280) stickContainer.openAs(guiStick);
});

