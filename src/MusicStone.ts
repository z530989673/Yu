class MusicStone extends GameObject
{
	public stoneId:number;
	public switchX:number;
	public switchY:number;

	constructor(m : GameMap, path : string, indexW : number, indexH : number, 
				stoneId:number)
	{
		super(m, path, indexW, indexH, 1, 1, false);
		this.switchX = indexW;
		this.switchY = indexH
		var StandEvent = new GameEvent("standPos", [indexW, indexH], this);
		EventCenter.addEventListener(StandEvent, this.standStone);
		this.stoneId = stoneId;
	}

	standStone(e:GameEvent)
	{
		var Pos = e.eventArgs;
		if (e.eventInst.switchX == Pos[1] && e.eventInst.switchY == Pos[0]) 
		{
			var Event = new GameEvent("touchMusicStone", e.eventInst.stoneId, this);
			EventCenter.dispatchAll(Event);
		}
	}
}