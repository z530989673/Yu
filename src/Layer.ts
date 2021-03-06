/*
* name;
*/

class Layer{
    constructor(){
        this.background = new Sprite();
        this.background.zOrder = 0;
        this.background.pos(0,0);
        this.map = new Sprite();
        this.map.zOrder = 1;
        this.map.pos(0,0);
        this.objects = new Sprite();
        this.objects.zOrder = 2;
        this.objects.pos(0,0);
        this.foregroundFar = new Sprite();
        this.foregroundFar.zOrder = 3;
        this.foregroundFar.pos(0,0);
        this.foregroundMid = new Sprite();
        this.foregroundMid.zOrder = 4;
        this.foregroundMid.pos(0,0);
        this.foregroundNear = new Sprite();
        this.foregroundNear.zOrder = 5;
        this.foregroundNear.pos(0,0);
        this.ui = new Sprite();
        this.ui.zOrder = 5;
        this.ui.pos(0,0);

        Laya.stage.addChild(this.background);
        Laya.stage.addChild(this.map);
        Laya.stage.addChild(this.objects);
        Laya.stage.addChild(this.foregroundFar);
        Laya.stage.addChild(this.foregroundMid);
        Laya.stage.addChild(this.foregroundNear);
        Laya.stage.addChild(this.ui);
    }

    private static m_instance : Layer;

    public static GetInstance() : Layer
    {
        if (Layer.m_instance == null)
            Layer.m_instance = new Layer()

        return Layer.m_instance;
    }

    public background : Sprite;
    public map : Sprite;
    public objects : Sprite;
    public foregroundFar : Sprite;
    public foregroundMid : Sprite;
    public foregroundNear : Sprite;
    public ui : Sprite;

    public static AddBackground( s : Sprite) : void
    {
        Layer.GetInstance().background.addChild(s);
    }

    public static AddMap( s : Sprite) : void
    {
        Layer.GetInstance().map.addChild(s);
    }
    
    public static AddObjects( s : Sprite) : void
    {
        Layer.GetInstance().objects.addChild(s);
    }

    public static AddForeGroundFar( s : Sprite) : void
    {
        Layer.GetInstance().foregroundFar.addChild(s);
    }

    public static AddForeGroundMid( s : Sprite) : void
    {
        Layer.GetInstance().foregroundMid.addChild(s);
    }

    public static AddForeGroundNear( s : Sprite) : void
    {
        Layer.GetInstance().foregroundNear.addChild(s);
    }

    public static AddUI(s : Sprite) : void
    {
        Layer.GetInstance().ui.addChild(s);
    }

    public static ResetLayer() : void
    {
        Layer.GetInstance().background.removeChildren();
        Layer.GetInstance().map.removeChildren();
        Layer.GetInstance().objects.removeChildren();
        Layer.GetInstance().foregroundFar.removeChildren();
        Layer.GetInstance().foregroundMid.removeChildren();
        Layer.GetInstance().foregroundNear.removeChildren();
        Layer.GetInstance().foregroundFar.pos(0,0);
        Layer.GetInstance().foregroundMid.pos(0,0);
        Layer.GetInstance().foregroundNear.pos(0,0);
    }
}