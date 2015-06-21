/*



*/
var fps = 60, volume = 1;
var C1 = document.getElementById("C1"); ctx1 = C1.getContext("2d");
var mouse = {x:C1.width/2,y:0}, mousepress = false, middlepress = false, rightpress = false;
var Loading = 0, Ready = false;
var before = new Date();

C1.draggable = false;

//Math
var PI = Math.pi, Lakh = 100000, Crore = 10000000, Arab = 1000000000, Padm = 1000000000000000;
var Million = Math.pow(1000,1+1), Billion = Math.pow(1000,2+1), Trillion = Math.pow(1000,3+1), Quadrillion = Math.pow(1000,4+1), Quintillion = Math.pow(1000,5+1), Sextillion = Math.pow(1000,6+1), Septillion = Math.pow(1000,7+1);

//sprites
var cur = new Image(); cur.src = "sprites/cursor.png";
var cur1 = new Image(); cur1.src = "sprites/cursor.png";
var cur1_mine = new Image(); cur1_mine.src = "sprites/cursor_mine.png";
var cur2_mine = new Image(); cur2_mine.src = "sprites/cursor_mine2.png";

var bg = new Image(); bg.src = "sprites/background1.png";

var stone1 = new Image(); stone1.src = "sprites/stone.png";
var audioicon = new Image(); audioicon.src = "sprites/audioicon.png";
var audioslider = new Image(); audioslider.src = "sprites/audioslider.png";
var stone_par = new Image(); stone_par.src = "sprites/stone_par.png";
var stone_par1 = new Image(); stone_par1.src = "sprites/stone_par1.png";
var stone_par2 = new Image(); stone_par2.src = "sprites/stone_par2.png";
var stone_item = new Image(); stone_item.src = "sprites/pebble.png";
var bronze_item = new Image(); bronze_item.src = "sprites/bronze.png";
var diamond_tex = new Image(); diamond_tex.src = "sprites/diamond_texture.png";
var sapphire_tex = new Image(); sapphire_tex.src = "sprites/sapphire_texture.png";
var amethyst_tex = new Image(); amethyst_tex.src = "sprites/amethyst_texture.png";
var emerald_tex = new Image(); emerald_tex.src = "sprites/emerald_texture.png";
var goldpick = new Image(); goldpick.src = "sprites/goldenpick.png";
var emblemicon = new Image(); emblemicon.src = "sprites/emblem2.png";
var pickicon = new Image(); pickicon.src = "sprites/pickaxe1.png";
var emeraldicon = new Image(); emeraldicon.src = "sprites/emerald1.png";

var tablatch = new Image(); tablatch.src = "sprites/TabLatch.png";
var tablatch2 = new Image(); tablatch2.src = "sprites/TabLatch2.png";

var stonepickicon2 = new Image(); stonepickicon2.src = "sprites/pickaxe.png";
var bronzepickicon2 = new Image(); bronzepickicon2.src = "sprites/pickaxe_bronze.png";

var stonedwarf_1 = new Image(); stonedwarf_1.src = "sprites/dwarf_stone1.png";
var stonedwarf_2 = new Image(); stonedwarf_2.src = "sprites/dwarf_stone2.png";
var stonedwarf_3 = new Image(); stonedwarf_3.src = "sprites/dwarf_stone3.png";
var stonedwarf_4 = new Image(); stonedwarf_4.src = "sprites/dwarf_stone4.png";
var stonedwarf_5 = new Image(); stonedwarf_5.src = "sprites/dwarf_stone5.png";
var bronzedwarf_1 = new Image(); bronzedwarf_1.src = "sprites/dwarf_bronze1.png";
var bronzedwarf_2 = new Image(); bronzedwarf_2.src = "sprites/dwarf_bronze2.png";
var bronzedwarf_3 = new Image(); bronzedwarf_3.src = "sprites/dwarf_bronze3.png";
var bronzedwarf_4 = new Image(); bronzedwarf_4.src = "sprites/dwarf_bronze4.png";
var bronzedwarf_5 = new Image(); bronzedwarf_5.src = "sprites/dwarf_bronze5.png";

var shopmid = new Image(); shopmid.src = "sprites/shop_middle.png";
var footer = new Image(); footer.src = "sprites/footer.png";
var spokes = new Image(); spokes.src = "sprites/spokes.png";

var logo = new Image(); logo.src = "extra/logo5.png";


//gradients
var grad_g = ctx1.createLinearGradient(0,0,0,120);
	grad_g.addColorStop(0.0,"#ff5");
	grad_g.addColorStop(0.5,"#ff5");
	grad_g.addColorStop(0.51,"#da0");
	grad_g.addColorStop(1,"#da0");
