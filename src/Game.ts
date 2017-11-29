// 程序入口
import Sprite = Laya.Sprite;
import Button = Laya.Button;
import Stage = Laya.Stage;
import Texture = Laya.Texture;
import Browser = Laya.Browser;
import Handler = Laya.Handler;
import WebGL = Laya.WebGL;

class GameMain{

    public map : GameMap;
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
        
        this.uiMgr = new UIManager(this);
        
        this.map = new GameMap();
        this.map.LoadLevel1();

        Laya.Stat.show(0,0);
    }
}
new GameMain();