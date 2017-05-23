window.addEventListener("load", function () {
    var Q = window.Q = Quintus({development: true})
        .include("Scenes, Sprites, 2D, Input, Touch, UI, TMX, Audio")
        .include("ActionPlatformerPlayer, ActionPlatformerEnemy")
        .setup({
            width: 320,
            height: 180,
            scaleToFit: true
        }).controls().touch();



    Q.setImageSmoothing(false);
    Q.enableSound();
    Q.scene("level", function (stage) {
        var player;
        Q.stageTMX("small_level.tmx", stage);
        player = Q("Player").first();
        stage.add("viewport").follow(player, {x: true, y: true});
    });
    Q.scene("level2", function (stage) {
        var player;
        Q.stageTMX("big_level.tmx", stage);
        player = Q("Player").first();
        stage.add("viewport").follow(player, {x: true, y: true});
    });
    Q.scene('nextLevel', function (stage) {
        var box = stage.insert(new Q.UI.Container({
            x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
        }));

        var button = box.insert(new Q.UI.Button({
            x: 0, y: 0, fill: "#CCCCCC",
            label: "Next level"
        }));
        var label = box.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
            label: stage.options.label }));
        button.on("click",function() {
            Q.clearStages();
            Q.stageScene('level2');
        });
        box.fit(20);
    });
    Q.scene('endGame',function(stage) {
        var box = stage.insert(new Q.UI.Container({
            x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
        }));

        var button = box.insert(new Q.UI.Button({
            x: 0, y: 0, fill: "#CCCCCC",
            label: "Play Again"
        }));
        var label = box.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
            label: stage.options.label }));
        button.on("click",function() {
            Q.clearStages();
            Q.stageScene('level');
        });
        box.fit(20);
    });
    //load assets
    Q.loadTMX("small_level.tmx, big_level.tmx, sprites.json, sprites.png, kill-enemy.mp3, jump.mp3", function () {
        Q.compileSheets("sprites.png", "sprites.json");
        Q.stageScene("level");
    });

});
        
        
        
        
        
        