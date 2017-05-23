Quintus.ActionPlatformerEnemy = function (Q) {
    Q.component("commonEnemy", {
        added: function () {
            var entity = this.entity;
            entity.on("bump.left, bump.right, bump.bottom", function (collision) {
                if(collision.obj.isA("Player")){
                    collision.obj.destroy();
                    Q.stageScene("endGame",1, { label: "You lost!" });
                }
            });
            entity.on("bump.top", function (collision) {
                if(collision.obj.isA("Player")){
                    collision.obj.p.vp = -100;
                    Q.audio.play("kill-enemy.mp3");
                    this.destroy();
                }
            })

        }
    });
    Q.Sprite.extend("GroundEnemy", {
        init: function (p) {
            this._super(p, {vx: -50, defaultDirection: "left"});
            this.add("2d, aiBounce, commonEnemy");
            console.log(Q.TileLayer);
        },
        step: function(dt) {
            var dirX = this.p.vx / Math.abs(this.p.vx);
            var ground = Q.stage().locate(this.p.x, this.p.y + this.p.h/2 + 1, Q.SPRITE_ALL);
            var nextElement = Q.stage().locate(this.p.x + dirX * this.p.w/2 + dirX, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);
            if(!nextElement.collisionLayer && ground.collisionLayer) {
                this.p.vx = -this.p.vx;
            }

        }
    });
    Q.Sprite.extend("VerticalEnemy", {
        init: function(p) {
            this._super(p, {vy: -100, rangeY: 40, gravity: 0 });
            this.add("2d, commonEnemy");

            this.p.initialY = this.p.y;
            this.p.initialVy = this.p.vy;

        },
        step: function(dt) {
            if(this.p.y - this.p.initialY >= this.p.rangeY && this.p.vy > 0) {
                this.p.vy = -this.p.vy;
            }
            else if(-this.p.y + this.p.initialY >= this.p.rangeY && this.p.vy < 0) {
                this.p.vy = -this.p.vy;
            }
        }
    });
};
