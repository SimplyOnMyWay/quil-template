/**
 * @fileoverview random utilities taken from Art Blocks 101 for creators
 * @author https://docs.artblocks.io/creator-docs/creator-onboarding/readme/
 */

goog.provide('{{top/ns}}.randomutils');


/**
 * Creates a new sfc32 function seeded by hash string
 * @param {string} uint128Hex
 * @constructor
 */
{{top/ns}}.randomutils.sfc32 = function (uint128Hex) {
      this.a = parseInt(uint128Hex.substr(0, 8), 16);
      this.b = parseInt(uint128Hex.substr(8, 8), 16);
      this.c = parseInt(uint128Hex.substr(16, 8), 16);
      this.d = parseInt(uint128Hex.substr(24, 8), 16);
    };

/**
 * Instance method to do the work of sfc32.
 * NOTE! It may be better to implement this as a static method within the constructor
 * @return {number}
 */
{{top/ns}}.randomutils.sfc32.prototype.gett = function() {
  this.a |= 0; this.b |= 0; this.c |= 0; this.d |= 0;
  let t = (((this.a + this.b) | 0) + this.d) | 0;
  this.d = (this.d + 1) | 0;
  this.a = this.b ^ (this.b >>> 9);
  this.b = (this.c + (this.c << 3)) | 0;
  this.c = (this.c << 21) | (this.c >>> 11);
  this.c = (this.c + t) | 0;
  return (t >>> 0) / 4294967296;
};

let y2 = 0;
/**
 * Constructor function for random class
 * @constructor 
 */
{{top/ns}}.randomutils.random = function() {
   {
     /**
      * @type {boolean}
      * @private
      */
     this.useA = false;

     // seed prngA with first half of tokenData.hash
     /**
      * @type {Object}
      * @private
      */
     this.prngA = new {{top/ns}}.randomutils.sfc32(tokenData.hash.substr(2, 32));

     // seed prngB with second half of tokenData.hash
     /**
      * @type {Object}
      * @private
      */
     this.prngB = new {{top/ns}}.randomutils.sfc32(tokenData.hash.substr(34, 32));

     for (let i = 0; i < 1e6; i += 2) {
       this.prngA.gett();
       this.prngB.gett();
     }
  }
}

// random number between 0 (inclusive) and 1 (exclusive)
{{top/ns}}.randomutils.random.prototype.random_dec = function() {
  this.useA = !this.useA;
  return this.useA ? this.prngA.gett() : this.prngB.gett();
}
// random number between a (inclusive) and b (exclusive)
/** @return {number} */
{{top/ns}}.randomutils.random.prototype.random_num = function(a, b) {
  return a + (b - a) * this.random_dec();
}
// random integer between a (inclusive) and b (inclusive)
// requires a < b for proper probability distribution
/** @return {number} */
{{top/ns}}.randomutils.random.prototype.random_int = function(a, b) {
  return Math.floor(this.random_num(a, b + 1));
}

// random boolean with p as percent liklihood of true
/** @return {boolean} */
{{top/ns}}.randomutils.random.prototype.random_bool = function(p) {
  return this.random_dec() < p;
}
  // random value in an array of items
/** @return {number} */
{{top/ns}}.randomutils.random.prototype.random_choice = function(list) {
  return list[this.random_int(0, list.length - 1)];
}
//manual polyfill for goog.isNumber because it seems Clojure goog doesn't include it 
if (typeof goog === 'undefined') {
  console.log("goog is defined");
  var goog = {};
}
goog.isNumber = function(val) {
  return typeof val === 'number' && !isNaN(val);
};
// gaussian random value
/**
 * @param {number} mean
 * @param {number} sd Defaults to 1
 * @return {number}
 */
{{top/ns}}.randomutils.random.prototype.random_gaussian = function(mean, sd) {
  let y1, x1, x2, w;
  sd = goog.isNumber(sd) ? sd : 1;
  
  if (this._gaussian_previous) {
    y1 = y2;
    this._gaussian_previous = false;
  } else {
    do {
      x1 = this.random_num(0, 2) - 1;
      x2 = this.random_num(0, 2) - 1;
      w = x1 * x1 + x2 * x2;
    } while (w >= 1);
    w = Math.sqrt(-2 * Math.log(w) / w);
    y1 = x1 * w;
    y2 = x2 * w;
    this._gaussian_previous = true;
  }
  const m = mean || 0;
  return y1 * sd + m;
};
// Pareto random value
/**
 * @param {number} scale
 * @param {number} shape
 * @return {number} */
{{top/ns}}.randomutils.random.prototype.random_pareto = function(scale, shape) {
   return scale / Math.pow(this.random_dec(), (1/shape));
}
// Pareto bounded random value
/**
 * @param {number} L lower bound (scale param)
 * @param {number} H upper bound
 * @param {number} shape
 * @return {number} */
{{top/ns}}.randomutils.random.prototype.random_pareto_bounded = function(L, H, shape) {
  let u, num, denom;
  u = this.random_dec();
  num = -(u*Math.pow(H, shape) - u*Math.pow(L, shape) - Math.pow(H, shape));
  denom = Math.pow(H, shape) * Math.pow(L, shape);
  return Math.pow(num/denom, (-1/shape));
}
