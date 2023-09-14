import {useLoaderData} from "react-router-dom";
import {useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {IMovie, IVideo} from "../../interfaces";
import {moviesActions} from "../../redux";
import {Rating} from "../Rating";
import {Trailer} from "../Trailer";
import {MovieDetails} from "../MovieDetails";
import {Carousel} from "../Carousel";
import {trailerURL} from "../../constants";
import styles from './MoviesInfo.module.css';

interface IMoviesInfoData {
    movie: IMovie;
    similarMovies: IMovie[],
    videos: IVideo[]
}

const MovieInfo = () => {
    const {videos: movieVideos, movie, similarMovies: similar} = useLoaderData() as IMoviesInfoData;

    const {isDark} = useAppSelector(store => store.theme);
    const {currentMovie, videos, similarMovies} = useAppSelector(store => store.movies);

    const dispatch = useAppDispatch();

    const [isVote, setIsVote] = useState<boolean>(false);
    const [votes, setVotes] = useState<number>(0);

    const trailer = [...videos].filter(video => video.name === 'Official Trailer');
    const movieTitle = currentMovie && (currentMovie.title || currentMovie.name);

    useEffect(() => {
        if(currentMovie) {
            setVotes(currentMovie.vote_count && currentMovie.vote_count);
        }
    }, [currentMovie]);

    useEffect(() => {
        if (isVote) {
            setVotes(prev => ++prev);
        }
        dispatch(moviesActions.setCurrentMovie(movie));
        dispatch(moviesActions.setSimilarMovies(similar));
        dispatch(moviesActions.setVideos(movieVideos))
    }, [isVote, dispatch, setIsVote, movie, similar, movieVideos]);

    return (
        <>
            { currentMovie &&
                <div className={styles.mainContainer}>
                <h1 className={styles.title}>{movieTitle}</h1>
                <MovieDetails/>
                {currentMovie.overview &&
                    <div className={styles.about}>
                        <h2 className={styles.subtitle}>About movie "{movieTitle}"</h2>
                        <div className={styles.dscr}>{currentMovie.overview}</div>
                    </div>
                }
                {trailer.length !== 0 && <Trailer src={`${trailerURL}${trailer[0].key}`}/>}
                <div className={styles.vote_rating}>
                    <h3>{isVote ? 'Thanks for your vote!' : 'Rate the movie:'}</h3>
                    <div className={styles.ratingContainer}>
                        <Rating
                            isVote={isVote}
                            setIsVote={setIsVote}
                            rating={currentMovie.vote_average ? Math.round(+currentMovie.vote_average - 1) : 0}/>
                        {currentMovie.vote_average !== null && currentMovie.vote_average !== undefined &&
                            <p><b
                                className={`${styles.rating} ${isDark && styles.dark}`}>{currentMovie.vote_average.toFixed(1)}</b> ({votes})
                            </p>
                        }
                    </div>
                </div>
            </div>
            }
            {similarMovies.length ?
                <div className={styles.similar}>
                    <Carousel movies={similarMovies} title='Similar movies' translateX='88%'/>
                </div>
                : <></>
            }
        </>
    );
};

export {MovieInfo};