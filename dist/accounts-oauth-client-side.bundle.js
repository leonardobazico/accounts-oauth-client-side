//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var _ = Package.underscore._;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var Random;

var require = meteorInstall({"node_modules":{"meteor":{"random":{"random.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/random/random.js                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// We use cryptographically strong PRNGs (crypto.getRandomBytes() on the server,                                       // 1
// window.crypto.getRandomValues() in the browser) when available. If these                                            // 2
// PRNGs fail, we fall back to the Alea PRNG, which is not cryptographically                                           // 3
// strong, and we seed it with various sources such as the date, Math.random,                                          // 4
// and window size on the client.  When using crypto.getRandomValues(), our                                            // 5
// primitive is hexString(), from which we construct fraction(). When using                                            // 6
// window.crypto.getRandomValues() or alea, the primitive is fraction and we use                                       // 7
// that to construct hex string.                                                                                       // 8
                                                                                                                       //
if (Meteor.isServer) var nodeCrypto = Npm.require('crypto');                                                           // 10
                                                                                                                       //
// see http://baagoe.org/en/wiki/Better_random_numbers_for_javascript                                                  // 13
// for a full discussion and Alea implementation.                                                                      // 14
var Alea = function Alea() {                                                                                           // 15
  function Mash() {                                                                                                    // 16
    var n = 0xefc8249d;                                                                                                // 17
                                                                                                                       //
    var mash = function mash(data) {                                                                                   // 19
      data = data.toString();                                                                                          // 20
      for (var i = 0; i < data.length; i++) {                                                                          // 21
        n += data.charCodeAt(i);                                                                                       // 22
        var h = 0.02519603282416938 * n;                                                                               // 23
        n = h >>> 0;                                                                                                   // 24
        h -= n;                                                                                                        // 25
        h *= n;                                                                                                        // 26
        n = h >>> 0;                                                                                                   // 27
        h -= n;                                                                                                        // 28
        n += h * 0x100000000; // 2^32                                                                                  // 29
      }                                                                                                                // 30
      return (n >>> 0) * 2.3283064365386963e-10; // 2^-32                                                              // 31
    };                                                                                                                 // 32
                                                                                                                       //
    mash.version = 'Mash 0.9';                                                                                         // 34
    return mash;                                                                                                       // 35
  }                                                                                                                    // 36
                                                                                                                       //
  return function (args) {                                                                                             // 38
    var s0 = 0;                                                                                                        // 39
    var s1 = 0;                                                                                                        // 40
    var s2 = 0;                                                                                                        // 41
    var c = 1;                                                                                                         // 42
                                                                                                                       //
    if (args.length == 0) {                                                                                            // 44
      args = [+new Date()];                                                                                            // 45
    }                                                                                                                  // 46
    var mash = Mash();                                                                                                 // 47
    s0 = mash(' ');                                                                                                    // 48
    s1 = mash(' ');                                                                                                    // 49
    s2 = mash(' ');                                                                                                    // 50
                                                                                                                       //
    for (var i = 0; i < args.length; i++) {                                                                            // 52
      s0 -= mash(args[i]);                                                                                             // 53
      if (s0 < 0) {                                                                                                    // 54
        s0 += 1;                                                                                                       // 55
      }                                                                                                                // 56
      s1 -= mash(args[i]);                                                                                             // 57
      if (s1 < 0) {                                                                                                    // 58
        s1 += 1;                                                                                                       // 59
      }                                                                                                                // 60
      s2 -= mash(args[i]);                                                                                             // 61
      if (s2 < 0) {                                                                                                    // 62
        s2 += 1;                                                                                                       // 63
      }                                                                                                                // 64
    }                                                                                                                  // 65
    mash = null;                                                                                                       // 66
                                                                                                                       //
    var random = function random() {                                                                                   // 68
      var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32                                                      // 69
      s0 = s1;                                                                                                         // 70
      s1 = s2;                                                                                                         // 71
      return s2 = t - (c = t | 0);                                                                                     // 72
    };                                                                                                                 // 73
    random.uint32 = function () {                                                                                      // 74
      return random() * 0x100000000; // 2^32                                                                           // 75
    };                                                                                                                 // 76
    random.fract53 = function () {                                                                                     // 77
      return random() + (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53                                   // 78
    };                                                                                                                 // 80
    random.version = 'Alea 0.9';                                                                                       // 81
    random.args = args;                                                                                                // 82
    return random;                                                                                                     // 83
  }(Array.prototype.slice.call(arguments));                                                                            // 85
};                                                                                                                     // 86
                                                                                                                       //
var UNMISTAKABLE_CHARS = "23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz";                                    // 88
var BASE64_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789-_";                            // 89
                                                                                                                       //
// `type` is one of `RandomGenerator.Type` as defined below.                                                           // 92
//                                                                                                                     // 93
// options:                                                                                                            // 94
// - seeds: (required, only for RandomGenerator.Type.ALEA) an array                                                    // 95
//   whose items will be `toString`ed and used as the seed to the Alea                                                 // 96
//   algorithm                                                                                                         // 97
var RandomGenerator = function RandomGenerator(type, options) {                                                        // 98
  var self = this;                                                                                                     // 99
  self.type = type;                                                                                                    // 100
                                                                                                                       //
  if (!RandomGenerator.Type[type]) {                                                                                   // 102
    throw new Error("Unknown random generator type: " + type);                                                         // 103
  }                                                                                                                    // 104
                                                                                                                       //
  if (type === RandomGenerator.Type.ALEA) {                                                                            // 106
    if (!options.seeds) {                                                                                              // 107
      throw new Error("No seeds were provided for Alea PRNG");                                                         // 108
    }                                                                                                                  // 109
    self.alea = Alea.apply(null, options.seeds);                                                                       // 110
  }                                                                                                                    // 111
};                                                                                                                     // 112
                                                                                                                       //
// Types of PRNGs supported by the `RandomGenerator` class                                                             // 114
RandomGenerator.Type = {                                                                                               // 115
  // Use Node's built-in `crypto.getRandomBytes` (cryptographically                                                    // 116
  // secure but not seedable, runs only on the server). Reverts to                                                     // 117
  // `crypto.getPseudoRandomBytes` in the extremely uncommon case that                                                 // 118
  // there isn't enough entropy yet                                                                                    // 119
  NODE_CRYPTO: "NODE_CRYPTO",                                                                                          // 120
                                                                                                                       //
  // Use non-IE browser's built-in `window.crypto.getRandomValues`                                                     // 122
  // (cryptographically secure but not seedable, runs only in the                                                      // 123
  // browser).                                                                                                         // 124
  BROWSER_CRYPTO: "BROWSER_CRYPTO",                                                                                    // 125
                                                                                                                       //
  // Use the *fast*, seedaable and not cryptographically secure                                                        // 127
  // Alea algorithm                                                                                                    // 128
  ALEA: "ALEA"                                                                                                         // 129
};                                                                                                                     // 115
                                                                                                                       //
/**                                                                                                                    // 132
 * @name Random.fraction                                                                                               //
 * @summary Return a number between 0 and 1, like `Math.random`.                                                       //
 * @locus Anywhere                                                                                                     //
 */                                                                                                                    //
RandomGenerator.prototype.fraction = function () {                                                                     // 137
  var self = this;                                                                                                     // 138
  if (self.type === RandomGenerator.Type.ALEA) {                                                                       // 139
    return self.alea();                                                                                                // 140
  } else if (self.type === RandomGenerator.Type.NODE_CRYPTO) {                                                         // 141
    var numerator = parseInt(self.hexString(8), 16);                                                                   // 142
    return numerator * 2.3283064365386963e-10; // 2^-32                                                                // 143
  } else if (self.type === RandomGenerator.Type.BROWSER_CRYPTO) {                                                      // 144
    var array = new Uint32Array(1);                                                                                    // 145
    window.crypto.getRandomValues(array);                                                                              // 146
    return array[0] * 2.3283064365386963e-10; // 2^-32                                                                 // 147
  } else {                                                                                                             // 148
    throw new Error('Unknown random generator type: ' + self.type);                                                    // 149
  }                                                                                                                    // 150
};                                                                                                                     // 151
                                                                                                                       //
/**                                                                                                                    // 153
 * @name Random.hexString                                                                                              //
 * @summary Return a random string of `n` hexadecimal digits.                                                          //
 * @locus Anywhere                                                                                                     //
 * @param {Number} n Length of the string                                                                              //
 */                                                                                                                    //
RandomGenerator.prototype.hexString = function (digits) {                                                              // 159
  var self = this;                                                                                                     // 160
  if (self.type === RandomGenerator.Type.NODE_CRYPTO) {                                                                // 161
    var numBytes = Math.ceil(digits / 2);                                                                              // 162
    var bytes;                                                                                                         // 163
    // Try to get cryptographically strong randomness. Fall back to                                                    // 164
    // non-cryptographically strong if not available.                                                                  // 165
    try {                                                                                                              // 166
      bytes = nodeCrypto.randomBytes(numBytes);                                                                        // 167
    } catch (e) {                                                                                                      // 168
      // XXX should re-throw any error except insufficient entropy                                                     // 169
      bytes = nodeCrypto.pseudoRandomBytes(numBytes);                                                                  // 170
    }                                                                                                                  // 171
    var result = bytes.toString("hex");                                                                                // 172
    // If the number of digits is odd, we'll have generated an extra 4 bits                                            // 173
    // of randomness, so we need to trim the last digit.                                                               // 174
    return result.substring(0, digits);                                                                                // 175
  } else {                                                                                                             // 176
    return this._randomString(digits, "0123456789abcdef");                                                             // 177
  }                                                                                                                    // 178
};                                                                                                                     // 179
                                                                                                                       //
RandomGenerator.prototype._randomString = function (charsCount, alphabet) {                                            // 181
  var self = this;                                                                                                     // 183
  var digits = [];                                                                                                     // 184
  for (var i = 0; i < charsCount; i++) {                                                                               // 185
    digits[i] = self.choice(alphabet);                                                                                 // 186
  }                                                                                                                    // 187
  return digits.join("");                                                                                              // 188
};                                                                                                                     // 189
                                                                                                                       //
/**                                                                                                                    // 191
 * @name Random.id                                                                                                     //
 * @summary Return a unique identifier, such as `"Jjwjg6gouWLXhMGKW"`, that is                                         //
 * likely to be unique in the whole world.                                                                             //
 * @locus Anywhere                                                                                                     //
 * @param {Number} [n] Optional length of the identifier in characters                                                 //
 *   (defaults to 17)                                                                                                  //
 */                                                                                                                    //
RandomGenerator.prototype.id = function (charsCount) {                                                                 // 199
  var self = this;                                                                                                     // 200
  // 17 characters is around 96 bits of entropy, which is the amount of                                                // 201
  // state in the Alea PRNG.                                                                                           // 202
  if (charsCount === undefined) charsCount = 17;                                                                       // 203
                                                                                                                       //
  return self._randomString(charsCount, UNMISTAKABLE_CHARS);                                                           // 206
};                                                                                                                     // 207
                                                                                                                       //
/**                                                                                                                    // 209
 * @name Random.secret                                                                                                 //
 * @summary Return a random string of printable characters with 6 bits of                                              //
 * entropy per character. Use `Random.secret` for security-critical secrets                                            //
 * that are intended for machine, rather than human, consumption.                                                      //
 * @locus Anywhere                                                                                                     //
 * @param {Number} [n] Optional length of the secret string (defaults to 43                                            //
 *   characters, or 256 bits of entropy)                                                                               //
 */                                                                                                                    //
RandomGenerator.prototype.secret = function (charsCount) {                                                             // 218
  var self = this;                                                                                                     // 219
  // Default to 256 bits of entropy, or 43 characters at 6 bits per                                                    // 220
  // character.                                                                                                        // 221
  if (charsCount === undefined) charsCount = 43;                                                                       // 222
  return self._randomString(charsCount, BASE64_CHARS);                                                                 // 224
};                                                                                                                     // 225
                                                                                                                       //
/**                                                                                                                    // 227
 * @name Random.choice                                                                                                 //
 * @summary Return a random element of the given array or string.                                                      //
 * @locus Anywhere                                                                                                     //
 * @param {Array|String} arrayOrString Array or string to choose from                                                  //
 */                                                                                                                    //
RandomGenerator.prototype.choice = function (arrayOrString) {                                                          // 233
  var index = Math.floor(this.fraction() * arrayOrString.length);                                                      // 234
  if (typeof arrayOrString === "string") return arrayOrString.substr(index, 1);else return arrayOrString[index];       // 235
};                                                                                                                     // 239
                                                                                                                       //
// instantiate RNG.  Heuristically collect entropy from various sources when a                                         // 241
// cryptographic PRNG isn't available.                                                                                 // 242
                                                                                                                       //
// client sources                                                                                                      // 244
var height = typeof window !== 'undefined' && window.innerHeight || typeof document !== 'undefined' && document.documentElement && document.documentElement.clientHeight || typeof document !== 'undefined' && document.body && document.body.clientHeight || 1;
                                                                                                                       //
var width = typeof window !== 'undefined' && window.innerWidth || typeof document !== 'undefined' && document.documentElement && document.documentElement.clientWidth || typeof document !== 'undefined' && document.body && document.body.clientWidth || 1;
                                                                                                                       //
var agent = typeof navigator !== 'undefined' && navigator.userAgent || "";                                             // 263
                                                                                                                       //
function createAleaGeneratorWithGeneratedSeed() {                                                                      // 265
  return new RandomGenerator(RandomGenerator.Type.ALEA, { seeds: [new Date(), height, width, agent, Math.random()] });
};                                                                                                                     // 269
                                                                                                                       //
if (Meteor.isServer) {                                                                                                 // 271
  Random = new RandomGenerator(RandomGenerator.Type.NODE_CRYPTO);                                                      // 272
} else {                                                                                                               // 273
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {                               // 274
    Random = new RandomGenerator(RandomGenerator.Type.BROWSER_CRYPTO);                                                 // 276
  } else {                                                                                                             // 277
    // On IE 10 and below, there's no browser crypto API                                                               // 278
    // available. Fall back to Alea                                                                                    // 279
    //                                                                                                                 // 280
    // XXX looks like at the moment, we use Alea in IE 11 as well,                                                     // 281
    // which has `window.msCrypto` instead of `window.crypto`.                                                         // 282
    Random = createAleaGeneratorWithGeneratedSeed();                                                                   // 283
  }                                                                                                                    // 284
}                                                                                                                      // 285
                                                                                                                       //
// Create a non-cryptographically secure PRNG with a given seed (using                                                 // 287
// the Alea algorithm)                                                                                                 // 288
Random.createWithSeeds = function () {                                                                                 // 289
  for (var _len = arguments.length, seeds = Array(_len), _key = 0; _key < _len; _key++) {                              // 289
    seeds[_key] = arguments[_key];                                                                                     // 289
  }                                                                                                                    // 289
                                                                                                                       //
  if (seeds.length === 0) {                                                                                            // 290
    throw new Error("No seeds were provided");                                                                         // 291
  }                                                                                                                    // 292
  return new RandomGenerator(RandomGenerator.Type.ALEA, { seeds: seeds });                                             // 293
};                                                                                                                     // 294
                                                                                                                       //
// Used like `Random`, but much faster and not cryptographically                                                       // 296
// secure                                                                                                              // 297
Random.insecure = createAleaGeneratorWithGeneratedSeed();                                                              // 298
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"deprecated.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/random/deprecated.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Before this package existed, we used to use this Meteor.uuid()                                                      // 1
// implementing the RFC 4122 v4 UUID. It is no longer documented                                                       // 2
// and will go away.                                                                                                   // 3
// XXX COMPAT WITH 0.5.6                                                                                               // 4
Meteor.uuid = function () {                                                                                            // 5
  var HEX_DIGITS = "0123456789abcdef";                                                                                 // 6
  var s = [];                                                                                                          // 7
  for (var i = 0; i < 36; i++) {                                                                                       // 8
    s[i] = Random.choice(HEX_DIGITS);                                                                                  // 9
  }                                                                                                                    // 10
  s[14] = "4";                                                                                                         // 11
  s[19] = HEX_DIGITS.substr(parseInt(s[19], 16) & 0x3 | 0x8, 1);                                                       // 12
  s[8] = s[13] = s[18] = s[23] = "-";                                                                                  // 13
                                                                                                                       //
  var uuid = s.join("");                                                                                               // 15
  return uuid;                                                                                                         // 16
};                                                                                                                     // 17
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/random/random.js");
require("./node_modules/meteor/random/deprecated.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.random = {}, {
  Random: Random
});

})();
//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var _ = Package.underscore._;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;

/* Package-scope variables */
var Reload;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
// packages/reload/reload.js                                                               //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////
                                                                                           //
/**                                                                                        // 1
 * This code does _NOT_ support hot (session-restoring) reloads on                         // 2
 * IE6,7. It only works on browsers with sessionStorage support.                           // 3
 *                                                                                         // 4
 * There are a couple approaches to add IE6,7 support:                                     // 5
 *                                                                                         // 6
 * - use IE's "userData" mechanism in combination with window.name.                        // 7
 * This mostly works, however the problem is that it can not get to the                    // 8
 * data until after DOMReady. This is a problem for us since this API                      // 9
 * relies on the data being ready before API users run. We could                           // 10
 * refactor using Meteor.startup in all API users, but that might slow                     // 11
 * page loads as we couldn't start the stream until after DOMReady.                        // 12
 * Here are some resources on this approach:                                               // 13
 * https://github.com/hugeinc/USTORE.js                                                    // 14
 * http://thudjs.tumblr.com/post/419577524/localstorage-userdata                           // 15
 * http://www.javascriptkit.com/javatutors/domstorage2.shtml                               // 16
 *                                                                                         // 17
 * - POST the data to the server, and have the server send it back on                      // 18
 * page load. This is nice because it sidesteps all the local storage                      // 19
 * compatibility issues, however it is kinda tricky. We can use a unique                   // 20
 * token in the URL, then get rid of it with HTML5 pushstate, but that                     // 21
 * only works on pushstate browsers.                                                       // 22
 *                                                                                         // 23
 * This will all need to be reworked entirely when we add server-side                      // 24
 * HTML rendering. In that case, the server will need to have access to                    // 25
 * the client's session to render properly.                                                // 26
 */                                                                                        // 27
                                                                                           // 28
// XXX when making this API public, also expose a flag for the app                         // 29
// developer to know whether a hot code push is happening. This is                         // 30
// useful for apps using `window.onbeforeunload`. See                                      // 31
// https://github.com/meteor/meteor/pull/657                                               // 32
                                                                                           // 33
Reload = {};                                                                               // 34
                                                                                           // 35
var KEY_NAME = 'Meteor_Reload';                                                            // 36
                                                                                           // 37
var old_data = {};                                                                         // 38
// read in old data at startup.                                                            // 39
var old_json;                                                                              // 40
                                                                                           // 41
// This logic for sessionStorage detection is based on browserstate/history.js             // 42
var safeSessionStorage = null;                                                             // 43
try {                                                                                      // 44
  // This throws a SecurityError on Chrome if cookies & localStorage are                   // 45
  // explicitly disabled                                                                   // 46
  //                                                                                       // 47
  // On Firefox with dom.storage.enabled set to false, sessionStorage is null              // 48
  //                                                                                       // 49
  // We can't even do (typeof sessionStorage) on Chrome, it throws.  So we rely            // 50
  // on the throw if sessionStorage == null; the alternative is browser                    // 51
  // detection, but this seems better.                                                     // 52
  safeSessionStorage = window.sessionStorage;                                              // 53
                                                                                           // 54
  // Check we can actually use it                                                          // 55
  if (safeSessionStorage) {                                                                // 56
    safeSessionStorage.setItem('__dummy__', '1');                                          // 57
    safeSessionStorage.removeItem('__dummy__');                                            // 58
  } else {                                                                                 // 59
    // Be consistently null, for safety                                                    // 60
    safeSessionStorage = null;                                                             // 61
  }                                                                                        // 62
} catch(e) {                                                                               // 63
  // Expected on chrome with strict security, or if sessionStorage not supported           // 64
  safeSessionStorage = null;                                                               // 65
}                                                                                          // 66
                                                                                           // 67
// Exported for test.                                                                      // 68
Reload._getData = function () {                                                            // 69
  return safeSessionStorage && safeSessionStorage.getItem(KEY_NAME);                       // 70
};                                                                                         // 71
                                                                                           // 72
if (safeSessionStorage) {                                                                  // 73
  old_json = Reload._getData();                                                            // 74
  safeSessionStorage.removeItem(KEY_NAME);                                                 // 75
} else {                                                                                   // 76
  // Unsupported browser (IE 6,7) or locked down security settings.                        // 77
  // No session resumption.                                                                // 78
  // Meteor._debug("XXX UNSUPPORTED BROWSER/SETTINGS");                                    // 79
}                                                                                          // 80
                                                                                           // 81
if (!old_json) old_json = '{}';                                                            // 82
var old_parsed = {};                                                                       // 83
try {                                                                                      // 84
  old_parsed = JSON.parse(old_json);                                                       // 85
  if (typeof old_parsed !== "object") {                                                    // 86
    Meteor._debug("Got bad data on reload. Ignoring.");                                    // 87
    old_parsed = {};                                                                       // 88
  }                                                                                        // 89
} catch (err) {                                                                            // 90
  Meteor._debug("Got invalid JSON on reload. Ignoring.");                                  // 91
}                                                                                          // 92
                                                                                           // 93
if (old_parsed.reload && typeof old_parsed.data === "object") {                            // 94
  // Meteor._debug("Restoring reload data.");                                              // 95
  old_data = old_parsed.data;                                                              // 96
}                                                                                          // 97
                                                                                           // 98
                                                                                           // 99
var providers = [];                                                                        // 100
                                                                                           // 101
////////// External API //////////                                                         // 102
                                                                                           // 103
// Packages that support migration should register themselves by calling                   // 104
// this function. When it's time to migrate, callback will be called                       // 105
// with one argument, the "retry function," and an optional 'option'                       // 106
// argument (containing a key 'immediateMigration'). If the package                        // 107
// is ready to migrate, it should return [true, data], where data is                       // 108
// its migration data, an arbitrary JSON value (or [true] if it has                        // 109
// no migration data this time). If the package needs more time                            // 110
// before it is ready to migrate, it should return false. Then, once                       // 111
// it is ready to migrating again, it should call the retry                                // 112
// function. The retry function will return immediately, but will                          // 113
// schedule the migration to be retried, meaning that every package                        // 114
// will be polled once again for its migration data. If they are all                       // 115
// ready this time, then the migration will happen. name must be set if there              // 116
// is migration data. If 'immediateMigration' is set in the options                        // 117
// argument, then it doesn't matter whether the package is ready to                        // 118
// migrate or not; the reload will happen immediately without waiting                      // 119
// (used for OAuth redirect login).                                                        // 120
//                                                                                         // 121
Reload._onMigrate = function (name, callback) {                                            // 122
  if (!callback) {                                                                         // 123
    // name not provided, so first arg is callback.                                        // 124
    callback = name;                                                                       // 125
    name = undefined;                                                                      // 126
  }                                                                                        // 127
  providers.push({name: name, callback: callback});                                        // 128
};                                                                                         // 129
                                                                                           // 130
// Called by packages when they start up.                                                  // 131
// Returns the object that was saved, or undefined if none saved.                          // 132
//                                                                                         // 133
Reload._migrationData = function (name) {                                                  // 134
  return old_data[name];                                                                   // 135
};                                                                                         // 136
                                                                                           // 137
// Options are the same as for `Reload._migrate`.                                          // 138
var pollProviders = function (tryReload, options) {                                        // 139
  tryReload = tryReload || function () {};                                                 // 140
  options = options || {};                                                                 // 141
                                                                                           // 142
  var migrationData = {};                                                                  // 143
  var remaining = _.clone(providers);                                                      // 144
  var allReady = true;                                                                     // 145
  while (remaining.length) {                                                               // 146
    var p = remaining.shift();                                                             // 147
    var status = p.callback(tryReload, options);                                           // 148
    if (!status[0])                                                                        // 149
      allReady = false;                                                                    // 150
    if (status.length > 1 && p.name)                                                       // 151
      migrationData[p.name] = status[1];                                                   // 152
  };                                                                                       // 153
  if (allReady || options.immediateMigration)                                              // 154
    return migrationData;                                                                  // 155
  else                                                                                     // 156
    return null;                                                                           // 157
};                                                                                         // 158
                                                                                           // 159
// Options are:                                                                            // 160
//  - immediateMigration: true if the page will be reloaded immediately                    // 161
//    regardless of whether packages report that they are ready or not.                    // 162
Reload._migrate = function (tryReload, options) {                                          // 163
  // Make sure each package is ready to go, and collect their                              // 164
  // migration data                                                                        // 165
  var migrationData = pollProviders(tryReload, options);                                   // 166
  if (migrationData === null)                                                              // 167
    return false; // not ready yet..                                                       // 168
                                                                                           // 169
  try {                                                                                    // 170
    // Persist the migration data                                                          // 171
    var json = JSON.stringify({                                                            // 172
      data: migrationData, reload: true                                                    // 173
    });                                                                                    // 174
  } catch (err) {                                                                          // 175
    Meteor._debug("Couldn't serialize data for migration", migrationData);                 // 176
    throw err;                                                                             // 177
  }                                                                                        // 178
                                                                                           // 179
  if (safeSessionStorage) {                                                                // 180
    try {                                                                                  // 181
      safeSessionStorage.setItem(KEY_NAME, json);                                          // 182
    } catch (err) {                                                                        // 183
      // We should have already checked this, but just log - don't throw                   // 184
      Meteor._debug("Couldn't save data for migration to sessionStorage", err);            // 185
    }                                                                                      // 186
  } else {                                                                                 // 187
    Meteor._debug("Browser does not support sessionStorage. Not saving migration state.");
  }                                                                                        // 189
                                                                                           // 190
  return true;                                                                             // 191
};                                                                                         // 192
                                                                                           // 193
// Allows tests to isolate the list of providers.                                          // 194
Reload._withFreshProvidersForTest = function (f) {                                         // 195
  var originalProviders = _.clone(providers);                                              // 196
  providers = [];                                                                          // 197
  try {                                                                                    // 198
    f();                                                                                   // 199
  } finally {                                                                              // 200
    providers = originalProviders;                                                         // 201
  }                                                                                        // 202
};                                                                                         // 203
                                                                                           // 204
// Migrating reload: reload this page (presumably to pick up a new                         // 205
// version of the code or assets), but save the program state and                          // 206
// migrate it over. This function returns immediately. The reload                          // 207
// will happen at some point in the future once all of the packages                        // 208
// are ready to migrate.                                                                   // 209
//                                                                                         // 210
var reloading = false;                                                                     // 211
Reload._reload = function (options) {                                                      // 212
  options = options || {};                                                                 // 213
                                                                                           // 214
  if (reloading)                                                                           // 215
    return;                                                                                // 216
  reloading = true;                                                                        // 217
                                                                                           // 218
  var tryReload = function () { _.defer(function () {                                      // 219
    if (Reload._migrate(tryReload, options)) {                                             // 220
      // We'd like to make the browser reload the page using location.replace()            // 221
      // instead of location.reload(), because this avoids validating assets               // 222
      // with the server if we still have a valid cached copy. This doesn't work           // 223
      // when the location contains a hash however, because that wouldn't reload           // 224
      // the page and just scroll to the hash location instead.                            // 225
      if (window.location.hash || window.location.href.endsWith("#")) {                    // 226
        window.location.reload();                                                          // 227
      } else {                                                                             // 228
        window.location.replace(window.location.href);                                     // 229
      }                                                                                    // 230
    }                                                                                      // 231
  }); };                                                                                   // 232
                                                                                           // 233
  tryReload();                                                                             // 234
};                                                                                         // 235
                                                                                           // 236
/////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
// packages/reload/deprecated.js                                                           //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////
                                                                                           //
// Reload functionality used to live on Meteor._reload. Be nice and try not to             // 1
// break code that uses it, even though it's internal.                                     // 2
// XXX COMPAT WITH 0.6.4                                                                   // 3
Meteor._reload = {                                                                         // 4
  onMigrate: Reload._onMigrate,                                                            // 5
  migrationData: Reload._migrationData,                                                    // 6
  reload: Reload._reload                                                                   // 7
};                                                                                         // 8
                                                                                           // 9
/////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.reload = {}, {
  Reload: Reload
});

})();
//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var _ = Package.underscore._;

