import React from 'react';
import styles from './primary-button.module.css';

interface PrimaryButtonProps {
  text: string;
  onClick: (e: any) => void;
  color: 'primary' | 'secondary';
}
export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  onClick,
  color,
}) => {
  return (
    <div className={styles.btnWrapper}>
      <button
        className={`${styles.btn} ${styles[color]}`}
        onClick={(e) => onClick(e)}
      >
        {text}
      </button>
    </div>
  );
};
