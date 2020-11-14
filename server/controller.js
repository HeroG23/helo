const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res)=> {
        const db = req.app.get('db');
        const {username, password, profilePic} = req.body;
        const foundUser = await db.check_user(username);
        if(foundUser[0]){
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
            res.status(401).send("Incorrect login information")
        }
        const authenticated = bcrypt.compareSync(password, foundUser.password);
        if (authenticated){
            req.session.user = {
                userId: foundUser.user_id,
                username: foundUser.username,
                profilePic: foundUser.profile_pic
            }
            res.status(200).send(req.session.user);
        }else{
            res.status(401).send('Incorrect login information')
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
    getPost: (req, res) => {
        const db = db.req.app.get('db');
        const {id} = req.params;

        db.find_post(id)
        .then(post => res.status(200).send(post))
        .catch(err => {
            res.status(404).send(`Can't find the post you're looking for.`)
            console.log(err)
        })
    },
    getPosts: (req, res) =>{
        const db = req.app.get('db');
        const {userId} = req.params;
        
        db.find_posts(userId)
        .then(posts => res.status(200).send(posts))
        .catch(err => {
            res.status(404).send(`Couldn't find any of your posts`)
            console.log(err)
        })
    },
    createPost: (req, res) =>{
        const db = req.app.get('db');
        const {title, img, content} = req.body;

        db.create_post([title, img, content])
        .then(() => res.sendStatus(200))
        .catch(err => {
            res.status(500).send(`Couldn't create post!`)
            console.log(err)
        })
    },
    updatePosts: (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const {desc} = req.query;

        db.update_post([id, desc])
        .then(() => res.sendStatus(200))
        .catch(err => {
            res.status(500).send('Could not update post!')
            console.log(err)
        })
    },

    deletePost: (req, res) => {
        const db = req.app.get('db')
        const{id} = req.params

        db.delete_post(id)
        .then(() => res.sendStatus(200))
        .catch(err => {
            res.status(500).send('Could not delete post')
        })
    }
}