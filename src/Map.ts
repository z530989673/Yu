/*
* name;
*/

enum NodeStatus {
     Empty = 0,
     Block
}

class GameMap{
    public static globalSpeed : number = 1;
    private map: CustomSprite;
    private objectContainer : Sprite = new Sprite();
    public width : number;
    public height : number;
    public totalHeightInPxl : number;
    public nodeStatus : NodeStatus[][];
    private currentStatus : NodeStatus[][] = new Array();
    public nodeSprite : CustomSprite[][] = new Array();

    public static leftOffset : number = 28;
    public static rightOffset : number = 28;
    public static topOffset : number = 0;
    public static nodeLength : number = 128;

    public player : Player = null;

    //runtime temparary data
    public mapNodes : MapNode[][] = new Array();
    public objects : GameObject[] = new Array();
    public characters : Character[] = new Array();

    public level = 1;
    public actress:Actress;
    constructor(){
        this.objectContainer.pos(0,0);
        this.objectContainer.zOrder = 0;

        //Laya.timer.frameLoop(1, this, this.Update);
    }

    public ResetLevel() : void
    {
        this.mapNodes = new Array();
        this.objects = new Array();
        this.characters = new Array();
        this.currentStatus = new Array();
        this.nodeSprite = new Array();
        this.map.off(Laya.Event.MOUSE_DOWN,this,this.MouseDown);
        Laya.timer.clearAll(this);
        Layer.ResetLayer();
        this.objectContainer.removeChildren();
        this.player.Reset();
        this.RestoreUpdate();
    }

    public LoadBasicLevel(level : string, offset : number = 0) : void
    {
        this.map = new CustomSprite("../laya/assets/" + level + "/bg.jpg");
        this.map.zOrder = -1;
        Layer.AddMap(this.map);

        for(var i = 0; i < 20; i++)
        {
            var closeShot : CustomSprite = new CustomSprite("../laya/assets/" + level + "/close_shot_01.png");
            closeShot.pos(-250 - offset,1600 - i * 800);
            Layer.AddForeGroundNear(closeShot);
        }
        
        for(var i = 0; i < 15; i++)
        {
            var closeShot : CustomSprite = new CustomSprite("../laya/assets/" + level + "/close_shot_02.png");
            closeShot.pos(-250,1000 - i * 800);
            Layer.AddForeGroundMid(closeShot);
        }
        
        for(var i = 0; i < 10; i++)
        {
            var closeShot : CustomSprite = new CustomSprite("../laya/assets/" + level + "/close_shot_03.png");
            closeShot.pos(-250,1500 - i * 800);
            Layer.AddForeGroundFar(closeShot);
        }

        for(var i = 0; i < 20; i++)
        {
            var closeShot : CustomSprite = new CustomSprite("../laya/assets/" + level + "/close_shot_01_r.png");
            closeShot.pos(1080 - 300,2000 - i * 800);
            Layer.AddForeGroundNear(closeShot);
        }
        
        for(var i = 0; i < 15; i++)
        {
            var closeShot : CustomSprite = new CustomSprite("../laya/assets/" + level + "/close_shot_02_r.png");
            closeShot.pos(1080 - 300,1400 - i * 800);
            Layer.AddForeGroundMid(closeShot);
        }
        
        for(var i = 0; i < 10; i++)
        {
            var closeShot : CustomSprite = new CustomSprite("../laya/assets/" + level + "/close_shot_03_r.png");
            closeShot.pos(1080 - 300,1900 - i * 800);
            Layer.AddForeGroundFar(closeShot);
        }
    }

