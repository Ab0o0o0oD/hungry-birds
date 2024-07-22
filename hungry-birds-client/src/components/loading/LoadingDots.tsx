
import styles from './loading-dots.module.scss'
export default function LoadingDots() {
    return (
        <>
            <div className={styles.loadingDots}>
                <span className={styles.loadingDot}></span>
                <span className={styles.loadingDot}></span>
                <span className={styles.loadingDot}></span>
            </div>
        </>
    )
}