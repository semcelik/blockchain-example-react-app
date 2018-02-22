import { ADD_BLOCK, BLOCK_ADDED, BLOCKS_LOADED, ERROR, LOAD_BLOCKS, LOADING } from "./constants";

export function loadBlocks() {
  return {
    type: LOAD_BLOCKS,
  }
}
export function blocksLoaded(blocks) {
  return {
    type: BLOCKS_LOADED,
    blocks,
  }
}

export function addBlock(transaction) {
  return {
    type: ADD_BLOCK,
    transaction,
    loading: true,
  };
}

export function blockAdded(block) {
  return {
    type: BLOCK_ADDED,
    block,
    loading: false,
  };
}

export function setLoading(loading) {
  return {
    type: LOADING,
    loading,
  }
}

export function error(error) {
  return {
    type: ERROR,
    error,
  }
}