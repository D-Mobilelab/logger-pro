(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.BaseLogger = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var BaseLogger = new function(){

    var _baseLogger = this;

    // defines log levels and their order (priority)
    var levels = ['log', 'table', 'info', 'warn', 'error'];
    
    // config will hold the configuration used at runtime, e.g. 
    var config = {};

    // "read-only" getter for config
    this.getConfig = function getConfig(){
        return JSON.parse(JSON.stringify(config));
    };

    // default emit function: uses console for logging messages
    var emit = function emit(level, args){
        console[level](args);
    };

    // init the module with optional parameters
    this.init = function init(options){
        // used for checking the type of each attribute in options
        var typeOfenabled = typeof options.enabled;
        var typeOfLevel = typeof options.level;
        var typeOfLevels = typeof options.levels;
        var typeOfEmit = typeof options.emit;

        // enabled setup
        if (typeOfenabled === 'boolean'){
            config.enabled = options.enabled;
        } else if (typeOfenabled !== 'undefined') {
            throw new Error('BaseLogger :: illegal type for enabled - expected boolean, got ' + typeOfenabled);
        }
        if (typeOfLevel === 'string'){
            if (levels.indexOf(options.level) === -1){
                throw new Error('Logger :: unknown level ' + options.level);
            } else {
                for (var i = 0; i < levels.length; i++){
                    config[levels[i]] = levels.indexOf(options.level) <= i;
                }
            }
        } else if (typeOfLevel !== 'undefined') {
            throw new Error('BaseLogger :: illegal type for level - expected string, got ' + typeOfLevel);
        }
        if (typeOfLevels === 'object'){
            var level;
            // sanity checks first
            for (level in options.levels){
                // sanity check for each level's value type (must be a boolean)
                typeOfLevel = typeof options.levels[level]; 
                if (typeOfLevel !== 'boolean'){
                    throw new Error('BaseLogger :: illegal value type for level "' + level + '"' +
                            ' - expected boolean, got "' + typeOfLevel + '"');
                }

                // ignore unknown levels
                if (levels.indexOf(level) === -1){
                    throw new Error('BaseLogger :: unknown log level "' + level + '"');
                }
            }

            // now that we are sure all values are legal, we can put them into the new configuration
            for (level in options.levels){
                config[level] = !!options.levels[level];
            }
        } else if (typeOfLevels !== 'undefined'){
            throw new Error('BaseLogger :: illegal type for levels - expected object, got ' + typeOfLevels);
        }
        if (typeOfEmit === 'function'){
            emit = options.emit;
        } else if (typeOfEmit !== 'undefined'){
            throw new Error('BaseLogger :: illegal type for emit - expected function, got ' + typeOfEmit);
        }
    };
    this.log = function log(){
        var args = Array.prototype.slice.call(arguments);
        if (config.enabled && !!config.log){
            emit('log', args);
        }
    };

    this.table = function table(){
        var args = Array.prototype.slice.call(arguments);
        if (config.enabled && !!config.table){
            emit('table', args);
        }    
    };

    this.info = function info(){
        var args = Array.prototype.slice.call(arguments);
        if (config.enabled && !!config.info){
            emit('info', args);
        }
    };
    
    this.warn = function warn(){
        var args = Array.prototype.slice.call(arguments);
        if (config.enabled && !!config.warn){
            emit('warn', args);
        }    
    };
    
    this.error = function error(){
        var args = Array.prototype.slice.call(arguments);
        if (config.enabled && !!config.error){
            emit('error', args);
        }    
    };

    this.isEnabled = function(){
        return !!config.enabled;
    };

    // default setup: show every message
    _baseLogger.init({
        level: 'log',
        enabled: true
    });

};

module.exports = BaseLogger;
},{}]},{},[1])(1)
});