/*
* name;
*/
var NodeStatus;
(function (NodeStatus) {
    NodeStatus[NodeStatus["Empty"] = 0] = "Empty";
    NodeStatus[NodeStatus["Block"] = 1] = "Block";
})(NodeStatus || (NodeStatus = {}));
var GameMap = /** @class */ (function () {
    function GameMap() {
        this.objectContainer = new Sprite();
        this.currentStatus = new Array();
        this.nodeSprite = new Array();
        this.player = null;
        //runtime temparary data
        this.mapNodes = new Array();
        this.objects = new Array();
        this.characters = new Array();
        this.level = 1;
        this.objectContainer.pos(0, 0);
        this.objectContainer.zOrder = 0;
        //Laya.timer.frameLoop(1, this, this.Update);
    }
    GameMap.prototype.ResetLevel = function () {
        this.mapNodes = new Array();
        this.objects = new Array();
        this.characters = new Array();
        this.currentStatus = new Array();
        this.nodeSprite = new Array();
        this.map.off(Laya.Event.MOUSE_DOWN, this, this.MouseDown);
        Laya.timer.clearAll(this);
        Layer.ResetLayer();
        this.objectContainer.removeChildren();
        this.objectContainer.x = 0;
        this.objectContainer.y = 0;
        this.player.Reset();
        this.RestoreUpdate();
    };
    GameMap.prototype.LoadBasicLevel = function (level, offset) {
        if (offset === void 0) { offset = 0; }
        this.map = new CustomSprite("../laya/assets/" + level + "/bg.jpg");
        this.map.zOrder = -1;
        Layer.AddMap(this.map);
        for (var i = 0; i < 20; i++) {
            var closeShot = new CustomSprite("../laya/assets/" + level + "/close_shot_01.png");
            closeShot.pos(-250 - offset, 2000 - i * 800);
            Layer.AddForeGroundNear(closeShot);
        }
        for (var i = 0; i < 15; i++) {
            var closeShot = new CustomSprite("../laya/assets/" + level + "/close_shot_02.png");
            closeShot.pos(-250, 1400 - i * 800);
            Layer.AddForeGroundMid(closeShot);
        }
        for (var i = 0; i < 10; i++) {
            var closeShot = new CustomSprite("../laya/assets/" + level + "/close_shot_03.png");
            closeShot.pos(-250, 1900 - i * 800);
            Layer.AddForeGroundFar(closeShot);
        }
        for (var i = 0; i < 20; i++) {
            var closeShot = new CustomSprite("../laya/assets/" + level + "/close_shot_01_r.png");
            closeShot.pos(1080 - 300, 1600 - i * 800);
            Layer.AddForeGroundNear(closeShot);
        }
        for (var i = 0; i < 15; i++) {
            var closeShot = new CustomSprite("../laya/assets/" + level + "/close_shot_02_r.png");
            closeShot.pos(1080 - 300, 1000 - i * 800);
            Layer.AddForeGroundMid(closeShot);
        }
        for (var i = 0; i < 10; i++) {
            var closeShot = new CustomSprite("../laya/assets/" + level + "/close_shot_03_r.png");
            closeShot.pos(1080 - 300, 1500 - i * 800);
            Layer.AddForeGroundFar(closeShot);
        }
    };
    GameMap.prototype.LoadLevel1 = function () {
        this.level = 1;
        this.LoadBasicLevel("level1");
        this.nodeStatus = [[0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 2, 0, 0, 0],
            [2, 2, 0, 0, 0, 2, 2, 2],
            [0, 2, 0, 0, 0, 0, 0, 0],
            [0, 2, 0, 0, 0, 2, 0, 0],
            [2, 2, 2, 2, 2, 2, 0, 2],
            [0, 0, 2, 0, 0, 0, 0, 0],
            [0, 2, 2, 0, 2, 0, 0, 0],
            [0, 2, 2, 0, 2, 2, 2, 2],
            [0, 2, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 2, 0, 2, 2, 2],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1, 1],
            [1, 1, 0, 0, 0, 1, 1, 1],]; //0
        this.width = this.nodeStatus[0].length;
        this.height = this.nodeStatus.length;
        this.totalHeightInPxl = this.height * GameMap.nodeLength;
        var ground = new CustomSprite("../laya/assets/level1/land_01.png");
        ground.pos(150, -750);
        this.objectContainer.addChild(ground);
        var ground1 = new CustomSprite("../laya/assets/level1/land_full.jpg");
        ground1.pos(0, -2665);
        this.objectContainer.addChild(ground1);
        var end_ch1 = new CustomSprite("../laya/assets/level1/end_ch1.png");
        var offsetW = this.GetPosW(1);
        var offsetH = this.GetPosH(35);
        end_ch1.pos(offsetW, offsetH);
        this.objectContainer.addChild(end_ch1);
        for (var i = 0; i < this.nodeStatus.length; i++) {
            this.currentStatus.push([]);
            this.nodeSprite.push([]);
            for (var j = 0; j < this.nodeStatus[i].length; j++) {
                var value = this.nodeStatus[this.nodeStatus.length - 1 - i][j];
                this.currentStatus[i].push(value);
                if (value == 0 || value == 1)
                    continue;
                var path = "";
                if (value == 2)
                    path = "../laya/assets/level1/obstacle_01.png";
                var sp = new CustomSprite(path);
                var offsetW = this.GetPosW(j);
                var offsetH = this.GetPosH(i);
                sp.pos(offsetW, offsetH);
                this.objectContainer.addChild(sp);
                this.nodeSprite[i].push(sp);
            }
        }
        Layer.AddObjects(this.objectContainer);
        this.player = new Player(this, "back", 0, 3);
        this.map.on(Laya.Event.MOUSE_DOWN, this, this.MouseDown);
        for (var i = 0; i < this.nodeStatus.length; i++) {
            this.mapNodes.push([]);
            for (var j = 0; j < this.nodeStatus[i].length; j++) {
                this.mapNodes[i].push(new MapNode(i, j));
            }
        }
        Laya.timer.frameLoop(1, this, this.Update);
    };
    GameMap.prototype.LoadLevel2 = function () {
        this.level = 2;
        this.LoadBasicLevel("level2", 170);
        this.nodeStatus = [[1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 0, 0],
            [1, 1, 1, 1, 0, 1, 0, 1],
            [1, 1, 1, 1, 0, 1, 0, 1],
            [1, 1, 1, 1, 0, 1, 0, 1],
            [1, 1, 1, 1, 0, 1, 0, 0],
            [1, 1, 1, 1, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 0, 0],
            [1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 1, 1, 0],
            [0, 1, 0, 0, 0, 1, 0, 0],
            [0, 1, 0, 0, 0, 1, 0, 1],
            [0, 1, 1, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 0],
            [0, 0, 0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 1, 0],
            [1, 0, 1, 0, 0, 0, 0, 0],
            [1, 0, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1],]; //0
        this.width = this.nodeStatus[0].length;
        this.height = this.nodeStatus.length;
        this.totalHeightInPxl = this.height * GameMap.nodeLength;
        var ground = new CustomSprite("../laya/assets/level2/land_04_long_2.png");
        ground.pos(28, -2166);
        this.objectContainer.addChild(ground);
        for (var i = 0; i < this.nodeStatus.length; i++) {
            this.currentStatus.push([]);
            this.nodeSprite.push([]);
            for (var j = 0; j < this.nodeStatus[i].length; j++) {
                var value = this.nodeStatus[this.nodeStatus.length - 1 - i][j];
                this.currentStatus[i].push(value);
                if (value == 0 || value == 1)
                    continue;
                var path = "";
                if (value == 2)
                    path = "../laya/assets/level1/obstacle_01.png";
                var sp = new CustomSprite(path);
                var offsetW = this.GetPosW(j);
                var offsetH = this.GetPosH(i);
                sp.pos(offsetW, offsetH);
                this.objectContainer.addChild(sp);
                this.nodeSprite[i].push(sp);
            }
        }
        Layer.AddObjects(this.objectContainer);
        this.player = new Player(this, "back", 3, 1);
        this.map.on(Laya.Event.MOUSE_DOWN, this, this.MouseDown);
        for (var i = 0; i < this.nodeStatus.length; i++) {
            this.mapNodes.push([]);
            for (var j = 0; j < this.nodeStatus[i].length; j++) {
                this.mapNodes[i].push(new MapNode(i, j));
            }
        }
        var lights = [
            new ObjectLight(this, 4, 1, 1, 1, false),
            new ObjectLight(this, 11, 0, 1, 1, false),
            new ObjectLight(this, 3, 6, 1, 1, false),
            new ObjectLight(this, 7, 6, 1, 1, false, false),
            new ObjectLight(this, 15, 7, 1, 1, false, false),
        ];
        lights[0].AddChild(lights[1]);
        lights[0].AddChild(lights[2]);
        lights[2].AddChild(lights[3]);
        lights[3].AddChild(lights[4]);
        // lights[4].AddChild(lights[5]);
        // lights[4].AddChild(lights[7]);
        // lights[5].AddChild(lights[6]);
        // lights[7].AddChild(lights[8]);
        for (var i = 0; i < lights.length; ++i)
            this.AddGameObject(lights[i]);
        var actress = new Actress(this, "back", 4, 1, false, lights[0]);
        this.AddCharacter(actress);
        this.actress = actress;
        var nodes = [
            this.mapNodes[10][2],
            this.mapNodes[8][2],
            this.mapNodes[8][4],
            this.mapNodes[10][4],
        ];
        var firefly = new Firefly(this, "../laya/assets/level4/firefly_interactive.png", 10, 2, false, nodes);
        this.AddCharacter(firefly);
        Laya.timer.frameLoop(1, this, this.Update);
    };
    GameMap.prototype.LoadLevel3 = function () {
        this.level = 3;
        this.LoadBasicLevel("level4");
        this.nodeStatus = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
        ]; //0
        this.width = this.nodeStatus[0].length;
        this.height = this.nodeStatus.length;
        this.totalHeightInPxl = this.height * GameMap.nodeLength;
        var ground1 = new CustomSprite("../laya/assets/level4/land_07.png");
        ground1.pos(280, -1065);
        this.objectContainer.addChild(ground1);
        for (var i = 0; i < this.nodeStatus.length; i++) {
            this.currentStatus.push([]);
            this.nodeSprite.push([]);
            for (var j = 0; j < this.nodeStatus[i].length; j++) {
                var value = this.nodeStatus[this.nodeStatus.length - 1 - i][j];
                this.currentStatus[i].push(value);
                if (value == 0 || value == 1)
                    continue;
                var path = "";
                if (value == 2)
                    path = "../laya/assets/level1/obstacle_01.png";
                var sp = new CustomSprite(path);
                var offsetW = this.GetPosW(j);
                var offsetH = this.GetPosH(i);
                sp.pos(offsetW, offsetH);
                this.objectContainer.addChild(sp);
                this.nodeSprite[i].push(sp);
            }
        }
        Layer.AddObjects(this.objectContainer);
        this.player = new Player(this, "back", 0, 4);
        this.player.Save(0, 4);
        this.map.on(Laya.Event.MOUSE_DOWN, this, this.MouseDown);
        for (var i = 0; i < this.nodeStatus.length; i++) {
            this.mapNodes.push([]);
            for (var j = 0; j < this.nodeStatus[i].length; j++) {
                this.mapNodes[i].push(new MapNode(i, j));
            }
        }
        var fireflyLine = [1, 6, 9, 11, 15, 17, 19, 22];
        for (var _i = 0, fireflyLine_1 = fireflyLine; _i < fireflyLine_1.length; _i++) {
            var i = fireflyLine_1[_i];
            var nodes1 = [
                this.mapNodes[i][3],
                this.mapNodes[i + 1][3],
                this.mapNodes[i + 1][4],
                this.mapNodes[i + 1][3],
            ];
            var firefly1 = new Firefly(this, "../laya/assets/level4/firefly_interactive.png", i, 3, false, nodes1);
            firefly1.isNeedReborn = false;
            this.AddCharacter(firefly1);
            var nodes2 = [
                this.mapNodes[i + 1][3],
                this.mapNodes[i][3],
                this.mapNodes[i][4],
                this.mapNodes[i][3],
            ];
            var firefly2 = new Firefly(this, "../laya/assets/item/firefly.png", i + 1, 3, false, nodes2);
            firefly2.isNeedReborn = false;
            this.AddCharacter(firefly2);
        }
        var fireflyLine = [4, 5, 7, 8, 9, 11, 13, 14, 15, 17, 19, 21];
        for (var _a = 0, fireflyLine_2 = fireflyLine; _a < fireflyLine_2.length; _a++) {
            var i = fireflyLine_2[_a];
            var nodes = [
                this.mapNodes[i + 2][3],
                this.mapNodes[i + 2][4],
            ];
            var firefly = new Firefly(this, "../laya/assets/item/firefly.png", i + 2, 3, false, nodes);
            firefly.isNeedReborn = false;
            this.AddCharacter(firefly);
        }
        var fireflyLine = [4, 5, 6, 7, 8, 9, 11, 15, 17, 18, 19, 20];
        for (var _b = 0, fireflyLine_3 = fireflyLine; _b < fireflyLine_3.length; _b++) {
            var i = fireflyLine_3[_b];
            var nodes = [
                this.mapNodes[i + 2][3],
                this.mapNodes[i + 1][3],
                this.mapNodes[i + 1][4],
                this.mapNodes[i + 2][4],
            ];
            var firefly = new Firefly(this, "../laya/assets/item/firefly.png", i + 2, 3, false, nodes);
            firefly.isNeedReborn = false;
            this.AddCharacter(firefly);
        }
        var fireflyLine = [7, 8, 9, 11, 12, 14, 15, 16];
        for (var _c = 0, fireflyLine_4 = fireflyLine; _c < fireflyLine_4.length; _c++) {
            var i = fireflyLine_4[_c];
            var nodes = [
                this.mapNodes[i + 1][3],
                this.mapNodes[i + 2][3],
                this.mapNodes[i + 2][4],
                this.mapNodes[i + 2][3],
            ];
            var firefly = new Firefly(this, "../laya/assets/item/firefly.png", i + 1, 3, false, nodes);
            firefly.isNeedReborn = false;
            this.AddCharacter(firefly);
        }
        var lights = [
            new ObjectLight(this, 15, 4, 1, 1, false),
            // new ObjectLight(this, 10, 4, 1, 1, false),
            new ObjectLight(this, 22, 4, 1, 1, false),
        ];
        for (var i = 0; i < lights.length; ++i)
            this.AddGameObject(lights[i]);
        lights[0].AddChild(lights[1]);
        // lights[0].AddChild(lights[2]);
        // lights[2].AddChild(lights[3]);
        // lights[3].AddChild(lights[4]);
        // lights[4].AddChild(lights[5]);
        // lights[4].AddChild(lights[7]);
        // lights[5].AddChild(lights[6]);
        // lights[7].AddChild(lights[8]);
        var actress = new Actress(this, "back", 7, 4, false, lights[0], 1000);
        this.AddCharacter(actress);
        this.actress = actress;
        Laya.timer.frameLoop(1, this, this.Update);
        // Laya.timer.loop(200,)
    };
    GameMap.prototype.AddCharacter = function (character) {
        if (CustomSprite.Paused()) {
            var playerX = this.player.GexX();
            var playerY = this.player.GexY();
            var x = character.GetX();
            var y = character.GetY();
            var dis = Math.sqrt((playerX - x) * (playerX - x) + (playerY - y) * (playerY - y));
            if (dis < CustomSprite.radius)
                character.SetActive(false);
            else
                character.SetActive(true);
        }
        this.characters.push(character);
    };
    GameMap.prototype.AddGameObject = function (obj) {
        if (obj.blockable) {
            for (var i = 0; i < obj.sizeW; i++) {
                for (var j = 0; j < obj.sizeH; j++) {
                    var indexW = obj.indexW + i;
                    var indexH = obj.indexH + j;
                    if (indexW < this.width && indexH < this.height) {
                        this.SetStatus(indexH, indexW, NodeStatus.Block);
                    }
                }
            }
        }
        // var obj : GameObject = new GameObject(this,path, indexH,indexW, sizeH, sizeW, blockable);
        this.objects.push(obj);
    };
    GameMap.prototype.GetStatus = function (h, w) {
        return this.currentStatus[h][w];
    };
    GameMap.prototype.SetStatus = function (h, w, s) {
        this.currentStatus[h][w] = s;
    };
    GameMap.prototype.ReSetStatus = function (h, w) {
        this.currentStatus[h][w] = this.nodeStatus[h][w];
    };
    GameMap.prototype.MouseDown = function (e) {
        var indexW = Math.floor((this.objectContainer.mouseX - GameMap.leftOffset) / GameMap.nodeLength);
        var indexH = Math.floor((Laya.stage.height - this.objectContainer.mouseY) / GameMap.nodeLength);
        if (indexW < 0)
            indexW = 0;
        if (indexH < 0)
            indexH = 0;
        if (indexW >= this.width)
            indexW = this.width - 1;
        if (indexH >= this.height)
            indexH = this.height - 1;
        this.MoveTo(indexH, indexW);
    };
    GameMap.prototype.StopUpdate = function () {
        CustomSprite.SetPause(true);
    };
    GameMap.prototype.RestoreUpdate = function () {
        CustomSprite.SetPause(false);
    };
    GameMap.prototype.IsPaused = function () {
        return CustomSprite.Paused();
    };
    GameMap.prototype.Update = function (e) {
        var pos = this.objectContainer.y + this.player.GetUpperBound();
        var posX = this.objectContainer.x + this.player.GetUpperX();
        if (posX / Laya.stage.width < 0.3) {
            this.objectContainer.pos(this.objectContainer.x + (Laya.stage.width * 0.3 - posX), this.objectContainer.y);
        }
        else if (posX / Laya.stage.width > 0.6) {
            this.objectContainer.pos(this.objectContainer.x + (Laya.stage.width * 0.6 - posX), this.objectContainer.y);
        }
        var upLimit = 0.5;
        var lowLimit = 0.7;
        if (pos / Laya.stage.height < upLimit) {
            if (this.objectContainer.y + Laya.stage.height < this.totalHeightInPxl) {
                this.objectContainer.pos(this.objectContainer.x, this.objectContainer.y + (Laya.stage.height * upLimit - pos));
                Layer.GetInstance().foregroundNear.pos(Layer.GetInstance().foregroundNear.x, Layer.GetInstance().foregroundNear.y + (Laya.stage.height * upLimit - pos) * 3);
                Layer.GetInstance().foregroundMid.pos(Layer.GetInstance().foregroundMid.x, Layer.GetInstance().foregroundMid.y + (Laya.stage.height * upLimit - pos) * 2);
                Layer.GetInstance().foregroundFar.pos(Layer.GetInstance().foregroundFar.x, Layer.GetInstance().foregroundFar.y + (Laya.stage.height * upLimit - pos) * 1);
            }
        }
        else if (pos / Laya.stage.height > lowLimit) {
            if (this.objectContainer.y > 0) {
                this.objectContainer.pos(this.objectContainer.x, this.objectContainer.y + (Laya.stage.height * lowLimit - pos));
                Layer.GetInstance().foregroundNear.pos(Layer.GetInstance().foregroundNear.x, Layer.GetInstance().foregroundNear.y + (Laya.stage.height * lowLimit - pos) * 3);
                Layer.GetInstance().foregroundMid.pos(Layer.GetInstance().foregroundMid.x, Layer.GetInstance().foregroundMid.y + (Laya.stage.height * lowLimit - pos) * 2);
                Layer.GetInstance().foregroundFar.pos(Layer.GetInstance().foregroundFar.x, Layer.GetInstance().foregroundFar.y + (Laya.stage.height * lowLimit - pos) * 1);
                if (this.objectContainer.y < 0)
                    this.objectContainer.y = 0;
            }
        }
        if (CustomSprite.IsUpdating()) {
            GameMap.globalSpeed = 0.25;
            var playerX = this.player.GexX();
            var playerY = this.player.GexY();
            for (var i = 0; i < this.characters.length; i++) {
                var x = this.characters[i].GetX();
                var y = this.characters[i].GetY();
                var dis = Math.sqrt((playerX - x) * (playerX - x) + (playerY - y) * (playerY - y));
                if (dis < CustomSprite.radius)
                    this.characters[i].SetActive(false);
                else
                    this.characters[i].SetActive(true);
            }
        }
        else
            GameMap.globalSpeed = 1;
    };
    GameMap.prototype.IsWalkable = function (h, w) {
        if (this.GetStatus(h, w) == NodeStatus.Empty)
            return true;
        else
            return false;
    };
    GameMap.prototype.AddObject = function (sp) {
        this.objectContainer.addChild(sp);
    };
    GameMap.prototype.GetPosW = function (indexW) {
        return GameMap.leftOffset + GameMap.nodeLength * indexW;
    };
    GameMap.prototype.GetPosH = function (indexH) {
        return Laya.stage.height - GameMap.nodeLength * indexH - GameMap.nodeLength;
    };
    GameMap.prototype.MapDistance = function (h1, w1, h2, w2) {
        return Math.abs(h1 - h2) + Math.abs(w1 - w2);
    };
    GameMap.prototype.MoveTo = function (h, w, obj) {
        if (obj === void 0) { obj = null; }
        if (obj == null)
            obj = this.player;
        var heap = new NodeHeap();
        for (var i = 0; i < this.nodeStatus.length; i++) {
            for (var j = 0; j < this.nodeStatus[i].length; j++) {
                this.mapNodes[i][j].Clear();
            }
        }
        var playerNode = this.mapNodes[obj.indexH][obj.indexW];
        playerNode.weight = Math.abs(obj.indexH - h) + Math.abs(obj.indexW - w);
        playerNode.iterLength = 0;
        heap.Add(playerNode);
        var found = false;
        var times = 0;
        var isReachable = this.GetStatus(h, w) == NodeStatus.Empty;
        while (heap.GetSize() > 0) {
            times++;
            var node = heap.Pop();
            if (!isReachable && this.MapDistance(h, w, node.indexH, node.indexW) <= 1) {
                w = node.indexW;
                h = node.indexH;
                found = true;
                break;
            }
            if (node.indexW == w && node.indexH == h) {
                found = true;
                break;
            }
            if (times > 400)
                break;
            for (var i = 0; i < 4; i++) {
                var indexW = node.indexW + GameMap.neighbourDirW[i];
                var indexH = node.indexH + GameMap.neighbourDirH[i];
                if (indexW >= 0 && indexW < this.width && indexH >= 0 && indexH < this.height && this.IsWalkable(indexH, indexW)) {
                    var neighbour = this.mapNodes[indexH][indexW];
                    if (node.weight < neighbour.weight - 1) {
                        neighbour.weight = Math.abs(indexH - h) + Math.abs(indexW - w) + node.iterLength + 1;
                        neighbour.parentIndexH = node.indexH;
                        neighbour.parentIndexW = node.indexW;
                        neighbour.iterLength = node.iterLength + 1;
                        heap.Add(neighbour);
                    }
                }
            }
        }
        if (found) {
            var checkPoints = [];
            var indexH = h;
            var indexW = w;
            while (true) {
                checkPoints.push(this.mapNodes[indexH][indexW]);
                var currentIndexH = this.mapNodes[indexH][indexW].parentIndexH;
                var currentIndexW = this.mapNodes[indexH][indexW].parentIndexW;
                indexH = currentIndexH;
                indexW = currentIndexW;
                if (indexH == -1 && indexW == -1)
                    break;
            }
            obj.MoveTo(checkPoints);
        }
        else {
            console.log("not found");
            //TODO
        }
    };
    GameMap.globalSpeed = 1;
    GameMap.leftOffset = 28;
    GameMap.rightOffset = 28;
    GameMap.topOffset = 0;
    GameMap.nodeLength = 128;
    GameMap.neighbourDirW = [1, 0, -1, 0];
    GameMap.neighbourDirH = [0, 1, 0, -1];
    return GameMap;
}());
//# sourceMappingURL=Map.js.map