import { put, takeEvery, all,select } from 'redux-saga/effects'
import { ADD_BLOCK } from "./constants";
import { blockAdded, setLoading } from "./actions";
import { addNewBlock } from "../../blockchainService";

function* addBlock(action) {
  //todo: table loading doesnt work correct
  const blocks = yield select((state) => state.blocks);
  const newBlock = addNewBlock(blocks, action.transaction);
  yield put(blockAdded(newBlock));
}

function* watchAddBlock() {
  yield takeEvery(ADD_BLOCK, addBlock);
}


export default function* mainSaga() {
  yield all([
    watchAddBlock(),
  ])
}