var grad_sl = ctx1.createLinearGradient(0,0,0,90);
	grad_sl.addColorStop(0.0,"#fff");
	grad_sl.addColorStop(0.5,"#fff");
	grad_sl.addColorStop(0.51,"#aaa");
	grad_sl.addColorStop(1,"#aaa");
var grad_b = ctx1.createLinearGradient(0,0,0,60);
	grad_b.addColorStop(0.0,"#c82");
	grad_b.addColorStop(0.5,"#c82");
	grad_b.addColorStop(0.51,"#a40");
	grad_b.addColorStop(1,"#a40");
var grad_redbutton = ctx1.createLinearGradient(0, 50.000, 0, 0.000);
      grad_redbutton.addColorStop(0.000, 'rgba(96, 5, 5, 1.000)');
      grad_redbutton.addColorStop(0.495, 'rgba(40, 1, 1, 1.000)');
      grad_redbutton.addColorStop(0.499, 'rgba(114, 8, 8, 1.000)');
      grad_redbutton.addColorStop(1.000, 'rgba(188, 28, 28, 1.000)');
var grad_redbutton2 = ctx1.createLinearGradient(0, 50.000, 0, 0.000);
      grad_redbutton2.addColorStop(0.000, 'rgba(181, 19, 19, 1.000)');
      grad_redbutton2.addColorStop(0.495, 'rgba(96, 5, 5, 1.000)');
      grad_redbutton2.addColorStop(0.499, 'rgba(178, 17, 17, 1.000)');
      grad_redbutton2.addColorStop(1.000, 'rgba(244, 58, 58, 1.000)');
var grad_bluebutton = ctx1.createLinearGradient(0, 50.000, 0, 0.000);
	  grad_bluebutton.addColorStop(0.000, 'rgba(89, 124, 120, 1.000)');
      grad_bluebutton.addColorStop(0.495, 'rgba(43, 58, 61, 1.000)');
      grad_bluebutton.addColorStop(0.499, 'rgba(99, 129, 132, 1.000)');
      grad_bluebutton.addColorStop(1.000, 'rgba(82, 107, 117, 1.000)');
var grad_bluebutton2 = ctx1.createLinearGradient(0, 50.000, 0, 0);
	  grad_bluebutton2.addColorStop(0.000, 'rgba(89, 174, 180, 1.000)');
	  grad_bluebutton2.addColorStop(0.495, 'rgba(43, 98, 121, 1.000)');
	  grad_bluebutton2.addColorStop(0.499, 'rgba(99, 199, 212, 1.000)');
	  grad_bluebutton2.addColorStop(1.000, 'rgba(82, 187, 187, 1.000)');



//SFX
var mine1 = new Audio(); mine1.src = "sfx/Mine1.wav";
var mine2 = new Audio(); mine2.src = "sfx/Mine2.wav";
var mine3 = new Audio(); mine3.src = "sfx/Mine3.wav";
var mine4 = new Audio(); mine4.src = "sfx/Mine4.wav";
var mine5 = new Audio(); mine5.src = "sfx/Mine5.wav";
var mine6 = new Audio(); mine6.src = "sfx/Mine6.wav";
var mine7 = new Audio(); mine7.src = "sfx/Mine7.wav";
var mine8 = new Audio(); mine8.src = "sfx/Mine8.wav";
var shop_in = new Audio(); shop_in.src = "sfx/openpack.wav";
var shop_out = new Audio(); shop_out.src = "sfx/closepack.wav";
var stone_pickup = new Audio(); stone_pickup.src = "sfx/CollectStone.wav";
var bronze_pickup = new Audio(); bronze_pickup.src = "sfx/CollectStone.wav";
var buy = new Audio(); buy.src = "sfx/Purchase.wav";
var sell = new Audio(); sell.src = "sfx/Purchase_inv.wav";
var click1 = new Audio(); click1.src = "sfx/click.wav";
var switch1 = new Audio(); switch1.src = "sfx/switch.wav";
var fail = new Audio(); fail.src = "sfx/Failed.wav";


function SPick(){
	s = Math.floor(Math.random()*8)+1
	switch( s ){
		case 1: mine1.curentTime = 0; mine1.volume = volume; mine1.play(); break;
		case 2: mine2.curentTime = 0; mine2.volume = volume; mine2.play(); break;
		case 3: mine2.curentTime = 0; mine3.volume = volume; mine3.play(); break;
		case 4: mine2.curentTime = 0; mine4.volume = volume; mine4.play(); break;
		case 5: mine1.curentTime = 0; mine5.volume = volume; mine5.play(); break;
		case 6: mine2.curentTime = 0; mine6.volume = volume; mine6.play(); break;
		case 7: mine2.curentTime = 0; mine7.volume = volume; mine7.play(); break;
		case 8: mine2.curentTime = 0; mine8.volume = volume; mine8.play(); break;
	}
}


