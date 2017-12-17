import sha256 from 'js-sha256';
import { formatFullDate } from "./utils/date";

class blockchainService {
  constructor(difficulty) {
    this.state = {
      blocks: [],
      difficulty: "00000",
    };
  }

  initBlockchain = () => {
    const id = 0;
    const data = 'hello world';
    const timestamp = new Date();
    const previousHash = 0;
    const index = 0;
    this.hashBlock(id,data, timestamp, previousHash, index);
    console.log('init', this.state.blocks);
  };

  hashBlock = (id, data, timestamp, previousHash, index) => {
    let hash = '';
    let nonce = 0;
    let input = '';
    while (!this.isHashValid(hash)) {
      input = `${data}${timestamp}${previousHash}${index}${nonce}`;
      hash = sha256(input);
      nonce += 1;
    }
    this.state.blocks.push({
      id: id,
      nonce: nonce,
      data: data,
      date: formatFullDate(timestamp),
      input: input,
      hash: hash,
    });
  };


  isHashValid = (hash) => hash.startsWith(this.state.difficulty);

  addNewBlock(data) {
    const index = this.state.blocks.length;
    const previousHash = this.getLastHash(this.state.blocks);
    const generatedId = this.generateId(this.state.blocks);
    this.hashBlock(generatedId, data, new Date(), previousHash, index);
  };

  generateId(blocks) {
    return blocks.slice(-1)[0].id + 1;
  }

  getLastHash(blocks) {
    return blocks.slice(-1)[0]
  };

  getAllBlocks() {
    return this.state.blocks;
  }
}

export default blockchainService;