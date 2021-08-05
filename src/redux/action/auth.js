import axios from 'axios';
import {showMessage, storeData} from '../../utils';
import {setLoading} from './global';

const API_HOST = {
  url: 'http://server-foodmarket.web.id/api',
};

export const signUpAction =
  (dataRegister, photoReducer, navigation) => dispatch => {
    axios
      .post(`${API_HOST.url}/register`, dataRegister)
      .then(response => {
        const token = `${response.data.data.token_type} ${response.data.data.access_token}`;
        const profile = response.data.data.user;

        storeData('token', {value: token});

        if (photoReducer.isUploadPhoto) {
          const photoForUpload = new FormData();
          photoForUpload.append('file', photoReducer);

          axios
            .post(`${API_HOST.url}/user/photo`, photoForUpload, {
              headers: {
                Authorization: token,
                'Content-Type': `multipart/form-data`,
              },
            })
            .then(response => {
              profile.profile_photo_url = `http://server-foodmarket.web.id/storage/${response.data.data[0]}`;

              storeData('userProfile', profile);
              navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
            })
            .catch(() => {
              showMessage('Upload Photo Gagal');
              navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
            });
        } else {
          storeData('userProfile', profile);
          navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
        }
        dispatch(setLoading(false));
      })
      .catch(error => {
        dispatch(setLoading(false));

        showMessage(error?.response?.data?.data?.message);
      });
  };

export const signInAction = (form, navigation) => dispatch => {
  dispatch(setLoading(true));

  axios
    .post(`${API_HOST.url}/login`, form)
    .then(function (response) {
      const token = `${response.data.data.token_type} ${response.data.data.access_token}`;
      const profile = response.data.data.user;

      dispatch(setLoading(false));

      storeData('token', {value: token});
      storeData('userProfile', profile);

      navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
    })
    .catch(function (error) {
      dispatch(setLoading(false));

      showMessage(error?.response?.data?.data?.message);
    });
};
