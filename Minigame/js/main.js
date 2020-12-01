var game;
window.onload = function () 
{
    var w = 400;
    var h = 480;
    var isMobile = navigator.userAgent.indexOf("Mobile");

    if(isMobile == -1)
    {
        isMobile = navigator.userAgent.indexOf("Tablet");
    }
    if(isMobile != -1)
    {
        w = window.innerWidth;
        h = window.innerHeight;
    }

    var config = 
    {
        type: Phaser.AUTO,
        width: w,
        height: h,
        parent: 'phaser-game',
        backgroundColor: '#000114',
        physics: {default: 'arcade', arcade: {debug: false}},
        scene: [SceneStart, SceneMain, SceneDead]
    };

    game = new Phaser.Game(config);
}