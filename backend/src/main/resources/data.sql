-- Password is 'password123' encoded with BCrypt
INSERT INTO users (email, password, username, role, provider)
SELECT 'test@example.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a', 'testuser', 'ROLE_USER', 'LOCAL'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'test@example.com'); 