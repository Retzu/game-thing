define ['background', 'player', 'enemy', 'collectible'], (Background, Player, Enemy, Collectible) ->
    class Game
        constructor: (containerId, @options) ->
            @log @options
            # new stage, black background
            @stage = new PIXI.Stage 0x000000

            @gameSpeed = @options.gameSpeed
            @level = 1

            # create the game (WebGL or canvas as a fallback)
            gameContainer = document.getElementById containerId
            @renderer = PIXI.autoDetectRenderer @options.stage.width, @options.stage.height
            gameContainer.appendChild @renderer.view

            # create the background and player objects and add them to the game
            @background = new Background @options.sprites.background, @gameSpeed
            @player = new Player @options.sprites.player, @options.stage.width, @options.stage.height, @options.playerSpeed, @options.sprites.projectile, @options.projectileSpeed, @options.projectileCooldown

            @stage.addChild @background
            @stage.addChild @player

            # control events for player moving
            kd.LEFT.down @player.moveLeft
            kd.RIGHT.down @player.moveRight
            if @options.allowShooting
                @player.setStage @stage
                kd.SPACE.down @player.shoot

            # create arrays that will hold all enemies and collectibles
            @enemies = []
            @collectibles = []

            # does the obvious
            @isGameOver = false

            @score = 0

            @spawnRate = @options.spawnRate

            if @options.debug
                # create a debugging message with various info
                # FPS, enemies and collectibles on screen and score
                @fpsText = new PIXI.Text "0",
                    font: "16px monospace"

                @fpsText.position.x = 10;
                @fpsText.position.y = 10;
                @stage.addChild @fpsText


        run: =>
            @spawnInterval = window.setInterval =>
                @generateRandomEntity()
            , @spawnRate

            if @options.increaseDifficulty
                @levelInterval = window.setInterval =>
                    # increase the game's difficulty (speed) every x seconds
                    @increaseLevel()
                , @options.levelDuration

            # init @now for deltaT calculating
            @now = new Date()
            requestAnimFrame @render


        increaseLevel: =>
            if @gameSpeed * 1.33 < @options.maxGameSpeed
                @gameSpeed *= 1.33
                @level++
            else
                @gameSpeed = @options.maxGameSpeed

            if @spawnRate - 150 > @options.minSpawnRate
                @spawnRate -= 150 # increase spawn rate by 100ms for every level
            else
                @spawnRate = @options.minSpawnRate

            window.clearInterval(@spawnInterval)
            @spawnInterval = window.setInterval =>
                @generateRandomEntity()
            , @spawnRate

            @log "Now at level #{@level}. Spawn every #{@spawnRate}ms"


        render: =>
            dt = new Date() - @now
            @now = new Date()
            kd.tick()

            if @options.debug
                @fpsText.setText 'FPS:' + Math.floor(1000 / dt) + " / E:#{@enemies.length} / C:#{@collectibles.length} / S:#{@score} / Entities:#{@stage.children.length} / L:#{@level}"

            @background.update dt
            @player.update dt

            @player.projectiles.forEach (projectile) =>
                projectile.update dt

                # check every enemy if we hit it
                @enemies.forEach (enemy) =>
                    if enemy.isCollidingWith projectile
                        @removeEnemy enemy
                        @player.removeProjectile projectile

                if projectile.y < 0
                    @player.removeProjectile projectile

            @enemies.forEach (enemy) =>
                enemy.update dt

                if enemy.isCollidingWith @player
                    @isGameOver = true

                if enemy.y > @options.stage.height + @options.sprites.enemy.height + 100
                    @removeEnemy enemy

            @collectibles.forEach (collectible) =>
                collectible.update dt

                if collectible.isCollidingWith @player
                    @score++
                    @removeCollectible collectible

                if collectible.y > @options.stage.height + @options.sprites.collectible.height + 100
                    @removeCollectible collectible

            @renderer.render @stage

            if not @isGameOver
                requestAnimFrame @render
            else
                @gameOver()


        gameOver: =>
            # clear update intervals
            window.clearInterval @spawnInterval
            window.clearInterval @levelInterval if @levelInterval

            @renderGameOver()


        renderGameOver: =>
            gameOverText = new PIXI.Text "Game over!",
                font: "70px monospace"

            gameOverText.position.x = (@options.stage.width / 2) - gameOverText.width / 2
            gameOverText.position.y = (@options.stage.height / 2) - gameOverText.height / 2

            @stage.addChild gameOverText

            @renderer.render @stage


        generateRandomEntity: =>
            chance = 0.2
            if Math.random() > chance
                @generateRandomEnemy()
            else
                @generateRandomCollectible()


        generateRandomEnemy: =>
            randomX = Math.floor Math.random() * @options.stage.width
            enemy = new Enemy @options.sprites.enemy, randomX, @gameSpeed * 1.5 + (Math.random() * 0.5) # add some variation

            @enemies.push enemy
            @stage.addChild enemy


        generateRandomCollectible: =>
            randomX = Math.floor Math.random() * (@options.stage.width - @options.sprites.collectible.width) + @options.sprites.collectible.width
            collectible = new Collectible @options.sprites.collectible, randomX, @gameSpeed * 1.5 + (Math.random() * 0.5) # add some variation


            @collectibles.push collectible
            @stage.addChild collectible


        removeEnemy: (enemy) =>
            index = @enemies.indexOf enemy
            @enemies.splice index, 1
            @stage.removeChild enemy


        removeCollectible: (collectible) =>
            index = @collectibles.indexOf collectible
            @collectibles.splice index, 1
            @stage.removeChild collectible

        log: (thing) =>
            if @options.debug
                console.log thing