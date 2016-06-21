/**
 * @ngdoc overview
 * @name main
 *
 * @description
 * I'm the overview of documentation, I'm in docs/main.js file
 *
 * example
 */

 var BaseLogger = require('./base-logger.js');
 var RotatingLogger = require('./rotating-logger.js');

 module.exports = {
 	BaseLogger: BaseLogger,
 	RotatingLogger: RotatingLogger
 };