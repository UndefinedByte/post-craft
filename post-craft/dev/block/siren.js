IDRegistry.genBlockID("siren"); 
Block.createBlock("siren", [
	{name: "Siren", texture: [["siren", 0]], inCreative: true}
], "opaque");

ToolAPI.registerBlockMaterial(BlockID.siren, "stone");
Block.setDestroyTime(BlockID.siren, 5);
Block.setDestroyLevel("siren", 2);


Machine.registryPrototype(BlockID.siren, {
 
});