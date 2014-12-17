define ['entity'], (Entity) ->
    class Player extends Entity
        constructor: (@sprite) ->
            super @sprite

            @position.x = OPTIONS.stage.width / 2
            @position.y = OPTIONS.stage.height - 100

        moveLeft: =>
            if @position.x > OPTIONS.sprites.player.width / 2
                @position.x -= OPTIONS.playerSpeed * @speedFactor

        moveRight: =>
            if @position.x < OPTIONS.stage.width - (OPTIONS.sprites.player.width / 2)
                @position.x += OPTIONS.playerSpeed * @speedFactor