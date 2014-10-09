(function() {
	"use strict";

    window.addEventListener('load', init);

    var options = {
    	scrollSpeed: 1.5,
    	playerSpeed: 5,
    	stage: {
			width: 540,
			height: 960
    	},
    	sprites: {
	        background: {
	            source: "img/background.png",
	            width: 540,
	            height: 960
	        },
	        player: {
	            source: "img/player.png",
	            width: 50,
	            height: 52
	        },
	        enemy: {
	            source: ""
	        },
	        projectile: {
	            source: ""
	        },
	        collectible: {
	            source: ""
	        }
    	}
    };

    var Key = {
		_pressed: {},

		LEFT: 37,
		RIGHT: 39,

		isDown: function(keyCode) {
			return this._pressed[keyCode];
		},

		onKeydown: function(event) {
			this._pressed[event.keyCode] = true;
		},

		onKeyup: function(event) {
			delete this._pressed[event.keyCode];
		}
	};

    // BACKGROUND
    function Background(sprite) {
    	var texture = PIXI.Texture.fromImage(sprite.source);
		PIXI.TilingSprite.call(this, texture, sprite.width, sprite.height);
    }

    Background.constructor = Background;
    Background.prototype = Object.create(PIXI.TilingSprite.prototype);

    Background.prototype.update = function() {
    	this.tilePosition.y += options.scrollSpeed;
    }
    // END BACKGROUN

    // PLAYER
    function Player(sprite) {
    	var texture = PIXI.Texture.fromImage(sprite.source);
		PIXI.Sprite.call(this, texture);

		this.anchor.y = 0.5;
		this.anchor.x = 0.5

		this.position.x = options.stage.width/2;
		this.position.y = options.stage.height - 100;

		console.log(this);
    }

    Player.constructor = Player;
    Player.prototype = Object.create(PIXI.Sprite.prototype);

    Player.prototype.update = function() {
		if (Key.isDown(Key.LEFT)) this.moveLeft();
		if (Key.isDown(Key.RIGHT)) this.moveRight();
    }

    Player.prototype.moveLeft = function() {
    	if (this.position.x < this.texture.width * 0.6){
    		return;
    	}
    	this.position.x -= options.playerSpeed;
    }

    Player.prototype.moveRight = function() {
    	if (this.position.x > options.stage.width - this.texture.width * 0.6) {
    		return;
    	}
    	this.position.x += options.playerSpeed;
    }
    // END PLAYER

    function init(){

        var stage = new PIXI.Stage(0x000000),
            canvas = document.getElementById('game'),
            renderer = PIXI.autoDetectRenderer(options.stage.width, options.stage.height, canvas);

        requestAnimFrame(render);

        var backgroundSprite = new Background(options.sprites.background);
        var playerSprite = new Player(options.sprites.player);

        stage.addChild(backgroundSprite);
        stage.addChild(playerSprite);

        window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
        window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

        function render() {
        	backgroundSprite.update();
        	playerSprite.update();

            renderer.render(stage);
            requestAnimFrame(render);
        }
    }
})();
