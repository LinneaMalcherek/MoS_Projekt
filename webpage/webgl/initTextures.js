function handleLoadedTexture(texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);
}


var stoneTextureP1;

function initTextures() {
    stoneTextureP1 = gl.createTexture();
    stoneTextureP1.image = new Image();
    stoneTextureP1.image.onload = function () {
        handleLoadedTexture(stoneTextureP1)
    }

    stoneTextureP1.image.src = "objects/textures/curlingstone_texture.png";
}

var stoneTextureP2;

function initTextures4() {
    stoneTextureP2 = gl.createTexture();
    stoneTextureP2.image = new Image();
    stoneTextureP2.image.onload = function () {
        handleLoadedTexture(stoneTextureP2)
    }

    stoneTextureP2.image.src = "objects/textures/curlingstone_texture_2.png";
}

var banaTexture;

function initTextures2() {
    banaTexture = gl.createTexture();
    banaTexture.image = new Image();
    banaTexture.image.onload = function () {
        handleLoadedTexture(banaTexture)
    }

    banaTexture.image.src = "objects/textures/curlingbanan12.png";
}

var sphereTexture;

function initTextures3() {
    sphereTexture = gl.createTexture();
    sphereTexture.image = new Image();
    sphereTexture.image.onload = function () {
        handleLoadedTexture(sphereTexture)
    }

    sphereTexture.image.src = "objects/textures/skydome_nebulosa.jpg";
}