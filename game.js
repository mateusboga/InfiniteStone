function Loaded(){
	window.setTimeout(function(){
	console.log("Ready!")
	Ready = true;
	},200)
}

$(document).ready(resize());
$(window).load(Loaded());
$(window).resize(resize);

function resize(){
	C1.width = $(window).width()-2;
	C1.height = $(window).height()-2;
	stone.x = C1.width/2; stone.y = C1.height/2;
}

window.setInterval(function(){

	

	//-------//

	if( Ready == true ){
		document.getElementById("title").innerHTML = ("S - "+Abbrev(stats.stone)+";")
		Draw();
		Particles();
		if( Bound(mouse.x,mouse.y,stone.x,stone.y,stone.width/2,stone.width/2) ){
			//hovering stone
			if( mousepress == false ){ /*cur = cur2_mine*/ }
		}else{
			 C1.style.cursor = "url(sprites/cursor.png), auto";//cur = cur1
		}
		if( (mouse.x < 90 || mouse.x < Shops.x) && mouse.y < C1.height-70 && Shops.x < 300 ){/**/  if( Shops.x < 20 ){ shop_in.volume = volume/4; shop_in.play(); };Shops.x -= (Shops.x-300)/4; }
		else if( Shops.x > 0 && ( mouse.x > Shops.x || mouse.y > C1.height-70 ) ){/**/ if( Shops.x > 20 ){ shop_out.volume = volume/4; shop_out.play(); };Shops.x -= (Shops.x-0)/8 }

		if( (mouse.x > C1.width-90 || mouse.x > C1.width-Statmenu.x) && mouse.y < C1.height-70 && Statmenu.x < 300 ){/**/  if( Statmenu.x < 20 ){  shop_in.volume = volume/6; shop_in.play(); };Statmenu.x -= (Statmenu.x-300)/4; }
		else if( Statmenu.x > 0 && ( mouse.x < C1.width-Statmenu.x || mouse.y > C1.height-70 ) ){/**/ if( Statmenu.x > 20 ){  shop_out.volume = volume/6; shop_out.play(); };Statmenu.x -= (Statmenu.x-0)/8 }
		
		if( mousepress == true && Bound(mouse.x,mouse.y,60,C1.height-40,45,10) ){
			volume = ((mouse.x-15)/100);
		}
		
		
		for( i=0; i < Helpers.length; i++ ){ helper = Helpers[i];
			if( helper.count > 0 ){helper.timer--;
			if( helper.timer <= 0){
				helper.timer = 60/(helper.count); AddIndex(helper.xtype,helper.nps);
				helper.cost = helper._cost + helper.xcost*helper.count;
			}
			}else{
				helper.cost = helper._cost + helper.xcost*helper.count;
			}
		}
		if( mousepress == true && mouse.x < 20 && mouse.y < C1.height-90 && mouse.y > 40 ){
			Shops.scroll[Shops.slot] = -mouse.y+40;
		}
	}else{
		DrawLoading();
		console.log("test");
	}
	
},1000/fps)


function DrawCursor(x,y){
	ctx1.drawImage(cur,x,y);
}



function DrawLoading(){
	ctx1.clearRect(0,0,C1.width,C1.height);
	ctx1.fillStyle = "#211"
	ctx1.fillRect(0,0,C1.width,C1.height);
	ctx1.fillStyle = "#fff"; ctx1.font = "Bold 17px Vollkorn"; ctx1.textAlign = "center";
	ctx1.fillText("Loading...",C1.width/2,C1.height/2+50)
}



