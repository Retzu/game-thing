define ['entity'], (Entity) ->
    class Player extends Entity
        constructor: (@sprite) ->
            super @sprite

            @position.x = OPTIONS.stage.width / 2
            @position.y = OPTIONS.stage.height - 100

        moveLeft: =>
            @position.x -= OPTIONS.playerSpeed * @speedFactor

        moveRight: =>
            @position.x += OPTIONS.playerSpeed * @speedFactor