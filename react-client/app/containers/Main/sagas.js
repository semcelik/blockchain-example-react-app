import { put, takeEvery, all, select, call } from 'redux-saga/effects'
import { ADD_BLOCK, LOAD_BLOCKS } from "./constants";
import { blockAdded, blocksLoaded, loadBlocks, setLoading } from "./actions";
import { doGetRequest, doPutRequest } from '../../../request';

function getBlocksWithKey(res) {
  const blocks = res.data || [];
  return blocks.map((block) => ({
    ...block, key: block.id,
  })).sort((a,b) => b.date - a.date);
}

function* onloadBlocks() {
  const res = yield call(doGetRequest, 'api/block');
  yield put(blocksLoaded(getBlocksWithKey(res)));
}

function* watchLoadBlocks() {
  yield takeEvery(LOAD_BLOCKS, onloadBlocks);
}

function* addBlock(action) {
  const res = yield call(doPutRequest, `api/block/add/0000/?data=${action.transaction}`);
  yield put(blockAdded());
  yield put(loadBlocks());
}

function* watchAddBlock() {
  yield takeEvery(ADD_BLOCK, addBlock);
}

export default function* mainSaga() {
  yield all([watchAddBlock(), watchLoadBlocks()])
}
