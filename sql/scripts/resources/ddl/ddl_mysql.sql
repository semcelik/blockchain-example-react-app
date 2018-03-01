drop table if exists block;

create table block (
  id bigint not null auto_increment,
  nonce bigint not null,
  data varchar(255) not null,
  date datetime not null,
  input varchar(255) not null,
  hash varchar(255) not null,
  primary key(id)
)
