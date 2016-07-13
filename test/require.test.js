var Logger = require('../src/main.js').Logger;
var RotatingLogger = require('../src/main.js').RotatingLogger;

describe('Require test -', function () {

    it('Require should work', function(){
        expect(Logger).toBeDefined();
        expect(RotatingLogger).toBeDefined();
    });

})