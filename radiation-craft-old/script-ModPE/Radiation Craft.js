

//VAR

var rnd2 = Math.round((Math.random()*60)+1);
var time = rnd2 * 20;
var diskette = 0;
var fov = [30,50,70];
var ZDise = 0;
var capsuletime = 6000;
var butta = false;
var buttf = false;
var butt = false;
var GUIf;
var GUIa; 
var GUI;
var tap=0;
var HRG = true;
var ARROW = [];
var ARROW1 = [];
var PopupWindow;
var MainActivity = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var spas = 7; 
var model = 5;
var barrett = 10;
var dragunov = 10;
var l96 = 10;
var m9 = 15;
var deagle = 7;
var magnum = 6;
var ak47 = 30;
var g3 = 20;
var g36 = 30;
var m16a4 = 30;
var rpk = 40;
var m14 = 20;
var rpg = 1;
var gl1 = 1;
var gl6 = 6;
var minigun = 500;
var exptablet = 0;
var etabl = Math.round((Math.random()*1)+0)

//VARSETTINGS

var rad = 0;
var BurnZ = true;
var Corpses = true;


//CONST

const SPAS = 7;
const MODEL = 5;
const BARRETT = 10;
const DRAGUNOV = 10;
const L96 = 10;
const M9 = 15;
const DEAGLE = 7;
const MAGNUM = 6;
const AK47 = 30;
const G3 = 20;
const G36 = 30;
const M16A4 = 30;
const RPK = 40;
const M14 = 20;
const RPG = 1;
const GL1 = 1;
const GL6 = 6;
const MINIGUN = 500;

//BLOCKS

Block.defineBlock(2, 'Радиоактивная земля',[['dirt', 0]], 42, true, 0);

Block.setDestroyTime(2,1);

Block.defineBlock(1000, 'Компьютер',[['c&d_bottom', 0],['c&d_top', 0],['c&d_centre', 0],['computer_front', 0],['c&d_centre', 0],['c&d_centre', 0], 

['c&d_bottom', 0],['c&d_top', 0],['c&d_centre', 0],['computer_front', 0],['c&d_centre', 0],['c&d_centre', 0],

['c&d_bottom', 0],['c&d_top', 0], ['computer_front', 0], ['c&d_centre', 0],['c&d_centre', 0],['c&d_centre', 0],

['c&d_bottom', 0],['c&d_top', 0],['c&d_centre', 0],['computer_front', 0],['c&d_centre', 0],['c&d_centre', 0],

['c&d_bottom', 0],['c&d_top', 0],['c&d_centre', 0], ['c&d_centre', 0],  ['computer_front', 0], ['c&d_centre',0], 

['c&d_bottom', 0],['c&d_top', 0],['c&d_centre', 0],['c&d_centre', 0],  ['c&d_centre', 0], ['computer_front', 0]],
42,true,0); 

 function setBlock(ib, x , y, z)
 { 
 if(getCarriedItem()==ib) 
 { 
 preventDefault(); 
 var pitch=getPitch(getPlayerEnt()); 

 var yaw=getYaw(getPlayerEnt())%360; 
 
 if(pitch<-45) 
 setTile(x,y-1,z,ib,1) 
 else if(pitch>45) 
 setTile(x,y+1,z,ib,0) 
 else 
 if(yaw>=-45&&yaw<45||yaw>=315) setTile(x,y,z-1,ib,2) 
 else if(yaw>=45&&yaw<135||yaw>=-315&&yaw<-1015) 
 setTile(x+1,y,z,ib,5) 
 else if(yaw>=-135&&yaw<-45||yaw>=1015&&yaw<315) 
 setTile(x-1,y,z,ib,4) 
 else setTile(x,y,z+1,ib,3) 
 }}
 
Item.addShapedRecipe(1000, 1, 0, ['ooo', 'oco', 'oao'], ['o',1, 0,'a',331,0,'c',102,0]);
Item.setCategory(1000, ItemCategory.DECORATION);
Block.setDestroyTime(1000,5);
Player.addItemCreativeInv(1000, 1, 0);

Block.defineBlock(1001, 'Дисковод',[['c&d_bottom', 0],['c&d_top', 0],['c&d_centre', 0],['drive_front', 0],['c&d_centre', 0],['c&d_centre', 0],

['c&d_bottom', 0],['c&d_top', 0],['c&d_centre', 0],['drive_front', 0],['c&d_centre', 0],['c&d_centre', 0],

['c&d_bottom', 0],['c&d_top', 0], ['drive_front', 0], ['c&d_centre', 0],['c&d_centre', 0],['c&d_centre', 0],

['c&d_bottom', 0],['c&d_top', 0],['c&d_centre', 0], ['drive_front', 0], ['c&d_centre', 0],['c&d_centre', 0],

['c&d_bottom', 0],['c&d_top', 0],['c&d_centre', 0],['c&d_centre', 0],['drive_front', 0],['c&d_centre', 0],

['c&d_bottom', 0],['c&d_top', 0],['c&d_centre', 0],['c&d_centre', 0],['c&d_centre', 0] ,['drive_front', 0]],
42,true,0); 

Item.addShapedRecipe(1001, 1, 0, ['ooo', 'oao', 'oao'], ['o',1, 0,'a',331,0]);
Item.setCategory(1001, ItemCategory.DECORATION);
Block.setDestroyTime(1001,5);
Player.addItemCreativeInv(1001, 1, 0);

Block.defineBlock(1002,'Древесина гевеи',[['log_hevea_top',0],['log_hevea_top',0],['log_hevea',0],['log_hevea',0],['log_hevea',0],['log_hevea',0],

 ['log_hevea_top',0],['log_hevea_top',0],['log_hevea',0],['log_hevea',0],['log_hevea',0],['log_hevea',0],

 ['log_hevea',0],['log_hevea',0],['log_hevea_top',0],['log_hevea_top',0],['log_hevea_sidefall',0],['log_hevea_sidefall',0],

 ['log_hevea',0],['log_hevea',0],['log_hevea_top',0],['log_hevea_top',0],['log_hevea_sidefall',0],['log_hevea_sidefall',0],

 ['log_hevea_sidefall',0],['log_hevea_sidefall',0],
['log_hevea_sidefall',0],['log_hevea_sidefall',0],['log_hevea_top',0],['log_hevea_top',0],

 ['log_hevea_sidefall',0],['log_hevea_sidefall',0],['log_hevea_sidefall',0],['log_hevea_sidefall',0],['log_hevea_top',0],['log_hevea_top',0]],17,true,0); 

Item.addFurnaceRecipe(1002, 263, 1);
Item.setCategory(1002, ItemCategory.MATERIAL);
Block.setDestroyTime(1002,2);
Player.addItemCreativeInv(1002, 1, 0);

Block.defineBlock(1003,'Древесина гевеи с каучуком',[["log_hevea_top", 0],["log_hevea_top", 0],["log_hevea",0], ["log_hevea_latex",1], ["log_hevea",0], ["log_hevea",0]],17, true, 0);

Item.setCategory(1003, ItemCategory.MATERIAL);
Block.setDestroyTime(1003,2);
Player.addItemCreativeInv(1003, 1, 0);

Block.defineBlock(1004,'Древесина гевеи без каучука',[["log_hevea_top", 0],["log_hevea_top", 0],["log_hevea",0], ["log_hevea_latex",0], ["log_hevea",0], ["log_hevea",0]],17, true, 0);

Item.setCategory(1004,ItemCategory.MATERIAL);
Block.setDestroyTime(1004,2);
Player.addItemCreativeInv(1004,1, 0);

Block.defineBlock(1005,'Листва гивеи',[['leaves_hevea', 0]],18, true, 1);

Item.setCategory(1005,ItemCategory.DECORATION);
Block.setDestroyTime(1005,0.200000002980231014);
Block.setRenderLayer(1005, 3);
Block.setLightOpacity(1005, 0);
Player.addItemCreativeInv(1005, 1, 0);

Block.defineBlock(1006,'Доски гевеи',[['planks_hevea', 0]],5, true, 0);

Item.addShapedRecipe(1006, 4, 0, ['qqq', 'qoq', 'qqq'], ['o', 1002, 0]);
Item.setCategory(1006,ItemCategory.MATERIAL);
Block.setDestroyTime(1006,2);
Player.addItemCreativeInv(1006, 1, 0);

Block.defineBlock(1007,'Саженец гевеи',[['sapling_hevea', 0]], 6,true, 1);

Item.setCategory(1007,ItemCategory.DECORATION);
Block.setDestroyTime(1007,2);
Block.setRenderLayer(1007, 3);
Block.setLightOpacity(1007, 0);
Player.addItemCreativeInv(1007, 1, 0);

Block.defineBlock(1008,'Укрепленное стекло',[["glass_sturdy", 0]],20, true, 1);

