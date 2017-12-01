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
    protected image : CustomSprite;
    public indexW : number = 0;
    public indexH : number = 0;
    public moveSpeed : number = 500;
    public stopTimeSpeed : number = 2000;
    public status : PlayerStatus = PlayerStatus.Idle;
    public dirW : number = 0;
    public dirH : number = 0;
    
    public wayPoints : MapNode[] = [];

    constructor(m : GameMap, path : string, indexH : number, indexW : number){
        this.map = m;

        this.indexW = indexW;
        this.indexH = indexH;
        this.image = new CustomSprite(path);
        this.image.zOrder = indexH;
        this.map.AddObject(this.image);
        this.image.pos(m.GetPosW(indexW), m.GetPosH(indexH));

        Laya.timer.frameLoop(1, this, this.Update);
    }

    public Update() : void
    {
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

    public Move(checkPoints : MapNode[]) : void
    {
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

    public GetUpperBound() : number
    {
        return this.image.y;
    }

    public GetLowerBound() : number
    {
        return this.image.y + GameMap.nodeLength;
    }
}