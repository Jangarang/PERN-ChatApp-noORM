import { REFRESH_TOKEN } from "../constants.js";
import type { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import  generateAccessTokenAndCookie from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';
import { find_by_id_query, find_username_query } from "../db/find_user_queries.js";
import { create_user } from "../db/create_queries.js";
import type { NewUserData } from "../db/types.js";

export const signup = async (req: Request, res: Response,next: NextFunction ): Promise<any> => { // Why does it have to show this return type
    
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body
        console.log(req.body)
        if (!fullName || !username || !password || !confirmPassword || !gender) {
        
            return res.status(400).json({error: "Please fill in all fields"});
        }

        if (password !== confirmPassword) {
            return res.status(400).json({error: "Passwords don't match"});
        }

        const user = await find_username_query(username);

        if (user) {
            return res.status(400).json({error: "Username already exists"});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password ,salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        // Make this a separate function?
        const reformatGender = gender === "male" ? "MALE" : "FEMALE";

        const newUserObj: NewUserData = {
            full_name: fullName,
            username: username,
            password: hashedPassword,
            gender: reformatGender,
            profile_pic: gender === "male" ? boyProfilePic : girlProfilePic
        }

        const newUser = await create_user(newUserObj);

        
        if(newUser) {
            // console.log('newUser Id: ', newUser.id);

            // generateTokenAndCookie(newUser.id ,res);

            res.status(201).json({id: "hello",
            fullName: newUser.full_name,
            username: newUser.username,
            profilePic: newUser.profile_pic,
            });
        }

        else {
            res.status(400).json({error: "Invalid user data"});
        }
        //next();

    } catch (error: any) {
        console.log("Error in signup controller", error.message); 
        res.status(500).json({error: "Internal Server Error"});
    }
};

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, password } = req.body;
         const user = await find_username_query(username);

        if (!user) {
            console.log('[controllers] login(): user does not exist')
            return res.status(400).json({error: "Invalid Credentials"});
        };
        console.log('-----Login User ID: ', user.id, '------');
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({error: "Invalid Credentials"});
        };

        const accessT = generateAccessTokenAndCookie(user, res); //accessToken
        //console.log('accessToken: ', accessT);
        const accessDecoded = jwt.decode(accessT) as jwt.JwtPayload;
        //console.log(accessDecoded);
        var expiry;
        
        if (typeof accessDecoded === 'object' && accessDecoded !== null && 'exp' in accessDecoded && accessDecoded.exp !== undefined) {
            expiry = accessDecoded.exp * 1000;
        }
        const refereshToken = jwt.sign({userId:user.id}, process.env.JWT_SECRET!, 
            { expiresIn: "1d"})
        
        res.cookie(REFRESH_TOKEN, refereshToken), {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== "development"
        };

        res.status(200).json(
        {
            id: user.id,
            fullName: user.full_name,
            username: user.username,
            profilePic: user.profile_pic,
            expiry: expiry
        },
    );
                
    } catch (error: any){
        console.log("Error in login controller", error.message);
        res.status(500).json({error: "Interal server error"});
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        res.cookie('jwt', '', {maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
    } catch ( error: any ) {
        console.log("Error in logout(): ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    };
};

/**
 * API endpoint to be called when acccess token runs out
 * @param req 
 * @param res 
 */
export const accessRefresh = async (req: Request, res: Response): Promise<any> => {
    const { refreshTokenCookie } = req.cookies;
    // console.log(req.cookies);
    try {
        if (!refreshTokenCookie) {
            return res.status(403).json({error: "refresh token cookie doesn't exist"});
        }

        jwt.verify(refreshTokenCookie, process.env.JWT_SECRET!, (err: Error | null, user: any) => {
            if (err) throw { status: 403, message: "Verification failed" };
                
            const accessToken = generateAccessTokenAndCookie(user, res);
            console.log(accessToken);
            return res.status(200).json({accessToken});
        });

      
    } catch (error) {
        console.error(error);
    }
};

export const getMe = async (req: Request, res: Response): Promise<any> => {
    try {
        console.log("req.user: ", req.user); 
        let user;
        //const user = await find_username_query(req.user?.id);
        //I didn't need this?
        if (req.user && req.user.id) {
            user = await find_by_id_query(req.user?.id);
        }

        if (!user ) {
            return res.status(404).json({error:"User not found"});
        };

        res.status(200).json({
            id: user.id,
            fullName: user.full_name,
            username: user.username,
            profilePic: user.profile_pic,
            gender: user.gender,
            expiry: user.expiry, 
        });
    
    } catch ( error: any ) {
        console.log("Error in getMe controller", error.message);
        res.status(500).json({error: 'Internal Server Error'});
    };
};