Item.setCategory(1008, ItemCategory.MATERIAL);
Block.setExplosionResistance(1008,150);
Block.setDestroyTime(1008,1.8000000119);
Block.setRenderLayer(1008, 3);
Block.setLightOpacity(1008, 0);
Player.addItemCreativeInv(1008, 1, 0);

Block.defineBlock(1009,'Укрепленный камень',[["stone_sturdy", 0]],1, true, 0);

Item.setCategory(1009,ItemCategory.MATERIAL);
Block.setExplosionResistance(1009, 150);
Block.setDestroyTime(1009,6.5);
Player.addItemCreativeInv(1009,1, 0);

Block.defineBlock(1010,'Медная руда',[["copper_ore", 0]],15, true, 0);

Item.setCategory(1010,ItemCategory.MATERIAL);
Block.setDestroyTime(1010,3);
Player.addItemCreativeInv(1010,1, 0);

Block.defineBlock(1011,'Оловянная руда',[["tin_ore", 0]],15, true, 0);

Item.setCategory(1011,ItemCategory.MATERIAL);
Block.setDestroyTime(1011,3);
Player.addItemCreativeInv(1011,1, 0);

Block.defineBlock(1022,'Свинцовая руда',[["lead_ore", 0]],15, true, 0);

Item.setCategory(1022,ItemCategory.MATERIAL);
Block.setDestroyTime(1022,3);
Player.addItemCreativeInv(1022,1, 0);

Block.defineBlock(1012,'Бронзовый блок',[['bronze_block', 0]], 42,true, 0);

Item.setCategory(1012,ItemCategory.DECORATION);
Block.setDestroyTime(1012,5);
Player.addItemCreativeInv(1012, 1, 0);

Block.defineBlock(1013,'Оловянный блок',[['tin_block', 0]], 42,true, 0);

Item.setCategory(1013,ItemCategory.DECORATION);
Block.setDestroyTime(1013,5);
Player.addItemCreativeInv(1013, 1, 0);

Block.defineBlock(1014,'Медный блок',[['copper_block', 0]], 42,true, 0);

Item.setCategory(1014,ItemCategory.DECORATION);
Block.setDestroyTime(1014,5);
Player.addItemCreativeInv(1014, 1, 0);

Block.defineBlock(1015,'Блок закаленного железа',[['steel_block', 0]], 42,true, 0);

Item.setCategory(1015,ItemCategory.DECORATION);
Block.setDestroyTime(1015,5);
Player.addItemCreativeInv(1015, 1, 0);

Block.defineBlock(1021,'Свинцовый блок',[['lead_block', 0]], 42,true, 0);

Item.setCategory(1021,ItemCategory.DECORATION);
Block.setDestroyTime(1021,5);
Player.addItemCreativeInv(1021, 1, 0);

Block.defineBlock(1016,'Ящик',[['coffer', 0]], 5,true, 0);

Item.setCategory(1016,ItemCategory.DECORATION);
Item.addShapedRecipe(1016, 2, 0, ['ooo', 'oao', 'ooo'], ['o', 5, 0,'a',54,0]);
Item.addShapedRecipe(1016, 2, 0, ['ooo', 'oao', 'ooo'], ['o', 1006, 0,'a',54,0]);
Block.setDestroyTime(1016,2);
Player.addItemCreativeInv(1016, 1, 0);

/*Block.defineBlock(1017,'blood',[['blood', 0]], 1,true, 0);

Block.setRenderLayer(1017, 3);
Block.setLightOpacity(1017, 0);
Item.setCategory(1017,ItemCategory.DECORATION);
Block.setShape(1017, 0/16, 0/16, 0/16, 16/16, 0.25/16, 16/16); 
Player.addItemCreativeInv(1017, 1, 0);*/

Block.defineBlock(1018,'Тостер',[["toaster_side", 0],["toaster_top", 0],["toaster_side",0], ["toaster_side",0], ["toaster_side",0], ["toaster_side",0]]
, 5,true, 0);

Item.setCategory(1018,ItemCategory.DECORATION);
Item.addShapedRecipe(1018,1,0, ['ooo', 'oao', 'ooo'], ['o', 265, 0,'a',296,0]);
Player.addItemCreativeInv(1018, 1, 0);

Block.defineBlock(1019,'Укрепленная дверь(низ)',[['alloy_door_bottom', 0]], 1,false, 0);

Block.setRenderLayer(1019, 3);
Block.setLightOpacity(1019, 0);
//Block.setShape(1019, 0/16, 0/16, 0/16, 16/16, 0.25/16, 16/16); 

Block.defineBlock(1020,'Укрепленная дверь(вверх)',[['alloy_door_top', 0]], 1,false, 0);

Block.setRenderLayer(1020, 3);
Block.setLightOpacity(1020, 0);
//Block.setShape(1020, 0/16, 0/16, 0/16, 16/16, 0.25/16, 16/16); 

Block.defineBlock(1023, 'Сборщик оружий',[['guntable_bottom', 0],['guntable_top', 0],['guntable_side', 0],['guntable_side', 0],['guntable_side', 0],['guntable_side', 0]], 1, false, 0);

Item.setCategory(1023,ItemCategory.DECORATION);
Item.addShapedRecipe(1023, 1, 0, ['oao', 'aba', 'oao'], ['o', 42, 0,'a',1015,0,'b',351,8]);
Player.addItemCreativeInv(1023, 1, 0);

/*Block.defineBlock(1024, 'Терраформер',[['terraformer_bottom', 0],['terraformer_top', 0],['terraformer_side', 0],['terraformer_side', 0],['terraformer_side', 0],['terraformer_side', 0]], 1, false, 0);

Item.setCategory(1024,ItemCategory.DECORATION);
Item.addShapedRecipe(1024, 1, 0, ['oao', 'aba', 'oao'], ['o', 42, 0,'a',1015,0,'b',2,0]);
Player.addItemCreativeInv(1024, 1, 0);*/


//INGOTS(1601-1610)

ModPE.setItem(1601, 'steel_ingot', 0, 'Слиток закаленного железа', 64);

Item.addShapedRecipe(1015, 1, 0, ['ooo', 'ooo', 'ooo'], ['o', 1601, 0]);
Item.addShapedRecipe(1601, 9, 0, ['ooo', 'oao', 'ooo'], ['a', 1015, 0]);
Item.addFurnaceRecipe(265,1601, 0);
Item.setCategory(1601, ItemCategory.FOOD);
Player.addItemCreativeInv(1601, 1, 0);
  

ModPE.setItem(1602, 'bronze_ingot', 0, 'Бронзовый слиток', 64);

Item.addShapedRecipe(1012, 1, 0, ['ooo', 'ooo', 'ooo'], ['o', 1602, 0]);
Item.addShapedRecipe(1602, 9, 0, ['ooo', 'oao', 'ooo'], ['a', 1012, 0]);
Item.setCategory(1602, ItemCategory.FOOD);
Player.addItemCreativeInv(1602,1, 0);


ModPE.setItem(1603, 'copper_ingot', 0, 'Медный слиток', 64);

Item.addShapedRecipe(1014, 1, 0, ['ooo', 'ooo', 'ooo'], ['o', 1603, 0]);
Item.addShapedRecipe(1603, 9, 0, ['ooo', 'oao', 'ooo'], ['a', 1014, 0]);
Item.addFurnaceRecipe(1010,1603, 0);
Item.setCategory(1603, ItemCategory.FOOD);
Player.addItemCreativeInv(1603, 1, 0);

ModPE.setItem(1604, 'tin_ingot', 0, 'Оловянный слиток', 64);

Item.addFurnaceRecipe(1011,1604, 0);
Item.addShapedRecipe(1602, 1, 0, ['qqq', 'aqq', 'qbq'], ['b', 1604, 0,'a', 1603, 0]);
Item.addShapedRecipe(1011, 1, 0, ['ooo', 'ooo', 'ooo'], ['o', 1604, 0]);
Item.addShapedRecipe(1604, 9, 0, ['ooo', 'oao', 'ooo'], ['a', 1011, 0]);
Item.setCategory(1604, ItemCategory.FOOD);
Player.addItemCreativeInv(1604, 1, 0);

ModPE.setItem(1605, 'lead_ingot', 0, 'Свинцовый слиток', 64);

Item.setCategory(1605, ItemCategory.FOOD);
Player.addItemCreativeInv(1605,1, 0);

ModPE.setItem(1606, 'alloy_ingot', 0, 'Композитный слиток', 64);

Item.addShapedRecipe(1606, 2, 0, ['qaq', 'qbq', 'qcq'], ['a', 1601, 0,'b', 1603, 0,'c',1604,0]);
Item.setCategory(1606, ItemCategory.FOOD);
Player.addItemCreativeInv(1606, 1, 0);

ModPE.setItem(1607, 'alloy_plate', 0, 'Комозит', 64);

