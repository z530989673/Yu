class MusicStone extends GameObject
{
	public stoneId:string;
	public switchX:number;
	public switchY:number;

	constructor(m : GameMap, path : string, indexW : number, indexH : number, 
				sW:number, sH:number, stoneId:string, switchX:number, switchY:number)
	{
		super(m, path, indexW, indexH, sW, sH, false);
		this.switchX = switchX;
		this.switchY = switchY
		var StandEvent = new GameEvent("standPos", [indexW, indexH],this);
		EventCenter.addEventListener(StandEvent, this.standStone);
		this.stoneId = stoneId;
	}

	standStone(e:GameEvent)
	{
		var Pos = e.eventArgs;
		if (this.switchX == Pos[0] && this.switchY == Pos[1]) 
		{
			var Event = new GameEvent("standMusicStone", this.stoneId, this);
			EventCenter.dispatchAll(Event);
		}	
	}
}