function Draw(){
	ctx1.clearRect(0,0,C1.width,C1.height);
	//ctx1.shadowColor = "#000"
	//ctx1.shadowBlur = 10;
	
	ctx1.font = "Bold 17px Vollkorn"; ctx1.textAlign = "right"
	ctx1.fillStyle = "#ddd";ctx1.fillText("S: "+Abbrev(stats.stone,3),C1.width-20,20);
	if( stats.bronze >= 0 ){ctx1.fillStyle = grad_b;ctx1.fillText("B: "+Abbrev(stats.bronze,3),C1.width-20,35);}
	if( stats.silver >= 0 ){ctx1.fillStyle = grad_sl;ctx1.fillText("Sl: "+Abbrev(stats.silver,3),C1.width-20,50);}
	if( stats.gold >= 0 ){ctx1.fillStyle = grad_g;ctx1.fillText("G: "+Abbrev(stats.gold,3),C1.width-20,65,C1.width-300,30);}
	if( stats.ruby >= 0 ){ctx1.fillStyle = "#e23";ctx1.fillText("R: "+Abbrev(stats.ruby,3),C1.width-20,80);}
	e_fill = ctx1.createPattern(emerald_tex,"repeat");
	if( stats.emerald >= 0 ){ctx1.fillStyle = e_fill;ctx1.fillText("E: "+Abbrev(stats.emerald,3),C1.width-20,95);}
	sa_fill = ctx1.createPattern(sapphire_tex,"repeat");
	if( stats.sapphire >= 0 ){ctx1.fillStyle = sa_fill;ctx1.fillText("Sa: "+Abbrev(stats.sapphire,3),C1.width-20,110);}
	d_fill = ctx1.createPattern(diamond_tex,"repeat");
	if( stats.diamond >= 0 ){ctx1.fillStyle = d_fill;ctx1.fillText("D: "+Abbrev(stats.diamond,3),C1.width-20,125);}
	a_fill = ctx1.createPattern(amethyst_tex,"repeat");
	if( stats.amethyst >= 0 ){ctx1.fillStyle = a_fill;ctx1.fillText("A: "+Abbrev(stats.amethyst,3),C1.width-20,140);}
	if( stats.quartz >= 0 ){ctx1.fillStyle = "#fff";ctx1.fillText("Q: "+Abbrev(stats.quartz,3),C1.width-20,155);}
	ctx1.textAlign = "center";ctx1.fillStyle = "#aaa";ctx1.font = "15px Vollkorn";
	
	
	
	/*
	ctx1.fillText("With avarice and greed,",C1.width/2,C1.height-100);
	ctx1.fillText("will come immortals and champions;",C1.width/2,C1.height-80);
	ctx1.fillText("Whomever shall mine the Infinite Stone",C1.width/2,C1.height-60);
	ctx1.fillText("may never find a stop.",C1.width/2,C1.height-40);
	*/
	ctx1.font = "Bold 20px Vollkorn";
	ctx1.drawImage(stone.spr,Math.floor(stone.x)-stone.spr.width/2,Math.floor(stone.y)-stone.spr.height/2);
	
	ctx1.drawImage(spokes,C1.width/2-spokes.width/2,0);
	
	ctx1.drawImage(logo,(C1.width/2)-(logo.width/4),0,logo.width/2,logo.height/2);
	DrawShops();
	DrawStatmenu();
	
	ctx1.save();
	ctx1.translate(0,(C1.height-70));
	footer_fill = ctx1.createPattern(footer,"repeat-x");
	ctx1.fillStyle = footer_fill;
	ctx1.fillRect(0,0,C1.width,70);
	ctx1.translate(0,-(C1.height-70));
	ctx1.restore();
	
	ctx1.fillStyle = "#222";
	ctx1.fillRect(10,C1.height-39,100,5);
	ctx1.drawImage(audioicon,120,C1.height-50)
	ctx1.drawImage(audioslider,(volume*100)+10-2,C1.height-45-2);
	
	//if( Key.ctrl == true ){ ctx1.fillRect(mouse.x,mouse.y,30,30) }
	
	//DrawCursor(mouse.x,mouse.y);
	
}

