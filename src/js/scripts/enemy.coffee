define ['entity'], (Entity) ->
	class Enemy extends Entity    
	  	getSprite: =>
	    	PIXI.TilingSprite @sprite.source, @sprite.width, @sprite.height