Select p.*, u.username, u.profile_pic from posts p
JOIN users u ON u.user_id = p.author_id
WHERE CASE WHEN $1 = false THEN u.user_id != $2 ELSE true END
and LOWER(p.title) LIKE LOWER('%' || $3 || '%')