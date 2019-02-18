var GUI = {};
GUI.ctx = UI.getContext();

var tap = 0;

var isShooting = false;
var isAiming = false;
var currentShotTicks = 0;


GUI.popupFire = null;
GUI.popupAim = null;
GUI.popupReload = null;
GUI.popupCrosshair = null;

var ammoCount = 100;


/*
GUI.run = function(f){
	GUI.ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
			f();
		}
	}));
};
*/



GUI.openFire = function(gun){
	GUI.ctx.runOnUiThread(new java.lang.Runnable({ 
		run: function(){
			try{
				var layoutf = new android.widget.LinearLayout(GUI.ctx);
				layoutf.setOrientation(1);
     
				var bshoot = new android.widget.Button(GUI.ctx);
				bshoot.setText('FIRE');
				bshoot.setTextColor(android.graphics.Color.RED);
				bshoot.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
					
				if(gun.buttonType == BUTTON_TYPE_CLICK){
					bshoot.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(){
							if(ammoCount > 0){
								Gun.shoot(Gun.getGun(Player.getCarriedItem().id));
							}
								else {
									gunSound.setSource(gun.sounds.empty);
									gunSound.play();
								}
						}
					}));
				} else 
					if(gun.buttonType == BUTTON_TYPE_TOUCH){
						bshoot.setOnTouchListener(new android.view.View.OnTouchListener() {
							onTouch: function() {
								Gun.shoot(Gun.getGun(Player.getCarriedItem().id));
							}
						});
					}						
					
				layoutf.addView(bshoot);
     
				GUI.popupFire = new android.widget.PopupWindow(layoutf, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
				GUI.popupFire.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
				GUI.popupFire.showAtLocation(GUI.ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.RIGHT, 0, 0);
				
				}catch(err){
					Game.message('An error occured: ' + err);
				}
			}
		}));
};


GUI.openAim = function(gun){
	GUI.ctx.runOnUiThread(new java.lang.Runnable({ 
		run: function(){
			try{ 
				var layouta = new android.widget.LinearLayout(GUI.ctx);
				layouta.setOrientation(1);
     
				var baim = new android.widget.Button(GUI.ctx);
				baim.setText('AIM');
				baim.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
				baim.setTextColor(android.graphics.Color.BLACK);
				baim.setOnClickListener(new android.view.View.OnClickListener({
					onClick: function(){
						if(tap < 2){
							tap++;
							switch (tap){
								case 1:
									Player.setFov(gun.fov.level);
								break;
								case 2:
									Player.resetFov();
									tap = 0;
							}	
						}
					}
				}));
		
				layouta.addView(baim);
     
				GUI.popupAim = new android.widget.PopupWindow(layouta, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
				GUI.popupAim.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
				GUI.popupAim.showAtLocation(GUI.ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.LEFT, 0, 0);
			}catch(err){
				Game.message('An error occured: ' + err);
			} 
		}
	}));
};


GUI.openCrosshair = function(){
	GUI.ctx.runOnUiThread(new java.lang.Runnable({ 
		run: function(){
			try{ 
				var layout = new android.widget.LinearLayout(GUI.ctx);
				layout.setOrientation(1);
     
				var crosshairButton = new android.widget.Button(GUI.ctx);
				crosshairButton.setText('+');
				crosshairButton.setTextColor(android.graphics.Color.WHITE);
				crosshairButton.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
				layout.addView(crosshairButton);
     
				GUI.popupCrosshair = new android.widget.PopupWindow(layout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
				GUI.popupCrosshair.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
				GUI.popupCrosshair.showAtLocation(GUI.ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER, -1, -1);
			}catch(err){
				Game.message('An error occured: ' + err);
			}
		}
	}));
};




GUI.open = function(gun){
	GUI.openFire(gun);
	GUI.openAim(gun);
	//GUI.openReload(gun);
	GUI.openCrosshair();
};

GUI.close = function(){
	GUI.ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
			if(GUI.popupFire != null){
				GUI.popupFire.dismiss();
				GUI.popupFire = null;
			}
			if(GUI.popupAim != null){
				GUI.popupAim.dismiss();
				GUI.popupAim = null;
			}
			if(GUI.popupReload != null){
				GUI.popupReload.dismiss();
				GUI.popupReload = null;
			}
			if(GUI.popupCrosshair != null){
				GUI.popupCrosshair.dismiss();
				GUI.popupCrosshair = null;
			}
		}
	}));

};

/*GUI.reload = function(gun){
	
};*/



