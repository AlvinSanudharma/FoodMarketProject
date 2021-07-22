const initialGLobalState = {
  isError: false,
  message: 'Error!',
};

export function globalReducer(state = initialGLobalState, action) {
  switch (action.type) {
    case 'SET_ERROR':
      return {
        ...state,
        isError: action.value.isError,
        message: action.value.message,
      };

    default:
      return state;
  }
}
