/*
* name;
*/
class MapNode
{
    constructor(h : number,w : number)
    {
        this.indexH = h;
        this.indexW = w;
        this.weight = 100000;
        this.parentIndexH = -1;
        this.parentIndexW = -1;
        this.iterLength = 0;
    }

    public Clear() : void
    {
        this.weight = 100000;
        this.parentIndexH = -1;
        this.parentIndexW = -1;
        this.iterLength = 0;
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
    public iterLength : number;
}