    public LoadLevel1() : void
    {
        this.level = 1;
        this.LoadBasicLevel("level1");
        this.nodeStatus = [ [0,0,0,0,0,0,0,0],//34
                            [0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0],//29
                            [2,2,2,0,2,2,2,2],
                            [0,0,0,0,0,0,2,0],
                            [0,2,2,0,2,0,0,0],
                            [0,2,2,0,2,2,2,2],
                            [0,2,0,0,0,0,0,0],//24
                            [2,2,2,2,0,2,2,2],
                            [1,0,0,0,0,0,0,1],
                            [1,1,0,0,0,0,1,1],
                            [1,1,0,0,0,0,1,1],//19
                            [1,1,0,0,0,0,0,1],
                            [1,1,1,0,0,0,1,1],
                            [1,1,1,0,0,0,1,1],
                            [1,1,1,0,0,1,1,1],
                            [1,1,1,0,0,1,1,1],//14
                            [1,1,1,0,0,1,1,1],
                            [1,1,1,0,0,1,1,1],
                            [1,1,1,0,0,1,1,1],
                            [1,1,1,0,0,1,1,1],
                            [1,1,1,0,0,0,1,1],//9
                            [1,1,1,0,0,0,1,1],
                            [1,1,0,0,0,0,1,1],
                            [1,1,0,0,0,0,1,1],
                            [1,1,0,0,0,0,1,1],
                            [1,1,0,0,0,0,1,1],//4
                            [1,0,0,0,0,0,1,1],
                            [1,0,0,0,0,0,1,1],
                            [1,1,0,0,0,1,1,1],
                            [1,1,0,0,0,1,1,1],];//0
                            
        this.width = this.nodeStatus[0].length;
        this.height = this.nodeStatus.length;
        this.totalHeightInPxl = this.height * GameMap.nodeLength;
        
        var ground : CustomSprite = new CustomSprite("../laya/assets/level1/land_01.png");
        ground.pos(150,-750);
        this.objectContainer.addChild(ground);

        var ground1 : CustomSprite = new CustomSprite("../laya/assets/level1/land_full.jpg");
        ground1.pos(0,-2665);
        this.objectContainer.addChild(ground1);

        var end_ch1 : CustomSprite = new CustomSprite("../laya/assets/level1/end_ch1.png"  );
        var offsetW : number = this.GetPosW(1);
        var offsetH : number = this.GetPosH(35);
        end_ch1.pos(offsetW, offsetH);
        this.objectContainer.addChild(end_ch1);

        for(var i = 0; i < this.nodeStatus.length; i++)
        {
            this.currentStatus.push([]);
            this.nodeSprite.push([]);
            for(var j = 0; j < this.nodeStatus[i].length; j++)
            {
                var value : number = this.nodeStatus[this.nodeStatus.length - 1 - i][j];
                this.currentStatus[i].push(value);
                
                if (value == 0 || value == 1)
                    continue;

                var path : string = "";
                
                if (value == 2)
                    path = "../laya/assets/level1/obstacle_01.png";
                var sp : CustomSprite = new CustomSprite(path);
                var offsetW : number = this.GetPosW(j);
                var offsetH : number = this.GetPosH(i);
                sp.pos(offsetW, offsetH);
                this.objectContainer.addChild(sp);
                this.nodeSprite[i].push(sp);

            }
        }
        
        Layer.AddObjects(this.objectContainer);

        this.player = new Player(this,"back",0,3);

        this.map.on(Laya.Event.MOUSE_DOWN,this,this.MouseDown);

        for(var i = 0; i < this.nodeStatus.length; i++)
        {
            this.mapNodes.push([]);
            for(var j = 0; j < this.nodeStatus[i].length; j++)
            {
                this.mapNodes[i].push(new MapNode(i,j));
            }
        }

        Laya.timer.frameLoop(1, this, this.Update);
    }

