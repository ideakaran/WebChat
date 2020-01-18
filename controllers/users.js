'use strict';

module.exports = function(_){
    return {
        setRouting: function(router) {
            //route to index path
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp)
        }, 

        indexPage: function(req, res) {
            return res.render('index');
        },

        getSignUp: function(req, res) {
            return res.render('signup');
        }
    }
}