function DrawShops(){
	shopmid_fill = ctx1.createPattern(shopmid,"repeat");
	ctx1.fillStyle = "#c8994f";
	ctx1.fillRect(-300+Shops.x,0,300,C1.height-70);
	ctx1.drawImage(tablatch,Math.ceil(Shops.x),Math.floor(C1.height/2)-tablatch.height/2);
	ctx1.drawImage(emeraldicon,Math.ceil(Shops.x),Math.floor(C1.height/2)-emeraldicon.height/4,emeraldicon.width/2,emeraldicon.height/2);
	ctx1.fillStyle = shopmid_fill;
	ctx1.fillRect(10-300+Shops.x,40,300-20,C1.height-70-50);
	if( Shops.slot == 0 ){
		DrawHelpers();
		ctx1.fillStyle = "#aaa";ctx1.fillRect(-300+Shops.x,0,300,40);ctx1.fillStyle = "#777";
		ctx1.fillRect(-250+Shops.x,5,30,30);ctx1.fillStyle = "#eee";
		ctx1.fillRect(-300+Shops.x,-Shops.scroll[Shops.slot]+40,10,20);
	};
	if( Shops.slot == 1 ){
		DrawUpgrades();
		ctx1.fillStyle = "#aaa";ctx1.fillRect(-300+Shops.x,0,300,40);ctx1.fillStyle = "#777";
		ctx1.fillRect(-200+Shops.x,5,30,30);ctx1.fillStyle = "#eee";
		ctx1.fillRect(-300+Shops.x,-Shops.scroll[Shops.slot]+40,10,20);
	};
	if( Shops.slot == 2 ){
		ctx1.fillStyle = "#aaa";ctx1.fillRect(-300+Shops.x,0,300,40);ctx1.fillStyle = "#777";
		ctx1.fillRect(-150+Shops.x,5,30,30)
	};
	
	ctx1.fillStyle = "#aaa";ctx1.fillRect(10-300+Shops.x,C1.height-80,300-20,10);
	ctx1.drawImage(emblemicon,-250+Shops.x,5,30,30); ctx1.drawImage(emeraldicon,-200+Shops.x,5,30,30); ctx1.drawImage(pickicon,-150+Shops.x,5,30,30)
	
	if( mouse.y < 40 ){// ---  Display Tab Names  ---
		ctx1.font = "Bold 15px Vollkorn";
		if(mouse.x > -150+Shops.x && mouse.x < -150+Shops.x+30){
			//ctx1.fillStyle="#000";ctx1.fillRect(-150+Shops.x-5,60-40,100,30);
			ctx1.fillStyle = "#fff";
			ctx1.textAlign = "center";ctx1.fillText("Pickaxe",-150+Shops.x+15,15)
		}
		if(mouse.x > -200+Shops.x && mouse.x < -200+Shops.x+30){
			//ctx1.fillStyle="#000";ctx1.fillRect(-200+Shops.x-5,60-40,110,30);
			ctx1.fillStyle = "#fff";
			ctx1.textAlign = "center";ctx1.fillText("Upgrades",-200+Shops.x+15,15)
		}
		if(mouse.x > -250+Shops.x && mouse.x < -250+Shops.x+30){
			//ctx1.fillStyle="#000";ctx1.fillRect(-250+Shops.x-5,60-40,100,30);
			ctx1.fillStyle = "#fff";
			ctx1.textAlign = "center";ctx1.fillText("Helpers",-250+Shops.x+15,15)
		}
	}
	
	if( mouse.y < 70 && mouse.y > 40 && mouse.x < Shops.x && Shops.scroll[Shops.slot] < 0 ){
		Shops.scroll[Shops.slot]++;
	}
	if( mouse.y > C1.height-140 && mouse.x < Shops.x && Shops.scroll[Shops.slot] > -C1.height+130 ){
		Shops.scroll[Shops.slot]--;
	}
}

function DrawHelpers(){
	for( i=0; i < Helpers.length; i++ ){ helper = Helpers[i];
		scroll = Shops.scroll[Shops.slot]*2
		if( helper.worth()*4 > helper.cost ){ helper.hidden = false };
		if( -35+(80*(i+1))+(3*(i+1))+scroll > -40 && -35+(80*(i+1))+(3*(i+1))+scroll < C1.height-80 ){
			if( helper.hidden == false ){
			if( Key.shift && Key.ctrl ){ cost = helper.cost*1000 }else if(Key.shift){cost = helper.cost*100}else if( Key.ctrl ){ cost = helper.cost*10 }else{cost = helper.cost};
			
			ctx1.save();
			SetupGrad(0,-35+(80*(i+1))+(3*(i+1))+scroll,0);
			ctx1.fillStyle = grad_bluebutton;if( helper.worth() < helper.cost ){ctx1.fillStyle = grad_redbutton;if( mouse.x > 15-300+Shops.x && mouse.y > -35+(80*(i+1))+(3*(i+1))+scroll && mouse.x < 15-300+Shops.x+300-30 && mouse.y < -35+(80*(i+1))+(3*(i+1))+80+scroll ){ ctx1.fillStyle = grad_redbutton2; }}
			else if( mouse.x > 15-300+Shops.x && mouse.y > -35+(80*(i+1))+(3*(i+1))+scroll && mouse.x < 15-300+Shops.x+300-30 && mouse.y < -35+(80*(i+1))+(3*(i+1))+80+scroll ){ ctx1.fillStyle = grad_bluebutton2; }
			ctx1.fillRect(10-300+Shops.x,-35+(80*(i+1))+(3*(i+1))+scroll,300-20,80);
			ctx1.drawImage(helper.spr,100-300+Shops.x,-35+(80*(i+1))+(3*(i+1))+scroll,helper.spr.width,helper.spr.height);
			ctx1.font = "Bold 20px Vollkorn";
			ctx1.fillStyle = "#fff";ctx1.textAlign = "left";ctx1.fillText(helper.name,25-300+Shops.x,-18+(80*(i+1))+(3*(i+1))+scroll);
			ctx1.fillStyle = "#aaa";ctx1.textAlign = "left";ctx1.fillText(Abbrev(helper.nps)+" "+helper.type+"/s ",25-300+Shops.x,10+(80*(i+1))+(3*(i+1))+scroll);
			if( mouse.x > 15-300+Shops.x && mouse.y > -35+(80*(i+1))+(3*(i+1))+scroll && mouse.x < 15-300+Shops.x+300-30 && mouse.y < -35+(80*(i+1))+(3*(i+1))+80+scroll ){ ctx1.font = "Bold 10px Vollkorn";ctx1.fillStyle = "rgba(200,200,200,0.5)";ctx1.textAlign = "left";ctx1.fillText("Lclick to buy",25-300+Shops.x,30+(80*(i+1))+(3*(i+1))+scroll);ctx1.fillText("Rclick to sell",25-300+Shops.x,40+(80*(i+1))+(3*(i+1))+scroll);ctx1.font = "Bold 20px Vollkorn";};
			ctx1.fillStyle = "#aaa";ctx1.textAlign = "right";ctx1.fillText("\u00B7 "+Abbrev(helper.count,3),280-300+Shops.x,-10+(80*(i+1))+(3*(i+1))+scroll);
			ctx1.fillStyle = "#9af";if( helper.worth() < cost ){ ctx1.fillStyle = "#f00" };ctx1.textAlign = "right";ctx1.fillText(helper.ctype+" "+Abbrev(cost),280-300+Shops.x,10+(80*(i+1))+(3*(i+1))+scroll);
			ctx1.fillStyle = "#aaa";ctx1.clearRect(0,C1.height-70,300,90);
			ctx1.restore();
			}
			else{
				ctx1.save();
				ctx1.fillStyle = "rgba(0,0,0,0.5)"; ctx1.fillRect(10-300+Shops.x,-35+(80*(i+1))+(3*(i+1))+scroll,300-20,80);
				ctx1.clearRect(0,C1.height-70,300,90);
				ctx1.restore();
			}
		}
	}
}

