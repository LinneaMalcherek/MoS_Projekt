<!DOCTYPE html>
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Curling</title>
            <script type="text/javascript" src="glMatrix-0.9.5.min.js"></script>
            
            <script id="shader-fs" type="x-shader/x-fragment">
              precision mediump float;

              varying vec2 vTextureCoord;

              uniform sampler2D uSampler;

              void main(void) {
                  gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
              }
            </script>

            <script id="shader-vs" type="x-shader/x-vertex">
              attribute vec3 aVertexPosition;
              attribute vec2 aTextureCoord;

              uniform mat4 uMMatrix;
              uniform mat4 uVMatrix;
              uniform mat4 uPMatrix;

              varying vec2 vTextureCoord;


              void main(void) {
                  gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aVertexPosition, 1.0);
                  vTextureCoord = aTextureCoord;
              }
            </script>
            <script type="text/javascript" src="initGL.js"></script>
            <script type="text/javascript" src="initShaders.js"></script>
            <script type="text/javascript" src="initBuffers.js"></script>
            <script type="text/javascript" src="initTextures.js"></script>
            <script type="text/javascript" src="drawScene.js"></script>
            <script type="text/javascript" src="handleEvents.js"></script>
            <script type="text/javascript" src="sylvester.js"></script>
            <script type="text/javascript" src="dataConstants.js"></script>
            <script type="text/javascript" src="CurlingStone.js"></script>
            <script type="text/javascript" src="theGame.js"></script>

        
        </head>
      <body style='margin:0px' onload='start()'>
        <h1>Curlingspel</h1>
        Vinkel : <input type="text" id="vinkel"> Hastighet: <input type="text" id="hastighet"> <button onclick="game.kastaStenTest()">Skicka sten</button> <br />
         <canvas id="curlingbana" style="border: none;" width="500" height="500"></canvas>

      </body>
    </html>


