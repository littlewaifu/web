class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        // carrega as imagens
        this.load.image('alien','image/character/alien0.png');
        this.load.image('blue', 'image/platform/blue.png');
        this.load.image('sky', 'image/space-background.png');
    }
    create() {
        this.add.sprite(game.config.width/2,
            game.config.height/2,'sky');

        // adiciona o score no jogo
        this.score = -1;
        this.labelScore = this.add.text(20, 20, 'score: 0',
            {
                fontFamily: 'courier new',
                color: '#ffffff',
                fontSize: '20px'
            });

        // cria um grupo de canos
        this.blues = this.physics.add.group();
        // chama a criação de uma fileira de canos a cada 2 segundos
        this.timedEvent = this.time.addEvent({ delay: 2000, callback: this.addPlatform, callbackScope: this, loop: true });

        // adiciona o pássaro no jogo
        this.alien = this.physics.add.sprite(100,300,'alien');
        
        // define gravidade para o pássaro cair
        this.alien.setGravityY(300);

        // adiciona interação mouse e tecla de espaço
        this.input.on('pointerdown', this.moveAlien, this);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }
    moveAlien() {
        // define a velocidade da gravidade do pássaro a cada clique/tecla
        this.alien.setVelocity(0, -200);
    }
    addPlatform() {
        // sorteia um valor entre 1 e 5
        // essa posição será o buraco na fileira de canos
        var hole = Math.floor(Math.random() * 5) + 1;

        // adiciona 6 canos
        // deixando 2 espaços na posição sorteada (hole e hole + 1)
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1)
                this.blues.create(400, i * 60 + 30, 'blue');

        // define a velocidade da movimentação da fileira de canos
        this.blues.setVelocityX(-200);

        // apaga a fileira de canos quando não for mais visível
        this.blues.checkWorldBounds = true;
        this.blues.outOfBoundsKill = true;

        // atualiza score
        this.score += 1;
        this.labelScore.setText('score: ' + this.score);
    }
    restartGame() {
        // reinicia o jogo;
        this.scene.start('SceneMain');
    }
    update() {
        // se a tecla de espaço for pressionada, movimenta o pássaro
        if (this.spaceKey.isDown)
            this.moveAlien();

        // checando colisão com a fileira de canos
        this.physics.world.collide(this.alien, this.blues, function () {
            this.restartGame();
        }, null, this);

        // checando colisão com as bordas do jogo
        if (this.alien.y > game.config.height || this.alien.y < 0) {
            this.restartGame();
        }
    }
}