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

        var backgroundSprite = new PIXI.Sprite(backgroundTexture);

        backgroundSprite.anchor.x = 0.5;
        backgroundSprite.anchor.y = 0.5;
        backgroundSprite.position.x = canvas.width/2;
        backgroundSprite.position.y = canvas.height/2;

        stage.addChild(backgroundSprite);

        function render() {
            requestAnimFrame(render);
            renderer.render(stage);
        }
    }
})();