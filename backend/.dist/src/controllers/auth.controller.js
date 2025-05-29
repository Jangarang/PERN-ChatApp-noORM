import { REFRESH_TOKEN } from "../constants.js";
import bcryptjs from 'bcryptjs';
import generateAccessTokenAndCookie from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';
import { find_username_query } from "../db/find_queries.js";
import { create_user } from "../db/create_queries.js";
export const signup = async (req, res, next) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "Please fill in all fields" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }
        const user = await find_username_query(username);
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUserObj = {
            full_name: fullName,
            username: username,
            password: hashedPassword,
            gender: gender,
            profile_pic: gender === "male" ? boyProfilePic : girlProfilePic
        };
        const newUser = await create_user(newUserObj);
        if (newUser) {
            // console.log('newUser Id: ', newUser.id);
            // generateTokenAndCookie(newUser.id ,res);
            res.status(201).json({ id: "hello",
                fullName: newUser.full_name,
                username: newUser.username,
                profilePic: newUser.profile_pic,
            });
        }
        else {
            res.status(400).json({ error: "Invalid user data" });
        }
        //next();
    }
    catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await find_username_query(username);
        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }
        ;
        console.log('login user ID: ', user.id);
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        ;
        generateAccessTokenAndCookie(user, res); //accessToken
        const refereshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie(REFRESH_TOKEN, refereshToken), {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== "development"
        };
        res.status(200).json({
            id: user.id,
            fullName: user.full_name,
            username: user.username,
            profilePic: user.profile_pic
        });
    }
    catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Interal server error" });
    }
};
export const logout = async (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.log("Error in logout(): ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
    ;
};
export const tokenRefresh = async (req, res) => { };
export const getMe = async (req, res) => {
    try {
        const user = await find_username_query(req.user?.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        ;
        res.status(200).json({
            id: user.id,
            fullName: user.full_name,
            username: user.username,
            profilePic: user.profile_pic
        });
    }
    catch (error) {
        console.log("Error in getMe controller", error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    ;
};