    public LoadLevel2() : void
    {
        this.level = 2;
        this.LoadBasicLevel("level2", 150);

        this.nodeStatus = [ [1,1,1,1,1,1,1,1],
                            [1,1,1,1,1,1,1,1],
                            [1,1,1,1,1,1,1,1],
                            [1,1,1,1,1,1,1,1],
                            [1,1,1,1,0,1,1,1],//29
                            [1,1,1,1,0,1,0,0],
                            [1,1,1,1,0,1,0,1],
                            [1,1,1,1,0,1,0,1],
                            [1,1,1,1,0,1,0,1],
                            [1,1,1,1,0,1,0,0],//24
                            [1,1,1,1,0,0,0,0],
                            [1,1,1,1,0,0,0,0],
                            [1,1,1,1,1,1,1,0],
                            [1,1,1,1,1,1,1,0],
                            [1,1,1,1,1,1,1,0],//19
                            [1,1,1,1,1,1,1,0],
                            [1,1,1,1,1,1,1,0],
                            [1,1,1,1,1,1,1,0],
                            [1,1,1,1,1,1,0,0],
                            [1,1,1,1,1,1,0,1],//14
                            [1,1,1,1,1,1,0,0],
                            [1,1,1,1,1,1,1,0],
                            [0,1,1,1,1,1,1,0],
                            [0,1,1,1,1,1,1,0],
                            [0,1,1,1,1,1,1,0],//9
                            [0,1,0,0,0,1,1,0],
                            [0,1,0,0,0,1,1,0],
                            [0,1,0,0,0,1,0,0],
                            [0,1,1,0,1,1,0,1],
                            [0,0,0,0,1,1,0,0],//4
                            [0,0,0,1,1,1,1,0],
                            [0,0,0,0,0,0,1,0],
                            [1,0,1,0,0,0,0,0],
                            [1,0,1,1,1,1,1,1],//0
                            [1,0,1,1,1,1,1,1],//0
                            [1,0,1,1,1,1,1,1],];//0
                            
        this.width = this.nodeStatus[0].length;
        this.height = this.nodeStatus.length;
        this.totalHeightInPxl = this.height * GameMap.nodeLength;
        
        for(var i = 0; i < this.nodeStatus.length; i++)
        {
            this.currentStatus.push([]);
            this.nodeSprite.push([]);
            for(var j = 0; j < this.nodeStatus[i].length; j++)
            {
                var value : number = this.nodeStatus[this.nodeStatus.length - 1 - i][j];
                this.currentStatus[i].push(value);
                
                if ( value == 1)
                    continue;

                var path : string = "";
                
                if (value == 0)
                    path = "../laya/assets/placeHolder/White.png";
               else  if (value == 2)
                    path = "../laya/assets/level1/obstacle_01.png";
                var sp : CustomSprite = new CustomSprite(path);
                var offsetW : number = this.GetPosW(j);
                var offsetH : number = this.GetPosH(i);
                sp.pos(offsetW, offsetH);
                this.objectContainer.addChild(sp);
                this.nodeSprite[i].push(sp);

            }
        }
                
        Layer.AddObjects(this.objectContainer);

        this.player = new Player(this,"back",2,1);

        this.map.on(Laya.Event.MOUSE_DOWN,this,this.MouseDown);

        for(var i = 0; i < this.nodeStatus.length; i++)
        {
            this.mapNodes.push([]);
            for(var j = 0; j < this.nodeStatus[i].length; j++)
            {
                this.mapNodes[i].push(new MapNode(i,j));
            }
        }

        var lights = [
            new ObjectLight(this, 4, 1, 1, 1, false),

            new ObjectLight(this, 11, 0, 1, 1, false),

            new ObjectLight(this, 3, 6, 1, 1, false),
            new ObjectLight(this, 6, 6, 1, 1, false, false),
            new ObjectLight(this, 15, 7, 1, 1, false),
            new ObjectLight(this, 28, 6, 1, 1, false, false),
            new ObjectLight(this, 30, 7, 1, 1, false),
            new ObjectLight(this, 28, 4, 1, 1, false, false),
            new ObjectLight(this, 31, 4, 1, 1, false),
        ]

        lights[0].AddChild(lights[1]);
        lights[0].AddChild(lights[2]);

        lights[2].AddChild(lights[3]);
        lights[3].AddChild(lights[4]);
        lights[4].AddChild(lights[5]);
        lights[4].AddChild(lights[7]);

        lights[5].AddChild(lights[6]);
        lights[7].AddChild(lights[8]);
        

        for (var i = 0; i < lights.length; ++i)
            this.AddGameObject(lights[i]);

        var actress = new Actress(this,"back",4,1, false, lights[0]);
        this.AddCharacter(actress);
        this.actress = actress;

        var nodes : MapNode[] = [
	        this.mapNodes[10][2],
	        this.mapNodes[8][2],
	        this.mapNodes[8][4],
	        this.mapNodes[10][4],
        ]
        var firefly = new Firefly(this, "../laya/assets/item/firefly.png", 10, 2, false, nodes);
        this.AddCharacter(firefly);

        Laya.timer.frameLoop(1, this, this.Update);
    }    
    public LoadLevel3()
    {
        this.level = 3;
        this.map = new CustomSprite("../laya/assets/level1/bg.jpg");
        // this.LoadBasicLevel("level4");
        this.map.zOrder = -1;

        Layer.AddMap(this.map);
        this.nodeStatus = [ 
                            [0,0,0,0,0,0,0,0],//19
                            [0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0],//14
                            [0,0,0,0,0,0,0,0],
                            [1,1,1,0,0,1,1,1],
                            [1,1,1,0,0,1,1,1],
                            [1,1,1,0,0,1,1,1],
                            [1,1,1,0,0,1,1,1],//9
                            [1,1,1,0,0,1,1,1],
                            [1,1,1,0,0,1,1,1],
                            [0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0],//4
                            [0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0],];//0

        

        this.width = this.nodeStatus[0].length;
        this.height = this.nodeStatus.length;
        this.totalHeightInPxl = this.height * GameMap.nodeLength;
        
        for(var i = 0; i < this.nodeStatus.length; i++)
        {
            this.currentStatus.push([]);
            this.nodeSprite.push([]);
            for(var j = 0; j < this.nodeStatus[i].length; j++)
            {
                var value : number = this.nodeStatus[this.nodeStatus.length - 1 - i][j];
                this.currentStatus[i].push(value);
                
                if ( value == 1)
                    continue;

                var path : string = "";
                
                if (value == 0)
                    path = "../laya/assets/placeHolder/White.png";
               else  if (value == 2)
                    path = "../laya/assets/level1/obstacle_01.png";
                var sp : CustomSprite = new CustomSprite(path);
                var offsetW : number = this.GetPosW(j);
                var offsetH : number = this.GetPosH(i);
                sp.pos(offsetW, offsetH);
                this.objectContainer.addChild(sp);
                this.nodeSprite[i].push(sp);
            }
        }

        Layer.AddObjects(this.objectContainer);

        this.player = new Player(this,"back",0,1);

        this.map.on(Laya.Event.MOUSE_DOWN,this,this.MouseDown);

        for(var i = 0; i < this.nodeStatus.length; i++)
        {
            this.mapNodes.push([]);
            for(var j = 0; j < this.nodeStatus[i].length; j++)
            {
                this.mapNodes[i].push(new MapNode(i,j));
            }
        }
        for(var i = 7; i<=12; i++)
        {
            var nodes : MapNode[] = [
                this.mapNodes[i][3 + i % 2],
                this.mapNodes[i][4 - i % 2],
            ]
            var firefly = new Firefly(this, "../laya/assets/item/firefly.png", i, 3 + i % 2, false, nodes);
            firefly.isNeedReborn = false;
            this.AddCharacter(firefly);
        }


        var lights = [
            new ObjectLight(this, 15, 4, 1, 1, false),

            // new ObjectLight(this, 10, 4, 1, 1, false),
            new ObjectLight(this, 18, 4, 1, 1, false),

            // new ObjectLight(this, 1, 6, 1, 1, false),
            // new ObjectLight(this, 4, 6, 1, 1, false, false),
            // new ObjectLight(this, 13, 7, 1, 1, false),
            // new ObjectLight(this, 26, 6, 1, 1, false, false),
            // new ObjectLight(this, 28, 7, 1, 1, false),
            // new ObjectLight(this, 26, 4, 1, 1, false, false),
            // new ObjectLight(this, 29, 4, 1, 1, false),
        ]


        for (var i = 0; i < lights.length; ++i)
            this.AddGameObject(lights[i]);

        lights[0].AddChild(lights[1]);
        // lights[0].AddChild(lights[2]);

        // lights[2].AddChild(lights[3]);
        // lights[3].AddChild(lights[4]);
        // lights[4].AddChild(lights[5]);
        // lights[4].AddChild(lights[7]);

        // lights[5].AddChild(lights[6]);
        // lights[7].AddChild(lights[8]);
        

        var actress = new Actress(this,"back",7,4, false, lights[0]);
        this.AddCharacter(actress);

        this.actress = actress;
        Laya.timer.frameLoop(1, this, this.Update);
    }

