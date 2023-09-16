import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {headerActions} from "../../../redux";
import {links} from "../../../constants";
import '../Select.css';

const GenreSelect = () => {
    const {isDark} = useAppSelector(store => store.theme);
    const {selectedValue} = useAppSelector(store => store.header);
    const {genres} = useAppSelector(store => store.movies);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedValue.genre) {
            const genreItem = genres.find((genre) => genre.id === +selectedValue.genre);
            if (genreItem) {
                navigate(`${links.GENRES}/${genreItem.name}/${selectedValue.genre}`);
            }
        }
    }, [genres, selectedValue.genre, dispatch, navigate]);


    const changeHandler = (e: SelectChangeEvent) => {
        dispatch(headerActions.setSelectGenre(e.target.value));
        dispatch(headerActions.setSelectTime(''));
    };

    return (
        <FormControl
            sx={{ m: 1, minWidth: 120 }}
            size="small"
            className={`custom-form-control ${isDark ? 'dark' : 'light'}`}
        >
            <InputLabel className={isDark ? 'dark' : 'light'} id="demo-select-small-label">
                All genres
            </InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={selectedValue.genre || ''}
                onChange={changeHandler}
                label="All genres"
            >
                {genres.map((genre) => (
                    <MenuItem key={genre.name} value={genre.id.toString()}>
                        {genre.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export {GenreSelect};