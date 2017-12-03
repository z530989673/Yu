/*
* name;
*/
module Yu
{
    import Sprite = Laya.Sprite;
    import RenderContext = Laya.RenderContext;
    import RenderSprite = laya.renders.RenderSprite;
    import WebGLContext2D = Laya.WebGLContext2D;
    import Buffer = Laya.Buffer;
    import IndexBuffer2D = Laya.IndexBuffer2D;
    import VertexBuffer2D = Laya.VertexBuffer2D;
    import CustomShader = Yu.CustomShader;
    import CustoShaderValue = Yu.CustomShaderValue;

    export class CustomSprite extends Laya.Sprite
    {
        public static Paused() : boolean
        {
            return CustomSprite.isPaused > 0.5;
        }

        public static AddTime() : void
        {
            var maxW = Math.max(CustomShaderValue.pointPos[0],Laya.stage.width - CustomShaderValue.pointPos[0]);
            var maxH = Math.max(CustomShaderValue.pointPos[1],Laya.stage.width - CustomShaderValue.pointPos[1]);
            CustomSprite.distance = Math.sqrt(maxW * maxW + maxH * maxH) + 600;
            if (CustomSprite.isPaused < 0.5)
            {
                CustomSprite.currentTime -= Laya.timer.delta;
                if (CustomSprite.currentTime < 0)
                    CustomSprite.currentTime = 0;
            }
            else
            {
                CustomSprite.currentTime += Laya.timer.delta;
                if (CustomSprite.currentTime > CustomSprite.maxTime)
                    CustomSprite.currentTime = CustomSprite.maxTime;
            }
            var coeff = (CustomSprite.currentTime / CustomSprite.maxTime);
            CustomSprite.radius = CustomSprite.distance * coeff * coeff;
        }

        public static SetPause( p : boolean) : void
        {
            if (p)
            {
                CustomSprite.isPaused = 1;
            }
            else
            {
                CustomSprite.isPaused = 0;
            }
        }
        public static currentTime : number = 0;
        public static maxTime : number = 1000;
        public static distance : number = 2000;
        public static radius : number = 0;
        public static isPaused : number = 0;
        public static IsUpdating () : boolean
        {
            return ((CustomSprite.isPaused < 0.5 && CustomSprite.currentTime != 0) ||
            (CustomSprite.isPaused > 0.5 && CustomSprite.currentTime != CustomSprite.maxTime))

        }
        private vBuffer:VertexBuffer2D;
        /** 片元缓冲区。      */
        private iBuffer:IndexBuffer2D;
        private vbData:Float32Array;
        private ibData:Uint16Array;
        private iNum: number = 0;
        /** 着色器变量。      */
        private shaderValue:CustomShaderValue;
        private tex : Texture;
        private noiseTex : Texture;
        private path : string;
        private noisePath : string = "../laya/assets/placeHolder/mask.png";

        constructor(path : string){
            super();
            this.path = path;
            Laya.timer.frameLoop(1, this, this.RefreshTexture);
            Laya.loader.load([path,this.noisePath], Handler.create(this, this.LoadComplete), null, Loader.IMAGE);
        }

        public ChangeTexture(path : string)
        {
            this.path = path;
            Laya.loader.load(path, Handler.create(this, this.LoadComplete), null, Loader.IMAGE);
        }

        private LoadComplete():void
        {
            var texture:Texture = Loader.getRes(this.path);
            if (texture == null)
                console.log(this.path);
            else
                this.Init(texture);
        }

        public RefreshTexture() : void
        {
            //this.customRenderEnable = false;
            //this._renderType -= RenderSprite.CUSTOM;//设置当前显示对象的渲染模式为自定义渲染模式。 
            if (this.tex != null)
            {
                this.shaderValue.uv_info = [this.tex.uv[0],this.tex.uv[1],this.tex.uv[4] - this.tex.uv[0],this.tex.uv[5] - this.tex.uv[1]];        
                this.shaderValue.uv_noise_info = [this.noiseTex.uv[0],this.noiseTex.uv[1],this.noiseTex.uv[4] - this.noiseTex.uv[0],this.noiseTex.uv[5] - this.noiseTex.uv[1]];   
                this.shaderValue.u_pointPos = CustomShaderValue.pointPos;     
                var point : Point = this.localToGlobal(new Point(GameMap.nodeLength / 2,GameMap.nodeLength / 2));
                this.shaderValue.pos_info = [CustomSprite.isPaused,CustomSprite.radius];
            }
        }

        /**
         * 初始化此类。
         * @param texture 纹理对象。
         * @param vb 顶点数组。
         * @param ib 顶点索引数组。
         */
        public Init(texture:Texture, vb:any = null, ib:any = null) : void
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

            this.shaderValue = new CustomShaderValue();
            this.shaderValue.textureHost = texture;
            this.noiseTex = Loader.getRes(this.noisePath);
            this.shaderValue.u_tex1 = this.noiseTex.source;
            this._renderType |= RenderSprite.CUSTOM;//设置当前显示对象的渲染模式为自定义渲染模式。 
            this.mouseEnabled = true;
            this.width = texture.width;
            this.height = texture.height;
        }

        //重写渲染函数。
        public customRender(context:RenderContext, x:number, y:number):void
        {
            (context.ctx as WebGLContext2D).setIBVB(x, y, this.iBuffer, this.vBuffer, this.iNum, null, CustomShader.shader, this.shaderValue, 0, 0);
        }
}
}