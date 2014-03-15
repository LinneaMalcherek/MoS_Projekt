var stoneBuffers;
var skyboxBuffers;
var fieldBuffers; 

function BufferObject()
{
    this.VertexPositionBuffer = gl.createBuffer();
    this.VertexTextureCoordBuffer = gl.createBuffer();
    this.VertexIndexBuffer = gl.createBuffer();
    this.VertexNormalBuffer = gl.createBuffer();
}

BufferObject.prototype = {
        
    loadObject: function(jsonObject) {
        var self = this;
        var request = new XMLHttpRequest();
        request.open("GET", jsonObject);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                var objectData = JSON.parse(request.responseText);
                self.loadVertices(objectData);
                self.loadNormals(objectData);
                self.loadTexCoords(objectData);
                if(objectData.indices){
                    self.loadIndices(objectData);
                }
            }
        }
        request.send();
    },

    loadVertices: function(objectData) {
     
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objectData.verts), gl.STATIC_DRAW);
        this.VertexPositionBuffer.itemSize = 3;
        this.VertexPositionBuffer.numItems = objectData.verts.length / 3;
    },

    loadNormals: function(objectData) {
       
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objectData.normals), gl.STATIC_DRAW);
        this.VertexNormalBuffer.itemSize = 3;
        this.VertexNormalBuffer.numItems = objectData.normals.length / 3;
    },

    loadTexCoords: function(objectData) {
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexTextureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objectData.texcoords), gl.STATIC_DRAW);
        this.VertexTextureCoordBuffer.itemSize = 2;
        this.VertexTextureCoordBuffer.numItems = objectData.texcoords.length / 2;
    },

    loadIndices: function(objectData) {
       
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(objectData.indices), gl.STATIC_DRAW);
        this.VertexIndexBuffer.itemSize = 1;
        this.VertexIndexBuffer.numItems = objectData.indices.length;
    },
}


