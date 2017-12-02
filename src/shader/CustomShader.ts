/**
* name 
*/
module Yu{
	import Shader = Laya.Shader;
	export class CustomShader extends Shader{

  		public static shader:CustomShader = new CustomShader();
		constructor(){  //__INCLUDESTR__ ：包含一个文本文件到程序代码里。识别一个文本，并转换为字符串。
  //通过__INCLUDESTR__ 方法引入顶点着色器程序和片元着色器程序。
  			var vs:string = "\
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
  			var ps:string = "\
			  precision mediump float;\
varying vec2 v_texcoord;\
varying vec4 v_color;\
varying vec2 v_worldPos;\
uniform vec4 uv_noise_info;\
uniform sampler2D texture;\
uniform sampler2D u_tex1;\
uniform vec2 u_pointPos;\
uniform vec4 pos_info;\
void main(){\
	vec4 c = texture2D(texture, v_texcoord);\
	vec4 noise = texture2D(u_tex1, v_worldPos*uv_noise_info.zw + uv_noise_info.xy);\
	float d = length(v_worldPos * vec2(1080,1920) - u_pointPos) / 1000.0;\
  gl_FragColor = c * vec4(vec3(d) * noise.rgb,1);\
}";

  //vec4 t_color = texture2D(texture, v_texcoord);\
  //t_color += texture2D(u_tex1, v_noiseTexcoord);\
  			super(vs, ps, "myShader");
		}
	}
}