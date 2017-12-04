/*
* name;
*/
enum PlayerStatus
{
    Idle = 0,
    Move,
}

class Player{
    protected map : GameMap;
    protected image : Sprite;
    protected particle : Particle2D;
    protected holdParticle : Particle2D;
    public indexW : number = 0;
    public indexH : number = 0;
    public moveSpeed : number = 500;
    public stopTimeSpeed : number = 2000;
    public status : PlayerStatus = PlayerStatus.Idle;
    public dirW : number = 0;
    public dirH : number = 0;
    
    public wayPoints : MapNode[] = [];
    private filter : Laya.GlowFilter;

    public saveW : number = 0;
    public saveH : number = 0;
    public isHoldFirefly : boolean = false;
    private frameCount = 0;

    constructor(m : GameMap, path : string, indexH : number, indexW : number){
        this.map = m;
        this.Save(indexW, indexH);
        
        this.filter = new Laya.GlowFilter("#08f7ce",10,-1,-1);
        
        this.indexW = indexW;
        this.indexH = indexH;
        this.image = new Sprite();
        this.image.loadImage("../laya/assets/character/boy_" + path + ".png");
        //this.image.zOrder = indexH;
        this.map.AddObject(this.image);
        this.image.pos(m.GetPosW(indexW), m.GetPosH(indexH));
        //this.image.scale(GameMap.nodeLength / 128,GameMap.nodeLength / 128);
        var point : Point = this.image.localToGlobal(new Point(GameMap.nodeLength / 2,GameMap.nodeLength));
        Yu.CustomShaderValue.pointPos = [point.x,point.y];

        Laya.timer.frameLoop(1, this, this.Update);
        Laya.timer.loop(100,this,this.ChangeBlur);
        Laya.loader.load("../laya/pages/firefly.part", Handler.create(this, this.onHoldParticleLoaded), null, Loader.JSON);
        Laya.loader.load("../laya/pages/timeStop.part", Handler.create(this, this.onParticleLoaded), null, Loader.JSON);
        EventCenter.addEventListener(new GameEvent("holdFirefly", null, this), this.OnHoldFirefly);
        EventCenter.addEventListener(new GameEvent("LightEnableChanged", null, this), this.OnLightEnableChanged);
    }
    
    public Reset()
    {
        Laya.timer.clearAll(this);
    }

    public onHoldParticleLoaded(settings: ParticleSetting) : void
    {
        if (settings.textureName.search("../laya/assets/") == -1)
            settings.textureName = "../laya/assets/" + settings.textureName;
        this.holdParticle = new Particle2D(settings);
        this.holdParticle.stop();
        this.holdParticle.emitter.minEmissionTime = 0.1;
        this.holdParticle.emitter.stop();
        this.holdParticle.zOrder = 100;
        this.map.AddObject(this.holdParticle);
    }

    public onParticleLoaded(settings: ParticleSetting) : void
    {
        if (settings.textureName.search("../laya/assets/") == -1)
            settings.textureName = "../laya/assets/" + settings.textureName;
        this.particle = new Particle2D(settings);
        this.particle.emitter.start();
        this.particle.emitter.minEmissionTime = 0.1;
        this.particle.play();
        Layer.AddObjects(this.particle);
        this.particle.x = Laya.stage.width / 2;
        this.particle.y = Laya.stage.height / 2;
    }

    public ChangeBlur() : void
    {
        this.frameCount++;
        {
            this.filter.blur = this.frameCount % 20;
            if (this.filter.blur > 10)
                this.filter.blur = 20 - this.filter.blur;
            this.image.filters = [this.filter];
        }
    }

