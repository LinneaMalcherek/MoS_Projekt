// draw everything in the scene. takes in the players to be able to draw all the different curling stones. 
function drawScene(players) {
        // set up the view and the scale of the whole world
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        mat4.perspective(pMatrix,45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);

        gl.uniform3f(shaderProgram.ambientColorUniform,0.2,0.2,0.2); 

        gl.uniform3f(shaderProgram.pointLightingSpecularColorUniform,0.5,0.5,0.5);

        gl.uniform3f(shaderProgram.pointLightingColorUniform,0.8,0.8,0.8);

        gl.uniform1f(shaderProgram.materialShininessUniform, 64.0);

        mat4.identity(vMatrix);
        mat4.rotate(vMatrix,vMatrix, -pitch*Math.PI / 180, [1, 0, 0]);
        mat4.rotate(vMatrix,vMatrix, -yaw*Math.PI / 180, [0, 1, 0]);
        mat4.translate(vMatrix,vMatrix, [-xCam, -yCam, -zCam]);
        mat4.translate(vMatrix,vMatrix, [0.15 , -0.9 ,-23.1]);
        
        var cameraPos = vec4.create();
        vec4.transformMat4(cameraPos, cameraPos, vMatrix); 
        gl.uniform4fv(shaderProgram.cameraPositionUniform,cameraPos);

        var lightPos = vec3.create();

        var transLight = mat4.create();

        mat4.translate(transLight,transLight,[5.0 , 14 ,-17.0]);
        vec3.transformMat4(lightPos, lightPos, transLight);
        vec3.transformMat4(lightPos, lightPos, vMatrix);
        gl.uniform3fv(shaderProgram.pointLightingLocationUniform,lightPos);


        // draw all the curling stones. goes trough all players, so we get different colors och the different players.
        for (var i=0; i<players.length; i++) {


            mat4.identity(mMatrix);
            
            mat4.translate(mMatrix,mMatrix, [players[i].stone.getXPos(),0 ,-players[i].stone.getYPos()]);
            mat4.translate(mMatrix,mMatrix, [-0.15,0.35,23.1]);
            mat4.rotateY(mMatrix,mMatrix, players[i].stone.getAngle());
            
            mat4.scale(mMatrix,mMatrix, [0.1, 0.1, 0.1]);
            gl.bindBuffer(gl.ARRAY_BUFFER, VertexPositionBuffer);
            gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, VertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, VertexNormalBuffer);
            gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, VertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, VertexTextureCoordBuffer);
            gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, VertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.activeTexture(gl.TEXTURE0);

            var j = players[i].player; // to get the right texture on the stone.

            if(j==0)
                gl.bindTexture(gl.TEXTURE_2D, stoneTextureP1);
            else
                gl.bindTexture(gl.TEXTURE_2D, stoneTextureP2);
            
            gl.uniform1i(shaderProgram.samplerUniform, 0);       

            gl.bindBuffer(gl.ARRAY_BUFFER, VertexPositionBuffer);
            setMatrixUniforms();
            gl.drawArrays(gl.TRIANGLES,0, VertexPositionBuffer.numItems);

        }


        // draw the curling field
        mat4.identity(mMatrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, VertexPositionBuffer2);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, VertexPositionBuffer2.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, VertexNormalBuffer2);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, VertexNormalBuffer2.itemSize, gl.FLOAT, false, 0, 0);

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
        mat4.scale(mMatrix,mMatrix, [2, 2, 2]);
        mat4.translate(mMatrix,mMatrix, [0, 0, 6]);
        mat4.translate(vMatrix,vMatrix, [xCam, yCam, zCam]);


        gl.bindBuffer(gl.ARRAY_BUFFER, VertexPositionBuffer3);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, VertexPositionBuffer3.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, VertexNormalBuffer3);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, VertexNormalBuffer3.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, VertexTextureCoordBuffer3);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, VertexTextureCoordBuffer3.itemSize, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, sphereTexture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, VertexIndexBuffer3);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, VertexIndexBuffer3.numItems, gl.UNSIGNED_SHORT, 0);

    }