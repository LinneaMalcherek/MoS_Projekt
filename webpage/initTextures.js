function handleLoadedTexture(texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);
}


var neheTexture;

function initTextures() {
    neheTexture = gl.createTexture();
    neheTexture.image = new Image();
    neheTexture.image.onload = function () {
        handleLoadedTexture(neheTexture)
    }

    neheTexture.image.src = "stone_texture.png";
}

var gulTexture;

function initTextures4() {
    gulTexture = gl.createTexture();
    gulTexture.image = new Image();
    gulTexture.image.onload = function () {
        handleLoadedTexture(gulTexture)
    }

    gulTexture.image.src = "stone_texture_gul.png";
}

var banaTexture;

function initTextures2() {
    banaTexture = gl.createTexture();
    banaTexture.image = new Image();
    banaTexture.image.onload = function () {
        handleLoadedTexture(banaTexture)
    }

    banaTexture.image.src = "curlingbanan9.png";
}

var sphereTexture;

function initTextures3() {
    sphereTexture = gl.createTexture();
    sphereTexture.image = new Image();
    sphereTexture.image.onload = function () {
        handleLoadedTexture(sphereTexture)
    }

    sphereTexture.image.src = "skydome_nebulosa.jpg";
}