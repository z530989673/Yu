/*
* name;
*/

class ObjectLight extends GameObject
{
    public parent : ObjectLight = null;
    public children : ObjectLight[] = [];
    public selfIdx : number = 0;
    public enable : boolean = true;

    private onTexPath : string = "../laya/assets/item/icon_lantern.png";
    private offTexPath : string = "../laya/assets/item/shadow.png";

    constructor(m : GameMap, indexH : number, indexW : number,
                sH : number, sW : number, blockable : boolean, enable : boolean = true){
        super(m, "../laya/assets/item/icon_lantern.png", indexH, indexW, sH, sW, blockable);

        if (!enable)
            this.SetEnable(false)
		EventCenter.addEventListener(new GameEvent("TurnLight", null, this), this.CheckTurnLight);
    }

    public AddChild(light : ObjectLight) : void
    {
        light.selfIdx = this.children.length;
        this.children.push(light);
        light.parent = this;
    }

    public AddParent(light : ObjectLight) : void
    {
        light.AddChild(this);
    }

    public IsChild(light : ObjectLight) : boolean
    {
        return this.children[light.selfIdx] == light;
    }

    public GetNextObject() : ObjectLight
    {
        for (var i = 0; i < this.children.length; ++i)
        {
            var child = this.children[i];
            if (child.enable)
                return child;
        }
    }

    public SetEnable(enable : boolean) : void
    {
        this.enable = enable;

        var path = enable?this.onTexPath:this.offTexPath;
        this.image.graphics.clear();
        this.image.loadImage(path);

        EventCenter.dispatchAll(new GameEvent("LightEnableChanged", [this, enable], this));
    }

    public GetEnable(enable : boolean) : boolean
    {
        return this.enable;
    }

    public IntersectsXY(PosX : number, PosY : number) : boolean
    {
        for(var i = 0; i < this.sizeW; ++i)
        {
            if (this.indexW + i == PosX)
            {
                for(var j = 0; j < this.sizeH; ++j)
                {
                    if (this.indexH + j == PosY)
                        return true;
                }
            }
        }
        
        return false;
    }

    private CheckTurnLight(e:GameEvent) : void
    {
		var player = e.eventArgs;
        var inst = e.eventInst;
        if (inst.Intersects(player.GetRect()))
        {
            if (inst.enable)
                inst.SetEnable(false);
            else if(player.isHoldFirefly)
                inst.SetEnable(true);
        }
    }
}