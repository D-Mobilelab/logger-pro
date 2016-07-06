/**
* @ngdoc object
* @name logger-pro.Logger
*
* @description
* Provides you the basic functionality of a log system.
*
* To use **Logger** you have to include the Logger script file.
*
* In this example, I have included the Logger's javascript file:
* <pre>
*   <script src="./dist/dist.js"></script>
* </pre>

* # Enable/Disable Logger
* To **enable** or **disable** logger just call init with enabled:true/false.
*
* <pre>
*  Logger.init({enabled:true})  //Logger is now enabled
*
*  Logger.init({enabled:false}) //Logger is now disabled
* </pre>
*
* To use one of the provided method just use Logger.*
*
* <pre>
*   Logger.log('Hello world'); //prints hello world
* </pre>
*
*/

var Logger = new function(){

    var _Logger = this;

    // defines log levels and their order (priority)
    var levels = ['log', 'table', 'info', 'warn', 'error'];
    
    // config will hold the configuration used at runtime, e.g. 
    var config = {};

    /**
     * @ngdoc function
     * @name Logger#getConfig
     * @methodOf logger-pro.Logger
     *
     * @description 
     * This method is a "read-only" getter for config. 
     *
     * Get Logger's configuration.
     *
     * @example
     * # Logger getConfig 
     * Here is one example of the getConfig method.
     *
     * <pre>
     *     console.log( Logger.getConfig() );
     * </pre>
     *
     */

    // "read-only" getter for config
    this.getConfig = function getConfig(){
        return JSON.parse(JSON.stringify(config));
    };

    // default emit function: uses console for logging messages
    var emit = function emit(level, args){
        console[level](args);
    };

    /**
     * @ngdoc function
     * @name Logger#init
     * @methodOf logger-pro.Logger
     *
     * @description 
     * This method is used to initialize or to change the configuration of 
     * the Logger's module. Call init whenever you need to change the Logger's configuration. 
     *
     * @param {Object} options (see attributes below)
     * @param {boolean} [options.enabled=true] Enable/Disable the Logger
     * @param {string} [options.level='log'] Actives all levels following the given
     * @param {Object} [options.levels=undefined] Levels contains the manual configuration of the Logger.
     * @param {function} [options.emit=Uses window.console] Emit is an addictional parameter that allows you to use a custom function as an emitter.
     *
     * @example
     * # Logger Init 
     * Here are some examples of the init method.
     *
     * **Remember that before call init you have to iclude the Logger's javascript file: **
     * <pre>
     *   <script src="./dist/dist.js"></script>
     * </pre>
     *
     * **Default initialization**
     * <pre>
     *  Logger.init({
     *      level: 'log', //set all level to true
     *      enabled: true //enables logger
     *  }); 
     *
     * </pre>
     *
     * **Logger with manual configuration**
     *
     * I want that logger logs only logs, warnings and errors
     * <pre>
     *     Logger.init({
     *      levels: { 
     *         'log': true, 
     *         'info': false,
     *         'table': false  
     *         'warn': true,
     *         'error': true
     *       },
     *       enabled: true //enables logger
     *      }); 
     *
     * </pre>
     *
     * **Logger with level configuration and personalized emit**
     *
     * I want that logger logs only warning and error
     * <pre>
     *     Logger.init({
     *       level: 'warn',  //Logger now logs only warnings and errors
     *       emit: function(level, args){
     *               console[level](args); //log args
     *               
     *               // Do something, i.e: sends error, store something etc.
     *             },
     *        enabled: true //enables logger
     *      }); 
     *
     * </pre>
     * 
     */

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
            throw new Error('Logger :: illegal type for enabled - expected boolean, got ' + typeOfenabled);
        }

        /* one-level setup
        * only shows messages with level higher or equal to the required one, e.g.
        * options = {
        *     level: 'info'
        * }
        */
        if (typeOfLevel === 'string'){
            if (levels.indexOf(options.level) === -1){
                throw new Error('Logger :: unknown level ' + options.level);
            } else {
                for (var i = 0; i < levels.length; i++){
                    config[levels[i]] = levels.indexOf(options.level) <= i;
                }
            }
        } else if (typeOfLevel !== 'undefined') {
            throw new Error('Logger :: illegal type for level - expected string, got ' + typeOfLevel);
        }

        /* level-by-level setup
        * sets each level on a case-by-case basis, e.g.
        * options = {
        *     levels: { 
        *         'log': false, 
        *         'info': false, 
        *         'warn': true,
        *         'error': true,
        *         'table': false 
        *     }
        * }
        */
        if (typeOfLevels === 'object'){
            var level;
            // sanity checks first
            for (level in options.levels){
                // sanity check for each level's value type (must be a boolean)
                typeOfLevel = typeof options.levels[level]; 
                if (typeOfLevel !== 'boolean'){
                    throw new Error('Logger :: illegal value type for level "' + level + '"' +
                            ' - expected boolean, got "' + typeOfLevel + '"');
                }

                // ignore unknown levels
                if (levels.indexOf(level) === -1){
                    throw new Error('Logger :: unknown log level "' + level + '"');
                }
            }

            // now that we are sure all values are legal, we can put them into the new configuration
            for (level in options.levels){
                config[level] = !!options.levels[level];
            }
        } else if (typeOfLevels !== 'undefined'){
            throw new Error('Logger :: illegal type for levels - expected object, got ' + typeOfLevels);
        }

        /* custom emit function
        * allows you to use a custom function as an emitter
        */
        if (typeOfEmit === 'function'){
            emit = options.emit;
        } else if (typeOfEmit !== 'undefined'){
            throw new Error('Logger :: illegal type for emit - expected function, got ' + typeOfEmit);
        }
    };

    /**
     * @ngdoc function
     * @name Logger#log
     * @methodOf logger-pro.Logger
     *
     * @description 
     * This method defines a method for each log level.
     * Each method uses the general function emit to log messages
     *
     * ***Log level must be true and logger must be enabled***
     *
     * @param {*} arguments Arguments to log
     *
     * @example
     * # Logger log 
     * Here is one example of the Log method.
     *
     * <pre>
     *     Logger.log('Hello World!') //Logs Hello World
     * </pre>
     *
     */

    /* define a method for each log level
    *  each method uses the general function emit to log messages
    */
    this.log = function log(){
        var args = Array.prototype.slice.call(arguments);
        if (config.enabled && !!config.log){
            emit('log', args);
        }
    };

    /**
     * @ngdoc function
     * @name Logger#table
     * @methodOf logger-pro.Logger
     *
     * @description 
     * This method defines a method for each table level.
     * Each method uses the general function emit to table messages
     *
     * ***table level must be true and logger must be enabled***
     *
     * @param {*} arguments Arguments to show as table messages
     *
     * @example
     * # Logger Table 
     * Here is one example of the Table method.
     *
     * <pre>
     *     Logger.table('Hello World!') //show Hello World as table message
     * </pre>
     *
     */

    this.table = function table(){
        var args = Array.prototype.slice.call(arguments);
        if (config.enabled && !!config.table){
            emit('table', args);
        }    
    };

    /**
     * @ngdoc function
     * @name Logger#info
     * @methodOf logger-pro.Logger
     *
     * @description 
     * This method defines a method for each info level.
     * Each method uses the general function emit to info messages
     *
     * ***info level must be true and logger must be enabled***
     *
     * @param {*} arguments Arguments to show as Info messages
     *
     * @example
     * # Logger Info 
     * Here is one example of the info method.
     *
     * <pre>
     *     Logger.info('Hello World!') //show Hello World as info message
     * </pre>
     *
     */

    this.info = function info(){
        var args = Array.prototype.slice.call(arguments);
        if (config.enabled && !!config.info){
            emit('info', args);
        }
    };


    /**
     * @ngdoc function
     * @name Logger#warn
     * @methodOf logger-pro.Logger
     *
     * @description 
     * This method defines a method for each warn level.
     * Each method uses the general function emit to warn messages
     *
     * ***warn level must be true and logger must be enabled***
     *
     * @param {*} arguments Arguments to show as warn messages
     *
     * @example
     * # Logger Warn 
     * Here is one example of the warn method.
     *
     * <pre>
     *     Logger.warn('Hello World!') //show Hello World as warn message
     * </pre>
     *
     */
    
    this.warn = function warn(){
        var args = Array.prototype.slice.call(arguments);
        if (config.enabled && !!config.warn){
            emit('warn', args);
        }    
    };

    /**
     * @ngdoc function
     * @name Logger#error
     * @methodOf logger-pro.Logger
     *
     * @description 
     * This method defines a method for each error level.
     * Each method uses the general function emit to error messages
     *
     * ***error level must be true and logger must be enabled***
     *
     * @param {*} arguments Arguments to show as error messages
     *
     * @example
     * # Logger Error 
     * Here is one example of the error method.
     *
     * <pre>
     *     Logger.error('Hello World!') //show Hello World as error message
     * </pre>
     *
     */
    
    this.error = function error(){
        var args = Array.prototype.slice.call(arguments);
        if (config.enabled && !!config.error){
            emit('error', args);
        }    
    };

    /**
      * @ngdoc function
     * @name Logger#isEnabled
     * @methodOf logger-pro.Logger
     *
     * @description 
     * This method defines a method to know if Logger is enabled or not;
     * 
     *
     * @example
     * # Logger isEnabled 
     * Here is one example of the isEnabled method.
     *
     * <pre>
     *     if(Logger.isEnabled()){
     *          //Do something
     *      } else {
     *          //Do something else
     *      }
     * </pre>
     *
     */

    this.isEnabled = function(){
        return !!config.enabled;
    };

    // default setup: show every message
    _Logger.init({
        level: 'log',
        enabled: true
    });

};

module.exports = Logger;