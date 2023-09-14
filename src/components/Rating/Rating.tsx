import {Dispatch, FC, PropsWithChildren, SetStateAction, useEffect, useState} from 'react';

import './Rating.css';

interface IRatingProps extends PropsWithChildren {
    isVote: boolean;
    setIsVote: Dispatch<SetStateAction<boolean>>;
    rating: number;
}

const Rating: FC<IRatingProps> = ({isVote, setIsVote, rating: initialRating = 0}) => {
    const [userRating, setUserRating] = useState(initialRating);

    useEffect(() => {
        setUserRating(initialRating);
    }, [initialRating]);

    const rate = (selectedRating: number) => {
        if (isVote) {
            return;
        }
        setUserRating(selectedRating);
        setIsVote(true);
    };

    const handleStarOver = (selectedRating: number) => {
        if (isVote) {
            return;
        }
        setUserRating(selectedRating);
    };

    const handleStarOut = () => {
        if (isVote) {
            return;
        }
        setUserRating(initialRating);
    };

    const stars = [];

    for (let i = 0; i < 10; i++) {
        let className = 'star-rating__star';

        if (userRating !== null && userRating >= i) {
            className += ' is-selected';
        }

        stars.push(
            <label
                key={i}
                className={className}
                onClick={() => rate(i)}
                onMouseOver={() => handleStarOver(i)}
                onMouseOut={handleStarOut}
            >
                ★
            </label>
        );
    }

    return <div className="star-rating">{stars}</div>;
};

export {Rating};