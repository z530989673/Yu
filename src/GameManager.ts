

class GameManager {
	
	public score : number;
	public girlHappiness: number;
	public boyHappiness: number;
	public energy: number;
	public map:GameMap;
	public player:Player;
	public game : GameMain;
	private isSingleBlockStart = false;
	private isMusicStoneStart = false;
	private stoneCurrentID = 1;

	private musicStone1:MusicStone;
	private musicStone2:MusicStone;
	private musicStone3:MusicStone;
	private musicStone4:MusicStone;
	private musicStone5:MusicStone;
	private musicStone6:MusicStone;
	constructor(game : GameMain) {
		this.score = 0;
		this.girlHappiness = 0;
		this.boyHappiness = 0;
		this.energy = 0;
		this.map = game.map;
		this.game = game;
		this.player = game.map.player;
		EventCenter.addEventListener(new GameEvent("standPos", null, this), GameManager.standPos);
		EventCenter.addEventListener(new GameEvent("touchLatern", null, this), this.touchLatern);
		EventCenter.addEventListener(new GameEvent("touchWater", null, this), this.touchWater);
		EventCenter.addEventListener(new GameEvent("touchBall", null, this), this.touchBall);
		EventCenter.addEventListener(new GameEvent("touchMusicStone", null, this), this.musicStoneTouch);
		EventCenter.addEventListener(new GameEvent("playerCollision", null, this), this.playerCollision);
		EventCenter.addEventListener(new GameEvent("ballSwitchTouch", null, this), this.ballSwitchTouch);
 	}

	private startSingleBlockLevel(e:GameEvent) : void
	{
        var nodes : MapNode[] = [
	        e.eventInst.map.mapNodes[12][3],
	        e.eventInst.map.mapNodes[18][3]];
        var character : Character = new Character(e.eventInst.map, "../laya/assets/item/icon_wildfire.png", 12, 3, false, nodes);
		e.eventInst.addCharacter(character);

		// e.eventInst.map.AddCharacter(ball);
		// e.eventInst.map.MoveTo(20, 5, ball);
		// ball.MoveTo(nodes1);
		// e.eventArgs.map = nodes1;
        var nodes2 : MapNode[] = [
	        e.eventInst.map.mapNodes[11][4],
	        e.eventInst.map.mapNodes[17][4]];
        var character2 : Character = new Character(e.eventInst.map, "../laya/assets/item/icon_wildfire.png", 11, 4, false, nodes2);
		e.eventInst.addCharacter(character2);

		// var nodes1 : MapNode[] = [
	    //     e.eventInst.map.mapNodes[5][5],
	    //     e.eventInst.map.mapNodes[5][4],
	    //     e.eventInst.map.mapNodes[5][3],
	    //     e.eventInst.map.mapNodes[5][2],
	    //     e.eventInst.map.mapNodes[5][1],
	    //     e.eventInst.map.mapNodes[5][0]
	    //    	];
		// e.eventInst.map.AddCharacter(new Ball(e.eventInst.map, "../laya/assets/item/icon_wildfire.png", 5, 5, false, nodes1));

	}

