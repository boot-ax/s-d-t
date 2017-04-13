/*! ngclipboard - v1.1.1 - 2016-02-26
* https://github.com/sachinchoolur/ngclipboard
* Copyright (c) 2016 Sachin; Licensed MIT */
(function() {
    'use strict';
    var MODULE_NAME = 'ngclipboard';
    var angular, Clipboard;
    
    // Check for CommonJS support
    if (typeof module === 'object' && module.exports) {
      angular = require('angular');
      Clipboard = require('clipboard');
      module.exports = MODULE_NAME;
    } else {
      angular = window.angular;
      Clipboard = window.Clipboard;
    }

    angular.module(MODULE_NAME, []).directive('ngclipboard', function() {
        return {
            restrict: 'A',
            scope: {
                ngclipboardSuccess: '&',
                ngclipboardError: '&'
            },
            link: function(scope, element) {
                var clipboard = new Clipboard(element[0]);

                clipboard.on('success', function(e) {
                  scope.$apply(function () {
                    scope.ngclipboardSuccess({
                      e: e
                    });
                  });
                });

                clipboard.on('error', function(e) {
                  scope.$apply(function () {
                    scope.ngclipboardError({
                      e: e
                    });
                  });
                });

            }
        };
    });
}());

/**
 * Satellizer 0.15.5
 * (c) 2016 Sahat Yalkabov
 * License: MIT
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.satellizer = factory());
}(this, function () { 'use strict';

    var Config = (function () {
        function Config() {
            this.baseUrl = '/';
            this.loginUrl = '/auth/login';
            this.signupUrl = '/auth/signup';
            this.unlinkUrl = '/auth/unlink/';
            this.tokenName = 'token';
            this.tokenPrefix = 'satellizer';
            this.tokenHeader = 'Authorization';
            this.tokenType = 'Bearer';
            this.storageType = 'localStorage';
            this.tokenRoot = null;
            this.withCredentials = false;
            this.providers = {
                facebook: {
                    name: 'facebook',
                    url: '/auth/facebook',
                    authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
                    redirectUri: window.location.origin + '/',
                    requiredUrlParams: ['display', 'scope'],
                    scope: ['email'],
                    scopeDelimiter: ',',
                    display: 'popup',
                    oauthType: '2.0',
                    popupOptions: { width: 580, height: 400 }
                },
                google: {
                    name: 'google',
                    url: '/auth/google',
                    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
                    redirectUri: window.location.origin,
                    requiredUrlParams: ['scope'],
                    optionalUrlParams: ['display', 'state'],
                    scope: ['profile', 'email'],
                    scopePrefix: 'openid',
                    scopeDelimiter: ' ',
                    display: 'popup',
                    oauthType: '2.0',
                    popupOptions: { width: 452, height: 633 },
                    state: function () { return encodeURIComponent(Math.random().toString(36).substr(2)); }
                },
                github: {
                    name: 'github',
                    url: '/auth/github',
                    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
                    redirectUri: window.location.origin,
                    optionalUrlParams: ['scope'],
                    scope: ['user:email'],
                    scopeDelimiter: ' ',
                    oauthType: '2.0',
                    popupOptions: { width: 1020, height: 618 }
                },
                instagram: {
                    name: 'instagram',
                    url: '/auth/instagram',
                    authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
                    redirectUri: window.location.origin,
                    requiredUrlParams: ['scope'],
                    scope: ['basic'],
                    scopeDelimiter: '+',
                    oauthType: '2.0'
                },
                linkedin: {
                    name: 'linkedin',
                    url: '/auth/linkedin',
                    authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
                    redirectUri: window.location.origin,
                    requiredUrlParams: ['state'],
                    scope: ['r_emailaddress'],
                    scopeDelimiter: ' ',
                    state: 'STATE',
                    oauthType: '2.0',
                    popupOptions: { width: 527, height: 582 }
                },
                twitter: {
                    name: 'twitter',
                    url: '/auth/twitter',
                    authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
                    redirectUri: window.location.origin,
                    oauthType: '1.0',
                    popupOptions: { width: 495, height: 645 }
                },
                twitch: {
                    name: 'twitch',
                    url: '/auth/twitch',
                    authorizationEndpoint: 'https://api.twitch.tv/kraken/oauth2/authorize',
                    redirectUri: window.location.origin,
                    requiredUrlParams: ['scope'],
                    scope: ['user_read'],
                    scopeDelimiter: ' ',
                    display: 'popup',
                    oauthType: '2.0',
                    popupOptions: { width: 500, height: 560 }
                },
                live: {
                    name: 'live',
                    url: '/auth/live',
                    authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
                    redirectUri: window.location.origin,
                    requiredUrlParams: ['display', 'scope'],
                    scope: ['wl.emails'],
                    scopeDelimiter: ' ',
                    display: 'popup',
                    oauthType: '2.0',
                    popupOptions: { width: 500, height: 560 }
                },
                yahoo: {
                    name: 'yahoo',
                    url: '/auth/yahoo',
                    authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
                    redirectUri: window.location.origin,
                    scope: [],
                    scopeDelimiter: ',',
                    oauthType: '2.0',
                    popupOptions: { width: 559, height: 519 }
                },
                bitbucket: {
                    name: 'bitbucket',
                    url: '/auth/bitbucket',
                    authorizationEndpoint: 'https://bitbucket.org/site/oauth2/authorize',
                    redirectUri: window.location.origin + '/',
                    requiredUrlParams: ['scope'],
                    scope: ['email'],
                    scopeDelimiter: ' ',
                    oauthType: '2.0',
                    popupOptions: { width: 1028, height: 529 }
                },
                spotify: {
                    name: 'spotify',
                    url: '/auth/spotify',
                    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
                    redirectUri: window.location.origin,
                    optionalUrlParams: ['state'],
                    requiredUrlParams: ['scope'],
                    scope: ['user-read-email'],
                    scopePrefix: '',
                    scopeDelimiter: ',',
                    oauthType: '2.0',
                    popupOptions: { width: 500, height: 530 },
                    state: function () { return encodeURIComponent(Math.random().toString(36).substr(2)); }
                }
            };
            this.httpInterceptor = function () { return true; };
        }
        Object.defineProperty(Config, "getConstant", {
            get: function () {
                return new Config();
            },
            enumerable: true,
            configurable: true
        });
        return Config;
    }());
    

    var AuthProvider = (function () {
        function AuthProvider(SatellizerConfig) {
            this.SatellizerConfig = SatellizerConfig;
        }
        Object.defineProperty(AuthProvider.prototype, "baseUrl", {
            get: function () { return this.SatellizerConfig.baseUrl; },
            set: function (value) { this.SatellizerConfig.baseUrl = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthProvider.prototype, "loginUrl", {
            get: function () { return this.SatellizerConfig.loginUrl; },
            set: function (value) { this.SatellizerConfig.loginUrl = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthProvider.prototype, "signupUrl", {
            get: function () { return this.SatellizerConfig.signupUrl; },
            set: function (value) { this.SatellizerConfig.signupUrl = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthProvider.prototype, "unlinkUrl", {
            get: function () { return this.SatellizerConfig.unlinkUrl; },
            set: function (value) { this.SatellizerConfig.unlinkUrl = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthProvider.prototype, "tokenRoot", {
            get: function () { return this.SatellizerConfig.tokenRoot; },
            set: function (value) { this.SatellizerConfig.tokenRoot = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthProvider.prototype, "tokenName", {
            get: function () { return this.SatellizerConfig.tokenName; },
            set: function (value) { this.SatellizerConfig.tokenName = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthProvider.prototype, "tokenPrefix", {
            get: function () { return this.SatellizerConfig.tokenPrefix; },
            set: function (value) { this.SatellizerConfig.tokenPrefix = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthProvider.prototype, "tokenHeader", {
            get: function () { return this.SatellizerConfig.tokenHeader; },
            set: function (value) { this.SatellizerConfig.tokenHeader = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthProvider.prototype, "tokenType", {
            get: function () { return this.SatellizerConfig.tokenType; },
            set: function (value) { this.SatellizerConfig.tokenType = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthProvider.prototype, "withCredentials", {
            get: function () { return this.SatellizerConfig.withCredentials; },
            set: function (value) { this.SatellizerConfig.withCredentials = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthProvider.prototype, "storageType", {
            get: function () { return this.SatellizerConfig.storageType; },
            set: function (value) { this.SatellizerConfig.storageType = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthProvider.prototype, "httpInterceptor", {
            get: function () { return this.SatellizerConfig.httpInterceptor; },
            set: function (value) {
                if (typeof value === 'function') {
                    this.SatellizerConfig.httpInterceptor = value;
                }
                else {
                    this.SatellizerConfig.httpInterceptor = function () { return value; };
                }
            },
            enumerable: true,
            configurable: true
        });
        AuthProvider.prototype.facebook = function (options) {
            angular.extend(this.SatellizerConfig.providers.facebook, options);
        };
        AuthProvider.prototype.google = function (options) {
            angular.extend(this.SatellizerConfig.providers.google, options);
        };
        AuthProvider.prototype.github = function (options) {
            angular.extend(this.SatellizerConfig.providers.github, options);
        };
        AuthProvider.prototype.instagram = function (options) {
            angular.extend(this.SatellizerConfig.providers.instagram, options);
        };
        AuthProvider.prototype.linkedin = function (options) {
            angular.extend(this.SatellizerConfig.providers.linkedin, options);
        };
        AuthProvider.prototype.twitter = function (options) {
            angular.extend(this.SatellizerConfig.providers.twitter, options);
        };
        AuthProvider.prototype.twitch = function (options) {
            angular.extend(this.SatellizerConfig.providers.twitch, options);
        };
        AuthProvider.prototype.live = function (options) {
            angular.extend(this.SatellizerConfig.providers.live, options);
        };
        AuthProvider.prototype.yahoo = function (options) {
            angular.extend(this.SatellizerConfig.providers.yahoo, options);
        };
        AuthProvider.prototype.bitbucket = function (options) {
            angular.extend(this.SatellizerConfig.providers.bitbucket, options);
        };
        AuthProvider.prototype.spotify = function (options) {
            angular.extend(this.SatellizerConfig.providers.spotify, options);
        };
        AuthProvider.prototype.oauth1 = function (options) {
            this.SatellizerConfig.providers[options.name] = angular.extend(options, {
                oauthType: '1.0'
            });
        };
        AuthProvider.prototype.oauth2 = function (options) {
            this.SatellizerConfig.providers[options.name] = angular.extend(options, {
                oauthType: '2.0'
            });
        };
        AuthProvider.prototype.$get = function (SatellizerShared, SatellizerLocal, SatellizerOAuth) {
            return {
                login: function (user, options) { return SatellizerLocal.login(user, options); },
                signup: function (user, options) { return SatellizerLocal.signup(user, options); },
                logout: function () { return SatellizerShared.logout(); },
                authenticate: function (name, data) { return SatellizerOAuth.authenticate(name, data); },
                link: function (name, data) { return SatellizerOAuth.authenticate(name, data); },
                unlink: function (name, options) { return SatellizerOAuth.unlink(name, options); },
                isAuthenticated: function () { return SatellizerShared.isAuthenticated(); },
                getPayload: function () { return SatellizerShared.getPayload(); },
                getToken: function () { return SatellizerShared.getToken(); },
                setToken: function (token) { return SatellizerShared.setToken({ access_token: token }); },
                removeToken: function () { return SatellizerShared.removeToken(); },
                setStorageType: function (type) { return SatellizerShared.setStorageType(type); }
            };
        };
        AuthProvider.$inject = ['SatellizerConfig'];
        return AuthProvider;
    }());
    AuthProvider.prototype.$get.$inject = ['SatellizerShared', 'SatellizerLocal', 'SatellizerOAuth'];

    function joinUrl(baseUrl, url) {
        if (/^(?:[a-z]+:)?\/\//i.test(url)) {
            return url;
        }
        var joined = [baseUrl, url].join('/');
        var normalize = function (str) {
            return str
                .replace(/[\/]+/g, '/')
                .replace(/\/\?/g, '?')
                .replace(/\/\#/g, '#')
                .replace(/\:\//g, '://');
        };
        return normalize(joined);
    }
    function getFullUrlPath(location) {
        var isHttps = location.protocol === 'https:';
        return location.protocol + '//' + location.hostname +
            ':' + (location.port || (isHttps ? '443' : '80')) +
            (/^\//.test(location.pathname) ? location.pathname : '/' + location.pathname);
    }
    function parseQueryString(str) {
        var obj = {};
        var key;
        var value;
        angular.forEach((str || '').split('&'), function (keyValue) {
            if (keyValue) {
                value = keyValue.split('=');
                key = decodeURIComponent(value[0]);
                obj[key] = angular.isDefined(value[1]) ? decodeURIComponent(value[1]) : true;
            }
        });
        return obj;
    }
    function decodeBase64(str) {
        var buffer;
        if (typeof module !== 'undefined' && module.exports) {
            try {
                buffer = require('buffer').Buffer;
            }
            catch (err) {
            }
        }
        var fromCharCode = String.fromCharCode;
        var re_btou = new RegExp([
            '[\xC0-\xDF][\x80-\xBF]',
            '[\xE0-\xEF][\x80-\xBF]{2}',
            '[\xF0-\xF7][\x80-\xBF]{3}'
        ].join('|'), 'g');
        var cb_btou = function (cccc) {
            switch (cccc.length) {
                case 4:
                    var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                        | ((0x3f & cccc.charCodeAt(1)) << 12)
                        | ((0x3f & cccc.charCodeAt(2)) << 6)
                        | (0x3f & cccc.charCodeAt(3));
                    var offset = cp - 0x10000;
                    return (fromCharCode((offset >>> 10) + 0xD800)
                        + fromCharCode((offset & 0x3FF) + 0xDC00));
                case 3:
                    return fromCharCode(((0x0f & cccc.charCodeAt(0)) << 12)
                        | ((0x3f & cccc.charCodeAt(1)) << 6)
                        | (0x3f & cccc.charCodeAt(2)));
                default:
                    return fromCharCode(((0x1f & cccc.charCodeAt(0)) << 6)
                        | (0x3f & cccc.charCodeAt(1)));
            }
        };
        var btou = function (b) {
            return b.replace(re_btou, cb_btou);
        };
        var _decode = buffer ? function (a) {
            return (a.constructor === buffer.constructor
                ? a : new buffer(a, 'base64')).toString();
        }
            : function (a) {
                return btou(atob(a));
            };
        return _decode(String(str).replace(/[-_]/g, function (m0) {
            return m0 === '-' ? '+' : '/';
        })
            .replace(/[^A-Za-z0-9\+\/]/g, ''));
    }

    var Shared = (function () {
        function Shared($q, $window, SatellizerConfig, SatellizerStorage) {
            this.$q = $q;
            this.$window = $window;
            this.SatellizerConfig = SatellizerConfig;
            this.SatellizerStorage = SatellizerStorage;
            var _a = this.SatellizerConfig, tokenName = _a.tokenName, tokenPrefix = _a.tokenPrefix;
            this.prefixedTokenName = tokenPrefix ? [tokenPrefix, tokenName].join('_') : tokenName;
        }
        Shared.prototype.getToken = function () {
            return this.SatellizerStorage.get(this.prefixedTokenName);
        };
        Shared.prototype.getPayload = function () {
            var token = this.SatellizerStorage.get(this.prefixedTokenName);
            if (token && token.split('.').length === 3) {
                try {
                    var base64Url = token.split('.')[1];
                    var base64 = base64Url.replace('-', '+').replace('_', '/');
                    return JSON.parse(decodeBase64(base64));
                }
                catch (e) {
                }
            }
        };
        Shared.prototype.setToken = function (response) {
            var tokenRoot = this.SatellizerConfig.tokenRoot;
            var tokenName = this.SatellizerConfig.tokenName;
            var accessToken = response && response.access_token;
            var token;
            if (accessToken) {
                if (angular.isObject(accessToken) && angular.isObject(accessToken.data)) {
                    response = accessToken;
                }
                else if (angular.isString(accessToken)) {
                    token = accessToken;
                }
            }
            if (!token && response) {
                var tokenRootData = tokenRoot && tokenRoot.split('.').reduce(function (o, x) { return o[x]; }, response.data);
                token = tokenRootData ? tokenRootData[tokenName] : response.data && response.data[tokenName];
            }
            if (token) {
                this.SatellizerStorage.set(this.prefixedTokenName, token);
            }
        };
        Shared.prototype.removeToken = function () {
            this.SatellizerStorage.remove(this.prefixedTokenName);
        };
        Shared.prototype.isAuthenticated = function () {
            var token = this.SatellizerStorage.get(this.prefixedTokenName);
            if (token) {
                if (token.split('.').length === 3) {
                    try {
                        var base64Url = token.split('.')[1];
                        var base64 = base64Url.replace('-', '+').replace('_', '/');
                        var exp = JSON.parse(this.$window.atob(base64)).exp;
                        if (typeof exp === 'number') {
                            return Math.round(new Date().getTime() / 1000) < exp;
                        }
                    }
                    catch (e) {
                        return true; // Pass: Non-JWT token that looks like JWT
                    }
                }
                return true; // Pass: All other tokens
            }
            return false; // Fail: No token at all
        };
        Shared.prototype.logout = function () {
            this.SatellizerStorage.remove(this.prefixedTokenName);
            return this.$q.when();
        };
        Shared.prototype.setStorageType = function (type) {
            this.SatellizerConfig.storageType = type;
        };
        Shared.$inject = ['$q', '$window', 'SatellizerConfig', 'SatellizerStorage'];
        return Shared;
    }());

    var Local = (function () {
        function Local($http, SatellizerConfig, SatellizerShared) {
            this.$http = $http;
            this.SatellizerConfig = SatellizerConfig;
            this.SatellizerShared = SatellizerShared;
        }
        Local.prototype.login = function (user, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            options.url = options.url ? options.url : joinUrl(this.SatellizerConfig.baseUrl, this.SatellizerConfig.loginUrl);
            options.data = user || options.data;
            options.method = options.method || 'POST';
            options.withCredentials = options.withCredentials || this.SatellizerConfig.withCredentials;
            return this.$http(options).then(function (response) {
                _this.SatellizerShared.setToken(response);
                return response;
            });
        };
        Local.prototype.signup = function (user, options) {
            if (options === void 0) { options = {}; }
            options.url = options.url ? options.url : joinUrl(this.SatellizerConfig.baseUrl, this.SatellizerConfig.signupUrl);
            options.data = user || options.data;
            options.method = options.method || 'POST';
            options.withCredentials = options.withCredentials || this.SatellizerConfig.withCredentials;
            return this.$http(options);
        };
        Local.$inject = ['$http', 'SatellizerConfig', 'SatellizerShared'];
        return Local;
    }());

    var Popup = (function () {
        function Popup($interval, $window, $q) {
            this.$interval = $interval;
            this.$window = $window;
            this.$q = $q;
            this.popup = null;
            this.defaults = {
                redirectUri: null
            };
        }
        Popup.prototype.stringifyOptions = function (options) {
            var parts = [];
            angular.forEach(options, function (value, key) {
                parts.push(key + '=' + value);
            });
            return parts.join(',');
        };
        Popup.prototype.open = function (url, name, popupOptions, redirectUri, dontPoll) {
            var width = popupOptions.width || 500;
            var height = popupOptions.height || 500;
            var options = this.stringifyOptions({
                width: width,
                height: height,
                top: this.$window.screenY + ((this.$window.outerHeight - height) / 2.5),
                left: this.$window.screenX + ((this.$window.outerWidth - width) / 2)
            });
            var popupName = this.$window['cordova'] || this.$window.navigator.userAgent.indexOf('CriOS') > -1 ? '_blank' : name;
            this.popup = this.$window.open(url, popupName, options);
            if (this.popup && this.popup.focus) {
                this.popup.focus();
            }
            if (dontPoll) {
                return;
            }
            if (this.$window['cordova']) {
                return this.eventListener(redirectUri);
            }
            else {
                if (url === 'about:blank') {
                    this.popup.location = url;
                }
                return this.polling(redirectUri);
            }
        };
        Popup.prototype.polling = function (redirectUri) {
            var _this = this;
            return this.$q(function (resolve, reject) {
                var redirectUriParser = document.createElement('a');
                redirectUriParser.href = redirectUri;
                var redirectUriPath = getFullUrlPath(redirectUriParser);
                var polling = _this.$interval(function () {
                    if (!_this.popup || _this.popup.closed || _this.popup.closed === undefined) {
                        _this.$interval.cancel(polling);
                        reject(new Error('The popup window was closed'));
                    }
                    try {
                        var popupWindowPath = getFullUrlPath(_this.popup.location);
                        if (popupWindowPath === redirectUriPath) {
                            if (_this.popup.location.search || _this.popup.location.hash) {
                                var query = parseQueryString(_this.popup.location.search.substring(1).replace(/\/$/, ''));
                                var hash = parseQueryString(_this.popup.location.hash.substring(1).replace(/[\/$]/, ''));
                                var params = angular.extend({}, query, hash);
                                if (params.error) {
                                    reject(new Error(params.error));
                                }
                                else {
                                    resolve(params);
                                }
                            }
                            else {
                                reject(new Error('OAuth redirect has occurred but no query or hash parameters were found. ' +
                                    'They were either not set during the redirect, or were removed—typically by a ' +
                                    'routing library—before Satellizer could read it.'));
                            }
                            _this.$interval.cancel(polling);
                            _this.popup.close();
                        }
                    }
                    catch (error) {
                    }
                }, 500);
            });
        };
        Popup.prototype.eventListener = function (redirectUri) {
            var _this = this;
            return this.$q(function (resolve, reject) {
                _this.popup.addEventListener('loadstart', function (event) {
                    if (event.url.indexOf(redirectUri) !== 0) {
                        return;
                    }
                    var parser = document.createElement('a');
                    parser.href = event.url;
                    if (parser.search || parser.hash) {
                        var query = parseQueryString(parser.search.substring(1).replace(/\/$/, ''));
                        var hash = parseQueryString(parser.hash.substring(1).replace(/[\/$]/, ''));
                        var params = angular.extend({}, query, hash);
                        if (params.error) {
                            reject(new Error(params.error));
                        }
                        else {
                            resolve(params);
                        }
                        _this.popup.close();
                    }
                });
                _this.popup.addEventListener('loaderror', function () {
                    reject(new Error('Authorization failed'));
                });
                _this.popup.addEventListener('exit', function () {
                    reject(new Error('The popup window was closed'));
                });
            });
        };
        Popup.$inject = ['$interval', '$window', '$q'];
        return Popup;
    }());

    var OAuth1 = (function () {
        function OAuth1($http, $window, SatellizerConfig, SatellizerPopup) {
            this.$http = $http;
            this.$window = $window;
            this.SatellizerConfig = SatellizerConfig;
            this.SatellizerPopup = SatellizerPopup;
            this.defaults = {
                name: null,
                url: null,
                authorizationEndpoint: null,
                scope: null,
                scopePrefix: null,
                scopeDelimiter: null,
                redirectUri: null,
                requiredUrlParams: null,
                defaultUrlParams: null,
                oauthType: '1.0',
                popupOptions: { width: null, height: null }
            };
        }
        ;
        OAuth1.prototype.init = function (options, userData) {
            var _this = this;
            angular.extend(this.defaults, options);
            var name = options.name, popupOptions = options.popupOptions;
            var redirectUri = this.defaults.redirectUri;
            // Should open an empty popup and wait until request token is received
            if (!this.$window['cordova']) {
                this.SatellizerPopup.open('about:blank', name, popupOptions, redirectUri, true);
            }
            return this.getRequestToken().then(function (response) {
                return _this.openPopup(options, response).then(function (popupResponse) {
                    return _this.exchangeForToken(popupResponse, userData);
                });
            });
        };
        OAuth1.prototype.openPopup = function (options, response) {
            var url = [options.authorizationEndpoint, this.buildQueryString(response.data)].join('?');
            var redirectUri = this.defaults.redirectUri;
            if (this.$window['cordova']) {
                return this.SatellizerPopup.open(url, options.name, options.popupOptions, redirectUri);
            }
            else {
                this.SatellizerPopup.popup.location = url;
                return this.SatellizerPopup.polling(redirectUri);
            }
        };
        OAuth1.prototype.getRequestToken = function () {
            var url = this.SatellizerConfig.baseUrl ? joinUrl(this.SatellizerConfig.baseUrl, this.defaults.url) : this.defaults.url;
            return this.$http.post(url, this.defaults);
        };
        OAuth1.prototype.exchangeForToken = function (oauthData, userData) {
            var payload = angular.extend({}, userData, oauthData);
            var exchangeForTokenUrl = this.SatellizerConfig.baseUrl ? joinUrl(this.SatellizerConfig.baseUrl, this.defaults.url) : this.defaults.url;
            return this.$http.post(exchangeForTokenUrl, payload, { withCredentials: this.SatellizerConfig.withCredentials });
        };
        OAuth1.prototype.buildQueryString = function (obj) {
            var str = [];
            angular.forEach(obj, function (value, key) {
                str.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
            });
            return str.join('&');
        };
        OAuth1.$inject = ['$http', '$window', 'SatellizerConfig', 'SatellizerPopup'];
        return OAuth1;
    }());

    var OAuth2 = (function () {
        function OAuth2($http, $window, $timeout, $q, SatellizerConfig, SatellizerPopup, SatellizerStorage) {
            this.$http = $http;
            this.$window = $window;
            this.$timeout = $timeout;
            this.$q = $q;
            this.SatellizerConfig = SatellizerConfig;
            this.SatellizerPopup = SatellizerPopup;
            this.SatellizerStorage = SatellizerStorage;
            this.defaults = {
                name: null,
                url: null,
                clientId: null,
                authorizationEndpoint: null,
                redirectUri: null,
                scope: null,
                scopePrefix: null,
                scopeDelimiter: null,
                state: null,
                requiredUrlParams: null,
                defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
                responseType: 'code',
                responseParams: {
                    code: 'code',
                    clientId: 'clientId',
                    redirectUri: 'redirectUri'
                },
                oauthType: '2.0',
                popupOptions: { width: null, height: null }
            };
        }
        OAuth2.camelCase = function (name) {
            return name.replace(/([\:\-\_]+(.))/g, function (_, separator, letter, offset) {
                return offset ? letter.toUpperCase() : letter;
            });
        };
        OAuth2.prototype.init = function (options, userData) {
            var _this = this;
            return this.$q(function (resolve, reject) {
                angular.extend(_this.defaults, options);
                var stateName = _this.defaults.name + '_state';
                var _a = _this.defaults, name = _a.name, state = _a.state, popupOptions = _a.popupOptions, redirectUri = _a.redirectUri, responseType = _a.responseType;
                if (typeof state === 'function') {
                    _this.SatellizerStorage.set(stateName, state());
                }
                else if (typeof state === 'string') {
                    _this.SatellizerStorage.set(stateName, state);
                }
                var url = [_this.defaults.authorizationEndpoint, _this.buildQueryString()].join('?');
                _this.SatellizerPopup.open(url, name, popupOptions, redirectUri).then(function (oauth) {
                    if (responseType === 'token' || !url) {
                        return resolve(oauth);
                    }
                    if (oauth.state && oauth.state !== _this.SatellizerStorage.get(stateName)) {
                        return reject(new Error('The value returned in the state parameter does not match the state value from your original ' +
                            'authorization code request.'));
                    }
                    resolve(_this.exchangeForToken(oauth, userData));
                }).catch(function (error) { return reject(error); });
            });
        };
        OAuth2.prototype.exchangeForToken = function (oauthData, userData) {
            var _this = this;
            var payload = angular.extend({}, userData);
            angular.forEach(this.defaults.responseParams, function (value, key) {
                switch (key) {
                    case 'code':
                        payload[value] = oauthData.code;
                        break;
                    case 'clientId':
                        payload[value] = _this.defaults.clientId;
                        break;
                    case 'redirectUri':
                        payload[value] = _this.defaults.redirectUri;
                        break;
                    default:
                        payload[value] = oauthData[key];
                }
            });
            if (oauthData.state) {
                payload.state = oauthData.state;
            }
            var exchangeForTokenUrl = this.SatellizerConfig.baseUrl ?
                joinUrl(this.SatellizerConfig.baseUrl, this.defaults.url) :
                this.defaults.url;
            return this.$http.post(exchangeForTokenUrl, payload, { withCredentials: this.SatellizerConfig.withCredentials });
        };
        OAuth2.prototype.buildQueryString = function () {
            var _this = this;
            var keyValuePairs = [];
            var urlParamsCategories = ['defaultUrlParams', 'requiredUrlParams', 'optionalUrlParams'];
            angular.forEach(urlParamsCategories, function (paramsCategory) {
                angular.forEach(_this.defaults[paramsCategory], function (paramName) {
                    var camelizedName = OAuth2.camelCase(paramName);
                    var paramValue = angular.isFunction(_this.defaults[paramName]) ? _this.defaults[paramName]() : _this.defaults[camelizedName];
                    if (paramName === 'redirect_uri' && !paramValue) {
                        return;
                    }
                    if (paramName === 'state') {
                        var stateName = _this.defaults.name + '_state';
                        paramValue = encodeURIComponent(_this.SatellizerStorage.get(stateName));
                    }
                    if (paramName === 'scope' && Array.isArray(paramValue)) {
                        paramValue = paramValue.join(_this.defaults.scopeDelimiter);
                        if (_this.defaults.scopePrefix) {
                            paramValue = [_this.defaults.scopePrefix, paramValue].join(_this.defaults.scopeDelimiter);
                        }
                    }
                    keyValuePairs.push([paramName, paramValue]);
                });
            });
            return keyValuePairs.map(function (pair) { return pair.join('='); }).join('&');
        };
        OAuth2.$inject = ['$http', '$window', '$timeout', '$q', 'SatellizerConfig', 'SatellizerPopup', 'SatellizerStorage'];
        return OAuth2;
    }());

    var OAuth = (function () {
        function OAuth($http, $window, $timeout, $q, SatellizerConfig, SatellizerPopup, SatellizerStorage, SatellizerShared, SatellizerOAuth1, SatellizerOAuth2) {
            this.$http = $http;
            this.$window = $window;
            this.$timeout = $timeout;
            this.$q = $q;
            this.SatellizerConfig = SatellizerConfig;
            this.SatellizerPopup = SatellizerPopup;
            this.SatellizerStorage = SatellizerStorage;
            this.SatellizerShared = SatellizerShared;
            this.SatellizerOAuth1 = SatellizerOAuth1;
            this.SatellizerOAuth2 = SatellizerOAuth2;
        }
        OAuth.prototype.authenticate = function (name, userData) {
            var _this = this;
            return this.$q(function (resolve, reject) {
                var provider = _this.SatellizerConfig.providers[name];
                var oauth = null;
                switch (provider.oauthType) {
                    case '1.0':
                        oauth = new OAuth1(_this.$http, _this.$window, _this.SatellizerConfig, _this.SatellizerPopup);
                        break;
                    case '2.0':
                        oauth = new OAuth2(_this.$http, _this.$window, _this.$timeout, _this.$q, _this.SatellizerConfig, _this.SatellizerPopup, _this.SatellizerStorage);
                        break;
                    default:
                        return reject(new Error('Invalid OAuth Type'));
                }
                return oauth.init(provider, userData).then(function (response) {
                    if (provider.url) {
                        _this.SatellizerShared.setToken(response);
                    }
                    resolve(response);
                }).catch(function (error) {
                    reject(error);
                });
            });
        };
        OAuth.prototype.unlink = function (provider, httpOptions) {
            if (httpOptions === void 0) { httpOptions = {}; }
            httpOptions.url = httpOptions.url ? httpOptions.url : joinUrl(this.SatellizerConfig.baseUrl, this.SatellizerConfig.unlinkUrl);
            httpOptions.data = { provider: provider } || httpOptions.data;
            httpOptions.method = httpOptions.method || 'POST';
            httpOptions.withCredentials = httpOptions.withCredentials || this.SatellizerConfig.withCredentials;
            return this.$http(httpOptions);
        };
        OAuth.$inject = [
            '$http',
            '$window',
            '$timeout',
            '$q',
            'SatellizerConfig',
            'SatellizerPopup',
            'SatellizerStorage',
            'SatellizerShared',
            'SatellizerOAuth1',
            'SatellizerOAuth2'
        ];
        return OAuth;
    }());

    var Storage = (function () {
        function Storage($window, SatellizerConfig) {
            this.$window = $window;
            this.SatellizerConfig = SatellizerConfig;
            this.memoryStore = {};
        }
        Storage.prototype.get = function (key) {
            try {
                return this.$window[this.SatellizerConfig.storageType].getItem(key);
            }
            catch (e) {
                return this.memoryStore[key];
            }
        };
        Storage.prototype.set = function (key, value) {
            try {
                this.$window[this.SatellizerConfig.storageType].setItem(key, value);
            }
            catch (e) {
                this.memoryStore[key] = value;
            }
        };
        Storage.prototype.remove = function (key) {
            try {
                this.$window[this.SatellizerConfig.storageType].removeItem(key);
            }
            catch (e) {
                delete this.memoryStore[key];
            }
        };
        Storage.$inject = ['$window', 'SatellizerConfig'];
        return Storage;
    }());

    var Interceptor = (function () {
        function Interceptor(SatellizerConfig, SatellizerShared, SatellizerStorage) {
            var _this = this;
            this.SatellizerConfig = SatellizerConfig;
            this.SatellizerShared = SatellizerShared;
            this.SatellizerStorage = SatellizerStorage;
            this.request = function (config) {
                if (config['skipAuthorization']) {
                    return config;
                }
                if (_this.SatellizerShared.isAuthenticated() && _this.SatellizerConfig.httpInterceptor()) {
                    var tokenName = _this.SatellizerConfig.tokenPrefix ?
                        [_this.SatellizerConfig.tokenPrefix, _this.SatellizerConfig.tokenName].join('_') : _this.SatellizerConfig.tokenName;
                    var token = _this.SatellizerStorage.get(tokenName);
                    if (_this.SatellizerConfig.tokenHeader && _this.SatellizerConfig.tokenType) {
                        token = _this.SatellizerConfig.tokenType + ' ' + token;
                    }
                    config.headers[_this.SatellizerConfig.tokenHeader] = token;
                }
                return config;
            };
        }
        Interceptor.Factory = function (SatellizerConfig, SatellizerShared, SatellizerStorage) {
            return new Interceptor(SatellizerConfig, SatellizerShared, SatellizerStorage);
        };
        Interceptor.$inject = ['SatellizerConfig', 'SatellizerShared', 'SatellizerStorage'];
        return Interceptor;
    }());
    Interceptor.Factory.$inject = ['SatellizerConfig', 'SatellizerShared', 'SatellizerStorage'];

    var HttpProviderConfig = (function () {
        function HttpProviderConfig($httpProvider) {
            this.$httpProvider = $httpProvider;
            $httpProvider.interceptors.push(Interceptor.Factory);
        }
        HttpProviderConfig.$inject = ['$httpProvider'];
        return HttpProviderConfig;
    }());

    angular.module('satellizer', [])
        .provider('$auth', ['SatellizerConfig', function (SatellizerConfig) { return new AuthProvider(SatellizerConfig); }])
        .constant('SatellizerConfig', Config.getConstant)
        .service('SatellizerShared', Shared)
        .service('SatellizerLocal', Local)
        .service('SatellizerPopup', Popup)
        .service('SatellizerOAuth', OAuth)
        .service('SatellizerOAuth2', OAuth2)
        .service('SatellizerOAuth1', OAuth1)
        .service('SatellizerStorage', Storage)
        .service('SatellizerInterceptor', Interceptor)
        .config(['$httpProvider', function ($httpProvider) { return new HttpProviderConfig($httpProvider); }]);
    var ng1 = 'satellizer';

    return ng1;

}));
//# sourceMappingURL=satellizer.js.map

/**
 * State-based routing for AngularJS
 * @version v0.4.2
 * @link http://angular-ui.github.com/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = 'ui.router';
}

(function (window, angular, undefined) {
/*jshint globalstrict:true*/
/*global angular:false*/
'use strict';

var isDefined = angular.isDefined,
    isFunction = angular.isFunction,
    isString = angular.isString,
    isObject = angular.isObject,
    isArray = angular.isArray,
    forEach = angular.forEach,
    extend = angular.extend,
    copy = angular.copy,
    toJson = angular.toJson;

function inherit(parent, extra) {
  return extend(new (extend(function() {}, { prototype: parent }))(), extra);
}

function merge(dst) {
  forEach(arguments, function(obj) {
    if (obj !== dst) {
      forEach(obj, function(value, key) {
        if (!dst.hasOwnProperty(key)) dst[key] = value;
      });
    }
  });
  return dst;
}

/**
 * Finds the common ancestor path between two states.
 *
 * @param {Object} first The first state.
 * @param {Object} second The second state.
 * @return {Array} Returns an array of state names in descending order, not including the root.
 */
function ancestors(first, second) {
  var path = [];

  for (var n in first.path) {
    if (first.path[n] !== second.path[n]) break;
    path.push(first.path[n]);
  }
  return path;
}

/**
 * IE8-safe wrapper for `Object.keys()`.
 *
 * @param {Object} object A JavaScript object.
 * @return {Array} Returns the keys of the object as an array.
 */
function objectKeys(object) {
  if (Object.keys) {
    return Object.keys(object);
  }
  var result = [];

  forEach(object, function(val, key) {
    result.push(key);
  });
  return result;
}

/**
 * IE8-safe wrapper for `Array.prototype.indexOf()`.
 *
 * @param {Array} array A JavaScript array.
 * @param {*} value A value to search the array for.
 * @return {Number} Returns the array index value of `value`, or `-1` if not present.
 */
function indexOf(array, value) {
  if (Array.prototype.indexOf) {
    return array.indexOf(value, Number(arguments[2]) || 0);
  }
  var len = array.length >>> 0, from = Number(arguments[2]) || 0;
  from = (from < 0) ? Math.ceil(from) : Math.floor(from);

  if (from < 0) from += len;

  for (; from < len; from++) {
    if (from in array && array[from] === value) return from;
  }
  return -1;
}

/**
 * Merges a set of parameters with all parameters inherited between the common parents of the
 * current state and a given destination state.
 *
 * @param {Object} currentParams The value of the current state parameters ($stateParams).
 * @param {Object} newParams The set of parameters which will be composited with inherited params.
 * @param {Object} $current Internal definition of object representing the current state.
 * @param {Object} $to Internal definition of object representing state to transition to.
 */
function inheritParams(currentParams, newParams, $current, $to) {
  var parents = ancestors($current, $to), parentParams, inherited = {}, inheritList = [];

  for (var i in parents) {
    if (!parents[i] || !parents[i].params) continue;
    parentParams = objectKeys(parents[i].params);
    if (!parentParams.length) continue;

    for (var j in parentParams) {
      if (indexOf(inheritList, parentParams[j]) >= 0) continue;
      inheritList.push(parentParams[j]);
      inherited[parentParams[j]] = currentParams[parentParams[j]];
    }
  }
  return extend({}, inherited, newParams);
}

/**
 * Performs a non-strict comparison of the subset of two objects, defined by a list of keys.
 *
 * @param {Object} a The first object.
 * @param {Object} b The second object.
 * @param {Array} keys The list of keys within each object to compare. If the list is empty or not specified,
 *                     it defaults to the list of keys in `a`.
 * @return {Boolean} Returns `true` if the keys match, otherwise `false`.
 */
function equalForKeys(a, b, keys) {
  if (!keys) {
    keys = [];
    for (var n in a) keys.push(n); // Used instead of Object.keys() for IE8 compatibility
  }

  for (var i=0; i<keys.length; i++) {
    var k = keys[i];
    if (a[k] != b[k]) return false; // Not '===', values aren't necessarily normalized
  }
  return true;
}

/**
 * Returns the subset of an object, based on a list of keys.
 *
 * @param {Array} keys
 * @param {Object} values
 * @return {Boolean} Returns a subset of `values`.
 */
function filterByKeys(keys, values) {
  var filtered = {};

  forEach(keys, function (name) {
    filtered[name] = values[name];
  });
  return filtered;
}

// like _.indexBy
// when you know that your index values will be unique, or you want last-one-in to win
function indexBy(array, propName) {
  var result = {};
  forEach(array, function(item) {
    result[item[propName]] = item;
  });
  return result;
}

// extracted from underscore.js
// Return a copy of the object only containing the whitelisted properties.
function pick(obj) {
  var copy = {};
  var keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
  forEach(keys, function(key) {
    if (key in obj) copy[key] = obj[key];
  });
  return copy;
}

// extracted from underscore.js
// Return a copy of the object omitting the blacklisted properties.
function omit(obj) {
  var copy = {};
  var keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
  for (var key in obj) {
    if (indexOf(keys, key) == -1) copy[key] = obj[key];
  }
  return copy;
}

function pluck(collection, key) {
  var result = isArray(collection) ? [] : {};

  forEach(collection, function(val, i) {
    result[i] = isFunction(key) ? key(val) : val[key];
  });
  return result;
}

function filter(collection, callback) {
  var array = isArray(collection);
  var result = array ? [] : {};
  forEach(collection, function(val, i) {
    if (callback(val, i)) {
      result[array ? result.length : i] = val;
    }
  });
  return result;
}

function map(collection, callback) {
  var result = isArray(collection) ? [] : {};

  forEach(collection, function(val, i) {
    result[i] = callback(val, i);
  });
  return result;
}

// issue #2676 #2889
function silenceUncaughtInPromise (promise) {
  return promise.then(undefined, function() {}) && promise;
}

/**
 * @ngdoc overview
 * @name ui.router.util
 *
 * @description
 * # ui.router.util sub-module
 *
 * This module is a dependency of other sub-modules. Do not include this module as a dependency
 * in your angular app (use {@link ui.router} module instead).
 *
 */
angular.module('ui.router.util', ['ng']);

/**
 * @ngdoc overview
 * @name ui.router.router
 * 
 * @requires ui.router.util
 *
 * @description
 * # ui.router.router sub-module
 *
 * This module is a dependency of other sub-modules. Do not include this module as a dependency
 * in your angular app (use {@link ui.router} module instead).
 */
angular.module('ui.router.router', ['ui.router.util']);

/**
 * @ngdoc overview
 * @name ui.router.state
 * 
 * @requires ui.router.router
 * @requires ui.router.util
 *
 * @description
 * # ui.router.state sub-module
 *
 * This module is a dependency of the main ui.router module. Do not include this module as a dependency
 * in your angular app (use {@link ui.router} module instead).
 * 
 */
angular.module('ui.router.state', ['ui.router.router', 'ui.router.util']);

/**
 * @ngdoc overview
 * @name ui.router
 *
 * @requires ui.router.state
 *
 * @description
 * # ui.router
 * 
 * ## The main module for ui.router 
 * There are several sub-modules included with the ui.router module, however only this module is needed
 * as a dependency within your angular app. The other modules are for organization purposes. 
 *
 * The modules are:
 * * ui.router - the main "umbrella" module
 * * ui.router.router - 
 * 
 * *You'll need to include **only** this module as the dependency within your angular app.*
 * 
 * <pre>
 * <!doctype html>
 * <html ng-app="myApp">
 * <head>
 *   <script src="js/angular.js"></script>
 *   <!-- Include the ui-router script -->
 *   <script src="js/angular-ui-router.min.js"></script>
 *   <script>
 *     // ...and add 'ui.router' as a dependency
 *     var myApp = angular.module('myApp', ['ui.router']);
 *   </script>
 * </head>
 * <body>
 * </body>
 * </html>
 * </pre>
 */
angular.module('ui.router', ['ui.router.state']);

angular.module('ui.router.compat', ['ui.router']);

/**
 * @ngdoc object
 * @name ui.router.util.$resolve
 *
 * @requires $q
 * @requires $injector
 *
 * @description
 * Manages resolution of (acyclic) graphs of promises.
 */
$Resolve.$inject = ['$q', '$injector'];
function $Resolve(  $q,    $injector) {
  
  var VISIT_IN_PROGRESS = 1,
      VISIT_DONE = 2,
      NOTHING = {},
      NO_DEPENDENCIES = [],
      NO_LOCALS = NOTHING,
      NO_PARENT = extend($q.when(NOTHING), { $$promises: NOTHING, $$values: NOTHING });
  

  /**
   * @ngdoc function
   * @name ui.router.util.$resolve#study
   * @methodOf ui.router.util.$resolve
   *
   * @description
   * Studies a set of invocables that are likely to be used multiple times.
   * <pre>
   * $resolve.study(invocables)(locals, parent, self)
   * </pre>
   * is equivalent to
   * <pre>
   * $resolve.resolve(invocables, locals, parent, self)
   * </pre>
   * but the former is more efficient (in fact `resolve` just calls `study` 
   * internally).
   *
   * @param {object} invocables Invocable objects
   * @return {function} a function to pass in locals, parent and self
   */
  this.study = function (invocables) {
    if (!isObject(invocables)) throw new Error("'invocables' must be an object");
    var invocableKeys = objectKeys(invocables || {});
    
    // Perform a topological sort of invocables to build an ordered plan
    var plan = [], cycle = [], visited = {};
    function visit(value, key) {
      if (visited[key] === VISIT_DONE) return;
      
      cycle.push(key);
      if (visited[key] === VISIT_IN_PROGRESS) {
        cycle.splice(0, indexOf(cycle, key));
        throw new Error("Cyclic dependency: " + cycle.join(" -> "));
      }
      visited[key] = VISIT_IN_PROGRESS;
      
      if (isString(value)) {
        plan.push(key, [ function() { return $injector.get(value); }], NO_DEPENDENCIES);
      } else {
        var params = $injector.annotate(value);
        forEach(params, function (param) {
          if (param !== key && invocables.hasOwnProperty(param)) visit(invocables[param], param);
        });
        plan.push(key, value, params);
      }
      
      cycle.pop();
      visited[key] = VISIT_DONE;
    }
    forEach(invocables, visit);
    invocables = cycle = visited = null; // plan is all that's required
    
    function isResolve(value) {
      return isObject(value) && value.then && value.$$promises;
    }
    
    return function (locals, parent, self) {
      if (isResolve(locals) && self === undefined) {
        self = parent; parent = locals; locals = null;
      }
      if (!locals) locals = NO_LOCALS;
      else if (!isObject(locals)) {
        throw new Error("'locals' must be an object");
      }       
      if (!parent) parent = NO_PARENT;
      else if (!isResolve(parent)) {
        throw new Error("'parent' must be a promise returned by $resolve.resolve()");
      }
      
      // To complete the overall resolution, we have to wait for the parent
      // promise and for the promise for each invokable in our plan.
      var resolution = $q.defer(),
          result = silenceUncaughtInPromise(resolution.promise),
          promises = result.$$promises = {},
          values = extend({}, locals),
          wait = 1 + plan.length/3,
          merged = false;

      silenceUncaughtInPromise(result);
          
      function done() {
        // Merge parent values we haven't got yet and publish our own $$values
        if (!--wait) {
          if (!merged) merge(values, parent.$$values); 
          result.$$values = values;
          result.$$promises = result.$$promises || true; // keep for isResolve()
          delete result.$$inheritedValues;
          resolution.resolve(values);
        }
      }
      
      function fail(reason) {
        result.$$failure = reason;
        resolution.reject(reason);
      }

      // Short-circuit if parent has already failed
      if (isDefined(parent.$$failure)) {
        fail(parent.$$failure);
        return result;
      }
      
      if (parent.$$inheritedValues) {
        merge(values, omit(parent.$$inheritedValues, invocableKeys));
      }

      // Merge parent values if the parent has already resolved, or merge
      // parent promises and wait if the parent resolve is still in progress.
      extend(promises, parent.$$promises);
      if (parent.$$values) {
        merged = merge(values, omit(parent.$$values, invocableKeys));
        result.$$inheritedValues = omit(parent.$$values, invocableKeys);
        done();
      } else {
        if (parent.$$inheritedValues) {
          result.$$inheritedValues = omit(parent.$$inheritedValues, invocableKeys);
        }        
        parent.then(done, fail);
      }
      
      // Process each invocable in the plan, but ignore any where a local of the same name exists.
      for (var i=0, ii=plan.length; i<ii; i+=3) {
        if (locals.hasOwnProperty(plan[i])) done();
        else invoke(plan[i], plan[i+1], plan[i+2]);
      }
      
      function invoke(key, invocable, params) {
        // Create a deferred for this invocation. Failures will propagate to the resolution as well.
        var invocation = $q.defer(), waitParams = 0;
        function onfailure(reason) {
          invocation.reject(reason);
          fail(reason);
        }
        // Wait for any parameter that we have a promise for (either from parent or from this
        // resolve; in that case study() will have made sure it's ordered before us in the plan).
        forEach(params, function (dep) {
          if (promises.hasOwnProperty(dep) && !locals.hasOwnProperty(dep)) {
            waitParams++;
            promises[dep].then(function (result) {
              values[dep] = result;
              if (!(--waitParams)) proceed();
            }, onfailure);
          }
        });
        if (!waitParams) proceed();
        function proceed() {
          if (isDefined(result.$$failure)) return;
          try {
            invocation.resolve($injector.invoke(invocable, self, values));
            invocation.promise.then(function (result) {
              values[key] = result;
              done();
            }, onfailure);
          } catch (e) {
            onfailure(e);
          }
        }
        // Publish promise synchronously; invocations further down in the plan may depend on it.
        promises[key] = silenceUncaughtInPromise(invocation.promise);
      }
      
      return result;
    };
  };
  
  /**
   * @ngdoc function
   * @name ui.router.util.$resolve#resolve
   * @methodOf ui.router.util.$resolve
   *
   * @description
   * Resolves a set of invocables. An invocable is a function to be invoked via 
   * `$injector.invoke()`, and can have an arbitrary number of dependencies. 
   * An invocable can either return a value directly,
   * or a `$q` promise. If a promise is returned it will be resolved and the 
   * resulting value will be used instead. Dependencies of invocables are resolved 
   * (in this order of precedence)
   *
   * - from the specified `locals`
   * - from another invocable that is part of this `$resolve` call
   * - from an invocable that is inherited from a `parent` call to `$resolve` 
   *   (or recursively
   * - from any ancestor `$resolve` of that parent).
   *
   * The return value of `$resolve` is a promise for an object that contains 
   * (in this order of precedence)
   *
   * - any `locals` (if specified)
   * - the resolved return values of all injectables
   * - any values inherited from a `parent` call to `$resolve` (if specified)
   *
   * The promise will resolve after the `parent` promise (if any) and all promises 
   * returned by injectables have been resolved. If any invocable 
   * (or `$injector.invoke`) throws an exception, or if a promise returned by an 
   * invocable is rejected, the `$resolve` promise is immediately rejected with the 
   * same error. A rejection of a `parent` promise (if specified) will likewise be 
   * propagated immediately. Once the `$resolve` promise has been rejected, no 
   * further invocables will be called.
   * 
   * Cyclic dependencies between invocables are not permitted and will cause `$resolve`
   * to throw an error. As a special case, an injectable can depend on a parameter 
   * with the same name as the injectable, which will be fulfilled from the `parent` 
   * injectable of the same name. This allows inherited values to be decorated. 
   * Note that in this case any other injectable in the same `$resolve` with the same
   * dependency would see the decorated value, not the inherited value.
   *
   * Note that missing dependencies -- unlike cyclic dependencies -- will cause an 
   * (asynchronous) rejection of the `$resolve` promise rather than a (synchronous) 
   * exception.
   *
   * Invocables are invoked eagerly as soon as all dependencies are available. 
   * This is true even for dependencies inherited from a `parent` call to `$resolve`.
   *
   * As a special case, an invocable can be a string, in which case it is taken to 
   * be a service name to be passed to `$injector.get()`. This is supported primarily 
   * for backwards-compatibility with the `resolve` property of `$routeProvider` 
   * routes.
   *
   * @param {object} invocables functions to invoke or 
   * `$injector` services to fetch.
   * @param {object} locals  values to make available to the injectables
   * @param {object} parent  a promise returned by another call to `$resolve`.
   * @param {object} self  the `this` for the invoked methods
   * @return {object} Promise for an object that contains the resolved return value
   * of all invocables, as well as any inherited and local values.
   */
  this.resolve = function (invocables, locals, parent, self) {
    return this.study(invocables)(locals, parent, self);
  };
}

angular.module('ui.router.util').service('$resolve', $Resolve);



/**
 * @ngdoc object
 * @name ui.router.util.$templateFactoryProvider
 *
 * @description
 * Provider for $templateFactory. Manages which template-loading mechanism to
 * use, and will default to the most recent one ($templateRequest on Angular
 * versions starting from 1.3, $http otherwise).
 */
function TemplateFactoryProvider() {
  var shouldUnsafelyUseHttp = angular.version.minor < 3;

  /**
   * @ngdoc function
   * @name ui.router.util.$templateFactoryProvider#shouldUnsafelyUseHttp
   * @methodOf ui.router.util.$templateFactoryProvider
   *
   * @description
   * Forces $templateFactory to use $http instead of $templateRequest. This
   * might cause XSS, as $http doesn't enforce the regular security checks for
   * templates that have been introduced in Angular 1.3. Note that setting this
   * to false on Angular older than 1.3.x will crash, as the $templateRequest
   * service (and the security checks) are not implemented on these versions.
   *
   * See the $sce documentation, section
   * <a href="https://docs.angularjs.org/api/ng/service/$sce#impact-on-loading-templates">
   * Impact on loading templates</a> for more details about this mechanism.
   *
   * @param {boolean} value
   */
  this.shouldUnsafelyUseHttp = function(value) {
    shouldUnsafelyUseHttp = !!value;
  };

  /**
   * @ngdoc object
   * @name ui.router.util.$templateFactory
   *
   * @requires $http
   * @requires $templateCache
   * @requires $injector
   *
   * @description
   * Service. Manages loading of templates.
   */
  this.$get = ['$http', '$templateCache', '$injector', function($http, $templateCache, $injector){
    return new TemplateFactory($http, $templateCache, $injector, shouldUnsafelyUseHttp);}];
}


/**
 * @ngdoc object
 * @name ui.router.util.$templateFactory
 *
 * @requires $http
 * @requires $templateCache
 * @requires $injector
 *
 * @description
 * Service. Manages loading of templates.
 */
function TemplateFactory($http, $templateCache, $injector, shouldUnsafelyUseHttp) {

  /**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromConfig
   * @methodOf ui.router.util.$templateFactory
   *
   * @description
   * Creates a template from a configuration object. 
   *
   * @param {object} config Configuration object for which to load a template. 
   * The following properties are search in the specified order, and the first one 
   * that is defined is used to create the template:
   *
   * @param {string|object} config.template html string template or function to 
   * load via {@link ui.router.util.$templateFactory#fromString fromString}.
   * @param {string|object} config.templateUrl url to load or a function returning 
   * the url to load via {@link ui.router.util.$templateFactory#fromUrl fromUrl}.
   * @param {Function} config.templateProvider function to invoke via 
   * {@link ui.router.util.$templateFactory#fromProvider fromProvider}.
   * @param {object} params  Parameters to pass to the template function.
   * @param {object} locals Locals to pass to `invoke` if the template is loaded 
   * via a `templateProvider`. Defaults to `{ params: params }`.
   *
   * @return {string|object}  The template html as a string, or a promise for 
   * that string,or `null` if no template is configured.
   */
  this.fromConfig = function (config, params, locals) {
    return (
      isDefined(config.template) ? this.fromString(config.template, params) :
      isDefined(config.templateUrl) ? this.fromUrl(config.templateUrl, params) :
      isDefined(config.templateProvider) ? this.fromProvider(config.templateProvider, params, locals) :
      null
    );
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromString
   * @methodOf ui.router.util.$templateFactory
   *
   * @description
   * Creates a template from a string or a function returning a string.
   *
   * @param {string|object} template html template as a string or function that 
   * returns an html template as a string.
   * @param {object} params Parameters to pass to the template function.
   *
   * @return {string|object} The template html as a string, or a promise for that 
   * string.
   */
  this.fromString = function (template, params) {
    return isFunction(template) ? template(params) : template;
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromUrl
   * @methodOf ui.router.util.$templateFactory
   * 
   * @description
   * Loads a template from the a URL via `$http` and `$templateCache`.
   *
   * @param {string|Function} url url of the template to load, or a function 
   * that returns a url.
   * @param {Object} params Parameters to pass to the url function.
   * @return {string|Promise.<string>} The template html as a string, or a promise 
   * for that string.
   */
  this.fromUrl = function (url, params) {
    if (isFunction(url)) url = url(params);
    if (url == null) return null;
    else {
      if(!shouldUnsafelyUseHttp) {
        return $injector.get('$templateRequest')(url);
      } else {
        return $http
          .get(url, { cache: $templateCache, headers: { Accept: 'text/html' }})
          .then(function(response) { return response.data; });
      }
    }
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromProvider
   * @methodOf ui.router.util.$templateFactory
   *
   * @description
   * Creates a template by invoking an injectable provider function.
   *
   * @param {Function} provider Function to invoke via `$injector.invoke`
   * @param {Object} params Parameters for the template.
   * @param {Object} locals Locals to pass to `invoke`. Defaults to 
   * `{ params: params }`.
   * @return {string|Promise.<string>} The template html as a string, or a promise 
   * for that string.
   */
  this.fromProvider = function (provider, params, locals) {
    return $injector.invoke(provider, null, locals || { params: params });
  };
}

angular.module('ui.router.util').provider('$templateFactory', TemplateFactoryProvider);

var $$UMFP; // reference to $UrlMatcherFactoryProvider

/**
 * @ngdoc object
 * @name ui.router.util.type:UrlMatcher
 *
 * @description
 * Matches URLs against patterns and extracts named parameters from the path or the search
 * part of the URL. A URL pattern consists of a path pattern, optionally followed by '?' and a list
 * of search parameters. Multiple search parameter names are separated by '&'. Search parameters
 * do not influence whether or not a URL is matched, but their values are passed through into
 * the matched parameters returned by {@link ui.router.util.type:UrlMatcher#methods_exec exec}.
 *
 * Path parameter placeholders can be specified using simple colon/catch-all syntax or curly brace
 * syntax, which optionally allows a regular expression for the parameter to be specified:
 *
 * * `':'` name - colon placeholder
 * * `'*'` name - catch-all placeholder
 * * `'{' name '}'` - curly placeholder
 * * `'{' name ':' regexp|type '}'` - curly placeholder with regexp or type name. Should the
 *   regexp itself contain curly braces, they must be in matched pairs or escaped with a backslash.
 *
 * Parameter names may contain only word characters (latin letters, digits, and underscore) and
 * must be unique within the pattern (across both path and search parameters). For colon
 * placeholders or curly placeholders without an explicit regexp, a path parameter matches any
 * number of characters other than '/'. For catch-all placeholders the path parameter matches
 * any number of characters.
 *
 * Examples:
 *
 * * `'/hello/'` - Matches only if the path is exactly '/hello/'. There is no special treatment for
 *   trailing slashes, and patterns have to match the entire path, not just a prefix.
 * * `'/user/:id'` - Matches '/user/bob' or '/user/1234!!!' or even '/user/' but not '/user' or
 *   '/user/bob/details'. The second path segment will be captured as the parameter 'id'.
 * * `'/user/{id}'` - Same as the previous example, but using curly brace syntax.
 * * `'/user/{id:[^/]*}'` - Same as the previous example.
 * * `'/user/{id:[0-9a-fA-F]{1,8}}'` - Similar to the previous example, but only matches if the id
 *   parameter consists of 1 to 8 hex digits.
 * * `'/files/{path:.*}'` - Matches any URL starting with '/files/' and captures the rest of the
 *   path into the parameter 'path'.
 * * `'/files/*path'` - ditto.
 * * `'/calendar/{start:date}'` - Matches "/calendar/2014-11-12" (because the pattern defined
 *   in the built-in  `date` Type matches `2014-11-12`) and provides a Date object in $stateParams.start
 *
 * @param {string} pattern  The pattern to compile into a matcher.
 * @param {Object} config  A configuration object hash:
 * @param {Object=} parentMatcher Used to concatenate the pattern/config onto
 *   an existing UrlMatcher
 *
 * * `caseInsensitive` - `true` if URL matching should be case insensitive, otherwise `false`, the default value (for backward compatibility) is `false`.
 * * `strict` - `false` if matching against a URL with a trailing slash should be treated as equivalent to a URL without a trailing slash, the default value is `true`.
 *
 * @property {string} prefix  A static prefix of this pattern. The matcher guarantees that any
 *   URL matching this matcher (i.e. any string for which {@link ui.router.util.type:UrlMatcher#methods_exec exec()} returns
 *   non-null) will start with this prefix.
 *
 * @property {string} source  The pattern that was passed into the constructor
 *
 * @property {string} sourcePath  The path portion of the source property
 *
 * @property {string} sourceSearch  The search portion of the source property
 *
 * @property {string} regex  The constructed regex that will be used to match against the url when
 *   it is time to determine which url will match.
 *
 * @returns {Object}  New `UrlMatcher` object
 */
function UrlMatcher(pattern, config, parentMatcher) {
  config = extend({ params: {} }, isObject(config) ? config : {});

  // Find all placeholders and create a compiled pattern, using either classic or curly syntax:
  //   '*' name
  //   ':' name
  //   '{' name '}'
  //   '{' name ':' regexp '}'
  // The regular expression is somewhat complicated due to the need to allow curly braces
  // inside the regular expression. The placeholder regexp breaks down as follows:
  //    ([:*])([\w\[\]]+)              - classic placeholder ($1 / $2) (search version has - for snake-case)
  //    \{([\w\[\]]+)(?:\:\s*( ... ))?\}  - curly brace placeholder ($3) with optional regexp/type ... ($4) (search version has - for snake-case
  //    (?: ... | ... | ... )+         - the regexp consists of any number of atoms, an atom being either
  //    [^{}\\]+                       - anything other than curly braces or backslash
  //    \\.                            - a backslash escape
  //    \{(?:[^{}\\]+|\\.)*\}          - a matched set of curly braces containing other atoms
  var placeholder       = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
      searchPlaceholder = /([:]?)([\w\[\].-]+)|\{([\w\[\].-]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
      compiled = '^', last = 0, m,
      segments = this.segments = [],
      parentParams = parentMatcher ? parentMatcher.params : {},
      params = this.params = parentMatcher ? parentMatcher.params.$$new() : new $$UMFP.ParamSet(),
      paramNames = [];

  function addParameter(id, type, config, location) {
    paramNames.push(id);
    if (parentParams[id]) return parentParams[id];
    if (!/^\w+([-.]+\w+)*(?:\[\])?$/.test(id)) throw new Error("Invalid parameter name '" + id + "' in pattern '" + pattern + "'");
    if (params[id]) throw new Error("Duplicate parameter name '" + id + "' in pattern '" + pattern + "'");
    params[id] = new $$UMFP.Param(id, type, config, location);
    return params[id];
  }

  function quoteRegExp(string, pattern, squash, optional) {
    var surroundPattern = ['',''], result = string.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
    if (!pattern) return result;
    switch(squash) {
      case false: surroundPattern = ['(', ')' + (optional ? "?" : "")]; break;
      case true:
        result = result.replace(/\/$/, '');
        surroundPattern = ['(?:\/(', ')|\/)?'];
      break;
      default:    surroundPattern = ['(' + squash + "|", ')?']; break;
    }
    return result + surroundPattern[0] + pattern + surroundPattern[1];
  }

  this.source = pattern;

  // Split into static segments separated by path parameter placeholders.
  // The number of segments is always 1 more than the number of parameters.
  function matchDetails(m, isSearch) {
    var id, regexp, segment, type, cfg, arrayMode;
    id          = m[2] || m[3]; // IE[78] returns '' for unmatched groups instead of null
    cfg         = config.params[id];
    segment     = pattern.substring(last, m.index);
    regexp      = isSearch ? m[4] : m[4] || (m[1] == '*' ? '.*' : null);

    if (regexp) {
      type      = $$UMFP.type(regexp) || inherit($$UMFP.type("string"), { pattern: new RegExp(regexp, config.caseInsensitive ? 'i' : undefined) });
    }

    return {
      id: id, regexp: regexp, segment: segment, type: type, cfg: cfg
    };
  }

  var p, param, segment;
  while ((m = placeholder.exec(pattern))) {
    p = matchDetails(m, false);
    if (p.segment.indexOf('?') >= 0) break; // we're into the search part

    param = addParameter(p.id, p.type, p.cfg, "path");
    compiled += quoteRegExp(p.segment, param.type.pattern.source, param.squash, param.isOptional);
    segments.push(p.segment);
    last = placeholder.lastIndex;
  }
  segment = pattern.substring(last);

  // Find any search parameter names and remove them from the last segment
  var i = segment.indexOf('?');

  if (i >= 0) {
    var search = this.sourceSearch = segment.substring(i);
    segment = segment.substring(0, i);
    this.sourcePath = pattern.substring(0, last + i);

    if (search.length > 0) {
      last = 0;
      while ((m = searchPlaceholder.exec(search))) {
        p = matchDetails(m, true);
        param = addParameter(p.id, p.type, p.cfg, "search");
        last = placeholder.lastIndex;
        // check if ?&
      }
    }
  } else {
    this.sourcePath = pattern;
    this.sourceSearch = '';
  }

  compiled += quoteRegExp(segment) + (config.strict === false ? '\/?' : '') + '$';
  segments.push(segment);

  this.regexp = new RegExp(compiled, config.caseInsensitive ? 'i' : undefined);
  this.prefix = segments[0];
  this.$$paramNames = paramNames;
}

/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#concat
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Returns a new matcher for a pattern constructed by appending the path part and adding the
 * search parameters of the specified pattern to this pattern. The current pattern is not
 * modified. This can be understood as creating a pattern for URLs that are relative to (or
 * suffixes of) the current pattern.
 *
 * @example
 * The following two matchers are equivalent:
 * <pre>
 * new UrlMatcher('/user/{id}?q').concat('/details?date');
 * new UrlMatcher('/user/{id}/details?q&date');
 * </pre>
 *
 * @param {string} pattern  The pattern to append.
 * @param {Object} config  An object hash of the configuration for the matcher.
 * @returns {UrlMatcher}  A matcher for the concatenated pattern.
 */
UrlMatcher.prototype.concat = function (pattern, config) {
  // Because order of search parameters is irrelevant, we can add our own search
  // parameters to the end of the new pattern. Parse the new pattern by itself
  // and then join the bits together, but it's much easier to do this on a string level.
  var defaultConfig = {
    caseInsensitive: $$UMFP.caseInsensitive(),
    strict: $$UMFP.strictMode(),
    squash: $$UMFP.defaultSquashPolicy()
  };
  return new UrlMatcher(this.sourcePath + pattern + this.sourceSearch, extend(defaultConfig, config), this);
};

UrlMatcher.prototype.toString = function () {
  return this.source;
};

/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#exec
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Tests the specified path against this matcher, and returns an object containing the captured
 * parameter values, or null if the path does not match. The returned object contains the values
 * of any search parameters that are mentioned in the pattern, but their value may be null if
 * they are not present in `searchParams`. This means that search parameters are always treated
 * as optional.
 *
 * @example
 * <pre>
 * new UrlMatcher('/user/{id}?q&r').exec('/user/bob', {
 *   x: '1', q: 'hello'
 * });
 * // returns { id: 'bob', q: 'hello', r: null }
 * </pre>
 *
 * @param {string} path  The URL path to match, e.g. `$location.path()`.
 * @param {Object} searchParams  URL search parameters, e.g. `$location.search()`.
 * @returns {Object}  The captured parameter values.
 */
UrlMatcher.prototype.exec = function (path, searchParams) {
  var m = this.regexp.exec(path);
  if (!m) return null;
  searchParams = searchParams || {};

  var paramNames = this.parameters(), nTotal = paramNames.length,
    nPath = this.segments.length - 1,
    values = {}, i, j, cfg, paramName;

  if (nPath !== m.length - 1) throw new Error("Unbalanced capture group in route '" + this.source + "'");

  function decodePathArray(string) {
    function reverseString(str) { return str.split("").reverse().join(""); }
    function unquoteDashes(str) { return str.replace(/\\-/g, "-"); }

    var split = reverseString(string).split(/-(?!\\)/);
    var allReversed = map(split, reverseString);
    return map(allReversed, unquoteDashes).reverse();
  }

  var param, paramVal;
  for (i = 0; i < nPath; i++) {
    paramName = paramNames[i];
    param = this.params[paramName];
    paramVal = m[i+1];
    // if the param value matches a pre-replace pair, replace the value before decoding.
    for (j = 0; j < param.replace.length; j++) {
      if (param.replace[j].from === paramVal) paramVal = param.replace[j].to;
    }
    if (paramVal && param.array === true) paramVal = decodePathArray(paramVal);
    if (isDefined(paramVal)) paramVal = param.type.decode(paramVal);
    values[paramName] = param.value(paramVal);
  }
  for (/**/; i < nTotal; i++) {
    paramName = paramNames[i];
    values[paramName] = this.params[paramName].value(searchParams[paramName]);
    param = this.params[paramName];
    paramVal = searchParams[paramName];
    for (j = 0; j < param.replace.length; j++) {
      if (param.replace[j].from === paramVal) paramVal = param.replace[j].to;
    }
    if (isDefined(paramVal)) paramVal = param.type.decode(paramVal);
    values[paramName] = param.value(paramVal);
  }

  return values;
};

/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#parameters
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Returns the names of all path and search parameters of this pattern in an unspecified order.
 *
 * @returns {Array.<string>}  An array of parameter names. Must be treated as read-only. If the
 *    pattern has no parameters, an empty array is returned.
 */
UrlMatcher.prototype.parameters = function (param) {
  if (!isDefined(param)) return this.$$paramNames;
  return this.params[param] || null;
};

/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#validates
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Checks an object hash of parameters to validate their correctness according to the parameter
 * types of this `UrlMatcher`.
 *
 * @param {Object} params The object hash of parameters to validate.
 * @returns {boolean} Returns `true` if `params` validates, otherwise `false`.
 */
UrlMatcher.prototype.validates = function (params) {
  return this.params.$$validates(params);
};

/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#format
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Creates a URL that matches this pattern by substituting the specified values
 * for the path and search parameters. Null values for path parameters are
 * treated as empty strings.
 *
 * @example
 * <pre>
 * new UrlMatcher('/user/{id}?q').format({ id:'bob', q:'yes' });
 * // returns '/user/bob?q=yes'
 * </pre>
 *
 * @param {Object} values  the values to substitute for the parameters in this pattern.
 * @returns {string}  the formatted URL (path and optionally search part).
 */
UrlMatcher.prototype.format = function (values) {
  values = values || {};
  var segments = this.segments, params = this.parameters(), paramset = this.params;
  if (!this.validates(values)) return null;

  var i, search = false, nPath = segments.length - 1, nTotal = params.length, result = segments[0];

  function encodeDashes(str) { // Replace dashes with encoded "\-"
    return encodeURIComponent(str).replace(/-/g, function(c) { return '%5C%' + c.charCodeAt(0).toString(16).toUpperCase(); });
  }

  for (i = 0; i < nTotal; i++) {
    var isPathParam = i < nPath;
    var name = params[i], param = paramset[name], value = param.value(values[name]);
    var isDefaultValue = param.isOptional && param.type.equals(param.value(), value);
    var squash = isDefaultValue ? param.squash : false;
    var encoded = param.type.encode(value);

    if (isPathParam) {
      var nextSegment = segments[i + 1];
      var isFinalPathParam = i + 1 === nPath;

      if (squash === false) {
        if (encoded != null) {
          if (isArray(encoded)) {
            result += map(encoded, encodeDashes).join("-");
          } else {
            result += encodeURIComponent(encoded);
          }
        }
        result += nextSegment;
      } else if (squash === true) {
        var capture = result.match(/\/$/) ? /\/?(.*)/ : /(.*)/;
        result += nextSegment.match(capture)[1];
      } else if (isString(squash)) {
        result += squash + nextSegment;
      }

      if (isFinalPathParam && param.squash === true && result.slice(-1) === '/') result = result.slice(0, -1);
    } else {
      if (encoded == null || (isDefaultValue && squash !== false)) continue;
      if (!isArray(encoded)) encoded = [ encoded ];
      if (encoded.length === 0) continue;
      encoded = map(encoded, encodeURIComponent).join('&' + name + '=');
      result += (search ? '&' : '?') + (name + '=' + encoded);
      search = true;
    }
  }

  return result;
};

/**
 * @ngdoc object
 * @name ui.router.util.type:Type
 *
 * @description
 * Implements an interface to define custom parameter types that can be decoded from and encoded to
 * string parameters matched in a URL. Used by {@link ui.router.util.type:UrlMatcher `UrlMatcher`}
 * objects when matching or formatting URLs, or comparing or validating parameter values.
 *
 * See {@link ui.router.util.$urlMatcherFactory#methods_type `$urlMatcherFactory#type()`} for more
 * information on registering custom types.
 *
 * @param {Object} config  A configuration object which contains the custom type definition.  The object's
 *        properties will override the default methods and/or pattern in `Type`'s public interface.
 * @example
 * <pre>
 * {
 *   decode: function(val) { return parseInt(val, 10); },
 *   encode: function(val) { return val && val.toString(); },
 *   equals: function(a, b) { return this.is(a) && a === b; },
 *   is: function(val) { return angular.isNumber(val) isFinite(val) && val % 1 === 0; },
 *   pattern: /\d+/
 * }
 * </pre>
 *
 * @property {RegExp} pattern The regular expression pattern used to match values of this type when
 *           coming from a substring of a URL.
 *
 * @returns {Object}  Returns a new `Type` object.
 */
function Type(config) {
  extend(this, config);
}

/**
 * @ngdoc function
 * @name ui.router.util.type:Type#is
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Detects whether a value is of a particular type. Accepts a native (decoded) value
 * and determines whether it matches the current `Type` object.
 *
 * @param {*} val  The value to check.
 * @param {string} key  Optional. If the type check is happening in the context of a specific
 *        {@link ui.router.util.type:UrlMatcher `UrlMatcher`} object, this is the name of the
 *        parameter in which `val` is stored. Can be used for meta-programming of `Type` objects.
 * @returns {Boolean}  Returns `true` if the value matches the type, otherwise `false`.
 */
Type.prototype.is = function(val, key) {
  return true;
};

/**
 * @ngdoc function
 * @name ui.router.util.type:Type#encode
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Encodes a custom/native type value to a string that can be embedded in a URL. Note that the
 * return value does *not* need to be URL-safe (i.e. passed through `encodeURIComponent()`), it
 * only needs to be a representation of `val` that has been coerced to a string.
 *
 * @param {*} val  The value to encode.
 * @param {string} key  The name of the parameter in which `val` is stored. Can be used for
 *        meta-programming of `Type` objects.
 * @returns {string}  Returns a string representation of `val` that can be encoded in a URL.
 */
Type.prototype.encode = function(val, key) {
  return val;
};

/**
 * @ngdoc function
 * @name ui.router.util.type:Type#decode
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Converts a parameter value (from URL string or transition param) to a custom/native value.
 *
 * @param {string} val  The URL parameter value to decode.
 * @param {string} key  The name of the parameter in which `val` is stored. Can be used for
 *        meta-programming of `Type` objects.
 * @returns {*}  Returns a custom representation of the URL parameter value.
 */
Type.prototype.decode = function(val, key) {
  return val;
};

/**
 * @ngdoc function
 * @name ui.router.util.type:Type#equals
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Determines whether two decoded values are equivalent.
 *
 * @param {*} a  A value to compare against.
 * @param {*} b  A value to compare against.
 * @returns {Boolean}  Returns `true` if the values are equivalent/equal, otherwise `false`.
 */
Type.prototype.equals = function(a, b) {
  return a == b;
};

Type.prototype.$subPattern = function() {
  var sub = this.pattern.toString();
  return sub.substr(1, sub.length - 2);
};

Type.prototype.pattern = /.*/;

Type.prototype.toString = function() { return "{Type:" + this.name + "}"; };

/** Given an encoded string, or a decoded object, returns a decoded object */
Type.prototype.$normalize = function(val) {
  return this.is(val) ? val : this.decode(val);
};

/*
 * Wraps an existing custom Type as an array of Type, depending on 'mode'.
 * e.g.:
 * - urlmatcher pattern "/path?{queryParam[]:int}"
 * - url: "/path?queryParam=1&queryParam=2
 * - $stateParams.queryParam will be [1, 2]
 * if `mode` is "auto", then
 * - url: "/path?queryParam=1 will create $stateParams.queryParam: 1
 * - url: "/path?queryParam=1&queryParam=2 will create $stateParams.queryParam: [1, 2]
 */
Type.prototype.$asArray = function(mode, isSearch) {
  if (!mode) return this;
  if (mode === "auto" && !isSearch) throw new Error("'auto' array mode is for query parameters only");

  function ArrayType(type, mode) {
    function bindTo(type, callbackName) {
      return function() {
        return type[callbackName].apply(type, arguments);
      };
    }

    // Wrap non-array value as array
    function arrayWrap(val) { return isArray(val) ? val : (isDefined(val) ? [ val ] : []); }
    // Unwrap array value for "auto" mode. Return undefined for empty array.
    function arrayUnwrap(val) {
      switch(val.length) {
        case 0: return undefined;
        case 1: return mode === "auto" ? val[0] : val;
        default: return val;
      }
    }
    function falsey(val) { return !val; }

    // Wraps type (.is/.encode/.decode) functions to operate on each value of an array
    function arrayHandler(callback, allTruthyMode) {
      return function handleArray(val) {
        if (isArray(val) && val.length === 0) return val;
        val = arrayWrap(val);
        var result = map(val, callback);
        if (allTruthyMode === true)
          return filter(result, falsey).length === 0;
        return arrayUnwrap(result);
      };
    }

    // Wraps type (.equals) functions to operate on each value of an array
    function arrayEqualsHandler(callback) {
      return function handleArray(val1, val2) {
        var left = arrayWrap(val1), right = arrayWrap(val2);
        if (left.length !== right.length) return false;
        for (var i = 0; i < left.length; i++) {
          if (!callback(left[i], right[i])) return false;
        }
        return true;
      };
    }

    this.encode = arrayHandler(bindTo(type, 'encode'));
    this.decode = arrayHandler(bindTo(type, 'decode'));
    this.is     = arrayHandler(bindTo(type, 'is'), true);
    this.equals = arrayEqualsHandler(bindTo(type, 'equals'));
    this.pattern = type.pattern;
    this.$normalize = arrayHandler(bindTo(type, '$normalize'));
    this.name = type.name;
    this.$arrayMode = mode;
  }

  return new ArrayType(this, mode);
};



/**
 * @ngdoc object
 * @name ui.router.util.$urlMatcherFactory
 *
 * @description
 * Factory for {@link ui.router.util.type:UrlMatcher `UrlMatcher`} instances. The factory
 * is also available to providers under the name `$urlMatcherFactoryProvider`.
 */
function $UrlMatcherFactory() {
  $$UMFP = this;

  var isCaseInsensitive = false, isStrictMode = true, defaultSquashPolicy = false;

  // Use tildes to pre-encode slashes.
  // If the slashes are simply URLEncoded, the browser can choose to pre-decode them,
  // and bidirectional encoding/decoding fails.
  // Tilde was chosen because it's not a RFC 3986 section 2.2 Reserved Character
  function valToString(val) { return val != null ? val.toString().replace(/(~|\/)/g, function (m) { return {'~':'~~', '/':'~2F'}[m]; }) : val; }
  function valFromString(val) { return val != null ? val.toString().replace(/(~~|~2F)/g, function (m) { return {'~~':'~', '~2F':'/'}[m]; }) : val; }

  var $types = {}, enqueue = true, typeQueue = [], injector, defaultTypes = {
    "string": {
      encode: valToString,
      decode: valFromString,
      // TODO: in 1.0, make string .is() return false if value is undefined/null by default.
      // In 0.2.x, string params are optional by default for backwards compat
      is: function(val) { return val == null || !isDefined(val) || typeof val === "string"; },
      pattern: /[^/]*/
    },
    "int": {
      encode: valToString,
      decode: function(val) { return parseInt(val, 10); },
      is: function(val) { return val !== undefined && val !== null && this.decode(val.toString()) === val; },
      pattern: /\d+/
    },
    "bool": {
      encode: function(val) { return val ? 1 : 0; },
      decode: function(val) { return parseInt(val, 10) !== 0; },
      is: function(val) { return val === true || val === false; },
      pattern: /0|1/
    },
    "date": {
      encode: function (val) {
        if (!this.is(val))
          return undefined;
        return [ val.getFullYear(),
          ('0' + (val.getMonth() + 1)).slice(-2),
          ('0' + val.getDate()).slice(-2)
        ].join("-");
      },
      decode: function (val) {
        if (this.is(val)) return val;
        var match = this.capture.exec(val);
        return match ? new Date(match[1], match[2] - 1, match[3]) : undefined;
      },
      is: function(val) { return val instanceof Date && !isNaN(val.valueOf()); },
      equals: function (a, b) { return this.is(a) && this.is(b) && a.toISOString() === b.toISOString(); },
      pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
      capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
    },
    "json": {
      encode: angular.toJson,
      decode: angular.fromJson,
      is: angular.isObject,
      equals: angular.equals,
      pattern: /[^/]*/
    },
    "any": { // does not encode/decode
      encode: angular.identity,
      decode: angular.identity,
      equals: angular.equals,
      pattern: /.*/
    }
  };

  function getDefaultConfig() {
    return {
      strict: isStrictMode,
      caseInsensitive: isCaseInsensitive
    };
  }

  function isInjectable(value) {
    return (isFunction(value) || (isArray(value) && isFunction(value[value.length - 1])));
  }

  /**
   * [Internal] Get the default value of a parameter, which may be an injectable function.
   */
  $UrlMatcherFactory.$$getDefaultValue = function(config) {
    if (!isInjectable(config.value)) return config.value;
    if (!injector) throw new Error("Injectable functions cannot be called at configuration time");
    return injector.invoke(config.value);
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#caseInsensitive
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Defines whether URL matching should be case sensitive (the default behavior), or not.
   *
   * @param {boolean} value `false` to match URL in a case sensitive manner; otherwise `true`;
   * @returns {boolean} the current value of caseInsensitive
   */
  this.caseInsensitive = function(value) {
    if (isDefined(value))
      isCaseInsensitive = value;
    return isCaseInsensitive;
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#strictMode
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Defines whether URLs should match trailing slashes, or not (the default behavior).
   *
   * @param {boolean=} value `false` to match trailing slashes in URLs, otherwise `true`.
   * @returns {boolean} the current value of strictMode
   */
  this.strictMode = function(value) {
    if (isDefined(value))
      isStrictMode = value;
    return isStrictMode;
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#defaultSquashPolicy
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Sets the default behavior when generating or matching URLs with default parameter values.
   *
   * @param {string} value A string that defines the default parameter URL squashing behavior.
   *    `nosquash`: When generating an href with a default parameter value, do not squash the parameter value from the URL
   *    `slash`: When generating an href with a default parameter value, squash (remove) the parameter value, and, if the
   *             parameter is surrounded by slashes, squash (remove) one slash from the URL
   *    any other string, e.g. "~": When generating an href with a default parameter value, squash (remove)
   *             the parameter value from the URL and replace it with this string.
   */
  this.defaultSquashPolicy = function(value) {
    if (!isDefined(value)) return defaultSquashPolicy;
    if (value !== true && value !== false && !isString(value))
      throw new Error("Invalid squash policy: " + value + ". Valid policies: false, true, arbitrary-string");
    defaultSquashPolicy = value;
    return value;
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#compile
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Creates a {@link ui.router.util.type:UrlMatcher `UrlMatcher`} for the specified pattern.
   *
   * @param {string} pattern  The URL pattern.
   * @param {Object} config  The config object hash.
   * @returns {UrlMatcher}  The UrlMatcher.
   */
  this.compile = function (pattern, config) {
    return new UrlMatcher(pattern, extend(getDefaultConfig(), config));
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#isMatcher
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Returns true if the specified object is a `UrlMatcher`, or false otherwise.
   *
   * @param {Object} object  The object to perform the type check against.
   * @returns {Boolean}  Returns `true` if the object matches the `UrlMatcher` interface, by
   *          implementing all the same methods.
   */
  this.isMatcher = function (o) {
    if (!isObject(o)) return false;
    var result = true;

    forEach(UrlMatcher.prototype, function(val, name) {
      if (isFunction(val)) {
        result = result && (isDefined(o[name]) && isFunction(o[name]));
      }
    });
    return result;
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#type
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Registers a custom {@link ui.router.util.type:Type `Type`} object that can be used to
   * generate URLs with typed parameters.
   *
   * @param {string} name  The type name.
   * @param {Object|Function} definition   The type definition. See
   *        {@link ui.router.util.type:Type `Type`} for information on the values accepted.
   * @param {Object|Function} definitionFn (optional) A function that is injected before the app
   *        runtime starts.  The result of this function is merged into the existing `definition`.
   *        See {@link ui.router.util.type:Type `Type`} for information on the values accepted.
   *
   * @returns {Object}  Returns `$urlMatcherFactoryProvider`.
   *
   * @example
   * This is a simple example of a custom type that encodes and decodes items from an
   * array, using the array index as the URL-encoded value:
   *
   * <pre>
   * var list = ['John', 'Paul', 'George', 'Ringo'];
   *
   * $urlMatcherFactoryProvider.type('listItem', {
   *   encode: function(item) {
   *     // Represent the list item in the URL using its corresponding index
   *     return list.indexOf(item);
   *   },
   *   decode: function(item) {
   *     // Look up the list item by index
   *     return list[parseInt(item, 10)];
   *   },
   *   is: function(item) {
   *     // Ensure the item is valid by checking to see that it appears
   *     // in the list
   *     return list.indexOf(item) > -1;
   *   }
   * });
   *
   * $stateProvider.state('list', {
   *   url: "/list/{item:listItem}",
   *   controller: function($scope, $stateParams) {
   *     console.log($stateParams.item);
   *   }
   * });
   *
   * // ...
   *
   * // Changes URL to '/list/3', logs "Ringo" to the console
   * $state.go('list', { item: "Ringo" });
   * </pre>
   *
   * This is a more complex example of a type that relies on dependency injection to
   * interact with services, and uses the parameter name from the URL to infer how to
   * handle encoding and decoding parameter values:
   *
   * <pre>
   * // Defines a custom type that gets a value from a service,
   * // where each service gets different types of values from
   * // a backend API:
   * $urlMatcherFactoryProvider.type('dbObject', {}, function(Users, Posts) {
   *
   *   // Matches up services to URL parameter names
   *   var services = {
   *     user: Users,
   *     post: Posts
   *   };
   *
   *   return {
   *     encode: function(object) {
   *       // Represent the object in the URL using its unique ID
   *       return object.id;
   *     },
   *     decode: function(value, key) {
   *       // Look up the object by ID, using the parameter
   *       // name (key) to call the correct service
   *       return services[key].findById(value);
   *     },
   *     is: function(object, key) {
   *       // Check that object is a valid dbObject
   *       return angular.isObject(object) && object.id && services[key];
   *     }
   *     equals: function(a, b) {
   *       // Check the equality of decoded objects by comparing
   *       // their unique IDs
   *       return a.id === b.id;
   *     }
   *   };
   * });
   *
   * // In a config() block, you can then attach URLs with
   * // type-annotated parameters:
   * $stateProvider.state('users', {
   *   url: "/users",
   *   // ...
   * }).state('users.item', {
   *   url: "/{user:dbObject}",
   *   controller: function($scope, $stateParams) {
   *     // $stateParams.user will now be an object returned from
   *     // the Users service
   *   },
   *   // ...
   * });
   * </pre>
   */
  this.type = function (name, definition, definitionFn) {
    if (!isDefined(definition)) return $types[name];
    if ($types.hasOwnProperty(name)) throw new Error("A type named '" + name + "' has already been defined.");

    $types[name] = new Type(extend({ name: name }, definition));
    if (definitionFn) {
      typeQueue.push({ name: name, def: definitionFn });
      if (!enqueue) flushTypeQueue();
    }
    return this;
  };

  // `flushTypeQueue()` waits until `$urlMatcherFactory` is injected before invoking the queued `definitionFn`s
  function flushTypeQueue() {
    while(typeQueue.length) {
      var type = typeQueue.shift();
      if (type.pattern) throw new Error("You cannot override a type's .pattern at runtime.");
      angular.extend($types[type.name], injector.invoke(type.def));
    }
  }

  // Register default types. Store them in the prototype of $types.
  forEach(defaultTypes, function(type, name) { $types[name] = new Type(extend({name: name}, type)); });
  $types = inherit($types, {});

  /* No need to document $get, since it returns this */
  this.$get = ['$injector', function ($injector) {
    injector = $injector;
    enqueue = false;
    flushTypeQueue();

    forEach(defaultTypes, function(type, name) {
      if (!$types[name]) $types[name] = new Type(type);
    });
    return this;
  }];

  this.Param = function Param(id, type, config, location) {
    var self = this;
    config = unwrapShorthand(config);
    type = getType(config, type, location);
    var arrayMode = getArrayMode();
    type = arrayMode ? type.$asArray(arrayMode, location === "search") : type;
    if (type.name === "string" && !arrayMode && location === "path" && config.value === undefined)
      config.value = ""; // for 0.2.x; in 0.3.0+ do not automatically default to ""
    var isOptional = config.value !== undefined;
    var squash = getSquashPolicy(config, isOptional);
    var replace = getReplace(config, arrayMode, isOptional, squash);

    function unwrapShorthand(config) {
      var keys = isObject(config) ? objectKeys(config) : [];
      var isShorthand = indexOf(keys, "value") === -1 && indexOf(keys, "type") === -1 &&
                        indexOf(keys, "squash") === -1 && indexOf(keys, "array") === -1;
      if (isShorthand) config = { value: config };
      config.$$fn = isInjectable(config.value) ? config.value : function () { return config.value; };
      return config;
    }

    function getType(config, urlType, location) {
      if (config.type && urlType) throw new Error("Param '"+id+"' has two type configurations.");
      if (urlType) return urlType;
      if (!config.type) return (location === "config" ? $types.any : $types.string);

      if (angular.isString(config.type))
        return $types[config.type];
      if (config.type instanceof Type)
        return config.type;
      return new Type(config.type);
    }

    // array config: param name (param[]) overrides default settings.  explicit config overrides param name.
    function getArrayMode() {
      var arrayDefaults = { array: (location === "search" ? "auto" : false) };
      var arrayParamNomenclature = id.match(/\[\]$/) ? { array: true } : {};
      return extend(arrayDefaults, arrayParamNomenclature, config).array;
    }

    /**
     * returns false, true, or the squash value to indicate the "default parameter url squash policy".
     */
    function getSquashPolicy(config, isOptional) {
      var squash = config.squash;
      if (!isOptional || squash === false) return false;
      if (!isDefined(squash) || squash == null) return defaultSquashPolicy;
      if (squash === true || isString(squash)) return squash;
      throw new Error("Invalid squash policy: '" + squash + "'. Valid policies: false, true, or arbitrary string");
    }

    function getReplace(config, arrayMode, isOptional, squash) {
      var replace, configuredKeys, defaultPolicy = [
        { from: "",   to: (isOptional || arrayMode ? undefined : "") },
        { from: null, to: (isOptional || arrayMode ? undefined : "") }
      ];
      replace = isArray(config.replace) ? config.replace : [];
      if (isString(squash))
        replace.push({ from: squash, to: undefined });
      configuredKeys = map(replace, function(item) { return item.from; } );
      return filter(defaultPolicy, function(item) { return indexOf(configuredKeys, item.from) === -1; }).concat(replace);
    }

    /**
     * [Internal] Get the default value of a parameter, which may be an injectable function.
     */
    function $$getDefaultValue() {
      if (!injector) throw new Error("Injectable functions cannot be called at configuration time");
      var defaultValue = injector.invoke(config.$$fn);
      if (defaultValue !== null && defaultValue !== undefined && !self.type.is(defaultValue))
        throw new Error("Default value (" + defaultValue + ") for parameter '" + self.id + "' is not an instance of Type (" + self.type.name + ")");
      return defaultValue;
    }

    /**
     * [Internal] Gets the decoded representation of a value if the value is defined, otherwise, returns the
     * default value, which may be the result of an injectable function.
     */
    function $value(value) {
      function hasReplaceVal(val) { return function(obj) { return obj.from === val; }; }
      function $replace(value) {
        var replacement = map(filter(self.replace, hasReplaceVal(value)), function(obj) { return obj.to; });
        return replacement.length ? replacement[0] : value;
      }
      value = $replace(value);
      return !isDefined(value) ? $$getDefaultValue() : self.type.$normalize(value);
    }

    function toString() { return "{Param:" + id + " " + type + " squash: '" + squash + "' optional: " + isOptional + "}"; }

    extend(this, {
      id: id,
      type: type,
      location: location,
      array: arrayMode,
      squash: squash,
      replace: replace,
      isOptional: isOptional,
      value: $value,
      dynamic: undefined,
      config: config,
      toString: toString
    });
  };

  function ParamSet(params) {
    extend(this, params || {});
  }

  ParamSet.prototype = {
    $$new: function() {
      return inherit(this, extend(new ParamSet(), { $$parent: this}));
    },
    $$keys: function () {
      var keys = [], chain = [], parent = this,
        ignore = objectKeys(ParamSet.prototype);
      while (parent) { chain.push(parent); parent = parent.$$parent; }
      chain.reverse();
      forEach(chain, function(paramset) {
        forEach(objectKeys(paramset), function(key) {
            if (indexOf(keys, key) === -1 && indexOf(ignore, key) === -1) keys.push(key);
        });
      });
      return keys;
    },
    $$values: function(paramValues) {
      var values = {}, self = this;
      forEach(self.$$keys(), function(key) {
        values[key] = self[key].value(paramValues && paramValues[key]);
      });
      return values;
    },
    $$equals: function(paramValues1, paramValues2) {
      var equal = true, self = this;
      forEach(self.$$keys(), function(key) {
        var left = paramValues1 && paramValues1[key], right = paramValues2 && paramValues2[key];
        if (!self[key].type.equals(left, right)) equal = false;
      });
      return equal;
    },
    $$validates: function $$validate(paramValues) {
      var keys = this.$$keys(), i, param, rawVal, normalized, encoded;
      for (i = 0; i < keys.length; i++) {
        param = this[keys[i]];
        rawVal = paramValues[keys[i]];
        if ((rawVal === undefined || rawVal === null) && param.isOptional)
          break; // There was no parameter value, but the param is optional
        normalized = param.type.$normalize(rawVal);
        if (!param.type.is(normalized))
          return false; // The value was not of the correct Type, and could not be decoded to the correct Type
        encoded = param.type.encode(normalized);
        if (angular.isString(encoded) && !param.type.pattern.exec(encoded))
          return false; // The value was of the correct type, but when encoded, did not match the Type's regexp
      }
      return true;
    },
    $$parent: undefined
  };

  this.ParamSet = ParamSet;
}

// Register as a provider so it's available to other providers
angular.module('ui.router.util').provider('$urlMatcherFactory', $UrlMatcherFactory);
angular.module('ui.router.util').run(['$urlMatcherFactory', function($urlMatcherFactory) { }]);

/**
 * @ngdoc object
 * @name ui.router.router.$urlRouterProvider
 *
 * @requires ui.router.util.$urlMatcherFactoryProvider
 * @requires $locationProvider
 *
 * @description
 * `$urlRouterProvider` has the responsibility of watching `$location`. 
 * When `$location` changes it runs through a list of rules one by one until a 
 * match is found. `$urlRouterProvider` is used behind the scenes anytime you specify 
 * a url in a state configuration. All urls are compiled into a UrlMatcher object.
 *
 * There are several methods on `$urlRouterProvider` that make it useful to use directly
 * in your module config.
 */
$UrlRouterProvider.$inject = ['$locationProvider', '$urlMatcherFactoryProvider'];
function $UrlRouterProvider(   $locationProvider,   $urlMatcherFactory) {
  var rules = [], otherwise = null, interceptDeferred = false, listener;

  // Returns a string that is a prefix of all strings matching the RegExp
  function regExpPrefix(re) {
    var prefix = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(re.source);
    return (prefix != null) ? prefix[1].replace(/\\(.)/g, "$1") : '';
  }

  // Interpolates matched values into a String.replace()-style pattern
  function interpolate(pattern, match) {
    return pattern.replace(/\$(\$|\d{1,2})/, function (m, what) {
      return match[what === '$' ? 0 : Number(what)];
    });
  }

  /**
   * @ngdoc function
   * @name ui.router.router.$urlRouterProvider#rule
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Defines rules that are used by `$urlRouterProvider` to find matches for
   * specific URLs.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) {
   *   // Here's an example of how you might allow case insensitive urls
   *   $urlRouterProvider.rule(function ($injector, $location) {
   *     var path = $location.path(),
   *         normalized = path.toLowerCase();
   *
   *     if (path !== normalized) {
   *       return normalized;
   *     }
   *   });
   * });
   * </pre>
   *
   * @param {function} rule Handler function that takes `$injector` and `$location`
   * services as arguments. You can use them to return a valid path as a string.
   *
   * @return {object} `$urlRouterProvider` - `$urlRouterProvider` instance
   */
  this.rule = function (rule) {
    if (!isFunction(rule)) throw new Error("'rule' must be a function");
    rules.push(rule);
    return this;
  };

  /**
   * @ngdoc object
   * @name ui.router.router.$urlRouterProvider#otherwise
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Defines a path that is used when an invalid route is requested.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) {
   *   // if the path doesn't match any of the urls you configured
   *   // otherwise will take care of routing the user to the
   *   // specified url
   *   $urlRouterProvider.otherwise('/index');
   *
   *   // Example of using function rule as param
   *   $urlRouterProvider.otherwise(function ($injector, $location) {
   *     return '/a/valid/url';
   *   });
   * });
   * </pre>
   *
   * @param {string|function} rule The url path you want to redirect to or a function 
   * rule that returns the url path. The function version is passed two params: 
   * `$injector` and `$location` services, and must return a url string.
   *
   * @return {object} `$urlRouterProvider` - `$urlRouterProvider` instance
   */
  this.otherwise = function (rule) {
    if (isString(rule)) {
      var redirect = rule;
      rule = function () { return redirect; };
    }
    else if (!isFunction(rule)) throw new Error("'rule' must be a function");
    otherwise = rule;
    return this;
  };


  function handleIfMatch($injector, handler, match) {
    if (!match) return false;
    var result = $injector.invoke(handler, handler, { $match: match });
    return isDefined(result) ? result : true;
  }

  /**
   * @ngdoc function
   * @name ui.router.router.$urlRouterProvider#when
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Registers a handler for a given url matching. 
   * 
   * If the handler is a string, it is
   * treated as a redirect, and is interpolated according to the syntax of match
   * (i.e. like `String.replace()` for `RegExp`, or like a `UrlMatcher` pattern otherwise).
   *
   * If the handler is a function, it is injectable. It gets invoked if `$location`
   * matches. You have the option of inject the match object as `$match`.
   *
   * The handler can return
   *
   * - **falsy** to indicate that the rule didn't match after all, then `$urlRouter`
   *   will continue trying to find another one that matches.
   * - **string** which is treated as a redirect and passed to `$location.url()`
   * - **void** or any **truthy** value tells `$urlRouter` that the url was handled.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) {
   *   $urlRouterProvider.when($state.url, function ($match, $stateParams) {
   *     if ($state.$current.navigable !== state ||
   *         !equalForKeys($match, $stateParams) {
   *      $state.transitionTo(state, $match, false);
   *     }
   *   });
   * });
   * </pre>
   *
   * @param {string|object} what The incoming path that you want to redirect.
   * @param {string|function} handler The path you want to redirect your user to.
   */
  this.when = function (what, handler) {
    var redirect, handlerIsString = isString(handler);
    if (isString(what)) what = $urlMatcherFactory.compile(what);

    if (!handlerIsString && !isFunction(handler) && !isArray(handler))
      throw new Error("invalid 'handler' in when()");

    var strategies = {
      matcher: function (what, handler) {
        if (handlerIsString) {
          redirect = $urlMatcherFactory.compile(handler);
          handler = ['$match', function ($match) { return redirect.format($match); }];
        }
        return extend(function ($injector, $location) {
          return handleIfMatch($injector, handler, what.exec($location.path(), $location.search()));
        }, {
          prefix: isString(what.prefix) ? what.prefix : ''
        });
      },
      regex: function (what, handler) {
        if (what.global || what.sticky) throw new Error("when() RegExp must not be global or sticky");

        if (handlerIsString) {
          redirect = handler;
          handler = ['$match', function ($match) { return interpolate(redirect, $match); }];
        }
        return extend(function ($injector, $location) {
          return handleIfMatch($injector, handler, what.exec($location.path()));
        }, {
          prefix: regExpPrefix(what)
        });
      }
    };

    var check = { matcher: $urlMatcherFactory.isMatcher(what), regex: what instanceof RegExp };

    for (var n in check) {
      if (check[n]) return this.rule(strategies[n](what, handler));
    }

    throw new Error("invalid 'what' in when()");
  };

  /**
   * @ngdoc function
   * @name ui.router.router.$urlRouterProvider#deferIntercept
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Disables (or enables) deferring location change interception.
   *
   * If you wish to customize the behavior of syncing the URL (for example, if you wish to
   * defer a transition but maintain the current URL), call this method at configuration time.
   * Then, at run time, call `$urlRouter.listen()` after you have configured your own
   * `$locationChangeSuccess` event handler.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) {
   *
   *   // Prevent $urlRouter from automatically intercepting URL changes;
   *   // this allows you to configure custom behavior in between
   *   // location changes and route synchronization:
   *   $urlRouterProvider.deferIntercept();
   *
   * }).run(function ($rootScope, $urlRouter, UserService) {
   *
   *   $rootScope.$on('$locationChangeSuccess', function(e) {
   *     // UserService is an example service for managing user state
   *     if (UserService.isLoggedIn()) return;
   *
   *     // Prevent $urlRouter's default handler from firing
   *     e.preventDefault();
   *
   *     UserService.handleLogin().then(function() {
   *       // Once the user has logged in, sync the current URL
   *       // to the router:
   *       $urlRouter.sync();
   *     });
   *   });
   *
   *   // Configures $urlRouter's listener *after* your custom listener
   *   $urlRouter.listen();
   * });
   * </pre>
   *
   * @param {boolean} defer Indicates whether to defer location change interception. Passing
            no parameter is equivalent to `true`.
   */
  this.deferIntercept = function (defer) {
    if (defer === undefined) defer = true;
    interceptDeferred = defer;
  };

  /**
   * @ngdoc object
   * @name ui.router.router.$urlRouter
   *
   * @requires $location
   * @requires $rootScope
   * @requires $injector
   * @requires $browser
   *
   * @description
   *
   */
  this.$get = $get;
  $get.$inject = ['$location', '$rootScope', '$injector', '$browser', '$sniffer'];
  function $get(   $location,   $rootScope,   $injector,   $browser,   $sniffer) {

    var baseHref = $browser.baseHref(), location = $location.url(), lastPushedUrl;

    function appendBasePath(url, isHtml5, absolute) {
      if (baseHref === '/') return url;
      if (isHtml5) return baseHref.slice(0, -1) + url;
      if (absolute) return baseHref.slice(1) + url;
      return url;
    }

    // TODO: Optimize groups of rules with non-empty prefix into some sort of decision tree
    function update(evt) {
      if (evt && evt.defaultPrevented) return;
      var ignoreUpdate = lastPushedUrl && $location.url() === lastPushedUrl;
      lastPushedUrl = undefined;
      // TODO: Re-implement this in 1.0 for https://github.com/angular-ui/ui-router/issues/1573
      //if (ignoreUpdate) return true;

      function check(rule) {
        var handled = rule($injector, $location);

        if (!handled) return false;
        if (isString(handled)) $location.replace().url(handled);
        return true;
      }
      var n = rules.length, i;

      for (i = 0; i < n; i++) {
        if (check(rules[i])) return;
      }
      // always check otherwise last to allow dynamic updates to the set of rules
      if (otherwise) check(otherwise);
    }

    function listen() {
      listener = listener || $rootScope.$on('$locationChangeSuccess', update);
      return listener;
    }

    if (!interceptDeferred) listen();

    return {
      /**
       * @ngdoc function
       * @name ui.router.router.$urlRouter#sync
       * @methodOf ui.router.router.$urlRouter
       *
       * @description
       * Triggers an update; the same update that happens when the address bar url changes, aka `$locationChangeSuccess`.
       * This method is useful when you need to use `preventDefault()` on the `$locationChangeSuccess` event,
       * perform some custom logic (route protection, auth, config, redirection, etc) and then finally proceed
       * with the transition by calling `$urlRouter.sync()`.
       *
       * @example
       * <pre>
       * angular.module('app', ['ui.router'])
       *   .run(function($rootScope, $urlRouter) {
       *     $rootScope.$on('$locationChangeSuccess', function(evt) {
       *       // Halt state change from even starting
       *       evt.preventDefault();
       *       // Perform custom logic
       *       var meetsRequirement = ...
       *       // Continue with the update and state transition if logic allows
       *       if (meetsRequirement) $urlRouter.sync();
       *     });
       * });
       * </pre>
       */
      sync: function() {
        update();
      },

      listen: function() {
        return listen();
      },

      update: function(read) {
        if (read) {
          location = $location.url();
          return;
        }
        if ($location.url() === location) return;

        $location.url(location);
        $location.replace();
      },

      push: function(urlMatcher, params, options) {
         var url = urlMatcher.format(params || {});

        // Handle the special hash param, if needed
        if (url !== null && params && params['#']) {
            url += '#' + params['#'];
        }

        $location.url(url);
        lastPushedUrl = options && options.$$avoidResync ? $location.url() : undefined;
        if (options && options.replace) $location.replace();
      },

      /**
       * @ngdoc function
       * @name ui.router.router.$urlRouter#href
       * @methodOf ui.router.router.$urlRouter
       *
       * @description
       * A URL generation method that returns the compiled URL for a given
       * {@link ui.router.util.type:UrlMatcher `UrlMatcher`}, populated with the provided parameters.
       *
       * @example
       * <pre>
       * $bob = $urlRouter.href(new UrlMatcher("/about/:person"), {
       *   person: "bob"
       * });
       * // $bob == "/about/bob";
       * </pre>
       *
       * @param {UrlMatcher} urlMatcher The `UrlMatcher` object which is used as the template of the URL to generate.
       * @param {object=} params An object of parameter values to fill the matcher's required parameters.
       * @param {object=} options Options object. The options are:
       *
       * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
       *
       * @returns {string} Returns the fully compiled URL, or `null` if `params` fail validation against `urlMatcher`
       */
      href: function(urlMatcher, params, options) {
        if (!urlMatcher.validates(params)) return null;

        var isHtml5 = $locationProvider.html5Mode();
        if (angular.isObject(isHtml5)) {
          isHtml5 = isHtml5.enabled;
        }

        isHtml5 = isHtml5 && $sniffer.history;
        
        var url = urlMatcher.format(params);
        options = options || {};

        if (!isHtml5 && url !== null) {
          url = "#" + $locationProvider.hashPrefix() + url;
        }

        // Handle special hash param, if needed
        if (url !== null && params && params['#']) {
          url += '#' + params['#'];
        }

        url = appendBasePath(url, isHtml5, options.absolute);

        if (!options.absolute || !url) {
          return url;
        }

        var slash = (!isHtml5 && url ? '/' : ''), port = $location.port();
        port = (port === 80 || port === 443 ? '' : ':' + port);

        return [$location.protocol(), '://', $location.host(), port, slash, url].join('');
      }
    };
  }
}

angular.module('ui.router.router').provider('$urlRouter', $UrlRouterProvider);

/**
 * @ngdoc object
 * @name ui.router.state.$stateProvider
 *
 * @requires ui.router.router.$urlRouterProvider
 * @requires ui.router.util.$urlMatcherFactoryProvider
 *
 * @description
 * The new `$stateProvider` works similar to Angular's v1 router, but it focuses purely
 * on state.
 *
 * A state corresponds to a "place" in the application in terms of the overall UI and
 * navigation. A state describes (via the controller / template / view properties) what
 * the UI looks like and does at that place.
 *
 * States often have things in common, and the primary way of factoring out these
 * commonalities in this model is via the state hierarchy, i.e. parent/child states aka
 * nested states.
 *
 * The `$stateProvider` provides interfaces to declare these states for your app.
 */
$StateProvider.$inject = ['$urlRouterProvider', '$urlMatcherFactoryProvider'];
function $StateProvider(   $urlRouterProvider,   $urlMatcherFactory) {

  var root, states = {}, $state, queue = {}, abstractKey = 'abstract';

  // Builds state properties from definition passed to registerState()
  var stateBuilder = {

    // Derive parent state from a hierarchical name only if 'parent' is not explicitly defined.
    // state.children = [];
    // if (parent) parent.children.push(state);
    parent: function(state) {
      if (isDefined(state.parent) && state.parent) return findState(state.parent);
      // regex matches any valid composite state name
      // would match "contact.list" but not "contacts"
      var compositeName = /^(.+)\.[^.]+$/.exec(state.name);
      return compositeName ? findState(compositeName[1]) : root;
    },

    // inherit 'data' from parent and override by own values (if any)
    data: function(state) {
      if (state.parent && state.parent.data) {
        state.data = state.self.data = inherit(state.parent.data, state.data);
      }
      return state.data;
    },

    // Build a URLMatcher if necessary, either via a relative or absolute URL
    url: function(state) {
      var url = state.url, config = { params: state.params || {} };

      if (isString(url)) {
        if (url.charAt(0) == '^') return $urlMatcherFactory.compile(url.substring(1), config);
        return (state.parent.navigable || root).url.concat(url, config);
      }

      if (!url || $urlMatcherFactory.isMatcher(url)) return url;
      throw new Error("Invalid url '" + url + "' in state '" + state + "'");
    },

    // Keep track of the closest ancestor state that has a URL (i.e. is navigable)
    navigable: function(state) {
      return state.url ? state : (state.parent ? state.parent.navigable : null);
    },

    // Own parameters for this state. state.url.params is already built at this point. Create and add non-url params
    ownParams: function(state) {
      var params = state.url && state.url.params || new $$UMFP.ParamSet();
      forEach(state.params || {}, function(config, id) {
        if (!params[id]) params[id] = new $$UMFP.Param(id, null, config, "config");
      });
      return params;
    },

    // Derive parameters for this state and ensure they're a super-set of parent's parameters
    params: function(state) {
      var ownParams = pick(state.ownParams, state.ownParams.$$keys());
      return state.parent && state.parent.params ? extend(state.parent.params.$$new(), ownParams) : new $$UMFP.ParamSet();
    },

    // If there is no explicit multi-view configuration, make one up so we don't have
    // to handle both cases in the view directive later. Note that having an explicit
    // 'views' property will mean the default unnamed view properties are ignored. This
    // is also a good time to resolve view names to absolute names, so everything is a
    // straight lookup at link time.
    views: function(state) {
      var views = {};

      forEach(isDefined(state.views) ? state.views : { '': state }, function (view, name) {
        if (name.indexOf('@') < 0) name += '@' + state.parent.name;
        view.resolveAs = view.resolveAs || state.resolveAs || '$resolve';
        views[name] = view;
      });
      return views;
    },

    // Keep a full path from the root down to this state as this is needed for state activation.
    path: function(state) {
      return state.parent ? state.parent.path.concat(state) : []; // exclude root from path
    },

    // Speed up $state.contains() as it's used a lot
    includes: function(state) {
      var includes = state.parent ? extend({}, state.parent.includes) : {};
      includes[state.name] = true;
      return includes;
    },

    $delegates: {}
  };

  function isRelative(stateName) {
    return stateName.indexOf(".") === 0 || stateName.indexOf("^") === 0;
  }

  function findState(stateOrName, base) {
    if (!stateOrName) return undefined;

    var isStr = isString(stateOrName),
        name  = isStr ? stateOrName : stateOrName.name,
        path  = isRelative(name);

    if (path) {
      if (!base) throw new Error("No reference point given for path '"  + name + "'");
      base = findState(base);
      
      var rel = name.split("."), i = 0, pathLength = rel.length, current = base;

      for (; i < pathLength; i++) {
        if (rel[i] === "" && i === 0) {
          current = base;
          continue;
        }
        if (rel[i] === "^") {
          if (!current.parent) throw new Error("Path '" + name + "' not valid for state '" + base.name + "'");
          current = current.parent;
          continue;
        }
        break;
      }
      rel = rel.slice(i).join(".");
      name = current.name + (current.name && rel ? "." : "") + rel;
    }
    var state = states[name];

    if (state && (isStr || (!isStr && (state === stateOrName || state.self === stateOrName)))) {
      return state;
    }
    return undefined;
  }

  function queueState(parentName, state) {
    if (!queue[parentName]) {
      queue[parentName] = [];
    }
    queue[parentName].push(state);
  }

  function flushQueuedChildren(parentName) {
    var queued = queue[parentName] || [];
    while(queued.length) {
      registerState(queued.shift());
    }
  }

  function registerState(state) {
    // Wrap a new object around the state so we can store our private details easily.
    state = inherit(state, {
      self: state,
      resolve: state.resolve || {},
      toString: function() { return this.name; }
    });

    var name = state.name;
    if (!isString(name) || name.indexOf('@') >= 0) throw new Error("State must have a valid name");
    if (states.hasOwnProperty(name)) throw new Error("State '" + name + "' is already defined");

    // Get parent name
    var parentName = (name.indexOf('.') !== -1) ? name.substring(0, name.lastIndexOf('.'))
        : (isString(state.parent)) ? state.parent
        : (isObject(state.parent) && isString(state.parent.name)) ? state.parent.name
        : '';

    // If parent is not registered yet, add state to queue and register later
    if (parentName && !states[parentName]) {
      return queueState(parentName, state.self);
    }

    for (var key in stateBuilder) {
      if (isFunction(stateBuilder[key])) state[key] = stateBuilder[key](state, stateBuilder.$delegates[key]);
    }
    states[name] = state;

    // Register the state in the global state list and with $urlRouter if necessary.
    if (!state[abstractKey] && state.url) {
      $urlRouterProvider.when(state.url, ['$match', '$stateParams', function ($match, $stateParams) {
        if ($state.$current.navigable != state || !equalForKeys($match, $stateParams)) {
          $state.transitionTo(state, $match, { inherit: true, location: false });
        }
      }]);
    }

    // Register any queued children
    flushQueuedChildren(name);

    return state;
  }

  // Checks text to see if it looks like a glob.
  function isGlob (text) {
    return text.indexOf('*') > -1;
  }

  // Returns true if glob matches current $state name.
  function doesStateMatchGlob (glob) {
    var globSegments = glob.split('.'),
        segments = $state.$current.name.split('.');

    //match single stars
    for (var i = 0, l = globSegments.length; i < l; i++) {
      if (globSegments[i] === '*') {
        segments[i] = '*';
      }
    }

    //match greedy starts
    if (globSegments[0] === '**') {
       segments = segments.slice(indexOf(segments, globSegments[1]));
       segments.unshift('**');
    }
    //match greedy ends
    if (globSegments[globSegments.length - 1] === '**') {
       segments.splice(indexOf(segments, globSegments[globSegments.length - 2]) + 1, Number.MAX_VALUE);
       segments.push('**');
    }

    if (globSegments.length != segments.length) {
      return false;
    }

    return segments.join('') === globSegments.join('');
  }


  // Implicit root state that is always active
  root = registerState({
    name: '',
    url: '^',
    views: null,
    'abstract': true
  });
  root.navigable = null;


  /**
   * @ngdoc function
   * @name ui.router.state.$stateProvider#decorator
   * @methodOf ui.router.state.$stateProvider
   *
   * @description
   * Allows you to extend (carefully) or override (at your own peril) the 
   * `stateBuilder` object used internally by `$stateProvider`. This can be used 
   * to add custom functionality to ui-router, for example inferring templateUrl 
   * based on the state name.
   *
   * When passing only a name, it returns the current (original or decorated) builder
   * function that matches `name`.
   *
   * The builder functions that can be decorated are listed below. Though not all
   * necessarily have a good use case for decoration, that is up to you to decide.
   *
   * In addition, users can attach custom decorators, which will generate new 
   * properties within the state's internal definition. There is currently no clear 
   * use-case for this beyond accessing internal states (i.e. $state.$current), 
   * however, expect this to become increasingly relevant as we introduce additional 
   * meta-programming features.
   *
   * **Warning**: Decorators should not be interdependent because the order of 
   * execution of the builder functions in non-deterministic. Builder functions 
   * should only be dependent on the state definition object and super function.
   *
   *
   * Existing builder functions and current return values:
   *
   * - **parent** `{object}` - returns the parent state object.
   * - **data** `{object}` - returns state data, including any inherited data that is not
   *   overridden by own values (if any).
   * - **url** `{object}` - returns a {@link ui.router.util.type:UrlMatcher UrlMatcher}
   *   or `null`.
   * - **navigable** `{object}` - returns closest ancestor state that has a URL (aka is 
   *   navigable).
   * - **params** `{object}` - returns an array of state params that are ensured to 
   *   be a super-set of parent's params.
   * - **views** `{object}` - returns a views object where each key is an absolute view 
   *   name (i.e. "viewName@stateName") and each value is the config object 
   *   (template, controller) for the view. Even when you don't use the views object 
   *   explicitly on a state config, one is still created for you internally.
   *   So by decorating this builder function you have access to decorating template 
   *   and controller properties.
   * - **ownParams** `{object}` - returns an array of params that belong to the state, 
   *   not including any params defined by ancestor states.
   * - **path** `{string}` - returns the full path from the root down to this state. 
   *   Needed for state activation.
   * - **includes** `{object}` - returns an object that includes every state that 
   *   would pass a `$state.includes()` test.
   *
   * @example
   * <pre>
   * // Override the internal 'views' builder with a function that takes the state
   * // definition, and a reference to the internal function being overridden:
   * $stateProvider.decorator('views', function (state, parent) {
   *   var result = {},
   *       views = parent(state);
   *
   *   angular.forEach(views, function (config, name) {
   *     var autoName = (state.name + '.' + name).replace('.', '/');
   *     config.templateUrl = config.templateUrl || '/partials/' + autoName + '.html';
   *     result[name] = config;
   *   });
   *   return result;
   * });
   *
   * $stateProvider.state('home', {
   *   views: {
   *     'contact.list': { controller: 'ListController' },
   *     'contact.item': { controller: 'ItemController' }
   *   }
   * });
   *
   * // ...
   *
   * $state.go('home');
   * // Auto-populates list and item views with /partials/home/contact/list.html,
   * // and /partials/home/contact/item.html, respectively.
   * </pre>
   *
   * @param {string} name The name of the builder function to decorate. 
   * @param {object} func A function that is responsible for decorating the original 
   * builder function. The function receives two parameters:
   *
   *   - `{object}` - state - The state config object.
   *   - `{object}` - super - The original builder function.
   *
   * @return {object} $stateProvider - $stateProvider instance
   */
  this.decorator = decorator;
  function decorator(name, func) {
    /*jshint validthis: true */
    if (isString(name) && !isDefined(func)) {
      return stateBuilder[name];
    }
    if (!isFunction(func) || !isString(name)) {
      return this;
    }
    if (stateBuilder[name] && !stateBuilder.$delegates[name]) {
      stateBuilder.$delegates[name] = stateBuilder[name];
    }
    stateBuilder[name] = func;
    return this;
  }

  /**
   * @ngdoc function
   * @name ui.router.state.$stateProvider#state
   * @methodOf ui.router.state.$stateProvider
   *
   * @description
   * Registers a state configuration under a given state name. The stateConfig object
   * has the following acceptable properties.
   *
   * @param {string} name A unique state name, e.g. "home", "about", "contacts".
   * To create a parent/child state use a dot, e.g. "about.sales", "home.newest".
   * @param {object} stateConfig State configuration object.
   * @param {string|function=} stateConfig.template
   * <a id='template'></a>
   *   html template as a string or a function that returns
   *   an html template as a string which should be used by the uiView directives. This property 
   *   takes precedence over templateUrl.
   *   
   *   If `template` is a function, it will be called with the following parameters:
   *
   *   - {array.&lt;object&gt;} - state parameters extracted from the current $location.path() by
   *     applying the current state
   *
   * <pre>template:
   *   "<h1>inline template definition</h1>" +
   *   "<div ui-view></div>"</pre>
   * <pre>template: function(params) {
   *       return "<h1>generated template</h1>"; }</pre>
   * </div>
   *
   * @param {string|function=} stateConfig.templateUrl
   * <a id='templateUrl'></a>
   *
   *   path or function that returns a path to an html
   *   template that should be used by uiView.
   *   
   *   If `templateUrl` is a function, it will be called with the following parameters:
   *
   *   - {array.&lt;object&gt;} - state parameters extracted from the current $location.path() by 
   *     applying the current state
   *
   * <pre>templateUrl: "home.html"</pre>
   * <pre>templateUrl: function(params) {
   *     return myTemplates[params.pageId]; }</pre>
   *
   * @param {function=} stateConfig.templateProvider
   * <a id='templateProvider'></a>
   *    Provider function that returns HTML content string.
   * <pre> templateProvider:
   *       function(MyTemplateService, params) {
   *         return MyTemplateService.getTemplate(params.pageId);
   *       }</pre>
   *
   * @param {string|function=} stateConfig.controller
   * <a id='controller'></a>
   *
   *  Controller fn that should be associated with newly
   *   related scope or the name of a registered controller if passed as a string.
   *   Optionally, the ControllerAs may be declared here.
   * <pre>controller: "MyRegisteredController"</pre>
   * <pre>controller:
   *     "MyRegisteredController as fooCtrl"}</pre>
   * <pre>controller: function($scope, MyService) {
   *     $scope.data = MyService.getData(); }</pre>
   *
   * @param {function=} stateConfig.controllerProvider
   * <a id='controllerProvider'></a>
   *
   * Injectable provider function that returns the actual controller or string.
   * <pre>controllerProvider:
   *   function(MyResolveData) {
   *     if (MyResolveData.foo)
   *       return "FooCtrl"
   *     else if (MyResolveData.bar)
   *       return "BarCtrl";
   *     else return function($scope) {
   *       $scope.baz = "Qux";
   *     }
   *   }</pre>
   *
   * @param {string=} stateConfig.controllerAs
   * <a id='controllerAs'></a>
   * 
   * A controller alias name. If present the controller will be
   *   published to scope under the controllerAs name.
   * <pre>controllerAs: "myCtrl"</pre>
   *
   * @param {string|object=} stateConfig.parent
   * <a id='parent'></a>
   * Optionally specifies the parent state of this state.
   *
   * <pre>parent: 'parentState'</pre>
   * <pre>parent: parentState // JS variable</pre>
   *
   * @param {object=} stateConfig.resolve
   * <a id='resolve'></a>
   *
   * An optional map&lt;string, function&gt; of dependencies which
   *   should be injected into the controller. If any of these dependencies are promises, 
   *   the router will wait for them all to be resolved before the controller is instantiated.
   *   If all the promises are resolved successfully, the $stateChangeSuccess event is fired
   *   and the values of the resolved promises are injected into any controllers that reference them.
   *   If any  of the promises are rejected the $stateChangeError event is fired.
   *
   *   The map object is:
   *   
   *   - key - {string}: name of dependency to be injected into controller
   *   - factory - {string|function}: If string then it is alias for service. Otherwise if function, 
   *     it is injected and return value it treated as dependency. If result is a promise, it is 
   *     resolved before its value is injected into controller.
   *
   * <pre>resolve: {
   *     myResolve1:
   *       function($http, $stateParams) {
   *         return $http.get("/api/foos/"+stateParams.fooID);
   *       }
   *     }</pre>
   *
   * @param {string=} stateConfig.url
   * <a id='url'></a>
   *
   *   A url fragment with optional parameters. When a state is navigated or
   *   transitioned to, the `$stateParams` service will be populated with any 
   *   parameters that were passed.
   *
   *   (See {@link ui.router.util.type:UrlMatcher UrlMatcher} `UrlMatcher`} for
   *   more details on acceptable patterns )
   *
   * examples:
   * <pre>url: "/home"
   * url: "/users/:userid"
   * url: "/books/{bookid:[a-zA-Z_-]}"
   * url: "/books/{categoryid:int}"
   * url: "/books/{publishername:string}/{categoryid:int}"
   * url: "/messages?before&after"
   * url: "/messages?{before:date}&{after:date}"
   * url: "/messages/:mailboxid?{before:date}&{after:date}"
   * </pre>
   *
   * @param {object=} stateConfig.views
   * <a id='views'></a>
   * an optional map&lt;string, object&gt; which defined multiple views, or targets views
   * manually/explicitly.
   *
   * Examples:
   *
   * Targets three named `ui-view`s in the parent state's template
   * <pre>views: {
   *     header: {
   *       controller: "headerCtrl",
   *       templateUrl: "header.html"
   *     }, body: {
   *       controller: "bodyCtrl",
   *       templateUrl: "body.html"
   *     }, footer: {
   *       controller: "footCtrl",
   *       templateUrl: "footer.html"
   *     }
   *   }</pre>
   *
   * Targets named `ui-view="header"` from grandparent state 'top''s template, and named `ui-view="body" from parent state's template.
   * <pre>views: {
   *     'header@top': {
   *       controller: "msgHeaderCtrl",
   *       templateUrl: "msgHeader.html"
   *     }, 'body': {
   *       controller: "messagesCtrl",
   *       templateUrl: "messages.html"
   *     }
   *   }</pre>
   *
   * @param {boolean=} [stateConfig.abstract=false]
   * <a id='abstract'></a>
   * An abstract state will never be directly activated,
   *   but can provide inherited properties to its common children states.
   * <pre>abstract: true</pre>
   *
   * @param {function=} stateConfig.onEnter
   * <a id='onEnter'></a>
   *
   * Callback function for when a state is entered. Good way
   *   to trigger an action or dispatch an event, such as opening a dialog.
   * If minifying your scripts, make sure to explicitly annotate this function,
   * because it won't be automatically annotated by your build tools.
   *
   * <pre>onEnter: function(MyService, $stateParams) {
   *     MyService.foo($stateParams.myParam);
   * }</pre>
   *
   * @param {function=} stateConfig.onExit
   * <a id='onExit'></a>
   *
   * Callback function for when a state is exited. Good way to
   *   trigger an action or dispatch an event, such as opening a dialog.
   * If minifying your scripts, make sure to explicitly annotate this function,
   * because it won't be automatically annotated by your build tools.
   *
   * <pre>onExit: function(MyService, $stateParams) {
   *     MyService.cleanup($stateParams.myParam);
   * }</pre>
   *
   * @param {boolean=} [stateConfig.reloadOnSearch=true]
   * <a id='reloadOnSearch'></a>
   *
   * If `false`, will not retrigger the same state
   *   just because a search/query parameter has changed (via $location.search() or $location.hash()). 
   *   Useful for when you'd like to modify $location.search() without triggering a reload.
   * <pre>reloadOnSearch: false</pre>
   *
   * @param {object=} stateConfig.data
   * <a id='data'></a>
   *
   * Arbitrary data object, useful for custom configuration.  The parent state's `data` is
   *   prototypally inherited.  In other words, adding a data property to a state adds it to
   *   the entire subtree via prototypal inheritance.
   *
   * <pre>data: {
   *     requiredRole: 'foo'
   * } </pre>
   *
   * @param {object=} stateConfig.params
   * <a id='params'></a>
   *
   * A map which optionally configures parameters declared in the `url`, or
   *   defines additional non-url parameters.  For each parameter being
   *   configured, add a configuration object keyed to the name of the parameter.
   *
   *   Each parameter configuration object may contain the following properties:
   *
   *   - ** value ** - {object|function=}: specifies the default value for this
   *     parameter.  This implicitly sets this parameter as optional.
   *
   *     When UI-Router routes to a state and no value is
   *     specified for this parameter in the URL or transition, the
   *     default value will be used instead.  If `value` is a function,
   *     it will be injected and invoked, and the return value used.
   *
   *     *Note*: `undefined` is treated as "no default value" while `null`
   *     is treated as "the default value is `null`".
   *
   *     *Shorthand*: If you only need to configure the default value of the
   *     parameter, you may use a shorthand syntax.   In the **`params`**
   *     map, instead mapping the param name to a full parameter configuration
   *     object, simply set map it to the default parameter value, e.g.:
   *
   * <pre>// define a parameter's default value
   * params: {
   *     param1: { value: "defaultValue" }
   * }
   * // shorthand default values
   * params: {
   *     param1: "defaultValue",
   *     param2: "param2Default"
   * }</pre>
   *
   *   - ** array ** - {boolean=}: *(default: false)* If true, the param value will be
   *     treated as an array of values.  If you specified a Type, the value will be
   *     treated as an array of the specified Type.  Note: query parameter values
   *     default to a special `"auto"` mode.
   *
   *     For query parameters in `"auto"` mode, if multiple  values for a single parameter
   *     are present in the URL (e.g.: `/foo?bar=1&bar=2&bar=3`) then the values
   *     are mapped to an array (e.g.: `{ foo: [ '1', '2', '3' ] }`).  However, if
   *     only one value is present (e.g.: `/foo?bar=1`) then the value is treated as single
   *     value (e.g.: `{ foo: '1' }`).
   *
   * <pre>params: {
   *     param1: { array: true }
   * }</pre>
   *
   *   - ** squash ** - {bool|string=}: `squash` configures how a default parameter value is represented in the URL when
   *     the current parameter value is the same as the default value. If `squash` is not set, it uses the
   *     configured default squash policy.
   *     (See {@link ui.router.util.$urlMatcherFactory#methods_defaultSquashPolicy `defaultSquashPolicy()`})
   *
   *   There are three squash settings:
   *
   *     - false: The parameter's default value is not squashed.  It is encoded and included in the URL
   *     - true: The parameter's default value is omitted from the URL.  If the parameter is preceeded and followed
   *       by slashes in the state's `url` declaration, then one of those slashes are omitted.
   *       This can allow for cleaner looking URLs.
   *     - `"<arbitrary string>"`: The parameter's default value is replaced with an arbitrary placeholder of  your choice.
   *
   * <pre>params: {
   *     param1: {
   *       value: "defaultId",
   *       squash: true
   * } }
   * // squash "defaultValue" to "~"
   * params: {
   *     param1: {
   *       value: "defaultValue",
   *       squash: "~"
   * } }
   * </pre>
   *
   *
   * @example
   * <pre>
   * // Some state name examples
   *
   * // stateName can be a single top-level name (must be unique).
   * $stateProvider.state("home", {});
   *
   * // Or it can be a nested state name. This state is a child of the
   * // above "home" state.
   * $stateProvider.state("home.newest", {});
   *
   * // Nest states as deeply as needed.
   * $stateProvider.state("home.newest.abc.xyz.inception", {});
   *
   * // state() returns $stateProvider, so you can chain state declarations.
   * $stateProvider
   *   .state("home", {})
   *   .state("about", {})
   *   .state("contacts", {});
   * </pre>
   *
   */
  this.state = state;
  function state(name, definition) {
    /*jshint validthis: true */
    if (isObject(name)) definition = name;
    else definition.name = name;
    registerState(definition);
    return this;
  }

  /**
   * @ngdoc object
   * @name ui.router.state.$state
   *
   * @requires $rootScope
   * @requires $q
   * @requires ui.router.state.$view
   * @requires $injector
   * @requires ui.router.util.$resolve
   * @requires ui.router.state.$stateParams
   * @requires ui.router.router.$urlRouter
   *
   * @property {object} params A param object, e.g. {sectionId: section.id)}, that 
   * you'd like to test against the current active state.
   * @property {object} current A reference to the state's config object. However 
   * you passed it in. Useful for accessing custom data.
   * @property {object} transition Currently pending transition. A promise that'll 
   * resolve or reject.
   *
   * @description
   * `$state` service is responsible for representing states as well as transitioning
   * between them. It also provides interfaces to ask for current state or even states
   * you're coming from.
   */
  this.$get = $get;
  $get.$inject = ['$rootScope', '$q', '$view', '$injector', '$resolve', '$stateParams', '$urlRouter', '$location', '$urlMatcherFactory'];
  function $get(   $rootScope,   $q,   $view,   $injector,   $resolve,   $stateParams,   $urlRouter,   $location,   $urlMatcherFactory) {

    var TransitionSupersededError = new Error('transition superseded');

    var TransitionSuperseded = silenceUncaughtInPromise($q.reject(TransitionSupersededError));
    var TransitionPrevented = silenceUncaughtInPromise($q.reject(new Error('transition prevented')));
    var TransitionAborted = silenceUncaughtInPromise($q.reject(new Error('transition aborted')));
    var TransitionFailed = silenceUncaughtInPromise($q.reject(new Error('transition failed')));

    // Handles the case where a state which is the target of a transition is not found, and the user
    // can optionally retry or defer the transition
    function handleRedirect(redirect, state, params, options) {
      /**
       * @ngdoc event
       * @name ui.router.state.$state#$stateNotFound
       * @eventOf ui.router.state.$state
       * @eventType broadcast on root scope
       * @description
       * Fired when a requested state **cannot be found** using the provided state name during transition.
       * The event is broadcast allowing any handlers a single chance to deal with the error (usually by
       * lazy-loading the unfound state). A special `unfoundState` object is passed to the listener handler,
       * you can see its three properties in the example. You can use `event.preventDefault()` to abort the
       * transition and the promise returned from `go` will be rejected with a `'transition aborted'` value.
       *
       * @param {Object} event Event object.
       * @param {Object} unfoundState Unfound State information. Contains: `to, toParams, options` properties.
       * @param {State} fromState Current state object.
       * @param {Object} fromParams Current state params.
       *
       * @example
       *
       * <pre>
       * // somewhere, assume lazy.state has not been defined
       * $state.go("lazy.state", {a:1, b:2}, {inherit:false});
       *
       * // somewhere else
       * $scope.$on('$stateNotFound',
       * function(event, unfoundState, fromState, fromParams){
       *     console.log(unfoundState.to); // "lazy.state"
       *     console.log(unfoundState.toParams); // {a:1, b:2}
       *     console.log(unfoundState.options); // {inherit:false} + default options
       * })
       * </pre>
       */
      var evt = $rootScope.$broadcast('$stateNotFound', redirect, state, params);

      if (evt.defaultPrevented) {
        $urlRouter.update();
        return TransitionAborted;
      }

      if (!evt.retry) {
        return null;
      }

      // Allow the handler to return a promise to defer state lookup retry
      if (options.$retry) {
        $urlRouter.update();
        return TransitionFailed;
      }
      var retryTransition = $state.transition = $q.when(evt.retry);

      retryTransition.then(function() {
        if (retryTransition !== $state.transition) {
          $rootScope.$broadcast('$stateChangeCancel', redirect.to, redirect.toParams, state, params);
          return TransitionSuperseded;
        }
        redirect.options.$retry = true;
        return $state.transitionTo(redirect.to, redirect.toParams, redirect.options);
      }, function() {
        return TransitionAborted;
      });
      $urlRouter.update();

      return retryTransition;
    }

    root.locals = { resolve: null, globals: { $stateParams: {} } };

    $state = {
      params: {},
      current: root.self,
      $current: root,
      transition: null
    };

    /**
     * @ngdoc function
     * @name ui.router.state.$state#reload
     * @methodOf ui.router.state.$state
     *
     * @description
     * A method that force reloads the current state. All resolves are re-resolved,
     * controllers reinstantiated, and events re-fired.
     *
     * @example
     * <pre>
     * var app angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.reload = function(){
     *     $state.reload();
     *   }
     * });
     * </pre>
     *
     * `reload()` is just an alias for:
     * <pre>
     * $state.transitionTo($state.current, $stateParams, { 
     *   reload: true, inherit: false, notify: true
     * });
     * </pre>
     *
     * @param {string=|object=} state - A state name or a state object, which is the root of the resolves to be re-resolved.
     * @example
     * <pre>
     * //assuming app application consists of 3 states: 'contacts', 'contacts.detail', 'contacts.detail.item' 
     * //and current state is 'contacts.detail.item'
     * var app angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.reload = function(){
     *     //will reload 'contact.detail' and 'contact.detail.item' states
     *     $state.reload('contact.detail');
     *   }
     * });
     * </pre>
     *
     * `reload()` is just an alias for:
     * <pre>
     * $state.transitionTo($state.current, $stateParams, { 
     *   reload: true, inherit: false, notify: true
     * });
     * </pre>

     * @returns {promise} A promise representing the state of the new transition. See
     * {@link ui.router.state.$state#methods_go $state.go}.
     */
    $state.reload = function reload(state) {
      return $state.transitionTo($state.current, $stateParams, { reload: state || true, inherit: false, notify: true});
    };

    /**
     * @ngdoc function
     * @name ui.router.state.$state#go
     * @methodOf ui.router.state.$state
     *
     * @description
     * Convenience method for transitioning to a new state. `$state.go` calls 
     * `$state.transitionTo` internally but automatically sets options to 
     * `{ location: true, inherit: true, relative: $state.$current, notify: true }`. 
     * This allows you to easily use an absolute or relative to path and specify 
     * only the parameters you'd like to update (while letting unspecified parameters 
     * inherit from the currently active ancestor states).
     *
     * @example
     * <pre>
     * var app = angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.changeState = function () {
     *     $state.go('contact.detail');
     *   };
     * });
     * </pre>
     * <img src='../ngdoc_assets/StateGoExamples.png'/>
     *
     * @param {string} to Absolute state name or relative state path. Some examples:
     *
     * - `$state.go('contact.detail')` - will go to the `contact.detail` state
     * - `$state.go('^')` - will go to a parent state
     * - `$state.go('^.sibling')` - will go to a sibling state
     * - `$state.go('.child.grandchild')` - will go to grandchild state
     *
     * @param {object=} params A map of the parameters that will be sent to the state, 
     * will populate $stateParams. Any parameters that are not specified will be inherited from currently 
     * defined parameters. Only parameters specified in the state definition can be overridden, new 
     * parameters will be ignored. This allows, for example, going to a sibling state that shares parameters
     * specified in a parent state. Parameter inheritance only works between common ancestor states, I.e.
     * transitioning to a sibling will get you the parameters for all parents, transitioning to a child
     * will get you all current parameters, etc.
     * @param {object=} options Options object. The options are:
     *
     * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`
     *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
     * - **`inherit`** - {boolean=true}, If `true` will inherit url parameters from current url.
     * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'), 
     *    defines which state to be relative from.
     * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
     * - **`reload`** (v0.2.5) - {boolean=false|string|object}, If `true` will force transition even if no state or params
     *    have changed.  It will reload the resolves and views of the current state and parent states.
     *    If `reload` is a string (or state object), the state object is fetched (by name, or object reference); and \
     *    the transition reloads the resolves and views for that matched state, and all its children states.
     *
     * @returns {promise} A promise representing the state of the new transition.
     *
     * Possible success values:
     *
     * - $state.current
     *
     * <br/>Possible rejection values:
     *
     * - 'transition superseded' - when a newer transition has been started after this one
     * - 'transition prevented' - when `event.preventDefault()` has been called in a `$stateChangeStart` listener
     * - 'transition aborted' - when `event.preventDefault()` has been called in a `$stateNotFound` listener or
     *   when a `$stateNotFound` `event.retry` promise errors.
     * - 'transition failed' - when a state has been unsuccessfully found after 2 tries.
     * - *resolve error* - when an error has occurred with a `resolve`
     *
     */
    $state.go = function go(to, params, options) {
      return $state.transitionTo(to, params, extend({ inherit: true, relative: $state.$current }, options));
    };

    /**
     * @ngdoc function
     * @name ui.router.state.$state#transitionTo
     * @methodOf ui.router.state.$state
     *
     * @description
     * Low-level method for transitioning to a new state. {@link ui.router.state.$state#methods_go $state.go}
     * uses `transitionTo` internally. `$state.go` is recommended in most situations.
     *
     * @example
     * <pre>
     * var app = angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.changeState = function () {
     *     $state.transitionTo('contact.detail');
     *   };
     * });
     * </pre>
     *
     * @param {string} to State name.
     * @param {object=} toParams A map of the parameters that will be sent to the state,
     * will populate $stateParams.
     * @param {object=} options Options object. The options are:
     *
     * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`
     *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
     * - **`inherit`** - {boolean=false}, If `true` will inherit url parameters from current url.
     * - **`relative`** - {object=}, When transitioning with relative path (e.g '^'), 
     *    defines which state to be relative from.
     * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
     * - **`reload`** (v0.2.5) - {boolean=false|string=|object=}, If `true` will force transition even if the state or params 
     *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd
     *    use this when you want to force a reload when *everything* is the same, including search params.
     *    if String, then will reload the state with the name given in reload, and any children.
     *    if Object, then a stateObj is expected, will reload the state found in stateObj, and any children.
     *
     * @returns {promise} A promise representing the state of the new transition. See
     * {@link ui.router.state.$state#methods_go $state.go}.
     */
    $state.transitionTo = function transitionTo(to, toParams, options) {
      toParams = toParams || {};
      options = extend({
        location: true, inherit: false, relative: null, notify: true, reload: false, $retry: false
      }, options || {});

      var from = $state.$current, fromParams = $state.params, fromPath = from.path;
      var evt, toState = findState(to, options.relative);

      // Store the hash param for later (since it will be stripped out by various methods)
      var hash = toParams['#'];

      if (!isDefined(toState)) {
        var redirect = { to: to, toParams: toParams, options: options };
        var redirectResult = handleRedirect(redirect, from.self, fromParams, options);

        if (redirectResult) {
          return redirectResult;
        }

        // Always retry once if the $stateNotFound was not prevented
        // (handles either redirect changed or state lazy-definition)
        to = redirect.to;
        toParams = redirect.toParams;
        options = redirect.options;
        toState = findState(to, options.relative);

        if (!isDefined(toState)) {
          if (!options.relative) throw new Error("No such state '" + to + "'");
          throw new Error("Could not resolve '" + to + "' from state '" + options.relative + "'");
        }
      }
      if (toState[abstractKey]) throw new Error("Cannot transition to abstract state '" + to + "'");
      if (options.inherit) toParams = inheritParams($stateParams, toParams || {}, $state.$current, toState);
      if (!toState.params.$$validates(toParams)) return TransitionFailed;

      toParams = toState.params.$$values(toParams);
      to = toState;

      var toPath = to.path;

      // Starting from the root of the path, keep all levels that haven't changed
      var keep = 0, state = toPath[keep], locals = root.locals, toLocals = [];

      if (!options.reload) {
        while (state && state === fromPath[keep] && state.ownParams.$$equals(toParams, fromParams)) {
          locals = toLocals[keep] = state.locals;
          keep++;
          state = toPath[keep];
        }
      } else if (isString(options.reload) || isObject(options.reload)) {
        if (isObject(options.reload) && !options.reload.name) {
          throw new Error('Invalid reload state object');
        }
        
        var reloadState = options.reload === true ? fromPath[0] : findState(options.reload);
        if (options.reload && !reloadState) {
          throw new Error("No such reload state '" + (isString(options.reload) ? options.reload : options.reload.name) + "'");
        }

        while (state && state === fromPath[keep] && state !== reloadState) {
          locals = toLocals[keep] = state.locals;
          keep++;
          state = toPath[keep];
        }
      }

      // If we're going to the same state and all locals are kept, we've got nothing to do.
      // But clear 'transition', as we still want to cancel any other pending transitions.
      // TODO: We may not want to bump 'transition' if we're called from a location change
      // that we've initiated ourselves, because we might accidentally abort a legitimate
      // transition initiated from code?
      if (shouldSkipReload(to, toParams, from, fromParams, locals, options)) {
        if (hash) toParams['#'] = hash;
        $state.params = toParams;
        copy($state.params, $stateParams);
        copy(filterByKeys(to.params.$$keys(), $stateParams), to.locals.globals.$stateParams);
        if (options.location && to.navigable && to.navigable.url) {
          $urlRouter.push(to.navigable.url, toParams, {
            $$avoidResync: true, replace: options.location === 'replace'
          });
          $urlRouter.update(true);
        }
        $state.transition = null;
        return $q.when($state.current);
      }

      // Filter parameters before we pass them to event handlers etc.
      toParams = filterByKeys(to.params.$$keys(), toParams || {});
      
      // Re-add the saved hash before we start returning things or broadcasting $stateChangeStart
      if (hash) toParams['#'] = hash;
      
      // Broadcast start event and cancel the transition if requested
      if (options.notify) {
        /**
         * @ngdoc event
         * @name ui.router.state.$state#$stateChangeStart
         * @eventOf ui.router.state.$state
         * @eventType broadcast on root scope
         * @description
         * Fired when the state transition **begins**. You can use `event.preventDefault()`
         * to prevent the transition from happening and then the transition promise will be
         * rejected with a `'transition prevented'` value.
         *
         * @param {Object} event Event object.
         * @param {State} toState The state being transitioned to.
         * @param {Object} toParams The params supplied to the `toState`.
         * @param {State} fromState The current state, pre-transition.
         * @param {Object} fromParams The params supplied to the `fromState`.
         *
         * @example
         *
         * <pre>
         * $rootScope.$on('$stateChangeStart',
         * function(event, toState, toParams, fromState, fromParams){
         *     event.preventDefault();
         *     // transitionTo() promise will be rejected with
         *     // a 'transition prevented' error
         * })
         * </pre>
         */
        if ($rootScope.$broadcast('$stateChangeStart', to.self, toParams, from.self, fromParams, options).defaultPrevented) {
          $rootScope.$broadcast('$stateChangeCancel', to.self, toParams, from.self, fromParams);
          //Don't update and resync url if there's been a new transition started. see issue #2238, #600
          if ($state.transition == null) $urlRouter.update();
          return TransitionPrevented;
        }
      }

      // Resolve locals for the remaining states, but don't update any global state just
      // yet -- if anything fails to resolve the current state needs to remain untouched.
      // We also set up an inheritance chain for the locals here. This allows the view directive
      // to quickly look up the correct definition for each view in the current state. Even
      // though we create the locals object itself outside resolveState(), it is initially
      // empty and gets filled asynchronously. We need to keep track of the promise for the
      // (fully resolved) current locals, and pass this down the chain.
      var resolved = $q.when(locals);

      for (var l = keep; l < toPath.length; l++, state = toPath[l]) {
        locals = toLocals[l] = inherit(locals);
        resolved = resolveState(state, toParams, state === to, resolved, locals, options);
      }

      // Once everything is resolved, we are ready to perform the actual transition
      // and return a promise for the new state. We also keep track of what the
      // current promise is, so that we can detect overlapping transitions and
      // keep only the outcome of the last transition.
      var transition = $state.transition = resolved.then(function () {
        var l, entering, exiting;

        if ($state.transition !== transition) {
          $rootScope.$broadcast('$stateChangeCancel', to.self, toParams, from.self, fromParams);
          return TransitionSuperseded;
        }

        // Exit 'from' states not kept
        for (l = fromPath.length - 1; l >= keep; l--) {
          exiting = fromPath[l];
          if (exiting.self.onExit) {
            $injector.invoke(exiting.self.onExit, exiting.self, exiting.locals.globals);
          }
          exiting.locals = null;
        }

        // Enter 'to' states not kept
        for (l = keep; l < toPath.length; l++) {
          entering = toPath[l];
          entering.locals = toLocals[l];
          if (entering.self.onEnter) {
            $injector.invoke(entering.self.onEnter, entering.self, entering.locals.globals);
          }
        }

        // Run it again, to catch any transitions in callbacks
        if ($state.transition !== transition) {
          $rootScope.$broadcast('$stateChangeCancel', to.self, toParams, from.self, fromParams);
          return TransitionSuperseded;
        }

        // Update globals in $state
        $state.$current = to;
        $state.current = to.self;
        $state.params = toParams;
        copy($state.params, $stateParams);
        $state.transition = null;

        if (options.location && to.navigable) {
          $urlRouter.push(to.navigable.url, to.navigable.locals.globals.$stateParams, {
            $$avoidResync: true, replace: options.location === 'replace'
          });
        }

        if (options.notify) {
        /**
         * @ngdoc event
         * @name ui.router.state.$state#$stateChangeSuccess
         * @eventOf ui.router.state.$state
         * @eventType broadcast on root scope
         * @description
         * Fired once the state transition is **complete**.
         *
         * @param {Object} event Event object.
         * @param {State} toState The state being transitioned to.
         * @param {Object} toParams The params supplied to the `toState`.
         * @param {State} fromState The current state, pre-transition.
         * @param {Object} fromParams The params supplied to the `fromState`.
         */
          $rootScope.$broadcast('$stateChangeSuccess', to.self, toParams, from.self, fromParams);
        }
        $urlRouter.update(true);

        return $state.current;
      }).then(null, function (error) {
        // propagate TransitionSuperseded error without emitting $stateChangeCancel
        // as it was already emitted in the success handler above
        if (error === TransitionSupersededError) return TransitionSuperseded;

        if ($state.transition !== transition) {
          $rootScope.$broadcast('$stateChangeCancel', to.self, toParams, from.self, fromParams);
          return TransitionSuperseded;
        }

        $state.transition = null;
        /**
         * @ngdoc event
         * @name ui.router.state.$state#$stateChangeError
         * @eventOf ui.router.state.$state
         * @eventType broadcast on root scope
         * @description
         * Fired when an **error occurs** during transition. It's important to note that if you
         * have any errors in your resolve functions (javascript errors, non-existent services, etc)
         * they will not throw traditionally. You must listen for this $stateChangeError event to
         * catch **ALL** errors.
         *
         * @param {Object} event Event object.
         * @param {State} toState The state being transitioned to.
         * @param {Object} toParams The params supplied to the `toState`.
         * @param {State} fromState The current state, pre-transition.
         * @param {Object} fromParams The params supplied to the `fromState`.
         * @param {Error} error The resolve error object.
         */
        evt = $rootScope.$broadcast('$stateChangeError', to.self, toParams, from.self, fromParams, error);

        if (!evt.defaultPrevented) {
          $urlRouter.update();
        }

        return $q.reject(error);
      });

      silenceUncaughtInPromise(transition);
      return transition;
    };

    /**
     * @ngdoc function
     * @name ui.router.state.$state#is
     * @methodOf ui.router.state.$state
     *
     * @description
     * Similar to {@link ui.router.state.$state#methods_includes $state.includes},
     * but only checks for the full state name. If params is supplied then it will be
     * tested for strict equality against the current active params object, so all params
     * must match with none missing and no extras.
     *
     * @example
     * <pre>
     * $state.$current.name = 'contacts.details.item';
     *
     * // absolute name
     * $state.is('contact.details.item'); // returns true
     * $state.is(contactDetailItemStateObject); // returns true
     *
     * // relative name (. and ^), typically from a template
     * // E.g. from the 'contacts.details' template
     * <div ng-class="{highlighted: $state.is('.item')}">Item</div>
     * </pre>
     *
     * @param {string|object} stateOrName The state name (absolute or relative) or state object you'd like to check.
     * @param {object=} params A param object, e.g. `{sectionId: section.id}`, that you'd like
     * to test against the current active state.
     * @param {object=} options An options object.  The options are:
     *
     * - **`relative`** - {string|object} -  If `stateOrName` is a relative state name and `options.relative` is set, .is will
     * test relative to `options.relative` state (or name).
     *
     * @returns {boolean} Returns true if it is the state.
     */
    $state.is = function is(stateOrName, params, options) {
      options = extend({ relative: $state.$current }, options || {});
      var state = findState(stateOrName, options.relative);

      if (!isDefined(state)) { return undefined; }
      if ($state.$current !== state) { return false; }

      return !params || objectKeys(params).reduce(function(acc, key) {
        var paramDef = state.params[key];
        return acc && !paramDef || paramDef.type.equals($stateParams[key], params[key]);
      }, true);
    };

    /**
     * @ngdoc function
     * @name ui.router.state.$state#includes
     * @methodOf ui.router.state.$state
     *
     * @description
     * A method to determine if the current active state is equal to or is the child of the
     * state stateName. If any params are passed then they will be tested for a match as well.
     * Not all the parameters need to be passed, just the ones you'd like to test for equality.
     *
     * @example
     * Partial and relative names
     * <pre>
     * $state.$current.name = 'contacts.details.item';
     *
     * // Using partial names
     * $state.includes("contacts"); // returns true
     * $state.includes("contacts.details"); // returns true
     * $state.includes("contacts.details.item"); // returns true
     * $state.includes("contacts.list"); // returns false
     * $state.includes("about"); // returns false
     *
     * // Using relative names (. and ^), typically from a template
     * // E.g. from the 'contacts.details' template
     * <div ng-class="{highlighted: $state.includes('.item')}">Item</div>
     * </pre>
     *
     * Basic globbing patterns
     * <pre>
     * $state.$current.name = 'contacts.details.item.url';
     *
     * $state.includes("*.details.*.*"); // returns true
     * $state.includes("*.details.**"); // returns true
     * $state.includes("**.item.**"); // returns true
     * $state.includes("*.details.item.url"); // returns true
     * $state.includes("*.details.*.url"); // returns true
     * $state.includes("*.details.*"); // returns false
     * $state.includes("item.**"); // returns false
     * </pre>
     *
     * @param {string} stateOrName A partial name, relative name, or glob pattern
     * to be searched for within the current state name.
     * @param {object=} params A param object, e.g. `{sectionId: section.id}`,
     * that you'd like to test against the current active state.
     * @param {object=} options An options object.  The options are:
     *
     * - **`relative`** - {string|object=} -  If `stateOrName` is a relative state reference and `options.relative` is set,
     * .includes will test relative to `options.relative` state (or name).
     *
     * @returns {boolean} Returns true if it does include the state
     */
    $state.includes = function includes(stateOrName, params, options) {
      options = extend({ relative: $state.$current }, options || {});
      if (isString(stateOrName) && isGlob(stateOrName)) {
        if (!doesStateMatchGlob(stateOrName)) {
          return false;
        }
        stateOrName = $state.$current.name;
      }

      var state = findState(stateOrName, options.relative);
      if (!isDefined(state)) { return undefined; }
      if (!isDefined($state.$current.includes[state.name])) { return false; }
      if (!params) { return true; }

      var keys = objectKeys(params);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i], paramDef = state.params[key];
        if (paramDef && !paramDef.type.equals($stateParams[key], params[key])) {
          return false;
        }
      }

      return objectKeys(params).reduce(function(acc, key) {
        var paramDef = state.params[key];
        return acc && !paramDef || paramDef.type.equals($stateParams[key], params[key]);
      }, true);
    };


    /**
     * @ngdoc function
     * @name ui.router.state.$state#href
     * @methodOf ui.router.state.$state
     *
     * @description
     * A url generation method that returns the compiled url for the given state populated with the given params.
     *
     * @example
     * <pre>
     * expect($state.href("about.person", { person: "bob" })).toEqual("/about/bob");
     * </pre>
     *
     * @param {string|object} stateOrName The state name or state object you'd like to generate a url from.
     * @param {object=} params An object of parameter values to fill the state's required parameters.
     * @param {object=} options Options object. The options are:
     *
     * - **`lossy`** - {boolean=true} -  If true, and if there is no url associated with the state provided in the
     *    first parameter, then the constructed href url will be built from the first navigable ancestor (aka
     *    ancestor with a valid url).
     * - **`inherit`** - {boolean=true}, If `true` will inherit url parameters from current url.
     * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'), 
     *    defines which state to be relative from.
     * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
     * 
     * @returns {string} compiled state url
     */
    $state.href = function href(stateOrName, params, options) {
      options = extend({
        lossy:    true,
        inherit:  true,
        absolute: false,
        relative: $state.$current
      }, options || {});

      var state = findState(stateOrName, options.relative);

      if (!isDefined(state)) return null;
      if (options.inherit) params = inheritParams($stateParams, params || {}, $state.$current, state);
      
      var nav = (state && options.lossy) ? state.navigable : state;

      if (!nav || nav.url === undefined || nav.url === null) {
        return null;
      }
      return $urlRouter.href(nav.url, filterByKeys(state.params.$$keys().concat('#'), params || {}), {
        absolute: options.absolute
      });
    };

    /**
     * @ngdoc function
     * @name ui.router.state.$state#get
     * @methodOf ui.router.state.$state
     *
     * @description
     * Returns the state configuration object for any specific state or all states.
     *
     * @param {string|object=} stateOrName (absolute or relative) If provided, will only get the config for
     * the requested state. If not provided, returns an array of ALL state configs.
     * @param {string|object=} context When stateOrName is a relative state reference, the state will be retrieved relative to context.
     * @returns {Object|Array} State configuration object or array of all objects.
     */
    $state.get = function (stateOrName, context) {
      if (arguments.length === 0) return map(objectKeys(states), function(name) { return states[name].self; });
      var state = findState(stateOrName, context || $state.$current);
      return (state && state.self) ? state.self : null;
    };

    function resolveState(state, params, paramsAreFiltered, inherited, dst, options) {
      // Make a restricted $stateParams with only the parameters that apply to this state if
      // necessary. In addition to being available to the controller and onEnter/onExit callbacks,
      // we also need $stateParams to be available for any $injector calls we make during the
      // dependency resolution process.
      var $stateParams = (paramsAreFiltered) ? params : filterByKeys(state.params.$$keys(), params);
      var locals = { $stateParams: $stateParams };

      // Resolve 'global' dependencies for the state, i.e. those not specific to a view.
      // We're also including $stateParams in this; that way the parameters are restricted
      // to the set that should be visible to the state, and are independent of when we update
      // the global $state and $stateParams values.
      dst.resolve = $resolve.resolve(state.resolve, locals, dst.resolve, state);
      var promises = [dst.resolve.then(function (globals) {
        dst.globals = globals;
      })];
      if (inherited) promises.push(inherited);

      function resolveViews() {
        var viewsPromises = [];

        // Resolve template and dependencies for all views.
        forEach(state.views, function (view, name) {
          var injectables = (view.resolve && view.resolve !== state.resolve ? view.resolve : {});
          injectables.$template = [ function () {
            return $view.load(name, { view: view, locals: dst.globals, params: $stateParams, notify: options.notify }) || '';
          }];

          viewsPromises.push($resolve.resolve(injectables, dst.globals, dst.resolve, state).then(function (result) {
            // References to the controller (only instantiated at link time)
            if (isFunction(view.controllerProvider) || isArray(view.controllerProvider)) {
              var injectLocals = angular.extend({}, injectables, dst.globals);
              result.$$controller = $injector.invoke(view.controllerProvider, null, injectLocals);
            } else {
              result.$$controller = view.controller;
            }
            // Provide access to the state itself for internal use
            result.$$state = state;
            result.$$controllerAs = view.controllerAs;
            result.$$resolveAs = view.resolveAs;
            dst[name] = result;
          }));
        });

        return $q.all(viewsPromises).then(function(){
          return dst.globals;
        });
      }

      // Wait for all the promises and then return the activation object
      return $q.all(promises).then(resolveViews).then(function (values) {
        return dst;
      });
    }

    return $state;
  }

  function shouldSkipReload(to, toParams, from, fromParams, locals, options) {
    // Return true if there are no differences in non-search (path/object) params, false if there are differences
    function nonSearchParamsEqual(fromAndToState, fromParams, toParams) {
      // Identify whether all the parameters that differ between `fromParams` and `toParams` were search params.
      function notSearchParam(key) {
        return fromAndToState.params[key].location != "search";
      }
      var nonQueryParamKeys = fromAndToState.params.$$keys().filter(notSearchParam);
      var nonQueryParams = pick.apply({}, [fromAndToState.params].concat(nonQueryParamKeys));
      var nonQueryParamSet = new $$UMFP.ParamSet(nonQueryParams);
      return nonQueryParamSet.$$equals(fromParams, toParams);
    }

    // If reload was not explicitly requested
    // and we're transitioning to the same state we're already in
    // and    the locals didn't change
    //     or they changed in a way that doesn't merit reloading
    //        (reloadOnParams:false, or reloadOnSearch.false and only search params changed)
    // Then return true.
    if (!options.reload && to === from &&
      (locals === from.locals || (to.self.reloadOnSearch === false && nonSearchParamsEqual(from, fromParams, toParams)))) {
      return true;
    }
  }
}

angular.module('ui.router.state')
  .factory('$stateParams', function () { return {}; })
  .constant("$state.runtime", { autoinject: true })
  .provider('$state', $StateProvider)
  // Inject $state to initialize when entering runtime. #2574
  .run(['$injector', function ($injector) {
    // Allow tests (stateSpec.js) to turn this off by defining this constant
    if ($injector.get("$state.runtime").autoinject) {
      $injector.get('$state');
    }
  }]);


$ViewProvider.$inject = [];
function $ViewProvider() {

  this.$get = $get;
  /**
   * @ngdoc object
   * @name ui.router.state.$view
   *
   * @requires ui.router.util.$templateFactory
   * @requires $rootScope
   *
   * @description
   *
   */
  $get.$inject = ['$rootScope', '$templateFactory'];
  function $get(   $rootScope,   $templateFactory) {
    return {
      // $view.load('full.viewName', { template: ..., controller: ..., resolve: ..., async: false, params: ... })
      /**
       * @ngdoc function
       * @name ui.router.state.$view#load
       * @methodOf ui.router.state.$view
       *
       * @description
       *
       * @param {string} name name
       * @param {object} options option object.
       */
      load: function load(name, options) {
        var result, defaults = {
          template: null, controller: null, view: null, locals: null, notify: true, async: true, params: {}
        };
        options = extend(defaults, options);

        if (options.view) {
          result = $templateFactory.fromConfig(options.view, options.params, options.locals);
        }
        return result;
      }
    };
  }
}

angular.module('ui.router.state').provider('$view', $ViewProvider);

/**
 * @ngdoc object
 * @name ui.router.state.$uiViewScrollProvider
 *
 * @description
 * Provider that returns the {@link ui.router.state.$uiViewScroll} service function.
 */
function $ViewScrollProvider() {

  var useAnchorScroll = false;

  /**
   * @ngdoc function
   * @name ui.router.state.$uiViewScrollProvider#useAnchorScroll
   * @methodOf ui.router.state.$uiViewScrollProvider
   *
   * @description
   * Reverts back to using the core [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll) service for
   * scrolling based on the url anchor.
   */
  this.useAnchorScroll = function () {
    useAnchorScroll = true;
  };

  /**
   * @ngdoc object
   * @name ui.router.state.$uiViewScroll
   *
   * @requires $anchorScroll
   * @requires $timeout
   *
   * @description
   * When called with a jqLite element, it scrolls the element into view (after a
   * `$timeout` so the DOM has time to refresh).
   *
   * If you prefer to rely on `$anchorScroll` to scroll the view to the anchor,
   * this can be enabled by calling {@link ui.router.state.$uiViewScrollProvider#methods_useAnchorScroll `$uiViewScrollProvider.useAnchorScroll()`}.
   */
  this.$get = ['$anchorScroll', '$timeout', function ($anchorScroll, $timeout) {
    if (useAnchorScroll) {
      return $anchorScroll;
    }

    return function ($element) {
      return $timeout(function () {
        $element[0].scrollIntoView();
      }, 0, false);
    };
  }];
}

angular.module('ui.router.state').provider('$uiViewScroll', $ViewScrollProvider);

/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-view
 *
 * @requires ui.router.state.$state
 * @requires $compile
 * @requires $controller
 * @requires $injector
 * @requires ui.router.state.$uiViewScroll
 * @requires $document
 *
 * @restrict ECA
 *
 * @description
 * The ui-view directive tells $state where to place your templates.
 *
 * @param {string=} name A view name. The name should be unique amongst the other views in the
 * same state. You can have views of the same name that live in different states.
 *
 * @param {string=} autoscroll It allows you to set the scroll behavior of the browser window
 * when a view is populated. By default, $anchorScroll is overridden by ui-router's custom scroll
 * service, {@link ui.router.state.$uiViewScroll}. This custom service let's you
 * scroll ui-view elements into view when they are populated during a state activation.
 *
 * *Note: To revert back to old [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll)
 * functionality, call `$uiViewScrollProvider.useAnchorScroll()`.*
 *
 * @param {string=} onload Expression to evaluate whenever the view updates.
 *
 * @example
 * A view can be unnamed or named.
 * <pre>
 * <!-- Unnamed -->
 * <div ui-view></div>
 *
 * <!-- Named -->
 * <div ui-view="viewName"></div>
 * </pre>
 *
 * You can only have one unnamed view within any template (or root html). If you are only using a
 * single view and it is unnamed then you can populate it like so:
 * <pre>
 * <div ui-view></div>
 * $stateProvider.state("home", {
 *   template: "<h1>HELLO!</h1>"
 * })
 * </pre>
 *
 * The above is a convenient shortcut equivalent to specifying your view explicitly with the {@link ui.router.state.$stateProvider#methods_state `views`}
 * config property, by name, in this case an empty name:
 * <pre>
 * $stateProvider.state("home", {
 *   views: {
 *     "": {
 *       template: "<h1>HELLO!</h1>"
 *     }
 *   }    
 * })
 * </pre>
 *
 * But typically you'll only use the views property if you name your view or have more than one view
 * in the same template. There's not really a compelling reason to name a view if its the only one,
 * but you could if you wanted, like so:
 * <pre>
 * <div ui-view="main"></div>
 * </pre>
 * <pre>
 * $stateProvider.state("home", {
 *   views: {
 *     "main": {
 *       template: "<h1>HELLO!</h1>"
 *     }
 *   }    
 * })
 * </pre>
 *
 * Really though, you'll use views to set up multiple views:
 * <pre>
 * <div ui-view></div>
 * <div ui-view="chart"></div>
 * <div ui-view="data"></div>
 * </pre>
 *
 * <pre>
 * $stateProvider.state("home", {
 *   views: {
 *     "": {
 *       template: "<h1>HELLO!</h1>"
 *     },
 *     "chart": {
 *       template: "<chart_thing/>"
 *     },
 *     "data": {
 *       template: "<data_thing/>"
 *     }
 *   }    
 * })
 * </pre>
 *
 * Examples for `autoscroll`:
 *
 * <pre>
 * <!-- If autoscroll present with no expression,
 *      then scroll ui-view into view -->
 * <ui-view autoscroll/>
 *
 * <!-- If autoscroll present with valid expression,
 *      then scroll ui-view into view if expression evaluates to true -->
 * <ui-view autoscroll='true'/>
 * <ui-view autoscroll='false'/>
 * <ui-view autoscroll='scopeVariable'/>
 * </pre>
 *
 * Resolve data:
 *
 * The resolved data from the state's `resolve` block is placed on the scope as `$resolve` (this
 * can be customized using [[ViewDeclaration.resolveAs]]).  This can be then accessed from the template.
 *
 * Note that when `controllerAs` is being used, `$resolve` is set on the controller instance *after* the
 * controller is instantiated.  The `$onInit()` hook can be used to perform initialization code which
 * depends on `$resolve` data.
 *
 * Example usage of $resolve in a view template
 * <pre>
 * $stateProvider.state('home', {
 *   template: '<my-component user="$resolve.user"></my-component>',
 *   resolve: {
 *     user: function(UserService) { return UserService.fetchUser(); }
 *   }
 * });
 * </pre>
 */
$ViewDirective.$inject = ['$state', '$injector', '$uiViewScroll', '$interpolate', '$q'];
function $ViewDirective(   $state,   $injector,   $uiViewScroll,   $interpolate,   $q) {

  function getService() {
    return ($injector.has) ? function(service) {
      return $injector.has(service) ? $injector.get(service) : null;
    } : function(service) {
      try {
        return $injector.get(service);
      } catch (e) {
        return null;
      }
    };
  }

  var service = getService(),
      $animator = service('$animator'),
      $animate = service('$animate');

  // Returns a set of DOM manipulation functions based on which Angular version
  // it should use
  function getRenderer(attrs, scope) {
    var statics = function() {
      return {
        enter: function (element, target, cb) { target.after(element); cb(); },
        leave: function (element, cb) { element.remove(); cb(); }
      };
    };

    if ($animate) {
      return {
        enter: function(element, target, cb) {
          if (angular.version.minor > 2) {
            $animate.enter(element, null, target).then(cb);
          } else {
            $animate.enter(element, null, target, cb);
          }
        },
        leave: function(element, cb) {
          if (angular.version.minor > 2) {
            $animate.leave(element).then(cb);
          } else {
            $animate.leave(element, cb);
          }
        }
      };
    }

    if ($animator) {
      var animate = $animator && $animator(scope, attrs);

      return {
        enter: function(element, target, cb) {animate.enter(element, null, target); cb(); },
        leave: function(element, cb) { animate.leave(element); cb(); }
      };
    }

    return statics();
  }

  var directive = {
    restrict: 'ECA',
    terminal: true,
    priority: 400,
    transclude: 'element',
    compile: function (tElement, tAttrs, $transclude) {
      return function (scope, $element, attrs) {
        var previousEl, currentEl, currentScope, latestLocals,
            onloadExp     = attrs.onload || '',
            autoScrollExp = attrs.autoscroll,
            renderer      = getRenderer(attrs, scope),
            inherited     = $element.inheritedData('$uiView');

        scope.$on('$stateChangeSuccess', function() {
          updateView(false);
        });

        updateView(true);

        function cleanupLastView() {
          if (previousEl) {
            previousEl.remove();
            previousEl = null;
          }

          if (currentScope) {
            currentScope.$destroy();
            currentScope = null;
          }

          if (currentEl) {
            var $uiViewData = currentEl.data('$uiViewAnim');
            renderer.leave(currentEl, function() {
              $uiViewData.$$animLeave.resolve();
              previousEl = null;
            });

            previousEl = currentEl;
            currentEl = null;
          }
        }

        function updateView(firstTime) {
          var newScope,
              name            = getUiViewName(scope, attrs, $element, $interpolate),
              previousLocals  = name && $state.$current && $state.$current.locals[name];

          if (!firstTime && previousLocals === latestLocals) return; // nothing to do
          newScope = scope.$new();
          latestLocals = $state.$current.locals[name];

          /**
           * @ngdoc event
           * @name ui.router.state.directive:ui-view#$viewContentLoading
           * @eventOf ui.router.state.directive:ui-view
           * @eventType emits on ui-view directive scope
           * @description
           *
           * Fired once the view **begins loading**, *before* the DOM is rendered.
           *
           * @param {Object} event Event object.
           * @param {string} viewName Name of the view.
           */
          newScope.$emit('$viewContentLoading', name);

          var clone = $transclude(newScope, function(clone) {
            var animEnter = $q.defer(), animLeave = $q.defer();
            var viewAnimData = {
              $animEnter: animEnter.promise,
              $animLeave: animLeave.promise,
              $$animLeave: animLeave
            };

            clone.data('$uiViewAnim', viewAnimData);
            renderer.enter(clone, $element, function onUiViewEnter() {
              animEnter.resolve();
              if(currentScope) {
                currentScope.$emit('$viewContentAnimationEnded');
              }

              if (angular.isDefined(autoScrollExp) && !autoScrollExp || scope.$eval(autoScrollExp)) {
                $uiViewScroll(clone);
              }
            });
            cleanupLastView();
          });

          currentEl = clone;
          currentScope = newScope;
          /**
           * @ngdoc event
           * @name ui.router.state.directive:ui-view#$viewContentLoaded
           * @eventOf ui.router.state.directive:ui-view
           * @eventType emits on ui-view directive scope
           * @description
           * Fired once the view is **loaded**, *after* the DOM is rendered.
           *
           * @param {Object} event Event object.
           * @param {string} viewName Name of the view.
           */
          currentScope.$emit('$viewContentLoaded', name);
          currentScope.$eval(onloadExp);
        }
      };
    }
  };

  return directive;
}

$ViewDirectiveFill.$inject = ['$compile', '$controller', '$state', '$interpolate'];
function $ViewDirectiveFill (  $compile,   $controller,   $state,   $interpolate) {
  return {
    restrict: 'ECA',
    priority: -400,
    compile: function (tElement) {
      var initial = tElement.html();
      if (tElement.empty) {
        tElement.empty();
      } else {
        // ng 1.0.0 doesn't have empty(), which cleans up data and handlers
        tElement[0].innerHTML = null;
      }

      return function (scope, $element, attrs) {
        var current = $state.$current,
            name = getUiViewName(scope, attrs, $element, $interpolate),
            locals  = current && current.locals[name];

        if (! locals) {
          $element.html(initial);
          $compile($element.contents())(scope);
          return;
        }

        $element.data('$uiView', { name: name, state: locals.$$state });
        $element.html(locals.$template ? locals.$template : initial);

        var resolveData = angular.extend({}, locals);
        scope[locals.$$resolveAs] = resolveData;

        var link = $compile($element.contents());

        if (locals.$$controller) {
          locals.$scope = scope;
          locals.$element = $element;
          var controller = $controller(locals.$$controller, locals);
          if (locals.$$controllerAs) {
            scope[locals.$$controllerAs] = controller;
            scope[locals.$$controllerAs][locals.$$resolveAs] = resolveData;
          }
          if (isFunction(controller.$onInit)) controller.$onInit();
          $element.data('$ngControllerController', controller);
          $element.children().data('$ngControllerController', controller);
        }

        link(scope);
      };
    }
  };
}

/**
 * Shared ui-view code for both directives:
 * Given scope, element, and its attributes, return the view's name
 */
function getUiViewName(scope, attrs, element, $interpolate) {
  var name = $interpolate(attrs.uiView || attrs.name || '')(scope);
  var uiViewCreatedBy = element.inheritedData('$uiView');
  return name.indexOf('@') >= 0 ?  name :  (name + '@' + (uiViewCreatedBy ? uiViewCreatedBy.state.name : ''));
}

angular.module('ui.router.state').directive('uiView', $ViewDirective);
angular.module('ui.router.state').directive('uiView', $ViewDirectiveFill);

function parseStateRef(ref, current) {
  var preparsed = ref.match(/^\s*({[^}]*})\s*$/), parsed;
  if (preparsed) ref = current + '(' + preparsed[1] + ')';
  parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
  if (!parsed || parsed.length !== 4) throw new Error("Invalid state ref '" + ref + "'");
  return { state: parsed[1], paramExpr: parsed[3] || null };
}

function stateContext(el) {
  var stateData = el.parent().inheritedData('$uiView');

  if (stateData && stateData.state && stateData.state.name) {
    return stateData.state;
  }
}

function getTypeInfo(el) {
  // SVGAElement does not use the href attribute, but rather the 'xlinkHref' attribute.
  var isSvg = Object.prototype.toString.call(el.prop('href')) === '[object SVGAnimatedString]';
  var isForm = el[0].nodeName === "FORM";

  return {
    attr: isForm ? "action" : (isSvg ? 'xlink:href' : 'href'),
    isAnchor: el.prop("tagName").toUpperCase() === "A",
    clickable: !isForm
  };
}

function clickHook(el, $state, $timeout, type, current) {
  return function(e) {
    var button = e.which || e.button, target = current();

    if (!(button > 1 || e.ctrlKey || e.metaKey || e.shiftKey || el.attr('target'))) {
      // HACK: This is to allow ng-clicks to be processed before the transition is initiated:
      var transition = $timeout(function() {
        $state.go(target.state, target.params, target.options);
      });
      e.preventDefault();

      // if the state has no URL, ignore one preventDefault from the <a> directive.
      var ignorePreventDefaultCount = type.isAnchor && !target.href ? 1: 0;

      e.preventDefault = function() {
        if (ignorePreventDefaultCount-- <= 0) $timeout.cancel(transition);
      };
    }
  };
}

function defaultOpts(el, $state) {
  return { relative: stateContext(el) || $state.$current, inherit: true };
}

/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-sref
 *
 * @requires ui.router.state.$state
 * @requires $timeout
 *
 * @restrict A
 *
 * @description
 * A directive that binds a link (`<a>` tag) to a state. If the state has an associated
 * URL, the directive will automatically generate & update the `href` attribute via
 * the {@link ui.router.state.$state#methods_href $state.href()} method. Clicking
 * the link will trigger a state transition with optional parameters.
 *
 * Also middle-clicking, right-clicking, and ctrl-clicking on the link will be
 * handled natively by the browser.
 *
 * You can also use relative state paths within ui-sref, just like the relative
 * paths passed to `$state.go()`. You just need to be aware that the path is relative
 * to the state that the link lives in, in other words the state that loaded the
 * template containing the link.
 *
 * You can specify options to pass to {@link ui.router.state.$state#methods_go $state.go()}
 * using the `ui-sref-opts` attribute. Options are restricted to `location`, `inherit`,
 * and `reload`.
 *
 * @example
 * Here's an example of how you'd use ui-sref and how it would compile. If you have the
 * following template:
 * <pre>
 * <a ui-sref="home">Home</a> | <a ui-sref="about">About</a> | <a ui-sref="{page: 2}">Next page</a>
 *
 * <ul>
 *     <li ng-repeat="contact in contacts">
 *         <a ui-sref="contacts.detail({ id: contact.id })">{{ contact.name }}</a>
 *     </li>
 * </ul>
 * </pre>
 *
 * Then the compiled html would be (assuming Html5Mode is off and current state is contacts):
 * <pre>
 * <a href="#/home" ui-sref="home">Home</a> | <a href="#/about" ui-sref="about">About</a> | <a href="#/contacts?page=2" ui-sref="{page: 2}">Next page</a>
 *
 * <ul>
 *     <li ng-repeat="contact in contacts">
 *         <a href="#/contacts/1" ui-sref="contacts.detail({ id: contact.id })">Joe</a>
 *     </li>
 *     <li ng-repeat="contact in contacts">
 *         <a href="#/contacts/2" ui-sref="contacts.detail({ id: contact.id })">Alice</a>
 *     </li>
 *     <li ng-repeat="contact in contacts">
 *         <a href="#/contacts/3" ui-sref="contacts.detail({ id: contact.id })">Bob</a>
 *     </li>
 * </ul>
 *
 * <a ui-sref="home" ui-sref-opts="{reload: true}">Home</a>
 * </pre>
 *
 * @param {string} ui-sref 'stateName' can be any valid absolute or relative state
 * @param {Object} ui-sref-opts options to pass to {@link ui.router.state.$state#methods_go $state.go()}
 */
$StateRefDirective.$inject = ['$state', '$timeout'];
function $StateRefDirective($state, $timeout) {
  return {
    restrict: 'A',
    require: ['?^uiSrefActive', '?^uiSrefActiveEq'],
    link: function(scope, element, attrs, uiSrefActive) {
      var ref    = parseStateRef(attrs.uiSref, $state.current.name);
      var def    = { state: ref.state, href: null, params: null };
      var type   = getTypeInfo(element);
      var active = uiSrefActive[1] || uiSrefActive[0];
      var unlinkInfoFn = null;
      var hookFn;

      def.options = extend(defaultOpts(element, $state), attrs.uiSrefOpts ? scope.$eval(attrs.uiSrefOpts) : {});

      var update = function(val) {
        if (val) def.params = angular.copy(val);
        def.href = $state.href(ref.state, def.params, def.options);

        if (unlinkInfoFn) unlinkInfoFn();
        if (active) unlinkInfoFn = active.$$addStateInfo(ref.state, def.params);
        if (def.href !== null) attrs.$set(type.attr, def.href);
      };

      if (ref.paramExpr) {
        scope.$watch(ref.paramExpr, function(val) { if (val !== def.params) update(val); }, true);
        def.params = angular.copy(scope.$eval(ref.paramExpr));
      }
      update();

      if (!type.clickable) return;
      hookFn = clickHook(element, $state, $timeout, type, function() { return def; });
      element[element.on ? 'on' : 'bind']("click", hookFn);
      scope.$on('$destroy', function() {
        element[element.off ? 'off' : 'unbind']("click", hookFn);
      });
    }
  };
}

/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-state
 *
 * @requires ui.router.state.uiSref
 *
 * @restrict A
 *
 * @description
 * Much like ui-sref, but will accept named $scope properties to evaluate for a state definition,
 * params and override options.
 *
 * @param {string} ui-state 'stateName' can be any valid absolute or relative state
 * @param {Object} ui-state-params params to pass to {@link ui.router.state.$state#methods_href $state.href()}
 * @param {Object} ui-state-opts options to pass to {@link ui.router.state.$state#methods_go $state.go()}
 */
$StateRefDynamicDirective.$inject = ['$state', '$timeout'];
function $StateRefDynamicDirective($state, $timeout) {
  return {
    restrict: 'A',
    require: ['?^uiSrefActive', '?^uiSrefActiveEq'],
    link: function(scope, element, attrs, uiSrefActive) {
      var type   = getTypeInfo(element);
      var active = uiSrefActive[1] || uiSrefActive[0];
      var group  = [attrs.uiState, attrs.uiStateParams || null, attrs.uiStateOpts || null];
      var watch  = '[' + group.map(function(val) { return val || 'null'; }).join(', ') + ']';
      var def    = { state: null, params: null, options: null, href: null };
      var unlinkInfoFn = null;
      var hookFn;

      function runStateRefLink (group) {
        def.state = group[0]; def.params = group[1]; def.options = group[2];
        def.href = $state.href(def.state, def.params, def.options);

        if (unlinkInfoFn) unlinkInfoFn();
        if (active) unlinkInfoFn = active.$$addStateInfo(def.state, def.params);
        if (def.href) attrs.$set(type.attr, def.href);
      }

      scope.$watch(watch, runStateRefLink, true);
      runStateRefLink(scope.$eval(watch));

      if (!type.clickable) return;
      hookFn = clickHook(element, $state, $timeout, type, function() { return def; });
      element[element.on ? 'on' : 'bind']("click", hookFn);
      scope.$on('$destroy', function() {
        element[element.off ? 'off' : 'unbind']("click", hookFn);
      });
    }
  };
}


/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-sref-active
 *
 * @requires ui.router.state.$state
 * @requires ui.router.state.$stateParams
 * @requires $interpolate
 *
 * @restrict A
 *
 * @description
 * A directive working alongside ui-sref to add classes to an element when the
 * related ui-sref directive's state is active, and removing them when it is inactive.
 * The primary use-case is to simplify the special appearance of navigation menus
 * relying on `ui-sref`, by having the "active" state's menu button appear different,
 * distinguishing it from the inactive menu items.
 *
 * ui-sref-active can live on the same element as ui-sref or on a parent element. The first
 * ui-sref-active found at the same level or above the ui-sref will be used.
 *
 * Will activate when the ui-sref's target state or any child state is active. If you
 * need to activate only when the ui-sref target state is active and *not* any of
 * it's children, then you will use
 * {@link ui.router.state.directive:ui-sref-active-eq ui-sref-active-eq}
 *
 * @example
 * Given the following template:
 * <pre>
 * <ul>
 *   <li ui-sref-active="active" class="item">
 *     <a href ui-sref="app.user({user: 'bilbobaggins'})">@bilbobaggins</a>
 *   </li>
 * </ul>
 * </pre>
 *
 *
 * When the app state is "app.user" (or any children states), and contains the state parameter "user" with value "bilbobaggins",
 * the resulting HTML will appear as (note the 'active' class):
 * <pre>
 * <ul>
 *   <li ui-sref-active="active" class="item active">
 *     <a ui-sref="app.user({user: 'bilbobaggins'})" href="/users/bilbobaggins">@bilbobaggins</a>
 *   </li>
 * </ul>
 * </pre>
 *
 * The class name is interpolated **once** during the directives link time (any further changes to the
 * interpolated value are ignored).
 *
 * Multiple classes may be specified in a space-separated format:
 * <pre>
 * <ul>
 *   <li ui-sref-active='class1 class2 class3'>
 *     <a ui-sref="app.user">link</a>
 *   </li>
 * </ul>
 * </pre>
 *
 * It is also possible to pass ui-sref-active an expression that evaluates
 * to an object hash, whose keys represent active class names and whose
 * values represent the respective state names/globs.
 * ui-sref-active will match if the current active state **includes** any of
 * the specified state names/globs, even the abstract ones.
 *
 * @Example
 * Given the following template, with "admin" being an abstract state:
 * <pre>
 * <div ui-sref-active="{'active': 'admin.*'}">
 *   <a ui-sref-active="active" ui-sref="admin.roles">Roles</a>
 * </div>
 * </pre>
 *
 * When the current state is "admin.roles" the "active" class will be applied
 * to both the <div> and <a> elements. It is important to note that the state
 * names/globs passed to ui-sref-active shadow the state provided by ui-sref.
 */

/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-sref-active-eq
 *
 * @requires ui.router.state.$state
 * @requires ui.router.state.$stateParams
 * @requires $interpolate
 *
 * @restrict A
 *
 * @description
 * The same as {@link ui.router.state.directive:ui-sref-active ui-sref-active} but will only activate
 * when the exact target state used in the `ui-sref` is active; no child states.
 *
 */
$StateRefActiveDirective.$inject = ['$state', '$stateParams', '$interpolate'];
function $StateRefActiveDirective($state, $stateParams, $interpolate) {
  return  {
    restrict: "A",
    controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {
      var states = [], activeClasses = {}, activeEqClass, uiSrefActive;

      // There probably isn't much point in $observing this
      // uiSrefActive and uiSrefActiveEq share the same directive object with some
      // slight difference in logic routing
      activeEqClass = $interpolate($attrs.uiSrefActiveEq || '', false)($scope);

      try {
        uiSrefActive = $scope.$eval($attrs.uiSrefActive);
      } catch (e) {
        // Do nothing. uiSrefActive is not a valid expression.
        // Fall back to using $interpolate below
      }
      uiSrefActive = uiSrefActive || $interpolate($attrs.uiSrefActive || '', false)($scope);
      if (isObject(uiSrefActive)) {
        forEach(uiSrefActive, function(stateOrName, activeClass) {
          if (isString(stateOrName)) {
            var ref = parseStateRef(stateOrName, $state.current.name);
            addState(ref.state, $scope.$eval(ref.paramExpr), activeClass);
          }
        });
      }

      // Allow uiSref to communicate with uiSrefActive[Equals]
      this.$$addStateInfo = function (newState, newParams) {
        // we already got an explicit state provided by ui-sref-active, so we
        // shadow the one that comes from ui-sref
        if (isObject(uiSrefActive) && states.length > 0) {
          return;
        }
        var deregister = addState(newState, newParams, uiSrefActive);
        update();
        return deregister;
      };

      $scope.$on('$stateChangeSuccess', update);

      function addState(stateName, stateParams, activeClass) {
        var state = $state.get(stateName, stateContext($element));
        var stateHash = createStateHash(stateName, stateParams);

        var stateInfo = {
          state: state || { name: stateName },
          params: stateParams,
          hash: stateHash
        };

        states.push(stateInfo);
        activeClasses[stateHash] = activeClass;

        return function removeState() {
          var idx = states.indexOf(stateInfo);
          if (idx !== -1) states.splice(idx, 1);
        };
      }

      /**
       * @param {string} state
       * @param {Object|string} [params]
       * @return {string}
       */
      function createStateHash(state, params) {
        if (!isString(state)) {
          throw new Error('state should be a string');
        }
        if (isObject(params)) {
          return state + toJson(params);
        }
        params = $scope.$eval(params);
        if (isObject(params)) {
          return state + toJson(params);
        }
        return state;
      }

      // Update route state
      function update() {
        for (var i = 0; i < states.length; i++) {
          if (anyMatch(states[i].state, states[i].params)) {
            addClass($element, activeClasses[states[i].hash]);
          } else {
            removeClass($element, activeClasses[states[i].hash]);
          }

          if (exactMatch(states[i].state, states[i].params)) {
            addClass($element, activeEqClass);
          } else {
            removeClass($element, activeEqClass);
          }
        }
      }

      function addClass(el, className) { $timeout(function () { el.addClass(className); }); }
      function removeClass(el, className) { el.removeClass(className); }
      function anyMatch(state, params) { return $state.includes(state.name, params); }
      function exactMatch(state, params) { return $state.is(state.name, params); }

      update();
    }]
  };
}

angular.module('ui.router.state')
  .directive('uiSref', $StateRefDirective)
  .directive('uiSrefActive', $StateRefActiveDirective)
  .directive('uiSrefActiveEq', $StateRefActiveDirective)
  .directive('uiState', $StateRefDynamicDirective);

/**
 * @ngdoc filter
 * @name ui.router.state.filter:isState
 *
 * @requires ui.router.state.$state
 *
 * @description
 * Translates to {@link ui.router.state.$state#methods_is $state.is("stateName")}.
 */
$IsStateFilter.$inject = ['$state'];
function $IsStateFilter($state) {
  var isFilter = function (state, params) {
    return $state.is(state, params);
  };
  isFilter.$stateful = true;
  return isFilter;
}

/**
 * @ngdoc filter
 * @name ui.router.state.filter:includedByState
 *
 * @requires ui.router.state.$state
 *
 * @description
 * Translates to {@link ui.router.state.$state#methods_includes $state.includes('fullOrPartialStateName')}.
 */
$IncludedByStateFilter.$inject = ['$state'];
function $IncludedByStateFilter($state) {
  var includesFilter = function (state, params, options) {
    return $state.includes(state, params, options);
  };
  includesFilter.$stateful = true;
  return  includesFilter;
}

angular.module('ui.router.state')
  .filter('isState', $IsStateFilter)
  .filter('includedByState', $IncludedByStateFilter);
})(window, window.angular);
/*! 
 * angular-loading-bar v0.9.0
 * https://chieffancypants.github.io/angular-loading-bar
 * Copyright (c) 2016 Wes Cruver
 * License: MIT
 */
/*
 * angular-loading-bar
 *
 * intercepts XHR requests and creates a loading bar.
 * Based on the excellent nprogress work by rstacruz (more info in readme)
 *
 * (c) 2013 Wes Cruver
 * License: MIT
 */


(function() {

'use strict';

// Alias the loading bar for various backwards compatibilities since the project has matured:
angular.module('angular-loading-bar', ['cfp.loadingBarInterceptor']);
angular.module('chieffancypants.loadingBar', ['cfp.loadingBarInterceptor']);


/**
 * loadingBarInterceptor service
 *
 * Registers itself as an Angular interceptor and listens for XHR requests.
 */
angular.module('cfp.loadingBarInterceptor', ['cfp.loadingBar'])
  .config(['$httpProvider', function ($httpProvider) {

    var interceptor = ['$q', '$cacheFactory', '$timeout', '$rootScope', '$log', 'cfpLoadingBar', function ($q, $cacheFactory, $timeout, $rootScope, $log, cfpLoadingBar) {

      /**
       * The total number of requests made
       */
      var reqsTotal = 0;

      /**
       * The number of requests completed (either successfully or not)
       */
      var reqsCompleted = 0;

      /**
       * The amount of time spent fetching before showing the loading bar
       */
      var latencyThreshold = cfpLoadingBar.latencyThreshold;

      /**
       * $timeout handle for latencyThreshold
       */
      var startTimeout;


      /**
       * calls cfpLoadingBar.complete() which removes the
       * loading bar from the DOM.
       */
      function setComplete() {
        $timeout.cancel(startTimeout);
        cfpLoadingBar.complete();
        reqsCompleted = 0;
        reqsTotal = 0;
      }

      /**
       * Determine if the response has already been cached
       * @param  {Object}  config the config option from the request
       * @return {Boolean} retrns true if cached, otherwise false
       */
      function isCached(config) {
        var cache;
        var defaultCache = $cacheFactory.get('$http');
        var defaults = $httpProvider.defaults;

        // Choose the proper cache source. Borrowed from angular: $http service
        if ((config.cache || defaults.cache) && config.cache !== false &&
          (config.method === 'GET' || config.method === 'JSONP')) {
            cache = angular.isObject(config.cache) ? config.cache
              : angular.isObject(defaults.cache) ? defaults.cache
              : defaultCache;
        }

        var cached = cache !== undefined ?
          cache.get(config.url) !== undefined : false;

        if (config.cached !== undefined && cached !== config.cached) {
          return config.cached;
        }
        config.cached = cached;
        return cached;
      }


      return {
        'request': function(config) {
          // Check to make sure this request hasn't already been cached and that
          // the requester didn't explicitly ask us to ignore this request:
          if (!config.ignoreLoadingBar && !isCached(config)) {
            $rootScope.$broadcast('cfpLoadingBar:loading', {url: config.url});
            if (reqsTotal === 0) {
              startTimeout = $timeout(function() {
                cfpLoadingBar.start();
              }, latencyThreshold);
            }
            reqsTotal++;
            cfpLoadingBar.set(reqsCompleted / reqsTotal);
          }
          return config;
        },

        'response': function(response) {
          if (!response || !response.config) {
            $log.error('Broken interceptor detected: Config object not supplied in response:\n https://github.com/chieffancypants/angular-loading-bar/pull/50');
            return response;
          }

          if (!response.config.ignoreLoadingBar && !isCached(response.config)) {
            reqsCompleted++;
            $rootScope.$broadcast('cfpLoadingBar:loaded', {url: response.config.url, result: response});
            if (reqsCompleted >= reqsTotal) {
              setComplete();
            } else {
              cfpLoadingBar.set(reqsCompleted / reqsTotal);
            }
          }
          return response;
        },

        'responseError': function(rejection) {
          if (!rejection || !rejection.config) {
            $log.error('Broken interceptor detected: Config object not supplied in rejection:\n https://github.com/chieffancypants/angular-loading-bar/pull/50');
            return $q.reject(rejection);
          }

          if (!rejection.config.ignoreLoadingBar && !isCached(rejection.config)) {
            reqsCompleted++;
            $rootScope.$broadcast('cfpLoadingBar:loaded', {url: rejection.config.url, result: rejection});
            if (reqsCompleted >= reqsTotal) {
              setComplete();
            } else {
              cfpLoadingBar.set(reqsCompleted / reqsTotal);
            }
          }
          return $q.reject(rejection);
        }
      };
    }];

    $httpProvider.interceptors.push(interceptor);
  }]);


/**
 * Loading Bar
 *
 * This service handles adding and removing the actual element in the DOM.
 * Generally, best practices for DOM manipulation is to take place in a
 * directive, but because the element itself is injected in the DOM only upon
 * XHR requests, and it's likely needed on every view, the best option is to
 * use a service.
 */
angular.module('cfp.loadingBar', [])
  .provider('cfpLoadingBar', function() {

    this.autoIncrement = true;
    this.includeSpinner = true;
    this.includeBar = true;
    this.latencyThreshold = 100;
    this.startSize = 0.02;
    this.parentSelector = 'body';
    this.spinnerTemplate = '<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>';
    this.loadingBarTemplate = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>';

    this.$get = ['$injector', '$document', '$timeout', '$rootScope', function ($injector, $document, $timeout, $rootScope) {
      var $animate;
      var $parentSelector = this.parentSelector,
        loadingBarContainer = angular.element(this.loadingBarTemplate),
        loadingBar = loadingBarContainer.find('div').eq(0),
        spinner = angular.element(this.spinnerTemplate);

      var incTimeout,
        completeTimeout,
        started = false,
        status = 0;

      var autoIncrement = this.autoIncrement;
      var includeSpinner = this.includeSpinner;
      var includeBar = this.includeBar;
      var startSize = this.startSize;

      /**
       * Inserts the loading bar element into the dom, and sets it to 2%
       */
      function _start() {
        if (!$animate) {
          $animate = $injector.get('$animate');
        }

        $timeout.cancel(completeTimeout);

        // do not continually broadcast the started event:
        if (started) {
          return;
        }

        var document = $document[0];
        var parent = document.querySelector ?
          document.querySelector($parentSelector)
          : $document.find($parentSelector)[0]
        ;

        if (! parent) {
          parent = document.getElementsByTagName('body')[0];
        }

        var $parent = angular.element(parent);
        var $after = parent.lastChild && angular.element(parent.lastChild);

        $rootScope.$broadcast('cfpLoadingBar:started');
        started = true;

        if (includeBar) {
          $animate.enter(loadingBarContainer, $parent, $after);
        }

        if (includeSpinner) {
          $animate.enter(spinner, $parent, loadingBarContainer);
        }

        _set(startSize);
      }

      /**
       * Set the loading bar's width to a certain percent.
       *
       * @param n any value between 0 and 1
       */
      function _set(n) {
        if (!started) {
          return;
        }
        var pct = (n * 100) + '%';
        loadingBar.css('width', pct);
        status = n;

        // increment loadingbar to give the illusion that there is always
        // progress but make sure to cancel the previous timeouts so we don't
        // have multiple incs running at the same time.
        if (autoIncrement) {
          $timeout.cancel(incTimeout);
          incTimeout = $timeout(function() {
            _inc();
          }, 250);
        }
      }

      /**
       * Increments the loading bar by a random amount
       * but slows down as it progresses
       */
      function _inc() {
        if (_status() >= 1) {
          return;
        }

        var rnd = 0;

        // TODO: do this mathmatically instead of through conditions

        var stat = _status();
        if (stat >= 0 && stat < 0.25) {
          // Start out between 3 - 6% increments
          rnd = (Math.random() * (5 - 3 + 1) + 3) / 100;
        } else if (stat >= 0.25 && stat < 0.65) {
          // increment between 0 - 3%
          rnd = (Math.random() * 3) / 100;
        } else if (stat >= 0.65 && stat < 0.9) {
          // increment between 0 - 2%
          rnd = (Math.random() * 2) / 100;
        } else if (stat >= 0.9 && stat < 0.99) {
          // finally, increment it .5 %
          rnd = 0.005;
        } else {
          // after 99%, don't increment:
          rnd = 0;
        }

        var pct = _status() + rnd;
        _set(pct);
      }

      function _status() {
        return status;
      }

      function _completeAnimation() {
        status = 0;
        started = false;
      }

      function _complete() {
        if (!$animate) {
          $animate = $injector.get('$animate');
        }

        $rootScope.$broadcast('cfpLoadingBar:completed');
        _set(1);

        $timeout.cancel(completeTimeout);

        // Attempt to aggregate any start/complete calls within 500ms:
        completeTimeout = $timeout(function() {
          var promise = $animate.leave(loadingBarContainer, _completeAnimation);
          if (promise && promise.then) {
            promise.then(_completeAnimation);
          }
          $animate.leave(spinner);
        }, 500);
      }

      return {
        start            : _start,
        set              : _set,
        status           : _status,
        inc              : _inc,
        complete         : _complete,
        autoIncrement    : this.autoIncrement,
        includeSpinner   : this.includeSpinner,
        latencyThreshold : this.latencyThreshold,
        parentSelector   : this.parentSelector,
        startSize        : this.startSize
      };


    }];     //
  });       // wtf javascript. srsly
})();       //

(function() {
  'use strict';

  function $Password() {

    function link(scope, element, attrs, ctrls) {
      var formController = ctrls[1];
      var ngModel = ctrls[0];
      var otherPasswordModel = formController[attrs.matchPassword];

      var getMatchValue = function() {
        return otherPasswordModel.$viewValue;
      };

      scope.$watch(getMatchValue, function() {
        ngModel.$$parseAndValidate();
      });

      // if ng1.3+
      if (ngModel.$validators) {
        ngModel.$validators.passwordMatch = function(modelValue) {
          return (!modelValue && !otherPasswordModel.$modelValue) || (modelValue === otherPasswordModel.$modelValue);
        };
      } else {
        ngModel.$parsers.push(function(value) {
          ngModel.$setValidity('passwordMatch', (!value && !otherPasswordModel.$viewValue) || value === otherPasswordModel.$viewValue);
          return value;
        });
      }

      otherPasswordModel.$parsers.push(function(value) {
        ngModel.$setValidity('passwordMatch', (!value && !ngModel.$viewValue) || value === ngModel.$viewValue);
        return value;
      });
    }

    var controllers = ['^ngModel', '^form'];

    return {
      restrict: 'A',
      require: controllers,
      link: link
    }; // end return
  }

  angular.module('ngPassword', []).directive('matchPassword', $Password);

  angular.module('angular.password', ['ngPassword']);
  angular.module('angular-password', ['ngPassword']);

  if (typeof module === 'object' && typeof define !== 'function') {
    module.exports = angular.module('ngPassword');
  }
})();

/*
 * Angular Material Data Table
 * https://github.com/daniel-nagy/md-data-table
 * @license MIT
 * v0.10.9
 */
(function (window, angular, undefined) {
'use strict';

angular.module('md.table.templates', ['md-table-pagination.html', 'md-table-progress.html', 'arrow-up.svg', 'navigate-before.svg', 'navigate-first.svg', 'navigate-last.svg', 'navigate-next.svg']);

angular.module('md-table-pagination.html', []).run(['$templateCache', function($templateCache,user) {
  $templateCache.put('md-table-pagination.html',
    '<div class="page-select" ng-if="$pagination.showPageSelect()">\n' +
    '  <div class="label">{{$pagination.label.page}}</div>\n' +
    '\n' +
    '  <md-select virtual-page-select total="{{$pagination.pages()}}" class="md-table-select" ng-model="$pagination.page" md-container-class="md-pagination-select" ng-change="$pagination.onPaginationChange()" ng-disabled="$pagination.disabled" aria-label="Page">\n' +
    '    <md-content>\n' +
    '      <md-option ng-repeat="page in $pageSelect.pages" ng-value="page">{{page}}</md-option>\n' +
    '    </md-content>\n' +
    '  </md-select>\n' +
    '</div>\n' +
    '\n' +
    '<div class="limit-select" ng-if="$pagination.limitOptions">\n' +
    '  <div class="label">{{$pagination.label.rowsPerPage}}</div>\n' +
    '\n' +
    '  <md-select class="md-table-select" ng-model="$pagination.limit" md-container-class="md-pagination-select" ng-disabled="$pagination.disabled" aria-label="Rows" placeholder="{{ $pagination.limitOptions[0] }}">\n' +
    '    <md-option ng-repeat="option in $pagination.limitOptions" ng-value="option.value ? $pagination.eval(option.value) : option">{{::option.label ? option.label : option}}</md-option>\n' +
    '  </md-select>\n' +
    '</div>\n' +
    '\n' +
    '<div class="buttons">\n' +
    '  <div class="label">{{$pagination.min()}} - {{$pagination.max()}} {{$pagination.label.of}} {{$pagination.total}}</div>\n' +
    '\n' +
    '  <md-button class="md-icon-button" type="button" ng-if="$pagination.showBoundaryLinks()" ng-click="$pagination.first()" ng-disabled="$pagination.disabled || !$pagination.hasPrevious()" aria-label="First">\n' +
    '    <md-icon md-svg-icon="navigate-first.svg"></md-icon>\n' +
    '  </md-button>\n' +
    '\n' +
    '  <md-button class="md-icon-button" type="button" ng-click="$pagination.previous()" ng-disabled="$pagination.disabled || !$pagination.hasPrevious()" aria-label="Previous">\n' +
    '    <md-icon md-svg-icon="navigate-before.svg"></md-icon>\n' +
    '  </md-button>\n' +
    '\n' +
    '  <md-button class="md-icon-button" type="button" ng-click="$pagination.next()" ng-disabled="$pagination.disabled || !$pagination.hasNext()" aria-label="Next">\n' +
    '    <md-icon md-svg-icon="navigate-next.svg"></md-icon>\n' +
    '  </md-button>\n' +
    '\n' +
    '  <md-button class="md-icon-button" type="button" ng-if="$pagination.showBoundaryLinks()" ng-click="$pagination.last()" ng-disabled="$pagination.disabled || !$pagination.hasNext()" aria-label="Last">\n' +
    '    <md-icon md-svg-icon="navigate-last.svg"></md-icon>\n' +
    '  </md-button>\n' +
    '</div>');
}]);

angular.module('md-table-progress.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('md-table-progress.html',
    '<tr>\n' +
    '  <th colspan="{{columnCount()}}">\n' +
    '    <md-progress-linear ng-show="deferred()" md-mode="indeterminate"></md-progress-linear>\n' +
    '  </th>\n' +
    '</tr>');
}]);

angular.module('arrow-up.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('arrow-up.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>');
}]);

angular.module('navigate-before.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('navigate-before.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>');
}]);

angular.module('navigate-first.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('navigate-first.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 6 v12 h2 v-12 h-2z M17.41 7.41L16 6l-6 6 6 6 1.41-1.41L12.83 12z"/></svg>');
}]);

angular.module('navigate-last.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('navigate-last.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 6 v12 h2 v-12 h-2z M8 6L6.59 7.41 11.17 12l-4.58 4.59L8 18l6-6z"/></svg>');
}]);

angular.module('navigate-next.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('navigate-next.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>');
}]);


angular.module('md.data.table', ['md.table.templates']);

angular.module('md.data.table').directive('mdBody', mdBody);

function mdBody() {

  function compile(tElement) {
    tElement.addClass('md-body');
  }

  return {
    compile: compile,
    restrict: 'A'
  };
}

angular.module('md.data.table').directive('mdCell', mdCell);

function mdCell() {

  function compile(tElement) {
    var select = tElement.find('md-select');

    if(select.length) {
      select.addClass('md-table-select').attr('md-container-class', 'md-table-select');
    }

    tElement.addClass('md-cell');

    return postLink;
  }

  // empty controller to be bind properties to in postLink function
  function Controller() {

  }

  function postLink(scope, element, attrs, ctrls) {
    var select = element.find('md-select');
    var cellCtrl = ctrls.shift();
    var tableCtrl = ctrls.shift();

    if(attrs.ngClick) {
      element.addClass('md-clickable');
    }

    if(select.length) {
      select.on('click', function (event) {
        event.stopPropagation();
      });

      element.addClass('md-clickable').on('click', function (event) {
        event.stopPropagation();
        select[0].click();
      });
    }

    cellCtrl.getTable = tableCtrl.getElement;

    function getColumn() {
      return tableCtrl.$$columns[getIndex()];
    }

    function getIndex() {
      return Array.prototype.indexOf.call(element.parent().children(), element[0]);
    }

    scope.$watch(getColumn, function (column) {
      if(!column) {
        return;
      }

      if(column.numeric) {
        element.addClass('md-numeric');
      } else {
        element.removeClass('md-numeric');
      }
    });
  }

  return {
    controller: Controller,
    compile: compile,
    require: ['mdCell', '^^mdTable'],
    restrict: 'A'
  };
}

angular.module('md.data.table').directive('mdColumn', mdColumn);

function mdColumn($compile, $mdUtil) {

  function compile(tElement) {
    tElement.addClass('md-column');
    return postLink;
  }

  function postLink(scope, element, attrs, ctrls) {
    var headCtrl = ctrls.shift();
    var tableCtrl = ctrls.shift();

    function attachSortIcon() {
      var sortIcon = angular.element('<md-icon md-svg-icon="arrow-up.svg">');

      $compile(sortIcon.addClass('md-sort-icon').attr('ng-class', 'getDirection()'))(scope);

      if(element.hasClass('md-numeric')) {
        element.prepend(sortIcon);
      } else {
        element.append(sortIcon);
      }
    }

    function detachSortIcon() {
      Array.prototype.some.call(element.find('md-icon'), function (icon) {
        return icon.classList.contains('md-sort-icon') && element[0].removeChild(icon);
      });
    }

    function disableSorting() {
      detachSortIcon();
      element.removeClass('md-sort').off('click', setOrder);
    }

    function enableSorting() {
      attachSortIcon();
      element.addClass('md-sort').on('click', setOrder);
    }

    function getIndex() {
      return Array.prototype.indexOf.call(element.parent().children(), element[0]);
    }

    function isActive() {
      return scope.orderBy && (headCtrl.order === scope.orderBy || headCtrl.order === '-' + scope.orderBy);
    }

    function isNumeric() {
      return attrs.mdNumeric === '' || scope.numeric;
    }

    function setOrder() {
      scope.$applyAsync(function () {
        if(isActive()) {
          headCtrl.order = scope.getDirection() === 'md-asc' ? '-' + scope.orderBy : scope.orderBy;
        } else {
          headCtrl.order = scope.getDirection() === 'md-asc' ? scope.orderBy : '-' + scope.orderBy;
        }

        if(angular.isFunction(headCtrl.onReorder)) {
          $mdUtil.nextTick(function () {
            headCtrl.onReorder(headCtrl.order);
          });
        }
      });
    }

    function updateColumn(index, column) {
      tableCtrl.$$columns[index] = column;

      if(column.numeric) {
        element.addClass('md-numeric');
      } else {
        element.removeClass('md-numeric');
      }
    }

    scope.getDirection = function () {
      if(isActive()) {
        return headCtrl.order.charAt(0) === '-' ? 'md-desc' : 'md-asc';
      }

      return attrs.mdDesc === '' || scope.$eval(attrs.mdDesc) ? 'md-desc' : 'md-asc';
    };

    scope.$watch(isActive, function (active) {
      if(active) {
        element.addClass('md-active');
      } else {
        element.removeClass('md-active');
      }
    });

    scope.$watch(getIndex, function (index) {
      updateColumn(index, {'numeric': isNumeric()});
    });

    scope.$watch(isNumeric, function (numeric) {
      updateColumn(getIndex(), {'numeric': numeric});
    });

    scope.$watch('orderBy', function (orderBy) {
      if(orderBy) {
        if(!element.hasClass('md-sort')) {
          enableSorting();
        }
      } else if(element.hasClass('md-sort')) {
        disableSorting();
      }
    });
  }

  return {
    compile: compile,
    require: ['^^mdHead', '^^mdTable'],
    restrict: 'A',
    scope: {
      numeric: '=?mdNumeric',
      orderBy: '@?mdOrderBy'
    }
  };
}

mdColumn.$inject = ['$compile', '$mdUtil'];

angular.module('md.data.table')
  .decorator('$controller', controllerDecorator)
  .factory('$mdEditDialog', mdEditDialog);

/*
 * A decorator for ng.$controller to optionally bind properties to the
 * controller before invoking the constructor. Stolen from the ngMock.
 *
 * https://docs.angularjs.org/api/ngMock/service/$controller
 */
function controllerDecorator($delegate) {
  return function(expression, locals, later, ident) {
    if(later && typeof later === 'object') {
      var create = $delegate(expression, locals, true, ident);
      angular.extend(create.instance, later);
      return create();
    }
    return $delegate(expression, locals, later, ident);
  };
}

controllerDecorator.$inject = ['$delegate'];

function mdEditDialog($compile, $controller, $document, $mdUtil, $q, $rootScope, $templateCache, $templateRequest, $window) {
  /* jshint validthis: true */

  var ESCAPE = 27;

  var busy = false;
  var body = angular.element($document.prop('body'));

  /*
   * bindToController
   * controller
   * controllerAs
   * locals
   * resolve
   * scope
   * targetEvent
   * template
   * templateUrl
   */
  var defaultOptions = {
    clickOutsideToClose: true,
    disableScroll: true,
    escToClose: true,
    focusOnOpen: true
  };

  function build(template, options) {
    var scope = $rootScope.$new();
    var element = $compile(template)(scope);
    var backdrop = $mdUtil.createBackdrop(scope, 'md-edit-dialog-backdrop');
    var controller;

    if(options.controller) {
      controller = getController(options, scope, {$element: element, $scope: scope});
    } else {
      angular.extend(scope, options.scope);
    }

    if(options.disableScroll) {
      disableScroll(element);
    }

    body.prepend(backdrop).append(element.addClass('md-whiteframe-1dp'));

    positionDialog(element, options.target);

    if(options.focusOnOpen) {
      focusOnOpen(element);
    }

    if(options.clickOutsideToClose) {
      backdrop.on('click', function () {
        element.remove();
      });
    }

    if(options.escToClose) {
      escToClose(element);
    }

    element.on('$destroy', function () {
      busy = false;
      backdrop.remove();
    });

    return controller;
  }

  function disableScroll(element) {
    var restoreScroll = $mdUtil.disableScrollAround(element, body);

    element.on('$destroy', function () {
      restoreScroll();
    });
  }

  function getController(options, scope, inject) {
    if(!options.controller) {
      return;
    }

    if(options.resolve) {
      angular.extend(inject, options.resolve);
    }

    if(options.locals) {
      angular.extend(inject, options.locals);
    }

    if(options.controllerAs) {
      scope[options.controllerAs] = {};

      if(options.bindToController) {
        angular.extend(scope[options.controllerAs], options.scope);
      } else {
        angular.extend(scope, options.scope);
      }
    } else {
      angular.extend(scope, options.scope);
    }

    if(options.bindToController) {
      return $controller(options.controller, inject, scope[options.controllerAs]);
    } else {
      return $controller(options.controller, inject);
    }
  }

  function getTemplate(options) {
    return $q(function (resolve, reject) {
      var template = options.template;

      function illegalType(type) {
        reject('Unexpected template value. Expected a string; received a ' + type + '.');
      }

      if(template) {
        return angular.isString(template) ? resolve(template) : illegalType(typeof template);
      }

      if(options.templateUrl) {
        template = $templateCache.get(options.templateUrl);

        if(template) {
          return resolve(template);
        }

        var success = function (template) {
          return resolve(template);
        };

        var error = function () {
          return reject('Error retrieving template from URL.');
        };

        return $templateRequest(options.templateUrl).then(success, error);
      }

      reject('Template not provided.');
    });
  }

  function logError(error) {
    busy = false;
    console.error(error);
  }

  function escToClose(element) {
    var keyup = function (event) {
      if(event.keyCode === ESCAPE) {
        element.remove();
      }
    };

    body.on('keyup', keyup);

    element.on('$destroy', function () {
      body.off('keyup', keyup);
    });
  }

  function focusOnOpen(element) {
    $mdUtil.nextTick(function () {
      var autofocus = $mdUtil.findFocusTarget(element);

      if(autofocus) {
        autofocus.focus();
      }
    }, false);
  }

  function positionDialog(element, target) {
    var table = angular.element(target).controller('mdCell').getTable();

    var getHeight = function () {
      return element.prop('clientHeight');
    };

    var getSize = function () {
      return {
        width: getWidth(),
        height: getHeight()
      };
    };

    var getTableBounds = function () {
      var parent = table.parent();

      if(parent.prop('tagName') === 'MD-TABLE-CONTAINER') {
        return parent[0].getBoundingClientRect();
      } else {
        return table[0].getBoundingClientRect();
      }
    };

    var getWidth = function () {
      return element.prop('clientWidth');
    };

    var reposition = function () {
      var size = getSize();
      var cellBounds = target.getBoundingClientRect();
      var tableBounds = getTableBounds();

      if(size.width > tableBounds.right - cellBounds.left) {
        element.css('left', tableBounds.right - size.width + 'px');
      } else {
        element.css('left', cellBounds.left + 'px');
      }

      if(size.height > tableBounds.bottom - cellBounds.top) {
        element.css('top', tableBounds.bottom - size.height + 'px');
      } else {
        element.css('top', cellBounds.top + 1 + 'px');
      }

      element.css('minWidth', cellBounds.width + 'px');
    };

    var watchWidth = $rootScope.$watch(getWidth, reposition);
    var watchHeight = $rootScope.$watch(getHeight, reposition);

    $window.addEventListener('resize', reposition);

    element.on('$destroy', function () {
      watchWidth();
      watchHeight();

      $window.removeEventListener('resize', reposition);
    });
  }

  function preset(size, options) {

    function getAttrs() {
      var attrs = 'type="' + (options.type || 'text') + '"';

      for(var attr in options.validators) {
        attrs += ' ' + attr + '="' + options.validators[attr] + '"';
      }

      return attrs;
    }

    return {
      controller: ['$element', '$q', 'save', '$scope', function ($element, $q, save, $scope) {
        function update() {
          if($scope.editDialog.$invalid) {
            return $q.reject();
          }

          if(angular.isFunction(save)) {
            return $q.when(save($scope.editDialog.input));
          }

          return $q.resolve();
        }

        this.dismiss = function () {
          $element.remove();
        };

        this.getInput = function () {
          return $scope.editDialog.input;
        };

        $scope.dismiss = this.dismiss;

        $scope.submit = function () {
          update().then(function () {
            $scope.dismiss();
          });
        };
      }],
      locals: {
        save: options.save
      },
      scope: {
        cancel: options.cancel || 'Cancel',
        messages: options.messages,
        model: options.modelValue,
        ok: options.ok || 'Save',
        placeholder: options.placeholder,
        title: options.title,
        size: size
      },
      template:
        '<md-edit-dialog>' +
          '<div layout="column" class="md-content">' +
            // '<div ng-if="size === \'large\'" class="md-title">{{title || \'Edit\'}}</div>' +
            '<form name="editDialog" layout="column" ng-submit="submit(model)">' +
              '<md-input-container md-no-float>' +
                '<input id="copy-input" name="input" ng-model="model" md-autofocus placeholder="{{placeholder}} "' + getAttrs() + '>' +
                '<span class="copy-button" ngclipboard data-clipboard-target="#copy-input" ng-click="dismiss()">copy</span>' +
                '<div ng-messages="editDialog.input.$error">' +
                  '<div ng-repeat="(key, message) in messages" ng-message="{{key}}">{{message}}</div>' +
                '</div>' +
              '</md-input-container>' +
            '</form>' +
          '</div>' +
          '<div ng-if="size === \'large\'" layout="row" layout-align="end" class="md-actions">' +
            '<md-button class="md-primary" ng-click="dismiss()">{{cancel}}</md-button>' +
            '<md-button class="md-primary" ng-click="submit()">{{ok}}</md-button>' +
          '</div>' +
        '</md-edit-dialog>'
    };
  }

  this.show = function (options) {
    if(busy) {
      return $q.reject();
    }

    busy = true;
    options = angular.extend({}, defaultOptions, options);

    if(!options.targetEvent) {
      return logError('options.targetEvent is required to align the dialog with the table cell.');
    }

    if(!options.targetEvent.currentTarget.classList.contains('md-cell')) {
      return logError('The event target must be a table cell.');
    }

    if(options.bindToController && !options.controllerAs) {
      return logError('You must define options.controllerAs when options.bindToController is true.');
    }

    options.target = options.targetEvent.currentTarget;

    var promise = getTemplate(options);
    var promises = [promise];

    for(var prop in options.resolve) {
      promise = options.resolve[prop];
      promises.push($q.when(angular.isFunction(promise) ? promise() : promise));
    }

    promise = $q.all(promises);

    promise['catch'](logError);

    return promise.then(function (results) {
      var template = results.shift();

      for(var prop in options.resolve) {
        options.resolve[prop] = results.shift();
      }

      return build(template, options);
    });
  };

  this.small = function (options) {
    return this.show(angular.extend({}, options, preset('small', options)));
  }.bind(this);

  this.large = function (options) {
    return this.show(angular.extend({}, options, preset('large', options)));
  }.bind(this);

  return this;
}

mdEditDialog.$inject = ['$compile', '$controller', '$document', '$mdUtil', '$q', '$rootScope', '$templateCache', '$templateRequest', '$window'];


angular.module('md.data.table').directive('mdFoot', mdFoot);

function mdFoot() {

  function compile(tElement) {
    tElement.addClass('md-foot');
  }

  return {
    compile: compile,
    restrict: 'A'
  };
}

angular.module('md.data.table').directive('mdHead', mdHead);

function mdHead($compile) {

  function compile(tElement) {
    tElement.addClass('md-head');
    return postLink;
  }

  // empty controller to be bind scope properties to
  function Controller() {

  }

  function postLink(scope, element, attrs, tableCtrl) {
    // because scope.$watch is unpredictable
    var oldValue = new Array(2);

    function addCheckboxColumn() {
      element.children().prepend('<th class="md-column md-checkbox-column">');
    }

    function attatchCheckbox() {
      element.prop('lastElementChild').firstElementChild.appendChild($compile(createCheckBox())(scope)[0]);
    }

    function createCheckBox() {
      return angular.element('<md-checkbox>').attr({
        'aria-label': 'Select All',
        'ng-click': 'toggleAll()',
        'ng-checked': 'allSelected()',
        'ng-disabled': '!getSelectableRows().length'
      });
    }

    function detachCheckbox() {
      var cell = element.prop('lastElementChild').firstElementChild;

      if(cell.classList.contains('md-checkbox-column')) {
        angular.element(cell).empty();
      }
    }

    function enableRowSelection() {
      return tableCtrl.$$rowSelect;
    }

    function mdSelectCtrl(row) {
      return angular.element(row).controller('mdSelect');
    }

    function removeCheckboxColumn() {
      Array.prototype.some.call(element.find('th'), function (cell) {
        return cell.classList.contains('md-checkbox-column') && cell.remove();
      });
    }

    scope.allSelected = function () {
      var rows = scope.getSelectableRows();

      return rows.length && rows.every(function (row) {
        return row.isSelected();
      });
    };

    scope.getSelectableRows = function () {
      return tableCtrl.getBodyRows().map(mdSelectCtrl).filter(function (ctrl) {
        return ctrl && !ctrl.disabled;
      });
    };

    scope.selectAll = function () {
      tableCtrl.getBodyRows().map(mdSelectCtrl).forEach(function (ctrl) {
        if(ctrl && !ctrl.isSelected()) {
          ctrl.select();
        }
      });
    };

    scope.toggleAll = function () {
      return scope.allSelected() ? scope.unSelectAll() : scope.selectAll();
    };

    scope.unSelectAll = function () {
      tableCtrl.getBodyRows().map(mdSelectCtrl).forEach(function (ctrl) {
        if(ctrl && ctrl.isSelected()) {
          ctrl.deselect();
        }
      });
    };

    scope.$watchGroup([enableRowSelection, tableCtrl.enableMultiSelect], function (newValue) {
      if(newValue[0] !== oldValue[0]) {
        if(newValue[0]) {
          addCheckboxColumn();

          if(newValue[1]) {
            attatchCheckbox();
          }
        } else {
          removeCheckboxColumn();
        }
      } else if(newValue[0] && newValue[1] !== oldValue[1]) {
        if(newValue[1]) {
          attatchCheckbox();
        } else {
          detachCheckbox();
        }
      }

      angular.copy(newValue, oldValue);
    });
  }

  return {
    bindToController: true,
    compile: compile,
    controller: Controller,
    controllerAs: '$mdHead',
    require: '^^mdTable',
    restrict: 'A',
    scope: {
      order: '=?mdOrder',
      onReorder: '=?mdOnReorder'
    }
  };
}

mdHead.$inject = ['$compile'];

angular.module('md.data.table').directive('mdRow', mdRow);

function mdRow() {

  function compile(tElement) {
    tElement.addClass('md-row');
    return postLink;
  }

  function postLink(scope, element, attrs, tableCtrl) {
    function enableRowSelection() {
      return tableCtrl.$$rowSelect;
    }

    function isBodyRow() {
      return tableCtrl.getBodyRows().indexOf(element[0]) !== -1;
    }

    function isChild(node) {
      return element[0].contains(node[0]);
    }

    if(isBodyRow()) {
      var cell = angular.element('<td class="md-cell">');

      scope.$watch(enableRowSelection, function (enable) {
        // if a row is not selectable, prepend an empty cell to it
        if(enable && !attrs.mdSelect) {
          if(!isChild(cell)) {
            element.prepend(cell);
          }
          return;
        }

        if(isChild(cell)) {
          cell.remove();
        }
      });
    }
  }

  return {
    compile: compile,
    require: '^^mdTable',
    restrict: 'A'
  };
}

angular.module('md.data.table').directive('mdSelect', mdSelect);

function mdSelect($compile, $parse) {

  // empty controller to bind scope properties to
  function Controller() {

  }

  function postLink(scope, element, attrs, ctrls) {
    var self = ctrls.shift();
    var tableCtrl = ctrls.shift();
    var getId = $parse(attrs.mdSelectId);

    self.id = getId(self.model);

    if(tableCtrl.$$rowSelect && self.id) {
      if(tableCtrl.$$hash.has(self.id)) {
        var index = tableCtrl.selected.indexOf(tableCtrl.$$hash.get(self.id));

        // if the item is no longer selected remove it
        if(index === -1) {
          tableCtrl.$$hash.purge(self.id);
        }

        // if the item is not a reference to the current model update the reference
        else if(!tableCtrl.$$hash.equals(self.id, self.model)) {
          tableCtrl.$$hash.update(self.id, self.model);
          tableCtrl.selected.splice(index, 1, self.model);
        }

      } else {

        // check if the item has been selected
        tableCtrl.selected.some(function (item, index) {
          if(getId(item) === self.id) {
            tableCtrl.$$hash.update(self.id, self.model);
            tableCtrl.selected.splice(index, 1, self.model);

            return true;
          }
        });
      }
    }

    self.isSelected = function () {
      if(!tableCtrl.$$rowSelect) {
        return false;
      }

      if(self.id) {
        return tableCtrl.$$hash.has(self.id);
      }

      return tableCtrl.selected.indexOf(self.model) !== -1;
    };

    self.select = function () {
      if(self.disabled) {
        return;
      }

      if(tableCtrl.enableMultiSelect()) {
        tableCtrl.selected.push(self.model);
      } else {
        tableCtrl.selected.splice(0, tableCtrl.selected.length, self.model);
      }

      if(angular.isFunction(self.onSelect)) {
        self.onSelect(self.model);
      }
    };

    self.deselect = function () {
      if(self.disabled) {
        return;
      }

      tableCtrl.selected.splice(tableCtrl.selected.indexOf(self.model), 1);

      if(angular.isFunction(self.onDeselect)) {
        self.onDeselect(self.model);
      }
    };

    self.toggle = function (event) {
      if(event && event.stopPropagation) {
        event.stopPropagation();
      }

      return self.isSelected() ? self.deselect() : self.select();
    };

    function autoSelect() {
      return attrs.mdAutoSelect === '' || self.autoSelect;
    }

    function createCheckbox() {
      var checkbox = angular.element('<md-checkbox>').attr({
        'aria-label': 'Select Row',
        'ng-click': '$mdSelect.toggle($event)',
        'ng-checked': '$mdSelect.isSelected()',
        'ng-disabled': '$mdSelect.disabled'
      });

      return angular.element('<td class="md-cell md-checkbox-cell">').append($compile(checkbox)(scope));
    }

    function disableSelection() {
      Array.prototype.some.call(element.children(), function (child) {
        return child.classList.contains('md-checkbox-cell') && element[0].removeChild(child);
      });

      if(autoSelect()) {
        element.off('click', toggle);
      }
    }

    function enableSelection() {
      element.prepend(createCheckbox());

      if(autoSelect()) {
        element.on('click', toggle);
      }
    }

    function enableRowSelection() {
      return tableCtrl.$$rowSelect;
    }

    function onSelectChange(selected) {
      if(!self.id) {
        return;
      }

      if(tableCtrl.$$hash.has(self.id)) {
        // check if the item has been deselected
        if(selected.indexOf(tableCtrl.$$hash.get(self.id)) === -1) {
          tableCtrl.$$hash.purge(self.id);
        }

        return;
      }

      // check if the item has been selected
      if(selected.indexOf(self.model) !== -1) {
        tableCtrl.$$hash.update(self.id, self.model);
      }
    }

    function toggle(event) {
      scope.$applyAsync(function () {
        self.toggle(event);
      });
    }

    scope.$watch(enableRowSelection, function (enable) {
      if(enable) {
        enableSelection();
      } else {
        disableSelection();
      }
    });

    scope.$watch(autoSelect, function (newValue, oldValue) {
      if(newValue === oldValue) {
        return;
      }

      if(tableCtrl.$$rowSelect && newValue) {
        element.on('click', toggle);
      } else {
        element.off('click', toggle);
      }
    });

    scope.$watch(self.isSelected, function (isSelected) {
      return isSelected ? element.addClass('md-selected') : element.removeClass('md-selected');
    });

    scope.$watch(tableCtrl.enableMultiSelect, function (multiple) {
      if(tableCtrl.$$rowSelect && !multiple) {
        // remove all but the first selected item
        tableCtrl.selected.splice(1);
      }
    });

    tableCtrl.registerModelChangeListener(onSelectChange);

    element.on('$destroy', function () {
      tableCtrl.removeModelChangeListener(onSelectChange);
    });
  }

  return {
    bindToController: true,
    controller: Controller,
    controllerAs: '$mdSelect',
    link: postLink,
    require: ['mdSelect', '^^mdTable'],
    restrict: 'A',
    scope: {
      model: '=mdSelect',
      disabled: '=ngDisabled',
      onSelect: '=?mdOnSelect',
      onDeselect: '=?mdOnDeselect',
      autoSelect: '=mdAutoSelect'
    }
  };
}

mdSelect.$inject = ['$compile', '$parse'];

angular.module('md.data.table').directive('mdTable', mdTable);

function Hash() {
  var keys = {};

  this.equals = function (key, item) {
    return keys[key] === item;
  };

  this.get = function (key) {
    return keys[key];
  };

  this.has = function (key) {
    return keys.hasOwnProperty(key);
  };

  this.purge = function (key) {
    delete keys[key];
  };

  this.update = function (key, item) {
    keys[key] = item;
  };
}

function mdTable() {

  function compile(tElement, tAttrs) {
    tElement.addClass('md-table');

    if(tAttrs.hasOwnProperty('mdProgress')) {
      var body = tElement.find('tbody')[0];
      var progress = angular.element('<thead class="md-table-progress" md-table-progress>');

      if(body) {
        tElement[0].insertBefore(progress[0], body);
      }
    }
  }

  function Controller($attrs, $element, $q, $scope) {
    var self = this;
    var queue = [];
    var watchListener;
    var modelChangeListeners = [];

    self.$$hash = new Hash();
    self.$$columns = {};

    function enableRowSelection() {
      self.$$rowSelect = true;

      watchListener = $scope.$watchCollection('$mdTable.selected', function (selected) {
        modelChangeListeners.forEach(function (listener) {
          listener(selected);
        });
      });

      $element.addClass('md-row-select');
    }

    function disableRowSelection() {
      self.$$rowSelect = false;

      if(angular.isFunction(watchListener)) {
        watchListener();
      }

      $element.removeClass('md-row-select');
    }

    function resolvePromises() {
      if(!queue.length) {
        return $scope.$applyAsync();
      }

      queue[0]['finally'](function () {
        queue.shift();
        resolvePromises();
      });
    }

    function rowSelect() {
      return $attrs.mdRowSelect === '' || self.rowSelect;
    }

    function validateModel() {
      if(!self.selected) {
        return console.error('Row selection: ngModel is not defined.');
      }

      if(!angular.isArray(self.selected)) {
        return console.error('Row selection: Expected an array. Recived ' + typeof self.selected + '.');
      }

      return true;
    }

    self.columnCount = function () {
      return self.getRows($element[0]).reduce(function (count, row) {
        return row.cells.length > count ? row.cells.length : count;
      }, 0);
    };

    self.getRows = function (element) {
      return Array.prototype.filter.call(element.rows, function (row) {
        return !row.classList.contains('ng-leave');
      });
    };

    self.getBodyRows = function () {
      return Array.prototype.reduce.call($element.prop('tBodies'), function (result, tbody) {
        return result.concat(self.getRows(tbody));
      }, []);
    };

    self.getElement = function () {
      return $element;
    };

    self.getHeaderRows = function () {
      return self.getRows($element.prop('tHead'));
    };

    self.enableMultiSelect = function () {
      return $attrs.multiple === '' || $scope.$eval($attrs.multiple);
    };

    self.waitingOnPromise = function () {
      return !!queue.length;
    };

    self.queuePromise = function (promise) {
      if(!promise) {
        return;
      }

      if(queue.push(angular.isArray(promise) ? $q.all(promise) : $q.when(promise)) === 1) {
        resolvePromises();
      }
    };

    self.registerModelChangeListener = function (listener) {
      modelChangeListeners.push(listener);
    };

    self.removeModelChangeListener = function (listener) {
      var index = modelChangeListeners.indexOf(listener);

      if(index !== -1) {
        modelChangeListeners.splice(index, 1);
      }
    };

    if($attrs.hasOwnProperty('mdProgress')) {
      $scope.$watch('$mdTable.progress', self.queuePromise);
    }

    $scope.$watch(rowSelect, function (enable) {
      if(enable && !!validateModel()) {
        enableRowSelection();
      } else {
        disableRowSelection();
      }
    });
  }

  Controller.$inject = ['$attrs', '$element', '$q', '$scope'];

  return {
    bindToController: true,
    compile: compile,
    controller: Controller,
    controllerAs: '$mdTable',
    restrict: 'A',
    scope: {
      progress: '=?mdProgress',
      selected: '=ngModel',
      rowSelect: '=mdRowSelect'
    }
  };
}

angular.module('md.data.table').directive('mdTablePagination', mdTablePagination);

function mdTablePagination() {

  function compile(tElement) {
    tElement.addClass('md-table-pagination');
  }

  function Controller($attrs, $mdUtil, $scope) {
    var self = this;
    var defaultLabel = {
      page: 'Page:',
      rowsPerPage: 'Rows per page:',
      of: 'of'
    };

    self.label = angular.copy(defaultLabel);

    function isPositive(number) {
      return parseInt(number, 10) > 0;
    }

    self.eval = function (expression) {
      return $scope.$eval(expression);
    };

    self.first = function () {
      self.page = 1;
      self.onPaginationChange();
    };

    self.hasNext = function () {
      return self.page * self.limit < self.total;
    };

    self.hasPrevious = function () {
      return self.page > 1;
    };

    self.last = function () {
      self.page = self.pages();
      self.onPaginationChange();
    };

    self.max = function () {
      return self.hasNext() ? self.page * self.limit : self.total;
    };

    self.min = function () {
      return isPositive(self.total) ? self.page * self.limit - self.limit + 1 : 0;
    };

    self.next = function () {
      self.page++;
      self.onPaginationChange();
    };

    self.onPaginationChange = function () {
      if(angular.isFunction(self.onPaginate)) {
        $mdUtil.nextTick(function () {
          self.onPaginate(self.page, self.limit);
        });
      }
    };

    self.pages = function () {
      return isPositive(self.total) ? Math.ceil(self.total / (isPositive(self.limit) ? self.limit : 1)) : 1;
    };

    self.previous = function () {
      self.page--;
      self.onPaginationChange();
    };

    self.showBoundaryLinks = function () {
      return $attrs.mdBoundaryLinks === '' || self.boundaryLinks;
    };

    self.showPageSelect = function () {
      return $attrs.mdPageSelect === '' || self.pageSelect;
    };

    $scope.$watch('$pagination.limit', function (newValue, oldValue) {
      if(isNaN(newValue) || isNaN(oldValue) || newValue === oldValue) {
        return;
      }

      // find closest page from previous min
      self.page = Math.floor(((self.page * oldValue - oldValue) + newValue) / (isPositive(newValue) ? newValue : 1));
      self.onPaginationChange();
    });

    $attrs.$observe('mdLabel', function (label) {
      angular.extend(self.label, defaultLabel, $scope.$eval(label));
    });

    $scope.$watch('$pagination.total', function (newValue, oldValue) {
      if(isNaN(newValue) || newValue === oldValue) {
        return;
      }

      if(self.page > self.pages()) {
        self.last();
      }
    });
  }

  Controller.$inject = ['$attrs', '$mdUtil', '$scope'];

  return {
    bindToController: {
      boundaryLinks: '=?mdBoundaryLinks',
      disabled: '=ngDisabled',
      limit: '=mdLimit',
      page: '=mdPage',
      pageSelect: '=?mdPageSelect',
      onPaginate: '=?mdOnPaginate',
      limitOptions: '=?mdLimitOptions',
      total: '@mdTotal'
    },
    compile: compile,
    controller: Controller,
    controllerAs: '$pagination',
    restrict: 'E',
    scope: {},
    templateUrl: 'md-table-pagination.html'
  };
}

angular.module('md.data.table').directive('mdTableProgress', mdTableProgress);

function mdTableProgress() {

  function postLink(scope, element, attrs, tableCtrl) {
    scope.columnCount = tableCtrl.columnCount;
    scope.deferred = tableCtrl.waitingOnPromise;
  }

  return {
    link: postLink,
    require: '^^mdTable',
    restrict: 'A',
    scope: {},
    templateUrl: 'md-table-progress.html'
  };
}

angular.module('md.data.table').directive('virtualPageSelect', virtualPageSelect);

function virtualPageSelect() {

  function Controller($element, $scope) {
    var self = this;
    var content = $element.find('md-content');

    self.pages = [];

    function getMin(pages, total) {
      return Math.min(pages, isFinite(total) && isPositive(total) ? total : 1);
    }

    function isPositive(number) {
      return number > 0;
    }

    function setPages(max) {
      if(self.pages.length > max) {
        return self.pages.splice(max);
      }

      for(var i = self.pages.length; i < max; i++) {
        self.pages.push(i + 1);
      }
    }

    content.on('scroll', function () {
      if((content.prop('clientHeight') + content.prop('scrollTop')) >= content.prop('scrollHeight')) {
        $scope.$applyAsync(function () {
          setPages(getMin(self.pages.length + 10, self.total));
        });
      }
    });

    $scope.$watch('$pageSelect.total', function (total) {
      setPages(getMin(Math.max(self.pages.length, 10), total));
    });

    $scope.$watch('$pagination.page', function (page) {
      for(var i = self.pages.length; i < page; i++) {
        self.pages.push(i + 1);
      }
    });
  }

  Controller.$inject = ['$element', '$scope'];

  return {
    bindToController: {
      total: '@'
    },
    controller: Controller,
    controllerAs: '$pageSelect'
  };
}

})(window, angular);

angular.module('SE_App', ['ngMaterial', 'md.data.table', 'ngResource', 'ngRoute','ngclipboard','ngSanitize', 'ngCsv','satellizer','ui.router','angular-loading-bar','stripe.checkout','ngPassword'])
  .config(['$compileProvider', '$mdThemingProvider','$mdAriaProvider','$stateProvider', '$locationProvider','$urlRouterProvider','$authProvider','cfpLoadingBarProvider', function ($compileProvider, $mdThemingProvider,$mdAriaProvider, $stateProvider, $locationProvider,$urlRouterProvider,$authProvider,cfpLoadingBarProvider) {
    'use strict';
    // cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    // cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Custom Loading Message...</div>';

    $mdAriaProvider.disableWarnings();
    $compileProvider.debugInfoEnabled(false);
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('deep-purple');

    $stateProvider
    .state('home', {
      abstract: true,
      templateUrl: 'partials/home.html',
      controller: 'BaseController',
      resolve: {
        loginRequired: loginRequired
      }
    })
     .state('home.domains', {
       url:'/domains',
       templateUrl: 'tabs/domains/domains.html',
       controller: 'domainController',
       resolve: {
         loginRequired: loginRequired
       }
     })
     .state('home.hosting', {
        url: '/hosting',
        templateUrl: 'tabs/hosting/hosting.html',
        controller: 'hostingController',
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('home.registrar', {
        url:'/registrar',
        templateUrl: 'tabs/registrar/registrar.html',
        controller: 'registrarController',
        resolve: {
          loginRequired: loginRequired
        }
       })
       .state('home.web2', {
         url:'/web2.0',
         templateUrl: 'tabs/w2Accounts/W2_Accounts.html',
         controller: 'W2_accountsController',
         resolve: {
           loginRequired: loginRequired
         }
        })
        .state('home.people', {
          url: '/people',
          templateUrl: 'tabs/person/person.html',
          controller: 'personController',
          resolve: {
            loginRequired: loginRequired
          }
         })
         .state('home.cms-login', {
           url: '/cms-login',
           templateUrl: 'tabs/cmsLogin/cms_login.html',
           controller: 'cms_loginController',
           resolve: {
             loginRequired: loginRequired
           }
          })
          .state('home.resources', {
            url: '/resources',
            templateUrl: 'tabs/resourceLogin/resource_login.html',
            controller: 'resource_loginController',
            resolve: {
              loginRequired: loginRequired
            }
           })
           .state('home.links', {
             url: '/links',
             templateUrl: 'tabs/links/links.html',
             controller: 'linksController',
             resolve: {
               loginRequired: loginRequired
             }
            })
            .state('home.url-data', {
              url: '/url-data',
                   templateUrl: 'tabs/urlData/url_data.php',
                   controller: 'url_dataController',
                   resolve: {
                     loginRequired: loginRequired
                   }
                  })
			.state('home.change-log', {
        url: '/change-log',
             templateUrl: 'tabs/changeLog/change_log.html',
             controller: 'change_logController',
             resolve: {
               loginRequired: loginRequired
             }
            })
            .state('home.software-keys', {
              url: '/software-keys',
                   templateUrl: 'tabs/softwareKeys/software_keys.html',
                   controller: 'software_keysController',
                   resolve: {
                     loginRequired: loginRequired
                   }
                  })
      .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'loginController'
      })
        .state('password-reset', {
        url: '/password-reset',
        templateUrl: 'partials/password-reset.php',
        controller: 'password-resetController'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'partials/profile.html',
        controller: 'profileController',
        resolve: {
          loginRequired: loginRequired
        }
      });

      $authProvider.loginUrl = 'service/auth/login';

      $urlRouterProvider.otherwise('/domains');

      function loginRequired($q, $location, $auth){
        var defer = $q.defer();
        if($auth.isAuthenticated()){
          defer.resolve();
        }else{
          $location.path('/login');
        }
        return defer.promise;
      }

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
  }])

.service('upDownloadService',function($q,$http,$mdToast,$mdDialog){

  this.bulkDownload = function (event,$current_data,$file_name,$header,$location) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'bulkDownloadController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'inc/bulk_download.html',
      resolve: {
           tableData: function () {
             return $current_data;
           },
           file_name: function(){
             return $file_name;
           },
           header: function(){
             return $header;
           },
           location: function(){
             return $location;
           }
         }
    });
  };
})

  .service('changeCellServices',function($mdEditDialog,$q,$http,$mdToast,$mdDialog){

    this.changeCellText = function (event, $table, $column,db_table,db_ID,$length) {
        event.stopPropagation();

        var success  = function(response){
          $mdToast.show({
          hideDelay   : 4000,
          position    : 'top center',
          controller  : 'ToastCtrl',
          templateUrl : '/partials/toast-template.html',
          toastClass  : 'toastSuccess',
          resolve: {
               $response: function () {
                 return response.data;
               }
             }
          });
        };

        var failure  = function(response){
          $mdToast.show({
          hideDelay   : 9000,
          position    : 'top center',
          controller  : 'ToastCtrl',
          templateUrl : '/partials/toast-template.html',
          toastClass  : 'toastDanger',
          resolve: {
               $response: function () {
                 return response.data;
               }
             }
          });
        };

        var promise = $mdEditDialog.large({

          modelValue: $table[$column],
          save: function (input) {
            var deferred = $q.defer();
            $table[$column] = input.$modelValue;
            var $obj = {};
            $obj.table = db_table;
            $obj.column = $column;
            $obj.value = $table[$column];
            $obj.identifier = db_ID;
            $obj.id = $table[db_ID];
            $http.post('/service/updateItem/',$obj).then(function(response){
              success(response);
              deferred.resolve();
            },function(response){
              failure(response);
              deferred.reject();
            });
            return deferred.promise;
          },
          targetEvent: event,
          validators: {
            'md-maxlength': $length
          },
        });

        promise.then(function (ctrl) {
          //console.log("Inside then statement before input");
            var input = ctrl.getInput();
            input.$viewChangeListeners.push(function () {
              //console.log("Inside then statement after input");
            input.$setValidity('test', input.$modelValue !== 'test');
          });
        });
      };


      this.changeDate = function($column, $table,db_table,db_ID){
        var success  = function(response){
          $mdToast.show({
          hideDelay   : 4000,
          position    : 'top center',
          controller  : 'ToastCtrl',
          templateUrl : '/partials/toast-template.html',
          toastClass  : 'toastSuccess',
          resolve: {
               $response: function () {
                 return response.data;
               }
             }
          });
        };

        var failure  = function(response){
          $mdToast.show({
          hideDelay   : 9000,
          position    : 'top center',
          controller  : 'ToastCtrl',
          templateUrl : '/partials/toast-template.html',
          toastClass  : 'toastDanger',
          resolve: {
               $response: function () {
                 return response.data;
               }
             }
          });
        };

          var deferred = $q.defer();
          var $obj = {};
          $obj.table = db_table;
          $obj.column = $column;
          $obj.value = $table[$column];
          $obj.value = $table[$column].getFullYear()+"-"+
          ("0"+($table[$column].getMonth()+1)).slice(-2)+"-"+
          ("0"+$table[$column].getDate()).slice(-2);
          $obj.identifier = db_ID;
          $obj.id = $table[db_ID];
          $http.post('service/updateItem',$obj).then(function(response){
            success(response);
            deferred.resolve();
          },function(response){
            failure(response);
            deferred.reject();
          });
          return deferred.promise;
        };


this.changeDropdown = function($column, $value, $table,db_table,db_ID){

              var $obj = {};
              $obj.table = db_table;
              $obj.column = $column;
              $obj.value = $table[$value];
              $obj.identifier = db_ID;
              $obj.id = $table[db_ID];

              var success  = function(response){
                $mdToast.show({
                hideDelay   : 4000,
                position    : 'top center',
                controller  : 'ToastCtrl',
                templateUrl : '/partials/toast-template.html',
                toastClass  : 'toastSuccess',
                resolve: {
                     $response: function () {
                       return response.data;
                     }
                   }
                });
                };

                var failure  = function(response){
                  $mdToast.show({
                  hideDelay   : 9000,
                  position    : 'top center',
                  controller  : 'ToastCtrl',
                  templateUrl : '/partials/toast-template.html',
                  toastClass  : 'toastDanger',
                  resolve: {
                       $response: function () {
                         return response.data;
                       }
                     }
                  });
                };

              var deferred = $q.defer();

            $http.post('service/updateItem',$obj).then(function(response){
              success(response);
              deferred.resolve();
            },function(response){
              failure(response);
              deferred.reject();
            });
            return deferred.promise;

            };

            this.changeSwitchValue = function($column, $table,db_table,db_ID){
              var success  = function(response){
                $mdToast.show({
                hideDelay   : 4000,
                position    : 'top center',
                controller  : 'ToastCtrl',
                templateUrl : '/partials/toast-template.html',
                toastClass  : 'toastSuccess',
                resolve: {
                     $response: function () {
                       return response.data;
                     }
                   }
                });
              };

              var failure  = function(response){
                $mdToast.show({
                hideDelay   : 9000,
                position    : 'top center',
                controller  : 'ToastCtrl',
                templateUrl : '/partials/toast-template.html',
                toastClass  : 'toastDanger',
                resolve: {
                     $response: function () {
                       return response.data;
                     }
                   }
                });
              };

               var deferred = $q.defer();
               var $obj = {};
               $obj.table = db_table;
               $obj.column = $column;
               $obj.value = $table[$column];
               $obj.identifier = db_ID;
               $obj.id = $table[db_ID];
               $http.post('service/updateItem',$obj).then(function(response){
                 success(response);
                 deferred.resolve();
               },function(response){
                 failure(response);
                 deferred.reject();
               });
               return deferred.promise;
             };
  });


 angular.module('SE_App').controller('BaseController', ['$scope','$rootScope','$location', '$timeout', '$mdSidenav','$auth','$location', function($scope,$rootScope,$location, $timeout, $mdSidenav,$auth,$location){

   $scope.payload = JSON.parse($auth.getPayload().sub);

   $scope.logout = function(){
      $auth.logout();
  $location.path('/login');
}


  if($scope.payload.user_type == 'admin' || $scope.payload.user_type == 'superuser'){
    $scope.showTab = true;
  } else {
    $scope.showTab = false;
  }


$scope.userSettings = function(){
$location.path('/profile');
};



	$scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }

    $scope.tabClicked = function(){
      // console.log('Change paths');
      if($scope.data.selectedIndex == 0){
  			$location.path('/domains');
  		}else if($scope.data.selectedIndex == 1){
  			$location.path('/hosting');
  		}else if($scope.data.selectedIndex == 2){
  			$location.path('/registrar');
  		}else if($scope.data.selectedIndex == 3){
  			$location.path('/web2.0');
  		}else if($scope.data.selectedIndex == 4){
  			$location.path('/people');
  		}else if($scope.data.selectedIndex == 5){
  			$location.path('/cms-login');
  		}else if($scope.data.selectedIndex == 6){
  			$location.path('/resources');
  		}else if($scope.data.selectedIndex == 7){
  			$location.path('/links');
      }else if($scope.data.selectedIndex == 8){
        $location.path('/software-keys');
      }else if($scope.data.selectedIndex == 9){
    			$location.path('/url-data');
  		}else if($scope.data.selectedIndex == 10){
  			$location.path('/change-log');
  		}
    };

	$scope.data = {
      selectedIndex: 0,
    };

}]);

angular.module('SE_App').controller('bulkDownloadController', ['$mdDialog','$scope' , '$http', '$q','$mdToast','tableData','file_name','header','location',function ($mdDialog, $scope, $http, $q, $mdToast,tableData,file_name,header,location) {
  'use strict';

this.$file = file_name;

this.$csv_header = header;

this.$location = location;


this.tableNew = function(){
    $mdDialog.hide();
    return tableData;
  };
  this.cancel = $mdDialog.cancel;

  this.bulkDownload = function () {

    var failure  = function(response){
      $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastDanger',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
    };

    var $query = {
      all: 'true'
    };
var deferred = $q.defer();
$scope.promise = deferred.promise;
console.log('step one');
$http({
  method: 'GET',
  url: location,
  params:$query
}).then(function(response){
  //success(response);
  //console.log(response.data.data);
  deferred.resolve(response.data.data);
},function(response){
  failure(response);
  deferred.reject();
});
$mdDialog.hide();
console.log(deferred.promise);
return deferred.promise;
  };
}]);

angular.module('SE_App').controller('loginController', ['$mdDialog','$scope', '$mdEditDialog', '$http','$mdToast',
'$q','$auth','$state',
    function ($mdDialog,$scope, $mdEditDialog, $http,$mdToast,$q,$auth,$state) {
  'use strict';

  $scope.login = function($uuser){
			$scope.busy = true;
			$auth.login($uuser)
			.then(function(response) {
        if(response.data == "Need Verification"){
                          $mdDialog.show({
                          clickOutsideToClose: true,
                          controller: 'authyVerify',
                          controllerAs: 'authyCtrl',
                          focusOnOpen: false,
                          templateUrl: 'partials/authyVerify.html',
                          scope: $scope,
                          resolve: {
                               $user: function () {
                                 return $uuser;
                               }
                             }
                          })
                    } else {
                      $mdToast.show({
                        hideDelay   : 4000,
                        position    : 'top center',
                        controller  : 'ToastCtrl',
                        templateUrl : '/partials/toast-template.html',
                        toastClass  : 'toastSuccess',
                        resolve: {
                             $response: function () {
                               return 'Successfully Logged In';
                             }
                           }
                        });
        }
				$state.go('home.domains');
			})
			.catch(function(response) {
				$scope.busy = false;
        $mdToast.show({
        hideDelay   : 9000,
        position    : 'top center',
        controller  : 'ToastCtrl',
        templateUrl : '/partials/toast-template.html',
        toastClass  : 'toastDanger',
        resolve: {
             $response: function () {
               return response.data;
             }
           }
        });
			});
    }
    $scope.forgotPassword = function (event) {
      $mdDialog.show({
        clickOutsideToClose: true,
        controller: 'forgotPasswordController',
        controllerAs: 'fgpCtrl',
        focusOnOpen: false,
        targetEvent: event,
        templateUrl: 'partials/forgotPassword.html',
      })
      // .then($scope.getChangeLog);
    };

    $scope.signUp = function (event) {
      $mdDialog.show({
        clickOutsideToClose: true,
        controller: 'signupController',
        controllerAs: 'sUpCtrl',
        focusOnOpen: false,
        targetEvent: event,
        templateUrl: 'partials/signup.html',
      })
      // .then($scope.getChangeLog);
    };
}]);

angular.module('SE_App').controller('signupController', ['$mdDialog','$scope', '$mdEditDialog', '$http','$mdToast',
'$q',
    function ($mdDialog,$scope, $mdEditDialog, $http,$mdToast,$q) {
  'use strict';

  function stripeResponse(response) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'stripeResponseController',
      controllerAs: 'respCtrl',
      focusOnOpen: false,
      templateUrl: 'partials/stripeResponse.html',
      resolve: {
           $response: function () {
             return response;
           }
         }
    })
    // .then($scope.getChangeLog);
  };

  this.register = function(token){

      // $scope.busy = true;
      $scope.register.form.$setSubmitted();
      if($scope.register.form.$valid) {
      $http.post('/service/signup/',{signUp: $scope.signUp,$token: token}).then(function(response){

        stripeResponse(response);
    })

      .catch(function(response) {

        $mdToast.show({
        hideDelay   : 9000,
        position    : 'top center',
        controller  : 'ToastCtrl',
        templateUrl : '/partials/toast-template.html',
        toastClass  : 'toastWarning',
        resolve: {
             $response: function () {
               return response.data;
             }
           }
        });
      });

    }
  }

    function success(signUp) {
      $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'New Content Added';
           }
         }
      });
      $mdDialog.hide(software_keys_table);
    }

      function fedup(response){
    	//console.log('FAILED!',data);
      $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastDanger',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
      }
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };

}]);


angular.module('SE_App').controller('deleteAccountController', ['$mdDialog','$scope', '$mdEditDialog', '$http','$mdToast',
'$q',
    function ($mdDialog, $scope, $mdEditDialog, $http,$mdToast,$q) {
  'use strict';

  this.cancelAccount = function(){
    $http.post('/service/delete-account/').then(function(response){
      $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastWarning',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
        $mdDialog.hide();
  });
  }

        this.cancel = $mdDialog.cancel;

}]);



  angular.module('SE_App').controller('forgotPasswordController', ['$mdDialog','$scope', '$mdEditDialog', '$http','$mdToast',
  function ($mdDialog, $scope, $mdEditDialog, $http,$mdToast) {
    'use strict';

    $scope.resetPassword = function($user){
      $scope.forgotPassword.form.$setSubmitted();
      $http.post('/service/password-reset/',{user: $user}).then(function(response){
        $mdToast.show({
        hideDelay   : 9000,
        position    : 'top center',
        controller  : 'ToastCtrl',
        templateUrl : '/partials/toast-template.html',
        toastClass  : 'toastWarning',
        resolve: {
             $response: function () {
               return response.data;
             }
           }
        });
          $mdDialog.hide();
    }).catch(function(response) {
      $scope.busy = false;
      $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastDanger',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
        });
    }


    this.cancel = function() {
      $mdDialog.cancel();
    };

  }]);

  angular.module('SE_App').controller('profileChangeController', ['$mdDialog','$scope', '$mdEditDialog', '$http','$mdToast',
  '$q', '$profile',
      function ($mdDialog, $scope, $mdEditDialog, $http,$mdToast,$q,$profile) {
        'use strict';
        this.profileChange2 = function(){
          $http.post('/service/newprofileinfo/',{newProfile: $profile})
          .then(function(response){
        success(response);},
        function(response){
        failure(response);
      });
      };

    var failure  = function (response) {
                    console.error("Login error: ", response.data);
                    alert("Error with profile change or two factor turn on.  Check console");
    };

    var success  = function(response){
      if(response.data == "Verification"){
                              $mdDialog.show({
                        clickOutsideToClose: true,
                        controller: 'authy',
                        controllerAs: 'authyCtrl',
                        focusOnOpen: false,
                        templateUrl: 'partials/authy.html',
                        })
                  } else {
                    $mdToast.show({
                    hideDelay   : 6000,
                    position    : 'top center',
                    controller  : 'ToastCtrl',
                    templateUrl : '/partials/toast-template.html',
                    toastClass  : 'toastSuccess',
                    resolve: {
                         $response: function () {
                           return response.data;
                         }
                       }
                    });
        }
          $mdDialog.hide();
    };

    this.cancel = $mdDialog.cancel;


  }]);



  angular.module('SE_App').controller('ToastCtrl', ['$mdDialog','$scope','$mdToast','$response',
      function ($mdDialog, $scope, $mdToast,$response) {
        $scope.response = $response;
        $scope.closeToast = function() {
                $mdToast
                  .hide()
              };
    }]);

    angular.module('SE_App').controller('stripeResponseController', ['$mdDialog', '$scope', '$mdEditDialog', '$http','$mdToast',
    '$q', '$response',
    function ($mdDialog, $scope, $mdEditDialog, $http,$mdToast,$q,$response) {
      'use strict';

      $scope.response = $response.data;

      $scope.hide = function() {
        $mdDialog.hide();
      };

      this.cancel = function() {
        $mdDialog.cancel();
      };

    }]);



    angular.module('SE_App').controller('authy', ['$mdDialog','$scope', '$mdEditDialog', '$http','$mdToast',
    function ($mdDialog, $scope, $mdEditDialog, $http,$mdToast) {
      'use strict';

      this.cancel = function() {
        $mdDialog.cancel();
      };

}]);


angular.module('SE_App').controller('authyVerify', ['$mdDialog','$scope', '$http','$user','$auth','$state','$mdToast',
function ($mdDialog, $scope, $http,$user,$auth,$state,$mdToast) {
  'use strict';
  $scope.authyVerify = function($authy){
    $user['authy'] = $authy.code;
     console.log($user);
    $scope.authy.form.$setSubmitted();

    $auth.login($user).then(function(response){
          $mdToast.show({
          hideDelay   : 4000,
          position    : 'top center',
          controller  : 'ToastCtrl',
          templateUrl : '/partials/toast-template.html',
          toastClass  : 'toastSuccess',
          resolve: {
               $response: function () {
                 return 'Successfully Verifed and Logged In';
               }
             }
          });
        $mdDialog.hide();
        $state.go('home.domains');
  }).catch(function(response) {
    $scope.busy = false;
    $mdToast.show({
    hideDelay   : 9000,
    position    : 'top center',
    controller  : 'ToastCtrl',
    templateUrl : '/partials/toast-template.html',
    toastClass  : 'toastDanger',
    resolve: {
         $response: function () {
           return response.data;
         }
       }
    });
  });
  }
  this.cancel = function() {
    $mdDialog.cancel();
  };

}]);


angular.module('SE_App').controller('profileController', ['$mdDialog','$scope', '$mdEditDialog', '$http','$mdToast',
'$q','$location','$auth',
function ($mdDialog,$scope, $mdEditDialog, $http,$mdToast,$q,$location,$auth) {
  'use strict';

function currentProfile(){
    $scope.profile = JSON.parse($auth.getPayload().sub);
    $http.post('/service/profileinfo/').then(function(response){
    $scope.profile.user_phone = response.data.profile[0].user_phone;
    $scope.profile.user_address = response.data.profile[0].user_address;
    $scope.profile.user_country_code = response.data.profile[0].user_country_code;
    $scope.profile.authy_id = response.data.profile[0].authy_id;
    $scope.profile.user_name = response.data.profile[0].user_name;
    // console.log($scope.profile);
    });
};
currentProfile();

$scope.profileChange = function (event,profile) {
  $scope.register.form.$setSubmitted();
  if($scope.register.form.$valid) {
  $mdDialog.show({
    clickOutsideToClose: true,
    controller: 'profileChangeController',
    controllerAs: 'pctrl',
    skipHide: true,
    // focusOnOpen: false,
    targetEvent: event,
    templateUrl: 'partials/verifyChangeProfileDialog.html',
    resolve: {
         $profile: function () {
           return profile;
       }
     }
  });
}
};

$scope.stripeChange = function(token){
    // $scope.busy = true;
        $http.post('/service/stripe-change/',{$token: token}).then(function(response){
          success(response);
  })
    .catch(function(response) {
      $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastWarning',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
    });

  }

  function success(response) {
    $mdToast.show({
    hideDelay   : 4000,
    position    : 'top center',
    controller  : 'ToastCtrl',
    templateUrl : '/partials/toast-template.html',
    toastClass  : 'toastSuccess',
    resolve: {
         $response: function () {
           return response.data;
         }
       }
    });
    $mdDialog.hide();
  }

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

$scope.cancelAccount = function (event) {
  $mdDialog.show({
    clickOutsideToClose: true,
    controller: 'deleteAccountController',
    controllerAs: 'dctrl',
    skipHide: true,
    // focusOnOpen: false,
    targetEvent: event,
    templateUrl: 'partials/deleteAccountDialog.html'
  });
};

    $scope.cancel = function() {
      $location.path('/domain');
    }


    $scope.countries = {
      "United States": "+1",
       "Afghanistan": "+93",
       "Albania": "+355",
       "Algeria": "+213",
       "American Samoa": "+684",
       "Andorra": "+376",
       "Angola": "+244",
       "Anguilla": "+264",
       "Antarctica": "+672",
       "Antigua and Barbuda": "+268",
       "Argentina": "+54",
       "Armenia": "+374",
       "Aruba": "+297",
       "Australia": "+61",
       "Austria": "+43",
       "Azerbaijan": "+994",
       "Bahamas": "+242",
       "Bahrain": "+973",
       "Bangladesh": "+880",
       "Barbados": "+246",
       "Belarus": "+375",
       "Belgium": "+32",
       "Belize": "+501",
       "Benin": "+229",
       "Bermuda": "+441",
       "Bhutan": "+975",
       "Bolivia: Plurinational State of": "+591",
       "Bonaire: Sint Eustatius and Saba": "+599",
       "Bosnia and Herzegovina": "+387",
       "Botswana": "+267",
       "Bouvet Island": "+47",
       "Brazil": "+55",
       "British Indian Ocean Territory": "+246",
       "Brunei Darussalam": "+673",
       "Bulgaria": "+359",
       "Burkina Faso": "+226",
       "Burundi": "+257",
       "Cambodia": "+855",
       "Cameroon": "+237",
       "Canada": "+1",
       "Cape Verde": "+238",
       "Cayman Islands": "+345",
       "Central African Republic": "+236",
       "Chad": "+235",
       "Chile": "+56",
       "China": "+86",
       "Christmas Island": "+61",
       "Cocos (Keeling) Islands": "+891",
       "Colombia": "+57",
       "Comoros": "+269",
       "Congo": "+242",
       "Congo: the Democratic Republic of the": "+243",
       "Cook Islands": "+682",
       "Costa Rica": "+506",
       "Croatia": "+385",
       "Cuba": "+53",
       "Curaçao": "+599",
       "Cyprus": "+357",
       "Czech Republic": "+420",
       "Côte d'Ivoire": "+225",
       "Denmark": "+45",
       "Djibouti": "+253",
       "Dominica": "+767",
       "Dominican Republic": "+809",
       "Ecuador": "+593",
       "Egypt": "+20",
       "El Salvador": "+503",
       "Equatorial Guinea": "+240",
       "Eritrea": "+291",
       "Estonia": "+372",
       "Ethiopia": "+251",
       "Falkland Islands (Malvinas)": "+500",
       "Faroe Islands": "+298",
       "Fiji": "+679",
       "Finland": "+358",
       "France": "+33",
       "French Guiana": "+594",
       "French Polynesia": "+689",
       "French Southern Territories": "+689",
       "Gabon": "+241",
       "Gambia": "+220",
       "Georgia": "+995",
       "Germany": "+49",
       "Ghana": "+233",
       "Gibraltar": "+350",
       "Greece": "+30",
       "Greenland": "+299",
       "Grenada": "+473",
       "Guadeloupe": "+590",
       "Guam": "+671",
       "Guatemala": "+502",
       "Guernsey": "+1481",
       "Guinea": "+225",
       "Guinea-Bissau": "+245",
       "Guyana": "+592",
       "Haiti": "+509",
       "Heard Island and McDonald Islands": "+61",
       "Holy See (Vatican City State)": "+379",
       "Honduras": "+504",
       "Hong Kong": "+852",
       "Hungary": "+36",
       "Iceland": "+354",
       "India": "+91",
       "Indonesia": "+62",
       "Iran: Islamic Republic of": "+98",
       "Iraq": "+964",
       "Ireland": "+353",
       "Isle of Man": "+44",
       "Israel": "+972",
       "Italy": "+39",
       "Jamaica": "+876",
       "Japan": "+81",
       "Jersey": "+44",
       "Jordan": "+962",
       "Kazakhstan": "+7",
       "Kenya": "+254",
       "Kiribati": "+686",
       "Korea: Democratic People's Republic of": "+850",
       "Korea: Republic of": "+82",
       "Kuwait": "+965",
       "Kyrgyzstan": "+996",
       "Lao People's Democratic Republic": "+856",
       "Latvia": "+371",
       "Lebanon": "+961",
       "Lesotho": "+266",
       "Liberia": "+231",
       "Libya": "+218",
       "Liechtenstein": "+423",
       "Lithuania": "+370",
       "Luxembourg": "+352",
       "Macao": "+853",
       "Macedonia: The Former Yugoslav Republic of": "+389",
       "Madagascar": "+261",
       "Malawi": "+265",
       "Malaysia": "+60",
       "Maldives": "+960",
       "Mali": "+223",
       "Malta": "+356",
       "Marshall Islands": "+692",
       "Martinique": "+596",
       "Mauritania": "+222",
       "Mauritius": "+230",
       "Mayotte": "+262",
       "Mexico": "+52",
       "Micronesia: Federated States of": "+691",
       "Moldova: Republic of": "+373",
       "Monaco": "+355",
       "Mongolia": "+976",
       "Montenegro": "+382",
       "Montserrat": "+664",
       "Morocco": "+212",
       "Mozambique": "+258",
       "Myanmar": "+95",
       "Namibia": "+264",
       "Nauru": "+674",
       "Nepal": "+977",
       "Netherlands": "+31",
       "New Caledonia": "+687",
       "New Zealand": "+64",
       "Nicaragua": "+505",
       "Niger": "+277",
       "Nigeria": "+234",
       "Niue": "+683",
       "Norfolk Island": "+672",
       "Northern Mariana Islands": "+670",
       "Norway": "+47",
       "Oman": "+968",
       "Pakistan": "+92",
       "Palau": "+680",
       "Palestinian Territory: Occupied": "+970",
       "Panama": "+507",
       "Papua New Guinea": "+675",
       "Paraguay": "+595",
       "Peru": "+51",
       "Philippines": "+63",
       "Pitcairn": "+872",
       "Poland": "+48",
       "Portugal": "+351",
       "Puerto Rico": "+787",
       "Qatar": "+974",
       "Romania": "+40",
       "Russian Federation": "+7",
       "Rwanda": "+250",
       "Réunion": "+262",
       "Saint Barthélemy": "+590",
       "Saint Helena: Ascension and Tristan da Cunha": "+290",
       "Saint Kitts and Nevis": "+869",
       "Saint Lucia": "+758",
       "Saint Martin (French part)": "+590",
       "Saint Pierre and Miquelon": "+508",
       "Saint Vincent and the Grenadines": "+784",
       "Samoa": "+685",
       "San Marino": "+378",
       "Sao Tome and Principe": "+239",
       "Saudi Arabia": "+966",
       "Senegal": "+221",
       "Serbia": "+381",
       "Seychelles": "+248",
       "Sierra Leone": "+232",
       "Singapore": "+65",
       "Sint Maarten (Dutch part)": "+599",
       "Slovakia": "+421",
       "Slovenia": "+386",
       "Solomon Islands": "+677",
       "Somalia": "+252",
       "South Africa": "+27",
       "South Georgia and the South Sandwich Islands": "+500",
       "South Sudan": "+211",
       "Spain": "+34",
       "Sri Lanka": "+94",
       "Sudan": "+249",
       "Suriname": "+597",
       "Svalbard and Jan Mayen": "+47",
       "Swaziland": "+268",
       "Sweden": "+46",
       "Switzerland": "+41",
       "Syrian Arab Republic": "+963",
       "Taiwan: Province of China": "+886",
       "Tajikistan": "+992",
       "Tanzania: United Republic of": "+255",
       "Thailand": "+66",
       "Timor-Leste": "+670",
       "Togo": "+228",
       "Tokelau": "+690",
       "Tonga": "+676",
       "Trinidad and Tobago": "+868",
       "Tunisia": "+216",
       "Turkey": "+90",
       "Turkmenistan": "+993",
       "Turks and Caicos Islands": "+649",
       "Tuvalu": "+688",
       "Uganda": "+256",
       "Ukraine": "+380",
       "United Arab Emirates": "+971",
       "United Kingdom": "+44",
       "United States": "+1",
       "United States Minor Outlying Islands": "+1",
       "Uruguay": "+598",
       "Uzbekistan": "+998",
       "Vanuatu": "+678",
       "Venezuela: Bolivarian Republic of": "+58",
       "Viet Nam": "+84",
       "Virgin Islands: British": "+284",
       "Virgin Islands: U.S.": "+340",
       "Wallis and Futuna": "+681",
       "Western Sahara": "+212",
       "Yemen": "+967",
       "Zambia": "+260",
       "Zimbabwe": "+263",
       "Åland Islands": "+358",
};


}]);

(function() {
/* global StripeCheckout */
'use strict';

var MODULE_NAME = 'stripe.checkout';
var STRIPE_CHECKOUT_URL = 'https://checkout.stripe.com/checkout.js';

var OPTIONS = {
  address:         ['data-address', 'boolean'],
  alipay:          ['data-alipay', 'boolean-or-auto'],
  alipayReusable:  ['data-alipay-reusable', 'boolean'],
  allowRememberMe: ['data-allow-remember-me', 'boolean'],
  amount:          ['data-amount', 'number'],
  billingAddress:  ['data-billing-address', 'boolean'],
  bitcoin:         ['data-bitcoin', 'boolean'],
  currency:        ['data-currency', 'string'],
  description:     ['data-description', 'string'],
  email:           ['data-email', 'string'],
  image:           ['data-image', 'string'],
  key:             ['data-key', 'string'],
  label:           ['data-label', 'string'],
  locale:          ['data-locale', 'string'],
  name:            ['data-name', 'string'],
  color:           ['data-color', 'string'],
  panelLabel:      ['data-panel-label', 'string'],
  shippingAddress: ['data-shipping-address', 'boolean'],
  zipCode:         ['data-zip-code', 'boolean']
};


var angular;

if (typeof module !== 'undefined' && typeof module.exports === 'object') {
  angular = require('angular');
  module.exports = MODULE_NAME;
} else {
  angular = window.angular;
}

var extend = angular.extend;

angular.module(MODULE_NAME,[])
  .directive('stripeCheckout',StripeCheckoutDirective)
  .provider('StripeCheckout',StripeCheckoutProvider);


StripeCheckoutDirective.$inject = ['$parse', 'StripeCheckout'];

function StripeCheckoutDirective($parse, StripeCheckout) {
  return { link: link };

  function link(scope, el, attrs) {
    var handler;

    StripeCheckout.load()
      .then(function() {
        handler = StripeCheckout.configure(getOptions(el));
      });

    el.on('click',function() {
      if (handler)
        handler.open(getOptions(el)).then(function(result) {
          var callback = $parse(attrs.stripeCheckout)(scope);
          if (typeof callback === 'function')
            callback.apply(null,result);
        });
    });
  }
}


function StripeCheckoutProvider() {
  var defaults = {};

  this.defaults = function(options) {
    extend(defaults,options);
  };


  this.load = function(StripeCheckout) {
    return StripeCheckout.load();
  };

  this.load.$inject = ['StripeCheckout'];


  this.$get = function($document, $q) {
    return new StripeCheckoutService($document,$q,defaults);
  };

  this.$get.$inject = ['$document', '$q'];
}


function StripeCheckoutService($document, $q, providerDefaults) {
  var defaults = {};
  var promise;

  this.configure = function(options) {
    return new StripeHandlerWrapper($q,extend({},
      providerDefaults,
      defaults,
      options
    ));
  };

  this.load = function() {
    if (!promise)
      promise = loadLibrary($document,$q);

    return promise;
  };

  this.defaults = function(options) {
    extend(defaults,options);
  };
}


function StripeHandlerWrapper($q, options) {
  var deferred, success;

  var handler = StripeCheckout.configure(extend({},options,{
    token: function(token, args) {
      if (options.token) options.token(token,args);

      success = true;
      deferred.resolve([token, args]);
    },

    closed: function() {
      if (options.closed) options.closed();
      if (!success) deferred.reject();
    }
  }));

  this.open = function(openOptions) {
    deferred = $q.defer();
    success = false;

    handler.open(openOptions);

    return deferred.promise;
  };

  this.close = function() {
    success = false;

    handler.close();

    if (options.closed) options.closed();
    if (deferred) deferred.reject();
  };
}


function getOptions(el) {
  var opt, def, val, options = {};

  for (opt in OPTIONS) {
    if (!OPTIONS.hasOwnProperty(opt))
      continue;

    def = OPTIONS[opt];
    val = parseValue(el.attr(def[0]),def[1]);

    if (val != null)
      options[opt] = val;
  }

  return options;
}

function loadLibrary($document, $q) {
  var deferred = $q.defer();

  var doc = $document[0];
  var script = doc.createElement('script');
  script.src = STRIPE_CHECKOUT_URL;

  script.onload = function () {
    deferred.resolve();
  };

  script.onreadystatechange = function () {
    var rs = this.readyState;
    if (rs === 'loaded' || rs === 'complete')
      deferred.resolve();
  };

  script.onerror = function () {
    deferred.reject(new Error('Unable to load checkout.js'));
  };

  var container = doc.getElementsByTagName('head')[0];
  container.appendChild(script);

  return deferred.promise;
}

function parseValue(value, type) {
  if (type === 'boolean') {
    return value && value !== 'false';
  } else if (type === 'number') {
    return value && Number(value);
  } else if (type === 'boolean-or-auto') {
    if (value === 'auto')
      return value;
    else
      return parseValue(value,'boolean');
  } else {
    return value;
  }
}

})();

angular.module('SE_App').factory('$domains', ['$resource', function ($resource) {
  'use strict';

  return {
    domains_tables: $resource('/service/domains')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addDomainController', ['$mdDialog', '$domains', '$scope' , '$http', '$q','$mdToast',function ($mdDialog, $domains, $scope, $http, $q,$mdToast) {
  'use strict';
$scope.myDate = new Date();

$scope.getHostsFunc = function(){
	$http.get('service/gethosts')
.then(function(response){
	$scope.getHosts = response.data;
	});
};

$scope.getRegistrarsFunc = function(){
	$http.get('service/getregistrars')
		.then(function(response){

	$scope.getRegistrars = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(domains_table) {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'New Content Added';
           }
         }
      });
    $mdDialog.hide(domains_table);
  }

    function fedup(response){
      $mdToast.show({
        hideDelay   : 9000,
        position    : 'top center',
        controller  : 'ToastCtrl',
        templateUrl : '/partials/toast-template.html',
        toastClass  : 'toastDanger',
        resolve: {
             $response: function () {
               return response.data;
             }
           }
        });
  }

  this.addItem = function () {
    $scope.item.form.$setSubmitted();

    var data = angular.copy($scope.domains_table);
    data.date_purchased = data.date_purchased.getFullYear()+"-"+
                          ("0"+(data.date_purchased.getMonth()+1)).slice(-2)+"-"+
                          ("0"+data.date_purchased.getDate()).slice(-2);

    data.expiration_date = data.expiration_date.getFullYear()+"-"+
                          ("0"+(data.expiration_date.getMonth()+1)).slice(-2)+"-"+
                          ("0"+data.expiration_date.getDate()).slice(-2);

    if($scope.item.form.$valid) {
      $domains.domains_tables.save({domains_table: data}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteDomainController', ['$authorize', 'domains_tables', '$mdDialog', '$domains', '$scope', '$q', '$mdToast',function ($authorize, domains_tables, $mdDialog, $domains, $scope, $q,$mdToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(domains_table, index) {
    var deferred = $domains.domains_tables.remove({id: domains_table.domain_ID}, success, error);

    deferred.$promise.then(function () {
      domains_tables.splice(index, 1);
    });

    return deferred.$promise;
  }

  function onComplete() {
    $mdDialog.hide();
  }

function success() {
  $mdToast.show({
    hideDelay   : 4000,
    position    : 'top center',
    controller  : 'ToastCtrl',
    templateUrl : '/partials/toast-template.html',
    toastClass  : 'toastSuccess',
    resolve: {
         $response: function () {
           return 'Successfully Deleted';
         }
       }
    });
  }

function error(response) {
  $mdToast.show({
    hideDelay   : 9000,
    position    : 'top center',
    controller  : 'ToastCtrl',
    templateUrl : '/partials/toast-template.html',
    toastClass  : 'toastDanger',
    resolve: {
         $response: function () {
           return response.data;
         }
       }
    });
  }
  this.authorizeUser = function () {
    $q.all(domains_tables.forEach(deleteDessert)).then(onComplete);
  };

}]);


angular.module('SE_App').controller('domainController', ['$mdDialog','$domains', '$scope', '$mdEditDialog', '$http','$mdToast',
'$q','changeCellServices','upDownloadService',
function ($mdDialog, $domains, $scope, $mdEditDialog, $http,$mdToast,$q,changeCellServices,upDownloadService) {
  'use strict';

  var bookmark;

  $scope.$file = 'domains.csv';
  $scope.$header = ['domain_name','ip_address','nameserver_1','ns1_IP','nameserver_2','ns2_IP','nameserver_3','ns3_IP','date_purchased','expiration_date','registrar_ID','hosting_ID','registrar_301','registrar_301_target','whois_protected','domain_ID','registrar_name','hosting_name'];
    $scope.$location = '/service/domains';

    $scope.$on('locationUpdate', function (event, data) {
	  if(data.location == 'domains'){
	  	$scope.getDesserts();
	  }
  });

  $scope.selected = [];

  $scope.filter = {
    options: {
      debounce: 500
    }
  };

  $scope.query = {
    filter: '',
    limit: '15',
    order: 'domain_name',
    page: 1,
  };

  $scope.dbTableInfo = {
    db_table:'domains',
    db_ID:'domain_ID',
    //table:hosting_table,
  };

  function success(domains_tables) {
    angular.forEach(domains_tables.data,function(row){
      // row.d
      var date_purchased_parts = row.date_purchased.split("-");
      row.date_purchased = new Date(parseInt(date_purchased_parts[0]),
                                    parseInt(date_purchased_parts[1])-1,
                                    parseInt(date_purchased_parts[2]));
      var expiration_date_parts = row.expiration_date.split("-");
      row.expiration_date = new Date(parseInt(expiration_date_parts[0]),
                                    parseInt(expiration_date_parts[1])-1,
                                    parseInt(expiration_date_parts[2]));
    });
    $scope.domains_tables = domains_tables;
  }

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addDomainController',
      controllerAs: 'ctrl',
	  skipHide: true,
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/domains/addDomainDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteDomainController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { domains_tables: $scope.selected },
      templateUrl: 'inc/delete.html',
    }).then($scope.getDesserts);
  };

  $scope.getDesserts = function () {
    $scope.promise = $domains.domains_tables.get($scope.query, success).$promise;
  };

  $scope.removeFilter = function () {
    $scope.filter.show = false;
    $scope.query.filter = '';
    if($scope.filter.form.$dirty) {
      $scope.filter.form.$setPristine();
    }
  };

  $scope.$watch('query.filter', function (newValue, oldValue) {
    if(!oldValue) {
      bookmark = $scope.query.page;
    }
    if(newValue !== oldValue) {
      $scope.query.page = 1;
    }
    if(!newValue) {
      $scope.query.page = bookmark;
    }
    $scope.getDesserts();
  });

$scope.changeCellText = changeCellServices.changeCellText;

$scope.changeDate = changeCellServices.changeDate;

$scope.changeDropdown = changeCellServices.changeDropdown;

$scope.changeSwitchValue = changeCellServices.changeSwitchValue;
  $scope.bulkDownload = upDownloadService.bulkDownload;

//Below is changing the selection and Date Pickers

$scope.date_purchased = function(domains_table){
	var dateFromDataBase = domains_table.date_purchased;
	dateFromDataBase = new Date(dateFromDataBase);
	return dateFromDataBase;
	};

$scope.expiration_date = function(domains_table){
	var dateFromDataBase = domains_table.expiration_date;
	dateFromDataBase = new Date(dateFromDataBase);
	return dateFromDataBase;
	};

$scope.getHostsFunc = function(){
	$http.get('service/gethosts')
.then(function(response){
	$scope.getHosts = response.data;
	});
};

$scope.getRegistrarsFunc = function(){
	$http.get('service/getregistrars')
		.then(function(response){
	$scope.getRegistrars = response.data;
	});
};

}]);

angular.module('SE_App').factory('$hosting', ['$resource', function ($resource) {
  'use strict';

  return {
    hosting_tables: $resource('/service/hosting')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addHostingController', ['$mdDialog', '$hosting', '$scope' , '$http', '$mdToast',function ($mdDialog, $hosting, $scope, $http, $mdToast) {
  'use strict';
$scope.myDate = new Date();

  this.cancel = $mdDialog.cancel;

  function success(hosting_table) {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'New Content Added';
           }
         }
      });
    $mdDialog.hide(hosting_table);
  }

    function fedup(response){
  	//console.log('FAILED!',data);
    $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastDanger',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
  }


this.addItem = function () {
    $scope.item.form.$setSubmitted();

    var data = angular.copy($scope.hosting_table);
    data.date_started = data.date_started.getFullYear()+"-"+
                          ("0"+(data.date_started.getMonth()+1)).slice(-2)+"-"+
                          ("0"+data.date_started.getDate()).slice(-2);

    data.expiration_date = data.expiration_date.getFullYear()+"-"+
                          ("0"+(data.expiration_date.getMonth()+1)).slice(-2)+"-"+
                          ("0"+data.expiration_date.getDate()).slice(-2);

    if($scope.item.form.$valid) {
      $hosting.hosting_tables.save({hosting_table: data}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteHostingController', ['$authorize', 'hosting_tables', '$mdDialog', '$hosting', '$scope', '$q', '$mdToast',function ($authorize, hosting_tables, $mdDialog, $hosting, $scope, $q, $mdToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(hosting_table, index) {
    var deferred = $hosting.hosting_tables.remove({id: hosting_table.hosting_ID}, success, error);

    deferred.$promise.then(function () {
      hosting_tables.splice(index, 1);
    });

    return deferred.$promise;
  }

  function onComplete() {
    $mdDialog.hide();
  }

  function success() {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'Successfully Deleted';
           }
         }
      });
    }

  function error(response) {
    $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastDanger',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
    }
    this.authorizeUser = function () {
      $q.all(hosting_tables.forEach(deleteDessert)).then(onComplete);
    };

  }]);

angular.module('SE_App').controller('hostingController', ['$mdDialog','$hosting', '$scope', '$mdEditDialog', '$http','$q','changeCellServices','upDownloadService',function ($mdDialog, $hosting, $scope, $mdEditDialog, $http,$q,changeCellServices,upDownloadService) {
  'use strict';

  var bookmark;
  $scope.$file = 'hosting.csv';
  $scope.$header = ['hosting_name','login_url','username','password','date_started','expiration_date','creditcard_last_4','setup_domain','hosting_ID'];
  $scope.$location = '/service/hosting';

    $scope.$on('locationUpdate', function (event, data) {
	  if(data.location == 'hosting'){
	  	$scope.getDesserts();
	  }
  });


  $scope.selected = [];

  $scope.filter = {
    options: {
      debounce: 500
    }
  };

  $scope.query = {
    filter: '',
    limit: '15',
    order: 'hosting_name',
    page: 1,
  };

  $scope.dbTableInfo = {
    db_table:'hosting',
    db_ID:'hosting_ID',
    //table:hosting_table,
  };

  function success(hosting_tables) {
    angular.forEach(hosting_tables.data,function(row){
      // row.d
      var date_started_parts = row.date_started.split("-");
      row.date_started = new Date(parseInt(date_started_parts[0]),
                                    parseInt(date_started_parts[1])-1,
                                    parseInt(date_started_parts[2]));
      var expiration_date_parts = row.expiration_date.split("-");
      row.expiration_date = new Date(parseInt(expiration_date_parts[0]),
                                    parseInt(expiration_date_parts[1])-1,
                                    parseInt(expiration_date_parts[2]));
    });
    $scope.hosting_tables = hosting_tables;
  }

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addHostingController',
      controllerAs: 'ctrl',
	  skipHide: true,
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/hosting/addHostingDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteHostingController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { hosting_tables: $scope.selected },
      templateUrl: 'inc/delete.html',
    }).then($scope.getDesserts);
  };

  $scope.getDesserts = function () {
    $scope.promise = $hosting.hosting_tables.get($scope.query, success).$promise;
  };

  $scope.removeFilter = function () {
    $scope.filter.show = false;
    $scope.query.filter = '';

    if($scope.filter.form.$dirty) {
      $scope.filter.form.$setPristine();
    }
  };

  $scope.$watch('query.filter', function (newValue, oldValue) {
    if(!oldValue) {
      bookmark = $scope.query.page;
    }

    if(newValue !== oldValue) {
      $scope.query.page = 1;
    }

    if(!newValue) {
      $scope.query.page = bookmark;
    }

    $scope.getDesserts();
  });

  $scope.changeCellText = changeCellServices.changeCellText;

  $scope.changeDate = changeCellServices.changeDate;

  $scope.changeDropdown = changeCellServices.changeDropdown;

  $scope.changeSwitchValue = changeCellServices.changeSwitchValue;
    $scope.bulkDownload = upDownloadService.bulkDownload;


//Below is changing the selection and Date Pickers

$scope.date_started = function(hosting_table){
	var dateFromDataBase = hosting_table.date_started;
	dateFromDataBase = new Date(dateFromDataBase);
	return dateFromDataBase;
	};

$scope.expiration_date = function(hosting_table){
	var dateFromDataBase = hosting_table.expiration_date;
	dateFromDataBase = new Date(dateFromDataBase);
	return dateFromDataBase;
	};


}]);

angular.module('SE_App').factory('$registrar', ['$resource', function ($resource) {
  'use strict';

  return {
    registrar_tables: $resource('/service/registrar')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addRegistrarController', ['$mdDialog', '$registrar', '$scope' , '$http', '$mdToast',function ($mdDialog, $registrar, $scope, $http, $mdToast) {
  'use strict';
$scope.myDate = new Date();

$scope.getOwnersFunc = function(){
	$http.get('service/getowners')
		.then(function(response){
	$scope.getOwners = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(registrar_table) {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'New Content Added';
           }
         }
      });
    $mdDialog.hide(registrar_table);
  }

  function fedup(response){
    $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastDanger',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
  }

  this.addItem = function () {
    $scope.item.form.$setSubmitted();

    if($scope.item.form.$valid) {
      $registrar.registrar_tables.save({registrar_table: $scope.registrar_table}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteRegistrarController', ['$authorize', 'registrar_tables', '$mdDialog', '$registrar', '$scope', '$q', '$mdToast',function ($authorize, registrar_tables, $mdDialog, $registrar, $scope, $q,$mdToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(registrar_table, index) {
    var deferred = $registrar.registrar_tables.remove({id: registrar_table.registrar_ID}, success, error);


    deferred.$promise.then(function () {
      registrar_tables.splice(index, 1);
    });

    return deferred.$promise;
  }

  function onComplete() {
    $mdDialog.hide();
  }

  function success() {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'Successfully Deleted';
           }
         }
      });
    }

  function error(response) {
    $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastDanger',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
    }
    this.authorizeUser = function () {
      $q.all(registrar_tables.forEach(deleteDessert)).then(onComplete);
    };

  }]);




angular.module('SE_App').controller('registrarController', ['$mdDialog','$registrar', '$scope', '$mdEditDialog', '$http','$q','changeCellServices','upDownloadService',function ($mdDialog, $registrar, $scope, $mdEditDialog, $http,$q,changeCellServices,upDownloadService) {
  'use strict';

  var bookmark;
  $scope.$firstSpan = '<span class="firstSpan">';
  $scope.$secondSpan = '<span class="secondSpan">';
  $scope.$file = 'registrar.csv';
  $scope.$header = ['registrar_name','login_url','login_username','login_password','credit_card_last_4','registrar_ID','user_name','user_email'];
  $scope.$location = '/service/registrar';

  $scope.selected = [];

  $scope.filter = {
    options: {
      debounce: 500
    }
  };

  $scope.query = {
    filter: '',
    limit: '15',
    order: 'registrar_name',
    page: 1,
  };

  $scope.dbTableInfo = {
    db_table:'registrar',
    db_ID:'registrar_ID',
    //table:hosting_table,
  };

  function success(registrar_tables) {
    $scope.registrar_tables = registrar_tables;
  }

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addRegistrarController',
      controllerAs: 'ctrl',
	  skipHide: true,
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/registrar/addRegistrarDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteRegistrarController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { registrar_tables: $scope.selected },
      templateUrl: 'inc/delete.html',
    }).then($scope.getDesserts);
  };

  $scope.$on('locationUpdate', function (event, data) {
	  if(data.location == 'registrars'){
	  	$scope.getDesserts();
	  }
  });

  $scope.getDesserts = function () {
    $scope.promise = $registrar.registrar_tables.get($scope.query, success).$promise;
  };

  $scope.removeFilter = function () {
    $scope.filter.show = false;
    $scope.query.filter = '';

    if($scope.filter.form.$dirty) {
      $scope.filter.form.$setPristine();
    }
  };

  $scope.$watch('query.filter', function (newValue, oldValue) {
    if(!oldValue) {
      bookmark = $scope.query.page;
    }

    if(newValue !== oldValue) {
      $scope.query.page = 1;
    }

    if(!newValue) {
      $scope.query.page = bookmark;
    }

    $scope.getDesserts();
  });

  $scope.changeCellText = changeCellServices.changeCellText;

  $scope.changeDropdown = changeCellServices.changeDropdown;
    $scope.bulkDownload = upDownloadService.bulkDownload;

//Below is changing the selection and Date Pickers

$scope.getOwnersFunc = function(){
	$http.get('service/getowners')
		.then(function(response){
	$scope.getOwners = response.data;
	});
};

}]);

angular.module('SE_App').factory('$W2_accounts', ['$resource', function ($resource) {
  'use strict';

  return {
    W2_accounts_tables: $resource('/service/W2_accounts')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addW2_AccountsController', ['$mdDialog', '$W2_accounts', '$scope' , '$http','$mdToast',function ($mdDialog, $W2_accounts, $scope, $http,$mdToast) {
  'use strict';
$scope.myDate = new Date();

$scope.getOwnersFunc = function(){
	$http.get('service/getowners')
		.then(function(response){
	$scope.getOwners = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(W2_accounts_table) {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'New Content Added';
           }
         }
      });
    $mdDialog.hide(W2_accounts_table);
  }

    function fedup(response){
      $mdToast.show({
      hideDelay   : 9000,
      position    : 'top left',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      resolve: {
           $response: function () {
             return response;
           }
         }
      });
  }

  this.addItem = function () {
    $scope.item.form.$setSubmitted();

    if($scope.item.form.$valid) {
      $W2_accounts.W2_accounts_tables.save({W2_accounts_table: $scope.W2_accounts_table}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteW2_AccountsController', ['W2_accounts_tables', '$mdDialog', '$W2_accounts', '$scope', '$q', '$mdToast',function (W2_accounts_tables, $mdDialog, $W2_accounts, $scope, $q,$mdToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(W2_accounts_table, index) {
    var deferred = $W2_accounts.W2_accounts_tables.remove({id: W2_accounts_table.W2_ID}, success, error);

    deferred.$promise.then(function () {
      W2_accounts_tables.splice(index, 1);
    });

    return deferred.$promise;
  }

  function onComplete() {
    $mdDialog.hide();
  }

  function success() {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'Successfully Deleted';
           }
         }
      });
    }

  function error(response) {
    $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastDanger',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
    }
    this.authorizeUser = function () {
      $q.all(W2_accounts_tables.forEach(deleteDessert)).then(onComplete);
    };

  }]);

angular.module('SE_App').controller('W2_accountsController', ['$mdDialog','$W2_accounts', '$scope', '$mdEditDialog', '$http','$q','changeCellServices','upDownloadService',function ($mdDialog, $W2_accounts, $scope, $mdEditDialog, $http,$q,changeCellServices,upDownloadService) {
  'use strict';

  var bookmark;
  $scope.$firstSpan = '<span class="firstSpan">';
  $scope.$secondSpan = '<span class="secondSpan">';
  $scope.$file = 'W2_accounts.csv';
  $scope.$header = ['login_url_name','login','password','account_url','attached_domain','W2_ID','user_name','user_email'];
  $scope.$location = '/service/W2_accounts';

    $scope.$on('locationUpdate', function (event, data) {
	  if(data.location == 'W2_accounts'){
	  	$scope.getDesserts();
	  }
  });


  $scope.selected = [];

  $scope.filter = {
    options: {
      debounce: 500
    }
  };

  $scope.query = {
    filter: '',
    limit: '15',
    order: 'login_url_name',
    page: 1,
  };

  $scope.dbTableInfo = {
    db_table:'W2_accounts',
    db_ID:'W2_ID',
    //table:hosting_table,
  };

  function success(W2_accounts_tables) {
    $scope.W2_accounts_tables = W2_accounts_tables;
  }

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addW2_AccountsController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/w2Accounts/addW2_AccountsDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteW2_AccountsController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { W2_accounts_tables: $scope.selected },
      templateUrl: 'inc/delete.html',
    }).then($scope.getDesserts);
  };

  $scope.getDesserts = function () {
    $scope.promise = $W2_accounts.W2_accounts_tables.get($scope.query, success).$promise;
  };

  $scope.removeFilter = function () {
    $scope.filter.show = false;
    $scope.query.filter = '';

    if($scope.filter.form.$dirty) {
      $scope.filter.form.$setPristine();
    }
  };

  $scope.$watch('query.filter', function (newValue, oldValue) {
    if(!oldValue) {
      bookmark = $scope.query.page;
    }

    if(newValue !== oldValue) {
      $scope.query.page = 1;
    }

    if(!newValue) {
      $scope.query.page = bookmark;
    }

    $scope.getDesserts();
  });

  $scope.changeCellText = changeCellServices.changeCellText;

  $scope.changeDropdown = changeCellServices.changeDropdown;
    $scope.bulkDownload = upDownloadService.bulkDownload;

//Below is changing the selection and Date Pickers

$scope.getOwnersFunc = function(){
	$http.get('service/getowners')
		.then(function(response){
	$scope.getOwners = response.data;
	});
};



}]);

angular.module('SE_App').factory('$person', ['$resource', function ($resource) {
  'use strict';

  return {
    person_tables: $resource('/service/person')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addPersonController', ['$mdDialog', '$person', '$scope' , '$http', '$mdToast',function ($mdDialog, $person, $scope, $http,$mdToast) {
  'use strict';
$scope.myDate = new Date();

$scope.getPersonsFunc = function(){
	$http.get('service/getpersons')
		.then(function(response){
	$scope.getPersons = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(person_table) {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'New Content Added';
           }
         }
      });
    $mdDialog.hide(person_table);
  }

    function fedup(response){
      $mdToast.show({
        hideDelay   : 9000,
        position    : 'top center',
        controller  : 'ToastCtrl',
        templateUrl : '/partials/toast-template.html',
        toastClass  : 'toastDanger',
        resolve: {
             $response: function () {
               return response.data;
             }
           }
        });
  }

  this.addItem = function () {
    $scope.item.form.$setSubmitted();

    if($scope.item.form.$valid) {
      $person.person_tables.save({person_table: $scope.person_table}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deletePersonController', ['$authorize', 'person_tables', '$mdDialog', '$person', '$scope', '$q', '$mdToast',function ($authorize, person_tables, $mdDialog, $person, $scope, $q,$mdToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(person_table, index) {
    var deferred = $person.person_tables.remove({id: person_table.user_ID}, success, error);


    deferred.$promise.then(function () {
      person_tables.splice(index, 1);
    });

    return deferred.$promise;
  }

  function onComplete() {
    $mdDialog.hide();
  }

  function success() {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'Successfully Deleted';
           }
         }
      });
    }

  function error(response) {
    $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastDanger',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
    }
    this.authorizeUser = function () {
      $q.all(person_tables.forEach(deleteDessert)).then(onComplete);
    };

  }]);

// =======================================================

angular.module('SE_App').controller('getPwrdController', ['$mdDialog', '$person', '$scope','changeCellServices','$object','$http','$q','$mdToast', function ($mdDialog, $person, $scope,changeCellServices,$object,$http,$q,$mdToast) {
  'use strict';
$scope.$email = $object.email;
console.log($object.value);

this.cancel = function (){
  $mdDialog.hide();
}

$scope.isHidden = $object.value;

  this.submitPwrd = function () {
    $scope.pwrd.form.$setSubmitted();
    $object.pwrd = $scope.pwrd.user_password;

    changeDropdown();

  };

  function changeDropdown(){
                  var success  = function(response){
                    $mdToast.show({
                      hideDelay   : 4000,
                      position    : 'top center',
                      controller  : 'ToastCtrl',
                      templateUrl : '/partials/toast-template.html',
                      toastClass  : 'toastSuccess',
                      resolve: {
                           $response: function () {
                             return response.data;
                           }
                         }
                      });
                        $mdDialog.hide();
                    };

                    var failure  = function(response){
                      $mdToast.show({
                        hideDelay   : 9000,
                        position    : 'top center',
                        controller  : 'ToastCtrl',
                        templateUrl : '/partials/toast-template.html',
                        toastClass  : 'toastDanger',
                        resolve: {
                             $response: function () {
                               return response.data;
                             }
                           }
                        });
                    };

                  var deferred = $q.defer();

                $http.post('service/updateItem',$object).then(function(response){
                  success(response);
                  deferred.resolve();
                },function(response){
                  failure(response);
                  deferred.reject();
                });
                return deferred.promise;
                };

}]);

angular.module('SE_App').controller('personController', ['$mdDialog','$person', '$scope', '$mdEditDialog', '$http','$q','changeCellServices','upDownloadService','$mdToast',function ($mdDialog, $person, $scope, $mdEditDialog, $http,$q,changeCellServices,upDownloadService,$mdToast) {
  'use strict';

  var bookmark;
  $scope.$file = 'person.csv';
  $scope.$header = ['user_name','user_email','user_address','user_phone','user_type','user_ID'];

  $scope.$location = '/service/person';

    $scope.$on('locationUpdate', function (event, data) {
	  if(data.location == 'person'){
	  	$scope.getDesserts();
	  }
  });

  $scope.selected = [];

  $scope.filter = {
    options: {
      debounce: 500
    }
  };

  $scope.query = {
    filter: '',
    limit: '15',
    order: 'user_name',
    page: 1,
  };

  $scope.dbTableInfo = {
    db_table:'registration',
    db_ID:'user_ID',
    //table:hosting_table,
  };

  function success(person_tables) {
    $scope.person_tables = person_tables;
  }

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addPersonController',
      controllerAs: 'ctrl',
	  skipHide: true,
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/person/addPersonDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deletePersonController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { person_tables: $scope.selected },
      templateUrl: 'inc/delete.html',
    }).then($scope.getDesserts);
  };

  $scope.addPwrd = function (event,$table,column,$value,db_table,db_ID,$email) {
    var $obj = {};
    $obj.email = $email;
    $obj.table = db_table;
    $obj.column = column;
    $obj.value = $table[$value];
    $obj.identifier = db_ID;
    $obj.id = $table[db_ID];
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'getPwrdController',
      controllerAs: 'ctrl',
      skipHide: true,
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: '/partials/pwrd.html',
      resolve:{
        $object: function(){
          return $obj;
        }
      }
    }).then($scope.getDesserts)
    ;
  };

  $scope.getDesserts = function () {
    $scope.promise = $person.person_tables.get($scope.query, success).$promise;
  };

  $scope.removeFilter = function () {
    $scope.filter.show = false;
    $scope.query.filter = '';

    if($scope.filter.form.$dirty) {
      $scope.filter.form.$setPristine();
    }
  };

  $scope.$watch('query.filter', function (newValue, oldValue) {
    if(!oldValue) {
      bookmark = $scope.query.page;
    }

    if(newValue !== oldValue) {
      $scope.query.page = 1;
    }

    if(!newValue) {
      $scope.query.page = bookmark;
    }

    $scope.getDesserts();
  });


  $scope.changeCellText = changeCellServices.changeCellText;
    $scope.bulkDownload = upDownloadService.bulkDownload;

    $scope.getUserType = function(){
    	$http.get('service/getusertype')
    		.then(function(response){
    	$scope.getUserT = response.data;
    });
    };

}]);

angular.module('SE_App').factory('$cms_login', ['$resource', function ($resource) {
  'use strict';

  return {
    cms_login_tables: $resource('/service/cms_login')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addCMSController', ['$mdDialog', '$cms_login', '$scope' , '$http', '$q', '$mdToast',function ($mdDialog, $cms_login, $scope, $http, $q, $mdToast) {
  'use strict';


$scope.myDate = new Date();

$scope.getDomainsFunc = function(){
	$http.get('service/getdomains')
.then(function(response){
	$scope.getDomains = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(cms_login_table) {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'New Content Added';
           }
         }
      });
    $mdDialog.hide(cms_login_table);
  }


    function fedup(response){
  	//console.log('FAILED!',data);
    $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastDanger',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
  }

  this.addItem = function () {
    $scope.item.form.$setSubmitted();
    if($scope.item.form.$valid) {

      $cms_login.cms_login_tables.save({cms_login_table: $scope.cms_login_table}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteCMSController', ['$authorize', 'cms_login_tables', '$mdDialog', '$cms_login', '$scope', '$q', '$mdToast',function ($authorize, cms_login_tables, $mdDialog, $cms_login, $scope, $q, $mdToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(cms_login_table, index) {
    var deferred = $cms_login.cms_login_tables.remove({id: cms_login_table.install_site_url_ID}, success, error);


    deferred.$promise.then(function () {
      cms_login_tables.splice(index, 1);
    });

    return deferred.$promise;
  }

  function onComplete() {
    $mdDialog.hide();
  }

  function success() {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'Successfully Deleted';
           }
         }
      });
    }

  function error(response) {
    $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastDanger',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
    }
    this.authorizeUser = function () {
      $q.all(cms_login_tables.forEach(deleteDessert)).then(onComplete);
    };

  }]);

angular.module('SE_App').controller('cms_loginController', ['$mdDialog','$cms_login', '$scope', '$mdEditDialog', '$http','$q','changeCellServices','upDownloadService',function ($mdDialog, $cms_login, $scope, $mdEditDialog, $http,$q,changeCellServices,upDownloadService) {
  'use strict';

  var bookmark;
      $scope.$on('locationUpdate', function (event, data) {
	  if(data.location == 'cms_login'){
	  	$scope.getDesserts();
	  }
  });

  $scope.$file = 'cms_login.csv';
  $scope.$header = ['install_site_url_name','login_url','username','password','recovery_email','cpanel_url','cpanel_username','cpanel_password','domain_ID','install_site_url_ID','domain_name'];
  $scope.$location = '/service/cms_login';

  $scope.selected = [];

  $scope.filter = {
    options: {
      debounce: 500
    }
  };

  $scope.query = {
    filter: '',
    limit: '15',
    order: 'install_site_url_name',
    page: 1,
  };

  $scope.dbTableInfo = {
    db_table:'cms_login',
    db_ID:'install_site_url_ID',
    //table:hosting_table,
  };

  function success(cms_login_tables) {
    $scope.cms_login_tables = cms_login_tables;
  }

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addCMSController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/cmsLogin/addCms_loginDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteCMSController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { cms_login_tables: $scope.selected },
      templateUrl: 'inc/delete.html',
    }).then($scope.getDesserts);
  };

  $scope.getDesserts = function () {
    $scope.promise = $cms_login.cms_login_tables.get($scope.query, success).$promise;
  };

  $scope.removeFilter = function () {
    $scope.filter.show = false;
    $scope.query.filter = '';

    if($scope.filter.form.$dirty) {
      $scope.filter.form.$setPristine();
    }
  };

  $scope.$watch('query.filter', function (newValue, oldValue) {
    if(!oldValue) {
      bookmark = $scope.query.page;
    }

    if(newValue !== oldValue) {
      $scope.query.page = 1;
    }

    if(!newValue) {
      $scope.query.page = bookmark;
    }

    $scope.getDesserts();
  });

  $scope.changeCellText = changeCellServices.changeCellText;
  $scope.changeDropdown = changeCellServices.changeDropdown;
  $scope.bulkDownload = upDownloadService.bulkDownload;

$scope.getDomainsFunc = function(){
	$http.get('service/getdomains')
.then(function(response){
	$scope.getDomains = response.data;
	});
};

}]);

angular.module('SE_App').factory('$resource_login', ['$resource', function ($resource) {
  'use strict';

  return {
    resource_login_tables: $resource('/service/resource_login')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addResource_loginController', ['$mdDialog', '$resource_login', '$scope' , '$http', '$mdToast',function ($mdDialog, $resource_login, $scope, $http,$mdToast) {
  'use strict';
$scope.myDate = new Date();

$scope.getOwnersFunc = function(){
	$http.get('service/getowners')
		.then(function(response){
	$scope.getOwners = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(resource_login_table) {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'New Content Added';
           }
         }
      });
    $mdDialog.hide(resource_login_table);
  }

    function fedup(response){
  	//console.log('FAILED!',data);
    $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastDanger',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
  }

  this.addItem = function () {
    $scope.item.form.$setSubmitted();

    if($scope.item.form.$valid) {
      $resource_login.resource_login_tables.save({resource_login_table: $scope.resource_login_table}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteResource_loginController', ['$authorize', 'resource_login_tables', '$mdDialog', '$resource_login', '$scope', '$q', '$mdToast',function ($authorize, resource_login_tables, $mdDialog, $resource_login, $scope, $q,$mdToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(resource_login_table, index) {
    var deferred = $resource_login.resource_login_tables.remove({id: resource_login_table.resource_url_ID}, success, error);


    deferred.$promise.then(function () {
      resource_login_tables.splice(index, 1);
    });

    return deferred.$promise;
  }

  function onComplete() {
    $mdDialog.hide();
  }

  function success() {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'Successfully Deleted';
           }
         }
      });
    }

  function error(response) {
    $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastDanger',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
    }
    this.authorizeUser = function () {
      $q.all(resource_login_tables.forEach(deleteDessert)).then(onComplete);
    };

  }]);

angular.module('SE_App').controller('resource_loginController', ['$mdDialog','$resource_login', '$scope', '$mdEditDialog', '$http','$q','changeCellServices','upDownloadService',function ($mdDialog, $resource_login, $scope, $mdEditDialog, $http,$q,changeCellServices,upDownloadService) {
  'use strict';

  var bookmark;
  $scope.$firstSpan = '<span class="firstSpan">';
  $scope.$secondSpan = '<span class="secondSpan">';
  $scope.$file = 'resource_login.csv';
  $scope.$header = ['resource_url_name','name_of_product','username','password','product_description','resource_url_ID','user_name','user_email'];
  $scope.$location = '/service/resource_login';

    $scope.$on('locationUpdate', function (event, data) {
	  if(data.location == 'resource_login'){
	  	$scope.getDesserts();
	  }
  });


  $scope.selected = [];

  $scope.filter = {
    options: {
      debounce: 500
    }
  };

  $scope.query = {
    filter: '',
    limit: '15',
    order: 'resource_url_name',
    page: 1,
  };

  $scope.dbTableInfo = {
    db_table:'resource_login',
    db_ID:'resource_url_ID',
    //table:hosting_table,
  };

  function success(resource_login_tables) {
    $scope.resource_login_tables = resource_login_tables;
  }

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addResource_loginController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/resourceLogin/addResource_loginDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteResource_loginController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { resource_login_tables: $scope.selected },
      templateUrl: 'inc/delete.html',
    }).then($scope.getDesserts);
  };

  $scope.getDesserts = function () {
    $scope.promise = $resource_login.resource_login_tables.get($scope.query, success).$promise;
  };

  $scope.removeFilter = function () {
    $scope.filter.show = false;
    $scope.query.filter = '';

    if($scope.filter.form.$dirty) {
      $scope.filter.form.$setPristine();
    }
  };

  $scope.$watch('query.filter', function (newValue, oldValue) {
    if(!oldValue) {
      bookmark = $scope.query.page;
    }

    if(newValue !== oldValue) {
      $scope.query.page = 1;
    }

    if(!newValue) {
      $scope.query.page = bookmark;
    }

    $scope.getDesserts();
  });

  $scope.changeCellText = changeCellServices.changeCellText;

  $scope.changeDropdown = changeCellServices.changeDropdown;
    $scope.bulkDownload = upDownloadService.bulkDownload;


//Below is changing the selection and Date Pickers


$scope.getOwnersFunc = function(){
	$http.get('service/getowners')
		.then(function(response){
	$scope.getOwners = response.data;
	});
};

}]);

angular.module('SE_App').factory('$links', ['$resource', function ($resource) {
  'use strict';

  return {
    links_tables: $resource('/service/links')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addLinksController', ['$mdDialog', '$links', '$scope' , '$http', '$q','$mdToast',function ($mdDialog, $links, $scope, $http, $q, $mdToast) {
  'use strict';

$scope.myDate = new Date();

$scope.getLinksFunc = function(){
	$http.get('service/getlinks')
		.then(function(response){
	$scope.getLinks = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(links_table) {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'New Content Added';
           }
         }
      });
    $mdDialog.hide(links_table);
  }

    function fedup(response){
  	//console.log('FAILED!',data);
    $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastDanger',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
  }


  this.addItem = function () {
    $scope.item.form.$setSubmitted();

    var data = angular.copy($scope.links_table);
    data.date_created = data.date_created.getFullYear()+"-"+
                          ("0"+(data.date_created.getMonth()+1)).slice(-2)+"-"+
                          ("0"+data.date_created.getDate()).slice(-2);


    if($scope.item.form.$valid) {
      $links.links_tables.save({links_table: data}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteLinksController', ['$authorize', 'links_tables', '$mdDialog', '$links', '$scope', '$q', '$mdToast',function ($authorize, links_tables, $mdDialog, $links, $scope, $q,$mdToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(links_table, index) {
    var deferred = $links.links_tables.remove({id: links_table.link_ID}, success, error);


    deferred.$promise.then(function () {
      links_tables.splice(index, 1);
    });

    return deferred.$promise;
  }

  function onComplete() {
    $mdDialog.hide();
  }

  function success() {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'Successfully Deleted';
           }
         }
      });
    }

  function error(response) {
    $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastDanger',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
    }
    this.authorizeUser = function () {
      $q.all(links_tables.forEach(deleteDessert)).then(onComplete);
    };

  }]);

angular.module('SE_App').controller('linksController', ['$mdDialog','$links', '$scope', '$mdEditDialog', '$http','$q','changeCellServices','upDownloadService',function ($mdDialog, $links, $scope, $mdEditDialog, $http,$q,changeCellServices,upDownloadService) {
  'use strict';

  var bookmark;
  $scope.$file = 'links.csv';
  $scope.$header = ['source_url','target_url','anchor_text','alt_text','follow_link','date_created','title','comment','link_ID'];
  $scope.$location = '/service/links';

  $scope.selected = [];

  $scope.filter = {
    options: {
      debounce: 500
    }
  };

  $scope.query = {
    filter: '',
    limit: '15',
    order: 'source_url',
    page: 1,
  };

  $scope.dbTableInfo = {
    db_table:'links',
    db_ID:'link_ID',
    //table:hosting_table,
  };

  function success(links_tables) {
    angular.forEach(links_tables.data,function(row){
      // row.d
      var date_created_parts = row.date_created.split("-");
      row.date_created = new Date(parseInt(date_created_parts[0]),
                                    parseInt(date_created_parts[1])-1,
                                    parseInt(date_created_parts[2]));
    });
    $scope.links_tables = links_tables;
  }

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addLinksController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/links/addLinksDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteLinksController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { links_tables: $scope.selected },
      templateUrl: 'inc/delete.html',
    }).then($scope.getDesserts);
  };

  $scope.getDesserts = function () {
    $scope.promise = $links.links_tables.get($scope.query, success).$promise;
  };

  $scope.removeFilter = function () {
    $scope.filter.show = false;
    $scope.query.filter = '';

    if($scope.filter.form.$dirty) {
      $scope.filter.form.$setPristine();
    }
  };

  $scope.$watch('query.filter', function (newValue, oldValue) {
    if(!oldValue) {
      bookmark = $scope.query.page;
    }

    if(newValue !== oldValue) {
      $scope.query.page = 1;
    }

    if(!newValue) {
      $scope.query.page = bookmark;
    }

    $scope.getDesserts();
  });

  $scope.changeCellText = changeCellServices.changeCellText;

  $scope.changeDate = changeCellServices.changeDate;

  $scope.changeSwitchValue = changeCellServices.changeSwitchValue;
    $scope.bulkDownload = upDownloadService.bulkDownload;


  $scope.date_created = function(links_table){
    var dateFromDataBase = links_table.date_created;
    dateFromDataBase = new Date(dateFromDataBase);
    return dateFromDataBase;
  };


}]);

angular.module('SE_App').factory('$change_log', ['$resource', function ($resource) {
  'use strict';

  return {
    change_log_tables: $resource('/service/change_log')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addChange_logController', ['$mdDialog', '$change_log', '$scope' , '$http', '$q','$mdToast', function ($mdDialog, $change_log, $scope, $http, $q, $mdToast) {
  'use strict';


$scope.myDate = new Date();

$scope.getOwnersFunc = function(){
	$http.get('service/getowners')
		.then(function(response){
	$scope.getOwners = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(change_log_table) {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'New Content Added';
           }
         }
      });
    $mdDialog.hide(change_log_table);
  }

    function fedup(response){
  	//console.log('FAILED!',data);
    $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastDanger',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
  }


  this.addItem = function () {
    $scope.item.form.$setSubmitted();

    var data = angular.copy($scope.change_log_table);
    data.date_entered = data.date_entered.getFullYear()+"-"+
                          ("0"+(data.date_entered.getMonth()+1)).slice(-2)+"-"+
                          ("0"+data.date_entered.getDate()).slice(-2);


    if($scope.item.form.$valid) {
      $change_log.change_log_tables.save({change_log_table: data}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteChange_logController', ['$authorize', 'change_log_tables', '$mdDialog', '$change_log', '$scope', '$q', '$mdToast',function ($authorize, change_log_tables, $mdDialog, $change_log, $scope, $q,$mdToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(change_log_table, index) {
    var deferred = $change_log.change_log_tables.remove({id: change_log_table.change_log_ID}, success, error);


    deferred.$promise.then(function () {
      change_log_tables.splice(index, 1);
    });

    return deferred.$promise;
  }

  function onComplete() {
    $mdDialog.hide();
  }

  function success() {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'Successfully Deleted';
           }
         }
      });
    }

  function error(response) {
    $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastDanger',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
    }
    this.authorizeUser = function () {
      $q.all(change_log_tables.forEach(deleteDessert)).then(onComplete);
    };

  }]);

// =======================================================

angular.module('SE_App').controller('bulkUploadController', ['$mdDialog', '$change_log', '$scope' , '$http', '$q','$mdToast', function ($mdDialog, $change_log, $scope, $http, $q, $mdToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function success(change_log_table) {
    $mdToast.create({
      className: 'success',
      content: 'Successfully Deleted',
      dismissButton: 'true'
      });
    $mdDialog.hide(change_log_table);
  }

    function fedup(response){
  	//console.log('FAILED!',data);
    $mdToast.create({
      className: 'danger toasthome',
      content: response.data,
      dismissButton: 'true',
      timeout: 9000
      });
  }


}])
;

//  =========================================================

angular.module('SE_App').controller('change_logController', ['$mdDialog','$change_log', '$scope', '$mdEditDialog', '$http','$q','changeCellServices','upDownloadService',function ($mdDialog, $change_log, $scope, $mdEditDialog, $http,$q,changeCellServices,upDownloadService) {
  'use strict';

  var bookmark;
  $scope.$firstSpan = '<span class="firstSpan">';
  $scope.$secondSpan = '<span class="secondSpan">';
  $scope.$file = 'change_log.csv';
  $scope.$header = ['issue','date_entered','completed','change_log_ID','person_ID','first_name','last_name'];
  $scope.$location = '/service/change_log';


  $scope.selected = [];

  $scope.filter = {
    options: {
      debounce: 500
    }
  };

  $scope.query = {
    filter: '',
    limit: '15',
    order: ['date_entered','completed'],
    page: 1
  };

  $scope.dbTableInfo = {
    db_table:'change_log',
    db_ID:'change_log_ID',
    //table:hosting_table,
  };

  function success(change_log_tables) {
    angular.forEach(change_log_tables.data,function(row){
      // row.d
      var date_entered_parts = row.date_entered.split("-");
      row.date_entered = new Date(parseInt(date_entered_parts[0]),
                                    parseInt(date_entered_parts[1])-1,
                                    parseInt(date_entered_parts[2]));
    });
    $scope.change_log_tables = change_log_tables;
  }

  $scope.bulkUpload = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'bulkUploadController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'inc/bulk_upload.html',
    }).then($scope.getChangeLog);
  };

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addChange_logController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/changeLog/addchange_logDialog.html',
    }).then($scope.getChangeLog);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteChange_logController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { change_log_tables: $scope.selected },
      templateUrl: 'inc/delete.html',
    }).then($scope.getChangeLog);
  };

  $scope.getChangeLog = function () {
    $scope.promise = $change_log.change_log_tables.get($scope.query, success).$promise;
  };

  $scope.removeFilter = function () {
    $scope.filter.show = false;
    $scope.query.filter = '';

    if($scope.filter.form.$dirty) {
      $scope.filter.form.$setPristine();
    }
  };

  $scope.$watch('query.filter', function (newValue, oldValue) {
    if(!oldValue) {
      bookmark = $scope.query.page;
    }

    if(newValue !== oldValue) {
      $scope.query.page = 1;
    }

    if(!newValue) {
      $scope.query.page = bookmark;
    }

    $scope.getChangeLog();
  });

  $scope.changeCellText = changeCellServices.changeCellText;
  $scope.changeDate = changeCellServices.changeDate;
  $scope.changeDropdown = changeCellServices.changeDropdown;
  $scope.changeSwitchValue = changeCellServices.changeSwitchValue;
  $scope.bulkDownload = upDownloadService.bulkDownload;


  $scope.date_entered = function(change_log_table){
    var dateFromDataBase = change_log_table.date_entered;
    dateFromDataBase = new Date(dateFromDataBase);
    return dateFromDataBase;
  };


  $scope.getOwnersFunc = function(){
  	$http.get('service/getowners')
  		.then(function(response){
  	$scope.getOwners = response.data;
  	});
  };

}]);

angular.module('SE_App').factory('$software_keys', ['$resource', function ($resource) {
  'use strict';

  return {
    software_keys_tables: $resource('/service/software_keys')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addSoftware_keysController', ['$mdDialog', '$software_keys', '$scope' , '$http', '$mdToast',function ($mdDialog, $software_keys, $scope, $http,$mdToast) {
  'use strict';
$scope.myDate = new Date();

$scope.getOwnersFunc = function(){
	$http.get('service/getowners')
		.then(function(response){
	$scope.getOwners = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(software_keys_table) {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'New Content Added';
           }
         }
      });
    $mdDialog.hide(software_keys_table);
  }

    function fedup(response){
      $mdToast.show({
        hideDelay   : 9000,
        position    : 'top center',
        controller  : 'ToastCtrl',
        templateUrl : '/partials/toast-template.html',
        toastClass  : 'toastDanger',
        resolve: {
             $response: function () {
               return response.data;
             }
           }
        });
  }

  this.addItem = function () {
    $scope.item.form.$setSubmitted();

    if($scope.item.form.$valid) {
      $software_keys.software_keys_tables.save({software_keys_table: $scope.software_keys_table}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteSoftware_keysController', ['$authorize', 'software_keys_tables', '$mdDialog', '$software_keys', '$scope', '$q', '$mdToast',function ($authorize, software_keys_tables, $mdDialog, $software_keys, $scope, $q,$mdToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(software_keys_table, index) {
    var deferred = $software_keys.software_keys_tables.remove({id: software_keys_table.software_keys_ID}, success, error);


    deferred.$promise.then(function () {
      software_keys_tables.splice(index, 1);
    });

    return deferred.$promise;
  }

  function onComplete() {
    $mdDialog.hide();
  }

  function success() {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'Successfully Deleted';
           }
         }
      });
    }

  function error(response) {
    $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastDanger',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
    }
    this.authorizeUser = function () {
      $q.all(software_keys_tables.forEach(deleteDessert)).then(onComplete);
    };

  }]);

angular.module('SE_App').controller('software_keysController', ['$mdDialog','$software_keys', '$scope', '$mdEditDialog', '$http','$q','changeCellServices','upDownloadService',function ($mdDialog, $software_keys, $scope, $mdEditDialog, $http,$q,changeCellServices,upDownloadService) {
  'use strict';

  var bookmark;
  $scope.$firstSpan = '<span class="firstSpan">';
  $scope.$secondSpan = '<span class="secondSpan">';
  $scope.$file = 'software_keys.csv';
  $scope.$header = ['software_name','license_key','serial_number','comments','software_keys_ID','first_name','last_name'];
  $scope.$location = '/service/software_keys';

    $scope.$on('locationUpdate', function (event, data) {
	  if(data.location == 'software_keys'){
	  	$scope.getDesserts();
	  }
  });


  $scope.selected = [];

  $scope.filter = {
    options: {
      debounce: 500
    }
  };

  $scope.query = {
    filter: '',
    limit: '15',
    order: 'software_name',
    page: 1,
  };

  $scope.dbTableInfo = {
    db_table:'software_keys',
    db_ID:'software_keys_ID',
    //table:hosting_table,
  };

  function success(software_keys_tables) {
    $scope.software_keys_tables = software_keys_tables;
  }

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addSoftware_keysController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/softwareKeys/addSoftware_keysDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteSoftware_keysController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { software_keys_tables: $scope.selected },
      templateUrl: 'inc/delete.html',
    }).then($scope.getDesserts);
  };

  $scope.getDesserts = function () {
    $scope.promise = $software_keys.software_keys_tables.get($scope.query, success).$promise;
  };

  $scope.removeFilter = function () {
    $scope.filter.show = false;
    $scope.query.filter = '';

    if($scope.filter.form.$dirty) {
      $scope.filter.form.$setPristine();
    }
  };

  $scope.$watch('query.filter', function (newValue, oldValue) {
    if(!oldValue) {
      bookmark = $scope.query.page;
    }

    if(newValue !== oldValue) {
      $scope.query.page = 1;
    }

    if(!newValue) {
      $scope.query.page = bookmark;
    }

    $scope.getDesserts();
  });

  $scope.changeCellText = changeCellServices.changeCellText;

  $scope.changeDropdown = changeCellServices.changeDropdown;
    $scope.bulkDownload = upDownloadService.bulkDownload;


//Below is changing the selection and Date Pickers


$scope.getOwnersFunc = function(){
	$http.get('service/getowners')
		.then(function(response){
	$scope.getOwners = response.data;
	});
};

}]);

angular.module('SE_App').factory('$url_data', ['$resource', function ($resource) {
  'use strict';

  return {
    url_data_tables: $resource('/service/url_data')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addUrl_dataController', ['$mdDialog', '$url_data', '$scope' , '$http', '$mdToast',function ($mdDialog, $url_data, $scope, $http,$mdToast) {
  'use strict';

$scope.myDate = new Date();

$scope.getPersonsFunc = function(){
	$http.get('service/getpersons')
		.then(function(response){
	$scope.getPersons = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(url_data_table) {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'New Content Added';
           }
         }
      });
    $mdDialog.hide(url_data_table);
  }

    function fedup(response){
      $mdToast.show({
        hideDelay   : 9000,
        position    : 'top center',
        controller  : 'ToastCtrl',
        templateUrl : '/partials/toast-template.html',
        toastClass  : 'toastDanger',
        resolve: {
             $response: function () {
               return response.data;
             }
           }
        });
  }

  this.addItem = function () {
    $scope.item.form.$setSubmitted();

    if($scope.item.form.$valid) {
      $url_data.url_data_tables.save({url_data_table: $scope.url_data_table}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteUrl_dataController', ['$authorize', 'url_data_tables', '$mdDialog', '$url_data', '$scope', '$q', '$mdToast',function ($authorize, url_data_tables, $mdDialog, $url_data, $scope, $q,$mdToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(url_data_table, index) {
    var deferred = $url_data.url_data_tables.remove({id: url_data_table.url_hash}, success, error);


    deferred.$promise.then(function () {
      url_data_tables.splice(index, 1);
    });

    return deferred.$promise;
  }

  function onComplete() {
    $mdDialog.hide();
  }

  function success() {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'Successfully Deleted';
           }
         }
      });
    }

  function error(response) {
    $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastDanger',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
    }
    this.authorizeUser = function () {
      $q.all(url_data_tables.forEach(deleteDessert)).then(onComplete);
    };

  }]);

angular.module('SE_App').controller('url_dataController', ['$mdDialog','$url_data', '$scope', '$mdEditDialog', '$http','$q','changeCellServices','upDownloadService',function ($mdDialog, $url_data, $scope, $mdEditDialog, $http,$q,changeCellServices,upDownloadService) {
  'use strict';

  var bookmark;

  $scope.$file = 'url_data.csv';
  $scope.$header = ['url_name','crawl_frequency','da','pa','tf','cf','status_code','ose_num_links','majestic_num_links','url_hash'];
  $scope.$location = '/service/url_data';

    $scope.$on('locationUpdate', function (event, data) {
	  if(data.location == 'url_data'){
	  	$scope.getDesserts();
	  }
  });


  $scope.selected = [];

  $scope.filter = {
    options: {
      debounce: 500
    }
  };

  $scope.query = {
    filter: '',
    limit: '15',
    order: 'url_name',
    page: 1
  };

  $scope.dbTableInfo = {
    db_table:'url_data',
    db_ID:'url_hash',
    //table:hosting_table,
  };

  function success(url_data_tables) {
    $scope.url_data_tables = url_data_tables;
  }

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addUrl_dataController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/urlData/addUrl_dataDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteUrl_dataController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { url_data_tables: $scope.selected },
      templateUrl: 'inc/delete.html',
    }).then($scope.getDesserts);
  };

  $scope.getDesserts = function () {
    $scope.promise = $url_data.url_data_tables.get($scope.query, success).$promise;
  };

  $scope.removeFilter = function () {
    $scope.filter.show = false;
    $scope.query.filter = '';

    if($scope.filter.form.$dirty) {
      $scope.filter.form.$setPristine();
    }
  };

  $scope.$watch('query.filter', function (newValue, oldValue) {
    if(!oldValue) {
      bookmark = $scope.query.page;
    }

    if(newValue !== oldValue) {
      $scope.query.page = 1;
    }

    if(!newValue) {
      $scope.query.page = bookmark;
    }

    $scope.getDesserts();
  });

  $scope.changeCellText = changeCellServices.changeCellText;

  $scope.changeDropdown = changeCellServices.changeDropdown;
    $scope.bulkDownload = upDownloadService.bulkDownload;


//Below is changing the selection and Date Pickers


$scope.getFrequencyFunc = function(){
  $frequencies = ['Daily','Weekly','Monthly','Quartly'];
	$scope.getFreq = $frequencies;

};

}]);

angular.module('SE_App').factory('$authorize', ['$resource', function ($resource) {
  'use strict';
  return $resource('/service/9736644323hc4e34');
}]);
