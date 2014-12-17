(function() {
    "use strict";

    var options = {
        scrollSpeed: 1.5,
        playerSpeed: 5,
        stage: {
            width: 540,
            height: 860
        },
        sprites: {
            background: {
                source: "img/background.png",
                width: 540,
                height: 960
            },
            player: {
                source: "img/player.png",
                width: 50,
                height: 52
            },
            enemy: {
                source: ""
            },
            projectile: {
                source: ""
            },
            collectible: {
                source: ""
            }
        }
    };

    window.OPTIONS = options;

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
})();