	private startMusicStoneLevel(e:GameEvent) 
	{
		e.eventInst.musicStone1 = new MusicStone(e.eventInst.map, "../laya/assets/level1/note02.png",22, 4, 1);
		e.eventInst.musicStone2 = new MusicStone(e.eventInst.map, "../laya/assets/level1/note03.png",23, 2, 2);
		e.eventInst.musicStone3 = new MusicStone(e.eventInst.map, "../laya/assets/level1/note01.png",25, 3, 3);
		e.eventInst.musicStone4 = new MusicStone(e.eventInst.map, "../laya/assets/level1/note04.png",26, 6, 4);
		e.eventInst.musicStone5 = new MusicStone(e.eventInst.map, "../laya/assets/level1/note05.png",29, 5, 5);
		e.eventInst.musicStone6 = new MusicStone(e.eventInst.map, "../laya/assets/level1/note06.png",29, 3, 6);
		
		// e.eventInst.musicStone1.image.visible = false;
		e.eventInst.musicStone2.image.visible = false;
		e.eventInst.musicStone3.image.visible = false;
		e.eventInst.musicStone4.image.visible = false;
		e.eventInst.musicStone5.image.visible = false;
		e.eventInst.musicStone6.image.visible = false;

		e.eventInst.map.AddGameObject(e.eventInst.musicStone1);
		e.eventInst.map.AddGameObject(e.eventInst.musicStone2);
		e.eventInst.map.AddGameObject(e.eventInst.musicStone3);
		e.eventInst.map.AddGameObject(e.eventInst.musicStone4);
		e.eventInst.map.AddGameObject(e.eventInst.musicStone5);
		e.eventInst.map.AddGameObject(e.eventInst.musicStone6);
		
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
		var nodes3:MapNode[] =
		[
			e.eventInst.map.mapNodes[30][2],
			e.eventInst.map.mapNodes[30][3],
			e.eventInst.map.mapNodes[30][4],
			e.eventInst.map.mapNodes[29][4],
			e.eventInst.map.mapNodes[28][4],
			e.eventInst.map.mapNodes[28][3],
			e.eventInst.map.mapNodes[28][2],
			e.eventInst.map.mapNodes[29][2],
			e.eventInst.map.mapNodes[30][2],
			// e.eventInst.map.mapNodes[21][5],
		];
		var nodes4:MapNode[] =
		[
			e.eventInst.map.mapNodes[28][4],
			e.eventInst.map.mapNodes[28][3],
			e.eventInst.map.mapNodes[28][2],
			e.eventInst.map.mapNodes[29][2],
			e.eventInst.map.mapNodes[30][2],
			e.eventInst.map.mapNodes[30][3],
			e.eventInst.map.mapNodes[30][4],
			e.eventInst.map.mapNodes[29][4],
			e.eventInst.map.mapNodes[28][4],
			// e.eventInst.map.mapNodes[21][5],
		];

        var character : Character = new Character(e.eventInst.map, "../laya/assets/item/icon_wildfire.png", 25, 3, false, nodes);
        var character2 : Character = new Character(e.eventInst.map, "../laya/assets/item/icon_wildfire.png", 21, 1, false, nodes2);
        var character3 : Character = new Character(e.eventInst.map, "../laya/assets/item/icon_wildfire.png", 30, 2, false, nodes3);
        var character4 : Character = new Character(e.eventInst.map, "../laya/assets/item/icon_wildfire.png", 28, 4, false, nodes4);
        // var character5 : Character = new Character(e.eventInst.map, "../laya/assets/item/icon_wildfire.png", 28, 4, false, []);
        // var character3 : Character = new Character(e.eventInst.map, "../laya/assets/placeHolder/Flag.png", 21, 1, false, nodes3);
        e.eventInst.addCharacter(character);
        e.eventInst.addCharacter(character2);
        e.eventInst.addCharacter(character3);
        e.eventInst.addCharacter(character4);
        // e.eventInst.addCharacter(character3);
	}
	playerCollision(e:GameEvent)
	{
		var player = e.eventArgs[0];
		var character = e.eventArgs[1];
		// player.Load();

		// if(character.ClassName == "Character")
		// {
		// 	player.Load();
		// }
		// else if (character.ClassName == "Ball")
		// {
		// 	var ball:Ball = character;
		// 	var X = ball.indexW;
		// 	var Y = ball.indexH;
		// }

		if (character.type == CharacterType.FIREFLY && e.eventInst.map.IsPaused())
		{
        	EventCenter.dispatchAll(new GameEvent("holdFirefly", character, this));
			return;
		}
		else if (character.type != CharacterType.FIREFLY)
		{
			player.Load();
		}

		if(character.type == CharacterType.ACTRESS)
		{
			character.FindPrevTargetObject();
		}
	}

