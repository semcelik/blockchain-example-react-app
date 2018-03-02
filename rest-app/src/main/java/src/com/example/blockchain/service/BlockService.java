package src.com.example.blockchain.service;

import java.util.List;
import org.springframework.http.ResponseEntity;
import src.com.example.blockchain.entity.Block;

public interface BlockService {

  ResponseEntity add(String difficulty, String data);

  ResponseEntity<List<Block>> getPaged();
}
