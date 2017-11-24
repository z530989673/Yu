/*
* name;
*/
class Map{
    constructor(){

    }

    public LoadLevel(level : number) : void
    {
        var ape = new Sprite();
		//Laya.stage.addChild(ape);
		ape.loadImage("../laya/assets/map/level1.png");
        Layer.AddBackground(ape);

        Laya.timer.frameLoop(1, this, this.Update);
    }

    private Update(e: Event): void {
        console.log(Laya.stage.mouseX);
    }
}