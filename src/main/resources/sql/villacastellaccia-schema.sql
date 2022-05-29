CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    phone_number VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    user_type VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price NUMERIC,
    discount NUMERIC
);

CREATE TABLE IF NOT EXISTS visits (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP,
    user_id INTEGER REFERENCES users (id),
    planner_id INTEGER REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id),
    planner_id INTEGER REFERENCES users (id),
    guests INTEGER,
    catering VARCHAR(255),
    evening BOOLEAN,
    church BOOLEAN,
    areas VARCHAR(1),
    rooms VARCHAR(1),
    preparation BOOLEAN,
    fireworks BOOLEAN,
    description VARCHAR(765)
);

CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    profile_id INTEGER REFERENCES profiles (id),
    date TIMESTAMP,
    price INTEGER
);


INSERT INTO users VALUES (1, "Admin", "Admin", "123456", "admin@admin.com", "$2a$10$Uved/NnB/g2JSOtH1gGswuXsTwIL1IyuRe0J0KeocUJ0GXdmPSLau");
-- Admin password 123456;