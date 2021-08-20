import axios from 'axios';
import {API_HOST} from '../../config';
import {getData, showMessage} from '../../utils';

export const getOrders = () => dispatch => {
  getData('token').then(response => {
    axios
      .get(`${API_HOST.url}/transaction`, {
        headers: {
          Authorization: response.value,
        },
      })
      .then(response => {
        dispatch({type: 'SET_ORDERS', value: response.data.data.data});
      })
      .catch(() => {
        showMessage('Something When Wrong');
      });
  });
};

export const getInProgress = () => dispatch => {
  getData('token').then(response => {
    axios
      .all([
        axios.get(`${API_HOST.url}/transaction?status=PENDING`, {
          headers: {
            Authorization: response.value,
          },
        }),
        axios.get(`${API_HOST.url}/transaction?status=SUCCESS`, {
          headers: {
            Authorization: response.value,
          },
        }),
        axios.get(`${API_HOST.url}/transaction?status=ON_DELIVERY`, {
          headers: {
            Authorization: response.value,
          },
        }),
      ])
      .then(
        axios.spread((response1, response2, response3) => {
          const pending = response1.data.data.data;
          const success = response2.data.data.data;
          const onDelivery = response3.data.data.data;

          dispatch({
            type: 'SET_IN_PROGRESS',
            value: [...pending, ...success, ...onDelivery],
          });
        }),
      )
      .catch(() => {
        showMessage('Something When Wrong');
      });
  });
};

export const getPastOrders = () => dispatch => {
  getData('token').then(response => {
    axios
      .all([
        axios.get(`${API_HOST.url}/transaction?status=CANCELLED`, {
          headers: {
            Authorization: response.value,
          },
        }),
        axios.get(`${API_HOST.url}/transaction?status=DELIVERED`, {
          headers: {
            Authorization: response.value,
          },
        }),
      ])
      .then(
        axios.spread((response1, response2) => {
          const cancelled = response1.data.data.data;
          const delivered = response2.data.data.data;
          dispatch({
            type: 'SET_PAST_ORDERS',
            value: [...cancelled, ...delivered],
          });
        }),
      )
      .catch(() => {
        showMessage('Something When Wrong');
      });
  });
};
