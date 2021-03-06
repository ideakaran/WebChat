const dependable = require('dependable');
const path = require('path');

//create container
const container = dependable.container();

const dependencies = [
    ['_', 'lodash']
];

//register dependencies with container
//Todo extract the callback function to a named method (as those methods can be seen in stacktrace and helps in readability)
dependencies.forEach(function(val) {
    container.register(val[0], function(){
        return require(val[1]);
    })
});

container.load(path.join(__dirname, '/controllers'));
container.load(path.join(__dirname, '/helpers'));

//register container
container.register('container', function(){
    return container;
});

module.exports = container;

