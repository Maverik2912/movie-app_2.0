import {FC, PropsWithChildren} from 'react';

import styles from './Trailer.module.css';
interface ITrailerProps extends PropsWithChildren {
    src: string;
}

const Trailer: FC<ITrailerProps> = ({src}) => {
     return (
         <div>
             <h2 className={styles.title}>Official Trailer</h2>
             <iframe className={styles.video} width="560" height="315" src={src} allowFullScreen></iframe>
         </div>
    );
};

export {Trailer};