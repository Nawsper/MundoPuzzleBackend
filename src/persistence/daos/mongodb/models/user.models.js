import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true, default: 0 },
    password: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
    role: { type: String, default: 'user' },
    isGithub: { type: Boolean, required: true, default: false },
    isGoogle: { type: Boolean, required: true, default: false },
    last_connection: { type: Date }
});

export const UserModel = mongoose.model('users', userSchema);