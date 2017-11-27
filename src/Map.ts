/*
* name;
*/
 enum NodeStatus {
     Empty = 0,
     Block,
     Mounster,
     Switch,
}

class Map{
    private map: Sprite;
    public width : number;
    public height : number;
    public nodeStatus : NodeStatus[][];
    public nodeSprite : Sprite[][] = new Array();

    public static leftOffset : number = 40;
    public static rightOffset : number = 40;
    public static topOffset : number = 45;
    public static nodeLength : number = 125;

    public player : Player;

    //runtime temparary data
    public nodeCheck : boolean[][] = new Array();
    public mapNodes : MapNode[][] = new Array();

    constructor(){
        this.map = new Sprite();
        this.map.zOrder = -1;
    }

    public LoadLevel1() : void
    {
        this.width = 8;
        this.height = 15;

		this.map.loadImage("../laya/assets/map/level1.png");
        Layer.AddMap(this.map);
        this.nodeStatus = [ [0,0,0,0,0,0,0,0],
                            [1,0,0,0,0,0,0,1],
                            [1,1,0,0,0,0,1,1],
                            [1,1,0,0,0,0,1,1],
                            [1,1,0,0,0,0,1,1],//4
                            [1,1,1,0,0,1,1,1],
                            [1,1,1,0,0,1,1,1],
                            [1,1,1,0,0,1,1,1],
                            [1,0,0,0,0,0,0,1],
                            [1,0,1,0,0,1,0,1],//9
                            [1,0,1,0,0,1,0,1],
                            [1,0,0,0,0,1,1,1],
                            [1,1,0,0,0,1,1,1],
                            [1,0,0,0,0,0,0,1],
                            [0,0,0,0,0,0,0,0],];//14
        
        for(var i = 0; i < this.nodeStatus.length; i++)
        {
            this.nodeSprite.push([]);
            for(var j = 0; j < this.nodeStatus[i].length; j++)
            {
                var value : number = this.nodeStatus[i][j];
                var sp : Sprite = new Sprite();
                if (value == 0)
                    sp.loadImage("../laya/assets/placeHolder/white.png");
                else if (value == 1)
                    sp.loadImage("../laya/assets/placeHolder/black.png");
                var offsetW : number = this.GetPosW(j);
                var offsetH : number = this.GetPosH(i);
                sp.pivot( offsetW, offsetH);
                Layer.AddObjects(sp);
                this.nodeSprite[i].push(sp);
            }
        }

        this.player = new Player(this);

        Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.MouseDown);

        for(var i = 0; i < this.nodeStatus.length; i++)
        {
            this.nodeCheck.push([]);
            this.mapNodes.push([]);
            for(var j = 0; j < this.nodeStatus[i].length; j++)
            {
                this.nodeCheck[i].push(false);
                this.mapNodes[i].push(new MapNode(i,j,0));
            }
        }
        //Laya.timer.frameLoop(1, this, this.Update);
        //this.background.pivot(0,500);
    }

    private MouseDown(e : Event) : void
    {
        var indexW : number = Math.floor((this.map.mouseX - Map.leftOffset) / Map.nodeLength);
        var indexH : number = Math.floor((this.map.height - this.map.mouseY) / Map.nodeLength);
        if (indexW < 0) indexW = 0;
        if (indexH < 0) indexH = 0;
        if (indexW >= this.width) indexW = this.width - 1;
        if (indexH >= this.height) indexH = this.height - 1;
        //var status : Status = this.nodeStatus[indexH][indexW];

        this.MoveTo(indexH, indexW);
    }

    private Update(e: Event): void {
        console.log(Laya.stage.mouseX);
    }

    public IsWalkable(h : number, w : number) : boolean
    {
        if (this.nodeStatus[h][w] == NodeStatus.Empty)
            return true;
        else return false;
    }

    public GetPosW(indexW : number) : number
    {
        return - Map.leftOffset - Map.nodeLength * indexW;
    }

    public GetPosH(indexH : number) : number
    {
        return - Laya.stage.height + Map.nodeLength * indexH + Map.nodeLength;
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
                this.nodeCheck[i][j] = false;
                this.mapNodes[i][j].parentIndexH = -1;
                this.mapNodes[i][j].parentIndexW = -1;
            }
        }

        var weight : number = Math.abs(this.player.indexH - h) + Math.abs(this.player.indexW - w);
        this.nodeCheck[this.player.indexH][this.player.indexW] = true;
        heap.Add(this.mapNodes[this.player.indexH][this.player.indexW]);
        var found : boolean = false;
        while(heap.GetSize() > 0)
        {
            var node : MapNode = heap.Pop();
            for(var i = 0; i < 4; i++)
            {
                var indexW : number = node.indexW + Map.neighbourDirW[i];
                var indexH : number = node.indexH + Map.neighbourDirH[i];
                if (indexW >= 0 && indexW < this.width && indexH >= 0 && indexH < this.height)
                {
                    if (this.nodeCheck[indexH][indexW] == false && this.IsWalkable(indexH,indexW))
                    {
                        var neighbour : MapNode = this.mapNodes[indexH][indexW];
                        neighbour.weight = Math.abs(indexH - h) + Math.abs(indexW - w);
                        neighbour.parentIndexH = node.indexH;
                        neighbour.parentIndexW = node.indexW;
                        this.nodeCheck[indexH][indexW] = true;
                        if (indexW == w && indexH == h)
                        {
                            found = true;
                            break;
                        }
                        heap.Add(neighbour);
                    }
                }
            }
            if (found)
                break;
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