/* Package-scope variables */
var URL, buildUrl;

(function(){

/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
// packages/url/url_common.js                                                      //
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////
                                                                                   //
URL = {};                                                                          // 1
                                                                                   // 2
var encodeString = function(str) {                                                 // 3
  return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
};                                                                                 // 5
                                                                                   // 6
                                                                                   // 7
URL._encodeParams = function(params) {                                             // 8
  var buf = [];                                                                    // 9
  _.each(params, function(value, key) {                                            // 10
    if (buf.length)                                                                // 11
      buf.push('&');                                                               // 12
    buf.push(encodeString(key), '=', encodeString(value));                         // 13
  });                                                                              // 14
  return buf.join('').replace(/%20/g, '+');                                        // 15
};                                                                                 // 16
                                                                                   // 17
                                                                                   // 18
buildUrl = function(before_qmark, from_qmark, opt_query, opt_params) {             // 19
  var url_without_query = before_qmark;                                            // 20
  var query = from_qmark ? from_qmark.slice(1) : null;                             // 21
                                                                                   // 22
  if (typeof opt_query === "string")                                               // 23
    query = String(opt_query);                                                     // 24
                                                                                   // 25
  if (opt_params) {                                                                // 26
    query = query || "";                                                           // 27
    var prms = URL._encodeParams(opt_params);                                      // 28
    if (query && prms)                                                             // 29
      query += '&';                                                                // 30
    query += prms;                                                                 // 31
  }                                                                                // 32
                                                                                   // 33
  var url = url_without_query;                                                     // 34
  if (query !== null)                                                              // 35
    url += ("?"+query);                                                            // 36
                                                                                   // 37
  return url;                                                                      // 38
};                                                                                 // 39
                                                                                   // 40
/////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
// packages/url/url_client.js                                                      //
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////
                                                                                   //
URL._constructUrl = function (url, query, params) {                                // 1
  var query_match = /^(.*?)(\?.*)?$/.exec(url);                                    // 2
  return buildUrl(query_match[1], query_match[2], query, params);                  // 3
};                                                                                 // 4
                                                                                   // 5
/////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.url = {}, {
  URL: URL
});

})();
//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var Reload = Package.reload.Reload;
var Base64 = Package.base64.Base64;
var URL = Package.url.URL;

