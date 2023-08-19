var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//MongoDB schemas
var Schema = mongoose.Schema;


// create a schema
var socialmediaSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    prefixname: {
        type: String,
        required: true
    },
    prefixurl: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        "default":"fa fa-facebook fa-2x"
    },
    order: {
        type: Number
    },
    is_del: {
        type: Boolean,
        default: false
    },
    is_active: {
        type: Boolean,
        default: true
    },
    created_at: Date,
    updated_at: Date
});


var SocialMedia = mongoose.model('SocialMedia', socialmediaSchema);

module.exports = SocialMedia;