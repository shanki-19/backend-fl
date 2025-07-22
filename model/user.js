import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    }
}, { timestamps: true });
const User = mongoose.model('User', userSchema);

export default User;