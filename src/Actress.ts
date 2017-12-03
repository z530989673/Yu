/*
* name;
*/

class Actress extends Character
{
    private currTargetObject : ObjectLight = null;

    constructor(m : GameMap, path : string, indexH : number, indexW : number, blockable : boolean, rootObject : ObjectLight = null)
    {
        super(m, "", indexH, indexW, blockable, []);

        this.currTargetObject = rootObject;
        if (rootObject != null)
            Laya.timer.once(3000, this, this.FindNextTargetObject);

        this.image = new Sprite();
        
        this.image.loadImage("../laya/assets/character/girl_" + path + ".png");
        this.image.zOrder = indexH;
        this.map.AddObject(this.image);
        this.image.pos(m.GetPosW(indexW), m.GetPosH(indexH));
        //this.image.scale(GameMap.nodeLength / 128,GameMap.nodeLength / 128);

        this.moveSpeed = 200;

        EventCenter.addEventListener(new GameEvent("LightEnableChanged", null, this), this.TargetObjectEnableChange);
    }

    public Update() : void
    {
        if (!this.isActive)
            return;

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
            currentPosW += Laya.timer.delta / 1000 * this.moveSpeed * GameMap.globalSpeed * this.dirW;
            currentPosH -= Laya.timer.delta / 1000 * this.moveSpeed * GameMap.globalSpeed * this.dirH;
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
        if (this.dirLength != 0 && this.blockable)
            this.map.ReSetStatus(this.indexH - this.dirH,this.indexW - this.dirW);
        
        if (this.wayPoints.length == 0)
        {
            this.status = PlayerStatus.Idle;
            if (this.currTargetObject != null)
                Laya.timer.once(3000, this, this.FindNextTargetObject);
        }
        else
        {
            var n : MapNode = this.wayPoints.pop();
            this.nextWayPoints.push(n);
            if (this.map.IsWalkable(n.indexH,n.indexW))
            {
                this.dirH = n.indexH - this.indexH;
                this.dirW = n.indexW - this.indexW;
                this.ChangeDir();
                this.dirLength = Math.sqrt(this.dirH * this.dirH + this.dirW * this.dirW);
                this.indexH = n.indexH;
                this.indexW = n.indexW;
                if (this.blockable)
                    this.map.SetStatus(this.indexH,this.indexW,NodeStatus.Block);
                this.image.zOrder = this.indexH;
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
        this.image.loadImage("../laya/assets/character/girl_" + str + ".png");
    }

    public MoveTo(checkPoints : MapNode[]) : void
    {
        this.wayPoints = checkPoints;
        var checkPoint : MapNode = checkPoints.pop();
        if (this.status != PlayerStatus.Move)
        {
            this.dirW = checkPoint.indexW - this.indexW;
            this.dirH = checkPoint.indexH - this.indexH;
            this.ChangeDir();
            this.indexH = checkPoint.indexH;
            this.indexW = checkPoint.indexW;
            this.status = PlayerStatus.Move;
            if (this.blockable)
                this.map.SetStatus(this.indexH,this.indexW,NodeStatus.Block);
        }
    }

    private FindNextTargetObject() : void
    {
        if (this.currTargetObject == null)
            return;
        var NextTargetObject = this.currTargetObject.GetNextObject();
        if (NextTargetObject != null)
        {
            this.currTargetObject = NextTargetObject;
            this.map.MoveTo(NextTargetObject.indexH, NextTargetObject.indexW, this);
        }
    }

    //被吓到了赶紧跑回去
    private FindPrevTargetObject(e:GameEvent) : void
    {
        var inst = e.eventInst;
        var NextTargetObject = inst.currTargetObject.parent;
        if (NextTargetObject != null)
        {
            inst.currTargetObject = NextTargetObject;
            inst.map.MoveTo(NextTargetObject.indexH, NextTargetObject.indexW, inst);
        }
    }

    private TargetObjectEnableChange(e:GameEvent) : void
    {
        var inst = e.eventInst;
        if (inst.status != PlayerStatus.Move)
            inst.FindNextTargetObject();
    }
}
