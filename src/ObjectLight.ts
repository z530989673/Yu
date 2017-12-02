/*
* name;
*/

class ObjectLight extends GameObject
{
    public parent : ObjectLight = null;
    public children : ObjectLight[] = [];
    public selfIdx : number = 0;
    public enable : boolean = true;

    constructor(m : GameMap, path : string, indexH : number, indexW : number,
                sH : number, sW : number, blockable : boolean){
        super(m, path, indexH, indexW, sH, sW, blockable);

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
        this.image.visible = enable;

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
            inst.SetEnable(!inst.enable);
    }
}