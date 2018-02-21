import sha256 from 'js-sha256';
import { formatFullDate } from "./utils/date";
import { DIFFICULTY } from "./containers/Main/constants";

export const addNewBlock = (blocks, data) => {
  const index = blocks.length;
  const previousHash = getLastHash(blocks);
  const generatedId = generateId(blocks);
  return hashBlock(generatedId, data, new Date(), previousHash, index);
};

const hashBlock = (id, data, timestamp, previousHash, index) => {
  let hash = '';
  let nonce = 0;
  let input = '';
  while (!hash.startsWith(DIFFICULTY)) {
    input = `${data}${timestamp}${previousHash}${index}${nonce}`;
    hash = sha256(input);
    nonce += 1;
  }
  return {
    key: id,
    id: id,
    nonce: nonce,
    data: data,
    date: formatFullDate(timestamp),
    input: input,
    hash: hash,
  };
};

function generateId(blocks) {
  return blocks.length > 0 ? blocks.slice(-1)[0].id + 1 : 0;
}

function getLastHash(blocks) {
  return blocks.length > 0 ? blocks.slice(-1)[0] : 0;
}
