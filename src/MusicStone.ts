class MusicStone extends GameObject
{
	public stoneId:number;
	public switchX:number;
	public switchY:number;

	constructor(m : GameMap, path : string, indexW : number, indexH : number, 
				sW:number, sH:number, stoneId:number, switchX:number, switchY:number)
	{
		super(m, path, indexW, indexH, sW, sH, true);
		this.switchX = switchX;
		this.switchY = switchY
		var StandEvent = new GameEvent("standPos", [indexW, indexH], this);
		EventCenter.addEventListener(StandEvent, this.standStone);
		this.stoneId = stoneId;
	}

	standStone(e:GameEvent)
	{
		console.log("stand stone");
		console.log(e.eventArgs);
		var Pos = e.eventArgs;
		if (e.eventInst.switchX == Pos[0] && e.eventInst.switchY == Pos[1]) 
		{
			var Event = new GameEvent("touchMusicStone", this.stoneId, this);
			EventCenter.dispatchAll(Event);
		}
	}
}