    public AddCharacter(character : any)
    {

        if (CustomSprite.Paused())
        {            
            var playerX : number = this.player.GexX();
            var playerY : number = this.player.GexY();
        
            var x : number = character.GetX();
            var y : number = character.GetY();
            var dis : number = Math.sqrt((playerX - x) * (playerX - x) + (playerY - y) * (playerY - y));
            if (dis < CustomSprite.radius)
                character.SetActive(false);
            else
                character.SetActive(true);
        }
        this.characters.push(character);
    }

    public AddGameObject(obj : any)
    {
        if (obj.blockable)
        {
            for(var i = 0; i < obj.sizeW; i++)
            {
                for(var j = 0; j < obj.sizeH; j++)
                {
                    var indexW : number = obj.indexW + i;
                    var indexH : number = obj.indexH + j;
                    if (indexW < this.width && indexH < this.height)
                    {
                        this.SetStatus(indexH,indexW,NodeStatus.Block);
                    }
                }
            }
        }
        // var obj : GameObject = new GameObject(this,path, indexH,indexW, sizeH, sizeW, blockable);
        this.objects.push(obj);
    }

    public GetStatus(h : number, w : number) : NodeStatus
    {
        return this.currentStatus[h][w];
    }

    public SetStatus(h : number, w : number, s : NodeStatus) : void
    {
        this.currentStatus[h][w] = s;
    }