function DrawUpgrades(){
	for( i=0; i < Upgrades.length; i++ ){ upgrade = Upgrades[i];
		scroll = Shops.scroll[Shops.slot]*2
		if( upgrade.worth()*4 > upgrade.cost ){ upgrade.hidden = false };
		if( -35+(80*(i+1))+(3*(i+1))+scroll > -40 && -35+(80*(i+1))+(3*(i+1))+scroll < C1.height-80 ){
			if( upgrade.hidden == false ){
			ctx1.save();
			SetupGrad(0,-35+(80*(i+1))+(3*(i+1))+scroll,0);
			ctx1.fillStyle = grad_greenbutton;if( upgrade.worth() < upgrade.cost ){ctx1.fillStyle = grad_redbutton;if( mouse.x > 15-300+Shops.x && mouse.y > -35+(80*(i+1))+(3*(i+1))+scroll && mouse.x < 15-300+Shops.x+300-30 && mouse.y < -35+(80*(i+1))+(3*(i+1))+80+scroll ){ ctx1.fillStyle = grad_redbutton2; }}
			else if( mouse.x > 15-300+Shops.x && mouse.y > -35+(80*(i+1))+(3*(i+1))+scroll && mouse.x < 15-300+Shops.x+300-30 && mouse.y < -35+(80*(i+1))+(3*(i+1))+80+scroll ){ ctx1.fillStyle = grad_greenbutton2; }
			ctx1.fillRect(10-300+Shops.x,-35+(80*(i+1))+(3*(i+1))+scroll,300-20,80);
			ctx1.drawImage(upgrade.spr,0,30,upgrade.spr.width,80,100-300+Shops.x+30,-35+(80*(i+1))+(3*(i+1))+scroll,upgrade.spr.width,80);
			ctx1.font = "Bold 20px Vollkorn";
			ctx1.fillStyle = "#fff";ctx1.textAlign = "left";ctx1.fillText(upgrade.name,25-300+Shops.x,-18+(80*(i+1))+(3*(i+1))+scroll);
			ctx1.font = "Bold 15px Vollkorn";ctx1.fillStyle = "#aaa";ctx1.textAlign = "left";ctx1.fillText(upgrade.desc1,25-300+Shops.x,0+(80*(i+1))+(3*(i+1))+scroll);
			ctx1.fillStyle = "#aaa";ctx1.textAlign = "left";ctx1.fillText(upgrade.desc2,25-300+Shops.x,13+(80*(i+1))+(3*(i+1))+scroll);
			ctx1.font = "Bold 20px Vollkorn";
			
			ctx1.fillStyle = "#9af";if( upgrade.worth() < upgrade.cost ){ ctx1.fillStyle = "#f00" };ctx1.textAlign = "right";ctx1.fillText(upgrade.ctype+" "+Abbrev(upgrade.cost),280-300+Shops.x,10+(80*(i+1))+(3*(i+1))+scroll);
			
			ctx1.fillStyle = "#aaa";ctx1.clearRect(0,C1.height-70,300,90);
			ctx1.restore();
			}
			else{
				ctx1.fillStyle = "rgba(0,0,0,0.5)"; ctx1.fillRect(10-300+Shops.x,-35+(80*(i+1))+(3*(i+1))+scroll,300-20,80);
			}
		}
	}
}

