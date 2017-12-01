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
void main(){\
  vec4 pos =mmat*vec4(position.x,position.y,0,1);\
  gl_Position = vec4((pos.x/size.x-0.5)*2.0, (0.5-pos.y/size.y)*2.0, pos.z, 1.0);\
  v_color = color;\
  v_texcoord = texcoord*uv_info.zw + uv_info.xy;\
}";
  			var ps:string = "\
			  precision mediump float;\
varying vec2 v_texcoord;\
varying vec4 v_color;\
uniform sampler2D texture;\
void main(){\
  vec4 t_color = texture2D(texture, v_texcoord);\
  gl_FragColor = t_color.rgba * v_color.rgba;\
}";
  			super(vs, ps, "myShader");
		}
	}
}