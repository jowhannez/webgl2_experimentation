class Program {
    constructor(gl, shaders) {
        this._gl      = gl;
        this._shaders = shaders;

        this.program = this._createProgram();
    }

    _createProgram() {
        const program = this._gl.createProgram();
        this._gl.attachShader(program, this._shaders.VERTEX_SHADER);
        this._gl.attachShader(program, this._shaders.FRAGMENT_SHADER);
        this._gl.linkProgram(program);
        if (this._gl.getProgramParameter(program, this._gl.LINK_STATUS)) {
            return program;
        }

        console.error(this._gl.getProgramInfoLog(program));
        this._gl.deleteProgram(program);
    }
}
export default Program;