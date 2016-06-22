var logger = new LoggerPro.BaseLogger();
var rotLogger = new LoggerPro.RotatingLogger();

logger.init({
	level: 'log', //set all level to true
    enabled: true //enables logger
});

rotLogger.init({
	level: 'log', //set all level to true
    enabled: true //enables logger
})

var log = function(){
	logger.log('pio');
	rotLogger.log('pio');
}

var info = function(){
	logger.info('pio');
	rotLogger.info('pio');
}

var table = function(){
	logger.table('pio');
	rotLogger.table('pio');
}

var warn = function(){
	logger.warn('pio');
	rotLogger.warn('pio');
}

var error = function(){
	logger.error('pio');
	rotLogger.error('pio');
}

var enable = function(){
	logger.init({
		enabled: true
	});

	rotLogger.init({
		enabled:true
	});
}
var disable = function(){
	logger.init({
		enabled: false
	});

	rotLogger.init({
		enabled:false
	});
}
var startRecording = function(){
	rotLogger.startRecording();
}
var endRecording = function(){
	rotLogger.endRecording();
}