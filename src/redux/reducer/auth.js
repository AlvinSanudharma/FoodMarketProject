const initialRegisterState = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  address: '',
  city: '',
  houseNumber: '',
  phoneNumber: '',
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
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.value.address,
        city: action.value.city,
        houseNumber: action.value.houseNumber,
        phoneNumber: action.value.phoneNumber,
      };
    default:
      return state;
  }
}
