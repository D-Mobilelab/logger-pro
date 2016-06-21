/**
 * @ngdoc overview
 * @name logger-pro
 *
* @description
 * # Logger Pro
 * Logger is a module that provides you an advanced log system.
 *
 *
 * Remember that **Logger Pro** is organized in **levels**, sorted by relevance: 
 *
 * - **Log**;
 * - **Info**;
 * - **Table**;
 * - **Warning**;
 * - **Error**;
 *
 * ***Note that is very relevant of how Logger Pro's levels are ordered!***
 *
 * # Components
 * - {@link logger-pro.BaseLogger BaseLogger} 
 * - {@link logger.RotatingLogger RotatingLogger} 
 * 
 */
 var BaseLogger = require('./base-logger.js');
 var RotatingLogger = require('./rotating-logger.js');

 module.exports = {
 	BaseLogger: BaseLogger,
 	RotatingLogger: RotatingLogger
 };