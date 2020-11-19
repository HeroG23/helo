SELECT p.post_id, p.title, p.img, p.author_id, u.username, u.profile_pic 
from posts p
join users u ON u.user_id = p.author_id
WHERE p.post_id = $1;