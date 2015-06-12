$(document).ready(resize);
$(window).resize(resize);

function resize(){
	C1.width = $(window).width()-2;
	C1.height = $(window).height()-2;
	stone.x = C1.width/2; stone.y = C1.height/2;
}

window.setInterval(function(){
	Draw();
	Particles();
	if( Bound(mouse.x,mouse.y,stone.x,stone.y,stone.width/2,stone.width/2) ){
		//hovering stone
		if( mousepress == false )C1.style.cursor = "url(sprites/cursor_mine2.png), auto"
	}else{
		C1.style.cursor = "url(sprites/cursor.png), auto"
	}
	if( (mouse.x < 30 || mouse.x < Shops.x) && mouse.y < C1.height-70 && Shops.x < 300 ){/**/  if( Shops.x < 20 ){ shop_in.volume = volume/3; shop_in.play(); };Shops.x -= (Shops.x-300)/2; }
	else if( Shops.x > 0 && ( mouse.x > Shops.x || mouse.y > C1.height-70 ) ){/**/ if( Shops.x > 20 ){ shop_out.volume = volume/3; shop_out.play(); };Shops.x -= (Shops.x-0)/4 }

	if( mousepress == true && Bound(mouse.x,mouse.y,60,C1.height-49,45,10) ){
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
	if( mousepress == true && mouse.x < 20 && mouse.y < C1.height-90 && mouse.y > 40 && Shops.slot == 0 ){
		Shops.scroll[Shops.slot] = -mouse.y+40;
	}
	
	
},1000/fps)




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
	ctx1.drawImage(logo,(C1.width/2)-(logo.width/4),0,logo.width/2,logo.height/2);
	DrawShops();
	
	ctx1.fillStyle = "#777";
	ctx1.fillRect(10,C1.height-49,100,5);
	ctx1.drawImage(audioicon,120,C1.height-60)
	ctx1.fillStyle = "#aaa";
	ctx1.fillRect((volume*100)+10,C1.height-60,10,30);
	
	//if( Key.ctrl == true ){ ctx1.fillRect(mouse.x,mouse.y,30,30) }
}

function DrawShops(){
	shopmid_fill = ctx1.createPattern(shopmid,"repeat");
	ctx1.fillStyle = "#aaa";
	ctx1.fillRect(-300+Shops.x,0,300,C1.height-70);
	ctx1.fillRect(Shops.x,90,30,300);
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
		scroll = Shops.scroll[Shops.slot]
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
				ctx1.fillStyle = "rgba(0,0,0,0.5)"; ctx1.fillRect(10-300+Shops.x,-35+(80*(i+1))+(3*(i+1))+scroll,300-20,80);
			}
		}
	}
}

function DrawUpgrades(){
	for( i=0; i < Upgrades.length; i++ ){ upgrade = Upgrades[i];
		scroll = Shops.scroll[Shops.slot]
		if( upgrade.worth()*4 > upgrade.cost ){ upgrade.hidden = false };
		if( -35+(80*(i+1))+(3*(i+1))+scroll > -40 && -35+(80*(i+1))+(3*(i+1))+scroll < C1.height-80 ){
			if( upgrade.hidden == false ){
			ctx1.save();
			SetupGrad(0,-35+(80*(i+1))+(3*(i+1))+scroll,0);
			ctx1.fillStyle = grad_bluebutton;if( upgrade.worth() < upgrade.cost ){ctx1.fillStyle = grad_redbutton;if( mouse.x > 15-300+Shops.x && mouse.y > -35+(80*(i+1))+(3*(i+1))+scroll && mouse.x < 15-300+Shops.x+300-30 && mouse.y < -35+(80*(i+1))+(3*(i+1))+80+scroll ){ ctx1.fillStyle = grad_redbutton2; }}
			else if( mouse.x > 15-300+Shops.x && mouse.y > -35+(80*(i+1))+(3*(i+1))+scroll && mouse.x < 15-300+Shops.x+300-30 && mouse.y < -35+(80*(i+1))+(3*(i+1))+80+scroll ){ ctx1.fillStyle = grad_bluebutton2; }
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
		  grad_redbutton.addColorStop(0.000, 'rgba(96, 5, 5, 0.500)');
		  grad_redbutton.addColorStop(0.495, 'rgba(40, 1, 1, 0.500)');
		  grad_redbutton.addColorStop(0.499, 'rgba(114, 8, 8, 0.500)');
		  grad_redbutton.addColorStop(1.000, 'rgba(188, 28, 28, 0.500)');
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
		C1.style.cursor = "url(sprites/cursor_mine.png), auto"
		var par = new Particle(stone_par,mouse.x-20,mouse.y-20); particles.push(par);
		//var par = new Particle(stone_par1,mouse.x-20,mouse.y-20); particles.push(par);
		var par = new Particle(stone_par2,mouse.x-20,mouse.y-20); particles.push(par);
		stone.clicks++;
		stats.clicks++;
		if( stone.clicks >= stone.dur ){
			//Collect Items
			stone_pickup.currentTime = 0; stone_pickup.volume = volume;stone_pickup.play();
			var par = new Particle(stone_item,mouse.x-20,mouse.y-20,"up"); particles.push(par);
			stone.clicks = 0; stats.stone += pick.stone;
		}
	}
	if( Bound(mouse.x,mouse.y,60,C1.height-49,45,10) ){
		click1.currentTime = 0; click1.volume = volume;click1.play();
	}
	if( mouse.y < 40 && mouse.x < Shops.x ){
		if( mouse.x > -250+Shops.x && mouse.x < -250+Shops.x+30 ){
			Shops.slot = 0;click1.currentTime = 0; click1.volume = volume;click1.play();
		}
		if( mouse.x > -200+Shops.x && mouse.x < -200+Shops.x+30 ){
			Shops.slot = 1;click1.currentTime = 0; click1.volume = volume;click1.play();
		}
		if( mouse.x > -150+Shops.x && mouse.x < -150+Shops.x+30 ){
			Shops.slot = 2;click1.currentTime = 0; click1.volume = volume;click1.play();
		}
	}
	if( mouse.y > 40 && mouse.x < Shops.x ){
		scroll = Shops.scroll[Shops.slot];
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
						if(!( StatIndex(upgrade.cnum) < upgrade.cost*1000 )){
						
						} else { fail.curentTime = 0; fail.volume = volume; fail.play(); }
					}else if( Key.shift == true ){
						if(!( StatIndex(upgrade.cnum) < upgrade.cost*100 )){
						
						} else { fail.curentTime = 0; fail.volume = volume; fail.play(); }
					}else if( Key.ctrl == true ){
						if(!( StatIndex(upgrade.cnum) < upgrade.cost*10 )){
						
						} else { fail.curentTime = 0; fail.volume = volume; fail.play(); }
					}else{
						if(!( StatIndex(upgrade.cnum) < upgrade.cost*1 )){
						
						} else { fail.curentTime = 0; fail.volume = volume; fail.play(); }
					}
					
				}
			} 
		}
	}
}
function rightclick(){
	if( mouse.y > 40 && mouse.x < Shops.x ){
		scroll = Shops.scroll[Shops.slot];
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