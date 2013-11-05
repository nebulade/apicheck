'use strict';

exports = module.exports = function apiCheck(obj, api) {
    var apiClone = api.slice();
    for (var k in obj) {
        // Ignore properties and function with _Prefix
        if (!obj.hasOwnProperty(k) && k.indexOf('_') !== 0) {
            if (apiClone.indexOf(k) < 0) throw('Unexpected function \'' + k + '\'');
            if (!(obj[k] instanceof Function)) throw('Expected \'' + k + '\'  to be a function');
            apiClone.splice(apiClone.indexOf(k), 1);
        }
    }
    if (apiClone.length) throw('Expected, but missing function(s) \'' + apiClone + '\'');
};
