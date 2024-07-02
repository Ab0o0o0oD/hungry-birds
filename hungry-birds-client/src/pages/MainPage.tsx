import React, { useEffect, useState } from 'react';
import { CheckoutButton } from '../components/buttons/checkout/CheckoutButton';
import { Cart } from '../components/cart/Cart';
import { CheckoutModal } from '../components/checkout-modal/CheckoutModal';
import { MenyCard } from '../components/meny-card/MenyCard';
import { products } from '../constant/products';
import { useItem } from '../state/ItemContext';
import styles from './main-page.module.scss';

export const MainPage: React.FC = () => {
  const { state, dispatch } = useItem();
  const [isOpenCheckoutModal, setIsOpenCheckoutModal] =
    useState<boolean>(false);

  // eslint-disable-next-line
  useEffect(() => dispatch({ type: 'updateTotalPrice' }), [state.cartItems]);

  useEffect(() => {
    if (state.cartItems.length === 0 && isOpenCheckoutModal) {
      setIsOpenCheckoutModal(false);
    }
    //eslint-disable-next-line
  }, [state.cartItems]);
  return (
    <div className={styles.mainPageContainer}>
      <div className={styles.menyWrapper}>
        <div className={styles.menyItemsWrapper}>
          <div className={styles.menyItems}>
            {products.map((product) => (
              <MenyCard
                key={product.id}
                product={product}
                onClick={() =>
                  dispatch({ type: 'addToCart', product: product })
                }
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.cartWrapper}>
        {state.cartItems && <Cart cartItems={state.cartItems} />}
      </div>
      {state.cartItems.length > 0 && (
        <div className={styles.checkoutButtonSm}>
          <CheckoutButton
            onClick={() => setIsOpenCheckoutModal(!isOpenCheckoutModal)}
          />
        </div>
      )}
      <CheckoutModal
        isOpenCheckoutModal={isOpenCheckoutModal}
        setIsOpenCheckoutModal={setIsOpenCheckoutModal}
      />
    </div>
  );
};

