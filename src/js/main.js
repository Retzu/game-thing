var options = {
    scrollSpeed: 1.5,
    playerSpeed: 5,
    entitySpeed: 2,
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
            width: 50,
            height: 50
        },
        collectible: {
            source: "img/collectible.png",
            width: 50,
            height: 50
        }
    }
};

window.OPTIONS = options;

requirejs.config({
	baseUrl: 'js/scripts'
});

require(['game']);