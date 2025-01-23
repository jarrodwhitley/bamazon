"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsLoaded = exports.filteredProducts = exports.setFilteredProducts = exports.setSelectedProduct = exports.removeProduct = exports.addProduct = exports.setProducts = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var storedProducts = JSON.parse(localStorage.getItem('products'));
var initialProductsState = storedProducts || [];
var productsSlice = (0, toolkit_1.createSlice)({
    name: 'products',
    initialState: initialProductsState,
    reducers: {
        setProducts: function (state, action) {
            return action.payload;
        },
        addProduct: function (state, action) {
            state.push(action.payload);
        },
        removeProduct: function (state, action) {
            return state.filter(function (product) { return product.id !== action.payload; });
        },
        setSelectedProduct: function (state, action) {
            return action.payload || {};
        },
        setFilteredProducts: function (state, action) {
            return state.filter(function (product) { return product[action.payload.key] === action.payload.value; });
        },
    },
});
exports.setProducts = (_a = productsSlice.actions, _a.setProducts), exports.addProduct = _a.addProduct, exports.removeProduct = _a.removeProduct, exports.setSelectedProduct = _a.setSelectedProduct, exports.setFilteredProducts = _a.setFilteredProducts;
exports.default = productsSlice.reducer;
exports.filteredProducts = (0, toolkit_1.createSelector)(function (state) { return state.products; }, function (state) { return state.filters; }, function (products, filters) {
    if (filters.searchString && typeof filters.searchString === 'string' && filters.searchString.length > 3) {
        products = products.filter(function (product) { return product.title.toLowerCase().includes(filters.searchString.toLowerCase()); });
    }
    if (filters.category) {
        products = products.filter(function (product) { return filters.category === product.category; });
    }
    if (filters.brands.length > 0) {
        products = products.filter(function (product) { return filters.brands.includes(product.brand); });
    }
    if (filters.price) {
        var _a = filters.price.split('_'), min_1 = _a[0], max_1 = _a[1];
        products = products.filter(function (product) { return product.price >= min_1 && product.price <= max_1; });
    }
    return products;
});
exports.productsLoaded = (0, toolkit_1.createSelector)(function (state) { return state.products; }, function (products) { return products.length > 0; });