//objects
var Key = {shift:false,ctrl:false};
var pick = {stone:1,bronze:0,silver:0,gold:0,ruby:0,emerald:0,sapphire:0,diamond:0,amethyst:0,quartz:0,onyx:0,sardonyx:0,opal:0};
var stone = {clicks:0,x:500,y:300,width:200,spr:stone1,dur:10};
var Shops = {x:300,slot:0,scroll:[0,0,0]}
var Statmenu = {x:300,slot:0,scroll:[0,0,0]}
var Helpers = [];
var Upgrades = [];
/*	{name:"Test",color:"#345"};
	{name:"dfg",color:"#ddd"};*/
var stats = {clicks:0,stone:0,bronze:-1,silver:-1,gold:-1,ruby:-1,emerald:-1,sapphire:-1,diamond:-1,amethyst:-1,quartz:-1,onyx:-1,sardonyx:-1,opal:-1};
//var statsadd = {stone:0,bronze:0,silver:0,gold:0,ruby:0,emerald:0,sapphire:0,diamond:0,amethyst:0,quartz:0,onyx:0,sardonyx:0,opal:0}
var particles = [];
var helper1 = new Helper("Stone Dwarf","S",1,1,10,5,"S",1,false,stonedwarf_1);Helpers.push(helper1);
var helper1 = new Helper("Stone DecaDwarf","S",1,10,100,59,"S",1,true,stonedwarf_2);Helpers.push(helper1);
var helper1 = new Helper("Stone CentaDwarf","S",1,100,1000,599,"S",1,true,stonedwarf_3);Helpers.push(helper1);
var helper1 = new Helper("Stone KiloDwarf","S",1,1000,10000,5999,"S",1,true,stonedwarf_4);Helpers.push(helper1);
var helper1 = new Helper("Stone LakhDwarf","S",1,100000,1000000,599999,"S",1,true,stonedwarf_5);Helpers.push(helper1);
var helper1 = new Helper("Bronze Dwarf","B",2,1,10,7,"B",2,true,bronzedwarf_1);Helpers.push(helper1);
var helper1 = new Helper("Bronze DecaDwarf","B",2,10,110,79,"B",2,true,bronzedwarf_2);Helpers.push(helper1);
var helper1 = new Helper("Bronze CentaDwarf","B",2,100,1100,799,"B",2,true,bronzedwarf_3);Helpers.push(helper1);
var helper1 = new Helper("Bronze KiloDwarf","B",2,1000,11000,7999,"B",2,true,bronzedwarf_4);Helpers.push(helper1);
var helper1 = new Helper("Bronze LakhDwarf","B",2,10000,110000,79999,"B",2,true,bronzedwarf_5);Helpers.push(helper1);

var upgrade1 = new Upgrade("Sharpen",1,"S",1,1,5,4,false,stonepickicon2,"Stone pick is","twice as efficient");Upgrades.push(upgrade1);
var upgrade1 = new Upgrade("Dual-wield",2,"S",1,1,20,5,true,stonepickicon2,"Mine twice as","much Stone");Upgrades.push(upgrade1);
var upgrade1 = new Upgrade("Bronze Pickaxe",3,"S",1,1,299,1,true,bronzepickicon2,"Mine Bronze from","the Infinite Stone");Upgrades.push(upgrade1);
var upgrade1 = new Upgrade("",4,"S",1,1,2999,10,true,stonepickicon2,"Mine +1% of","the total Stone");Upgrades.push(upgrade1);

function Bound(x1, y1, x2, y2, r1, r2){
	if( x1 > x2-r1 && x1 < x2+r1 && y1 > y2-r2 && y1 < y2+r2 ){return true;}else{return false;};
}

//constructors
function Particle(spr,x,y,mode){
	this.x = x; this.y = y; this.gravity = true;
	this.spr = spr;
	this.vx = Math.floor((Math.random()*20)-10)/4;
	this.vy = Math.floor((Math.random()*10)-5)/2;
	this.life = 70+Math.random()*20;
	if( mode == "up" ){
		this.gravity = false; this.vx = 0; this.vy = -1;
		this.text = true;this.life = 30;
	} 
}

