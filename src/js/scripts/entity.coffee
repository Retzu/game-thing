define ->
	class Entity extends PIXI.Sprite
	    constructor: (@sprite) ->
	        texture = PIXI.Texture.fromImage sprite.source
	        super texture, @sprite.width, @sprite.height

	        # Inherited from PIXI.Sprite. Center image to sprite
	        @anchor.y = 0.5;
	        @anchor.x = 0.5;

	        @speedFactor = 1


	    update: (dt) =>
	    	@speedFactor = 1000 / dt / 60