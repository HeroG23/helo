INSERT INTO users (username, password)
values ($1, $2, $3)
RETURNING *;