import React from 'react';
import { CartItem, Product } from '../types';
import styles from './plus-minus-button.module.css';
import { useItem } from '../state/ItemContext';

interface PlusMinusButtonProps {
  product: Product;
}

export const PlusMinusButton: React.FC<PlusMinusButtonProps> = ({
  product,
}) => {
  const { state, dispatch } = useItem();

  return (
    state.cartItems && (
      <div className={styles.plusMinusButton}>
        <button
          className={styles.minusButton}
          onClick={() => dispatch({ type: 'decrement', product: product })}
        >
          <span className="minus">-</span>
        </button>
        <span className={styles.quantity}>
          {
            state.cartItems.find(
              (value: CartItem) => value.product.id === product.id,
            )?.quantity
          }
        </span>
        <button
          className={styles.plusButton}
          onClick={() => dispatch({ type: 'increment', product: product })}
        >
          +
        </button>
      </div>
    )
  );
};
