var squareVertexPositionBuffer;

function initBuffers() {
   
    squareVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
    vertices = [
         0.2,  0.2,  0.0,
        -0.2,  0.2,  0.0,
         0.2, -0.2,  0.0,
        -0.2, -0.2,  0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    squareVertexPositionBuffer.itemSize = 3;
    squareVertexPositionBuffer.numItems = 4;
}