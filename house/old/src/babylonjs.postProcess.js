(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babylonjs"));
	else if(typeof define === 'function' && define.amd)
		define("babylonjs-post-process", ["babylonjs"], factory);
	else if(typeof exports === 'object')
		exports["babylonjs-post-process"] = factory(require("babylonjs"));
	else
		root["POSTPROCESSES"] = factory(root["BABYLON"]);
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), (__WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_decorators__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dev/postProcesses/src/asciiArt/asciiArtPostProcess.ts":
/*!**********************************************************************!*\
  !*** ../../../dev/postProcesses/src/asciiArt/asciiArtPostProcess.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsciiArtFontTexture: () => (/* binding */ AsciiArtFontTexture),
/* harmony export */   AsciiArtPostProcess: () => (/* binding */ AsciiArtPostProcess)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/Extensions/engine.dynamicTexture */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _asciiart_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./asciiart.fragment */ "../../../dev/postProcesses/src/asciiArt/asciiart.fragment.ts");








/**
 * AsciiArtFontTexture is the helper class used to easily create your ascii art font texture.
 *
 * It basically takes care rendering the font front the given font size to a texture.
 * This is used later on in the postprocess.
 */
var AsciiArtFontTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(AsciiArtFontTexture, _super);
    /**
     * Create a new instance of the Ascii Art FontTexture class
     * @param name the name of the texture
     * @param font the font to use, use the W3C CSS notation
     * @param text the caracter set to use in the rendering.
     * @param scene the scene that owns the texture
     */
    function AsciiArtFontTexture(name, font, text, scene) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, scene) || this;
        scene = _this.getScene();
        if (!scene) {
            return _this;
        }
        _this.name = name;
        _this._text == text;
        _this._font == font;
        _this.wrapU = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Texture.CLAMP_ADDRESSMODE;
        _this.wrapV = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Texture.CLAMP_ADDRESSMODE;
        //this.anisotropicFilteringLevel = 1;
        // Get the font specific info.
        var maxCharHeight = _this._getFontHeight(font);
        var maxCharWidth = _this._getFontWidth(font);
        _this._charSize = Math.max(maxCharHeight.height, maxCharWidth);
        // This is an approximate size, but should always be able to fit at least the maxCharCount.
        var textureWidth = Math.ceil(_this._charSize * text.length);
        var textureHeight = _this._charSize;
        // Create the texture that will store the font characters.
        _this._texture = scene.getEngine().createDynamicTexture(textureWidth, textureHeight, false, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_SAMPLINGMODE);
        //scene.getEngine().setclamp
        var textureSize = _this.getSize();
        // Create a canvas with the final size: the one matching the texture.
        var canvas = document.createElement("canvas");
        canvas.width = textureSize.width;
        canvas.height = textureSize.height;
        var context = canvas.getContext("2d");
        context.textBaseline = "top";
        context.font = font;
        context.fillStyle = "white";
        context.imageSmoothingEnabled = false;
        // Sets the text in the texture.
        for (var i = 0; i < text.length; i++) {
            context.fillText(text[i], i * _this._charSize, -maxCharHeight.offset);
        }
        // Flush the text in the dynamic texture.
        scene.getEngine().updateDynamicTexture(_this._texture, canvas, false, true);
        return _this;
    }
    Object.defineProperty(AsciiArtFontTexture.prototype, "charSize", {
        /**
         * Gets the size of one char in the texture (each char fits in size * size space in the texture).
         */
        get: function () {
            return this._charSize;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets the max char width of a font.
     * @param font the font to use, use the W3C CSS notation
     * @returns the max char width
     */
    AsciiArtFontTexture.prototype._getFontWidth = function (font) {
        var fontDraw = document.createElement("canvas");
        var ctx = fontDraw.getContext("2d");
        ctx.fillStyle = "white";
        ctx.font = font;
        return ctx.measureText("W").width;
    };
    // More info here: https://videlais.com/2014/03/16/the-many-and-varied-problems-with-measuring-font-height-for-html5-canvas/
    /**
     * Gets the max char height of a font.
     * @param font the font to use, use the W3C CSS notation
     * @returns the max char height
     */
    AsciiArtFontTexture.prototype._getFontHeight = function (font) {
        var fontDraw = document.createElement("canvas");
        var ctx = fontDraw.getContext("2d");
        ctx.fillRect(0, 0, fontDraw.width, fontDraw.height);
        ctx.textBaseline = "top";
        ctx.fillStyle = "white";
        ctx.font = font;
        ctx.fillText("jH|", 0, 0);
        var pixels = ctx.getImageData(0, 0, fontDraw.width, fontDraw.height).data;
        var start = -1;
        var end = -1;
        for (var row = 0; row < fontDraw.height; row++) {
            for (var column = 0; column < fontDraw.width; column++) {
                var index = (row * fontDraw.width + column) * 4;
                if (pixels[index] === 0) {
                    if (column === fontDraw.width - 1 && start !== -1) {
                        end = row;
                        row = fontDraw.height;
                        break;
                    }
                    continue;
                }
                else {
                    if (start === -1) {
                        start = row;
                    }
                    break;
                }
            }
        }
        return { height: end - start + 1, offset: start - 1 };
    };
    /**
     * Clones the current AsciiArtTexture.
     * @returns the clone of the texture.
     */
    AsciiArtFontTexture.prototype.clone = function () {
        return new AsciiArtFontTexture(this.name, this._font, this._text, this.getScene());
    };
    /**
     * Parses a json object representing the texture and returns an instance of it.
     * @param source the source JSON representation
     * @param scene the scene to create the texture for
     * @returns the parsed texture
     */
    AsciiArtFontTexture.Parse = function (source, scene) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new AsciiArtFontTexture(source.name, source.font, source.text, scene); }, source, scene, null);
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)("font")
    ], AsciiArtFontTexture.prototype, "_font", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)("text")
    ], AsciiArtFontTexture.prototype, "_text", void 0);
    return AsciiArtFontTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.BaseTexture));
/**
 * AsciiArtPostProcess helps rendering everithing in Ascii Art.
 *
 * Simmply add it to your scene and let the nerd that lives in you have fun.
 * Example usage: var pp = new AsciiArtPostProcess("myAscii", "20px Monospace", camera);
 */
var AsciiArtPostProcess = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(AsciiArtPostProcess, _super);
    /**
     * Instantiates a new Ascii Art Post Process.
     * @param name the name to give to the postprocess
     * @camera the camera to apply the post process to.
     * @param camera
     * @param options can either be the font name or an option object following the IAsciiArtPostProcessOptions format
     */
    function AsciiArtPostProcess(name, camera, options) {
        var _this = _super.call(this, name, "asciiart", ["asciiArtFontInfos", "asciiArtOptions"], ["asciiArtFont"], 1, camera, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Texture.TRILINEAR_SAMPLINGMODE, undefined, true) || this;
        /**
         * This defines the amount you want to mix the "tile" or caracter space colored in the ascii art.
         * This number is defined between 0 and 1;
         */
        _this.mixToTile = 0;
        /**
         * This defines the amount you want to mix the normal rendering pass in the ascii art.
         * This number is defined between 0 and 1;
         */
        _this.mixToNormal = 0;
        // Default values.
        var font = "40px Monospace";
        var characterSet = " `-.'_:,\"=^;<+!*?/cL\\zrs7TivJtC{3F)Il(xZfY5S2eajo14[nuyE]P6V9kXpKwGhqAUbOd8#HRDB0$mgMW&Q%N@";
        // Use options.
        if (options) {
            if (typeof options === "string") {
                font = options;
            }
            else {
                font = options.font || font;
                characterSet = options.characterSet || characterSet;
                _this.mixToTile = options.mixToTile || _this.mixToTile;
                _this.mixToNormal = options.mixToNormal || _this.mixToNormal;
            }
        }
        var scene = (camera === null || camera === void 0 ? void 0 : camera.getScene()) || _this._scene;
        _this._asciiArtFontTexture = new AsciiArtFontTexture(name, font, characterSet, scene);
        var textureSize = _this._asciiArtFontTexture.getSize();
        _this.onApply = function (effect) {
            effect.setTexture("asciiArtFont", _this._asciiArtFontTexture);
            effect.setFloat4("asciiArtFontInfos", _this._asciiArtFontTexture.charSize, characterSet.length, textureSize.width, textureSize.height);
            effect.setFloat4("asciiArtOptions", _this.width, _this.height, _this.mixToNormal, _this.mixToTile);
        };
        return _this;
    }
    return AsciiArtPostProcess;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PostProcess));



/***/ }),

/***/ "../../../dev/postProcesses/src/asciiArt/asciiart.fragment.ts":
/*!********************************************************************!*\
  !*** ../../../dev/postProcesses/src/asciiArt/asciiart.fragment.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   asciiartPixelShader: () => (/* binding */ asciiartPixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "asciiartPixelShader";
var shader = "varying vec2 vUV;uniform sampler2D textureSampler;uniform sampler2D asciiArtFont;uniform vec4 asciiArtFontInfos;uniform vec4 asciiArtOptions;float getLuminance(vec3 color)\n{return clamp(dot(color,vec3(0.2126,0.7152,0.0722)),0.,1.);}\n#define CUSTOM_FRAGMENT_DEFINITIONS\nvoid main(void) \n{float caracterSize=asciiArtFontInfos.x;float numChar=asciiArtFontInfos.y-1.0;float fontx=asciiArtFontInfos.z;float fonty=asciiArtFontInfos.w;float screenx=asciiArtOptions.x;float screeny=asciiArtOptions.y;float tileX=float(floor((gl_FragCoord.x)/caracterSize))*caracterSize/screenx;float tileY=float(floor((gl_FragCoord.y)/caracterSize))*caracterSize/screeny;vec2 tileUV=vec2(tileX,tileY);vec4 tileColor=texture2D(textureSampler,tileUV);vec4 baseColor=texture2D(textureSampler,vUV);float tileLuminance=getLuminance(tileColor.rgb);float offsetx=(float(floor(tileLuminance*numChar)))*caracterSize/fontx;float offsety=0.0;float x=float(mod(gl_FragCoord.x,caracterSize))/fontx;float y=float(mod(gl_FragCoord.y,caracterSize))/fonty;vec4 finalColor= texture2D(asciiArtFont,vec2(offsetx+x,offsety+(caracterSize/fonty-y)));finalColor.rgb*=tileColor.rgb;finalColor.a=1.0;finalColor= mix(finalColor,tileColor,asciiArtOptions.w);finalColor= mix(finalColor,baseColor,asciiArtOptions.z);gl_FragColor=finalColor;}";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var asciiartPixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/postProcesses/src/asciiArt/index.ts":
/*!********************************************************!*\
  !*** ../../../dev/postProcesses/src/asciiArt/index.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsciiArtFontTexture: () => (/* reexport safe */ _asciiArtPostProcess__WEBPACK_IMPORTED_MODULE_0__.AsciiArtFontTexture),
/* harmony export */   AsciiArtPostProcess: () => (/* reexport safe */ _asciiArtPostProcess__WEBPACK_IMPORTED_MODULE_0__.AsciiArtPostProcess)
/* harmony export */ });
/* harmony import */ var _asciiArtPostProcess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./asciiArtPostProcess */ "../../../dev/postProcesses/src/asciiArt/asciiArtPostProcess.ts");



/***/ }),

/***/ "../../../dev/postProcesses/src/digitalRain/digitalRainPostProcess.ts":
/*!****************************************************************************!*\
  !*** ../../../dev/postProcesses/src/digitalRain/digitalRainPostProcess.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DigitalRainFontTexture: () => (/* binding */ DigitalRainFontTexture),
/* harmony export */   DigitalRainPostProcess: () => (/* binding */ DigitalRainPostProcess)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/Extensions/engine.dynamicTexture */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _digitalrain_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./digitalrain.fragment */ "../../../dev/postProcesses/src/digitalRain/digitalrain.fragment.ts");









/**
 * DigitalRainFontTexture is the helper class used to easily create your digital rain font texture.
 *
 * It basically takes care rendering the font front the given font size to a texture.
 * This is used later on in the postprocess.
 */
var DigitalRainFontTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(DigitalRainFontTexture, _super);
    /**
     * Create a new instance of the Digital Rain FontTexture class
     * @param name the name of the texture
     * @param font the font to use, use the W3C CSS notation
     * @param text the caracter set to use in the rendering.
     * @param scene the scene that owns the texture
     */
    function DigitalRainFontTexture(name, font, text, scene) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, scene) || this;
        scene = _this.getScene();
        if (!scene) {
            return _this;
        }
        _this.name = name;
        _this._text == text;
        _this._font == font;
        _this.wrapU = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Texture.CLAMP_ADDRESSMODE;
        _this.wrapV = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Texture.CLAMP_ADDRESSMODE;
        // Get the font specific info.
        var maxCharHeight = _this._getFontHeight(font);
        var maxCharWidth = _this._getFontWidth(font);
        _this._charSize = Math.max(maxCharHeight.height, maxCharWidth);
        // This is an approximate size, but should always be able to fit at least the maxCharCount.
        var textureWidth = _this._charSize;
        var textureHeight = Math.ceil(_this._charSize * text.length);
        // Create the texture that will store the font characters.
        _this._texture = scene.getEngine().createDynamicTexture(textureWidth, textureHeight, false, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_SAMPLINGMODE);
        //scene.getEngine().setclamp
        var textureSize = _this.getSize();
        // Create a canvas with the final size: the one matching the texture.
        var canvas = document.createElement("canvas");
        canvas.width = textureSize.width;
        canvas.height = textureSize.height;
        var context = canvas.getContext("2d");
        context.textBaseline = "top";
        context.font = font;
        context.fillStyle = "white";
        context.imageSmoothingEnabled = false;
        // Sets the text in the texture.
        for (var i = 0; i < text.length; i++) {
            context.fillText(text[i], 0, i * _this._charSize - maxCharHeight.offset);
        }
        // Flush the text in the dynamic texture.
        scene.getEngine().updateDynamicTexture(_this._texture, canvas, false, true);
        return _this;
    }
    Object.defineProperty(DigitalRainFontTexture.prototype, "charSize", {
        /**
         * Gets the size of one char in the texture (each char fits in size * size space in the texture).
         */
        get: function () {
            return this._charSize;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets the max char width of a font.
     * @param font the font to use, use the W3C CSS notation
     * @returns the max char width
     */
    DigitalRainFontTexture.prototype._getFontWidth = function (font) {
        var fontDraw = document.createElement("canvas");
        var ctx = fontDraw.getContext("2d");
        ctx.fillStyle = "white";
        ctx.font = font;
        return ctx.measureText("W").width;
    };
    // More info here: https://videlais.com/2014/03/16/the-many-and-varied-problems-with-measuring-font-height-for-html5-canvas/
    /**
     * Gets the max char height of a font.
     * @param font the font to use, use the W3C CSS notation
     * @returns the max char height
     */
    DigitalRainFontTexture.prototype._getFontHeight = function (font) {
        var fontDraw = document.createElement("canvas");
        var ctx = fontDraw.getContext("2d");
        ctx.fillRect(0, 0, fontDraw.width, fontDraw.height);
        ctx.textBaseline = "top";
        ctx.fillStyle = "white";
        ctx.font = font;
        ctx.fillText("jH|", 0, 0);
        var pixels = ctx.getImageData(0, 0, fontDraw.width, fontDraw.height).data;
        var start = -1;
        var end = -1;
        for (var row = 0; row < fontDraw.height; row++) {
            for (var column = 0; column < fontDraw.width; column++) {
                var index = (row * fontDraw.width + column) * 4;
                if (pixels[index] === 0) {
                    if (column === fontDraw.width - 1 && start !== -1) {
                        end = row;
                        row = fontDraw.height;
                        break;
                    }
                    continue;
                }
                else {
                    if (start === -1) {
                        start = row;
                    }
                    break;
                }
            }
        }
        return { height: end - start + 1, offset: start - 1 };
    };
    /**
     * Clones the current DigitalRainFontTexture.
     * @returns the clone of the texture.
     */
    DigitalRainFontTexture.prototype.clone = function () {
        return new DigitalRainFontTexture(this.name, this._font, this._text, this.getScene());
    };
    /**
     * Parses a json object representing the texture and returns an instance of it.
     * @param source the source JSON representation
     * @param scene the scene to create the texture for
     * @returns the parsed texture
     */
    DigitalRainFontTexture.Parse = function (source, scene) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new DigitalRainFontTexture(source.name, source.font, source.text, scene); }, source, scene, null);
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)("font")
    ], DigitalRainFontTexture.prototype, "_font", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)("text")
    ], DigitalRainFontTexture.prototype, "_text", void 0);
    return DigitalRainFontTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.BaseTexture));
/**
 * DigitalRainPostProcess helps rendering everithing in digital rain.
 *
 * Simmply add it to your scene and let the nerd that lives in you have fun.
 * Example usage: var pp = new DigitalRainPostProcess("digitalRain", "20px Monospace", camera);
 */
var DigitalRainPostProcess = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(DigitalRainPostProcess, _super);
    /**
     * Instantiates a new Digital Rain Post Process.
     * @param name the name to give to the postprocess
     * @camera the camera to apply the post process to.
     * @param camera
     * @param options can either be the font name or an option object following the IDigitalRainPostProcessOptions format
     */
    function DigitalRainPostProcess(name, camera, options) {
        var _this = _super.call(this, name, "digitalrain", ["digitalRainFontInfos", "digitalRainOptions", "cosTimeZeroOne", "matrixSpeed"], ["digitalRainFont"], 1.0, camera, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Texture.TRILINEAR_SAMPLINGMODE, undefined, true) || this;
        /**
         * This defines the amount you want to mix the "tile" or caracter space colored in the digital rain.
         * This number is defined between 0 and 1;
         */
        _this.mixToTile = 0;
        /**
         * This defines the amount you want to mix the normal rendering pass in the digital rain.
         * This number is defined between 0 and 1;
         */
        _this.mixToNormal = 0;
        /**
         * Speed of the effect
         */
        _this.speed = 0.003;
        // Default values.
        var font = "15px Monospace";
        var characterSet = "古池や蛙飛び込む水の音ふるいけやかわずとびこむみずのおと初しぐれ猿も小蓑をほしげ也はつしぐれさるもこみのをほしげなり江戸の雨何石呑んだ時鳥えどのあめなんごくのんだほととぎす";
        // Use options.
        if (options) {
            if (typeof options === "string") {
                font = options;
            }
            else {
                font = options.font || font;
                _this.mixToTile = options.mixToTile || _this.mixToTile;
                _this.mixToNormal = options.mixToNormal || _this.mixToNormal;
            }
        }
        var scene = (camera === null || camera === void 0 ? void 0 : camera.getScene()) || null;
        _this._digitalRainFontTexture = new DigitalRainFontTexture(name, font, characterSet, scene);
        var textureSize = _this._digitalRainFontTexture.getSize();
        var alpha = 0.0;
        var cosTimeZeroOne = 0.0;
        var matrix = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Matrix.FromValues(Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random());
        _this.onApply = function (effect) {
            effect.setTexture("digitalRainFont", _this._digitalRainFontTexture);
            effect.setFloat4("digitalRainFontInfos", _this._digitalRainFontTexture.charSize, characterSet.length, textureSize.width, textureSize.height);
            effect.setFloat4("digitalRainOptions", _this.width, _this.height, _this.mixToNormal, _this.mixToTile);
            effect.setMatrix("matrixSpeed", matrix);
            alpha += _this.speed;
            cosTimeZeroOne = alpha;
            effect.setFloat("cosTimeZeroOne", cosTimeZeroOne);
        };
        return _this;
    }
    return DigitalRainPostProcess;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PostProcess));



/***/ }),

/***/ "../../../dev/postProcesses/src/digitalRain/digitalrain.fragment.ts":
/*!**************************************************************************!*\
  !*** ../../../dev/postProcesses/src/digitalRain/digitalrain.fragment.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   digitalrainPixelShader: () => (/* binding */ digitalrainPixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "digitalrainPixelShader";
var shader = "varying vec2 vUV;uniform sampler2D textureSampler;uniform sampler2D digitalRainFont;uniform vec4 digitalRainFontInfos;uniform vec4 digitalRainOptions;uniform mat4 matrixSpeed;uniform float cosTimeZeroOne;float getLuminance(vec3 color)\n{return clamp(dot(color,vec3(0.2126,0.7152,0.0722)),0.,1.);}\n#define CUSTOM_FRAGMENT_DEFINITIONS\nvoid main(void) \n{float caracterSize=digitalRainFontInfos.x;float numChar=digitalRainFontInfos.y-1.0;float fontx=digitalRainFontInfos.z;float fonty=digitalRainFontInfos.w;float screenx=digitalRainOptions.x;float screeny=digitalRainOptions.y;float ratio=screeny/fonty;float columnx=float(floor((gl_FragCoord.x)/caracterSize));float tileX=float(floor((gl_FragCoord.x)/caracterSize))*caracterSize/screenx;float tileY=float(floor((gl_FragCoord.y)/caracterSize))*caracterSize/screeny;vec2 tileUV=vec2(tileX,tileY);vec4 tileColor=texture2D(textureSampler,tileUV);vec4 baseColor=texture2D(textureSampler,vUV);float tileLuminance=getLuminance(tileColor.rgb);int st=int(mod(columnx,4.0));float speed=cosTimeZeroOne*(sin(tileX*314.5)*0.5+0.6); \nfloat x=float(mod(gl_FragCoord.x,caracterSize))/fontx;float y=float(mod(speed+gl_FragCoord.y/screeny,1.0));y*=ratio;vec4 finalColor= texture2D(digitalRainFont,vec2(x,1.0-y));vec3 high=finalColor.rgb*(vec3(1.2,1.2,1.2)*pow(1.0-y,30.0));finalColor.rgb*=vec3(pow(tileLuminance,5.0),pow(tileLuminance,1.5),pow(tileLuminance,3.0));finalColor.rgb+=high;finalColor.rgb=clamp(finalColor.rgb,0.,1.);finalColor.a=1.0;finalColor= mix(finalColor,tileColor,digitalRainOptions.w);finalColor= mix(finalColor,baseColor,digitalRainOptions.z);gl_FragColor=finalColor;}";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var digitalrainPixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/postProcesses/src/digitalRain/index.ts":
/*!***********************************************************!*\
  !*** ../../../dev/postProcesses/src/digitalRain/index.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DigitalRainFontTexture: () => (/* reexport safe */ _digitalRainPostProcess__WEBPACK_IMPORTED_MODULE_0__.DigitalRainFontTexture),
/* harmony export */   DigitalRainPostProcess: () => (/* reexport safe */ _digitalRainPostProcess__WEBPACK_IMPORTED_MODULE_0__.DigitalRainPostProcess)
/* harmony export */ });
/* harmony import */ var _digitalRainPostProcess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./digitalRainPostProcess */ "../../../dev/postProcesses/src/digitalRain/digitalRainPostProcess.ts");



/***/ }),

/***/ "../../../dev/postProcesses/src/index.ts":
/*!***********************************************!*\
  !*** ../../../dev/postProcesses/src/index.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsciiArtFontTexture: () => (/* reexport safe */ _asciiArt_index__WEBPACK_IMPORTED_MODULE_0__.AsciiArtFontTexture),
/* harmony export */   AsciiArtPostProcess: () => (/* reexport safe */ _asciiArt_index__WEBPACK_IMPORTED_MODULE_0__.AsciiArtPostProcess),
/* harmony export */   DigitalRainFontTexture: () => (/* reexport safe */ _digitalRain_index__WEBPACK_IMPORTED_MODULE_1__.DigitalRainFontTexture),
/* harmony export */   DigitalRainPostProcess: () => (/* reexport safe */ _digitalRain_index__WEBPACK_IMPORTED_MODULE_1__.DigitalRainPostProcess)
/* harmony export */ });
/* harmony import */ var _asciiArt_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./asciiArt/index */ "../../../dev/postProcesses/src/asciiArt/index.ts");
/* harmony import */ var _digitalRain_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./digitalRain/index */ "../../../dev/postProcesses/src/digitalRain/index.ts");
/* eslint-disable import/no-internal-modules */




/***/ }),

