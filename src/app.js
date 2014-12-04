var MenuLayer = cc.Layer.extend({
	ctor:function(){
		this._super();
	},
	init:function(){
		this._super();
		
		var winsize = cc.director.getWinSize();
		var centerpos = cc.p(winsize.width/2,winsize.height/2);
		
		var spritebg = cc.Sprite.create(res.helloBG_png);
		spritebg.setPosition(centerpos);
		this.addChild(spritebg);
		
		cc.MenuItemFont.setFontSize(60);
		
		var menuItemPlay = cc.MenuItemSprite.create(
				cc.Sprite.create(res.start_n_png),
				cc.Sprite.create(res.start_s_png),
				this.onPlay,this
				);
		var menu = cc.Menu.create(menuItemPlay);
		menu.setPosition(centerpos);
		this.addChild(menu);
	},
	onPlay:function(){
		cc.log("==onplay clicked");
		cc.director.runScene(new PlayScene());
	}
});


//scene
var MenuScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new MenuLayer();
		layer.init();
		this.addChild(layer);
	}
});