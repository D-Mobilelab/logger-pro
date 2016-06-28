/**
* @ngdoc object
* @name logger-pro.RotatingLogger
*
* @description
* Provides you an advanced functionality of a log system.
*
* To use **RotatingLogger** you have to include each javascript files: the dist.js file and the dist-rotating.js file (that you can find it in the dist folder).
*
* In this example, I have included each the javascript file:
* <pre>
*   <script src="./dist/dist.js"></script>
*   <script src="./dist/dist-rotating.js"></script>
* </pre>
*
* To use one of the provided method just use RotatingLogger.*
*
* <pre>
*   RotatingLogger.log('Hello world'); //prints hello world
* </pre>
*
*/

var BaseLogger = require('./base-logger.js');

var RotatingLogger = new function(){

    // IMPORTANT: requires Logger
    var logger = BaseLogger;

    // this Array will contain each message
    var messages = [];
    // this is the max size of messages (before it gets downloaded)
    var maxSize = 100;

    // true if logger is enabled (by config) to record messages
    var recordingEnabled = true;
    // true if logger is recording messages
    var isRecording = false;
    // if true, only the last maxSize messages are recorded
    var sliding = true;

    /**
     * @ngdoc function
     * @name RotatingLogger#getConfig
     * @methodOf logger-pro.RotatingLogger
     *
     * @description 
     * This method wraps original BaseLogger's getConfig function
     * adding maxSize attribute, click {@link logger-pro.BaseLogger#methods_getConfig here} to see getConfig() documentation.
     */

    /* wraps original Logger's getConfig function
    * adding maxSize attribute
    */
    this.getConfig = function(){
        var config = logger.getConfig();
        config.maxSize = maxSize;
        config.sliding = sliding;
        return config;
    };


    var handleMessages = function(level, args){
        if (messages.length >= maxSize){
            if (!sliding){
                endRotate();
            } else {
                messages.shift();
            }
        }

        logger[level](args);
        if (recordingEnabled && logger.getConfig().enabled){
            messages.push([level, args]);
        }
    };

    /**
     * @ngdoc function
     * @name RotatingLogger#log
     * @methodOf logger-pro.RotatingLogger
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
     * # RotatingLogger log 
     * Here is one example of the Log method.
     *
     * <pre>
     *     RotatingLogger.log('Hello World!') //Logs Hello World
     * </pre>
     *
    */

    // expose Logger's main methods
    this.log = function(){
        var args = Array.prototype.slice.call(arguments);
        handleMessages('log', args);
    };

    /**
     * @ngdoc function
     * @name RotatingLogger#info
     * @methodOf logger-pro.RotatingLogger
     *
     * @description 
     * This method defines a method for each info level.
     * Each method uses the general function emit to info messages
     *
     * ***info level must be true and logger must be enabled***
     *
     * @param {*} arguments Arguments to info
     *
     * @example
     * # RotatingLogger Info 
     * Here is one example of the info method.
     *
     * <pre>
     *     RotatingLogger.info('Hello World!') //show Hello World as info message
     * </pre>
     *
     */

    this.info = function(){
        var args = Array.prototype.slice.call(arguments);
        handleMessages('info', args);
    };

    /**
     * @ngdoc function
     * @name RotatingLogger#table
     * @methodOf logger-pro.RotatingLogger
     *
     * @description 
     * This method defines a method for each table level.
     * Each method uses the general function emit to table messages
     *
     * ***table level must be true and logger must be enabled***
     *
     * @param {*} arguments Arguments to table
     *
     * @example
     * # RotatingLogger Table 
     * Here is one example of the table method.
     *
     * <pre>
     *     RotatingLogger.table('Hello World!') //show Hello World as table message
     * </pre>
     *
     */

    this.table = function(){
        var args = Array.prototype.slice.call(arguments);
        handleMessages('table', args);
    };


    /**
     * @ngdoc function
     * @name RotatingLogger#warn
     * @methodOf logger-pro.RotatingLogger
     *
     * @description 
     * This method defines a method for each warn level.
     * Each method uses the general function emit to warn messages
     *
     * ***warn level must be true and logger must be enabled***
     *
     * @param {*} arguments Arguments to warn
     *
     * @example
     * # RotatingLogger Warn 
     * Here is one example of the warn method.
     *
     * <pre>
     *     RotatingLogger.warn('Hello World!') //show Hello World as warn message
     * </pre>
     *
     */

    this.warn = function(){
        var args = Array.prototype.slice.call(arguments);
        handleMessages('warn', args);
    };

    /**
     * @ngdoc function
     * @name RotatingLogger#error
     * @methodOf logger-pro.RotatingLogger
     *
     * @description 
     * This method defines a method for each error level.
     * Each method uses the general function emit to error messages
     *
     * ***error level must be true and logger must be enabled***
     *
     * @param {*} arguments Arguments to error
     *
     * @example
     * # RotatingLogger error 
     * Here is one example of the error method.
     *
     * <pre>
     *     RotatingLogger.error('Hello World!') //show Hello World as error message
     * </pre>
     *
     */

    this.error = function(){
        var args = Array.prototype.slice.call(arguments);
        handleMessages('error', args);
    };

    // this will open a new tab showing a chunk of messages in JSON format
    var saveRecords = function(msgs){
        var exportData = 'data:text/json;charset=utf-8,';
        exportData += JSON.stringify(msgs, null, 4);
        var encodedUri = encodeURI(exportData);
        window.open(encodedUri, '_blank');
    };

    var endRotate = function(){
        saveRecords(messages);
        messages = [];
    };

    /**
     * @ngdoc function
     * @name RotatingLogger#startRecording
     * @methodOf logger-pro.RotatingLogger
     *
     * @description 
     *
     * This method starts the recording of all the messages logged by RotatingLogger.
     *
     * ***Remember that recordingEnabled must be set to true to record*** 
     *
     * @example
     * # RotatingLogger startRecording
     *
     * This is an example of how to use **startRecording** method
     * <pre>
     *  RotatingLogger.startRecording() // Start recording
     * </pre>
     *
     */

    // starts adding logs to messages var
    this.startRecording = function(resetMessages){
        if (!!resetMessages){
            messages = [];
        }
        isRecording = true;
    };

    /**
     * @ngdoc function
     * @name RotatingLogger#endRecording
     * @methodOf logger-pro.RotatingLogger
     *
     * @description 
     *
     * This method tells **RotatingLogger** to stop recording messages and 
     * calls internal function saveRecords (set within init method).
     *
     * If you're not recording it will show an error message.
     *
     * **Remember that first you have to start a recording with the startRecording method**
     * @example
     * # RotatingLogger endRecording
     *
     * This is an example of how to use **endRecording** method
     * <pre>
     *  //Stop recording and saves records
     *  RotatingLogger.endRecording()  
     *
     *
     * </pre>
    */

    // stops recording messages and downloads them as JSON
    this.endRecording = function(){

        if (!isRecording){
            console.warn('RotatingLogger :: endRecording called while RotatingLogger was not recording');
        }

        isRecording = false;
        endRotate();
    };

    /**
     * @ngdoc function
     * @name RotatingLogger#init
     * @methodOf logger-pro.RotatingLogger
     *
     * @description 
     * This method is used to initialize or to change the configuration of 
     * the Rotating Logger's module. Call init whenever you need to change the Rotating Logger's configuration. 
     *
     * **Remember that before call init you have to include the RotatingLogger' s javascript file: **
     *
     * See **BaseLogger** {@link logger-pro.BaseLogger#methods_init init()} documentation to configure also the **BaseLogger** functionality.
     *
     * @param {Object} options (see attributes below)
     * @param {Integer} [options.maxSize=100] maxSize defines the max number of messages recorded.
     * @param {boolean} [options.sliding=true] Enables "sliding window" recording.
     *
     * If enabled, the logger will record the last records only (<= maxSize)
     *
     * If not enabled, the logger will automatically save a list of messages when length = maxSize 
     * @param {boolean} [options.recordingEnabled=true] Enables message recording
     *
     * If disabled, no messages are recorded (even between startRecording and endRecording)
     *
     * @param {function} [options.saveRecords=exports JSon file] Function used to export recorded messages.
     *
     *
     * @example
     * # Logger Init 
     * Here is one example of the init method.
     *
     * **RotatingLogger initialization**
     * <pre>
     * 
     *   RotatingLogger.init({
     *      maxSize: 100, //set maxSize to 100
     *      sliding: true, //enables sliding mode
     *      recordingEnabled: true, //enable recording
     *      enabled: true //enable logger
     *   }); 
     *
     * </pre>
     * 
     * **RotatingLogger initialization with custom saveRecords**
     *
     * Here is an example of initialization where saveRecords sends messages calling an API.
     * <pre>
     * 
     *   RotatingLogger.init({
     *      ...,
     *      saveRecords: function(messages){
     *          API_send(messages)
     *      }
     *   }); 
     *
     * </pre>
     */

    this.init = function(options){
        var typeOfMaxSize = typeof options.maxSize;
        var typeOfSliding = typeof options.sliding;
        var typeOfRecEnabled = typeof options.recordingEnabled;
        var typeOfSaveRecords = typeof options.saveRecords;

        /* define custom maxSize
        * maxSize defines the max number of messages recorded
        */
        if (typeOfMaxSize !== 'undefined'){
            if (typeOfMaxSize !== 'number'){
                throw new Error('RotatingLogger :: illegal type "' + typeOfMaxSize + '" for maxSize, "number" expected');
            } else {
                maxSize = options.maxSize;
                delete options.maxSize;
            }
        }

        /* enable "sliding window" recording
        * if enabled, the logger will record the last records only (<= maxSize)
        * if not enabled, the logger will automatically save a list of messages when length = maxSize 
        */
        if (typeOfSliding !== 'undefined'){
            if (typeOfSliding !== 'boolean'){
                throw new Error('RotatingLogger :: illegal type "' + typeOfSliding + '" for sliding, "boolean" expected');
            } else {
                sliding = options.sliding;
                delete options.sliding;
            }
        }

        /* enable message recording
        * if disabled, no messages are recorded (even between startRecording and endRecording)
        */
        if (typeOfRecEnabled !== 'undefined'){
            if (typeOfRecEnabled !== 'boolean'){
                throw new Error('RotatingLogger :: illegal type "' + typeOfRecEnabled + '" for recordingEnabled, "boolean" expected');
            } else {

                recordingEnabled = options.recordingEnabled;
                isRecording = options.recordingEnabled;
                delete options.recordingEnabled;
            }
        }

        /* custom saveRecords function
        * allows you to use a custom function as saveRecords
        */
        if (typeOfSaveRecords === 'function'){
            saveRecords = options.saveRecords;
        } else if (typeOfSaveRecords !== 'undefined'){
            throw new Error('RotatingLogger :: illegal type for saveRecords - expected function, got ' + valueType);
        }

        logger.init(options);
    };

};

module.exports = RotatingLogger;
