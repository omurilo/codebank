DROP TABLE IF EXISTS credit_cards;
CREATE TABLE credit_cards (
  id uuid NOT NULL,
  name VARCHAR NOT NULL,
  number VARCHAR NOT NULL,
  expiration_month VARCHAR NOT NULL,
  expiration_year VARCHAR NOT NULL,
  cvv VARCHAR NOT NULL,
  balance float NOT NULL,
  balance_limit float NOT NULL,
  created_at timestamp not null,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
  id uuid NOT NULL,
  amount float NOT NULL,
  status VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  store VARCHAR NOT NULL,
  credit_card_id uuid NOT NULL references credit_cards(id),
  created_at timestamp not null,
  PRIMARY KEY (id),
);