/*
* name;
*/

class GameObject
{
    protected map : Map;
    protected image : Sprite;
    public indexW : number = 0;
    public indexH : number = 0;
    
    public wayPoints : MapNode[] = [];

    constructor(m : Map, path : string, indexW : number, indexH : number){
        this.map = m;
        this.indexW = indexW;
        this.indexH = indexH;

        this.image = new Sprite();
        this.image.loadImage(path);
        this.image.zOrder = - indexH;
        this.map.AddObject(this.image);
        this.image.pos(m.GetPosW(indexW), m.GetPosH(indexH));
    }

    public Update() : void
    {
    }

}