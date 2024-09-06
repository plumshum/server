//for the User schema
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true, // must have a first name
            min: 2,
            max: 50,
        },

        lastName: {
            type: String,
            required: true, 
            min: 2,
            max: 50,
        },

        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },

        password: {
            type: String,
            required: true,
            min: 5,
        },
        picturePath:{
            type: String,
            default: "",
        },
        friends:{
            type: Array,
            default: [],
        },
        location: String,
        occuption: String,
        viewedProfile: Number,
        impressions: Number,
    }, {timestamps: true} // to show when the user was created
);

const User = mongoose.model("User", UserSchema);

export default User;