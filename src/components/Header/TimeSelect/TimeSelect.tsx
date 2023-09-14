import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {headerActions} from "../../../redux";
import {links, options} from "../../../constants";
import '../Select.css';

const TimeSelect = () => {
    const {isDark} = useAppSelector(store => store.theme);
    const {selectedValue} = useAppSelector(store => store.header);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedValue.time) {
            navigate(`${links.TIME}/${selectedValue.time}`);
        }
    }, [selectedValue.time, dispatch, navigate]);

    const changeHandler = (e: SelectChangeEvent) => {
        dispatch(headerActions.setSelectTime(e.target.value));
        dispatch(headerActions.setSelectGenre(''));
    };

    return (
        <FormControl
            sx={{ m: 1, minWidth: 120 }}
            size="small"
            className={`custom-form-control ${isDark ? 'dark' : 'light'}`}
        >
            <InputLabel className={isDark ? 'dark' : 'light'} id="demo-select-small-label">
                All times
            </InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={selectedValue.time || ''}
                onChange={changeHandler}
                label="All times"
            >
                {options.map((option) => (
                    <MenuItem key={option.name} value={option.id.toString()}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export {TimeSelect};