/* Package-scope variables */
var OAuth, Oauth;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// packages/oauth/oauth_client.js                                                       //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
// credentialToken -> credentialSecret. You must provide both the                       // 1
// credentialToken and the credentialSecret to retrieve an access token from            // 2
// the _pendingCredentials collection.                                                  // 3
var credentialSecrets = {};                                                             // 4
                                                                                        // 5
OAuth = {};                                                                             // 6
                                                                                        // 7
OAuth.showPopup = function (url, callback, dimensions) {                                // 8
  throw new Error("OAuth.showPopup must be implemented on this arch.");                 // 9
};                                                                                      // 10
                                                                                        // 11
// Determine the login style (popup or redirect) for this login flow.                   // 12
//                                                                                      // 13
//                                                                                      // 14
OAuth._loginStyle = function (service, config, options) {                               // 15
                                                                                        // 16
  if (Meteor.isCordova) {                                                               // 17
    return "popup";                                                                     // 18
  }                                                                                     // 19
                                                                                        // 20
  var loginStyle = (options && options.loginStyle) || config.loginStyle || 'popup';     // 21
                                                                                        // 22
  if (! _.contains(["popup", "redirect"], loginStyle))                                  // 23
    throw new Error("Invalid login style: " + loginStyle);                              // 24
                                                                                        // 25
  // If we don't have session storage (for example, Safari in private                   // 26
  // mode), the redirect login flow won't work, so fallback to the                      // 27
  // popup style.                                                                       // 28
  if (loginStyle === 'redirect') {                                                      // 29
    try {                                                                               // 30
      sessionStorage.setItem('Meteor.oauth.test', 'test');                              // 31
      sessionStorage.removeItem('Meteor.oauth.test');                                   // 32
    } catch (e) {                                                                       // 33
      loginStyle = 'popup';                                                             // 34
    }                                                                                   // 35
  }                                                                                     // 36
                                                                                        // 37
  return loginStyle;                                                                    // 38
};                                                                                      // 39
                                                                                        // 40
