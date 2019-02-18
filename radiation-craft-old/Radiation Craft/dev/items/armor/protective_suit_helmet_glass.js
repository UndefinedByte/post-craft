var PopupWindow;
var hrg = false;
var nativeUI = false;
var MainActivity = UI.getContext();

//HelmetUI

function newHRG(){
	MainActivity.runOnUiThread(new java.lang.Runnable({
	run: function(){
		try{

			PopupWindow = new android.widget.PopupWindow();

			var LinearLayout = new android.widget.LinearLayout(MainActivity);
			LinearLayout.setOrientation(1);

			var file = __dir__ + "gui/HRG.png";

			PopupWindow.setTouchable(false);
			//PopupWindow.setAsGameOverlay(false);

			PopupWindow.setContentView(LinearLayout);

			PopupWindow.setHeight(MainActivity.getWindowManager().getDefaultDisplay().getHeight());
			PopupWindow.setWidth(MainActivity.getWindowManager().getDefaultDisplay().getWidth());
		
			PopupWindow.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(file));
			PopupWindow.showAtLocation(MainActivity.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.TOP, 0,0);
		}
		catch(err){
			print(err);
		}
	}}));
}

function leaveHRG(){
	MainActivity.runOnUiThread(
	new java.lang.Runnable({ 
		run: function(){
			if(PopupWindow != null) {
				PopupWindow.dismiss();
				PopupWindow = null;
			}
		}
	}));
}

Callback.addCallback("NativeGuiChanged", function(screenName){
	
	if(nativeUI == true && (screenName == "hud_screen" || screenName == "in_game_play_screen")){
		leaveHRG();
		hrg = false;
		nativeUI = false;
	}
});

Callback.addCallback("tick", function(){
	if(hrg == false && Player.getArmorSlot(0).id == ItemID.ProtectiveHelmet){
		newHRG();
		hrg = true
	} else 
		if(hrg == true && Player.getArmorSlot(0).id != ItemID.ProtectiveHelmet){
			leaveHRG();
			hrg = false;
	}
});

Callback.addCallback("LevelLeft", function(){
	leaveHRG();
});




/*
Callback.addCallback("ItemUse",function(coords, item, block){
	
	if(item.id == 280 && hrg == false){
		Game.message("Debug!");
		hrg = true;
		newHRG();
	}
});*/