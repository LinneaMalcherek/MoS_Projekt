 function drawScene() {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
        mat4.identity(vMatrix);
        mat4.translate(vMatrix, [0 ,-3 ,0]);
        
        <!-- for every curling stone. allStones is a global variabel thas is used. is initiated when theGame is called.  -->
        for (var i=0; i<allStones.length; i++) {

            if (allStones[i].render){
                mat4.identity(mMatrix);



                mat4.translate(mMatrix, [allStones[i].getXPos(), allStones[i].getYPos(), ZPOS]);
                mat4.rotateZ(mMatrix, allStones[i].getAngle());
                mat4.rotateX(mMatrix, Math.PI/2);
                
                mat4.scale(mMatrix, [0.2, 0.2, 0.2]);
                gl.bindBuffer(gl.ARRAY_BUFFER, VertexPositionBuffer);
                gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, VertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, VertexTextureCoordBuffer);
                gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, VertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, neheTexture);
                gl.uniform1i(shaderProgram.samplerUniform, 0);

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, VertexIndexBuffer);
                setMatrixUniforms();
                gl.drawElements(gl.TRIANGLES, VertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
            }


        }


    }