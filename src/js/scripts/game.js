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
        font: "24px monospace"
    });
    fpsText.position.x = 10;
    fpsText.position.y = 10;
    stage.addChild(fpsText);

    enemies = [];
    collectibles = [];

    function render() {
        var dt = new Date() - now;
        now = new Date();
        kd.tick();

        fpsText.setText('' + Math.floor(1000 / dt) + ' / E:' + enemies.length + ' / C:' + collectibles.length);

        background.update(dt);
        player.update(dt);

        enemies.forEach(function(enemy) {
            enemy.update(dt);
            // remove enemies that are out of sight
            if (enemy.y > OPTIONS.stage.height + OPTIONS.sprites.enemy.height + 100) {
                var index = enemies.indexOf(enemy);
                enemies.splice(index, 1);
            }
        });

        collectibles.forEach(function(collectible) {
            collectible.update(dt);
            // remove collectibles that are out of sight
            if (collectible.y > OPTIONS.stage.height + OPTIONS.sprites.collectible.height + 100) {
                var index = collectibles.indexOf(collectible);
                collectibles.splice(index, 1);
            }
        });

        renderer.render(stage);
        requestAnimFrame(render);
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
        var randomX = Math.floor(Math.random() * (OPTIONS.stage.width - OPTIONS.sprites.collectible.width / 2) + OPTIONS.sprites.collectible.width / 2);
        var collectible = new Collectible(OPTIONS.sprites.collectible, randomX);

        collectibles.push(collectible);
        stage.addChild(collectible);
        console.log('number of collectibles: '+ collectibles.length);
    }
}

require(['background', 'player', 'enemy', 'collectible'], init);