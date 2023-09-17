import { BsBasket } from 'react-icons/bs';
import React from 'react';
import styles from './checkout-button.module.css';
import { useItem } from '../state/ItemContext';

interface CheckoutButtonProps {
  onClick: () => void;
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  onClick,
}: CheckoutButtonProps) => {
  const { state } = useItem();
  const cartItemsNumber = state.cartItems
    .map((item) => item.quantity)
    .reduce((acc, currentValue) => acc + currentValue, 0);
  return (
    <div className={styles.checkoutBtnWrapper} onClick={onClick}>
      <div className={styles.cartIconWrapper}>
        <BsBasket size={25} />
        <span className={styles.orderNumbers}>{cartItemsNumber}</span>
      </div>
      <div>Til betaling</div>
      <div>{state.totalPrice} kr</div>
    </div>
  );
};
