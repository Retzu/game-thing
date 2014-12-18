var options = {
    debug: true,
    gameSpeed: 1.3,
    maxGameSpeed: 10,
    playerSpeed: 5,
    spawnRate: 1000,
    minSpawnRate: 150,
    increaseDifficulty: true,
    levelDuration: 5000,
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
            source: "img/enemy.png",
            width: 44,
            height: 48
        },
        collectible: {
            source: "img/collectible.png",
            width: 50,
            height: 50
        }
    }
};

requirejs.config({
    baseUrl: 'js/scripts'
});

require(['game'], function(Game) {
    var game = new Game('game', options);
    game.run();
});