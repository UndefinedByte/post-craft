IDRegistry.genItemID("firemanAxe");
IDRegistry.genItemID("bat");
IDRegistry.genItemID("machete");

Item.createItem("firemanAxe", "Fireman Axe", {name: "fireman_axe", data: 0},{stack: 1});
Item.createItem("bat", "Bat", {name: "bat", data: 0},{stack: 1});
Item.createItem("machete", "Machete", {name: "machete", data: 0},{stack: 1});


ToolAPI.addToolMaterial("firemanAxe", {durability: 150, level: 3, damage: 7});
ToolAPI.setTool(ItemID.firemanAxe, "firemanAxe", ToolType.axe);

ToolAPI.addToolMaterial("bat", {durability: 60, level: 0, damage: 5});
ToolAPI.setTool(ItemID.bat, "bat", ToolType.sword);

ToolAPI.addToolMaterial("machete", {durability: 125, level: 0, damage: 9});
ToolAPI.setTool(ItemID.machete, "machete", ToolType.sword);

