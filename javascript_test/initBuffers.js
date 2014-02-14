var vertexPositionBuffer;

function initBuffers() {
   
    vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    vertices = [
         0.2,  0.2,  0.0,
        -0.2,  0.2,  0.0,
         0.2, -0.2,  0.0,
        -0.2, -0.2,  0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexPositionBuffer.itemSize = 3;
    vertexPositionBuffer.numItems = 4;
}