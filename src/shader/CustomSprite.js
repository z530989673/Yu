var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var Yu;
(function (Yu) {
    var RenderSprite = laya.renders.RenderSprite;
    var IndexBuffer2D = Laya.IndexBuffer2D;
    var VertexBuffer2D = Laya.VertexBuffer2D;
    var CustomShader = Yu.CustomShader;
    var CustomSprite = /** @class */ (function (_super) {
        __extends(CustomSprite, _super);
        function CustomSprite(path) {
            var _this = _super.call(this) || this;
            _this.iNum = 0;
            _this.noisePath = "../laya/assets/placeHolder/mask.png";
            _this.path = path;
            Laya.timer.frameLoop(1, _this, _this.RefreshTexture);
            Laya.loader.load([path, _this.noisePath], Handler.create(_this, _this.LoadComplete), null, Loader.IMAGE);
            return _this;
        }
        CustomSprite.Paused = function () {
            return CustomSprite.isPaused > 0.5;
        };
        CustomSprite.AddTime = function () {
            var maxW = Math.max(Yu.CustomShaderValue.pointPos[0], Laya.stage.width - Yu.CustomShaderValue.pointPos[0]);
            var maxH = Math.max(Yu.CustomShaderValue.pointPos[1], Laya.stage.width - Yu.CustomShaderValue.pointPos[1]);
            CustomSprite.distance = Math.sqrt(maxW * maxW + maxH * maxH) + 600;
            if (CustomSprite.isPaused < 0.5) {
                CustomSprite.currentTime -= Laya.timer.delta;
                if (CustomSprite.currentTime < 0)
                    CustomSprite.currentTime = 0;
            }
            else {
                CustomSprite.currentTime += Laya.timer.delta;
                if (CustomSprite.currentTime > CustomSprite.maxTime)
                    CustomSprite.currentTime = CustomSprite.maxTime;
            }
            var coeff = (CustomSprite.currentTime / CustomSprite.maxTime);
            CustomSprite.radius = CustomSprite.distance * coeff * coeff;
        };
        CustomSprite.SetPause = function (p) {
            if (p) {
                CustomSprite.isPaused = 1;
            }
            else {
                CustomSprite.isPaused = 0;
            }
        };
        CustomSprite.IsUpdating = function () {
            return ((CustomSprite.isPaused < 0.5 && CustomSprite.currentTime != 0) ||
                (CustomSprite.isPaused > 0.5 && CustomSprite.currentTime != CustomSprite.maxTime));
        };
        CustomSprite.prototype.ChangeTexture = function (path) {
            this.path = path;
            Laya.loader.load(path, Handler.create(this, this.LoadComplete), null, Loader.IMAGE);
        };
        CustomSprite.prototype.LoadComplete = function () {
            var texture = Loader.getRes(this.path);
            if (texture == null)
                console.log(this.path);
            else
                this.Init(texture);
        };
        CustomSprite.prototype.RefreshTexture = function () {
            //this.customRenderEnable = false;
            //this._renderType -= RenderSprite.CUSTOM;//设置当前显示对象的渲染模式为自定义渲染模式。 
            if (this.tex != null) {
                this.shaderValue.uv_info = [this.tex.uv[0], this.tex.uv[1], this.tex.uv[4] - this.tex.uv[0], this.tex.uv[5] - this.tex.uv[1]];
                this.shaderValue.uv_noise_info = [this.noiseTex.uv[0], this.noiseTex.uv[1], this.noiseTex.uv[4] - this.noiseTex.uv[0], this.noiseTex.uv[5] - this.noiseTex.uv[1]];
                this.shaderValue.u_pointPos = Yu.CustomShaderValue.pointPos;
                var point = this.localToGlobal(new Point(GameMap.nodeLength / 2, GameMap.nodeLength / 2));
                this.shaderValue.pos_info = [CustomSprite.isPaused, CustomSprite.radius];
            }
        };
        /**
         * 初始化此类。
         * @param texture 纹理对象。
         * @param vb 顶点数组。
         * @param ib 顶点索引数组。
         */
        CustomSprite.prototype.Init = function (texture, vb, ib) {
            if (vb === void 0) { vb = null; }
            if (ib === void 0) { ib = null; }
            this.tex = texture;
            this.vBuffer = VertexBuffer2D.create();
            this.iBuffer = IndexBuffer2D.create();
            this.ibData = new Uint16Array(100);
            var vbArray;
            var ibArray;
            if (vb) {
                vbArray = vb;
            }
            else {
                vbArray = [];
                var texWidth = texture.width;
                var texHeight = texture.height;
                //定义颜色值，取值范围0~1 浮点。
                var red = 1;
                var greed = 1;
                var blue = 1;
                var alpha = 1;
                //在顶点数组中放入4个顶点
                //每个顶点的数据：(坐标X,坐标Y,u,v,R,G,B,A)   
                vbArray.push(0, 0, texture.uv[0], texture.uv[1], red, greed, blue, alpha);
                vbArray.push(texWidth, 0, texture.uv[2], texture.uv[3], red, greed, blue, alpha);
                vbArray.push(texWidth, texHeight, texture.uv[4], texture.uv[5], red, greed, blue, alpha);
                vbArray.push(0, texHeight, texture.uv[6], texture.uv[7], red, greed, blue, alpha);
            }
            if (ib) {
                ibArray = ib;
            }
            else {
                ibArray = [];
                //在顶点索引数组中放入组成三角形的顶点索引。
                //三角形的顶点索引对应顶点数组vbArray 里的点索引，索引从0开始。
                ibArray.push(0, 1, 3); //第一个三角形的顶点索引。
                ibArray.push(3, 1, 2); //第二个三角形的顶点索引。           
            }
            this.iNum = ibArray.length;
            this.vbData = new Float32Array(vbArray);
            this.ibData = new Uint16Array(ibArray);
            this.vBuffer.append(this.vbData);
            this.iBuffer.append(this.ibData);
            this.shaderValue = new Yu.CustomShaderValue();
            this.shaderValue.textureHost = texture;
            this.noiseTex = Loader.getRes(this.noisePath);
            this.shaderValue.u_tex1 = this.noiseTex.source;
            this._renderType |= RenderSprite.CUSTOM; //设置当前显示对象的渲染模式为自定义渲染模式。 
            this.mouseEnabled = true;
            this.width = texture.width;
            this.height = texture.height;
        };
        //重写渲染函数。
        CustomSprite.prototype.customRender = function (context, x, y) {
            context.ctx.setIBVB(x, y, this.iBuffer, this.vBuffer, this.iNum, null, CustomShader.shader, this.shaderValue, 0, 0);
        };
        CustomSprite.currentTime = 0;
        CustomSprite.maxTime = 1000;
        CustomSprite.distance = 2000;
        CustomSprite.radius = 0;
        CustomSprite.isPaused = 0;
        return CustomSprite;
    }(Laya.Sprite));
    Yu.CustomSprite = CustomSprite;
})(Yu || (Yu = {}));
//# sourceMappingURL=CustomSprite.js.map