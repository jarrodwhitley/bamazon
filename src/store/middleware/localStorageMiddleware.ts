const localStorageMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
    const result = next(action)

    const state = storeAPI.getState()
    if (action.type.startsWith('cart/')) {
        localStorage.setItem('cart', JSON.stringify(state.cart))
    }

    return result
}
