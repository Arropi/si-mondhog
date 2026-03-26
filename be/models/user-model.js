import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                const isEmailUgm = v.endsWith('@ugm.ac.id') || v.endsWith('@mail.ugm.ac.id');
                return isEmailUgm;
            }
        }
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)
export default User