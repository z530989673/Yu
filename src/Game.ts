// 程序入口
import Sprite = Laya.Sprite;
import Button = Laya.Button;
import Stage = Laya.Stage;
import Texture = Laya.Texture;
import Browser = Laya.Browser;
import Handler = Laya.Handler;
import WebGL = Laya.WebGL;
import CustomSprite = Yu.CustomSprite;
import Loader = Laya.Loader;
import HTMLCanvas = Laya.HTMLCanvas;
import Point = Laya.Point;
import Rectangle = Laya.Rectangle;
import Particle2D = Laya.Particle2D;
import ParticleSetting = Laya.ParticleSetting;

class GameMain{

    public map : GameMap;
    public gm : GameManager;
    public cm : CollisionManager;
    public uiMgr : UIManager;

    constructor()
    {
        Laya.init(1080, 1920, WebGL);

        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;
		Laya.stage.scaleMode = Stage.SCALE_NOSCALE;
        Laya.stage.frameRate = "fast";

        Laya.stage.scaleMode = "showall";
        Laya.stage.bgColor = "#232628";
        

        this.map = new GameMap();
        this.uiMgr = new UIManager(this);
        this.gm = new GameManager(this.map);
        this.cm = new CollisionManager(this.map);
        // this.map.LoadLevel1();
        this.map.LoadLevel2();

        Laya.Stat.show(0,0);

        Laya.timer.frameLoop(1, this, this.Update);

        //Laya.loader.load("../laya/assets/comp/image.png", Handler.create(this, this.loadComplete), null, Loader.IMAGE);
    }

    private Update() : void
    {
        CustomSprite.AddTime();
    }
}
new GameMain();