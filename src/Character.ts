/*
* name;
*/
class Character{
    protected map :GameMap;
    protected image : Sprite;
    public indexW : number = 0;
    public indexH : number = 0;
    public moveSpeed : number = 1000;
    public waitTime : number = 0.4;
    public status : PlayerStatus = PlayerStatus.Idle;
    public dirW : number = 0;
    public dirH : number = 0;
    public dirLength : number = 0;
    public blockable : boolean = false;
    public isActive = true;
    
    public wayPoints : MapNode[];
    public nextWayPoints : MapNode[];

    public wayPoints1 : MapNode[] = [];
    public wayPoints2 : MapNode[] = [];

    constructor(m : GameMap, path : string, indexH : number, indexW : number, blockable : boolean, checkPoints : MapNode[]){
        this.map = m;

        this.indexW = indexW;
        this.indexH = indexH;
        this.map.SetStatus(this.indexH,this.indexW,NodeStatus.Block);
        this.image = new Sprite();
        this.image.loadImage(path);
        this.image.zOrder = indexH;
        this.map.AddObject(this.image);
        this.image.pos(m.GetPosW(indexW), m.GetPosH(indexH));
        this.blockable = blockable;

        this.wayPoints = this.wayPoints1;
        this.nextWayPoints = this.wayPoints2;
        this.nextWayPoints = checkPoints.reverse();

        Laya.timer.frameLoop(1, this, this.Update);
    }

    public SetActive(active : boolean) : void
    {
        this.isActive = active;
    }

    public Update() : void
    {
        if (!this.isActive)
            return;
        if (this.status == PlayerStatus.Idle)
        {
            if (this.nextWayPoints.length != 0)
                this.Move();
        }
        else if (this.status == PlayerStatus.Move)
        {
            var currentPosW : number = this.image.x;
            var currentPosH : number = this.image.y;
            var destPosW : number = this.map.GetPosW(this.indexW);
            var destPosH : number = this.map.GetPosH(this.indexH);
            var valueW : number = destPosW - currentPosW;
            var valueH : number = destPosH - currentPosH;
            if (this.dirLength != 0)
            {
                currentPosW += Laya.timer.delta / 1000 * this.moveSpeed * this.dirW / this.dirLength;
                currentPosH -= Laya.timer.delta / 1000 * this.moveSpeed * this.dirH / this.dirLength;
            }
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
        if (this.dirLength != 0)
            this.map.ReSetStatus(this.indexH - this.dirH,this.indexW - this.dirW);
        
        if (this.wayPoints.length == 0)
            this.status = PlayerStatus.Idle;
        else
        {
            var n : MapNode = this.wayPoints.pop();
            this.nextWayPoints.push(n);
            if (this.map.IsWalkable(n.indexH,n.indexW))
            {
                this.dirH = n.indexH - this.indexH;
                this.dirW = n.indexW - this.indexW;
                this.dirLength = Math.sqrt(this.dirH * this.dirH + this.dirW * this.dirW);
                this.indexH = n.indexH;
                this.indexW = n.indexW;
                this.map.SetStatus(this.indexH,this.indexW,NodeStatus.Block);
                this.image.zOrder = this.indexH;
            }
            else
                this.status = PlayerStatus.Idle;
        }
    }

    public Move() : void
    {
        var tmp = this.wayPoints;
        this.wayPoints = this.nextWayPoints;
        this.nextWayPoints = tmp;
        var checkPoint : MapNode = this.wayPoints.pop();
        this.nextWayPoints.push(checkPoint);
        if (this.status != PlayerStatus.Move)
        {
            this.dirW = checkPoint.indexW - this.indexW;
            this.dirH = checkPoint.indexH - this.indexH;
            this.indexH = checkPoint.indexH;
            this.indexW = checkPoint.indexW;
            this.status = PlayerStatus.Move;
            this.map.SetStatus(this.indexH,this.indexW,NodeStatus.Block);
        }
    }
}