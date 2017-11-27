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

    private static tmpNode : MapNode;
    public Add(n : MapNode) : void
    {
        this.mapNodes.push(n);
        var index : number = this.mapNodes.length - 1;
        while(index > 0)
        {
            if (this.mapNodes[index].weight > this.mapNodes[index - 1].weight)
            {
                NodeHeap.tmpNode = this.mapNodes[index];
                this.mapNodes[index] = this.mapNodes[index - 1];
                this.mapNodes[index - 1] = NodeHeap.tmpNode;
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