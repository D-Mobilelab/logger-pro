/**
 * @ngdoc overview
 * @name main
 *
 * @description
 * I'm the overview of documentation, I'm in docs/main.js file
 *
 * Click on "cat" or "dog" module in navbar
 */

 var BaseLogger = require('./base-logger.js');
 var BaseLogger = require('./rotating-logger.js');


 module.exports = {
 	BaseLogger: BaseLogger,
 	RotatingLogger: RotatingLogger
 };