    public Update() : void
    {
        if (this.isHoldFirefly)
        {
            this.holdParticle.emitter.start();
            this.holdParticle.play(); 
            this.holdParticle.x = this.image.x + GameMap.nodeLength / 2;
            this.holdParticle.y = this.image.y + GameMap.nodeLength / 2;
        }
        else
        {
            if (this.holdParticle != null)
            {
                this.holdParticle.emitter.stop();
                this.holdParticle.stop(); 
            }
        }
        var point : Point = this.image.localToGlobal(new Point(GameMap.nodeLength / 2,GameMap.nodeLength));
        Yu.CustomShaderValue.pointPos = [point.x,point.y];
        if (this.status == PlayerStatus.Idle)
            return;
        else if (this.status == PlayerStatus.Move)
        {
            var currentPosW : number = this.image.x;
            var currentPosH : number = this.image.y;
            var destPosW : number = this.map.GetPosW(this.indexW);
            var destPosH : number = this.map.GetPosH(this.indexH);
            var valueW : number = destPosW - currentPosW;
            var valueH : number = destPosH - currentPosH;
            currentPosW += Laya.timer.delta / 1000 * this.moveSpeed * this.dirW;
            currentPosH -= Laya.timer.delta / 1000 * this.moveSpeed * this.dirH;
            if (valueW * (destPosW - currentPosW) <= 0 && 
                valueH * (destPosH - currentPosH) <= 0)
                {
                    currentPosH = destPosH;
                    currentPosW = destPosW;
                    this.CheckNextWayPoint();
                }
            this.image.pos(currentPosW, currentPosH);
        }
    }

    public CheckNextWayPoint() : void
    {
        if (this.wayPoints.length == 0)
        {
            this.status = PlayerStatus.Idle;
            Laya.timer.once(500, this, this.TurnLight);
        }
        else
        {
            var n : MapNode = this.wayPoints.pop();
            var pos = [n.indexW, n.indexH, this.map.level];
            EventCenter.dispatchAll(new GameEvent("standPos", pos, this));
        
            if (this.map.IsWalkable(n.indexH,n.indexW))
            {
                this.dirH = n.indexH - this.indexH;
                this.dirW = n.indexW - this.indexW;
                this.ChangeDir();
                this.indexH = n.indexH;
                this.indexW = n.indexW;
            }
            else
                this.status = PlayerStatus.Idle;
        }
    }

    public ChangeDir() : void
    {
        var str = "back";
        if (this.dirW == 0 && this.dirH == -1)
            str = "front";
        else if (this.dirW == 1 && this.dirH == 0)
            str = "right"
        else if (this.dirW == -1 && this.dirH == 0)
            str = "left";
        
        this.image.graphics.clear();
        this.image.loadImage("../laya/assets/character/boy_" + str + ".png");
    }

    public MoveTo(checkPoints : MapNode[]) : void
    {
        Laya.timer.clear(this, this.TurnLight);
        
        this.wayPoints = checkPoints;
        var checkPoint : MapNode = checkPoints.pop();
        if (this.status != PlayerStatus.Move)
        {
            this.dirW = checkPoint.indexW - this.indexW;
            this.dirH = checkPoint.indexH - this.indexH;
            this.indexH = checkPoint.indexH;
            this.indexW = checkPoint.indexW;
            this.status = PlayerStatus.Move;
            this.ChangeDir();
        }
    }

    public Save(w : number, h : number) : void
    {
        this.saveW = w;
        this.saveH = h;
    }

    public Load() : void
    {
   		this.map.RestoreUpdate();
        this.status = PlayerStatus.Idle;

        this.indexW = this.saveW;
        this.indexH = this.saveH;
        //this.image.zOrder = this.indexH;
        this.image.pos(this.map.GetPosW(this.indexW), this.map.GetPosH(this.indexH));
    }

    public GexX() : number
    {
        return this.image.x + GameMap.nodeLength / 2;
    }
    
    public GexY() : number
    {
        return this.image.y + GameMap.nodeLength / 2;
    }

    public GetUpperX() : number
    {
        return this.image.x;
    }

    public GetUpperBound() : number
    {
        return this.image.y;
    }

    public GetLowerBound() : number
    {
        return this.image.y + GameMap.nodeLength;
    }

    public GetRect() : Rectangle
    {
        var x = this.image.x;
        var y = this.image.y;
        return new Rectangle(x, y, this.image.width * GameMap.nodeLength / 128- 1, this.image.height* GameMap.nodeLength / 128 - 1);
    }

    public Intersects (rect : Rectangle) : boolean
    {
        return this.GetRect().intersects(rect);
	}

    private TurnLight(args) : void
    {
        EventCenter.dispatchAll(new GameEvent("TurnLight", this, this));
    }

    private OnHoldFirefly(e:GameEvent) : void
    {
        var inst = e.eventInst;
        inst.isHoldFirefly = true;
        inst.map.RestoreUpdate();
    }

    private OnLightEnableChanged(e:GameEvent) : void
    {
        var inst = e.eventInst;
        inst.isHoldFirefly = false;
    }
}