/*
author:"Egor Moroz, ",
version: "v0.3",
description: "Do not distribute. Сode change is prohibited by copyright."
*/

LIBRARY({
	name: "SoundLib",
	version: 1,
	shared: true,
	api: "CoreEngine"
});

/*
Callback.addCallback("tick",function(){
	var pPX = Player.getPosition().x;
	var pPY = Player.getPosition().y;
	var pPZ = Player.getPosition().z;
});*/


function Sound(url, music_file){
	this.mPlayer = new android.media.MediaPlayer();
	var path = __dir__ + "sounds/" + url + music_file;
	
	this.playSound = function() { 
		this.mPlayer.reset(); 
		this.mPlayer.setDataSource(path); 
		this.mPlayer.prepare(); 
		this.mPlayer.start(); 
	}

	this.setLooping = function(loop) {
		this.mPlayer.setLooping(loop);
	}
	
	this.pauseSound = function(){
		this.mPlayer.pause();
	}
		
	this.resetSound = function(){
		this.mPlayer.reset();
	}
		
		/*
	this.playSoundAtBlock = function(x, y, z, vol){
		this.src = { "x": x, "y": y, "z": z };
		
		this.mPlayer.setVolume(vol, vol);
	}
	
	
	this.playSoundAtEntity = function(ent){
		
	}*/
}


EXPORT("Sound", Sound);

