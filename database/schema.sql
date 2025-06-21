-- Notes Application Schema

DROP TABLE IF EXISTS notes;

CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO notes (title, content) VALUES
('First Note', 'This is the content of my very first note.'),
('Grocery List', 'Milk, Eggs, Bread, Butter, Coffee'),
('Meeting Ideas', 'Brainstorming session for Q3 marketing strategy. Ideas: Social media campaign, influencer partnerships, email newsletters.');