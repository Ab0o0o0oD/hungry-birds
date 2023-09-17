import React, { useEffect, useRef, useState } from 'react';
import { CartItem } from '../types';
import { CartItemComponent } from '../components/CartItem';
import styles from './cart.module.css';
import { useItem } from '../state/ItemContext';
import { CheckoutButton } from '../components/CheckoutButton';
import { CheckoutModal } from './CheckoutModal';
interface CartItemProps {
  cartItems: CartItem[];
}

export const Cart: React.FC<CartItemProps> = ({ cartItems }: CartItemProps) => {
  const { state } = useItem();
  const [isOpenCheckoutModal, setIsOpenCheckoutModal] =
    useState<boolean>(false);

  const scrollingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    scrollingRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  });
  return (
    <div className={styles.cartContainer}>
      {state.cartItems.length === 0 ? (
        <div className={styles.emptyCartWrapper}>
          <img className={styles.cartImg} src="./assets/cart.png" alt="cart" />
          <h5>Handelkurven er tom</h5>
        </div>
      ) : (
        <div className={styles.cartItemsHeader}>
          <h2>Din bestilling</h2>
          <h3>VARER:</h3>
        </div>
      )}
      <div className={styles.cartItemsWrapper}>
        {cartItems.map(
          (cartItem: CartItem, index: number) =>
            cartItem &&
            cartItem.quantity > 0 && (
              <CartItemComponent key={index} product={cartItem.product} />
            ),
        )}
        <div ref={scrollingRef}></div>
      </div>
      {state.cartItems.length > 0 && (
        <div className={styles.toPaymentBtnLg}>
          <CheckoutButton
            onClick={() => setIsOpenCheckoutModal(!isOpenCheckoutModal)}
          />
          <CheckoutModal
            isOpenCheckoutModal={isOpenCheckoutModal}
            setIsOpenCheckoutModal={setIsOpenCheckoutModal}
          />
        </div>
      )}
    </div>
  );
};
