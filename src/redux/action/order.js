import axios from 'axios';
import {API_HOST} from '../../config';
import {getData} from '../../utils';

export const getOrders = () => dispatch => {
  getData('token').then(response => {
    axios
      .get(`${API_HOST.url}/transaction`, {
        headers: {
          Authorization: response.value,
        },
      })
      .then(response => {
        // console.info(response.data);
        dispatch({type: 'SET_ORDERS', value: response.data.data.data});
      })
      .catch(error => {
        console.info(error);
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
      .catch(error => {
        console.info(error);
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
          // console.info(response1.data);
          // console.info(response2.data);
          const cancelled = response1.data.data.data;
          const delivered = response2.data.data.data;
          dispatch({
            type: 'SET_PAST_ORDERS',
            value: [...cancelled, ...delivered],
          });
        }),
      )
      .catch(error => {
        console.info(error);
      });
  });
};
