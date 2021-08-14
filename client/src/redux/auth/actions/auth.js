import { AUTH } from '../../../constants/actionTypes';
import * as api from '../../../api/index';

export const login = (formData, history, setNotif) => async (dispatch) => {
    try {
        const { data } = await api.login(formData);

        dispatch({ type: AUTH, data });

        history.push("/app");
    } catch (error) {
        setNotif({ open: true, color: "danger", message: error.response.data.message });
        setTimeout(function () {
            setNotif({ open: false, message: "" });
        }, 5000);
    }
};

export const signUp = (formData, history, setNotif) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        history.push("/setProfile");
    } catch (error) {
        setNotif({ open: true, color: "danger", message: error.response.data.message });
        setTimeout(function () {
            setNotif({ open: false, message: "" });
        }, 5000);
    }
};

export const googleAuth = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.googleAuth(formData);
        dispatch({ type: AUTH, data });
        if (data.newUser) {
            history.push("/setProfile");
        } else {
            history.push('/app');
        }
    } catch (error) {
        console.log(error);
    }
};