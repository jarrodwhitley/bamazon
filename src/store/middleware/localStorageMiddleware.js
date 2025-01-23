"use strict";
var localStorageMiddleware = function (storeAPI) { return function (next) { return function (action) {
    var result = next(action);
    var state = storeAPI.getState();
    if (action.type.startsWith('cart/')) {
        localStorage.setItem('cart', JSON.stringify(state.cart));
    }
    return result;
}; }; };
