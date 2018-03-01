package src.com.example.blockchain.entity;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Block {

  @Id
  @GeneratedValue
  private Long id;

  @Column(nullable = false)
  private Long nonce;

  @Column(nullable = false)
  private String data;

  @Column(nullable = false)
  private Date date;

  @Column(nullable = false)
  private String input;

  @Column(nullable = false)
  private String hash;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getNonce() {
    return nonce;
  }

  public void setNonce(Long nonce) {
    this.nonce = nonce;
  }

  public String getData() {
    return data;
  }

  public void setData(String data) {
    this.data = data;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }

  public String getInput() {
    return input;
  }

  public void setInput(String input) {
    this.input = input;
  }

  public String getHash() {
    return hash;
  }

  public void setHash(String hash) {
    this.hash = hash;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Block block = (Block) o;

    return id != null ? id.equals(block.id) : block.id == null;
  }

  @Override
  public int hashCode() {
    return id != null ? id.hashCode() : 0;
  }

  @Override
  public String toString() {
    return "Block{" +
           "id=" + id +
           ", nonce=" + nonce +
           ", data='" + data + '\'' +
           ", date=" + date +
           ", input='" + input + '\'' +
           ", hash='" + hash + '\'' +
           '}';
  }
}
