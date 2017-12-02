/**
* name 
*/
module Yu{
	import WebGLContext = Laya.WebGLContext;
	import Value2D = Laya.Value2D;
	import CONST3D2D = Laya.CONST3D2D;

	export class CustomShaderValue extends Value2D{

		public static pointPos :Array<any> = [0,0];
		public u_pointPos :Array<any> = [0,0];
		public u_tex1 : any;
  		public texcoord : any;
        public pos_info: Array<any>;
        public uv_info: Array<any>;
        public uv_noise_info: Array<any>;
		constructor(){
			super(0, 0);
			
   			this.pos_info = [0.0, 0.0, 1.0, 1.0];
   			this.uv_info = [0.0, 0.0, 1.0, 1.0];
   			this.uv_noise_info = [0.0, 0.0, 1.0, 1.0];
			var _vlen: number = 8 * CONST3D2D.BYTES_PE;
			//设置在shader程序文件里定义的属性的相关描述：[属性长度, 属性类型,false, 属性起始位置索引 * CONST3D2D.BYTES_PE];
			this.position = [2, WebGLContext.FLOAT, false, _vlen, 0];
			this.texcoord = [2, WebGLContext.FLOAT, false, _vlen, 2 * CONST3D2D.BYTES_PE];
			this.color = [4, WebGLContext.FLOAT, false, _vlen, 4 * CONST3D2D.BYTES_PE];

		}
	}
}