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
import SoundManager = Laya.SoundManager;
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

        Laya.Stat.show(0,0);


        Laya.loader.load(["../laya/assets/item/shadow.png",
                          "../laya/assets/placeHolder/mask.png"], Handler.create(this, this.loadComplete), null, Loader.IMAGE);
    }

    private Update() : void
    {
        CustomSprite.AddTime();
    }

    private loadComplete() : void
    {
        this.map = new GameMap();
        this.uiMgr = new UIManager(this);
        this.gm = new GameManager(this);
        this.cm = new CollisionManager(this.map);
        // this.map.LoadLevel1();
        //this.map.LoadLevel2();
        // this.map.LoadLevel1();
        this.map.LoadLevel1();
        Laya.timer.frameLoop(1, this, this.Update);
    }

    public ResetLevel(i : number)
    {
        this.map.ResetLevel();
        this.cm = new CollisionManager(this.map);
        if (i == 2)
            this.map.LoadLevel2();
        else if (i == 3)
            this.map.LoadLevel3();
        
    }
}
new GameMain();