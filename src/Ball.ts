class Ball extends Character
{
	constructor(m : GameMap, path : string, indexH : number, indexW : number, blockable : boolean, checkPoints : MapNode[])
	{
		super(m, path, indexH, indexW, blockable, checkPoints);
		// EventCenter.addEventListener(new GameEvent());
	}
    public Move() : void
    {
        var tmp = this.wayPoints;
        this.wayPoints = this.nextWayPoints;
        this.nextWayPoints = tmp;
        var checkPoint : MapNode = this.wayPoints.pop();
        // this.nextWayPoints.push(checkPoint);
        if (this.status != PlayerStatus.Move)
        {
            this.dirW = checkPoint.indexW - this.indexW;
            this.dirH = checkPoint.indexH - this.indexH;
            this.indexH = checkPoint.indexH;
            this.indexW = checkPoint.indexW;
            this.status = PlayerStatus.Move;
            if (this.blockable)
                this.map.SetStatus(this.indexH,this.indexW,NodeStatus.Block);
        }
    }

    public CheckNextWayPoint() : void
    {
        if (this.dirLength != 0 && this.blockable)
            this.map.ReSetStatus(this.indexH - this.dirH,this.indexW - this.dirW);
        
        if (this.wayPoints.length == 0)
            this.status = PlayerStatus.Idle;
        else
        {
            var n : MapNode = this.wayPoints.pop();
            // this.nextWayPoints.push(n);
            if (this.map.IsWalkable(n.indexH,n.indexW))
            {
                this.dirH = n.indexH - this.indexH;
                this.dirW = n.indexW - this.indexW;
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
    
}