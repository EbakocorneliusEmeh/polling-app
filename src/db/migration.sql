CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    host_id INT NOT NULL, -- references your users table
    title VARCHAR(255) NOT NULL,
    code VARCHAR(32) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS polls (
    id SERIAL PRIMARY KEY,
    session_id INT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    type VARCHAR(20) NOT NULL, -- single-choice, multiple-choice, open-ended
    code VARCHAR(32) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT NOW()
);



CREATE TABLE IF NOT EXISTS poll_options (
    id SERIAL PRIMARY KEY,
    poll_id INT NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    votes INT DEFAULT 0
);



CREATE TABLE responses (
    id SERIAL PRIMARY KEY,
    session_code VARCHAR(20) NOT NULL,
    participant_email VARCHAR(100) NOT NULL,
    poll_id INTEGER NOT NULL,
    option_id INTEGER,
    text TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE participant_responses (
    id SERIAL PRIMARY KEY,
    participant_id INT REFERENCES participants(id) ON DELETE CASCADE,
    poll_id INT NOT NULL,                -- the poll this response is for
    option_id INT,                       -- if single/multiple choice
    text TEXT,                           -- if open-ended
    created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE participant_responses (
    id SERIAL PRIMARY KEY,
    session_id INT REFERENCES sessions(id) ON DELETE CASCADE,
    participant_name VARCHAR(100) NOT NULL,
    participant_email VARCHAR(100) NOT NULL,
    answers JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
