/*
* name;
*/

class GameObject
{
    protected map : GameMap;
    protected image : Sprite;
    public indexW : number = 0;
    public indexH : number = 0;
    public sizeW : number = 1;
    public sizeH : number = 1;

    constructor(m : GameMap, path : string, indexW : number, indexH : number,
                sW : number, sH : number){
        this.map = m;
        this.indexW = indexW;
        this.indexH = indexH;
        this.sizeH = sH;
        this.sizeW = sW;

        this.image = new Sprite();
        this.image.loadImage(path);
        this.image.zOrder = - indexH;
        this.map.AddObject(this.image);
        this.image.pos(m.GetPosW(indexW), m.GetPosH(indexH));
    }

}