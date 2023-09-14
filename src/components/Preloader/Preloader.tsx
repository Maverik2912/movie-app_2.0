import styles from './Preloader.module.css';

const Preloader = () => {
    return (
        <div className={styles.loaderWrapper}>
            <div className={styles.loader}></div>

            <div className={`${styles.loaderSection} ${styles.sectionLeft}`}></div>
            <div className={`${styles.loaderSection} ${styles.sectionRight}`}></div>

        </div>
    );
};

export {Preloader};