/***/ "../../../lts/postProcesses/src/legacy/legacy.ts":
/*!*******************************************************!*\
  !*** ../../../lts/postProcesses/src/legacy/legacy.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsciiArtFontTexture: () => (/* reexport safe */ post_processes_index__WEBPACK_IMPORTED_MODULE_0__.AsciiArtFontTexture),
/* harmony export */   AsciiArtPostProcess: () => (/* reexport safe */ post_processes_index__WEBPACK_IMPORTED_MODULE_0__.AsciiArtPostProcess),
/* harmony export */   DigitalRainFontTexture: () => (/* reexport safe */ post_processes_index__WEBPACK_IMPORTED_MODULE_0__.DigitalRainFontTexture),
/* harmony export */   DigitalRainPostProcess: () => (/* reexport safe */ post_processes_index__WEBPACK_IMPORTED_MODULE_0__.DigitalRainPostProcess)
/* harmony export */ });
/* harmony import */ var post_processes_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! post-processes/index */ "../../../dev/postProcesses/src/index.ts");
/* eslint-disable import/no-internal-modules */

/**
 *
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var key in post_processes_index__WEBPACK_IMPORTED_MODULE_0__) {
        globalObject.BABYLON[key] = post_processes_index__WEBPACK_IMPORTED_MODULE_0__[key];
    }
}



/***/ }),

/***/ "babylonjs/Misc/decorators":
/*!****************************************************************************************************!*\
  !*** external {"root":"BABYLON","commonjs":"babylonjs","commonjs2":"babylonjs","amd":"babylonjs"} ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_decorators__;

/***/ }),

