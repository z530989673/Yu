class Block extends Character
{
	public laternId:string;
	public switchX:number;
	public switchY:number;

	constructor(m : GameMap, path : string, indexW : number, indexH : number, 
				checkPoints : MapNode[], laternId:string, switchX:number, switchY:number)
	{
		super(m, path, indexW, indexH, false, checkPoints);
		this.switchX = switchX;
		this.switchY = switchY
		var StandEvent = new GameEvent("standPos", [indexW, indexH],this);
		EventCenter.addEventListener(StandEvent, this.standStone);
		this.laternId = laternId;
	}

	standStone(e:GameEvent)
	{
		var Pos = e.eventArgs;
		if (this.switchX == Pos[1] && this.switchY == Pos[0]) 
		{
			var Event = new GameEvent("standMusicStone", this.laternId, this);
			EventCenter.dispatchAll(Event);
		}	
	}
}