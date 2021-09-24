const mongoose = require('mongoose');

// admin user model
const userSchema = mongoose.Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true}
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;