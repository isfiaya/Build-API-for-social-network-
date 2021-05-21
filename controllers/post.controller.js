const connection = require('../config/db.config');



exports.submitPost = async (req, res) => {
    // constructor
    const Post = function (post) {
        this.message = post.message;
        this.userId = post.userId;
        this.image = post.image;
        this.first_name = post.first_name;
        this.last_name = post.last_name
    }

    if (!req.body.message) {

        return res.status(400).json({
            messsage: "you can't submit empty post!"
        })

    }
    if (req.body.message.length <= 10) {
        return res.status(400).json({
            message: "your post is very tiny "
        })
    }
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        // Creat New Post
        const newPost = new Post({
            message: req.body.message,
            userId: req.body.userId,
            image: url + '/images/' + req.file.filename,
            first_name: req.body.first_name,
            last_name: req.body.last_name
        })
        return connection.query("INSERT INTO post SET ?", newPost, (error, results) => {
            if (error) {
                console.log("error:", "sumbit with file have error");
            }
            if (results) {
                res.status(200).json({
                    message: "post submit successfully with image ",
                })
            }
        });
    }
    if (req.body.message.length > 10) {
        // Creat New Post
        const newPost = new Post({
            message: req.body.message,
            userId: req.body.userId,
            first_name: req.body.first_name,
            last_name: req.body.last_name

        })
        return connection.query("INSERT INTO post SET ?", newPost, (error, results) => {
            if (error) {
                console.log("error:", error);
            }
            if (results) {
                res.status(200).json({
                    message: "post submit successfully without image ",
                })
            }
        });
    }
}


// exports.getAllPost = async (req, res) => {

//     connection.query("SELECT * FROM post ORDER BY id DESC;", (err, results) => {
//         if (err) {
//             res.send('something wrong!')
//         }
//         if (results) {
//             res.send(results)
//         }
//     })
// }
