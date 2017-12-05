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
    var Shader = Laya.Shader;
    var CustomShader = /** @class */ (function (_super) {
        __extends(CustomShader, _super);
        function CustomShader() {
            var _this = this;
            //通过__INCLUDESTR__ 方法引入顶点着色器程序和片元着色器程序。
            var vs = "\
attribute vec2 position;\
attribute vec2 texcoord;\
attribute vec4 color;\
uniform vec2 size;\
uniform mat4 mmat;\
uniform vec4 uv_info;\
varying vec2 v_texcoord;\
varying vec4 v_color;\
varying vec2 v_worldPos;\
void main(){\
  vec4 pos =mmat*vec4(position.x,position.y,0,1);\
  gl_Position = vec4((pos.x/size.x-0.5)*2.0, (0.5-pos.y/size.y)*2.0, pos.z, 1.0);\
  v_color = color;\
  v_texcoord = texcoord*uv_info.zw + uv_info.xy;\
	vec4 srcPos = mmat*vec4(position.x,position.y,0,1);\
	v_worldPos = vec2(pos.x/size.x, pos.y/size.y);\
}";
            var ps = "\
			  precision mediump float;\
varying vec2 v_texcoord;\
varying vec4 v_color;\
varying vec2 v_worldPos;\
uniform vec4 uv_noise_info;\
uniform sampler2D texture;\
uniform sampler2D u_tex1;\
uniform vec2 u_pointPos;\
uniform vec2 pos_info;\
void main(){\
	vec4 c = texture2D(texture, v_texcoord);\
	vec4 noise = texture2D(u_tex1, v_worldPos*uv_noise_info.zw + uv_noise_info.xy);\
	float d = length(v_worldPos * vec2(1080,1920) - u_pointPos) + noise.r * 200.0;\
	if (pos_info.y + 100.0 < d)\
		gl_FragColor =  c;\
	else if (pos_info.y < d)\
	{\
		float weight = (d - pos_info.y) / 100.0;\
		float grey = c.r * 0.30 + c.g * 0.59 + c.b * 0.11;\
		gl_FragColor = vec4(vec3(grey) * weight,1);\
	}\
	else\
	{\
		float grey = c.r * 0.30 + c.g * 0.59 + c.b * 0.11;\
		gl_FragColor = vec4(vec3(grey),c.a);\
	}\
}";
            //vec4 t_color = texture2D(texture, v_texcoord);\
            //t_color += texture2D(u_tex1, v_noiseTexcoord);\
            _this = _super.call(this, vs, ps, "myShader") || this;
            return _this;
        }
        CustomShader.shader = new CustomShader();
        return CustomShader;
    }(Shader));
    Yu.CustomShader = CustomShader;
})(Yu || (Yu = {}));
//# sourceMappingURL=CustomShader.js.map