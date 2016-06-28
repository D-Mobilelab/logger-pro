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
			Logger.log('hello', 'world');
			expect(console.log).toHaveBeenCalledWith(['hello', 'world']);
		});

		it('logger prints info messages', function(){
			Logger.info('hello', 'world');
			expect(console.info).toHaveBeenCalledWith(['hello', 'world']);
		});

		it('logger prints warn messages', function(){
			Logger.warn('hello', 'world');
			expect(console.warn).toHaveBeenCalledWith(['hello', 'world']);
		});

		it('logger prints error messages', function(){
			Logger.error('hello', 'world');
			expect(console.error).toHaveBeenCalledWith(['hello', 'world']);
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
			Logger.log('hello', 'world');
			expect(console.log.calls.count()).toEqual(0);
		});

		it('logger prints info messages', function(){
			Logger.info('hello', 'world');
			expect(console.info).toHaveBeenCalledWith(['hello', 'world']);
		});

		it('logger prints warn messages', function(){
			Logger.warn('hello', 'world');
			expect(console.warn).toHaveBeenCalledWith(['hello', 'world']);
		});

		it('logger prints error messages', function(){
			Logger.error('hello', 'world');
			expect(console.error).toHaveBeenCalledWith(['hello', 'world']);
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
			Logger.log('hello', 'world');
			expect(console.log.calls.count()).toEqual(0);
		});

		it('logger does not prints info messages', function(){
			Logger.info('hello', 'world');
			expect(console.info.calls.count()).toEqual(0);
		});

		it('logger prints warn messages', function(){
			Logger.warn('hello', 'world');
			expect(console.warn).toHaveBeenCalledWith(['hello', 'world']);
		});

		it('logger prints error messages', function(){
			Logger.error('hello', 'world');
			expect(console.error).toHaveBeenCalledWith(['hello', 'world']);
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
			Logger.log('hello', 'world');
			expect(console.log.calls.count()).toEqual(0);
		});

		it('logger does not prints info messages', function(){
			Logger.info('hello', 'world');
			expect(console.info.calls.count()).toEqual(0);
		});

		it('logger does not prints warn messages', function(){
			Logger.warn('hello', 'world');
			expect(console.warn.calls.count()).toEqual(0);
		});

		it('logger prints error messages', function(){
			Logger.error('hello', 'world');
			expect(console.error).toHaveBeenCalledWith(['hello', 'world']);
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
			Logger.log('hello', 'world');
			expect(console.log.calls.count()).toEqual(0);
		});

		it('logger does not prints info messages', function(){
			Logger.info('hello', 'world');
			expect(console.info).toHaveBeenCalledWith(['hello', 'world']);
		});

		it('logger does not prints warn messages', function(){
			Logger.warn('hello', 'world');
			expect(console.warn.calls.count()).toEqual(0);
		});

		it('logger prints error messages', function(){
			Logger.error('hello', 'world');
			expect(console.error).toHaveBeenCalledWith(['hello', 'world']);
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
			Logger.log('hello', 'world');
			expect(console.log).toHaveBeenCalledWith(['hello', 'world']);
		});

		it('logger does not prints info messages', function(){
			Logger.info('hello', 'world');
			expect(console.info.calls.count()).toEqual(0);
		});

		it('logger does not prints warn messages', function(){
			Logger.warn('hello', 'world');
			expect(console.warn).toHaveBeenCalledWith(['hello', 'world']);
		});

		it('logger prints error messages', function(){
			Logger.error('hello', 'world');
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
			Logger.log('hello', 'world');
			expect(mockEmit.emit).toHaveBeenCalledWith('log', ['hello', 'world']);
		});

		it('emit method has called with info() method', function(){
			Logger.info('hello', 'world');
			expect(mockEmit.emit).toHaveBeenCalledWith('info', ['hello', 'world']);
		});

		it('emit method has called with warn() method', function(){
			Logger.warn('hello', 'world');
			expect(mockEmit.emit).toHaveBeenCalledWith('warn', ['hello', 'world']);
		});

		it('emit method has called with error() method', function(){
			Logger.error('hello', 'world');
			expect(mockEmit.emit).toHaveBeenCalledWith('error', ['hello', 'world']);
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