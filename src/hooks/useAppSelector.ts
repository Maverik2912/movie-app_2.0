import {TypedUseSelectorHook, useSelector} from "react-redux";

import {AppRootState} from "../redux";

const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

export {
    useAppSelector
}