OAuth._stateParam = function (loginStyle, credentialToken, redirectUrl) {               // 41
  var state = {                                                                         // 42
    loginStyle: loginStyle,                                                             // 43
    credentialToken: credentialToken,                                                   // 44
    isCordova: Meteor.isCordova                                                         // 45
  };                                                                                    // 46
                                                                                        // 47
  if (loginStyle === 'redirect')                                                        // 48
    state.redirectUrl = redirectUrl || ('' + window.location);                          // 49
                                                                                        // 50
  // Encode base64 as not all login services URI-encode the state                       // 51
  // parameter when they pass it back to us.                                            // 52
  // Use the 'base64' package here because 'btoa' isn't supported in IE8/9.             // 53
  return Base64.encode(JSON.stringify(state));                                          // 54
};                                                                                      // 55
                                                                                        // 56
                                                                                        // 57
// At the beginning of the redirect login flow, before we redirect to                   // 58
// the login service, save the credential token for this login attempt                  // 59
// in the reload migration data.                                                        // 60
//                                                                                      // 61
OAuth.saveDataForRedirect = function (loginService, credentialToken) {                  // 62
  Reload._onMigrate('oauth', function () {                                              // 63
    return [true, {loginService: loginService, credentialToken: credentialToken}];      // 64
  });                                                                                   // 65
  Reload._migrate(null, {immediateMigration: true});                                    // 66
};                                                                                      // 67
                                                                                        // 68
