import { GET_REQUEST, GET_SUCCESS, GET_FAIL } from "../actions";

const orderPageReducer = (state, action) => {
  switch (action.type) {
    case GET_REQUEST:
      return { ...state, loading: true, error: '' };
    case GET_SUCCESS:
      return { ...state, order: action.payload, loading: false, error: '' };
    case GET_FAIL:
      return { ...state, loading: false, error: action.payload, };
    default:
      return state;
  }
};

export default orderPageReducer;