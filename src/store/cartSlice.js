"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setShowCart = exports.toggleCart = exports.removeItem = exports.updateItem = exports.addItem = exports.clearCart = exports.setCart = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var storedCart = JSON.parse(localStorage.getItem('cart'));
var initialCartState = storedCart
    ? { showCart: false, items: storedCart.items }
    : { showCart: false, items: [] };
var cartSlice = (0, toolkit_1.createSlice)({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        setCart: function (state, action) {
            return action.payload;
        },
        clearCart: function () {
            return { showCart: false, items: [] };
        },
        addItem: function (state, action) {
            var id = action.payload.id;
            var item = state.items.find(function (item) { return item.id === id; });
            if (item) {
                item.quantity += 1;
            }
            else {
                state.items.push(__assign(__assign({}, action.payload), { quantity: 1 }));
            }
        },
        updateItem: function (state, action) {
            var _a = action.payload, id = _a.id, quantity = _a.quantity;
            var item = state.items.find(function (item) { return item.id === id; });
            if (item) {
                item.quantity = quantity;
            }
        },
        removeItem: function (state, action) {
            state.items = state.items.filter(function (item) { return item.id !== action.payload; });
        },
        toggleCart: function (state) {
            state.showCart = !state.showCart;
        },
        setShowCart: function (state, action) {
            state.showCart = action.payload;
        }
    },
});
exports.setCart = (_a = cartSlice.actions, _a.setCart), exports.clearCart = _a.clearCart, exports.addItem = _a.addItem, exports.updateItem = _a.updateItem, exports.removeItem = _a.removeItem, exports.toggleCart = _a.toggleCart, exports.setShowCart = _a.setShowCart;
exports.default = cartSlice.reducer;
