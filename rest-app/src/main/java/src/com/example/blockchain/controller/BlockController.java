package src.com.example.blockchain.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import src.com.example.blockchain.entity.Block;
import src.com.example.blockchain.service.BlockService;

@RequestMapping("api/block")
@CrossOrigin(origins = "*") //todo: config'e taşı her servis için yapmak doğru değil
@RestController
public class BlockController {

  private BlockService blockService;

  public BlockController(BlockService blockService) {
    this.blockService = blockService;
  }

  //todo: difficulty şimdilik parametre olarak alınıyor öny yüzde kolay değiştirebilmek için
  @PutMapping("/add/{difficulty}")
  public ResponseEntity add(@PathVariable String difficulty, @RequestParam String data) {
    return blockService.add(difficulty, data);
  }

  @GetMapping
  public ResponseEntity<List<Block>> getBlocks() {
    return blockService.getPaged();
  }
}
