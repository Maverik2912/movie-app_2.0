import React, {FC} from "react";
import {useNavigate} from "react-router-dom";

import styles from './PosterPreview.module.css';
import {IMovie} from "../../interfaces";
import {links, posterURL} from "../../constants";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {headerActions} from "../../redux";

interface IPosterPreviewComponentProps {
    movie: IMovie;
}
const PosterPreview: FC<IPosterPreviewComponentProps> = ({movie}) => {
    const navigate = useNavigate();

    const {selectedValue} = useAppSelector(store => store.header);
    const dispatch = useAppDispatch();

    const hoverHandler = (e: React.MouseEvent<HTMLImageElement, MouseEvent>): void => {
        const target = e.target as HTMLImageElement;
        target.classList.add(styles.active);

    }
    const blurHandler = (e: React.MouseEvent<HTMLImageElement, MouseEvent>): void => {
        const target = e.target as HTMLImageElement;
        target.classList.remove(styles.active);
    }

    const clickHandler = (movieId: number) => {
        selectedValue.genre && dispatch(headerActions.setSelectGenre(''));
        selectedValue.time && dispatch(headerActions.setSelectTime(''));
        navigate(`${links.MOVIES}/${movieId}`)
    }

    return (
        <>
            {movie.poster_path && <img
                onClick={() => clickHandler(movie.id)}
                onMouseOver={hoverHandler}
                onMouseOut={blurHandler}
                className={styles.poster}
                src={`${posterURL}${movie.poster_path}`}
                alt={movie.title}/>}
        </>
    );
};

export {PosterPreview};