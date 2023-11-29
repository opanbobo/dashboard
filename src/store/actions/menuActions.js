import * as types from 'store/types';
import { fetchGet } from 'store/fetch';

export const getAdminMenu = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_MENU_LIST,
			});
			const userToken = JSON.parse(localStorage.getItem('userToken'));

			let data = await fetchGet('admin/menu/list/', userToken.token, body);

			data = await data.json();

			dispatch({
				type: types.LOAD_MENU_LIST_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_MENU_LIST_ERROR,
				result: err,
			});
		}
	};
};
