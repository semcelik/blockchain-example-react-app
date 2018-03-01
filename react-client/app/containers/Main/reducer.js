import { ADD_BLOCK, BLOCK_ADDED, BLOCKS_LOADED, ERROR, LOAD_BLOCKS, LOADING } from "./constants";

const initialState = {
  blocks: [],
  blockTableLoading: false,
  error: undefined,
};

function blockchainReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BLOCKS:
    case ADD_BLOCK:
      return Object.assign({}, state, {
        blockTableLoading: true,
      });
    case BLOCKS_LOADED:
      return Object.assign({}, state, {
        blocks: action.blocks,
        blockTableLoading: false,
      });
    case BLOCK_ADDED:
      return Object.assign({}, state, {
        blockTableLoading: false, //todo: gerekli mi burası zaten block tekrar load olacak
      });
    case ERROR:
      return Object.assign({}, state, {
        error: action.error,
        blockTableLoading: false,
      });
    default:
      return state;
  }
}

export default blockchainReducer;
