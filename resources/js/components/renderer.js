import Shaders from '../gsls/Shaders.js';
import Program from '../gsls/Program.js';

export default {
    _canvas : null,
    _gl     : null,
    _program: null,
    _shaders: null,
    _vertexArray: null,
    init() {
        this._canvas = document.querySelector('[data-canvas]');
        if (!this._canvas) {
            return;
        }
        this._gl      = this._canvas.getContext('webgl2');

        this._shaders = new Shaders(this._gl);
        this._program = new Program(this._gl, this._shaders).program;

        this._test();
    },
    _test() {
        this._gl.viewport(0, 0, this._gl.canvas.width, this._gl.canvas.height);

        this._setupBuffer();
        this._setupVertexArray();

        this._gl.clearColor(0, 0, 0, 0);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT);
        this._gl.useProgram(this._program);
        this._gl.bindVertexArray(this._vertexArray);

        this._draw();
    },
    _setupBuffer() {
        const positionBuffer = this._gl.createBuffer();
        
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, positionBuffer);
        
        // three 2d points
        this._positions = [
            0, 0,
            0, 0.5,
            0.7, 0,
        ];
        this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(this._positions), this._gl.DYNAMIC_DRAW);
    },
    _setupVertexArray() {
        const positionAttributeLocation = this._gl.getAttribLocation(this._program, "a_position");
        this._vertexArray = this._gl.createVertexArray();
        this._gl.bindVertexArray(this._vertexArray);
        this._gl.enableVertexAttribArray(positionAttributeLocation);

        const size = 2;               // 2 components per iteration
        const type = this._gl.FLOAT;  // the data is 32bit floats
        const normalize = false;      // don't normalize the data
        const stride = 0;             // 0 = move forward size * sizeof(type) each iteration to get the next position
        const offset = 0;             // start at the beginning of the buffer
        this._gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)
    },
    _draw() {
        const primitiveType = this._gl.TRIANGLES;
        const offset = 0;
        const count = 3;
        const aspectRatio = 9/16;
        this._gl.drawArrays(primitiveType, offset, count);

        let i = 0;
        setInterval(() => {
            i += 0.02;
            
            this._positions = [
                0, 0,
                0, Math.sin(i),
                aspectRatio * Math.cos(i), 0,
            ];

            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(this._positions), this._gl.DYNAMIC_DRAW);
            this._gl.drawArrays(primitiveType, offset, count);
        }, 1000/60);
    }
}