import {FC, PropsWithChildren, useState} from "react";

import styles from './Carousel.module.css';
import {IMovie} from "../../interfaces";
import {useAppSelector} from "../../hooks";
import {PosterPreview} from "../PosterPreview";

interface ICarouselComponentProps extends PropsWithChildren {
    movies: IMovie[];
    title: string;
    translateX: string;
}

const Carousel: FC<ICarouselComponentProps> = ({movies, title, translateX}) => {
    const {isDark} = useAppSelector(store => store.theme);

    const [sliderIndex, setSliderIndex] = useState<number>(0);

    const handlePrev = (): void => {
        setSliderIndex(prev => prev === 0 ? 0 : prev - 1)
    }

    const handleNext = (): void => {
        const moviesWithPoster: IMovie[] = [...movies].filter(movie => movie.poster_path);
        const countOfSlides: number = Math.floor(moviesWithPoster.length / 8)
        setSliderIndex(prev => prev === countOfSlides ? prev : prev + 1);
    }

    return (
        <div className={styles.carousel}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.container}>
                <div className={`${styles.handleContainer} ${isDark ? styles.dark : styles.light}`}>
                    <button onClick={handlePrev} className={`${styles.handle} ${styles.leftHandle}`}>
                        <div className={styles.text}>&#8249;</div>
                    </button>
                    <button onClick={handleNext}
                            className={`${styles.handle} ${styles.rightHandle}`}>
                        <div className={styles.text}>&#8250;</div>
                    </button>
                </div>
                <div className={styles.slider} style={{transform: `translateX(calc(${sliderIndex} * -${translateX})`}}>
                    {movies.map(movie => <PosterPreview key={movie.id} movie={movie}/>)}
                </div>
            </div>
        </div>
    );
};

export {Carousel};