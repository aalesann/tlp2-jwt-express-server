const { model, Schema } = require('mongoose');

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'Users'
    }
});

module.exports = model('Tasks', TaskSchema);