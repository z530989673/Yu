/*
* name;
*/

class GameObject
{
    protected map : GameMap;
    protected image : CustomSprite;
    public indexW : number = 0;
    public indexH : number = 0;
    public sizeW : number = 1;
    public sizeH : number = 1;
    public blockable : boolean = false;

    constructor(m : GameMap, path : string, indexH : number, indexW : number,
                sH : number, sW : number, blockable : boolean){
        this.map = m;
        this.indexW = indexW;
        this.indexH = indexH;
        this.sizeH = sH;
        this.sizeW = sW;
        this.blockable = blockable;

        this.image = new CustomSprite(path);
        this.image.zOrder = - indexH;
        this.map.AddObject(this.image);
        this.image.pos(m.GetPosW(indexW), m.GetPosH(indexH));
    }
}