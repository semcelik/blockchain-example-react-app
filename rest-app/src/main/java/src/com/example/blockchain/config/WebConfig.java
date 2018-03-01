package src.com.example.blockchain.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@EnableWebMvc
@Configuration
public class WebConfig extends WebMvcConfigurerAdapter {

  //todo generic yap
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("*")
            .allowedOrigins("*")
            .allowedHeaders("*")
            .allowCredentials(true);
  }
}