function SetupGrad(x1,y1,x2,y2){
	grad_redbutton = ctx1.createLinearGradient(0, y1+80, 0, y1);
		  grad_redbutton.addColorStop(0.000, 'rgba(96, 5, 5, 0.200)');
		  grad_redbutton.addColorStop(0.495, 'rgba(40, 1, 1, 0.200)');
		  grad_redbutton.addColorStop(0.499, 'rgba(114, 8, 8, 0.200)');
		  grad_redbutton.addColorStop(1.000, 'rgba(188, 28, 28, 0.200)');
	grad_redbutton2 = ctx1.createLinearGradient(0, y1+80, 0, y1);
		  grad_redbutton2.addColorStop(0.000, 'rgba(96, 5, 5, 0.600)');
		  grad_redbutton2.addColorStop(0.495, 'rgba(40, 1, 1, 0.600)');
		  grad_redbutton2.addColorStop(0.499, 'rgba(114, 8, 8, 0.600)');
		  grad_redbutton2.addColorStop(1.000, 'rgba(188, 28, 28, 0.600)');
	grad_bluebutton = ctx1.createLinearGradient(0, y1+80, 0, y1);
		  grad_bluebutton.addColorStop(0.000, 'rgba(89, 124, 120, 0.500)');
		  grad_bluebutton.addColorStop(0.495, 'rgba(43, 58, 61, 0.500)');
		  grad_bluebutton.addColorStop(0.499, 'rgba(99, 129, 132, 0.500)');
		  grad_bluebutton.addColorStop(1.000, 'rgba(82, 107, 117, 0.500)');
	grad_bluebutton2 = ctx1.createLinearGradient(0, y1+80, 0, y1);
		  grad_bluebutton2.addColorStop(0.000, 'rgba(89, 124, 120, 1.000)');
		  grad_bluebutton2.addColorStop(0.495, 'rgba(43, 58, 61, 1.000)');
		  grad_bluebutton2.addColorStop(0.499, 'rgba(99, 129, 132, 1.000)');
		  grad_bluebutton2.addColorStop(1.000, 'rgba(82, 107, 117, 1.000)');
	grad_greenbutton = ctx1.createLinearGradient(0, y1+80, 0, y1);
		  grad_greenbutton.addColorStop(0.000, 'rgba(20, 124, 20, 0.500)');
		  grad_greenbutton.addColorStop(0.495, 'rgba(10, 70, 10, 0.500)');
		  grad_greenbutton.addColorStop(0.499, 'rgba(30, 190, 30, 0.500)');
		  grad_greenbutton.addColorStop(1.000, 'rgba(20, 124, 20, 0.500)');
	grad_greenbutton2 = ctx1.createLinearGradient(0, y1+80, 0, y1);
		  grad_greenbutton2.addColorStop(0.000, 'rgba(20, 124, 20, 1.000)');
		  grad_greenbutton2.addColorStop(0.495, 'rgba(10, 70, 10, 1.000)');
		  grad_greenbutton2.addColorStop(0.499, 'rgba(30, 190, 30, 1.000)');
		  grad_greenbutton2.addColorStop(1.000, 'rgba(20, 124, 20, 1.000)');
}

