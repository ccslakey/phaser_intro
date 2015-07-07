    var PhaserGame = function () {
        this.bg = null;
        this.trees = null;
        this.player = null;
        this.stationary = null;
        this.clouds = null;
        this.facing = 'left';
        this.jumpTimer = 0;
        this.cursors;
        this.locked = false;
        this.lockedTo = null;
        this.wasLocked = false;
        this.willJump = false;
    };