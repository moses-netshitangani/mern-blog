const mongoose = require('mongoose');

// The article schema 
// const articleSchema = new mongoose.Schema(
//     {
//         author: {type: String, required: true},
//         date: {type: String, required: true},
//         title: {type: String, required: true},
//         category: {type: String, required: true},
//         content: {type: String, required: true}
//         // image type
//     },
//     {
//         timestamps: true
//     });

// HIGHLY EXPERIMENTAL ///////////////////////////////////////////////////////////////
const articleSchema = new mongoose.Schema(
    {
        content: {type: String, required: true},
        topic: {type: String, required: true}
    },

    {
        timestamps: true
    });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;