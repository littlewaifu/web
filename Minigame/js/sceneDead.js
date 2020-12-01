class SceneDead extends Phaser.Scene 
{
    constructor() 
    {
        super('SceneDead');
    }

    init(data)
    {
        // recebe e guarda o score da sceneMain
        this.score = data.score;
    }

    preload() 
    {
        this.load.image('sky', 'image/space-background.png');
    }

    create() 
    {
        this.add.sprite(game.config.width * 0.5, game.config.height * 0.5,'sky');

        this.labelScore = this.add.text(game.config.width * 0.5, game.config.height * 0.6, 'PONTOS: 0', 
            {
                fontFamily: 'courier new', 
                color: '#ffbf00', 
                fontSize: '30px'
            });
        this.labelScore.setOrigin(0.5, 0.5);

        // recebe o score passado da sceneMain
        this.labelScore.setText('PONTOS: ' + this.score);

        this.start = this.add.text(game.config.width * 0.5,
            game.config.height * 0.4, 'FIM DE JOGO',
            {
                fontFamily: 'courier new',
                color: '#00ffd2',
                fontSize: '50px'
            });
        this.start.setOrigin(0.5, 0.5);

        this.input.on('pointerdown', this.restartGame, this);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    restartGame()
    {
        // vai para a sceneMain
         this.scene.start('SceneMain');
    }
    
    update()
    {
        // se a tecla de espaço for pressionada, troca a cena
        if (this.spaceKey.isDown)
            this.restartGame();
    }
}