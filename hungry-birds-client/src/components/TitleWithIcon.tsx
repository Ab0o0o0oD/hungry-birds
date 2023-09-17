import React, { ReactNode } from 'react';
import styles from './title-with-icon.module.css';

interface TitleWithIconProps {
  title: string;
  icon: ReactNode;
  className?: string;
}

export const TitleWithIcon: React.FC<TitleWithIconProps> = ({
  title,
  icon,
  className,
}: TitleWithIconProps) => {
  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>
      <i className={styles.icon}>{icon}</i>
      <h5 className={styles.title}>{title}</h5>
    </div>
  );
};
