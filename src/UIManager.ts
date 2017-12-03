/*
* name;
*/
class UIManager{
    public game : GameMain;
    public button : Button;
    constructor(game : GameMain){
        this.game = game;

        Laya.loader.load("../laya/assets/comp/button.png", Handler.create(this, this.createButton));

        EventCenter.addEventListener(new GameEvent("holdFirefly", null, this), this.OnHoldFirefly);
        EventCenter.addEventListener(new GameEvent("LightEnableChanged", null, this), this.OnLightEnableChanged);
    }

    private createButton(): void {
        this.button = new Button("../laya/assets/comp/button.png");
        this.button.pos(Laya.stage.width - 200,Laya.stage.height - 200);
        this.button.scale(1.8,6);
        this.button.mouseThrough = true;
        this.button.on(Laya.Event.MOUSE_UP,this,this.SkillButtonPressed);
        Layer.AddUI(this.button);
    }

    private OnHoldFirefly(e:GameEvent) : void
    {
        var inst = e.eventInst;
        inst.button.off(Laya.Event.MOUSE_UP,inst,inst.SkillButtonPressed);
        inst.button.on(Laya.Event.MOUSE_UP,inst,inst.ThroughButtonPressed);
    }

    private OnLightEnableChanged(e:GameEvent) : void
    {
        var enable = e.eventArgs[1];
        var inst = e.eventInst;
        if (enable)
        {
            inst.button.on(Laya.Event.MOUSE_UP,inst,inst.SkillButtonPressed);
            inst.button.off(Laya.Event.MOUSE_UP,inst,inst.ThroughButtonPressed);
        }
    }

    public ThroughButtonPressed(e : Event) : void
    {
        this.button.on(Laya.Event.MOUSE_UP,this,this.SkillButtonPressed)
        this.button.off(Laya.Event.MOUSE_UP,this,this.ThroughButtonPressed);
        this.game.map.player.isHoldFirefly = false;
    }

    public SkillButtonPressed(e : Event) : void
    {
        e.stopPropagation();
        if (this.game.map.IsPaused())
            this.game.map.RestoreUpdate();
        else
            this.game.map.StopUpdate();
    }
}