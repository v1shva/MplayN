'use strict';

angular.
module('core.auth').
factory('AuthDetails', ['rx',
    function(rx) {
        var subject = new rx.Subject();
        var data = "Initial";

        return {
            set: function set(d){
                data = d;
                subject.onNext(d);
            },
            get: function get() {
                return data;
            },
            subscribe: function (o) {
                return subject.subscribe(o);
            }
        }
    }
]);

