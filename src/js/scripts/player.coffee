define ['entity'], (Entity) ->
    class Player extends Entity
        constructor: (@sprite, @stageWidth, @stageHeight, @playerSpeed = 5) ->
            super @sprite

            @position.x = @stageWidth / 2
            @position.y = @stageHeight - 100

        moveLeft: =>
            if @position.x > @sprite.width / 2
                @position.x -= @playerSpeed * @speedFactor

        moveRight: =>
            if @position.x < @stageWidth - (@sprite.width / 2)
                @position.x += @playerSpeed * @speedFactor