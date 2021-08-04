import axios from 'axios';
import {showMessage} from '../../utils';
import {setLoading} from './global';

const API_HOST = {
  url: 'http://server-foodmarket.web.id/api',
};

export const signUpAction =
  (dataRegister, photoReducer, navigation) => dispatch => {
    axios
      .post(`${API_HOST.url}/register`, dataRegister)
      .then(response => {
        if (photoReducer.isUploadPhoto) {
          const photoForUpload = new FormData();
          photoForUpload.append('file', photoReducer);

          axios
            .post(`${API_HOST.url}/user/photo`, photoForUpload, {
              headers: {
                Authorization: `${response.data.data.token_type} ${response.data.data.access_token}`,
                'Content-Type': `multipart/form-data`,
              },
            })
            .then(response => {
              console.info(response);
            })
            .catch(() => {
              showMessage('Upload Photo Gagal');
            });

          dispatch(setLoading(false));
          navigation.replace('SuccessSignUp');
        }
      })
      .catch(error => {
        dispatch(setLoading(false));

        showMessage(error?.response?.data?.data?.message);
      });
  };
