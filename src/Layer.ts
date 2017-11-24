/*
* name;
*/

class Layer{
    constructor(){
        this.background = new Sprite();
        this.map = new Sprite();
        this.objects = new Sprite();
        this.foregroundFar = new Sprite();
        this.foregroundNear = new Sprite();

        Laya.stage.addChild(this.background);
        Laya.stage.addChild(this.map);
        Laya.stage.addChild(this.objects);
        Laya.stage.addChild(this.foregroundFar);
        Laya.stage.addChild(this.foregroundNear);
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
    public foregroundNear : Sprite;

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

    public static AddForeGroundNear( s : Sprite) : void
    {
        Layer.GetInstance().foregroundNear.addChild(s);
    }
}