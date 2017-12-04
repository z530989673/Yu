class Latern extends GameObject
{
	public laternId:string;
	public switchX:number;
	public switchY:number;

	constructor(m : GameMap, path : string, indexW : number, indexH : number, 
				sW:number, sH:number, laternId:string, switchX:number, switchY:number)
	{
		super(m, path, indexW, indexH, sW, sH, false);
		this.switchX = switchX;
		this.switchY = switchY
		var StandEvent = new GameEvent("standPos", [indexW, indexH], this);
		EventCenter.addEventListener(StandEvent, this.standLatern);
		this.laternId = laternId;
	}

	standLatern(e:GameEvent)
	{
		var Pos = e.eventArgs;
		if (this.switchX == Pos[0] && this.switchY == Pos[1]) 
		{
			var Event = new GameEvent("standMusicStone", this.laternId, this);
			EventCenter.dispatchAll(Event);
		}	
	}
}