
Logger.init({
	level: 'log', //set all level to true
    enabled: true, //enables logger
});

RotatingLogger.init({
	level: 'log', //set all level to true
    enabled: true //enables logger
})

var log = function(){
	Logger.log('pio');
	RotatingLogger.log('pio');
}

var info = function(){
	Logger.info('pio');
	RotatingLogger.info('pio');
}

var table = function(){
	Logger.table('pio');
	RotatingLogger.table('pio');
}

var warn = function(){
	Logger.warn('pio');
	RotatingLogger.warn('pio');
}

var error = function(){
	Logger.error('pio');
	RotatingLogger.error('pio');
}

var enable = function(){
	Logger.init({
		enabled: true
	});

	RotatingLogger.init({
		enabled:true
	});
}
var disable = function(){
	Logger.init({
		enabled: false
	});

	RotatingLogger.init({
		enabled:false
	});
}
var startRecording = function(){
	RotatingLogger.startRecording();
}
var endRecording = function(){
	RotatingLogger.endRecording();
}