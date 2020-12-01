class SceneMain extends Phaser.Scene 
{
    constructor() 
    {
        super('SceneMain');
    }

    preload() 
    {
        // carrega as imagens
        this.load.spritesheet('alien', 'image/character/alien.png', { frameWidth: game.config.width * 0.125, frameHeight: game.config.height * 0.104 });
        
        this.load.image('space', 'image/space-background.png');

        this.load.image('blue', 'image/platform/blue.png');
        this.load.image('cyan', 'image/platform/cyan.png');
        this.load.image('green', 'image/platform/green.png');
        this.load.image('pink', 'image/platform/pink.png');
        this.load.image('purple', 'image/platform/purple.png');
        this.load.image('red', 'image/platform/red.png');
        this.load.image('yellow', 'image/platform/yellow.png');

        // carrega os sons
        this.load.audio('jump', 'sound/maro-jump-sound-effect_1.mp3');
        this.load.audio('theme','sound/894185_Among-Us-Theme.mp3');
    }

    create() 
    {
        // adiciona o som de pulo
        this.jump = this.sound.add('jump', {volume: 0.1});
        
        this.space1 = this.add.sprite(game.config.width * 0.5, game.config.height * 0.5, 'space');
        this.space2 = this.add.sprite(game.config.width * 1.5, game.config.height * 0.5, 'space');

        // adiciona o score no jogo
        this.score = -1;
        this.labelScore = this.add.text(game.config.width * 0.5, game.config.height * 0.15, '0',
            {
                fontFamily: 'courier new',
                color: '#ffbf00',
                fontSize: '50px'
            });
        this.labelScore.setOrigin(0.5, 0.5);

        // cria um grupo de canos
        this.pipes = this.physics.add.group();
        // chama a criação de uma fileira de canos a cada 2 segundos
        this.timedEvent = this.time.addEvent({ delay: 2000, callback: this.addPlatform, callbackScope: this, loop: true });

        // adiciona o alien no jogo
        this.alien = this.physics.add.image(game.config.width * 0.25, game.config.height * 0.5, 'alien');
        this.alien.setFrame(0);
        //this.alien = this.physics.add.sprite(game.config.width * 0.25, game.config.height * 0.5, 'alien');
        
        // define gravidade para o alien cair
        this.alien.setGravityY(game.config.height * 1.04);

        // adiciona interação mouse e tecla de espaço
        this.input.on('pointerdown', this.moveAlien, this);
        
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    moveAlien() 
    {
        // troca o frame para o foguete e salva a altura atual
        this.alien.setFrame(1);
        this.heightAlien = this.alien.y -= 4;

        // define a velocidade da gravidade do alien a cada clique/tecla
        this.alien.setVelocity(0, -game.config.height * 0.4);

        // toca o som do pulo
        this.jump.play();

        // rotaciona no eixo Z em -45°
        this.tweens.add({targets: this.alien, duration: 200, angle: -45, yoyo: true, });        
    }

    addPlatform() 
    {
        // adiciona as imagens num array e sorteia
        var pipeColors = ['blue', 'cyan', 'green', 'pink', 'purple', 'red', 'yellow'];
        var randomColor = pipeColors[Math.floor(Math.random() * pipeColors.length)];

        // sorteia um valor entre 1 e 5
        // essa posição será o buraco na fileira de canos
        var hole = Math.floor(Math.random() * 5) + 1;

        // adiciona 6 canos
        // deixando 2 espaços na posição sorteada (hole e hole + 1)
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1)
                this.pipes.create(game.config.width, i * game.config.height * 0.125 + game.config.height * 0.0625, randomColor);

        // define a velocidade da movimentação da fileira de canos
        this.pipes.setVelocityX(-game.config.width * 0.5);

        // apaga a fileira de canos quando não for mais visível
        this.pipes.checkWorldBounds = true;
        this.pipes.outOfBoundsKill = true;

        // atualiza score
        this.score += 1;
        this.labelScore.setText('' + this.score);
    }

    gameOver() 
    {
        // vai para a sceneDead
        this.scene.start('SceneDead', {score: this.score});
    }

    update() 
    {
        // realiza o efeito de movimento infinito do fundo com a alternância entre duas sprites
        this.space1.x -= 0.8;
        if (this.space1.x < game.config.width * -0.5) 
        {
            this.space1.x = game.config.width * 1.5;
        }
        this.space2.x -= 0.8;
        if (this.space2.x < game.config.width * -0.5) 
        {
            this.space2.x = game.config.width * 1.5;
        }
        
        // verifica se o Alien está caindo e então troca o frame
        if(this.alien.y > this.heightAlien)
        {
            this.alien.setFrame(0);
        }

        // força a rotação eixo Z do alien a voltar em 0°
        this.tweens.add({targets: this.alien, duration: 200, angle: 0, yoyo: true, });

        // se a tecla de espaço for pressionada, movimenta o alien
        if (this.spaceKey.isDown)
            this.moveAlien();

        // checando colisão com a fileira de canos
        this.physics.world.collide(this.alien, this.pipes, function () {this.gameOver();}, null, this);

        // checando colisão com as bordas do jogo
        if (this.alien.y > game.config.height || this.alien.y < 0)
        {
            this.gameOver();
        }
    }
}