function Helper(name,type,typen,n,cost,add,ctype,cnum,hidden,spr){
	this.name = name;
	this.type = type;
	this.xtype = typen;
	this.ctype = ctype;
	this.nps = n;
	this.count = 0;
	this.timer = -1;
	this.cost = cost;
	this._cost = cost;
	this.xcost = add;
	this.cnum = cnum;
	if( hidden == true ){ this.hidden = true }else{ this.hidden = false };
	this.worth = function(){
		return StatIndex( this.cnum );
	}
	
	this.spr = spr;
}

function Upgrade(name,id,ctype,cnum,n,cost,uses,hidden,spr,line1,line2){
	this.name = name; this.id = id; this.type = "";
	if( uses > 0 ){ this.uses = uses }else{ uses = 1 };
	this.n = n;
	this.spr = spr;
	this.cost = cost;
	this.ctype = ctype;
	this.cnum = cnum;
	this.desc1 = line1; this.desc2 = line2;
	if( hidden == true ){ this.hidden = true }else{ this.hidden = false };
	switch (id){
		case 1:{ //Pickaxe Upgrade
			this.type = "Pickaxe";
			break;
		}
	}
	this.worth = function(){
		return StatIndex( this.cnum );
	}
	this.buy = function(n){
		switch (this.id){
			case 1:{
				if( this.uses > 0){
					RemoveIndex(this.n,this.cost);
					stone.dur = stone.dur/2;
					this.cost = this.cost*10;
					this.uses--;
				}
				if( this.uses <= 0 ){
					this.cost = Infinity;
					this.hidden = true;
				}
				break;
			}
			case 2:{
				if( this.uses > 0 ){
					RemoveIndex(this.n,this.cost);
					pick.stone = pick.stone*2;
					this.cost = this.cost*5;
				}
				break;
			}
		}
	}
}


//other
function Abbrev(n, x){
	if( typeof x == "number" && x > 0 && x <10 ){ X = x }else{ X = 1 }
	if( typeof n == "number" && n != Infinity ){
		if( n/Septillion >= 1 ){ N=(n/Septillion); return N.toFixed(X)+"Y"; }
		if( n/Sextillion >= 1 ){ N=(n/Sextillion); return N.toFixed(X)+"Z"; }
		if( n/Quintillion >= 1 ){ N=(n/Quintillion); return N.toFixed(X)+"E"; }
		if( n/Quadrillion >= 1 ){ N=(n/Quadrillion); return N.toFixed(X)+"P"; }
		if( n/Trillion >= 1 ){ N=(n/Trillion); return N.toFixed(X)+"T"; }
		if( n/Billion >= 1 ){ N=(n/Billion); return N.toFixed(X)+"G"; }
		if( n/Million >= 1 ){ N=(n/Million); return N.toFixed(X)+"M"; }
		else if( n/1000 >= 1 ){ N=(n/1000); return N.toFixed(X)+"K"; }
		else{ return n; }
	}else{ console.log("[Abbrev] error: value of 'n' isn't a valid number; returning..."); }
}



function StatIndex(n){
	switch( n ){
		case 1: return stats.stone; break;
		case 2: return stats.bronze; break;
		case 3: return stats.silver; break;
		case 4: return stats.gold; break;
		case 5: return stats.ruby; break;
		case 6: return stats.emerald; break;
		case 7: return stats.sapphire; break;
		case 8: return stats.diamond; break;
		case 9: return stats.amethyst; break;
		case 10: return stats.quartz; break;
		default: console.log("[StatIndex] error: can't recognize stat index; returning...");
	}
}

function AddIndex(n,x){
	switch( n ){
		case 1: stats.stone += x; break;
		case 2: stats.bronze += x; break;
		case 3: stats.silver += x; break;
		case 4: stats.gold += x; break;
		case 5: stats.ruby += x; break;
		case 6: stats.emerald += x; break;
		case 7: stats.sapphire += x; break;
		case 8: stats.diamond += x; break;
		case 9: stats.amethyst += x; break;
		case 10: stats.quartz += x; break;
		default: console.log("[AddIndex] error: can't recognize stat index; returning...");
	}
}

function RemoveIndex(n,x){
	switch( n ){
		case 1: stats.stone -= x; break;
		case 2: stats.bronze -= x; break;
		case 3: stats.silver -= x; break;
		case 4: stats.gold -= x; break;
		case 5: stats.ruby -= x; break;
		case 6: stats.emerald -= x; break;
		case 7: stats.sapphire -= x; break;
		case 8: stats.diamond -= x; break;
		case 9: stats.amethyst -= x; break;
		case 10: stats.quartz -= x; break;
		default: console.log("[RemoveIndex] error: can't recognize stat index; returning...");
	}
}

