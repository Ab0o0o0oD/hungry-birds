import React from 'react';
import styles from './plus-minus-button.module.scss';
import { useItem } from '../../../state/ItemContext';
import { Product } from '../../../type/product';
import { CartItem } from '../../../type/cartItem';

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