function DrawStatmenu(){
	x1 = C1.width-Statmenu.x; y2 = C1.height-70;
	ctx1.fillStyle = "#c8994f";ctx1.fillRect(x1,0,300,y2);
	ctx1.fillStyle = "#111";ctx1.fillRect(x1+10,20,300-20,y2-30);
	ctx1.drawImage(tablatch2,Math.ceil(x1-tablatch2.width),Math.floor(C1.height/2)-tablatch2.height/2);
	//ctx1.drawImage(emeraldicon,Math.ceil(x1),Math.floor(C1.height/2)-emeraldicon.height/4,emeraldicon.width/2,emeraldicon.height/2);
	
	//Draw Grades
	ctx1.font = "Bold 20px Vollkorn";
	ctx1.textAlign = "left";ctx1.fillStyle = "#fff";ctx1.fillText("Eliconomic Scale",x1+40,50);
		ctx1.fillStyle = "#555"; ctx1.fillText("— Grade I",x1+20,80);
		ctx1.fillStyle = "#aaa";ctx1.fillText("Stone: "+Abbrev(stats.stone),x1+30,100);
		if( stats.bronze >= 0 ){ ctx1.fillStyle = "#a40";ctx1.fillText("Bronze: "+Abbrev(stats.bronze),x1+30,120); }else{ ctx1.fillStyle = "#555";ctx1.fillText("???",x1+30,120); };
		if( stats.silver >= 0 ){ ctx1.fillStyle = "#ddd";ctx1.fillText("Silver: "+Abbrev(stats.silver),x1+30,140); }else{ ctx1.fillStyle = "#555";ctx1.fillText("???",x1+30,140); };
		if( stats.gold >= 0 ){ ctx1.fillStyle = "#ff5";ctx1.fillText("Gold: "+Abbrev(stats.gold),x1+30,160); }else{ ctx1.fillStyle = "#555";ctx1.fillText("???",x1+30,160); };
		if( stats.gold > 0 ){ ctx1.fillStyle = "#555";ctx1.fillText("— Grade II",x1+20,190);
			if( stats.ruby >= 0 ){ ctx1.fillStyle = "#e23";ctx1.fillText("Ruby: "+Abbrev(stats.ruby),x1+30,210); }else{  ctx1.fillStyle = "#555";ctx1.fillText("???",x1+30,210); }
			if( stats.emerald >= 0 ){ ctx1.fillStyle = "#1a4";ctx1.fillText("Emerald: "+Abbrev(stats.emerald),x1+30,230); }else{  ctx1.fillStyle = "#555";ctx1.fillText("???",x1+30,230); }
			if( stats.sapphire >= 0 ){ ctx1.fillStyle = "#15e";ctx1.fillText("Sapphire: "+Abbrev(stats.sapphire),x1+30,250); }else{  ctx1.fillStyle = "#555";ctx1.fillText("???",x1+30,250); }
			if( stats.diamond >= 0 ){ ctx1.fillStyle = "#afe";ctx1.fillText("Diamond: "+Abbrev(stats.diamond),x1+30,270); }else{  ctx1.fillStyle = "#555";ctx1.fillText("???",x1+30,270); }
			if( stats.amethyst >= 0 ){ ctx1.fillStyle = "#a2d";ctx1.fillText("Amethyst: "+Abbrev(stats.amethyst),x1+30,290); }else{  ctx1.fillStyle = "#555";ctx1.fillText("???",x1+30,290); }
			if( stats.amethyst > 0 ){ ctx1.fillStyle = "#555";ctx1.fillText("— Grade III",x1+20,320);
				if( stats.quartz >= 0 ){ ctx1.fillStyle = "#eee";ctx1.fillText("Quartz: "+Abbrev(stats.quartz),x1+30,340); }else{  ctx1.fillStyle = "#555";ctx1.fillText("???",x1+30,340); }
				if( stats.onyx >= 0 ){ ctx1.fillStyle = "#aaa";ctx1.fillText("Onyx: "+Abbrev(stats.onyx),x1+30,360); }else{  ctx1.fillStyle = "#555";ctx1.fillText("???",x1+30,360); }
				if( stats.sardonyx >= 0 ){ ctx1.fillStyle = "#f43";ctx1.fillText("Sardonyx: "+Abbrev(stats.sardonyx),x1+30,380); }else{  ctx1.fillStyle = "#555";ctx1.fillText("???",x1+30,380); }
				if( stats.opal >= 0 ){ ctx1.fillStyle = "#3ee";ctx1.fillText("Opal: "+Abbrev(stats.opal),x1+30,400); }else{  ctx1.fillStyle = "#555";ctx1.fillText("???",x1+30,400); }
			}
		}
}


function Particles(){
	for( i = 0; i < particles.length; i++ ){ par = particles[i];
		if( par.gravity == true ){par.vy+=0.1;}
		par.vx /= 1.01;
		par.x += par.vx; par.y += par.vy;
		ctx1.drawImage(par.spr,par.x,par.y);
		if( par.text == true ){
			ctx1.fillStyle = "#fff"
			ctx1.fillText("+"+pick.stone,par.x,par.y);
		}
		par.life--;
		if( par.life <= 0 ){ particles.splice(i,i); }
	}
}

