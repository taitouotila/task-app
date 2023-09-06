CREATE TABLE task (
    id SERIAL PRIMARY KEY,
    title character varying(255) NOT NULL,
    completed boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    completed_at timestamp with time zone
);

