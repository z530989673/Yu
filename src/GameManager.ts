
class GameManager {
	
	public score : number;
	public girlHappiness: number;
	public boyHappiness: number;
	public energy: number;

	constructor() {
		this.score = 0;
		this.girlHappiness = 0;
		this.boyHappiness = 0;
		this.energy = 0;

		EventCenter.addEventListener(new GameEvent("touchLatern", null), this.touchLatern);
		EventCenter.addEventListener(new GameEvent("touchWater", null), this.touchWater);
		EventCenter.addEventListener(new GameEvent("touchBall", null), this.touchBall);
		EventCenter.addEventListener(new GameEvent("touchMusicStone", null), this.musicStoneTouch);

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

	musicStoneTouch(e:Event)
	{
		var pitch = 1;
		this.sendSound(pitch);
		this.solveMusicPuzzle(pitch);
	}
	
	sendSound(pitch:number) 
	{
		return;
	}
	
	solveMusicPuzzle(pitch:number)
	{
		return;
	}
	solveDogPuzzle()
	{
		return;
	}

}