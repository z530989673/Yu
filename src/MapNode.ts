/*
* name;
*/
class MapNode
{
    constructor(h : number,w : number, weight : number)
    {
        this.indexH = h;
        this.indexW = w;
        this.weight = weight;
    }

    public static Copy(from : MapNode, to : MapNode) : void
    {
        to.indexH = from.indexH;
        to.indexW = from.indexW;
        to.weight = from.weight;
        to.parentIndexH = from.parentIndexH;
        to.parentIndexW = from.parentIndexW;
    }

    public indexW : number;
    public indexH : number;
    public weight : number;
    public parentIndexW : number;
    public parentIndexH : number;
}