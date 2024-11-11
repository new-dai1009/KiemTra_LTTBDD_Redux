const initialState = {
    cartItems: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const existingItemIndex = state.cartItems.findIndex(
          item => item.id === action.payload.id
        );
  
        if (existingItemIndex >= 0) {
          const updatedCart = [...state.cartItems];
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity + 1,
          };
          return {
            ...state,
            cartItems: updatedCart,
          };
        }
  
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
  
      default:
        return state;
    }
  };
  
  export default cartReducer;
  