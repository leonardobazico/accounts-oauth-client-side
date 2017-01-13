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
var OAuth = Package.oauth.OAuth;
var Oauth = Package.oauth.Oauth;
var Template = Package['templating-runtime'].Template;
var Random = Package.random.Random;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var Facebook;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/facebook/template.facebook_configure.js                                                  //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
                                                                                                     // 1
Template.__checkName("configureLoginServiceDialogForFacebook");                                      // 2
Template["configureLoginServiceDialogForFacebook"] = new Template("Template.configureLoginServiceDialogForFacebook", (function() {
  var view = this;                                                                                   // 4
  return [ HTML.Raw("<p>\n    First, you'll need to register your app on Facebook. Follow these steps:\n  </p>\n  "), HTML.OL("\n    ", HTML.Raw('<li>\n      Visit <a href="https://developers.facebook.com/apps" target="_blank">https://developers.facebook.com/apps</a>\n    </li>'), "\n    ", HTML.Raw('<li>\n      Click "Add a New App".\n    </li>'), "\n    ", HTML.Raw('<li>\n      Select "Website" and type a name for your app.\n    </li>'), "\n    ", HTML.Raw('<li>\n      Click "Create New Facebook App ID".\n    </li>'), "\n    ", HTML.Raw('<li>\n      Select a category in the dropdown and click "Create App ID".\n    </li>'), "\n    ", HTML.LI('\n      Under "Tell us about your website", set Site URL to: ', HTML.SPAN({
    class: "url"                                                                                     // 6
  }, Blaze.View("lookup:siteUrl", function() {                                                       // 7
    return Spacebars.mustache(view.lookup("siteUrl"));                                               // 8
  })), ' and click "Next".\n    '), "\n    ", HTML.Raw('<li>\n      Click "Skip to Developer Dashboard".\n    </li>'), "\n    ", HTML.Raw('<li>\n      Go to the "Settings" tab and add an email address under "Contact Email". Click "Save Changes".\n    </li>'), "\n    ", HTML.Raw('<li>\n      Go to the "Status &amp; Review" tab and select Yes for "Do you want to make this app and\n      all its live features available to the general public?". Click "Confirm".\n    </li>'), "\n    ", HTML.Raw("<li>\n      Go back to the Dashboard tab.\n    </li>"), "\n  ") ];
}));                                                                                                 // 10
                                                                                                     // 11
///////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/facebook/facebook_configure.js                                                           //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
Template.configureLoginServiceDialogForFacebook.helpers({                                            // 1
  siteUrl: function () {                                                                             // 2
    return Meteor.absoluteUrl();                                                                     // 3
  }                                                                                                  // 4
});                                                                                                  // 5
                                                                                                     // 6
Template.configureLoginServiceDialogForFacebook.fields = function () {                               // 7
  return [                                                                                           // 8
    {property: 'appId', label: 'App ID'},                                                            // 9
    {property: 'secret', label: 'App Secret'}                                                        // 10
  ];                                                                                                 // 11
};                                                                                                   // 12
                                                                                                     // 13
///////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/facebook/facebook_client.js                                                              //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
Facebook = {};                                                                                       // 1
                                                                                                     // 2
// Request Facebook credentials for the user                                                         // 3
//                                                                                                   // 4
// @param options {optional}                                                                         // 5
// @param credentialRequestCompleteCallback {Function} Callback function to call on                  // 6
//   completion. Takes one argument, credentialToken on success, or Error on                         // 7
//   error.                                                                                          // 8
Facebook.requestCredential = function (options, credentialRequestCompleteCallback) {                 // 9
  // support both (options, callback) and (callback).                                                // 10
  if (!credentialRequestCompleteCallback && typeof options === 'function') {                         // 11
    credentialRequestCompleteCallback = options;                                                     // 12
    options = {};                                                                                    // 13
  }                                                                                                  // 14
                                                                                                     // 15
  var config = ServiceConfiguration.configurations.findOne({service: 'facebook'});                   // 16
  if (!config) {                                                                                     // 17
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(                          // 18
      new ServiceConfiguration.ConfigError());                                                       // 19
    return;                                                                                          // 20
  }                                                                                                  // 21
                                                                                                     // 22
  var credentialToken = Random.secret();                                                             // 23
  var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
  var display = mobile ? 'touch' : 'popup';                                                          // 25
                                                                                                     // 26
  var scope = "email";                                                                               // 27
  if (options && options.requestPermissions)                                                         // 28
    scope = options.requestPermissions.join(',');                                                    // 29
                                                                                                     // 30
  var loginStyle = OAuth._loginStyle('facebook', config, options);                                   // 31
                                                                                                     // 32
  var loginUrl =                                                                                     // 33
        'https://www.facebook.com/v2.2/dialog/oauth?client_id=' + config.appId +                     // 34
        '&redirect_uri=' + OAuth._redirectUri('facebook', config) +                                  // 35
        '&display=' + display + '&scope=' + scope +                                                  // 36
        '&state=' + OAuth._stateParam(loginStyle, credentialToken, options && options.redirectUrl);  // 37
                                                                                                     // 38
  // Handle authentication type (e.g. for force login you need authType: "reauthenticate")           // 39
  if (options && options.authType) {                                                                 // 40
    loginUrl += "&authType=" + encodeURIComponent(options.authType);                                 // 41
  }                                                                                                  // 42
                                                                                                     // 43
  OAuth.launchLogin({                                                                                // 44
    loginService: "facebook",                                                                        // 45
    loginStyle: loginStyle,                                                                          // 46
    loginUrl: loginUrl,                                                                              // 47
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,                            // 48
    credentialToken: credentialToken                                                                 // 49
  });                                                                                                // 50
};                                                                                                   // 51
                                                                                                     // 52
///////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.facebook = {}, {
  Facebook: Facebook
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
var Accounts = Package['accounts-base'].Accounts;
var Facebook = Package.facebook.Facebook;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/accounts-facebook/facebook.js                                                              //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
Accounts.oauth.registerService('facebook');                                                            // 1
                                                                                                       // 2
if (Meteor.isClient) {                                                                                 // 3
  Meteor.loginWithFacebook = function(options, callback) {                                             // 4
    // support a callback without options                                                              // 5
    if (! callback && typeof options === "function") {                                                 // 6
      callback = options;                                                                              // 7
      options = null;                                                                                  // 8
    }                                                                                                  // 9
                                                                                                       // 10
    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Facebook.requestCredential(options, credentialRequestCompleteCallback);                            // 12
  };                                                                                                   // 13
} else {                                                                                               // 14
  Accounts.addAutopublishFields({                                                                      // 15
    // publish all fields including access token, which can legitimately                               // 16
    // be used from the client (if transmitted over ssl or on                                          // 17
    // localhost). https://developers.facebook.com/docs/concepts/login/access-tokens-and-types/,       // 18
    // "Sharing of Access Tokens"                                                                      // 19
    forLoggedInUser: ['services.facebook'],                                                            // 20
    forOtherUsers: [                                                                                   // 21
      // https://www.facebook.com/help/167709519956542                                                 // 22
      'services.facebook.id', 'services.facebook.username', 'services.facebook.gender'                 // 23
    ]                                                                                                  // 24
  });                                                                                                  // 25
}                                                                                                      // 26
                                                                                                       // 27
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['accounts-facebook'] = {};

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

