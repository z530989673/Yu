/*
* name;
*/
module myModule
{
    import Sprite = Laya.Sprite;
    import RenderContext = Laya.RenderContext;
    import RenderSprite = laya.renders.RenderSprite;
    import WebGLContext2D = Laya.WebGLContext2D;
    import Buffer = Laya.Buffer;
    import IndexBuffer2D = Laya.IndexBuffer2D;
    import VertexBuffer2D = Laya.VertexBuffer2D;
    import myShader = shader.myShader;
    import myShaderValue = shader.myShaderValue;

    export class myShaderSprite extends Laya.Sprite
    {
        private vBuffer:VertexBuffer2D;
        /** 片元缓冲区。      */
        private iBuffer:IndexBuffer2D;
        private vbData:Float32Array;
        private ibData:Uint16Array;
        private iNum: number = 0;
        /** 着色器变量。      */
        private shaderValue:myShaderValue;
        private tex : Texture;

        constructor(){
            super();
            Laya.timer.frameLoop(1, this, this.RefreshTexture);
        }

        public RefreshTexture() : void
        {
            //this.customRenderEnable = false;
            //this._renderType -= RenderSprite.CUSTOM;//设置当前显示对象的渲染模式为自定义渲染模式。 
            if (this.tex != null)
            {
                this.shaderValue.uv_info = [this.tex.uv[0],this.tex.uv[1],this.tex.uv[4] - this.tex.uv[0],this.tex.uv[5] - this.tex.uv[1]];
                console.log(this.tex.uv);         
            }
        }

        /**
         * 初始化此类。
         * @param texture 纹理对象。
         * @param vb 顶点数组。
         * @param ib 顶点索引数组。
         */
        public init(texture:Texture, vb:any = null, ib:any = null) : void
        {
            this.tex = texture;
            this.vBuffer = VertexBuffer2D.create();
            this.iBuffer = IndexBuffer2D.create();

            this.ibData = new Uint16Array(100);
            var vbArray:any;
            var ibArray:any;

            if (vb)
            {
                vbArray = vb;
            }
            else
            {
                vbArray = [];
                var texWidth:Number = texture.width;
                var texHeight:Number = texture.height;

                //定义颜色值，取值范围0~1 浮点。
                var red:Number = 1;
                var greed:Number = 1;
                var blue:Number = 1;
                var alpha:Number = 1;

                //在顶点数组中放入4个顶点
                //每个顶点的数据：(坐标X,坐标Y,u,v,R,G,B,A)   
                vbArray.push(0, 0, texture.uv[0], texture.uv[1], red, greed, blue, alpha);
                vbArray.push(texWidth, 0, texture.uv[2], texture.uv[3], red, greed, blue, alpha);
                vbArray.push(texWidth, texHeight, texture.uv[4], texture.uv[5], red, greed, blue, alpha);
                vbArray.push(0, texHeight, texture.uv[6], texture.uv[7], red, greed, blue, alpha);
                }

            if (ib)
            {
                ibArray = ib;
            }
            else
            {
                ibArray = [];
                //在顶点索引数组中放入组成三角形的顶点索引。
                //三角形的顶点索引对应顶点数组vbArray 里的点索引，索引从0开始。
                ibArray.push(0, 1, 3);//第一个三角形的顶点索引。
                ibArray.push(3, 1, 2);//第二个三角形的顶点索引。           
            }
            this.iNum = ibArray.length;

            this.vbData = new Float32Array(vbArray);
            this.ibData = new Uint16Array(ibArray);

            this.vBuffer.append(this.vbData);
            this.iBuffer.append(this.ibData);

            this.shaderValue = new myShaderValue();
            this.shaderValue.textureHost = texture;
            this.shaderValue
            this._renderType |= RenderSprite.CUSTOM;//设置当前显示对象的渲染模式为自定义渲染模式。 
        }
        


        //重写渲染函数。
        public customRender(context:RenderContext, x:number, y:number):void
        {
            (context.ctx as WebGLContext2D).setIBVB(x, y, this.iBuffer, this.vBuffer, this.iNum, null, myShader.shader, this.shaderValue, 0, 0);
        }
}
}