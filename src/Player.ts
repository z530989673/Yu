/*
* name;
*/
class Player extends GameObject {
 
    constructor(m : Map, path : string)
    {
        super(m,path);
    }

    public Move(checkPoints : MapNode[]) : void
    {
        this.wayPoints = checkPoints;
        var checkPoint : MapNode = checkPoints.pop();
        if (this.status != ObjectStatus.Move)
        {
            this.dirW = checkPoint.indexW - this.indexW;
            this.dirH = checkPoint.indexH - this.indexH;
            this.indexH = checkPoint.indexH;
            this.indexW = checkPoint.indexW;
            this.status = ObjectStatus.Move;
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