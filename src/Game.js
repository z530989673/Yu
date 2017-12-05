// 程序入口
var Sprite = Laya.Sprite;
var Button = Laya.Button;
var Stage = Laya.Stage;
var Texture = Laya.Texture;
var Browser = Laya.Browser;
var Handler = Laya.Handler;
var WebGL = Laya.WebGL;
var CustomSprite = Yu.CustomSprite;
var Loader = Laya.Loader;
var HTMLCanvas = Laya.HTMLCanvas;
var Point = Laya.Point;
var Rectangle = Laya.Rectangle;
var Particle2D = Laya.Particle2D;
var ParticleSetting = Laya.ParticleSetting;
var SoundManager = Laya.SoundManager;
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(1080, 1920, WebGL);
        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;
        Laya.stage.scaleMode = Stage.SCALE_NOSCALE;
        Laya.stage.frameRate = "fast";
        Laya.stage.scaleMode = "showall";
        Laya.stage.bgColor = "#232628";
        Laya.Stat.show(0, 0);
        Laya.loader.load(["../laya/assets/item/shadow.png",
            "../laya/assets/placeHolder/mask.png"], Handler.create(this, this.loadComplete), null, Loader.IMAGE);
    }
    GameMain.prototype.Update = function () {
        CustomSprite.AddTime();
    };
    GameMain.prototype.loadComplete = function () {
        this.map = new GameMap();
        this.uiMgr = new UIManager(this);
        this.gm = new GameManager(this);
        this.cm = new CollisionManager(this.map);
        // this.map.LoadLevel1();
        //this.map.LoadLevel2();
        // this.map.LoadLevel1();
        this.map.LoadLevel1();
        Laya.timer.frameLoop(1, this, this.Update);
    };
    GameMain.prototype.ResetLevel = function (i) {
        this.map.ResetLevel();
        this.cm = new CollisionManager(this.map);
        if (i == 2)
            this.map.LoadLevel2();
        else if (i == 3)
            this.map.LoadLevel3();
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=Game.js.map