import React, { useReducer } from 'react';
import { CartItem, Product } from '../types';
import {
  addToCart,
  updateTotalPrice,
  decrementItem,
  deleteFromCart,
  incrementItem,
} from './ActionsGenerator';

type Action =
  | { type: 'addToCart'; product: Product }
  | { type: 'deleteFromCart'; product: Product }
  | { type: 'increment'; product: Product }
  | { type: 'decrement'; product: Product }
  | { type: 'updateTotalPrice' };
type Dispatch = (action: Action) => void;
type State = {
  cartItems: CartItem[];
  totalPrice: number;
};
type ItemProviderProps = { children: React.ReactNode };

const ItemStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>({ state: { cartItems: [], totalPrice: 0 }, dispatch: (action) => action });

export const itemsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'addToCart': {
      return {
        cartItems: addToCart(state.cartItems, action.product),
        totalPrice: state.totalPrice,
      };
    }
    case 'deleteFromCart': {
      return {
        cartItems: deleteFromCart(state.cartItems, action.product),
        totalPrice: state.totalPrice,
      };
    }
    case 'increment': {
      return {
        cartItems: incrementItem(state.cartItems, action.product),
        totalPrice: state.totalPrice,
      };
    }
    case 'decrement': {
      return {
        cartItems: decrementItem(state.cartItems, action.product),
        totalPrice: state.totalPrice,
      };
    }
    case 'updateTotalPrice': {
      return {
        cartItems: state.cartItems,
        totalPrice: updateTotalPrice(state.cartItems),
      };
    }
  }
};

export const ItemProvider = ({ children }: ItemProviderProps) => {
  const [state, dispatch] = useReducer(itemsReducer, {
    cartItems: [],
    totalPrice: 0,
  });
  const value = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  return (
    <ItemStateContext.Provider value={value}>
      {children}
    </ItemStateContext.Provider>
  );
};

export const useItem = () => {
  const context = React.useContext(ItemStateContext);
  if (context === undefined) {
    throw new Error('useItem must be used within a ItemProvider');
  }
  return context;
};
