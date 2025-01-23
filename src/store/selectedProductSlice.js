"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearSelectedProduct = exports.setSelectedProduct = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var selectedProductSlice = (0, toolkit_1.createSlice)({
    name: 'selectedProduct',
    initialState: {},
    reducers: {
        setSelectedProduct: function (state, action) {
            return action.payload;
        },
        clearSelectedProduct: function () {
            return {};
        }
    }
});
exports.setSelectedProduct = (_a = selectedProductSlice.actions, _a.setSelectedProduct), exports.clearSelectedProduct = _a.clearSelectedProduct;
exports.default = selectedProductSlice.reducer;
