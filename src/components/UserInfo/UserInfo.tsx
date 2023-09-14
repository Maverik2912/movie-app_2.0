import avatar from '../../assets/images/avatar.jpg';
import styles from './UserInfo.module.css';
const UserInfo = () => {

    return (
        <div className={styles.flexContainer}>
            <img src={avatar} alt="Avatar"/>
            <div className={styles.userName}>Mykyta Kraskovskyi</div>
        </div>
    );
};

export {UserInfo};