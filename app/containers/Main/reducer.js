import { ADD_BLOCK, BLOCK_ADDED, ERROR, LOADING } from "./constants";

const initialState = {
  blocks: [],
  addBlockLoading: false,
  error: undefined,
};

function blockchainReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BLOCK:
      return Object.assign({}, state, {
        addBlockLoading: action.loading,
      });
    case BLOCK_ADDED:
      return Object.assign({}, state, {
        blocks: [...state.blocks, action.block],
        addBlockLoading: action.loading,
      });
    case LOADING:
      return Object.assign({}, state, { addBlockLoading: action.loading });
    case ERROR:
      return state
        .set('addBlockLoading', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default blockchainReducer;