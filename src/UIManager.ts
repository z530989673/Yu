/*
* name;
*/
class UIManager{
    public game : GameMain;
    public button : Button;
    constructor(game : GameMain){
        this.game = game;

        Laya.loader.load("../laya/assets/comp/button.png", Handler.create(this, this.createButton));
    }

    private createButton(): void {
        this.button = new Button("../laya/assets/comp/button.png");
        this.button.pos(Laya.stage.width - 200,Laya.stage.height - 200);
        this.button.scale(1.8,6);
        this.button.mouseThrough = true;
        this.button.on(Laya.Event.MOUSE_UP,this,this.SkillButtonPressed);
        Layer.AddUI(this.button);
    }

    public SkillButtonPressed(e : Event) : void
    {
        e.stopPropagation();
        if (this.game.map.IsPaused())
            this.game.map.RestoreUpdate();
        else
            this.game.map.StopUpdate();     
        this.button.on(Laya.Event.MOUSE_UP,this,this.SkillButtonPressed);
    }
}