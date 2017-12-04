/*
* name;
*/
class UIManager{
    public game : GameMain;
    public button : Sprite;
    public health : Sprite[] = Array();
    constructor(game : GameMain){
        this.game = game;

        for(var i = 0; i < 3; i++)
        {
            var sp : Sprite = new Sprite();
            sp.loadImage("../laya/assets/item/icon_life.png");
            sp.pos(50 + i * 128,50);

            this.health.push(sp);
            Layer.AddUI(sp);
        }

        this.createButton();

        EventCenter.addEventListener(new GameEvent("holdFirefly", null, this), this.OnHoldFirefly);
        EventCenter.addEventListener(new GameEvent("LightEnableChanged", null, this), this.OnLightEnableChanged);
    }

    private createButton(): void {
        this.button = new Sprite();
        this.button.loadImage("../laya/assets/level2/button_normal.png");
        this.button.pos(Laya.stage.width - 320,Laya.stage.height - 320);
        
        this.button.mouseThrough = true;
        this.button.on(Laya.Event.MOUSE_UP,this,this.SkillButtonPressed);
        Layer.AddUI(this.button);
    }

    private OnHoldFirefly(e:GameEvent) : void
    {
        var inst = e.eventInst;
        inst.button.graphics.clear();
        inst.button.loadImage("../laya/assets/level4/button_flying.png");
        
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
        
        inst.CheckButton();
    }

    public ThroughButtonPressed(e : Event) : void
    {
        var x = this.button.mouseX - this.button.width / 2;
        var y = this.button.mouseY - this.button.height / 2;
        var dis = Math.sqrt(x * x + y * y);
        if (dis > 140)
            return;
        this.button.on(Laya.Event.MOUSE_UP,this,this.SkillButtonPressed)
        this.button.off(Laya.Event.MOUSE_UP,this,this.ThroughButtonPressed);
        this.game.map.player.isHoldFirefly = false;
        
        this.CheckButton();
    }

    public SkillButtonPressed(e : Event) : void
    {
        var x = this.button.mouseX - this.button.width / 2;
        var y = this.button.mouseY - this.button.height / 2;
        var dis = Math.sqrt(x * x + y * y);
        if (dis > 140)
            return;
        e.stopPropagation();
        if (this.game.map.IsPaused())
        {
            this.game.map.RestoreUpdate();
        }
        else
        {
            this.game.map.StopUpdate();
        }

        this.CheckButton();
    }

    public CheckButton() : void
    {
        this.button.graphics.clear();
        if (this.game.map.IsPaused())
            this.button.loadImage("../laya/assets/level2/button_frozentime.png");
        else
            this.button.loadImage("../laya/assets/level2/button_normal.png");
    }
}