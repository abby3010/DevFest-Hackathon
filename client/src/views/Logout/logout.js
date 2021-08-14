import { useCallback } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Logout() {
    const dispatch = useDispatch();
    const history = useHistory();

    const logout = useCallback(() => {
        dispatch({ type: "LOGOUT" });

        history.push('/auth');
    }, [history, dispatch]);

    return logout;

}