    public ReSetStatus(h : number, w : number) : void
    {
        this.currentStatus[h][w] = this.nodeStatus[h][w];
    }

    private MouseDown(e : Event) : void
    {
        var indexW : number = Math.floor((this.objectContainer.mouseX - GameMap.leftOffset) / GameMap.nodeLength);
        var indexH : number = Math.floor((Laya.stage.height - this.objectContainer.mouseY) / GameMap.nodeLength);
        if (indexW < 0) indexW = 0;
        if (indexH < 0) indexH = 0;
        if (indexW >= this.width) indexW = this.width - 1;
        if (indexH >= this.height) indexH = this.height - 1;

        this.MoveTo(indexH, indexW);
    }

    public StopUpdate() : void
    {
        CustomSprite.SetPause(true);
    }

    public RestoreUpdate() : void
    {
        CustomSprite.SetPause(false);
    }

    public IsPaused() : boolean
    {
        return CustomSprite.Paused();
    }

    private Update(e: Event): void {
        var pos : number = this.objectContainer.y + this.player.GetUpperBound();

        var posX : number = this.objectContainer.x + this.player.GetUpperX();
        if (posX / Laya.stage.width < 0.3)
        {
            this.objectContainer.pos(this.objectContainer.x + (Laya.stage.width * 0.3 - posX),
                    this.objectContainer.y);
        }
        else if (posX / Laya.stage.width > 0.6)
        {
            this.objectContainer.pos(this.objectContainer.x + (Laya.stage.width * 0.6 - posX),
                    this.objectContainer.y);
        }
        
        var upLimit = 0.5;
        var lowLimit = 0.7;
        if (pos / Laya.stage.height < upLimit)
        {
            if (this.objectContainer.y + Laya.stage.height < this.totalHeightInPxl)
            {
                this.objectContainer.pos(this.objectContainer.x,
                    this.objectContainer.y + (Laya.stage.height * upLimit - pos));
                
                Layer.GetInstance().foregroundNear.pos(Layer.GetInstance().foregroundNear.x,
                    Layer.GetInstance().foregroundNear.y + (Laya.stage.height * upLimit - pos) * 3);
                Layer.GetInstance().foregroundMid.pos(Layer.GetInstance().foregroundMid.x,
                    Layer.GetInstance().foregroundMid.y + (Laya.stage.height * upLimit - pos) * 2);
                Layer.GetInstance().foregroundFar.pos(Layer.GetInstance().foregroundFar.x,
                    Layer.GetInstance().foregroundFar.y + (Laya.stage.height * upLimit - pos) * 1);
            }
        }
        else if (pos / Laya.stage.height > lowLimit)
        {
            if ( this.objectContainer.y > 0)
            {
                this.objectContainer.pos(this.objectContainer.x,
                    this.objectContainer.y + (Laya.stage.height * lowLimit - pos));
                
                Layer.GetInstance().foregroundNear.pos(Layer.GetInstance().foregroundNear.x,
                    Layer.GetInstance().foregroundNear.y + (Laya.stage.height * lowLimit - pos) * 3);
                Layer.GetInstance().foregroundMid.pos(Layer.GetInstance().foregroundMid.x,
                    Layer.GetInstance().foregroundMid.y + (Laya.stage.height * lowLimit - pos) * 2);
                Layer.GetInstance().foregroundFar.pos(Layer.GetInstance().foregroundFar.x,
                    Layer.GetInstance().foregroundFar.y + (Laya.stage.height * lowLimit - pos) * 1);
                if (this.objectContainer.y < 0)
                    this.objectContainer.y = 0;
            }
        }

        if (CustomSprite.IsUpdating())
        {
            GameMap.globalSpeed = 0.25;
            var playerX : number = this.player.GexX();
            var playerY : number = this.player.GexY();
            for(var i =0; i < this.characters.length; i++)
            {
                var x : number = this.characters[i].GetX();
                var y : number = this.characters[i].GetY();
                var dis : number = Math.sqrt((playerX - x) * (playerX - x) + (playerY - y) * (playerY - y));
                if (dis < CustomSprite.radius)
                    this.characters[i].SetActive(false);
                else
                    this.characters[i].SetActive(true);
            }
        }
        else
            GameMap.globalSpeed = 1;
    }

