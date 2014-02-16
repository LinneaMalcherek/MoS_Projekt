var VertexPositionBuffer;
var VertexTextureCoordBuffer;
var VertexIndexBuffer;

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

    document.getElementById("loadingtext").textContent = "";
}


function loadObject() {
    var request = new XMLHttpRequest();
    request.open("GET", "box.json");
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            handleLoadedObject(JSON.parse(request.responseText));
        }
    }
    request.send();
}
