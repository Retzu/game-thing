function init(Background, Player, Enemy, Collectible){
    var stage = new PIXI.Stage(0x000000),
        gameContainer = document.getElementById('game'),
        renderer = PIXI.autoDetectRenderer(options.stage.width, options.stage.height);

    gameContainer.appendChild(renderer.view);

    requestAnimFrame(render);

    var background = new Background(options.sprites.background);
    var player = new Player(options.sprites.player);

    stage.addChild(background);
    stage.addChild(player);

    kd.LEFT.down(player.moveLeft);
    kd.RIGHT.down(player.moveRight);

    var now = new Date();

    var fpsText = new PIXI.Text("0", {
        font: "16px monospace"
    });
    fpsText.position.x = 10;
    fpsText.position.y = 10;
    stage.addChild(fpsText);

    enemies = [];
    collectibles = [];

    gameOver = false;

    score = 0;

    function render() {
        var dt = new Date() - now;
        now = new Date();
        kd.tick();

        fpsText.setText('FPS:' + Math.floor(1000 / dt) + ' / E:' + enemies.length + ' / C:' + collectibles.length + ' / S:' + score);

        background.update(dt);
        player.update(dt);

        enemies.forEach(function(enemy) {
            enemy.update(dt);

            // if player collides with an enemy
            if (enemy.isCollidingWith(player)) {
                // events!
                gameOver = true;
            }

            // remove enemies that are out of sight
            if (enemy.y > OPTIONS.stage.height + OPTIONS.sprites.enemy.height + 100) {
                removeEnemy(enemy);
            }
        });

        collectibles.forEach(function(collectible) {
            collectible.update(dt);

            // make them collectable
            if (collectible.isCollidingWith(player)) {
                score++;
                removeCollectible(collectible);
            }

            // remove collectibles that are out of sight
            if (collectible.y > OPTIONS.stage.height + OPTIONS.sprites.collectible.height + 100) {
                removeCollectible(collectible);
            }
        });

        renderer.render(stage);

        // do thing with events...jeeeez
        if (!gameOver) {
            requestAnimFrame(render);
        } else {
            renderGameOver();
        }
    }

    function renderGameOver() {
        var gameOverText = new PIXI.Text('Game over!', {
            font: "70px monospace"
        });

        gameOverText.position.x = (OPTIONS.stage.width / 2) - gameOverText.width / 2;
        gameOverText.position.y = (OPTIONS.stage.height / 2) - gameOverText.height / 2;

        console.log((OPTIONS.stage.width / 2) - gameOverText.width);

        stage.addChild(gameOverText);
        renderer.render(stage);

        //requestAnimFrame(renderGameOver);
    }

    window.setInterval(function() {
        generateRandomEntity();
    }, 1000)

    function generateRandomEntity() { 
        // 20% chance ot spawn a collectible
        var chance = 0.2;
        if (Math.random() > chance) {
            generateRandomEnemy();
        } else {
            generateRandomCollectible();
        }
    }

    function generateRandomEnemy() {
        var randomX = Math.floor(Math.random() * OPTIONS.stage.width);
        var enemy = new Enemy(OPTIONS.sprites.enemy, randomX);

        enemies.push(enemy);
        stage.addChild(enemy);
    }

    function generateRandomCollectible() {
        var randomX = Math.floor(Math.random() * (OPTIONS.stage.width - OPTIONS.sprites.collectible.width) + OPTIONS.sprites.collectible.width);
        var collectible = new Collectible(OPTIONS.sprites.collectible, randomX);

        collectibles.push(collectible);
        stage.addChild(collectible);
        console.log('number of collectibles: '+ collectibles.length);
    }

    function removeEnemy(enemy) {
        var index = enemies.indexOf(enemy);
        enemies.splice(index, 1);
        stage.removeChild(enemy);
    }

    function removeCollectible(collectible) {
        var index = collectibles.indexOf(collectible);
        collectibles.splice(index, 1);
        stage.removeChild(collectible);
    }
}

require(['background', 'player', 'enemy', 'collectible'], init);