/*
* name;
*/
enum PlayerStatus
{
    Idle = 0,
    Move,
    Wait,
}

class Player{

    public map : Map;
    private image : Sprite;
    public indexW : number = 0;
    public indexH : number = 0;
    public moveSpeed : number = 1000;
    public status : PlayerStatus = PlayerStatus.Idle;
    public dirW : number = 0;
    public dirH : number = 0;
    
    public wayPoints : MapNode[] = [];

    constructor(m : Map){
        this.map = m;

        this.image = new Sprite();
        this.image.loadImage("../laya/assets/placeHolder/red.png");
        this.image.zOrder = 100;
        this.map.AddObject(this.image);
        this.image.pivot(m.GetPosW(0), m.GetPosH(0));

        Laya.timer.frameLoop(1, this, this.Update);
    }

    public Update() : void
    {
        if (this.status == PlayerStatus.Idle)
            return;
        else if (this.status == PlayerStatus.Move)
        {
            var currentPosW : number = this.image.pivotX;
            var currentPosH : number = this.image.pivotY;
            var destPosW : number = this.map.GetPosW(this.indexW);
            var destPosH : number = this.map.GetPosH(this.indexH);
            var valueW : number = destPosW - currentPosW;
            var valueH : number = destPosH - currentPosH;
            currentPosW -= Laya.timer.delta / 1000 * this.moveSpeed * this.dirW;
            currentPosH += Laya.timer.delta / 1000 * this.moveSpeed * this.dirH;
            if (valueW * (destPosW - currentPosW) <= 0 && 
                valueH * (destPosH - currentPosH) <= 0)
                {
                    currentPosH = destPosH;
                    currentPosW = destPosW;
                    this.CheckNextWayPoint();
                }
            this.image.pivot(currentPosW, currentPosH);
        }
        else if (this.status == PlayerStatus.Wait)
            this.CheckNextWayPoint();
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
            if (this.map.IsWalkable(n.indexH,n.indexW))
            {
                this.dirH = n.indexH - this.indexH;
                this.dirW = n.indexW - this.indexW;
                this.indexH = n.indexH;
                this.indexW = n.indexW;
            }
            else
                this.status = PlayerStatus.Wait;
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
        return this.image.pivotY;
    }

    public GetLowerBound() : number
    {
        return this.image.pivotY + Map.nodeLength;
    }
}