// At the end of the redirect login flow, when we've redirected back                    // 69
// to the application, retrieve the credentialToken and (if the login                   // 70
// was successful) the credentialSecret.                                                // 71
//                                                                                      // 72
// Called at application startup.  Returns null if this is normal                       // 73
// application startup and we weren't just redirected at the end of                     // 74
// the login flow.                                                                      // 75
//                                                                                      // 76
OAuth.getDataAfterRedirect = function () {                                              // 77
  var migrationData = Reload._migrationData('oauth');                                   // 78
                                                                                        // 79
  if (! (migrationData && migrationData.credentialToken))                               // 80
    return null;                                                                        // 81
                                                                                        // 82
  var credentialToken = migrationData.credentialToken;                                  // 83
  var key = OAuth._storageTokenPrefix + credentialToken;                                // 84
  var credentialSecret;                                                                 // 85
  try {                                                                                 // 86
    credentialSecret = sessionStorage.getItem(key);                                     // 87
    sessionStorage.removeItem(key);                                                     // 88
  } catch (e) {                                                                         // 89
    Meteor._debug('error retrieving credentialSecret', e);                              // 90
  }                                                                                     // 91
  return {                                                                              // 92
    loginService: migrationData.loginService,                                           // 93
    credentialToken: credentialToken,                                                   // 94
    credentialSecret: credentialSecret                                                  // 95
  };                                                                                    // 96
};                                                                                      // 97
                                                                                        // 98
