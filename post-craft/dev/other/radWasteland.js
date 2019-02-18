IDRegistry.genBlockID("dirt"); 
Block.createBlock("dirt", [
    {name: "Dirt", texture: [["dirt",0]], inCreative: false}
], "opaque");
	
Block.setDestroyTime(BlockID.dirt, 3);
ToolAPI.registerBlockMaterial(BlockID.dirt, "dirt", 0, true);


var trunkGenerationHelper = {
	p: function(x, y, z, id){
		World.setBlock(x, y, z, id, 0);
	},
 
	random: function(){
		if(Math.floor(Math.random() * (150 - 0  +  1)) <= 70){
			return true;
		} else
   
		if((Math.floor(Math.random() * (150 - 0  +  1))) >= 68){
			return false;
		}
	},
 
	generateTrunk: function(crds, block){
		var block = {
			log: 17,
		}
  
		if(this.random()){
			var a = [];
			this.p(crds.x, crds.y, crds.z, block.log);
			this.p(crds.x, crds.y + 1, crds.z, block.log);
			this.p(crds.x, crds.y  +  2, crds.z, block.log);
			this.p(crds.x, crds.y  +  3, crds.z, block.log);
			this.p(crds.x, crds.y + 4, crds.z, block.log);
		}
   
		if(!this.random()){
			this.p(crds.x, crds.y, crds.z, block.log);
			this.p(crds.x, crds.y + 1, crds.z, block.log);
			this.p(crds.x, crds.y + 2, crds.z, block.log);
			this.p(crds.x, crds.y + 3, crds.z, block.log);
			this.p(crds.x, crds.y + 4, crds.z, block.log);
			this.p(crds.x, crds.y + 5, crds.z, block.log);
		}
	}
}

Callback.addCallback("GenerateChunk", function(a, b){
	for(var i = 0; i < 1; i++){
		d = GenerationUtils.randomCoords(a, b, 12, 40);
		for(var j = 12; j < 42; j++){
			if(World.getBlockID(d.x, j, d.z) == BlockID.dirt){
				for(var l = 1; l < 10; l++){
					if(World.getBlockID(d.x, j + l, d.z) == 0){
						trunkGenerationHelper.generateTrunk({x: d.x, y: j + 1, z: d.z});
						return
					}
				}
				return
			}
		}
	}
});


const SKY_COLOR = [0.13, 0.13, 0.13];
const FOG_COLOR = [0.16, 0.16, 0.16];

var radWasteland = new Dimension({
    name: "radWasteland",
    
    generation: {
        layers: [
            {
                range: [2, 29],
                noise: {
                    octaves: {
                        count: 4,
                        weight: 1,
                        scale: [1.5, .9, 1.5]
                    }
                },
                
                gradient: [[1.2, -1.2], [.3, .4], [.6, -.5], [.8, -.7], [1, -.80]],

                terrain: {
                    cover: {
                        height: 4,
                        block: 1,
                        base: 1,
                        top: BlockID.dirt
                    }
                }
            },
            {
                range: [1,2],
                noise:{
                    octaves:{
                        count:8,
                        weight: 0.4,
                        scale: [.01,.02,.04,.08]
                    }
                },
                gradient:[
                    [0,1],
                    [1,-1],
                    [0.05,.4],
                    [.2,-.8]
                ],
                terrain:{
                    base: 7
                }
            },
        ],
        
        decoration: {
            //биом+если фичи на фолз то твой ген не будет перекрываться геном биома полностью, а лишь на подходящих метсах
            //biome: 2,
            //features: false
        }
    },
    
    environment: {
        sky: SKY_COLOR,
        fog: FOG_COLOR
    },
    
    callbacks: {
        tick: function() {
//tick specials            
        },
        
        generateChunk: function(chunkX, chunkZ) {
//generate structures or ores
        },   
        loaded: function(){
//check player          
        }
    }
});

//radWasteland.debugTerrainSlice(128, 1, true);


var radWastelandTransferSequence = new TransferSequence(radWasteland);
radWastelandTransferSequence.setPortalTimeout(40);

radWastelandTransferSequence.setPortalOverlay(new PortalOverlayWindow({
    frames: 32, 
    rate: 20, 
    fade: 1, 
    texture: "aether_portal_overlay_animation"
}));

radWastelandTransferSequence.setLoadingScreenParams({
    texture: "default_dimension_loading_screen"
});

PortalRegistry.newPortalBlock("radWastelandPortal", ["aether_portal", 0], radWastelandTransferSequence.getPortal(), {type: "u-plane", frameId: 4}, false);
radWastelandTransferSequence.setPortalTiles(BlockID.radWastelandPortal);



var shape = new PortalShape();
shape.setPortalId(BlockID.radWastelandPortal);
shape.setFrameIds(4);
shape.setMinSize(2, 3);

radWastelandTransferSequence.setPortalBuilder(shape.getBuilder());

Callback.addCallback("ItemUse", function(coords, item) {
    if (item.id == 373) {
        var rect = shape.findPortal(coords.relative.x, coords.relative.y, coords.relative.z);
        if (rect) {
            shape.buildPortal(rect, false);
        }
    }
});

Callback.addCallback("DestroyBlock", function(pos, block){
    if (block.id == 89 || block.id == BlockID.radWastelandPortal) {
        DimensionHelper.eliminateIncorrectPlacedPortals(pos, BlockID.radWastelandPortal, [4]);
    }
});