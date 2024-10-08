import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // send a user token for authorization
import User from "../models/User.js";

/* REGISTER USER */

//async because we are using mongoose and it has to be asynchronous
export const register = async (req, res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        //random salt to encrypt our password
        //salt stands for the number of rounds to hash the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });
        const savedUser = await newUser.save();
        //send the user a token
        res.status(201).json(savedUser);
    } catch (err){
        res.status(500).json({error: err.message});
    }
};

/* LOGGING IN */
export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        //moongoose to find the user with the email
        const user = await User.findOne({email: email});
        if (!user) return res.status(400).json({msg: "User does not exist"});

        const isMath = await bcrypt.compare(password, user.password);
        if(!isMath) return res.status(400).json({msg: "Invalid credentials"});

        //send the user a token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user});

    }catch (err){
        res.status(500).json({error: err.message});
    }
}