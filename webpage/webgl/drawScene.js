

// draw everything in the scene. takes in the players to be able to draw all the different curling stones. 
function drawScene(players) {
        // set up the view and the scale of the whole world
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        /** Setting the perspective of the world (angle of view, canvas ratio, clip from, clip tp) */
        mat4.perspective(pMatrix,45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);

        /** Setting lighting colors and shininess */
        gl.uniform3f(shaderProgram.ambientColorUniform, 0.2, 0.2, 0.2); 

        gl.uniform3f(shaderProgram.pointLightingSpecularColorUniform, 0.5, 0.5, 0.5);

        gl.uniform3f(shaderProgram.pointLightingColorUniform, 0.8, 0.8, 0.8);

        gl.uniform1f(shaderProgram.materialShininessUniform, 64.0);

         /** Setting the world view matrix (will affect all objects) */
        mat4.identity(vMatrix);
        mat4.rotate(vMatrix,vMatrix, -pitch*Math.PI / 180, [1, 0, 0]);
        mat4.rotate(vMatrix,vMatrix, -yaw*Math.PI / 180, [0, 1, 0]);
        mat4.translate(vMatrix,vMatrix, [-xCam, -yCam, -zCam]);
        mat4.translate(vMatrix,vMatrix, [0.15 , -0.9 ,-23.1]);

        /** Setting the cameraPosition to the viewMatrix position, for light calculations */
        var cameraPos = vec4.create();
        vec4.transformMat4(cameraPos, cameraPos, vMatrix); 
        gl.uniform4fv(shaderProgram.cameraPositionUniform,cameraPos);

        /** Setting the light position and transforming it to view space */
        var lightPos = vec3.create();
        var transLight = mat4.create();
        mat4.translate(transLight,transLight,[5.0 , 45 ,-17.0]);
        vec3.transformMat4(lightPos, lightPos, transLight);
        vec3.transformMat4(lightPos, lightPos, vMatrix);
        gl.uniform3fv(shaderProgram.pointLightingLocationUniform,lightPos);

        // draw all the curling stones. goes trough all players, so we get different colors for the different players.
        for (var i=0; i<players.length; i++) {
            mat4.identity(mMatrix);
            
            /** Sets the position and scaling*/
            mat4.translate(mMatrix,mMatrix, [players[i].stone.getXPos(),0 ,-players[i].stone.getYPos()]);
            mat4.translate(mMatrix,mMatrix, [-0.15,0.30,23.1]);
            mat4.rotateY(mMatrix,mMatrix, players[i].stone.getAngle());
            mat4.scale(mMatrix,mMatrix, [0.1, 0.1, 0.1]);

            /** binding buffers and point them to our shader program */
            gl.bindBuffer(gl.ARRAY_BUFFER, stoneBuffers.VertexPositionBuffer);
            gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, stoneBuffers.VertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, stoneBuffers.VertexNormalBuffer);
            gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, stoneBuffers.VertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, stoneBuffers.VertexTextureCoordBuffer);
            gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, stoneBuffers.VertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.activeTexture(gl.TEXTURE0);

            var id = players[i].player; // to get the right texture on the stone.

            if(id==0)
                gl.bindTexture(gl.TEXTURE_2D, stoneTextureP1.objectTexture);
            else
                gl.bindTexture(gl.TEXTURE_2D, stoneTextureP2.objectTexture);
            
            gl.uniform1i(shaderProgram.samplerUniform, 0);       

            /** Draw the curling stone. Will not use Indices. Might want to change in future */
            gl.bindBuffer(gl.ARRAY_BUFFER, stoneBuffers.VertexPositionBuffer);
            setMatrixUniforms();
            gl.drawArrays(gl.TRIANGLES,0, stoneBuffers.VertexPositionBuffer.numItems);

        }


        /** Draw the Field */
        mat4.identity(mMatrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, fieldBuffers.VertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, fieldBuffers.VertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, fieldBuffers.VertexNormalBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, fieldBuffers.VertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, fieldBuffers.VertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, fieldBuffers.VertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, banaTexture.objectTexture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);

        // uncomment to remove specular light to field
        //gl.uniform3f(shaderProgram.pointLightingSpecularColorUniform,0,0,0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, fieldBuffers.VertexIndexBuffer);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, fieldBuffers.VertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

        /** Draw the sky box */ 
        mat4.identity(mMatrix);
        mat4.scale(mMatrix,mMatrix, [2, 2, 2]);
        mat4.translate(mMatrix,mMatrix, [0, 0, 6]);
        mat4.translate(vMatrix,vMatrix, [xCam, yCam, zCam]);


        gl.bindBuffer(gl.ARRAY_BUFFER, skyboxBuffers.VertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, skyboxBuffers.VertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, skyboxBuffers.VertexNormalBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, skyboxBuffers.VertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, skyboxBuffers.VertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, skyboxBuffers.VertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, sphereTexture.objectTexture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, skyboxBuffers.VertexIndexBuffer);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, skyboxBuffers.VertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

    }