Item.addShapedRecipe(1008, 1, 0, ['aoa', 'ooo', 'aoa'], ['a',1607, 0, 'o',20, 0]);
Item.addShapedRecipe(1009, 1, 0, ['ooo', 'oao', 'ooo'], ['a',1607, 0, 'o',1, 0]);
Item.addFurnaceRecipe(1606,1607, 0);
Item.setCategory(1607, ItemCategory.FOOD);
Player.addItemCreativeInv(1607, 1, 0);

//EAT(id1400-1430)

ModPE.setItem(1400, 'canned_empty', 0, 'Пустая консервная банка', 64);

Item.addShapedRecipe(1400, 8,0, ['qqq', 'aqa', 'aaa'], ['a', 1604, 0]);
Item.setCategory(1400, ItemCategory.TOOL);
Player.addItemCreativeInv(1400, 1, 0);

ModPE.setFoodItem(1401, 'tablet' , 1, 0, 'Таблетка', 64)

Item.setProperties(1401, { 

"category": "Miscellaneous",

"use_animation": "eat",

"use_duration": 5,

"max_stack_size": 64,

"foil": false,

"food": {

"nutrition": 0, 

"saturation_modifier": "supernatural", 

"is_meat": false }});
Item.setCategory(1401, ItemCategory.FOOD);
Player.addItemCreativeInv(1401, 1, 0);

ModPE.setFoodItem(1402, 'tablet' , 0, 0, 'Эксперементальная таблетка', 64)

Item.setProperties(1402, { 

"category": "Miscellaneous",

"use_animation": "eat",

"use_duration": 5,

"max_stack_size": 64,

"foil": false,

"food": {

"nutrition": 0, 

"saturation_modifier": "supernatural", 

"is_meat": false }});
Item.setCategory(1402, ItemCategory.FOOD);
Player.addItemCreativeInv(1402, 1, 0);

ModPE.setFoodItem(1403, 'tablet' , 2, 0, 'UZF', 64);

Item.setProperties(1403, { 

"category": "Miscellaneous",

"use_animation": "eat",

"use_duration": 5,

"max_stack_size": 64,

"foil": false,

"food": {

"nutrition": 0, 

"saturation_modifier": "supernatural", 

"is_meat": false }});
Item.setCategory(1403, ItemCategory.FOOD);
Player.addItemCreativeInv(1403, 1, 0);

ModPE.setFoodItem(1404, 'vegetables_canned' , 0, 4, 'Овощные консервы', 64);

Item.addShapedRecipe(1404, 4, 0, ['qqq', 'qbq', 'qaq'], ['a', 1400, 0,'b',391,0]);
Item.setCategory(1404, ItemCategory.FOOD);
Player.addItemCreativeInv(1404, 1, 0);

ModPE.setFoodItem(1405, 'fish_canned' , 0, 6, 'Рыбные консервы', 64);

Item.addShapedRecipe(1405, 4, 0, ['qqq', 'qbq', 'qaq'], ['a', 1400, 0,'b',349,0]);
Item.setCategory(1405, ItemCategory.FOOD);
Player.addItemCreativeInv(1405, 1, 0);

ModPE.setFoodItem(1406, 'meat_canned' , 0, 8, 'Мясные консервы', 64);

Item.addShapedRecipe(1406, 4, 0, ['qqq', 'qbq', 'qaq'], ['a', 1400, 0,'b',363,0]);
Item.setCategory(1406, ItemCategory.FOOD);
Player.addItemCreativeInv(1406, 1, 0);

ModPE.setItem(1407, 'flask', 0, 'Фляга', 1);

Item.addShapedRecipe(1407, 1, 0, ['qoq', 'oao', 'qoq'], ['a', 374, 0,'o', 265, 0]);
Item.setCategory(1407, ItemCategory.FOOD);
Player.addItemCreativeInv(1407, 1, 0);

ModPE.setFoodItem(1408, 'radaway' , 0, 0, 'Антирадин', 64);

Item.setProperties(1408, { 

"category": "Miscellaneous",

"use_animation": "drink",

"use_duration": 10,

"max_stack_size": 64,

"foil": false,

"food": {

"nutrition": 0, 

"saturation_modifier": "supernatural", 

"is_meat": false }});
Item.setCategory(1408, ItemCategory.FOOD);
Player.addItemCreativeInv(1408, 1, 0);

ModPE.setFoodItem(1409, 'stimulant' , 0, 0, 'Стимулятор', 1);

Item.setProperties(1409, { 

"category": "Miscellaneous",

"use_animation": "eat",

"use_duration": 1,

"max_stack_size": 1,

"foil": false,

"food": {

"nutrition": 0, 

"saturation_modifier": "supernatural", 

"is_meat": false }});
Item.setCategory(1409, ItemCategory.FOOD);
Player.addItemCreativeInv(1409,1, 0);

ModPE.setItem(1410, 'injector' , 0, 'Пустой Инжектор', 64);

Item.setCategory(1410, ItemCategory.FOOD);
Player.addItemCreativeInv(1410, 1, 0);

ModPE.setFoodItem(1411, 'injector' , 1, 0, 'Инжектор', 1);

Item.setProperties(1411, { 

"category": "Miscellaneous",

"use_animation": "eat",

"use_duration": 1,

"max_stack_size": 1,

"foil": false,

"food": {

"nutrition": 0, 

"saturation_modifier": "supernatural", 

"is_meat": false }});
Item.setCategory(1411, ItemCategory.FOOD);
Player.addItemCreativeInv(1411, 1, 0);

ModPE.setItem(1412, 'blocker', 0, 'Блокатор', 1);

Item.setProperties(1412, { 

"category": "Miscellaneous",

"use_animation": "eat",

"use_duration": 1,

"max_stack_size": 1,

"foil": false,

"food": {

"nutrition": 0, 

"saturation_modifier": "supernatural", 

"is_meat": false }});
Item.setMaxDamage(1412, 24);
Item.setCategory(1412, ItemCategory.FOOD);
Player.addItemCreativeInv(1412, 1, 0);


//ITEMS(1431-1480)

ModPE.setItem(1431, 'flashlight', 0, 'Фонарик', 1);

Item.setCategory(1431, ItemCategory.TOOL);
Player.addItemCreativeInv(1431, 1, 0);

ModPE.setItem(1432, 'guide_book', 0, 'Гайд-книга', 1);

Item.setCategory(1432, ItemCategory.TOOL);
Player.addItemCreativeInv(1432, 1, 0);

//SPAWNEGGS(1433-1440)

ModPE.setItem(1433, 'egg_fallenz', 0, 'Яйцо призыва Падшего зомби', 64);  

Item.setCategory(1433, ItemCategory.TOOL);
Player.addItemCreativeInv(1433, 1, 0);

ModPE.setItem(1434, 'egg_hybrid', 0, 'Яйцо призыва Гибрида', 64);  

Item.setCategory(1434, ItemCategory.TOOL);
Player.addItemCreativeInv(1434, 1, 0);

ModPE.setItem(1435, 'egg_survived', 0, 'Яйцо призыва Выжившего', 64);  

Item.setCategory(1435, ItemCategory.TOOL);
Player.addItemCreativeInv(1435, 1, 0);

//ITEMSOTHER(1441-1480)

ModPE.setItem(1441, 'capsule', 0, 'Капсула', 64);

Item.addShapedRecipe(1441, 16, 0, ['qaq', 'aqa', 'qaq'], ['a', 1604, 0]);
Item.setCategory(1441, ItemCategory.TOOL);
Player.addItemCreativeInv(1441, 1, 0);

ModPE.setItem(1442, 'capsule', 1, 'Капсула со сжатым воздухом', 1);

Item.setMaxDamage(1442, 6000);
Item.setCategory(1442, ItemCategory.TOOL);
Player.addItemCreativeInv(1442,1, 0);

ModPE.setItem(1443, 'rubber', 0, 'Резина', 64);

Item.setCategory(1443, ItemCategory.TOOL);
Player.addItemCreativeInv(1443, 1, 0);

ModPE.setItem(1444, 'latex', 0, 'Каучук', 64);

Item.addFurnaceRecipe(1444, 1443, 0);
Item.setCategory(1444, ItemCategory.TOOL);
Player.addItemCreativeInv(1444, 1, 0);

ModPE.setItem(1445, 'door_alloy', 0, 'Укрепленная дверь', 64);

Item.setCategory(1445, ItemCategory.DECORATION);
Player.addItemCreativeInv(1445, 1, 0);

//INSTRUMENTS(1481-1490)

ModPE.setItem(1481, 'crane_wooden', 0, 'Краник', 1);

Item.addShapedRecipe(1481, 1, 0, ['qoq', 'ooo', 'oqq'], ['o', 5, 0]);
Item.setMaxDamage(1481, 60);
Item.setCategory(1481, ItemCategory.TOOL);
Player.addItemCreativeInv(1481, 1, 0);

