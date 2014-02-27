var VertexPositionBuffer;
var VertexTextureCoordBuffer;
var VertexIndexBuffer;

var VertexPositionBuffer2;
var VertexTextureCoordBuffer2;
var VertexIndexBuffer2;

function handleLoadedObject(objectData) {

    VertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, VertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objectData.texcoords), gl.STATIC_DRAW);
    VertexTextureCoordBuffer.itemSize = 2;
    VertexTextureCoordBuffer.numItems = objectData.texcoords.length / 2;

    VertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, VertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objectData.verts), gl.STATIC_DRAW);
    VertexPositionBuffer.itemSize = 3;
    VertexPositionBuffer.numItems = objectData.verts.length / 3;

    VertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, VertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(objectData.indices), gl.STATIC_DRAW);
    VertexIndexBuffer.itemSize = 1;
    VertexIndexBuffer.numItems = objectData.indices.length;

}

function handleLoadedObject2(objectData) {

    VertexTextureCoordBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, VertexTextureCoordBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objectData.texcoords), gl.STATIC_DRAW);
    VertexTextureCoordBuffer2.itemSize = 2;
    VertexTextureCoordBuffer2.numItems = objectData.texcoords.length / 2;

    VertexPositionBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, VertexPositionBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objectData.verts), gl.STATIC_DRAW);
    VertexPositionBuffer2.itemSize = 3;
    VertexPositionBuffer2.numItems = objectData.verts.length / 3;

    VertexIndexBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, VertexIndexBuffer2);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(objectData.indices), gl.STATIC_DRAW);
    VertexIndexBuffer2.itemSize = 1;
    VertexIndexBuffer2.numItems = objectData.indices.length;

}


function loadObject() {
    var request = new XMLHttpRequest();
    request.open("GET", "stone.json"); <!-- vilket objekt man vill läsa in -->
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            handleLoadedObject(JSON.parse(request.responseText));
        }
    }
/*
    request.open("GET", "banan.json"); <!-- vilket objekt man vill läsa in -->
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            handleLoadedObject2(JSON.parse(request.responseText));
        }
    }
*/
    request.send();
}

function loadObject2() {
    var request = new XMLHttpRequest();
    request.open("GET", "banan.json"); <!-- vilket objekt man vill läsa in -->
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            handleLoadedObject2(JSON.parse(request.responseText));
        }
    }
    request.send();
}