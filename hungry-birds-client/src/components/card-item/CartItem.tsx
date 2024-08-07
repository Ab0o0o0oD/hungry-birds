import React from 'react';
import styles from './cart-item.module.scss';
import { PlusMinusButton } from '../buttons/plus-minus-button/PlusMinusButton';
import { PrimaryButton } from '../buttons/primary-button/PrimaryButton';
import { useItem } from '../../state/ItemContext';
import { Product } from '../../type/product';

interface CartItemProps {
  product: Product;
}

export const CartItemComponent: React.FC<CartItemProps> = ({
  product,
}: CartItemProps) => {
  const { dispatch } = useItem();
  return (
    <div className={styles.cartItemWrapper}>
      <div className={styles.description}>
        <h4 className={styles.title}>{product.title}</h4>
        <p className={styles.addon}>Addons</p>
      </div>
      <div className={styles.buttons}>
        <PlusMinusButton product={product} />
        <div className={styles.deleteBtnWrapper}>
          <PrimaryButton
            text={'Slett'}
            color={'secondary'}
            onClick={() =>
              dispatch({ type: 'deleteFromCart', product: product })
            }
          />
        </div>
      </div>
    </div>
  );
};
