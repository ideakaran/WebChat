'use strict';

module.exports = function(_){
    return {
        setRouting: function(router) {
            //route to index path
            router.get('/', this.indexPage);
        }, 

        indexPage: function(req, res) {
            return res.render('index', {test: 'This is a test'});
        }
    }
}