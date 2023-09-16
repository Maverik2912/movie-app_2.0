import {useNavigate} from "react-router-dom";
import {FC, PropsWithChildren} from 'react';

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {IMovie} from "../../../interfaces";
import styles from './FoundMovie.module.css';
import {headerActions} from "../../../redux";
interface IFoundedMovieProps extends PropsWithChildren {
    movie: IMovie
}

const FoundMovie: FC<IFoundedMovieProps> = ({movie}) => {
    const {isDark} = useAppSelector(store => store.theme);
    const {selectedValue} = useAppSelector(store => store.header);

    const dispatch = useAppDispatch();

    const mark: number = +movie.vote_average.toFixed(1);

    const navigate = useNavigate();
    const handleClick = (id: number): void => {
        selectedValue.genre && dispatch(headerActions.setSelectGenre(''));
        selectedValue.time && dispatch(headerActions.setSelectTime(''));
        navigate(`/movies/${id}`);
    }
    return (
        <li onClick={() => handleClick(movie.id)} className={`${styles.movieItem} ${isDark ? styles.dark : styles.light}`}>
            {movie.title} <span
            className={`${isDark ? styles.dark : styles.light} ${mark >= 7 ? styles.green : mark < 7 && mark > 5 ? styles.gray : styles.red}`}>{mark}</span>
        </li>
    );
};

export {FoundMovie};