function click(){
	if( Bound(mouse.x,mouse.y,stone.x,stone.y,stone.width/2,stone.width/2) ){
		//Clicked stone
		SPick();
		//cur = cur1_mine;
		var par = new Particle(stone_par,mouse.x-20,mouse.y-20); particles.push(par);
		//var par = new Particle(stone_par1,mouse.x-20,mouse.y-20); particles.push(par);
		var par = new Particle(stone_par2,mouse.x-20,mouse.y-20); particles.push(par);
		stone.clicks++;
		stats.clicks++;
		if( stone.clicks >= stone.dur ){
			//Collect Items
			if( pick.stone > 0 ){
				stone_pickup.currentTime = 0; stone_pickup.volume = volume;stone_pickup.play();
				var par = new Particle(stone_item,mouse.x-20,mouse.y-20,"up"); particles.push(par);
				stats.stone += pick.stone;
				if( stats.stone <= 0 ){ stats.stone = 1 };
			}
			if( pick.bronze > 0 ){
				bronze_pickup.currentTime = 0; bronze_pickup.volume = volume;bronze_pickup.play();
				var par = new Particle(bronze_item,mouse.x-30,mouse.y-30,"up"); particles.push(par);
				stats.bronze += pick.bronze;
				if( stats.bronze <= 0 ){ stats.bronze = 1 };
			}
			if( pick.silver > 0 ){
				bronze_pickup.currentTime = 0; bronze_pickup.volume = volume;bronze_pickup.play();
				var par = new Particle(silver_item,mouse.x-30,mouse.y-30,"up"); particles.push(par);
				stats.silver += pick.silver;
				if( stats.silver <= 0 ){ stats.silver = 1 };
			}
			stone.clicks = 0;
		}
	}
	if( Bound(mouse.x,mouse.y,60,C1.height-49,45,10) ){
		click1.currentTime = 0; click1.volume = volume;click1.play();
	}
	if( mouse.y < 40 && mouse.x < Shops.x ){
		if( mouse.x > -250+Shops.x && mouse.x < -250+Shops.x+30 ){
			Shops.slot = 0;switch1.currentTime = 0; switch1.volume = volume;switch1.play();
		}
		if( mouse.x > -200+Shops.x && mouse.x < -200+Shops.x+30 ){
			Shops.slot = 1;switch1.currentTime = 0; switch1.volume = volume;switch1.play();
		}
		if( mouse.x > -150+Shops.x && mouse.x < -150+Shops.x+30 ){
			Shops.slot = 2;switch1.currentTime = 0; switch1.volume = volume;switch1.play();
		}
	}
	if( mouse.y > 40 && mouse.x < Shops.x ){
		scroll = Shops.scroll[Shops.slot]*2;
		if( Shops.slot == 0 ){
			for( i=0;i < Helpers.length;i++ ){ helper = Helpers[i];
				if( mouse.x > 15-300+Shops.x && mouse.y > -35+(80*(i+1))+(3*(i+1))+scroll && mouse.x < 15-300+Shops.x+300-30 && mouse.y < -35+(80*(i+1))+(3*(i+1))+80+scroll ){
					if( Key.ctrl == true && Key.shift == true ){
						if(!( StatIndex(helper.cnum) < helper.cost*1000 )){
						helper.count+=1000; RemoveIndex(helper.cnum,helper.cost*1000);
						buy.currentTime = 0; buy.volume = volume;buy.play();
						} else { fail.curentTime = 0; fail.volume = volume; fail.play(); }
					}else if( Key.shift == true ){
						if(!( StatIndex(helper.cnum) < helper.cost*100 )){
						helper.count+=100; RemoveIndex(helper.cnum,helper.cost*100);
						buy.currentTime = 0; buy.volume = volume;buy.play();
						} else { fail.curentTime = 0; fail.volume = volume; fail.play(); }
					}else if( Key.ctrl == true ){
						if(!( StatIndex(helper.cnum) < helper.cost*10 )){
						helper.count+=10; RemoveIndex(helper.cnum,helper.cost*10);
						buy.currentTime = 0; buy.volume = volume;buy.play();
						} else { fail.curentTime = 0; fail.volume = volume; fail.play(); }
					}else{
						if(!( StatIndex(helper.cnum) < helper.cost*1 )){
						helper.count++; RemoveIndex(helper.cnum,helper.cost);
						buy.currentTime = 0; buy.volume = volume;buy.play();
						} else { fail.curentTime = 0; fail.volume = volume; fail.play(); }
					}
					
				}
			} 
		}if( Shops.slot == 1 ){
			for( i=0;i < Upgrades.length;i++ ){ upgrade = Upgrades[i];
				if( mouse.x > 15-300+Shops.x && mouse.y > -35+(80*(i+1))+(3*(i+1))+scroll && mouse.x < 15-300+Shops.x+300-30 && mouse.y < -35+(80*(i+1))+(3*(i+1))+80+scroll ){
					if( Key.ctrl == true && Key.shift == true ){
						if(!( StatIndex(upgrade.cnum) < upgrade.cost*1000 ) && ( upgrade.xid == 2 )){
						
						} else { fail.curentTime = 0; fail.volume = volume; fail.play(); }
					}else if( Key.shift == true ){
						if(!( StatIndex(upgrade.cnum) < upgrade.cost*100 ) && ( upgrade.xid == 2 )){
						
						} else { fail.curentTime = 0; fail.volume = volume; fail.play(); }
					}else if( Key.ctrl == true ){
						if(!( StatIndex(upgrade.cnum) < upgrade.cost*10 ) && ( upgrade.xid == 2 )){
						
						} else { fail.curentTime = 0; fail.volume = volume; fail.play(); }
					}else{
						if(!( StatIndex(upgrade.cnum) < upgrade.cost*1 )){
							upgrade.buy(i);
						} else { fail.curentTime = 0; fail.volume = volume; fail.play(); }
					}
					
				}
			} 
		}
	}
}
function rightclick(){
	if( mouse.y > 40 && mouse.x < Shops.x ){
		scroll = Shops.scroll[Shops.slot]*2;
		if( Shops.slot == 0 ){
			for( i=0;i < Helpers.length;i++ ){ helper = Helpers[i];
				if( mouse.x > 15-300+Shops.x && mouse.y > -35+(80*(i+1))+(3*(i+1))+scroll && mouse.x < 15-300+Shops.x+300-30 && mouse.y < -35+(80*(i+1))+(3*(i+1))+80+scroll ){
					if( Key.ctrl == true && Key.shift == true ){
						if( helper.count > 1000 ){
							RemoveIndex(helper.cnum,(-helper.cost*1000)+helper.xcost)/2;
							helper.count -= 1000;
							sell.currentTime = 0; sell.volume = volume;sell.play();
						}else if( helper.count < 1000 && helper.count > 0 ){
							RemoveIndex(helper.cnum,(-helper.cost)+helper.xcost)/2;
							helper.count = 0;
							sell.currentTime = 0; sell.volume = volume;sell.play();
						}
					}else if( Key.shift == true ){
						if( helper.count > 100 ){
							RemoveIndex(helper.cnum,(-helper.cost*100)+helper.xcost)/2;
							helper.count -= 100;
							sell.currentTime = 0; sell.volume = volume;sell.play();
						}else if( helper.count < 100 && helper.count > 0 ){
							RemoveIndex(helper.cnum,(-helper.cost)+helper.xcost)/2;
							helper.count = 0;
							sell.currentTime = 0; sell.volume = volume;sell.play();
						}
					}else if( Key.ctrl == true ){
						if( helper.count > 10 ){
							RemoveIndex(helper.cnum,(-helper.cost*10)+helper.xcost)/2;
							helper.count -= 10;
							sell.currentTime = 0; sell.volume = volume;sell.play();
						}else if( helper.count < 10 && helper.count > 0 ){
							RemoveIndex(helper.cnum,(-helper.cost)+helper.xcost)/2;
							helper.count = 0;
							sell.currentTime = 0; sell.volume = volume;sell.play();
						}
					}else{
						if( helper.count > 0 ){
							RemoveIndex(helper.cnum,(-helper.cost)+helper.xcost)/2;
							helper.count -= 1;
							sell.currentTime = 0; sell.volume = volume;sell.play();
						}
					}
					
				}
			} 
		}
	}
}


