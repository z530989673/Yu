
class GameManager {
	
	public score : number;
	public girlHappiness: number;
	public boyHappiness: number;
	public energy: number;
	public map:GameMap
	public player:Player
	private isSingleBlockStart = false;
	private isMusicStoneStart = false;
	private stoneCurrentID = 1;
	constructor(map : GameMap) {
		this.score = 0;
		this.girlHappiness = 0;
		this.boyHappiness = 0;
		this.energy = 0;
		this.map = map;
		this.player = map.player;
		EventCenter.addEventListener(new GameEvent("standPos", null, this), this.standPos);
		EventCenter.addEventListener(new GameEvent("touchLatern", null, this), this.touchLatern);
		EventCenter.addEventListener(new GameEvent("touchWater", null, this), this.touchWater);
		EventCenter.addEventListener(new GameEvent("touchBall", null, this), this.touchBall);
		EventCenter.addEventListener(new GameEvent("touchMusicStone", null, this), this.musicStoneTouch);
		EventCenter.addEventListener(new GameEvent("playerCollision", null, this), this.playerCollision);
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
		var musicStone1 = new MusicStone(e.eventInst.map, "../laya/assets/placeHolder/Flag.png",19, 3, 1);
		var musicStone2 = new MusicStone(e.eventInst.map, "../laya/assets/placeHolder/Flag.png",21, 7, 2);
		var musicStone3 = new MusicStone(e.eventInst.map, "../laya/assets/placeHolder/Flag.png",21, 0, 3);
		var musicStone4 = new MusicStone(e.eventInst.map, "../laya/assets/placeHolder/Flag.png",23, 0, 4);
		var musicStone5 = new MusicStone(e.eventInst.map, "../laya/assets/placeHolder/Flag.png",26, 7, 5);
		var musicStone6 = new MusicStone(e.eventInst.map, "../laya/assets/placeHolder/Flag.png",27, 3, 6);
		e.eventInst.map.AddGameObject(musicStone1);
		e.eventInst.map.AddGameObject(musicStone2);
		e.eventInst.map.AddGameObject(musicStone3);
		e.eventInst.map.AddGameObject(musicStone4);
		e.eventInst.map.AddGameObject(musicStone5);
		e.eventInst.map.AddGameObject(musicStone6);
		
		var nodes:MapNode[] = 
		[
			// e.eventInst.map.mapNodes[26][3],
			e.eventInst.map.mapNodes[25][3],
			e.eventInst.map.mapNodes[24][3],
			e.eventInst.map.mapNodes[23][3],
			e.eventInst.map.mapNodes[23][4],
			e.eventInst.map.mapNodes[22][4],
			// e.eventInst.map.mapNodes[21][4],
		];
		var nodes2:MapNode[] =
		[
			e.eventInst.map.mapNodes[21][1],
			e.eventInst.map.mapNodes[21][2],
			e.eventInst.map.mapNodes[21][3],
			e.eventInst.map.mapNodes[21][4],
			// e.eventInst.map.mapNodes[21][5],
		];
        var character : Character = new Character(e.eventInst.map, "../laya/assets/placeHolder/Flag.png", 25, 3, false, nodes);
        var character2 : Character = new Character(e.eventInst.map, "../laya/assets/placeHolder/Flag.png", 21, 1, false, nodes2);
        // var character3 : Character = new Character(e.eventInst.map, "../laya/assets/placeHolder/Flag.png", 21, 1, false, nodes3);
        e.eventInst.addCharacter(character);
        e.eventInst.addCharacter(character2);
        // e.eventInst.addCharacter(character3);
	}
	playerCollision(e:GameEvent)
	{
		var player = e.eventArgs[0];
		var character = e.eventArgs[1];
		player.Load();
	}

	standPos(e:GameEvent)
	{
		var PosX = e.eventArgs[0];
		var PosY = e.eventArgs[1];
		if (PosY == 5 && !e.eventInst.isSingleBlockStart)
		{			
			e.eventInst.isSingleBlockStart = true;
			e.eventInst.startSingleBlockLevel(e);
		}
		if (PosY == 15 && !e.eventInst.isMusicStoneStart)
		{
			e.eventInst.map.player.Save(3, 15);
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
        var actress = new Actress(e.eventInst.map, "../laya/assets/placeHolder/Green.png", 30, 4, false, null);
        e.eventInst.map.AddCharacter(actress);
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
		return;
	}

	solveLaternPuzzle()
	{
		return;
	}

	touchLatern(e:Event)
	{
		this.lightLatern();
		this.solveLaternPuzzle();
	}

	touchWater(e:Event)
	{
		// this.damageBoy();
	}

	damageBoy():void 
	{
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
		console.log("musicstone touch");
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
		console.log("music puzzle");
		console.log(e.eventInst.stoneCurrentID);
		var pitch = e.eventArgs;
		if(pitch == e.eventInst.stoneCurrentID)
		{
			console.log("music next");
			console.log(pitch);
			e.eventInst.stoneCurrentID ++;
			if(pitch == 6)
			{
				e.eventInst.finishMusicStoneLevel(e);
			}
		}
		else
		{
			console.log("music last");
			console.log(pitch);
			e.eventInst.stoneCurrentID = 2;
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