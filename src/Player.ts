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
    public indexW : number = 0;
    public indexH : number = 0;
    public moveSpeed : number = 500;
    public stopTimeSpeed : number = 2000;
    public status : PlayerStatus = PlayerStatus.Idle;
    public dirW : number = 0;
    public dirH : number = 0;
    
    public wayPoints : MapNode[] = [];

    public saveW : number = 0;
    public saveH : number = 0;

    constructor(m : GameMap, path : string, indexH : number, indexW : number){
        this.map = m;
        this.Save(indexW, indexH);

        this.indexW = indexW;
        this.indexH = indexH;
        this.image = new Sprite();
        this.image.loadImage(path);
        this.image.zOrder = indexH;
        this.map.AddObject(this.image);
        this.image.pos(m.GetPosW(indexW), m.GetPosH(indexH));
        var point : Point = this.image.localToGlobal(new Point(GameMap.nodeLength / 2,GameMap.nodeLength));
        Yu.CustomShaderValue.pointPos = [point.x,point.y];

        Laya.timer.frameLoop(1, this, this.Update);
        
        Laya.loader.load("../laya/pages/timeStop.part", Handler.create(this, this.onParticleLoaded), null, Loader.JSON);
    }

    public onParticleLoaded(settings: ParticleSetting) : void
    {
        settings.textureName = "../laya/assets/" + settings.textureName;
        this.particle = new Particle2D(settings);
        this.particle.emitter.start();
        this.particle.emitter.minEmissionTime = 0.1;
        this.particle.play();
        Layer.AddForeGroundFar(this.particle);
        this.particle.x = Laya.stage.width / 2;
        this.particle.y = Laya.stage.height / 2;
    }

    public Update() : void
    {
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
            Laya.timer.once(1000, this, this.TurnLight);
        }
        else
        {
            var n : MapNode = this.wayPoints.pop();
            var pos = [this.indexW, this.indexH];
            EventCenter.dispatchAll(new GameEvent("standPos", pos, this));
        
            if (this.map.IsWalkable(n.indexH,n.indexW))
            {
                this.dirH = n.indexH - this.indexH;
                this.dirW = n.indexW - this.indexW;
                this.indexH = n.indexH;
                this.indexW = n.indexW;
                this.image.zOrder = this.indexH;
            }
            else
                this.status = PlayerStatus.Idle;
        }
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
        this.image.zOrder = this.indexH;
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
        return new Rectangle(x, y, this.image.width, this.image.height);
    }

    public Intersects (rect : Rectangle) : boolean
    {
        return this.GetRect().intersects(rect);
	}

    private TurnLight(args) : void
    {
        EventCenter.dispatchAll(new GameEvent("TurnLight", this, this));
    }
}