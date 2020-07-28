const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: [true, 'name field is required']
    },
    rank: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('ninja', NinjaSchema);

module.exports = User;