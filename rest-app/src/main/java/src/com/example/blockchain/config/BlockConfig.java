package src.com.example.blockchain.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import src.com.example.blockchain.repository.BlockRepository;
import src.com.example.blockchain.service.BlockService;
import src.com.example.blockchain.service.impl.BlockServiceImpl;

@Configuration
@CrossOrigin(origins = "*") //todo: config'e taşı her servis için yapmak doğru değil
public class BlockConfig {

  @Autowired
  private BlockRepository blockRepository;

  @Bean
  public BlockService blockService() {
    return new BlockServiceImpl(blockRepository);
  }
}
