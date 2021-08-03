const initialRegisterState = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
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
