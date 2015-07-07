var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

// variables duh
var platforms;
var cursors;
var player;
var score = 0;
var scoreText;

//preload sprite and other things for the canvas/webGL
function preload() {
	game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('cloud', 'assets/cloud-platform.png')
}

// actions to declare the initial state of the game canvaas
function create() { 
	//  We're going to be using physics, so enable the Arcade Physics system
	    game.physics.startSystem(Phaser.Physics.ARCADE);

	    //  A simple background for our game
	    game.add.sprite(0, 0, 'sky');

	    //  The platforms group contains the ground and the 2 ledges we can jump on
	    platforms = game.add.group();

	    //  We will enable physics for any object that is created in this group
	    platforms.enableBody = true;

	    // Here we create the ground.
	    var ground = platforms.create(0, game.world.height - 64, 'ground');

	    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
	    ground.scale.setTo(2, 2);

	    //  This stops it from falling away when you jump on it
	    ground.body.immovable = true;

	    //  Now let's create two ledges
	    var ledge = platforms.create(400, 400, 'ground');

	    ledge.body.immovable = true;

	    ledge = platforms.create(-150, 250, 'ground');

	    ledge.body.immovable = true;	
		

	// The player and its settings
	    player = game.add.sprite(32, game.world.height - 150, 'dude');

	    //  We need to enable physics on the player
	    game.physics.arcade.enable(player);

	    //  Player physics properties. Give the little guy a slight bounce.
	    player.body.bounce.y = 0.2;
	    player.body.gravity.y = 500;
	    player.body.collideWorldBounds = true;

	    //  Our two animations, walking left and right.
	    player.animations.add('left', [0, 1, 2, 3], 10, true);
	    player.animations.add('right', [5, 6, 7, 8], 10, true);

	    cursors = game.input.keyboard.createCursorKeys();


		stars = game.add.group();

	    stars.enableBody = true;

	    //  Here we'll create 12 of them evenly spaced apart
	    for (var i = 0; i < 12; i++)
	    {
	        //  Create a star inside of the 'stars' group
	        var star = stars.create(i * 70, 0, 'star');

	        //  Let gravity do its thing
	        star.body.gravity.y = 6;

	        //  This just gives each star a slightly random bounce value
	        star.body.bounce.y = 0.7 + Math.random() * 0.2;
	    }    
	    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
	 
	 	var cloud1 = new CloudPlatform(this.game, 0, 0, 'cloud-platform', this.clouds);

}


// actions that happen AFTER the board has been created and variables declared
function update() {
    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -550;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -450;
    }

    game.physics.arcade.collide(stars, platforms);

    game.physics.arcade.overlap(player, stars, collectStar, null, this);

}	


// icing on the cake
function collectStar (player, star) {

    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

}


function CloudPlatform (game, x, y, key, group) {

	if (typeof group === 'undefined') { group = game.world; }

    Phaser.Sprite.call(this, game, x, y, key);

    game.physics.arcade.enable(this);

    this.anchor.x = 0.5;

    this.body.customSeparateX = true;
    this.body.customSeparateY = true;
    this.body.allowGravity = false;
    this.body.immovable = true;

    this.playerLocked = false;

    group.add(this);
}

CloudPlatform.prototype = Object.create(Phaser.Sprite.prototype);
    CloudPlatform.prototype.constructor = CloudPlatform;
    CloudPlatform.prototype.addMotionPath = function (motionPath) {
        this.tweenX = this.game.add.tween(this.body);
        this.tweenY = this.game.add.tween(this.body);
        //  motionPath is an array containing objects with this structure
        //  [
        //   { x: "+200", xSpeed: 2000, xEase: "Linear", y: "-200", ySpeed: 2000, yEase: "Sine.easeIn" }
        //  ]
        for (var i = 0; i < motionPath.length; i++)
        {
            this.tweenX.to( { x: motionPath[i].x }, motionPath[i].xSpeed, motionPath[i].xEase);
            this.tweenY.to( { y: motionPath[i].y }, motionPath[i].ySpeed, motionPath[i].yEase);
        }
        this.tweenX.loop();
        this.tweenY.loop();
    };
    CloudPlatform.prototype.start = function () {
        this.tweenX.start();
        this.tweenY.start();
    };
    CloudPlatform.prototype.stop = function () {
        this.tweenX.stop();
        this.tweenY.stop();
    };