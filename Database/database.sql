-- NAME: chatDB
-- USER: chatAdmin
-- PASS: !@#$admin
-- HOST: localhost: ip address. 192.168.3.53
-- PORT: 5432

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    fullname VARCHAR(200),
    age SMALLINT,
    bio VARCHAR(300),
    profile TEXT,
    birthdate DATE, 
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email VARCHAR(400)
);

CREATE TABLE setting (
    id SERIAL PRIMARY KEY,
    theme TEXT,
    language TEXT,
    user_id INT UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE contact (
    id SERIAL PRIMARY KEY,
    main_user INT NOT NULL,
    contact_user INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (main_user) REFERENCES users(id),
    FOREIGN KEY (contact_user) REFERENCES users(id)
);

CREATE TYPE types_of_room AS ENUM ('personal', 'group');

CREATE TABLE room (
    id SERIAL PRIMARY KEY,
    description VARCHAR(200),
    type types_of_room NOT NULl default 'personal',
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cover TEXT
);

CREATE TABLE room_member (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    room_id INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (room_id) REFERENCES room(id)
);

CREATE TABLE message (
    id SERIAL PRIMARY KEY,
    text VARCHAR(1000) NOT NULL,
    user_id INT NOT NULL,
    reply_id INT,
    assets TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    room_id INT,
    FOREIGN KEY (reply_id) REFERENCES message(id),
    FOREIGN KEY (room_id) REFERENCES room(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);