ModPE.setItem(1482,'crane_steel', 0, 'Стальной краник', 1);

Item.addShapedRecipe(1482, 1, 0, ['qoq', 'ooo', 'oqq'], ['o', 1601, 0]);
Item.setMaxDamage(1482, 200);
Item.setCategory(1482, ItemCategory.TOOL);
Player.addItemCreativeInv(1482, 1, 0);

ModPE.setItem(1483, 'wrench', 0, 'Гаечный ключ', 1);

Item.addShapedRecipe(1483, 1, 0, ['oqo', 'qoq', 'qoq'], ['o', 1601, 0]);
Item.setMaxDamage(1483, 256);
Item.setCategory(1483, ItemCategory.TOOL);
Player.addItemCreativeInv(1483, 1, 0);

//WEAPONS(1491-1530)

ModPE.setItem(1491, 'fireman_axe', 0, 'Топор пожарного', 1);

Item.addShapedRecipe(1491, 1, 0, ['aaq', 'aoq', 'qoq'], ['a', 1601, 0,'o', 280, 0]);
Item.setHandEquipped(1491, true);
Item.setMaxDamage(1491, 310);
Item.setCategory(1491, ItemCategory.TOOL);
Player.addItemCreativeInv(1491, 1, 0);

ModPE.setItem(1492, 'bat_wooden', 0, 'Деревянная бита', 1);

Item.addShapedRecipe(1492, 1, 0, ['qqa', 'qaq', 'oqq'], ['a', 5, 0,'o', 280, 0]);
Item.setHandEquipped(1492, true);
Item.setMaxDamage(1492, 176);
Item.setCategory(1492, ItemCategory.TOOL);
Player.addItemCreativeInv(1492, 1, 0);

ModPE.setItem(1493, 'bat_steel', 0, 'Стальная бита', 1);


Item.addShapedRecipe(1493, 1, 0, ['qqa', 'qaq', 'oqq'], ['a', 1601, 0,'o',280,0]);
Item.setHandEquipped(1493, true);
Item.setMaxDamage(1493, 340);
Item.setCategory(1493, ItemCategory.TOOL);
Player.addItemCreativeInv(1493, 1, 0);

ModPE.setItem(1494, 'knife', 0, 'Ножик', 1);

Item.addShapedRecipe(1494, 1, 0, ['qqq', 'qaq', 'qoq'], ['a',1601, 0,'o', 1443, 0]);
Item.setHandEquipped(1494, true);
Item.setMaxDamage(1494,124 );
Item.setCategory(1494, ItemCategory.TOOL);
Player.addItemCreativeInv(1494, 1, 0);

ModPE.setItem(1495, 'arrow_fire', 0, 'Взрывная стрела', 64);

Item.setCategory(1495, ItemCategory.FOOD);
Player.addItemCreativeInv(1495, 1, 0);

ModPE.setItem(1496, 'arrow_explosion', 0, 'Взрыво-огненная стрела', 64);

Item.setCategory(1496, ItemCategory.FOOD);
Player.addItemCreativeInv(1496, 1, 0);

ModPE.setItem(1497, '44magnum', 0, '44 Magnum', 1);

Item.setCategory(1497, ItemCategory.TOOL);
Player.addItemCreativeInv(1497, 1, 0);

ModPE.setItem(1498, 'ak47', 0, 'AK 47', 1);

Item.setCategory(1498, ItemCategory.TOOL);
Player.addItemCreativeInv(1498, 1, 0);

ModPE.setItem(1499, 'barrett', 0, 'Barrett', 1);

Item.setCategory(1499, ItemCategory.TOOL);
Player.addItemCreativeInv(1499, 1, 0);

ModPE.setItem(1500, 'deserteagle', 0, 'Desert Eagle', 1);

Item.setCategory(1500, ItemCategory.TOOL);
Player.addItemCreativeInv(1500, 1, 0);

ModPE.setItem(1501, 'dragunov', 0, 'Dragunov', 1);

Item.setCategory(1501, ItemCategory.TOOL);
Player.addItemCreativeInv(1501, 1, 0);

ModPE.setItem(1502, 'g36', 0, 'G36', 1);

Item.setCategory(1502, ItemCategory.TOOL);
Player.addItemCreativeInv(1502, 1, 0);

ModPE.setItem(1503, 'g3', 0, 'G3', 1);

Item.setCategory(1503, ItemCategory.TOOL);
Player.addItemCreativeInv(1503, 1, 0);

ModPE.setItem(1504, 'gl1', 0, 'GL1', 1);

Item.setCategory(1504, ItemCategory.TOOL);
Player.addItemCreativeInv(1504, 1, 0);

ModPE.setItem(1505, 'l96', 0, 'L96', 1);

Item.setCategory(1505, ItemCategory.TOOL);
Player.addItemCreativeInv(1505, 1, 0);

ModPE.setItem(1506, 'm14', 0, 'M14', 1);

Item.setCategory(1506, ItemCategory.TOOL);
Player.addItemCreativeInv(1506, 1, 0);

ModPE.setItem(1507, 'm16a4', 0, 'M16A4', 1);

Item.setCategory(1507, ItemCategory.TOOL);
Player.addItemCreativeInv(1507, 1, 0);

ModPE.setItem(1508, 'm1887', 0, 'Model 1887', 1);

Item.setCategory(1508, ItemCategory.TOOL);
Player.addItemCreativeInv(1508, 1, 0);

ModPE.setItem(1509, 'm9', 0, 'M9', 1);

Item.setCategory(1509, ItemCategory.TOOL);
Player.addItemCreativeInv(1509, 1, 0);

ModPE.setItem(1510, 'minigun', 0, 'Minigun', 1);

Item.setCategory(1510, ItemCategory.TOOL);
Player.addItemCreativeInv(1510, 1, 0);

ModPE.setItem(1511, 'rpg', 0, 'RPG', 1);

Item.setCategory(1511, ItemCategory.TOOL);
Player.addItemCreativeInv(1511, 1, 0);

ModPE.setItem(1512, 'rpk', 0, 'RPK', 1);

Item.setCategory(1512, ItemCategory.TOOL);
Player.addItemCreativeInv(1512, 1, 0);

ModPE.setItem(1513, 'spas', 0, 'SPAS - 12', 1);

Item.setCategory(1513, ItemCategory.TOOL);
Player.addItemCreativeInv(1513, 1, 0);

//AMMO(1531-1550)

ModPE.setItem(1531, 'ammo_assault', 0, 'Боеприпасы для штурмовых винтовок', 1);

Item.setCategory(1531, ItemCategory.FOOD);
Player.addItemCreativeInv(1531, 1, 0);

ModPE.setItem(1532, 'ammo_handgun', 0, 'Боеприпасы для пистолетов', 1);

Item.setCategory(1532, ItemCategory.FOOD);
Player.addItemCreativeInv(1532, 1, 0);

ModPE.setItem(1534, 'ammo_launcher', 0, 'Боеприпасы для гранатометов', 1);

Item.setCategory(1534, ItemCategory.FOOD);
Player.addItemCreativeInv(1534, 1, 0);

ModPE.setItem(1535, 'ammo_light_machine', 0, 'Боеприпасы для ?', 1);

Item.setCategory(1535, ItemCategory.FOOD);
Player.addItemCreativeInv(1535, 1, 0);

ModPE.setItem(1536, 'ammo_machine_pistol', 0, 'Боеприпасы для ?', 1);

Item.setCategory(1536, ItemCategory.FOOD);
Player.addItemCreativeInv(1536, 1, 0);

ModPE.setItem(1537, 'ammo_minigun', 0, 'Боеприпасы для минигана', 1);

Item.setCategory(1537, ItemCategory.FOOD);
Player.addItemCreativeInv(1537, 1, 0);

ModPE.setItem(1538, 'ammo_shotgun', 0, 'Боеприпасы для дробовиков', 1);

Item.setCategory(1538, ItemCategory.FOOD);
Player.addItemCreativeInv(1538, 1, 0);

ModPE.setItem(1539, 'ammo_sniper', 0, 'Боеприпасы для снайперских винтовок', 1);

Item.setCategory(1539, ItemCategory.FOOD);
Player.addItemCreativeInv(1539, 1, 0);

ModPE.setItem(1540, 'ammo_submachine', 0, 'Боеприпасы для автоматов', 1);

Item.setCategory(1540, ItemCategory.FOOD);
Player.addItemCreativeInv(1540, 1, 0);

//OTHER(1551-1560)

ModPE.setItem(1551, 'quiver', 0, 'Колчан со стрелами', 1);

Item.addShapedRecipe(1551, 1, 0, ['bba', 'ooa', 'ooa'], ['a', 287, 0,'o', 334, 0,'b', 288, 0]);
Item.setCategory(1551, ItemCategory.TOOL);
Player.addItemCreativeInv(1551, 1, 0);


