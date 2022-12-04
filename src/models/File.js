const { model, Schema } = require('mongoose');

const FileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    exthname: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('File', FileSchema);