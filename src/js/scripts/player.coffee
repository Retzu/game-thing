define ['entity', 'projectile'], (Entity, Projectile) ->
    class Player extends Entity
        constructor: (@sprite, @stageWidth, @stageHeight, @playerSpeed = 5, @projectileSprite, @projectileSpeed, @projectileCooldown) ->
            super @sprite

            @position.x = @stageWidth / 2
            @position.y = @stageHeight - 100

            @projectiles = []
            @projectileTimeout = null


        setStage: (@stage) ->


        moveLeft: =>
            if @position.x > @sprite.width / 2
                @position.x -= @playerSpeed * @speedFactor


        moveRight: =>
            if @position.x < @stageWidth - (@sprite.width / 2)
                @position.x += @playerSpeed * @speedFactor


        shoot: =>
            if not @projectileTimeout
                startX = @position.x
                startY = @position.y
                projectile = new Projectile @projectileSprite, @projectileSpeed, startX, startY
                @projectiles.push projectile
                console.log projectile
                @stage.addChild projectile

                @projectileTimeout = window.setTimeout =>
                    window.clearTimeout @projectileTimeout
                    @projectileTimeout = null
                , @projectileCooldown


        removeProjectile: (projectile) =>
            index = @projectiles.indexOf projectile
            @projectiles.splice index, 1
            @stage.removeChild projectile