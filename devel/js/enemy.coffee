class Enemy
  constructor: (@sprite) ->
    
  getSprite: =>
    PIXI.TilingSprite(
      @sprite.source,
      @sprite.width,
      @sprite.height
    )
    