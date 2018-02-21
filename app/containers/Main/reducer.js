import { ADD_BLOCK, BLOCK_ADDED, ERROR } from "./constants";

const initialState = {
  blocks: [],
  addBlockLoading: false,
  error: undefined,
};

function blockchainReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BLOCK:
      return Object.assign({}, state, { blocks: [...state.blocks, action.transaction] });
    case BLOCK_ADDED:
      return state
        .set('addBlockLoading', false);
    case ERROR:
      return state
        .set('addBlockLoading', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default blockchainReducer;