//Mouse
function getMousePos(canvas, evt) {
		//Update the mouse position
        var rekt = C1.getBoundingClientRect();
        return {x: evt.clientX - rekt.left, y: evt.clientY - rekt.top}
      }

C1.addEventListener('mousemove', function(evt) {
		//When the mouse is moved
		mouse = getMousePos(C1, evt);
}, false);

window.oncontextmenu = function(){
	return false;
};

$('#C1').mousedown(function(e) {
	switch (e.which) {
		case 1: //Left mouse button
			mousepress = true;
			click();
			break;
		case 2: //Middle mouse button
			middlepress = true;
			break;
		case 3: //Right mouse button
			rightpress = true;
			rightclick();
			break;
	}
});
$('#C1').mouseup(function(e) {
	switch (e.which) {
		case 1: //Left mouse button
			mousepress = false;
			break;
		case 2: //Middle mouse button
			middlepress = false;
			break;
		case 3: //Right mouse button
			rightpress = false;
			break;
	}
});


//Keys
window.onkeydown = function (e){
	key = e.keyCode ? e.keyCode : e.which;
	//console.log(key+" -  "+String.fromCharCode(key))
	switch(key){
		case 16:
			Key.shift = true; break;
		case 17:
			Key.ctrl = true; break;
	}
}
window.onkeyup = function (e){
	key = e.keyCode ? e.keyCode : e.which;
	switch(key){
		case 16:
				Key.shift = false; break;
			case 17:
				Key.ctrl = false; break;
	}
}


//Experimental


function AllToNum(n){
	stats.stone = n;
	stats.bronze = n;
	stats.silver = n;
	stats.gold = n;
	stats.ruby = n;
	stats.emerald = n;
	stats.sapphire = n;
	stats.diamond = n;
	stats.amethyst = n;
	stats.quartz = n;
	stats.onyx = n;
	stats.sardonyx = n;
	stats.opal = n;
}