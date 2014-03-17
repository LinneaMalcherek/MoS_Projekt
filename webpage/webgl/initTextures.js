var stoneTextureP1;
var stoneTextureP2;
var fieldTexture;
var skyboxTexture;

function Texture()
{
    this.objectTexture=gl.createTexture();
}

Texture.prototype = {

    handleLoadedTexture: function(texture) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, null);
    },

    initTextures: function(imgSrc) {
        var self = this;
        this.objectTexture.image = new Image();
        this.objectTexture.image.onload = function () {
            self.handleLoadedTexture(self.objectTexture)
        }

        this.objectTexture.image.src = imgSrc;
    },

}
