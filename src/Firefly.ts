/*
* name;
*/

class Firefly extends Character
{
    public isNeedReborn = true;
    constructor(m : GameMap, path : string, indexH : number, indexW : number, blockable : boolean, checkPoints : MapNode[]){
        super(m, path, indexH, indexW, blockable, checkPoints);
        this.type = CharacterType.FIREFLY;
        EventCenter.addEventListener(new GameEvent("holdFirefly", null, this), this.OnHoldFirefly);
    }

    private OnActive()
    {
        if(this.isNeedReborn)
        {
            this.image.visible = true;
            this.enableCollision = true;
        }

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
