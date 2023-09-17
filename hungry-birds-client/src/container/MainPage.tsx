import React, { useEffect, useState } from 'react';
import { MenyCard } from '../components/MenyCard';
import styles from './main-page.module.css';
import { Product } from '../types';
import { useItem } from '../state/ItemContext';
import { Cart } from './Cart';
import { CheckoutButton } from '../components/CheckoutButton';
import { CheckoutModal } from './CheckoutModal';

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

const products: Product[] = [
  {
    id: 1,
    cat: 's',
    title: 'SHAWARMA I RULL',
    content: 'Agurk, chicken',
    price: 120,
    allergier: 'Allergier: gluten',
    img: './assets/shawarmarull.jpg',
  },
  {
    id: 2,
    cat: 's',
    title: 'SHAWARMA TALLARKEN',
    content: 'Agurk, chicken',
    price: 140,
    allergier: 'Allergier: gluten',
    img: './assets/shawrma-arabi.jpeg',
  },
  {
    id: 3,
    cat: 's',
    title: 'HUNGRY BIRDS ',
    content: 'Agurk, chicken',
    price: 165,
    allergier: 'Allergier: gluten',
    img: './assets/hungry-birds.png',
  },
  {
    id: 4,
    cat: 'c',
    title: 'CRISPY CHICKEN RULL',
    content: 'Agurk, chicken',
    price: 100,
    allergier: 'Allergier: gluten',
    img: './assets/cripsy-rull.png',
  },
  {
    id: 5,
    cat: 'c',
    title: 'CRISPY SNACK BOX',
    content: 'Agurk, chicken',
    price: 100,
    allergier: 'Allergier: gluten',
    img: './assets/crispy-snack-box.jpeg',
  },
  {
    id: 6,
    cat: 'c',
    title: 'CRIPSY BOX',
    content: 'Agurk, chicken',
    price: 100,
    allergier: 'Allergier: gluten',
    img: './assets/cripsy-box.jpg',
  },
  {
    id: 7,
    cat: 'c',
    title: 'CRIPSY BURGER',
    content: 'Agurk, chicken',
    price: 100,
    allergier: 'Allergier: gluten',
    img: './assets/crispy-burger.jpg',
  },
  {
    id: 8,
    cat: 'v',
    title: 'FALAFEL RULL',
    content: 'Agurk, chicken',
    price: 100,
    allergier: 'Allergier: gluten',
    img: './assets/falafel-rull.jpeg',
  },
];
