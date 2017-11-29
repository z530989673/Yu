/*
* name;
*/
///<reference path="./Character.ts" />

enum NodeStatus {
     Empty = 0,
     Block,
     Mounster,
     Switch,
     // Flag
}

class GameMap{
    private map: Sprite;
    private objectContainer : Sprite = new Sprite();
    public width : number;
    public height : number;
    public totalHeightInPxl : number;
    public nodeStatus : NodeStatus[][];
    private currentStatus : NodeStatus[][] = new Array();
    public nodeSprite : Sprite[][] = new Array();

    public static leftOffset : number = 28;
    public static rightOffset : number = 28;
    public static topOffset : number = 0;
    public static nodeLength : number = 128;

    public player : Player = null;

    //runtime temparary data
    public mapNodes : MapNode[][] = new Array();
    public objects : GameObject[] = new Array();
    public characters : Character[] = new Array();

    constructor(){
        this.map = new Sprite();
        this.map.zOrder = -1;
        this.objectContainer.pos(0,0);
        this.objectContainer.zOrder = 0;

        //Laya.timer.frameLoop(1, this, this.Update);
    }

    public LoadLevel1() : void
    {
		this.map.loadImage("../laya/assets/map/level1.png");
        Layer.AddMap(this.map);
        this.nodeStatus = [ [0,0,0,0,0,0,0,0],
                            [1,0,0,0,0,0,0,1],
                            [1,0,0,0,0,0,0,1],
                            [1,0,0,0,0,0,0,1],
                            [1,0,0,0,0,0,0,1],//4
                            [1,0,0,0,0,0,0,1],
                            [1,0,0,0,0,0,0,1],
                            [1,0,0,0,0,0,0,1],
                            [1,0,0,0,0,0,0,1],
                            [1,0,0,0,0,0,0,1],//9
                            [1,0,0,0,0,0,0,1],
                            [1,0,0,0,0,0,0,1],
                            [1,0,0,0,7,0,0,1],
                            [0,0,0,0,0,0,0,0],
                            [1,0,0,0,0,0,0,1],//14
                            [1,0,0,0,0,0,0,1],
                            [1,0,0,0,0,0,0,1],
                            [1,0,0,0,0,0,0,1],
                            [1,0,0,0,0,0,0,1],
                            [1,0,0,0,0,0,0,1],//19
                            [1,0,0,0,0,0,0,1],
                            [1,0,0,0,0,0,0,1],
                            [1,0,0,0,0,0,0,1],
                            [1,0,0,0,0,0,0,1],
                            [1,0,0,0,0,0,0,0],];//24
                            
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
                var sp : Sprite = new Sprite();
                if (value == 0)
                    sp.loadImage("../laya/assets/placeHolder/White.png");
                else if (value == 1)
                    sp.loadImage("../laya/assets/placeHolder/Black.png");
                else if (value == 7)
                    sp.loadImage("../laya/assets/placeHolder/Flag.png");
                var offsetW : number = this.GetPosW(j);
                var offsetH : number = this.GetPosH(i);
                sp.pos(offsetW, offsetH);
                sp.zOrder = -10000;
                this.objectContainer.addChild(sp);
                this.nodeSprite[i].push(sp);
            }
        }
                
        Layer.AddObjects(this.objectContainer);

        this.AddGameObject("../laya/assets/comp/image.png",4,3,1,2);
        this.AddGameObject("../laya/assets/placeHolder/Brown.png",3,6,1,1);

        this.player = new Player(this,"../laya/assets/placeHolder/Red.png",3,0);

        Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.MouseDown);

        for(var i = 0; i < this.nodeStatus.length; i++)
        {
            this.mapNodes.push([]);
            for(var j = 0; j < this.nodeStatus[i].length; j++)
            {
                this.mapNodes[i].push(new MapNode(i,j));
            }
        }

        var nodes : MapNode[] = [this.mapNodes[1][1],this.mapNodes[1][5]];
        this.AddCharacter("../laya/assets/placeHolder/Green.png",1,1,nodes);

        Laya.timer.frameLoop(1, this, this.Update);
    }
 
    public AddCharacter(path : string, indexW :number, indexH : number, checkPoints : MapNode[]) : void
    {
        var character : Character = new Character(this, path, indexW, indexH, checkPoints);
        this.characters.push(character);
    }

    public AddGameObject(path : string, indexW : number, indexH : number, sizeW : number, sizeH : number) : void
    {
        for(var i = 0; i < sizeW; i++)
        {
            for(var j = 0; j < sizeH; j++)
            {
                var indexW : number = indexW - i;
                var indexH : number = indexH + j;
                console.log(indexW, indexH);
                if (indexW < this.width && indexH < this.height)
                {
                    this.SetStatus(indexH,indexW,NodeStatus.Block);
                }
            }
        }
        var obj : GameObject = new GameObject(this,path,indexW,indexH, sizeW, sizeH);
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

    private Update(e: Event): void {
        var pos : number = this.objectContainer.y + this.player.GetUpperBound();
        if (pos / Laya.stage.height < 0.3)
        {
            if (this.objectContainer.y + Laya.stage.height < this.totalHeightInPxl)
            {
                this.objectContainer.pos(this.objectContainer.x,
                    this.objectContainer.y + (Laya.stage.height * 0.3 - pos));
            }
        }
        else if (pos / Laya.stage.height > 0.7)
        {
            if ( this.objectContainer.y > 0)
            {
                this.objectContainer.pos(this.objectContainer.x,
                    this.objectContainer.y + (Laya.stage.height * 0.7 - pos));
            }
        }
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

    private static neighbourDirW : number[] = [1,0,-1,0];
    private static neighbourDirH : number[] = [0,1,0,-1];
    public MoveTo(h : number, w : number) : void
    {
        var heap : NodeHeap = new NodeHeap();
        for(var i = 0; i < this.nodeStatus.length; i++)
        {
            for(var j = 0; j < this.nodeStatus[i].length; j++)
            {
                this.mapNodes[i][j].Clear();
            }
        }

        var playerNode : MapNode = this.mapNodes[this.player.indexH][this.player.indexW];
        playerNode.weight = Math.abs(this.player.indexH - h) + Math.abs(this.player.indexW - w);
        playerNode.iterLength = 0;
        heap.Add(playerNode);
        var found : boolean = false;
        while(heap.GetSize() > 0)
        {
            var node : MapNode = heap.Pop();
            if (node.indexW == w && node.indexH == h)
            {
                found = true;
                break;
            }
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
            checkPoints.push(this.mapNodes[indexH][indexW])
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

            this.player.Move(checkPoints);
        }
        else
        {
            console.log("not found");
            //TODO
        }

    }
}