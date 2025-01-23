"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var toolkit_1 = require("@reduxjs/toolkit");
var cartSlice_1 = __importDefault(require("./store/cartSlice"));
var productsSlice_1 = __importDefault(require("./store/productsSlice"));
var selectedProductSlice_1 = __importDefault(require("./store/selectedProductSlice"));
var filtersSlice_1 = __importDefault(require("./store/filtersSlice"));
var uiSlice_js_1 = __importDefault(require("./store/uiSlice.js"));
var localStorageMiddleware = function (storeAPI) { return function (next) { return function (action) {
    var result = next(action);
    // Save cart state to localStorage
    var state = storeAPI.getState();
    if (action.type.startsWith('cart/')) {
        localStorage.setItem('cart', JSON.stringify(state.cart));
    }
    return result;
}; }; };
var store = (0, toolkit_1.configureStore)({
    reducer: {
        cart: cartSlice_1.default,
        products: productsSlice_1.default,
        selectedProduct: selectedProductSlice_1.default,
        filters: filtersSlice_1.default,
        ui: uiSlice_js_1.default,
    },
    middleware: function (getDefaultMiddleware) {
        return getDefaultMiddleware().concat(localStorageMiddleware);
    },
});
exports.default = store;
