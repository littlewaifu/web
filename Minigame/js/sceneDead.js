class SceneDead extends Phaser.Scene {
    constructor() {
        super('SceneDead');
    }
    preload() {
    }
    create() {
        this.start = this.add.text(game.config.width/2,
            game.config.height/2, 'GAME OVER',
            {
                fontFamily: 'courier new',
                color: '#CC0000',
                fontSize: '50px'
            });
        this.start.setOrigin(0.5,0.5);
        this.input.on('pointerdown', this.startGame, this);
    }
    startGame() {
        // reinicia o jogo
         this.scene.start('SceneMain');
    }
    update() {
    }
}