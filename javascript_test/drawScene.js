 function drawScene() {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

        <!-- for every curling stone. allStones is a global variabel thas is used. is initiated when theGame is called.  -->
        for (var i=0; i<allStones.length; i++) {

            if (allStones[i].render){
                mat4.identity(mvMatrix);

                mat4.translate(mvMatrix, [allStones[i].getXPos()/10, allStones[i].getYPos()/10, zPos]);
                gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
                gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
                setMatrixUniforms();
                gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPositionBuffer.numItems);
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