ModPE.setItem(1552, 'fuel', 0, 'Пустая канистра', 64);

Item.addShapedRecipe(1552, 1, 0, ['daa', 'aoa', 'aaa'], ['a',1601, 0,'o',351, 10,'d',351,1]);
Item.addShapedRecipe(1552, 1, 0, ['daa', 'aoa', 'aaa'], ['a',265, 0,'o',351, 10,'d',351,1]);
Item.setCategory(1552, ItemCategory.FOOD);
Player.addItemCreativeInv(1552,1, 0);

ModPE.setItem(1553, 'fuel', 0, 'Канистра с бензином', 1);

Item.addShapedRecipe(1553, 1, 0, ['qaq', 'aoa', 'qaq'], ['a',263, 0,'o',1552, 0]);
Item.setCategory(1553, ItemCategory.FOOD);
Player.addItemCreativeInv(1553,1, 0);


//PARTSOFWEAPONS(1561-1580)

ModPE.setItem(1561, 'part_barrel', 2, 'Ствол', 1);

Item.addShapedRecipe(1561, 1, 0, ['qqa', 'qaq', 'qqq'], ['a',1601, 0]);
Item.setCategory(1561, ItemCategory.FOOD);
Player.addItemCreativeInv(1561,1, 0);

ModPE.setItem(1562, 'part_barrel', 1, 'Ствол', 1);

Item.addShapedRecipe(1562, 1, 0, ['qqa', 'qoq', 'aqq'], ['a',1601, 0,'o',1561, 0]);
Item.setCategory(1562, ItemCategory.FOOD);
Player.addItemCreativeInv(1562,1, 0);

ModPE.setItem(1563, 'part_barrel', 0, 'Ствол', 1);

Item.addShapedRecipe(1563, 1, 0, ['qqa', 'qoq', 'aqq'], ['a',1601, 0,'o',1562, 0]);
Item.setCategory(1563, ItemCategory.FOOD);
Player.addItemCreativeInv(1563,1, 0);


ModPE.setItem(1564, 'part_body', 2, 'Ствольная коробка', 1);

Item.addShapedRecipe(1564, 1, 0, ['aaa', 'aoa', 'aaq'], ['a',1601, 0,'o',331, 0]);
Item.setCategory(1564, ItemCategory.FOOD);
Player.addItemCreativeInv(1564,1, 0);

ModPE.setItem(1565, 'part_body', 1, 'Ствольная коробка', 1);

Item.addShapedRecipe(1565, 1, 0, ['qaq', 'aoa', 'qaq'], ['a',1601, 0,'o',1564, 0]);
Item.setCategory(1565, ItemCategory.FOOD);
Player.addItemCreativeInv(1565,1, 0);

ModPE.setItem(1566, 'part_body', 0, 'Ствольная коробка', 1);

Item.addShapedRecipe(1566, 1, 0, ['qaq', 'aoa', 'qaq'], ['a',1601, 0,'o',1565, 0]);
Item.setCategory(1566, ItemCategory.FOOD);
Player.addItemCreativeInv(1566,1, 0);


ModPE.setItem(1567, 'part_bolt', 0, 'Затвор', 1);

Item.addShapedRecipe(1567, 1, 0, ['aaa', 'aaq', 'qqq'], ['a',1601, 0]);
Item.setCategory(1567, ItemCategory.FOOD);
Player.addItemCreativeInv(1567,1, 0);

ModPE.setItem(1568, 'part_bolt', 1, 'Затвор', 1);

Item.addShapedRecipe(1568, 1, 0, ['qaq', 'aoa', 'qaq'], ['a',1601, 0,'o',1567, 0]);
Item.setCategory(1568, ItemCategory.FOOD);
Player.addItemCreativeInv(1568,1, 0);


ModPE.setItem(1569, 'part_handle', 2, 'Рукоять', 1);

Item.addShapedRecipe(1569, 1, 0, ['aaa', 'aoq', 'qqq'], ['a',1601, 0,'o',69, 0]);
Item.setCategory(1569, ItemCategory.FOOD);
Player.addItemCreativeInv(1569,1, 0);

ModPE.setItem(1570, 'part_handle', 1, 'Рукоять', 1);

Item.addShapedRecipe(1570, 1, 0, ['qaq', 'aoa', 'qaq'], ['a',1601, 0,'o',1569, 0]);
Item.setCategory(1570, ItemCategory.FOOD);
Player.addItemCreativeInv(1570,1, 0);

ModPE.setItem(1571, 'part_handle', 0, 'Рукоять', 1);

Item.addShapedRecipe(1571, 1, 0, ['qaq', 'aoa', 'qaq'], ['a',1601, 0,'o',1570, 0]);
Item.setCategory(1571, ItemCategory.FOOD);
Player.addItemCreativeInv(1571,1, 0);


ModPE.setItem(1572, 'part_stock', 1, 'Приклад', 1);

Item.addShapedRecipe(1572, 1, 0, ['aaa', 'aaq', 'qqq'], ['a',1601, 0]);
Item.setCategory(1572, ItemCategory.FOOD);
Player.addItemCreativeInv(1572,1, 0);

ModPE.setItem(1573, 'part_stock', 0, 'Приклад', 1);

Item.addShapedRecipe(1572, 1, 0, ['qaq', 'aoa', 'qaq'], ['a',1601, 0,'o',1572, 0]);
Item.setCategory(1573, ItemCategory.FOOD);
Player.addItemCreativeInv(1573,1, 0);


ModPE.setItem(1574, 'part_acog', 0, 'Прицел', 1);

Item.addShapedRecipe(1574, 1, 0, ['qqq', 'oao', 'aaa'], ['a',1601, 0,'o',20, 0]);
Item.setCategory(1574, ItemCategory.FOOD);
Player.addItemCreativeInv(1574,1, 0);

ModPE.setItem(1575, 'part_reddot', 0, 'Прицел', 1);

Item.addShapedRecipe(1575, 1, 0, ['qqq', 'oqq', 'aaa'], ['a',1601, 0,'o',20, 0]);
Item.setCategory(1575, ItemCategory.FOOD);
Player.addItemCreativeInv(1575,1, 0);

ModPE.setItem(1576, 'part_holo', 0, 'Прицел', 1);

Item.addShapedRecipe(1576, 1, 0, ['qqq', 'aoq', 'bob'], ['a',20, 0,'o',331, 0,'b',1601,0]);
Item.setCategory(1576, ItemCategory.FOOD);
Player.addItemCreativeInv(1576,1, 0);

ModPE.setItem(1577, 'part_scope', 0, 'Прицел', 1);

Item.addShapedRecipe(1577, 1, 0, ['aaa', 'bob', 'aaa'], ['a',1601, 0,'b',20, 0,'o',331,0]);
Item.setCategory(1577, ItemCategory.FOOD);
Player.addItemCreativeInv(1577,1, 0);


//DISKETTES(1581-1600)

ModPE.setItem(1581, 'diskette', 0, 'Дискета', 1);

Item.addShapedRecipe(1581, 1, 0, ['qaq', 'qob', 'qqq'], ['a',331, 0,'o',339, 0,'b',351, 0]);
Item.setCategory(1581, ItemCategory.TOOL);
Player.addItemCreativeInv(1581,1, 0);

ModPE.setItem(1582, 'diskette', 1, 'Дискета', 1);

Item.addShapedRecipe(1582, 1, 0, ['qaq', 'qob', 'qqq'], ['a',331, 0,'o',339, 0,'b',351, 8]);
Item.setCategory(1582, ItemCategory.TOOL);
Player.addItemCreativeInv(1582,1, 0);

ModPE.setItem(1583, 'diskette', 2, 'Дискета', 1);

Item.addShapedRecipe(1583, 1, 0, ['qaq', 'qob', 'qqq'], ['a',331, 0,'o',339, 0,'b',351, 7]);
Item.setCategory(1583, ItemCategory.TOOL);
Player.addItemCreativeInv(1583,1, 0);

ModPE.setItem(1584, 'diskette', 3, 'Дискета', 1);

Item.addShapedRecipe(1584, 1, 0, ['qaq', 'qob', 'qqq'], ['a',331, 0,'o',339, 0,'b',351, 15]);
Item.setCategory(1584, ItemCategory.TOOL);
Player.addItemCreativeInv(1584,1, 0);

ModPE.setItem(1585, 'diskette', 4, 'Дискета', 1);

Item.addShapedRecipe(1585, 1, 0, ['qaq', 'qob', 'qqq'], ['a',331, 0,'o',339, 0,'b',351, 12]);
Item.setCategory(1585, ItemCategory.TOOL);
Player.addItemCreativeInv(1585,1, 0);

ModPE.setItem(1586, 'diskette', 5, 'Дискета', 1);

Item.addShapedRecipe(1586, 1, 0, ['qaq', 'qob', 'qqq'], ['a',331, 0,'o',339, 0,'b',351, 14]);
Item.setCategory(1586, ItemCategory.TOOL);
Player.addItemCreativeInv(1586,1, 0);

