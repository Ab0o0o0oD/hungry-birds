import styles from './header.module.scss';


export const Header = () => {

    return (
        <header className={styles.header}>
            <img
                className={styles.headerImg}
                src="./assets/shawarmarull.jpg"
                alt="header"
            />
            <div className={styles.logoWrapper}>
                <img className={styles.logo} src="./assets/logo.PNG" alt="logo" />
            </div>
        </header>
    )
}
