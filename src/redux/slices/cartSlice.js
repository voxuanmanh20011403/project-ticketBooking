import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItem: [],
    totalAmount: 0,
    totalQuantity: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload
            const existingItem = state.cartItem.find((item => item.id === newItem.id));
            state.totalQuantity++;

            if (!existingItem) {
                state.cartItem.push({
                    id: newItem.id,
                    productName: newItem.productName,
                    imgUrl: newItem.imgUrl,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                })
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }
            state.totalAmount = state.cartItem.reduce((total, item) =>
                total + item.price * item.quantity,0
            );
            // console.log(state.totalQuantity);
            // console.log(state.cartItem);
            // console.log(newItem);

        },
        deleteItem: (state, action) => { 
            const id = action.payload;
            const existingItem = state.cartItem.find(item => item.id === id);

            if (existingItem.quantity === 1) {
                state.cartItem = state.cartItem.filter(item => item.id !== id);
                state.totalPrice--;
                state.totalQuantity--;
            }else{
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
                state.totalQuantity--;
            }
            
            state.totalAmount = state.cartItem.reduce((total, item) =>
                total + item.price * item.quantity, 0
            );
            //  console.log('132321213');
        },
        removeItem: (state, action) => { 
            const id = action.payload;
            const existingItem = state.cartItem.find(item => item.id === id);

            if (existingItem.quantity === 1) {
                state.cartItem = state.cartItem.filter(item => item.id !== id);
                state.totalPrice--;
                state.totalQuantity--;
            }else{
                state.cartItem = state.cartItem.filter(item => item.id !== id);
                existingItem.totalPrice -= existingItem.price;
                state.totalQuantity-=existingItem.quantity;
            }
            
            state.totalAmount = state.cartItem.reduce((total, item) =>
                total + item.price * item.quantity, 0
            );
            //  console.log('132321213');
        },
    }
});

export const cartActions = cartSlice.actions

export default cartSlice.reducer