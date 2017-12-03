/*
* name;
*/

class Firefly extends Character
{
    constructor(m : GameMap, path : string, indexH : number, indexW : number, blockable : boolean, checkPoints : MapNode[]){
        super(m, path, indexH, indexW, blockable, checkPoints);
        this.type = CharacterType.FIREFLY;
        this.nextWayPoints = this.nextWayPoints.reverse();
        this.image.pivot(-35,-35);
        EventCenter.addEventListener(new GameEvent("holdFirefly", null, this), this.OnHoldFirefly);
    }
    public Move() : void
    {
        var tmp = this.wayPoints;
        this.wayPoints = this.nextWayPoints.reverse();
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
            if (this.blockable)
                this.map.SetStatus(this.indexH,this.indexW,NodeStatus.Block);
        }
    }

    private OnActive()
    {
        this.image.visible = true;
        this.enableCollision = true;
    }

    private OnHoldFirefly(e:GameEvent) : void
    {
        var f = e.eventArgs;
        var inst = e.eventInst;
        if (f == inst)
        {
            inst.image.visible = false;
            inst.enableCollision = false;
            Laya.timer.once(5000, inst, inst.OnActive);
        }
    }
}
