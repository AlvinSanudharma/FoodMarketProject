import axios from 'axios';
import {API_HOST} from '../../config';
import {showMessage} from '../../utils';

export const getFoodData = () => dispatch => {
  axios
    .get(`${API_HOST.url}/food`)
    .then(response => {
      dispatch({type: 'SET_FOOD', value: response.data.data.data});
    })
    .catch(() => {
      showMessage('Data List Produk Gagal Diambil!');
    });
};

export const getFoodDataByTypes = types => dispatch => {
  axios
    .get(`${API_HOST.url}/food?types=${types}`)
    .then(response => {
      if (types === 'new_food') {
        dispatch({type: 'SET_NEW_TASTE', value: response.data.data.data});
      } else if (types === 'popular') {
        dispatch({type: 'SET_POPULAR', value: response.data.data.data});
      } else if (types === 'recommended') {
        dispatch({type: 'SET_RECOMMENDED', value: response.data.data.data});
      }
    })
    .catch(() => {
      showMessage('Data List Produk Gagal Diambil!');
    });
};
