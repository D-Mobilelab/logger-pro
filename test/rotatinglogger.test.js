var Logger = require('../src/base-logger.js');
var RotatingLogger = require('../src/rotating-logger.js');

describe('Rotating Logger -', function () {

	var RotLogger;	

	beforeEach(function(){

		RotLogger = RotatingLogger;

		spyOn(Logger, 'log');				
		spyOn(Logger, 'info');				
		spyOn(Logger, 'warn');				
		spyOn(Logger, 'error');				
	});

	describe('rotating logger get Config -', function(){
		beforeEach(function(){
			RotLogger.init({
				enabled: true,
				recordingEnabled: false
			});
		});

		it('logger prints rotLogger configuration', function(){
				expect(RotLogger.getConfig()).toEqual(
				Object({ enabled: true, log: true, table: true, info: true, warn: true, error: true, maxSize: 100, sliding: true }));
		});
	});

	describe('rotating logger -', function(){
		beforeEach(function(){
			RotLogger.init({
				enabled: true,
				recordingEnabled: false
			});
		});

		it('logger prints log messages', function(){
			RotLogger.log('hello', 'world');
			expect(Logger.log).toHaveBeenCalledWith(['hello', 'world']);
		});

		it('logger prints info messages', function(){
			RotLogger.info('hello', 'world');
			expect(Logger.info).toHaveBeenCalledWith(['hello', 'world']);
		});

		it('logger prints warn messages', function(){
			RotLogger.warn('hello', 'world');
			expect(Logger.warn).toHaveBeenCalledWith(['hello', 'world']);
		});

		it('logger prints error messages', function(){
			RotLogger.error('hello', 'world');
			expect(Logger.error).toHaveBeenCalledWith(['hello', 'world']);
		});
	});

	describe('rotating without sliding -', function(){
		var MockSave;

		beforeEach(function(){
			MockSave = {
				save: function(){}
			};

			spyOn(MockSave, 'save');

			RotLogger.init({
				enabled: true,
				recordingEnabled: true,
				maxSize: 5,
				sliding: false,
				saveRecords: function(messages){
					MockSave.save(messages);
				}
			});
		});

		it('saveRecords has not been called automatically before maxSize logs', function(){
			RotLogger.startRecording(true);
			RotLogger.log(1);
			RotLogger.log(2);
			RotLogger.log(3);
			RotLogger.log(4);
			expect(MockSave.save.calls.count()).toEqual(0);
		});

		it('saveRecords has been called automatically after maxSize logs', function(){
			RotLogger.startRecording(true);
			RotLogger.log(1);
			RotLogger.log(2);
			RotLogger.log(3);
			RotLogger.log(4);
			RotLogger.log(5);
			RotLogger.log(6);
			expect(MockSave.save.calls.count()).toEqual(1);
		});

		it('saveRecords has been called automatically many times, after maxSize logs', function(){
			RotLogger.startRecording(true);
			RotLogger.log(1);
			RotLogger.log(2);
			RotLogger.log(3);
			RotLogger.log(4);
			RotLogger.log(5);
			RotLogger.log(6);
			RotLogger.log(7);
			RotLogger.log(8);
			RotLogger.log(9);
			RotLogger.log(10);
			RotLogger.log(11);
			expect(MockSave.save.calls.count()).toEqual(2);
		});

		it('endRecording calls saveRecords', function(){
			RotLogger.startRecording(true);
			RotLogger.log(1);
			RotLogger.log(2);
			RotLogger.endRecording();
			expect(MockSave.save.calls.count()).toEqual(1);
		});
	});

	describe('rotating with sliding -', function(){
		var MockSave;

		beforeEach(function(){
			MockSave = {
				save: function(){}
			};

			spyOn(MockSave, 'save');

			RotLogger.init({
				enabled: true,
				recordingEnabled: true,
				maxSize: 5,
				sliding: true,
				saveRecords: function(messages){
					MockSave.save(messages);
				}
			});
		});

		it('saveRecords has not been called automatically after maxSize logs', function(){
			RotLogger.startRecording(true);
			RotLogger.log(1);
			RotLogger.log(2);
			RotLogger.log(3);
			RotLogger.log(4);
			RotLogger.log(5);
			RotLogger.log(6);
			expect(MockSave.save.calls.count()).toEqual(0);
		});
	});

	describe('Rotatinglevel failure -', function(){
		it('fail maxSize init', function(){
			var init = function(){
				RotLogger.init({
					enabled: true,
					maxSize: 'i\'m not a number'
				});
			};
			expect(init).toThrow();
		});

		it('fail sliding init', function(){
			var init = function(){
				RotLogger.init({
					enabled: true,
					sliding: 'I\'m not a boolean'
				});
			};
			expect(init).toThrow();
		});

		it('fail Recording Enabled init', function(){
			var init = function(){
				RotLogger.init({
					enabled: true,
					recordingEnabled: 'I\'m not a boolean'
				});
			};
			expect(init).toThrow();
		});

		it('fail saveRecords init', function(){
			var init = function(){
				RotLogger.init({
					enabled: true,
					saveRecords: 123
				});
			};
			expect(init).toThrow();
		});

		it('fail endRecording', function(){
			spyOn(console, 'warn');

			RotLogger.init({
				enabled: true,
				level: 'log',
				recordingEnabled: false
			});

			RotLogger.log('Hello World!');
			RotLogger.endRecording();
			expect(console.warn).toHaveBeenCalledWith('RotatingLogger :: endRecording called while RotatingLogger was not recording');
		});
	});

});