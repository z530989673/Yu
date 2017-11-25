/*
* name;
*/
class Map{

    private background: Sprite;
    private anchorMouseY : number;
    private fixedPivotY : number;

    constructor(){
        this.background = new Sprite();
    }

    public LoadLevel(level : number) : void
    {
		this.background.loadImage("../laya/assets/map/level1.png");
        Layer.AddBackground(this.background);

        Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.MouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP,this,this.MouseUp);
        //Laya.timer.frameLoop(1, this, this.Update);
    }

    private MouseMove(e : Event) : void
    {
        var newPivotY : number = 0;
        newPivotY = this.fixedPivotY - Laya.stage.mouseY + this.anchorMouseY;
        this.background.pivot(0,newPivotY);
    }

    private MouseDown(e : Event) : void
    {
        this.anchorMouseY = Laya.stage.mouseY;
        this.fixedPivotY = this.background.pivotY;
        Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this.MouseMove);
    }

    private MouseUp(e : Event) : void
    {
        Laya.stage.off(Laya.Event.MOUSE_MOVE,this,this.MouseMove);
    }

    private Update(e: Event): void {
        //console.log(Laya.stage.mouseX);
    }
}