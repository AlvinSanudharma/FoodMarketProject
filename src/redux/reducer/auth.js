const initialRegisterState = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
};

const initPhotoState = {
  uri: '',
  type: '',
  name: '',
  isUploadPhoto: false,
};

export function registerReducer(state = initialRegisterState, action) {
  switch (action.type) {
    case 'SET_REGISTER':
      return {
        ...state,
        name: action.value.name,
        email: action.value.email,
        password: action.value.password,
        password_confirmation: action.value.password,
      };
    default:
      return state;
  }
}

export function photoReducer(state = initPhotoState, action) {
  switch (action.type) {
    case 'SET_PHOTO':
      return {
        ...state,
        uri: action.value.uri,
        type: action.value.type,
        name: action.value.name,
      };
    case 'SET_UPLOAD_STATUS':
      return {
        ...state,
        isUploadPhoto: action.value,
      };

    default:
      return state;
  }
}
