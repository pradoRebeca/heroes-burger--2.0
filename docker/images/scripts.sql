USE Backoffice;
CREATE TABLE user (
    id integer not null auto_increment,
    is_active boolean not ,
    created_date datetime not null,
    name varchar(200)
);

INSERT INTO user (is_active, created_date, name) VALUES (1, "2018-07-21", 'João Fulano');