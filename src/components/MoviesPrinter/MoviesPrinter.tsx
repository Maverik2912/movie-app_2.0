import {FC} from "react";

import {IMovie} from "../../interfaces";
import {useAppSelector} from "../../hooks";
import styles from './MoviesPrinter.module.css';
import {genId} from "../../utils";
import {PosterPreview} from "../PosterPreview";

interface IMoviesPrinterComponentProps {
    movies: IMovie[];
}

const MoviesPrinter: FC<IMoviesPrinterComponentProps> = ({movies}) => {
    const {isDark} = useAppSelector(store => store.theme);

    return (
        <div className={styles.gridContainer}>
            {movies.map(movie => {
                return (
                    <div key={genId(4)}>
                        <PosterPreview key={movie.id} movie={movie}/>
                        <h2 key={genId(4)}
                            className={`${styles.movieTitle} ${isDark ? styles.dark : styles.light}`}>{movie.title || movie.name}</h2>
                    </div>
                )
            })
            }
        </div>
    );
};

export {MoviesPrinter};