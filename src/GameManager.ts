
class GameManager {
	
	public score : number;
	public girlHappiness: number;
	public boyHappiness: number;
	public energy: number;
	public map:GameMap

	private static isSingleBlockStart = false;
	private static isMusicStoneStart = false;
	private static stoneCurrentID = 1;
	constructor(map : GameMap) {
		this.score = 0;
		this.girlHappiness = 0;
		this.boyHappiness = 0;
		this.energy = 0;
		this.map = map;

		EventCenter.addEventListener(new GameEvent("standPos", null, this), this.standPos);
		EventCenter.addEventListener(new GameEvent("touchLatern", null, this), this.touchLatern);
		EventCenter.addEventListener(new GameEvent("touchWater", null, this), this.touchWater);
		EventCenter.addEventListener(new GameEvent("touchBall", null, this), this.touchBall);
		EventCenter.addEventListener(new GameEvent("touchMusicStone", null, this), this.musicStoneTouch);

	}

	private startSingleBlockLevel(e:GameEvent) : void
	{
		e.eventInst.map.player
        var nodes : MapNode[] = [
	        e.eventInst.map.mapNodes[13][3],
	        e.eventInst.map.mapNodes[12][3],
	        e.eventInst.map.mapNodes[11][3],
	        e.eventInst.map.mapNodes[10][3],
	        e.eventInst.map.mapNodes[9][3],
	        e.eventInst.map.mapNodes[8][3],
	        e.eventInst.map.mapNodes[7][3],
	        e.eventInst.map.mapNodes[6][3]];
        var character : Character = new Character(e.eventInst.map, "../laya/assets/placeHolder/Flag.png", 13, 3, false, nodes);
		e.eventInst.addCharacter(character);
	}

	private startMusicStoneLevel(e:GameEvent) 
	{
		var musicStone1 = new MusicStone(e.eventInst.map, "../laya/assets/placeHolder/Flag.png",20, 4, 1, 1, 1, 21, 5);
		var musicStone2 = new MusicStone(e.eventInst.map, "../laya/assets/placeHolder/Flag.png",20, 2, 1, 1, 2, 21, 1);
		var musicStone3 = new MusicStone(e.eventInst.map, "../laya/assets/placeHolder/Flag.png",23, 2, 1, 1, 3, 23, 1);
		var musicStone4 = new MusicStone(e.eventInst.map, "../laya/assets/placeHolder/Flag.png",23, 4, 1, 1, 4, 23, 5);
		e.eventInst.map.AddGameObject(musicStone1);
		e.eventInst.map.AddGameObject(musicStone2);
		e.eventInst.map.AddGameObject(musicStone3);
		e.eventInst.map.AddGameObject(musicStone4);
	}
	standPos(e:GameEvent)
	{
		console.log(e.eventArgs);
		var PosX = e.eventArgs[0];
		var PosY = e.eventArgs[1];
		if (PosY == 5 && !e.eventInst.isSingleBlockStart)
		{
			e.eventInst.isSingleBlockStart = true;
			console.log(this);
			e.eventInst.startSingleBlockLevel(e);
		}
		if (PosY == 15 && !e.eventInst.isMusicStoneStart)
		{
			e.eventInst.isMusicStoneStart = true;
			e.eventInst.startMusicStoneLevel(e);
		} 
		if (PosY == 50)
		{
			this.startBallLevel();
		}
		// if (PosY == 100)
		// {
		// 	this.startLaternLevel();
		// }
		if (PosY == 150)
		{
			this.startBridgeLevel();
		}
		if (PosY == 200)
		{
			this.startBoreLevel();
		}
		if (PosY == 250)
		{
			this.startCloseLevel();
		}
	}
	wakeupGirl(e:GameEvent)
	{
		e.eventInst.map.wakeupGirl();
	}
	finishSingleBlockLevel()
	{
		// removeCharactor();
	}
	finishMusicStoneLevel(e:GameEvent)
	{
		e.eventInst.wakeupGirl(e);
	}
	startBallLevel()
	{

	}
	finishBallLevel()
	{

	}
	startLaternLevel()
	{

	}
	finishLaternLevel()
	{

	}
	startBridgeLevel()
	{

	}
	finishBridgeLevel()
	{

	}
	startBoreLevel()
	{

	}
	finishBoreLevel()
	{

	}
	startCloseLevel()
	{

	}
	finishCloseLevel()
	{

	}
	lightLatern()
	{
		console.log("lightLatern");
		return;
	}

	solveLaternPuzzle()
	{
		console.log("solveLaternPuzzle");
		return;
	}

	touchLatern(e:Event)
	{
		this.lightLatern();
		this.solveLaternPuzzle();
	}

	touchWater(e:Event)
	{
		console.log("touch water");
		// this.damageBoy();
	}

	damageBoy():void 
	{
		console.log("damage boy");
		return;
	}

	touchBall(e:Event)
	{
		
	}

	ballTouchEndPoint(e:Event)
	{
		this.solveBallPuzzle();
	}

	girlTouchGrid(e:Event)
	{
		this.dropDownRoad();
	}

	dropDownRoad()
	{

	}

	solveBallPuzzle()
	{

	}

	musicStoneTouch(e:GameEvent)
	{
		var pitch = e.eventArgs;
		e.eventInst.sendSound(pitch);
		e.eventInst.solveMusicPuzzle(e);
	}
	
	sendSound(pitch:number) 
	{
		return;
	}
	
	solveMusicPuzzle(e:GameEvent)
	{
		var pitch = e.eventArgs;
		if(pitch == e.eventInst.stoneCurrentID)
		{
			e.eventInst.stoneCurrentID ++;
			if(pitch == 4)
			{
				e.eventInst.finishMusicStoneLevel(e);
			}
		}
		else 
		{
			e.eventInst.stoneCurrentID = 1;
		}
	}
	solveDogPuzzle()
	{
		return;
	}
	addCharacter(character:any)
	{
		// this.map.AddCharacter("../laya/assets/placeHolder/Green.png", 8, 3, true, [this.map.mapNodes[8][3], this.map.mapNodes[8][4]]);
		this.map.AddCharacter(character);

	}
}