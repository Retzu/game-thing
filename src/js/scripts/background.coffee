define ->
    class Background extends PIXI.TilingSprite
        constructor: (@sprite) ->
            texture = PIXI.Texture.fromImage @sprite.source
            super texture, @sprite.width, @sprite.height

        update: =>
            @tilePosition.y += OPTIONS.scrollSpeed or 1.5