import React from 'react';
import styles from './primary-button.module.scss';

interface PrimaryButtonProps {
  text: string;
  onClick: (e: any) => void;
  color: 'primary' | 'secondary';
}
export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  onClick,
  color,
  ...rest
}) => {
  return (
    <div className={styles.btnWrapper}  {...rest}>
      <button
        className={`${styles.btn} ${styles[color]}`}
        onClick={(e) => onClick(e)}
      >
        {text}
      </button>
    </div>
  );
};
