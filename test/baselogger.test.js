var BaseLogger = require('../src/base-logger.js');

describe('BaseLogger -', function () {

	var Logger;	

	beforeEach(function(){
		Logger = BaseLogger;

		spyOn(console, 'log');				
		spyOn(console, 'info');				
		spyOn(console, 'warn');				
		spyOn(console, 'error');				
	});


	describe('isEnabled -', function(){
		it('it returns true if logger is enabled', function(){
			Logger.init({
				enabled: true
			});
			expect(Logger.isEnabled()).toBe(true);
		});

		it('it returns false if logger is not enabled', function(){
			Logger.init({
				enabled: false
			});
			expect(Logger.isEnabled()).toBe(false);
		});
	});

	describe('level:log -', function(){
		beforeEach(function(){
			Logger.init({
				enabled: true,
				level: 'log' 
			});
		});

		it('logger prints log messages', function(){
			Logger.log('ciao', 'mondo');
			expect(console.log).toHaveBeenCalledWith(['ciao', 'mondo']);
		});

		it('logger prints info messages', function(){
			Logger.info('ciao', 'mondo');
			expect(console.info).toHaveBeenCalledWith(['ciao', 'mondo']);
		});

		it('logger prints warn messages', function(){
			Logger.warn('ciao', 'mondo');
			expect(console.warn).toHaveBeenCalledWith(['ciao', 'mondo']);
		});

		it('logger prints error messages', function(){
			Logger.error('ciao', 'mondo');
			expect(console.error).toHaveBeenCalledWith(['ciao', 'mondo']);
		});

		it('logger get configuration ', function(){
			expect(Logger.getConfig()).toEqual(
				Object({ enabled: true, log: true, table: true, info: true, warn: true, error: true }));
		});
	});

	describe('level:info -', function(){
		beforeEach(function(){
			Logger.init({
				enabled: true,
				level: 'info' 
			});
		});

		it('logger does not prints log messages', function(){
			Logger.log('ciao', 'mondo');
			expect(console.log.calls.count()).toEqual(0);
		});

		it('logger prints info messages', function(){
			Logger.info('ciao', 'mondo');
			expect(console.info).toHaveBeenCalledWith(['ciao', 'mondo']);
		});

		it('logger prints warn messages', function(){
			Logger.warn('ciao', 'mondo');
			expect(console.warn).toHaveBeenCalledWith(['ciao', 'mondo']);
		});

		it('logger prints error messages', function(){
			Logger.error('ciao', 'mondo');
			expect(console.error).toHaveBeenCalledWith(['ciao', 'mondo']);
		});
	});

	describe('level:warn -', function(){
		beforeEach(function(){
			Logger.init({
				enabled: true,
				level: 'warn' 
			});
		});

		it('logger does not prints log messages', function(){
			Logger.log('ciao', 'mondo');
			expect(console.log.calls.count()).toEqual(0);
		});

		it('logger does not prints info messages', function(){
			Logger.info('ciao', 'mondo');
			expect(console.info.calls.count()).toEqual(0);
		});

		it('logger prints warn messages', function(){
			Logger.warn('ciao', 'mondo');
			expect(console.warn).toHaveBeenCalledWith(['ciao', 'mondo']);
		});

		it('logger prints error messages', function(){
			Logger.error('ciao', 'mondo');
			expect(console.error).toHaveBeenCalledWith(['ciao', 'mondo']);
		});
	});

	describe('level:error -', function(){
		beforeEach(function(){
			Logger.init({
				enabled: true,
				level: 'error' 
			});
		});

		it('logger does not prints log messages', function(){
			Logger.log('ciao', 'mondo');
			expect(console.log.calls.count()).toEqual(0);
		});

		it('logger does not prints info messages', function(){
			Logger.info('ciao', 'mondo');
			expect(console.info.calls.count()).toEqual(0);
		});

		it('logger does not prints warn messages', function(){
			Logger.warn('ciao', 'mondo');
			expect(console.warn.calls.count()).toEqual(0);
		});

		it('logger prints error messages', function(){
			Logger.error('ciao', 'mondo');
			expect(console.error).toHaveBeenCalledWith(['ciao', 'mondo']);
		});
	});

	describe('mix configuration -', function(){
		beforeEach(function(){
			Logger.init({
				enabled: true,
				levels: {
					log: false,
					info: true,
					warn: false,
					error: true
				}
			});
		});

		it('logger does not prints log messages', function(){
			Logger.log('ciao', 'mondo');
			expect(console.log.calls.count()).toEqual(0);
		});

		it('logger does not prints info messages', function(){
			Logger.info('ciao', 'mondo');
			expect(console.info).toHaveBeenCalledWith(['ciao', 'mondo']);
		});

		it('logger does not prints warn messages', function(){
			Logger.warn('ciao', 'mondo');
			expect(console.warn.calls.count()).toEqual(0);
		});

		it('logger prints error messages', function(){
			Logger.error('ciao', 'mondo');
			expect(console.error).toHaveBeenCalledWith(['ciao', 'mondo']);
		});
	});

	describe('mix configuration 2 -', function(){
		beforeEach(function(){
			Logger.init({
				enabled: true,
				levels: {
					log: true,
					info: false,
					warn: true,
					error: false
				}
			});
		});

		it('logger does not prints log messages', function(){
			Logger.log('ciao', 'mondo');
			expect(console.log).toHaveBeenCalledWith(['ciao', 'mondo']);
		});

		it('logger does not prints info messages', function(){
			Logger.info('ciao', 'mondo');
			expect(console.info.calls.count()).toEqual(0);
		});

		it('logger does not prints warn messages', function(){
			Logger.warn('ciao', 'mondo');
			expect(console.warn).toHaveBeenCalledWith(['ciao', 'mondo']);
		});

		it('logger prints error messages', function(){
			Logger.error('ciao', 'mondo');
			expect(console.error.calls.count()).toEqual(0);
		});
	});

	describe('emit -', function(){
		var mockEmit;

		beforeEach(function(){
			mockEmit = {
				emit: function(){}
			};

			spyOn(mockEmit, 'emit');

			Logger.init({
				enabled: true,
				emit: function(level, args){
					mockEmit.emit(level, args);
				}
			});
		});

		it('emit method has called with log() method', function(){
			Logger.log('ciao', 'mondo');
			expect(mockEmit.emit).toHaveBeenCalledWith('log', ['ciao', 'mondo']);
		});

		it('emit method has called with info() method', function(){
			Logger.info('ciao', 'mondo');
			expect(mockEmit.emit).toHaveBeenCalledWith('info', ['ciao', 'mondo']);
		});

		it('emit method has called with warn() method', function(){
			Logger.warn('ciao', 'mondo');
			expect(mockEmit.emit).toHaveBeenCalledWith('warn', ['ciao', 'mondo']);
		});

		it('emit method has called with error() method', function(){
			Logger.error('ciao', 'mondo');
			expect(mockEmit.emit).toHaveBeenCalledWith('error', ['ciao', 'mondo']);
		});
	});

	describe('level failure -', function(){
		it('fail enable init', function(){
			var init = function(){
				Logger.init({
					enabled: 134
				});
			};
			expect(init).toThrow();
		});

		it('fail level init', function(){
			var init = function(){
				Logger.init({
					enabled: true,
					level: [123,124]
				});
			};
			expect(init).toThrow();
		});

		it('fail level init', function(){
			var init = function(){
				Logger.init({
					enabled: true,
					level: 'piooo'
				});
			};
			expect(init).toThrow();
		});

		it('fail level init', function(){
			var init = function(){
				Logger.init({
					enabled: true,
					levels: {
						log:'piooo',
						info: true,
						table: true,
						warn: true,
						error: true
					}
				});
			};

			expect(init).toThrow();
		});

		it('fail level init', function(){
			var init = function(){
				Logger.init({
					enabled: true,
					levels: {
						123 : true
					}
				});
			};

			expect(init).toThrow();
		});

		it('fail level init', function(){
			var init = function(){
				Logger.init({
					enabled: true,
					levels: 'i\'m not an object'
				});
			};

			expect(init).toThrow();
		});

		it('fail level init with emit', function(){
			var init = function(){
				Logger.init({
					enabled: true,
					level: 'log',
					emit: 'i\'m not a function'
				});
			};
			expect(init).toThrow();
		});
	});

})