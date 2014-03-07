// draw everything in the scene. takes in the players to be able to draw all the different curling stones. 
function drawScene(players) {
        // set up the view and the scale of the whole world
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

        mat4.identity(vMatrix);
        mat4.rotate(vMatrix, -pitch*Math.PI / 180, [1, 0, 0]);
        mat4.rotate(vMatrix, -yaw*Math.PI / 180, [0, 1, 0]);
        mat4.translate(vMatrix, [-xCam, -yCam, -zCam]);

        mat4.rotate(vMatrix,-Math.PI / 2, [1, 0, 0]);
        mat4.translate(vMatrix, [0 , 10 ,0]);
        
        // draw all the curling stones. goes trough all players, so we get different colors och the different players.
        for (var j=0; j<players.length; j++) {

            allStones = players[j].stones;
            for (var i=0; i<allStones.length; i++) { // for every stone in the players array
            
                if (allStones[i].render){ // if it is in game (should be rendered)

                    //console.log("Rotationalspeed: %s, Speed Side %s", allStones[i].angularSpeed , allStones[i].speedSide)

                    mat4.identity(mMatrix);
                    mat4.translate(mMatrix, [-0.15,-12,0]);
                    mat4.translate(mMatrix, [allStones[i].getXPos(), allStones[i].getYPos(), ZPOS]);
                    mat4.rotateZ(mMatrix, allStones[i].getAngle());

                    mat4.rotateX(mMatrix, Math.PI/2);
                    
                    mat4.scale(mMatrix, [0.1, 0.1, 0.1]);
                    gl.bindBuffer(gl.ARRAY_BUFFER, VertexPositionBuffer);
                    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, VertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

                    gl.bindBuffer(gl.ARRAY_BUFFER, VertexTextureCoordBuffer);
                    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, VertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

                    gl.activeTexture(gl.TEXTURE0);

                    if(j==0)
                        gl.bindTexture(gl.TEXTURE_2D, neheTexture);
                    else
                        gl.bindTexture(gl.TEXTURE_2D, gulTexture);
                    
                    gl.uniform1i(shaderProgram.samplerUniform, 0);

                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, VertexIndexBuffer);
                    setMatrixUniforms();
                    gl.drawElements(gl.TRIANGLES, VertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
                }

            }
        }

        // draw the curling field
        mat4.identity(mMatrix);
        mat4.translate(mMatrix, [0,12,-0.5]);
        mat4.rotateX(mMatrix, Math.PI/2);

        gl.bindBuffer(gl.ARRAY_BUFFER, VertexPositionBuffer2);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, VertexPositionBuffer2.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, VertexTextureCoordBuffer2);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, VertexTextureCoordBuffer2.itemSize, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, banaTexture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, VertexIndexBuffer2);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, VertexIndexBuffer2.numItems, gl.UNSIGNED_SHORT, 0);

        // draw the sky box 
        mat4.identity(mMatrix);
        mat4.scale(mMatrix, [2, 2, 2]);

        mat4.rotate(vMatrix,Math.PI / 2, [1, 0, 0]);
        mat4.translate(vMatrix, [xCam, yCam, zCam]);


        gl.bindBuffer(gl.ARRAY_BUFFER, VertexPositionBuffer3);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, VertexPositionBuffer3.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, VertexTextureCoordBuffer3);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, VertexTextureCoordBuffer3.itemSize, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, sphereTexture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, VertexIndexBuffer3);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, VertexIndexBuffer3.numItems, gl.UNSIGNED_SHORT, 0);

    }