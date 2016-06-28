// var logger = new LoggerPro.BaseLogger;
// var rotLogger = new LoggerPro.RotatingLogger();

BaseLogger.init({
	level: 'log', //set all level to true
    enabled: true //enables logger
});

RotatingLogger.init({
	level: 'log', //set all level to true
    enabled: true //enables logger
})

var log = function(){
	BaseLogger.log('pio');
	RotatingLogger.log('pio');
}

var info = function(){
	BaseLogger.info('pio');
	RotatingLogger.info('pio');
}

var table = function(){
	BaseLogger.table('pio');
	RotatingLogger.table('pio');
}

var warn = function(){
	BaseLogger.warn('pio');
	RotatingLogger.warn('pio');
}

var error = function(){
	BaseLogger.error('pio');
	RotatingLogger.error('pio');
}

var enable = function(){
	BaseLogger.init({
		enabled: true
	});

	RotatingLogger.init({
		enabled:true
	});
}
var disable = function(){
	BaseLogger.init({
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