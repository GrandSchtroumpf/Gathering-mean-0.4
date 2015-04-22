'use strict';

angular.module('flashcards').directive('script', function(){
    return {
        restrict: 'E',
        scope: false,
        link: function(scope, elem, attr) {
            if (attr.class === 'javascript-lazy') {
                var code = elem.text();
                /*jslint evil: true */      //prevent jslint to throw error
                var f = new Function(code);
                f();
            }
        }
    };
});
