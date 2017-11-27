/*
* name;
*/

class NodeHeap{
    private mapNodes : MapNode[] = [];
    
    constructor(){
    }

    public GetSize() : number
    {
        return this.mapNodes.length;
    }

    //private static tmpNode : MapNode = new MapNode(-1,-1, 0);
    public Add(n : MapNode) : void
    {
        this.mapNodes.push(n);
        var index : number = this.mapNodes.length - 1;
        while(index > 0)
        {
            if (this.mapNodes[index].weight > this.mapNodes[index - 1].weight)
            {
                var tmpNode : MapNode = new MapNode(-1,-1,0);
                MapNode.Copy(this.mapNodes[index],tmpNode);
                MapNode.Copy(this.mapNodes[index - 1],this.mapNodes[index]);
                MapNode.Copy(tmpNode,this.mapNodes[index - 1]);
                index --;
            }
            else
                break;
        }
    }

    public Pop() : MapNode
    {
        if (this.mapNodes.length == 0)
            return null;
        else
            return this.mapNodes.pop();
    }
}