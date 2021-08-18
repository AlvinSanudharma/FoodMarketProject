const initialOrderState = {
  orders: [],
  inProgress: [],
  pastOrders: [],
};

export function orderReducer(state = initialOrderState, action) {
  switch (action.type) {
    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.value,
      };
    case 'SET_IN_PROGRESS':
      return {
        ...state,
        inProgress: action.value,
      };
    case 'SET_PAST_ORDERS':
      return {
        ...state,
        pastOrders: action.value,
      };
    default:
      return state;
  }
}
