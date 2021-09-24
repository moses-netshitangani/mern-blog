const router = require('express').Router();
let Article = require('../models/article.model');

const multer = require('multer');
// // retrieve articles route
// router.route('/').get((req, res) => {
//     // order by most recent
//     Article.find().sort({createdAt: -1})
//         .then(articles => res.json(articles))
//         .catch(err => res.status(400).json('Error tryna fetch: '+err));
// });

// // retrieve articles by topic
// router.route('/topic/:topic').get((req, res) => {
//     Article.find({category: req.params.topic})
//         .then(articles => res.json(articles))
//         .catch(err => res.status(400).json('Error tryna fetch: '+err));
// });

// // retrive specific article using id
// router.route('/single/:id').get((req, res) => {
//     Article.findById(req.params.id)
//         .then(article => res.json(article))
//         .catch(err => res.status(400).json('Error tryna fetch: '+err));
// });

// // post article route
// router.route('/add').post((req, res) => {
//     const author = req.body.author;
//     const date = req.body.date;
//     const title = req.body.title;
//     const category = req.body.category;
//     const brief = req.body.brief;
//     const content = req.body.content;

//     const newArticle = new Article({author, date, title, category, brief, content});

//     newArticle.save()
//         .then(() => console.log('Article successfully added'))
//         .catch(err => res.status(400).json('Error while uploading article: '+err));
// })

// delete article route
// router.route('/delete').

// HIGHLY EXPERIMENTAL ////////////////////////////////////////////////////////////////////////////////////

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if(ext !== '.jpg' && ext !== ".png" && ext !== ".mp4"){
            return cb(res.status(400).end('only jpg, png or mp4 files allowed'), false);
        }
        cb(null, true);
    }
});

const upload = multer({storage: storage}).single("file");

// upload files
router.post("/uploadfiles", (req, res) => {
    upload(req, res, err => {
        if (err) {
            console.log(err);
            return res.json({ success: false, err });
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    });
});



// retrieve articles route
router.route('/').get((req, res) => {
    // order by most recent
    Article.find().sort({ createdAt: -1 })
        .then(articles => res.json(articles))
        .catch(err => res.status(400).json('Error tryna fetch: ' + err));
});

// retrive specific article using id
router.route('/single/:id').get((req, res) => {
    Article.findById(req.params.id)
        .then(article => res.json(article))
        .catch(err => res.status(400).json('Error tryna fetch: ' + err));
});

// retrieve articles by topic
router.route('/topic/:topic').get((req, res) => {
    Article.find({ topic: req.params.topic })
        .then(articles => res.json(articles))
        .catch(err => res.status(400).json('Error tryna fetch: ' + err));
});

// post article route
router.route('/add').post((req, res) => {

    const newArticle = new Article(req.body);
    console.log(req.body);

    newArticle.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error while uploading article: ' + err));
})
module.exports = router;
