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
/**
* name
*/
var Yu;
(function (Yu) {
    var WebGLContext = Laya.WebGLContext;
    var Value2D = Laya.Value2D;
    var CONST3D2D = Laya.CONST3D2D;
    var CustomShaderValue = /** @class */ (function (_super) {
        __extends(CustomShaderValue, _super);
        function CustomShaderValue() {
            var _this = _super.call(this, 0, 0) || this;
            _this.u_pointPos = [0, 0];
            _this.pos_info = [0.0, 0.0];
            _this.uv_info = [0.0, 0.0, 1.0, 1.0];
            _this.uv_noise_info = [0.0, 0.0, 1.0, 1.0];
            var _vlen = 8 * CONST3D2D.BYTES_PE;
            //设置在shader程序文件里定义的属性的相关描述：[属性长度, 属性类型,false, 属性起始位置索引 * CONST3D2D.BYTES_PE];
            _this.position = [2, WebGLContext.FLOAT, false, _vlen, 0];
            _this.texcoord = [2, WebGLContext.FLOAT, false, _vlen, 2 * CONST3D2D.BYTES_PE];
            _this.color = [4, WebGLContext.FLOAT, false, _vlen, 4 * CONST3D2D.BYTES_PE];
            return _this;
        }
        CustomShaderValue.pointPos = [0, 0];
        return CustomShaderValue;
    }(Value2D));
    Yu.CustomShaderValue = CustomShaderValue;
})(Yu || (Yu = {}));
//# sourceMappingURL=CustomShaderValue.js.map