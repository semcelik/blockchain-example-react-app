package src.com.example.blockchain.repository;

import org.springframework.data.repository.CrudRepository;
import src.com.example.blockchain.entity.Block;

public interface BlockRepository extends CrudRepository<Block, Long> {

}
