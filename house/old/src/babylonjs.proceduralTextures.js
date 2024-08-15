(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babylonjs"));
	else if(typeof define === 'function' && define.amd)
		define("babylonjs-procedural-textures", ["babylonjs"], factory);
	else if(typeof exports === 'object')
		exports["babylonjs-procedural-textures"] = factory(require("babylonjs"));
	else
		root["PROCEDURALTEXTURES"] = factory(root["BABYLON"]);
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), (__WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_decorators__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dev/proceduralTextures/src/brick/brickProceduralTexture.fragment.ts":
/*!************************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/brick/brickProceduralTexture.fragment.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   brickProceduralTexturePixelShader: () => (/* binding */ brickProceduralTexturePixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "brickProceduralTexturePixelShader";
var shader = "precision highp float;varying vec2 vPosition;varying vec2 vUV;uniform float numberOfBricksHeight;uniform float numberOfBricksWidth;uniform vec3 brickColor;uniform vec3 jointColor;float rand(vec2 n) {return fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);}\nfloat noise(vec2 n) {const vec2 d=vec2(0.0,1.0);vec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));return mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);}\nfloat fbm(vec2 n) {float total=0.0,amplitude=1.0;for (int i=0; i<4; i++) {total+=noise(n)*amplitude;n+=n;amplitude*=0.5;}\nreturn total;}\nfloat roundF(float number){return sign(number)*floor(abs(number)+0.5);}\n#define CUSTOM_FRAGMENT_DEFINITIONS\nvoid main(void)\n{float brickW=1.0/numberOfBricksWidth;float brickH=1.0/numberOfBricksHeight;float jointWPercentage=0.01;float jointHPercentage=0.05;vec3 color=brickColor;float yi=vUV.y/brickH;float nyi=roundF(yi);float xi=vUV.x/brickW;if (mod(floor(yi),2.0)==0.0){xi=xi-0.5;}\nfloat nxi=roundF(xi);vec2 brickvUV=vec2((xi-floor(xi))/brickH,(yi-floor(yi))/ brickW);if (yi<nyi+jointHPercentage && yi>nyi-jointHPercentage){color=mix(jointColor,vec3(0.37,0.25,0.25),(yi-nyi)/jointHPercentage+0.2);}\nelse if (xi<nxi+jointWPercentage && xi>nxi-jointWPercentage){color=mix(jointColor,vec3(0.44,0.44,0.44),(xi-nxi)/jointWPercentage+0.2);}\nelse {float brickColorSwitch=mod(floor(yi)+floor(xi),3.0);if (brickColorSwitch==0.0)\ncolor=mix(color,vec3(0.33,0.33,0.33),0.3);else if (brickColorSwitch==2.0)\ncolor=mix(color,vec3(0.11,0.11,0.11),0.3);}\ngl_FragColor=vec4(color,1.0);}";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var brickProceduralTexturePixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/proceduralTextures/src/brick/brickProceduralTexture.ts":
/*!***************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/brick/brickProceduralTexture.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BrickProceduralTexture: () => (/* binding */ BrickProceduralTexture)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/typeStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _brickProceduralTexture_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./brickProceduralTexture.fragment */ "../../../dev/proceduralTextures/src/brick/brickProceduralTexture.fragment.ts");







var BrickProceduralTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(BrickProceduralTexture, _super);
    function BrickProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, name, size, "brickProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
        _this._numberOfBricksHeight = 15;
        _this._numberOfBricksWidth = 5;
        _this._jointColor = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.72, 0.72, 0.72);
        _this._brickColor = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.77, 0.47, 0.4);
        _this.updateShaderUniforms();
        return _this;
    }
    BrickProceduralTexture.prototype.updateShaderUniforms = function () {
        this.setFloat("numberOfBricksHeight", this._numberOfBricksHeight);
        this.setFloat("numberOfBricksWidth", this._numberOfBricksWidth);
        this.setColor3("brickColor", this._brickColor);
        this.setColor3("jointColor", this._jointColor);
    };
    Object.defineProperty(BrickProceduralTexture.prototype, "numberOfBricksHeight", {
        get: function () {
            return this._numberOfBricksHeight;
        },
        set: function (value) {
            this._numberOfBricksHeight = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BrickProceduralTexture.prototype, "numberOfBricksWidth", {
        get: function () {
            return this._numberOfBricksWidth;
        },
        set: function (value) {
            this._numberOfBricksWidth = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BrickProceduralTexture.prototype, "jointColor", {
        get: function () {
            return this._jointColor;
        },
        set: function (value) {
            this._jointColor = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BrickProceduralTexture.prototype, "brickColor", {
        get: function () {
            return this._brickColor;
        },
        set: function (value) {
            this._brickColor = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Serializes this brick procedural texture
     * @returns a serialized brick procedural texture object
     */
    BrickProceduralTexture.prototype.serialize = function () {
        var serializationObject = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Serialize(this, _super.prototype.serialize.call(this));
        serializationObject.customType = "BABYLON.BrickProceduralTexture";
        return serializationObject;
    };
    /**
     * Creates a Brick Procedural Texture from parsed brick procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing brick procedural texture information
     * @returns a parsed Brick Procedural Texture
     */
    BrickProceduralTexture.Parse = function (parsedTexture, scene, rootUrl) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new BrickProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps); }, parsedTexture, scene, rootUrl);
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], BrickProceduralTexture.prototype, "numberOfBricksHeight", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], BrickProceduralTexture.prototype, "numberOfBricksWidth", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor3)()
    ], BrickProceduralTexture.prototype, "jointColor", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor3)()
    ], BrickProceduralTexture.prototype, "brickColor", null);
    return BrickProceduralTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.ProceduralTexture));
(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.BrickProceduralTexture", BrickProceduralTexture);


/***/ }),

/***/ "../../../dev/proceduralTextures/src/brick/index.ts":
/*!**********************************************************!*\
  !*** ../../../dev/proceduralTextures/src/brick/index.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BrickProceduralTexture: () => (/* reexport safe */ _brickProceduralTexture__WEBPACK_IMPORTED_MODULE_0__.BrickProceduralTexture)
/* harmony export */ });
/* harmony import */ var _brickProceduralTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./brickProceduralTexture */ "../../../dev/proceduralTextures/src/brick/brickProceduralTexture.ts");



/***/ }),

/***/ "../../../dev/proceduralTextures/src/cloud/cloudProceduralTexture.fragment.ts":
/*!************************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/cloud/cloudProceduralTexture.fragment.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cloudProceduralTexturePixelShader: () => (/* binding */ cloudProceduralTexturePixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "cloudProceduralTexturePixelShader";
var shader = "precision highp float;varying vec2 vUV;uniform vec4 skyColor;uniform vec4 cloudColor;uniform float amplitude;uniform int numOctaves;float rand(vec2 n) {return fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);}\nfloat noise(vec2 n) {const vec2 d=vec2(0.0,1.0);vec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));return mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);}\nfloat fbm(vec2 n) {float total=0.0,ampl=amplitude;\n#ifdef WEBGL2\nfor (int i=0; i<numOctaves; i++) {\n#else\nfor (int i=0; i<4; i++) {\n#endif\ntotal+=noise(n)*ampl;n+=n;ampl*=0.5;}\nreturn total;}\nvoid main() {vec2 p=vUV*12.0;vec4 c=mix(skyColor,cloudColor,fbm(p));gl_FragColor=c;}\n";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var cloudProceduralTexturePixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/proceduralTextures/src/cloud/cloudProceduralTexture.ts":
/*!***************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/cloud/cloudProceduralTexture.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CloudProceduralTexture: () => (/* binding */ CloudProceduralTexture)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/typeStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _cloudProceduralTexture_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cloudProceduralTexture.fragment */ "../../../dev/proceduralTextures/src/cloud/cloudProceduralTexture.fragment.ts");







var CloudProceduralTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(CloudProceduralTexture, _super);
    function CloudProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, name, size, "cloudProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
        _this._skyColor = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color4(0.15, 0.68, 1.0, 1.0);
        _this._cloudColor = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color4(1, 1, 1, 1.0);
        _this._amplitude = 1;
        _this._numOctaves = 4;
        _this.updateShaderUniforms();
        return _this;
    }
    CloudProceduralTexture.prototype.updateShaderUniforms = function () {
        this.setColor4("skyColor", this._skyColor);
        this.setColor4("cloudColor", this._cloudColor);
        this.setFloat("amplitude", this._amplitude);
        this.setInt("numOctaves", this._numOctaves);
    };
    Object.defineProperty(CloudProceduralTexture.prototype, "skyColor", {
        get: function () {
            return this._skyColor;
        },
        set: function (value) {
            this._skyColor = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CloudProceduralTexture.prototype, "cloudColor", {
        get: function () {
            return this._cloudColor;
        },
        set: function (value) {
            this._cloudColor = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CloudProceduralTexture.prototype, "amplitude", {
        get: function () {
            return this._amplitude;
        },
        set: function (value) {
            this._amplitude = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CloudProceduralTexture.prototype, "numOctaves", {
        get: function () {
            return this._numOctaves;
        },
        set: function (value) {
            this._numOctaves = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Serializes this cloud procedural texture
     * @returns a serialized cloud procedural texture object
     */
    CloudProceduralTexture.prototype.serialize = function () {
        var serializationObject = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Serialize(this, _super.prototype.serialize.call(this));
        serializationObject.customType = "BABYLON.CloudProceduralTexture";
        return serializationObject;
    };
    /**
     * Creates a Cloud Procedural Texture from parsed cloud procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing cloud procedural texture information
     * @returns a parsed Cloud Procedural Texture
     */
    CloudProceduralTexture.Parse = function (parsedTexture, scene, rootUrl) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new CloudProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps); }, parsedTexture, scene, rootUrl);
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor4)()
    ], CloudProceduralTexture.prototype, "skyColor", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor4)()
    ], CloudProceduralTexture.prototype, "cloudColor", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], CloudProceduralTexture.prototype, "amplitude", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], CloudProceduralTexture.prototype, "numOctaves", null);
    return CloudProceduralTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.ProceduralTexture));
(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.CloudProceduralTexture", CloudProceduralTexture);


/***/ }),

/***/ "../../../dev/proceduralTextures/src/cloud/index.ts":
/*!**********************************************************!*\
  !*** ../../../dev/proceduralTextures/src/cloud/index.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CloudProceduralTexture: () => (/* reexport safe */ _cloudProceduralTexture__WEBPACK_IMPORTED_MODULE_0__.CloudProceduralTexture)
/* harmony export */ });
/* harmony import */ var _cloudProceduralTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cloudProceduralTexture */ "../../../dev/proceduralTextures/src/cloud/cloudProceduralTexture.ts");



/***/ }),

/***/ "../../../dev/proceduralTextures/src/fire/fireProceduralTexture.fragment.ts":
/*!**********************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/fire/fireProceduralTexture.fragment.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fireProceduralTexturePixelShader: () => (/* binding */ fireProceduralTexturePixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "fireProceduralTexturePixelShader";
var shader = "precision highp float;uniform float time;uniform vec3 c1;uniform vec3 c2;uniform vec3 c3;uniform vec3 c4;uniform vec3 c5;uniform vec3 c6;uniform vec2 speed;uniform float shift;uniform float alphaThreshold;varying vec2 vUV;float rand(vec2 n) {return fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);}\nfloat noise(vec2 n) {const vec2 d=vec2(0.0,1.0);vec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));return mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);}\nfloat fbm(vec2 n) {float total=0.0,amplitude=1.0;for (int i=0; i<4; i++) {total+=noise(n)*amplitude;n+=n;amplitude*=0.5;}\nreturn total;}\nvoid main() {vec2 p=vUV*8.0;float q=fbm(p-time*0.1);vec2 r=vec2(fbm(p+q+time*speed.x-p.x-p.y),fbm(p+q-time*speed.y));vec3 c=mix(c1,c2,fbm(p+r))+mix(c3,c4,r.x)-mix(c5,c6,r.y);vec3 color=c*cos(shift*vUV.y);float luminance=dot(color.rgb,vec3(0.3,0.59,0.11));gl_FragColor=vec4(color,luminance*alphaThreshold+(1.0-alphaThreshold));}";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var fireProceduralTexturePixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/proceduralTextures/src/fire/fireProceduralTexture.ts":
/*!*************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/fire/fireProceduralTexture.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FireProceduralTexture: () => (/* binding */ FireProceduralTexture)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/typeStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fireProceduralTexture_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fireProceduralTexture.fragment */ "../../../dev/proceduralTextures/src/fire/fireProceduralTexture.fragment.ts");








var FireProceduralTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(FireProceduralTexture, _super);
    function FireProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, name, size, "fireProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
        _this._time = 0.0;
        _this._speed = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Vector2(0.5, 0.3);
        _this._autoGenerateTime = true;
        _this._alphaThreshold = 0.5;
        _this._fireColors = FireProceduralTexture.RedFireColors;
        _this.updateShaderUniforms();
        return _this;
    }
    FireProceduralTexture.prototype.updateShaderUniforms = function () {
        this.setFloat("time", this._time);
        this.setVector2("speed", this._speed);
        this.setColor3("c1", this._fireColors[0]);
        this.setColor3("c2", this._fireColors[1]);
        this.setColor3("c3", this._fireColors[2]);
        this.setColor3("c4", this._fireColors[3]);
        this.setColor3("c5", this._fireColors[4]);
        this.setColor3("c6", this._fireColors[5]);
        this.setFloat("alphaThreshold", this._alphaThreshold);
    };
    FireProceduralTexture.prototype.render = function (useCameraPostProcess) {
        var scene = this.getScene();
        if (this._autoGenerateTime && scene) {
            this._time += scene.getAnimationRatio() * 0.03;
            this.updateShaderUniforms();
        }
        _super.prototype.render.call(this, useCameraPostProcess);
    };
    Object.defineProperty(FireProceduralTexture, "PurpleFireColors", {
        get: function () {
            return [new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.5, 0.0, 1.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.9, 0.0, 1.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.2, 0.0, 1.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(1.0, 0.9, 1.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.1, 0.1, 1.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.9, 0.9, 1.0)];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FireProceduralTexture, "GreenFireColors", {
        get: function () {
            return [new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.5, 1.0, 0.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.5, 1.0, 0.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.3, 0.4, 0.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.5, 1.0, 0.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.2, 0.0, 0.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.5, 1.0, 0.0)];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FireProceduralTexture, "RedFireColors", {
        get: function () {
            return [new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.5, 0.0, 0.1), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.9, 0.0, 0.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.2, 0.0, 0.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(1.0, 0.9, 0.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.1, 0.1, 0.1), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.9, 0.9, 0.9)];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FireProceduralTexture, "BlueFireColors", {
        get: function () {
            return [new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.1, 0.0, 0.5), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.0, 0.0, 0.5), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.1, 0.0, 0.2), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.0, 0.0, 1.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.1, 0.2, 0.3), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.0, 0.2, 0.9)];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FireProceduralTexture.prototype, "autoGenerateTime", {
        get: function () {
            return this._autoGenerateTime;
        },
        set: function (value) {
            this._autoGenerateTime = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FireProceduralTexture.prototype, "fireColors", {
        get: function () {
            return this._fireColors;
        },
        set: function (value) {
            this._fireColors = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FireProceduralTexture.prototype, "time", {
        get: function () {
            return this._time;
        },
        set: function (value) {
            this._time = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FireProceduralTexture.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        set: function (value) {
            this._speed = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FireProceduralTexture.prototype, "alphaThreshold", {
        get: function () {
            return this._alphaThreshold;
        },
        set: function (value) {
            this._alphaThreshold = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Serializes this fire procedural texture
     * @returns a serialized fire procedural texture object
     */
    FireProceduralTexture.prototype.serialize = function () {
        var serializationObject = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Serialize(this, _super.prototype.serialize.call(this));
        serializationObject.customType = "BABYLON.FireProceduralTexture";
        serializationObject.fireColors = [];
        for (var i = 0; i < this._fireColors.length; i++) {
            serializationObject.fireColors.push(this._fireColors[i].asArray());
        }
        return serializationObject;
    };
    /**
     * Creates a Fire Procedural Texture from parsed fire procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing fire procedural texture information
     * @returns a parsed Fire Procedural Texture
     */
    FireProceduralTexture.Parse = function (parsedTexture, scene, rootUrl) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new FireProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps); }, parsedTexture, scene, rootUrl);
        var colors = [];
        for (var i = 0; i < parsedTexture.fireColors.length; i++) {
            colors.push(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(parsedTexture.fireColors[i]));
        }
        texture.fireColors = colors;
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], FireProceduralTexture.prototype, "autoGenerateTime", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], FireProceduralTexture.prototype, "time", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsVector2)()
    ], FireProceduralTexture.prototype, "speed", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], FireProceduralTexture.prototype, "alphaThreshold", null);
    return FireProceduralTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.ProceduralTexture));
(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.FireProceduralTexture", FireProceduralTexture);


/***/ }),

/***/ "../../../dev/proceduralTextures/src/fire/index.ts":
/*!*********************************************************!*\
  !*** ../../../dev/proceduralTextures/src/fire/index.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FireProceduralTexture: () => (/* reexport safe */ _fireProceduralTexture__WEBPACK_IMPORTED_MODULE_0__.FireProceduralTexture)
/* harmony export */ });
/* harmony import */ var _fireProceduralTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fireProceduralTexture */ "../../../dev/proceduralTextures/src/fire/fireProceduralTexture.ts");



/***/ }),

/***/ "../../../dev/proceduralTextures/src/grass/grassProceduralTexture.fragment.ts":
/*!************************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/grass/grassProceduralTexture.fragment.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   grassProceduralTexturePixelShader: () => (/* binding */ grassProceduralTexturePixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "grassProceduralTexturePixelShader";
var shader = "precision highp float;varying vec2 vPosition;varying vec2 vUV;uniform vec3 herb1Color;uniform vec3 herb2Color;uniform vec3 herb3Color;uniform vec3 groundColor;float rand(vec2 n) {return fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);}\nfloat noise(vec2 n) {const vec2 d=vec2(0.0,1.0);vec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));return mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);}\nfloat fbm(vec2 n) {float total=0.0,amplitude=1.0;for (int i=0; i<4; i++) {total+=noise(n)*amplitude;n+=n;amplitude*=0.5;}\nreturn total;}\n#define CUSTOM_FRAGMENT_DEFINITIONS\nvoid main(void) {\n#define CUSTOM_FRAGMENT_MAIN_BEGIN\nvec3 color=mix(groundColor,herb1Color,rand(gl_FragCoord.xy*4.0));color=mix(color,herb2Color,rand(gl_FragCoord.xy*8.0));color=mix(color,herb3Color,rand(gl_FragCoord.xy));color=mix(color,herb1Color,fbm(gl_FragCoord.xy*16.0));gl_FragColor=vec4(color,1.0);\n#define CUSTOM_FRAGMENT_MAIN_END\n}";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var grassProceduralTexturePixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/proceduralTextures/src/grass/grassProceduralTexture.ts":
/*!***************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/grass/grassProceduralTexture.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GrassProceduralTexture: () => (/* binding */ GrassProceduralTexture)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/typeStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grassProceduralTexture_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grassProceduralTexture.fragment */ "../../../dev/proceduralTextures/src/grass/grassProceduralTexture.fragment.ts");







var GrassProceduralTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(GrassProceduralTexture, _super);
    function GrassProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, name, size, "grassProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
        _this._groundColor = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(1, 1, 1);
        _this._grassColors = [new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.29, 0.38, 0.02), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.36, 0.49, 0.09), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.51, 0.6, 0.28)];
        _this.updateShaderUniforms();
        return _this;
    }
    GrassProceduralTexture.prototype.updateShaderUniforms = function () {
        this.setColor3("herb1Color", this._grassColors[0]);
        this.setColor3("herb2Color", this._grassColors[1]);
        this.setColor3("herb3Color", this._grassColors[2]);
        this.setColor3("groundColor", this._groundColor);
    };
    Object.defineProperty(GrassProceduralTexture.prototype, "grassColors", {
        get: function () {
            return this._grassColors;
        },
        set: function (value) {
            this._grassColors = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GrassProceduralTexture.prototype, "groundColor", {
        get: function () {
            return this._groundColor;
        },
        set: function (value) {
            this._groundColor = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Serializes this grass procedural texture
     * @returns a serialized grass procedural texture object
     */
    GrassProceduralTexture.prototype.serialize = function () {
        var serializationObject = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Serialize(this, _super.prototype.serialize.call(this));
        serializationObject.customType = "BABYLON.GrassProceduralTexture";
        serializationObject.grassColors = [];
        for (var i = 0; i < this._grassColors.length; i++) {
            serializationObject.grassColors.push(this._grassColors[i].asArray());
        }
        return serializationObject;
    };
    /**
     * Creates a Grass Procedural Texture from parsed grass procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing grass procedural texture information
     * @returns a parsed Grass Procedural Texture
     */
    GrassProceduralTexture.Parse = function (parsedTexture, scene, rootUrl) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new GrassProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps); }, parsedTexture, scene, rootUrl);
        var colors = [];
        for (var i = 0; i < parsedTexture.grassColors.length; i++) {
            colors.push(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(parsedTexture.grassColors[i]));
        }
        texture.grassColors = colors;
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor3)()
    ], GrassProceduralTexture.prototype, "groundColor", null);
    return GrassProceduralTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.ProceduralTexture));
(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.GrassProceduralTexture", GrassProceduralTexture);


/***/ }),

/***/ "../../../dev/proceduralTextures/src/grass/index.ts":
/*!**********************************************************!*\
  !*** ../../../dev/proceduralTextures/src/grass/index.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GrassProceduralTexture: () => (/* reexport safe */ _grassProceduralTexture__WEBPACK_IMPORTED_MODULE_0__.GrassProceduralTexture)
/* harmony export */ });
/* harmony import */ var _grassProceduralTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grassProceduralTexture */ "../../../dev/proceduralTextures/src/grass/grassProceduralTexture.ts");



/***/ }),

/***/ "../../../dev/proceduralTextures/src/index.ts":
/*!****************************************************!*\
  !*** ../../../dev/proceduralTextures/src/index.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BrickProceduralTexture: () => (/* reexport safe */ _brick_index__WEBPACK_IMPORTED_MODULE_0__.BrickProceduralTexture),
/* harmony export */   CloudProceduralTexture: () => (/* reexport safe */ _cloud_index__WEBPACK_IMPORTED_MODULE_1__.CloudProceduralTexture),
/* harmony export */   FireProceduralTexture: () => (/* reexport safe */ _fire_index__WEBPACK_IMPORTED_MODULE_2__.FireProceduralTexture),
/* harmony export */   GrassProceduralTexture: () => (/* reexport safe */ _grass_index__WEBPACK_IMPORTED_MODULE_3__.GrassProceduralTexture),
/* harmony export */   MarbleProceduralTexture: () => (/* reexport safe */ _marble_index__WEBPACK_IMPORTED_MODULE_4__.MarbleProceduralTexture),
/* harmony export */   NormalMapProceduralTexture: () => (/* reexport safe */ _normalMap_index__WEBPACK_IMPORTED_MODULE_5__.NormalMapProceduralTexture),
/* harmony export */   PerlinNoiseProceduralTexture: () => (/* reexport safe */ _perlinNoise_index__WEBPACK_IMPORTED_MODULE_6__.PerlinNoiseProceduralTexture),
/* harmony export */   RoadProceduralTexture: () => (/* reexport safe */ _road_index__WEBPACK_IMPORTED_MODULE_7__.RoadProceduralTexture),
/* harmony export */   StarfieldProceduralTexture: () => (/* reexport safe */ _starfield_index__WEBPACK_IMPORTED_MODULE_8__.StarfieldProceduralTexture),
/* harmony export */   WoodProceduralTexture: () => (/* reexport safe */ _wood_index__WEBPACK_IMPORTED_MODULE_9__.WoodProceduralTexture)
/* harmony export */ });
/* harmony import */ var _brick_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./brick/index */ "../../../dev/proceduralTextures/src/brick/index.ts");
/* harmony import */ var _cloud_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cloud/index */ "../../../dev/proceduralTextures/src/cloud/index.ts");
/* harmony import */ var _fire_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fire/index */ "../../../dev/proceduralTextures/src/fire/index.ts");
/* harmony import */ var _grass_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./grass/index */ "../../../dev/proceduralTextures/src/grass/index.ts");
/* harmony import */ var _marble_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./marble/index */ "../../../dev/proceduralTextures/src/marble/index.ts");
/* harmony import */ var _normalMap_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./normalMap/index */ "../../../dev/proceduralTextures/src/normalMap/index.ts");
/* harmony import */ var _perlinNoise_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./perlinNoise/index */ "../../../dev/proceduralTextures/src/perlinNoise/index.ts");
/* harmony import */ var _road_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./road/index */ "../../../dev/proceduralTextures/src/road/index.ts");
/* harmony import */ var _starfield_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./starfield/index */ "../../../dev/proceduralTextures/src/starfield/index.ts");
/* harmony import */ var _wood_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./wood/index */ "../../../dev/proceduralTextures/src/wood/index.ts");
/* eslint-disable import/no-internal-modules */












