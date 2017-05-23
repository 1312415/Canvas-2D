Quintus.ActionPlatformerPlayer = function (Q) {

    Q.Sprite.extend("Player", {
        init: function (p) {
            this._super(p, {
                sheet: "player",
                jumpSpeed: -300,
                speed: 100,
                isJumping: false
            });
            this.add("2d, platformerControls");
            this.on("jump", function(){
                if(!this.p.isJumping && this.p.vy < 0) {
                    this.p.isJumping = true;
                    Q.audio.play("jump.mp3");
                }
            });

            this.on("bump.bottom", function(){
                this.p.isJumping = false;
            });
            this.on("hit.sprite",function(collision) {
                if(collision.obj.isA("Power")) {
                    Q.stageScene("nextLevel",1, { label: "Congratulation" });
                    this.destroy();
                }
            });
            this.on("hit.sprite",function(collision) {
                if(collision.obj.isA("PowerEnd")) {
                    Q.stageScene("endGame",1, { label: "You Won!" });
                    this.destroy();
                }
            });
        }
    });
    Q.Sprite.extend("Power", {
        init: function(p) {
            this._super(p, { sheet: 'power' });
        }
    });
    Q.Sprite.extend("PowerEnd", {
        init: function(p) {
            this._super(p, { sheet: 'power' });
        }
    });
};