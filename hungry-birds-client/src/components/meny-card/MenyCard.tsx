import React from 'react';
import styles from './meny-card.module.scss';
import { PrimaryButton } from '../buttons/primary-button/PrimaryButton';
import { PlusMinusButton } from '../buttons/plus-minus-button/PlusMinusButton';
import { useItem } from '../../state/ItemContext';
import { Product } from '../../type/product';

interface MenyCardProps {
  product: Product;
  onClick: (e: any) => void;
}

export const MenyCard: React.FC<MenyCardProps> = ({
  product,
  onClick,
}: MenyCardProps) => {
  const { state } = useItem();
  const isProductInCart = state.cartItems.some(
    (cartItem) => cartItem.product.id === product.id && cartItem.quantity > 0,
  );

  return (
    <div className={styles.menyCard}>
      <div className={styles.cardImgWrapper}>
        <picture>
          <source srcSet={product.img} media="(orientation: portrait)" />
          <img
            className={styles.productImg}
            src={product.img}
            alt="shawarma rull img"
          />
        </picture>
      </div>
      <div className={styles.cardInfoWrapper}>
        <div className={styles.cardInfo}>
          <h3>{product.title}</h3>
          <p>Innhold: {product.content}</p>
          <p>{product.allergier}</p>
          <p>{product.price} Kr</p>
        </div>
      </div>
      <div className={styles.buttonsWrapper}>
        {isProductInCart ? (
          <PlusMinusButton product={product} />
        ) : (
          <PrimaryButton
            text={'Legg til'}
            color={'primary'}
            onClick={onClick}
          />
        )}
      </div>
    </div>
  );
};
