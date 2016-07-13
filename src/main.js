/**
 * @ngdoc overview
 * @name logger-pro
 *
 * @description
 * # Logger Pro
 * Logger Pro is a module that provides you an advanced log system.
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
 * # Enable/Disable Logger
 * To **enable** or **disable** logger just call init with enabled:true/false.
 *
 * <pre>
 *  Logger.init({enabled:true})  //Logger is now enabled
 *
 *  Logger.init({enabled:false}) //Logger is now disabled
 * </pre>
 *
 * # Components
 * - {@link logger-pro.Logger Logger} 
 * - {@link logger.RotatingLogger RotatingLogger} 
 * 
 */

 module.exports = {Logger, RotatingLogger};