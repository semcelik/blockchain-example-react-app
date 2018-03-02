package src.com.example.blockchain.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.apache.commons.codec.digest.DigestUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import src.com.example.blockchain.entity.Block;
import src.com.example.blockchain.repository.BlockRepository;
import src.com.example.blockchain.service.BlockService;

public class BlockServiceImpl implements BlockService{

  private static final Logger LOGGER = LoggerFactory.getLogger(BlockServiceImpl.class);

  private BlockRepository repository;

  public BlockServiceImpl(BlockRepository repository) {
    this.repository = repository;
  }

  public ResponseEntity add(String difficulty, String data) {
    List<Block> blocks = getBulkBlocks();
    Integer index = blocks.size();
    String previousHash = index == 0 ? "" : blocks.get(blocks.size() - 1).getHash();
    LOGGER.info("############################ GENERATING NEW BLOCK. DATA: {} ############################", data);
    Block block = generateNewBlock(index, previousHash, difficulty, data);
    repository.save(block);
    LOGGER.info("############################ Block Generated. Nonce: {} ############################",
                block.getNonce());
    return ResponseEntity.ok().build();
  }

  @Override
  public ResponseEntity<List<Block>> getPaged() {
    return ResponseEntity.ok(getBulkBlocks());
  }

  private Block generateNewBlock(Integer index, String previousHash, String difficulty, String data) {
    String hash = "";
    Long nonce = 0L;
    String input = "";
    Date now = new Date();
    Block block = new Block();
    while (!hash.startsWith(difficulty)) {
      now = new Date();
      input = data + now.toString() + previousHash + index + nonce.toString();
      hash = DigestUtils.sha256Hex(input);
      if (nonce != 0 && nonce % 1000000 == 0) {
        LOGGER.info("Still mining... current nonce: {}", nonce);
      }
      nonce += 1;
    }
    block.setData(data);
    block.setDate(now);
    block.setHash(hash);
    block.setNonce(nonce);
    block.setInput(input);
    return block;
  }

  private List<Block> getBulkBlocks() {
    Iterable<Block> all = repository.findAll();
    List<Block> blocks = new ArrayList<>();
    all.forEach(blocks::add);
    return blocks;
  }
}
