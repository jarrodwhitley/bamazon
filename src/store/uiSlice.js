"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearModal = exports.setModal = exports.setShowMobileSearch = exports.setShowMobileMenu = exports.setIsLoading = exports.setIsMobile = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    isMobile: false,
    isLoading: true,
    showMobileMenu: false,
    showMobileSearch: false,
    modal: null
};
var uiSlice = (0, toolkit_1.createSlice)({
    name: 'ui',
    initialState: initialState,
    reducers: {
        setIsMobile: function (state, action) {
            state.isMobile = action.payload;
        },
        setIsLoading: function (state, action) {
            state.isLoading = action.payload;
        },
        setShowMobileMenu: function (state, action) {
            state.showMobileMenu = action.payload;
        },
        setShowMobileSearch: function (state, action) {
            state.showMobileSearch = action.payload;
        },
        setModal: function (state, action) {
            state.modal = action.payload;
        },
        clearModal: function (state) {
            console.log('clearing modal');
            state.modal = null;
        }
    }
});
exports.setIsMobile = (_a = uiSlice.actions, _a.setIsMobile), exports.setIsLoading = _a.setIsLoading, exports.setShowMobileMenu = _a.setShowMobileMenu, exports.setShowMobileSearch = _a.setShowMobileSearch, exports.setModal = _a.setModal, exports.clearModal = _a.clearModal;
exports.default = uiSlice.reducer;
