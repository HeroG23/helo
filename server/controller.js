const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res)=> {
        const db = req.app.get('db');

        const {username, password} = req.body;
        const profilePic = `https://robohash.org/${username}`
        const [foundUser] = await db.check_user(username);
        if(foundUser){
            return res.status(400).send('username already registered')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const [newUser] = await db.register_user([username, hash, profilePic]);
        req.session.user = {
            userId: newUser.user_id,
            username: newUser.username,
            profilePic: newUser.profile_pic
        }
        res.status(200).send(req.session.user);
    },
    login: async (req, res) => {
        const db = req.app.get('db');

        const {username, password} = req.body;
        const [foundUser] = await db.check_user(username);

        if(!foundUser){
           return res.status(401).send("Incorrect login information")
        }
        const authenticated = bcrypt.compareSync(password, foundUser.password);
        if (authenticated){
            req.session.user = {
                userId: foundUser.user_id,
                username: foundUser.username,
                profilePic: foundUser.profile_pic
            }
            return res.status(200).send(req.session.user);
        }else{
            return res.status(401).send('Incorrect login information')
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    getUser: (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        }
        else{
            res.status(404).send('Please log in')
        }
    },
    getPost: async(req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;

        const [post] = await db.find_post(id)
        res.status(200).send(post)
    },
    getPosts: async (req, res) =>{
        const db = req.app.get('db');
        const {myPosts, userId, search} = req.query
        const posts = await db.find_posts([myPosts, userId, search])

        res.status(200).send(posts)
    },
    createPost: async (req, res) =>{
        const db = req.app.get('db');
        const {title, img, content, userId} = req.body;

        await db.create_post([title, img, content, userId])
        res.sendStatus(200)
    },
    deletePost: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        await db.delete_post(id)
        res.sendStatus(200)
    }
}