// Launch an OAuth login flow.  For the popup login style, show the                     // 99
// popup.  For the redirect login style, save the credential token for                  // 100
// this login attempt in the reload migration data, and redirect to                     // 101
// the service for the login.                                                           // 102
//                                                                                      // 103
// options:                                                                             // 104
//  loginService: "facebook", "google", etc.                                            // 105
//  loginStyle: "popup" or "redirect"                                                   // 106
//  loginUrl: The URL at the login service provider to start the OAuth flow.            // 107
//  credentialRequestCompleteCallback: for the popup flow, call when the popup          // 108
//    is closed and we have the credential from the login service.                      // 109
//  credentialToken: our identifier for this login flow.                                // 110
//                                                                                      // 111
OAuth.launchLogin = function (options) {                                                // 112
  if (! options.loginService)                                                           // 113
    throw new Error('loginService required');                                           // 114
  if (options.loginStyle === 'popup') {                                                 // 115
    OAuth.showPopup(                                                                    // 116
      options.loginUrl,                                                                 // 117
      _.bind(options.credentialRequestCompleteCallback, null, options.credentialToken),
      options.popupOptions);                                                            // 119
  } else if (options.loginStyle === 'redirect') {                                       // 120
    OAuth.saveDataForRedirect(options.loginService, options.credentialToken);           // 121
    window.location = options.loginUrl;                                                 // 122
  } else {                                                                              // 123
    throw new Error('invalid login style');                                             // 124
  }                                                                                     // 125
};                                                                                      // 126
                                                                                        // 127
// XXX COMPAT WITH 0.7.0.1                                                              // 128
// Private interface but probably used by many oauth clients in atmosphere.             // 129
OAuth.initiateLogin = function (credentialToken, url, callback, dimensions) {           // 130
  OAuth.showPopup(                                                                      // 131
    url,                                                                                // 132
    _.bind(callback, null, credentialToken),                                            // 133
    dimensions                                                                          // 134
  );                                                                                    // 135
};                                                                                      // 136
                                                                                        // 137
// Called by the popup when the OAuth flow is completed, right before                   // 138
// the popup closes.                                                                    // 139
OAuth._handleCredentialSecret = function (credentialToken, secret) {                    // 140
  check(credentialToken, String);                                                       // 141
  check(secret, String);                                                                // 142
  if (! _.has(credentialSecrets,credentialToken)) {                                     // 143
    credentialSecrets[credentialToken] = secret;                                        // 144
  } else {                                                                              // 145
    throw new Error("Duplicate credential token from OAuth login");                     // 146
  }                                                                                     // 147
};                                                                                      // 148
                                                                                        // 149
// Used by accounts-oauth, which needs both a credentialToken and the                   // 150
// corresponding to credential secret to call the `login` method over DDP.              // 151
OAuth._retrieveCredentialSecret = function (credentialToken) {                          // 152
  // First check the secrets collected by OAuth._handleCredentialSecret,                // 153
  // then check localStorage. This matches what we do in                                // 154
  // end_of_login_response.html.                                                        // 155
  var secret = credentialSecrets[credentialToken];                                      // 156
  if (! secret) {                                                                       // 157
    var localStorageKey = OAuth._storageTokenPrefix + credentialToken;                  // 158
    secret = Meteor._localStorage.getItem(localStorageKey);                             // 159
    Meteor._localStorage.removeItem(localStorageKey);                                   // 160
  } else {                                                                              // 161
    delete credentialSecrets[credentialToken];                                          // 162
  }                                                                                     // 163
  return secret;                                                                        // 164
};                                                                                      // 165
                                                                                        // 166
//////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// packages/oauth/oauth_browser.js                                                      //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
// Browser specific code for the OAuth package.                                         // 1
                                                                                        // 2
// Open a popup window, centered on the screen, and call a callback when it             // 3
// closes.                                                                              // 4
//                                                                                      // 5
// @param url {String} url to show                                                      // 6
// @param callback {Function} Callback function to call on completion. Takes no         // 7
//   arguments.                                                                         // 8
// @param dimensions {optional Object(width, height)} The dimensions of                 // 9
//   the popup. If not passed defaults to something sane.                               // 10
OAuth.showPopup = function (url, callback, dimensions) {                                // 11
  // default dimensions that worked well for facebook and google                        // 12
  var popup = openCenteredPopup(                                                        // 13
    url,                                                                                // 14
    (dimensions && dimensions.width) || 650,                                            // 15
    (dimensions && dimensions.height) || 331                                            // 16
  );                                                                                    // 17
                                                                                        // 18
  var checkPopupOpen = setInterval(function() {                                         // 19
    try {                                                                               // 20
      // Fix for #328 - added a second test criteria (popup.closed === undefined)       // 21
      // to humour this Android quirk:                                                  // 22
      // http://code.google.com/p/android/issues/detail?id=21061                        // 23
      var popupClosed = popup.closed || popup.closed === undefined;                     // 24
    } catch (e) {                                                                       // 25
      // For some unknown reason, IE9 (and others?) sometimes (when                     // 26
      // the popup closes too quickly?) throws "SCRIPT16386: No such                    // 27
      // interface supported" when trying to read 'popup.closed'. Try                   // 28
      // again in 100ms.                                                                // 29
      return;                                                                           // 30
    }                                                                                   // 31
                                                                                        // 32
    if (popupClosed) {                                                                  // 33
      clearInterval(checkPopupOpen);                                                    // 34
      callback();                                                                       // 35
    }                                                                                   // 36
  }, 100);                                                                              // 37
};                                                                                      // 38
                                                                                        // 39
