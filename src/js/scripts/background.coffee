define ->
    class Background extends PIXI.TilingSprite
        constructor: (@sprite, @scrollSpeed = 1.5) ->
            texture = PIXI.Texture.fromImage @sprite.source
            super texture, @sprite.width, @sprite.height

        update: =>
            @tilePosition.y += @scrollSpeed or 1.5