/***/ }),

/***/ "../../../dev/proceduralTextures/src/marble/index.ts":
/*!***********************************************************!*\
  !*** ../../../dev/proceduralTextures/src/marble/index.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MarbleProceduralTexture: () => (/* reexport safe */ _marbleProceduralTexture__WEBPACK_IMPORTED_MODULE_0__.MarbleProceduralTexture)
/* harmony export */ });
/* harmony import */ var _marbleProceduralTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./marbleProceduralTexture */ "../../../dev/proceduralTextures/src/marble/marbleProceduralTexture.ts");



/***/ }),

/***/ "../../../dev/proceduralTextures/src/marble/marbleProceduralTexture.fragment.ts":
/*!**************************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/marble/marbleProceduralTexture.fragment.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   marbleProceduralTexturePixelShader: () => (/* binding */ marbleProceduralTexturePixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "marbleProceduralTexturePixelShader";
var shader = "precision highp float;varying vec2 vPosition;varying vec2 vUV;uniform float numberOfTilesHeight;uniform float numberOfTilesWidth;uniform float amplitude;uniform vec3 marbleColor;uniform vec3 jointColor;const vec3 tileSize=vec3(1.1,1.0,1.1);const vec3 tilePct=vec3(0.98,1.0,0.98);float rand(vec2 n) {return fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);}\nfloat noise(vec2 n) {const vec2 d=vec2(0.0,1.0);vec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));return mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);}\nfloat turbulence(vec2 P)\n{float val=0.0;float freq=1.0;for (int i=0; i<4; i++)\n{val+=abs(noise(P*freq)/freq);freq*=2.07;}\nreturn val;}\nfloat roundF(float number){return sign(number)*floor(abs(number)+0.5);}\nvec3 marble_color(float x)\n{vec3 col;x=0.5*(x+1.);x=sqrt(x); \nx=sqrt(x);x=sqrt(x);col=vec3(.2+.75*x); \ncol.b*=0.95; \nreturn col;}\nvoid main()\n{float brickW=1.0/numberOfTilesWidth;float brickH=1.0/numberOfTilesHeight;float jointWPercentage=0.01;float jointHPercentage=0.01;vec3 color=marbleColor;float yi=vUV.y/brickH;float nyi=roundF(yi);float xi=vUV.x/brickW;if (mod(floor(yi),2.0)==0.0){xi=xi-0.5;}\nfloat nxi=roundF(xi);vec2 brickvUV=vec2((xi-floor(xi))/brickH,(yi-floor(yi))/brickW);if (yi<nyi+jointHPercentage && yi>nyi-jointHPercentage){color=mix(jointColor,vec3(0.37,0.25,0.25),(yi-nyi)/jointHPercentage+0.2);}\nelse if (xi<nxi+jointWPercentage && xi>nxi-jointWPercentage){color=mix(jointColor,vec3(0.44,0.44,0.44),(xi-nxi)/jointWPercentage+0.2);}\nelse {float t=6.28*brickvUV.x/(tileSize.x+noise(vec2(vUV)*6.0));t+=amplitude*turbulence(brickvUV.xy);t=sin(t);color=marble_color(t);}\ngl_FragColor=vec4(color,0.0);}";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var marbleProceduralTexturePixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/proceduralTextures/src/marble/marbleProceduralTexture.ts":
/*!*****************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/marble/marbleProceduralTexture.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MarbleProceduralTexture: () => (/* binding */ MarbleProceduralTexture)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/typeStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _marbleProceduralTexture_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./marbleProceduralTexture.fragment */ "../../../dev/proceduralTextures/src/marble/marbleProceduralTexture.fragment.ts");







var MarbleProceduralTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(MarbleProceduralTexture, _super);
    function MarbleProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, name, size, "marbleProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
        _this._numberOfTilesHeight = 3;
        _this._numberOfTilesWidth = 3;
        _this._amplitude = 9.0;
        _this._jointColor = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.72, 0.72, 0.72);
        _this.updateShaderUniforms();
        return _this;
    }
    MarbleProceduralTexture.prototype.updateShaderUniforms = function () {
        this.setFloat("numberOfTilesHeight", this._numberOfTilesHeight);
        this.setFloat("numberOfTilesWidth", this._numberOfTilesWidth);
        this.setFloat("amplitude", this._amplitude);
        this.setColor3("jointColor", this._jointColor);
    };
    Object.defineProperty(MarbleProceduralTexture.prototype, "numberOfTilesHeight", {
        get: function () {
            return this._numberOfTilesHeight;
        },
        set: function (value) {
            this._numberOfTilesHeight = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MarbleProceduralTexture.prototype, "amplitude", {
        get: function () {
            return this._amplitude;
        },
        set: function (value) {
            this._amplitude = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MarbleProceduralTexture.prototype, "numberOfTilesWidth", {
        get: function () {
            return this._numberOfTilesWidth;
        },
        set: function (value) {
            this._numberOfTilesWidth = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MarbleProceduralTexture.prototype, "jointColor", {
        get: function () {
            return this._jointColor;
        },
        set: function (value) {
            this._jointColor = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Serializes this marble procedural texture
     * @returns a serialized marble procedural texture object
     */
    MarbleProceduralTexture.prototype.serialize = function () {
        var serializationObject = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Serialize(this, _super.prototype.serialize.call(this));
        serializationObject.customType = "BABYLON.MarbleProceduralTexture";
        return serializationObject;
    };
    /**
     * Creates a Marble Procedural Texture from parsed marble procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing marble procedural texture information
     * @returns a parsed Marble Procedural Texture
     */
    MarbleProceduralTexture.Parse = function (parsedTexture, scene, rootUrl) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new MarbleProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps); }, parsedTexture, scene, rootUrl);
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], MarbleProceduralTexture.prototype, "numberOfTilesHeight", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], MarbleProceduralTexture.prototype, "amplitude", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], MarbleProceduralTexture.prototype, "numberOfTilesWidth", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], MarbleProceduralTexture.prototype, "jointColor", null);
    return MarbleProceduralTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.ProceduralTexture));
(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.MarbleProceduralTexture", MarbleProceduralTexture);


/***/ }),

/***/ "../../../dev/proceduralTextures/src/normalMap/index.ts":
/*!**************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/normalMap/index.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NormalMapProceduralTexture: () => (/* reexport safe */ _normalMapProceduralTexture__WEBPACK_IMPORTED_MODULE_0__.NormalMapProceduralTexture)
/* harmony export */ });
/* harmony import */ var _normalMapProceduralTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./normalMapProceduralTexture */ "../../../dev/proceduralTextures/src/normalMap/normalMapProceduralTexture.ts");



/***/ }),

/***/ "../../../dev/proceduralTextures/src/normalMap/normalMapProceduralTexture.fragment.ts":
/*!********************************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/normalMap/normalMapProceduralTexture.fragment.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalMapProceduralTexturePixelShader: () => (/* binding */ normalMapProceduralTexturePixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "normalMapProceduralTexturePixelShader";
var shader = "precision highp float;uniform sampler2D baseSampler;uniform float size;varying vec2 vUV;const vec3 LUMA_COEFFICIENT=vec3(0.2126,0.7152,0.0722);float lumaAtCoord(vec2 coord)\n{vec3 pixel=texture2D(baseSampler,coord).rgb;float luma=dot(pixel,LUMA_COEFFICIENT);return luma;}\nvoid main()\n{float lumaU0=lumaAtCoord(vUV+vec2(-1.0, 0.0)/size);float lumaU1=lumaAtCoord(vUV+vec2( 1.0, 0.0)/size);float lumaV0=lumaAtCoord(vUV+vec2( 0.0,-1.0)/size);float lumaV1=lumaAtCoord(vUV+vec2( 0.0, 1.0)/size);vec2 slope=(vec2(lumaU0-lumaU1,lumaV0-lumaV1)+1.0)*0.5;gl_FragColor=vec4(slope,1.0,1.0);}\n";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var normalMapProceduralTexturePixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/proceduralTextures/src/normalMap/normalMapProceduralTexture.ts":
/*!***********************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/normalMap/normalMapProceduralTexture.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NormalMapProceduralTexture: () => (/* binding */ NormalMapProceduralTexture)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/typeStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _normalMapProceduralTexture_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./normalMapProceduralTexture.fragment */ "../../../dev/proceduralTextures/src/normalMap/normalMapProceduralTexture.fragment.ts");






var NormalMapProceduralTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(NormalMapProceduralTexture, _super);
    function NormalMapProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, name, size, "normalMapProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
        _this.updateShaderUniforms();
        return _this;
    }
    NormalMapProceduralTexture.prototype.updateShaderUniforms = function () {
        this.setTexture("baseSampler", this._baseTexture);
        this.setFloat("size", this.getRenderSize());
    };
    NormalMapProceduralTexture.prototype.render = function (useCameraPostProcess) {
        _super.prototype.render.call(this, useCameraPostProcess);
    };
    NormalMapProceduralTexture.prototype.resize = function (size, generateMipMaps) {
        _super.prototype.resize.call(this, size, generateMipMaps);
        // We need to update the "size" uniform
        this.updateShaderUniforms();
    };
    NormalMapProceduralTexture.prototype.isReady = function () {
        if (!this._baseTexture || !this._baseTexture.isReady()) {
            return false;
        }
        return _super.prototype.isReady.call(this);
    };
    Object.defineProperty(NormalMapProceduralTexture.prototype, "baseTexture", {
        get: function () {
            return this._baseTexture;
        },
        set: function (texture) {
            this._baseTexture = texture;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Serializes this normal map procedural texture
     * @returns a serialized normal map procedural texture object
     */
    NormalMapProceduralTexture.prototype.serialize = function () {
        var serializationObject = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Serialize(this, _super.prototype.serialize.call(this));
        serializationObject.customType = "BABYLON.NormalMapProceduralTexture";
        return serializationObject;
    };
    /**
     * Creates a Normal Map Procedural Texture from parsed normal map procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing normal map procedural texture information
     * @returns a parsed Normal Map Procedural Texture
     */
    NormalMapProceduralTexture.Parse = function (parsedTexture, scene, rootUrl) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new NormalMapProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps); }, parsedTexture, scene, rootUrl);
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsTexture)()
    ], NormalMapProceduralTexture.prototype, "baseTexture", null);
    return NormalMapProceduralTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.ProceduralTexture));
(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.NormalMapProceduralTexture", NormalMapProceduralTexture);


/***/ }),

/***/ "../../../dev/proceduralTextures/src/perlinNoise/index.ts":
/*!****************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/perlinNoise/index.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PerlinNoiseProceduralTexture: () => (/* reexport safe */ _perlinNoiseProceduralTexture__WEBPACK_IMPORTED_MODULE_0__.PerlinNoiseProceduralTexture)
/* harmony export */ });
/* harmony import */ var _perlinNoiseProceduralTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./perlinNoiseProceduralTexture */ "../../../dev/proceduralTextures/src/perlinNoise/perlinNoiseProceduralTexture.ts");



/***/ }),

/***/ "../../../dev/proceduralTextures/src/perlinNoise/perlinNoiseProceduralTexture.fragment.ts":
/*!************************************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/perlinNoise/perlinNoiseProceduralTexture.fragment.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   perlinNoiseProceduralTexturePixelShader: () => (/* binding */ perlinNoiseProceduralTexturePixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "perlinNoiseProceduralTexturePixelShader";
var shader = "precision highp float;uniform float size;uniform float time;uniform float translationSpeed;varying vec2 vUV;float r(float n)\n{return fract(cos(n*89.42)*343.42);}\nvec2 r(vec2 n)\n{return vec2(r(n.x*23.62-300.0+n.y*34.35),r(n.x*45.13+256.0+n.y*38.89)); }\nfloat worley(vec2 n,float s)\n{float dis=1.0;for(int x=-1; x<=1; x++)\n{for(int y=-1; y<=1; y++)\n{vec2 p=floor(n/s)+vec2(x,y);float d=length(r(p)+vec2(x,y)-fract(n/s));if (dis>d)\ndis=d;}}\nreturn 1.0-dis;}\nvec3 hash33(vec3 p3)\n{p3=fract(p3*vec3(0.1031,0.11369,0.13787));p3+=dot(p3,p3.yxz+19.19);return -1.0+2.0*fract(vec3((p3.x+p3.y)*p3.z,(p3.x+p3.z)*p3.y,(p3.y+p3.z)*p3.x));}\nfloat perlinNoise(vec3 p)\n{vec3 pi=floor(p);vec3 pf=p-pi;vec3 w=pf*pf*(3.0-2.0*pf);return mix(\nmix(\nmix(\ndot(pf-vec3(0,0,0),hash33(pi+vec3(0,0,0))),\ndot(pf-vec3(1,0,0),hash33(pi+vec3(1,0,0))),\nw.x\n),\nmix(\ndot(pf-vec3(0,0,1),hash33(pi+vec3(0,0,1))),\ndot(pf-vec3(1,0,1),hash33(pi+vec3(1,0,1))),\nw.x\n),\nw.z\n),\nmix(\nmix(\ndot(pf-vec3(0,1,0),hash33(pi+vec3(0,1,0))),\ndot(pf-vec3(1,1,0),hash33(pi+vec3(1,1,0))),\nw.x\n),\nmix(\ndot(pf-vec3(0,1,1),hash33(pi+vec3(0,1,1))),\ndot(pf-vec3(1,1,1),hash33(pi+vec3(1,1,1))),\nw.x\n),\nw.z\n),\nw.y\n);}\n#define CUSTOM_FRAGMENT_DEFINITIONS\nvoid main(void)\n{vec2 uv=gl_FragCoord.xy+translationSpeed;float dis=(\n1.0+perlinNoise(vec3(uv/vec2(size,size),time*0.05)*8.0))\n* (1.0+(worley(uv,32.0)+ 0.5*worley(2.0*uv,32.0)+0.25*worley(4.0*uv,32.0))\n);gl_FragColor=vec4(vec3(dis/4.0),1.0);}\n";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var perlinNoiseProceduralTexturePixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/proceduralTextures/src/perlinNoise/perlinNoiseProceduralTexture.ts":
/*!***************************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/perlinNoise/perlinNoiseProceduralTexture.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PerlinNoiseProceduralTexture: () => (/* binding */ PerlinNoiseProceduralTexture)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/typeStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _perlinNoiseProceduralTexture_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./perlinNoiseProceduralTexture.fragment */ "../../../dev/proceduralTextures/src/perlinNoise/perlinNoiseProceduralTexture.fragment.ts");






var PerlinNoiseProceduralTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(PerlinNoiseProceduralTexture, _super);
    function PerlinNoiseProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, name, size, "perlinNoiseProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
        _this.time = 0.0;
        _this.timeScale = 1.0;
        _this.translationSpeed = 1.0;
        _this._currentTranslation = 0;
        _this.updateShaderUniforms();
        return _this;
    }
    PerlinNoiseProceduralTexture.prototype.updateShaderUniforms = function () {
        this.setFloat("size", this.getRenderSize());
        var scene = this.getScene();
        if (!scene) {
            return;
        }
        var deltaTime = scene.getEngine().getDeltaTime();
        this.time += deltaTime;
        this.setFloat("time", (this.time * this.timeScale) / 1000);
        this._currentTranslation += (deltaTime * this.translationSpeed) / 1000.0;
        this.setFloat("translationSpeed", this._currentTranslation);
    };
    PerlinNoiseProceduralTexture.prototype.render = function (useCameraPostProcess) {
        this.updateShaderUniforms();
        _super.prototype.render.call(this, useCameraPostProcess);
    };
    PerlinNoiseProceduralTexture.prototype.resize = function (size, generateMipMaps) {
        _super.prototype.resize.call(this, size, generateMipMaps);
    };
    /**
     * Serializes this perlin noise procedural texture
     * @returns a serialized perlin noise procedural texture object
     */
    PerlinNoiseProceduralTexture.prototype.serialize = function () {
        var serializationObject = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Serialize(this, _super.prototype.serialize.call(this));
        serializationObject.customType = "BABYLON.PerlinNoiseProceduralTexture";
        return serializationObject;
    };
    /**
     * Creates a Perlin Noise Procedural Texture from parsed perlin noise procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing perlin noise procedural texture information
     * @returns a parsed Perlin Noise Procedural Texture
     */
    PerlinNoiseProceduralTexture.Parse = function (parsedTexture, scene, rootUrl) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new PerlinNoiseProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps); }, parsedTexture, scene, rootUrl);
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], PerlinNoiseProceduralTexture.prototype, "time", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], PerlinNoiseProceduralTexture.prototype, "timeScale", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], PerlinNoiseProceduralTexture.prototype, "translationSpeed", void 0);
    return PerlinNoiseProceduralTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.ProceduralTexture));
(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.PerlinNoiseProceduralTexture", PerlinNoiseProceduralTexture);


/***/ }),

/***/ "../../../dev/proceduralTextures/src/road/index.ts":
/*!*********************************************************!*\
  !*** ../../../dev/proceduralTextures/src/road/index.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoadProceduralTexture: () => (/* reexport safe */ _roadProceduralTexture__WEBPACK_IMPORTED_MODULE_0__.RoadProceduralTexture)
/* harmony export */ });
/* harmony import */ var _roadProceduralTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./roadProceduralTexture */ "../../../dev/proceduralTextures/src/road/roadProceduralTexture.ts");



/***/ }),

/***/ "../../../dev/proceduralTextures/src/road/roadProceduralTexture.fragment.ts":
/*!**********************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/road/roadProceduralTexture.fragment.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   roadProceduralTexturePixelShader: () => (/* binding */ roadProceduralTexturePixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "roadProceduralTexturePixelShader";
var shader = "precision highp float;varying vec2 vUV; \nuniform vec3 roadColor;float rand(vec2 n) {return fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);}\nfloat noise(vec2 n) {const vec2 d=vec2(0.0,1.0);vec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));return mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);}\nfloat fbm(vec2 n) {float total=0.0,amplitude=1.0;for (int i=0; i<4; i++) {total+=noise(n)*amplitude;n+=n;amplitude*=0.5;}\nreturn total;}\n#define CUSTOM_FRAGMENT_DEFINITIONS\nvoid main(void) {\n#define CUSTOM_FRAGMENT_MAIN_BEGIN\nfloat ratioy=mod(gl_FragCoord.y*100.0 ,fbm(vUV*2.0));vec3 color=roadColor*ratioy;gl_FragColor=vec4(color,1.0);\n#define CUSTOM_FRAGMENT_MAIN_END\n}";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var roadProceduralTexturePixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/proceduralTextures/src/road/roadProceduralTexture.ts":
/*!*************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/road/roadProceduralTexture.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoadProceduralTexture: () => (/* binding */ RoadProceduralTexture)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/typeStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _roadProceduralTexture_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./roadProceduralTexture.fragment */ "../../../dev/proceduralTextures/src/road/roadProceduralTexture.fragment.ts");







var RoadProceduralTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(RoadProceduralTexture, _super);
    function RoadProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, name, size, "roadProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
        _this._roadColor = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.53, 0.53, 0.53);
        _this.updateShaderUniforms();
        return _this;
    }
    RoadProceduralTexture.prototype.updateShaderUniforms = function () {
        this.setColor3("roadColor", this._roadColor);
    };
    Object.defineProperty(RoadProceduralTexture.prototype, "roadColor", {
        get: function () {
            return this._roadColor;
        },
        set: function (value) {
            this._roadColor = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Serializes this road procedural texture
     * @returns a serialized road procedural texture object
     */
    RoadProceduralTexture.prototype.serialize = function () {
        var serializationObject = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Serialize(this, _super.prototype.serialize.call(this));
        serializationObject.customType = "BABYLON.RoadProceduralTexture";
        return serializationObject;
    };
    /**
     * Creates a Road Procedural Texture from parsed road procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing road procedural texture information
     * @returns a parsed Road Procedural Texture
     */
    RoadProceduralTexture.Parse = function (parsedTexture, scene, rootUrl) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new RoadProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps); }, parsedTexture, scene, rootUrl);
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor3)()
    ], RoadProceduralTexture.prototype, "roadColor", null);
    return RoadProceduralTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.ProceduralTexture));
(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.RoadProceduralTexture", RoadProceduralTexture);


/***/ }),

/***/ "../../../dev/proceduralTextures/src/starfield/index.ts":
/*!**************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/starfield/index.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StarfieldProceduralTexture: () => (/* reexport safe */ _starfieldProceduralTexture__WEBPACK_IMPORTED_MODULE_0__.StarfieldProceduralTexture)
/* harmony export */ });
/* harmony import */ var _starfieldProceduralTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./starfieldProceduralTexture */ "../../../dev/proceduralTextures/src/starfield/starfieldProceduralTexture.ts");



/***/ }),

/***/ "../../../dev/proceduralTextures/src/starfield/starfieldProceduralTexture.fragment.ts":
/*!********************************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/starfield/starfieldProceduralTexture.fragment.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   starfieldProceduralTexturePixelShader: () => (/* binding */ starfieldProceduralTexturePixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "starfieldProceduralTexturePixelShader";
var shader = "precision highp float;\n#define volsteps 20\n#define iterations 15\nvarying vec2 vPosition;varying vec2 vUV;uniform float time;uniform float alpha;uniform float beta;uniform float zoom;uniform float formuparam;uniform float stepsize;uniform float tile;uniform float brightness;uniform float darkmatter;uniform float distfading;uniform float saturation;void main()\n{vec3 dir=vec3(vUV*zoom,1.);float localTime=time*0.0001;mat2 rot1=mat2(cos(alpha),sin(alpha),-sin(alpha),cos(alpha));mat2 rot2=mat2(cos(beta),sin(beta),-sin(beta),cos(beta));dir.xz*=rot1;dir.xy*=rot2;vec3 from_=vec3(1.,.5,0.5);from_+=vec3(-2.,localTime*2.,localTime);from_.xz*=rot1;from_.xy*=rot2;float s=0.1,fade=1.;vec3 v=vec3(0.);for (int r=0; r<volsteps; r++) {vec3 p=from_+s*dir*.5;p=abs(vec3(tile)-mod(p,vec3(tile*2.))); \nfloat pa,a=pa=0.;for (int i=0; i<iterations; i++) {p=abs(p)/dot(p,p)-formuparam; \na+=abs(length(p)-pa); \npa=length(p);}\nfloat dm=max(0.,darkmatter-a*a*.001); \na*=a*a; \nif (r>6) fade*=1.-dm; \nv+=fade;v+=vec3(s,s*s,s*s*s*s)*a*brightness*fade; \nfade*=distfading; \ns+=stepsize;}\nv=mix(vec3(length(v)),v,saturation); \ngl_FragColor=vec4(v*.01,1.);}";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var starfieldProceduralTexturePixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/proceduralTextures/src/starfield/starfieldProceduralTexture.ts":
/*!***********************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/starfield/starfieldProceduralTexture.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StarfieldProceduralTexture: () => (/* binding */ StarfieldProceduralTexture)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/typeStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _starfieldProceduralTexture_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./starfieldProceduralTexture.fragment */ "../../../dev/proceduralTextures/src/starfield/starfieldProceduralTexture.fragment.ts");






var StarfieldProceduralTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(StarfieldProceduralTexture, _super);
    function StarfieldProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, name, size, "starfieldProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
        _this._time = 1;
        _this._alpha = 0.5;
        _this._beta = 0.8;
        _this._zoom = 0.8;
        _this._formuparam = 0.53;
        _this._stepsize = 0.1;
        _this._tile = 0.85;
        _this._brightness = 0.0015;
        _this._darkmatter = 0.4;
        _this._distfading = 0.73;
        _this._saturation = 0.85;
        _this.updateShaderUniforms();
        return _this;
    }
    StarfieldProceduralTexture.prototype.updateShaderUniforms = function () {
        this.setFloat("time", this._time);
        this.setFloat("alpha", this._alpha);
        this.setFloat("beta", this._beta);
        this.setFloat("zoom", this._zoom);
        this.setFloat("formuparam", this._formuparam);
        this.setFloat("stepsize", this._stepsize);
        this.setFloat("tile", this._tile);
        this.setFloat("brightness", this._brightness);
        this.setFloat("darkmatter", this._darkmatter);
        this.setFloat("distfading", this._distfading);
        this.setFloat("saturation", this._saturation);
    };
    Object.defineProperty(StarfieldProceduralTexture.prototype, "time", {
        get: function () {
            return this._time;
        },
        set: function (value) {
            this._time = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StarfieldProceduralTexture.prototype, "alpha", {
        get: function () {
            return this._alpha;
        },
        set: function (value) {
            this._alpha = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StarfieldProceduralTexture.prototype, "beta", {
        get: function () {
            return this._beta;
        },
        set: function (value) {
            this._beta = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StarfieldProceduralTexture.prototype, "formuparam", {
        get: function () {
            return this._formuparam;
        },
        set: function (value) {
            this._formuparam = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StarfieldProceduralTexture.prototype, "stepsize", {
        get: function () {
            return this._stepsize;
        },
        set: function (value) {
            this._stepsize = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StarfieldProceduralTexture.prototype, "zoom", {
        get: function () {
            return this._zoom;
        },
        set: function (value) {
            this._zoom = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StarfieldProceduralTexture.prototype, "tile", {
        get: function () {
            return this._tile;
        },
        set: function (value) {
            this._tile = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StarfieldProceduralTexture.prototype, "brightness", {
        get: function () {
            return this._brightness;
        },
        set: function (value) {
            this._brightness = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StarfieldProceduralTexture.prototype, "darkmatter", {
        get: function () {
            return this._darkmatter;
        },
        set: function (value) {
            this._darkmatter = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StarfieldProceduralTexture.prototype, "distfading", {
        get: function () {
            return this._distfading;
        },
        set: function (value) {
            this._distfading = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StarfieldProceduralTexture.prototype, "saturation", {
        get: function () {
            return this._saturation;
        },
        set: function (value) {
            this._saturation = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Serializes this starfield procedural texture
     * @returns a serialized starfield procedural texture object
     */
    StarfieldProceduralTexture.prototype.serialize = function () {
        var serializationObject = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Serialize(this, _super.prototype.serialize.call(this));
        serializationObject.customType = "BABYLON.StarfieldProceduralTexture";
        return serializationObject;
    };
    /**
     * Creates a Starfield Procedural Texture from parsed startfield procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing startfield procedural texture information
     * @returns a parsed Starfield Procedural Texture
     */
    StarfieldProceduralTexture.Parse = function (parsedTexture, scene, rootUrl) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new StarfieldProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps); }, parsedTexture, scene, rootUrl);
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], StarfieldProceduralTexture.prototype, "time", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], StarfieldProceduralTexture.prototype, "alpha", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], StarfieldProceduralTexture.prototype, "beta", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], StarfieldProceduralTexture.prototype, "formuparam", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], StarfieldProceduralTexture.prototype, "stepsize", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], StarfieldProceduralTexture.prototype, "zoom", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], StarfieldProceduralTexture.prototype, "tile", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], StarfieldProceduralTexture.prototype, "brightness", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], StarfieldProceduralTexture.prototype, "darkmatter", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], StarfieldProceduralTexture.prototype, "distfading", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], StarfieldProceduralTexture.prototype, "saturation", null);
    return StarfieldProceduralTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.ProceduralTexture));
(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.StarfieldProceduralTexture", StarfieldProceduralTexture);


/***/ }),

/***/ "../../../dev/proceduralTextures/src/wood/index.ts":
/*!*********************************************************!*\
  !*** ../../../dev/proceduralTextures/src/wood/index.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WoodProceduralTexture: () => (/* reexport safe */ _woodProceduralTexture__WEBPACK_IMPORTED_MODULE_0__.WoodProceduralTexture)
/* harmony export */ });
/* harmony import */ var _woodProceduralTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./woodProceduralTexture */ "../../../dev/proceduralTextures/src/wood/woodProceduralTexture.ts");



/***/ }),

/***/ "../../../dev/proceduralTextures/src/wood/woodProceduralTexture.fragment.ts":
/*!**********************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/wood/woodProceduralTexture.fragment.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   woodProceduralTexturePixelShader: () => (/* binding */ woodProceduralTexturePixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "woodProceduralTexturePixelShader";
var shader = "precision highp float;varying vec2 vPosition;varying vec2 vUV;uniform float ampScale;uniform vec3 woodColor;float rand(vec2 n) {return fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);}\nfloat noise(vec2 n) {const vec2 d=vec2(0.0,1.0);vec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));return mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);}\nfloat fbm(vec2 n) {float total=0.0,amplitude=1.0;for (int i=0; i<4; i++) {total+=noise(n)*amplitude;n+=n;amplitude*=0.5;}\nreturn total;}\n#define CUSTOM_FRAGMENT_DEFINITIONS\nvoid main(void) {\n#define CUSTOM_FRAGMENT_MAIN_BEGIN\nfloat ratioy=mod(vUV.x*ampScale,2.0+fbm(vUV*0.8));vec3 wood=woodColor*ratioy;gl_FragColor=vec4(wood,1.0);\n#define CUSTOM_FRAGMENT_MAIN_END\n}";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var woodProceduralTexturePixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/proceduralTextures/src/wood/woodProceduralTexture.ts":
/*!*************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/wood/woodProceduralTexture.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WoodProceduralTexture: () => (/* binding */ WoodProceduralTexture)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/typeStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _woodProceduralTexture_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./woodProceduralTexture.fragment */ "../../../dev/proceduralTextures/src/wood/woodProceduralTexture.fragment.ts");







var WoodProceduralTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(WoodProceduralTexture, _super);
    function WoodProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, name, size, "woodProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
        _this._ampScale = 100.0;
        _this._woodColor = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.32, 0.17, 0.09);
        _this.updateShaderUniforms();
        return _this;
    }
    WoodProceduralTexture.prototype.updateShaderUniforms = function () {
        this.setFloat("ampScale", this._ampScale);
        this.setColor3("woodColor", this._woodColor);
    };
    Object.defineProperty(WoodProceduralTexture.prototype, "ampScale", {
        get: function () {
            return this._ampScale;
        },
        set: function (value) {
            this._ampScale = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WoodProceduralTexture.prototype, "woodColor", {
        get: function () {
            return this._woodColor;
        },
        set: function (value) {
            this._woodColor = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Serializes this wood procedural texture
     * @returns a serialized wood procedural texture object
     */
    WoodProceduralTexture.prototype.serialize = function () {
        var serializationObject = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Serialize(this, _super.prototype.serialize.call(this));
        serializationObject.customType = "BABYLON.WoodProceduralTexture";
        return serializationObject;
    };
    /**
     * Creates a Wood Procedural Texture from parsed wood procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing wood procedural texture information
     * @returns a parsed Wood Procedural Texture
     */
    WoodProceduralTexture.Parse = function (parsedTexture, scene, rootUrl) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new WoodProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps); }, parsedTexture, scene, rootUrl);
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], WoodProceduralTexture.prototype, "ampScale", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor3)()
    ], WoodProceduralTexture.prototype, "woodColor", null);
    return WoodProceduralTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.ProceduralTexture));
(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.WoodProceduralTexture", WoodProceduralTexture);


/***/ }),

/***/ "../../../lts/proceduralTextures/src/legacy/legacy.ts":
/*!************************************************************!*\
  !*** ../../../lts/proceduralTextures/src/legacy/legacy.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BrickProceduralTexture: () => (/* reexport safe */ procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__.BrickProceduralTexture),
/* harmony export */   CloudProceduralTexture: () => (/* reexport safe */ procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__.CloudProceduralTexture),
/* harmony export */   FireProceduralTexture: () => (/* reexport safe */ procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__.FireProceduralTexture),
/* harmony export */   GrassProceduralTexture: () => (/* reexport safe */ procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__.GrassProceduralTexture),
/* harmony export */   MarbleProceduralTexture: () => (/* reexport safe */ procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__.MarbleProceduralTexture),
/* harmony export */   NormalMapProceduralTexture: () => (/* reexport safe */ procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__.NormalMapProceduralTexture),
/* harmony export */   PerlinNoiseProceduralTexture: () => (/* reexport safe */ procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__.PerlinNoiseProceduralTexture),
/* harmony export */   RoadProceduralTexture: () => (/* reexport safe */ procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__.RoadProceduralTexture),
/* harmony export */   StarfieldProceduralTexture: () => (/* reexport safe */ procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__.StarfieldProceduralTexture),
/* harmony export */   WoodProceduralTexture: () => (/* reexport safe */ procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__.WoodProceduralTexture)
/* harmony export */ });
/* harmony import */ var procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! procedural-textures/index */ "../../../dev/proceduralTextures/src/index.ts");
/* eslint-disable import/no-internal-modules */