var openCenteredPopup = function(url, width, height) {                                  // 40
  var screenX = typeof window.screenX !== 'undefined'                                   // 41
        ? window.screenX : window.screenLeft;                                           // 42
  var screenY = typeof window.screenY !== 'undefined'                                   // 43
        ? window.screenY : window.screenTop;                                            // 44
  var outerWidth = typeof window.outerWidth !== 'undefined'                             // 45
        ? window.outerWidth : document.body.clientWidth;                                // 46
  var outerHeight = typeof window.outerHeight !== 'undefined'                           // 47
        ? window.outerHeight : (document.body.clientHeight - 22);                       // 48
  // XXX what is the 22?                                                                // 49
                                                                                        // 50
  // Use `outerWidth - width` and `outerHeight - height` for help in                    // 51
  // positioning the popup centered relative to the current window                      // 52
  var left = screenX + (outerWidth - width) / 2;                                        // 53
  var top = screenY + (outerHeight - height) / 2;                                       // 54
  var features = ('width=' + width + ',height=' + height +                              // 55
                  ',left=' + left + ',top=' + top + ',scrollbars=yes');                 // 56
                                                                                        // 57
  var newwindow = window.open(url, 'Login', features);                                  // 58
                                                                                        // 59
  if (typeof newwindow === 'undefined') {                                               // 60
    // blocked by a popup blocker maybe?                                                // 61
    var err = new Error("The login popup was blocked by the browser");                  // 62
    err.attemptedUrl = url;                                                             // 63
    throw err;                                                                          // 64
  }                                                                                     // 65
                                                                                        // 66
  if (newwindow.focus)                                                                  // 67
    newwindow.focus();                                                                  // 68
                                                                                        // 69
  return newwindow;                                                                     // 70
};                                                                                      // 71
//////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// packages/oauth/oauth_common.js                                                       //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
OAuth._storageTokenPrefix = "Meteor.oauth.credentialSecret-";                           // 1
                                                                                        // 2
OAuth._redirectUri = function (serviceName, config, params, absoluteUrlOptions) {       // 3
  // XXX COMPAT WITH 0.9.0                                                              // 4
  // The redirect URI used to have a "?close" query argument.  We                       // 5
  // detect whether we need to be backwards compatible by checking for                  // 6
  // the absence of the `loginStyle` field, which wasn't used in the                    // 7
  // code which had the "?close" argument.                                              // 8
  // This logic is duplicated in the tool so that the tool can do OAuth                 // 9
  // flow with <= 0.9.0 servers (tools/auth.js).                                        // 10
  var query = config.loginStyle ? null : "close";                                       // 11
                                                                                        // 12
  // Clone because we're going to mutate 'params'. The 'cordova' and                    // 13
  // 'android' parameters are only used for picking the host of the                     // 14
  // redirect URL, and not actually included in the redirect URL itself.                // 15
  var isCordova = false;                                                                // 16
  var isAndroid = false;                                                                // 17
  if (params) {                                                                         // 18
    params = _.clone(params);                                                           // 19
    isCordova = params.cordova;                                                         // 20
    isAndroid = params.android;                                                         // 21
    delete params.cordova;                                                              // 22
    delete params.android;                                                              // 23
    if (_.isEmpty(params)) {                                                            // 24
      params = undefined;                                                               // 25
    }                                                                                   // 26
  }                                                                                     // 27
                                                                                        // 28
  if (Meteor.isServer && isCordova) {                                                   // 29
    var rootUrl = process.env.MOBILE_ROOT_URL ||                                        // 30
          __meteor_runtime_config__.ROOT_URL;                                           // 31
                                                                                        // 32
    if (isAndroid) {                                                                    // 33
      // Match the replace that we do in cordova boilerplate                            // 34
      // (boilerplate-generator package).                                               // 35
      // XXX Maybe we should put this in a separate package or something                // 36
      // that is used here and by boilerplate-generator? Or maybe                       // 37
      // `Meteor.absoluteUrl` should know how to do this?                               // 38
      var url = Npm.require("url");                                                     // 39
      var parsedRootUrl = url.parse(rootUrl);                                           // 40
      if (parsedRootUrl.hostname === "localhost") {                                     // 41
        parsedRootUrl.hostname = "10.0.2.2";                                            // 42
        delete parsedRootUrl.host;                                                      // 43
      }                                                                                 // 44
      rootUrl = url.format(parsedRootUrl);                                              // 45
    }                                                                                   // 46
                                                                                        // 47
    absoluteUrlOptions = _.extend({}, absoluteUrlOptions, {                             // 48
      // For Cordova clients, redirect to the special Cordova root url                  // 49
      // (likely a local IP in development mode).                                       // 50
      rootUrl: rootUrl                                                                  // 51
    });                                                                                 // 52
  }                                                                                     // 53
                                                                                        // 54
  return URL._constructUrl(                                                             // 55
    Meteor.absoluteUrl('_oauth/' + serviceName, absoluteUrlOptions),                    // 56
    query,                                                                              // 57
    params);                                                                            // 58
};                                                                                      // 59
                                                                                        // 60
//////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// packages/oauth/deprecated.js                                                         //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
// XXX COMPAT WITH 0.8.0                                                                // 1
                                                                                        // 2
Oauth = OAuth;                                                                          // 3
                                                                                        // 4
//////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.oauth = {}, {
  OAuth: OAuth,
  Oauth: Oauth
});

})();
//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var _ = Package.underscore._;
var Random = Package.random.Random;
var check = Package.check.check;
var Match = Package.check.Match;
var Accounts = Package['accounts-base'].Accounts;
var OAuth = Package.oauth.OAuth;
var Oauth = Package.oauth.Oauth;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/accounts-oauth/oauth_common.js                                                      //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
Accounts.oauth = {};                                                                            // 1
                                                                                                // 2
var services = {};                                                                              // 3
                                                                                                // 4
// Helper for registering OAuth based accounts packages.                                        // 5
// On the server, adds an index to the user collection.                                         // 6
Accounts.oauth.registerService = function (name) {                                              // 7
  if (_.has(services, name))                                                                    // 8
    throw new Error("Duplicate service: " + name);                                              // 9
  services[name] = true;                                                                        // 10
                                                                                                // 11
  if (Meteor.server) {                                                                          // 12
    // Accounts.updateOrCreateUserFromExternalService does a lookup by this id,                 // 13
    // so this should be a unique index. You might want to add indexes for other                // 14
    // fields returned by your service (eg services.github.login) but you can do                // 15
    // that in your app.                                                                        // 16
    Meteor.users._ensureIndex('services.' + name + '.id',                                       // 17
                              {unique: 1, sparse: 1});                                          // 18
  }                                                                                             // 19
};                                                                                              // 20
                                                                                                // 21
// Removes a previously registered service.                                                     // 22
// This will disable logging in with this service, and serviceNames() will not                  // 23
// contain it.                                                                                  // 24
// It's worth noting that already logged in users will remain logged in unless                  // 25
// you manually expire their sessions.                                                          // 26
Accounts.oauth.unregisterService = function (name) {                                            // 27
  if (!_.has(services, name))                                                                   // 28
    throw new Error("Service not found: " + name);                                              // 29
  delete services[name];                                                                        // 30
};                                                                                              // 31
                                                                                                // 32
Accounts.oauth.serviceNames = function () {                                                     // 33
  return _.keys(services);                                                                      // 34
};                                                                                              // 35
                                                                                                // 36
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/accounts-oauth/oauth_client.js                                                      //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
// Documentation for Meteor.loginWithExternalService                                            // 1
                                                                                                // 2
