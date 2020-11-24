class SceneStart extends Phaser.Scene {
    constructor() {
        super('SceneStart');
    }
    preload() {
        this.load.image('logo', 'image/logo.png');
        this.load.image('sky', 'image/space-background.png');
    }
    create() {
        this.add.sprite(game.config.width/2,
            game.config.height/2,'sky');
        this.add.sprite(game.config.width/2,
            game.config.height/4,'logo');
        this.start = this.add.text(game.config.width/2,
            game.config.height/1.8, 'Start',
            {
                fontFamily: 'courier new',
                color: '#ffffff',
                fontSize: '30px'
            });
        this.start.setOrigin(0.5,0.5);
        this.input.on('pointerdown', this.startGame, this);
    }
    startGame() {
        // reinicia o jogo
         this.scene.start('SceneMain');
    }
}