ModPE.setItem(1587, 'diskette', 6, 'Дискета', 1);

Item.addShapedRecipe(1587, 1, 0, ['qaq', 'qob', 'qqq'], ['a',331, 0,'o',339, 0,'b',351, 1]);
Item.setCategory(1587, ItemCategory.TOOL);
Player.addItemCreativeInv(1587,1, 0);

ModPE.setItem(1588, 'diskette', 7, 'Дискета', 1);

Item.addShapedRecipe(1588, 1, 0, ['qaq', 'qob', 'qqq'], ['a',331, 0,'o',339, 0,'b',351, 4]);
Item.setCategory(1588, ItemCategory.TOOL);
Player.addItemCreativeInv(1588,1, 0);

ModPE.setItem(1589, 'diskette', 8, 'Дискета', 1);

Item.addShapedRecipe(1589, 1, 0, ['qaq', 'qob', 'qqq'], ['a',331, 0,'o',339, 0,'b',351, 5]);
Item.setCategory(1589, ItemCategory.TOOL);
Player.addItemCreativeInv(1589,1, 0);

ModPE.setItem(1590, 'diskette',9, 'Дискета', 1);

Item.addShapedRecipe(1590, 1, 0, ['qaq', 'qob', 'qqq'], ['a',331, 0,'o',339, 0,'b',351, 13]);
Item.setCategory(1590, ItemCategory.TOOL);
Player.addItemCreativeInv(1590,1, 0);

ModPE.setItem(1591, 'diskette', 10, 'Дискета', 1);

Item.addShapedRecipe(1591, 1, 0, ['qaq', 'qob', 'qqq'], ['a',331, 0,'o',339, 0,'b',351, 9]);
Item.setCategory(1591, ItemCategory.TOOL);
Player.addItemCreativeInv(1591,1, 0);

ModPE.setItem(1592, 'diskette', 11, 'Дискета', 1);

Item.addShapedRecipe(1592, 1, 0, ['qaq', 'qob', 'qqq'], ['a',331, 0,'o',339, 0,'b',351, 3]);
Item.setCategory(1592, ItemCategory.TOOL);
Player.addItemCreativeInv(1592,1, 0);

ModPE.setItem(1593, 'diskette', 12, 'Дискета', 1);

Item.addShapedRecipe(1593, 1, 0, ['qaq', 'qob', 'qqq'], ['a',331, 0,'o',339, 0,'b',351, 11]);
Item.setCategory(1593, ItemCategory.TOOL);
Player.addItemCreativeInv(1593,1, 0);


//MCPE Shapes Recipe

Item.addShapedRecipe(66, 16, 0, ['oqo', 'oao', 'oqo'], ['o', 1602, 0,'a',280,0]);

Item.addShapedRecipe(325, 1, 0, ['qqq', 'oqo', 'qoq'], ['o', 1604, 0]);

Item.addShapedRecipe(29, 1, 0, ['qqq', 'qaq', 'qoq'], ['o', 33, 0,'a', 1444,0]);

Item.addShapedRecipe(50, 4, 0, ['qqq', 'qaq', 'qoq'], ['o', 280, 0,'a', 1444,0]);

Item.addShapedRecipe(280, 4, 0, ['qqq', 'qoq', 'qoq'], ['o', 1006, 0]);

Item.addShapedRecipe(58, 1, 0, ['qqq', 'qoo', 'qoo'], ['o', 1006, 0]);

//GUI

//GUI GUNS

function Buttfirenew(){
var ctxf = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctxf.runOnUiThread(new java.lang.Runnable({ run: function(){
try{ 
var layoutf = new android.widget.LinearLayout(ctxf);
layoutf.setOrientation(1);
     
     var bfire = new android.widget.Button(ctxf);
    bfire.setText('FIRE');
	bfire.setTypeface(mcfont);
bfire.setTextColor(android.graphics.Color.RED);
    bfire.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
    bfire.setOnClickListener(new android.view.View.OnClickListener({
    onClick: function(viewarg)
	{
	var p=((Entity.getPitch(getPlayerEnt())+90)*Math.PI)/180;
	var y=((Entity.getYaw(getPlayerEnt())+90)*Math.PI)/180;
	var xx=Math.sin(p)*Math.cos(y);
	var yy=Math.sin(p)*Math.sin(y);
	var zz=Math.cos(p);
	var spwnarrow = Level.spawnMob(getPlayerX()+xx,getPlayerY()+zz,getPlayerZ()+yy,80);
	setVelX(spwnarrow,20*xx);
	setVelY(spwnarrow,20*zz);
	setVelZ(spwnarrow,20*yy);
    //Level.addParticle(ParticleType.smoke,Entity.getX(spwnarrow),Entity.getY(spwnarrow),Entity.getZ(spwnarrow),0,0,0,2);
    }
    }));
    layoutf.addView(bfire);
     
     GUIf = new android.widget.PopupWindow(layoutf, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
GUIf.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
GUIf.showAtLocation(ctxf.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.RIGHT, 0, 0);
}catch(err){
clientMessage('An error occured: ' + err);
} }}));
}

function Bfireleave(){
var ctxf = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctxf.runOnUiThread(new java.lang.Runnable({ run: function(){
if(GUIf != null){
GUIf.dismiss();
GUIf = null;
}
}}));
}

function Buttaimnew(){
var ctxa = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctxa.runOnUiThread(new java.lang.Runnable({ run: function(){
try{ 
var layouta = new android.widget.LinearLayout(ctxa);
layouta.setOrientation(1);
     
     var baim = new android.widget.Button(ctxa);
    baim.setText('AIM');
	baim.setTypeface(mcfont);
baim.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
baim.setTextColor(android.graphics.Color.BLACK);
    baim.setOnClickListener(new android.view.View.OnClickListener({
    onClick: function(viewarg){
    if(tap<2){
    tap += 1;
    switch (tap){
    case 1:
    ModPE.setFov(fov[0]);
    break;
    case 2:
    ModPE.resetFov();
    tap = 0;}}
    }
    }));
    layouta.addView(baim);
     
     GUIa = new android.widget.PopupWindow(layouta, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
GUIa.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
GUIa.showAtLocation(ctxa.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.LEFT, 0, 0);
}catch(err){
clientMessage('An error occured: ' + err);
} }}));
}

function Baimleave(){
var ctxa = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctxa.runOnUiThread(new java.lang.Runnable({ run: function(){
if(GUIa != null){
GUIa.dismiss();
GUIa = null;
}
}}));
}

function Aimnew(){
var ctx= com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
try{ 
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
     
     var aimbutton = new android.widget.Button(ctx);
    aimbutton.setText('+');
aimbutton.setTextColor(android.graphics.Color.WHITE);
    aimbutton.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
    layout.addView(aimbutton);
     
     GUI= new android.widget.PopupWindow(layout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
GUI.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
GUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER, -1, -1);
}catch(err){
clientMessage('An error occured: ' + err);
} }}));
}

function Aimleave(){
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
if(GUI != null){
GUI.dismiss();
GUI = null;
}
}}));
}

//GUI HRG

function newHRG()
{
MainActivity.runOnUiThread(new java.lang.Runnable({
run: function(){
try{

PopupWindow = new android.widget.PopupWindow();

var LinearLayout = new android.widget.LinearLayout(MainActivity);
LinearLayout.setOrientation(1);

var File = new android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/menu/HG/HRG.png"));

PopupWindow.setTouchable(false);

PopupWindow.setContentView(LinearLayout);

PopupWindow.setHeight(MainActivity.getWindowManager().getDefaultDisplay().getHeight());
PopupWindow.setWidth(MainActivity.getWindowManager().getDefaultDisplay().getWidth());

PopupWindow.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(File));

PopupWindow.showAtLocation(MainActivity.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.TOP, 0,0);
}catch(err){
print(err);
}
}}));
}

function leaveHRG(){
MainActivity.runOnUiThread(new java.lang.Runnable({ run: function(){
if(PopupWindow != null) {
PopupWindow.dismiss();
PopupWindow = null;
}
}}));
}

//FUNCTIONS

getItemInventory = function(ID,COUNT,DATA)  
{  
if(!COUNT)  
{  
COUNT = 1;  
}  
if(!DATA)  
{  
DATA = 0;  
}  
for(var ii = 0; ii < 35; ii++)  
{  
if(Player.getInventorySlot(ii) == ID && Player.getInventorySlotCount(ii) >= COUNT && Player.getInventorySlotData(ii) == DATA) 
{  
return true  
}}}