/**                                                                                             // 3
 * @name loginWith<ExternalService>                                                             // 4
 * @memberOf Meteor                                                                             // 5
 * @function                                                                                    // 6
 * @summary Log the user in using an external service.                                          // 7
 * @locus Client                                                                                // 8
 * @param {Object} [options]                                                                    // 9
 * @param {String[]} options.requestPermissions A list of permissions to request from the user.
 * @param {Boolean} options.requestOfflineToken If true, asks the user for permission to act on their behalf when offline. This stores an additional offline token in the `services` field of the user document. Currently only supported with Google.
 * @param {Object} options.loginUrlParameters Provide additional parameters to the authentication URI. Currently only supported with Google. See [Google Identity Platform documentation](https://developers.google.com/identity/protocols/OpenIDConnect#authenticationuriparameters).
 * @param {String} options.loginHint An email address that the external service will use to pre-fill the login prompt. Currently only supported with Meteor developer accounts and Google accounts. If used with Google, the Google User ID can also be passed.
 * @param {String} options.loginStyle Login style ("popup" or "redirect", defaults to the login service configuration).  The "popup" style opens the login page in a separate popup window, which is generally preferred because the Meteor application doesn't need to be reloaded.  The "redirect" style redirects the Meteor application's window to the login page, and the login service provider redirects back to the Meteor application which is then reloaded.  The "redirect" style can be used in situations where a popup window can't be opened, such as in a mobile UIWebView.  The "redirect" style however relies on session storage which isn't available in Safari private mode, so the "popup" style will be forced if session storage can't be used.
 * @param {String} options.redirectUrl If using "redirect" login style, the user will be returned to this URL after authorisation has been completed.
 * @param {Function} [callback] Optional callback. Called with no arguments on success, or with a single `Error` argument on failure. The callback cannot be called if you are using the "redirect" `loginStyle`, because the app will have reloaded in the meantime; try using [client-side login hooks](#accounts_onlogin) instead.
 * @importFromPackage meteor                                                                    // 17
 */                                                                                             // 18
                                                                                                // 19
// Allow server to specify a specify subclass of errors. We should come                         // 20
// up with a more generic way to do this!                                                       // 21
var convertError = function (err) {                                                             // 22
  if (err && err instanceof Meteor.Error &&                                                     // 23
      err.error === Accounts.LoginCancelledError.numericError)                                  // 24
    return new Accounts.LoginCancelledError(err.reason);                                        // 25
  else                                                                                          // 26
    return err;                                                                                 // 27
};                                                                                              // 28
                                                                                                // 29
                                                                                                // 30
// For the redirect login flow, the final step is that we're                                    // 31
// redirected back to the application.  The credentialToken for this                            // 32
// login attempt is stored in the reload migration data, and the                                // 33
// credentialSecret for a successful login is stored in session                                 // 34
// storage.                                                                                     // 35
                                                                                                // 36
Meteor.startup(function () {                                                                    // 37
  var oauth = OAuth.getDataAfterRedirect();                                                     // 38
  if (! oauth)                                                                                  // 39
    return;                                                                                     // 40
                                                                                                // 41
  // We'll only have the credentialSecret if the login completed                                // 42
  // successfully.  However we still call the login method anyway to                            // 43
  // retrieve the error if the login was unsuccessful.                                          // 44
                                                                                                // 45
  var methodName = 'login';                                                                     // 46
  var methodArguments = [{oauth: _.pick(oauth, 'credentialToken', 'credentialSecret')}];        // 47
                                                                                                // 48
  Accounts.callLoginMethod({                                                                    // 49
    methodArguments: methodArguments,                                                           // 50
    userCallback: function (err) {                                                              // 51
      // The redirect login flow is complete.  Construct an                                     // 52
      // `attemptInfo` object with the login result, and report back                            // 53
      // to the code which initiated the login attempt                                          // 54
      // (e.g. accounts-ui, when that package is being used).                                   // 55
      err = convertError(err);                                                                  // 56
      Accounts._pageLoadLogin({                                                                 // 57
        type: oauth.loginService,                                                               // 58
        allowed: !err,                                                                          // 59
        error: err,                                                                             // 60
        methodName: methodName,                                                                 // 61
        methodArguments: methodArguments                                                        // 62
      });                                                                                       // 63
    }                                                                                           // 64
  });                                                                                           // 65
});                                                                                             // 66
                                                                                                // 67
                                                                                                // 68
// Send an OAuth login method to the server. If the user authorized                             // 69
// access in the popup this should log the user in, otherwise                                   // 70
// nothing should happen.                                                                       // 71
Accounts.oauth.tryLoginAfterPopupClosed = function(credentialToken, callback) {                 // 72
  var credentialSecret = OAuth._retrieveCredentialSecret(credentialToken) || null;              // 73
  Accounts.callLoginMethod({                                                                    // 74
    methodArguments: [{oauth: {                                                                 // 75
      credentialToken: credentialToken,                                                         // 76
      credentialSecret: credentialSecret                                                        // 77
    }}],                                                                                        // 78
    userCallback: callback && function (err) {                                                  // 79
      callback(convertError(err));                                                              // 80
    }});                                                                                        // 81
};                                                                                              // 82
                                                                                                // 83
Accounts.oauth.credentialRequestCompleteHandler = function(callback) {                          // 84
  return function (credentialTokenOrError) {                                                    // 85
    if(credentialTokenOrError && credentialTokenOrError instanceof Error) {                     // 86
      callback && callback(credentialTokenOrError);                                             // 87
    } else {                                                                                    // 88
      Accounts.oauth.tryLoginAfterPopupClosed(credentialTokenOrError, callback);                // 89
    }                                                                                           // 90
  };                                                                                            // 91
};                                                                                              // 92
                                                                                                // 93
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['accounts-oauth'] = {};

})();
/* Imports for global scope */

Mongo = Package.mongo.Mongo;
ReactiveVar = Package['reactive-var'].ReactiveVar;
$ = Package.jquery.$;
jQuery = Package.jquery.jQuery;
Tracker = Package.tracker.Tracker;
Deps = Package.tracker.Deps;
Meteor = Package.meteor.Meteor;
global = Package.meteor.global;
meteorEnv = Package.meteor.meteorEnv;
WebApp = Package.webapp.WebApp;
_ = Package.underscore._;
DDP = Package['ddp-client'].DDP;
LaunchScreen = Package['launch-screen'].LaunchScreen;
Blaze = Package.ui.Blaze;
UI = Package.ui.UI;
Handlebars = Package.ui.Handlebars;
Spacebars = Package.spacebars.Spacebars;
Template = Package['templating-runtime'].Template;
meteorInstall = Package.modules.meteorInstall;
Buffer = Package.modules.Buffer;
process = Package.modules.process;
Symbol = Package['ecmascript-runtime'].Symbol;
Map = Package['ecmascript-runtime'].Map;
Set = Package['ecmascript-runtime'].Set;
meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
Promise = Package.promise.Promise;
Accounts = Package['accounts-base'].Accounts;
Autoupdate = Package.autoupdate.Autoupdate;
Reload = Package.reload.Reload;
HTML = Package.htmljs.HTML;