/**
 * Legacy support, defining window.BABYLON.GridMaterial... (global variable).
 *
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    globalObject.BABYLON = globalObject.BABYLON || {};
    for (var mat in procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__) {
        globalObject.BABYLON[mat] = procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__[mat];
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
/* harmony export */   proceduralTextures: () => (/* reexport module object */ _lts_procedural_textures_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_procedural_textures_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/procedural-textures/legacy/legacy */ "../../../lts/proceduralTextures/src/legacy/legacy.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_procedural_textures_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__);

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbmpzLnByb2NlZHVyYWxUZXh0dXJlcy5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUVBO0FBQ0E7QUFjQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUdBO0FBRUE7QUFBQTtBQU1BO0FBQUE7QUFBQTtBQUxBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7O0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFMQTtBQVFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUxBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFRQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFMQTtBQU9BOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQWxFQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFtQ0E7QUFBQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkdBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFFQTtBQUNBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFHQTtBQUVBO0FBQUE7QUFNQTtBQUFBO0FBQUE7QUFMQTtBQUNBO0FBQ0E7QUFDQTtBQUlBOztBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFRQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFMQTtBQVFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUxBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFPQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQU9BO0FBQ0E7QUFsRUE7QUFEQTtBQUdBO0FBUUE7QUFEQTtBQUdBO0FBUUE7QUFEQTtBQUdBO0FBUUE7QUFEQTtBQUdBO0FBbUNBO0FBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ25HQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBRUE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUdBO0FBRUE7QUFBQTtBQU9BO0FBQUE7QUFBQTtBQU5BO0FBQ0E7QUFDQTtBQUVBO0FBSUE7QUFDQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7OztBQUpBO0FBTUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFRQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFMQTtBQVFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUxBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFPQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUF0RkE7QUFEQTtBQUdBO0FBZ0JBO0FBREE7QUFHQTtBQVFBO0FBREE7QUFHQTtBQVFBO0FBREE7QUFHQTtBQStDQTtBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4SkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUVBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUdBO0FBRUE7QUFBQTtBQUlBO0FBQUE7QUFBQTtBQUZBO0FBS0E7QUFFQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUxBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFPQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFoREE7QUFEQTtBQUdBO0FBK0NBO0FBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQzNGQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBRUE7QUFDQTtBQWtCQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUdBO0FBRUE7QUFBQTtBQU1BO0FBQUE7QUFBQTtBQUxBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7O0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFMQTtBQVFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUxBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFRQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFMQTtBQU9BOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQWxFQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFtQ0E7QUFBQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkdBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFFQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFFQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUxBO0FBT0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFPQTtBQUNBO0FBcENBO0FBREE7QUFHQTtBQW1DQTtBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUVBO0FBQ0E7QUFpREE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeERBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUFBO0FBWUE7QUFBQTtBQUFBO0FBVkE7QUFHQTtBQUdBO0FBRUE7QUFJQTs7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFPQTtBQUNBO0FBcEVBO0FBREE7QUFDQTtBQUdBO0FBREE7QUFDQTtBQUdBO0FBREE7QUFDQTtBQStEQTtBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUVBO0FBQ0E7QUFXQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUZBO0FBSUE7O0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFMQTtBQU9BOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQXBDQTtBQURBO0FBR0E7QUFtQ0E7QUFBQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDOURBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFFQTtBQUNBO0FBZ0JBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFBQTtBQWFBO0FBQUE7QUFBQTtBQVpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFRQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFMQTtBQVFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUxBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFRQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFMQTtBQVFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUxBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFRQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFMQTtBQVFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUxBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFRQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFMQTtBQU9BOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQXhJQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFtQ0E7QUFBQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDckxBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFFQTtBQUNBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBQUE7QUFJQTtBQUFBO0FBQUE7QUFIQTtBQUNBO0FBSUE7O0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUxBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFPQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQU9BO0FBQ0E7QUE5Q0E7QUFEQTtBQUdBO0FBUUE7QUFEQTtBQUdBO0FBbUNBO0FBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFFQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7OztBQ2pCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL2JyaWNrL2JyaWNrUHJvY2VkdXJhbFRleHR1cmUuZnJhZ21lbnQudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL2JyaWNrL2JyaWNrUHJvY2VkdXJhbFRleHR1cmUudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL2JyaWNrL2luZGV4LnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi9kZXYvcHJvY2VkdXJhbFRleHR1cmVzL3NyYy9jbG91ZC9jbG91ZFByb2NlZHVyYWxUZXh0dXJlLmZyYWdtZW50LnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi9kZXYvcHJvY2VkdXJhbFRleHR1cmVzL3NyYy9jbG91ZC9jbG91ZFByb2NlZHVyYWxUZXh0dXJlLnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi9kZXYvcHJvY2VkdXJhbFRleHR1cmVzL3NyYy9jbG91ZC9pbmRleC50cyIsIndlYnBhY2s6Ly9QUk9DRURVUkFMVEVYVFVSRVMvLi4vLi4vLi4vZGV2L3Byb2NlZHVyYWxUZXh0dXJlcy9zcmMvZmlyZS9maXJlUHJvY2VkdXJhbFRleHR1cmUuZnJhZ21lbnQudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL2ZpcmUvZmlyZVByb2NlZHVyYWxUZXh0dXJlLnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi9kZXYvcHJvY2VkdXJhbFRleHR1cmVzL3NyYy9maXJlL2luZGV4LnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi9kZXYvcHJvY2VkdXJhbFRleHR1cmVzL3NyYy9ncmFzcy9ncmFzc1Byb2NlZHVyYWxUZXh0dXJlLmZyYWdtZW50LnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi9kZXYvcHJvY2VkdXJhbFRleHR1cmVzL3NyYy9ncmFzcy9ncmFzc1Byb2NlZHVyYWxUZXh0dXJlLnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi9kZXYvcHJvY2VkdXJhbFRleHR1cmVzL3NyYy9ncmFzcy9pbmRleC50cyIsIndlYnBhY2s6Ly9QUk9DRURVUkFMVEVYVFVSRVMvLi4vLi4vLi4vZGV2L3Byb2NlZHVyYWxUZXh0dXJlcy9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL21hcmJsZS9pbmRleC50cyIsIndlYnBhY2s6Ly9QUk9DRURVUkFMVEVYVFVSRVMvLi4vLi4vLi4vZGV2L3Byb2NlZHVyYWxUZXh0dXJlcy9zcmMvbWFyYmxlL21hcmJsZVByb2NlZHVyYWxUZXh0dXJlLmZyYWdtZW50LnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi9kZXYvcHJvY2VkdXJhbFRleHR1cmVzL3NyYy9tYXJibGUvbWFyYmxlUHJvY2VkdXJhbFRleHR1cmUudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL25vcm1hbE1hcC9pbmRleC50cyIsIndlYnBhY2s6Ly9QUk9DRURVUkFMVEVYVFVSRVMvLi4vLi4vLi4vZGV2L3Byb2NlZHVyYWxUZXh0dXJlcy9zcmMvbm9ybWFsTWFwL25vcm1hbE1hcFByb2NlZHVyYWxUZXh0dXJlLmZyYWdtZW50LnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi9kZXYvcHJvY2VkdXJhbFRleHR1cmVzL3NyYy9ub3JtYWxNYXAvbm9ybWFsTWFwUHJvY2VkdXJhbFRleHR1cmUudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL3Blcmxpbk5vaXNlL2luZGV4LnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi9kZXYvcHJvY2VkdXJhbFRleHR1cmVzL3NyYy9wZXJsaW5Ob2lzZS9wZXJsaW5Ob2lzZVByb2NlZHVyYWxUZXh0dXJlLmZyYWdtZW50LnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi9kZXYvcHJvY2VkdXJhbFRleHR1cmVzL3NyYy9wZXJsaW5Ob2lzZS9wZXJsaW5Ob2lzZVByb2NlZHVyYWxUZXh0dXJlLnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi9kZXYvcHJvY2VkdXJhbFRleHR1cmVzL3NyYy9yb2FkL2luZGV4LnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi9kZXYvcHJvY2VkdXJhbFRleHR1cmVzL3NyYy9yb2FkL3JvYWRQcm9jZWR1cmFsVGV4dHVyZS5mcmFnbWVudC50cyIsIndlYnBhY2s6Ly9QUk9DRURVUkFMVEVYVFVSRVMvLi4vLi4vLi4vZGV2L3Byb2NlZHVyYWxUZXh0dXJlcy9zcmMvcm9hZC9yb2FkUHJvY2VkdXJhbFRleHR1cmUudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL3N0YXJmaWVsZC9pbmRleC50cyIsIndlYnBhY2s6Ly9QUk9DRURVUkFMVEVYVFVSRVMvLi4vLi4vLi4vZGV2L3Byb2NlZHVyYWxUZXh0dXJlcy9zcmMvc3RhcmZpZWxkL3N0YXJmaWVsZFByb2NlZHVyYWxUZXh0dXJlLmZyYWdtZW50LnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi9kZXYvcHJvY2VkdXJhbFRleHR1cmVzL3NyYy9zdGFyZmllbGQvc3RhcmZpZWxkUHJvY2VkdXJhbFRleHR1cmUudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL3dvb2QvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL3dvb2Qvd29vZFByb2NlZHVyYWxUZXh0dXJlLmZyYWdtZW50LnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi9kZXYvcHJvY2VkdXJhbFRleHR1cmVzL3NyYy93b29kL3dvb2RQcm9jZWR1cmFsVGV4dHVyZS50cyIsIndlYnBhY2s6Ly9QUk9DRURVUkFMVEVYVFVSRVMvLi4vLi4vLi4vbHRzL3Byb2NlZHVyYWxUZXh0dXJlcy9zcmMvbGVnYWN5L2xlZ2FjeS50cyIsIndlYnBhY2s6Ly9QUk9DRURVUkFMVEVYVFVSRVMvZXh0ZXJuYWwgdW1kIHtcInJvb3RcIjpcIkJBQllMT05cIixcImNvbW1vbmpzXCI6XCJiYWJ5bG9uanNcIixcImNvbW1vbmpzMlwiOlwiYmFieWxvbmpzXCIsXCJhbWRcIjpcImJhYnlsb25qc1wifSIsIndlYnBhY2s6Ly9QUk9DRURVUkFMVEVYVFVSRVMvLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5tanMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9QUk9DRURVUkFMVEVYVFVSRVMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJiYWJ5bG9uanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJiYWJ5bG9uanMtcHJvY2VkdXJhbC10ZXh0dXJlc1wiLCBbXCJiYWJ5bG9uanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYmFieWxvbmpzLXByb2NlZHVyYWwtdGV4dHVyZXNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJiYWJ5bG9uanNcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlBST0NFRFVSQUxURVhUVVJFU1wiXSA9IGZhY3Rvcnkocm9vdFtcIkJBQllMT05cIl0pO1xufSkoKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0aGlzKSwgKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmFieWxvbmpzX01pc2NfZGVjb3JhdG9yc19fKSA9PiB7XG5yZXR1cm4gIiwiLy8gRG8gbm90IGVkaXQuXG5pbXBvcnQgeyBTaGFkZXJTdG9yZSB9IGZyb20gXCJjb3JlL0VuZ2luZXMvc2hhZGVyU3RvcmVcIjtcblxuY29uc3QgbmFtZSA9IFwiYnJpY2tQcm9jZWR1cmFsVGV4dHVyZVBpeGVsU2hhZGVyXCI7XG5jb25zdCBzaGFkZXIgPSBgcHJlY2lzaW9uIGhpZ2hwIGZsb2F0O3ZhcnlpbmcgdmVjMiB2UG9zaXRpb247dmFyeWluZyB2ZWMyIHZVVjt1bmlmb3JtIGZsb2F0IG51bWJlck9mQnJpY2tzSGVpZ2h0O3VuaWZvcm0gZmxvYXQgbnVtYmVyT2ZCcmlja3NXaWR0aDt1bmlmb3JtIHZlYzMgYnJpY2tDb2xvcjt1bmlmb3JtIHZlYzMgam9pbnRDb2xvcjtmbG9hdCByYW5kKHZlYzIgbikge3JldHVybiBmcmFjdChjb3MoZG90KG4sdmVjMigxMi45ODk4LDQuMTQxNCkpKSo0Mzc1OC41NDUzKTt9XG5mbG9hdCBub2lzZSh2ZWMyIG4pIHtjb25zdCB2ZWMyIGQ9dmVjMigwLjAsMS4wKTt2ZWMyIGI9Zmxvb3IobiksZj1zbW9vdGhzdGVwKHZlYzIoMC4wKSx2ZWMyKDEuMCksZnJhY3QobikpO3JldHVybiBtaXgobWl4KHJhbmQoYikscmFuZChiK2QueXgpLGYueCksbWl4KHJhbmQoYitkLnh5KSxyYW5kKGIrZC55eSksZi54KSxmLnkpO31cbmZsb2F0IGZibSh2ZWMyIG4pIHtmbG9hdCB0b3RhbD0wLjAsYW1wbGl0dWRlPTEuMDtmb3IgKGludCBpPTA7IGk8NDsgaSsrKSB7dG90YWwrPW5vaXNlKG4pKmFtcGxpdHVkZTtuKz1uO2FtcGxpdHVkZSo9MC41O31cbnJldHVybiB0b3RhbDt9XG5mbG9hdCByb3VuZEYoZmxvYXQgbnVtYmVyKXtyZXR1cm4gc2lnbihudW1iZXIpKmZsb29yKGFicyhudW1iZXIpKzAuNSk7fVxuI2RlZmluZSBDVVNUT01fRlJBR01FTlRfREVGSU5JVElPTlNcbnZvaWQgbWFpbih2b2lkKVxue2Zsb2F0IGJyaWNrVz0xLjAvbnVtYmVyT2ZCcmlja3NXaWR0aDtmbG9hdCBicmlja0g9MS4wL251bWJlck9mQnJpY2tzSGVpZ2h0O2Zsb2F0IGpvaW50V1BlcmNlbnRhZ2U9MC4wMTtmbG9hdCBqb2ludEhQZXJjZW50YWdlPTAuMDU7dmVjMyBjb2xvcj1icmlja0NvbG9yO2Zsb2F0IHlpPXZVVi55L2JyaWNrSDtmbG9hdCBueWk9cm91bmRGKHlpKTtmbG9hdCB4aT12VVYueC9icmlja1c7aWYgKG1vZChmbG9vcih5aSksMi4wKT09MC4wKXt4aT14aS0wLjU7fVxuZmxvYXQgbnhpPXJvdW5kRih4aSk7dmVjMiBicmlja3ZVVj12ZWMyKCh4aS1mbG9vcih4aSkpL2JyaWNrSCwoeWktZmxvb3IoeWkpKS8gYnJpY2tXKTtpZiAoeWk8bnlpK2pvaW50SFBlcmNlbnRhZ2UgJiYgeWk+bnlpLWpvaW50SFBlcmNlbnRhZ2Upe2NvbG9yPW1peChqb2ludENvbG9yLHZlYzMoMC4zNywwLjI1LDAuMjUpLCh5aS1ueWkpL2pvaW50SFBlcmNlbnRhZ2UrMC4yKTt9XG5lbHNlIGlmICh4aTxueGkram9pbnRXUGVyY2VudGFnZSAmJiB4aT5ueGktam9pbnRXUGVyY2VudGFnZSl7Y29sb3I9bWl4KGpvaW50Q29sb3IsdmVjMygwLjQ0LDAuNDQsMC40NCksKHhpLW54aSkvam9pbnRXUGVyY2VudGFnZSswLjIpO31cbmVsc2Uge2Zsb2F0IGJyaWNrQ29sb3JTd2l0Y2g9bW9kKGZsb29yKHlpKStmbG9vcih4aSksMy4wKTtpZiAoYnJpY2tDb2xvclN3aXRjaD09MC4wKVxuY29sb3I9bWl4KGNvbG9yLHZlYzMoMC4zMywwLjMzLDAuMzMpLDAuMyk7ZWxzZSBpZiAoYnJpY2tDb2xvclN3aXRjaD09Mi4wKVxuY29sb3I9bWl4KGNvbG9yLHZlYzMoMC4xMSwwLjExLDAuMTEpLDAuMyk7fVxuZ2xfRnJhZ0NvbG9yPXZlYzQoY29sb3IsMS4wKTt9YDtcbi8vIFNpZGVlZmZlY3RcblNoYWRlclN0b3JlLlNoYWRlcnNTdG9yZVtuYW1lXSA9IHNoYWRlcjtcbi8qKiBAaW50ZXJuYWwgKi9cbmV4cG9ydCBjb25zdCBicmlja1Byb2NlZHVyYWxUZXh0dXJlUGl4ZWxTaGFkZXIgPSB7IG5hbWUsIHNoYWRlciB9O1xuIiwiaW1wb3J0IHsgc2VyaWFsaXplLCBzZXJpYWxpemVBc0NvbG9yMyB9IGZyb20gXCJjb3JlL01pc2MvZGVjb3JhdG9yc1wiO1xyXG5pbXBvcnQgeyBTZXJpYWxpemF0aW9uSGVscGVyIH0gZnJvbSBcImNvcmUvTWlzYy9kZWNvcmF0b3JzLnNlcmlhbGl6YXRpb25cIjtcclxuaW1wb3J0IHsgQ29sb3IzIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC5jb2xvclwiO1xyXG5pbXBvcnQgdHlwZSB7IFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvdGV4dHVyZVwiO1xyXG5pbXBvcnQgeyBQcm9jZWR1cmFsVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9Qcm9jZWR1cmFscy9wcm9jZWR1cmFsVGV4dHVyZVwiO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuaW1wb3J0IHsgUmVnaXN0ZXJDbGFzcyB9IGZyb20gXCJjb3JlL01pc2MvdHlwZVN0b3JlXCI7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5cclxuaW1wb3J0IFwiLi9icmlja1Byb2NlZHVyYWxUZXh0dXJlLmZyYWdtZW50XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQnJpY2tQcm9jZWR1cmFsVGV4dHVyZSBleHRlbmRzIFByb2NlZHVyYWxUZXh0dXJlIHtcclxuICAgIHByaXZhdGUgX251bWJlck9mQnJpY2tzSGVpZ2h0OiBudW1iZXIgPSAxNTtcclxuICAgIHByaXZhdGUgX251bWJlck9mQnJpY2tzV2lkdGg6IG51bWJlciA9IDU7XHJcbiAgICBwcml2YXRlIF9qb2ludENvbG9yID0gbmV3IENvbG9yMygwLjcyLCAwLjcyLCAwLjcyKTtcclxuICAgIHByaXZhdGUgX2JyaWNrQ29sb3IgPSBuZXcgQ29sb3IzKDAuNzcsIDAuNDcsIDAuNCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBzaXplOiBudW1iZXIsIHNjZW5lOiBOdWxsYWJsZTxTY2VuZT4gPSBudWxsLCBmYWxsYmFja1RleHR1cmU/OiBUZXh0dXJlLCBnZW5lcmF0ZU1pcE1hcHM/OiBib29sZWFuKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgc2l6ZSwgXCJicmlja1Byb2NlZHVyYWxUZXh0dXJlXCIsIHNjZW5lLCBmYWxsYmFja1RleHR1cmUsIGdlbmVyYXRlTWlwTWFwcyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVTaGFkZXJVbmlmb3JtcygpIHtcclxuICAgICAgICB0aGlzLnNldEZsb2F0KFwibnVtYmVyT2ZCcmlja3NIZWlnaHRcIiwgdGhpcy5fbnVtYmVyT2ZCcmlja3NIZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuc2V0RmxvYXQoXCJudW1iZXJPZkJyaWNrc1dpZHRoXCIsIHRoaXMuX251bWJlck9mQnJpY2tzV2lkdGgpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IzKFwiYnJpY2tDb2xvclwiLCB0aGlzLl9icmlja0NvbG9yKTtcclxuICAgICAgICB0aGlzLnNldENvbG9yMyhcImpvaW50Q29sb3JcIiwgdGhpcy5fam9pbnRDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IG51bWJlck9mQnJpY2tzSGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX251bWJlck9mQnJpY2tzSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgbnVtYmVyT2ZCcmlja3NIZWlnaHQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX251bWJlck9mQnJpY2tzSGVpZ2h0ID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGdldCBudW1iZXJPZkJyaWNrc1dpZHRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX251bWJlck9mQnJpY2tzV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBudW1iZXJPZkJyaWNrc1dpZHRoKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9udW1iZXJPZkJyaWNrc1dpZHRoID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIEBzZXJpYWxpemVBc0NvbG9yMygpXHJcbiAgICBwdWJsaWMgZ2V0IGpvaW50Q29sb3IoKTogQ29sb3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fam9pbnRDb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGpvaW50Q29sb3IodmFsdWU6IENvbG9yMykge1xyXG4gICAgICAgIHRoaXMuX2pvaW50Q29sb3IgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZUFzQ29sb3IzKClcclxuICAgIHB1YmxpYyBnZXQgYnJpY2tDb2xvcigpOiBDb2xvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9icmlja0NvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgYnJpY2tDb2xvcih2YWx1ZTogQ29sb3IzKSB7XHJcbiAgICAgICAgdGhpcy5fYnJpY2tDb2xvciA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlcmlhbGl6ZXMgdGhpcyBicmljayBwcm9jZWR1cmFsIHRleHR1cmVcclxuICAgICAqIEByZXR1cm5zIGEgc2VyaWFsaXplZCBicmljayBwcm9jZWR1cmFsIHRleHR1cmUgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvdmVycmlkZSBzZXJpYWxpemUoKTogYW55IHtcclxuICAgICAgICBjb25zdCBzZXJpYWxpemF0aW9uT2JqZWN0ID0gU2VyaWFsaXphdGlvbkhlbHBlci5TZXJpYWxpemUodGhpcywgc3VwZXIuc2VyaWFsaXplKCkpO1xyXG4gICAgICAgIHNlcmlhbGl6YXRpb25PYmplY3QuY3VzdG9tVHlwZSA9IFwiQkFCWUxPTi5Ccmlja1Byb2NlZHVyYWxUZXh0dXJlXCI7XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJpYWxpemF0aW9uT2JqZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIEJyaWNrIFByb2NlZHVyYWwgVGV4dHVyZSBmcm9tIHBhcnNlZCBicmljayBwcm9jZWR1cmFsIHRleHR1cmUgZGF0YVxyXG4gICAgICogQHBhcmFtIHBhcnNlZFRleHR1cmUgZGVmaW5lcyBwYXJzZWQgdGV4dHVyZSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgZGVmaW5lcyB0aGUgY3VycmVudCBzY2VuZVxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgZGVmaW5lcyB0aGUgcm9vdCBVUkwgY29udGFpbmluZyBicmljayBwcm9jZWR1cmFsIHRleHR1cmUgaW5mb3JtYXRpb25cclxuICAgICAqIEByZXR1cm5zIGEgcGFyc2VkIEJyaWNrIFByb2NlZHVyYWwgVGV4dHVyZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG92ZXJyaWRlIFBhcnNlKHBhcnNlZFRleHR1cmU6IGFueSwgc2NlbmU6IFNjZW5lLCByb290VXJsOiBzdHJpbmcpOiBCcmlja1Byb2NlZHVyYWxUZXh0dXJlIHtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gU2VyaWFsaXphdGlvbkhlbHBlci5QYXJzZShcclxuICAgICAgICAgICAgKCkgPT4gbmV3IEJyaWNrUHJvY2VkdXJhbFRleHR1cmUocGFyc2VkVGV4dHVyZS5uYW1lLCBwYXJzZWRUZXh0dXJlLl9zaXplLCBzY2VuZSwgdW5kZWZpbmVkLCBwYXJzZWRUZXh0dXJlLl9nZW5lcmF0ZU1pcE1hcHMpLFxyXG4gICAgICAgICAgICBwYXJzZWRUZXh0dXJlLFxyXG4gICAgICAgICAgICBzY2VuZSxcclxuICAgICAgICAgICAgcm9vdFVybFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiB0ZXh0dXJlO1xyXG4gICAgfVxyXG59XHJcblxyXG5SZWdpc3RlckNsYXNzKFwiQkFCWUxPTi5Ccmlja1Byb2NlZHVyYWxUZXh0dXJlXCIsIEJyaWNrUHJvY2VkdXJhbFRleHR1cmUpO1xyXG4iLCJleHBvcnQgKiBmcm9tIFwiLi9icmlja1Byb2NlZHVyYWxUZXh0dXJlXCI7XHJcbiIsIi8vIERvIG5vdCBlZGl0LlxuaW1wb3J0IHsgU2hhZGVyU3RvcmUgfSBmcm9tIFwiY29yZS9FbmdpbmVzL3NoYWRlclN0b3JlXCI7XG5cbmNvbnN0IG5hbWUgPSBcImNsb3VkUHJvY2VkdXJhbFRleHR1cmVQaXhlbFNoYWRlclwiO1xuY29uc3Qgc2hhZGVyID0gYHByZWNpc2lvbiBoaWdocCBmbG9hdDt2YXJ5aW5nIHZlYzIgdlVWO3VuaWZvcm0gdmVjNCBza3lDb2xvcjt1bmlmb3JtIHZlYzQgY2xvdWRDb2xvcjt1bmlmb3JtIGZsb2F0IGFtcGxpdHVkZTt1bmlmb3JtIGludCBudW1PY3RhdmVzO2Zsb2F0IHJhbmQodmVjMiBuKSB7cmV0dXJuIGZyYWN0KGNvcyhkb3Qobix2ZWMyKDEyLjk4OTgsNC4xNDE0KSkpKjQzNzU4LjU0NTMpO31cbmZsb2F0IG5vaXNlKHZlYzIgbikge2NvbnN0IHZlYzIgZD12ZWMyKDAuMCwxLjApO3ZlYzIgYj1mbG9vcihuKSxmPXNtb290aHN0ZXAodmVjMigwLjApLHZlYzIoMS4wKSxmcmFjdChuKSk7cmV0dXJuIG1peChtaXgocmFuZChiKSxyYW5kKGIrZC55eCksZi54KSxtaXgocmFuZChiK2QueHkpLHJhbmQoYitkLnl5KSxmLngpLGYueSk7fVxuZmxvYXQgZmJtKHZlYzIgbikge2Zsb2F0IHRvdGFsPTAuMCxhbXBsPWFtcGxpdHVkZTtcbiNpZmRlZiBXRUJHTDJcbmZvciAoaW50IGk9MDsgaTxudW1PY3RhdmVzOyBpKyspIHtcbiNlbHNlXG5mb3IgKGludCBpPTA7IGk8NDsgaSsrKSB7XG4jZW5kaWZcbnRvdGFsKz1ub2lzZShuKSphbXBsO24rPW47YW1wbCo9MC41O31cbnJldHVybiB0b3RhbDt9XG52b2lkIG1haW4oKSB7dmVjMiBwPXZVVioxMi4wO3ZlYzQgYz1taXgoc2t5Q29sb3IsY2xvdWRDb2xvcixmYm0ocCkpO2dsX0ZyYWdDb2xvcj1jO31cbmA7XG4vLyBTaWRlZWZmZWN0XG5TaGFkZXJTdG9yZS5TaGFkZXJzU3RvcmVbbmFtZV0gPSBzaGFkZXI7XG4vKiogQGludGVybmFsICovXG5leHBvcnQgY29uc3QgY2xvdWRQcm9jZWR1cmFsVGV4dHVyZVBpeGVsU2hhZGVyID0geyBuYW1lLCBzaGFkZXIgfTtcbiIsImltcG9ydCB7IHNlcmlhbGl6ZSwgc2VyaWFsaXplQXNDb2xvcjQgfSBmcm9tIFwiY29yZS9NaXNjL2RlY29yYXRvcnNcIjtcclxuaW1wb3J0IHsgU2VyaWFsaXphdGlvbkhlbHBlciB9IGZyb20gXCJjb3JlL01pc2MvZGVjb3JhdG9ycy5zZXJpYWxpemF0aW9uXCI7XHJcbmltcG9ydCB7IENvbG9yNCB9IGZyb20gXCJjb3JlL01hdGhzL21hdGguY29sb3JcIjtcclxuaW1wb3J0IHR5cGUgeyBUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL3RleHR1cmVcIjtcclxuaW1wb3J0IHsgUHJvY2VkdXJhbFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvUHJvY2VkdXJhbHMvcHJvY2VkdXJhbFRleHR1cmVcIjtcclxuaW1wb3J0IHR5cGUgeyBTY2VuZSB9IGZyb20gXCJjb3JlL3NjZW5lXCI7XHJcbmltcG9ydCB7IFJlZ2lzdGVyQ2xhc3MgfSBmcm9tIFwiY29yZS9NaXNjL3R5cGVTdG9yZVwiO1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuXHJcbmltcG9ydCBcIi4vY2xvdWRQcm9jZWR1cmFsVGV4dHVyZS5mcmFnbWVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENsb3VkUHJvY2VkdXJhbFRleHR1cmUgZXh0ZW5kcyBQcm9jZWR1cmFsVGV4dHVyZSB7XHJcbiAgICBwcml2YXRlIF9za3lDb2xvciA9IG5ldyBDb2xvcjQoMC4xNSwgMC42OCwgMS4wLCAxLjApO1xyXG4gICAgcHJpdmF0ZSBfY2xvdWRDb2xvciA9IG5ldyBDb2xvcjQoMSwgMSwgMSwgMS4wKTtcclxuICAgIHByaXZhdGUgX2FtcGxpdHVkZSA9IDE7XHJcbiAgICBwcml2YXRlIF9udW1PY3RhdmVzID0gNDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHNpemU6IG51bWJlciwgc2NlbmU6IE51bGxhYmxlPFNjZW5lPiA9IG51bGwsIGZhbGxiYWNrVGV4dHVyZT86IFRleHR1cmUsIGdlbmVyYXRlTWlwTWFwcz86IGJvb2xlYW4pIHtcclxuICAgICAgICBzdXBlcihuYW1lLCBzaXplLCBcImNsb3VkUHJvY2VkdXJhbFRleHR1cmVcIiwgc2NlbmUsIGZhbGxiYWNrVGV4dHVyZSwgZ2VuZXJhdGVNaXBNYXBzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNoYWRlclVuaWZvcm1zKCkge1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3I0KFwic2t5Q29sb3JcIiwgdGhpcy5fc2t5Q29sb3IpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3I0KFwiY2xvdWRDb2xvclwiLCB0aGlzLl9jbG91ZENvbG9yKTtcclxuICAgICAgICB0aGlzLnNldEZsb2F0KFwiYW1wbGl0dWRlXCIsIHRoaXMuX2FtcGxpdHVkZSk7XHJcbiAgICAgICAgdGhpcy5zZXRJbnQoXCJudW1PY3RhdmVzXCIsIHRoaXMuX251bU9jdGF2ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIEBzZXJpYWxpemVBc0NvbG9yNCgpXHJcbiAgICBwdWJsaWMgZ2V0IHNreUNvbG9yKCk6IENvbG9yNCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NreUNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2t5Q29sb3IodmFsdWU6IENvbG9yNCkge1xyXG4gICAgICAgIHRoaXMuX3NreUNvbG9yID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIEBzZXJpYWxpemVBc0NvbG9yNCgpXHJcbiAgICBwdWJsaWMgZ2V0IGNsb3VkQ29sb3IoKTogQ29sb3I0IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2xvdWRDb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNsb3VkQ29sb3IodmFsdWU6IENvbG9yNCkge1xyXG4gICAgICAgIHRoaXMuX2Nsb3VkQ29sb3IgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IGFtcGxpdHVkZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hbXBsaXR1ZGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBhbXBsaXR1ZGUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2FtcGxpdHVkZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBnZXQgbnVtT2N0YXZlcygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9udW1PY3RhdmVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgbnVtT2N0YXZlcyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fbnVtT2N0YXZlcyA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlcmlhbGl6ZXMgdGhpcyBjbG91ZCBwcm9jZWR1cmFsIHRleHR1cmVcclxuICAgICAqIEByZXR1cm5zIGEgc2VyaWFsaXplZCBjbG91ZCBwcm9jZWR1cmFsIHRleHR1cmUgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvdmVycmlkZSBzZXJpYWxpemUoKTogYW55IHtcclxuICAgICAgICBjb25zdCBzZXJpYWxpemF0aW9uT2JqZWN0ID0gU2VyaWFsaXphdGlvbkhlbHBlci5TZXJpYWxpemUodGhpcywgc3VwZXIuc2VyaWFsaXplKCkpO1xyXG4gICAgICAgIHNlcmlhbGl6YXRpb25PYmplY3QuY3VzdG9tVHlwZSA9IFwiQkFCWUxPTi5DbG91ZFByb2NlZHVyYWxUZXh0dXJlXCI7XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJpYWxpemF0aW9uT2JqZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIENsb3VkIFByb2NlZHVyYWwgVGV4dHVyZSBmcm9tIHBhcnNlZCBjbG91ZCBwcm9jZWR1cmFsIHRleHR1cmUgZGF0YVxyXG4gICAgICogQHBhcmFtIHBhcnNlZFRleHR1cmUgZGVmaW5lcyBwYXJzZWQgdGV4dHVyZSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgZGVmaW5lcyB0aGUgY3VycmVudCBzY2VuZVxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgZGVmaW5lcyB0aGUgcm9vdCBVUkwgY29udGFpbmluZyBjbG91ZCBwcm9jZWR1cmFsIHRleHR1cmUgaW5mb3JtYXRpb25cclxuICAgICAqIEByZXR1cm5zIGEgcGFyc2VkIENsb3VkIFByb2NlZHVyYWwgVGV4dHVyZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG92ZXJyaWRlIFBhcnNlKHBhcnNlZFRleHR1cmU6IGFueSwgc2NlbmU6IFNjZW5lLCByb290VXJsOiBzdHJpbmcpOiBDbG91ZFByb2NlZHVyYWxUZXh0dXJlIHtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gU2VyaWFsaXphdGlvbkhlbHBlci5QYXJzZShcclxuICAgICAgICAgICAgKCkgPT4gbmV3IENsb3VkUHJvY2VkdXJhbFRleHR1cmUocGFyc2VkVGV4dHVyZS5uYW1lLCBwYXJzZWRUZXh0dXJlLl9zaXplLCBzY2VuZSwgdW5kZWZpbmVkLCBwYXJzZWRUZXh0dXJlLl9nZW5lcmF0ZU1pcE1hcHMpLFxyXG4gICAgICAgICAgICBwYXJzZWRUZXh0dXJlLFxyXG4gICAgICAgICAgICBzY2VuZSxcclxuICAgICAgICAgICAgcm9vdFVybFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiB0ZXh0dXJlO1xyXG4gICAgfVxyXG59XHJcblxyXG5SZWdpc3RlckNsYXNzKFwiQkFCWUxPTi5DbG91ZFByb2NlZHVyYWxUZXh0dXJlXCIsIENsb3VkUHJvY2VkdXJhbFRleHR1cmUpO1xyXG4iLCJleHBvcnQgKiBmcm9tIFwiLi9jbG91ZFByb2NlZHVyYWxUZXh0dXJlXCI7XHJcbiIsIi8vIERvIG5vdCBlZGl0LlxuaW1wb3J0IHsgU2hhZGVyU3RvcmUgfSBmcm9tIFwiY29yZS9FbmdpbmVzL3NoYWRlclN0b3JlXCI7XG5cbmNvbnN0IG5hbWUgPSBcImZpcmVQcm9jZWR1cmFsVGV4dHVyZVBpeGVsU2hhZGVyXCI7XG5jb25zdCBzaGFkZXIgPSBgcHJlY2lzaW9uIGhpZ2hwIGZsb2F0O3VuaWZvcm0gZmxvYXQgdGltZTt1bmlmb3JtIHZlYzMgYzE7dW5pZm9ybSB2ZWMzIGMyO3VuaWZvcm0gdmVjMyBjMzt1bmlmb3JtIHZlYzMgYzQ7dW5pZm9ybSB2ZWMzIGM1O3VuaWZvcm0gdmVjMyBjNjt1bmlmb3JtIHZlYzIgc3BlZWQ7dW5pZm9ybSBmbG9hdCBzaGlmdDt1bmlmb3JtIGZsb2F0IGFscGhhVGhyZXNob2xkO3ZhcnlpbmcgdmVjMiB2VVY7ZmxvYXQgcmFuZCh2ZWMyIG4pIHtyZXR1cm4gZnJhY3QoY29zKGRvdChuLHZlYzIoMTIuOTg5OCw0LjE0MTQpKSkqNDM3NTguNTQ1Myk7fVxuZmxvYXQgbm9pc2UodmVjMiBuKSB7Y29uc3QgdmVjMiBkPXZlYzIoMC4wLDEuMCk7dmVjMiBiPWZsb29yKG4pLGY9c21vb3Roc3RlcCh2ZWMyKDAuMCksdmVjMigxLjApLGZyYWN0KG4pKTtyZXR1cm4gbWl4KG1peChyYW5kKGIpLHJhbmQoYitkLnl4KSxmLngpLG1peChyYW5kKGIrZC54eSkscmFuZChiK2QueXkpLGYueCksZi55KTt9XG5mbG9hdCBmYm0odmVjMiBuKSB7ZmxvYXQgdG90YWw9MC4wLGFtcGxpdHVkZT0xLjA7Zm9yIChpbnQgaT0wOyBpPDQ7IGkrKykge3RvdGFsKz1ub2lzZShuKSphbXBsaXR1ZGU7bis9bjthbXBsaXR1ZGUqPTAuNTt9XG5yZXR1cm4gdG90YWw7fVxudm9pZCBtYWluKCkge3ZlYzIgcD12VVYqOC4wO2Zsb2F0IHE9ZmJtKHAtdGltZSowLjEpO3ZlYzIgcj12ZWMyKGZibShwK3ErdGltZSpzcGVlZC54LXAueC1wLnkpLGZibShwK3EtdGltZSpzcGVlZC55KSk7dmVjMyBjPW1peChjMSxjMixmYm0ocCtyKSkrbWl4KGMzLGM0LHIueCktbWl4KGM1LGM2LHIueSk7dmVjMyBjb2xvcj1jKmNvcyhzaGlmdCp2VVYueSk7ZmxvYXQgbHVtaW5hbmNlPWRvdChjb2xvci5yZ2IsdmVjMygwLjMsMC41OSwwLjExKSk7Z2xfRnJhZ0NvbG9yPXZlYzQoY29sb3IsbHVtaW5hbmNlKmFscGhhVGhyZXNob2xkKygxLjAtYWxwaGFUaHJlc2hvbGQpKTt9YDtcbi8vIFNpZGVlZmZlY3RcblNoYWRlclN0b3JlLlNoYWRlcnNTdG9yZVtuYW1lXSA9IHNoYWRlcjtcbi8qKiBAaW50ZXJuYWwgKi9cbmV4cG9ydCBjb25zdCBmaXJlUHJvY2VkdXJhbFRleHR1cmVQaXhlbFNoYWRlciA9IHsgbmFtZSwgc2hhZGVyIH07XG4iLCJpbXBvcnQgeyBzZXJpYWxpemUsIHNlcmlhbGl6ZUFzVmVjdG9yMiB9IGZyb20gXCJjb3JlL01pc2MvZGVjb3JhdG9yc1wiO1xyXG5pbXBvcnQgeyBTZXJpYWxpemF0aW9uSGVscGVyIH0gZnJvbSBcImNvcmUvTWlzYy9kZWNvcmF0b3JzLnNlcmlhbGl6YXRpb25cIjtcclxuaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gXCJjb3JlL01hdGhzL21hdGgudmVjdG9yXCI7XHJcbmltcG9ydCB7IENvbG9yMyB9IGZyb20gXCJjb3JlL01hdGhzL21hdGguY29sb3JcIjtcclxuaW1wb3J0IHR5cGUgeyBUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL3RleHR1cmVcIjtcclxuaW1wb3J0IHsgUHJvY2VkdXJhbFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvUHJvY2VkdXJhbHMvcHJvY2VkdXJhbFRleHR1cmVcIjtcclxuaW1wb3J0IHR5cGUgeyBTY2VuZSB9IGZyb20gXCJjb3JlL3NjZW5lXCI7XHJcbmltcG9ydCB7IFJlZ2lzdGVyQ2xhc3MgfSBmcm9tIFwiY29yZS9NaXNjL3R5cGVTdG9yZVwiO1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuXHJcbmltcG9ydCBcIi4vZmlyZVByb2NlZHVyYWxUZXh0dXJlLmZyYWdtZW50XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRmlyZVByb2NlZHVyYWxUZXh0dXJlIGV4dGVuZHMgUHJvY2VkdXJhbFRleHR1cmUge1xyXG4gICAgcHJpdmF0ZSBfdGltZTogbnVtYmVyID0gMC4wO1xyXG4gICAgcHJpdmF0ZSBfc3BlZWQgPSBuZXcgVmVjdG9yMigwLjUsIDAuMyk7XHJcbiAgICBwcml2YXRlIF9hdXRvR2VuZXJhdGVUaW1lOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgX2ZpcmVDb2xvcnM6IENvbG9yM1tdO1xyXG4gICAgcHJpdmF0ZSBfYWxwaGFUaHJlc2hvbGQ6IG51bWJlciA9IDAuNTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHNpemU6IG51bWJlciwgc2NlbmU6IE51bGxhYmxlPFNjZW5lPiA9IG51bGwsIGZhbGxiYWNrVGV4dHVyZT86IFRleHR1cmUsIGdlbmVyYXRlTWlwTWFwcz86IGJvb2xlYW4pIHtcclxuICAgICAgICBzdXBlcihuYW1lLCBzaXplLCBcImZpcmVQcm9jZWR1cmFsVGV4dHVyZVwiLCBzY2VuZSwgZmFsbGJhY2tUZXh0dXJlLCBnZW5lcmF0ZU1pcE1hcHMpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmVDb2xvcnMgPSBGaXJlUHJvY2VkdXJhbFRleHR1cmUuUmVkRmlyZUNvbG9ycztcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNoYWRlclVuaWZvcm1zKCkge1xyXG4gICAgICAgIHRoaXMuc2V0RmxvYXQoXCJ0aW1lXCIsIHRoaXMuX3RpbWUpO1xyXG4gICAgICAgIHRoaXMuc2V0VmVjdG9yMihcInNwZWVkXCIsIHRoaXMuX3NwZWVkKTtcclxuICAgICAgICB0aGlzLnNldENvbG9yMyhcImMxXCIsIHRoaXMuX2ZpcmVDb2xvcnNbMF0pO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IzKFwiYzJcIiwgdGhpcy5fZmlyZUNvbG9yc1sxXSk7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcjMoXCJjM1wiLCB0aGlzLl9maXJlQ29sb3JzWzJdKTtcclxuICAgICAgICB0aGlzLnNldENvbG9yMyhcImM0XCIsIHRoaXMuX2ZpcmVDb2xvcnNbM10pO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IzKFwiYzVcIiwgdGhpcy5fZmlyZUNvbG9yc1s0XSk7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcjMoXCJjNlwiLCB0aGlzLl9maXJlQ29sb3JzWzVdKTtcclxuICAgICAgICB0aGlzLnNldEZsb2F0KFwiYWxwaGFUaHJlc2hvbGRcIiwgdGhpcy5fYWxwaGFUaHJlc2hvbGQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvdmVycmlkZSByZW5kZXIodXNlQ2FtZXJhUG9zdFByb2Nlc3M/OiBib29sZWFuKSB7XHJcbiAgICAgICAgY29uc3Qgc2NlbmUgPSB0aGlzLmdldFNjZW5lKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2F1dG9HZW5lcmF0ZVRpbWUgJiYgc2NlbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZSArPSBzY2VuZS5nZXRBbmltYXRpb25SYXRpbygpICogMC4wMztcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5yZW5kZXIodXNlQ2FtZXJhUG9zdFByb2Nlc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IFB1cnBsZUZpcmVDb2xvcnMoKTogQ29sb3IzW10ge1xyXG4gICAgICAgIHJldHVybiBbbmV3IENvbG9yMygwLjUsIDAuMCwgMS4wKSwgbmV3IENvbG9yMygwLjksIDAuMCwgMS4wKSwgbmV3IENvbG9yMygwLjIsIDAuMCwgMS4wKSwgbmV3IENvbG9yMygxLjAsIDAuOSwgMS4wKSwgbmV3IENvbG9yMygwLjEsIDAuMSwgMS4wKSwgbmV3IENvbG9yMygwLjksIDAuOSwgMS4wKV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgR3JlZW5GaXJlQ29sb3JzKCk6IENvbG9yM1tdIHtcclxuICAgICAgICByZXR1cm4gW25ldyBDb2xvcjMoMC41LCAxLjAsIDAuMCksIG5ldyBDb2xvcjMoMC41LCAxLjAsIDAuMCksIG5ldyBDb2xvcjMoMC4zLCAwLjQsIDAuMCksIG5ldyBDb2xvcjMoMC41LCAxLjAsIDAuMCksIG5ldyBDb2xvcjMoMC4yLCAwLjAsIDAuMCksIG5ldyBDb2xvcjMoMC41LCAxLjAsIDAuMCldO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IFJlZEZpcmVDb2xvcnMoKTogQ29sb3IzW10ge1xyXG4gICAgICAgIHJldHVybiBbbmV3IENvbG9yMygwLjUsIDAuMCwgMC4xKSwgbmV3IENvbG9yMygwLjksIDAuMCwgMC4wKSwgbmV3IENvbG9yMygwLjIsIDAuMCwgMC4wKSwgbmV3IENvbG9yMygxLjAsIDAuOSwgMC4wKSwgbmV3IENvbG9yMygwLjEsIDAuMSwgMC4xKSwgbmV3IENvbG9yMygwLjksIDAuOSwgMC45KV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgQmx1ZUZpcmVDb2xvcnMoKTogQ29sb3IzW10ge1xyXG4gICAgICAgIHJldHVybiBbbmV3IENvbG9yMygwLjEsIDAuMCwgMC41KSwgbmV3IENvbG9yMygwLjAsIDAuMCwgMC41KSwgbmV3IENvbG9yMygwLjEsIDAuMCwgMC4yKSwgbmV3IENvbG9yMygwLjAsIDAuMCwgMS4wKSwgbmV3IENvbG9yMygwLjEsIDAuMiwgMC4zKSwgbmV3IENvbG9yMygwLjAsIDAuMiwgMC45KV07XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IGF1dG9HZW5lcmF0ZVRpbWUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F1dG9HZW5lcmF0ZVRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBhdXRvR2VuZXJhdGVUaW1lKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fYXV0b0dlbmVyYXRlVGltZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZmlyZUNvbG9ycygpOiBDb2xvcjNbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpcmVDb2xvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBmaXJlQ29sb3JzKHZhbHVlOiBDb2xvcjNbXSkge1xyXG4gICAgICAgIHRoaXMuX2ZpcmVDb2xvcnMgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IHRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHRpbWUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3RpbWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZUFzVmVjdG9yMigpXHJcbiAgICBwdWJsaWMgZ2V0IHNwZWVkKCk6IFZlY3RvcjIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHNwZWVkKHZhbHVlOiBWZWN0b3IyKSB7XHJcbiAgICAgICAgdGhpcy5fc3BlZWQgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IGFscGhhVGhyZXNob2xkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FscGhhVGhyZXNob2xkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgYWxwaGFUaHJlc2hvbGQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2FscGhhVGhyZXNob2xkID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VyaWFsaXplcyB0aGlzIGZpcmUgcHJvY2VkdXJhbCB0ZXh0dXJlXHJcbiAgICAgKiBAcmV0dXJucyBhIHNlcmlhbGl6ZWQgZmlyZSBwcm9jZWR1cmFsIHRleHR1cmUgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvdmVycmlkZSBzZXJpYWxpemUoKTogYW55IHtcclxuICAgICAgICBjb25zdCBzZXJpYWxpemF0aW9uT2JqZWN0ID0gU2VyaWFsaXphdGlvbkhlbHBlci5TZXJpYWxpemUodGhpcywgc3VwZXIuc2VyaWFsaXplKCkpO1xyXG4gICAgICAgIHNlcmlhbGl6YXRpb25PYmplY3QuY3VzdG9tVHlwZSA9IFwiQkFCWUxPTi5GaXJlUHJvY2VkdXJhbFRleHR1cmVcIjtcclxuXHJcbiAgICAgICAgc2VyaWFsaXphdGlvbk9iamVjdC5maXJlQ29sb3JzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9maXJlQ29sb3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHNlcmlhbGl6YXRpb25PYmplY3QuZmlyZUNvbG9ycy5wdXNoKHRoaXMuX2ZpcmVDb2xvcnNbaV0uYXNBcnJheSgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJpYWxpemF0aW9uT2JqZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIEZpcmUgUHJvY2VkdXJhbCBUZXh0dXJlIGZyb20gcGFyc2VkIGZpcmUgcHJvY2VkdXJhbCB0ZXh0dXJlIGRhdGFcclxuICAgICAqIEBwYXJhbSBwYXJzZWRUZXh0dXJlIGRlZmluZXMgcGFyc2VkIHRleHR1cmUgZGF0YVxyXG4gICAgICogQHBhcmFtIHNjZW5lIGRlZmluZXMgdGhlIGN1cnJlbnQgc2NlbmVcclxuICAgICAqIEBwYXJhbSByb290VXJsIGRlZmluZXMgdGhlIHJvb3QgVVJMIGNvbnRhaW5pbmcgZmlyZSBwcm9jZWR1cmFsIHRleHR1cmUgaW5mb3JtYXRpb25cclxuICAgICAqIEByZXR1cm5zIGEgcGFyc2VkIEZpcmUgUHJvY2VkdXJhbCBUZXh0dXJlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgb3ZlcnJpZGUgUGFyc2UocGFyc2VkVGV4dHVyZTogYW55LCBzY2VuZTogU2NlbmUsIHJvb3RVcmw6IHN0cmluZyk6IEZpcmVQcm9jZWR1cmFsVGV4dHVyZSB7XHJcbiAgICAgICAgY29uc3QgdGV4dHVyZSA9IFNlcmlhbGl6YXRpb25IZWxwZXIuUGFyc2UoXHJcbiAgICAgICAgICAgICgpID0+IG5ldyBGaXJlUHJvY2VkdXJhbFRleHR1cmUocGFyc2VkVGV4dHVyZS5uYW1lLCBwYXJzZWRUZXh0dXJlLl9zaXplLCBzY2VuZSwgdW5kZWZpbmVkLCBwYXJzZWRUZXh0dXJlLl9nZW5lcmF0ZU1pcE1hcHMpLFxyXG4gICAgICAgICAgICBwYXJzZWRUZXh0dXJlLFxyXG4gICAgICAgICAgICBzY2VuZSxcclxuICAgICAgICAgICAgcm9vdFVybFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbG9yczogQ29sb3IzW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnNlZFRleHR1cmUuZmlyZUNvbG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb2xvcnMucHVzaChDb2xvcjMuRnJvbUFycmF5KHBhcnNlZFRleHR1cmUuZmlyZUNvbG9yc1tpXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGV4dHVyZS5maXJlQ29sb3JzID0gY29sb3JzO1xyXG5cclxuICAgICAgICByZXR1cm4gdGV4dHVyZTtcclxuICAgIH1cclxufVxyXG5cclxuUmVnaXN0ZXJDbGFzcyhcIkJBQllMT04uRmlyZVByb2NlZHVyYWxUZXh0dXJlXCIsIEZpcmVQcm9jZWR1cmFsVGV4dHVyZSk7XHJcbiIsImV4cG9ydCAqIGZyb20gXCIuL2ZpcmVQcm9jZWR1cmFsVGV4dHVyZVwiO1xyXG4iLCIvLyBEbyBub3QgZWRpdC5cbmltcG9ydCB7IFNoYWRlclN0b3JlIH0gZnJvbSBcImNvcmUvRW5naW5lcy9zaGFkZXJTdG9yZVwiO1xuXG5jb25zdCBuYW1lID0gXCJncmFzc1Byb2NlZHVyYWxUZXh0dXJlUGl4ZWxTaGFkZXJcIjtcbmNvbnN0IHNoYWRlciA9IGBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7dmFyeWluZyB2ZWMyIHZQb3NpdGlvbjt2YXJ5aW5nIHZlYzIgdlVWO3VuaWZvcm0gdmVjMyBoZXJiMUNvbG9yO3VuaWZvcm0gdmVjMyBoZXJiMkNvbG9yO3VuaWZvcm0gdmVjMyBoZXJiM0NvbG9yO3VuaWZvcm0gdmVjMyBncm91bmRDb2xvcjtmbG9hdCByYW5kKHZlYzIgbikge3JldHVybiBmcmFjdChjb3MoZG90KG4sdmVjMigxMi45ODk4LDQuMTQxNCkpKSo0Mzc1OC41NDUzKTt9XG5mbG9hdCBub2lzZSh2ZWMyIG4pIHtjb25zdCB2ZWMyIGQ9dmVjMigwLjAsMS4wKTt2ZWMyIGI9Zmxvb3IobiksZj1zbW9vdGhzdGVwKHZlYzIoMC4wKSx2ZWMyKDEuMCksZnJhY3QobikpO3JldHVybiBtaXgobWl4KHJhbmQoYikscmFuZChiK2QueXgpLGYueCksbWl4KHJhbmQoYitkLnh5KSxyYW5kKGIrZC55eSksZi54KSxmLnkpO31cbmZsb2F0IGZibSh2ZWMyIG4pIHtmbG9hdCB0b3RhbD0wLjAsYW1wbGl0dWRlPTEuMDtmb3IgKGludCBpPTA7IGk8NDsgaSsrKSB7dG90YWwrPW5vaXNlKG4pKmFtcGxpdHVkZTtuKz1uO2FtcGxpdHVkZSo9MC41O31cbnJldHVybiB0b3RhbDt9XG4jZGVmaW5lIENVU1RPTV9GUkFHTUVOVF9ERUZJTklUSU9OU1xudm9pZCBtYWluKHZvaWQpIHtcbiNkZWZpbmUgQ1VTVE9NX0ZSQUdNRU5UX01BSU5fQkVHSU5cbnZlYzMgY29sb3I9bWl4KGdyb3VuZENvbG9yLGhlcmIxQ29sb3IscmFuZChnbF9GcmFnQ29vcmQueHkqNC4wKSk7Y29sb3I9bWl4KGNvbG9yLGhlcmIyQ29sb3IscmFuZChnbF9GcmFnQ29vcmQueHkqOC4wKSk7Y29sb3I9bWl4KGNvbG9yLGhlcmIzQ29sb3IscmFuZChnbF9GcmFnQ29vcmQueHkpKTtjb2xvcj1taXgoY29sb3IsaGVyYjFDb2xvcixmYm0oZ2xfRnJhZ0Nvb3JkLnh5KjE2LjApKTtnbF9GcmFnQ29sb3I9dmVjNChjb2xvciwxLjApO1xuI2RlZmluZSBDVVNUT01fRlJBR01FTlRfTUFJTl9FTkRcbn1gO1xuLy8gU2lkZWVmZmVjdFxuU2hhZGVyU3RvcmUuU2hhZGVyc1N0b3JlW25hbWVdID0gc2hhZGVyO1xuLyoqIEBpbnRlcm5hbCAqL1xuZXhwb3J0IGNvbnN0IGdyYXNzUHJvY2VkdXJhbFRleHR1cmVQaXhlbFNoYWRlciA9IHsgbmFtZSwgc2hhZGVyIH07XG4iLCJpbXBvcnQgeyBzZXJpYWxpemVBc0NvbG9yMyB9IGZyb20gXCJjb3JlL01pc2MvZGVjb3JhdG9yc1wiO1xyXG5pbXBvcnQgeyBTZXJpYWxpemF0aW9uSGVscGVyIH0gZnJvbSBcImNvcmUvTWlzYy9kZWNvcmF0b3JzLnNlcmlhbGl6YXRpb25cIjtcclxuaW1wb3J0IHsgQ29sb3IzIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC5jb2xvclwiO1xyXG5pbXBvcnQgdHlwZSB7IFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvdGV4dHVyZVwiO1xyXG5pbXBvcnQgeyBQcm9jZWR1cmFsVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9Qcm9jZWR1cmFscy9wcm9jZWR1cmFsVGV4dHVyZVwiO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuaW1wb3J0IHsgUmVnaXN0ZXJDbGFzcyB9IGZyb20gXCJjb3JlL01pc2MvdHlwZVN0b3JlXCI7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5cclxuaW1wb3J0IFwiLi9ncmFzc1Byb2NlZHVyYWxUZXh0dXJlLmZyYWdtZW50XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR3Jhc3NQcm9jZWR1cmFsVGV4dHVyZSBleHRlbmRzIFByb2NlZHVyYWxUZXh0dXJlIHtcclxuICAgIHByaXZhdGUgX2dyYXNzQ29sb3JzOiBDb2xvcjNbXTtcclxuICAgIHByaXZhdGUgX2dyb3VuZENvbG9yID0gbmV3IENvbG9yMygxLCAxLCAxKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHNpemU6IG51bWJlciwgc2NlbmU6IE51bGxhYmxlPFNjZW5lPiA9IG51bGwsIGZhbGxiYWNrVGV4dHVyZT86IFRleHR1cmUsIGdlbmVyYXRlTWlwTWFwcz86IGJvb2xlYW4pIHtcclxuICAgICAgICBzdXBlcihuYW1lLCBzaXplLCBcImdyYXNzUHJvY2VkdXJhbFRleHR1cmVcIiwgc2NlbmUsIGZhbGxiYWNrVGV4dHVyZSwgZ2VuZXJhdGVNaXBNYXBzKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZ3Jhc3NDb2xvcnMgPSBbbmV3IENvbG9yMygwLjI5LCAwLjM4LCAwLjAyKSwgbmV3IENvbG9yMygwLjM2LCAwLjQ5LCAwLjA5KSwgbmV3IENvbG9yMygwLjUxLCAwLjYsIDAuMjgpXTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVTaGFkZXJVbmlmb3JtcygpIHtcclxuICAgICAgICB0aGlzLnNldENvbG9yMyhcImhlcmIxQ29sb3JcIiwgdGhpcy5fZ3Jhc3NDb2xvcnNbMF0pO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IzKFwiaGVyYjJDb2xvclwiLCB0aGlzLl9ncmFzc0NvbG9yc1sxXSk7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcjMoXCJoZXJiM0NvbG9yXCIsIHRoaXMuX2dyYXNzQ29sb3JzWzJdKTtcclxuICAgICAgICB0aGlzLnNldENvbG9yMyhcImdyb3VuZENvbG9yXCIsIHRoaXMuX2dyb3VuZENvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGdyYXNzQ29sb3JzKCk6IENvbG9yM1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ3Jhc3NDb2xvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBncmFzc0NvbG9ycyh2YWx1ZTogQ29sb3IzW10pIHtcclxuICAgICAgICB0aGlzLl9ncmFzc0NvbG9ycyA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBAc2VyaWFsaXplQXNDb2xvcjMoKVxyXG4gICAgcHVibGljIGdldCBncm91bmRDb2xvcigpOiBDb2xvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ncm91bmRDb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGdyb3VuZENvbG9yKHZhbHVlOiBDb2xvcjMpIHtcclxuICAgICAgICB0aGlzLl9ncm91bmRDb2xvciA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlcmlhbGl6ZXMgdGhpcyBncmFzcyBwcm9jZWR1cmFsIHRleHR1cmVcclxuICAgICAqIEByZXR1cm5zIGEgc2VyaWFsaXplZCBncmFzcyBwcm9jZWR1cmFsIHRleHR1cmUgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvdmVycmlkZSBzZXJpYWxpemUoKTogYW55IHtcclxuICAgICAgICBjb25zdCBzZXJpYWxpemF0aW9uT2JqZWN0ID0gU2VyaWFsaXphdGlvbkhlbHBlci5TZXJpYWxpemUodGhpcywgc3VwZXIuc2VyaWFsaXplKCkpO1xyXG4gICAgICAgIHNlcmlhbGl6YXRpb25PYmplY3QuY3VzdG9tVHlwZSA9IFwiQkFCWUxPTi5HcmFzc1Byb2NlZHVyYWxUZXh0dXJlXCI7XHJcblxyXG4gICAgICAgIHNlcmlhbGl6YXRpb25PYmplY3QuZ3Jhc3NDb2xvcnMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2dyYXNzQ29sb3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHNlcmlhbGl6YXRpb25PYmplY3QuZ3Jhc3NDb2xvcnMucHVzaCh0aGlzLl9ncmFzc0NvbG9yc1tpXS5hc0FycmF5KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcmlhbGl6YXRpb25PYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgR3Jhc3MgUHJvY2VkdXJhbCBUZXh0dXJlIGZyb20gcGFyc2VkIGdyYXNzIHByb2NlZHVyYWwgdGV4dHVyZSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gcGFyc2VkVGV4dHVyZSBkZWZpbmVzIHBhcnNlZCB0ZXh0dXJlIGRhdGFcclxuICAgICAqIEBwYXJhbSBzY2VuZSBkZWZpbmVzIHRoZSBjdXJyZW50IHNjZW5lXHJcbiAgICAgKiBAcGFyYW0gcm9vdFVybCBkZWZpbmVzIHRoZSByb290IFVSTCBjb250YWluaW5nIGdyYXNzIHByb2NlZHVyYWwgdGV4dHVyZSBpbmZvcm1hdGlvblxyXG4gICAgICogQHJldHVybnMgYSBwYXJzZWQgR3Jhc3MgUHJvY2VkdXJhbCBUZXh0dXJlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgb3ZlcnJpZGUgUGFyc2UocGFyc2VkVGV4dHVyZTogYW55LCBzY2VuZTogU2NlbmUsIHJvb3RVcmw6IHN0cmluZyk6IEdyYXNzUHJvY2VkdXJhbFRleHR1cmUge1xyXG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBTZXJpYWxpemF0aW9uSGVscGVyLlBhcnNlKFxyXG4gICAgICAgICAgICAoKSA9PiBuZXcgR3Jhc3NQcm9jZWR1cmFsVGV4dHVyZShwYXJzZWRUZXh0dXJlLm5hbWUsIHBhcnNlZFRleHR1cmUuX3NpemUsIHNjZW5lLCB1bmRlZmluZWQsIHBhcnNlZFRleHR1cmUuX2dlbmVyYXRlTWlwTWFwcyksXHJcbiAgICAgICAgICAgIHBhcnNlZFRleHR1cmUsXHJcbiAgICAgICAgICAgIHNjZW5lLFxyXG4gICAgICAgICAgICByb290VXJsXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgY29uc3QgY29sb3JzOiBDb2xvcjNbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyc2VkVGV4dHVyZS5ncmFzc0NvbG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb2xvcnMucHVzaChDb2xvcjMuRnJvbUFycmF5KHBhcnNlZFRleHR1cmUuZ3Jhc3NDb2xvcnNbaV0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRleHR1cmUuZ3Jhc3NDb2xvcnMgPSBjb2xvcnM7XHJcblxyXG4gICAgICAgIHJldHVybiB0ZXh0dXJlO1xyXG4gICAgfVxyXG59XHJcblxyXG5SZWdpc3RlckNsYXNzKFwiQkFCWUxPTi5HcmFzc1Byb2NlZHVyYWxUZXh0dXJlXCIsIEdyYXNzUHJvY2VkdXJhbFRleHR1cmUpO1xyXG4iLCJleHBvcnQgKiBmcm9tIFwiLi9ncmFzc1Byb2NlZHVyYWxUZXh0dXJlXCI7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1pbnRlcm5hbC1tb2R1bGVzICovXHJcbmV4cG9ydCAqIGZyb20gXCIuL2JyaWNrL2luZGV4XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2Nsb3VkL2luZGV4XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2ZpcmUvaW5kZXhcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ3Jhc3MvaW5kZXhcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbWFyYmxlL2luZGV4XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL25vcm1hbE1hcC9pbmRleFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9wZXJsaW5Ob2lzZS9pbmRleFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9yb2FkL2luZGV4XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3N0YXJmaWVsZC9pbmRleFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi93b29kL2luZGV4XCI7XHJcbiIsImV4cG9ydCAqIGZyb20gXCIuL21hcmJsZVByb2NlZHVyYWxUZXh0dXJlXCI7XHJcbiIsIi8vIERvIG5vdCBlZGl0LlxuaW1wb3J0IHsgU2hhZGVyU3RvcmUgfSBmcm9tIFwiY29yZS9FbmdpbmVzL3NoYWRlclN0b3JlXCI7XG5cbmNvbnN0IG5hbWUgPSBcIm1hcmJsZVByb2NlZHVyYWxUZXh0dXJlUGl4ZWxTaGFkZXJcIjtcbmNvbnN0IHNoYWRlciA9IGBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7dmFyeWluZyB2ZWMyIHZQb3NpdGlvbjt2YXJ5aW5nIHZlYzIgdlVWO3VuaWZvcm0gZmxvYXQgbnVtYmVyT2ZUaWxlc0hlaWdodDt1bmlmb3JtIGZsb2F0IG51bWJlck9mVGlsZXNXaWR0aDt1bmlmb3JtIGZsb2F0IGFtcGxpdHVkZTt1bmlmb3JtIHZlYzMgbWFyYmxlQ29sb3I7dW5pZm9ybSB2ZWMzIGpvaW50Q29sb3I7Y29uc3QgdmVjMyB0aWxlU2l6ZT12ZWMzKDEuMSwxLjAsMS4xKTtjb25zdCB2ZWMzIHRpbGVQY3Q9dmVjMygwLjk4LDEuMCwwLjk4KTtmbG9hdCByYW5kKHZlYzIgbikge3JldHVybiBmcmFjdChjb3MoZG90KG4sdmVjMigxMi45ODk4LDQuMTQxNCkpKSo0Mzc1OC41NDUzKTt9XG5mbG9hdCBub2lzZSh2ZWMyIG4pIHtjb25zdCB2ZWMyIGQ9dmVjMigwLjAsMS4wKTt2ZWMyIGI9Zmxvb3IobiksZj1zbW9vdGhzdGVwKHZlYzIoMC4wKSx2ZWMyKDEuMCksZnJhY3QobikpO3JldHVybiBtaXgobWl4KHJhbmQoYikscmFuZChiK2QueXgpLGYueCksbWl4KHJhbmQoYitkLnh5KSxyYW5kKGIrZC55eSksZi54KSxmLnkpO31cbmZsb2F0IHR1cmJ1bGVuY2UodmVjMiBQKVxue2Zsb2F0IHZhbD0wLjA7ZmxvYXQgZnJlcT0xLjA7Zm9yIChpbnQgaT0wOyBpPDQ7IGkrKylcbnt2YWwrPWFicyhub2lzZShQKmZyZXEpL2ZyZXEpO2ZyZXEqPTIuMDc7fVxucmV0dXJuIHZhbDt9XG5mbG9hdCByb3VuZEYoZmxvYXQgbnVtYmVyKXtyZXR1cm4gc2lnbihudW1iZXIpKmZsb29yKGFicyhudW1iZXIpKzAuNSk7fVxudmVjMyBtYXJibGVfY29sb3IoZmxvYXQgeClcbnt2ZWMzIGNvbDt4PTAuNSooeCsxLik7eD1zcXJ0KHgpOyBcbng9c3FydCh4KTt4PXNxcnQoeCk7Y29sPXZlYzMoLjIrLjc1KngpOyBcbmNvbC5iKj0wLjk1OyBcbnJldHVybiBjb2w7fVxudm9pZCBtYWluKClcbntmbG9hdCBicmlja1c9MS4wL251bWJlck9mVGlsZXNXaWR0aDtmbG9hdCBicmlja0g9MS4wL251bWJlck9mVGlsZXNIZWlnaHQ7ZmxvYXQgam9pbnRXUGVyY2VudGFnZT0wLjAxO2Zsb2F0IGpvaW50SFBlcmNlbnRhZ2U9MC4wMTt2ZWMzIGNvbG9yPW1hcmJsZUNvbG9yO2Zsb2F0IHlpPXZVVi55L2JyaWNrSDtmbG9hdCBueWk9cm91bmRGKHlpKTtmbG9hdCB4aT12VVYueC9icmlja1c7aWYgKG1vZChmbG9vcih5aSksMi4wKT09MC4wKXt4aT14aS0wLjU7fVxuZmxvYXQgbnhpPXJvdW5kRih4aSk7dmVjMiBicmlja3ZVVj12ZWMyKCh4aS1mbG9vcih4aSkpL2JyaWNrSCwoeWktZmxvb3IoeWkpKS9icmlja1cpO2lmICh5aTxueWkram9pbnRIUGVyY2VudGFnZSAmJiB5aT5ueWktam9pbnRIUGVyY2VudGFnZSl7Y29sb3I9bWl4KGpvaW50Q29sb3IsdmVjMygwLjM3LDAuMjUsMC4yNSksKHlpLW55aSkvam9pbnRIUGVyY2VudGFnZSswLjIpO31cbmVsc2UgaWYgKHhpPG54aStqb2ludFdQZXJjZW50YWdlICYmIHhpPm54aS1qb2ludFdQZXJjZW50YWdlKXtjb2xvcj1taXgoam9pbnRDb2xvcix2ZWMzKDAuNDQsMC40NCwwLjQ0KSwoeGktbnhpKS9qb2ludFdQZXJjZW50YWdlKzAuMik7fVxuZWxzZSB7ZmxvYXQgdD02LjI4KmJyaWNrdlVWLngvKHRpbGVTaXplLngrbm9pc2UodmVjMih2VVYpKjYuMCkpO3QrPWFtcGxpdHVkZSp0dXJidWxlbmNlKGJyaWNrdlVWLnh5KTt0PXNpbih0KTtjb2xvcj1tYXJibGVfY29sb3IodCk7fVxuZ2xfRnJhZ0NvbG9yPXZlYzQoY29sb3IsMC4wKTt9YDtcbi8vIFNpZGVlZmZlY3RcblNoYWRlclN0b3JlLlNoYWRlcnNTdG9yZVtuYW1lXSA9IHNoYWRlcjtcbi8qKiBAaW50ZXJuYWwgKi9cbmV4cG9ydCBjb25zdCBtYXJibGVQcm9jZWR1cmFsVGV4dHVyZVBpeGVsU2hhZGVyID0geyBuYW1lLCBzaGFkZXIgfTtcbiIsImltcG9ydCB7IHNlcmlhbGl6ZSB9IGZyb20gXCJjb3JlL01pc2MvZGVjb3JhdG9yc1wiO1xyXG5pbXBvcnQgeyBTZXJpYWxpemF0aW9uSGVscGVyIH0gZnJvbSBcImNvcmUvTWlzYy9kZWNvcmF0b3JzLnNlcmlhbGl6YXRpb25cIjtcclxuaW1wb3J0IHsgQ29sb3IzIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC5jb2xvclwiO1xyXG5pbXBvcnQgdHlwZSB7IFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvdGV4dHVyZVwiO1xyXG5pbXBvcnQgeyBQcm9jZWR1cmFsVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9Qcm9jZWR1cmFscy9wcm9jZWR1cmFsVGV4dHVyZVwiO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuaW1wb3J0IHsgUmVnaXN0ZXJDbGFzcyB9IGZyb20gXCJjb3JlL01pc2MvdHlwZVN0b3JlXCI7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5cclxuaW1wb3J0IFwiLi9tYXJibGVQcm9jZWR1cmFsVGV4dHVyZS5mcmFnbWVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1hcmJsZVByb2NlZHVyYWxUZXh0dXJlIGV4dGVuZHMgUHJvY2VkdXJhbFRleHR1cmUge1xyXG4gICAgcHJpdmF0ZSBfbnVtYmVyT2ZUaWxlc0hlaWdodDogbnVtYmVyID0gMztcclxuICAgIHByaXZhdGUgX251bWJlck9mVGlsZXNXaWR0aDogbnVtYmVyID0gMztcclxuICAgIHByaXZhdGUgX2FtcGxpdHVkZTogbnVtYmVyID0gOS4wO1xyXG4gICAgcHJpdmF0ZSBfam9pbnRDb2xvciA9IG5ldyBDb2xvcjMoMC43MiwgMC43MiwgMC43Mik7XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBzaXplOiBudW1iZXIsIHNjZW5lOiBOdWxsYWJsZTxTY2VuZT4gPSBudWxsLCBmYWxsYmFja1RleHR1cmU/OiBUZXh0dXJlLCBnZW5lcmF0ZU1pcE1hcHM/OiBib29sZWFuKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgc2l6ZSwgXCJtYXJibGVQcm9jZWR1cmFsVGV4dHVyZVwiLCBzY2VuZSwgZmFsbGJhY2tUZXh0dXJlLCBnZW5lcmF0ZU1pcE1hcHMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlU2hhZGVyVW5pZm9ybXMoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRGbG9hdChcIm51bWJlck9mVGlsZXNIZWlnaHRcIiwgdGhpcy5fbnVtYmVyT2ZUaWxlc0hlaWdodCk7XHJcbiAgICAgICAgdGhpcy5zZXRGbG9hdChcIm51bWJlck9mVGlsZXNXaWR0aFwiLCB0aGlzLl9udW1iZXJPZlRpbGVzV2lkdGgpO1xyXG4gICAgICAgIHRoaXMuc2V0RmxvYXQoXCJhbXBsaXR1ZGVcIiwgdGhpcy5fYW1wbGl0dWRlKTtcclxuICAgICAgICB0aGlzLnNldENvbG9yMyhcImpvaW50Q29sb3JcIiwgdGhpcy5fam9pbnRDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IG51bWJlck9mVGlsZXNIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbnVtYmVyT2ZUaWxlc0hlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IG51bWJlck9mVGlsZXNIZWlnaHQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX251bWJlck9mVGlsZXNIZWlnaHQgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IGFtcGxpdHVkZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hbXBsaXR1ZGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBhbXBsaXR1ZGUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2FtcGxpdHVkZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBnZXQgbnVtYmVyT2ZUaWxlc1dpZHRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX251bWJlck9mVGlsZXNXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IG51bWJlck9mVGlsZXNXaWR0aCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fbnVtYmVyT2ZUaWxlc1dpZHRoID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGdldCBqb2ludENvbG9yKCk6IENvbG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2pvaW50Q29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBqb2ludENvbG9yKHZhbHVlOiBDb2xvcjMpIHtcclxuICAgICAgICB0aGlzLl9qb2ludENvbG9yID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VyaWFsaXplcyB0aGlzIG1hcmJsZSBwcm9jZWR1cmFsIHRleHR1cmVcclxuICAgICAqIEByZXR1cm5zIGEgc2VyaWFsaXplZCBtYXJibGUgcHJvY2VkdXJhbCB0ZXh0dXJlIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgc2VyaWFsaXplKCk6IGFueSB7XHJcbiAgICAgICAgY29uc3Qgc2VyaWFsaXphdGlvbk9iamVjdCA9IFNlcmlhbGl6YXRpb25IZWxwZXIuU2VyaWFsaXplKHRoaXMsIHN1cGVyLnNlcmlhbGl6ZSgpKTtcclxuICAgICAgICBzZXJpYWxpemF0aW9uT2JqZWN0LmN1c3RvbVR5cGUgPSBcIkJBQllMT04uTWFyYmxlUHJvY2VkdXJhbFRleHR1cmVcIjtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcmlhbGl6YXRpb25PYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgTWFyYmxlIFByb2NlZHVyYWwgVGV4dHVyZSBmcm9tIHBhcnNlZCBtYXJibGUgcHJvY2VkdXJhbCB0ZXh0dXJlIGRhdGFcclxuICAgICAqIEBwYXJhbSBwYXJzZWRUZXh0dXJlIGRlZmluZXMgcGFyc2VkIHRleHR1cmUgZGF0YVxyXG4gICAgICogQHBhcmFtIHNjZW5lIGRlZmluZXMgdGhlIGN1cnJlbnQgc2NlbmVcclxuICAgICAqIEBwYXJhbSByb290VXJsIGRlZmluZXMgdGhlIHJvb3QgVVJMIGNvbnRhaW5pbmcgbWFyYmxlIHByb2NlZHVyYWwgdGV4dHVyZSBpbmZvcm1hdGlvblxyXG4gICAgICogQHJldHVybnMgYSBwYXJzZWQgTWFyYmxlIFByb2NlZHVyYWwgVGV4dHVyZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG92ZXJyaWRlIFBhcnNlKHBhcnNlZFRleHR1cmU6IGFueSwgc2NlbmU6IFNjZW5lLCByb290VXJsOiBzdHJpbmcpOiBNYXJibGVQcm9jZWR1cmFsVGV4dHVyZSB7XHJcbiAgICAgICAgY29uc3QgdGV4dHVyZSA9IFNlcmlhbGl6YXRpb25IZWxwZXIuUGFyc2UoXHJcbiAgICAgICAgICAgICgpID0+IG5ldyBNYXJibGVQcm9jZWR1cmFsVGV4dHVyZShwYXJzZWRUZXh0dXJlLm5hbWUsIHBhcnNlZFRleHR1cmUuX3NpemUsIHNjZW5lLCB1bmRlZmluZWQsIHBhcnNlZFRleHR1cmUuX2dlbmVyYXRlTWlwTWFwcyksXHJcbiAgICAgICAgICAgIHBhcnNlZFRleHR1cmUsXHJcbiAgICAgICAgICAgIHNjZW5lLFxyXG4gICAgICAgICAgICByb290VXJsXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRleHR1cmU7XHJcbiAgICB9XHJcbn1cclxuXHJcblJlZ2lzdGVyQ2xhc3MoXCJCQUJZTE9OLk1hcmJsZVByb2NlZHVyYWxUZXh0dXJlXCIsIE1hcmJsZVByb2NlZHVyYWxUZXh0dXJlKTtcclxuIiwiZXhwb3J0ICogZnJvbSBcIi4vbm9ybWFsTWFwUHJvY2VkdXJhbFRleHR1cmVcIjtcclxuIiwiLy8gRG8gbm90IGVkaXQuXG5pbXBvcnQgeyBTaGFkZXJTdG9yZSB9IGZyb20gXCJjb3JlL0VuZ2luZXMvc2hhZGVyU3RvcmVcIjtcblxuY29uc3QgbmFtZSA9IFwibm9ybWFsTWFwUHJvY2VkdXJhbFRleHR1cmVQaXhlbFNoYWRlclwiO1xuY29uc3Qgc2hhZGVyID0gYHByZWNpc2lvbiBoaWdocCBmbG9hdDt1bmlmb3JtIHNhbXBsZXIyRCBiYXNlU2FtcGxlcjt1bmlmb3JtIGZsb2F0IHNpemU7dmFyeWluZyB2ZWMyIHZVVjtjb25zdCB2ZWMzIExVTUFfQ09FRkZJQ0lFTlQ9dmVjMygwLjIxMjYsMC43MTUyLDAuMDcyMik7ZmxvYXQgbHVtYUF0Q29vcmQodmVjMiBjb29yZClcbnt2ZWMzIHBpeGVsPXRleHR1cmUyRChiYXNlU2FtcGxlcixjb29yZCkucmdiO2Zsb2F0IGx1bWE9ZG90KHBpeGVsLExVTUFfQ09FRkZJQ0lFTlQpO3JldHVybiBsdW1hO31cbnZvaWQgbWFpbigpXG57ZmxvYXQgbHVtYVUwPWx1bWFBdENvb3JkKHZVVit2ZWMyKC0xLjAsIDAuMCkvc2l6ZSk7ZmxvYXQgbHVtYVUxPWx1bWFBdENvb3JkKHZVVit2ZWMyKCAxLjAsIDAuMCkvc2l6ZSk7ZmxvYXQgbHVtYVYwPWx1bWFBdENvb3JkKHZVVit2ZWMyKCAwLjAsLTEuMCkvc2l6ZSk7ZmxvYXQgbHVtYVYxPWx1bWFBdENvb3JkKHZVVit2ZWMyKCAwLjAsIDEuMCkvc2l6ZSk7dmVjMiBzbG9wZT0odmVjMihsdW1hVTAtbHVtYVUxLGx1bWFWMC1sdW1hVjEpKzEuMCkqMC41O2dsX0ZyYWdDb2xvcj12ZWM0KHNsb3BlLDEuMCwxLjApO31cbmA7XG4vLyBTaWRlZWZmZWN0XG5TaGFkZXJTdG9yZS5TaGFkZXJzU3RvcmVbbmFtZV0gPSBzaGFkZXI7XG4vKiogQGludGVybmFsICovXG5leHBvcnQgY29uc3Qgbm9ybWFsTWFwUHJvY2VkdXJhbFRleHR1cmVQaXhlbFNoYWRlciA9IHsgbmFtZSwgc2hhZGVyIH07XG4iLCJpbXBvcnQgeyBzZXJpYWxpemVBc1RleHR1cmUgfSBmcm9tIFwiY29yZS9NaXNjL2RlY29yYXRvcnNcIjtcclxuaW1wb3J0IHsgU2VyaWFsaXphdGlvbkhlbHBlciB9IGZyb20gXCJjb3JlL01pc2MvZGVjb3JhdG9ycy5zZXJpYWxpemF0aW9uXCI7XHJcbmltcG9ydCB0eXBlIHsgVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy90ZXh0dXJlXCI7XHJcbmltcG9ydCB7IFByb2NlZHVyYWxUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL1Byb2NlZHVyYWxzL3Byb2NlZHVyYWxUZXh0dXJlXCI7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5pbXBvcnQgeyBSZWdpc3RlckNsYXNzIH0gZnJvbSBcImNvcmUvTWlzYy90eXBlU3RvcmVcIjtcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcbmltcG9ydCBcIi4vbm9ybWFsTWFwUHJvY2VkdXJhbFRleHR1cmUuZnJhZ21lbnRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBOb3JtYWxNYXBQcm9jZWR1cmFsVGV4dHVyZSBleHRlbmRzIFByb2NlZHVyYWxUZXh0dXJlIHtcclxuICAgIHByaXZhdGUgX2Jhc2VUZXh0dXJlOiBUZXh0dXJlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgc2l6ZTogbnVtYmVyLCBzY2VuZTogTnVsbGFibGU8U2NlbmU+ID0gbnVsbCwgZmFsbGJhY2tUZXh0dXJlPzogVGV4dHVyZSwgZ2VuZXJhdGVNaXBNYXBzPzogYm9vbGVhbikge1xyXG4gICAgICAgIHN1cGVyKG5hbWUsIHNpemUsIFwibm9ybWFsTWFwUHJvY2VkdXJhbFRleHR1cmVcIiwgc2NlbmUsIGZhbGxiYWNrVGV4dHVyZSwgZ2VuZXJhdGVNaXBNYXBzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNoYWRlclVuaWZvcm1zKCkge1xyXG4gICAgICAgIHRoaXMuc2V0VGV4dHVyZShcImJhc2VTYW1wbGVyXCIsIHRoaXMuX2Jhc2VUZXh0dXJlKTtcclxuICAgICAgICB0aGlzLnNldEZsb2F0KFwic2l6ZVwiLCB0aGlzLmdldFJlbmRlclNpemUoKSBhcyBudW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvdmVycmlkZSByZW5kZXIodXNlQ2FtZXJhUG9zdFByb2Nlc3M/OiBib29sZWFuKSB7XHJcbiAgICAgICAgc3VwZXIucmVuZGVyKHVzZUNhbWVyYVBvc3RQcm9jZXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgcmVzaXplKHNpemU6IGFueSwgZ2VuZXJhdGVNaXBNYXBzOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5yZXNpemUoc2l6ZSwgZ2VuZXJhdGVNaXBNYXBzKTtcclxuXHJcbiAgICAgICAgLy8gV2UgbmVlZCB0byB1cGRhdGUgdGhlIFwic2l6ZVwiIHVuaWZvcm1cclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG92ZXJyaWRlIGlzUmVhZHkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9iYXNlVGV4dHVyZSB8fCAhdGhpcy5fYmFzZVRleHR1cmUuaXNSZWFkeSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdXBlci5pc1JlYWR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZUFzVGV4dHVyZSgpXHJcbiAgICBwdWJsaWMgZ2V0IGJhc2VUZXh0dXJlKCk6IFRleHR1cmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iYXNlVGV4dHVyZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGJhc2VUZXh0dXJlKHRleHR1cmU6IFRleHR1cmUpIHtcclxuICAgICAgICB0aGlzLl9iYXNlVGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VyaWFsaXplcyB0aGlzIG5vcm1hbCBtYXAgcHJvY2VkdXJhbCB0ZXh0dXJlXHJcbiAgICAgKiBAcmV0dXJucyBhIHNlcmlhbGl6ZWQgbm9ybWFsIG1hcCBwcm9jZWR1cmFsIHRleHR1cmUgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvdmVycmlkZSBzZXJpYWxpemUoKTogYW55IHtcclxuICAgICAgICBjb25zdCBzZXJpYWxpemF0aW9uT2JqZWN0ID0gU2VyaWFsaXphdGlvbkhlbHBlci5TZXJpYWxpemUodGhpcywgc3VwZXIuc2VyaWFsaXplKCkpO1xyXG4gICAgICAgIHNlcmlhbGl6YXRpb25PYmplY3QuY3VzdG9tVHlwZSA9IFwiQkFCWUxPTi5Ob3JtYWxNYXBQcm9jZWR1cmFsVGV4dHVyZVwiO1xyXG5cclxuICAgICAgICByZXR1cm4gc2VyaWFsaXphdGlvbk9iamVjdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBOb3JtYWwgTWFwIFByb2NlZHVyYWwgVGV4dHVyZSBmcm9tIHBhcnNlZCBub3JtYWwgbWFwIHByb2NlZHVyYWwgdGV4dHVyZSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gcGFyc2VkVGV4dHVyZSBkZWZpbmVzIHBhcnNlZCB0ZXh0dXJlIGRhdGFcclxuICAgICAqIEBwYXJhbSBzY2VuZSBkZWZpbmVzIHRoZSBjdXJyZW50IHNjZW5lXHJcbiAgICAgKiBAcGFyYW0gcm9vdFVybCBkZWZpbmVzIHRoZSByb290IFVSTCBjb250YWluaW5nIG5vcm1hbCBtYXAgcHJvY2VkdXJhbCB0ZXh0dXJlIGluZm9ybWF0aW9uXHJcbiAgICAgKiBAcmV0dXJucyBhIHBhcnNlZCBOb3JtYWwgTWFwIFByb2NlZHVyYWwgVGV4dHVyZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG92ZXJyaWRlIFBhcnNlKHBhcnNlZFRleHR1cmU6IGFueSwgc2NlbmU6IFNjZW5lLCByb290VXJsOiBzdHJpbmcpOiBOb3JtYWxNYXBQcm9jZWR1cmFsVGV4dHVyZSB7XHJcbiAgICAgICAgY29uc3QgdGV4dHVyZSA9IFNlcmlhbGl6YXRpb25IZWxwZXIuUGFyc2UoXHJcbiAgICAgICAgICAgICgpID0+IG5ldyBOb3JtYWxNYXBQcm9jZWR1cmFsVGV4dHVyZShwYXJzZWRUZXh0dXJlLm5hbWUsIHBhcnNlZFRleHR1cmUuX3NpemUsIHNjZW5lLCB1bmRlZmluZWQsIHBhcnNlZFRleHR1cmUuX2dlbmVyYXRlTWlwTWFwcyksXHJcbiAgICAgICAgICAgIHBhcnNlZFRleHR1cmUsXHJcbiAgICAgICAgICAgIHNjZW5lLFxyXG4gICAgICAgICAgICByb290VXJsXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRleHR1cmU7XHJcbiAgICB9XHJcbn1cclxuXHJcblJlZ2lzdGVyQ2xhc3MoXCJCQUJZTE9OLk5vcm1hbE1hcFByb2NlZHVyYWxUZXh0dXJlXCIsIE5vcm1hbE1hcFByb2NlZHVyYWxUZXh0dXJlKTtcclxuIiwiZXhwb3J0ICogZnJvbSBcIi4vcGVybGluTm9pc2VQcm9jZWR1cmFsVGV4dHVyZVwiO1xyXG4iLCIvLyBEbyBub3QgZWRpdC5cbmltcG9ydCB7IFNoYWRlclN0b3JlIH0gZnJvbSBcImNvcmUvRW5naW5lcy9zaGFkZXJTdG9yZVwiO1xuXG5jb25zdCBuYW1lID0gXCJwZXJsaW5Ob2lzZVByb2NlZHVyYWxUZXh0dXJlUGl4ZWxTaGFkZXJcIjtcbmNvbnN0IHNoYWRlciA9IGBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7dW5pZm9ybSBmbG9hdCBzaXplO3VuaWZvcm0gZmxvYXQgdGltZTt1bmlmb3JtIGZsb2F0IHRyYW5zbGF0aW9uU3BlZWQ7dmFyeWluZyB2ZWMyIHZVVjtmbG9hdCByKGZsb2F0IG4pXG57cmV0dXJuIGZyYWN0KGNvcyhuKjg5LjQyKSozNDMuNDIpO31cbnZlYzIgcih2ZWMyIG4pXG57cmV0dXJuIHZlYzIocihuLngqMjMuNjItMzAwLjArbi55KjM0LjM1KSxyKG4ueCo0NS4xMysyNTYuMCtuLnkqMzguODkpKTsgfVxuZmxvYXQgd29ybGV5KHZlYzIgbixmbG9hdCBzKVxue2Zsb2F0IGRpcz0xLjA7Zm9yKGludCB4PS0xOyB4PD0xOyB4KyspXG57Zm9yKGludCB5PS0xOyB5PD0xOyB5KyspXG57dmVjMiBwPWZsb29yKG4vcykrdmVjMih4LHkpO2Zsb2F0IGQ9bGVuZ3RoKHIocCkrdmVjMih4LHkpLWZyYWN0KG4vcykpO2lmIChkaXM+ZClcbmRpcz1kO319XG5yZXR1cm4gMS4wLWRpczt9XG52ZWMzIGhhc2gzMyh2ZWMzIHAzKVxue3AzPWZyYWN0KHAzKnZlYzMoMC4xMDMxLDAuMTEzNjksMC4xMzc4NykpO3AzKz1kb3QocDMscDMueXh6KzE5LjE5KTtyZXR1cm4gLTEuMCsyLjAqZnJhY3QodmVjMygocDMueCtwMy55KSpwMy56LChwMy54K3AzLnopKnAzLnksKHAzLnkrcDMueikqcDMueCkpO31cbmZsb2F0IHBlcmxpbk5vaXNlKHZlYzMgcClcbnt2ZWMzIHBpPWZsb29yKHApO3ZlYzMgcGY9cC1waTt2ZWMzIHc9cGYqcGYqKDMuMC0yLjAqcGYpO3JldHVybiBtaXgoXG5taXgoXG5taXgoXG5kb3QocGYtdmVjMygwLDAsMCksaGFzaDMzKHBpK3ZlYzMoMCwwLDApKSksXG5kb3QocGYtdmVjMygxLDAsMCksaGFzaDMzKHBpK3ZlYzMoMSwwLDApKSksXG53LnhcbiksXG5taXgoXG5kb3QocGYtdmVjMygwLDAsMSksaGFzaDMzKHBpK3ZlYzMoMCwwLDEpKSksXG5kb3QocGYtdmVjMygxLDAsMSksaGFzaDMzKHBpK3ZlYzMoMSwwLDEpKSksXG53LnhcbiksXG53LnpcbiksXG5taXgoXG5taXgoXG5kb3QocGYtdmVjMygwLDEsMCksaGFzaDMzKHBpK3ZlYzMoMCwxLDApKSksXG5kb3QocGYtdmVjMygxLDEsMCksaGFzaDMzKHBpK3ZlYzMoMSwxLDApKSksXG53LnhcbiksXG5taXgoXG5kb3QocGYtdmVjMygwLDEsMSksaGFzaDMzKHBpK3ZlYzMoMCwxLDEpKSksXG5kb3QocGYtdmVjMygxLDEsMSksaGFzaDMzKHBpK3ZlYzMoMSwxLDEpKSksXG53LnhcbiksXG53LnpcbiksXG53Lnlcbik7fVxuI2RlZmluZSBDVVNUT01fRlJBR01FTlRfREVGSU5JVElPTlNcbnZvaWQgbWFpbih2b2lkKVxue3ZlYzIgdXY9Z2xfRnJhZ0Nvb3JkLnh5K3RyYW5zbGF0aW9uU3BlZWQ7ZmxvYXQgZGlzPShcbjEuMCtwZXJsaW5Ob2lzZSh2ZWMzKHV2L3ZlYzIoc2l6ZSxzaXplKSx0aW1lKjAuMDUpKjguMCkpXG4qICgxLjArKHdvcmxleSh1diwzMi4wKSsgMC41KndvcmxleSgyLjAqdXYsMzIuMCkrMC4yNSp3b3JsZXkoNC4wKnV2LDMyLjApKVxuKTtnbF9GcmFnQ29sb3I9dmVjNCh2ZWMzKGRpcy80LjApLDEuMCk7fVxuYDtcbi8vIFNpZGVlZmZlY3RcblNoYWRlclN0b3JlLlNoYWRlcnNTdG9yZVtuYW1lXSA9IHNoYWRlcjtcbi8qKiBAaW50ZXJuYWwgKi9cbmV4cG9ydCBjb25zdCBwZXJsaW5Ob2lzZVByb2NlZHVyYWxUZXh0dXJlUGl4ZWxTaGFkZXIgPSB7IG5hbWUsIHNoYWRlciB9O1xuIiwiaW1wb3J0IHsgc2VyaWFsaXplIH0gZnJvbSBcImNvcmUvTWlzYy9kZWNvcmF0b3JzXCI7XHJcbmltcG9ydCB7IFNlcmlhbGl6YXRpb25IZWxwZXIgfSBmcm9tIFwiY29yZS9NaXNjL2RlY29yYXRvcnMuc2VyaWFsaXphdGlvblwiO1xyXG5pbXBvcnQgdHlwZSB7IFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvdGV4dHVyZVwiO1xyXG5pbXBvcnQgeyBQcm9jZWR1cmFsVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9Qcm9jZWR1cmFscy9wcm9jZWR1cmFsVGV4dHVyZVwiO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuaW1wb3J0IHsgUmVnaXN0ZXJDbGFzcyB9IGZyb20gXCJjb3JlL01pc2MvdHlwZVN0b3JlXCI7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgXCIuL3Blcmxpbk5vaXNlUHJvY2VkdXJhbFRleHR1cmUuZnJhZ21lbnRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQZXJsaW5Ob2lzZVByb2NlZHVyYWxUZXh0dXJlIGV4dGVuZHMgUHJvY2VkdXJhbFRleHR1cmUge1xyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgdGltZTogbnVtYmVyID0gMC4wO1xyXG5cclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIHRpbWVTY2FsZTogbnVtYmVyID0gMS4wO1xyXG5cclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIHRyYW5zbGF0aW9uU3BlZWQ6IG51bWJlciA9IDEuMDtcclxuXHJcbiAgICBwcml2YXRlIF9jdXJyZW50VHJhbnNsYXRpb246IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBzaXplOiBudW1iZXIsIHNjZW5lOiBOdWxsYWJsZTxTY2VuZT4gPSBudWxsLCBmYWxsYmFja1RleHR1cmU/OiBUZXh0dXJlLCBnZW5lcmF0ZU1pcE1hcHM/OiBib29sZWFuKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgc2l6ZSwgXCJwZXJsaW5Ob2lzZVByb2NlZHVyYWxUZXh0dXJlXCIsIHNjZW5lLCBmYWxsYmFja1RleHR1cmUsIGdlbmVyYXRlTWlwTWFwcyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVTaGFkZXJVbmlmb3JtcygpIHtcclxuICAgICAgICB0aGlzLnNldEZsb2F0KFwic2l6ZVwiLCB0aGlzLmdldFJlbmRlclNpemUoKSBhcyBudW1iZXIpO1xyXG5cclxuICAgICAgICBjb25zdCBzY2VuZSA9IHRoaXMuZ2V0U2NlbmUoKTtcclxuXHJcbiAgICAgICAgaWYgKCFzY2VuZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRlbHRhVGltZSA9IHNjZW5lLmdldEVuZ2luZSgpLmdldERlbHRhVGltZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnRpbWUgKz0gZGVsdGFUaW1lO1xyXG4gICAgICAgIHRoaXMuc2V0RmxvYXQoXCJ0aW1lXCIsICh0aGlzLnRpbWUgKiB0aGlzLnRpbWVTY2FsZSkgLyAxMDAwKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3VycmVudFRyYW5zbGF0aW9uICs9IChkZWx0YVRpbWUgKiB0aGlzLnRyYW5zbGF0aW9uU3BlZWQpIC8gMTAwMC4wO1xyXG4gICAgICAgIHRoaXMuc2V0RmxvYXQoXCJ0cmFuc2xhdGlvblNwZWVkXCIsIHRoaXMuX2N1cnJlbnRUcmFuc2xhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG92ZXJyaWRlIHJlbmRlcih1c2VDYW1lcmFQb3N0UHJvY2Vzcz86IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICAgICAgc3VwZXIucmVuZGVyKHVzZUNhbWVyYVBvc3RQcm9jZXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgcmVzaXplKHNpemU6IGFueSwgZ2VuZXJhdGVNaXBNYXBzOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5yZXNpemUoc2l6ZSwgZ2VuZXJhdGVNaXBNYXBzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlcmlhbGl6ZXMgdGhpcyBwZXJsaW4gbm9pc2UgcHJvY2VkdXJhbCB0ZXh0dXJlXHJcbiAgICAgKiBAcmV0dXJucyBhIHNlcmlhbGl6ZWQgcGVybGluIG5vaXNlIHByb2NlZHVyYWwgdGV4dHVyZSBvYmplY3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIG92ZXJyaWRlIHNlcmlhbGl6ZSgpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6YXRpb25PYmplY3QgPSBTZXJpYWxpemF0aW9uSGVscGVyLlNlcmlhbGl6ZSh0aGlzLCBzdXBlci5zZXJpYWxpemUoKSk7XHJcbiAgICAgICAgc2VyaWFsaXphdGlvbk9iamVjdC5jdXN0b21UeXBlID0gXCJCQUJZTE9OLlBlcmxpbk5vaXNlUHJvY2VkdXJhbFRleHR1cmVcIjtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcmlhbGl6YXRpb25PYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgUGVybGluIE5vaXNlIFByb2NlZHVyYWwgVGV4dHVyZSBmcm9tIHBhcnNlZCBwZXJsaW4gbm9pc2UgcHJvY2VkdXJhbCB0ZXh0dXJlIGRhdGFcclxuICAgICAqIEBwYXJhbSBwYXJzZWRUZXh0dXJlIGRlZmluZXMgcGFyc2VkIHRleHR1cmUgZGF0YVxyXG4gICAgICogQHBhcmFtIHNjZW5lIGRlZmluZXMgdGhlIGN1cnJlbnQgc2NlbmVcclxuICAgICAqIEBwYXJhbSByb290VXJsIGRlZmluZXMgdGhlIHJvb3QgVVJMIGNvbnRhaW5pbmcgcGVybGluIG5vaXNlIHByb2NlZHVyYWwgdGV4dHVyZSBpbmZvcm1hdGlvblxyXG4gICAgICogQHJldHVybnMgYSBwYXJzZWQgUGVybGluIE5vaXNlIFByb2NlZHVyYWwgVGV4dHVyZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG92ZXJyaWRlIFBhcnNlKHBhcnNlZFRleHR1cmU6IGFueSwgc2NlbmU6IFNjZW5lLCByb290VXJsOiBzdHJpbmcpOiBQZXJsaW5Ob2lzZVByb2NlZHVyYWxUZXh0dXJlIHtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gU2VyaWFsaXphdGlvbkhlbHBlci5QYXJzZShcclxuICAgICAgICAgICAgKCkgPT4gbmV3IFBlcmxpbk5vaXNlUHJvY2VkdXJhbFRleHR1cmUocGFyc2VkVGV4dHVyZS5uYW1lLCBwYXJzZWRUZXh0dXJlLl9zaXplLCBzY2VuZSwgdW5kZWZpbmVkLCBwYXJzZWRUZXh0dXJlLl9nZW5lcmF0ZU1pcE1hcHMpLFxyXG4gICAgICAgICAgICBwYXJzZWRUZXh0dXJlLFxyXG4gICAgICAgICAgICBzY2VuZSxcclxuICAgICAgICAgICAgcm9vdFVybFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiB0ZXh0dXJlO1xyXG4gICAgfVxyXG59XHJcblxyXG5SZWdpc3RlckNsYXNzKFwiQkFCWUxPTi5QZXJsaW5Ob2lzZVByb2NlZHVyYWxUZXh0dXJlXCIsIFBlcmxpbk5vaXNlUHJvY2VkdXJhbFRleHR1cmUpO1xyXG4iLCJleHBvcnQgKiBmcm9tIFwiLi9yb2FkUHJvY2VkdXJhbFRleHR1cmVcIjtcclxuIiwiLy8gRG8gbm90IGVkaXQuXG5pbXBvcnQgeyBTaGFkZXJTdG9yZSB9IGZyb20gXCJjb3JlL0VuZ2luZXMvc2hhZGVyU3RvcmVcIjtcblxuY29uc3QgbmFtZSA9IFwicm9hZFByb2NlZHVyYWxUZXh0dXJlUGl4ZWxTaGFkZXJcIjtcbmNvbnN0IHNoYWRlciA9IGBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7dmFyeWluZyB2ZWMyIHZVVjsgXG51bmlmb3JtIHZlYzMgcm9hZENvbG9yO2Zsb2F0IHJhbmQodmVjMiBuKSB7cmV0dXJuIGZyYWN0KGNvcyhkb3Qobix2ZWMyKDEyLjk4OTgsNC4xNDE0KSkpKjQzNzU4LjU0NTMpO31cbmZsb2F0IG5vaXNlKHZlYzIgbikge2NvbnN0IHZlYzIgZD12ZWMyKDAuMCwxLjApO3ZlYzIgYj1mbG9vcihuKSxmPXNtb290aHN0ZXAodmVjMigwLjApLHZlYzIoMS4wKSxmcmFjdChuKSk7cmV0dXJuIG1peChtaXgocmFuZChiKSxyYW5kKGIrZC55eCksZi54KSxtaXgocmFuZChiK2QueHkpLHJhbmQoYitkLnl5KSxmLngpLGYueSk7fVxuZmxvYXQgZmJtKHZlYzIgbikge2Zsb2F0IHRvdGFsPTAuMCxhbXBsaXR1ZGU9MS4wO2ZvciAoaW50IGk9MDsgaTw0OyBpKyspIHt0b3RhbCs9bm9pc2UobikqYW1wbGl0dWRlO24rPW47YW1wbGl0dWRlKj0wLjU7fVxucmV0dXJuIHRvdGFsO31cbiNkZWZpbmUgQ1VTVE9NX0ZSQUdNRU5UX0RFRklOSVRJT05TXG52b2lkIG1haW4odm9pZCkge1xuI2RlZmluZSBDVVNUT01fRlJBR01FTlRfTUFJTl9CRUdJTlxuZmxvYXQgcmF0aW95PW1vZChnbF9GcmFnQ29vcmQueSoxMDAuMCAsZmJtKHZVVioyLjApKTt2ZWMzIGNvbG9yPXJvYWRDb2xvcipyYXRpb3k7Z2xfRnJhZ0NvbG9yPXZlYzQoY29sb3IsMS4wKTtcbiNkZWZpbmUgQ1VTVE9NX0ZSQUdNRU5UX01BSU5fRU5EXG59YDtcbi8vIFNpZGVlZmZlY3RcblNoYWRlclN0b3JlLlNoYWRlcnNTdG9yZVtuYW1lXSA9IHNoYWRlcjtcbi8qKiBAaW50ZXJuYWwgKi9cbmV4cG9ydCBjb25zdCByb2FkUHJvY2VkdXJhbFRleHR1cmVQaXhlbFNoYWRlciA9IHsgbmFtZSwgc2hhZGVyIH07XG4iLCJpbXBvcnQgeyBzZXJpYWxpemVBc0NvbG9yMyB9IGZyb20gXCJjb3JlL01pc2MvZGVjb3JhdG9yc1wiO1xyXG5pbXBvcnQgeyBTZXJpYWxpemF0aW9uSGVscGVyIH0gZnJvbSBcImNvcmUvTWlzYy9kZWNvcmF0b3JzLnNlcmlhbGl6YXRpb25cIjtcclxuaW1wb3J0IHsgQ29sb3IzIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC5jb2xvclwiO1xyXG5pbXBvcnQgdHlwZSB7IFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvdGV4dHVyZVwiO1xyXG5pbXBvcnQgeyBQcm9jZWR1cmFsVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9Qcm9jZWR1cmFscy9wcm9jZWR1cmFsVGV4dHVyZVwiO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuaW1wb3J0IHsgUmVnaXN0ZXJDbGFzcyB9IGZyb20gXCJjb3JlL01pc2MvdHlwZVN0b3JlXCI7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgXCIuL3JvYWRQcm9jZWR1cmFsVGV4dHVyZS5mcmFnbWVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJvYWRQcm9jZWR1cmFsVGV4dHVyZSBleHRlbmRzIFByb2NlZHVyYWxUZXh0dXJlIHtcclxuICAgIHByaXZhdGUgX3JvYWRDb2xvciA9IG5ldyBDb2xvcjMoMC41MywgMC41MywgMC41Myk7XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBzaXplOiBudW1iZXIsIHNjZW5lOiBOdWxsYWJsZTxTY2VuZT4gPSBudWxsLCBmYWxsYmFja1RleHR1cmU/OiBUZXh0dXJlLCBnZW5lcmF0ZU1pcE1hcHM/OiBib29sZWFuKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgc2l6ZSwgXCJyb2FkUHJvY2VkdXJhbFRleHR1cmVcIiwgc2NlbmUsIGZhbGxiYWNrVGV4dHVyZSwgZ2VuZXJhdGVNaXBNYXBzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNoYWRlclVuaWZvcm1zKCkge1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IzKFwicm9hZENvbG9yXCIsIHRoaXMuX3JvYWRDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZUFzQ29sb3IzKClcclxuICAgIHB1YmxpYyBnZXQgcm9hZENvbG9yKCk6IENvbG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvYWRDb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHJvYWRDb2xvcih2YWx1ZTogQ29sb3IzKSB7XHJcbiAgICAgICAgdGhpcy5fcm9hZENvbG9yID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VyaWFsaXplcyB0aGlzIHJvYWQgcHJvY2VkdXJhbCB0ZXh0dXJlXHJcbiAgICAgKiBAcmV0dXJucyBhIHNlcmlhbGl6ZWQgcm9hZCBwcm9jZWR1cmFsIHRleHR1cmUgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvdmVycmlkZSBzZXJpYWxpemUoKTogYW55IHtcclxuICAgICAgICBjb25zdCBzZXJpYWxpemF0aW9uT2JqZWN0ID0gU2VyaWFsaXphdGlvbkhlbHBlci5TZXJpYWxpemUodGhpcywgc3VwZXIuc2VyaWFsaXplKCkpO1xyXG4gICAgICAgIHNlcmlhbGl6YXRpb25PYmplY3QuY3VzdG9tVHlwZSA9IFwiQkFCWUxPTi5Sb2FkUHJvY2VkdXJhbFRleHR1cmVcIjtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcmlhbGl6YXRpb25PYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgUm9hZCBQcm9jZWR1cmFsIFRleHR1cmUgZnJvbSBwYXJzZWQgcm9hZCBwcm9jZWR1cmFsIHRleHR1cmUgZGF0YVxyXG4gICAgICogQHBhcmFtIHBhcnNlZFRleHR1cmUgZGVmaW5lcyBwYXJzZWQgdGV4dHVyZSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgZGVmaW5lcyB0aGUgY3VycmVudCBzY2VuZVxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgZGVmaW5lcyB0aGUgcm9vdCBVUkwgY29udGFpbmluZyByb2FkIHByb2NlZHVyYWwgdGV4dHVyZSBpbmZvcm1hdGlvblxyXG4gICAgICogQHJldHVybnMgYSBwYXJzZWQgUm9hZCBQcm9jZWR1cmFsIFRleHR1cmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBvdmVycmlkZSBQYXJzZShwYXJzZWRUZXh0dXJlOiBhbnksIHNjZW5lOiBTY2VuZSwgcm9vdFVybDogc3RyaW5nKTogUm9hZFByb2NlZHVyYWxUZXh0dXJlIHtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gU2VyaWFsaXphdGlvbkhlbHBlci5QYXJzZShcclxuICAgICAgICAgICAgKCkgPT4gbmV3IFJvYWRQcm9jZWR1cmFsVGV4dHVyZShwYXJzZWRUZXh0dXJlLm5hbWUsIHBhcnNlZFRleHR1cmUuX3NpemUsIHNjZW5lLCB1bmRlZmluZWQsIHBhcnNlZFRleHR1cmUuX2dlbmVyYXRlTWlwTWFwcyksXHJcbiAgICAgICAgICAgIHBhcnNlZFRleHR1cmUsXHJcbiAgICAgICAgICAgIHNjZW5lLFxyXG4gICAgICAgICAgICByb290VXJsXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRleHR1cmU7XHJcbiAgICB9XHJcbn1cclxuXHJcblJlZ2lzdGVyQ2xhc3MoXCJCQUJZTE9OLlJvYWRQcm9jZWR1cmFsVGV4dHVyZVwiLCBSb2FkUHJvY2VkdXJhbFRleHR1cmUpO1xyXG4iLCJleHBvcnQgKiBmcm9tIFwiLi9zdGFyZmllbGRQcm9jZWR1cmFsVGV4dHVyZVwiO1xyXG4iLCIvLyBEbyBub3QgZWRpdC5cbmltcG9ydCB7IFNoYWRlclN0b3JlIH0gZnJvbSBcImNvcmUvRW5naW5lcy9zaGFkZXJTdG9yZVwiO1xuXG5jb25zdCBuYW1lID0gXCJzdGFyZmllbGRQcm9jZWR1cmFsVGV4dHVyZVBpeGVsU2hhZGVyXCI7XG5jb25zdCBzaGFkZXIgPSBgcHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xuI2RlZmluZSB2b2xzdGVwcyAyMFxuI2RlZmluZSBpdGVyYXRpb25zIDE1XG52YXJ5aW5nIHZlYzIgdlBvc2l0aW9uO3ZhcnlpbmcgdmVjMiB2VVY7dW5pZm9ybSBmbG9hdCB0aW1lO3VuaWZvcm0gZmxvYXQgYWxwaGE7dW5pZm9ybSBmbG9hdCBiZXRhO3VuaWZvcm0gZmxvYXQgem9vbTt1bmlmb3JtIGZsb2F0IGZvcm11cGFyYW07dW5pZm9ybSBmbG9hdCBzdGVwc2l6ZTt1bmlmb3JtIGZsb2F0IHRpbGU7dW5pZm9ybSBmbG9hdCBicmlnaHRuZXNzO3VuaWZvcm0gZmxvYXQgZGFya21hdHRlcjt1bmlmb3JtIGZsb2F0IGRpc3RmYWRpbmc7dW5pZm9ybSBmbG9hdCBzYXR1cmF0aW9uO3ZvaWQgbWFpbigpXG57dmVjMyBkaXI9dmVjMyh2VVYqem9vbSwxLik7ZmxvYXQgbG9jYWxUaW1lPXRpbWUqMC4wMDAxO21hdDIgcm90MT1tYXQyKGNvcyhhbHBoYSksc2luKGFscGhhKSwtc2luKGFscGhhKSxjb3MoYWxwaGEpKTttYXQyIHJvdDI9bWF0Mihjb3MoYmV0YSksc2luKGJldGEpLC1zaW4oYmV0YSksY29zKGJldGEpKTtkaXIueHoqPXJvdDE7ZGlyLnh5Kj1yb3QyO3ZlYzMgZnJvbV89dmVjMygxLiwuNSwwLjUpO2Zyb21fKz12ZWMzKC0yLixsb2NhbFRpbWUqMi4sbG9jYWxUaW1lKTtmcm9tXy54eio9cm90MTtmcm9tXy54eSo9cm90MjtmbG9hdCBzPTAuMSxmYWRlPTEuO3ZlYzMgdj12ZWMzKDAuKTtmb3IgKGludCByPTA7IHI8dm9sc3RlcHM7IHIrKykge3ZlYzMgcD1mcm9tXytzKmRpciouNTtwPWFicyh2ZWMzKHRpbGUpLW1vZChwLHZlYzModGlsZSoyLikpKTsgXG5mbG9hdCBwYSxhPXBhPTAuO2ZvciAoaW50IGk9MDsgaTxpdGVyYXRpb25zOyBpKyspIHtwPWFicyhwKS9kb3QocCxwKS1mb3JtdXBhcmFtOyBcbmErPWFicyhsZW5ndGgocCktcGEpOyBcbnBhPWxlbmd0aChwKTt9XG5mbG9hdCBkbT1tYXgoMC4sZGFya21hdHRlci1hKmEqLjAwMSk7IFxuYSo9YSphOyBcbmlmIChyPjYpIGZhZGUqPTEuLWRtOyBcbnYrPWZhZGU7dis9dmVjMyhzLHMqcyxzKnMqcypzKSphKmJyaWdodG5lc3MqZmFkZTsgXG5mYWRlKj1kaXN0ZmFkaW5nOyBcbnMrPXN0ZXBzaXplO31cbnY9bWl4KHZlYzMobGVuZ3RoKHYpKSx2LHNhdHVyYXRpb24pOyBcbmdsX0ZyYWdDb2xvcj12ZWM0KHYqLjAxLDEuKTt9YDtcbi8vIFNpZGVlZmZlY3RcblNoYWRlclN0b3JlLlNoYWRlcnNTdG9yZVtuYW1lXSA9IHNoYWRlcjtcbi8qKiBAaW50ZXJuYWwgKi9cbmV4cG9ydCBjb25zdCBzdGFyZmllbGRQcm9jZWR1cmFsVGV4dHVyZVBpeGVsU2hhZGVyID0geyBuYW1lLCBzaGFkZXIgfTtcbiIsImltcG9ydCB7IHNlcmlhbGl6ZSB9IGZyb20gXCJjb3JlL01pc2MvZGVjb3JhdG9yc1wiO1xyXG5pbXBvcnQgeyBTZXJpYWxpemF0aW9uSGVscGVyIH0gZnJvbSBcImNvcmUvTWlzYy9kZWNvcmF0b3JzLnNlcmlhbGl6YXRpb25cIjtcclxuaW1wb3J0IHR5cGUgeyBUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL3RleHR1cmVcIjtcclxuaW1wb3J0IHsgUHJvY2VkdXJhbFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvUHJvY2VkdXJhbHMvcHJvY2VkdXJhbFRleHR1cmVcIjtcclxuaW1wb3J0IHR5cGUgeyBTY2VuZSB9IGZyb20gXCJjb3JlL3NjZW5lXCI7XHJcbmltcG9ydCB7IFJlZ2lzdGVyQ2xhc3MgfSBmcm9tIFwiY29yZS9NaXNjL3R5cGVTdG9yZVwiO1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IFwiLi9zdGFyZmllbGRQcm9jZWR1cmFsVGV4dHVyZS5mcmFnbWVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0YXJmaWVsZFByb2NlZHVyYWxUZXh0dXJlIGV4dGVuZHMgUHJvY2VkdXJhbFRleHR1cmUge1xyXG4gICAgcHJpdmF0ZSBfdGltZSA9IDE7XHJcbiAgICBwcml2YXRlIF9hbHBoYSA9IDAuNTtcclxuICAgIHByaXZhdGUgX2JldGEgPSAwLjg7XHJcbiAgICBwcml2YXRlIF96b29tID0gMC44O1xyXG4gICAgcHJpdmF0ZSBfZm9ybXVwYXJhbSA9IDAuNTM7XHJcbiAgICBwcml2YXRlIF9zdGVwc2l6ZSA9IDAuMTtcclxuICAgIHByaXZhdGUgX3RpbGUgPSAwLjg1O1xyXG4gICAgcHJpdmF0ZSBfYnJpZ2h0bmVzcyA9IDAuMDAxNTtcclxuICAgIHByaXZhdGUgX2RhcmttYXR0ZXIgPSAwLjQ7XHJcbiAgICBwcml2YXRlIF9kaXN0ZmFkaW5nID0gMC43MztcclxuICAgIHByaXZhdGUgX3NhdHVyYXRpb24gPSAwLjg1O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgc2l6ZTogbnVtYmVyLCBzY2VuZTogTnVsbGFibGU8U2NlbmU+ID0gbnVsbCwgZmFsbGJhY2tUZXh0dXJlPzogVGV4dHVyZSwgZ2VuZXJhdGVNaXBNYXBzPzogYm9vbGVhbikge1xyXG4gICAgICAgIHN1cGVyKG5hbWUsIHNpemUsIFwic3RhcmZpZWxkUHJvY2VkdXJhbFRleHR1cmVcIiwgc2NlbmUsIGZhbGxiYWNrVGV4dHVyZSwgZ2VuZXJhdGVNaXBNYXBzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNoYWRlclVuaWZvcm1zKCkge1xyXG4gICAgICAgIHRoaXMuc2V0RmxvYXQoXCJ0aW1lXCIsIHRoaXMuX3RpbWUpO1xyXG4gICAgICAgIHRoaXMuc2V0RmxvYXQoXCJhbHBoYVwiLCB0aGlzLl9hbHBoYSk7XHJcbiAgICAgICAgdGhpcy5zZXRGbG9hdChcImJldGFcIiwgdGhpcy5fYmV0YSk7XHJcbiAgICAgICAgdGhpcy5zZXRGbG9hdChcInpvb21cIiwgdGhpcy5fem9vbSk7XHJcbiAgICAgICAgdGhpcy5zZXRGbG9hdChcImZvcm11cGFyYW1cIiwgdGhpcy5fZm9ybXVwYXJhbSk7XHJcbiAgICAgICAgdGhpcy5zZXRGbG9hdChcInN0ZXBzaXplXCIsIHRoaXMuX3N0ZXBzaXplKTtcclxuICAgICAgICB0aGlzLnNldEZsb2F0KFwidGlsZVwiLCB0aGlzLl90aWxlKTtcclxuICAgICAgICB0aGlzLnNldEZsb2F0KFwiYnJpZ2h0bmVzc1wiLCB0aGlzLl9icmlnaHRuZXNzKTtcclxuICAgICAgICB0aGlzLnNldEZsb2F0KFwiZGFya21hdHRlclwiLCB0aGlzLl9kYXJrbWF0dGVyKTtcclxuICAgICAgICB0aGlzLnNldEZsb2F0KFwiZGlzdGZhZGluZ1wiLCB0aGlzLl9kaXN0ZmFkaW5nKTtcclxuICAgICAgICB0aGlzLnNldEZsb2F0KFwic2F0dXJhdGlvblwiLCB0aGlzLl9zYXR1cmF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBnZXQgdGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdGltZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fdGltZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBnZXQgYWxwaGEoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWxwaGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBhbHBoYSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYWxwaGEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IGJldGEoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYmV0YTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGJldGEodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2JldGEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IGZvcm11cGFyYW0oKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZm9ybXVwYXJhbTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGZvcm11cGFyYW0odmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2Zvcm11cGFyYW0gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IHN0ZXBzaXplKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0ZXBzaXplO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc3RlcHNpemUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3N0ZXBzaXplID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGdldCB6b29tKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3pvb207XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB6b29tKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl96b29tID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGdldCB0aWxlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB0aWxlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl90aWxlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGdldCBicmlnaHRuZXNzKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JyaWdodG5lc3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBicmlnaHRuZXNzKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9icmlnaHRuZXNzID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGdldCBkYXJrbWF0dGVyKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhcmttYXR0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkYXJrbWF0dGVyKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9kYXJrbWF0dGVyID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGdldCBkaXN0ZmFkaW5nKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3RmYWRpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkaXN0ZmFkaW5nKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9kaXN0ZmFkaW5nID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGdldCBzYXR1cmF0aW9uKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NhdHVyYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzYXR1cmF0aW9uKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9zYXR1cmF0aW9uID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VyaWFsaXplcyB0aGlzIHN0YXJmaWVsZCBwcm9jZWR1cmFsIHRleHR1cmVcclxuICAgICAqIEByZXR1cm5zIGEgc2VyaWFsaXplZCBzdGFyZmllbGQgcHJvY2VkdXJhbCB0ZXh0dXJlIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgc2VyaWFsaXplKCk6IGFueSB7XHJcbiAgICAgICAgY29uc3Qgc2VyaWFsaXphdGlvbk9iamVjdCA9IFNlcmlhbGl6YXRpb25IZWxwZXIuU2VyaWFsaXplKHRoaXMsIHN1cGVyLnNlcmlhbGl6ZSgpKTtcclxuICAgICAgICBzZXJpYWxpemF0aW9uT2JqZWN0LmN1c3RvbVR5cGUgPSBcIkJBQllMT04uU3RhcmZpZWxkUHJvY2VkdXJhbFRleHR1cmVcIjtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcmlhbGl6YXRpb25PYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgU3RhcmZpZWxkIFByb2NlZHVyYWwgVGV4dHVyZSBmcm9tIHBhcnNlZCBzdGFydGZpZWxkIHByb2NlZHVyYWwgdGV4dHVyZSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gcGFyc2VkVGV4dHVyZSBkZWZpbmVzIHBhcnNlZCB0ZXh0dXJlIGRhdGFcclxuICAgICAqIEBwYXJhbSBzY2VuZSBkZWZpbmVzIHRoZSBjdXJyZW50IHNjZW5lXHJcbiAgICAgKiBAcGFyYW0gcm9vdFVybCBkZWZpbmVzIHRoZSByb290IFVSTCBjb250YWluaW5nIHN0YXJ0ZmllbGQgcHJvY2VkdXJhbCB0ZXh0dXJlIGluZm9ybWF0aW9uXHJcbiAgICAgKiBAcmV0dXJucyBhIHBhcnNlZCBTdGFyZmllbGQgUHJvY2VkdXJhbCBUZXh0dXJlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgb3ZlcnJpZGUgUGFyc2UocGFyc2VkVGV4dHVyZTogYW55LCBzY2VuZTogU2NlbmUsIHJvb3RVcmw6IHN0cmluZyk6IFN0YXJmaWVsZFByb2NlZHVyYWxUZXh0dXJlIHtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gU2VyaWFsaXphdGlvbkhlbHBlci5QYXJzZShcclxuICAgICAgICAgICAgKCkgPT4gbmV3IFN0YXJmaWVsZFByb2NlZHVyYWxUZXh0dXJlKHBhcnNlZFRleHR1cmUubmFtZSwgcGFyc2VkVGV4dHVyZS5fc2l6ZSwgc2NlbmUsIHVuZGVmaW5lZCwgcGFyc2VkVGV4dHVyZS5fZ2VuZXJhdGVNaXBNYXBzKSxcclxuICAgICAgICAgICAgcGFyc2VkVGV4dHVyZSxcclxuICAgICAgICAgICAgc2NlbmUsXHJcbiAgICAgICAgICAgIHJvb3RVcmxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gdGV4dHVyZTtcclxuICAgIH1cclxufVxyXG5cclxuUmVnaXN0ZXJDbGFzcyhcIkJBQllMT04uU3RhcmZpZWxkUHJvY2VkdXJhbFRleHR1cmVcIiwgU3RhcmZpZWxkUHJvY2VkdXJhbFRleHR1cmUpO1xyXG4iLCJleHBvcnQgKiBmcm9tIFwiLi93b29kUHJvY2VkdXJhbFRleHR1cmVcIjtcclxuIiwiLy8gRG8gbm90IGVkaXQuXG5pbXBvcnQgeyBTaGFkZXJTdG9yZSB9IGZyb20gXCJjb3JlL0VuZ2luZXMvc2hhZGVyU3RvcmVcIjtcblxuY29uc3QgbmFtZSA9IFwid29vZFByb2NlZHVyYWxUZXh0dXJlUGl4ZWxTaGFkZXJcIjtcbmNvbnN0IHNoYWRlciA9IGBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7dmFyeWluZyB2ZWMyIHZQb3NpdGlvbjt2YXJ5aW5nIHZlYzIgdlVWO3VuaWZvcm0gZmxvYXQgYW1wU2NhbGU7dW5pZm9ybSB2ZWMzIHdvb2RDb2xvcjtmbG9hdCByYW5kKHZlYzIgbikge3JldHVybiBmcmFjdChjb3MoZG90KG4sdmVjMigxMi45ODk4LDQuMTQxNCkpKSo0Mzc1OC41NDUzKTt9XG5mbG9hdCBub2lzZSh2ZWMyIG4pIHtjb25zdCB2ZWMyIGQ9dmVjMigwLjAsMS4wKTt2ZWMyIGI9Zmxvb3IobiksZj1zbW9vdGhzdGVwKHZlYzIoMC4wKSx2ZWMyKDEuMCksZnJhY3QobikpO3JldHVybiBtaXgobWl4KHJhbmQoYikscmFuZChiK2QueXgpLGYueCksbWl4KHJhbmQoYitkLnh5KSxyYW5kKGIrZC55eSksZi54KSxmLnkpO31cbmZsb2F0IGZibSh2ZWMyIG4pIHtmbG9hdCB0b3RhbD0wLjAsYW1wbGl0dWRlPTEuMDtmb3IgKGludCBpPTA7IGk8NDsgaSsrKSB7dG90YWwrPW5vaXNlKG4pKmFtcGxpdHVkZTtuKz1uO2FtcGxpdHVkZSo9MC41O31cbnJldHVybiB0b3RhbDt9XG4jZGVmaW5lIENVU1RPTV9GUkFHTUVOVF9ERUZJTklUSU9OU1xudm9pZCBtYWluKHZvaWQpIHtcbiNkZWZpbmUgQ1VTVE9NX0ZSQUdNRU5UX01BSU5fQkVHSU5cbmZsb2F0IHJhdGlveT1tb2QodlVWLngqYW1wU2NhbGUsMi4wK2ZibSh2VVYqMC44KSk7dmVjMyB3b29kPXdvb2RDb2xvcipyYXRpb3k7Z2xfRnJhZ0NvbG9yPXZlYzQod29vZCwxLjApO1xuI2RlZmluZSBDVVNUT01fRlJBR01FTlRfTUFJTl9FTkRcbn1gO1xuLy8gU2lkZWVmZmVjdFxuU2hhZGVyU3RvcmUuU2hhZGVyc1N0b3JlW25hbWVdID0gc2hhZGVyO1xuLyoqIEBpbnRlcm5hbCAqL1xuZXhwb3J0IGNvbnN0IHdvb2RQcm9jZWR1cmFsVGV4dHVyZVBpeGVsU2hhZGVyID0geyBuYW1lLCBzaGFkZXIgfTtcbiIsImltcG9ydCB7IHNlcmlhbGl6ZSwgc2VyaWFsaXplQXNDb2xvcjMgfSBmcm9tIFwiY29yZS9NaXNjL2RlY29yYXRvcnNcIjtcclxuaW1wb3J0IHsgU2VyaWFsaXphdGlvbkhlbHBlciB9IGZyb20gXCJjb3JlL01pc2MvZGVjb3JhdG9ycy5zZXJpYWxpemF0aW9uXCI7XHJcbmltcG9ydCB7IENvbG9yMyB9IGZyb20gXCJjb3JlL01hdGhzL21hdGguY29sb3JcIjtcclxuaW1wb3J0IHR5cGUgeyBUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL3RleHR1cmVcIjtcclxuaW1wb3J0IHsgUHJvY2VkdXJhbFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvUHJvY2VkdXJhbHMvcHJvY2VkdXJhbFRleHR1cmVcIjtcclxuaW1wb3J0IHR5cGUgeyBTY2VuZSB9IGZyb20gXCJjb3JlL3NjZW5lXCI7XHJcbmltcG9ydCB7IFJlZ2lzdGVyQ2xhc3MgfSBmcm9tIFwiY29yZS9NaXNjL3R5cGVTdG9yZVwiO1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IFwiLi93b29kUHJvY2VkdXJhbFRleHR1cmUuZnJhZ21lbnRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBXb29kUHJvY2VkdXJhbFRleHR1cmUgZXh0ZW5kcyBQcm9jZWR1cmFsVGV4dHVyZSB7XHJcbiAgICBwcml2YXRlIF9hbXBTY2FsZTogbnVtYmVyID0gMTAwLjA7XHJcbiAgICBwcml2YXRlIF93b29kQ29sb3I6IENvbG9yMyA9IG5ldyBDb2xvcjMoMC4zMiwgMC4xNywgMC4wOSk7XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBzaXplOiBudW1iZXIsIHNjZW5lOiBOdWxsYWJsZTxTY2VuZT4gPSBudWxsLCBmYWxsYmFja1RleHR1cmU/OiBUZXh0dXJlLCBnZW5lcmF0ZU1pcE1hcHM/OiBib29sZWFuKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgc2l6ZSwgXCJ3b29kUHJvY2VkdXJhbFRleHR1cmVcIiwgc2NlbmUsIGZhbGxiYWNrVGV4dHVyZSwgZ2VuZXJhdGVNaXBNYXBzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNoYWRlclVuaWZvcm1zKCkge1xyXG4gICAgICAgIHRoaXMuc2V0RmxvYXQoXCJhbXBTY2FsZVwiLCB0aGlzLl9hbXBTY2FsZSk7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcjMoXCJ3b29kQ29sb3JcIiwgdGhpcy5fd29vZENvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBnZXQgYW1wU2NhbGUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYW1wU2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBhbXBTY2FsZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYW1wU2NhbGUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZUFzQ29sb3IzKClcclxuICAgIHB1YmxpYyBnZXQgd29vZENvbG9yKCk6IENvbG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dvb2RDb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHdvb2RDb2xvcih2YWx1ZTogQ29sb3IzKSB7XHJcbiAgICAgICAgdGhpcy5fd29vZENvbG9yID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VyaWFsaXplcyB0aGlzIHdvb2QgcHJvY2VkdXJhbCB0ZXh0dXJlXHJcbiAgICAgKiBAcmV0dXJucyBhIHNlcmlhbGl6ZWQgd29vZCBwcm9jZWR1cmFsIHRleHR1cmUgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvdmVycmlkZSBzZXJpYWxpemUoKTogYW55IHtcclxuICAgICAgICBjb25zdCBzZXJpYWxpemF0aW9uT2JqZWN0ID0gU2VyaWFsaXphdGlvbkhlbHBlci5TZXJpYWxpemUodGhpcywgc3VwZXIuc2VyaWFsaXplKCkpO1xyXG4gICAgICAgIHNlcmlhbGl6YXRpb25PYmplY3QuY3VzdG9tVHlwZSA9IFwiQkFCWUxPTi5Xb29kUHJvY2VkdXJhbFRleHR1cmVcIjtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcmlhbGl6YXRpb25PYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgV29vZCBQcm9jZWR1cmFsIFRleHR1cmUgZnJvbSBwYXJzZWQgd29vZCBwcm9jZWR1cmFsIHRleHR1cmUgZGF0YVxyXG4gICAgICogQHBhcmFtIHBhcnNlZFRleHR1cmUgZGVmaW5lcyBwYXJzZWQgdGV4dHVyZSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgZGVmaW5lcyB0aGUgY3VycmVudCBzY2VuZVxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgZGVmaW5lcyB0aGUgcm9vdCBVUkwgY29udGFpbmluZyB3b29kIHByb2NlZHVyYWwgdGV4dHVyZSBpbmZvcm1hdGlvblxyXG4gICAgICogQHJldHVybnMgYSBwYXJzZWQgV29vZCBQcm9jZWR1cmFsIFRleHR1cmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBvdmVycmlkZSBQYXJzZShwYXJzZWRUZXh0dXJlOiBhbnksIHNjZW5lOiBTY2VuZSwgcm9vdFVybDogc3RyaW5nKTogV29vZFByb2NlZHVyYWxUZXh0dXJlIHtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gU2VyaWFsaXphdGlvbkhlbHBlci5QYXJzZShcclxuICAgICAgICAgICAgKCkgPT4gbmV3IFdvb2RQcm9jZWR1cmFsVGV4dHVyZShwYXJzZWRUZXh0dXJlLm5hbWUsIHBhcnNlZFRleHR1cmUuX3NpemUsIHNjZW5lLCB1bmRlZmluZWQsIHBhcnNlZFRleHR1cmUuX2dlbmVyYXRlTWlwTWFwcyksXHJcbiAgICAgICAgICAgIHBhcnNlZFRleHR1cmUsXHJcbiAgICAgICAgICAgIHNjZW5lLFxyXG4gICAgICAgICAgICByb290VXJsXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRleHR1cmU7XHJcbiAgICB9XHJcbn1cclxuXHJcblJlZ2lzdGVyQ2xhc3MoXCJCQUJZTE9OLldvb2RQcm9jZWR1cmFsVGV4dHVyZVwiLCBXb29kUHJvY2VkdXJhbFRleHR1cmUpO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8taW50ZXJuYWwtbW9kdWxlcyAqL1xyXG5pbXBvcnQgKiBhcyBQcm9jZWR1cmFsVGV4dHVyZXNMaWIgZnJvbSBcInByb2NlZHVyYWwtdGV4dHVyZXMvaW5kZXhcIjtcclxuXHJcbi8qKlxyXG4gKiBMZWdhY3kgc3VwcG9ydCwgZGVmaW5pbmcgd2luZG93LkJBQllMT04uR3JpZE1hdGVyaWFsLi4uIChnbG9iYWwgdmFyaWFibGUpLlxyXG4gKlxyXG4gKiBUaGlzIGlzIHRoZSBlbnRyeSBwb2ludCBmb3IgdGhlIFVNRCBtb2R1bGUuXHJcbiAqIFRoZSBlbnRyeSBwb2ludCBmb3IgYSBmdXR1cmUgRVNNIHBhY2thZ2Ugc2hvdWxkIGJlIGluZGV4LnRzXHJcbiAqL1xyXG5jb25zdCBnbG9iYWxPYmplY3QgPSB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHVuZGVmaW5lZDtcclxuaWYgKHR5cGVvZiBnbG9iYWxPYmplY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICg8YW55Pmdsb2JhbE9iamVjdCkuQkFCWUxPTiA9ICg8YW55Pmdsb2JhbE9iamVjdCkuQkFCWUxPTiB8fCB7fTtcclxuICAgIGZvciAoY29uc3QgbWF0IGluIFByb2NlZHVyYWxUZXh0dXJlc0xpYikge1xyXG4gICAgICAgICg8YW55Pmdsb2JhbE9iamVjdCkuQkFCWUxPTlttYXRdID0gKDxhbnk+UHJvY2VkdXJhbFRleHR1cmVzTGliKVttYXRdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgKiBmcm9tIFwicHJvY2VkdXJhbC10ZXh0dXJlcy9pbmRleFwiO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmFieWxvbmpzX01pc2NfZGVjb3JhdG9yc19fOyIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCAqL1xuXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcbiAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcbiAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn1cblxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xuICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xuICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHQ7XG4gIH1cbiAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xuICB2YXIgdCA9IHt9O1xuICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgIHRbcF0gPSBzW3BdO1xuICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgIH1cbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXNEZWNvcmF0ZShjdG9yLCBkZXNjcmlwdG9ySW4sIGRlY29yYXRvcnMsIGNvbnRleHRJbiwgaW5pdGlhbGl6ZXJzLCBleHRyYUluaXRpYWxpemVycykge1xuICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cbiAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcbiAgdmFyIHRhcmdldCA9ICFkZXNjcmlwdG9ySW4gJiYgY3RvciA/IGNvbnRleHRJbltcInN0YXRpY1wiXSA/IGN0b3IgOiBjdG9yLnByb3RvdHlwZSA6IG51bGw7XG4gIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xuICB2YXIgXywgZG9uZSA9IGZhbHNlO1xuICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGNvbnRleHQgPSB7fTtcbiAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4uYWNjZXNzKSBjb250ZXh0LmFjY2Vzc1twXSA9IGNvbnRleHRJbi5hY2Nlc3NbcF07XG4gICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xuICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XG4gICAgICBpZiAoa2luZCA9PT0gXCJhY2Nlc3NvclwiKSB7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmdldCkpIGRlc2NyaXB0b3IuZ2V0ID0gXztcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcbiAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgICAgICBlbHNlIGRlc2NyaXB0b3Jba2V5XSA9IF87XG4gICAgICB9XG4gIH1cbiAgaWYgKHRhcmdldCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29udGV4dEluLm5hbWUsIGRlc2NyaXB0b3IpO1xuICBkb25lID0gdHJ1ZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XG4gIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGluaXRpYWxpemVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xuICB9XG4gIHJldHVybiB1c2VWYWx1ZSA/IHZhbHVlIDogdm9pZCAwO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcHJvcEtleSh4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcbiAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsIFwibmFtZVwiLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHByZWZpeCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCIgXCIsIG5hbWUpIDogbmFtZSB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XG4gIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICB9XG59XG5cbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICBvW2syXSA9IG1ba107XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XG4gIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcbiAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgIH1cbiAgfTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcbiAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICBpZiAoIW0pIHJldHVybiBvO1xuICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgdHJ5IHtcbiAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICB9XG4gIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICB9XG4gICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgfVxuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xuICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcbiAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XG4gIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcbiAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxuICAgICAgICAgIHJba10gPSBhW2pdO1xuICByZXR1cm4gcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcbiAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xuICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XG4gIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIGF3YWl0UmV0dXJuKGYpIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodikudGhlbihmLCByZWplY3QpOyB9OyB9XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAoZ1tuXSkgeyBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyBpZiAoZikgaVtuXSA9IGYoaVtuXSk7IH0gfVxuICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XG4gIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxuICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XG4gIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XG4gIHZhciBpLCBwO1xuICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XG4gIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcbiAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxuICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xuICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxuICByZXR1cm4gY29va2VkO1xufTtcblxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgb1tcImRlZmF1bHRcIl0gPSB2O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcbiAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XG4gIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xuICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XG4gIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcbiAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcbiAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XG4gIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZShlbnYsIHZhbHVlLCBhc3luYykge1xuICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xuICAgIHZhciBkaXNwb3NlLCBpbm5lcjtcbiAgICBpZiAoYXN5bmMpIHtcbiAgICAgIGlmICghU3ltYm9sLmFzeW5jRGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0Rpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5hc3luY0Rpc3Bvc2VdO1xuICAgIH1cbiAgICBpZiAoZGlzcG9zZSA9PT0gdm9pZCAwKSB7XG4gICAgICBpZiAoIVN5bWJvbC5kaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmRpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5kaXNwb3NlXTtcbiAgICAgIGlmIChhc3luYykgaW5uZXIgPSBkaXNwb3NlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGRpc3Bvc2UgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBub3QgZGlzcG9zYWJsZS5cIik7XG4gICAgaWYgKGlubmVyKSBkaXNwb3NlID0gZnVuY3Rpb24oKSB7IHRyeSB7IGlubmVyLmNhbGwodGhpcyk7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpOyB9IH07XG4gICAgZW52LnN0YWNrLnB1c2goeyB2YWx1ZTogdmFsdWUsIGRpc3Bvc2U6IGRpc3Bvc2UsIGFzeW5jOiBhc3luYyB9KTtcbiAgfVxuICBlbHNlIGlmIChhc3luYykge1xuICAgIGVudi5zdGFjay5wdXNoKHsgYXN5bmM6IHRydWUgfSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xuICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2Rpc3Bvc2VSZXNvdXJjZXMoZW52KSB7XG4gIGZ1bmN0aW9uIGZhaWwoZSkge1xuICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcbiAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xuICB9XG4gIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgd2hpbGUgKGVudi5zdGFjay5sZW5ndGgpIHtcbiAgICAgIHZhciByZWMgPSBlbnYuc3RhY2sucG9wKCk7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjLmRpc3Bvc2UgJiYgcmVjLmRpc3Bvc2UuY2FsbChyZWMudmFsdWUpO1xuICAgICAgICBpZiAocmVjLmFzeW5jKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCkudGhlbihuZXh0LCBmdW5jdGlvbihlKSB7IGZhaWwoZSk7IHJldHVybiBuZXh0KCk7IH0pO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICBmYWlsKGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW52Lmhhc0Vycm9yKSB0aHJvdyBlbnYuZXJyb3I7XG4gIH1cbiAgcmV0dXJuIG5leHQoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBfX2V4dGVuZHMsXG4gIF9fYXNzaWduLFxuICBfX3Jlc3QsXG4gIF9fZGVjb3JhdGUsXG4gIF9fcGFyYW0sXG4gIF9fbWV0YWRhdGEsXG4gIF9fYXdhaXRlcixcbiAgX19nZW5lcmF0b3IsXG4gIF9fY3JlYXRlQmluZGluZyxcbiAgX19leHBvcnRTdGFyLFxuICBfX3ZhbHVlcyxcbiAgX19yZWFkLFxuICBfX3NwcmVhZCxcbiAgX19zcHJlYWRBcnJheXMsXG4gIF9fc3ByZWFkQXJyYXksXG4gIF9fYXdhaXQsXG4gIF9fYXN5bmNHZW5lcmF0b3IsXG4gIF9fYXN5bmNEZWxlZ2F0b3IsXG4gIF9fYXN5bmNWYWx1ZXMsXG4gIF9fbWFrZVRlbXBsYXRlT2JqZWN0LFxuICBfX2ltcG9ydFN0YXIsXG4gIF9faW1wb3J0RGVmYXVsdCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZEluLFxuICBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZSxcbiAgX19kaXNwb3NlUmVzb3VyY2VzLFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIHByb2NlZHVyYWxUZXh0dXJlcyBmcm9tIFwiQGx0cy9wcm9jZWR1cmFsLXRleHR1cmVzL2xlZ2FjeS9sZWdhY3lcIjtcclxuZXhwb3J0IHsgcHJvY2VkdXJhbFRleHR1cmVzIH07XHJcbmV4cG9ydCBkZWZhdWx0IHByb2NlZHVyYWxUZXh0dXJlcztcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9