function init(Background, Player){
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

    function render() {
        kd.tick();

        background.update();
        player.update();

        renderer.render(stage);
        requestAnimFrame(render);
    }

    renderer.render(stage);
}

require(['background', 'player'], init);