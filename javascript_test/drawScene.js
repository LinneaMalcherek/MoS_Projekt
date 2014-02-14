 function drawScene() {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

        mat4.identity(vMatrix);

        <!-- for every curling stone. allStones is a global variabel thas is used. is initiated when theGame is called.  -->
        for (var i=0; i<allStones.length; i++) {

            if (allStones[i].render){
                mat4.identity(mMatrix);

                mat4.translate(mMatrix, [allStones[i].getXPos()/10, allStones[i].getYPos()/10, zPos]);
                mat4.scale(mMatrix, [0.4, 0.4, 0.4]);
 
                gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
                gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
                gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, cubeVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, neheTexture);
                gl.uniform1i(shaderProgram.samplerUniform, 0);

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
                setMatrixUniforms();
                gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
            }


        }


    }

function harKvarIfallAtt(){ <!-- kan lägga tbx sen om koden ovan ej funkar typ ANVÄNDS EJ!!! -->
                mat4.identity(mvMatrix);

        mat4.translate(mvMatrix, [xPos, yPos, zPos]);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPositionBuffer.numItems);

<!-- clear the translation/movement matrix-->
        mat4.identity(mvMatrix);

        mat4.translate(mvMatrix, [-2, -2, -15]);
        setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPositionBuffer.numItems);
}