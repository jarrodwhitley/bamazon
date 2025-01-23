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
exports.filtersActive = exports.clearFilters = exports.updateFilters = exports.setFilters = exports.initialFiltersState = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
exports.initialFiltersState = { searchString: '', category: '', brands: [], price: '' };
var filtersSlice = (0, toolkit_1.createSlice)({
    name: 'filters',
    initialState: exports.initialFiltersState,
    reducers: {
        setFilters: function (state, action) {
            return action.payload;
        },
        updateFilters: function (state, action) {
            return __assign(__assign({}, state), action.payload);
        },
        clearFilters: function () {
            return { searchString: '', category: '', brands: [], price: '' };
        }
    }
});
exports.setFilters = (_a = filtersSlice.actions, _a.setFilters), exports.updateFilters = _a.updateFilters, exports.clearFilters = _a.clearFilters;
exports.default = filtersSlice.reducer;
exports.filtersActive = (0, toolkit_1.createSelector)(function (state) { return state.filters; }, function () { return exports.initialFiltersState; }, function (filters, initialFilters) { return JSON.stringify(filters) !== JSON.stringify(initialFilters); });
