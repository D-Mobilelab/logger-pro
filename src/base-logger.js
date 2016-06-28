/**
* @ngdoc object
* @name logger-pro.BaseLogger
*
* @description
* Provides you the basic functionality of a log system.
*
* To use **BaseLogger** you have to include the BaseLogger script file.
*
* In this example, I have included the BaseLogger's javascript file:
* <pre>
*   <script src="./dist/dist.js"></script>
* </pre>

* # Enable/Disable Logger
* To **enable** or **disable** logger just call init with enabled:true/false.
*
* <pre>
*  BaseLogger.init({enabled:true})  //Logger is now enabled
*
*  BaseLogger.init({enabled:false}) //Logger is now disabled
* </pre>
*
* To use one of the provided method just use BaseLogger.*
*
* <pre>
*   BaseLogger.log('Hello world'); //prints hello world
* </pre>
*
*/

var BaseLogger = new function(){

    var _baseLogger = this;

    // defines log levels and their order (priority)
    var levels = ['log', 'table', 'info', 'warn', 'error'];
    
    // config will hold the configuration used at runtime, e.g. 
    var config = {};

    /**
     * @ngdoc function
     * @name BaseLogger#getConfig
     * @methodOf logger-pro.BaseLogger
     *
     * @description 
     * This method is a "read-only" getter for config. 
     *
     * Get BaseLogger's configuration.
     *
     * @example
     * # BaseLogger getConfig 
     * Here is one example of the getConfig method.
     *
     * <pre>
     *     console.log( BaseLogger.getConfig() );
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
     * @name BaseLogger#init
     * @methodOf logger-pro.BaseLogger
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
     * # BaseLogger Init 
     * Here are some examples of the init method.
     *
     * **Remember that before call init you have to iclude the BaseLogger's javascript file: **
     * <pre>
     *   <script src="./dist/dist.js"></script>
     * </pre>
     *
     * **Default initialization**
     * <pre>
     *  BaseLogger.init({
     *      level: 'log', //set all level to true
     *      enabled: true //enables logger
     *  }); 
     *
     * </pre>
     *
     * **BaseLogger with manual configuration**
     *
     * I want that logger logs only logs, warnings and errors
     * <pre>
     *     BaseLogger.init({
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
     * **BaseLogger with level configuration and personalized emit**
     *
     * I want that logger logs only warning and error
     * <pre>
     *     BaseLogger.init({
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
            throw new Error('BaseLogger :: illegal type for enabled - expected boolean, got ' + typeOfenabled);
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
            throw new Error('BaseLogger :: illegal type for level - expected string, got ' + typeOfLevel);
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

        /* custom emit function
        * allows you to use a custom function as an emitter
        */
        if (typeOfEmit === 'function'){
            emit = options.emit;
        } else if (typeOfEmit !== 'undefined'){
            throw new Error('BaseLogger :: illegal type for emit - expected function, got ' + typeOfEmit);
        }
    };

    /**
     * @ngdoc function
     * @name BaseLogger#log
     * @methodOf logger-pro.BaseLogger
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
     * # BaseLogger log 
     * Here is one example of the Log method.
     *
     * <pre>
     *     BaseLogger.log('Hello World!') //Logs Hello World
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
     * @name BaseLogger#table
     * @methodOf logger-pro.BaseLogger
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
     * # BaseLogger Table 
     * Here is one example of the Table method.
     *
     * <pre>
     *     BaseLogger.table('Hello World!') //show Hello World as table message
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
     * @name BaseLogger#info
     * @methodOf logger-pro.BaseLogger
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
     * # BaseLogger Info 
     * Here is one example of the info method.
     *
     * <pre>
     *     BaseLogger.info('Hello World!') //show Hello World as info message
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
     * @name BaseLogger#warn
     * @methodOf logger-pro.BaseLogger
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
     * # BaseLogger Warn 
     * Here is one example of the warn method.
     *
     * <pre>
     *     BaseLogger.warn('Hello World!') //show Hello World as warn message
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
     * @name BaseLogger#error
     * @methodOf logger-pro.BaseLogger
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
     * # BaseLogger Error 
     * Here is one example of the error method.
     *
     * <pre>
     *     BaseLogger.error('Hello World!') //show Hello World as error message
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
     * @name BaseLogger#isEnabled
     * @methodOf logger-pro.BaseLogger
     *
     * @description 
     * This method defines a method to know if BaseLogger is enabled or not;
     * 
     *
     * @example
     * # BaseLogger isEnabled 
     * Here is one example of the isEnabled method.
     *
     * <pre>
     *     if(BaseLogger.isEnabled()){
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
    _baseLogger.init({
        level: 'log',
        enabled: true
    });

};

module.exports = BaseLogger;