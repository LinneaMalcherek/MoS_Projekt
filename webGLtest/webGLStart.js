

function animate() {
    var timeNow = new Date().getTime();
    if (lastTime != 0) {
        var elapsed = timeNow - lastTime;
        xPos += (xSpeed * elapsed) / 1000.0;
        yPos += (ySpeed * elapsed) / 1000.0;
        zPos += (zSpeed * elapsed) / 1000.0;
    }
    lastTime = timeNow;
}

function tick() {
        window.requestAnimationFrame(tick);
        handleKeys();
        drawScene();
        animate();
}

function webGLStart() {
    var canvas = document.getElementById("curlingbana");
    initGL(canvas);
    initShaders();
    initBuffers();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    tick();
  }