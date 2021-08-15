import * as api from '../../../api/index';

export const likeExp = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    try {
        const { data } = await api.likeExp(id, user?.result.uid);
        dispatch({ type: 'LIKE', payload: data });
    } catch (error) {
        console.log(error);
    }

};