//ADDEDHOOK
/*
function entityAddedHook(entity)
{
if (Entity.getEntityTypeId(entity) == 80)
{
if(getItemInventory(1495,1,0))  
{
if(Entity.getVelX(ent) == 0 && Entity.getVelY(ent) == 0 && Entity.getVelZ(ent) == 0)
{	
Level.explode(Entity.getX(ent),Entity.getY(ent),Entity.getZ(ent),10);
}}
{
if(getItemInventory(1496,1,0))  
{
if(Entity.getVelX(ent) == 0 && Entity.getVelY(ent) == 0 && Entity.getVelZ(ent) == 0)
{	
Level.explode(Entity.getX(ent),Entity.getY(ent),Entity.getZ(ent),10,true);
}}
{
if (Entity.getEntityTypeId(entity) == 80)
{
ARROW1.push(entity)
}}}}}*/

//ATTACKHOOK

function attackHook(attacker, victim,x,y,z)
{
if(getCarriedItem()==1491)
{
Entity.setHealth (victim, Entity.getHealth (victim)- 9)
}
if(Player.getCarriedItem()==1491)
{
if(Player.getCarriedItemData()<310)
{
Entity.setCarriedItem(getPlayerEnt(), 1491, Player.getCarriedItemCount(), Player.getCarriedItemData() + 1); 
}else{
Level.playSoundEnt(getPlayerEnt(), "random.break", 100, 100); 
Player.clearInventorySlot(Player.getSelectedSlotId());
}}
{
if(getCarriedItem()==1492)
{
Entity.setHealth (victim, Entity.getHealth (victim)- 5)
}
if(Player.getCarriedItem()==1492)
{
if(Player.getCarriedItemData()<176)
{
Entity.setCarriedItem(getPlayerEnt(), 1492, Player.getCarriedItemCount(), Player.getCarriedItemData() + 1); 
}else{
Level.playSoundEnt(getPlayerEnt(), "random.break", 100, 100); Player.clearInventorySlot(Player.getSelectedSlotId());
}}
{
if(getCarriedItem()==1493)
{
Entity.setHealth (victim, Entity.getHealth (victim) - 7)
}
if(Player.getCarriedItem()==1493)
{
if(Player.getCarriedItemData()<340)
{
Entity.setCarriedItem(getPlayerEnt(), 1493, Player.getCarriedItemCount(), Player.getCarriedItemData() + 1); 
}else{
Level.playSoundEnt(getPlayerEnt(), "random.break", 100, 100); Player.clearInventorySlot(Player.getSelectedSlotId());
}}
{
if(getCarriedItem()==1494)
{
Entity.setHealth (victim, Entity.getHealth (victim) - 11)
}
if(Player.getCarriedItem()==1494)
{
if(Player.getCarriedItemData()<124)
{
Entity.setCarriedItem(getPlayerEnt(), 1494, Player.getCarriedItemCount(), Player.getCarriedItemData() + 1); 
}else{
Level.playSoundEnt(getPlayerEnt(), "random.break", 100, 100); Player.clearInventorySlot(Player.getSelectedSlotId());
}}
{
if(Entity.getEntityTypeId(victim) == 32)
{
var XE = Entity.getX(victim);
var YE = Entity.getY(victim);
var ZE = Entity.getZ(victim);
explode(XE,YE,ZE, 5); 
Entity.remove(victim);
}}}}}}


//DESTROYBLOCK

function destroyBlock(x,y,z)
{
if(Player.getCarriedItem()==1491)
{
if(Player.getCarriedItemData()<310)
{
Entity.setCarriedItem(getPlayerEnt(), 1491, Player.getCarriedItemCount(), Player.getCarriedItemData() + 2); 
}else{
Level.playSoundEnt(getPlayerEnt(), "random.break", 100, 100); Player.clearInventorySlot(Player.getSelectedSlotId());
}}
{
if(Player.getCarriedItem()==1492)
{
if(Player.getCarriedItemData()<176)
{
Entity.setCarriedItem(getPlayerEnt(), 1492, Player.getCarriedItemCount(), Player.getCarriedItemData() + 2); 
}else{
Level.playSoundEnt(getPlayerEnt(), "random.break", 100, 100); Player.clearInventorySlot(Player.getSelectedSlotId());
}}
{
if(Player.getCarriedItem()==1493)
{
if(Player.getCarriedItemData()<340)
{
Entity.setCarriedItem(getPlayerEnt(), 1493, Player.getCarriedItemCount(), Player.getCarriedItemData() + 2); 
}else{
Level.playSoundEnt(getPlayerEnt(), "random.break", 100, 100); Player.clearInventorySlot(Player.getSelectedSlotId());
}}
{
if(Player.getCarriedItem()==1494)
{
if(Player.getCarriedItemData()<124)
{
Entity.setCarriedItem(getPlayerEnt(), 1494, Player.getCarriedItemCount(), Player.getCarriedItemData() + 2); 
}else{
Level.playSoundEnt(getPlayerEnt(), "random.break", 100, 100); Player.clearInventorySlot(Player.getSelectedSlotId());
}}}}}
{
if(getTile(x,y,z) == 1019&&getTile(x,y+1,z) == 1020)
{
level.setTile(x,y+1,z,0);
level.dropitem(x,y,z,0,1445,1,0);
}}
{
if(getTile(x,y,z) == 1020&&getTile(x,y-1,z) == 1019)
{
level.setTile(x,y-1,z,0);
level.dropitem(x,y,z,0,1445,1,0);
}}}


//USEITEM

function useItem(x,y,z,itemid,blockId) 
{ 
setBlock(1000, x, y, z);
{
setBlock(1001, x, y, z);
{
setBlock(1002, x, y, z);
}}
{
if(itemid == 1581&&blockId == 1001||itemid == 1582&&blockId == 1001||itemid == 1583&&blockId == 1001||itemid == 1584&&blockId == 1001||itemid == 1585&&blockId == 1001||itemid == 1586&&blockId == 1001||itemid == 1587&&blockId == 1001||itemid == 1588&&blockId == 1001||itemid == 1589&&blockId == 1001||itemid == 1590&&blockId == 1001||itemid == 1591&&blockId == 1001||itemid == 1592&&blockId == 1001||itemid == 1593&&blockId == 1001||itemid == 1584&&blockId == 1001||itemid == 1594&&blockId == 1001||itemid == 1595&&blockId == 1001) 
{
Entity.setCarriedItem(getPlayerEnt(), 0, 0, 0);
diskette = 1; 
} else {
if(diskette == 1&&blockId == 1001) 
{
Player.addItemInventory(1431, 1, 0);
diskette = 0; 
}}}
{
if(itemid == 1483&&blockId==1018)
{
setTile(x,y,z,0);
{
Level.dropItem(x+0.5, y, z+0.5, 0, 1018, 1, 0);
}}}
{
if(itemid == 1481&&blockId==1003)
{
var rndd1 = Math.round((Math.random()*5)+1)
Level.dropItem(x+0.5, y, z+1.1, 0, 1444, rndd1, 0);
{
setTile(x,y,z,1004);
{
if(getCarriedItem()==1481)
{
if(Player.getCarriedItemData()<60)
{
Entity.setCarriedItem(getPlayerEnt(), 1481, 1, Player.getCarriedItemData()+1);
}else{
Entity.setCarriedItem(getPlayerEnt(), 0, 0, 0);
}}}}}}
{
if(itemid == 1482&&blockId==1003)
{
var rnds1 = Math.round((Math.random()*5)+1)
Level.dropItem(x+0.5, y, z+1.1, 0, 1444, rnds1, 0);
{
setTile(x,y,z,1004);
{
if(getCarriedItem()==1482)
{
if(Player.getCarriedItemData()<200)
{
Entity.setCarriedItem(getPlayerEnt(), 1482, 1, Player.getCarriedItemData()+1);
}else{
Entity.setCarriedItem(getPlayerEnt(), 0, 0, 0);
}}}}}}
{
if(itemid == 351&&blockId==1007)
{
setTile(x,y+1,z,1002);
setTile(x,y+2,z,1002);
setTile(x,y+3,z,1002);
setTile(x,y+4,z,1002);
setTile(x,y+5,z,1002);
setTile(x,y+6,z,1002);
setTile(x,y+7,z,1002);
setTile(x,y+8,z,1005);
setTile(x,y+9,z,1005);
setTile(x,y+10,z,1005);
setTile(x,y+11,z,1005);
setTile(x,y+5,z+1,1005);
setTile(x+1,y+5,z,1005);
setTile(x,y+5,z-1,1005);
setTile(x-1,y+5,z,1005);
setTile(x+1,y+5,z-1,1005);
setTile(x-1,y+5,z+1,1005);
setTile(x-1,y+5,z-1,1005);
setTile(x+1,y+5,z+1,1005);
setTile(x+1,y+5,z+1,1005);
setTile(x,y+6,z+1,1005);
setTile(x+1,y+6,z,1005);
setTile(x,y+6,z-1,1005);
setTile(x-1,y+6,z,1005);
setTile(x+1,y+6,z-1,1005);
setTile(x-1,y+6,z+1,1005);
setTile(x-1,y+6,z-1,1005);
setTile(x-1,y+6,z-1,1005);
setTile(x+1,y+6,z+1,1005);
setTile(x+1,y+6,z+1,1005);
setTile(x,y+7,z+1,1005);
setTile(x+1,y+7,z,1005);
setTile(x,y+7,z-1,1005);
setTile(x-1,y+7,z,1005);
setTile(x+1,y+7,z-1,1005);
setTile(x-1,y+7,z+1,1005);
setTile(x-1,y+7,z-1,1005);
setTile(x-1,y+7,z-1,1005);
setTile(x+1,y+7,z+1,1005);
setTile(x+1,y+7,z+1,1005);
setTile(x,y+8,z+1,1005);
setTile(x+1,y+8,z,1005);
setTile(x,y+8,z-1,1005);
setTile(x-1,y+8,z,1005);
setTile(x+1,y+8,z-1,1005);
setTile(x-1,y+8,z+1,1005);
setTile(x-1,y+8,z-1,1005);
setTile(x-1,y+8,z-1,1005);
setTile(x+1,y+8,z+1,1005);
setTile(x+1,y+8,z+1,1005);
setTile(x+2,y+5,z,1005);
setTile(x,y+5,z+2,1005);
setTile(x-2,y+5,z,1005);
setTile(x,y+5,z-2,1005);
setTile(x-1,y+5,z-2,1005);
setTile(x-2,y+5,z-1,1005);
setTile(x+1,y+5,z+2,1005);
setTile(x+2,y+5,z+1,1005);
setTile(x+1,y+5,z-2,1005);
setTile(x-1,y+5,z+2,1005);
setTile(x+2,y+5,z-1,1005);
setTile(x-2,y+5,z+1,1005);
setTile(x+2,y+6,z,1005);
setTile(x,y+6,z+2,1005);
setTile(x-2,y+6,z,1005);
setTile(x,y+6,z-2,1005);
setTile(x-1,y+6,z-2,1005);
setTile(x-2,y+6,z-1,1005);
setTile(x+1,y+6,z+2,1005);
setTile(x+2,y+6,z+1,1005);
setTile(x+1,y+6,z-2,1005);
setTile(x-1,y+6,z+2,1005);
setTile(x+2,y+6,z-1,1005);
setTile(x-2,y+6,z+1,1005);
}
{
if(blockId==1018)
{
Level.dropItem(x+0.5, y+0.9, z+0.5, 0, 297, 2, 0);
}}
{
if(itemid == 1445&&getTile(x,y,z) != 0)
{
setTile(x,y+1,z,1019);
setTile(x,y+2,z,1020);
}}}}


