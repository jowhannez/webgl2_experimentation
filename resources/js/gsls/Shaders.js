class Shaders {
    constructor(gl) {
        this._gl = gl;

        this.VERTEX_SHADER = this._createShader(this._gl.VERTEX_SHADER, `#version 300 es
        in vec4 a_position;
        void main() {
            gl_Position = a_position;
        }`);
        this.FRAGMENT_SHADER = this._createShader(this._gl.FRAGMENT_SHADER, `#version 300 es
        precision highp float;
        out vec4 outColor;
        void main() {
            outColor = vec4(1, 0, 0.5, 1);
        }`);
    }
    
    _createShader(type, source) {
        const shader = this._gl.createShader(type);
        this._gl.shaderSource(shader, source);
        this._gl.compileShader(shader);
        if (this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {
          return shader;
        }
       
        console.error(this._gl.getShaderInfoLog(shader));
        this._gl.deleteShader(shader);
    }
}
export default Shaders;