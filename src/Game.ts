// 程序入口
import Sprite = Laya.Sprite;
import Button = Laya.Button;
import Stage = Laya.Stage;
import Texture = Laya.Texture;
import Browser = Laya.Browser;
import Handler = Laya.Handler;
import WebGL = Laya.WebGL;
import myShaderSprite = myModule.myShaderSprite;
import Loader = Laya.Loader;
import HTMLCanvas = Laya.HTMLCanvas;

class GameMain{

    public map : GameMap;
    public uiMgr : UIManager;
    public sp : myShaderSprite;

    constructor()
    {
        Laya.init(1080, 1920, WebGL);

        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;
		Laya.stage.scaleMode = Stage.SCALE_NOSCALE;
        Laya.stage.frameRate = "fast";

        Laya.stage.scaleMode = "showall";
        Laya.stage.bgColor = "#232628";
        
        this.uiMgr = new UIManager(this);

        this.map = new GameMap();
        this.map.LoadLevel1();

        //this.sp = new myShaderSprite();
        //var tex : HTMLCanvas = Layer.GetInstance().map.drawToCanvas(Laya.stage.width,Laya.stage.height,0,0);
        //var texture : Texture = new Texture(tex);
        //this.sp.init(texture);
        //Layer.AddForeGroundNear(this.sp);

        Laya.Stat.show(0,0);

        //Laya.timer.frameLoop(1, this, this.Update);

        //Laya.loader.load("../laya/assets/map/level1.png", Handler.create(this, this.loadComplete), null, Loader.IMAGE);
    }

    private Update() : void
    {
         var tex : HTMLCanvas = Layer.GetInstance().map.drawToCanvas(Laya.stage.width,Laya.stage.height,0,0);
         var texture : Texture = new Texture(tex);
         this.sp.refreshTexture(texture);
         this.sp.customRenderEnable = !this.sp.customRenderEnable ;
    }

    private loadComplete():void
    {
        var texture:Texture = Loader.getRes("../laya/assets/map/level1.png");
        this.sp = new myShaderSprite();
        this.sp.texture = texture;
        //this.sp.init(texture);
        Layer.AddForeGroundNear(this.sp);
    }
}
new GameMain();