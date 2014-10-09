(function() {
    window.addEventListener('load', init);

    var sprites = {
        background: {
            source: "img/test.png"
        },
        character: {
            source: ""
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
    };

    function init(){
        var stage = new PIXI.Stage(0x000000),
            canvas = document.getElementById('game'),
            renderer = PIXI.autoDetectRenderer(canvas.width, canvas.height, canvas);

        requestAnimFrame(render);

        var backgroundTexture = PIXI.Texture.fromImage(sprites.background.source),
            characterTexture = PIXI.Texture.fromImage(sprites.character.source),
            enemyTexture = PIXI.Texture.fromImage(sprites.enemy.source),
            projectileTexture = PIXI.Texture.fromImage(sprites.projectile.source),
            collectibleTexture = PIXI.Texture.fromImage(sprites.collectible.source);

        var backgroundSprite = new PIXI.TilingSprite(backgroundTexture, 640, 400);

        backgroundSprite.tilePosition.x = 0;
        backgroundSprite.tilePosition.y = 0;

        stage.addChild(backgroundSprite);

        function render() {
            requestAnimFrame(render);
            backgroundSprite.tilePosition.y += 0.8;
            renderer.render(stage);
        }
    }
})();