//EATHOOK

function eatHook(hearts, saturationRatio)
{
if(getCarriedItem() == 1404)
{
Player.addItemInventory(1400, 1, 0);
}
{
if(getCarriedItem() == 1405)
{
Player.addItemInventory(1400, 1, 0);
}}
{
if(getCarriedItem() == 1406)
{
Player.addItemInventory(1400, 1, 0);
}}
{
if(getCarriedItem() == 1401)
{
Entity.setHealth(getPlayerEnt(), 20);
{
clientMessage("§6[Status]§f Regenerating...");
}}}
{
if(getCarriedItem() == 1402)
{
Entity.addEffect(getPlayerEnt(),MobEffect. movementSpeed ,1200,4,false,false);
{
Entity.addEffect(getPlayerEnt(),MobEffect. digSpeed ,1200,4,false,false);
{
Entity.addEffect(getPlayerEnt(),MobEffect. regeneration ,1200,4,false,false);
{
Entity.addEffect(getPlayerEnt(),MobEffect.jump ,1200,4,false,false);
{
Entity.addEffect(getPlayerEnt(),MobEffect. damageResistance ,1200,4,false,false);
{
Entity.addEffect(getPlayerEnt(),MobEffect.fireResistance,1200,4,false,false);
{
Entity.addEffect(getPlayerEnt(),MobEffect. waterBreathing ,1200,4,false,false);
{
Entity.addEffect(getPlayerEnt(),MobEffect. invisibility,1200,4,false,false);
{
Entity.addEffect(getPlayerEnt(),MobEffect. nightVision ,1200,4,false,false);
{
Entity.addEffect(getPlayerEnt(),MobEffect. damageBoost ,1200,4,false,false);
}}}}}}}}}}}
{
if(getCarriedItem() == 1403)
{
ZDise = 0;
}}
{
if(getCarriedItem() == 367)
{
ZDise += 1;
}}}

//MODTICK

function modTick()	
{
if(ZDise >= 1)
{
time--;
if(time == 0)
{
ZDise += 1;
time = rnd2 *20;
}}
{
if(ZDise >= 11)
{
if(ZDise < 50)
{
Entity.addEffect(getPlayerEnt(),17, 80, 0, false,false);
}}}
{
if(ZDise >= 50)
{
if(ZDise < 100)
{
Entity.addEffect(getPlayerEnt(),2, 60, 1, false,false);
{
Entity.addEffect(getPlayerEnt(),17, 80, 0, false,false);
}}}}
{
if(ZDise >= 100)
{
if(ZDise < 150)
{
Entity.addEffect(getPlayerEnt(),2, 60, 1, false,false);
{
Entity.addEffect(getPlayerEnt(),17, 80, 0, false,false);
{
Entity.addEffect(getPlayerEnt(),4, 80, 2, false,false);
}}}}}
{
if(ZDise >= 150)
{
clientMessage('§4Твой разум поглотил мрак, тебя уже никто не сможет спасти, теперь, то, что от тебя осталось, будет бродить по миру до тех пор пока не найдет свою смерть!');
}}
{
ModPE.showTipMessage("Ammo: " + AK47 + "/" + ak47 + " Lv: " + ZDise);
}
{
if(getCarriedItem() == 1491)
{
Block.setDestroyTime(5, 1);
Block.setDestroyTime(17, 1);
Block.setDestroyTime(44, 1);
Block.setDestroyTime(54, 1.25);
Block.setDestroyTime(53, 1);
Block.setDestroyTime(65, 0.2);
Block.setDestroyTime(85, 1);
Block.setDestroyTime(96, 1.5);
}else{
Block.setDestroyTime(5, 2);
Block.setDestroyTime(17, 2);
Block.setDestroyTime(44, 2);
Block.setDestroyTime(54, 2.5);
Block.setDestroyTime(53, 2);
Block.setDestroyTime(65, 0.4);
Block.setDestroyTime(85, 2);
Block.setDestroyTime(96, 3);
}}
{
if(getCarriedItem() >= 1497&&getCarriedItem() <= 1513)
if(buttf == false&&butta == false&&butt == false)
{
buttf = true;
butta = true;
butt = true;
Buttfirenew();
Buttaimnew();
Aimnew();
}else{
if(buttf == true&&butta == true&&butt == true)
{
buttf = false;
butta = false;
butt = false;
Bfireleave();
Baimleave();
Aimleave();
ModPE.resetFov();
}}}
{
if(Player.getArmorSlot(0) == 1611 && HRG == false)
{
HRG = true;
newHRG();
}else{
HRG = false;
leaveHRG();
}}
/*{
for(iarr = 0; iarr < ARROW.length; iarr++) 
{
if(Entity.getVelX(ARROW[iarr])==0 && Entity.getVelY(ARROW[iarr])==0 && Entity.getVelZ(ARROW[iarr])==0 && Entity.getEntityTypeId(ARROW[iarr])==80) 
{
Entity.remove(ARROW[iarr]);      
}}}*/
{
if(Player.getArmorSlot(0) == 1611&&Player.getArmorSlot(1) == 1612&&Player.getArmorSlot(2) == 1613&&Player.getArmorSlot(3) == 1614)
{
Translation.addTranslation("potion.poison","Отравление");
Entity.addEffect(getPlayerEnt(), 13, 40, 0, false,false);
}else{
Translation.addTranslation("potion.poison","Радиация");
Entity.addEffect(getPlayerEnt(), 19, 40, 0, false,false);
}}}



//SCREENCHANGEHOOK


function screenChangeHook(name)
{
if(name=='crafting_screen' || name=='anvil_screen_pocket' || name=='beacon_screen_pocket' || name=='brewing_stand_pocket' || name=='chest_screen' ||name=='chat_screen'||name=='comand_block_screen'||name=='death_screen'||name=='furnace_screen_pocket'||name=='debug_screen' || name=='enchanting_screen_pocket'||name=='horse_screen_pocket'||name=='in_bed_screen'||name=='in_bed_screen'||name=='inventory_screen'|| name=='pause_screen'|| name=='settings_screen'||name=='trade_screen_pocket')

{
	buttf = false;
		butta = false;
			butt = false;
				Bfireleave();
					Baimleave();
						Aimleave();
							leaveHRG();
}}

