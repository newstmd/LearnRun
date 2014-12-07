var AnimationLayer = cc.Layer.extend({
	spriteSheet:null,
	runningAction:null,
	sprite:null,
	space:null,
	body:null,
	ctor:function(space){
		this._super();
		this.space = space;
		this.init();
	},
	init:function(){
		this._super();
		
		// create sprite sheet
		//cc.spriteFrameCache.addSpriteFrame(frame, frameName)
		
		cc.spriteFrameCache.addSpriteFrames(res.runner_plist);
		this.spriteSheet = cc.SpriteBatchNode.create(res.runner_png);
		this.addChild(this.spriteSheet);
		
		// init runningAction
		var animFrames = [];
		for (var i = 0; i < 8; i++) {
			var str = "runner"+i+".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}
		
		var animation = cc.Animation.create(animFrames,0.1);
		this.runningAction = cc.RepeatForever.create(cc.Animate.create(animation));
		this.sprite = cc.PhysicsSprite.create("#runner0.png");
		var contentSize = this.sprite.getContentSize();
		this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
		this.body.p = cc.p(g_runnerStartX, g_groundHight+contentSize.height /2);
		this.body.applyImpulse(cp.v(150, 0),cp.v(0, 0));
		
		//this.body.addBody(this.body);
		this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
		//7. add shape to space
		this.space.addShape(this.shape);
		//8. set body to the physic sprite
		this.sprite.setBody(this.body);
		
		this.sprite.x=80;
		this.sprite.y=85;
		this.sprite.runAction(this.runningAction);
		this.spriteSheet.addChild(this.sprite);
		
	}
});