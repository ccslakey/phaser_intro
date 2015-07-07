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