	public static standPos(e:GameEvent)
	{
		var PosX = e.eventArgs[0];
		var PosY = e.eventArgs[1];
		var level = e.eventArgs[2];

		if (level == 1)
		{
			if (PosY == 8 && !e.eventInst.isSingleBlockStart)
			{			
				e.eventInst.isSingleBlockStart = true;
				e.eventInst.map.player.Save(3,8);
				e.eventInst.startSingleBlockLevel(e);
				e.eventInst.startMusicStoneLevel(e);
			}
			if (PosY == 19 && !e.eventInst.isMusicStoneStart)
			{
				e.eventInst.map.player.Save(2, 19);
				e.eventInst.isMusicStoneStart = true;
				e.eventInst.map.RestoreUpdate();
				// e.eventInst.startMusicStoneLevel(e);
			}
			if (PosY == 32 && e.eventInst.map.level == 1)
			{
				// EventCenter.removeEventListener(new GameEvent("standPos", null, this),GameManager.standPos);
				e.eventInst.game.ResetLevel(2);
			}
		}
		if (level == 3)
		{
			var gPosY = e.eventInst.map.actress.indexH;
			if (gPosY == 22)
				e.eventInst.map.actress.SetVisible(false);
			if(PosY == 22)
			{
				e.eventInst.map.player.Load();
				e.eventInst.map.actress.indexW = 7;
				e.eventInst.map.actress.indexH = 4;

		        e.eventInst.map.actress.image.pos(
		        	e.eventInst.map.GetPosW(e.eventInst.indexW), 
		        	e.eventInst.map.GetPosH(e.eventInst.indexH));
		        // e.eventInst.map.actres
				// e.eventInst.map.actress.
				e.eventInst.game.ResetLevel(3);
			}
		}
		else if (level == 2)
		{
			var gPosY = e.eventInst.map.actress.indexH;
			if (gPosY >= 15 && PosY >= 13)
			{
				Laya.timer.once(10,e.eventInst.game,e.eventInst.game.ResetLevel,[3]);
			}
		}

	}

	wakeupGirl(e:GameEvent)
	{
        // var lights = 
        // [
            // var lights = new ObjectLight(e.eventInst.map, 33, 4, 1, 1, false);
        // ];
        // lights[0].image.visible = false;
        // for (var i = 0; i < lights.length; ++i)
            // e.eventInst.map.AddGameObject(lights);

        // lights[0].AddChild(lights[1]);
		var actress = new Actress(e.eventInst.map, "back", 32, 5, false, null);
        e.eventInst.map.AddCharacter(actress);

	}
	finishSingleBlockLevel()
	{	


		// removeCharactor();
	}
	finishMusicStoneLevel(e:GameEvent)
	{
		e.eventInst.wakeupGirl(e); 
		SoundManager.playMusic("../laya/assets/music/1204.wav", 1 );

	}
	startBallLevel(e:GameEvent)
	{
		var nodes1 : MapNode[] = [];
		e.eventInst.map.AddCharacter(new Ball(e.eventInst.map, "../laya/assets/item/icon_wildfire.png", 33, 5, false, nodes1));
		// e.eventInst.map.AddCharacter()
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

	openGate(e:GameEvent)
	{
		var pitch = e.eventArgs;
		if(pitch == 1)
		{

		}

		if(pitch == 2)
		{

		}

		if(pitch == 3)
		{

		}

		if(pitch == 4)
		{

		}
	}
	ballSwitchTouch(e:GameEvent)
	{
		e.eventInst.openGate(e);

		// e.eventInst.
	}
	musicStoneTouch(e:GameEvent)
	{
		console.log("musicstone touch");
		var pitch = e.eventArgs;
		e.eventInst.sendSound(e, pitch);
		e.eventInst.solveMusicPuzzle(e);
	}
	
	sendSound(e:GameEvent,pitch:number) 
	{
		switch (pitch) {
			case 1:
				e.eventInst.musicStone2.image.visible = true;
				break;
			
			case 2:
				e.eventInst.musicStone3.image.visible = true;
				break;
			case 3:
				e.eventInst.musicStone4.image.visible = true;
				break;
			case 4:
				e.eventInst.musicStone5.image.visible = true;
				break;
			case 5:
				e.eventInst.musicStone6.image.visible = true;
				break;
			default:
				break;
		}
		if(pitch == 6)
			return;
		SoundManager.playMusic("../laya/assets/music/0" + pitch + ".wav", 1 );
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
				e.eventInst.map.player.Save(3, 29);
				e.eventInst.map.RestoreUpdate();
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