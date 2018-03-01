import { ADD_BLOCK, BLOCK_ADDED, BLOCKS_LOADED, ERROR, LOAD_BLOCKS } from "./constants";

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
  };
}

export function blockAdded() {
  return {
    type: BLOCK_ADDED,
  };
}

export function error(error) {
  return {
    type: ERROR,
    error,
  }
}