/***/ "../../../../node_modules/tslib/tslib.es6.mjs":
/*!****************************************************!*\
  !*** ../../../../node_modules/tslib/tslib.es6.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addDisposableResource: () => (/* binding */ __addDisposableResource),
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldIn: () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __disposeResources: () => (/* binding */ __disposeResources),
/* harmony export */   __esDecorate: () => (/* binding */ __esDecorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __propKey: () => (/* binding */ __propKey),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __runInitializers: () => (/* binding */ __runInitializers),
/* harmony export */   __setFunctionName: () => (/* binding */ __setFunctionName),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
  function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
  function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
      }
      catch (e) {
          fail(e);
      }
    }
    if (env.hasError) throw env.error;
  }
  return next();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   postProcess: () => (/* reexport module object */ _lts_post_processes_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_post_processes_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/post-processes/legacy/legacy */ "../../../lts/postProcesses/src/legacy/legacy.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_post_processes_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__);

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbmpzLnBvc3RQcm9jZXNzLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQUE7QUFnQkE7Ozs7OztBQU1BO0FBQ0E7QUFBQTtBQUFBO0FBR0E7QUFFQTs7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7O0FBQ0E7QUE3REE7QUFIQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUE2REE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUEvSUE7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBNklBO0FBQUE7QUE2QkE7Ozs7O0FBS0E7QUFDQTtBQUFBO0FBa0JBOzs7Ozs7QUFNQTtBQUNBO0FBQUE7QUFuQkE7OztBQUdBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQVlBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7O0FBQ0E7QUFDQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvUEE7QUFDQTtBQUVBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFBQTtBQWdCQTs7Ozs7O0FBTUE7QUFDQTtBQUFBO0FBQUE7QUFHQTtBQUVBOztBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7O0FBQ0E7QUEzREE7QUFIQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUEyREE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUE3SUE7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBMklBO0FBQUE7QUF3QkE7Ozs7O0FBS0E7QUFDQTtBQUFBO0FBdUJBOzs7Ozs7QUFNQTtBQUNBO0FBQUE7QUF4QkE7OztBQUdBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFzQkE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQW1CQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuU0E7QUFDQTtBQUVBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7OztBQ2ZBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3BYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vUE9TVFBST0NFU1NFUy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vUE9TVFBST0NFU1NFUy8uLi8uLi8uLi9kZXYvcG9zdFByb2Nlc3Nlcy9zcmMvYXNjaWlBcnQvYXNjaWlBcnRQb3N0UHJvY2Vzcy50cyIsIndlYnBhY2s6Ly9QT1NUUFJPQ0VTU0VTLy4uLy4uLy4uL2Rldi9wb3N0UHJvY2Vzc2VzL3NyYy9hc2NpaUFydC9hc2NpaWFydC5mcmFnbWVudC50cyIsIndlYnBhY2s6Ly9QT1NUUFJPQ0VTU0VTLy4uLy4uLy4uL2Rldi9wb3N0UHJvY2Vzc2VzL3NyYy9hc2NpaUFydC9pbmRleC50cyIsIndlYnBhY2s6Ly9QT1NUUFJPQ0VTU0VTLy4uLy4uLy4uL2Rldi9wb3N0UHJvY2Vzc2VzL3NyYy9kaWdpdGFsUmFpbi9kaWdpdGFsUmFpblBvc3RQcm9jZXNzLnRzIiwid2VicGFjazovL1BPU1RQUk9DRVNTRVMvLi4vLi4vLi4vZGV2L3Bvc3RQcm9jZXNzZXMvc3JjL2RpZ2l0YWxSYWluL2RpZ2l0YWxyYWluLmZyYWdtZW50LnRzIiwid2VicGFjazovL1BPU1RQUk9DRVNTRVMvLi4vLi4vLi4vZGV2L3Bvc3RQcm9jZXNzZXMvc3JjL2RpZ2l0YWxSYWluL2luZGV4LnRzIiwid2VicGFjazovL1BPU1RQUk9DRVNTRVMvLi4vLi4vLi4vZGV2L3Bvc3RQcm9jZXNzZXMvc3JjL2luZGV4LnRzIiwid2VicGFjazovL1BPU1RQUk9DRVNTRVMvLi4vLi4vLi4vbHRzL3Bvc3RQcm9jZXNzZXMvc3JjL2xlZ2FjeS9sZWdhY3kudHMiLCJ3ZWJwYWNrOi8vUE9TVFBST0NFU1NFUy9leHRlcm5hbCB1bWQge1wicm9vdFwiOlwiQkFCWUxPTlwiLFwiY29tbW9uanNcIjpcImJhYnlsb25qc1wiLFwiY29tbW9uanMyXCI6XCJiYWJ5bG9uanNcIixcImFtZFwiOlwiYmFieWxvbmpzXCJ9Iiwid2VicGFjazovL1BPU1RQUk9DRVNTRVMvLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5tanMiLCJ3ZWJwYWNrOi8vUE9TVFBST0NFU1NFUy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9QT1NUUFJPQ0VTU0VTL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL1BPU1RQUk9DRVNTRVMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1BPU1RQUk9DRVNTRVMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9QT1NUUFJPQ0VTU0VTL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vUE9TVFBST0NFU1NFUy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1BPU1RQUk9DRVNTRVMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYmFieWxvbmpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiYmFieWxvbmpzLXBvc3QtcHJvY2Vzc1wiLCBbXCJiYWJ5bG9uanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYmFieWxvbmpzLXBvc3QtcHJvY2Vzc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImJhYnlsb25qc1wiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiUE9TVFBST0NFU1NFU1wiXSA9IGZhY3Rvcnkocm9vdFtcIkJBQllMT05cIl0pO1xufSkoKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0aGlzKSwgKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmFieWxvbmpzX01pc2NfZGVjb3JhdG9yc19fKSA9PiB7XG5yZXR1cm4gIiwiaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcbmltcG9ydCB7IHNlcmlhbGl6ZSB9IGZyb20gXCJjb3JlL01pc2MvZGVjb3JhdG9yc1wiO1xyXG5pbXBvcnQgeyBTZXJpYWxpemF0aW9uSGVscGVyIH0gZnJvbSBcImNvcmUvTWlzYy9kZWNvcmF0b3JzLnNlcmlhbGl6YXRpb25cIjtcclxuaW1wb3J0IHR5cGUgeyBDYW1lcmEgfSBmcm9tIFwiY29yZS9DYW1lcmFzL2NhbWVyYVwiO1xyXG5pbXBvcnQgeyBCYXNlVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9iYXNlVGV4dHVyZVwiO1xyXG5pbXBvcnQgeyBUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL3RleHR1cmVcIjtcclxuaW1wb3J0IHR5cGUgeyBFZmZlY3QgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvZWZmZWN0XCI7XHJcbmltcG9ydCB7IFBvc3RQcm9jZXNzIH0gZnJvbSBcImNvcmUvUG9zdFByb2Nlc3Nlcy9wb3N0UHJvY2Vzc1wiO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuaW1wb3J0IFwiY29yZS9FbmdpbmVzL0V4dGVuc2lvbnMvZW5naW5lLmR5bmFtaWNUZXh0dXJlXCI7XHJcbmltcG9ydCBcIi4vYXNjaWlhcnQuZnJhZ21lbnRcIjtcclxuXHJcbi8qKlxyXG4gKiBBc2NpaUFydEZvbnRUZXh0dXJlIGlzIHRoZSBoZWxwZXIgY2xhc3MgdXNlZCB0byBlYXNpbHkgY3JlYXRlIHlvdXIgYXNjaWkgYXJ0IGZvbnQgdGV4dHVyZS5cclxuICpcclxuICogSXQgYmFzaWNhbGx5IHRha2VzIGNhcmUgcmVuZGVyaW5nIHRoZSBmb250IGZyb250IHRoZSBnaXZlbiBmb250IHNpemUgdG8gYSB0ZXh0dXJlLlxyXG4gKiBUaGlzIGlzIHVzZWQgbGF0ZXIgb24gaW4gdGhlIHBvc3Rwcm9jZXNzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFzY2lpQXJ0Rm9udFRleHR1cmUgZXh0ZW5kcyBCYXNlVGV4dHVyZSB7XHJcbiAgICBAc2VyaWFsaXplKFwiZm9udFwiKVxyXG4gICAgcHJpdmF0ZSBfZm9udDogc3RyaW5nO1xyXG5cclxuICAgIEBzZXJpYWxpemUoXCJ0ZXh0XCIpXHJcbiAgICBwcml2YXRlIF90ZXh0OiBzdHJpbmc7XHJcblxyXG4gICAgcHJpdmF0ZSBfY2hhclNpemU6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHNpemUgb2Ygb25lIGNoYXIgaW4gdGhlIHRleHR1cmUgKGVhY2ggY2hhciBmaXRzIGluIHNpemUgKiBzaXplIHNwYWNlIGluIHRoZSB0ZXh0dXJlKS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjaGFyU2l6ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jaGFyU2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgQXNjaWkgQXJ0IEZvbnRUZXh0dXJlIGNsYXNzXHJcbiAgICAgKiBAcGFyYW0gbmFtZSB0aGUgbmFtZSBvZiB0aGUgdGV4dHVyZVxyXG4gICAgICogQHBhcmFtIGZvbnQgdGhlIGZvbnQgdG8gdXNlLCB1c2UgdGhlIFczQyBDU1Mgbm90YXRpb25cclxuICAgICAqIEBwYXJhbSB0ZXh0IHRoZSBjYXJhY3RlciBzZXQgdG8gdXNlIGluIHRoZSByZW5kZXJpbmcuXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgdGhlIHNjZW5lIHRoYXQgb3ducyB0aGUgdGV4dHVyZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGZvbnQ6IHN0cmluZywgdGV4dDogc3RyaW5nLCBzY2VuZTogTnVsbGFibGU8U2NlbmU+ID0gbnVsbCkge1xyXG4gICAgICAgIHN1cGVyKHNjZW5lKTtcclxuXHJcbiAgICAgICAgc2NlbmUgPSB0aGlzLmdldFNjZW5lKCk7XHJcblxyXG4gICAgICAgIGlmICghc2NlbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLl90ZXh0ID09IHRleHQ7XHJcbiAgICAgICAgdGhpcy5fZm9udCA9PSBmb250O1xyXG5cclxuICAgICAgICB0aGlzLndyYXBVID0gVGV4dHVyZS5DTEFNUF9BRERSRVNTTU9ERTtcclxuICAgICAgICB0aGlzLndyYXBWID0gVGV4dHVyZS5DTEFNUF9BRERSRVNTTU9ERTtcclxuICAgICAgICAvL3RoaXMuYW5pc290cm9waWNGaWx0ZXJpbmdMZXZlbCA9IDE7XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgZm9udCBzcGVjaWZpYyBpbmZvLlxyXG4gICAgICAgIGNvbnN0IG1heENoYXJIZWlnaHQgPSB0aGlzLl9nZXRGb250SGVpZ2h0KGZvbnQpO1xyXG4gICAgICAgIGNvbnN0IG1heENoYXJXaWR0aCA9IHRoaXMuX2dldEZvbnRXaWR0aChmb250KTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2hhclNpemUgPSBNYXRoLm1heChtYXhDaGFySGVpZ2h0LmhlaWdodCwgbWF4Q2hhcldpZHRoKTtcclxuXHJcbiAgICAgICAgLy8gVGhpcyBpcyBhbiBhcHByb3hpbWF0ZSBzaXplLCBidXQgc2hvdWxkIGFsd2F5cyBiZSBhYmxlIHRvIGZpdCBhdCBsZWFzdCB0aGUgbWF4Q2hhckNvdW50LlxyXG4gICAgICAgIGNvbnN0IHRleHR1cmVXaWR0aCA9IE1hdGguY2VpbCh0aGlzLl9jaGFyU2l6ZSAqIHRleHQubGVuZ3RoKTtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlSGVpZ2h0ID0gdGhpcy5fY2hhclNpemU7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgdGV4dHVyZSB0aGF0IHdpbGwgc3RvcmUgdGhlIGZvbnQgY2hhcmFjdGVycy5cclxuICAgICAgICB0aGlzLl90ZXh0dXJlID0gc2NlbmUuZ2V0RW5naW5lKCkuY3JlYXRlRHluYW1pY1RleHR1cmUodGV4dHVyZVdpZHRoLCB0ZXh0dXJlSGVpZ2h0LCBmYWxzZSwgVGV4dHVyZS5ORUFSRVNUX1NBTVBMSU5HTU9ERSk7XHJcbiAgICAgICAgLy9zY2VuZS5nZXRFbmdpbmUoKS5zZXRjbGFtcFxyXG4gICAgICAgIGNvbnN0IHRleHR1cmVTaXplID0gdGhpcy5nZXRTaXplKCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhIGNhbnZhcyB3aXRoIHRoZSBmaW5hbCBzaXplOiB0aGUgb25lIG1hdGNoaW5nIHRoZSB0ZXh0dXJlLlxyXG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgY2FudmFzLndpZHRoID0gdGV4dHVyZVNpemUud2lkdGg7XHJcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHRleHR1cmVTaXplLmhlaWdodDtcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gPENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRD5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIGNvbnRleHQudGV4dEJhc2VsaW5lID0gXCJ0b3BcIjtcclxuICAgICAgICBjb250ZXh0LmZvbnQgPSBmb250O1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIGNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIFNldHMgdGhlIHRleHQgaW4gdGhlIHRleHR1cmUuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFRleHQodGV4dFtpXSwgaSAqIHRoaXMuX2NoYXJTaXplLCAtbWF4Q2hhckhlaWdodC5vZmZzZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRmx1c2ggdGhlIHRleHQgaW4gdGhlIGR5bmFtaWMgdGV4dHVyZS5cclxuXHJcbiAgICAgICAgc2NlbmUuZ2V0RW5naW5lKCkudXBkYXRlRHluYW1pY1RleHR1cmUodGhpcy5fdGV4dHVyZSwgY2FudmFzLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBtYXggY2hhciB3aWR0aCBvZiBhIGZvbnQuXHJcbiAgICAgKiBAcGFyYW0gZm9udCB0aGUgZm9udCB0byB1c2UsIHVzZSB0aGUgVzNDIENTUyBub3RhdGlvblxyXG4gICAgICogQHJldHVybnMgdGhlIG1heCBjaGFyIHdpZHRoXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2dldEZvbnRXaWR0aChmb250OiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IGZvbnREcmF3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICBjb25zdCBjdHggPSA8Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEPmZvbnREcmF3LmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIGN0eC5mb250ID0gZm9udDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGN0eC5tZWFzdXJlVGV4dChcIldcIikud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTW9yZSBpbmZvIGhlcmU6IGh0dHBzOi8vdmlkZWxhaXMuY29tLzIwMTQvMDMvMTYvdGhlLW1hbnktYW5kLXZhcmllZC1wcm9ibGVtcy13aXRoLW1lYXN1cmluZy1mb250LWhlaWdodC1mb3ItaHRtbDUtY2FudmFzL1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBtYXggY2hhciBoZWlnaHQgb2YgYSBmb250LlxyXG4gICAgICogQHBhcmFtIGZvbnQgdGhlIGZvbnQgdG8gdXNlLCB1c2UgdGhlIFczQyBDU1Mgbm90YXRpb25cclxuICAgICAqIEByZXR1cm5zIHRoZSBtYXggY2hhciBoZWlnaHRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZ2V0Rm9udEhlaWdodChmb250OiBzdHJpbmcpOiB7IGhlaWdodDogbnVtYmVyOyBvZmZzZXQ6IG51bWJlciB9IHtcclxuICAgICAgICBjb25zdCBmb250RHJhdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gPENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRD5mb250RHJhdy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGZvbnREcmF3LndpZHRoLCBmb250RHJhdy5oZWlnaHQpO1xyXG4gICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgY3R4LmZvbnQgPSBmb250O1xyXG4gICAgICAgIGN0eC5maWxsVGV4dChcImpIfFwiLCAwLCAwKTtcclxuICAgICAgICBjb25zdCBwaXhlbHMgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGZvbnREcmF3LndpZHRoLCBmb250RHJhdy5oZWlnaHQpLmRhdGE7XHJcbiAgICAgICAgbGV0IHN0YXJ0ID0gLTE7XHJcbiAgICAgICAgbGV0IGVuZCA9IC0xO1xyXG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IGZvbnREcmF3LmhlaWdodDsgcm93KyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgZm9udERyYXcud2lkdGg7IGNvbHVtbisrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IChyb3cgKiBmb250RHJhdy53aWR0aCArIGNvbHVtbikgKiA0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHBpeGVsc1tpbmRleF0gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29sdW1uID09PSBmb250RHJhdy53aWR0aCAtIDEgJiYgc3RhcnQgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IHJvdztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93ID0gZm9udERyYXcuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFydCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSByb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7IGhlaWdodDogZW5kIC0gc3RhcnQgKyAxLCBvZmZzZXQ6IHN0YXJ0IC0gMSB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvbmVzIHRoZSBjdXJyZW50IEFzY2lpQXJ0VGV4dHVyZS5cclxuICAgICAqIEByZXR1cm5zIHRoZSBjbG9uZSBvZiB0aGUgdGV4dHVyZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIG92ZXJyaWRlIGNsb25lKCk6IEFzY2lpQXJ0Rm9udFRleHR1cmUge1xyXG4gICAgICAgIHJldHVybiBuZXcgQXNjaWlBcnRGb250VGV4dHVyZSh0aGlzLm5hbWUsIHRoaXMuX2ZvbnQsIHRoaXMuX3RleHQsIHRoaXMuZ2V0U2NlbmUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZXMgYSBqc29uIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHRleHR1cmUgYW5kIHJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXQuXHJcbiAgICAgKiBAcGFyYW0gc291cmNlIHRoZSBzb3VyY2UgSlNPTiByZXByZXNlbnRhdGlvblxyXG4gICAgICogQHBhcmFtIHNjZW5lIHRoZSBzY2VuZSB0byBjcmVhdGUgdGhlIHRleHR1cmUgZm9yXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgcGFyc2VkIHRleHR1cmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBQYXJzZShzb3VyY2U6IGFueSwgc2NlbmU6IFNjZW5lKTogQXNjaWlBcnRGb250VGV4dHVyZSB7XHJcbiAgICAgICAgY29uc3QgdGV4dHVyZSA9IFNlcmlhbGl6YXRpb25IZWxwZXIuUGFyc2UoKCkgPT4gbmV3IEFzY2lpQXJ0Rm9udFRleHR1cmUoc291cmNlLm5hbWUsIHNvdXJjZS5mb250LCBzb3VyY2UudGV4dCwgc2NlbmUpLCBzb3VyY2UsIHNjZW5lLCBudWxsKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRleHR1cmU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBPcHRpb24gYXZhaWxhYmxlIGluIHRoZSBBc2NpaSBBcnQgUG9zdCBQcm9jZXNzLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJQXNjaWlBcnRQb3N0UHJvY2Vzc09wdGlvbnMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZm9udCB0byB1c2UgZm9sbG93aW5nIHRoZSB3M2MgZm9udCBkZWZpbml0aW9uLlxyXG4gICAgICovXHJcbiAgICBmb250Pzogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNoYXJhY3RlciBzZXQgdG8gdXNlIGluIHRoZSBwb3N0cHJvY2Vzcy5cclxuICAgICAqL1xyXG4gICAgY2hhcmFjdGVyU2V0Pzogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBkZWZpbmVzIHRoZSBhbW91bnQgeW91IHdhbnQgdG8gbWl4IHRoZSBcInRpbGVcIiBvciBjYXJhY3RlciBzcGFjZSBjb2xvcmVkIGluIHRoZSBhc2NpaSBhcnQuXHJcbiAgICAgKiBUaGlzIG51bWJlciBpcyBkZWZpbmVkIGJldHdlZW4gMCBhbmQgMTtcclxuICAgICAqL1xyXG4gICAgbWl4VG9UaWxlPzogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBkZWZpbmVzIHRoZSBhbW91bnQgeW91IHdhbnQgdG8gbWl4IHRoZSBub3JtYWwgcmVuZGVyaW5nIHBhc3MgaW4gdGhlIGFzY2lpIGFydC5cclxuICAgICAqIFRoaXMgbnVtYmVyIGlzIGRlZmluZWQgYmV0d2VlbiAwIGFuZCAxO1xyXG4gICAgICovXHJcbiAgICBtaXhUb05vcm1hbD86IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFzY2lpQXJ0UG9zdFByb2Nlc3MgaGVscHMgcmVuZGVyaW5nIGV2ZXJpdGhpbmcgaW4gQXNjaWkgQXJ0LlxyXG4gKlxyXG4gKiBTaW1tcGx5IGFkZCBpdCB0byB5b3VyIHNjZW5lIGFuZCBsZXQgdGhlIG5lcmQgdGhhdCBsaXZlcyBpbiB5b3UgaGF2ZSBmdW4uXHJcbiAqIEV4YW1wbGUgdXNhZ2U6IHZhciBwcCA9IG5ldyBBc2NpaUFydFBvc3RQcm9jZXNzKFwibXlBc2NpaVwiLCBcIjIwcHggTW9ub3NwYWNlXCIsIGNhbWVyYSk7XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXNjaWlBcnRQb3N0UHJvY2VzcyBleHRlbmRzIFBvc3RQcm9jZXNzIHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGZvbnQgdGV4dHVyZSB1c2VkIHRvIHJlbmRlciB0aGUgY2hhciBpbiB0aGUgcG9zdCBwcm9jZXNzLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9hc2NpaUFydEZvbnRUZXh0dXJlOiBBc2NpaUFydEZvbnRUZXh0dXJlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBkZWZpbmVzIHRoZSBhbW91bnQgeW91IHdhbnQgdG8gbWl4IHRoZSBcInRpbGVcIiBvciBjYXJhY3RlciBzcGFjZSBjb2xvcmVkIGluIHRoZSBhc2NpaSBhcnQuXHJcbiAgICAgKiBUaGlzIG51bWJlciBpcyBkZWZpbmVkIGJldHdlZW4gMCBhbmQgMTtcclxuICAgICAqL1xyXG4gICAgcHVibGljIG1peFRvVGlsZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZGVmaW5lcyB0aGUgYW1vdW50IHlvdSB3YW50IHRvIG1peCB0aGUgbm9ybWFsIHJlbmRlcmluZyBwYXNzIGluIHRoZSBhc2NpaSBhcnQuXHJcbiAgICAgKiBUaGlzIG51bWJlciBpcyBkZWZpbmVkIGJldHdlZW4gMCBhbmQgMTtcclxuICAgICAqL1xyXG4gICAgcHVibGljIG1peFRvTm9ybWFsOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5zdGFudGlhdGVzIGEgbmV3IEFzY2lpIEFydCBQb3N0IFByb2Nlc3MuXHJcbiAgICAgKiBAcGFyYW0gbmFtZSB0aGUgbmFtZSB0byBnaXZlIHRvIHRoZSBwb3N0cHJvY2Vzc1xyXG4gICAgICogQGNhbWVyYSB0aGUgY2FtZXJhIHRvIGFwcGx5IHRoZSBwb3N0IHByb2Nlc3MgdG8uXHJcbiAgICAgKiBAcGFyYW0gY2FtZXJhXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBjYW4gZWl0aGVyIGJlIHRoZSBmb250IG5hbWUgb3IgYW4gb3B0aW9uIG9iamVjdCBmb2xsb3dpbmcgdGhlIElBc2NpaUFydFBvc3RQcm9jZXNzT3B0aW9ucyBmb3JtYXRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBjYW1lcmE6IE51bGxhYmxlPENhbWVyYT4sIG9wdGlvbnM/OiBzdHJpbmcgfCBJQXNjaWlBcnRQb3N0UHJvY2Vzc09wdGlvbnMpIHtcclxuICAgICAgICBzdXBlcihuYW1lLCBcImFzY2lpYXJ0XCIsIFtcImFzY2lpQXJ0Rm9udEluZm9zXCIsIFwiYXNjaWlBcnRPcHRpb25zXCJdLCBbXCJhc2NpaUFydEZvbnRcIl0sIDEsIGNhbWVyYSwgVGV4dHVyZS5UUklMSU5FQVJfU0FNUExJTkdNT0RFLCB1bmRlZmluZWQsIHRydWUpO1xyXG5cclxuICAgICAgICAvLyBEZWZhdWx0IHZhbHVlcy5cclxuICAgICAgICBsZXQgZm9udCA9IFwiNDBweCBNb25vc3BhY2VcIjtcclxuICAgICAgICBsZXQgY2hhcmFjdGVyU2V0ID0gXCIgYC0uJ186LFxcXCI9Xjs8KyEqPy9jTFxcXFx6cnM3VGl2SnRDezNGKUlsKHhaZlk1UzJlYWpvMTRbbnV5RV1QNlY5a1hwS3dHaHFBVWJPZDgjSFJEQjAkbWdNVyZRJU5AXCI7XHJcblxyXG4gICAgICAgIC8vIFVzZSBvcHRpb25zLlxyXG4gICAgICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgZm9udCA9IDxzdHJpbmc+b3B0aW9ucztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvbnQgPSAoPElBc2NpaUFydFBvc3RQcm9jZXNzT3B0aW9ucz5vcHRpb25zKS5mb250IHx8IGZvbnQ7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJTZXQgPSAoPElBc2NpaUFydFBvc3RQcm9jZXNzT3B0aW9ucz5vcHRpb25zKS5jaGFyYWN0ZXJTZXQgfHwgY2hhcmFjdGVyU2V0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5taXhUb1RpbGUgPSAoPElBc2NpaUFydFBvc3RQcm9jZXNzT3B0aW9ucz5vcHRpb25zKS5taXhUb1RpbGUgfHwgdGhpcy5taXhUb1RpbGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1peFRvTm9ybWFsID0gKDxJQXNjaWlBcnRQb3N0UHJvY2Vzc09wdGlvbnM+b3B0aW9ucykubWl4VG9Ob3JtYWwgfHwgdGhpcy5taXhUb05vcm1hbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2NlbmUgPSBjYW1lcmE/LmdldFNjZW5lKCkgfHwgdGhpcy5fc2NlbmU7XHJcbiAgICAgICAgdGhpcy5fYXNjaWlBcnRGb250VGV4dHVyZSA9IG5ldyBBc2NpaUFydEZvbnRUZXh0dXJlKG5hbWUsIGZvbnQsIGNoYXJhY3RlclNldCwgc2NlbmUpO1xyXG4gICAgICAgIGNvbnN0IHRleHR1cmVTaXplID0gdGhpcy5fYXNjaWlBcnRGb250VGV4dHVyZS5nZXRTaXplKCk7XHJcblxyXG4gICAgICAgIHRoaXMub25BcHBseSA9IChlZmZlY3Q6IEVmZmVjdCkgPT4ge1xyXG4gICAgICAgICAgICBlZmZlY3Quc2V0VGV4dHVyZShcImFzY2lpQXJ0Rm9udFwiLCB0aGlzLl9hc2NpaUFydEZvbnRUZXh0dXJlKTtcclxuXHJcbiAgICAgICAgICAgIGVmZmVjdC5zZXRGbG9hdDQoXCJhc2NpaUFydEZvbnRJbmZvc1wiLCB0aGlzLl9hc2NpaUFydEZvbnRUZXh0dXJlLmNoYXJTaXplLCBjaGFyYWN0ZXJTZXQubGVuZ3RoLCB0ZXh0dXJlU2l6ZS53aWR0aCwgdGV4dHVyZVNpemUuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIGVmZmVjdC5zZXRGbG9hdDQoXCJhc2NpaUFydE9wdGlvbnNcIiwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMubWl4VG9Ob3JtYWwsIHRoaXMubWl4VG9UaWxlKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiIsIi8vIERvIG5vdCBlZGl0LlxuaW1wb3J0IHsgU2hhZGVyU3RvcmUgfSBmcm9tIFwiY29yZS9FbmdpbmVzL3NoYWRlclN0b3JlXCI7XG5cbmNvbnN0IG5hbWUgPSBcImFzY2lpYXJ0UGl4ZWxTaGFkZXJcIjtcbmNvbnN0IHNoYWRlciA9IGB2YXJ5aW5nIHZlYzIgdlVWO3VuaWZvcm0gc2FtcGxlcjJEIHRleHR1cmVTYW1wbGVyO3VuaWZvcm0gc2FtcGxlcjJEIGFzY2lpQXJ0Rm9udDt1bmlmb3JtIHZlYzQgYXNjaWlBcnRGb250SW5mb3M7dW5pZm9ybSB2ZWM0IGFzY2lpQXJ0T3B0aW9ucztmbG9hdCBnZXRMdW1pbmFuY2UodmVjMyBjb2xvcilcbntyZXR1cm4gY2xhbXAoZG90KGNvbG9yLHZlYzMoMC4yMTI2LDAuNzE1MiwwLjA3MjIpKSwwLiwxLik7fVxuI2RlZmluZSBDVVNUT01fRlJBR01FTlRfREVGSU5JVElPTlNcbnZvaWQgbWFpbih2b2lkKSBcbntmbG9hdCBjYXJhY3RlclNpemU9YXNjaWlBcnRGb250SW5mb3MueDtmbG9hdCBudW1DaGFyPWFzY2lpQXJ0Rm9udEluZm9zLnktMS4wO2Zsb2F0IGZvbnR4PWFzY2lpQXJ0Rm9udEluZm9zLno7ZmxvYXQgZm9udHk9YXNjaWlBcnRGb250SW5mb3MudztmbG9hdCBzY3JlZW54PWFzY2lpQXJ0T3B0aW9ucy54O2Zsb2F0IHNjcmVlbnk9YXNjaWlBcnRPcHRpb25zLnk7ZmxvYXQgdGlsZVg9ZmxvYXQoZmxvb3IoKGdsX0ZyYWdDb29yZC54KS9jYXJhY3RlclNpemUpKSpjYXJhY3RlclNpemUvc2NyZWVueDtmbG9hdCB0aWxlWT1mbG9hdChmbG9vcigoZ2xfRnJhZ0Nvb3JkLnkpL2NhcmFjdGVyU2l6ZSkpKmNhcmFjdGVyU2l6ZS9zY3JlZW55O3ZlYzIgdGlsZVVWPXZlYzIodGlsZVgsdGlsZVkpO3ZlYzQgdGlsZUNvbG9yPXRleHR1cmUyRCh0ZXh0dXJlU2FtcGxlcix0aWxlVVYpO3ZlYzQgYmFzZUNvbG9yPXRleHR1cmUyRCh0ZXh0dXJlU2FtcGxlcix2VVYpO2Zsb2F0IHRpbGVMdW1pbmFuY2U9Z2V0THVtaW5hbmNlKHRpbGVDb2xvci5yZ2IpO2Zsb2F0IG9mZnNldHg9KGZsb2F0KGZsb29yKHRpbGVMdW1pbmFuY2UqbnVtQ2hhcikpKSpjYXJhY3RlclNpemUvZm9udHg7ZmxvYXQgb2Zmc2V0eT0wLjA7ZmxvYXQgeD1mbG9hdChtb2QoZ2xfRnJhZ0Nvb3JkLngsY2FyYWN0ZXJTaXplKSkvZm9udHg7ZmxvYXQgeT1mbG9hdChtb2QoZ2xfRnJhZ0Nvb3JkLnksY2FyYWN0ZXJTaXplKSkvZm9udHk7dmVjNCBmaW5hbENvbG9yPSB0ZXh0dXJlMkQoYXNjaWlBcnRGb250LHZlYzIob2Zmc2V0eCt4LG9mZnNldHkrKGNhcmFjdGVyU2l6ZS9mb250eS15KSkpO2ZpbmFsQ29sb3IucmdiKj10aWxlQ29sb3IucmdiO2ZpbmFsQ29sb3IuYT0xLjA7ZmluYWxDb2xvcj0gbWl4KGZpbmFsQ29sb3IsdGlsZUNvbG9yLGFzY2lpQXJ0T3B0aW9ucy53KTtmaW5hbENvbG9yPSBtaXgoZmluYWxDb2xvcixiYXNlQ29sb3IsYXNjaWlBcnRPcHRpb25zLnopO2dsX0ZyYWdDb2xvcj1maW5hbENvbG9yO31gO1xuLy8gU2lkZWVmZmVjdFxuU2hhZGVyU3RvcmUuU2hhZGVyc1N0b3JlW25hbWVdID0gc2hhZGVyO1xuLyoqIEBpbnRlcm5hbCAqL1xuZXhwb3J0IGNvbnN0IGFzY2lpYXJ0UGl4ZWxTaGFkZXIgPSB7IG5hbWUsIHNoYWRlciB9O1xuIiwiZXhwb3J0ICogZnJvbSBcIi4vYXNjaWlBcnRQb3N0UHJvY2Vzc1wiO1xyXG4iLCJpbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgc2VyaWFsaXplIH0gZnJvbSBcImNvcmUvTWlzYy9kZWNvcmF0b3JzXCI7XHJcbmltcG9ydCB7IFNlcmlhbGl6YXRpb25IZWxwZXIgfSBmcm9tIFwiY29yZS9NaXNjL2RlY29yYXRvcnMuc2VyaWFsaXphdGlvblwiO1xyXG5pbXBvcnQgeyBNYXRyaXggfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLnZlY3RvclwiO1xyXG5pbXBvcnQgdHlwZSB7IENhbWVyYSB9IGZyb20gXCJjb3JlL0NhbWVyYXMvY2FtZXJhXCI7XHJcbmltcG9ydCB7IEJhc2VUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2Jhc2VUZXh0dXJlXCI7XHJcbmltcG9ydCB7IFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvdGV4dHVyZVwiO1xyXG5pbXBvcnQgdHlwZSB7IEVmZmVjdCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9lZmZlY3RcIjtcclxuaW1wb3J0IHsgUG9zdFByb2Nlc3MgfSBmcm9tIFwiY29yZS9Qb3N0UHJvY2Vzc2VzL3Bvc3RQcm9jZXNzXCI7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5pbXBvcnQgXCJjb3JlL0VuZ2luZXMvRXh0ZW5zaW9ucy9lbmdpbmUuZHluYW1pY1RleHR1cmVcIjtcclxuaW1wb3J0IFwiLi9kaWdpdGFscmFpbi5mcmFnbWVudFwiO1xyXG5cclxuLyoqXHJcbiAqIERpZ2l0YWxSYWluRm9udFRleHR1cmUgaXMgdGhlIGhlbHBlciBjbGFzcyB1c2VkIHRvIGVhc2lseSBjcmVhdGUgeW91ciBkaWdpdGFsIHJhaW4gZm9udCB0ZXh0dXJlLlxyXG4gKlxyXG4gKiBJdCBiYXNpY2FsbHkgdGFrZXMgY2FyZSByZW5kZXJpbmcgdGhlIGZvbnQgZnJvbnQgdGhlIGdpdmVuIGZvbnQgc2l6ZSB0byBhIHRleHR1cmUuXHJcbiAqIFRoaXMgaXMgdXNlZCBsYXRlciBvbiBpbiB0aGUgcG9zdHByb2Nlc3MuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRGlnaXRhbFJhaW5Gb250VGV4dHVyZSBleHRlbmRzIEJhc2VUZXh0dXJlIHtcclxuICAgIEBzZXJpYWxpemUoXCJmb250XCIpXHJcbiAgICBwcml2YXRlIF9mb250OiBzdHJpbmc7XHJcblxyXG4gICAgQHNlcmlhbGl6ZShcInRleHRcIilcclxuICAgIHByaXZhdGUgX3RleHQ6IHN0cmluZztcclxuXHJcbiAgICBwcml2YXRlIF9jaGFyU2l6ZTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgc2l6ZSBvZiBvbmUgY2hhciBpbiB0aGUgdGV4dHVyZSAoZWFjaCBjaGFyIGZpdHMgaW4gc2l6ZSAqIHNpemUgc3BhY2UgaW4gdGhlIHRleHR1cmUpLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGNoYXJTaXplKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoYXJTaXplO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBEaWdpdGFsIFJhaW4gRm9udFRleHR1cmUgY2xhc3NcclxuICAgICAqIEBwYXJhbSBuYW1lIHRoZSBuYW1lIG9mIHRoZSB0ZXh0dXJlXHJcbiAgICAgKiBAcGFyYW0gZm9udCB0aGUgZm9udCB0byB1c2UsIHVzZSB0aGUgVzNDIENTUyBub3RhdGlvblxyXG4gICAgICogQHBhcmFtIHRleHQgdGhlIGNhcmFjdGVyIHNldCB0byB1c2UgaW4gdGhlIHJlbmRlcmluZy5cclxuICAgICAqIEBwYXJhbSBzY2VuZSB0aGUgc2NlbmUgdGhhdCBvd25zIHRoZSB0ZXh0dXJlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZm9udDogc3RyaW5nLCB0ZXh0OiBzdHJpbmcsIHNjZW5lOiBOdWxsYWJsZTxTY2VuZT4gPSBudWxsKSB7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUpO1xyXG5cclxuICAgICAgICBzY2VuZSA9IHRoaXMuZ2V0U2NlbmUoKTtcclxuXHJcbiAgICAgICAgaWYgKCFzY2VuZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX3RleHQgPT0gdGV4dDtcclxuICAgICAgICB0aGlzLl9mb250ID09IGZvbnQ7XHJcblxyXG4gICAgICAgIHRoaXMud3JhcFUgPSBUZXh0dXJlLkNMQU1QX0FERFJFU1NNT0RFO1xyXG4gICAgICAgIHRoaXMud3JhcFYgPSBUZXh0dXJlLkNMQU1QX0FERFJFU1NNT0RFO1xyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIGZvbnQgc3BlY2lmaWMgaW5mby5cclxuICAgICAgICBjb25zdCBtYXhDaGFySGVpZ2h0ID0gdGhpcy5fZ2V0Rm9udEhlaWdodChmb250KTtcclxuICAgICAgICBjb25zdCBtYXhDaGFyV2lkdGggPSB0aGlzLl9nZXRGb250V2lkdGgoZm9udCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NoYXJTaXplID0gTWF0aC5tYXgobWF4Q2hhckhlaWdodC5oZWlnaHQsIG1heENoYXJXaWR0aCk7XHJcblxyXG4gICAgICAgIC8vIFRoaXMgaXMgYW4gYXBwcm94aW1hdGUgc2l6ZSwgYnV0IHNob3VsZCBhbHdheXMgYmUgYWJsZSB0byBmaXQgYXQgbGVhc3QgdGhlIG1heENoYXJDb3VudC5cclxuICAgICAgICBjb25zdCB0ZXh0dXJlV2lkdGggPSB0aGlzLl9jaGFyU2l6ZTtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlSGVpZ2h0ID0gTWF0aC5jZWlsKHRoaXMuX2NoYXJTaXplICogdGV4dC5sZW5ndGgpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgdGhlIHRleHR1cmUgdGhhdCB3aWxsIHN0b3JlIHRoZSBmb250IGNoYXJhY3RlcnMuXHJcbiAgICAgICAgdGhpcy5fdGV4dHVyZSA9IHNjZW5lLmdldEVuZ2luZSgpLmNyZWF0ZUR5bmFtaWNUZXh0dXJlKHRleHR1cmVXaWR0aCwgdGV4dHVyZUhlaWdodCwgZmFsc2UsIFRleHR1cmUuTkVBUkVTVF9TQU1QTElOR01PREUpO1xyXG4gICAgICAgIC8vc2NlbmUuZ2V0RW5naW5lKCkuc2V0Y2xhbXBcclxuICAgICAgICBjb25zdCB0ZXh0dXJlU2l6ZSA9IHRoaXMuZ2V0U2l6ZSgpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSBjYW52YXMgd2l0aCB0aGUgZmluYWwgc2l6ZTogdGhlIG9uZSBtYXRjaGluZyB0aGUgdGV4dHVyZS5cclxuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHRleHR1cmVTaXplLndpZHRoO1xyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSB0ZXh0dXJlU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgY29uc3QgY29udGV4dCA9IDxDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ+Y2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICBjb250ZXh0LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XHJcbiAgICAgICAgY29udGV4dC5mb250ID0gZm9udDtcclxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICBjb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBTZXRzIHRoZSB0ZXh0IGluIHRoZSB0ZXh0dXJlLlxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHRleHRbaV0sIDAsIGkgKiB0aGlzLl9jaGFyU2l6ZSAtIG1heENoYXJIZWlnaHQub2Zmc2V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZsdXNoIHRoZSB0ZXh0IGluIHRoZSBkeW5hbWljIHRleHR1cmUuXHJcbiAgICAgICAgc2NlbmUuZ2V0RW5naW5lKCkudXBkYXRlRHluYW1pY1RleHR1cmUodGhpcy5fdGV4dHVyZSwgY2FudmFzLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBtYXggY2hhciB3aWR0aCBvZiBhIGZvbnQuXHJcbiAgICAgKiBAcGFyYW0gZm9udCB0aGUgZm9udCB0byB1c2UsIHVzZSB0aGUgVzNDIENTUyBub3RhdGlvblxyXG4gICAgICogQHJldHVybnMgdGhlIG1heCBjaGFyIHdpZHRoXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2dldEZvbnRXaWR0aChmb250OiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IGZvbnREcmF3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICBjb25zdCBjdHggPSA8Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEPmZvbnREcmF3LmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIGN0eC5mb250ID0gZm9udDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGN0eC5tZWFzdXJlVGV4dChcIldcIikud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTW9yZSBpbmZvIGhlcmU6IGh0dHBzOi8vdmlkZWxhaXMuY29tLzIwMTQvMDMvMTYvdGhlLW1hbnktYW5kLXZhcmllZC1wcm9ibGVtcy13aXRoLW1lYXN1cmluZy1mb250LWhlaWdodC1mb3ItaHRtbDUtY2FudmFzL1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBtYXggY2hhciBoZWlnaHQgb2YgYSBmb250LlxyXG4gICAgICogQHBhcmFtIGZvbnQgdGhlIGZvbnQgdG8gdXNlLCB1c2UgdGhlIFczQyBDU1Mgbm90YXRpb25cclxuICAgICAqIEByZXR1cm5zIHRoZSBtYXggY2hhciBoZWlnaHRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZ2V0Rm9udEhlaWdodChmb250OiBzdHJpbmcpOiB7IGhlaWdodDogbnVtYmVyOyBvZmZzZXQ6IG51bWJlciB9IHtcclxuICAgICAgICBjb25zdCBmb250RHJhdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gPENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRD5mb250RHJhdy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGZvbnREcmF3LndpZHRoLCBmb250RHJhdy5oZWlnaHQpO1xyXG4gICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgY3R4LmZvbnQgPSBmb250O1xyXG4gICAgICAgIGN0eC5maWxsVGV4dChcImpIfFwiLCAwLCAwKTtcclxuICAgICAgICBjb25zdCBwaXhlbHMgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGZvbnREcmF3LndpZHRoLCBmb250RHJhdy5oZWlnaHQpLmRhdGE7XHJcbiAgICAgICAgbGV0IHN0YXJ0ID0gLTE7XHJcbiAgICAgICAgbGV0IGVuZCA9IC0xO1xyXG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IGZvbnREcmF3LmhlaWdodDsgcm93KyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgZm9udERyYXcud2lkdGg7IGNvbHVtbisrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IChyb3cgKiBmb250RHJhdy53aWR0aCArIGNvbHVtbikgKiA0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHBpeGVsc1tpbmRleF0gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29sdW1uID09PSBmb250RHJhdy53aWR0aCAtIDEgJiYgc3RhcnQgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IHJvdztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93ID0gZm9udERyYXcuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFydCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSByb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7IGhlaWdodDogZW5kIC0gc3RhcnQgKyAxLCBvZmZzZXQ6IHN0YXJ0IC0gMSB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvbmVzIHRoZSBjdXJyZW50IERpZ2l0YWxSYWluRm9udFRleHR1cmUuXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgY2xvbmUgb2YgdGhlIHRleHR1cmUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvdmVycmlkZSBjbG9uZSgpOiBEaWdpdGFsUmFpbkZvbnRUZXh0dXJlIHtcclxuICAgICAgICByZXR1cm4gbmV3IERpZ2l0YWxSYWluRm9udFRleHR1cmUodGhpcy5uYW1lLCB0aGlzLl9mb250LCB0aGlzLl90ZXh0LCB0aGlzLmdldFNjZW5lKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyc2VzIGEganNvbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSB0ZXh0dXJlIGFuZCByZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0LlxyXG4gICAgICogQHBhcmFtIHNvdXJjZSB0aGUgc291cmNlIEpTT04gcmVwcmVzZW50YXRpb25cclxuICAgICAqIEBwYXJhbSBzY2VuZSB0aGUgc2NlbmUgdG8gY3JlYXRlIHRoZSB0ZXh0dXJlIGZvclxyXG4gICAgICogQHJldHVybnMgdGhlIHBhcnNlZCB0ZXh0dXJlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgUGFyc2Uoc291cmNlOiBhbnksIHNjZW5lOiBTY2VuZSk6IERpZ2l0YWxSYWluRm9udFRleHR1cmUge1xyXG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBTZXJpYWxpemF0aW9uSGVscGVyLlBhcnNlKCgpID0+IG5ldyBEaWdpdGFsUmFpbkZvbnRUZXh0dXJlKHNvdXJjZS5uYW1lLCBzb3VyY2UuZm9udCwgc291cmNlLnRleHQsIHNjZW5lKSwgc291cmNlLCBzY2VuZSwgbnVsbCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0ZXh0dXJlO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogT3B0aW9uIGF2YWlsYWJsZSBpbiB0aGUgRGlnaXRhbCBSYWluIFBvc3QgUHJvY2Vzcy5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURpZ2l0YWxSYWluUG9zdFByb2Nlc3NPcHRpb25zIHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGZvbnQgdG8gdXNlIGZvbGxvd2luZyB0aGUgdzNjIGZvbnQgZGVmaW5pdGlvbi5cclxuICAgICAqL1xyXG4gICAgZm9udD86IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZGVmaW5lcyB0aGUgYW1vdW50IHlvdSB3YW50IHRvIG1peCB0aGUgXCJ0aWxlXCIgb3IgY2FyYWN0ZXIgc3BhY2UgY29sb3JlZCBpbiB0aGUgZGlnaXRhbCByYWluLlxyXG4gICAgICogVGhpcyBudW1iZXIgaXMgZGVmaW5lZCBiZXR3ZWVuIDAgYW5kIDE7XHJcbiAgICAgKi9cclxuICAgIG1peFRvVGlsZT86IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZGVmaW5lcyB0aGUgYW1vdW50IHlvdSB3YW50IHRvIG1peCB0aGUgbm9ybWFsIHJlbmRlcmluZyBwYXNzIGluIHRoZSBkaWdpdGFsIHJhaW4uXHJcbiAgICAgKiBUaGlzIG51bWJlciBpcyBkZWZpbmVkIGJldHdlZW4gMCBhbmQgMTtcclxuICAgICAqL1xyXG4gICAgbWl4VG9Ob3JtYWw/OiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEaWdpdGFsUmFpblBvc3RQcm9jZXNzIGhlbHBzIHJlbmRlcmluZyBldmVyaXRoaW5nIGluIGRpZ2l0YWwgcmFpbi5cclxuICpcclxuICogU2ltbXBseSBhZGQgaXQgdG8geW91ciBzY2VuZSBhbmQgbGV0IHRoZSBuZXJkIHRoYXQgbGl2ZXMgaW4geW91IGhhdmUgZnVuLlxyXG4gKiBFeGFtcGxlIHVzYWdlOiB2YXIgcHAgPSBuZXcgRGlnaXRhbFJhaW5Qb3N0UHJvY2VzcyhcImRpZ2l0YWxSYWluXCIsIFwiMjBweCBNb25vc3BhY2VcIiwgY2FtZXJhKTtcclxuICovXHJcbmV4cG9ydCBjbGFzcyBEaWdpdGFsUmFpblBvc3RQcm9jZXNzIGV4dGVuZHMgUG9zdFByb2Nlc3Mge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZm9udCB0ZXh0dXJlIHVzZWQgdG8gcmVuZGVyIHRoZSBjaGFyIGluIHRoZSBwb3N0IHByb2Nlc3MuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2RpZ2l0YWxSYWluRm9udFRleHR1cmU6IERpZ2l0YWxSYWluRm9udFRleHR1cmU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGRlZmluZXMgdGhlIGFtb3VudCB5b3Ugd2FudCB0byBtaXggdGhlIFwidGlsZVwiIG9yIGNhcmFjdGVyIHNwYWNlIGNvbG9yZWQgaW4gdGhlIGRpZ2l0YWwgcmFpbi5cclxuICAgICAqIFRoaXMgbnVtYmVyIGlzIGRlZmluZWQgYmV0d2VlbiAwIGFuZCAxO1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbWl4VG9UaWxlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBkZWZpbmVzIHRoZSBhbW91bnQgeW91IHdhbnQgdG8gbWl4IHRoZSBub3JtYWwgcmVuZGVyaW5nIHBhc3MgaW4gdGhlIGRpZ2l0YWwgcmFpbi5cclxuICAgICAqIFRoaXMgbnVtYmVyIGlzIGRlZmluZWQgYmV0d2VlbiAwIGFuZCAxO1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbWl4VG9Ob3JtYWw6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVlZCBvZiB0aGUgZWZmZWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzcGVlZDogbnVtYmVyID0gMC4wMDM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnN0YW50aWF0ZXMgYSBuZXcgRGlnaXRhbCBSYWluIFBvc3QgUHJvY2Vzcy5cclxuICAgICAqIEBwYXJhbSBuYW1lIHRoZSBuYW1lIHRvIGdpdmUgdG8gdGhlIHBvc3Rwcm9jZXNzXHJcbiAgICAgKiBAY2FtZXJhIHRoZSBjYW1lcmEgdG8gYXBwbHkgdGhlIHBvc3QgcHJvY2VzcyB0by5cclxuICAgICAqIEBwYXJhbSBjYW1lcmFcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIGNhbiBlaXRoZXIgYmUgdGhlIGZvbnQgbmFtZSBvciBhbiBvcHRpb24gb2JqZWN0IGZvbGxvd2luZyB0aGUgSURpZ2l0YWxSYWluUG9zdFByb2Nlc3NPcHRpb25zIGZvcm1hdFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGNhbWVyYTogTnVsbGFibGU8Q2FtZXJhPiwgb3B0aW9ucz86IHN0cmluZyB8IElEaWdpdGFsUmFpblBvc3RQcm9jZXNzT3B0aW9ucykge1xyXG4gICAgICAgIHN1cGVyKFxyXG4gICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgICBcImRpZ2l0YWxyYWluXCIsXHJcbiAgICAgICAgICAgIFtcImRpZ2l0YWxSYWluRm9udEluZm9zXCIsIFwiZGlnaXRhbFJhaW5PcHRpb25zXCIsIFwiY29zVGltZVplcm9PbmVcIiwgXCJtYXRyaXhTcGVlZFwiXSxcclxuICAgICAgICAgICAgW1wiZGlnaXRhbFJhaW5Gb250XCJdLFxyXG4gICAgICAgICAgICAxLjAsXHJcbiAgICAgICAgICAgIGNhbWVyYSxcclxuICAgICAgICAgICAgVGV4dHVyZS5UUklMSU5FQVJfU0FNUExJTkdNT0RFLFxyXG4gICAgICAgICAgICB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHRydWVcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBEZWZhdWx0IHZhbHVlcy5cclxuICAgICAgICBsZXQgZm9udCA9IFwiMTVweCBNb25vc3BhY2VcIjtcclxuICAgICAgICBjb25zdCBjaGFyYWN0ZXJTZXQgPVxyXG4gICAgICAgICAgICBcIuWPpOaxoOOChOibmemjm+OBs+i+vOOCgOawtOOBrumfs+OBteOCi+OBhOOBkeOChOOBi+OCj+OBmuOBqOOBs+OBk+OCgOOBv+OBmuOBruOBiuOBqOWIneOBl+OBkOOCjOeMv+OCguWwj+iTkeOCkuOBu+OBl+OBkuS5n+OBr+OBpOOBl+OBkOOCjOOBleOCi+OCguOBk+OBv+OBruOCkuOBu+OBl+OBkuOBquOCiuaxn+aIuOOBrumbqOS9leefs+WRkeOCk+OBoOaZgumzpeOBiOOBqeOBruOBguOCgeOBquOCk+OBlOOBj+OBruOCk+OBoOOBu+OBqOOBqOOBjuOBmVwiO1xyXG5cclxuICAgICAgICAvLyBVc2Ugb3B0aW9ucy5cclxuICAgICAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIGZvbnQgPSA8c3RyaW5nPm9wdGlvbnM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb250ID0gKDxJRGlnaXRhbFJhaW5Qb3N0UHJvY2Vzc09wdGlvbnM+b3B0aW9ucykuZm9udCB8fCBmb250O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5taXhUb1RpbGUgPSAoPElEaWdpdGFsUmFpblBvc3RQcm9jZXNzT3B0aW9ucz5vcHRpb25zKS5taXhUb1RpbGUgfHwgdGhpcy5taXhUb1RpbGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1peFRvTm9ybWFsID0gKDxJRGlnaXRhbFJhaW5Qb3N0UHJvY2Vzc09wdGlvbnM+b3B0aW9ucykubWl4VG9Ob3JtYWwgfHwgdGhpcy5taXhUb05vcm1hbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2NlbmUgPSBjYW1lcmE/LmdldFNjZW5lKCkgfHwgbnVsbDtcclxuICAgICAgICB0aGlzLl9kaWdpdGFsUmFpbkZvbnRUZXh0dXJlID0gbmV3IERpZ2l0YWxSYWluRm9udFRleHR1cmUobmFtZSwgZm9udCwgY2hhcmFjdGVyU2V0LCBzY2VuZSk7XHJcbiAgICAgICAgY29uc3QgdGV4dHVyZVNpemUgPSB0aGlzLl9kaWdpdGFsUmFpbkZvbnRUZXh0dXJlLmdldFNpemUoKTtcclxuXHJcbiAgICAgICAgbGV0IGFscGhhID0gMC4wO1xyXG4gICAgICAgIGxldCBjb3NUaW1lWmVyb09uZSA9IDAuMDtcclxuICAgICAgICBjb25zdCBtYXRyaXggPSBNYXRyaXguRnJvbVZhbHVlcyhcclxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSxcclxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSxcclxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSxcclxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSxcclxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSxcclxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSxcclxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSxcclxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSxcclxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSxcclxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSxcclxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSxcclxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSxcclxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSxcclxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSxcclxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSxcclxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMub25BcHBseSA9IChlZmZlY3Q6IEVmZmVjdCkgPT4ge1xyXG4gICAgICAgICAgICBlZmZlY3Quc2V0VGV4dHVyZShcImRpZ2l0YWxSYWluRm9udFwiLCB0aGlzLl9kaWdpdGFsUmFpbkZvbnRUZXh0dXJlKTtcclxuXHJcbiAgICAgICAgICAgIGVmZmVjdC5zZXRGbG9hdDQoXCJkaWdpdGFsUmFpbkZvbnRJbmZvc1wiLCB0aGlzLl9kaWdpdGFsUmFpbkZvbnRUZXh0dXJlLmNoYXJTaXplLCBjaGFyYWN0ZXJTZXQubGVuZ3RoLCB0ZXh0dXJlU2l6ZS53aWR0aCwgdGV4dHVyZVNpemUuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIGVmZmVjdC5zZXRGbG9hdDQoXCJkaWdpdGFsUmFpbk9wdGlvbnNcIiwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMubWl4VG9Ob3JtYWwsIHRoaXMubWl4VG9UaWxlKTtcclxuXHJcbiAgICAgICAgICAgIGVmZmVjdC5zZXRNYXRyaXgoXCJtYXRyaXhTcGVlZFwiLCBtYXRyaXgpO1xyXG5cclxuICAgICAgICAgICAgYWxwaGEgKz0gdGhpcy5zcGVlZDtcclxuICAgICAgICAgICAgY29zVGltZVplcm9PbmUgPSBhbHBoYTtcclxuICAgICAgICAgICAgZWZmZWN0LnNldEZsb2F0KFwiY29zVGltZVplcm9PbmVcIiwgY29zVGltZVplcm9PbmUpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gRG8gbm90IGVkaXQuXG5pbXBvcnQgeyBTaGFkZXJTdG9yZSB9IGZyb20gXCJjb3JlL0VuZ2luZXMvc2hhZGVyU3RvcmVcIjtcblxuY29uc3QgbmFtZSA9IFwiZGlnaXRhbHJhaW5QaXhlbFNoYWRlclwiO1xuY29uc3Qgc2hhZGVyID0gYHZhcnlpbmcgdmVjMiB2VVY7dW5pZm9ybSBzYW1wbGVyMkQgdGV4dHVyZVNhbXBsZXI7dW5pZm9ybSBzYW1wbGVyMkQgZGlnaXRhbFJhaW5Gb250O3VuaWZvcm0gdmVjNCBkaWdpdGFsUmFpbkZvbnRJbmZvczt1bmlmb3JtIHZlYzQgZGlnaXRhbFJhaW5PcHRpb25zO3VuaWZvcm0gbWF0NCBtYXRyaXhTcGVlZDt1bmlmb3JtIGZsb2F0IGNvc1RpbWVaZXJvT25lO2Zsb2F0IGdldEx1bWluYW5jZSh2ZWMzIGNvbG9yKVxue3JldHVybiBjbGFtcChkb3QoY29sb3IsdmVjMygwLjIxMjYsMC43MTUyLDAuMDcyMikpLDAuLDEuKTt9XG4jZGVmaW5lIENVU1RPTV9GUkFHTUVOVF9ERUZJTklUSU9OU1xudm9pZCBtYWluKHZvaWQpIFxue2Zsb2F0IGNhcmFjdGVyU2l6ZT1kaWdpdGFsUmFpbkZvbnRJbmZvcy54O2Zsb2F0IG51bUNoYXI9ZGlnaXRhbFJhaW5Gb250SW5mb3MueS0xLjA7ZmxvYXQgZm9udHg9ZGlnaXRhbFJhaW5Gb250SW5mb3MuejtmbG9hdCBmb250eT1kaWdpdGFsUmFpbkZvbnRJbmZvcy53O2Zsb2F0IHNjcmVlbng9ZGlnaXRhbFJhaW5PcHRpb25zLng7ZmxvYXQgc2NyZWVueT1kaWdpdGFsUmFpbk9wdGlvbnMueTtmbG9hdCByYXRpbz1zY3JlZW55L2ZvbnR5O2Zsb2F0IGNvbHVtbng9ZmxvYXQoZmxvb3IoKGdsX0ZyYWdDb29yZC54KS9jYXJhY3RlclNpemUpKTtmbG9hdCB0aWxlWD1mbG9hdChmbG9vcigoZ2xfRnJhZ0Nvb3JkLngpL2NhcmFjdGVyU2l6ZSkpKmNhcmFjdGVyU2l6ZS9zY3JlZW54O2Zsb2F0IHRpbGVZPWZsb2F0KGZsb29yKChnbF9GcmFnQ29vcmQueSkvY2FyYWN0ZXJTaXplKSkqY2FyYWN0ZXJTaXplL3NjcmVlbnk7dmVjMiB0aWxlVVY9dmVjMih0aWxlWCx0aWxlWSk7dmVjNCB0aWxlQ29sb3I9dGV4dHVyZTJEKHRleHR1cmVTYW1wbGVyLHRpbGVVVik7dmVjNCBiYXNlQ29sb3I9dGV4dHVyZTJEKHRleHR1cmVTYW1wbGVyLHZVVik7ZmxvYXQgdGlsZUx1bWluYW5jZT1nZXRMdW1pbmFuY2UodGlsZUNvbG9yLnJnYik7aW50IHN0PWludChtb2QoY29sdW1ueCw0LjApKTtmbG9hdCBzcGVlZD1jb3NUaW1lWmVyb09uZSooc2luKHRpbGVYKjMxNC41KSowLjUrMC42KTsgXG5mbG9hdCB4PWZsb2F0KG1vZChnbF9GcmFnQ29vcmQueCxjYXJhY3RlclNpemUpKS9mb250eDtmbG9hdCB5PWZsb2F0KG1vZChzcGVlZCtnbF9GcmFnQ29vcmQueS9zY3JlZW55LDEuMCkpO3kqPXJhdGlvO3ZlYzQgZmluYWxDb2xvcj0gdGV4dHVyZTJEKGRpZ2l0YWxSYWluRm9udCx2ZWMyKHgsMS4wLXkpKTt2ZWMzIGhpZ2g9ZmluYWxDb2xvci5yZ2IqKHZlYzMoMS4yLDEuMiwxLjIpKnBvdygxLjAteSwzMC4wKSk7ZmluYWxDb2xvci5yZ2IqPXZlYzMocG93KHRpbGVMdW1pbmFuY2UsNS4wKSxwb3codGlsZUx1bWluYW5jZSwxLjUpLHBvdyh0aWxlTHVtaW5hbmNlLDMuMCkpO2ZpbmFsQ29sb3IucmdiKz1oaWdoO2ZpbmFsQ29sb3IucmdiPWNsYW1wKGZpbmFsQ29sb3IucmdiLDAuLDEuKTtmaW5hbENvbG9yLmE9MS4wO2ZpbmFsQ29sb3I9IG1peChmaW5hbENvbG9yLHRpbGVDb2xvcixkaWdpdGFsUmFpbk9wdGlvbnMudyk7ZmluYWxDb2xvcj0gbWl4KGZpbmFsQ29sb3IsYmFzZUNvbG9yLGRpZ2l0YWxSYWluT3B0aW9ucy56KTtnbF9GcmFnQ29sb3I9ZmluYWxDb2xvcjt9YDtcbi8vIFNpZGVlZmZlY3RcblNoYWRlclN0b3JlLlNoYWRlcnNTdG9yZVtuYW1lXSA9IHNoYWRlcjtcbi8qKiBAaW50ZXJuYWwgKi9cbmV4cG9ydCBjb25zdCBkaWdpdGFscmFpblBpeGVsU2hhZGVyID0geyBuYW1lLCBzaGFkZXIgfTtcbiIsImV4cG9ydCAqIGZyb20gXCIuL2RpZ2l0YWxSYWluUG9zdFByb2Nlc3NcIjtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWludGVybmFsLW1vZHVsZXMgKi9cclxuZXhwb3J0ICogZnJvbSBcIi4vYXNjaWlBcnQvaW5kZXhcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZGlnaXRhbFJhaW4vaW5kZXhcIjtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWludGVybmFsLW1vZHVsZXMgKi9cclxuaW1wb3J0ICogYXMgcG9zdFByb2Nlc3NMaWJyYXJ5IGZyb20gXCJwb3N0LXByb2Nlc3Nlcy9pbmRleFwiO1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIFRoaXMgaXMgdGhlIGVudHJ5IHBvaW50IGZvciB0aGUgVU1EIG1vZHVsZS5cclxuICogVGhlIGVudHJ5IHBvaW50IGZvciBhIGZ1dHVyZSBFU00gcGFja2FnZSBzaG91bGQgYmUgaW5kZXgudHNcclxuICovXHJcbmNvbnN0IGdsb2JhbE9iamVjdCA9IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdW5kZWZpbmVkO1xyXG5pZiAodHlwZW9mIGdsb2JhbE9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gcG9zdFByb2Nlc3NMaWJyYXJ5KSB7XHJcbiAgICAgICAgKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OW2tleV0gPSAoPGFueT5wb3N0UHJvY2Vzc0xpYnJhcnkpW2tleV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCAqIGZyb20gXCJwb3N0LXByb2Nlc3Nlcy9pbmRleFwiO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmFieWxvbmpzX01pc2NfZGVjb3JhdG9yc19fOyIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCAqL1xuXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcbiAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcbiAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn1cblxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xuICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xuICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHQ7XG4gIH1cbiAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xuICB2YXIgdCA9IHt9O1xuICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgIHRbcF0gPSBzW3BdO1xuICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgIH1cbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXNEZWNvcmF0ZShjdG9yLCBkZXNjcmlwdG9ySW4sIGRlY29yYXRvcnMsIGNvbnRleHRJbiwgaW5pdGlhbGl6ZXJzLCBleHRyYUluaXRpYWxpemVycykge1xuICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cbiAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcbiAgdmFyIHRhcmdldCA9ICFkZXNjcmlwdG9ySW4gJiYgY3RvciA/IGNvbnRleHRJbltcInN0YXRpY1wiXSA/IGN0b3IgOiBjdG9yLnByb3RvdHlwZSA6IG51bGw7XG4gIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xuICB2YXIgXywgZG9uZSA9IGZhbHNlO1xuICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGNvbnRleHQgPSB7fTtcbiAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4uYWNjZXNzKSBjb250ZXh0LmFjY2Vzc1twXSA9IGNvbnRleHRJbi5hY2Nlc3NbcF07XG4gICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xuICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XG4gICAgICBpZiAoa2luZCA9PT0gXCJhY2Nlc3NvclwiKSB7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmdldCkpIGRlc2NyaXB0b3IuZ2V0ID0gXztcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcbiAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgICAgICBlbHNlIGRlc2NyaXB0b3Jba2V5XSA9IF87XG4gICAgICB9XG4gIH1cbiAgaWYgKHRhcmdldCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29udGV4dEluLm5hbWUsIGRlc2NyaXB0b3IpO1xuICBkb25lID0gdHJ1ZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XG4gIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGluaXRpYWxpemVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xuICB9XG4gIHJldHVybiB1c2VWYWx1ZSA/IHZhbHVlIDogdm9pZCAwO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcHJvcEtleSh4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcbiAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsIFwibmFtZVwiLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHByZWZpeCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCIgXCIsIG5hbWUpIDogbmFtZSB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XG4gIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICB9XG59XG5cbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICBvW2syXSA9IG1ba107XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XG4gIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcbiAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgIH1cbiAgfTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcbiAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICBpZiAoIW0pIHJldHVybiBvO1xuICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgdHJ5IHtcbiAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICB9XG4gIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICB9XG4gICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgfVxuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xuICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcbiAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XG4gIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcbiAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxuICAgICAgICAgIHJba10gPSBhW2pdO1xuICByZXR1cm4gcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcbiAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xuICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XG4gIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIGF3YWl0UmV0dXJuKGYpIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodikudGhlbihmLCByZWplY3QpOyB9OyB9XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAoZ1tuXSkgeyBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyBpZiAoZikgaVtuXSA9IGYoaVtuXSk7IH0gfVxuICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XG4gIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxuICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XG4gIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XG4gIHZhciBpLCBwO1xuICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XG4gIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcbiAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxuICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xuICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxuICByZXR1cm4gY29va2VkO1xufTtcblxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgb1tcImRlZmF1bHRcIl0gPSB2O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcbiAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XG4gIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xuICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XG4gIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcbiAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcbiAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XG4gIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZShlbnYsIHZhbHVlLCBhc3luYykge1xuICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xuICAgIHZhciBkaXNwb3NlLCBpbm5lcjtcbiAgICBpZiAoYXN5bmMpIHtcbiAgICAgIGlmICghU3ltYm9sLmFzeW5jRGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0Rpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5hc3luY0Rpc3Bvc2VdO1xuICAgIH1cbiAgICBpZiAoZGlzcG9zZSA9PT0gdm9pZCAwKSB7XG4gICAgICBpZiAoIVN5bWJvbC5kaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmRpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5kaXNwb3NlXTtcbiAgICAgIGlmIChhc3luYykgaW5uZXIgPSBkaXNwb3NlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGRpc3Bvc2UgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBub3QgZGlzcG9zYWJsZS5cIik7XG4gICAgaWYgKGlubmVyKSBkaXNwb3NlID0gZnVuY3Rpb24oKSB7IHRyeSB7IGlubmVyLmNhbGwodGhpcyk7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpOyB9IH07XG4gICAgZW52LnN0YWNrLnB1c2goeyB2YWx1ZTogdmFsdWUsIGRpc3Bvc2U6IGRpc3Bvc2UsIGFzeW5jOiBhc3luYyB9KTtcbiAgfVxuICBlbHNlIGlmIChhc3luYykge1xuICAgIGVudi5zdGFjay5wdXNoKHsgYXN5bmM6IHRydWUgfSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xuICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2Rpc3Bvc2VSZXNvdXJjZXMoZW52KSB7XG4gIGZ1bmN0aW9uIGZhaWwoZSkge1xuICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcbiAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xuICB9XG4gIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgd2hpbGUgKGVudi5zdGFjay5sZW5ndGgpIHtcbiAgICAgIHZhciByZWMgPSBlbnYuc3RhY2sucG9wKCk7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjLmRpc3Bvc2UgJiYgcmVjLmRpc3Bvc2UuY2FsbChyZWMudmFsdWUpO1xuICAgICAgICBpZiAocmVjLmFzeW5jKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCkudGhlbihuZXh0LCBmdW5jdGlvbihlKSB7IGZhaWwoZSk7IHJldHVybiBuZXh0KCk7IH0pO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICBmYWlsKGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW52Lmhhc0Vycm9yKSB0aHJvdyBlbnYuZXJyb3I7XG4gIH1cbiAgcmV0dXJuIG5leHQoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBfX2V4dGVuZHMsXG4gIF9fYXNzaWduLFxuICBfX3Jlc3QsXG4gIF9fZGVjb3JhdGUsXG4gIF9fcGFyYW0sXG4gIF9fbWV0YWRhdGEsXG4gIF9fYXdhaXRlcixcbiAgX19nZW5lcmF0b3IsXG4gIF9fY3JlYXRlQmluZGluZyxcbiAgX19leHBvcnRTdGFyLFxuICBfX3ZhbHVlcyxcbiAgX19yZWFkLFxuICBfX3NwcmVhZCxcbiAgX19zcHJlYWRBcnJheXMsXG4gIF9fc3ByZWFkQXJyYXksXG4gIF9fYXdhaXQsXG4gIF9fYXN5bmNHZW5lcmF0b3IsXG4gIF9fYXN5bmNEZWxlZ2F0b3IsXG4gIF9fYXN5bmNWYWx1ZXMsXG4gIF9fbWFrZVRlbXBsYXRlT2JqZWN0LFxuICBfX2ltcG9ydFN0YXIsXG4gIF9faW1wb3J0RGVmYXVsdCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZEluLFxuICBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZSxcbiAgX19kaXNwb3NlUmVzb3VyY2VzLFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIHBvc3RQcm9jZXNzIGZyb20gXCJAbHRzL3Bvc3QtcHJvY2Vzc2VzL2xlZ2FjeS9sZWdhY3lcIjtcclxuZXhwb3J0IHsgcG9zdFByb2Nlc3MgfTtcclxuZXhwb3J0IGRlZmF1bHQgcG9zdFByb2Nlc3M7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==