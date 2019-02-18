IDRegistry.genBlockID("siren"); 
Block.createBlock("siren", [
	{name: "Siren", texture: [["siren", 0]], inCreative: true}
], "opaque");

Translation.addTranslation("Siren", {ru: "Сирена"});

/*MachineRenderer.setStandartModel(BlockID.siren, [["siren", 0]]);
MachineRenderer.registerRenderModel(BlockID.siren, [["siren", 1]]);*/


ToolAPI.registerBlockMaterial(BlockID.siren, "stone");



TileEntity.registerPrototype(BlockID.siren, {
	defaultValues: {
		isActive: false,
	},
	
	redstone: function(signal){
		this.data.isActive = signal.power > 0;
		if(this.data.isActive){
			sndSiren.playSound();
			sndSiren.setLooping(true);
		}
		else{
			sndSiren.resetSound();
		}
	}
});


Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.siren, count: 1, data: 0}, ["iii","ini","iii"], ['i', 265, 0, 'n', 264, 0]);
});