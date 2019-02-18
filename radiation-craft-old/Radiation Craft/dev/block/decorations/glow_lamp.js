IDRegistry.genBlockID("glowLamp");
Block.createBlock("glowLamp", [
	{name: "Glow Lamp", texture: [["glow_lamp", 0]], inCreative: true}
], BLOCK_LIGHT);

Translation.addTranslation("Glow Lamp", {ru: "Лампа из светопыли"});
ToolAPI.registerBlockMaterial(BlockID.glowLamp, "stone", 2, true);


Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.glowLamp, count: 1, data: 0}, ["eoe","eoe","eoe"], ['e', ItemID.plateIron, 0, 'o', 348, 0]);
});
