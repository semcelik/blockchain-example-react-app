import { ADD_BLOCK, BLOCK_ADDED, ERROR } from "./constants";

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