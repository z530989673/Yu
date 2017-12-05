var GameManager = /** @class */ (function () {
    function GameManager(game) {
        this.isSingleBlockStart = false;
        this.isMusicStoneStart = false;
        this.stoneCurrentID = 1;
        this.score = 0;
        this.girlHappiness = 0;
        this.boyHappiness = 0;
        this.energy = 0;
        this.map = game.map;
        this.game = game;
        this.player = game.map.player;
        EventCenter.addEventListener(new GameEvent("standPos", null, this), GameManager.standPos);
        EventCenter.addEventListener(new GameEvent("touchLatern", null, this), this.touchLatern);
        EventCenter.addEventListener(new GameEvent("touchWater", null, this), this.touchWater);
        EventCenter.addEventListener(new GameEvent("touchBall", null, this), this.touchBall);
        EventCenter.addEventListener(new GameEvent("touchMusicStone", null, this), this.musicStoneTouch);
        EventCenter.addEventListener(new GameEvent("playerCollision", null, this), this.playerCollision);
        EventCenter.addEventListener(new GameEvent("ballSwitchTouch", null, this), this.ballSwitchTouch);
    }
    GameManager.prototype.startSingleBlockLevel = function (e) {
        var nodes = [
            e.eventInst.map.mapNodes[18][3],
            e.eventInst.map.mapNodes[11][3]
        ];
        var character = new Character(e.eventInst.map, "../laya/assets/item/icon_wildfire.png", 18, 3, false, nodes);
        e.eventInst.addCharacter(character);
        // e.eventInst.map.AddCharacter(ball);
        // e.eventInst.map.MoveTo(20, 5, ball);
        // ball.MoveTo(nodes1);
        // e.eventArgs.map = nodes1;
        var nodes2 = [
            e.eventInst.map.mapNodes[18][4],
            e.eventInst.map.mapNodes[13][4]
        ];
        var character2 = new Character(e.eventInst.map, "../laya/assets/item/icon_wildfire.png", 18, 4, false, nodes2);
        e.eventInst.addCharacter(character2);
        // var nodes1 : MapNode[] = [
        //     e.eventInst.map.mapNodes[5][5],
        //     e.eventInst.map.mapNodes[5][4],
        //     e.eventInst.map.mapNodes[5][3],
        //     e.eventInst.map.mapNodes[5][2],
        //     e.eventInst.map.mapNodes[5][1],
        //     e.eventInst.map.mapNodes[5][0]
        //    	];
        // e.eventInst.map.AddCharacter(new Ball(e.eventInst.map, "../laya/assets/item/icon_wildfire.png", 5, 5, false, nodes1));
    };
    GameManager.prototype.startMusicStoneLevel = function (e) {
        e.eventInst.musicStone1 = new MusicStone(e.eventInst.map, "../laya/assets/level1/note02.png", 22, 4, 1);
        e.eventInst.musicStone2 = new MusicStone(e.eventInst.map, "../laya/assets/level1/note03.png", 23, 2, 2);
        e.eventInst.musicStone3 = new MusicStone(e.eventInst.map, "../laya/assets/level1/note01.png", 25, 3, 3);
        e.eventInst.musicStone4 = new MusicStone(e.eventInst.map, "../laya/assets/level1/note04.png", 26, 6, 4);
        e.eventInst.musicStone5 = new MusicStone(e.eventInst.map, "../laya/assets/level1/note05.png", 29, 5, 5);
        e.eventInst.musicStone6 = new MusicStone(e.eventInst.map, "../laya/assets/level1/note06.png", 29, 3, 6);
        e.eventInst.musicStone1.image.visible = false;
        e.eventInst.musicStone2.image.visible = false;
        e.eventInst.musicStone3.image.visible = false;
        e.eventInst.musicStone4.image.visible = false;
        e.eventInst.musicStone5.image.visible = false;
        e.eventInst.musicStone6.image.visible = false;
        e.eventInst.map.AddGameObject(musicStone1);
        e.eventInst.map.AddGameObject(musicStone2);
        e.eventInst.map.AddGameObject(musicStone3);
        e.eventInst.map.AddGameObject(musicStone4);
        e.eventInst.map.AddGameObject(musicStone5);
        e.eventInst.map.AddGameObject(musicStone6);
        var nodes = [
            // e.eventInst.map.mapNodes[26][3],
            e.eventInst.map.mapNodes[25][3],
            e.eventInst.map.mapNodes[24][3],
            e.eventInst.map.mapNodes[23][3],
            e.eventInst.map.mapNodes[23][4],
            e.eventInst.map.mapNodes[22][4],
        ];
        var nodes2 = [
            e.eventInst.map.mapNodes[21][1],
            e.eventInst.map.mapNodes[21][2],
            e.eventInst.map.mapNodes[21][3],
            e.eventInst.map.mapNodes[21][4],
        ];
        var nodes3 = [
            e.eventInst.map.mapNodes[30][2],
            e.eventInst.map.mapNodes[30][3],
            e.eventInst.map.mapNodes[30][4],
            e.eventInst.map.mapNodes[29][4],
            e.eventInst.map.mapNodes[28][4],
            e.eventInst.map.mapNodes[28][3],
            e.eventInst.map.mapNodes[28][2],
            e.eventInst.map.mapNodes[29][2],
            e.eventInst.map.mapNodes[30][2],
        ];
        var nodes4 = [
            e.eventInst.map.mapNodes[28][4],
            e.eventInst.map.mapNodes[28][3],
            e.eventInst.map.mapNodes[28][2],
            e.eventInst.map.mapNodes[29][2],
            e.eventInst.map.mapNodes[30][2],
            e.eventInst.map.mapNodes[30][3],
            e.eventInst.map.mapNodes[30][4],
            e.eventInst.map.mapNodes[29][4],
            e.eventInst.map.mapNodes[28][4],
        ];
        var character = new Character(e.eventInst.map, "../laya/assets/item/icon_wildfire.png", 25, 3, false, nodes);
        var character2 = new Character(e.eventInst.map, "../laya/assets/item/icon_wildfire.png", 21, 1, false, nodes2);
        var character3 = new Character(e.eventInst.map, "../laya/assets/item/icon_wildfire.png", 30, 2, false, nodes3);
        var character4 = new Character(e.eventInst.map, "../laya/assets/item/icon_wildfire.png", 28, 4, false, nodes4);
        // var character5 : Character = new Character(e.eventInst.map, "../laya/assets/item/icon_wildfire.png", 28, 4, false, []);
        // var character3 : Character = new Character(e.eventInst.map, "../laya/assets/placeHolder/Flag.png", 21, 1, false, nodes3);
        e.eventInst.addCharacter(character);
        e.eventInst.addCharacter(character2);
        e.eventInst.addCharacter(character3);
        e.eventInst.addCharacter(character4);
        // e.eventInst.addCharacter(character3);
    };
    GameManager.prototype.playerCollision = function (e) {
        var player = e.eventArgs[0];
        var character = e.eventArgs[1];
        // player.Load();
        // if(character.ClassName == "Character")
        // {
        // 	player.Load();
        // }
        // else if (character.ClassName == "Ball")
        // {
        // 	var ball:Ball = character;
        // 	var X = ball.indexW;
        // 	var Y = ball.indexH;
        // }
        if (character.type == CharacterType.FIREFLY && e.eventInst.map.IsPaused()) {
            EventCenter.dispatchAll(new GameEvent("holdFirefly", character, this));
            return;
        }
        else if (character.type != CharacterType.FIREFLY) {
            player.Load();
        }
        if (character.type == CharacterType.ACTRESS) {
            character.FindPrevTargetObject();
        }
    };
    GameManager.standPos = function (e) {
        var PosX = e.eventArgs[0];
        var PosY = e.eventArgs[1];
        var level = e.eventArgs[2];
        if (level == 1) {
            if (PosY == 5 && !e.eventInst.isSingleBlockStart) {
                e.eventInst.isSingleBlockStart = true;
                e.eventInst.startSingleBlockLevel(e);
                e.eventInst.startMusicStoneLevel(e);
            }
            if (PosY == 19 && !e.eventInst.isMusicStoneStart) {
                e.eventInst.map.player.Save(2, 19);
                e.eventInst.isMusicStoneStart = true;
                e.eventInst.map.RestoreUpdate();
                // e.eventInst.startMusicStoneLevel(e);
            }
            if (PosY == 33 && e.eventInst.map.level == 1) {
                // EventCenter.removeEventListener(new GameEvent("standPos", null, this),GameManager.standPos);
                e.eventInst.game.ResetLevel(2);
            }
        }
        if (level == 3) {
            var gPosY = e.eventInst.map.actress.indexH;
            if (gPosY == 22)
                e.eventInst.map.actress.SetVisible(false);
            if (PosY == 22) {
                e.eventInst.map.player.Load();
                e.eventInst.map.actress.indexW = 7;
                e.eventInst.map.actress.indexH = 4;
                e.eventInst.map.actress.image.pos(e.eventInst.map.GetPosW(e.eventInst.indexW), e.eventInst.map.GetPosH(e.eventInst.indexH));
                // e.eventInst.map.actres
                // e.eventInst.map.actress.
                e.eventInst.game.ResetLevel(3);
            }
        }
        else if (level == 2) {
            var gPosY = e.eventInst.map.actress.indexH;
            if (gPosY >= 15 && PosY >= 13) {
                Laya.timer.once(10, e.eventInst.game, e.eventInst.game.ResetLevel, [3]);
            }
        }
    };
    GameManager.prototype.wakeupGirl = function (e) {
        var lights = [
            new ObjectLight(e.eventInst.map, 33, 4, 1, 1, false),
        ];
        // lights[0].image.visible = false;
        for (var i = 0; i < lights.length; ++i)
            e.eventInst.map.AddGameObject(lights[i]);
        // lights[0].AddChild(lights[1]);
        var actress = new Actress(e.eventInst.map, "back", 32, 5, false, lights[0]);
        e.eventInst.map.AddCharacter(actress);
    };
    GameManager.prototype.finishSingleBlockLevel = function () {
        // removeCharactor();
    };
    GameManager.prototype.finishMusicStoneLevel = function (e) {
        e.eventInst.wakeupGirl(e);
        SoundManager.playMusic("../laya/assets/music/1204.wav", 1);
    };
    GameManager.prototype.startBallLevel = function (e) {
        var nodes1 = [];
        e.eventInst.map.AddCharacter(new Ball(e.eventInst.map, "../laya/assets/item/icon_wildfire.png", 33, 5, false, nodes1));
        // e.eventInst.map.AddCharacter()
    };
    GameManager.prototype.finishBallLevel = function () {
    };
    GameManager.prototype.startLaternLevel = function () {
    };
    GameManager.prototype.finishLaternLevel = function () {
    };
    GameManager.prototype.startBridgeLevel = function () {
    };
    GameManager.prototype.finishBridgeLevel = function () {
    };
    GameManager.prototype.startBoreLevel = function () {
    };
    GameManager.prototype.finishBoreLevel = function () {
    };
    GameManager.prototype.startCloseLevel = function () {
    };
    GameManager.prototype.finishCloseLevel = function () {
    };
    GameManager.prototype.lightLatern = function () {
        return;
    };
    GameManager.prototype.solveLaternPuzzle = function () {
        return;
    };
    GameManager.prototype.touchLatern = function (e) {
        this.lightLatern();
        this.solveLaternPuzzle();
    };
    GameManager.prototype.touchWater = function (e) {
        // this.damageBoy();
    };
    GameManager.prototype.damageBoy = function () {
        return;
    };
    GameManager.prototype.touchBall = function (e) {
    };
    GameManager.prototype.ballTouchEndPoint = function (e) {
        this.solveBallPuzzle();
    };
    GameManager.prototype.girlTouchGrid = function (e) {
        this.dropDownRoad();
    };
    GameManager.prototype.dropDownRoad = function () {
    };
    GameManager.prototype.solveBallPuzzle = function () {
    };
    GameManager.prototype.openGate = function (e) {
        var pitch = e.eventArgs;
        if (pitch == 1) {
        }
        if (pitch == 2) {
        }
        if (pitch == 3) {
        }
        if (pitch == 4) {
        }
    };
    GameManager.prototype.ballSwitchTouch = function (e) {
        e.eventInst.openGate(e);
        // e.eventInst.
    };
    GameManager.prototype.musicStoneTouch = function (e) {
        console.log("musicstone touch");
        var pitch = e.eventArgs;
        e.eventInst.sendSound(e, pitch);
        e.eventInst.solveMusicPuzzle(e);
    };
    GameManager.prototype.sendSound = function (e, pitch) {
        switch (pitch) {
            case 1:
                e.eventInst.musicStone1;
                break;
            default:
                // code...
                break;
        }
        if (pitch == 6)
            return;
        SoundManager.playMusic("../laya/assets/music/0" + pitch + ".wav", 1);
    };
    GameManager.prototype.solveMusicPuzzle = function (e) {
        console.log("music puzzle");
        console.log(e.eventInst.stoneCurrentID);
        var pitch = e.eventArgs;
        if (pitch == e.eventInst.stoneCurrentID) {
            console.log("music next");
            console.log(pitch);
            e.eventInst.stoneCurrentID++;
            if (pitch == 6) {
                e.eventInst.map.player.Save(29, 3);
                e.eventInst.map.RestoreUpdate();
                e.eventInst.finishMusicStoneLevel(e);
            }
        }
        else {
            console.log("music last");
            console.log(pitch);
            e.eventInst.stoneCurrentID = 2;
        }
    };
    GameManager.prototype.solveDogPuzzle = function () {
        return;
    };
    GameManager.prototype.addCharacter = function (character) {
        // this.map.AddCharacter("../laya/assets/placeHolder/Green.png", 8, 3, true, [this.map.mapNodes[8][3], this.map.mapNodes[8][4]]);
        this.map.AddCharacter(character);
    };
    return GameManager;
}());
//# sourceMappingURL=GameManager.js.map