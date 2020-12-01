class SceneStart extends Phaser.Scene 
{
    constructor() 
    {
        super('SceneStart');
    }

    preload() 
    {
        this.load.image('logo', 'image/logo.png');
        this.load.image('sky', 'image/space-background.png');
        this.load.audio('theme','sound/894185_Among-Us-Theme.mp3');
    }

    create() 
    {
        // adiciona e toca em looping a música
        var music = this.sound.add('theme', {volume: 0.2});
        music.setLoop(true);
        music.play();

        this.add.sprite(game.config.width * 0.5, game.config.height * 0.5,'sky');
        this.add.sprite(game.config.width * 0.5, game.config.height * 0.4,'logo');

        this.start = this.add.text(game.config.width * 0.5,
            game.config.height * 0.75, 'JOGAR',
            {
                fontFamily: 'courier new',
                color: '#ffbf00',
                fontSize: '30px'
            });
        this.start.setOrigin(0.5, 0.5);

        this.input.on('pointerdown', this.startGame, this);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    startGame() 
    {
        // vai para a sceneMain
        this.scene.start('SceneMain');
    }

    update()
    {
        // se a tecla de espaço for pressionada, troca a cena
        if (this.spaceKey.isDown)
            this.startGame();
    }
}