    public IsWalkable(h : number, w : number) : boolean
    {
        if (this.GetStatus(h,w) == NodeStatus.Empty)
            return true;
        else return false;
    }

    public AddObject(sp : Sprite) : void
    {
        this.objectContainer.addChild(sp);
    }

    public GetPosW(indexW : number) : number
    {
        return GameMap.leftOffset + GameMap.nodeLength * indexW;
    }

    public GetPosH(indexH : number) : number
    {
        return Laya.stage.height - GameMap.nodeLength * indexH - GameMap.nodeLength;
    }

    public MapDistance(h1 : number, w1 : number, h2 : number, w2 : number) : number
    {
        return Math.abs(h1 - h2) + Math.abs(w1 - w2);
    }

    private static neighbourDirW : number[] = [1,0,-1,0];
    private static neighbourDirH : number[] = [0,1,0,-1];
    public MoveTo(h : number, w : number, obj : any = null) : void
    {
        if (obj == null)
            obj = this.player;

        var heap : NodeHeap = new NodeHeap();
        for(var i = 0; i < this.nodeStatus.length; i++)
        {
            for(var j = 0; j < this.nodeStatus[i].length; j++)
            {
                this.mapNodes[i][j].Clear();
            }
        }

        var playerNode : MapNode = this.mapNodes[obj.indexH][obj.indexW];
        playerNode.weight = Math.abs(obj.indexH - h) + Math.abs(obj.indexW - w);
        playerNode.iterLength = 0;
        heap.Add(playerNode);
        var found : boolean = false;
        var times : number = 0;
        var isReachable  : boolean = this.GetStatus(h,w) == NodeStatus.Empty;
        while(heap.GetSize() > 0)
        {
            times ++;
            var node : MapNode = heap.Pop();
            if (!isReachable && this.MapDistance(h,w,node.indexH,node.indexW) <= 1)
            {   
                w = node.indexW;
                h = node.indexH;             
                found = true;
                break;
            }
            if (node.indexW == w && node.indexH == h)
            {
                found = true;
                break;
            }
            if (times > 400)
                break;
            for(var i = 0; i < 4; i++)
            {
                var indexW : number = node.indexW + GameMap.neighbourDirW[i];
                var indexH : number = node.indexH + GameMap.neighbourDirH[i];
                if (indexW >= 0 && indexW < this.width && indexH >= 0 && indexH < this.height && this.IsWalkable(indexH,indexW))
                {
                    var neighbour : MapNode = this.mapNodes[indexH][indexW];
                    if (node.weight < neighbour.weight - 1)
                    {
                        neighbour.weight = Math.abs(indexH - h) + Math.abs(indexW - w) + node.iterLength + 1;
                        neighbour.parentIndexH = node.indexH;
                        neighbour.parentIndexW = node.indexW;
                        neighbour.iterLength = node.iterLength + 1;
                        heap.Add(neighbour);
                    }
                }
            }
        }

        if (found)
        {
            var checkPoints : MapNode[] = [];
            var indexH : number = h;
            var indexW : number = w;
            while(true)
            {
                checkPoints.push(this.mapNodes[indexH][indexW])
                var currentIndexH : number = this.mapNodes[indexH][indexW].parentIndexH;
                var currentIndexW : number = this.mapNodes[indexH][indexW].parentIndexW;
                indexH = currentIndexH;
                indexW = currentIndexW;
                if (indexH == -1 && indexW == -1)
                    break;
            }

            obj.MoveTo(checkPoints);
        }
        else
        {
            console.log("not found");
            //TODO
        }

    }
}