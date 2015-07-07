 CloudPlatform = function (game, x, y, key, group) {
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

};