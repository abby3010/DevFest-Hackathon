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

export const deleteExp = (id, history) => async (dispatch) => {
    try {
        await api.deleteExp(id)
        dispatch({ type: 'DELETE', payload: id })
        history.push('/app/forum')
    } catch (error) {
        console.log(error)
    }
}