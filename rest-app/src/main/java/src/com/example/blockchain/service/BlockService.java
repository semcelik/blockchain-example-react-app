package src.com.example.blockchain.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.apache.commons.codec.digest.DigestUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import src.com.example.blockchain.entity.Block;
import src.com.example.blockchain.repository.BlockRepository;

@RestController
@RequestMapping("api/block")
@CrossOrigin(origins = "*") //todo: config'e taşı her servis için yapmak doğru değil
public class BlockService {

  private static final Logger LOGGER = LoggerFactory.getLogger(BlockService.class);

  //todo: Service ile Controller katmanlarını ayır
  @Autowired
  private BlockRepository repository;

  //todo: difficulty şimdilik parametre olarak alınıyor öny yüzde kolay değiştirebilmek için
  @PutMapping("/add/{difficulty}")
  public HttpStatus add(@PathVariable String difficulty, @RequestParam String data) {
    List<Block> blocks = getBulkBlocks();
    Integer index = blocks.size();
    String previousHash = index == 0 ? "" : blocks.get(blocks.size() - 1).getHash();
    LOGGER.info("############################ GENERATING NEW BLOCK. DATA: {} ############################", data);
    Block block = generateNewBlock(index, previousHash, difficulty, data);
    repository.save(block);
    LOGGER.info("############################ Block Generated. Nonce: {} ############################",
                block.getNonce());
    return HttpStatus.ACCEPTED;
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

  @GetMapping
  public ResponseEntity<List<Block>> getBlocks() {
    Iterable<Block> all = repository.findAll();
    List<Block> blocks = new ArrayList<>();
    all.forEach(blocks::add);
    return ResponseEntity.ok(blocks);
  }
}
